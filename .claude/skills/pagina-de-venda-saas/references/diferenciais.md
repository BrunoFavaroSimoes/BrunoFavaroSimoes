# Diferenciais interativos — escolha o que faz sentido

Escolha 1–3. Critério principal: **qual elemento derruba a maior objeção do briefing?**

| Objeção / situação | Diferencial recomendado | Componente |
|--------------------|------------------------|-----------|
| "Vale o preço?" / B2B com ganho mensurável | Calculadora de ROI | `RoiCalculator.tsx` |
| "Como funciona? Parece complicado" | Demo interativa no hero/seção solução (hotspots, abas que trocam o screenshot, mini-simulação) | `ProductTabs.tsx` |
| Vários planos / preço por usuário ou volume | Pricing interativo (toggle anual + slider de usuários) | `PricingInteractive.tsx` |
| "Já uso planilha/concorrente" | Comparador "Antes vs. Depois" com slider arrastável ou tabela nós vs. eles | implementar com `BeforeAfter` (ver abaixo) |
| Público diverso, não sabe qual plano | Quiz de 3 perguntas que recomenda o plano | implementar sob demanda |
| Prova social fraca | Demo interativa + garantia forte + "veja ao vivo" | `ProductTabs.tsx` |
| Produto visual / design | Mockup 3D com tilt pelo mouse | `TiltCard.tsx` |

## Microinterações premium (use 3–5 por página, não todas)
- **Botão magnético** no CTA principal (`MagneticButton.tsx`) — só desktop.
- **Shine/brilho** passando no CTA a cada 4s.
- **Spotlight no cursor** em cards (direção dark).
- **Contadores animados** ao entrar na tela (`AnimatedCounter.tsx`).
- **Texto com palavra rotativa** no hero ("para clínicas | para dentistas | para recepcionistas").
- **Marquee de logos** infinito com pausa no hover.
- **Bento grid** com cards que expandem/animam no hover.
- **Borda com beam animado** no plano recomendado.
- **Progress bar de leitura** no topo (páginas longas).

## Comparador antes/depois (receita rápida)
Duas imagens sobrepostas; a de cima com `clip-path: inset(0 ${100 - pos}% 0 0)`; um `<input type="range">` invisível sobre tudo controla `pos` (acessível por teclado de graça); handle visual centralizado em `left: pos%`.

## Calculadora de ROI — boas práticas
- 2–4 entradas no máximo (sliders com valor visível), defaults realistas do nicho.
- Resultado grande e animado ("Você economiza **R$ 3.840/mês**"), com a fórmula explicada em uma linha (transparência = confiança).
- Comparar com o preço do plano: "O plano Pro se paga em 4 dias".
- CTA logo abaixo do resultado, com o número no texto: "Quero economizar R$ 3.840/mês".
- Disparar `track('roi_calculated', { value })`.
