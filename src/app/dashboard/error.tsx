"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log to an error reporting service in production
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
      <h2 className="text-xl font-semibold text-foreground">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">An unexpected error occurred. Please try again.</p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
