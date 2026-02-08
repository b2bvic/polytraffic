/**
 * Polytraffic — Signal Grid Design System
 * Sitemap generator. Produces sitemap.xml in dist/.
 */

const fs = require('fs');
const path = require('path');
const { SITE, CATEGORIES } = require('./shared');

const DIST = path.join(__dirname, '..', 'dist');

function generateSitemap(articles) {
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/articles.html', changefreq: 'weekly', priority: '0.9' },
    { loc: '/setup.html', changefreq: 'monthly', priority: '0.9' },
  ];

  // Category pages
  for (const catKey of Object.keys(CATEGORIES)) {
    staticPages.push({
      loc: `/${catKey}.html`,
      changefreq: 'weekly',
      priority: '0.8',
    });
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static pages
  for (const page of staticPages) {
    xml += `
  <url>
    <loc>${SITE.url}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  // Articles
  for (const a of articles) {
    const date = a.date || today;
    xml += `
  <url>
    <loc>${SITE.url}/articles/${a.slug}.html</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  xml += '\n</urlset>\n';

  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml);
  console.log(`  Built: sitemap.xml (${staticPages.length + articles.length} URLs)`);
}

module.exports = { generateSitemap };

if (require.main === module) {
  const { processArticles } = require('./md-to-html');
  const articles = processArticles();
  generateSitemap(articles);
}
