/**
 * Polytraffic — Signal Grid Design System
 * Shared module: mega nav, footer, head includes, tailwind config
 * All HTML generators live here. Build scripts import from this single source.
 */

const SITE = {
  name: 'Polytraffic',
  url: 'https://polytraffic.com',
  tagline: 'Multi-channel traffic intelligence for publishers.',
  description: 'Frameworks for diversifying, valuing, and defending traffic portfolios. Stop gambling on single sources.',
  author: 'Victor Valentine Romo',
  authorUrl: 'https://victorvalentineromo.com',
  parentBrand: 'Scale With Search',
  parentUrl: 'https://scalewithsearch.com',
  offerName: 'Find',
  offerPrice: 997,
  offerUrl: '/setup.html',
  year: new Date().getFullYear(),
};

const ENTITY_DOMAINS = [
  'scalewithsearch.com',
  'victorvalentineromo.com',
  'aifirstsearch.com',
  'browserprompt.com',
  'creatinepedia.com',
  'polytraffic.com',
  'tattooremovalnear.com',
  'comicstripai.com',
  'organicarbitrage.com',
  'aipaypercrawl.com',
  'b2bvic.com',
  'seobyrole.com',
  'quickfixseo.com',
];

const CATEGORIES = {
  channels: {
    label: 'Channels',
    slug: 'channels',
    links: [
      { title: 'SEO', href: '/channels/seo.html' },
      { title: 'Paid Search', href: '/channels/paid-search.html' },
      { title: 'Social', href: '/channels/social.html' },
      { title: 'Email', href: '/channels/email.html' },
      { title: 'Referral', href: '/channels/referral.html' },
      { title: 'Direct', href: '/channels/direct.html' },
    ],
  },
  economics: {
    label: 'Economics',
    slug: 'economics',
    links: [
      { title: 'CPV Analysis', href: '/economics/cpv-analysis.html' },
      { title: 'Attribution Models', href: '/economics/attribution-models.html' },
      { title: 'ROI Frameworks', href: '/economics/roi-frameworks.html' },
    ],
  },
  resilience: {
    label: 'Resilience',
    slug: 'resilience',
    href: '/resilience.html',
  },
  tools: {
    label: 'Tools',
    slug: 'tools',
    links: [
      { title: 'Calculators', href: '/tools/calculators.html' },
      { title: 'Frameworks', href: '/tools/frameworks.html' },
      { title: 'Templates', href: '/tools/templates.html' },
    ],
  },
};

// Category mapping for articles without explicit category frontmatter
const CATEGORY_KEYWORDS = {
  channels: ['seo', 'paid search', 'social', 'email', 'referral', 'direct', 'affiliate', 'channel', 'traffic source'],
  economics: ['cpv', 'cost per visitor', 'attribution', 'roi', 'economics', 'cost', 'revenue', 'monetiz'],
  resilience: ['algorithm', 'update', 'recovery', 'resilience', 'risk', 'platform risk', 'diversif', 'correlation', 'portfolio'],
  tools: ['calculator', 'framework', 'template', 'tool', 'spreadsheet', 'tracking'],
};

function inferCategory(article) {
  if (article.category) return article.category;
  const text = `${article.title} ${article.description} ${article.keywords || article.focus_keyword || ''}`.toLowerCase();
  let bestCat = 'resilience';
  let bestScore = 0;
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestCat = cat;
    }
  }
  return bestCat;
}

// ── Tailwind Config ──────────────────────────────────────────────
const tailwindConfig = `
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: {
              900: '#0c1222',
              800: '#141c30',
              700: '#1e2a42',
              600: '#1e293b',
            },
            violet: {
              500: '#8b5cf6',
              400: '#a78bfa',
            },
            cyan: {
              500: '#06b6d4',
            },
            cta: {
              500: '#f97316',
              400: '#fb923c',
            },
            slate: {
              100: '#f1f5f9',
              400: '#94a3b8',
              500: '#64748b',
            }
          },
          fontFamily: {
            display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
            body: ['"Inter"', 'system-ui', 'sans-serif'],
            mono: ['"Fira Code"', 'Consolas', 'monospace'],
          },
        }
      }
    }`;

// ── Head Includes ────────────────────────────────────────────────
function headIncludes({ title, description, canonical, type = 'website', ogImage, jsonLd, noindex = false }) {
  const entityLinks = ENTITY_DOMAINS.map(d => `    <link rel="me" href="https://${d}" />`).join('\n');
  const robotsMeta = noindex ? '\n    <meta name="robots" content="noindex" />' : '';

  let jsonLdBlock = '';
  if (jsonLd) {
    jsonLdBlock = `\n    <script type="application/ld+json">\n${typeof jsonLd === 'string' ? jsonLd : JSON.stringify(jsonLd, null, 2)}\n    </script>`;
  }

  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${escapeAttr(description)}" />
    <meta name="author" content="${SITE.author}" />${robotsMeta}
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="${SITE.name}" />${ogImage ? `\n    <meta property="og:image" content="${ogImage}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <link rel="canonical" href="${canonical}" />
${entityLinks}
    <link rel="stylesheet" href="/base.css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>${tailwindConfig}
    </script>${jsonLdBlock}`;
}

// ── Mega Nav HTML ────────────────────────────────────────────────
function megaNavHtml(activePath = '') {
  return `
  <nav class="bg-navy-800 border-b border-navy-600 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <a href="/" class="flex items-center gap-3 group">
          <div class="w-9 h-9 rounded-lg bg-violet-500 flex items-center justify-center">
            <span class="font-display font-bold text-white text-sm tracking-tight">PT</span>
          </div>
          <span class="font-display font-semibold text-slate-100 text-lg tracking-tight group-hover:text-violet-400 transition-colors">Polytraffic</span>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">

          <!-- Channels dropdown -->
          <div class="pt-meganav-item relative">
            <button class="px-3 py-2 text-sm font-medium text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-1">
              Channels
              <svg class="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="pt-meganav-dropdown">
              ${CATEGORIES.channels.links.map(l => `<a href="${l.href}">${l.title}</a>`).join('\n              ')}
            </div>
          </div>

          <!-- Economics dropdown -->
          <div class="pt-meganav-item relative">
            <button class="px-3 py-2 text-sm font-medium text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-1">
              Economics
              <svg class="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="pt-meganav-dropdown">
              ${CATEGORIES.economics.links.map(l => `<a href="${l.href}">${l.title}</a>`).join('\n              ')}
            </div>
          </div>

          <!-- Resilience (direct link) -->
          <a href="/resilience.html" class="px-3 py-2 text-sm font-medium text-slate-400 hover:text-violet-400 transition-colors">
            Resilience
          </a>

          <!-- Tools dropdown -->
          <div class="pt-meganav-item relative">
            <button class="px-3 py-2 text-sm font-medium text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-1">
              Tools
              <svg class="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="pt-meganav-dropdown">
              ${CATEGORIES.tools.links.map(l => `<a href="${l.href}">${l.title}</a>`).join('\n              ')}
            </div>
          </div>

          <!-- CTA -->
          <a href="/setup.html" class="ml-4 px-5 py-2 bg-cta-500 hover:bg-cta-400 text-white text-sm font-semibold rounded-lg transition-colors">
            Build Your Portfolio &mdash; $997
          </a>
        </div>

        <!-- Mobile toggle -->
        <button id="pt-mobile-toggle" class="md:hidden p-2 text-slate-400 hover:text-white" aria-label="Toggle menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>

      <!-- Mobile Nav -->
      <div id="pt-mobile-menu" class="md:hidden hidden border-t border-navy-600 pb-4">
        <div class="pt-3 space-y-1">
          <p class="px-3 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Channels</p>
          ${CATEGORIES.channels.links.map(l => `<a href="${l.href}" class="block px-3 py-2 text-sm text-slate-400 hover:text-violet-400">${l.title}</a>`).join('\n          ')}

          <p class="px-3 py-1 pt-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Economics</p>
          ${CATEGORIES.economics.links.map(l => `<a href="${l.href}" class="block px-3 py-2 text-sm text-slate-400 hover:text-violet-400">${l.title}</a>`).join('\n          ')}

          <a href="/resilience.html" class="block px-3 py-2 text-sm text-slate-400 hover:text-violet-400 font-medium">Resilience</a>

          <p class="px-3 py-1 pt-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tools</p>
          ${CATEGORIES.tools.links.map(l => `<a href="${l.href}" class="block px-3 py-2 text-sm text-slate-400 hover:text-violet-400">${l.title}</a>`).join('\n          ')}

          <div class="pt-3 px-3">
            <a href="/setup.html" class="block text-center px-5 py-2.5 bg-cta-500 hover:bg-cta-400 text-white text-sm font-semibold rounded-lg transition-colors">
              Build Your Portfolio &mdash; $997
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>`;
}

// ── Mega Nav Script ──────────────────────────────────────────────
const megaNavScript = `
  <script>
    (function() {
      var toggle = document.getElementById('pt-mobile-toggle');
      var menu = document.getElementById('pt-mobile-menu');
      if (toggle && menu) {
        toggle.addEventListener('click', function() {
          menu.classList.toggle('hidden');
        });
      }
    })();
  </script>`;

// ── Footer HTML ──────────────────────────────────────────────────
function footerHtml() {
  const entityLinksList = ENTITY_DOMAINS
    .filter(d => d !== 'polytraffic.com')
    .map(d => {
      const name = d.replace('.com', '').replace(/([A-Z])/g, ' $1').trim();
      const display = d.replace('.com', '');
      return `          <li><a href="https://${d}" class="text-slate-500 hover:text-violet-400 transition-colors" target="_blank" rel="noopener">${display}</a></li>`;
    }).join('\n');

  return `
  <footer class="bg-navy-800 border-t border-navy-600 mt-20">
    <div class="max-w-6xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <!-- Col 1: About -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center">
              <span class="font-display font-bold text-white text-xs tracking-tight">PT</span>
            </div>
            <span class="font-display font-semibold text-slate-100 tracking-tight">Polytraffic</span>
          </div>
          <p class="text-sm text-slate-500 leading-relaxed">
            Multi-channel traffic intelligence for publishers. Frameworks for diversifying, valuing, and defending traffic portfolios against platform volatility.
          </p>
          <p class="mt-4 text-xs text-slate-500">
            A <a href="${SITE.parentUrl}" class="text-violet-500 hover:text-violet-400">${SITE.parentBrand}</a> property.
          </p>
        </div>

        <!-- Col 2: Traffic Channels -->
        <div>
          <h4 class="font-display font-semibold text-slate-100 text-sm mb-4 uppercase tracking-wider">Traffic Channels</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/channels/seo.html" class="text-slate-500 hover:text-violet-400 transition-colors">SEO</a></li>
            <li><a href="/channels/paid-search.html" class="text-slate-500 hover:text-violet-400 transition-colors">Paid Search</a></li>
            <li><a href="/channels/social.html" class="text-slate-500 hover:text-violet-400 transition-colors">Social</a></li>
            <li><a href="/channels/email.html" class="text-slate-500 hover:text-violet-400 transition-colors">Email</a></li>
            <li><a href="/channels/referral.html" class="text-slate-500 hover:text-violet-400 transition-colors">Referral</a></li>
            <li><a href="/channels/direct.html" class="text-slate-500 hover:text-violet-400 transition-colors">Direct</a></li>
            <li><a href="/resilience.html" class="text-slate-500 hover:text-violet-400 transition-colors">Algorithm Resilience</a></li>
            <li><a href="/articles.html" class="text-slate-500 hover:text-violet-400 transition-colors">All Articles</a></li>
          </ul>
        </div>

        <!-- Col 3: Frameworks & Tools -->
        <div>
          <h4 class="font-display font-semibold text-slate-100 text-sm mb-4 uppercase tracking-wider">Frameworks &amp; Tools</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/economics/cpv-analysis.html" class="text-slate-500 hover:text-violet-400 transition-colors">CPV Analysis</a></li>
            <li><a href="/economics/attribution-models.html" class="text-slate-500 hover:text-violet-400 transition-colors">Attribution Models</a></li>
            <li><a href="/economics/roi-frameworks.html" class="text-slate-500 hover:text-violet-400 transition-colors">ROI Frameworks</a></li>
            <li><a href="/tools/calculators.html" class="text-slate-500 hover:text-violet-400 transition-colors">Calculators</a></li>
            <li><a href="/tools/frameworks.html" class="text-slate-500 hover:text-violet-400 transition-colors">Frameworks</a></li>
            <li><a href="/tools/templates.html" class="text-slate-500 hover:text-violet-400 transition-colors">Templates</a></li>
            <li><a href="/setup.html" class="text-cta-500 hover:text-cta-400 transition-colors font-medium">Find &mdash; $997</a></li>
          </ul>
        </div>

        <!-- Col 4: Entity Network -->
        <div>
          <h4 class="font-display font-semibold text-slate-100 text-sm mb-4 uppercase tracking-wider">From Scale With Search</h4>
          <ul class="space-y-2 text-sm">
${entityLinksList}
          </ul>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="mt-12 pt-8 border-t border-navy-600 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>&copy; ${SITE.year} ${SITE.name}. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="/privacy.html" class="hover:text-slate-400 transition-colors">Privacy</a>
          <a href="/terms.html" class="hover:text-slate-400 transition-colors">Terms</a>
          <a href="/setup.html" class="hover:text-slate-400 transition-colors">Find</a>
        </div>
      </div>
    </div>
  </footer>`;
}

// ── Schema Generators ────────────────────────────────────────────
function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": SITE.name,
        "url": SITE.url,
        "description": SITE.description,
        "publisher": { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        "name": SITE.name,
        "url": SITE.url,
        "founder": {
          "@type": "Person",
          "name": SITE.author,
          "url": SITE.authorUrl,
        },
        "sameAs": ENTITY_DOMAINS.map(d => `https://${d}`),
      },
    ],
  };
}

function articleSchema({ title, description, slug, date, category }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": SITE.author,
      "url": SITE.authorUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE.name,
      "url": SITE.url,
    },
    "datePublished": date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE.url}/articles/${slug}.html`,
    },
  };
}

function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "item": c.url ? `${SITE.url}${c.url}` : undefined,
    })),
  };
}

function faqSchema(pairs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pairs.map(p => ({
      "@type": "Question",
      "name": p.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": p.a,
      },
    })),
  };
}

// ── Breadcrumb HTML ──────────────────────────────────────────────
function breadcrumbHtml(crumbs) {
  const items = crumbs.map((c, i) => {
    const isLast = i === crumbs.length - 1;
    const chevron = isLast ? '' : ' <span class="pt-chevron">&rsaquo;</span> ';
    if (isLast) {
      return `<span class="text-slate-400">${escapeHtml(c.name)}</span>`;
    }
    return `<a href="${c.url}">${escapeHtml(c.name)}</a>${chevron}`;
  });
  return `<nav class="pt-breadcrumbs mb-6" aria-label="Breadcrumb">${items.join('')}</nav>`;
}

// ── Utility ──────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ── Exports ──────────────────────────────────────────────────────
module.exports = {
  SITE,
  ENTITY_DOMAINS,
  CATEGORIES,
  CATEGORY_KEYWORDS,
  inferCategory,
  tailwindConfig,
  headIncludes,
  megaNavHtml,
  megaNavScript,
  footerHtml,
  websiteSchema,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  breadcrumbHtml,
  escapeHtml,
  escapeAttr,
  slugify,
};
