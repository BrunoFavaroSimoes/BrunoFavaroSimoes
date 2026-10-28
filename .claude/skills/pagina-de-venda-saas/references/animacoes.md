# Animações e transições

## Princípios
1. **Movimento guia o olho para o CTA.** O CTA do hero deve ser o último elemento a entrar na sequência do hero (o olho termina nele).
2. **Entrada rápida, saída mais rápida**: 0.4–0.7s para revelações, 0.15–0.25s para hover/tap.
3. **Easing**: `[0.22, 1, 0.36, 1]` (easeOutQuint-like) para entradas; spring `{ stiffness: 300, damping: 24 }` para interações.
4. **Stagger** de 0.06–0.1s entre itens de lista/grid.
5. **Anime apenas `transform` e `opacity`** (e `clip-path`/`filter` com moderação). Nunca `width/height/top/left` em loop.
6. **`prefers-reduced-motion`**: sempre respeitar. Framer: `useReducedMotion()`; CSS: `@media (prefers-reduced-motion: reduce)`. Conteúdo nunca pode depender da animação para aparecer.
7. **Hero sem atraso de LCP**: a headline do hero deve estar visível no primeiro paint (anime só `transform`, comece com `opacity` ≥ 0.01 ou anime subtítulo/CTA em vez da headline; nunca esconda o elemento LCP atrás de JS).

## Biblioteca de transições (Framer Motion)

```tsx
// lib/motion.ts
export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const stagger = (s = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: s } },
});

export const blurIn = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
  show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease } },
};

export const maskReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.9, ease } },
};
```

Uso padrão: `<motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>` — ou o componente `components/Reveal.tsx`.

## Receitas por momento da página
- **Hero**: headline por palavras (stagger 0.05) ou máscara; mockup com `y` + leve `rotateX` vindo de baixo; elementos flutuantes com loop `y: [0,-8,0]` 4–6s.
- **Troca de seções**: fundo que muda de cor com o scroll (`useScroll` + `useTransform` no `backgroundColor`) — ótimo para entrar na seção de problema (escurece) e na de solução (clareia).
- **Scroll storytelling** (direção cinematográfica): GSAP `ScrollTrigger` com `pin: true` e `scrub: 1`; registre o plugin dentro de `useGSAP`/`useEffect` em componente `"use client"`; mate os triggers no cleanup.
- **Parallax**: `useScroll({ target })` + `useTransform(scrollYProgress, [0,1], [60,-60])`; máximo 2–3 camadas.
- **Pricing**: troca mensal/anual com `AnimatePresence mode="popLayout"` no número (slide vertical) + `layoutId` no indicador do toggle.
- **Depoimentos**: carrossel com drag (`drag="x"`) ou marquee duplo em direções opostas.
- **Transições entre rotas** (se houver): `template.tsx` com fade 0.3s.

## Smooth scroll (opcional)
Lenis (`lenis` package) só nas direções cinematográfica/editorial. Desativar com reduced-motion. Integrar com ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`.

## Performance
- `"use client"` apenas nos componentes animados; seções estáticas ficam como Server Components.
- Importar GSAP dinamicamente nas seções que o usam.
- `will-change: transform` só durante a animação, não global.
- Vídeos do hero: `autoPlay muted loop playsInline preload="metadata"` + poster; mp4 H.264 e webm, < 2 MB.
- No mobile, reduzir: sem cursor/magnético/tilt, menos partículas, parallax menor.
