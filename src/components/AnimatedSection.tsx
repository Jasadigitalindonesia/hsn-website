"use client";

import { motion } from "framer-motion";

export default function AnimatedSection({ 
  children, 
  className = "",
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  xOffset = 0,
  scale = 1,
  animation = "fade-up" // fade-up, fade-in, scale-up, slide-left, slide-right
}: { 
  children: React.ReactNode, 
  className?: string,
  delay?: number,
  duration?: number,
  yOffset?: number,
  xOffset?: number,
  scale?: number,
  animation?: "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right"
}) {
  
  let initial = {};
  let whileInView = {};

  switch (animation) {
    case "fade-in":
      initial = { opacity: 0 };
      whileInView = { opacity: 1 };
      break;
    case "scale-up":
      initial = { opacity: 0, scale: 0.8 };
      whileInView = { opacity: 1, scale: 1 };
      break;
    case "slide-left":
      initial = { opacity: 0, x: 50 };
      whileInView = { opacity: 1, x: 0 };
      break;
    case "slide-right":
      initial = { opacity: 0, x: -50 };
      whileInView = { opacity: 1, x: 0 };
      break;
    case "fade-up":
    default:
      initial = { opacity: 0, y: yOffset };
      whileInView = { opacity: 1, y: 0 };
      break;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }} // Apple-style spring easing
      className={className}
    >
      {children}
    </motion.div>
  );
}
