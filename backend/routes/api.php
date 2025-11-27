<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormContactController;
use App\Http\Controllers\ContactController;
use App\http\Controllers\UserInfoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\SkillController;
use App\Models\Education;
use App\Models\Portfolio;
use App\Models\Skill;

// Contact and notification
Route::post('/formcontact', [FormContactController::class, 'store']);
Route::get('/contacts', [FormContactController::class, 'index']);
Route::put('/contacts/{id}', [ContactController::class, 'updateInfor']);
Route::post('/information_contacts', [ContactController::class, 'creatInformation']);
Route::get('/get_information_contacts', [ContactController::class, 'index']);
Route::get('/notification_detail/{id}', [FormContactController::class, 'showDetail']);
Route::delete('delete_info_contacts', [ContactController::class, 'destroy']);

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
Route::delete('delete_user_info/{id}', [UserInfoController::class, 'destroy']);

// Home 
Route::post('creat_home_info', [HomeController::class, 'store']);
Route::get('get_home_info', [HomeController::class, 'index']);
Route::post('update_home_info/{id}', [HomeController::class, 'update']);
Route::delete('delete_home_info/{id}', [HomeController::class, 'destroy']);

// Experiences
Route::post('creat_exp_info', [ExperienceController::class, 'store']);
Route::get('get_exp_info', [ExperienceController::class, 'index']);
Route::post('update_exp_info/{id}', [ExperienceController::class, 'update']);
Route::delete('delete_exp_info/{id}', [ExperienceController::class, 'destroy']);

// Skills 
Route::post('creat_skill_info', [SkillController::class, 'store']);
Route::get('get_skill_info', [SkillController::class, 'index']);
Route::post('update_skill_info/{id}', [SkillController::class, 'update']);
Route::delete('delete_skill_info/{id}', [SkillController::class, 'destroy']);

// Education
Route::post('creat_edu_info', [EducationController::class, 'store']);
Route::get('get_edu_info', [EducationController::class, 'index']);
Route::post('update_edu_info/{id}', [EducationController::class, 'update']);
Route::delete('delete_edu_info/{id}', [Education::class, 'destroy']);

// Portfolio 
Route::post('creat_portfolio_info', [PortfolioController::class, 'store']);
Route::get('get_portfolio_info', [PortfolioController::class, 'index']);
Route::post('update_portfolio_info/{id}', [PortfolioController::class, 'update']);
Route::get('portfolio_detail/{id}', [PortfolioController::class, 'detail']);
Route::delete('delete_portfolio_info/{id}', [PortfolioController::class, 'destroy']);
