"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminError({
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
      <h2 className="text-xl font-semibold text-foreground">Admin Error</h2>
      <p className="text-sm text-muted-foreground">An unexpected error occurred in the admin panel.</p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>Back to Admin</Button>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
