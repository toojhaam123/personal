<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate(
            [
                'username' => 'required|string|max:255|unique:users,username',
                'email' => 'required|email|max:255|unique:users,email',
                'password' => 'required|string|min:6',
                "fullname" => 'nullable|string|max:255',
                'job_title' => 'nullable|string|max:255',
                'birth' => 'nullable|string|max:255',
                'address' => 'nullable|string|max:255',
                'link_address' => 'nullable|string|max:255',
                'phone' => 'nullable|string|max:255',
                'facebook' => 'nullable|string|max:255',
                'link_facebook' => 'nullable|string|max:255',
                'github' => 'nullable|string|max:255',
                'link_github' => 'nullable|string|max:255',
            ],
            [
                'username.unique' => 'Username đã tồn tại!',
                'email.unique' => 'Email đã tồn tại!',
            ]
        );

        // Mã hóa mặt khẩu
        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

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
        $user = User::where('email', $request->email)->first();

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
            'message' => 'Đăng nhập thành công userId',
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

    // Cập nhật thông tin người dùng
    public function update(Request $request, $id)
    {
        $userId = $request->user()->id;
        // Tìm bảng ghi cần cập nhập theo id 
        $userInfo = User::where('id', $userId)->firstOrFail();


        $rules = [
            'username' => 'nullable|string|max:255',
            'email' => 'nullable|email',
            "fullname" => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'birth' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'link_address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'link_facebook' => 'nullable|string|max:255',
            'github' => 'nullable|string|max:255',
            'link_github' => 'nullable|string|max:255',
        ];

        // nếu có file ảnh thì xử lý 
        if ($request->hasFile('avatar')) {
            $rules['avatar'] = 'nullable|image|mimes:jpg,jpeg,png|max:5120';
        }

        // validate request 
        $validated = $request->validate($rules);

        // xử lý ảnh mới nếu có 
        if ($request->hasFile('avatar')) {
            // Xóa avatar cũ 
            if ($userInfo->avatar && Storage::disk('public')->exists('avatars/' . $userInfo->avatar)) {
                Storage::disk('public')->delete('avatars/' . $userInfo->avatar);
            }

            // Lưu avatar mới 
            if ($request->hasFile('avatar')) {
                $file = $request->file('avatar');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('avatars', $fileName, 'public');
                $validated['avatar'] = $fileName;
            }
        }

        // update bản ghi 
        $userInfo->update($validated);

        // trả về kết quả 
        return response()->json([
            'success' => true,
            'message' => "Cập nhật thông tin người dùng thành công!",
            'data' => $userInfo,
        ], 200);
    }

    // Xóa 
    public function destroy(Request $request)
    {
        $userId = $request->user()->id;
        // Tìm bản ghi cần xóa 
        $userInfo = User::where('id', $userId)->firstOrFail();


        // Xóa ảnh avatar nếu có
        if (!empty($userInfo->avatar)) {
            $path = 'avatars/' . $userInfo->avatar;
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }

        // Xóa bản ghi trong DB 
        $userInfo->delete();

        // Trả kết quả Json 
        return response()->json(
            [
                'success' => true,
                'message' => "Xóa thông tin người dùng thành công!",
            ],
            200
        );
    }

    public function index(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }
}
