<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Redis;

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

        return response()->json(['message' => "Đăng ký thành công!"]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => "required",
        ]);

        // Lấy user theo email
        $user = \App\Models\User::where('email', $request->email)->first();

        // Check có user và mật khẩu đúng ko
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => "Sai email hoặc mật khẩu"], 401);
        }

        // tạo token sunctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công!',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        // Xóa token hiện tại
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => "Đã đăng xuất!"
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
