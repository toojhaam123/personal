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

    // // Thêm thông tin người dùng
    // public function store(Request $request)
    // {
    //     $rules = [
    //         "fullname" => 'nullable|string|max:255',
    //         'job_title' => 'nullable|string|max:255',
    //         'birth' => 'nullable|string|max:255',
    //         'address' => 'nullable|string|max:255',
    //         'link_address' => 'nullable|string|max:255',
    //         'email' => 'nullable|email',
    //         'phone' => 'nullable|string|max:255',
    //         'facebook' => 'nullable|string|max:255',
    //         'link_facebook' => 'nullable|string|max:255',
    //         'github' => 'nullable|string|max:255',
    //         'link_github' => 'nullable|string|max:255',
    //     ];

    //     // nếu có file ảnh thì xử lý 
    //     if ($request->hasFile('avatar')) {
    //         $rules['avatar'] = 'nullable|image|mimes:jpg,jpeg,png|max:5120';
    //     }

    //     // validate request 
    //     $validated = $request->validate($rules);

    //     // Gắn user_id từ token 
    //     $validated['user_id'] = $request->user()->id;

    //     // Xử lý upload file nếu có 
    //     if ($request->hasFile('avatar')) {
    //         $file = $request->file('avatar');
    //         $fileName = time() . '_' . $file->getClientOriginalName();
    //         $file->storeAs('avatars', $fileName, 'public');
    //         $validated['avatar'] = $fileName;
    //     }
    //     // Tạo bản ghi trong DB
    //     $userInfo = UserInfo::create($validated);

    //     return response()->json([
    //         'success' => true,
    //         'message' => "Thêm thông tin người dùng thành công!",
    //         'data' => $userInfo,
    //     ], 201);
    // }

    // // Cập nhật thông tin người dùng
    // public function update(Request $request, $id)
    // {
    //     $userId = $request->user()->id;
    //     // Tìm bảng ghi cần cập nhập theo id 
    //     $userInfo = UserInfo::where('id', $id)->where('user_id', $userId)->firstOrFail();


    //     $rules = [
    //         "fullname" => 'nullable|string|max:255',
    //         'job_title' => 'nullable|string|max:255',
    //         'birth' => 'nullable|string|max:255',
    //         'address' => 'nullable|string|max:255',
    //         'link_address' => 'nullable|string|max:255',
    //         'email' => 'nullable|email',
    //         'phone' => 'nullable|string|max:255',
    //         'facebook' => 'nullable|string|max:255',
    //         'link_facebook' => 'nullable|string|max:255',
    //         'github' => 'nullable|string|max:255',
    //         'link_github' => 'nullable|string|max:255',
    //     ];

    //     // nếu có file ảnh thì xử lý 
    //     if ($request->hasFile('avatar')) {
    //         $rules['avatar'] = 'nullable|image|mimes:jpg,jpeg,png|max:5120';
    //     }

    //     // validate request 
    //     $validated = $request->validate($rules);

    //     // xử lý ảnh mới nếu có 
    //     if ($request->hasFile('avatar')) {
    //         // Xóa avatar cũ 
    //         if ($userInfo->avatar && Storage::disk('public')->exists('avatars/' . $userInfo->avatar)) {
    //             Storage::disk('public')->delete('avatars/' . $userInfo->avatar);
    //         }

    //         // Lưu avatar mới 
    //         if ($request->hasFile('avatar')) {
    //             $file = $request->file('avatar');
    //             $fileName = time() . '_' . $file->getClientOriginalName();
    //             $file->storeAs('avatars', $fileName, 'public');
    //             $validated['avatar'] = $fileName;
    //         }
    //     }

    //     // update bản ghi 
    //     $userInfo->update($validated);

    //     // trả về kết quả 
    //     return response()->json([
    //         'success' => true,
    //         'message' => "Cập nhật thông tin người dùng thành công!",
    //         'data' => $userInfo,
    //     ], 200);
    // }

    // // Xóa 
    // public function destroy(Request $request, $id)
    // {
    //     $userId = $request->user()->id;
    //     // Tìm bản ghi cần xóa 
    //     $userInfo = UserInfo::where('id', $id)->where('user_id', $userId)->firstOrFail();


    //     // Xóa ảnh avatar nếu có
    //     if (!empty($userInfo->avatar)) {
    //         $path = 'avatars/' . $userInfo->avatar;
    //         if (Storage::disk('public')->exists($path)) {
    //             Storage::disk('public')->delete($path);
    //         }
    //     }

    //     // Xóa bản ghi trong DB 
    //     $userInfo->delete();

    //     // Trả kết quả Json 
    //     return response()->json(
    //         [
    //             'success' => true,
    //             'message' => "Xóa thông tin người dùng thành công!",
    //         ],
    //         200
    //     );
    // }
}
