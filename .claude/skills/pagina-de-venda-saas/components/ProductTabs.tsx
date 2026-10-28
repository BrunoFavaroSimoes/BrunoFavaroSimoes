"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { track } from "./track";

export type Tab = { id: string; title: string; benefit: string; image: string; alt: string };

// Demo interativa: cada aba mostra um benefício e troca o screenshot do produto com transição.
export function ProductTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  if (!current) return null;

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center">
      <div role="tablist" aria-orientation="vertical" className="flex gap-2 overflow-x-auto md:flex-col">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            onClick={() => { setActive(t.id); track("demo_tab", { tab: t.id }); }}
            className="relative shrink-0 rounded-2xl p-4 text-left md:p-5"
          >
            {t.id === active && <motion.span layoutId="tab-bg" className="absolute inset-0 rounded-2xl bg-neutral-100" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative z-10 block font-semibold">{t.title}</span>
            <span className="relative z-10 mt-1 hidden text-sm text-neutral-600 md:block">{t.benefit}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 bg-neutral-50 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image src={current.image} alt={current.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover object-top" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
