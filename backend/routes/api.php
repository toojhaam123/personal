<?php

use Illuminate\Support\Facades\Route;


// Nhận dữ liệu từ frontend
Route::post('/login', function (\Illuminate\Http\Request $request) {
    return response()->json([
        'username' => $request->input('username'),
        'password' => $request->input('password'),
        'message' => 'Đăng nhập API test'
    ]);
});

Route::get('/users', function () {
    return response()->json([
        ['id' => 1, 'name' => 'Tooj'],
        ['id' => 2, 'name' => 'Dawb'],
    ]);
});

Route::get('/products', function () {
    return response()->json([
        ['id' => 1, 'name' => 'Mỳ tôm nhưng ko có tôm'],
        ['id' => 2, 'name' => 'Mỳ chính giả'],
    ]);
});
