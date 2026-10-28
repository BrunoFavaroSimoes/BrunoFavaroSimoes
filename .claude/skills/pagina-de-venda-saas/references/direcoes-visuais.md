# Direções visuais (escolher por nicho)

Escolha UMA direção principal. Defina tokens (cores, fontes, raio, sombras) em `tailwind.config` / CSS variables antes de construir seções. Sempre inclua uma **"ideia assinatura"**: um momento visual memorável na página.

## 1. Cinematográfico (scroll storytelling)
- **Nichos**: produtos visuais, apps de consumo, hardware+app, IA criativa, lançamentos grandes.
- **Visual**: fundo neutro (preto profundo ou off-white), tipografia display gigante (clamp até 8–10rem), muito respiro.
- **Movimento**: GSAP ScrollTrigger com seções "pinned", texto revelando palavra por palavra com o scroll, mockup que gira/zoom conforme rola, Lenis smooth scroll.
- **Assinatura**: o app "monta" na tela durante o scroll (camadas da UI chegando uma a uma).
- **Fontes**: Inter Tight / Geist / Satoshi.

## 2. Premium dark / glow
- **Nichos**: devtools, IA, fintech, cripto, segurança, analytics.
- **Visual**: fundo #0A0A0F, gradientes radiais sutis, bordas 1px com gradiente, glassmorphism discreto, grid/noise de fundo.
- **Movimento**: spotlight que segue o cursor nos cards, borda com "beam" animado no plano destacado, partículas/estrelas leves no hero, números com glow.
- **Assinatura**: hero com mockup do produto saindo de um "portal" de luz + spotlight no cursor.
- **Fontes**: Geist / Space Grotesk + JetBrains Mono para detalhes.

## 3. Neo-brutalista / disruptivo
- **Nichos**: produtos para criadores, marketing, Gen Z, ferramentas no-code, marcas que querem quebrar padrão.
- **Visual**: cores chapadas fortes (amarelo, rosa, verde-limão), bordas pretas 2–3px, sombras sólidas deslocadas (`shadow-[6px_6px_0_#000]`), stickers, tipografia pesada.
- **Movimento**: marquees, botões que "afundam" no clique, elementos com leve rotação, cards que chacoalham ao hover.
- **Assinatura**: faixa marquee diagonal cruzando a página com benefícios + stickers arrastáveis no hero.
- **Fontes**: Archivo Black / Clash Display / Bricolage Grotesque.

## 4. Clean SaaS confiável (light, colorido com propósito)
- **Nichos**: SMB, saúde, educação, RH, finanças pessoais, jurídico.
- **Visual**: branco/off-white, 1 cor de marca + 1 cor de CTA, ilustrações ou fotos reais, cantos arredondados generosos, bento grid.
- **Movimento**: fade-up suave escalonado, contadores, ícones animados (Lottie), mockup com elementos flutuando (notificações, gráficos).
- **Assinatura**: mockup do app com "cards flutuantes" de resultado (ex.: "+R$ 4.200 recuperados") que entram em sequência.
- **Fontes**: Plus Jakarta Sans / Manrope / DM Sans.

## 5. Editorial / sofisticado
- **Nichos**: enterprise, consultoria com software, legal-tech, produtos premium/high ticket.
- **Visual**: serifa elegante em headlines + sans no corpo, paleta restrita (tons terrosos ou monocromático + 1 acento), linhas finas, layout de revista.
- **Movimento**: revelações por máscara (clip-path), transições lentas e precisas, parallax sutil em imagens.
- **Assinatura**: headline com palavra-chave em itálico serifado que "desenha" um sublinhado manuscrito animado.
- **Fontes**: Instrument Serif / Fraunces + Inter.

## Regras gerais de destaque
- Contraste de escala: headline do hero ≥ 3x o corpo de texto.
- Hierarquia por cor: CTA é a única cor saturada sólida.
- Quebre o grid ao menos 2 vezes (elemento sangrando para fora do container, sobreposição de seções, card inclinado).
- Alterne o ritmo das seções (claro/escuro, largo/estreito) para evitar monotonia.
- Use imagens/screenshots REAIS do produto sempre que possível; mockup em moldura de navegador/celular.
- Respeite a identidade do cliente se existir: adapte a direção à paleta dele, não o contrário.
