<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Skill;

class SkillController extends Controller
{
    // Thêm thông tin skill 
    public function store(Request $request)
    {
        $validated = $request->validate([
            'skill_info' => 'string|nullable',
        ]);
        // Tạo thông tin
        $skill = Skill::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Thêm thông tin kỹ năng thành công!',
            'data' => $skill,
        ]);
    }

    // Cập nhật skill 
    public function update(Request $request, $id)
    {
        $skill = $request->validate([
            'skill_info' => 'nullable|string',
        ]);

        // Kiểm tra bản ghi 
        $skill = Skill::findOrFail($id);

        if (!$skill) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy bản ghi nào!',
            ]);
        }

        // Cập nhật 
        $skill->update([
            'skill_info' => $request->skill_info,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật thông tin kỹ năng thành công!',
            'data' => $skill,
        ]);
    }

    // Lấy thông tin skill
    public function index()
    {
        return Skill::latest()->get();
    }

    // Xóa thông tin kỹ năng
    public function destroy($id)
    {
        // Tìm bản ghi cần xóa
        $skill = Skill::findOrFail($id);

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
