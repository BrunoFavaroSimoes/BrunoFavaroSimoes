"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Wallet } from "lucide-react";
import { hero, links } from "@/content";
import { MagneticButton } from "./sales/MagneticButton";
import { TiltCard } from "./sales/TiltCard";
import { track } from "./sales/track";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const words = hero.headlineA;
  const accentDelay = 0.15 + words.length * 0.07;

  return (
    <section id="hero" className="grain relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-gold-soft/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 rounded-full bg-sage-soft blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-20">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-wine">
            <span aria-hidden>✦</span> {hero.eyebrow}
          </p>

          {/* A headline aparece já no primeiro paint (só transform anima) para não atrasar o LCP. */}
          <h1 className="font-display text-[clamp(2.75rem,6vw,4.9rem)] leading-[0.98] tracking-tight text-green">
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="mr-[0.22em] inline-block"
                initial={reduce ? false : { y: "0.5em", opacity: 0.01 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.07 }}
              >
                {w}
              </motion.span>
            ))}
            <span className="relative inline-block italic text-wine">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "0.5em", opacity: 0.01 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease, delay: accentDelay }}
              >
                {hero.headlineAccent}
              </motion.span>
              <svg aria-hidden viewBox="0 0 400 24" className="absolute -bottom-3 left-0 h-4 w-full text-gold" preserveAspectRatio="none">
                <motion.path
                  d="M4 16 C 90 4, 200 22, 396 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease, delay: accentDelay + 0.35 }}
                />
              </svg>
            </span>
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: accentDelay + 0.2 }}
          >
            {hero.sub}
          </motion.p>

          {/* CTA entra por último: o olho termina nele. */}
          <motion.div
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: accentDelay + 0.45 }}
          >
            <MagneticButton href={links.signup} cta="hero" className="bg-[var(--cta)] text-lg text-[var(--cta-foreground)] shadow-[0_14px_34px_-12px_#8b1738cc]">
              {hero.cta} <ArrowRight className="h-5 w-5" aria-hidden />
            </MagneticButton>
            <a
              href={links.example}
              data-cta="hero-example"
              onClick={() => track("cta_click", { cta: "hero-example" })}
              className="inline-flex min-h-12 items-center gap-2 px-2 font-medium text-green underline decoration-gold decoration-2 underline-offset-8 hover:text-wine"
            >
              {hero.secondary}
            </a>
          </motion.div>
          <motion.p
            className="mt-5 text-sm text-muted"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: accentDelay + 0.7 }}
          >
            {hero.note}
          </motion.p>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
          initial={reduce ? false : { opacity: 0, y: 60, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
        >
          <TiltCard max={7}>
            <div className="overflow-hidden rounded-[1.75rem] border border-line bg-paper p-2 shadow-[0_40px_80px_-30px_rgba(15,35,26,0.45)]">
              <div className="flex items-center gap-1.5 px-3 pb-2 pt-1" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
              </div>
              <Image src="/img/painel-convite.webp" alt="Convite digital do Brindou com confirmação de presença" width={1972} height={1168} priority className="rounded-2xl" sizes="(min-width: 1024px) 45vw, 90vw" />
            </div>
          </TiltCard>

          <FloatingCard className="-left-4 top-[58%] sm:-left-10" delay={1.4}>
            <CheckCircle2 className="h-5 w-5 text-green-2" aria-hidden />
            <span>
              <strong className="block text-green">Família Andrade confirmou</strong>
              <span className="text-muted">4 pessoas • 1 vegetariana</span>
            </span>
          </FloatingCard>
          <FloatingCard className="-right-2 -top-6 sm:-right-8" delay={1.7}>
            <Wallet className="h-5 w-5 text-gold-deep" aria-hidden />
            <span>
              <strong className="block text-green">Buffet: 60% pago</strong>
              <span className="text-muted">próxima parcela em 12 dias</span>
            </span>
          </FloatingCard>

          <Image src="/img/aneis.webp" alt="" aria-hidden width={1100} height={1000} className="float pointer-events-none absolute -bottom-14 -right-6 w-36 drop-shadow-2xl sm:w-48" />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({ children, className, delay }: { children: React.ReactNode; className: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute z-10 flex items-center gap-3 rounded-2xl border border-line bg-paper/95 px-4 py-3 text-sm shadow-xl backdrop-blur ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}
