"use client";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { chaos } from "@/content";

// Posições espalhadas (em % do palco) e rotações de cada "bagunça".
const scatter = [
  { x: -38, y: -30, r: -12 },
  { x: 34, y: -34, r: 9 },
  { x: -42, y: 16, r: 7 },
  { x: 40, y: 12, r: -8 },
  { x: -18, y: 38, r: 14 },
  { x: 22, y: 40, r: -5 },
];

// Assinatura da página: ao rolar, as bagunças se juntam e viram o painel do Brindou.
export function ChaosToOrder() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const panelOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const panelScale = useTransform(scrollYProgress, [0.55, 0.8], [0.85, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.25, 0.4], [1, 0]);
  const resolvedOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  if (reduce) {
    return (
      <section className="bg-night px-5 py-24 text-ivory">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl md:text-6xl">{chaos.title}</h2>
          <p className="mt-4 text-gold">{chaos.resolved}</p>
          <Image src="/img/painel2-proximos-passos.webp" alt="Painel do Brindou" width={1972} height={1000} className="mt-10 rounded-2xl" />
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[260vh] bg-night text-ivory">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,#2c5a4655,transparent)]" />

        <motion.div style={{ opacity: titleOpacity }} className="relative z-0 max-w-3xl px-6 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{chaos.eyebrow}</p>
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.05]">{chaos.title}</h2>
          <p className="mt-5 text-lg text-ivory/70">{chaos.sub}</p>
        </motion.div>

        {chaos.scraps.map((s, i) => (
          <Scrap key={s.label} index={i} progress={scrollYProgress} label={s.label} kind={s.kind} />
        ))}

        <motion.div style={{ opacity: panelOpacity, scale: panelScale }} className="absolute z-20 w-[min(92vw,62rem)] px-2">
          <motion.p style={{ opacity: resolvedOpacity }} className="mb-6 text-center font-display text-3xl italic text-gold md:text-5xl">
            {chaos.resolved}
          </motion.p>
          <div className="overflow-hidden rounded-3xl border border-gold/30 shadow-[0_0_80px_-20px_#e8c98f88]">
            <Image src="/img/painel2-proximos-passos.webp" alt="Painel do Brindou com os próximos passos do casamento" width={1972} height={1000} sizes="(min-width: 1024px) 62rem, 92vw" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Scrap({ index, progress, label, kind }: { index: number; progress: MotionValue<number>; label: string; kind: string }) {
  const s = scatter[index % scatter.length];
  // Cada bagunça flutua um pouco e depois converge para o centro, com leve atraso entre elas.
  const start = 0.1 + index * 0.04;
  const end = 0.55 + index * 0.02;
  const x = useTransform(progress, [0, start, end], [`${s.x * 1.1}vw`, `${s.x}vw`, "0vw"]);
  const y = useTransform(progress, [0, start, end], [`${s.y * 1.1}vh`, `${s.y}vh`, "0vh"]);
  const rotate = useTransform(progress, [0, end], [s.r, 0]);
  const scale = useTransform(progress, [start, end], [1, 0.4]);
  const opacity = useTransform(progress, [0, 0.05, end - 0.05, end], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity }}
      className="absolute z-10 rounded-xl border border-ivory/15 bg-night-2/90 px-3 py-2 text-xs shadow-2xl backdrop-blur md:px-4 md:py-3 md:text-sm"
    >
      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{kind}</span>
      <span className="font-medium">{label}</span>
    </motion.div>
  );
}
