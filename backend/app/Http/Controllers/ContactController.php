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

    public function     index()
    {
        return Contact::all();
    }
}
