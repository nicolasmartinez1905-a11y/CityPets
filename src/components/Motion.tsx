"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function PageTransition({ children, className }: MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ children, className, delay = 0 }: MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.34, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export const MotionArticle = motion.article;
export const MotionButton = motion.button;
