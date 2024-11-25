<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Middleware\EnsureUserIsRole;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('client')->middleware(['auth', 'verified', EnsureUserIsRole::class.':client'])->group(function() {
    Route::get('/dashboard', function () {
        return Inertia::render('Client/Dashboard');
    })->name('client.dashboard');
    Route::get('/job-post', function () {
        return Inertia::render('Client/JobPost');
    })->name('client.job-post');
    Route::post('/job-post/store', [ProjectController::class, 'store'])->name('client.job-post.store');
});

Route::prefix('freelancer')->middleware(['auth', 'verified', EnsureUserIsRole::class.':freelancer'])->group(function() {
    Route::get('/dashboard', function() {
        return "Test";
    })->name('freelancer.dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
