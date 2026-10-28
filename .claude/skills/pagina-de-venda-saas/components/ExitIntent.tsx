"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "./track";

type Props = {
  children: ReactNode; // conteúdo da oferta (material grátis, demo gravada, desconto REAL)
  minSecondsOnPage?: number;
  storageKey?: string;
};

// Dispara 1x por sessão: mouse saindo pelo topo (desktop) ou scroll rápido para cima (mobile).
export function ExitIntent({ children, minSecondsOnPage = 10, storageKey = "exit-intent-shown" }: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = Date.now();
    let lastY = window.scrollY;
    const alreadyShown = () => {
      try { return sessionStorage.getItem(storageKey) === "1"; } catch { return false; }
    };
    const trigger = () => {
      if (alreadyShown() || Date.now() - start < minSecondsOnPage * 1000) return;
      try { sessionStorage.setItem(storageKey, "1"); } catch {}
      setOpen(true);
      track("exit_intent_shown");
    };
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) trigger();
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (lastY - y > 120 && y < 600 && window.matchMedia("(pointer: coarse)").matches) trigger();
      lastY = y;
    };
    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [minSecondsOnPage, storageKey]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl outline-none"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100"
            >
              ×
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
