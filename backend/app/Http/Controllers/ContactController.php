<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Contracts\Log;

class ContactController extends Controller
{
    public function store(Request $request, $username)
    {
        // Tìm xem có tồn tại username nào ko 
        $user = User::where('username', $username)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => "Người dùng không tồn tại!", // Để xác định người dùng có tồn tại không
            ], 404);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string|min:5|max:2000',
        ]);

        try {
            $data['username'] = $username;

            // Lưu vào DB 
            Contact::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Gửi thành công! Trân trọng cảm ơn bạn đã liên hệ!',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Hệ thông đang bận, thử lại sau!",
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function index(Request $request)
    {
        $username = $request->user()->username;

        $contact = Contact::where('username', $username)->orderBy('created_at', 'desc')->get();

        if ($contact->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => "Không tìn thấy liên hệ nào!",
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $contact,
        ], 200);
    }

    public function detailContact(Request $request, $username, $id)
    {
        try {
            $username = $request->user()->username;
            $detailContact = Contact::where('username', $username)->where('id', $id)->first();

            if (!$detailContact) {
                return response()->json([
                    'success' => false,
                    'message' => "Không tìm thấy thông tin liên hệ!",
                ], 404);
            }

            return response()->json($detailContact);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'Lỗi khi lấy chi tiết liên hệ!',
                'error' => $th->getMessage(),
            ]);
        }
    }


    // xóa thông tin liên hệ 
    public function destroy(Request $request, $id)
    {
        try {
            $username = $request->user()->username;
            // Tìm bản ghi cần xóa 
            $contact = Contact::findOrFail($id);

            // Nếu ko tìm thấy 
            if ($contact->username !== $username) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không timg thấy hoặc bạn không có quyền xóa thông tin này!',
                ], 403);
            }

            // xóa bản ghi trong DB 
            $contact->delete();

            // Trả về kết quả 
            return response()->json([
                'success' => true,
                'message' => "Xóa thông tin liên hệ thành công!",
                'data' => $contact,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Lỗi hệ thống khi xóa!",
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
