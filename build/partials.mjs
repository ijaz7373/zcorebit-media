import { primaryNav } from './routes.mjs';

// ---------------------------------------------------------------
// <head> — critical CSS loads blocking, the Google Fonts stylesheet
// (non-critical) is deferred with the preload/onload swap pattern.
// ---------------------------------------------------------------
export function renderHead({ slug, title, description, ogDescription, ogImage, canonical, siteUrl, siteName }) {
  const absOg = ogImage.startsWith('http') ? ogImage : siteUrl + ogImage;
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#F7F6F2">
<meta property="og:site_name" content="${siteName}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${ogDescription || description}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${absOg}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${ogDescription || description}">
<meta name="twitter:image" content="${absOg}">
<link rel="icon" type="image/png" href="/assets/logo/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/logo/apple-touch-icon.png">
<link rel="stylesheet" href="/css/styles.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"></noscript>
<script src="/js/main.js" defer></script>`;
}

// ---------------------------------------------------------------
// Header / pill nav — built once here, stamped onto every page at
// build time (real static HTML in each output file, not fetched by
// client JS) so it always renders for crawlers with zero JS.
// ---------------------------------------------------------------
export function renderHeader(slug) {
  const links = primaryNav.map(r =>
    `<li><a href="${r.path}" id="nav-link-${r.slug}-${slug}"${r.slug === slug ? ' class="is-active" aria-current="page"' : ''}>${r.navLabel}</a></li>`
  ).join('\n      ');
  return `<header class="site-header" id="siteHeader">
  <nav class="pill-nav" aria-label="Primary">
    <a class="pill-nav__logo" href="/" aria-label="Zcorebit Media — home">
      <img src="/assets/logo/logo-white.webp" alt="Zcorebit Media" class="brand-logo" width="255" height="45" loading="eager" fetchpriority="high" decoding="async">
    </a>
    <ul class="pill-nav__links">
      ${links}
    </ul>
    <a class="btn btn--primary btn--sm pill-nav__cta" id="nav-cta-${slug}" href="/contact">Get in Touch</a>
    <button class="pill-nav__burger" id="menuToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
      <span></span><span></span><span></span>
    </button>
  </nav>
</header>`;
}

export function renderMobileMenu(slug) {
  const links = primaryNav.map((r, i) =>
    `<li style="--i:${i}"><a href="${r.path}" id="mobile-link-${r.slug}-${slug}"${r.slug === slug ? ' class="is-active" aria-current="page"' : ''}>${r.navLabel}</a></li>`
  ).join('\n    ');
  return `<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
  <ul class="mobile-menu__links">
    ${links}
  </ul>
  <a href="/contact" id="mobile-cta-${slug}" class="btn btn--primary mobile-menu__cta">Get in Touch</a>
</div>`;
}

// ---------------------------------------------------------------
// Footer — identical markup on every page, native <details>/<summary>
// accordion on mobile (no JS required, content stays in the DOM and
// crawlable regardless of open/closed state).
// ---------------------------------------------------------------
export function renderFooter(slug) {
  return `<footer class="site-footer on-ink" id="siteFooter">
  <div class="site-footer__watermark" aria-hidden="true">ZCOREBIT</div>
  <div class="container site-footer__inner">
    <div class="footer-grid">
      <div class="footer-brand" data-reveal>
        <a class="pill-nav__logo" href="/" aria-label="Zcorebit Media — home">
          <img src="/assets/logo/logo-white.webp" alt="Zcorebit Media" class="brand-logo" width="255" height="45" loading="lazy" decoding="async" fetchpriority="low">
        </a>
        <p class="footer-brand__tag">Zcorebit Media — Your vision in motion.</p>
        <p class="muted">We turn ideas into cinematic films, commercial content, and visual stories that make an impact.</p>
        <ul class="social-links">
          <li><a href="https://www.instagram.com/zcorebitmedia" target="_blank" rel="noopener noreferrer" id="social-instagram-${slug}" aria-label="Zcorebit Media on Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/></svg></a></li>
          <li><a href="https://www.linkedin.com/company/zcorebit?originalSubdomain=pk" target="_blank" rel="noopener noreferrer" id="social-linkedin-${slug}" aria-label="Zcorebit Media on LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a></li>
        </ul>
      </div>
      <details class="footer-acc" id="footer-explore-${slug}" open data-reveal>
        <summary class="overline">Explore</summary>
        <nav aria-label="Footer — pages">
          <ul class="footer-nav">
            <li><a href="/" id="footer-link-home-${slug}">Home</a></li>
            <li><a href="/work" id="footer-link-work-${slug}">Portfolio</a></li>
            <li><a href="/services" id="footer-link-services-${slug}">Services</a></li>
            <li><a href="/about" id="footer-link-about-${slug}">About</a></li>
            <li><a href="/contact" id="footer-link-contact-${slug}">Contact</a></li>
          </ul>
        </nav>
      </details>
      <details class="footer-acc" id="footer-services-${slug}" open data-reveal>
        <summary class="overline">Services</summary>
        <nav aria-label="Footer — services">
          <ul class="footer-nav">
            <li><a href="/services#brand-commercial-production">Brand &amp; Commercial</a></li>
            <li><a href="/services#social-content-production">Social Content</a></li>
            <li><a href="/services#ugc-creator-content">UGC &amp; Creator</a></li>
            <li><a href="/services#product-content">Product Shoot</a></li>
            <li><a href="/services#video-editing-post-production">Post Production</a></li>
            <li><a href="/services#commercial-photography">Photography</a></li>
          </ul>
        </nav>
      </details>
      <div data-reveal>
        <p class="overline">Contact</p>
        <address class="footer-contact">
          <a href="mailto:info@zcorebit.com" id="footer-email-${slug}">info@zcorebit.com</a>
          <a href="https://wa.me/923036393028" target="_blank" rel="noopener noreferrer" id="footer-whatsapp-${slug}">+92 303 6393028</a>
          <span class="muted">Building No. 92-G, 2nd Floor, G-Block, Sector G, DHA Phase 1, Lahore</span>
        </address>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="text-body-sm muted">&copy; 2026 Zcorebit Media. All rights reserved. Part of <a href="https://zcorebit.com" target="_blank" rel="noopener noreferrer" style="text-decoration:underline">Zcorebit</a>.</p>
      <div class="footer-bottom__links">
        <a href="/privacy" id="footer-privacy-${slug}">Privacy</a>
        <a href="/terms" id="footer-terms-${slug}">Terms</a>
        <button type="button" id="backToTop">Back to Top
          <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 19V5M6 11l6-6 6 6"/></svg></span>
        </button>
      </div>
    </div>
  </div>
</footer>`;
}
