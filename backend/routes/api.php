<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormContactController;
use App\Http\Controllers\AuthController;

Route::post('/formcontact', [FormContactController::class, 'store']);
Route::get('/contacts', [FormContactController::class, 'index']);
Route::get('/notification_detail/{id}', [FormContactController::class, 'showDetail']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
