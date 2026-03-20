/**
 * Polytraffic — Signal Grid Design System
 * Markdown to HTML processor with frontmatter, schema, internal links, and article template.
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const {
  SITE, headIncludes, megaNavHtml, megaNavScript, footerHtml,
  articleSchema, breadcrumbSchema, breadcrumbHtml, inferCategory,
  escapeHtml, escapeAttr, CATEGORIES, ENTITY_SCHEMAS_HTML,
} = require('./shared');

const SKIP_FILES = ['README.md', '_brief.md', '_content-stack.md'];
const ARTICLES_DIR = path.join(__dirname, '..', 'Articles');
const DIST_DIR = path.join(__dirname, '..', 'dist', 'articles');

// ── Frontmatter Parser ───────────────────────────────────────────
function parseFrontmatter(content) {
  const meta = {};
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return { meta, body: content };

  const fmBlock = fmMatch[1];
  for (const line of fmBlock.split('\n')) {
    const match = line.match(/^([\w][\w_-]*)::?\s*(.+)$/);
    if (match) {
      meta[match[1].trim()] = match[2].trim();
    }
  }

  const body = content.slice(fmMatch[0].length).trim();
  return { meta, body };
}

// ── Slugify ──────────────────────────────────────────────────────
function fileSlug(filename) {
  return filename.replace(/\.md$/, '');
}

// ── Marked Configuration ─────────────────────────────────────────
marked.setOptions({
  gfm: true,
  breaks: false,
  smartypants: false,
});

// Custom renderer for internal link placeholders [INTERNAL: Title]
const renderer = new marked.Renderer();
const originalLink = renderer.link.bind(renderer);

renderer.link = function({ href, title, tokens }) {
  const text = tokens ? tokens.map(t => t.raw || t.text || '').join('') : '';
  // Handle internal link placeholders
  if (href === '' || href === '#') {
    const internalMatch = text.match(/^INTERNAL:\s*(.+)$/);
    if (internalMatch) {
      const linkText = internalMatch[1].trim();
      const slug = linkText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<a href="/articles/${slug}.html" class="text-violet-500 hover:text-violet-400 border-b border-violet-500/30 hover:border-violet-400 transition-colors">${escapeHtml(linkText)}</a>`;
    }
  }
  return `<a href="${href}"${title ? ` title="${escapeAttr(title)}"` : ''} class="text-violet-500 hover:text-violet-400 border-b border-violet-500/30 hover:border-violet-400 transition-colors">${text}</a>`;
};

marked.use({ renderer });

// ── Related Articles ─────────────────────────────────────────────
function findRelated(current, allArticles, count = 3) {
  const currentCat = inferCategory(current);
  const candidates = allArticles
    .filter(a => a.slug !== current.slug)
    .map(a => {
      let score = 0;
      if (inferCategory(a) === currentCat) score += 5;
      // Keyword overlap
      const currentWords = new Set(`${current.title} ${current.keywords || ''}`.toLowerCase().split(/\W+/));
      const articleWords = `${a.title} ${a.keywords || ''}`.toLowerCase().split(/\W+/);
      for (const w of articleWords) {
        if (w.length > 3 && currentWords.has(w)) score += 1;
      }
      return { ...a, score };
    })
    .sort((a, b) => b.score - a.score);

  return candidates.slice(0, count);
}

function relatedArticlesHtml(related) {
  if (!related.length) return '';
  const cards = related.map(a => `
          <a href="/articles/${a.slug}.html" class="pt-card block group">
            <span class="text-xs font-mono text-violet-500 uppercase tracking-wider">${inferCategory(a)}</span>
            <h4 class="mt-2 font-display font-semibold text-slate-100 group-hover:text-violet-400 transition-colors leading-snug">${escapeHtml(a.title)}</h4>
            <p class="mt-2 text-sm text-slate-500 line-clamp-2">${escapeHtml(a.description || '')}</p>
          </a>`).join('\n');

  return `
      <!-- Related Articles -->
      <section class="mt-16 pt-10 border-t border-navy-600">
        <h3 class="font-display font-semibold text-xl text-slate-100 mb-6">Related Analysis</h3>
        <div class="grid md:grid-cols-3 gap-6">
${cards}
        </div>
      </section>`;
}

// ── CTA Block ────────────────────────────────────────────────────
function ctaBlock() {
  return `
      <!-- CTA -->
      <div class="pt-cta-box mt-12">
        <div class="flex flex-col items-start gap-4">
          <h3 class="font-display font-bold text-xl text-slate-100">This is one piece of the system.</h3>
          <p class="text-slate-400 text-sm max-w-lg">Built by Victor Romo (<a href="https://x.com/b2bvic" class="text-violet-500 hover:text-violet-400 transition-colors" target="_blank" rel="noopener">@b2bvic</a>) &mdash; I build AI memory systems for businesses.</p>
          <div class="flex flex-wrap gap-3 mt-2">
            <a href="https://scalewithsearch.com" class="px-8 py-3 bg-cta-500 hover:bg-cta-400 text-white font-semibold rounded-lg transition-colors text-sm" target="_blank" rel="noopener">
              See The Full System
            </a>
            <a href="https://github.com/b2bvic/scale-with-search" class="px-8 py-3 border border-navy-600 hover:border-violet-500 text-slate-300 hover:text-violet-400 font-semibold rounded-lg transition-colors text-sm" target="_blank" rel="noopener">
              View Repo
            </a>
          </div>
        </div>
      </div>`;
}

// ── Article HTML Builder ─────────────────────────────────────────
function buildArticleHTML(article, allArticles) {
  const { title, description, body, slug, date, category } = article;
  const htmlBody = marked(body);
  const cat = category || inferCategory(article);
  const catLabel = CATEGORIES[cat]?.label || 'Resilience';

  const crumbs = [
    { name: 'Home', url: '/' },
    { name: catLabel, url: `/${cat}.html` },
    { name: title },
  ];

  const related = findRelated(article, allArticles);

  const jsonLd = JSON.stringify([
    articleSchema(article),
    breadcrumbSchema(crumbs),
  ], null, 2);

  const head = headIncludes({
    title: `${title} | ${SITE.name}`,
    description: description || '',
    canonical: `${SITE.url}/articles/${slug}.html`,
    type: 'article',
    jsonLd,
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
${head}
${typeof ENTITY_SCHEMAS_HTML !== "undefined" ? ENTITY_SCHEMAS_HTML : ""}
</head>
<body class="bg-navy-900 font-body antialiased">

${megaNavHtml()}

    <!-- Article -->
    <main class="max-w-4xl mx-auto px-6 py-10">

      ${breadcrumbHtml(crumbs)}

      <!-- Category label -->
      <span class="inline-block text-xs font-mono font-medium text-violet-500 uppercase tracking-wider mb-4">${escapeHtml(catLabel)}</span>

      <article class="pt-prose">
        ${htmlBody}
      </article>

${ctaBlock()}
${relatedArticlesHtml(related)}

      <!-- Back nav -->
      <div class="mt-12 pt-8 border-t border-navy-600">
        <a href="/articles.html" class="text-violet-500 hover:text-violet-400 font-medium text-sm transition-colors">&larr; All Articles</a>
      </div>

    </main>

${footerHtml()}
${megaNavScript}

</body>
</html>`;
}

// ── Process All Articles ─────────────────────────────────────────
function processArticles() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.log('  No Articles directory found.');
    return [];
  }

  fs.mkdirSync(DIST_DIR, { recursive: true });

  const files = fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.md') && !SKIP_FILES.includes(f));

  // First pass: collect metadata
  const articles = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
    const { meta, body } = parseFrontmatter(raw);

    const slug = meta.slug || fileSlug(file);
    const title = meta.title || slug.replace(/-/g, ' ');
    const description = meta.description || meta.focus_keyword || '';
    const date = (meta.date || meta.created || '2026.01.19').replace(/\./g, '-');
    const keywords = meta.keywords || meta.focus_keyword || '';
    const category = meta.category || null;

    articles.push({ slug, title, description, date, keywords, category, body, file });
  }

  // Second pass: build HTML with cross-references
  for (const article of articles) {
    const html = buildArticleHTML(article, articles);
    fs.writeFileSync(path.join(DIST_DIR, `${article.slug}.html`), html);
    console.log(`  Built: articles/${article.slug}.html`);
  }

  // Return metadata without body for index builders
  return articles.map(({ body, file, ...rest }) => rest);
}

module.exports = { processArticles, parseFrontmatter, buildArticleHTML };

if (require.main === module) {
  const articles = processArticles();
  console.log(`\nProcessed ${articles.length} articles.`);
}
