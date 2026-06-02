"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { UserNav } from "@/components/UserNav";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/learning-hub", label: "Learning Hub" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  // { href: "/rise-heal", label: "Rise & Heal" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  // Pages that need a solid navbar from the very top (no hero image)
  const isSolidPage = 
    
    pathname.startsWith("/login") || 
    pathname.startsWith("/register") || 
    pathname.startsWith("/blog");

  // Pages with light/solid backgrounds — navbar must always be visible
  const isLightPage = isSolidPage;

  // Determine colors based on scroll, theme, and page type
  const getNavTextColor = () => {
    if (!mounted) return "#ffffff";
    if (scrolled) {
      return theme === "dark" ? "#ffffff" : "#000000";
    }
    // Transparent state
    if (isLightPage && theme !== "dark") return "#000000";
    return "#ffffff";
  };

  const getNavItemColor = (href: string) => {
    if (!mounted) return "#ffffff";
    if (pathname === href) return "var(--accent)";
    if (scrolled) {
      return theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)";
    }
    // Transparent state
    if (isLightPage && theme !== "dark") return "rgba(0,0,0,0.7)";
    return "rgba(255,255,255,0.9)";
  };

  const getThemeButtonBg = () => {
    if (scrolled) {
      return theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
    }
    if (isLightPage && theme !== "dark") return "rgba(0,0,0,0.05)";
    return "rgba(255,255,255,0.1)";
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isSolidPage
          ? (theme === "dark" ? "bg-black/90 backdrop-blur-md" : "bg-white shadow-sm")
          : "bg-transparent"
      }`}
      style={{
        paddingTop: scrolled || isSolidPage ? '0.75rem' : '1.5rem',
        paddingBottom: scrolled || isSolidPage ? '0.75rem' : '1.5rem',
        borderBottom: ((scrolled || isSolidPage) && theme === 'light') ? '1px solid #e5e7eb' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between transition-all duration-300">
          <Link 
            href="/" 
            className="font-serif text-2xl font-bold tracking-tight transition-colors duration-300" 
            style={{ color: getNavTextColor() }}
          >
            Savita Dubey
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-xl text-base font-medium transition-all duration-300"
                style={{
                  color: getNavItemColor(href),
                  background: pathname === href 
                    ? (scrolled ? "var(--accent-light)" : (isLightPage && theme !== "dark" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)"))
                    : "transparent",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {mounted && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-xl transition-all duration-300 backdrop-blur-sm"
                  style={{ 
                    color: getNavTextColor(), 
                    background: getThemeButtonBg()
                  }}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>

                <UserNav />
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-xl transition-all"
              style={{ color: getNavTextColor() }}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t px-4 py-6 space-y-2 mt-2 shadow-xl" 
            style={{ 
              borderColor: "var(--border)", 
              background: theme === "dark" ? "rgba(0,0,0,0.95)" : "#ffffff" 
            }}
          >
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-lg font-medium transition-all"
                style={{
                  color: pathname === href ? "var(--accent)" : (theme === "dark" ? "#ffffff" : "#000000"),
                  background: pathname === href ? "var(--accent-light)" : "transparent",
                }}
              >
                {label}
              </Link>
            ))}
            {!user && (
              <div className="pt-4 border-t border-border mt-4 flex flex-col gap-3 px-2">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full rounded-xl h-12 text-lg">Login</Button>
                </Link>
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 rounded-xl h-12 text-lg">Register</Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
