const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, '..', 'dist');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.xml': 'application/xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  let file = path.join(DIST, p);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { const w = path.join(DIST, p + '.html'); file = fs.existsSync(w) ? w : file; }
  if (!fs.existsSync(file)) { res.writeHead(404); res.end('nope'); return; }
  res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
  res.end(fs.readFileSync(file));
});
const PORT = 8123;

function parse(c) {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(',').map(v => v.trim());
  const rgb = parts.slice(0, 3).map(Number);
  const a = parts[3] !== undefined ? (parts[3].includes('%') ? Number(parts[3]) / 100 : Number(parts[3])) : 1;
  return { rgb, a };
}
function lum(rgb) {
  const [r, g, b] = rgb.map(v => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(fg, bg) {
  const l1 = lum(fg), l2 = lum(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

async function main() {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({ channel: 'chrome' });
  const routes = ['/', '/about', '/projects', '/experience', '/contact', '/404'];
  let failures = 0;

  for (const route of routes) {
    for (const vp of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
      const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
      await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);

      const overflow = await page.evaluate(() => {
        const bad = [];
        document.querySelectorAll('h1,h2,h3,h4,p,a,span,button,.eyebrow,.tag,.btn-primary,.btn-secondary').forEach(el => {
          if (!el.offsetParent) return;
          if (el.scrollWidth > el.clientWidth + 2) {
            bad.push({ tag: el.tagName, text: (el.textContent || '').trim().slice(0, 44), sw: el.scrollWidth, cw: el.clientWidth });
          }
        });
        return bad.slice(0, 10);
      });

      const contrast = await page.evaluate(() => {
        const out = [];
        const effBg = (el) => {
          let n = el;
          while (n) {
            const cs = getComputedStyle(n);
            if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') return cs.backgroundColor;
            n = n.parentElement;
          }
          return getComputedStyle(document.body).backgroundColor;
        };
        const probe = (sel, label) => {
          const el = document.querySelector(sel);
          if (!el) return;
          const cs = getComputedStyle(el);
          out.push({ label, color: cs.color, bg: effBg(el), size: cs.fontSize });
        };
        probe('.eyebrow', 'eyebrow');
        probe('h1', 'h1');
        probe('.body-lg', 'body-lg');
        probe('.btn-primary', 'btn-primary');
        probe('.btn-secondary', 'btn-secondary');
        probe('nav a', 'nav-link');
        probe('.tag', 'tag');
        return out;
      });

      const contrastRows = contrast.map(c => {
        const fg = parse(c.color), bg = parse(c.bg);
        if (!fg || !bg) return { label: c.label, note: 'unparsed ' + c.color + ' / ' + c.bg, pass: false };
        const fgEffective = fg.a === 1 ? fg.rgb : fg.rgb.map((v, i) => v * fg.a + bg.rgb[i] * (1 - fg.a));
        const r = ratio(fgEffective, bg.rgb);
        const need = parseFloat(c.size) >= 24 ? 3 : 4.5;
        return { label: c.label, ratio: r.toFixed(2), pass: r >= need };
      });

      const fails = [];
      if (overflow.length) fails.push('overflow');
      contrastRows.forEach(c => { if (!c.pass) fails.push('contrast:' + c.label); });
      if (fails.length) failures++;
      console.log(`${fails.length ? 'FAIL' : 'ok  '} ${route} @${vp.w}  ${fails.length ? fails.join(', ') : ''}`);
      if (overflow.length) console.log('    overflow:', overflow.map(o => `${o.tag} "${o.text}" ${o.sw}px>${o.cw}px`).join(' || '));
      contrastRows.forEach(c => { if (!c.pass) console.log(`    contrast ${c.label}: ${c.ratio}:1`); });
      await page.close();
    }
  }

  // Showcase activation on home
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.querySelector('[data-scroll-showcase]').offsetTop + 400));
  await page.waitForTimeout(500);
  const showcase = await page.evaluate(() => {
    const st = document.querySelector('.scroll-showcase__stage.is-active');
    return { stage: st ? st.querySelector('h2').textContent : null, visual: !!document.querySelector('.scroll-showcase__project.is-active img') };
  });
  console.log('showcase active stage:', showcase.stage, '| visual img:', showcase.visual);
  await page.close();
  await browser.close();
  server.close();

  console.log(failures ? `\n${failures} page-viewport(s) with issues` : '\nALL QUALITY CHECKS PASS');
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });
