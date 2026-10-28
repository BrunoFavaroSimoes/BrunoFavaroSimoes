"use client";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { track } from "./track";

type Props = {
  href: string;
  cta: string; // identificador para analytics, ex.: "hero"
  children: ReactNode;
  className?: string;
  strength?: number;
};

// CTA que "puxa" em direção ao cursor (desktop) e tem brilho passando periodicamente.
export function MagneticButton({ href, cta, children, className = "", strength = 0.35 }: Props) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      data-cta={cta}
      onClick={() => track("cta_click", { cta })}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 font-semibold ${className}`}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {!reduce && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 blur-sm animate-[shine_4s_ease-in-out_infinite]"
        />
      )}
    </motion.a>
  );
}

/* Adicione ao tailwind.config (theme.extend.keyframes):
   shine: { "0%, 60%": { transform: "translateX(0)" }, "100%": { transform: "translateX(450%)" } }
*/
