<?php

namespace App\Http\Controllers;

use App\Models\Home;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Artisan;


class HomeController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'home_info' => 'nullable|string',
        ]);

        Home::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tạo thông tin trang chủ thành công!',
        ]);
    }

    public function update(Request $request, $id)
    {

        $validated = $request->validate([
            'home_info' => 'nullable|string',
        ]);

        // Kiểm tra bản ghi
        $homeInfo = Home::findOrFail($id);

        if (!$homeInfo) {
            return response()->json([
                'succes' => false,
                'message' => 'Không tìm thấy bản ghi!',

            ], 400);
        }

        // Cập nhật bản ghi 
        $homeInfo->update([
            'home_info' => $request->home_info,
        ]);

        // trả về kết quả
        return response()->json([
            'success' => true,
            'message' => 'Cập nhật thông tin trang chủ thành công!',
            'data' => $homeInfo,
        ]);
    }

    public function index(Request $request)
    {
        return Home::latest()->get();
    }

    // upload CV 
    public function uploadCV(Request $request)
    {
        try {
            // 1️⃣ Kiểm tra có file hay không
            if (!$request->hasFile('cv')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không có file nào được tải lên!',
                ], 400);
            }

            $file = $request->file('cv');
            $allowExtensions = ['pdf', 'doc', 'docx'];
            $extension = strtolower($file->getClientOriginalExtension());

            // 2️⃣ Kiểm tra định dạng hợp lệ
            if (!in_array($extension, $allowExtensions)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Chỉ chấp nhận file PDF hoặc DOC/DOCX!',
                ], 400);
            }

            // 3️⃣ Đảm bảo thư mục public/cv tồn tại
            $cvFolder = storage_path('app/public/cv');
            if (!file_exists($cvFolder)) {
                mkdir($cvFolder, 0777, true);
            }

            // 4️⃣ Xóa file cũ (nếu có)
            foreach (glob($cvFolder . '/*') as $oldFile) {
                if (is_file($oldFile)) {
                    unlink($oldFile);
                }
            }

            // 5️⃣ Tạo tên file mới
            $fileName = time() . '_' . $file->getClientOriginalName();

            // 6️⃣ Lưu file vào thư mục storage/app/public/cv
            $file->storeAs('cv', $fileName);

            // 7️⃣ Đảm bảo có symbolic link tới public/storage
            if (!file_exists(public_path('storage'))) {
                Artisan::call('storage:link');
            }

            // 8️⃣ Trả về kết quả
            return response()->json([
                'success' => true,
                'message' => 'Tải CV thành công!',
                'file_name' => $fileName,
                'file_path' => asset('storage/cv/' . $fileName),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi tải CV: ' . $e->getMessage(),
            ], 500);
        }
    }
}
