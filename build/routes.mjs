// Single source of truth for every page's route + <head> metadata.
// Add a new page by adding an entry here + a content/<slug>.html fragment,
// then run `node build/build.mjs`.
export const routes = [
  {
    slug: 'home',
    path: '/',
    outFile: 'index.html',
    navLabel: 'Home',
    title: 'Zcorebit Media | Premium Creative Production House in Pakistan',
    description: "Zcorebit Media is Pakistan's premium creative production house — brand films, social content, UGC, product content, and post-production for brands and businesses. Start a project today.",
    ogDescription: 'Brand films, social content, UGC, product content, and post-production for brands and businesses across Pakistan.',
    ogImage: '/assets/video/hero-poster.jpg',
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    slug: 'services',
    path: '/services',
    outFile: 'services/index.html',
    navLabel: 'Services',
    title: 'Services | Zcorebit Media',
    description: 'From brand films and social content to product shoots and post-production — explore all 10 creative production services offered by Zcorebit Media.',
    ogImage: '/assets/images/portfolio/vantex-manufacturing-film-1200.webp',
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    slug: 'work',
    path: '/work',
    outFile: 'work/index.html',
    navLabel: 'Portfolio',
    title: 'Our Work | Zcorebit Media',
    description: 'A selection of corporate, hospitality, commercial, and documentary film projects by Zcorebit Media — Pakistan’s premium creative production house.',
    ogImage: '/assets/images/portfolio/marbell-hotel-brand-film-1200.webp',
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    slug: 'about',
    path: '/about',
    outFile: 'about/index.html',
    navLabel: 'About',
    title: 'About | Zcorebit Media',
    description: 'Zcorebit Media is a Pakistan-based creative production company specialising in cinematic films, commercial content, photography, and strategy-led visual storytelling for brands.',
    ogImage: '/assets/images/philosophy/philosophy-core-1600.webp',
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    slug: 'contact',
    path: '/contact',
    outFile: 'contact/index.html',
    navLabel: 'Contact',
    title: 'Contact | Zcorebit Media',
    description: 'Get in touch with Zcorebit Media to start your next brand film, commercial, or content project. We typically respond within an hour.',
    ogImage: '/assets/video/hero-poster.jpg',
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    slug: 'privacy',
    path: '/privacy',
    outFile: 'privacy/index.html',
    navLabel: null,
    title: 'Privacy Policy | Zcorebit Media',
    description: 'How Zcorebit Media collects, uses, and protects information shared through this website.',
    ogImage: '/assets/logo/logo-black.png',
    changefreq: 'yearly',
    priority: '0.3'
  },
  {
    slug: 'terms',
    path: '/terms',
    outFile: 'terms/index.html',
    navLabel: null,
    title: 'Terms of Service | Zcorebit Media',
    description: 'Terms governing the use of the Zcorebit Media website and creative production services.',
    ogImage: '/assets/logo/logo-black.png',
    changefreq: 'yearly',
    priority: '0.3'
  },
  {
    slug: '404',
    path: '/404',
    outFile: '404.html',
    navLabel: null,
    title: 'Page Not Found | Zcorebit Media',
    description: 'The page you are looking for doesn’t exist or has moved.',
    ogImage: '/assets/logo/logo-black.png',
    sitemap: false
  }
];

export const primaryNav = routes.filter(r => r.navLabel);
