/**
 * Polytraffic — Signal Grid Design System
 * Retemplate: applies the Signal Grid design system to existing raw HTML files.
 * Wraps content in mega nav, footer, head includes, and applies Tailwind classes.
 *
 * Usage: node scripts/retemplate.js [file.html ...] or node scripts/retemplate.js --all
 *   --all  Process all .html files in dist/ (excluding articles/ subdirectory)
 *   file   Process specific file(s)
 */

const fs = require('fs');
const path = require('path');
const {
  SITE, headIncludes, megaNavHtml, megaNavScript, footerHtml, escapeAttr,
} = require('./shared');

const DIST = path.join(__dirname, '..', 'dist');

// ── Extract metadata from existing HTML ──────────────────────────
function extractMeta(html) {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const descMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i)
    || html.match(/<meta\s+content="(.*?)"\s+name="description"/i);
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="(.*?)"/i);

  const title = titleMatch ? titleMatch[1] : SITE.name;
  const description = descMatch ? descMatch[1] : '';
  const canonical = canonicalMatch ? canonicalMatch[1] : '';

  return { title, description, canonical };
}

// ── Extract body content ─────────────────────────────────────────
function extractBody(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return html;

  let content = bodyMatch[1];

  // Strip existing nav (look for common nav patterns)
  content = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');

  // Strip existing footer
  content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');

  // Strip existing script tags that aren't application/ld+json
  content = content.replace(/<script(?!\s+type="application\/ld\+json")[^>]*>[\s\S]*?<\/script>/gi, '');

  return content.trim();
}

// ── Retemplate a single file ─────────────────────────────────────
function retemplateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`  File not found: ${filePath}`);
    return false;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const meta = extractMeta(raw);
  const bodyContent = extractBody(raw);

  const filename = path.basename(filePath);
  const canonical = meta.canonical || `${SITE.url}/${filename}`;

  const head = headIncludes({
    title: meta.title,
    description: meta.description,
    canonical,
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${head}
</head>
<body class="bg-navy-900 font-body antialiased">

${megaNavHtml()}

    <main class="max-w-6xl mx-auto px-6 py-12">
${bodyContent}
    </main>

${footerHtml()}
${megaNavScript}

</body>
</html>`;

  fs.writeFileSync(filePath, html);
  console.log(`  Retemplated: ${filename}`);
  return true;
}

// ── Main ─────────────────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node scripts/retemplate.js [--all | file1.html file2.html ...]');
    console.log('  --all    Process all .html files in dist/ (top level only)');
    process.exit(1);
  }

  if (args.includes('--all')) {
    console.log('Retemplating all dist/ HTML files...\n');
    const files = fs.readdirSync(DIST)
      .filter(f => f.endsWith('.html'))
      .filter(f => !['index.html', 'articles.html', '404.html'].includes(f));

    let count = 0;
    for (const file of files) {
      if (retemplateFile(path.join(DIST, file))) count++;
    }
    console.log(`\n${count} files retemplated.`);
  } else {
    for (const file of args) {
      const fullPath = path.isAbsolute(file) ? file : path.join(DIST, file);
      retemplateFile(fullPath);
    }
  }
}

module.exports = { retemplateFile };

if (require.main === module) {
  main();
}
