"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Button from "@/components/Button";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";

export default function AdminSettingsPage() {
    const { updatePassword } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const result = await updatePassword(
            formData.current_password,
            formData.new_password,
            formData.new_password_confirmation,
        );
        if (result.success) {
            toast.success(result.message);
            setFormData({ current_password: "", new_password: "", new_password_confirmation: "" });
        } else {
            toast.error(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
                <p className="text-muted-foreground">Manage your administrative account security.</p>
            </div>

            <Card className="p-4 border-none shadow-md">
                <CardHeader className="flex flex-row items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold">Change Password</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">Ensure your admin account is using a long, random password to stay secure.</CardDescription>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Current Password</label>
                            <input
                                type="password"
                                required
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                value={formData.current_password}
                                onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">New Password</label>
                            <input
                                type="password"
                                required
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                value={formData.new_password}
                                onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Confirm New Password</label>
                            <input
                                type="password"
                                required
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                value={formData.new_password_confirmation}
                                onChange={(e) => setFormData({ ...formData, new_password_confirmation: e.target.value })}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Password"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
