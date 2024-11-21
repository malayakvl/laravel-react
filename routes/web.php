<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/task', [TaskController::class, 'view'])->name('task.list');
    Route::get('/task/add', [TaskController::class, 'add'])->name('task.add');
    Route::get('/task/edit/{id}', [TaskController::class, 'edit'])->name('task.edit');
    Route::get('/task/view/{id}', [TaskController::class, 'viewTask'])->name('task.view');
    Route::post('/task/update', [TaskController::class, 'update'])->name('task.update');
    Route::post('/task/create', [TaskController::class, 'create'])->name('task.create');
    Route::get('/task/share/{id}', [TaskController::class, 'share'])->name('task.share');
    Route::post('/share', [TaskController::class, 'shareSave'])->name('share.save');
});

require __DIR__.'/auth.php';
