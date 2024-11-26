<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DashboardController;
use App\Http\Middleware\EnsureUserIsRole;
use App\Models\Project;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
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
    Route::get('/dashboard', [DashboardController::class, 'freelancer_index'])->name('freelancer.dashboard');
    Route::get('/dashboard/search', function(Request $request) {
        return Project::search($request->search)->get();
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
