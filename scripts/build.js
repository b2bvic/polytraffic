/**
 * Polytraffic — Signal Grid Design System
 * Main build pipeline. Processes Articles/*.md → dist/, builds index, category pages, sitemap.
 */

const fs = require('fs');
const path = require('path');
const { processArticles } = require('./md-to-html');
const { generateIndexes } = require('./generate-indexes');
const { generateSitemap } = require('./generate-sitemap');
const {
  SITE, headIncludes, megaNavHtml, megaNavScript, footerHtml,
  websiteSchema, inferCategory, escapeHtml, CATEGORIES,
} = require('./shared');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PAGES_DIR = path.join(ROOT, 'Pages');

// ── Clean ────────────────────────────────────────────────────────
function clean() {
  if (fs.existsSync(DIST)) {
    fs.rmSync(DIST, { recursive: true });
  }
  fs.mkdirSync(DIST, { recursive: true });
  console.log('  Cleaned dist/');
}

// ── Copy Static Assets ──────────────────────────────────────────
function copyStatic() {
  // Copy base.css to dist
  const cssSource = path.join(ROOT, 'base.css');
  if (fs.existsSync(cssSource)) {
    fs.copyFileSync(cssSource, path.join(DIST, 'base.css'));
    console.log('  Copied: base.css');
  }
}

// ── Build Article Cards ──────────────────────────────────────────
function buildArticleCards(articles) {
  return articles.map(a => {
    const cat = inferCategory(a);
    const catLabel = CATEGORIES[cat]?.label || 'Resilience';
    return `
          <a href="/articles/${a.slug}.html" class="pt-card block group">
            <span class="text-xs font-mono text-violet-500 uppercase tracking-wider">${escapeHtml(catLabel)}</span>
            <h3 class="mt-2 font-display font-semibold text-slate-100 group-hover:text-violet-400 transition-colors leading-snug">${escapeHtml(a.title)}</h3>
            <p class="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-3">${escapeHtml(a.description)}</p>
            <span class="inline-block mt-3 text-xs font-medium text-violet-500 group-hover:text-violet-400">Read analysis &rarr;</span>
          </a>`;
  }).join('\n');
}

// ── Homepage ─────────────────────────────────────────────────────
function buildIndex(articles) {
  const recentCards = buildArticleCards(articles.slice(0, 6));

  // Stats from the article corpus
  const categoryCount = new Set(articles.map(a => inferCategory(a))).size;
  const channelArticles = articles.filter(a => inferCategory(a) === 'channels').length;
  const econArticles = articles.filter(a => inferCategory(a) === 'economics').length;

  const head = headIncludes({
    title: `${SITE.name} — Multi-channel traffic intelligence`,
    description: SITE.description,
    canonical: `${SITE.url}/`,
    jsonLd: websiteSchema(),
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${head}
</head>
<body class="bg-navy-900 font-body antialiased">

${megaNavHtml()}

    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900"></div>
      <!-- Grid overlay -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px); background-size: 60px 60px;"></div>

      <div class="relative max-w-6xl mx-auto px-6 py-24 md:py-36">
        <div class="max-w-3xl">
          <span class="inline-block text-xs font-mono font-medium text-violet-500 uppercase tracking-widest mb-6">Traffic Portfolio Intelligence</span>
          <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 leading-[1.1] tracking-tight">
            Stop gambling on<br class="hidden md:block" />
            <span class="pt-gradient-text">single traffic sources.</span>
          </h1>
          <p class="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            87% of publishers depend on one channel for survival. One algorithm update, one policy change, one platform pivot &mdash; and revenue vanishes overnight. Polytraffic gives you the frameworks to build traffic portfolios that survive volatility.
          </p>
          <div class="mt-10 flex flex-wrap gap-4">
            <a href="/setup.html" class="inline-flex items-center gap-2 px-8 py-3.5 bg-cta-500 hover:bg-cta-400 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-cta-500/20">
              Build Your Portfolio &mdash; $997
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
            <a href="/articles.html" class="inline-flex items-center gap-2 px-8 py-3.5 border border-navy-600 text-slate-400 hover:text-violet-400 hover:border-violet-500/50 font-medium rounded-lg transition-all">
              Read the Research
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Dashboard Stats -->
    <section class="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="pt-stat">
          <div class="pt-stat-value text-violet-500">87%</div>
          <div class="pt-stat-label">Publishers single-channel dependent</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value text-cyan-500">6</div>
          <div class="pt-stat-label">Core traffic channels</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value text-cta-500">40%</div>
          <div class="pt-stat-label">Avg. traffic loss per algorithm update</div>
        </div>
        <div class="pt-stat">
          <div class="pt-stat-value text-violet-500">${articles.length}</div>
          <div class="pt-stat-label">Published analyses</div>
        </div>
      </div>
    </section>

    <!-- Channel Allocation Visualization -->
    <section class="max-w-6xl mx-auto px-6 py-20">
      <div class="text-center mb-12">
        <span class="inline-block text-xs font-mono text-violet-500 uppercase tracking-widest mb-3">Risk Assessment</span>
        <h2 class="font-display text-3xl md:text-4xl font-bold text-slate-100">Typical Publisher Traffic Allocation</h2>
        <p class="mt-3 text-slate-400 max-w-xl mx-auto">Most publishers operate concentrated portfolios. The gap between current allocation and optimal diversification is where the risk lives.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Current (Concentrated) -->
        <div class="bg-navy-800 border border-navy-600 rounded-xl p-6">
          <h3 class="font-display font-semibold text-slate-100 mb-1">Concentrated Portfolio</h3>
          <p class="text-xs text-red-400 font-mono mb-6">HIGH RISK &bull; SINGLE-SOURCE DEPENDENT</p>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="text-slate-400">Google Organic</span><span class="font-mono text-red-400">87%</span></div>
              <div class="pt-bar-track"><div class="pt-bar bg-red-500/80" style="width:87%"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="text-slate-400">Direct</span><span class="font-mono text-slate-500">9%</span></div>
              <div class="pt-bar-track"><div class="pt-bar bg-slate-500/60" style="width:9%"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="text-slate-400">Other</span><span class="font-mono text-slate-500">4%</span></div>
              <div class="pt-bar-track"><div class="pt-bar bg-slate-500/40" style="width:4%"></div></div>
            </div>
          </div>
        </div>

        <!-- Diversified -->
        <div class="bg-navy-800 border border-violet-500/30 rounded-xl p-6 pt-glow">
          <h3 class="font-display font-semibold text-slate-100 mb-1">Diversified Portfolio</h3>
          <p class="text-xs text-emerald-400 font-mono mb-6">RESILIENT &bull; MULTI-CHANNEL</p>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="text-slate-400">SEO</span><span class="font-mono text-violet-400">35%</span></div>
              <div class="pt-bar-track"><div class="pt-bar bg-violet-500/80" style="width:35%"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="text-slate-400">Email (Owned)</span><span class="font-mono text-cyan-400">25%</span></div>
              <div class="pt-bar-track"><div class="pt-bar bg-cyan-500/80" style="width:25%"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="text-slate-400">Social</span><span class="font-mono text-violet-400">15%</span></div>
              <div class="pt-bar-track"><div class="pt-bar bg-violet-500/60" style="width:15%"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="text-slate-400">Referral</span><span class="font-mono text-cyan-400">12%</span></div>
              <div class="pt-bar-track"><div class="pt-bar bg-cyan-500/60" style="width:12%"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="text-slate-400">Paid</span><span class="font-mono text-violet-400">8%</span></div>
              <div class="pt-bar-track"><div class="pt-bar bg-violet-500/40" style="width:8%"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="text-slate-400">Direct</span><span class="font-mono text-cyan-400">5%</span></div>
              <div class="pt-bar-track"><div class="pt-bar bg-cyan-500/40" style="width:5%"></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <span class="inline-block text-xs font-mono text-violet-500 uppercase tracking-widest mb-3">Research Areas</span>
        <h2 class="font-display text-3xl md:text-4xl font-bold text-slate-100">Explore by Domain</h2>
      </div>

      <div class="grid md:grid-cols-3 gap-6">

        <a href="/channels.html" class="group bg-navy-800 border border-navy-600 rounded-xl p-6 hover:border-violet-500/50 transition-all">
          <div class="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          </div>
          <h3 class="font-display font-semibold text-slate-100 group-hover:text-violet-400 transition-colors">Channels</h3>
          <p class="mt-2 text-sm text-slate-500">Deep analysis of each traffic channel: acquisition cost, scalability ceiling, platform risk, and correlation with other sources.</p>
        </a>

        <a href="/economics.html" class="group bg-navy-800 border border-navy-600 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
          <div class="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          </div>
          <h3 class="font-display font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">Economics</h3>
          <p class="mt-2 text-sm text-slate-500">CPV analysis, attribution models, and ROI frameworks. Measure what each visitor actually costs and what they generate.</p>
        </a>

        <a href="/resilience.html" class="group bg-navy-800 border border-navy-600 rounded-xl p-6 hover:border-cta-500/50 transition-all">
          <div class="w-10 h-10 rounded-lg bg-cta-500/10 flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-cta-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h3 class="font-display font-semibold text-slate-100 group-hover:text-cta-400 transition-colors">Resilience</h3>
          <p class="mt-2 text-sm text-slate-500">Algorithm survival, platform risk scoring, correlation analysis. Build portfolios that absorb volatility instead of breaking.</p>
        </a>

      </div>
    </section>

    <!-- Latest Articles -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <div class="flex items-end justify-between mb-8">
        <div>
          <span class="inline-block text-xs font-mono text-violet-500 uppercase tracking-widest mb-3">Latest</span>
          <h2 class="font-display text-3xl font-bold text-slate-100">Recent Analysis</h2>
        </div>
        <a href="/articles.html" class="text-sm text-violet-500 hover:text-violet-400 font-medium transition-colors hidden md:block">View all &rarr;</a>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
${recentCards}
      </div>
      <div class="mt-8 text-center md:hidden">
        <a href="/articles.html" class="text-sm text-violet-500 hover:text-violet-400 font-medium transition-colors">View all articles &rarr;</a>
      </div>
    </section>

    <!-- Email Capture -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <div class="bg-navy-800 border border-navy-600 rounded-2xl p-8 md:p-12 text-center">
        <span class="inline-block text-xs font-mono text-cyan-500 uppercase tracking-widest mb-4">Signal Feed</span>
        <h2 class="font-display text-2xl md:text-3xl font-bold text-slate-100">Get traffic intelligence weekly.</h2>
        <p class="mt-3 text-slate-400 max-w-lg mx-auto">Channel analysis, allocation frameworks, and platform risk alerts. No fluff. Unsubscribe anytime.</p>
        <form class="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="#" method="POST">
          <input type="email" placeholder="you@publisher.com" required class="flex-1 px-4 py-3 bg-navy-900 border border-navy-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 text-sm" />
          <button type="submit" class="px-6 py-3 bg-violet-500 hover:bg-violet-400 text-white font-semibold rounded-lg transition-colors text-sm whitespace-nowrap">
            Subscribe
          </button>
        </form>
        <p class="mt-3 text-xs text-slate-500">No spam. Portfolio-grade signal only.</p>
      </div>
    </section>

    <!-- Offer CTA -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <div class="bg-gradient-to-r from-navy-800 to-navy-800 border border-cta-500/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-cta-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div class="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span class="inline-block text-xs font-mono text-cta-500 uppercase tracking-widest mb-3">The Full System</span>
            <h2 class="font-display text-2xl md:text-3xl font-bold text-slate-100">Find: Traffic Portfolio Framework</h2>
            <p class="mt-3 text-slate-400 max-w-lg">The complete methodology for building, measuring, and defending diversified traffic portfolios. Includes calculators, templates, risk scoring models, and the channel allocation framework.</p>
            <ul class="mt-4 space-y-2 text-sm text-slate-400">
              <li class="flex items-center gap-2"><svg class="w-4 h-4 text-cta-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> 6-channel allocation framework</li>
              <li class="flex items-center gap-2"><svg class="w-4 h-4 text-cta-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> CPV + attribution calculators</li>
              <li class="flex items-center gap-2"><svg class="w-4 h-4 text-cta-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Platform risk scoring model</li>
              <li class="flex items-center gap-2"><svg class="w-4 h-4 text-cta-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Algorithm recovery playbook</li>
            </ul>
          </div>
          <div class="shrink-0 text-center">
            <div class="font-display text-4xl font-bold text-cta-500">$997</div>
            <p class="text-xs text-slate-500 mt-1">One-time. Lifetime access.</p>
            <a href="/setup.html" class="mt-4 inline-block px-10 py-3.5 bg-cta-500 hover:bg-cta-400 text-white font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-cta-500/20 text-sm">
              Get Find Now
            </a>
          </div>
        </div>
      </div>
    </section>

${footerHtml()}
${megaNavScript}

</body>
</html>`;

  fs.writeFileSync(path.join(DIST, 'index.html'), html);
  console.log('  Built: index.html');
}

// ── Articles Hub ─────────────────────────────────────────────────
function buildArticlesHub(articles) {
  const cards = buildArticleCards(articles);

  const head = headIncludes({
    title: `Articles | ${SITE.name}`,
    description: 'In-depth analysis of traffic channel economics, portfolio diversification, and platform resilience strategies.',
    canonical: `${SITE.url}/articles.html`,
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
        <span class="inline-block text-xs font-mono text-violet-500 uppercase tracking-widest mb-4">Research Library</span>
        <h1 class="font-display text-3xl md:text-4xl font-bold text-slate-100">All Articles</h1>
        <p class="mt-4 text-slate-400 text-lg max-w-2xl">Channel analysis, economics frameworks, and resilience strategies. Each piece backed by data, built for operators.</p>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
${cards}
      </div>
    </section>

${footerHtml()}
${megaNavScript}

</body>
</html>`;

  fs.writeFileSync(path.join(DIST, 'articles.html'), html);
  console.log('  Built: articles.html');
}

// ── 404 Page ─────────────────────────────────────────────────────
function build404() {
  const head = headIncludes({
    title: `Page Not Found | ${SITE.name}`,
    description: 'This page does not exist.',
    canonical: `${SITE.url}/404.html`,
    noindex: true,
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${head}
</head>
<body class="bg-navy-900 font-body antialiased">

${megaNavHtml()}

    <main class="max-w-4xl mx-auto px-6 py-32 text-center">
      <div class="font-display text-8xl font-bold text-violet-500/20">404</div>
      <h1 class="mt-4 font-display text-2xl font-bold text-slate-100">Signal lost.</h1>
      <p class="mt-3 text-slate-400">The page you requested doesn't exist or has been moved.</p>
      <a href="/" class="inline-block mt-8 px-8 py-3 bg-violet-500 hover:bg-violet-400 text-white font-semibold rounded-lg transition-colors text-sm">Return to Dashboard</a>
    </main>

${footerHtml()}
${megaNavScript}

</body>
</html>`;

  fs.writeFileSync(path.join(DIST, '404.html'), html);
  console.log('  Built: 404.html');
}

// ── Robots.txt ───────────────────────────────────────────────────
function buildRobots() {
  const content = `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;
  fs.writeFileSync(path.join(DIST, 'robots.txt'), content);
  console.log('  Built: robots.txt');
}

// ── Copy Pages ───────────────────────────────────────────────────
function copyPages() {
  if (!fs.existsSync(PAGES_DIR)) return;

  const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.html'));
  for (const file of files) {
    fs.copyFileSync(path.join(PAGES_DIR, file), path.join(DIST, file));
    console.log(`  Copied: ${file}`);
  }
}

// ── Main ─────────────────────────────────────────────────────────
function main() {
  console.log('Building polytraffic.com (Signal Grid)\n');

  clean();
  copyStatic();

  console.log('\nProcessing articles...');
  const articles = processArticles();
  console.log(`  ${articles.length} articles processed.\n`);

  console.log('Building pages...');
  buildIndex(articles);
  buildArticlesHub(articles);
  build404();
  buildRobots();

  console.log('\nGenerating category indexes...');
  generateIndexes(articles);

  console.log('\nGenerating sitemap...');
  generateSitemap(articles);

  console.log('\nCopying static pages...');
  copyPages();

  const fileCount = countFiles(DIST);
  console.log(`\nBuild complete. ${fileCount} files in dist/`);
}

function countFiles(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name));
    } else {
      count++;
    }
  }
  return count;
}

main();
