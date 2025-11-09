<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    // Tạo thông tin Exp 
    public function store(Request $request)
    {
        $exp = $request->validate([
            'exp_info' => 'nullable|string|max:255',
        ]);

        Experience::create($exp);

        return response()->json([
            'success' => true,
            'message' => 'Tạo thông tin kinh nghiệm thành công!',
        ]);
    }

    public function update(Request $request, $id)
    {
        $exp = $request->validate([
            'exp_info' => 'nullable|string',
        ]);

        // Kiểm tra bản ghi 
        $exp = Experience::findOrFail($id);

        if (!$exp) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy bản ghi phù hợp!',
            ], 400);
        }

        // cập nhập
        $exp->update([
            'exp_info' => $request->exp_info,
        ]);

        // trả kết quả 
        return response()->json([
            'success' => true,
            'message' => "Cập nhật thông tin kinh nghiệm thành công!",
        ]);
    }

    public function index(Request $request)
    {
        return Experience::latest()->get();
    }
}
