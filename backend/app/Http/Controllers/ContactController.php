<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function creatInformation(Request $request)
    {
        $validated = $request->validate([
            'information_contacts' => 'required|string|max:255',
        ]);

        // Lưu vào DB
        Contact::create($validated);

        return response()->json([
            'success' => true,
            'message' => "Đã tạo thông tin thành công",
        ]);
    }

    public function index()
    {
        return Contact::all();
    }

    public function updateInfor(Request $request, $id)
    {
        // Validate dữ liệu
        $validated = $request->validate([
            'information_contacts' => 'required|string',
        ]);

        // Tìm bản ghi theo id 
        $contact = Contact::findOrFail($id);

        if (!$contact) {
            return response()->json([
                'seccess' => false,
                'message' => "Không tìm thấy thông tin liên hệ!",
            ], 404);
        }

        // Cập nhập bản ghi
        $contact->update([
            'information_contacts' => $request->information_contacts,
        ]);

        // Trả về json response 
        return response()->json([
            'success' => true,
            'message' => 'Cập nhập thành công rồi bạn nhé!',
            'data' => $contact,
        ]);
    }
}
