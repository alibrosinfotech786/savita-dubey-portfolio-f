"use client";

import { useEffect, useState } from "react";
import { usePackageStore } from "@/store/packageStore";
import { withAuth } from "@/components/withAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Loader2, Package } from "lucide-react";

const EMPTY = { name: "", price: "", duration_days: "", description: "" };

function PackagesPage() {
  const { packages, loading, fetchPackages, createPackage, updatePackage, deletePackage } = usePackageStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => { 
    fetchPackages(); 
  }, [fetchPackages]);

  const openCreate = () => { setEditId(null); setForm(EMPTY); setDialogOpen(true); };
  const openEdit = (pkg: any) => {
    setEditId(pkg.id);
    setForm({ name: pkg.name, price: String(pkg.price), duration_days: String(pkg.duration_days), description: pkg.description || "" });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const data = { name: form.name, price: Number(form.price), duration_days: Number(form.duration_days), description: form.description };
    const success = editId
      ? await updatePackage(editId, data)
      : await createPackage(data);
    if (success) {
      toast.success(editId ? "Package updated" : "Package created");
      setDialogOpen(false);
      fetchPackages();
    } else {
      toast.error("Failed to save package");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const success = await deletePackage(deleteId);
    if (success) {
      toast.success("Package deleted");
      fetchPackages();
    } else {
      toast.error("Failed to delete package");
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Packages</h1>
          <p className="text-sm text-muted-foreground">Manage subscription plans</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4 mr-1" />New Package</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={5} className="h-32 text-center"><Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" /></TableCell></TableRow>
                  ) : packages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Package className="h-8 w-8" />
                          <p className="text-sm">No packages yet</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : packages.map((pkg: any) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell>₹{pkg.price}</TableCell>
                      <TableCell>{pkg.duration_days} days</TableCell>
                      <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">{pkg.description || "—"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(pkg)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost" size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => setDeleteId(pkg.id)}
                          >
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

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Package" : "New Package"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="pkg-name">Name</Label>
              <Input id="pkg-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Premium Monthly" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pkg-price">Price (₹)</Label>
                <Input id="pkg-price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="9.99" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pkg-days">Duration (days)</Label>
                <Input id="pkg-days" type="number" value={form.duration_days} onChange={(e) => setForm({ ...form, duration_days: e.target.value })} placeholder="30" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pkg-desc">Description</Label>
              <Textarea id="pkg-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="resize-none" placeholder="What's included..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editId ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this package?</AlertDialogTitle>
            <AlertDialogDescription>This will remove the package permanently.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default withAuth(PackagesPage, ["admin"]);
