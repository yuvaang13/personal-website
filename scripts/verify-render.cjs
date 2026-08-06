const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, '..', 'dist');
const OUT = path.join(__dirname, 'recon-check');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.xml': 'application/xml' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  let file = path.join(DIST, p);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) {
    const withHtml = path.join(DIST, p + '.html');
    file = fs.existsSync(withHtml) ? withHtml : file;
  }
  if (!fs.existsSync(file)) {
    res.writeHead(404); res.end('nope'); return;
  }
  res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
  res.end(fs.readFileSync(file));
});

const PORT = 8123;
const routes = ['/', '/about', '/projects', '/experience', '/contact', '/404'];
const viewports = [{ w: 1440, h: 900, label: '1440' }, { w: 768, h: 900, label: '768' }, { w: 390, h: 844, label: '390' }];

async function main() {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({ channel: 'chrome' });
  const results = [];
  for (const route of routes) {
    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
      const errors = [];
      const failed = [];
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
      page.on('pageerror', e => errors.push('PAGEERROR ' + e.message.slice(0, 200)));
      page.on('requestfailed', r => failed.push(r.url().split('/').pop() + ' ' + (r.failure()?.errorText || '')));
      page.on('response', r => { if (r.status() === 404) failed.push('404 ' + r.url().replace('http://127.0.0.1:' + PORT, '')); });
      const base = `http://127.0.0.1:${PORT}`;
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(900);

      const metrics = await page.evaluate(() => {
        const hs = document.querySelectorAll('h1');
        const h1 = hs[0];
        const bodyBg = getComputedStyle(document.body).backgroundColor;
        const h1Font = h1 ? getComputedStyle(h1).fontFamily : '';
        const overflowX = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const links = Array.from(document.querySelectorAll('a')).map(a => a.getAttribute('href'));
        const broken = links.filter(h => h && !h.startsWith('http') && !h.startsWith('mailto') && !h.startsWith('#') && !h.startsWith('/'));
        return {
          title: document.title,
          bodyBg,
          h1: h1 ? h1.textContent.trim().slice(0, 60) : null,
          h1Font: h1Font.slice(0, 40),
          overflowX,
          broken,
          fontsLoaded: document.fonts ? Array.from(document.fonts).map(f => f.family).filter((v, i, a) => a.indexOf(v) === i).slice(0, 8) : [],
        };
      });

      await page.screenshot({ path: path.join(OUT, `${route.replace(/\//g, '') || 'home'}-${vp.label}.png`), fullPage: false });
      results.push({ route, vp: vp.label, errors, failed, metrics });
      await page.close();
    }
  }
  await browser.close();
  server.close();

  let allOk = true;
  for (const r of results) {
    const status = r.errors.length || r.failed.length ? 'ERROR' : (r.metrics.bodyBg !== 'rgb(251, 251, 248)' ? 'BG-BAD' : 'ok');
    if (status !== 'ok') allOk = false;
    console.log(`[${status}] ${r.route} @${r.vp}  bg=${r.metrics.bodyBg} h1font=${r.metrics.h1Font} overflowX=${r.metrics.overflowX}px`);
      if (r.errors.length) console.log('   console:', r.errors.slice(0, 3));
      if (r.failed.length) console.log('   failed:', r.failed.slice(0, 3));
    }
  console.log('\nRESULT:', allOk ? 'ALL OK' : 'ISSUES FOUND');
  process.exit(allOk ? 0 : 1);
}

main().catch(e => { console.error(e); process.exit(1); });
