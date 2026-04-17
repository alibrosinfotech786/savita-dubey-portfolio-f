"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/learning-hub", label: "Learning Hub" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/rise-heal", label: "Rise & Heal" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pages with light backgrounds even at top
  const isLightPage = pathname === "/rise-heal";

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
        scrolled 
          ? (theme === "dark" ? "bg-black/90 backdrop-blur-md" : "bg-white shadow-sm") 
          : "bg-transparent"
      }`}
      style={{
        paddingTop: scrolled ? '0.75rem' : '1.5rem',
        paddingBottom: scrolled ? '0.75rem' : '1.5rem',
        borderBottom: (scrolled && theme === 'light') ? '1px solid #e5e7eb' : 'none'
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
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-xl transition-all duration-300 backdrop-blur-sm"
                style={{ 
                  color: getNavTextColor(), 
                  background: getThemeButtonBg()
                }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button
              className="md:hidden p-2 rounded-xl transition-all"
              style={{ color: getNavTextColor() }}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
