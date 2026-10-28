# Componentes prontos

Copie para `components/sales/` do projeto. Dependências: `framer-motion`, `next`, `react`. Todos respeitam `prefers-reduced-motion`.

Tokens obrigatórios no `globals.css`:
```css
:root { --cta: #ff5a1f; --cta-foreground: #ffffff; } /* cor EXCLUSIVA do CTA */
```

| Componente | Uso |
|-----------|-----|
| `track.ts` | `track(evento, props)` → GA4, Meta Pixel e PostHog, se carregados |
| `Reveal.tsx` | Fade-up/blur ao entrar na tela |
| `AnimatedCounter.tsx` | Número real animado (clientes, usuários) |
| `CountdownTimer.tsx` | Contagem para prazo REAL fixo; mostra "encerrado" ao fim |
| `MagneticButton.tsx` | CTA magnético com brilho (precisa do keyframe `shine`) |
| `TiltCard.tsx` | Mockup 3D que inclina com o mouse |
| `StickyCTA.tsx` | Barra de CTA fixa após o hero; some no pricing/CTA final |
| `SocialProofToast.tsx` | Notificações de atividade REAL vindas de um endpoint |
| `ExitIntent.tsx` | Modal de saída, 1x por sessão, ESC fecha |
| `RoiCalculator.tsx` | Calculadora de ROI com payback do plano |
| `PricingInteractive.tsx` | Toggle mensal/anual, slider de usuários, plano com borda "beam" |
| `ProductTabs.tsx` | Demo interativa em abas trocando screenshots |
