"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { track } from "./track";

export type Plan = {
  id: string;
  name: string;
  description: string;
  monthly: number; // preço por mês no plano mensal
  yearly: number; // preço por mês quando pago anualmente
  perSeat?: boolean;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
  ctaHref: string;
};

type Props = {
  plans: Plan[];
  seats?: { min: number; max: number; default: number }; // slider de usuários (opcional)
  yearlyBadge?: string; // ex.: "2 meses grátis"
  anchorText?: string; // ancoragem, ex.: "Contratar um assistente custa R$ 2.500/mês"
  guarantee?: string;
};

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function PricingInteractive({ plans, seats, yearlyBadge = "2 meses grátis", anchorText, guarantee }: Props) {
  const [yearly, setYearly] = useState(true);
  const [n, setN] = useState(seats?.default ?? 1);

  return (
    <div>
      {anchorText && <p className="mb-6 text-center text-neutral-500 line-through decoration-red-500/60">{anchorText}</p>}

      <div className="mx-auto mb-10 flex w-fit items-center gap-1 rounded-full bg-neutral-100 p-1" role="radiogroup" aria-label="Período de cobrança">
        {[false, true].map((y) => (
          <button
            key={String(y)}
            role="radio"
            aria-checked={yearly === y}
            onClick={() => { setYearly(y); track("pricing_toggle", { yearly: y }); }}
            className="relative rounded-full px-5 py-2 text-sm font-medium"
          >
            {yearly === y && <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-white shadow" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            <span className="relative z-10">
              {y ? "Anual" : "Mensal"}
              {y && <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">{yearlyBadge}</span>}
            </span>
          </button>
        ))}
      </div>

      {seats && (
        <label className="mx-auto mb-10 block max-w-md">
          <span className="flex justify-between text-sm font-medium">
            Usuários <span className="tabular-nums">{n}</span>
          </span>
          <input type="range" min={seats.min} max={seats.max} value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-2 w-full accent-[var(--cta)]" />
        </label>
      )}

      <div className="grid items-stretch gap-6 md:grid-cols-3">
        {plans.map((p) => {
          const price = (yearly ? p.yearly : p.monthly) * (p.perSeat ? n : 1);
          return (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-3xl p-8 ${
                p.highlighted ? "pricing-beam bg-neutral-950 text-white shadow-2xl md:-my-4 md:py-12" : "border border-black/10 bg-white"
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--cta)] px-3 py-1 text-xs font-semibold text-[var(--cta-foreground)]">
                  Mais popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm opacity-70">{p.description}</p>
              <div className="mt-6 flex items-baseline gap-1 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={price}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-5xl font-bold tabular-nums"
                  >
                    {brl(price)}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm opacity-70">/mês</span>
              </div>
              {yearly && <p className="mt-1 text-xs opacity-60">cobrado anualmente ({brl(price * 12)})</p>}
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><span aria-hidden className="text-emerald-500">✓</span>{f}</li>
                ))}
              </ul>
              <a
                href={p.ctaHref}
                data-cta={`pricing-${p.id}`}
                onClick={() => track("cta_click", { cta: `pricing-${p.id}`, yearly })}
                className={`mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-6 font-semibold ${
                  p.highlighted ? "bg-[var(--cta)] text-[var(--cta-foreground)]" : "border border-current"
                }`}
              >
                {p.ctaLabel}
              </a>
            </div>
          );
        })}
      </div>
      {guarantee && <p className="mt-8 text-center text-sm text-neutral-600">🛡️ {guarantee}</p>}
    </div>
  );
}

/* Borda com "beam" animado no plano destacado — adicione ao globals.css:
@property --beam-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
.pricing-beam { border: 1px solid transparent;
  background: linear-gradient(#0a0a0a,#0a0a0a) padding-box,
    conic-gradient(from var(--beam-angle), transparent 70%, var(--cta) 85%, transparent) border-box;
  animation: beam 4s linear infinite; }
@keyframes beam { to { --beam-angle: 360deg; } }
@media (prefers-reduced-motion: reduce) { .pricing-beam { animation: none; } }
*/
