"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { usePackageStore } from "@/store/packageStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { withAuth } from "@/components/withAuth";
import { CreditCard, User, Loader2, Lock, Package as PackageIcon } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function UserDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "overview";

  const { plans, loading, fetchUserPlans, updatePassword } = useUserStore();
  const { packages, fetchPackages } = usePackageStore();

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    fetchUserPlans();
    if (tab === "plans") fetchPackages();
  }, [tab, fetchUserPlans, fetchPackages]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setChangingPassword(true);
    const result = await updatePassword(currentPassword, newPassword, confirmPassword);
    if (result.success) {
      toast.success(result.message);
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } else {
      toast.error(result.message);
    }
    setChangingPassword(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );

  const now = new Date();
  const activePackage = plans
    ?.filter((p: any) => new Date(p.pivot?.expires_at) > now)
    ?.sort((a: any, b: any) => new Date(b.pivot.expires_at).getTime() - new Date(a.pivot.expires_at).getTime())[0];

  // Overview Tab
  if (tab === "overview") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back, {user?.name}</h1>
          <p className="text-sm text-foreground">Your subscription and account overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <CreditCard className="h-4 w-4" /> Current Plan
              </CardTitle>
              <CardDescription>Your active subscription</CardDescription>
            </CardHeader>
            <CardContent>
              {activePackage ? (
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div>
                    <p className="font-semibold text-foreground">{activePackage.name}</p>
                    <p className="text-sm text-foreground mt-0.5">
                      Expires {activePackage.pivot.expires_at ? new Date(activePackage.pivot.expires_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "N/A"}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">Active</Badge>
                </div>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <p className="text-foreground text-sm">No active subscription.</p>
                  <Button onClick={() => router.push("/dashboard/plans-purchase")}>Browse Plans</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <User className="h-4 w-4" /> Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-foreground uppercase tracking-wide mb-0.5">Name</p>
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
              </div>
              <div>
                <p className="text-xs text-foreground uppercase tracking-wide mb-0.5">Email</p>
                <p className="text-sm font-medium text-foreground">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs text-foreground uppercase tracking-wide mb-0.5">Role</p>
                <Badge variant="secondary" className="capitalize">{user?.role}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">Subscription History</CardTitle>
            <CardDescription>All your past and current plans</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {plans?.length > 0 ? (
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-foreground">Package</TableHead>
                        <TableHead className="text-foreground">Start Date</TableHead>
                        <TableHead className="text-foreground">Expiry Date</TableHead>
                        <TableHead className="text-foreground">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plans.map((pkg: any, idx: number) => {
                        const isExpired = new Date(pkg.pivot.expires_at) < now;
                        const isActive = pkg.pivot.status === 'active' && !isExpired;
                        return (
                          <TableRow key={idx}>
                            <TableCell className="font-medium text-foreground whitespace-nowrap">{pkg.name}</TableCell>
                            <TableCell className="text-foreground whitespace-nowrap">{new Date(pkg.pivot.starts_at).toLocaleDateString()}</TableCell>
                            <TableCell className="text-foreground whitespace-nowrap">{new Date(pkg.pivot.expires_at).toLocaleDateString()}</TableCell>
                            <TableCell className="whitespace-nowrap">
                              <Badge variant={isActive ? "default" : "secondary"}>
                                {isActive ? "Active" : isExpired ? "Expired" : pkg.pivot.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <p className="text-center py-12 text-sm text-foreground">No purchase history found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Plans Tab
  if (tab === "plans") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Available Plans</h1>
          <p className="text-sm text-foreground">Choose a subscription plan that fits your needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg: any) => (
            <Card key={pkg.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <PackageIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-card-foreground">{pkg.name}</CardTitle>
                </div>
                <div className="text-3xl font-bold text-foreground">
                  ₹{pkg.price}
                  <span className="text-sm font-normal text-foreground">/{pkg.duration_days} days</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-foreground mb-4">{pkg.description || "Full access to all premium content."}</p>
                <Button className="w-full" onClick={() => toast.info("Payment integration coming soon")}>
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Settings Tab
  if (tab === "settings") {
    return (
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
          <p className="text-sm text-foreground">Manage your account preferences.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Lock className="h-4 w-4" /> Change Password
            </CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current" className="text-foreground">Current Password</Label>
                <Input
                  id="current"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="bg-background text-foreground"
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="new" className="text-foreground">New Password</Label>
                <Input
                  id="new"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-background text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-foreground">Confirm New Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-background text-foreground"
                />
              </div>
              <Button type="submit" disabled={changingPassword} className="w-full">
                {changingPassword ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {changingPassword ? "Changing..." : "Change Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}

export default withAuth(UserDashboard, ["user", "admin"]);
