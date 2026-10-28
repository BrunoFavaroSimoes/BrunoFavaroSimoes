---
name: pagina-de-venda-saas
description: Cria páginas de venda (landing pages / sales pages) de alta conversão para SaaS e apps em Next.js + Tailwind, com visual chamativo, transições e animações premium, gatilhos de conversão completos (escassez, prova social, oferta empilhada, CTA persistente) e elementos fora do padrão (demo interativa, calculadora de ROI, pricing interativo, microinterações). Use sempre que o usuário pedir página de venda, landing page, sales page, página de captura, página de lançamento, página de pricing, "página que converta", ou quiser melhorar/redesenhar a conversão de uma página existente — mesmo que não diga "skill" nem "SaaS".
---

# Página de Venda SaaS — Máxima Conversão

Objetivo: entregar uma página que **para o scroll, prende a atenção e converte**. Cada seção existe para mover o visitante um passo em direção ao CTA. Beleza sem conversão é falha; conversão sem destaque visual também é (a página precisa sair do padrão "template de IA").

Stack padrão: **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**, com **GSAP ScrollTrigger** e **Lenis** (smooth scroll) quando a direção visual pedir storytelling de scroll. Ícones: `lucide-react`. Use outra stack só se o usuário pedir.

## Fluxo de trabalho

### 1. Briefing curto (sempre, antes de codar)
Faça as perguntas de `references/briefing.md` — no máximo 8, em uma ou duas rodadas, de preferência com opções clicáveis. Se o usuário já deu parte das respostas, pergunte só o que falta. Se ele disser "gera direto", use placeholders realistas marcados com `{/* TODO: */}`.

### 2. Decisões de estratégia (mostre ao usuário em 5–8 linhas antes de codar)
- **Nível de consciência do público** (Eugene Schwartz) → define a abertura da headline. Ver `references/copy.md`.
- **Tom de copy** adaptado ao público. Ver `references/copy.md`.
- **Direção visual** escolhida pelo nicho. Ver `references/direcoes-visuais.md`. Proponha 1 principal e mencione 1 alternativa.
- **Diferenciais interativos**: escolha 1–3 da matriz em `references/diferenciais.md` conforme o produto. Não use todos; use os que mais reduzem a principal objeção.
- **Gatilhos de conversão**: todos os aplicáveis de `references/playbook-conversao.md`, sempre com dados reais (ver "Regra de ouro").

### 3. Arquitetura da página
Siga a estrutura de seções de `references/playbook-conversao.md` (Hero → Prova rápida → Problema → Solução/Demo → Benefícios → Prova social → Diferencial interativo → Oferta/Pricing → Garantia → FAQ/Objeções → CTA final). Adapte a ordem ao nível de consciência, mas nunca remova: hero com CTA, prova social, pricing claro, garantia/redução de risco, FAQ e CTA final.

### 4. Implementação
- Leia `references/animacoes.md` antes de escrever animações.
- Reaproveite os componentes prontos em `components/` (copie para `components/sales/` do projeto e adapte cores/textos). Eles já tratam mobile, `prefers-reduced-motion` e SSR. Defina os tokens `--cta` e `--cta-foreground` no `globals.css` (ver `components/README.md`).
- Uma ideia visual "assinatura" por página (algo que o visitante lembre: hero com mockup 3D que inclina com o mouse, headline que se monta palavra por palavra, seção de problema com "glitch", etc.). Ver `references/direcoes-visuais.md`.
- Conteúdo da página centralizado em um único arquivo `content.ts` (headlines, preços, depoimentos, FAQ) para o usuário editar sem mexer em JSX.
- Eventos de analytics em todos os CTAs (`data-cta="hero"`, `"pricing-pro"`, etc.) e um helper `track()` que chama GA4/Meta Pixel/PostHog se existirem.

### 5. Verificação (obrigatória antes de entregar)
Rode o checklist de `references/checklist-qa.md`: build sem erros, Lighthouse mobile, teste em 375px, acessibilidade, reduced-motion, todos os CTAs com link e tracking. Se possível, tire screenshots com Playwright (desktop 1440px e mobile 390px) e revise você mesmo: o hero comunica o que o produto faz em 5 segundos? O CTA é o elemento mais chamativo da primeira dobra?

### 6. Entrega
Resuma: direção visual escolhida e por quê, seções, diferenciais usados, onde editar o conteúdo (`content.ts`), e **3 ideias de teste A/B** priorizadas (ex.: headline A vs B, CTA "Começar grátis" vs "Testar 14 dias").

## Regra de ouro: urgência e prova social REAIS
Gatilhos falsos (contador que reinicia a cada visita, "Fulano acabou de assinar" inventado, "restam 3 vagas" fixo) violam o Código de Defesa do Consumidor e regras de publicidade enganosa, derrubam a confiança quando descobertos e queimam a marca. Toda escassez precisa de um motivo verdadeiro (fim do preço de lançamento, cupom com data, turma de onboarding com limite) e toda notificação/contador precisa vir de dados reais (API, webhook do Stripe, planilha). Os componentes de `components/` recebem esses dados por props; se o usuário não tiver dados, use a versão "estática honesta" (ex.: "+2.300 empresas usam" com o número real) e deixe um TODO.

## Anti-padrões (nunca entregue)
- Hero genérico "Transforme seu negócio com IA" sem dizer O QUE o produto faz e PARA QUEM.
- Gradiente roxo-azul + cards iguais em grid 3x — o "visual de template". Varie a composição (bento grid, assimetria, sobreposição, tipografia gigante).
- Mais de um CTA primário competindo na mesma tela.
- Animação em tudo: se tudo se mexe, nada se destaca. Movimento serve à hierarquia.
- Layout shift por animação, fontes sem `next/font`, imagens sem `next/image`.
- Pricing escondido ou "fale conosco" como única opção num SaaS self-service.
