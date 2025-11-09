<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use PhpParser\Node\Stmt\TryCatch;

class PortfolioController extends Controller
{
    // Thêm bản ghi thong tin dự án
    public function store(Request $request)
    {
        try {
            // Validate
            $portfolio = $request->validate([
                'avatarPort' => '|nullable|image|mimes:jpg,gif,png,jpeg|max:5120',
                'title' => 'string|nullable|max:255',
                'description' => 'string|nullable',
                'link' => 'string|nullable',
            ]);

            // Xử lý ảnh nếu có 
            if ($request->hasFile('avatarPort')) {
                $file = $request->file('avatarPort');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('avatarPort', $fileName, 'public');
                $portfolio['avatarPort'] = $fileName;
            }

            // thêm bản ghi 
            $respon = Portfolio::create($portfolio);

            return response()->json([
                'success' => true,
                'message' => 'Thêm dự án thành công!',
                'data' => $respon,
            ]);
        } catch (\Throwable $e) {
            return response()->json([[
                'success' => false,
                'message' => 'Thêm dự án thất bại!',
                'error' => $e->getMessage(),
            ]]);
        }
    }

    // Cập nhật dự án 
    public function update(Request $request, $id)
    {
        try {
            // Kiểm trả bản ghi 
            $portfolio = Portfolio::findOrFail($id);

            // Validate 
            $validated = $request->validate([
                'avatarPort' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:5120',
                'title' => 'string|nullable|max:255',
                'description' => 'string|nullable',
                'link' => 'string|nullable',
            ]);

            // Nếu có file 
            if ($request->hasFile('avatarPort')) {
                // xóa ảnh cũ nếu có
                if ($portfolio->avatarPort && file_exists(storage_path('app/public/avatarPort/' . $portfolio->avatarPort))) {
                    unlink(storage_path('app/public/avatarPort/' . $portfolio->avatarPort));
                }

                $file = $request->file('avatarPort');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('avatarPort', $fileName, 'public');
                $validated['avatarPort'] = $fileName;
            }

            // Cập nhật 
            $portfolio->update($validated);

            // Trả về kq 
            return response()->json([
                'success' => true,
                'message' => 'Cập nhật dự án thành công!',
                'data' => $portfolio,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Cập nhật thông tin dự án thất bại!',
                'error' => $e->getMessage(),
            ]);
        }
    }

    // Lấy dữ liệu dự án 
    public function index()
    {
        return Portfolio::latest()->paginate(10);
    }

    // Xem chi tiết dự án 
    public function detail($id)
    {
        $detailPort = Portfolio::findOrFail($id);
        return response()->json($detailPort);
    }

    // Xóa dự án
    public function destroy($id)
    {
        try {
            // Tìm bản ghi
            $portfolio = Portfolio::findOrFail($id);

            // Nếu có ảnh lưu trong storage thì xóa luôn 
            if ($portfolio->avatarPort && file_exists(storage_path('app/public/avataPort/' . $portfolio->avatarPort))) {
                @unlink(storage_path('app/public/avatarPort/' . $portfolio->avatarPort));
            }

            $portfolio->delete();

            return response()->json([
                'success' => true,
                'message' => 'Bạn đã xóa một dự án!'
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Xóa dự án thất bại!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
