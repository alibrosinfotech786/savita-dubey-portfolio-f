"use client";

import { useEffect, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

export function withAuth<P extends object>(Component: ComponentType<P>, allowedRoles: string[] = []) {
  return function ProtectedRoute(props: P) {
    const { user, token } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (!token || !user) {
        router.push("/login");
        return;
      }
      
      const effectiveAllowedRoles = allowedRoles.length > 0 ? (allowedRoles.includes("admin") ? [...allowedRoles, "superadmin"] : allowedRoles) : [];

      if (effectiveAllowedRoles.length > 0 && !effectiveAllowedRoles.includes(user.role)) {
        router.push(user.role === "user" ? "/dashboard" : "/");
      }
    }, [user, token, router]);

    if (!token || !user) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    const effectiveAllowedRoles = allowedRoles.length > 0 ? (allowedRoles.includes("admin") ? [...allowedRoles, "superadmin"] : allowedRoles) : [];

    if (effectiveAllowedRoles.length > 0 && !effectiveAllowedRoles.includes(user.role)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    return <Component {...props} />;
  };
}
