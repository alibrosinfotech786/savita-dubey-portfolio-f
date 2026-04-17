"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const fadeVariants: Variants = {
  hidden: (dir: string) => ({
    opacity: 0,
    y: dir === "up" ? 32 : dir === "down" ? -32 : 0,
    x: dir === "left" ? 32 : dir === "right" ? -32 : 0,
    scale: dir === "scale" ? 0.92 : 1,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease },
  },
};

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  viewport?: { once?: boolean; amount?: number };
}

export const FadeIn = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.55,
  className = "",
  style,
  viewport = { once: true, amount: 0.15 },
}: FadeInProps) => (
  <motion.div
    custom={direction}
    variants={fadeVariants}
    initial="hidden"
    whileInView="visible"
    viewport={viewport}
    transition={{ duration, delay, ease }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

export const FadeInStagger = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    variants={{
      ...staggerContainer,
      visible: {
        transition: { staggerChildren: 0.12, delayChildren: delay },
      },
    }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    className={className}
  >
    {children}
  </motion.div>
);

/** Wrap individual items inside FadeInStagger */
export const StaggerItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div variants={staggerItem} className={className}>
    {children}
  </motion.div>
);

/** Horizontal reveal line / divider */
export const RevealLine = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <motion.div
    initial={{ scaleX: 0, originX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7, ease }}
    className={className}
    style={style}
  />
);

/** Counter number animation */
export const CountUp = ({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) => (
  <motion.span
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease }}
    className={className}
  >
    {value}
    {suffix}
  </motion.span>
);
