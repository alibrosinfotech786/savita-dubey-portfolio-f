"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div 
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`rounded-2xl p-6 transition-shadow duration-300 hover:shadow-2xl ${className}`}
      style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
    >
      {children}
    </motion.div>
  );
}
