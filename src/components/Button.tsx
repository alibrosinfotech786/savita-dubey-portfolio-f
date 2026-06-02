"use client";

import React from "react";
import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button as ShadcnButton } from "@/components/ui/button";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({ href, onClick, variant = "primary", children, className = "", type = "button", disabled }: ButtonProps) {
  // Map our custom variants to Shadcn variants
  const shadcnVariant = variant === "primary" ? "default" : variant;
  
  const content = (
    <motion.span
      whileHover={{ y: -1 }}
      className="inline-flex items-center w-full justify-center"
    >
      {children}
    </motion.span>
  );

  const buttonElement = (
    <ShadcnButton 
      variant={shadcnVariant} 
      onClick={onClick} 
      disabled={disabled} 
      type={type}
      className={`rounded-full px-6 py-3 transition-all duration-300 ${className} ${variant === 'primary' ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]' : ''}`}
    >
      {content}
    </ShadcnButton>
  );

  if (href) return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="inline-block"
    >
      <Link href={href} className="w-full">
        <ShadcnButton 
          variant={shadcnVariant} 
          className={`rounded-full px-6 py-3 transition-all duration-300 ${className} ${variant === 'primary' ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]' : ''}`}
        >
          {content}
        </ShadcnButton>
      </Link>
    </motion.div>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="inline-block"
    >
      {buttonElement}
    </motion.div>
  );
}

