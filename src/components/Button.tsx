"use client";

import React from "react";
import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
}

const base = "inline-flex items-center justify-center font-medium rounded-full px-6 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)]";

const variants = {
  primary: "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-lg hover:shadow-indigo-500/25",
  outline: "border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white",
  ghost: "text-[var(--accent)] hover:bg-[var(--accent-light)]",
};

export default function Button({ href, onClick, variant = "primary", children, className = "", type = "button" }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  
  const content = (
    <motion.span
      whileHover={{ y: -1 }}
      className="inline-flex items-center"
    >
      {children}
    </motion.span>
  );

  if (href) return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link href={href} className={cls}>{content}</Link>
    </motion.div>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <button type={type} onClick={onClick} className={cls}>{content}</button>
    </motion.div>
  );
}

