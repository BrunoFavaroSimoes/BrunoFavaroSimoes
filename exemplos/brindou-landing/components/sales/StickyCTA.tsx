"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { track } from "./track";

type Props = {
  href: string;
  label: string;
  note?: string; // ex.: "14 dias grátis • sem cartão"
  showAfterId: string; // id do elemento do hero; a barra aparece quando ele sai da tela
  hideOnIds?: string[]; // ids de seções onde a barra some (pricing, CTA final)
};

export function StickyCTA({ href, label, note, showAfterId, hideOnIds = [] }: Props) {
  const [pastHero, setPastHero] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(showAfterId);
    const visible = new Set<string>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target.id === showAfterId) setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0);
        else e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id);
      }
      setHidden(visible.size > 0);
    });
    if (hero) io.observe(hero);
    hideOnIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAfterId, hideOnIds.join(",")]);

  const show = pastHero && !hidden;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/90 p-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] md:inset-x-auto md:bottom-6 md:right-6 md:rounded-2xl md:border md:shadow-2xl"
        >
          <div className="mx-auto flex max-w-md items-center gap-3">
            {note && <p className="hidden text-xs text-muted sm:block">{note}</p>}
            <a
              href={href}
              data-cta="sticky"
              onClick={() => track("cta_click", { cta: "sticky" })}
              className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-[var(--cta)] px-6 font-semibold text-[var(--cta-foreground)]"
            >
              {label}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
