<?php 
namespace App\Http\Controllers; 
use Illuminate\Http\Request; 
use App\Models\PlatformSubscription; 
use App\Models\PlatformSubscriptionHistory; 

class PlatformSubscriptionController extends Controller { 
    public function status() { 
        $sub = PlatformSubscription::first(); 
        if (!$sub) return response()->json(['is_expired' => false]); 
        $isExpired = $sub->status === 'suspended' || ($sub->expiry_date && now()->greaterThan($sub->expiry_date)); 
        return response()->json([
            'is_expired' => $isExpired, 
            'expiry_message' => $sub->expiry_message, 
            'payment_instructions' => $sub->payment_instructions, 
            'expiry_date' => $sub->expiry_date, 
            'remaining_days' => $sub->expiry_date ? now()->diffInDays($sub->expiry_date, false) : null
        ]); 
    } 

    public function index() { 
        return response()->json(PlatformSubscription::first() ?? []); 
    } 

    public function update(Request $request) { 
        $val = $request->validate([
            'expiry_date' => 'nullable|date', 
            'status' => 'required|string|in:active,suspended', 
            'expiry_message' => 'nullable|string', 
            'payment_instructions' => 'nullable|string'
        ]); 
        $sub = PlatformSubscription::first(); 
        if (!$sub) { 
            $sub = PlatformSubscription::create([...$val, 'updated_by' => $request->user()->id]); 
        } else { 
            $sub->update([...$val, 'updated_by' => $request->user()->id]); 
        } 
        PlatformSubscriptionHistory::create([
            'platform_subscription_id' => $sub->id, 
            'action' => 'updated', 
            'details' => json_encode($val), 
            'performed_by' => $request->user()->id
        ]); 
        return response()->json($sub); 
    } 

    public function history() { 
        return response()->json(PlatformSubscriptionHistory::orderBy('id', 'desc')->get()); 
    } 
}