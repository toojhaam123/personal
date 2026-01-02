<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Skill;

class SkillController extends Controller
{
    // Thêm thông tin skill 
    public function storeOrUpdate(Request $request)
    {
        $request->validate([
            'skill_info' => 'nullable|string|nullable',
        ]);

        try {
            $username = $request->user()->username;

            $skill = Skill::where("username", $username)->first();
            $dataToSave = ['skill_info' => $request->skill_info];

            $result = Skill::updateOrCreate(
                ['username' => $username],
                $dataToSave,
            );

            return response()->json([
                'success' => true,
                'message' => $skill ? 'Cập nhật thông tin kỹ năng thành công!' : "Thêm thông tin kỹ năng thành công!",
                'data' => $result,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi thêm hoặc cập nhật dữ liệu!' . $th->getMessage(),
            ]);
        }
    }

    // Lấy thông tin skill
    public function index(Request $request, $username)
    {
        // Tìm bản ghi cần lấy 
        $skill = Skill::where('username', $username)->first();

        if (!$skill) {
            return response()->json([
                'message' => "Không timg thấy thông tin nào!",
            ], 404);
        }

        return $skill;
    }

    // Xóa thông tin kỹ năng
    public function destroy(Request $request, $id)
    {
        // Tìm bản ghi cần xóa
        $skill = Skill::findOrFail($id);

        if ($skill->username !== $request->user()->username) {
            return response()->json([
                'success' => false,
                'message' => "Bạn khôn có quyền xóa thông tin này!",
            ]);
        }

        // Xóa bản ghi trong DB 
        $skill->delete();

        // Trả về kết quả
        return response()->json([
            'success' => true,
            'message' => "Xóa thông tin kỹ năng thành công!",
            'data' => $skill,
        ]);
    }
}
