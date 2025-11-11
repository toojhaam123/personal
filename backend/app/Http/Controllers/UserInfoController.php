<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Http\Request;

class UserInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userInfo = UserInfo::all();
        return response()->json($userInfo);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // validate dữ liệu
        $validated = $request->validate([
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
            'fullname' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
            'birth' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'link_address' => 'nullable|string|max:255',
            'email' => 'nullable|string|email',
            'phone' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'link_facebook' => 'nullable|string|max:255',
            'github' => 'nullable|string|max:255',
            'link_github' => 'nullable|string|max:255',
        ]);

        // nếu có files
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('avatars', $fileName, 'public');
            $validated['avatar'] = $fileName;
        }

        $userInfo = UserInfo::create([
            'avatar' => $validated['avatar'],
            'fullname' => $validated['fullname'],
            'job_title' => $validated['job_title'],
            'birth' => $validated['birth'],
            'address' => $validated['address'],
            'link_address' => $validated['link_address'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'facebook' => $validated['facebook'],
            'link_facebook' => $validated['link_facebook'],
            'github' => $validated['github'],
            'link_github' => $validated['link_github'],
        ]);
        return response()->json([
            'message' => "Thêm thông tin người dùng thành công!",
            'date' => $userInfo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        try {
            // Tìm bảng ghi cần cập nhập theo id 
            $userInfo = UserInfo::findOrFail($id);

            // Validate dữ liệu
            $validated = $request->validate([
                'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
                'fullname' => 'nullable|string|max:255',
                'job_title' => 'nullable|string|max:255',
                'birth' => 'nullable|string|max:255',
                'address' => 'nullable|string|max:255',
                'link_address' => 'nullable|string|max:255',
                'email' => 'nullable|string|email',
                'phone' => 'nullable|string|max:255',
                'facebook' => 'nullable|string|max:255',
                'link_facebook' => 'nullable|string|max:255',
                'github' => 'nullable|string|max:255',
                'link_github' => 'nullable|string|max:255',
            ]);

            // nếu có files
            if ($request->hasFile('avatar')) {
                // Xóa ảnh cũ nếu có 
                if ($userInfo->avatar && file_exists(storage_path('app/public/avatars/' . $userInfo->avatar))) {
                    unlink(storage_path('app/public/avatars/' . $userInfo->avatar));
                }

                $file = $request->file('avatar');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('avatars', $fileName, 'public');
                $validated['avatar'] = $fileName;
            }
            // Cập nhật dữ liệu
            $userInfo->update($validated);

            // Trả về response 
            return response()->json([
                'success' => true,
                'message' => 'Cập nhập thông tin thành công rồi!',
                'data' => $userInfo,
            ], 200);
        } catch (\Throwable $e) {
            // Trả về lỗi
            return response()->json([
                'success' => false,
                'message' => 'Cập nhật thất bại!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserInfo $userInfo)
    {
        //
    }
}
