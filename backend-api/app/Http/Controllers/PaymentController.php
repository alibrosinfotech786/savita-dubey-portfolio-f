<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Package;
use App\Models\UserPackage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Razorpay\Api\Api;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    private Api $razorpayApi;

    public function __construct()
    {
        $this->razorpayApi = new Api(
            config('services.razorpay.key'),
            config('services.razorpay.secret')
        );
    }

    /**
     * Step 1 — Create a Razorpay order and persist a pending Payment record.
     */
    public function createOrder(Request $request): JsonResponse
    {
        $request->validate([
            'package_id' => 'required|exists:packages,id',
        ]);

        $package = Package::findOrFail($request->package_id);
        $user    = $request->user();

        try {
            $orderData = [
                'receipt'         => 'rcpt_' . time() . '_' . $user->id,
                'amount'          => (int) ($package->price * 100), // paise
                'currency'        => 'INR',
                'payment_capture' => 1,
            ];

            $razorpayOrder = $this->razorpayApi->order->create($orderData);

            $payment = Payment::create([
                'user_id'           => $user->id,
                'package_id'        => $package->id,
                'razorpay_order_id' => $razorpayOrder['id'],
                'amount'            => $package->price,
                'currency'          => 'INR',
                'status'            => 'pending',
            ]);

            return response()->json([
                'success'      => true,
                'order_id'     => $razorpayOrder['id'],
                'amount'       => $orderData['amount'],
                'key'          => config('services.razorpay.key'),
                'package_name' => $package->name,
                'user_name'    => $user->name,
                'user_email'   => $user->email,
            ]);

        } catch (Exception $e) {
            Log::error('Razorpay createOrder failed', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'error' => 'Could not create payment order. Please try again.'], 500);
        }
    }

    /**
     * Step 2 — Verify Razorpay signature and activate the user's package.
     */
    public function verifyPayment(Request $request): JsonResponse
    {
        $request->validate([
            'razorpay_order_id'   => 'required|string',
            'razorpay_payment_id' => 'required|string',
            'razorpay_signature'  => 'required|string',
        ]);

        try {
            $this->razorpayApi->utility->verifyPaymentSignature([
                'razorpay_order_id'   => $request->razorpay_order_id,
                'razorpay_payment_id' => $request->razorpay_payment_id,
                'razorpay_signature'  => $request->razorpay_signature,
            ]);
        } catch (Exception $e) {
            Payment::where('razorpay_order_id', $request->razorpay_order_id)
                   ->update(['status' => 'failed']);

            Log::warning('Razorpay signature verification failed', [
                'order_id' => $request->razorpay_order_id,
                'error'    => $e->getMessage(),
            ]);

            return response()->json(['success' => false, 'error' => 'Payment verification failed. Please contact support.'], 400);
        }

        try {
            DB::transaction(function () use ($request) {
                $payment = Payment::where('razorpay_order_id', $request->razorpay_order_id)
                                  ->firstOrFail();

                $payment->update([
                    'razorpay_payment_id' => $request->razorpay_payment_id,
                    'razorpay_signature'  => $request->razorpay_signature,
                    'status'              => 'success',
                ]);

                $package = Package::findOrFail($payment->package_id);

                UserPackage::create([
                    'user_id'    => $payment->user_id,
                    'package_id' => $payment->package_id,
                    'payment_id' => $payment->id,
                    'status'     => 'active',
                    'starts_at'  => now(),
                    'expires_at' => now()->addDays($package->duration_days),
                ]);
            });

            return response()->json(['success' => true, 'message' => 'Payment verified and access granted.']);

        } catch (Exception $e) {
            Log::error('Failed to activate package after payment', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'error' => 'Payment received but activation failed. We will resolve this shortly.'], 500);
        }
    }

    /**
     * Return the authenticated user's payment history.
     */
    public function history(Request $request): JsonResponse
    {
        $payments = Payment::where('user_id', $request->user()->id)
                           ->with('package:id,name,price')
                           ->latest()
                           ->get();

        return response()->json(['success' => true, 'data' => $payments]);
    }
}
