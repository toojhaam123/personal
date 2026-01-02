<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    // Tạo thông tin Exp 
    public function storeOrUpdate(Request $request)
    {
        $request->validate([
            'exp_info' => 'nullable|string|max:255',
        ]);

        try {
            $username = $request->user()->username;
            $exp = Experience::where("username", $username)->first();
            $dataToSave = ['exp_info' => $request->exp_info,];

            $result = Experience::updateOrCreate(
                ['username' => $username],
                $dataToSave,
            );

            return response()->json([
                'success' => true,
                'message' => $exp ? "Cập nhập thông tin kinh nghiện thành công!" : "Thêm thông tin kinh nghiệm thành công!",
                'data' => $result,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi thêm hoặc cập nhật dữ liệu!' . $th->getMessage(),
            ]);
        }
    }
    public function index(Request $request, $username)
    {
        $exp = Experience::where("username", $username)->first();

        if (!$exp) {
            return response()->json(['message' => 'Không tìm thấy thông tin hoặc bạn không có quyền'], 404);
        }

        return $exp;
    }

    // Hàm xóa
    public function destroy($id)
    {
        // tìm bản ghi cần xóa
        $exp = Experience::findOrFail($id);

        if (!$exp) {
            return response()->json([
                'success' => false,
                'message' => "Lỗi khi xóa thông tin kinh nghiệm!",
            ]);
        }

        //  Xóa bản ghi trong DB
        $exp->delete();

        // Trả về status 
        return response()->json([
            'success' => true,
            'message' => "Xóa thông tin kinh nghiệm thành công!",
            'data' => $exp,
        ]);
    }
}
