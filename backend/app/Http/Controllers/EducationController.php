<?php

namespace App\Http\Controllers;

use App\Models\Education;
use App\Models\Skill;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    // Thông tin education 
    public function storeOrUpdate(Request $request)
    {
        $request->validate([
            'edu_info' => 'string|nullable',
        ]);

        $username = $request->user()->username;

        // Tìm bản ghi có không
        $edu = Education::where('username', $username)->first();
        $dataToSave = ['edu_info' => $request->edu_info];

        $result = Education::updateOrCreate(
            ['username' => $username],
            $dataToSave,
        );

        // Trả về kết quả 
        return response()->json([
            'success' => true,
            'message' => $edu ? "Cập nhật thông tin học vấn thành công!" : 'Thêm thông tin học vấn thành công!',
            'data' => $result,
        ]);
    }


    // Lấy thông tin học vấn 
    public function index(Request $request, $username)
    {
        // Tìm bản ghi 
        $edu = Education::where('username', $username)->first();

        if (!$edu) {
            return response()->json([
                'success' => false,
                'message' => "Không tìn thấy thông tin nào!",
            ], 404);
        }
        return $edu;
    }

    // Xóa thông học vấn 
    public function destroy(Request $request, $id)
    {
        // Tìm bản ghi cần xóa 
        $edu = Education::findOrFail($id);

        if ($edu->username !== $request->user()->username) {
            return response()->json([
                'success' => false,
                'message' => "Bạn không có quyền xóa thông tin này!",
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
