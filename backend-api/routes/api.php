<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PlatformSubscriptionController;
use App\Http\Middleware\EnsureAdmin;
use App\Http\Middleware\EnsureSuperAdmin;
use App\Http\Middleware\CheckPlatformSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/platform-subscription/status', [PlatformSubscriptionController::class, 'status']);

// Public routes
Route::middleware('throttle:10,1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

Route::middleware([CheckPlatformSubscription::class])->group(function () {
    Route::get('/posts',      [PostController::class, 'index']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::get('/packages',   [PackageController::class, 'index']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout',           [AuthController::class, 'logout'])->withoutMiddleware([CheckPlatformSubscription::class]);
        Route::put('/user/password',     [AuthController::class, 'changePassword']);

        Route::get('/user', function (Request $request) {
            return $request->user()->load(['packages' => function ($query) {
                $query->withPivot('payment_id', 'status', 'starts_at', 'expires_at');
            }]);
        });

        // Payments (any authenticated user)
        Route::post('/payments/create-order', [PaymentController::class, 'createOrder']);
        Route::post('/payments/verify',       [PaymentController::class, 'verifyPayment']);
        Route::get('/payments/history',       [PaymentController::class, 'history']);

        // Admin-only routes
        Route::middleware(EnsureAdmin::class)->group(function () {
            Route::post('/posts',          [PostController::class, 'store']);
            Route::put('/posts/{id}',      [PostController::class, 'update']);
            Route::delete('/posts/{id}',   [PostController::class, 'destroy']);

            Route::post('/packages',         [PackageController::class, 'store']);
            Route::put('/packages/{id}',     [PackageController::class, 'update']);
            Route::delete('/packages/{id}',  [PackageController::class, 'destroy']);

            Route::get('/users',              [UserController::class, 'index']);
            Route::post('/users/{id}/ban',     [UserController::class, 'ban']);
            Route::post('/users/{id}/unban',   [UserController::class, 'unban']);
            Route::delete('/users/{id}',       [UserController::class, 'destroy']);
            Route::get('/reports/subscriptions', [UserController::class, 'report']);

            // Platform Subscription Super Admin Only Routes
            Route::middleware(EnsureSuperAdmin::class)->group(function () {
                Route::get('/platform-subscription', [PlatformSubscriptionController::class, 'index']);
                Route::post('/platform-subscription', [PlatformSubscriptionController::class, 'update']);
                Route::get('/platform-subscription/history', [PlatformSubscriptionController::class, 'history']);
            });
        });
    });
});
