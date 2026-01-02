<?php

namespace App\Http\Controllers;

use App\Models\Introduction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;



class IntroductionController extends Controller
{
    //hàm thêm mới nếu chưa có và chỉnh sửa nếu đã có bản ghi
    public function storeOrUpdate(Request $request)
    {
        // Validated dữ liệu 
        $request->validate([
            'intro_info' => 'nullable|string',
            'cv_path' => 'nullable|file|mimes:pdf,doc,docx,|max:5120',
        ]);

        try {
            $username = $request->user()->username;

            // Tìm bản ghi của user này để xử lý file cũ nếu có 
            $introInfo = Introduction::where("username", $username)->first();

            $dataToSave = ['intro_info' => $request->intro_info,];

            // xử lý file CV 
            if ($request->hasFile('cv_path')) {
                // Xóa bản ghi cũ nếu đã có 
                if ($introInfo?->cv_path && Storage::disk('public')->exists('cv/' . $introInfo->cv_path)) {
                    Storage::disk('public')->delete('cv/' . $introInfo->cv_path);
                }

                // Lưu file mới 
                if ($request->hasFile('cv_path')) {
                    $file = $request->file('cv_path');
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $file->storeAs('cv', $fileName, 'public'); // Lưu vào storage/app/public/cv
                    $dataToSave['cv_path'] = $fileName;
                }
            }

            // Nếu tìm thấy bản ghi thì update nếu ko thấy thì tạo mới
            $result = Introduction::updateOrCreate(
                ['username' => $username], // Điều kiện tìm kiếm
                $dataToSave                // Dữ liệu cập nhập hoặc tạo mới
            );

            return response()->json([
                'success' => true,
                'message' => $introInfo ? "Cập nhật thông tin giới thiệu thành công!" : "Thêm thông tin giới thiệu thành công!",
                'data' => $result,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi thêm hoặc cập nhật thông tin giới thiệu!' . $e->getMessage(),
            ], 500);
        }
    }

    public function index(Request $request, $username)
    {
        $introInfo = Introduction::where('username', $username)->first();

        if (!$introInfo) {
            return response()->json(['message' => 'Không tìm thấy thông tin hoặc bạn không có quyền'], 404);
        }

        return $introInfo;
    }

    // Xóa thông tin trang chủ 
    public function destroy(Request $request, $id)
    {
        try {
            // Tìm bản ghi
            $introInfo = Introduction::findOrFail($id);
            // Kiểm tra quyền, đảm bảo user chỉ đc xóa của chính mình
            if ($introInfo->username !== $request->user()->username) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn không có quyền xóa thông tin này!'
                ], 403);
            }
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
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi xóa: ' . $e->getMessage(),
            ], 500);
        }
    }
}
