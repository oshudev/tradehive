<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FreelanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectAssignmentController;
use App\Http\Controllers\ProjectController;
use App\Http\Middleware\EnsureUserIsRole;
use App\Models\Project;
use App\Http\Controllers\ProposalController;
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
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('client.dashboard');

    Route::get('/job-post', [ProjectController::class, 'index'])->name('client.job-post.index');
    Route::post('/job-post/store', [ProjectController::class, 'store'])->name('client.job-post.store'); 
    Route::patch('/job-post/edit', [ProjectController::class, 'update'])->name('client.job-post.update'); 
    Route::delete('/job-post/{project}', [ProjectController::class, 'destroy'])->name('client.project-delete');

    Route::get('/proposals', [ProposalController::class, 'index'])->name('client.proposals.index');
    Route::patch('/proposals/{proposal}/{action}', [ProposalController::class, 'updateStatus'])->name('client.proposals.updateStatus');
    
    Route::get('/all-contracts', [ProjectAssignmentController::class, 'index'])->name('client.project-assignment.index');
    Route::patch('/projects/{project}/cancel', [ProjectController::class, 'cancel'])->name('client.projects.cancel');
});

Route::middleware(['auth', 'verified', EnsureUserIsRole::class.':freelancer'])->group(function() {
    Route::get('/home', [FreelanceController::class, 'index'])->name('freelancer.dashboard');
    Route::get('/home/search', function(Request $request) {
        return Project::search($request->search)->get();
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
