"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalBlogAnnouncement from "@/components/GlobalBlogAnnouncement";
import { usePlatformStore } from "@/store/platformStore";
import { useAuthStore } from "@/store/authStore";

const DASHBOARD_PREFIXES = ["/dashboard", "/admin"];

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isExpired } = usePlatformStore();
  const { user } = useAuthStore();
  const isDashboard = DASHBOARD_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // If subscription is expired and user is not superadmin, hide shell (Navbar/Footer)
  if (isExpired && (!user || user.role !== "superadmin")) {
    return <main className="flex-1">{children}</main>;
  }

  if (isDashboard) return <>{children}</>;

  return (
    <>
      <Navbar />
      <GlobalBlogAnnouncement />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
