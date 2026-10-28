"use client";
import { useEffect, useState } from "react";

type Props = {
  // Prazo REAL e igual para todos os visitantes, em ISO: "2026-11-30T23:59:59-03:00".
  deadline: string;
  label?: string;
  expiredLabel?: string;
  className?: string;
};

function remaining(deadline: number) {
  const diff = Math.max(0, deadline - Date.now());
  return {
    diff,
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff / 3_600_000) % 24),
    m: Math.floor((diff / 60_000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

// Nunca reinicia: quando o prazo acaba, mostra o estado encerrado.
export function CountdownTimer({ deadline, label = "Oferta termina em", expiredLabel = "Oferta encerrada", className }: Props) {
  const target = new Date(deadline).getTime();
  const [t, setT] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    setT(remaining(target));
    const id = setInterval(() => setT(remaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  // Evita mismatch de hidratação: renderiza placeholder com mesma largura no servidor.
  if (!t) return <div className={className} aria-hidden style={{ visibility: "hidden" }}>00d 00h 00m 00s</div>;
  if (t.diff === 0) return <div className={className}>{expiredLabel}</div>;

  const units: [number, string][] = [[t.d, "dias"], [t.h, "horas"], [t.m, "min"], [t.s, "seg"]];
  return (
    <div className={className} role="timer" aria-label={`${label}: ${t.d} dias, ${t.h} horas e ${t.m} minutos`}>
      <span className="mr-3 text-sm opacity-80">{label}</span>
      <span className="inline-flex gap-2" aria-hidden>
        {units.map(([v, u]) => (
          <span key={u} className="flex min-w-[3.25rem] flex-col items-center rounded-lg bg-black/20 px-2 py-1">
            <span className="text-xl font-bold tabular-nums">{String(v).padStart(2, "0")}</span>
            <span className="text-[10px] uppercase tracking-wider opacity-70">{u}</span>
          </span>
        ))}
      </span>
    </div>
  );
}
