/**
 * Polytraffic — Signal Grid Design System
 * Category index page generator.
 * Produces: channels.html, economics.html, resilience.html, tools.html
 */

const fs = require('fs');
const path = require('path');
const {
  SITE, CATEGORIES, headIncludes, megaNavHtml, megaNavScript, footerHtml,
  inferCategory, escapeHtml, breadcrumbHtml, breadcrumbSchema,
} = require('./shared');

const DIST = path.join(__dirname, '..', 'dist');

const CATEGORY_DESCRIPTIONS = {
  channels: {
    headline: 'Traffic Channels',
    subtitle: 'Individual channel deep-dives covering acquisition cost, scalability ceiling, platform risk, and correlation with other sources in your portfolio.',
    icon: `<svg class="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>`,
  },
  economics: {
    headline: 'Traffic Economics',
    subtitle: 'CPV analysis, attribution models, and ROI frameworks. The math behind channel allocation decisions.',
    icon: `<svg class="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>`,
  },
  resilience: {
    headline: 'Portfolio Resilience',
    subtitle: 'Algorithm survival, platform risk scoring, source correlation analysis. Build traffic portfolios that absorb volatility instead of fracturing.',
    icon: `<svg class="w-6 h-6 text-cta-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
  },
  tools: {
    headline: 'Tools & Templates',
    subtitle: 'Calculators, frameworks, and templates for traffic portfolio management. Operational instruments, not theory.',
    icon: `<svg class="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  },
};

function buildCategoryPage(catKey, articles) {
  const catConfig = CATEGORIES[catKey];
  const catDesc = CATEGORY_DESCRIPTIONS[catKey];
  if (!catConfig || !catDesc) return;

  const filtered = articles.filter(a => inferCategory(a) === catKey);

  const crumbs = [
    { name: 'Home', url: '/' },
    { name: catConfig.label },
  ];

  const cards = filtered.map(a => `
          <a href="/articles/${a.slug}.html" class="pt-card block group">
            <h3 class="font-display font-semibold text-slate-100 group-hover:text-violet-400 transition-colors leading-snug">${escapeHtml(a.title)}</h3>
            <p class="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-3">${escapeHtml(a.description)}</p>
            <span class="inline-block mt-3 text-xs font-medium text-violet-500 group-hover:text-violet-400">Read analysis &rarr;</span>
          </a>`).join('\n');

  const emptyState = filtered.length === 0 ? `
        <div class="bg-navy-800 border border-navy-600 rounded-xl p-8 text-center">
          <p class="text-slate-400">Analysis for this category is in development. Check back soon.</p>
          <a href="/articles.html" class="mt-4 inline-block text-violet-500 hover:text-violet-400 text-sm font-medium">Browse all articles &rarr;</a>
        </div>` : '';

  const head = headIncludes({
    title: `${catDesc.headline} | ${SITE.name}`,
    description: catDesc.subtitle,
    canonical: `${SITE.url}/${catKey}.html`,
    jsonLd: breadcrumbSchema(crumbs),
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${head}
</head>
<body class="bg-navy-900 font-body antialiased">

${megaNavHtml()}

    <!-- Header -->
    <section class="bg-navy-800 border-b border-navy-600">
      <div class="max-w-6xl mx-auto px-6 py-16">
        ${breadcrumbHtml(crumbs)}
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-navy-700 flex items-center justify-center">
            ${catDesc.icon}
          </div>
          <h1 class="font-display text-3xl md:text-4xl font-bold text-slate-100">${escapeHtml(catDesc.headline)}</h1>
        </div>
        <p class="mt-3 text-slate-400 text-lg max-w-2xl">${escapeHtml(catDesc.subtitle)}</p>
        <p class="mt-2 text-sm text-slate-500 font-mono">${filtered.length} article${filtered.length !== 1 ? 's' : ''}</p>
      </div>
    </section>

    <!-- Articles -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
${cards}
      </div>
${emptyState}
    </section>

    <!-- CTA -->
    <section class="max-w-6xl mx-auto px-6 py-8">
      <div class="pt-cta-box">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 class="font-display font-bold text-xl text-slate-100">Get the complete framework.</h3>
            <p class="mt-2 text-slate-400 text-sm">Find includes calculators, templates, and the full channel allocation methodology.</p>
          </div>
          <a href="/setup.html" class="shrink-0 px-8 py-3 bg-cta-500 hover:bg-cta-400 text-white font-semibold rounded-lg transition-colors text-sm">
            Get Find &mdash; $997
          </a>
        </div>
      </div>
    </section>

${footerHtml()}
${megaNavScript}

</body>
</html>`;

  fs.writeFileSync(path.join(DIST, `${catKey}.html`), html);
  console.log(`  Built: ${catKey}.html (${filtered.length} articles)`);
}

function generateIndexes(articles) {
  for (const catKey of Object.keys(CATEGORIES)) {
    buildCategoryPage(catKey, articles);
  }
}

module.exports = { generateIndexes };

if (require.main === module) {
  // Standalone: need to process articles first
  const { processArticles } = require('./md-to-html');
  const articles = processArticles();
  generateIndexes(articles);
}
