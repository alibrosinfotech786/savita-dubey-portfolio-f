"use client";

import { useState } from "react";
import Script from "next/script";
import { toast } from "sonner";
import { Loader2, CreditCard } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

interface PaymentButtonProps {
  packageId: number;
  amount: number;
  packageName: string;
  buttonText?: string;
  className?: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: { name: string; email: string };
  theme: { color: string };
  modal: { ondismiss: () => void };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: { error: { description: string } }) => void) => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export default function PaymentButton({
  packageId,
  amount,
  packageName,
  buttonText = "Purchase Now",
  className = "",
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuthStore();
  const router = useRouter();

  const handlePayment = async () => {
    if (!token) {
      toast.error("Please log in to purchase a package.");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      // ── Step 1: Create Razorpay order on backend ──────────────────────────
      const response = await api.post('/payments/create-order', { package_id: packageId });
      const orderData = response.data;

      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to create payment order.");
      }

      // ── Step 2: Open Razorpay checkout ────────────────────────────────────
      const options: RazorpayOptions = {
        key: orderData.key,
        amount: orderData.amount,          // already in paise from backend
        currency: "INR",
        name: "Savita Dubey Platform",
        description: `Purchase: ${packageName}`,
        order_id: orderData.order_id,

        handler: async (response: RazorpayResponse) => {
          // ── Step 3: Verify signature on backend ──────────────────────────
          try {
            const verifyResponse = await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            const verifyData = verifyResponse.data;

            if (verifyData.success) {
              toast.success("Payment successful! Access granted.");
              router.push("/dashboard/plans");
              router.refresh();
            } else {
              toast.error(verifyData.error || "Payment verification failed.");
            }
          } catch (err: any) {
            toast.error(err.response?.data?.message || "Verification request failed. Contact support.");
          } finally {
            setLoading(false);
          }
        },

        prefill: {
          name: orderData.user_name ?? user?.name ?? "",
          email: orderData.user_email ?? user?.email ?? "",
        },
        theme: { color: "#6366F1" },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response) => {
        toast.error(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      rzp.open();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Button
        onClick={handlePayment}
        disabled={loading}
        className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-6 py-3 text-sm transition-all duration-200 ${className}`}
        style={{
          background: "var(--accent)",
          color: "#fff",
        }}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4" />
            {buttonText}
          </>
        )}
      </Button>
    </>
  );
}
