"use client";

import { useEffect, useState } from "react";
import { useUserStore, ReportFilters } from "@/store/userStore";
import { usePackageStore } from "@/store/packageStore";
import { withAuth } from "@/components/withAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, IndianRupee, TrendingUp, CheckCircle2, Clock, XCircle, RotateCcw } from "lucide-react";

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  success: "default",
  pending: "secondary",
  failed: "destructive",
};

function ReportsPage() {
  const { reportData, reportSummary, reportLoading, fetchReport } = useUserStore();
  const { packages, fetchPackages } = usePackageStore();

  const [filters, setFilters] = useState<ReportFilters>({});

  useEffect(() => {
    fetchPackages();
    fetchReport({});
  }, [fetchPackages, fetchReport]);

  const handleApply = () => fetchReport(filters);

  const handleReset = () => {
    setFilters({});
    fetchReport({});
  };

  const set = (key: keyof ReportFilters, val: string) =>
    setFilters((f) => ({ ...f, [key]: val || undefined }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Subscription Reports</h1>
        <p className="text-sm text-muted-foreground">Overview of all subscription purchases</p>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4 flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-end">
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <label className="text-xs text-muted-foreground">From</label>
            <Input type="date" className="w-full sm:w-40" value={filters.from ?? ""} onChange={(e) => set("from", e.target.value)} />
          </div>
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <label className="text-xs text-muted-foreground">To</label>
            <Input type="date" className="w-full sm:w-40" value={filters.to ?? ""} onChange={(e) => set("to", e.target.value)} />
          </div>
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <label className="text-xs text-muted-foreground">Status</label>
            <Select value={filters.status ?? "all"} onValueChange={(v) => set("status", v === "all" || !v ? "" : v)}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="All">
                  {filters.status ? (filters.status.charAt(0).toUpperCase() + filters.status.slice(1)) : "All"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <label className="text-xs text-muted-foreground">Package</label>
            <Select value={filters.package_id ?? "all"} onValueChange={(v) => set("package_id", v === "all" || !v ? "" : v)}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="All Packages">
                  {filters.package_id 
                    ? packages.find(p => String(p.id) === filters.package_id)?.name 
                    : "All Packages"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Packages</SelectItem>
                {packages.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 w-full sm:w-auto sm:mt-auto">
            <Button onClick={handleApply} disabled={reportLoading} className="flex-1 sm:flex-none">
              {reportLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
            </Button>
            <Button variant="outline" onClick={handleReset} disabled={reportLoading} className="flex-1 sm:flex-none">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      {reportSummary && (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 flex items-center gap-3">
            <IndianRupee className="h-8 w-8 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Total Revenue</p>
              <p className="text-lg sm:text-xl text-center font-bold">₹{reportSummary.total_revenue.toLocaleString()}</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-blue-500 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Total Orders</p>
              <p className="text-lg sm:text-xl text-center font-bold">{reportSummary.total_count}</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-green-500 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Successful</p>
              <p className="text-lg sm:text-xl text-center font-bold">{reportSummary.success_count}</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center justify-center gap-3">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1 text-yellow-500">
                <Clock className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-semibold">{reportSummary.pending_count} Pending</span>
              </div>
              <div className="flex items-center gap-1 text-destructive">
                <XCircle className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-semibold">{reportSummary.failed_count} Failed</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Razorpay Order ID</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center">
                        <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ) : reportData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center text-muted-foreground text-sm">
                        No records found for the selected filters.
                      </TableCell>
                    </TableRow>
                  ) : reportData.map((p, i) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-muted-foreground text-sm whitespace-nowrap">{i + 1}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="font-medium text-sm">{p.user?.name ?? "—"}</div>
                        <div className="text-xs text-muted-foreground">{p.user?.email ?? ""}</div>
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap">{p.package?.name ?? "—"}</TableCell>
                      <TableCell className="font-medium whitespace-nowrap">₹{Number(p.amount).toLocaleString()}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant={statusVariant[p.status] ?? "outline"} className="capitalize">{p.status}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground font-mono whitespace-nowrap">{p.razorpay_order_id}</TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(p.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(ReportsPage, ["admin"]);
