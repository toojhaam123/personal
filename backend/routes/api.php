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
Route::prefix('contacts')->group(function () {
    // Gửi liên hệ
    Route::post('/', [ContactController::class, 'store']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [ContactController::class, 'index']);
        Route::get('{id}', [ContactController::class, 'showDetail']);
    });
});

// user và login
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    // Các route cần token 
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'user']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});



// UserInfo / Sidebar
Route::prefix('user-info')->group(function () {
    Route::get('/', [UserInfoController::class, 'index']);

    Route::middleware('auth:sanctum', 'throttle:60,1')->group(function () {
        Route::post('/', [UserInfoController::class, 'store']);
        Route::post('{id}', [UserInfoController::class, 'update']);
        Route::delete('{id}', [UserInfoController::class, 'destroy']);
    });
});

// Home 
Route::prefix('home')->group(function () {
    Route::get('/', [HomeController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('{id}', [HomeController::class, 'update']);
        Route::post('/', [HomeController::class, 'store']);
        Route::delete('/{id}', [HomeController::class, 'destroy']);
    });
});

// Experiences
Route::prefix('experiences')->group(function () {
    Route::get('/', [ExperienceController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [ExperienceController::class, 'store']);
        Route::post('{id}', [ExperienceController::class, 'update']);
        Route::delete('/{id}', [ExperienceController::class, 'destroy']);
    });
});

// Skills 
Route::prefix('skills')->group(function () {
    Route::get('/', [SkillController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [SkillController::class, 'store']);
        Route::post('{id}', [SkillController::class, 'update']);
        Route::delete('{id}', [SkillController::class, 'destroy']);
    });
});

// Education
Route::prefix('educations')->group(function () {
    Route::get('/', [EducationController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [EducationController::class, 'store']);
        Route::post('{id}', [EducationController::class, 'update']);
        Route::delete('{id}', [EducationController::class, 'destroy']);
    });
});

// Portfolio 
Route::prefix('portfolios')->group(function () {
    Route::get('/', [PortfolioController::class, 'index']);
    Route::get('{id}', [PortfolioController::class, 'portfolioDetail']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('', [PortfolioController::class, 'store']);
        Route::post('{id}', [PortfolioController::class, 'update']);
        Route::delete('{id}', [PortfolioController::class, 'destroy']);
    });
});
