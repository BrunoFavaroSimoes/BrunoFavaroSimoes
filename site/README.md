# Site da mAInframe

Site estático (HTML, CSS e JavaScript puro, sem build) da mAInframe: empresa, portfólio de projetos, fundador e Instagram.

## Como ver localmente

```bash
cd site
python3 -m http.server 8000
# abra http://localhost:8000
```

(Ou simplesmente abra `index.html` no navegador.)

## O que editar

| O quê | Onde |
|---|---|
| Instagram, e-mail, WhatsApp, LinkedIn | `js/config.js` → `MAINFRAME_CONFIG` |
| Projetos do portfólio | `js/config.js` → `MAINFRAME_PROJECTS` |
| Foto do Bruno | salve `assets/bruno.jpg` (retrato, 4:5) e troque o `src` em `index.html` |
| Textos (serviços, bio, chamadas) | `index.html` |
| Cores e fontes | topo de `css/styles.css` (`:root`) |

Os projetos marcados com `placeholder: true` são de exemplo. Quando todos forem reais,
a nota "projetos ilustrativos" some sozinha.

## Publicar

Qualquer hospedagem estática serve. Aponte a pasta `site/` como raiz:

- **Netlify / Vercel / Cloudflare Pages**: importe o repositório e defina o diretório de publicação como `site`.
- **GitHub Pages**: use um workflow do GitHub Actions que publique a pasta `site/`, ou mova o conteúdo para um repositório próprio.

Depois é só apontar o domínio (ex.: `mainframe.ia.br`) e colocar o link na bio do Instagram.
