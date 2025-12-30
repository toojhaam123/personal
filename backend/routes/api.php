<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\IntroductionController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\UserController;

// user và login
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    // Các route cần token 
    Route::middleware('auth:sanctum', 'throttle:60,1')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

// users
Route::prefix('users')->group(function () {
    // Lấy tất cả người dung
    Route::get("/", [UserController::class, 'index']);
    // Lấy chi tiết người dùng
    Route::get("{username}", [UserController::class, 'userDetail']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post("/", [UserController::class, "update"]);
        Route::delete('/', [UserController::class, "destroy"]);
    });
});

// Giới thiệu (introduction)
Route::prefix('introductions')->group(function () {
    Route::get('/', [IntroductionController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [IntroductionController::class, 'store']);
        Route::post('{id}', [IntroductionController::class, 'update']);
        Route::delete('{id}', [IntroductionController::class, 'destroy']);
    });
});

// Experiences
Route::prefix('experiences')->group(function () {
    Route::get('/', [ExperienceController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [ExperienceController::class, 'store']);
        Route::post('{id}', [ExperienceController::class, 'update']);
        Route::delete('{id}', [ExperienceController::class, 'destroy']);
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

// Contact and notification
Route::prefix('contacts')->group(function () {
    // Gửi liên hệ
    Route::post('/', [ContactController::class, 'store']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [ContactController::class, 'index']);
        Route::get('{id}', [ContactController::class, 'showDetail']);
    });
});
