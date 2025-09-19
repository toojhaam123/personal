<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormContact;

class FormContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        // Lưu vào DB 
        FormContact::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Gửi thành công! Trân trọng cảm ơn bạn đã liên hệ.',
        ]);
    }

    public function index()
    {
        return FormContact::latest()->get();
    }

    public function showDetail($id)
    {
        $detailNotification = FormContact::findOrFail($id);
        return response()->json($detailNotification);
    }
}
