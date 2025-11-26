<?php

namespace App\Http\Controllers;

use App\Models\Home;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;



class HomeController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'home_info' => 'nullable|string',
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

            // Tạo bản ghi Home
            $homeInfo = Home::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Tạo thông tin trang chủ thành công!',
                'data'    => $homeInfo,
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
            'home_info' => 'nullable|string',
            'cv_path' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        // Kiểm tra bản ghi
        $homeInfo = Home::findOrFail($id);

        // Cập nhật nội dung 
        $homeInfo->home_info = $request->home_info;

        // nếu có file mới 
        if ($request->hasFile('cv_path')) {
            $file = $request->file('cv_path');

            // Xóa file cũ nếu có
            if (!empty($homeInfo->cv_path)) {
                $oldFile = str_replace('/storage', 'public', $homeInfo->cv_path);
                if (Storage::exists($oldFile)) {
                    Storage::delete($oldFile);
                }
            }

            // Lưu file mới 
            $fileName = time() . "_" . $file->getClientOriginalName();
            $file->storeAs('cv', $fileName);

            // Lưu đường dẫn vào DB bỏ public
            $homeInfo->cv_path = "/storage/cv/" . $fileName;
        }

        $homeInfo->save();

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

    // Xóa thông tin trang chủ 
    public function destroy($id)
    {
        // Tìm bản ghi
        $homeInfo = Home::findOrFail($id);

        // Xóa file CV nếu có
        if (!empty($homeInfo->cv_path)) {
            $filePath = str_replace('/storage', 'public', $homeInfo->cv_path);
            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
            }
        }

        // Xóa bản ghi trong DB
        $homeInfo->delete();

        // Trả kết quả JSON
        return response()->json([
            'success' => true,
            'message' => 'Đã xóa thông tin thành công!',
        ]);
    }
}
