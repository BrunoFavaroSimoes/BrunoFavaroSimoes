import Image from "next/image";
import { ArrowRight, Gift, HeartHandshake, ShieldCheck, Smartphone } from "lucide-react";
import { announcement, demoTabs, exitOffer, faq, features, finalCta, guarantees, hero, links, pricing, steps, templates, testimonials } from "@/content";
import { Hero } from "@/components/Hero";
import { ChaosToOrder } from "@/components/ChaosToOrder";
import { WeddingPlanner } from "@/components/WeddingPlanner";
import { Pricing } from "@/components/Pricing";
import { Reveal } from "@/components/sales/Reveal";
import { ProductTabs } from "@/components/sales/ProductTabs";
import { StickyCTA } from "@/components/sales/StickyCTA";
import { ExitIntent } from "@/components/sales/ExitIntent";
import { MagneticButton } from "@/components/sales/MagneticButton";

const guaranteeIcons = [Gift, HeartHandshake, ShieldCheck, Smartphone];

function SectionTitle({ eyebrow, title, sub, light }: { eyebrow: string; title: React.ReactNode; sub?: string; light?: boolean }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.25em] ${light ? "text-gold" : "text-wine"}`}>{eyebrow}</p>
      <h2 className={`font-display text-[clamp(2.1rem,4.5vw,3.75rem)] leading-[1.05] ${light ? "text-ivory" : "text-green"}`}>{title}</h2>
      {sub && <p className={`mt-5 text-lg ${light ? "text-ivory/70" : "text-muted"}`}>{sub}</p>}
    </Reveal>
  );
}

export default function Page() {
  return (
    <>
      <div className="bg-green px-4 py-2.5 text-center text-sm text-ivory">
        <span className="mr-2 text-gold" aria-hidden>✦</span>
        {announcement}
      </div>

      <header className="sticky top-0 z-30 border-b border-line/70 bg-ivory/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#hero" className="font-display text-2xl text-green">
            Brindou<span className="text-wine">.</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-green md:flex">
            <a href="#como-funciona" className="hover:text-wine">Como funciona</a>
            <a href="#modelos" className="hover:text-wine">Modelos de site</a>
            <a href="#planos" className="hover:text-wine">Planos</a>
            <a href="#duvidas" className="hover:text-wine">Dúvidas</a>
          </div>
          <a href={links.signup} data-cta="nav" className="rounded-full border border-green px-4 py-2 text-sm font-semibold text-green transition hover:bg-green hover:text-ivory">
            Começar grátis
          </a>
        </nav>
      </header>

      <main>
        <Hero />

        {/* Prova rápida: o que o Essencial já entrega, em marquee. */}
        <section aria-label="Funcionalidades incluídas no plano grátis" className="marquee overflow-hidden border-y border-line bg-paper py-5">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
            {[...features, ...features].map((f, i) => (
              <span key={i} aria-hidden={i >= features.length} className="flex items-center gap-10 font-display text-xl italic text-green">
                {f} <span className="not-italic text-gold">✦</span>
              </span>
            ))}
          </div>
        </section>

        <ChaosToOrder />

        <section id="como-funciona" className="px-5 py-28 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="O painel do casal" title={<>Tudo o que importa, <em className="text-wine">sem caçar em lugar nenhum.</em></>} sub="Cliquem em cada área e vejam o Brindou por dentro." />
            <Reveal>
              <ProductTabs tabs={demoTabs} />
            </Reveal>

            <div className="mt-28 grid gap-6 md:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.1} className="group relative rounded-[2rem] border border-line bg-paper p-8 transition duration-500 hover:-translate-y-1 hover:shadow-xl">
                  <span className="font-display text-6xl italic text-gold transition group-hover:text-wine">{s.n}</span>
                  <h3 className="mt-4 font-display text-2xl text-green">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="modelos" className="overflow-hidden bg-champagne px-5 py-28 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Site do casamento" title={<>Quatro modelos. <em className="text-wine">Um deles tem a cara de vocês.</em></>} sub="Contagem regressiva, cronograma, mapa com Maps, Waze e Uber, lista de presentes e código de acesso opcional." />
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {templates.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.08} y={60} className={i % 2 === 1 ? "md:translate-y-12" : ""}>
                  <figure className="group">
                    <div className="overflow-hidden rounded-[1.75rem] border-4 border-paper shadow-xl transition duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1.5deg] group-hover:shadow-2xl">
                      <Image src={t.image} alt={`Modelo de site ${t.name}`} width={716} height={1592} sizes="(min-width: 768px) 22vw, 45vw" className="transition duration-700 group-hover:scale-105" />
                    </div>
                    <figcaption className="mt-4 text-center font-display text-xl text-green">{t.name}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-20 text-center">
              <a href={links.example} data-cta="templates-example" className="inline-flex items-center gap-2 font-semibold text-green underline decoration-gold decoration-2 underline-offset-8 hover:text-wine">
                Abrir um site de exemplo <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </Reveal>
          </div>
        </section>

        <section id="planejador" className="px-5 py-28 md:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow="Quanto tempo vocês têm?" title={<>Coloquem a data. <em className="text-wine">A gente mostra o caminho.</em></>} sub="Vejam quantos dias faltam e no que focar agora." />
            <Reveal>
              <WeddingPlanner />
            </Reveal>
          </div>
        </section>

        <section className="bg-paper px-5 py-28 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Quem já brindou" title="Menos grupo de WhatsApp. Mais tempo juntos." />
            {/* TODO: trocar por depoimentos reais. O selo abaixo some quando forem reais. */}
            <p className="-mt-8 mb-10 text-center text-xs uppercase tracking-widest text-muted">Depoimentos ilustrativos</p>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.1} className={`rounded-[2rem] p-8 ${i === 1 ? "bg-green text-ivory md:-translate-y-6" : "border border-line bg-ivory"}`}>
                  <span aria-hidden className={`font-display text-6xl leading-none ${i === 1 ? "text-gold" : "text-wine"}`}>“</span>
                  <blockquote className="mt-2 font-display text-xl leading-snug">{t.quote}</blockquote>
                  <p className="mt-6 font-semibold">{t.name}</p>
                  <p className={`text-sm ${i === 1 ? "text-ivory/60" : "text-muted"}`}>{t.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="planos" className="px-5 py-28 md:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionTitle eyebrow="Planos" title={pricing.title} sub="Comecem grátis hoje. Os planos pagos abrem em breve." />
            <Pricing />
          </div>
        </section>

        <section className="px-5 pb-28 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g, i) => {
              const Icon = guaranteeIcons[i];
              return (
                <Reveal key={g.title} delay={i * 0.06} className="rounded-2xl border border-line bg-paper p-6">
                  <Icon className="h-6 w-6 text-wine" aria-hidden />
                  <h3 className="mt-4 font-semibold text-green">{g.title}</h3>
                  <p className="mt-1 text-sm text-muted">{g.text}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="duvidas" className="bg-paper px-5 py-28 md:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionTitle eyebrow="Dúvidas" title="Antes de vocês perguntarem…" />
            <div className="space-y-3">
              {faq.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.04}>
                  <details className="group rounded-2xl border border-line bg-ivory px-6 py-5 open:bg-paper open:shadow-lg" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-green">
                      {f.q}
                      <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-wine transition duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="cta-final" className="grain relative overflow-hidden bg-night px-5 py-32 text-center text-ivory md:px-8">
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
          <Image src="/img/aneis.webp" alt="" aria-hidden width={1100} height={1000} className="float pointer-events-none relative mx-auto mb-8 w-40" />
          <Reveal className="relative">
            <h2 className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95]">
              {finalCta.title}
              <br />
              <em className="text-gold">{finalCta.accent}</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ivory/70">{finalCta.sub}</p>
            <div className="mt-10 flex justify-center">
              <MagneticButton href={links.signup} cta="final" className="bg-[var(--cta)] text-lg text-[var(--cta-foreground)] shadow-[0_0_60px_-10px_#8b1738]">
                {hero.cta} <ArrowRight className="h-5 w-5" aria-hidden />
              </MagneticButton>
            </div>
            <p className="mt-5 text-sm text-ivory/60">{hero.note}</p>
          </Reveal>
        </section>
      </main>

      <footer className="bg-night px-5 pb-28 pt-10 text-sm text-ivory/50 md:pb-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 md:flex-row">
          <span className="font-display text-lg text-ivory">Brindou<span className="text-wine">.</span></span>
          <span>Página de teste gerada com a skill pagina-de-venda-saas.</span>
          <a href={links.help} className="hover:text-gold">Central de ajuda</a>
        </div>
      </footer>

      <StickyCTA href={links.signup} label={hero.cta} note="Grátis e sem cartão" showAfterId="hero" hideOnIds={["planejador", "planos", "cta-final"]} />

      <ExitIntent>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-wine">Espera um pouquinho</p>
        <h3 className="mt-3 font-display text-3xl text-green">{exitOffer.title}</h3>
        <p className="mt-3 text-muted">{exitOffer.text}</p>
        <a href={links.example} data-cta="exit-intent" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--cta)] px-6 font-semibold text-[var(--cta-foreground)]">
          {exitOffer.cta}
        </a>
      </ExitIntent>
    </>
  );
}
