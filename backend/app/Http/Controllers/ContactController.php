<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        // Lưu vào DB 
        Contact::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Gửi thành công! Trân trọng cảm ơn bạn đã liên hệ!',
        ]);
    }

    public function index()
    {
        return Contact::latest()->get();
    }
    public function showDetail($id)
    {
        $detailNotification = Contact::findOrFail($id);
        return response()->json($detailNotification);
    }


    // xóa thông tin liên hệ 
    public function destroy($id)
    {
        // Tìm bản ghi cần xóa 
        $infoContacts = Contact::findOrFail($id);

        // Nếu ko tìm thấy 
        if (!$infoContacts) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy bản ghi liên hệ!',
            ]);
        }

        // xóa bản ghi trong DB 
        $infoContacts->delete();

        // Trả về kết quả 
        return response()->json([
            'success' => true,
            'message' => "Xóa thông tin liên hệ thành công!",
            'data' => $infoContacts,
        ]);
    }
}
