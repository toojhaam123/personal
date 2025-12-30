<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function userDetail($username)
    {
        // Tìm bản gi 
        $user = User::where('username', $username)->firstOrFail();
        // Trả về kết quả
        return response()->json($user);
    }

    // Cập nhật thông tin người dùng
    public function update(Request $request)
    {
        $userId = $request->user()->id;
        // Tìm bảng ghi cần cập nhập theo id 
        $user = User::where('id', $userId)->firstOrFail();


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
            if ($user->avatar && Storage::disk('public')->exists('avatars/' . $user->avatar)) {
                Storage::disk('public')->delete('avatars/' . $user->avatar);
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
        $user->update($validated);

        // trả về kết quả 
        return response()->json([
            'success' => true,
            'message' => "Cập nhật thông tin người dùng thành công!",
            'data' => $user,
        ], 200);
    }

    // Xóa 
    public function destroy(Request $request)
    {
        $userId = $request->user()->id;

        // Thu hồi token hiện tại
        $request->user()->currentAccessToken()->delete();

        // Tìm bản ghi cần xóa 
        $user = User::where('id', $userId)->firstOrFail();

        // Xóa ảnh avatar nếu có
        if (!empty($user->avatar)) {
            $path = 'avatars/' . $user->avatar;
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }

        // Xóa bản ghi trong DB 
        $user->delete();

        // Trả kết quả Json 
        return response()->json(
            [
                'success' => true,
                'message' => "Tài khoản của bạn đã xóa thành công!",
            ],
            200
        );
    }
}
