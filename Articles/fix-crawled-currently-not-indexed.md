---
title:: How to Fix "Crawled – Currently Not Indexed" in Google Search Console
description:: Google crawled your pages but refused to index them. Learn why Google excludes crawled content, how to diagnose quality signals, and systematic fixes to force indexing for valuable pages stranded in limbo.
focus_keyword:: crawled currently not indexed
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Fix "Crawled – Currently Not Indexed" in Google Search Console

> **Quick Summary**
> - **What this covers:** Google crawled your pages but refused to index them. Learn why Google excludes crawled content, how to diagnose quality signals, and systematic fixes to force indexing for valuable pages stranded in limbo.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [What "Crawled – Currently Not Indexed" Means](#what-crawled-currently-not-indexed-means)
- [How to Find "Crawled – Currently Not Indexed" Pages in GSC](#how-to-find-crawled-currently-not-indexed-pages-in-gsc)
- [The 9 Most Common Causes (And How to Diagnose)](#the-9-most-common-causes-and-how-to-diagnose)
- [Step-by-Step Fix Protocol](#step-by-step-fix-protocol)
- [Advanced: Bulk Fixes for Large Sites](#advanced-bulk-fixes-for-large-sites)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**"Crawled – currently not indexed"** is Google's diplomatic way of saying "We looked at your page and decided it's not worth indexing." Googlebot visited, parsed the content, evaluated its quality, and filed it under "low priority" or "redundant." Your page sits in purgatory, crawled but invisible in search results.

This status plagues sites with thin content, duplicate pages, or weak internal linking. But it also snags legitimately valuable pages on large sites where Google's crawl budget prioritization leaves mid-tier content stranded.

The fix isn't a button click. It's forensic analysis: diagnose why Google devalued the page, strengthen its signals, and force a re-evaluation. This guide shows you how to audit "Crawled – currently not indexed" pages, eliminate the root causes, and systematically promote pages from limbo to the index.

## What "Crawled – Currently Not Indexed" Means

Google's indexing pipeline has three stages:

1. **Discovery:** Google finds the URL (via sitemap, internal link, external link)
2. **Crawling:** Googlebot fetches the page content
3. **Indexing:** Google evaluates quality and decides whether to include the page in search results

**"Crawled – currently not indexed"** means the page passed stages 1-2 but failed stage 3. Google crawled it, but the page didn't meet Google's quality threshold or demand signals to justify indexing.

### Why Google Excludes Crawled Pages

Google's internal quality algorithm evaluates:

1. **Content uniqueness:** Is this substantially different from other pages on your site or the web?
2. **Content depth:** Does this provide comprehensive coverage of the topic (800+ words for blogs, 500+ for products)?
3. **User demand:** Are people searching for this topic? Do other sites link to this content?
4. **Site authority:** Does your site have enough trust signals (backlinks, traffic, brand mentions) to warrant indexing every page?
5. **Crawl budget allocation:** For large sites (50,000+ pages), Google prioritizes high-value pages and defers low-signal pages indefinitely

**"Crawled – currently not indexed" doesn't mean Google will NEVER index the page.** It means Google deprioritized it. Your job: change the signals so Google re-evaluates.

## How to Find "Crawled – Currently Not Indexed" Pages in GSC

### Method 1: Page Indexing Report

1. **Google Search Console → Pages**
2. Scroll to **Why pages aren't indexed**
3. Click **Crawled – currently not indexed**

You'll see:
- Total count
- Example URLs (click "View examples" for full list)
- Trend graph (is the count increasing or decreasing?)

Export the list: **Export → Download → CSV**

### Method 2: URL Inspection Tool (Individual Diagnosis)

For specific high-value pages:

1. **GSC → URL Inspection**
2. Enter the URL
3. Check **Coverage** status

If it shows "Crawled – currently not indexed," expand the section to see:
- **Last crawl date**
- **Crawl user agent** (Desktop or Mobile)
- **Referring page** (how Google discovered the URL)

This reveals whether Google crawled recently or 90 days ago (stale evaluation).

## The 9 Most Common Causes (And How to Diagnose)

### Cause #1: Thin Content (Word Count Too Low)

**Threshold:** Google generally favors 800+ words for informational content, 500+ for transactional pages (products, services).

**How to diagnose:**

Use **Screaming Frog** to audit word counts:
1. Crawl your site: **Screaming Frog → Enter domain → Start**
2. **Bulk Export → Response Codes → HTML**
3. Open export, check **Word Count** column

Filter for pages with:
- <300 words (critical, almost certainly too thin)
- 300-500 words (borderline, likely needs expansion)

Cross-reference with GSC's "Crawled – currently not indexed" list.

**Example finding:**
- `/product/blue-widget` = 180 words → Too thin
- `/blog/seo-tips` = 320 words → Borderline

**Fix:**

**Expand content depth:**
- Add product specifications, usage instructions, comparison tables (products)
- Add subheadings, examples, case studies, FAQs (blogs)
- Embed multimedia (images, videos, infographics)

**Before (180 words):**
```
Blue Widget - $29.99
High-quality blue widget for everyday use.
Made from durable materials.
Buy now!
```

**After (650 words):**
```
Blue Widget - $29.99

Product Overview:
The Blue Widget is engineered for professionals who demand...
[400 words of detailed specs, benefits, use cases]

Technical Specifications:
- Dimensions: 5" x 3" x 2"
- Weight: 8 oz
- Material: Aerospace-grade aluminum
[Table with 10+ specs]

Customer Reviews:
[3 testimonials with photos]

FAQ:
Q: Is this compatible with...?
A: Yes, the Blue Widget integrates with...
[5 Q&As]
```

### Cause #2: Duplicate or Near-Duplicate Content

**Problem:** Google sees this page as redundant with another page (on your site or externally).

**How to diagnose:**

**Check internal duplicates:**

Use **Siteliner** (free, online tool):
1. Enter your domain: `https://siteliner.com`
2. Click **Go**
3. Review **Duplicate Content** report

Siteliner shows:
- Pages with 85%+ similarity
- Overlapping text blocks

**Check external duplicates:**

Use **Copyscape** (paid, $0.05/search):
1. `https://copyscape.com`
2. Enter the URL
3. Check for external matches

**Common duplicate scenarios:**
- Product variations (e.g., `/product/blue-widget` and `/product/blue-widget-large` share 90% of the description)
- Blog posts with similar topics (`/seo-tips-2025` and `/seo-tips-2026` cover the same points)
- Scraped content (you republished an article from another site)

**Fix:**

**For internal duplicates:**

**Option A:** Consolidate pages, redirect one to the other:
```apache
Redirect 301 /product/blue-widget-large /product/blue-widget
```

**Option B:** Differentiate content, rewrite each page to cover unique angles:
- `/blue-widget` → "Best for beginners"
- `/blue-widget-large` → "Best for commercial use"

**Option C:** Use canonical tags (if pages must co-exist):
```html
<!-- On /product/blue-widget-large -->
<link rel="canonical" href="https://yourdomain.com/product/blue-widget" />
```

**For external duplicates:**

If you syndicated content (published your article on Medium, LinkedIn, etc.), ensure the external version has a **canonical tag pointing to YOUR site**:

```html
<!-- External site should add this -->
<link rel="canonical" href="https://yourdomain.com/your-original-article" />
```

If the external site won't add it, request they add a `noindex` tag or remove the content.

### Cause #3: Low Internal Link Equity (Orphaned or Buried Pages)

**Problem:** The page has zero or few internal links, signaling low importance to Google.

**How to diagnose:**

Use **Screaming Frog**:
1. Crawl your site
2. **Internal → All** tab
3. Click **Inlinks** tab (bottom panel)
4. Sort by **Inlinks** count (ascending)

Pages with 0-2 inlinks = orphaned or buried.

Cross-reference with GSC "Crawled – currently not indexed" list.

**Example finding:**
- `/blog/advanced-seo-tactics` = 0 inlinks → Orphaned
- `/product/niche-widget` = 1 inlink (only from sitemap) → Buried

**Fix:**

**Add internal links from high-authority pages:**

Identify link sources:
1. **Screaming Frog → Internal → All** → Sort by **Inlinks** (descending)
2. Top pages = homepage, pillar content, high-traffic blog posts

Add 5-10 internal links to the orphaned page from these sources:

```html
<!-- In high-authority blog post -->
<p>For advanced techniques, check our <a href="/blog/advanced-seo-tactics">comprehensive SEO tactics guide</a>.</p>
```

**Best practices:**
- Use descriptive anchor text (not "click here")
- Link from contextually relevant content
- Spread links across multiple high-authority pages (not all from one page)

### Cause #4: Low External Demand (No Backlinks)

**Problem:** Zero external backlinks signal to Google that no one values this content.

**How to diagnose:**

Check backlinks with **Ahrefs** or **Semrush**:
1. **Ahrefs → Site Explorer → Enter domain**
2. **Best by links → Pages** (shows pages sorted by backlink count)
3. Filter for "Crawled – currently not indexed" URLs

If backlink count = 0, that's a red flag.

**Fix:**

**Build 2-5 external backlinks:**

**Tactic 1: Guest posting**
- Write guest articles for sites in your niche
- Link back to the unindexed page from the guest post

**Tactic 2: Resource link building**
- Find articles linking to competitors' content on the same topic
- Reach out: "I noticed you linked to [competitor]. We have an updated resource on [topic]: [your URL]. Would you consider adding it?"

**Tactic 3: Social shares**
- Share the page on LinkedIn, Twitter, Facebook
- Even no-follow social links contribute to demand signals

**Tactic 4: Internal promotion**
- Link to the page from your newsletter
- Feature it on your homepage or "Popular Posts" widget

### Cause #5: Slow Page Load Speed

**Problem:** Google deprioritizes pages that load slowly (>3 seconds on mobile).

**How to diagnose:**

**Use Google PageSpeed Insights:**
1. `https://pagespeed.web.dev`
2. Enter the URL
3. Check **Performance** score (mobile and desktop)

Scores:
- **90-100:** Good
- **50-89:** Needs improvement
- **0-49:** Poor (likely contributing to non-indexing)

**Common issues:**
- Unoptimized images (3MB+ file sizes)
- No caching
- Render-blocking JavaScript/CSS
- Slow server response (TTFB >600ms)

**Fix:**

**Optimize images:**
```bash
# Compress with ImageMagick
mogrify -quality 80 -resize 1200x *.jpg
```

Or use **TinyPNG** (web-based, drag-drop compression).

**Enable caching (WordPress):**
- Install **WP Super Cache** or **W3 Total Cache**
- Configure to cache HTML, CSS, JS

**Use a CDN:**
- **Cloudflare** (free plan) → Distribute assets globally
- **StackPath**, **BunnyCDN** (paid, faster)

**Defer JavaScript:**
```html
<script src="script.js" defer></script>
```

### Cause #6: Mobile Usability Issues

**Problem:** Google uses mobile-first indexing. If your page is broken on mobile, it won't index.

**How to diagnose:**

**GSC Mobile Usability Report:**
1. **GSC → Experience → Mobile Usability**
2. Check for errors on "Crawled – currently not indexed" URLs

Common errors:
- Text too small to read
- Clickable elements too close together
- Content wider than screen

**Test manually:**
1. Open page on mobile device
2. Or use **Chrome DevTools → Device Toolbar** (`Ctrl+Shift+M`)

**Fix:**

**Responsive design:**
```css
/* Mobile-first breakpoints */
@media (max-width: 768px) {
  body {
    font-size: 16px; /* Readable on mobile */
  }
  img {
    max-width: 100%; /* Prevent horizontal scroll */
  }
}
```

**Fix touch targets:**
```css
a, button {
  min-width: 48px;
  min-height: 48px;
  padding: 12px;
}
```

**Test fix:**
Re-run **Mobile-Friendly Test**: `https://search.google.com/test/mobile-friendly`

### Cause #7: Noindex Tags (Accidental)

**Problem:** The page has a `noindex` meta tag, telling Google not to index it.

**How to diagnose:**

**Check page source:**
```bash
curl -s https://yourdomain.com/page | grep -i noindex
```

If output shows:
```html
<meta name="robots" content="noindex, follow">
```

That's the culprit.

**WordPress check:**
1. Edit the page in WordPress
2. **Yoast SEO meta box → Advanced → Allow search engines to show this page?**
3. If set to "No," change to "Yes"

**Fix:**

**Remove noindex tag:**

**In HTML:**
```html
<!-- Remove this -->
<meta name="robots" content="noindex">
```

**In WordPress (Yoast):**
1. Edit page
2. **Yoast SEO → Advanced** → Set "Allow search engines" to **Yes**

**In PHP (theme template):**
```php
// Remove or comment out
// echo '<meta name="robots" content="noindex">';
```

### Cause #8: JavaScript Rendering Issues (SPAs)

**Problem:** Your site uses client-side rendering (React, Vue, Angular), and Googlebot can't execute JavaScript to see content.

**How to diagnose:**

**Test with GSC URL Inspection:**
1. **GSC → URL Inspection → Enter URL**
2. Click **View crawled page → Screenshot**

If the screenshot is blank or incomplete, Googlebot didn't render JavaScript.

**Alternative test:**
```bash
# Fetch page as Googlebot sees it
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://yourdomain.com/page
```

If output is `<div id="root"></div>` (empty), content is JavaScript-only.

**Fix:**

**Implement server-side rendering (SSR):**

**Next.js (React):**
```javascript
// pages/product.js
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}
```

**Nuxt.js (Vue):**
```javascript
export default {
  async asyncData() {
    const data = await fetchData();
    return { data };
  }
}
```

**Or use pre-rendering (static site generation):**

**Next.js:**
```javascript
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data }, revalidate: 3600 };
}
```

### Cause #9: Low Site Authority (New or Untrusted Site)

**Problem:** Google doesn't trust your domain yet. New sites or sites with few backlinks face higher indexing thresholds.

**How to diagnose:**

**Check domain authority:**
- **Ahrefs → Site Explorer → Domain Rating (DR)**
- **Moz → Domain Authority (DA)**

Thresholds:
- **DR/DA <10:** New/low-authority site. Google will be selective
- **DR/DA 10-30:** Moderate authority, most quality pages should index
- **DR/DA >30:** High authority, most pages index automatically

**Fix:**

**Build domain authority:**
1. **Earn backlinks:** Guest posting, digital PR, resource pages
2. **Create linkable assets:** Original research, tools, infographics
3. **Get brand mentions:** Press releases, podcasts, interviews
4. **Social proof:** Active social media, engaged audience

**Short-term workaround:**
Focus on indexing your highest-value pages first. Request indexing via GSC for:
- Homepage
- Top 10 product/service pages
- Pillar content (2,000+ word guides)

Let lower-priority pages index organically as domain authority grows.

## Step-by-Step Fix Protocol

### Step 1: Audit and Prioritize

1. Export "Crawled – currently not indexed" URLs from GSC
2. Cross-reference with **Google Analytics → Behavior → Site Content** (check if any had traffic before deindexing)
3. Prioritize:
   - **High value:** Product pages, service pages, high-search-volume keywords
   - **Medium value:** Blog posts with backlinks, pages with historical traffic
   - **Low value:** Outdated content, thin pages with zero demand

### Step 2: Diagnose Root Cause(s)

For each high-value URL:
1. Check word count (Screaming Frog)
2. Check duplicate content (Siteliner, Copyscape)
3. Check internal links (Screaming Frog Inlinks report)
4. Check backlinks (Ahrefs)
5. Check mobile usability (GSC Mobile Usability Report)
6. Check page speed (PageSpeed Insights)

Document findings in a spreadsheet:
| URL | Word Count | Duplicates | Inlinks | Backlinks | Mobile Issues | Speed Score |
|-----|------------|------------|---------|-----------|---------------|-------------|
| /page-a | 280 | Yes | 0 | 0 | Text too small | 42 |

### Step 3: Apply Fixes

Based on diagnosis:
- **Thin content:** Expand to 800+ words
- **Duplicate:** Consolidate or differentiate
- **Low inlinks:** Add 5-10 internal links from high-authority pages
- **Zero backlinks:** Build 2-5 external links
- **Mobile issues:** Fix responsive design
- **Slow speed:** Optimize images, enable caching, add CDN

### Step 4: Request Re-Indexing

After fixes:
1. **GSC → URL Inspection → Enter URL**
2. Click **Request Indexing**

Google will re-crawl within 24-48 hours for most sites.

### Step 5: Monitor Results

Check status after 14-30 days:
1. **GSC → URL Inspection → Enter URL**
2. Look for status change:
   - **"URL is on Google"** = Success
   - **Still "Crawled – currently not indexed"** = Re-audit, strengthen signals further

Track aggregate trends:
**GSC → Pages → Crawled – currently not indexed**

If count drops by 50%+ after 30 days, your fixes are working.

## Advanced: Bulk Fixes for Large Sites

For sites with 1,000+ "Crawled – currently not indexed" pages:

### Segment by Page Type

```bash
# Extract page types from GSC export
grep "/blog/" crawled-not-indexed.csv > blog-issues.csv
grep "/products/" crawled-not-indexed.csv > product-issues.csv
```

**Apply template fixes:**
- All blog posts <500 words → Expand using AI (Claude, ChatGPT) for bulk drafts, then edit
- All product pages with 0 inlinks → Programmatically add internal links from category pages
- All pages with slow speed → Bulk-optimize images, deploy CDN globally

### Automate Internal Link Injection (WordPress)

```php
// In functions.php
add_filter('the_content', 'auto_add_internal_links');

function auto_add_internal_links($content) {
  $unindexed_urls = [
    '/page-a' => 'Page A anchor text',
    '/page-b' => 'Page B anchor text',
  ];

  foreach ($unindexed_urls as $url => $anchor) {
    if (strpos($content, $url) === false) { // Don't duplicate links
      $content .= '<p>Related: <a href="' . $url . '">' . $anchor . '</a></p>';
    }
  }
  return $content;
}
```

This automatically appends internal links to posts, boosting unindexed page visibility.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **What "Crawled – Currently Not Indexed" Means:** Google's indexing pipeline has three stages:
* **The 9 Most Common Causes (And How to Diagnose):** Use Screaming Frog to audit word counts:
1. Crawl your site: Screaming Frog → Enter domain → Start
2. Bulk Export → Response Codes → HTML
3. Open export, check
* **Advanced: Bulk Fixes for Large Sites:** For sites with 1,000+ "Crawled – currently not indexed" pages:

## FAQ

**How long does it take for "Crawled – currently not indexed" to change after fixes?**

7-14 days for small sites (<5,000 pages). 4-8 weeks for large sites (>50,000 pages). Use "Request Indexing" in GSC to expedite.

**Will Google eventually index these pages without me doing anything?**

Maybe. Google may re-evaluate during future crawls. But without signal improvements, they'll remain deprioritized indefinitely. Proactive fixes accelerate indexing.

**Should I noindex pages that won't index anyway?**

No. "Crawled – currently not indexed" means Google tried and deferred, there's still hope. `noindex` is permanent exclusion. Only noindex pages you genuinely don't want indexed (admin panels, thank-you pages).

**Can I force indexing by submitting the URL multiple times?**

No. Repeated submissions don't help. Google's decision is quality-based. Fix the underlying issues (content depth, links, speed) instead.

**Does "Crawled – currently not indexed" hurt my rankings for other pages?**

Indirectly. It signals site-wide quality issues. If 40% of your pages are excluded, Google may lower its trust in your domain, affecting indexing speed for all pages.

**What if I fix everything and the page still won't index?**

**Option 1:** Wait longer (up to 90 days for low-authority sites).
**Option 2:** Consolidate the page, redirect to a higher-authority page and merge content.
**Option 3:** Accept that the page isn't valuable enough for Google's index and focus energy on higher-ROI content.

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.

---

"Crawled – currently not indexed" is Google's quality filter in action. Pages in this state lack the signals, depth, uniqueness, demand, authority, that justify indexing. Diagnose the gaps systematically, strengthen each signal, and request re-evaluation. Most pages can be promoted from limbo with targeted fixes. The rest should be consolidated or pruned.

---

## Frequently Asked Questions

### How long does this fix take to implement?

Most fixes in this article can be implemented in under an hour. Some require a staging environment for testing before deploying to production. The article flags which changes are safe to deploy immediately versus which need QA review first.

### Will this fix work on WordPress, Shopify, and custom sites?

The underlying SEO principles are platform-agnostic. Implementation details differ. WordPress uses plugins and theme files, Shopify uses Liquid templates, custom sites use direct code changes. The article focuses on the what and why; platform-specific how-to links are provided where available.

### How do I verify the fix worked?

Each fix includes a verification step. For most technical SEO changes: check Google Search Console coverage report 48-72 hours after deployment, validate with a live URL inspection, and monitor the affected pages in your crawl tool. Ranking impact typically surfaces within 1-4 weeks depending on crawl frequency.

