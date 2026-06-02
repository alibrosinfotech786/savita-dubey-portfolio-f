"use client";

import { useEffect } from "react";
import { usePackageStore } from "@/store/packageStore";
import { withAuth } from "@/components/withAuth";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/Animations";
import PaymentButton from "@/components/PaymentButton";
import { Loader2, Package, CheckCircle2, Star, Zap, Shield } from "lucide-react";

const FEATURE_MAP: Record<string, string[]> = {
  default: [
    "Full content access",
    "Priority email support",
    "Downloadable resources",
    "Certificate of completion",
  ],
};

const ICON_MAP = [
  <Zap key="zap" className="w-6 h-6" />,
  <Star key="star" className="w-6 h-6" />,
  <Shield key="shield" className="w-6 h-6" />,
];

function DashboardPlansPage() {
  const { packages, loading, error, fetchPackages } = usePackageStore();

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "var(--accent)" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>{error}</p>
        <button
          onClick={fetchPackages}
          className="px-6 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "var(--accent)" }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Mark the middle package as "popular" if there are 3+
  const popularIndex = packages.length >= 2 ? Math.floor(packages.length / 2) : -1;

  return (
    <div className="space-y-10">
      {/* Header */}
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
            Pricing
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--foreground)" }}>
            Choose Your Plan
          </h1>
          <p >
            Unlock exclusive content, advisory resources, and professional development tools.
          </p>
        </div>
      </FadeIn>

      {/* Package Cards */}
      {packages.length > 0 ? (
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, i) => {
            const isPopular = i === popularIndex;
            const features = FEATURE_MAP[(pkg as any).slug] ?? FEATURE_MAP.default;
            const icon = ICON_MAP[i % ICON_MAP.length];

            return (
              <StaggerItem key={pkg.id}>
                <div
                  className="relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  style={{
                    background: isPopular ? "var(--accent)" : "var(--card)",
                    border: isPopular ? "none" : "1px solid var(--card-border)",
                    color: isPopular ? "#fff" : "var(--foreground)",
                  }}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white">
                      Most Popular
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-1">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                      style={{
                        background: isPopular ? "rgba(255,255,255,0.15)" : "var(--accent-light)",
                        color: isPopular ? "#fff" : "var(--accent)",
                      }}
                    >
                      {icon}
                    </div>

                    {/* Name */}
                    <h3 className="font-serif text-2xl font-bold mb-1">{pkg.name}</h3>
                    <p
                      className="text-sm mb-6 leading-relaxed"
                     
                    >
                      {pkg.description ?? "Unlock professional resources and strategic guidance."}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="font-serif text-4xl font-bold">₹{pkg.price}</span>
                      <span
                        className="text-sm"
                        
                      >
                        / {pkg.duration_days} days
                      </span>
                    </div>

                    <div
                      className="h-px w-full my-6"
                      style={{ background: isPopular ? "rgba(255,255,255,0.2)" : "var(--border)" }}
                    />

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm">
                          <CheckCircle2
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: isPopular ? "#fff" : "var(--accent)" }}
                          />
                          <span>
                            {f}
                          </span>
                        </li>
                      ))}
                      <li className="flex items-center gap-3 text-sm">
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: isPopular ? "#fff" : "var(--accent)" }}
                        />
                        <span >
                          Access for {pkg.duration_days} days
                        </span>
                      </li>
                    </ul>

                    {/* CTA */}
                    <PaymentButton
                      packageId={pkg.id}
                      amount={pkg.price}
                      packageName={pkg.name}
                      buttonText={`Get ${pkg.name}`}
                      className={`w-full rounded-xl py-3 font-semibold text-sm ${
                        isPopular
                          ? "!bg-white !text-indigo-600 hover:!bg-indigo-50"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </FadeInStagger>
      ) : (
        <FadeIn>
          <div
            className="max-w-md mx-auto p-12 rounded-3xl text-center border border-dashed"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "var(--accent-light)" }}
            >
              <Package className="w-6 h-6" style={{ color: "var(--accent)" }} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
              No packages available
            </h3>
            <p className="text-sm" >
              Check back soon — new plans are being added.
            </p>
          </div>
        </FadeIn>
      )}

      {/* Trust strip */}
      <FadeIn>
        <div
          className="max-w-3xl mx-auto rounded-2xl p-6 flex flex-wrap justify-center gap-8 text-center"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {[
            { label: "Secure Payment", sub: "256-bit SSL encryption" },
            { label: "Instant Access", sub: "Activated immediately" },
            { label: "Razorpay Protected", sub: "PCI-DSS compliant" },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{item.label}</p>
              <p className="text-xs" >{item.sub}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}

export default withAuth(DashboardPlansPage);
