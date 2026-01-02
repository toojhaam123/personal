<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PortfolioController extends Controller
{
    // Thêm bản ghi thong tin dự án
    public function storeOrUpdate(Request $request)
    {
        // Validate
        $validated = $request->validate([
            'id' => 'nullable|integer',
            'avatarPort' => 'nullable|image|mimes:jpg,gif,png,jpeg|max:5120',
            'title' => 'required|string|max:255',
            'description' => 'string|nullable',
            'link' => 'string|nullable',
        ]);
        try {
            $username = $request->user()->username;
            $id = $request->input('id');

            $portfolio = null;

            if ($id) {
                // Tìm bản ghi xem có không 
                $portfolio = Portfolio::where('id', $id)->where('username', $username)->first();
            }

            $dataToSave = $validated;
            $dataToSave['username'] = $username;
            $dataToSave['slug'] = Str::slug($request->title);

            // Xử lý ảnh nếu có 
            if ($request->hasFile('avatarPort')) {
                // Xóa bản ghi cũ nếu có 
                if ($portfolio?->avatarPort && Storage::disk('public')->exists('avatarPort/' . $portfolio?->avatarPort)) {
                    Storage::disk('public')->delete('avatarPort/' . $portfolio?->avatarPort);
                }

                // Lưu file mới 
                $file = $request->file('avatarPort');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('avatarPort', $fileName, 'public');
                $dataToSave['avatarPort'] = $fileName;
            }

            // tLưu dữ liệu
            $result = Portfolio::updateOrCreate(
                ['id' => $id, 'username' => $username],
                $dataToSave,
            );

            return response()->json([
                'success' => true,
                'message' => $id ? "Cập nhật dự án thành công!" : 'Thêm dự án mới thành công!',
                'data' => $result,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Thêm dự án thất bại!' . $e->getLine(),
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Lấy dữ liệu dự án 
    public function index(Request $request, $username)
    {
        // Tìm bản ghi 
        $portfolio = Portfolio::where('username', $username)->orderBy('created_at', 'desc')->get();

        if ($portfolio->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => "Không tìm thấy dự án nào!",
                'data' => [],
            ], 200);
        }

        return response()->json([
            'success' => true,
            'data' => $portfolio,
        ], 200);
    }

    // Xem chi tiết dự án 
    public function portfolioDetail(Request $request, $username, $slug)
    {
        $detailPort = Portfolio::where('username', $username)->where('slug', $slug)->first();
        return response()->json($detailPort);
    }

    // Xóa dự án
    public function destroy(Request $request, $username, $id)
    {
        $authenticatedUser = $request->user()->username;
        try {
            // Tìm bản ghi
            $portfolio = Portfolio::findOrFail($id);

            if ($authenticatedUser !== $username) {
                return response()->json([
                    'success' => false,
                    'message' => "Bạn không có quyền xóa thông tin này!",
                ]);
            }
            // Nếu có ảnh lưu trong storage thì xóa luôn 
            if ($portfolio->avatarPort) {
                $path = 'avatarPort/' . $portfolio->avatarPort;
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
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
