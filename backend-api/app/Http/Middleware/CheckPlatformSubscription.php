<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\PlatformSubscription;

class CheckPlatformSubscription
{
    public function handle(Request $request, Closure $next)
    {
        $subscription = PlatformSubscription::first();
        if ($subscription && ($subscription->status === "suspended" || ($subscription->expiry_date && now()->greaterThan($subscription->expiry_date)))) {
            // Only superadmin can bypass the lock. Regular admins and users are blocked.
            if ($request->user("sanctum") && $request->user("sanctum")->role === "superadmin") {
                return $next($request);
            }
            return response()->json(["message" => $subscription->expiry_message ?? "Subscription expired.", "is_expired" => true], 403);
        }
        return $next($request);
    }
}