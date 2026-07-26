---
title:: How to Fix "Discovered – Currently Not Indexed" in Search Console
description:: Google found your URLs but hasn't crawled them yet. Learn why pages get stuck in the discovery queue, how to diagnose crawl budget bottlenecks, and systematic methods to force Google to crawl and index high-priority pages.
focus_keyword:: discovered currently not indexed
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Fix "Discovered – Currently Not Indexed" in Search Console

> **Quick Summary**
> - **What this covers:** Google found your URLs but hasn't crawled them yet. Learn why pages get stuck in the discovery queue, how to diagnose crawl budget bottlenecks, and systematic methods to force Google to crawl and index high-priority pages.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [What "Discovered – Currently Not Indexed" Means](#what-discovered-currently-not-indexed-means)
- [How to Find "Discovered – Currently Not Indexed" Pages in GSC](#how-to-find-discovered-currently-not-indexed-pages-in-gsc)
- [The 7 Most Common Causes (And How to Fix)](#the-7-most-common-causes-and-how-to-fix)
- [Step-by-Step Fix Protocol](#step-by-step-fix-protocol)
- [Advanced: Accelerating Crawl for Large Batches](#advanced-accelerating-crawl-for-large-batches)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**"Discovered – currently not indexed"** means Google found your URL, through your sitemap, an internal link, or an external backlink, but hasn't bothered to crawl it yet. Your page sits in Google's discovery queue, waiting for Googlebot to allocate crawl budget to fetch and evaluate it.

For small sites (<1,000 pages), this status is temporary, most pages crawl within 48-72 hours. For large sites (>50,000 pages), pages can languish in "Discovered – currently not indexed" for weeks or months, especially if they're buried deep in your site architecture or lack strong demand signals.

This isn't a quality judgment (Google hasn't seen the content yet). It's a **crawl prioritization** problem. Google has limited crawl budget and allocates it to pages it deems most valuable based on internal linking, external demand, and site authority.

This guide shows you how to diagnose why pages are stuck, manipulate crawl priority signals, and systematically force Google to crawl your backlog.

## What "Discovered – Currently Not Indexed" Means

Google's indexing pipeline:

1. **Discovery:** Google finds the URL (sitemap, link, or external mention)
2. **Crawl Queue:** URL enters Google's queue, prioritized by signals
3. **Crawling:** Googlebot fetches the page
4. **Indexing:** Google evaluates and (if quality passes) adds to index

**"Discovered – currently not indexed"** means the URL is stuck at stage 2. Google knows it exists but hasn't prioritized crawling it.

### Why Google Delays Crawling

**Crawl budget** is finite. For large sites, Google might crawl 10,000 pages/day but have 100,000 URLs in the queue. Google prioritizes based on:

1. **Internal link equity:** Pages linked from the homepage or high-authority content crawl first
2. **External demand:** Pages with backlinks signal value
3. **Historical data:** Pages with traffic history or frequent updates get priority
4. **Sitemap priority:** XMLsitemap `<priority>` tags (weak signal, but still considered)
5. **Page freshness:** New content or recently updated pages rank higher in queue
6. **Site authority:** High-DR sites get more crawl budget than low-DR sites

If your page scores low on all these dimensions, it waits indefinitely.

## How to Find "Discovered – Currently Not Indexed" Pages in GSC

### Method 1: Page Indexing Report

1. **Google Search Console → Pages**
2. Scroll to **Why pages aren't indexed**
3. Click **Discovered – currently not indexed**

You'll see:
- **Count:** Total URLs in this status
- **Trend graph:** Is it growing or shrinking?
- **Example URLs:** Click to see full list

Export: **Export → Download → CSV**

### Method 2: URL Inspection Tool

For individual pages:

1. **GSC → URL Inspection**
2. Enter the URL
3. Check **Coverage** status

If "Discovered – currently not indexed," expand to see:
- **Discovery date:** When Google first found the URL
- **Referring page:** How Google discovered it (sitemap, internal link, external link)
- **Sitemaps:** Which sitemap(s) list this URL

**Key insight:** If discovery date is >30 days ago, Google has intentionally deprioritized the page.

## The 7 Most Common Causes (And How to Fix)

### Cause #1: Low Internal Link Equity (Orphaned Pages)

**Problem:** The page has zero or minimal internal links, signaling low importance.

**How to diagnose:**

Use **Screaming Frog** to count inlinks:

1. Crawl your site: **Enter domain → Start**
2. **Internal → All** tab
3. Click **Inlinks** tab (bottom panel)
4. Sort by **Inlinks** (ascending)

Pages with **0-1 inlinks** are orphans or near-orphans.

Cross-reference with GSC "Discovered – currently not indexed" export.

**Example finding:**
- `/product/niche-widget` = 0 inlinks (only in sitemap)
- `/blog/advanced-guide` = 1 inlink (only from author archive page)

**Fix:**

**Add 5-10 internal links from high-authority pages:**

Identify high-authority pages (homepage, pillar content, top blog posts):

```bash
# In Screaming Frog: Internal → All → Sort by Inlinks (descending)
```

Top pages = those with 20+ inlinks.

**Manually add contextual links:**

```html
<!-- In high-traffic blog post -->
<p>For advanced techniques, see our <a href="/blog/advanced-guide">complete SEO guide</a>.</p>
```

**Or programmatically (WordPress example):**

```php
// In functions.php - auto-add links to orphaned posts
add_filter('the_content', 'boost_orphaned_posts');

function boost_orphaned_posts($content) {
  $orphaned_posts = [
    '/blog/advanced-guide' => 'our advanced SEO guide',
    '/product/niche-widget' => 'this specialized widget',
  ];

  foreach ($orphaned_posts as $url => $anchor) {
    if (strpos($content, $url) === false) {
      $content .= '<p>Related: <a href="' . $url . '">' . $anchor . '</a></p>';
    }
  }
  return $content;
}
```

**Best practice:** Spread links across 5-10 different high-authority pages (not all from one page).

### Cause #2: Pages Buried Deep in Site Architecture

**Problem:** The page requires 4+ clicks from the homepage to reach.

**How to diagnose:**

**Screaming Frog:**
1. After crawling, go to **Internal → All**
2. Right-click column header → **Columns → Crawl Depth**
3. Sort by **Crawl Depth**

**Google's rule of thumb:** Pages >3 clicks deep get lower crawl priority.

**Example:**
- Homepage (depth 0)
- Category page (depth 1)
- Subcategory page (depth 2)
- Product page (depth 3) ✓
- Product variant page (depth 4) ❌ (too deep)

**Fix:**

**Flatten site architecture:**

**Option 1:** Add links from shallower pages:
- Link products directly from homepage (featured products section)
- Link deep content from sidebar widgets (Recent Posts, Popular Pages)

**Option 2:** Restructure navigation:
- Reduce subcategory layers
- Use mega-menus to surface deep pages in navigation

**Option 3:** Create hub pages:
- Create a "/products/" index page that links to all products (depth 1 → 2 instead of 1 → 2 → 3 → 4)

### Cause #3: Low or Zero External Backlinks

**Problem:** No external sites link to the page, signaling zero external demand.

**How to diagnose:**

Check backlinks with **Ahrefs** or **Semrush**:

1. **Ahrefs → Site Explorer → Enter domain**
2. **Pages → Best by links**
3. Filter for "Discovered – currently not indexed" URLs

If **Referring domains = 0**, that's a red flag.

**Fix:**

**Build 2-5 external backlinks:**

**Tactic 1: Outreach to relevant sites**

Find sites linking to competitors' similar content:
1. **Ahrefs → Content Explorer → Enter topic keyword**
2. Filter: **One article per domain**
3. Export list
4. Email pitch:
   > "Hi [Name], I noticed you linked to [competitor article] in your post on [topic]. We just published an updated guide: [your URL]. Would you consider adding it as a reference?"

**Tactic 2: Resource page link building**

Find resource pages in your niche:
1. Google: `[your topic] + "resources" + "links"`
2. Example: "SEO tools resources links"
3. Reach out to page owners, suggest your page as addition

**Tactic 3: Guest posting**

Write guest articles for sites in your niche, link back to the undiscovered page.

**Tactic 4: Social shares**

Share on LinkedIn, Twitter, Reddit (subreddit relevant to topic). Even no-follow links contribute to demand signals.

### Cause #4: New Site with Low Domain Authority

**Problem:** Google doesn't allocate much crawl budget to new or low-authority sites.

**How to diagnose:**

Check **Domain Rating (DR)** or **Domain Authority (DA)**:

- **Ahrefs:** Site Explorer → Enter domain → DR score
- **Moz:** Link Explorer → Enter domain → DA score

**Thresholds:**
- **DR/DA <10:** low authority. Google crawls 100-500 pages/day
- **DR/DA 10-30:** Moderate authority. Google crawls 1,000-5,000 pages/day
- **DR/DA >30:** High authority. Google crawls 10,000+ pages/day

If your site has 10,000 pages but DR 8, "Discovered – currently not indexed" is expected. Google can't crawl everything.

**Fix:**

**Short-term: Prioritize high-value pages**

Use **Request Indexing** in GSC for:
- Homepage
- Top 10 product/service pages
- High-search-volume blog posts

**Long-term: Build domain authority**

1. **Earn backlinks:** Guest posts, digital PR, resource page placements
2. **Create linkable assets:** Original research, tools, calculators, infographics
3. **Brand building:** Get mentioned in industry publications, podcasts, interviews

**Expected timeline:** 6-12 months to move DR from <10 to 20+.

### Cause #5: Pages Added in Bulk Without Sitemap Priority Signals

**Problem:** You added 5,000 new products to your site and submitted them all in a sitemap with equal priority.

**How to diagnose:**

Check your sitemap:
```xml
<url>
  <loc>https://yourdomain.com/product-1</loc>
  <priority>0.5</priority>
</url>
<url>
  <loc>https://yourdomain.com/product-2</loc>
  <priority>0.5</priority>
</url>
```

If all URLs have the same `<priority>` (or no priority set), Google has no signal for which to crawl first.

**Fix:**

**Set sitemap priorities based on importance:**

```xml
<!-- High-priority pages -->
<url>
  <loc>https://yourdomain.com/</loc>
  <priority>1.0</priority>
  <changefreq>daily</changefreq>
</url>

<!-- Medium-priority -->
<url>
  <loc>https://yourdomain.com/product/best-seller</loc>
  <priority>0.8</priority>
  <changefreq>weekly</changefreq>
</url>

<!-- Low-priority -->
<url>
  <loc>https://yourdomain.com/blog/old-post</loc>
  <priority>0.3</priority>
  <changefreq>monthly</changefreq>
</url>
```

**WordPress (Yoast SEO):**

Yoast auto-assigns priorities:
- Homepage: 1.0
- Posts/pages: 0.6
- Archives: 0.3

To customize:
```php
// In functions.php
add_filter('wpseo_xml_sitemap_post_url', 'custom_sitemap_priority', 10, 2);

function custom_sitemap_priority($url, $post) {
  if (get_post_meta($post->ID, 'high_priority', true)) {
    $url['pri'] = 0.9; // Boost priority for tagged posts
  }
  return $url;
}
```

**Submit updated sitemap to GSC:**
1. **GSC → Sitemaps → Add new sitemap**
2. Enter: `sitemap.xml`
3. Click **Submit**

### Cause #6: Server Crawl Rate Limits

**Problem:** Your server is rate-limiting Googlebot to prevent overload, slowing crawl velocity.

**How to diagnose:**

**Check server logs** for Googlebot 503 (Service Unavailable) or 429 (Too Many Requests) responses:

```bash
grep "Googlebot" access.log | grep " 503 " | wc -l
```

If count > 5% of total Googlebot requests, you have rate-limiting issues.

**Or check GSC Crawl Stats:**
1. **GSC → Settings → Open report** (under "Crawl stats")
2. Check **Crawl requests by response** graph
3. If you see spikes in 5xx or 4xx errors, your server is throttling

**Fix:**

**Option 1: Whitelist Googlebot in server config**

**Apache (.htaccess):**
```apache
<If "%{HTTP_USER_AGENT} =~ /Googlebot/">
  Require all granted
  # No rate limits for Googlebot
</If>
```

**Nginx:**
```nginx
if ($http_user_agent ~* "Googlebot") {
  set $limit_rate 0; # Unlimited for Googlebot
}
```

**Option 2: Upgrade server resources**

More CPU, RAM, or switch to a CDN (Cloudflare, Fastly) to handle burst traffic.

**Option 3: Request slower crawl rate** (if server can't handle current rate):

File request via **GSC → Help → Contact Support** asking Google to reduce crawl rate.

### Cause #7: Robots.txt Crawl-Delay Directive (Non-Standard)

**Problem:** Your `robots.txt` has a `Crawl-delay` directive, slowing Googlebot.

**Check robots.txt:**
```
https://yourdomain.com/robots.txt
```

If you see:
```
User-agent: *
Crawl-delay: 10
```

This tells bots to wait 10 seconds between requests. **Google doesn't officially support this**, but some crawlers respect it and slow down.

**Fix:**

Remove or adjust:
```
# Remove Crawl-delay entirely for Googlebot
User-agent: Googlebot
# No Crawl-delay

User-agent: *
Crawl-delay: 10  # Keep for aggressive bots
```

## Step-by-Step Fix Protocol

### Step 1: Export and Prioritize

1. Export "Discovered – currently not indexed" URLs from GSC
2. Categorize by page type (products, blog posts, category pages)
3. Prioritize:
   - **High:** Money pages (products, services, high-search-volume keywords)
   - **Medium:** Supporting content (blog posts, guides)
   - **Low:** Old content, archives, low-demand pages

### Step 2: Diagnose Root Cause

For each high-priority URL:

| Check | Tool | Target |
|-------|------|--------|
| Internal links | Screaming Frog Inlinks | 5+ inlinks |
| Crawl depth | Screaming Frog Crawl Depth | ≤3 clicks |
| External backlinks | Ahrefs | 2+ referring domains |
| Sitemap priority | View sitemap XML | 0.7+ priority |

Document findings:
| URL | Inlinks | Depth | Backlinks | Priority | Issue |
|-----|---------|-------|-----------|----------|-------|
| /product-a | 0 | 4 | 0 | 0.5 | Orphaned + buried |

### Step 3: Apply Fixes

Based on diagnosis:
- **Orphaned:** Add 5-10 internal links from high-authority pages
- **Buried:** Flatten architecture or add shortcut links from homepage
- **Zero backlinks:** Build 2-5 external links
- **Low sitemap priority:** Increase to 0.8-1.0
- **Rate-limited:** Whitelist Googlebot or upgrade server

### Step 4: Request Indexing

After fixes:
1. **GSC → URL Inspection → Enter URL**
2. **Test live URL** (verifies Googlebot can access)
3. **Request Indexing**

Google will crawl within 24-48 hours for most sites.

### Step 5: Monitor Progress

Check status after 7-14 days:

**Individual URLs:**
- **GSC → URL Inspection → Enter URL**
- Look for status change: "URL is on Google"

**Aggregate trends:**
- **GSC → Pages → Discovered – currently not indexed**
- Count should drop by 30-50% after 30 days if fixes worked

## Advanced: Accelerating Crawl for Large Batches

For sites with 10,000+ "Discovered – currently not indexed" URLs:

### Strategy 1: Staged Sitemap Submission

Instead of one massive sitemap (50,000 URLs), break into priority tiers:

**sitemap-high-priority.xml** (1,000 URLs, priority 0.9-1.0)
**sitemap-medium-priority.xml** (5,000 URLs, priority 0.6-0.8)
**sitemap-low-priority.xml** (44,000 URLs, priority 0.3-0.5)

Submit high-priority first:
1. **GSC → Sitemaps → Add sitemap:** `sitemap-high-priority.xml`
2. Wait 7 days for Google to crawl
3. Then submit medium-priority
4. Then low-priority

### Strategy 2: Programmatic Internal Link Injection

Auto-add internal links to orphaned pages:

**WordPress example:**
```php
// In functions.php
add_filter('the_content', 'inject_orphan_links');

function inject_orphan_links($content) {
  global $post;

  // Get orphaned URLs from database
  $orphans = get_option('orphaned_urls'); // Array of URLs

  if (!empty($orphans)) {
    $random_orphan = $orphans[array_rand($orphans)];
    $content .= '<p><strong>Related:</strong> <a href="' . $random_orphan . '">Explore this topic</a></p>';
  }

  return $content;
}
```

This appends a random orphaned URL to every post, distributing internal link equity.

### Strategy 3: RSS Feed Submission

If you have an RSS feed, submit to aggregators:
- **Google News** (if news site)
- **Bing Webmaster Tools → Submit URLs**
- **Feedly**, **Inoreader** (content aggregators)

These services crawl RSS feeds frequently, which can trigger Google's discovery.

### Strategy 4: IndexNow Protocol

**IndexNow** instantly notifies search engines (Bing, Yandex) of new URLs:

```bash
# Ping IndexNow API
curl "https://api.indexnow.org/indexnow?url=https://yourdomain.com/new-page&key=YOUR_API_KEY"
```

**Note:** Google doesn't officially support IndexNow yet (as of 2026), but Bing does.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.

## FAQ

**How long does it take for "Discovered – currently not indexed" to resolve?**

**Small sites (<1,000 pages):** 48-72 hours after requesting indexing.
**Medium sites (1,000-10,000 pages):** 7-14 days.
**Large sites (>50,000 pages):** 4-8 weeks for bulk changes.

**Can I force Google to crawl faster?**

Not directly. But you can manipulate priority signals (internal links, backlinks, sitemap priority) to move pages higher in the crawl queue.

**Should I remove pages from the sitemap if they're not being crawled?**

No. Sitemap removal makes discovery HARDER. Instead, boost the page's signals (links, priority) to increase crawl likelihood.

**Does "Discovered – currently not indexed" hurt my rankings?**

No direct penalty. But if high-value pages are stuck, you're missing ranking opportunities. Indirectly, a large backlog signals to Google that your site is low-priority.

**What if I fix everything and the page still isn't crawled after 30 days?**

**Option 1:** Manually request indexing again via GSC.
**Option 2:** Build more external backlinks (strongest signal).
**Option 3:** Accept that Google has deprioritized the page, focus energy on higher-ROI content.

**Can too many "Discovered – currently not indexed" pages harm my site?**

Yes, indirectly. If 60% of your sitemap is "Discovered – not indexed," Google may lower your site's crawl budget allocation, slowing indexing for all pages. Prune low-value URLs from your sitemap.

**Does removing old content help with crawl budget?**

Yes. If you have 20,000 old blog posts that get zero traffic, consider:
- **Consolidating** (merge 10 thin posts into 1 comprehensive guide)
- **Noindexing** low-value pages
- **Deleting** and 410-ing truly obsolete content

This frees crawl budget for high-value pages.

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.

---

"Discovered – currently not indexed" is a crawl queue problem, not a quality problem. Google found your pages but hasn't allocated resources to fetch them. Boost internal link equity, flatten site architecture, build external demand, and manipulate sitemap priorities to jump the queue. Most pages will crawl within 14-30 days once signals strengthen.

---

## Frequently Asked Questions

### How long does this fix take to implement?

Most fixes in this article can be implemented in under an hour. Some require a staging environment for testing before deploying to production. The article flags which changes are safe to deploy immediately versus which need QA review first.

### Will this fix work on WordPress, Shopify, and custom sites?

The underlying SEO principles are platform-agnostic. Implementation details differ. WordPress uses plugins and theme files, Shopify uses Liquid templates, custom sites use direct code changes. The article focuses on the what and why; platform-specific how-to links are provided where available.

### How do I verify the fix worked?

Each fix includes a verification step. For most technical SEO changes: check Google Search Console coverage report 48-72 hours after deployment, validate with a live URL inspection, and monitor the affected pages in your crawl tool. Ranking impact typically surfaces within 1-4 weeks depending on crawl frequency.

