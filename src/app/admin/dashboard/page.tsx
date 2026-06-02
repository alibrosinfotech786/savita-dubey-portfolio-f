"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBlogStore } from "@/store/blogStore";
import { usePackageStore } from "@/store/packageStore";
import { useUserStore } from "@/store/userStore";
import { withAuth } from "@/components/withAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Package, Plus, Edit, Trash2, Loader2, Users as UsersIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "overview";

  const { posts: blogs, loading, fetchPosts, deletePost } = useBlogStore();
  const { packages, fetchPackages } = usePackageStore();
  const { users, fetchUsers } = useUserStore();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts(1, 100);
    fetchPackages();
    fetchUsers();
  }, [fetchPosts, fetchPackages, fetchUsers]);

  const handleDelete = async () => {
    if (!deleteId) return;
    const success = await deletePost(deleteId);
    if (success) {
      toast.success("Post deleted");
      fetchPosts(1, 100);
    } else {
      toast.error("Failed to delete post");
    }
    setDeleteId(null);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );

  // Overview Tab
  if (tab === "overview") {
    const stats = [
      { title: "Total Posts", value: blogs.length, icon: FileText, desc: "Published & drafts" },
      { title: "Packages", value: packages.length, icon: Package, desc: "Active plans" },
      { title: "Users", value: users.length, icon: UsersIcon, desc: "Registered" },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your platform content.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <Card key={s.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">{s.title}</CardTitle>
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-card-foreground">Recent Posts</CardTitle>
              <CardDescription>Latest blog articles</CardDescription>
            </div>
            <Button size="sm" onClick={() => router.push("/admin/dashboard/posts/create")}>
              <Plus className="h-4 w-4 mr-1" />New Post
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">Title</TableHead>
                      <TableHead className="text-foreground">Category</TableHead>
                      <TableHead className="text-foreground">Type</TableHead>
                      <TableHead className="text-foreground">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogs.slice(0, 5).map((blog: any) => (
                      <TableRow key={blog.id}>
                        <TableCell className="font-medium text-foreground max-w-[200px] truncate">{blog.title}</TableCell>
                        <TableCell className="text-muted-foreground">{blog.category}</TableCell>
                        <TableCell>
                          <Badge variant={blog.is_premium ? "default" : "secondary"}>
                            {blog.is_premium ? "Premium" : "Free"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{new Date(blog.created_at).toLocaleDateString()}</TableCell>
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

  // Posts Tab
  if (tab === "posts") {
    const filtered = blogs.filter((p) => p.title?.toLowerCase().includes(search.toLowerCase()));

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Posts</h1>
            <p className="text-sm text-muted-foreground">{blogs.length} total articles</p>
          </div>
          <Button onClick={() => router.push("/admin/dashboard/posts/create")}>
            <Plus className="h-4 w-4 mr-1" />New Post
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-8 bg-background text-foreground"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">Title</TableHead>
                      <TableHead className="text-foreground">Category</TableHead>
                      <TableHead className="text-foreground">Type</TableHead>
                      <TableHead className="text-foreground">Date</TableHead>
                      <TableHead className="text-right text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((post: any) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium text-foreground max-w-[240px] truncate">{post.title}</TableCell>
                        <TableCell className="text-muted-foreground">{post.category}</TableCell>
                        <TableCell>
                          <Badge variant={post.is_premium ? "default" : "secondary"}>
                            {post.is_premium ? "Premium" : "Free"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{new Date(post.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push(`/admin/dashboard/posts/edit?id=${post.id}`)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => setDeleteId(post.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this post?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  // Packages Tab
  if (tab === "packages") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Packages</h1>
            <p className="text-sm text-muted-foreground">Manage subscription plans</p>
          </div>
          <Button onClick={() => router.push("/admin/dashboard/packages")}>
            <Plus className="h-4 w-4 mr-1" />New Package
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg: any) => (
            <Card key={pkg.id}>
              <CardHeader>
                <CardTitle className="text-card-foreground">{pkg.name}</CardTitle>
                <div className="text-2xl font-bold text-foreground">
                  ₹{pkg.price}
                  <span className="text-sm font-normal text-muted-foreground">/{pkg.duration_days}d</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{pkg.description || "—"}</p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => router.push("/admin/dashboard/packages")}>
                  Manage
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Users Tab
  if (tab === "users") {
    const filtered = users.filter((u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground">{users.length} registered members</p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8 bg-background text-foreground"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-foreground">Name</TableHead>
                  <TableHead className="text-foreground">Email</TableHead>
                  <TableHead className="text-foreground">Role</TableHead>
                  <TableHead className="text-foreground">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={(user.role === "admin" || user.role === "superadmin") ? "default" : "secondary"} className="capitalize">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}

export default withAuth(AdminDashboard, ["admin"]);
