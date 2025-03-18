<?php

use App\Http\Controllers\BillingController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PlanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('customers', CustomerController::class);
    Route::resource('invoices', InvoiceController::class);
    Route::resource('devices', DeviceController::class);
    Route::resource('plans', PlanController::class);

    Route::get('billing', [BillingController::class, 'index'])->name('billing.index');
    Route::get('billing/{billing}/edit', [BillingController::class, 'edit'])->name('billing.edit');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
