<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json(['message' => "Đăng ký thành công!"], 201);
    }

    public function login(Request $request)
    {
        $key = Str::lower($request->email) . '|' . $request->ip(); // rate-limit

        if (RateLimiter::tooManyAttempts($key, 5)) { // 1 email + 1 ip chỉ đc nhập 5 lần/phút
            return response()->json([
                'message' => "Đăng nhập quá nhiều lần, thử lại sau!",
            ], 429);
        };

        $validated = $request->validate([
            'email' => 'required|email',
            'password' => "required",
        ]);

        // Lấy user theo email
        $user = \App\Models\User::where('email', $request->email)->first();

        // Check có user và mật khẩu đúng ko
        if (!$user || !Hash::check($validated['password'], $user->password)) {
            RateLimiter::hit($key, 60); // Tăng số lần thử khóa 60s
            return response()->json([
                'message' => "Sai thông tin đăng nhập!",
            ], 401);
        }

        // Đăng nhập đúng thì reset lại bộ đếm 
        RateLimiter::clear($key);

        // tạo token sunctum
        $token = $user->createToken('auth_token', ['user'])->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công!',
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
        // Tránh logout khi chưa đăng nhập
        if (!$request->user()) {
            return response()->json([
                "message" => "Chưa đăng nhập!",
            ], 401);
        }

        // Xóa token hiện tại
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => "Bạn đã đăng xuất!"
        ], 200);
    }

    // public function user(Request $request)
    // {
    //     return response()->json($request->user());
    // }
}
