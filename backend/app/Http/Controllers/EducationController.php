<?php

namespace App\Http\Controllers;

use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    // Thông tin education 
    public function store(Request $request)
    {
        $edu = $request->validate([
            'edu_info' => 'string|nullable',
        ]);

        // Thêm bảng ghi vào 

        Education::create($edu);

        // Trả về kết quả 
        return response()->json([
            'success' => true,
            'message' => 'Thêm thông tin học vấn thành công!',
        ]);
    }

    // Cập nhập 
    public function update(Request $request, $id)
    {
        // Validate 
        $edu = $request->validate([
            'edu_info' => 'string|nullable',
        ]);

        // Tìm bản ghi 
        $edu = Education::findOrFail($id);

        if (!$edu) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy bản ghi!',
            ]);
        }

        // Tiến hành cập nhật 
        $edu->update([
            'edu_info' => $request->edu_info,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật thông tin học vấn thành công!',
            'data' => $edu,
        ]);
    }

    // Lấy thông tin học vấn 
    public function index()
    {
        return Education::latest()->get();
    }

    // Xóa thông học vấn 
    public function destroy($id)
    {
        // Tìm bản ghi cần xóa 
        $edu = Education::findOrFail($id);

        // Nếu ko tìm thấy 
        if (!$edu) {
            return response()->json([
                'success' => false,
                'message' => "Không tìm thấy bản ghi học vấn!",
            ]);
        }

        // Xóa bản ghi học vấn trong DB 
        $edu->delete();

        // Trả về kết quả 
        return response()->json([
            'success' => true,
            'message' => 'Xóa thông tin học vấn thành công!',
            'data' => $edu,
        ]);
    }
}
