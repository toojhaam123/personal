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
            if ($homeInfo->cv_path && Storage::exists('public' . $homeInfo->cv_path)) {
                Storage::delete('public' . $homeInfo->cv_path);
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
}
