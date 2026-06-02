"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { withAuth } from "@/components/withAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Loader2, Users, Search, ChevronLeft, ChevronRight, ShieldOff, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";

const PER_PAGE = 15;

type ConfirmAction = { type: "ban" | "unban" | "delete"; userId: number; userName: string } | null;

function UsersPage() {
  const { users, loading, usersTotal, usersLastPage, usersCurrentPage, fetchUsers, banUser, unbanUser, deleteUser } = useUserStore();
  const { user: currentUser } = useAuthStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [confirm, setConfirm] = useState<ConfirmAction>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchUsers(page, PER_PAGE);
  }, [page, fetchUsers]);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const from = (usersCurrentPage - 1) * PER_PAGE + 1;
  const to = Math.min(usersCurrentPage * PER_PAGE, usersTotal);

  const handleConfirm = async () => {
    if (!confirm) return;
    setActionLoading(true);
    let result: { success: boolean; message: string };
    if (confirm.type === "ban") result = await banUser(confirm.userId);
    else if (confirm.type === "unban") result = await unbanUser(confirm.userId);
    else result = await deleteUser(confirm.userId);

    if (result.success) toast.success(result.message);
    else toast.error(result.message);
    setActionLoading(false);
    setConfirm(null);
  };

  const canActOn = (target: any) => {
    if (target.role === "superadmin") return false;
    if (target.role === "admin" && currentUser?.role !== "superadmin") return false;
    return true;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">{usersTotal} registered members</p>
      </div>

      <Card>
        <div className="p-4 border-b">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search current page..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active Plan</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center">
                        <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ) : filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Users className="h-8 w-8" />
                          <p className="text-sm">No users found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filtered.map((user: any) => {
                    const now = new Date();
                    const activePkg = user.packages?.find(
                      (p: any) =>
                        p.pivot?.status === "active" &&
                        p.pivot?.expires_at &&
                        new Date(p.pivot.expires_at) > now
                    );
                    const isBanned = !!user.is_banned;
                    const actionsAllowed = canActOn(user);

                    return (
                      <TableRow key={user.id} className={isBanned ? "opacity-60" : ""}>
                        <TableCell className="font-medium whitespace-nowrap">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground whitespace-nowrap">{user.email}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge variant={(user.role === "admin" || user.role === "superadmin") ? "default" : "secondary"} className="capitalize">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {isBanned ? (
                            <Badge variant="destructive">Banned</Badge>
                          ) : (
                            <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
                          )}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {activePkg ? (
                            <Badge variant="outline">{activePkg.name}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                          {user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          {actionsAllowed && (
                            <div className="flex items-center justify-end gap-1">
                              {isBanned ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setConfirm({ type: "unban", userId: user.id, userName: user.name })}
                                >
                                  <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Unban
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                                  onClick={() => setConfirm({ type: "ban", userId: user.id, userName: user.name })}
                                >
                                  <ShieldOff className="h-3.5 w-3.5 mr-1" /> Ban
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive border-destructive hover:bg-destructive/10"
                                onClick={() => setConfirm({ type: "delete", userId: user.id, userName: user.name })}
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>

        {usersLastPage > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {from}–{to} of {usersTotal} users
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || loading}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <span className="text-sm text-muted-foreground px-1">
                Page {usersCurrentPage} of {usersLastPage}
              </span>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(usersLastPage, p + 1))} disabled={page === usersLastPage || loading}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      <AlertDialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirm?.type === "ban" && "Ban User"}
              {confirm?.type === "unban" && "Unban User"}
              {confirm?.type === "delete" && "Delete User"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirm?.type === "ban" && `Ban "${confirm.userName}"? They will be immediately logged out and cannot log in.`}
              {confirm?.type === "unban" && `Unban "${confirm?.userName}"? They will be able to log in again.`}
              {confirm?.type === "delete" && `Permanently delete "${confirm?.userName}"? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={actionLoading}
              className={confirm?.type === "delete" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : confirm?.type === "ban" ? "bg-yellow-600 hover:bg-yellow-700 text-white" : ""}
            >
              {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : confirm?.type === "ban" ? "Ban" : confirm?.type === "unban" ? "Unban" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default withAuth(UsersPage, ["admin"]);
