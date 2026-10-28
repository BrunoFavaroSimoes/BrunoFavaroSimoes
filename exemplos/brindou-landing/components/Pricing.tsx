"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { pricing } from "@/content";
import { track } from "./sales/track";

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

export function Pricing() {
  const [installments, setInstallments] = useState(true);

  return (
    <div>
      <div className="mx-auto mb-14 flex w-fit items-center gap-1 rounded-full border border-line bg-paper p-1" role="radiogroup" aria-label="Forma de pagamento">
        {[true, false].map((inst) => (
          <button
            key={String(inst)}
            role="radio"
            aria-checked={installments === inst}
            onClick={() => {
              setInstallments(inst);
              track("pricing_toggle", { installments: inst });
            }}
            className={`relative rounded-full px-5 py-2 text-sm font-medium ${installments === inst ? "text-ivory" : "text-green"}`}
          >
            {installments === inst && <motion.span layoutId="pay-pill" className="absolute inset-0 rounded-full bg-green" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            <span className="relative z-10">{inst ? "Em 12x" : "À vista"}</span>
          </button>
        ))}
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {pricing.plans.map((p) => {
          const price = p.total === 0 ? "Grátis" : installments ? `12x ${brl(p.installment)}` : brl(p.total);
          const perDay = p.total > 0 ? (p.total / 365).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : null;
          return (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-[2rem] p-8 ${p.primary ? "pricing-beam text-ivory shadow-2xl lg:-my-5 lg:py-12" : "border border-line bg-paper"}`}
            >
              <span
                className={`absolute -top-3 left-8 rounded-full px-3 py-1 text-xs font-semibold ${p.primary ? "bg-gold text-night" : "border border-line bg-ivory text-muted"}`}
              >
                {p.status}
              </span>
              <h3 className={`font-display text-3xl ${p.primary ? "text-gold" : "text-green"}`}>{p.name}</h3>
              <p className={`mt-1 text-sm ${p.primary ? "text-ivory/70" : "text-muted"}`}>{p.tagline}</p>

              <div className="mt-7 h-16 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={price}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-4xl tabular-nums"
                  >
                    {price}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className={`text-xs ${p.primary ? "text-ivory/60" : "text-muted"}`}>
                {p.total === 0 ? "Sem cartão de crédito" : `por casamento, 12 meses • cerca de ${perDay} por dia`}
              </p>

              <ul className="mt-7 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.primary ? "text-gold" : "text-green-2"}`} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={p.href}
                data-cta={`pricing-${p.id}`}
                onClick={() => track("cta_click", { cta: `pricing-${p.id}` })}
                className={`mt-9 inline-flex min-h-12 items-center justify-center rounded-full px-6 font-semibold transition ${
                  p.primary ? "bg-[var(--cta)] text-[var(--cta-foreground)] hover:brightness-110" : "border border-green text-green hover:bg-green hover:text-ivory"
                }`}
              >
                {p.cta}
              </a>
            </div>
          );
        })}
      </div>
      <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted">{pricing.sub}</p>
    </div>
  );
}
