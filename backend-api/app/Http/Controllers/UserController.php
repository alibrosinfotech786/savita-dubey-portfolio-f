<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = min((int) $request->get('per_page', 15), 100);

        $query = User::with(['packages' => function ($q) {
            $q->withPivot('payment_id', 'status', 'starts_at', 'expires_at');
        }])->latest();

        if ($request->user() && $request->user()->role !== 'superadmin') {
            $query->where('role', '!=', 'superadmin');
        }

        return response()->json($query->paginate($perPage));
    }

    public function ban(Request $request, int $id): JsonResponse
    {
        $target = User::findOrFail($id);

        if ($target->role === 'superadmin') {
            return response()->json(['message' => 'Cannot ban a superadmin.'], 403);
        }

        // Admin cannot ban another admin (only superadmin can)
        if ($target->role === 'admin' && $request->user()->role !== 'superadmin') {
            return response()->json(['message' => 'Only superadmin can ban admins.'], 403);
        }

        $target->update(['is_banned' => 1]);
        // Revoke all tokens so they are immediately logged out
        $target->tokens()->delete();

        return response()->json(['message' => 'User banned successfully.']);
    }

    public function unban(int $id): JsonResponse
    {
        $target = User::findOrFail($id);
        $target->update(['is_banned' => 0]);

        return response()->json(['message' => 'User unbanned successfully.']);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $target = User::findOrFail($id);

        if ($target->role === 'superadmin') {
            return response()->json(['message' => 'Cannot delete a superadmin.'], 403);
        }

        if ($target->role === 'admin' && $request->user()->role !== 'superadmin') {
            return response()->json(['message' => 'Only superadmin can delete admins.'], 403);
        }

        $target->tokens()->delete();
        $target->update(['is_deleted' => 1]);

        return response()->json(['message' => 'User deleted successfully.']);
    }

    public function report(Request $request): JsonResponse
    {
        $request->validate([
            'from'       => 'nullable|date',
            'to'         => 'nullable|date',
            'status'     => 'nullable|string|in:success,pending,failed',
            'package_id' => 'nullable|integer|exists:packages,id',
        ]);

        $query = Payment::with(['user:id,name,email', 'package:id,name,price'])
            ->withoutGlobalScope('not_deleted'); // include all for reporting

        if ($request->filled('from')) {
            $query->whereDate('created_at', '>=', $request->from);
        }
        if ($request->filled('to')) {
            $query->whereDate('created_at', '<=', $request->to);
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('package_id')) {
            $query->where('package_id', $request->package_id);
        }

        $payments = $query->latest()->get();

        $totalRevenue   = $payments->where('status', 'success')->sum('amount');
        $totalCount     = $payments->count();
        $successCount   = $payments->where('status', 'success')->count();
        $pendingCount   = $payments->where('status', 'pending')->count();
        $failedCount    = $payments->where('status', 'failed')->count();

        return response()->json([
            'summary' => [
                'total_revenue'  => $totalRevenue,
                'total_count'    => $totalCount,
                'success_count'  => $successCount,
                'pending_count'  => $pendingCount,
                'failed_count'   => $failedCount,
            ],
            'data' => $payments,
        ]);
    }
}
