<?php

namespace App\Http\Controllers;

use App\Models\Home;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

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
}
