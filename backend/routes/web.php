<?php

use Illuminate\Support\Facades\Route;

// use function Pest\Laravel\get;

Route::get('/', function () {
    return view('welcome');
});
