"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { usePlatformStore } from "@/store/platformStore";
import api from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth, user, logout } = useAuthStore();
  const { isExpired } = usePlatformStore();

  useEffect(() => {
    if (user) {
      if (isExpired && user.role !== "superadmin") {
        logout();
        setError("Platform subscription has expired. Only Super Admin can login currently.");
        return;
      }
      router.replace((user.role === "admin" || user.role === "superadmin") ? "/admin/dashboard" : "/dashboard");
    }
  }, [user, router, isExpired, logout]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post('/login', { email, password });
      
      if (isExpired && data.user.role !== "superadmin") {
        setError("Platform subscription has expired. Only Super Admin can login currently.");
        setLoading(false);
        return;
      }

      setAuth(data.user, data.token);
      router.push((data.user.role === "admin" || data.user.role === "superadmin") ? "/admin/dashboard" : "/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <Container className="max-w-md">
        <div className="bg-[var(--surface)] p-8 rounded-2xl border border-[var(--border)] shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 opacity-70">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 opacity-70">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="••••••••"
                required
              />
            </div>
            <Button 
                type="submit" 
                variant="primary" 
                className="w-full py-4 justify-center mt-4"
                disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--border)] text-center text-sm opacity-60">
            <p>Don't have an account? <a href="/register" className="text-[var(--accent)] font-semibold">Register here</a></p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
