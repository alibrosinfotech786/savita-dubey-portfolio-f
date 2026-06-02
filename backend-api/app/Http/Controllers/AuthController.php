<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $subscription = \App\Models\PlatformSubscription::first();
        if ($subscription && ($subscription->status === 'suspended' || ($subscription->expiry_date && now()->greaterThan($subscription->expiry_date)))) {
            return response()->json([
                'message' => $subscription->expiry_message ?? 'Subscription expired. Cannot register at this time.',
                'is_expired' => true
            ], 403);
        }

        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'user',
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'token'   => $user->createToken('auth_token')->plainTextToken,
            'user'    => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,
            ],
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if ($user->is_banned) {
            return response()->json(['message' => 'Your account has been banned. Please contact support.', 'is_banned' => true], 403);
        }

        $subscription = \App\Models\PlatformSubscription::first();
        if ($subscription && ($subscription->status === 'suspended' || ($subscription->expiry_date && now()->greaterThan($subscription->expiry_date)))) {
            if ($user->role !== 'superadmin') {
                return response()->json([
                    'message' => $subscription->expiry_message ?? 'Subscription expired.',
                    'is_expired' => true
                ], 403);
            }
        }

        return response()->json([
            'token' => $user->createToken('auth_token')->plainTextToken,
            'user'  => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password'         => 'required|string|min:6|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 422);
        }

        $user->update(['password' => Hash::make($request->password)]);
        return response()->json(['message' => 'Password changed successfully']);
    }
}
