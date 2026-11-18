// Gera os PNG das peças de marca a partir de pecas.html.
// Uso: node render.js   (precisa do Playwright)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1300, height: 1500 } });
  await p.goto('file://' + path.join(__dirname, 'pecas.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const out = { og: '../assets/og-image.png', 'ig-dica': 'instagram-dica.png', 'ig-case': 'instagram-case.png', 'ig-calc': 'instagram-calculadora.png' };
  for (const [id, file] of Object.entries(out)) {
    await p.locator('#' + id).screenshot({ path: path.join(__dirname, file) });
    console.log('ok', file);
  }
  await b.close();
})();
