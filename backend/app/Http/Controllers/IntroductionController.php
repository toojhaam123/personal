<?php

namespace App\Http\Controllers;

use App\Models\Introduction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;



class IntroductionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'intro_info' => 'nullable|string',
            'cv_path' => 'nullable|file|mimes:pdf,doc,docx|max:5120',

        ]);

        try {
            // Nếu có file CV
            if ($request->hasFile('cv_path')) { // Kiêm tra xem tro request có tên file cv_path hay ko, tránh người dùng ko gửi file mà backend vẫn xử lý 
                $file = $request->file('cv_path'); // Lấy đối tượng file từ request
                $fileName = time() . '_' . $file->getClientOriginalName(); // Tạo tên file mới để lưu, time() giúp tên file duy nhất, lấy tên file gốc
                $file->storeAs('cv', $fileName); // lưu trong storage/app/public/cv
                $validated['cv_path'] = '/storage/cv/' . $fileName;
            }

            // Validate user id 
            $validated['user_id'] = $request->user()->id;

            // Tạo bản ghi Intro
            $introInfo = Introduction::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Tạo thông tin giới thiệu thành công!',
                'data'    => $introInfo,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi tạo thông tin: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {

        $validated = $request->validate([
            'intro_info' => 'nullable|string',
            'cv_path' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        // Kiểm tra bản ghi
        $introInfo = Introduction::findOrFail($id);

        // Cập nhật nội dung 
        $introInfo->intro_info = $request->intro_info;

        // nếu có file mới 
        if ($request->hasFile('cv_path')) {
            $file = $request->file('cv_path');

            // Xóa file cũ nếu có
            if (!empty($introInfo->cv_path)) {
                $oldFile = str_replace('/storage', 'public', $introInfo->cv_path);
                if (Storage::exists($oldFile)) {
                    Storage::delete($oldFile);
                }
            }

            // Lưu file mới 
            $fileName = time() . "_" . $file->getClientOriginalName();
            $file->storeAs('cv', $fileName);

            // Lưu đường dẫn vào DB bỏ public
            $introInfo->cv_path = "/storage/cv/" . $fileName;
        }

        $introInfo->save();

        // trả về kết quả
        return response()->json([
            'success' => true,
            'message' => 'Cập nhật thông tin trang chủ thành công!',
            'data' => $introInfo,
        ]);
    }

    public function index(Request $request)
    {
        $username = $request->user()->username;

        $introInfo = Introduction::where('username', $username)->first();

        if (!$introInfo) {
            return response()->json(['message' => 'Không tìm thấy thông tin hoặc bạn không có quyền'], 404);
        }

        return $introInfo;
    }

    // Xóa thông tin trang chủ 
    public function destroy($id)
    {
        // Tìm bản ghi
        $introInfo = Introduction::findOrFail($id);

        // Xóa file CV nếu có
        if (!empty($introInfo->cv_path)) {
            $filePath = str_replace('/storage', 'public', $introInfo->cv_path);
            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
            }
        }

        // Xóa bản ghi trong DB
        $introInfo->delete();

        // Trả kết quả JSON
        return response()->json([
            'success' => true,
            'message' => 'Đã xóa thông tin thành công!',
        ]);
    }
}
