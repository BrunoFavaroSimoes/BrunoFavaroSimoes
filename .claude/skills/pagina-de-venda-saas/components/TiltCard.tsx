"use client";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

// Inclina em 3D seguindo o mouse — ideal para o mockup do produto no hero.
export function TiltCard({ children, max = 10, className = "" }: { children: ReactNode; max?: number; className?: string }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={() => { px.set(0.5); py.set(0.5); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
