// Sitemap generation script for Astro
// Run during build to generate sitemap-index.xml and sitemap-*.xml files

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const site = 'https://iamyuvaangulati.vercel.app';

const routes = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/about', changefreq: 'monthly', priority: 0.8 },
  { path: '/projects', changefreq: 'weekly', priority: 0.9 },
  { path: '/experience', changefreq: 'monthly', priority: 0.7 },
  { path: '/contact', changefreq: 'monthly', priority: 0.6 },
];

function generateSitemap() {
  const distDir = path.join(__dirname, '..', 'dist');
  const sitemapDir = path.join(distDir);

  // Generate main sitemap index
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${site}/sitemap-0.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;

  // Generate sitemap-0.xml
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${site}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  // Write files
  fs.writeFileSync(path.join(sitemapDir, 'sitemap-index.xml'), sitemapIndex);
  fs.writeFileSync(path.join(sitemapDir, 'sitemap-0.xml'), sitemapContent);

  console.log('✓ Sitemap generated successfully');
}

generateSitemap();