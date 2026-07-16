"use client";

import { motion } from "framer-motion";

export default function AnimatedSection({ 
  children, 
  className = "",
  delay = 0,
  duration = 0.6,
  yOffset = 30
}: { 
  children: React.ReactNode, 
  className?: string,
  delay?: number,
  duration?: number,
  yOffset?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
