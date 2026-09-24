#!/usr/bin/env node
// Zcorebit Media static-site builder.
//
// Reads header/footer partials (partials.mjs) and per-page content
// fragments (content/<slug>.html), stamps them into one document per
// route (routes.mjs), and writes clean-URL output (e.g. about/index.html
// so it serves at /about with no redirect). Also (re)generates
// sitemap.xml and robots.txt from the same route list.
//
// Run: node build/build.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes } from './routes.mjs';
import { renderHead, renderHeader, renderMobileMenu, renderFooter } from './partials.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const config = JSON.parse(readFileSync(join(root, 'site.config.json'), 'utf8'));
const siteUrl = config.siteUrl.replace(/\/$/, '');

function readContent(slug) {
  return readFileSync(join(root, 'content', `${slug}.html`), 'utf8').trim();
}

function renderPage(route) {
  const canonical = siteUrl + route.path;
  const head = renderHead({ ...route, canonical, siteUrl, siteName: config.siteName });
  const header = renderHeader(route.slug);
  const mobileMenu = renderMobileMenu(route.slug);
  const footer = renderFooter(route.slug);
  const body = readContent(route.slug);

  return `<!DOCTYPE html>
<html lang="en">
<head>
${head}
</head>
<body id="page-${route.slug}" data-page="${route.slug}">

<noscript><style>.preloader{display:none!important}[data-reveal]{opacity:1!important;transform:none!important}</style></noscript>

<div class="preloader" id="preloader" role="status" aria-label="Loading Zcorebit Media">
  <img class="preloader-mark" src="/assets/logo/icon.webp" width="64" height="55" alt="" aria-hidden="true">
  <span class="sr-only">Loading…</span>
</div>

<div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>

<a href="#main" class="skip-link">Skip to content</a>

${header}

${mobileMenu}

<main id="main">
${body}
</main>

${footer}

</body>
</html>
`;
}

function writePage(route) {
  const outPath = join(root, route.outFile);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, renderPage(route));
  console.log('  wrote', route.outFile);
}

function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const sitemapRoutes = routes.filter(r => r.sitemap !== false);
  const urls = sitemapRoutes.map(r => `  <url>
    <loc>${siteUrl}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  writeFileSync(join(root, 'sitemap.xml'), xml);
  console.log('  wrote sitemap.xml (' + sitemapRoutes.length + ' urls)');
}

function writeRobots() {
  const txt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
  writeFileSync(join(root, 'robots.txt'), txt);
  console.log('  wrote robots.txt');
}

console.log('Building ' + config.siteName + ' → ' + siteUrl);
for (const route of routes) writePage(route);
writeSitemap();
writeRobots();
console.log('Done.');
