"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, Loader2 } from "lucide-react";

const tabLabels: Record<string, string> = {
  plans: "My Plans",
  settings: "Settings",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-background"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const { token } = useAuthStore();
  const tab = searchParams.get("tab") ?? "";
  const crumb = tabLabels[tab];
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!token) return;

    api.get('/user')
      .then(({ data }) => {
        const packages = data.packages || [];
        const now = new Date();
        const tenDaysFromNow = new Date();
        tenDaysFromNow.setDate(now.getDate() + 10);

        const expiringSoon = packages.find((p: any) => {
          const expiry = new Date(p.pivot.expires_at);
          return p.pivot.status === 'active' && expiry > now && expiry <= tenDaysFromNow;
        });

        if (expiringSoon) {
          toast.warning(`Your ${expiringSoon.name} subscription expires in less than 10 days!`, {
            description: `Expires on ${new Date(expiringSoon.pivot.expires_at).toLocaleDateString()}`,
            duration: 10000,
          });
        }
      })
      .catch(() => {});
  }, [token]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 bg-background">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border bg-background/95 backdrop-blur px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard" className="text-muted-foreground hover:text-foreground">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {crumb && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-foreground">{crumb}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </header>
          <main className="flex-1 p-6 bg-background text-foreground">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
