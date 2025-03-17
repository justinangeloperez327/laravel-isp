<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PlanController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SubscriptionController;

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
    Route::resource('subscriptions', SubscriptionController::class);
    Route::resource('plans', PlanController::class);
    Route::get('billing', [BillingController::class, 'index'])->name('billing.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
