"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export type Activity = { id: string; text: string; time: string }; // ex.: "Clínica em Curitiba assinou o Pro", "há 4 min"

type Props = {
  // Endpoint que retorna atividades REAIS e anonimizadas (ex.: alimentado por webhook do Stripe).
  // Nunca invente nomes ou compras: isso é publicidade enganosa.
  endpoint: string;
  intervalMs?: number;
  visibleMs?: number;
  maxShows?: number;
};

export function SocialProofToast({ endpoint, intervalMs = 20_000, visibleMs = 5_000, maxShows = 5 }: Props) {
  const [items, setItems] = useState<Activity[]>([]);
  const [current, setCurrent] = useState<Activity | null>(null);

  useEffect(() => {
    fetch(endpoint)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Activity[]) => setItems(Array.isArray(data) ? data.slice(0, maxShows) : []))
      .catch(() => setItems([]));
  }, [endpoint, maxShows]);

  useEffect(() => {
    if (items.length === 0) return;
    let i = 0;
    let hideTimer: ReturnType<typeof setTimeout>;
    const show = () => {
      if (i >= items.length) return clearInterval(loop);
      setCurrent(items[i++]);
      hideTimer = setTimeout(() => setCurrent(null), visibleMs);
    };
    const first = setTimeout(show, 8_000);
    const loop = setInterval(show, intervalMs);
    return () => {
      clearTimeout(first);
      clearTimeout(hideTimer);
      clearInterval(loop);
    };
  }, [items, intervalMs, visibleMs]);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-24 left-4 z-30 md:bottom-6">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="pointer-events-auto flex max-w-xs items-center gap-3 rounded-2xl border border-black/10 bg-white p-3 text-sm shadow-xl"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span>
              <span className="block font-medium text-neutral-900">{current.text}</span>
              <span className="text-xs text-neutral-500">{current.time}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
