# Checklist de QA antes de entregar

## Conversão
- [ ] Em 5 segundos, o hero responde: o que é, para quem, qual resultado.
- [ ] CTA primário visível na primeira dobra em 375px e 1440px.
- [ ] Um único CTA primário por dobra; mesma cor exclusiva em todos.
- [ ] Microcopy de redução de risco abaixo dos CTAs primários.
- [ ] Prova social logo abaixo do hero e perto do pricing.
- [ ] Pricing claro, plano recomendado destacado, toggle anual funcionando.
- [ ] Garantia/risco zero visível na seção de oferta.
- [ ] FAQ com a maior objeção primeiro.
- [ ] StickyCTA aparece após o hero e não cobre conteúdo/rodapé.
- [ ] Urgência e notificações usam dados reais; contador mostra estado "encerrado" após o prazo.
- [ ] ExitIntent dispara no máximo 1x por sessão e fecha com ESC.
- [ ] 2 variações de headline no `content.ts`.

## Técnico
- [ ] `npm run build` sem erros nem warnings de hidratação.
- [ ] `npm run lint` limpo.
- [ ] Lighthouse mobile: Performance ≥ 85, Acessibilidade ≥ 95, SEO ≥ 95.
- [ ] LCP < 2,5s, CLS < 0,1 (nenhuma animação causando layout shift).
- [ ] Fontes via `next/font`, imagens via `next/image` com `sizes`, hero com `priority`.
- [ ] Metadata: title, description, Open Graph image, favicon.
- [ ] Todos os CTAs com `href` real e `data-cta` + `track()`.
- [ ] Formulários com validação, estado de loading e mensagem de sucesso/erro.

## Acessibilidade
- [ ] Contraste AA (4.5:1 texto, 3:1 elementos grandes) — inclusive texto sobre gradiente.
- [ ] Navegável por teclado; foco visível; modais com trap de foco e ESC.
- [ ] `prefers-reduced-motion` desliga parallax, marquee, magnético, tilt e smooth scroll.
- [ ] Imagens com `alt`; ícones decorativos com `aria-hidden`.
- [ ] Toasts com `role="status"` e `aria-live="polite"`.

## Visual (revise screenshots desktop 1440 e mobile 390)
- [ ] Não parece template: há uma ideia assinatura e pelo menos 2 quebras de grid.
- [ ] Ritmo de seções alternado; nada de 3 seções seguidas com o mesmo layout.
- [ ] Sem overflow horizontal no mobile.
- [ ] Tipografia: headline grande, corpo 16–18px, linhas até ~70 caracteres.
