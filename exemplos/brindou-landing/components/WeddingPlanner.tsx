"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarHeart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { links, pricing } from "@/content";
import { track } from "./sales/track";

// Fases típicas de planejamento (sugestão geral, não regra).
const phases = [
  { minDays: 365, title: "Base do casamento", items: ["Definir orçamento total", "Primeira lista de convidados", "Reservar local e data"] },
  { minDays: 270, title: "Fornecedores principais", items: ["Buffet, foto e vídeo", "Decoração e música", "Comparar propostas no funil"] },
  { minDays: 180, title: "Site e save the date", items: ["Publicar o site do casamento", "Avisar a data aos convidados", "Lista de presentes"] },
  { minDays: 90, title: "Convites", items: ["Mandar os convites por família", "Acompanhar quem confirmou", "Provas de roupa"] },
  { minDays: 30, title: "Reta final", items: ["Fechar lista com restrições", "Exportar lista para o buffet", "Quitar parcelas pendentes"] },
  { minDays: 0, title: "Semana do sim", items: ["Cronograma do dia", "Últimos pagamentos", "Brindar"] },
];

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const toInput = (d: Date) => d.toISOString().slice(0, 10);

export function WeddingPlanner() {
  const [date, setDate] = useState<string>("");
  const [budget, setBudget] = useState(50_000);

  // A data padrão é calculada no cliente para não divergir da renderização estática.
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 300);
    setDate(toInput(d));
  }, []);

  const days = useMemo(() => {
    if (!date) return null;
    const target = new Date(`${date}T12:00:00`).getTime();
    return Math.max(0, Math.ceil((target - Date.now()) / 86_400_000));
  }, [date]);

  const phaseIndex = days === null ? 0 : phases.findIndex((p) => days >= p.minDays);
  const plus = pricing.plans.find((p) => p.id === "plus")!;
  const share = (plus.total / budget) * 100;

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-line bg-paper shadow-[0_30px_70px_-30px_rgba(15,35,26,0.35)] lg:grid-cols-[1fr_1.15fr]">
      <div className="space-y-8 p-7 md:p-10">
        <label className="block">
          <span className="flex items-center gap-2 text-sm font-semibold text-green">
            <CalendarHeart className="h-4 w-4 text-wine" aria-hidden /> Data do casamento
          </span>
          <input
            type="date"
            value={date}
            min={toInput(new Date())}
            onChange={(e) => {
              setDate(e.target.value);
              track("planner_date_set");
            }}
            className="mt-3 w-full rounded-xl border border-line bg-ivory px-4 py-3 text-lg text-green outline-none focus:border-green focus:ring-2 focus:ring-gold"
          />
        </label>

        <label className="block">
          <span className="flex justify-between text-sm font-semibold text-green">
            Orçamento total <span className="tabular-nums text-wine">{brl(budget)}</span>
          </span>
          <input
            type="range"
            min={10_000}
            max={300_000}
            step={5_000}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            onPointerUp={() => track("planner_budget_set", { budget })}
            className="mt-4 w-full accent-[#8b1738]"
          />
        </label>

        <div className="rounded-2xl bg-sage-soft p-5 text-sm text-green">
          O plano Plus custa <strong>{plus.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong> por casamento:{" "}
          <strong className="text-wine">{share.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%</strong> do seu orçamento.
          O Essencial é grátis.
        </div>
      </div>

      <div className="relative bg-green p-7 text-ivory md:p-10">
        <p className="text-sm text-ivory/70">Faltam</p>
        <div className="flex items-baseline gap-3">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={days ?? "x"}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-display text-7xl tabular-nums text-gold md:text-8xl"
            >
              {days ?? "—"}
            </motion.span>
          </AnimatePresence>
          <span className="text-xl">dias</span>
        </div>

        <ol className="mt-8 space-y-3">
          {phases.map((p, i) => {
            const state = i < phaseIndex ? "past" : i === phaseIndex ? "now" : "next";
            return (
              <li
                key={p.title}
                className={`rounded-2xl border px-4 py-3 transition-all duration-500 ${
                  state === "now" ? "border-gold bg-night-2 shadow-[0_0_40px_-10px_#e8c98f88]" : state === "past" ? "border-transparent opacity-35" : "border-ivory/10 opacity-70"
                }`}
              >
                <span className="flex items-center justify-between text-sm font-semibold">
                  {p.title}
                  {state === "now" && <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] uppercase tracking-wider text-night">agora</span>}
                </span>
                {state === "now" && (
                  <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 space-y-1 text-sm text-ivory/80">
                    {p.items.map((it) => (
                      <li key={it}>✦ {it}</li>
                    ))}
                  </motion.ul>
                )}
              </li>
            );
          })}
        </ol>

        <a
          href={links.signup}
          data-cta="planner"
          onClick={() => track("cta_click", { cta: "planner", days: days ?? 0 })}
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-6 font-semibold text-[var(--cta-foreground)] transition hover:brightness-110"
        >
          Montar nosso plano de {days ?? ""} dias <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}
