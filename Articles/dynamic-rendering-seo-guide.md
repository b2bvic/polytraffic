---
title:: Dynamic Rendering SEO Guide: Serve JavaScript Sites to Googlebot
description:: Implement dynamic rendering to serve pre-rendered HTML to Googlebot while keeping JavaScript for users. Fix indexing issues on React, Vue, Angular sites.
focus_keyword:: dynamic rendering seo
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Dynamic Rendering SEO Guide: Serve JavaScript Sites to Googlebot

> **Quick Summary**
> - **What this covers:** Implement dynamic rendering to serve pre-rendered HTML to Googlebot while keeping JavaScript for users. Fix indexing issues on React, Vue, Angular sites.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [When Dynamic Rendering Is Necessary](#when-dynamic-rendering-is-necessary)
- [Phase 1: Diagnose JavaScript Indexing Issues](#phase-1-diagnose-javascript-indexing-issues)
- [Phase 2: Choose Dynamic Rendering Solution](#phase-2-choose-dynamic-rendering-solution)
- [Phase 3: Implement Rendertron (Self-Hosted)](#phase-3-implement-rendertron-self-hosted)
- [Phase 4: Implement Prerender.io (SaaS)](#phase-4-implement-prerender-io-saas)
- [Phase 5: Avoid Cloaking Violations](#phase-5-avoid-cloaking-violations)
- [Phase 6: Monitor Dynamic Rendering Performance](#phase-6-monitor-dynamic-rendering-performance)
- [Phase 7: Transition to SSR (Long-Term Solution)](#phase-7-transition-to-ssr-long-term-solution)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**Dynamic rendering** serves pre-rendered static HTML to **Googlebot** while delivering JavaScript-heavy single-page applications (SPAs) to users, solving indexing failures on **React**, **Vue**, and **Angular** sites where content renders client-side after initial page load. Google's JavaScript crawler executes scripts but adds latency (2-5 seconds per page), exhausts [crawl budget](crawl-budget-optimization-large-sites.html) on render-intensive pages, and sometimes fails to execute complex frameworks that rely on newer JavaScript features. Dynamic rendering eliminates JavaScript execution delays for bots by detecting user-agent strings and serving fully-rendered HTML from **headless Chrome** snapshot or pre-built static exports, while maintaining interactive SPA experience for human visitors. Incorrect implementations, serving different content to users vs. bots (cloaking violations), failing to update pre-rendered snapshots when content changes, or blocking dynamic rendering URLs in robots.txt, trigger manual actions or leave bots indexing stale content. This guide implements dynamic rendering with Rendertron, Prerender.io, and Next.js/Nuxt.js frameworks without violating Google's cloaking policies.

## When Dynamic Rendering Is Necessary

**Google recommends server-side rendering (SSR) or static site generation (SSG) over dynamic rendering.** Use dynamic rendering only when SSR/SSG aren't feasible.

### Use Dynamic Rendering When:

**1. Legacy SPA with poor SSR support**
Older React/Vue/Angular apps built without SSR. Refactoring to SSR requires rewriting architecture.

**2. Complex client-side dependencies**
Third-party widgets, maps, real-time data fetches that don't server-render.

**3. Resource constraints**
SSR requires Node.js server infrastructure. Dynamic rendering works with static hosting + proxy.

**4. JavaScript-heavy sites with indexing issues**
Search Console shows "Discovered - currently not indexed" for pages with client-side content.

### Don't Use Dynamic Rendering When:

**1. SSR is possible**
Modern frameworks (Next.js, Nuxt.js, SvelteKit) handle SSR natively. Use SSR instead.

**2. Content is static**
Static site generators (Gatsby, Hugo, Astro) pre-build HTML at deploy time. No dynamic rendering needed.

**3. Google already indexes content correctly**
Test with URL Inspection Tool. If content appears, JavaScript rendering works, don't add complexity.

## Phase 1: Diagnose JavaScript Indexing Issues

**Verify Google indexes JavaScript-rendered content** before implementing dynamic rendering.

### Test with Google Search Console URL Inspection

1. Search Console → URL Inspection
2. Enter page URL
3. Click "Test live URL"
4. View "Crawled page" → "Screenshot"

**Compare:**
- **HTML source** (View Page Source in browser)
- **Rendered content** (what Search Console screenshot shows)

**Problem indicators:**
- Screenshot shows blank page or loading spinner
- Key content (headings, products, articles) missing from screenshot
- Source HTML contains `<div id="app"></div>` with no content

### Check Indexed Content

```
site:example.com "unique text from JavaScript-rendered content"
```

**If no results:** Google isn't indexing JavaScript-rendered content.

### Validate with JavaScript Disabled

**Chrome DevTools:**
1. Settings → Debugger → Disable JavaScript
2. Reload page
3. Check if content appears

**If page is blank with JS disabled:** Googlebot may struggle to index content, even though Google executes JavaScript.

## Phase 2: Choose Dynamic Rendering Solution

**Three approaches** with different complexity and cost.

### Option 1: Rendertron (Google's Open-Source Solution)

**Self-hosted headless Chrome renderer.**

**Pros:**
- Free, open-source
- Official Google recommendation
- Full control over infrastructure

**Cons:**
- Requires server setup and maintenance
- Manage caching logic yourself
- Monitor uptime

**Best for:** Developers comfortable managing infrastructure.

### Option 2: Prerender.io (SaaS Solution)

**Commercial service, $25-$200+/month.**

**Pros:**
- No infrastructure management
- Built-in caching
- Recache webhooks for content updates

**Cons:**
- Monthly cost
- Vendor dependency

**Best for:** Teams wanting turnkey solution.

### Option 3: Framework-Native SSR (Next.js, Nuxt.js)

**Not technically "dynamic rendering" but achieves same goal.**

**Pros:**
- Best performance (SSR faster than pre-rendering)
- No user-agent detection needed
- SEO-optimized by default

**Cons:**
- Requires refactoring existing SPA
- Node.js server required

**Best for:** New projects or sites willing to refactor.

## Phase 3: Implement Rendertron (Self-Hosted)

**Rendertron** runs headless Chrome, renders pages, returns HTML.

### Install Rendertron

**Docker (easiest):**
```bash
docker pull rendertron/rendertron
docker run -p 3000:3000 rendertron/rendertron
```

**Or Node.js:**
```bash
git clone https://github.com/GoogleChrome/rendertron.git
cd rendertron
npm install
npm run build
npm start
```

**Rendertron runs on http://localhost:3000**

### Configure Web Server to Proxy Bot Requests

**Nginx configuration:**
```nginx
server {
  server_name example.com;

  location / {
    # Detect bot user-agents
    if ($http_user_agent ~* "googlebot|bingbot|yandex|baiduspider") {
      proxy_pass http://localhost:3000/render/https://example.com$request_uri;
      break;
    }

    # Serve normal SPA for users
    try_files $uri $uri/ /index.html;
  }
}
```

**Apache (.htaccess):**
```apache
RewriteEngine On

# Detect bots
RewriteCond %{HTTP_USER_AGENT} googlebot|bingbot|yandex|baiduspider [NC]
RewriteRule ^(.*)$ http://localhost:3000/render/https://example.com/$1 [P,L]
```

### Test Rendertron

**Render a page:**
```bash
curl http://localhost:3000/render/https://example.com
```

**Should return fully-rendered HTML with JavaScript-generated content.**

### Cache Rendered Pages

**Rendertron doesn't cache by default.** Add caching layer:

**Nginx caching:**
```nginx
proxy_cache_path /var/cache/nginx/rendertron levels=1:2 keys_zone=rendertron_cache:10m max_size=1g inactive=60m;

location / {
  if ($http_user_agent ~* "googlebot|bingbot") {
    proxy_cache rendertron_cache;
    proxy_cache_valid 200 24h;
    proxy_pass http://localhost:3000/render/https://example.com$request_uri;
    break;
  }
}
```

## Phase 4: Implement Prerender.io (SaaS)

**Commercial alternative** to self-hosting.

### Sign Up and Configure

1. Create account at [prerender.io](https://prerender.io)
2. Get API token
3. Add domain

### Configure Web Server

**Nginx middleware:**
```bash
# Install prerender middleware
git clone https://github.com/prerender/prerender-nginx.git
```

**nginx.conf:**
```nginx
server {
  location / {
    set $prerender 0;

    if ($http_user_agent ~* "googlebot|bingbot|yandex|baiduspider") {
      set $prerender 1;
    }

    if ($prerender = 1) {
      proxy_pass https://service.prerender.io;
      proxy_set_header X-Prerender-Token YOUR_TOKEN;
      proxy_set_header X-Prerender-Host $host;
      break;
    }

    try_files $uri $uri/ /index.html;
  }
}
```

### Recache Pages When Content Updates

**Webhook to Prerender.io after publishing new content:**
```bash
curl -X POST https://api.prerender.io/recache \
  --header @prerender-auth-header.txt \
  -d '{"url": "https://example.com/updated-page"}'
```

**Integrate with CMS:** Trigger recache on save/publish.

## Phase 5: Avoid Cloaking Violations

**Cloaking** = showing different content to bots vs. users. Google penalizes cloaking.

### Ensure Content Equivalence

**Rendered HTML for bots must match JavaScript-rendered content for users.**

**Allowed differences:**
- Removing ads for bots (performance optimization)
- Simplifying animations (bots don't interact)

**Not allowed:**
- Adding/removing products from page
- Changing prices or descriptions
- Hiding/showing entire sections

### Test Both Versions

**User version:**
```bash
curl https://example.com
```

**Bot version (with User-Agent):**
```bash
curl -A "Googlebot" https://example.com
```

**Compare content:** Key text, headings, links should match.

### Use Google's Mobile-Friendly Test

[https://search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly)

**Shows rendered page as Googlebot sees it.** Compare to user-facing version.

## Phase 6: Monitor Dynamic Rendering Performance

**Pre-rendering adds latency for bots.** Monitor to ensure fast responses.

### Track Bot Response Times

**Server logs show Rendertron response times:**
```bash
grep "Googlebot" /var/log/nginx/access.log | awk '{print $NF}' | sort -n
```

**Target:** <2 seconds per page

**If slower:**
- Increase Rendertron instances (horizontal scaling)
- Optimize JavaScript bundle size
- Cache rendered HTML longer

### Monitor Cache Hit Rates

**Nginx cache stats:**
```bash
grep "HIT" /var/log/nginx/access.log | wc -l
grep "MISS" /var/log/nginx/access.log | wc -l
```

**Target:** >80% hit rate

**Low hit rate = wasted [crawl budget](crawl-budget-optimization-large-sites.html)** (every bot request re-renders).

## Phase 7: Transition to SSR (Long-Term Solution)

**Dynamic rendering is a workaround.** SSR is superior.

### Migrate React SPA to Next.js

**Next.js** adds SSR to React with minimal refactoring.

**Install:**
```bash
npx create-next-app@latest
```

**Convert pages:**
```javascript
// pages/products/[id].js (Next.js)
export async function getServerSideProps(context) {
  const { id } = context.params;
  const product = await fetch(`https://api.example.com/products/${id}`).then(r => r.json());

  return { props: { product } };
}

export default function Product({ product }) {
  return <div>{product.name}</div>;
}
```

**SSR benefits:**
- No user-agent detection
- Faster first contentful paint
- Better [Core Web Vitals](core-web-vitals-audit-checklist.html)

### Migrate Vue SPA to Nuxt.js

**Nuxt.js = Next.js for Vue.**

**Install:**
```bash
npx nuxi@latest init my-app
```

**SSR by default.** Existing Vue components work with minimal changes.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.

## Frequently Asked Questions

### Does dynamic rendering violate Google's cloaking policy?

**No**, if content is equivalent. Google's official guidance allows dynamic rendering for JavaScript-heavy sites. Key requirement: rendered HTML shown to bots must match JavaScript-rendered content shown to users. Removing ads or simplifying styles for bots is acceptable. Changing product info, prices, or content is cloaking.

### Is dynamic rendering slower than SSR?

**Yes.** Dynamic rendering requires headless Chrome to render each page, adding 1-3 seconds. **SSR** renders on server at request time (faster, 100-300ms). **SSG** (static site generation) pre-renders at build time (fastest, <10ms). Use dynamic rendering only when SSR/SSG aren't viable.

### How do I update pre-rendered content when my database changes?

**Invalidate cache** after content updates. With **Prerender.io**, use recache API. With **Rendertron + Nginx**, purge cache:
```bash
rm -rf /var/cache/nginx/rendertron/*
```
Or programmatic purge:
```bash
curl -X PURGE https://example.com/updated-page
```
Automate with webhooks from CMS on publish/update events.

### Can I use dynamic rendering for mobile-only or desktop-only?

**Yes**, but not recommended. Detect device type along with user-agent:
```nginx
if ($http_user_agent ~* "mobile.*googlebot") {
  # Render mobile version
}
if ($http_user_agent ~* "googlebot" and $http_user_agent !~* "mobile") {
  # Render desktop version
}
```
**Better approach:** Responsive design (single HTML works on all devices). Dynamic rendering adds complexity. See [Core Web Vitals mobile optimization](core-web-vitals-failing-mobile-only.html).

### Should I use dynamic rendering for my React/Next.js app?

**No.** If using **Next.js**, you already have SSR or SSG, no dynamic rendering needed. Dynamic rendering is for legacy SPAs without SSR capability. Next.js, Nuxt.js, SvelteKit handle server rendering natively. Only use dynamic rendering if refactoring to SSR framework isn't feasible.

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
