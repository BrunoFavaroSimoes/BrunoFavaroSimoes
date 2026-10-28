"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { track } from "./track";

export type RoiInput = { key: string; label: string; min: number; max: number; step: number; default: number; unit?: string };

type Props = {
  inputs: RoiInput[];
  // Fórmula de economia/ganho mensal em R$, explicada em `formulaText` para transparência.
  compute: (v: Record<string, number>) => number;
  formulaText: string;
  planPrice: number; // preço mensal do plano recomendado
  ctaHref: string;
};

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function RoiCalculator({ inputs, compute, formulaText, planPrice, ctaHref }: Props) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(inputs.map((i) => [i.key, i.default])),
  );
  const result = useMemo(() => Math.max(0, Math.round(compute(values))), [compute, values]);
  const paybackDays = result > 0 ? Math.max(1, Math.ceil((planPrice / result) * 30)) : null;

  return (
    <div className="grid gap-8 rounded-3xl border border-black/10 bg-white p-6 shadow-xl md:grid-cols-2 md:p-10">
      <div className="space-y-6">
        {inputs.map((i) => (
          <label key={i.key} className="block">
            <span className="flex justify-between text-sm font-medium">
              {i.label}
              <span className="tabular-nums text-[var(--cta)]">
                {values[i.key].toLocaleString("pt-BR")} {i.unit}
              </span>
            </span>
            <input
              type="range"
              min={i.min}
              max={i.max}
              step={i.step}
              value={values[i.key]}
              onChange={(e) => setValues((v) => ({ ...v, [i.key]: Number(e.target.value) }))}
              onPointerUp={() => track("roi_calculated", { value: result })}
              className="mt-3 w-full accent-[var(--cta)]"
            />
          </label>
        ))}
        <p className="text-xs text-neutral-500">{formulaText}</p>
      </div>

      <div className="flex flex-col justify-center rounded-2xl bg-neutral-950 p-8 text-white">
        <span className="text-sm opacity-70">Você economiza por mês</span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={result}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1 block text-5xl font-bold tabular-nums"
          >
            {brl(result)}
          </motion.span>
        </AnimatePresence>
        <span className="mt-2 text-sm opacity-80">
          {brl(result * 12)} por ano{paybackDays && ` • o plano se paga em ${paybackDays} dia${paybackDays > 1 ? "s" : ""}`}
        </span>
        <a
          href={ctaHref}
          data-cta="roi"
          onClick={() => track("cta_click", { cta: "roi", value: result })}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--cta)] px-6 font-semibold text-[var(--cta-foreground)]"
        >
          Quero economizar {brl(result)}/mês
        </a>
      </div>
    </div>
  );
}
