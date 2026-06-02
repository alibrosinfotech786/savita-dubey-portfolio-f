"use client";

import { useEffect } from "react";
import { useUserStore, UserPackage, PaymentRecord } from "@/store/userStore";
import { withAuth } from "@/components/withAuth";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/Animations";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard, Calendar, CheckCircle2, Package, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function PlansPage() {
  const { plans, payments, loading, fetchUserPlans, fetchPaymentHistory } = useUserStore();

  useEffect(() => {
    fetchUserPlans();
    fetchPaymentHistory();
  }, [fetchUserPlans, fetchPaymentHistory]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--accent)" }} />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <FadeIn>
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
            My Plans
          </h1>
          <p className="text-muted-foreground">Manage your active subscriptions and billing history.</p>
        </div>
      </FadeIn>

      {/* Active Plans */}
      <FadeIn>
        <h2 className="font-serif text-xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          Active Subscriptions
        </h2>
      </FadeIn>

      {plans.length > 0 ? (
        <FadeInStagger className="grid gap-4">
          {plans.map((plan) => {
            const status = plan.pivot?.status ?? "active";
            const expiresAt = plan.pivot?.expires_at ?? null;
            const isActive = status === "active";

            return (
              <StaggerItem key={plan.id ?? (plan as any).package_id}>
                <div
                  className="rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                    >
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-lg font-bold" style={{ color: "var(--foreground)" }}>
                          {plan.name || "Standard Plan"}
                        </h3>
                        <Badge
                          variant={isActive ? "default" : "secondary"}
                          className={isActive ? "bg-green-500/10 text-green-600 border-green-200" : ""}
                        >
                          {isActive ? (
                            <><CheckCircle2 className="w-3 h-3 mr-1" /> Active</>
                          ) : (
                            status.toUpperCase()
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground" >
                        Subscription #{plan.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-8">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-1 text-muted-foreground" >
                        <CreditCard className="w-3.5 h-3.5" /> Amount
                      </div>
                      <p className="font-bold text-lg" style={{ color: "var(--foreground)" }}>
                        ₹{plan.price}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-1 text-muted-foreground" >
                        <Calendar className="w-3.5 h-3.5" /> Expires
                      </div>
                      <p className="font-bold" style={{ color: "var(--foreground)" }}>
                        {expiresAt ? format(new Date(expiresAt), "dd MMM yyyy") : "Permanent"}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </FadeInStagger>
      ) : (
        <FadeIn>
          <div
            className="rounded-3xl p-12 text-center border border-dashed"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "var(--accent-light)" }}
            >
              <Package className="w-6 h-6" style={{ color: "var(--accent)" }} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
              No active plans
            </h3>
            <p className="text-sm mb-6 text-muted-foreground" >
              You haven&apos;t purchased any packages yet.
            </p>
            <Link
              href="/dashboard/plans-purchase"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: "var(--accent)" }}
            >
              Browse Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      )}

      {/* Payment History */}
      {payments.length > 0 && (
        <>
          <FadeIn>
            <h2 className="font-serif text-xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
              Payment History
            </h2>
          </FadeIn>
          <FadeInStagger>
            <div
              className="rounded-2xl overflow-hidden border bg-card"
            >
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
                    {["Package", "Amount", "Status", "Date", "Order ID"].map((h) => (
                      <TableHead key={h} className="px-5 h-12 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id} className="border-b last:border-0 hover:bg-muted/20">
                      <TableCell className="px-5 py-4 font-medium text-foreground">
                        {p.package?.name ?? "—"}
                      </TableCell>
                      <TableCell className="px-5 py-4 font-semibold text-foreground">
                        ₹{p.amount}
                      </TableCell>
                      <TableCell className="px-5 py-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-xs font-bold border-none",
                            p.status === "success" 
                              ? "bg-green-500/10 text-green-600" 
                              : p.status === "pending" 
                              ? "bg-yellow-500/10 text-yellow-600" 
                              : "bg-red-500/10 text-red-600"
                          )}
                        >
                          {p.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-muted-foreground">
                        {format(new Date(p.created_at), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell className="px-5 py-4 font-mono text-xs text-muted-foreground">
                        {p.razorpay_order_id}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </FadeInStagger>
        </>
      )}
    </div>
  );
}

export default withAuth(PlansPage);
