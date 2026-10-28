# Playbook de conversão para SaaS

## Estrutura de seções (ordem padrão)

| # | Seção | Objetivo | Obrigatório |
|---|-------|----------|-------------|
| 0 | Barra de anúncio (topo) | Urgência real ou novidade ("Preço de lançamento até 15/11") | se houver prazo |
| 1 | Hero | Dizer o que é, para quem e o resultado em 5s + CTA primário + visual do produto | sim |
| 2 | Prova rápida | Logos de clientes / "+2.300 empresas" / nota 4,9 ★ logo abaixo do hero | sim |
| 3 | Problema / agitação | Espelhar a dor com a linguagem do cliente; custo de não agir | sim |
| 4 | Solução + demo | Produto em ação (vídeo curto em loop, mockup interativo, antes/depois) | sim |
| 5 | Benefícios | 3–6 benefícios em bento grid; benefício > feature ("Feche o mês em 10 min", não "Relatórios automáticos") | sim |
| 6 | Como funciona | 3 passos, reduz percepção de esforço | recomendado |
| 7 | Prova social profunda | Depoimentos com foto, nome, cargo, empresa e resultado numérico; vídeo se tiver | sim |
| 8 | Diferencial interativo | Calculadora de ROI, comparador "nós vs. planilha/concorrente", quiz | 1–3 escolhidos |
| 9 | Pricing / oferta | Planos, toggle anual, plano recomendado destacado, value stack | sim |
| 10 | Garantia / risco zero | Selo, "cancele quando quiser", trial sem cartão, LGPD/segurança | sim |
| 11 | FAQ | Objeções reais, a maior primeiro | sim |
| 12 | CTA final | Repetir promessa + CTA + microcopy de risco zero | sim |
| — | CTA persistente | Barra fixa no mobile após passar o hero | sim |

Ajuste por nível de consciência:
- **Consciente da solução/produto** → hero direto com oferta, pricing sobe para logo após a demo.
- **Consciente do problema** → mais peso em Problema + Solução antes da oferta.
- **Inconsciente** → abrir com história/estatística provocativa, página mais longa.

## Gatilhos — como aplicar em SaaS

### Escassez e urgência (somente com motivo real)
- Preço de lançamento / founders deal com data final → `CountdownTimer` com `deadline` fixa (ISO), igual para todos os visitantes.
- Cupom de Black Friday/aniversário com validade.
- Vagas limitadas de onboarding assistido / implantação gratuita ("10 implantações gratuitas por mês" se for verdade).
- "Preço sobe no próximo lote" com o próximo preço visível.
- Quando o prazo acabar, o componente deve trocar para o estado "encerrado", não reiniciar.

### Prova social
- Contador animado de clientes/usuários/transações (número real, `AnimatedCounter`).
- Logos em marquee infinito (grayscale → cor no hover).
- Depoimentos com resultado numérico em destaque ("+38% de MRR").
- Avaliações com estrelas e fonte (G2, Capterra, Google, App Store).
- Notificações de atividade (`SocialProofToast`) alimentadas por dados reais (webhook Stripe → endpoint `/api/recent-signups`, anonimizando: "Clínica em Curitiba assinou o plano Pro"). Máx. 1 a cada 15–25s, desliga após 4–5 exibições, nunca cobre o CTA no mobile.
- "Usado por times da X, Y, Z" no formulário de signup.

### Oferta empilhada (value stack) e ancoragem
- Mostrar o custo da alternativa ("Contratar um assistente: R$ 2.500/mês") antes do preço.
- Toggle mensal/anual com "economize 2 meses" e preço anual exibido por mês.
- Plano do meio destacado ("Mais popular"), com borda animada/brilho — efeito chamariz (decoy).
- Lista do que está incluído com valor ao lado e total riscado → preço real.
- Bônus de assinatura anual (onboarding 1:1, templates, migração gratuita).

### Redução de risco
- "Teste grátis 14 dias, sem cartão", "Cancele em 1 clique", garantia de X dias.
- Selos: pagamento seguro, LGPD, SOC2/ISO se tiver, uptime.
- Microcopy embaixo de TODO CTA primário: "Sem cartão de crédito • Configuração em 2 min".

### CTA persistente e recuperação
- `StickyCTA`: barra fixa inferior no mobile e header compacto com botão no desktop, aparece depois que o CTA do hero sai da tela e some quando a seção de pricing/CTA final está visível.
- Botão de WhatsApp/chat flutuante para B2B ou ticket alto (opcional, não pode sobrepor o StickyCTA).
- `ExitIntent`: no desktop dispara ao mover o mouse para fora da janela; no mobile, após scroll rápido para cima perto do topo ou 45s de inatividade. 1 vez por sessão. Oferta: material gratuito, demo gravada, ou desconto REAL. Fecha com ESC e clique fora.

## Regras de CTA
- Verbo + benefício: "Começar meu teste grátis", "Quero automatizar minha agenda". Primeira pessoa costuma converter melhor que "Saiba mais".
- Um CTA primário por dobra; secundário em estilo ghost/link ("Ver demo de 2 min").
- Cor do CTA exclusiva: nenhum outro elemento da página usa a mesma cor sólida.
- Tamanho mínimo 48px de altura, área de toque 44px+.
