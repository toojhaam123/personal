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
    Route::get('{username}', [IntroductionController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [IntroductionController::class, 'storeOrUpdate']);
        Route::delete('{id}', [IntroductionController::class, 'destroy']);
    });
});

// Experiences
Route::prefix('experiences')->group(function () {
    Route::get('{username}', [ExperienceController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [ExperienceController::class, 'storeOrUpdate']);
        Route::delete('{id}', [ExperienceController::class, 'destroy']);
    });
});

// Skills 
Route::prefix('skills')->group(function () {
    Route::get('{username}', [SkillController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [SkillController::class, 'storeOrUpdate']);
        Route::delete('{id}', [SkillController::class, 'destroy']);
    });
});

// Education
Route::prefix('educations')->group(function () {
    Route::get('{username}', [EducationController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [EducationController::class, 'storeOrUpdate']);
        Route::delete('{id}', [EducationController::class, 'destroy']);
    });
});

// Portfolio 
Route::prefix('{username}/portfolios')->group(function () {
    Route::get('/', [PortfolioController::class, 'index']);
    Route::get('{slug}', [PortfolioController::class, 'portfolioDetail']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [PortfolioController::class, 'storeOrUpdate']);
        Route::delete('{id}', [PortfolioController::class, 'destroy']);
    });
});

// Contact and notification
Route::prefix('{username}/contacts')->group(function () {
    // Gửi liên hệ
    Route::post('/', [ContactController::class, 'store']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [ContactController::class, 'index']);
        Route::get('{id}', [ContactController::class, 'detailContact']);
    });
});
