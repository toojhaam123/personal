<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormContactController;
use App\Http\Controllers\ContactController;
use App\http\Controllers\UserInfoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ExperienceController;
use App\Models\Experience;
use App\Models\UserInfo;

// Contact and notification
Route::post('/formcontact', [FormContactController::class, 'store']);
Route::get('/contacts', [FormContactController::class, 'index']);
Route::put('/contacts/{id}', [ContactController::class, 'updateInfor']);
Route::post('/information_contacts', [ContactController::class, 'creatInformation']);
Route::get('/get_information_contacts', [ContactController::class, 'index']);
Route::get('/notification_detail/{id}', [FormContactController::class, 'showDetail']);

// Login 
Route::post('/login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// UserInfo / Sidebar
Route::post('/creat_user_info', [UserInfoController::class, 'create']);
Route::post('/update_user_info/{id}', [UserInfoController::class, 'update']);
Route::get('get_user_info', [UserInfoController::class, 'index']);

// Home 
Route::post('creat_home_info', [HomeController::class, 'store']);
Route::get('get_home_info', [HomeController::class, 'index']);
Route::post('update_home_info/{id}', [HomeController::class, 'update']);

// Experiences
Route::post('creat_exp_info', [ExperienceController::class, 'store']);
Route::get('get_exp_info', [ExperienceController::class, 'index']);
Route::post('update_exp_info/{id}', [ExperienceController::class, 'update']);
