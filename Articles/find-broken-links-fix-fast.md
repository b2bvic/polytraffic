---
title:: Find Broken Links and Fix Fast: 4 Tools to Stop 404 Hemorrhaging
description:: Detect broken links killing SEO in 15 minutes. Screaming Frog, Ahrefs, Google Search Console methods with bulk fix workflows for WordPress, Shopify, HTML.
focus_keyword:: find broken links fix fast
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Find Broken Links and Fix Fast: 4 Tools to Stop 404 Hemorrhaging

> **Quick Summary**
> - **What this covers:** Detect broken links killing SEO in 15 minutes. Screaming Frog, Ahrefs, Google Search Console methods with bulk fix workflows for WordPress, Shopify, HTML.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why Broken Links Hurt SEO](#why-broken-links-hurt-seo)
- [4 Methods to Find Broken Links](#4-methods-to-find-broken-links)
- [Prioritizing Broken Link Fixes](#prioritizing-broken-link-fixes)
- [Bulk Fix Workflows by Platform](#bulk-fix-workflows-by-platform)
- [Automating Broken Link Detection](#automating-broken-link-detection)
- [Preventing Future Broken Links](#preventing-future-broken-links)
- [Broken Link Fix Tracking](#broken-link-fix-tracking)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Broken links, internal or external URLs returning 404 errors, erode user experience, waste crawl budget, and leak PageRank to dead ends. A single high-authority page linking to 10 broken URLs transfers zero equity and signals poor site maintenance to **Google**. Sites with 5%+ broken internal links see 15-30% ranking drops compared to clean link profiles.

Broken links can accumulate over time and create orphaned pages, dead navigation paths, and crawl traps. Measure the affected URLs and crawl behavior on the site being audited rather than assuming a standard recovery or ranking result.

This guide covers 4 detection methods (**Screaming Frog**, **Ahrefs**, **Google Search Console**, browser extensions), bulk fix workflows for **WordPress**/**Shopify**/HTML sites, and preventive systems to catch breaks before **Google** does.

## Why Broken Links Hurt SEO

Broken links damage sites through multiple vectors:

### 1. Crawl Budget Waste

**Googlebot** allocates finite crawl quota based on site authority, server speed, and update frequency. Every 404 response wastes a crawl slot that could have discovered new content.

**Impact scale:**

- Site with 10,000 pages, 500 broken internal links: 5% crawl waste
- Site with 50,000 pages, 8,000 broken internal links: 16% crawl waste (critical on large sites)

**Search Console** → Crawl Stats shows daily crawl requests. Filter by status code, if 404s exceed 5% of total crawls, you're hemorrhaging budget.

### 2. PageRank Dilution

PageRank flows through internal links. When Page A (high authority) links to Page B (deleted, returns 404), the equity Page A passes dies at the 404. That link could have boosted a live page.

**Example:**

Homepage (DR 70) links to `/old-product-page/` (404). That link passes 0 equity. Updating to `/new-product-page/` transfers full equity.

Multiply this across 500 broken internal links and you've orphaned massive PageRank.

### 3. User Experience Degradation

Visitors clicking broken links bounce. **Google Analytics** data shows:

- 404 pages average 85%+ bounce rate
- Time on site drops 60% for sessions hitting 404s
- Conversion rate plummets (users lose trust)

Behavioral signals (bounce rate, time on site, pogo-sticking) feed ranking algorithms. Broken links indirectly hurt rankings through poor engagement.

### 4. Trust Signal Erosion

Sites with broken external links signal poor maintenance. **Google's** Quality Rater Guidelines instruct evaluators to check for "broken functionality" as a trust indicator.

YMYL sites (health, finance, legal) face stricter scrutiny. Broken links on a medical advice site suggest outdated information, triggering E-E-A-T penalties.

## 4 Methods to Find Broken Links

### Method 1: Screaming Frog (Desktop Crawler)

**Screaming Frog SEO Spider** crawls your site like **Googlebot**, detecting all internal and external broken links.

**Setup:**

1. Download free version (500 URLs) or paid ($259/year, unlimited) from screamingfrog.co.uk
2. Launch app → Enter your domain → Click "Start"
3. Wait for crawl to complete (10-60 minutes depending on site size)

**Finding broken internal links:**

1. Response Codes tab → Filter "Client Error (4xx)"
2. Review list of 404 pages
3. Click any 404 URL → Bottom pane shows "Inlinks" tab
4. Inlinks lists all pages linking to this broken URL

**Export workflow:**

- Response Codes → Client Error (4xx) → Export → Select "All Inlinks"
- Produces CSV with 3 columns: Broken URL, Source Page, Anchor Text
- Prioritize fixes by inlink count (broken URLs with 10+ inlinks first)

**Finding broken external links:**

1. Configuration → Spider → Advanced → Check "Check External Links"
2. Restart crawl (takes longer, crawls external destinations)
3. External tab → Filter "Status Code" → Select "404"
4. Export list of broken outbound links

**Screaming Frog pros:**

- Unlimited crawl depth (discovers every internal URL)
- Fast (crawls 100+ URLs/sec on paid version)
- Exports with source pages + anchor text (easy fix mapping)

**Screaming Frog cons:**

- Requires desktop app installation
- Free version limited to 500 URLs (insufficient for most sites)
- External link checking is slow (crawls every outbound destination)

### Method 2: Ahrefs Site Audit

**Ahrefs** Site Audit crawls your site and flags broken links in the "Errors" report.

**Setup:**

1. Ahrefs → Site Audit → Add New Project → Enter domain
2. Set crawl limit (10,000 URLs covers most sites, increase if needed)
3. Start crawl (10-30 minutes depending on size)

**Finding broken links:**

1. Internal Pages report → "Best by links" tab → Filter "4xx status codes"
2. Shows broken URLs sorted by internal inlink count (fix high-link pages first)
3. Click any 404 URL → "Incoming links" shows source pages

**Finding broken outbound links:**

1. All issues → Filter "External" → Select "Broken outbound links (4xx)"
2. Shows source pages with broken external links
3. Click issue to see specific broken URLs and which pages link to them

**Export workflow:**

- All Issues → Export → Select "Broken internal links" and "Broken outbound links"
- CSV includes: Issue type, URL, Source page, Anchor text

**Ahrefs pros:**

- Cloud-based (no installation)
- Fast crawling (distributed crawlers)
- Integrated with backlink data (see if broken pages had external backlinks)

**Ahrefs cons:**

- Requires paid subscription ($129+/month)
- Crawl limits (10K URLs on Lite plan, upgrade for larger sites)

### Method 3: Google Search Console (Free, Google's View)

**Google Search Console** shows pages **Googlebot** crawled and found returning errors.

**Finding broken pages:**

1. Google Search Console → Pages → "Why pages aren't indexed"
2. Scroll to "Not found (404)"
3. Click row to see list of 404 URLs **Google** encountered
4. Export list

**Limitation:** **Search Console** only shows 404s **Google** discovered (via internal links, sitemaps, or external backlinks). Orphaned broken pages with no inlinks don't appear.

**Finding sources of broken links:**

**Search Console** doesn't show which pages link to 404s. Cross-reference with **Screaming Frog** or **Ahrefs** for source pages.

**Why use Search Console despite limitations:**

- Free
- Shows **Google's** perspective (if Google found it, it's wasting crawl budget)
- Flags recently broken pages (data updates within 1-3 days)

### Method 4: Browser Extensions (Quick Spot Checks)

For manual page audits, use extensions that highlight broken links in real-time:

**Check My Links (Chrome):**

1. Install from Chrome Web Store
2. Visit any page on your site
3. Click extension icon → "Check links on this page"
4. Extension highlights broken links in red

**Pros:**

- Instant check (no crawl wait)
- Useful for auditing specific pages (blog posts, resource pages)

**Cons:**

- Manual (can't scan entire site)
- Only checks visible links on current page (misses links in hidden menus, lazy-loaded content)

**Link Checker by Awesomez (Firefox):**

Similar functionality for Firefox users.

## Prioritizing Broken Link Fixes

Don't fix every broken link immediately. Prioritize by impact:

### Priority 1: High-Authority Pages with Many Broken Links

Use **Ahrefs** or **Screaming Frog** to identify pages with:

- High URL Rating (Ahrefs) or PageRank estimate
- 5+ broken internal links

**Example:**

Homepage (UR 70) has 12 broken internal links → Fix all 12 immediately. Each fixed link restores equity flow.

### Priority 2: Broken Internal Links with 10+ Inlinks

Pages linked from 10+ sources were important. Likely deleted without redirects.

**Fix approach:**

- If page has a replacement (new product, updated guide) → 301 redirect old URL to new URL
- If page has no replacement → 301 redirect to closest relevant category or parent page
- If truly irrelevant → 410 (Gone) status, remove inlinks

### Priority 3: Navigation/Template Broken Links

Broken links in header, footer, or sidebar appear on every page, multiplying the damage.

**Example:**

Footer link to `/old-contact-page/` (404) appears on 5,000 pages → Fix this one link eliminates 5,000 broken link instances.

### Priority 4: Broken External Links on Resource Pages

If you maintain "Ultimate Guide" or "Best Tools" resource pages, broken external links erode credibility.

**Fix approach:**

- Update links to current URLs (many moved, didn't die)
- Replace with alternative resources if original died
- Remove link and mention if no replacement exists

### Priority 5: Low-Impact Broken Links

Orphaned blog posts from 2015 with 1 inlink and 0 traffic → Lowest priority. Fix eventually but don't rush.

## Bulk Fix Workflows by Platform

### WordPress Broken Link Fixes

**Option 1: Manual 301 Redirects (Best for <50 broken links)**

Install **Redirection** plugin (free):

1. Plugins → Add New → Search "Redirection" → Install → Activate
2. Tools → Redirection → Add New Redirect
3. Source URL: `/old-page/`
4. Target URL: `/new-page/`
5. Save

Repeat for each broken link. Plugin handles 301 redirects via WordPress (no server config needed).

**Option 2: Bulk CSV Upload (Best for 50-500 broken links)**

**Redirection** plugin supports CSV import:

1. Export broken links from **Screaming Frog** (Broken URL, Target URL)
2. Format CSV: 2 columns (source, target)
3. Redirection → Import → Upload CSV
4. Plugin creates 301 redirects in bulk

**Option 3: Database Find & Replace (Best for 500+ broken links)**

If thousands of internal links point to a specific old URL, use **Better Search Replace** plugin:

1. Install **Better Search Replace** plugin
2. Tools → Better Search Replace
3. Search for: `https://yoursite.com/old-url/`
4. Replace with: `https://yoursite.com/new-url/`
5. Select tables: `wp_posts`, `wp_postmeta`
6. Run search (dry run first to preview changes)
7. Execute replace

This updates all instances in post content and custom fields.

**Option 4: Remove Broken External Links**

If broken external links can't be updated (destination permanently dead), remove them:

1. Manually edit posts containing broken links (if only a few)
2. Use **Broken Link Checker** plugin (auto-detects and allows bulk unlinking):
   - Install plugin → Settings → Check "Automatic unlinking"
   - Plugin scans site hourly, removes broken external links automatically

**Warning:** Auto-unlinking can remove legitimate links if destination has temporary downtime. Use cautiously.

### Shopify Broken Link Fixes

**Option 1: Manual Redirects (Best for <20 broken links)**

1. Shopify Admin → Online Store → Navigation → URL Redirects
2. Click "Create URL redirect"
3. Redirect from: `/old-product`
4. Redirect to: `/new-product`
5. Save

Shopify handles 301 redirects automatically.

**Option 2: CSV Bulk Import (Best for 20-500 broken links)**

1. Create CSV with 2 columns: `Redirect from`, `Redirect to`
2. Populate with broken URLs and target replacements
3. Shopify Admin → Online Store → Navigation → URL Redirects → Import
4. Upload CSV
5. Shopify processes redirects in bulk

**Limitation:** Shopify CSV import limited to 10,000 redirects per account.

**Option 3: Liquid Template Edits (For Template Broken Links)**

If broken links appear in theme templates (header, footer):

1. Shopify Admin → Online Store → Themes → Actions → Edit Code
2. Search for broken URL in all `.liquid` files (use Ctrl+Shift+F)
3. Replace with correct URL
4. Save

Example: Footer link to `/old-page/` appears in `footer.liquid` update it once, fixes across all pages.

**Option 4: Remove Broken External Links**

For broken external links in product descriptions or blog posts:

1. Products → Select product → Edit description → Find and remove broken link
2. Repeat for each product (no bulk edit for link removal in Shopify)

**Workaround:** Export products to CSV, find/replace broken URLs in spreadsheet, re-import CSV.

### Custom HTML Site Broken Link Fixes

**Option 1: .htaccess Redirects (Apache Servers)**

Add 301 redirects to `.htaccess` file in site root:

```apache
Redirect 301 /old-page/ https://yoursite.com/new-page/
Redirect 301 /old-product/ https://yoursite.com/new-product/
```

Unlimited redirects supported. Server handles 301s before page load (fast).

**Option 2: Nginx Redirects (Nginx Servers)**

Add redirects to Nginx config (`/etc/nginx/sites-available/yoursite`):

```nginx
server {
    location /old-page/ {
        return 301 https://yoursite.com/new-page/;
    }
    location /old-product/ {
        return 301 https://yoursite.com/new-product/;
    }
}
```

Test config: `sudo nginx -t`
Reload: `sudo systemctl reload nginx`

**Option 3: Meta Refresh Redirects (If No Server Access)**

Add to `<head>` of broken pages (if you can edit HTML):

```html
<meta http-equiv="refresh" content="0; url=https://yoursite.com/new-page/">
```

**Not recommended:** Meta refresh is slower than 301 redirects and doesn't pass full PageRank. Use only as last resort.

**Option 4: Find & Replace Across HTML Files**

If broken URL appears in multiple files:

1. Use text editor with multi-file search (VS Code, Sublime Text)
2. Search all `.html` files for broken URL
3. Replace with correct URL
4. Re-upload files to server

**VS Code method:**

1. Open project folder → Ctrl+Shift+F (Find in Files)
2. Search: `href="https://oldsite.com/dead-link"`
3. Replace: `href="https://yoursite.com/working-link"`
4. Replace All → Save files → Upload via FTP

## Automating Broken Link Detection

Manual audits find existing breaks. Automated monitoring catches new ones.

### Method 1: Scheduled Screaming Frog Crawls

**Screaming Frog** supports command-line automation:

```bash
/path/to/screamingfrogseospider --crawl https://yoursite.com --export-tabs "Response Codes:Client Error (4xx)" --output-folder /path/to/reports/ --save-crawl --overwrite
```

Schedule via cron (Linux/Mac) or Task Scheduler (Windows):

**Weekly crawl every Monday at 2am:**

```cron
0 2 * * 1 /path/to/screamingfrogseospider --crawl https://yoursite.com --export-tabs "Response Codes:Client Error (4xx)" --output-folder /var/reports/
```

Email CSV if broken links found (requires scripting to parse CSV and send alert).

### Method 2: Ahrefs Site Audit Alerts

**Ahrefs** Site Audit can email when new broken links appear:

1. Site Audit → Project Settings → Email Alerts
2. Enable "Broken internal links increased by X"
3. Set threshold (e.g., alert if broken links increase by 10+)
4. Save

Alerts arrive within 24 hours of next scheduled crawl.

### Method 3: Dead Link Checker Tools (Cloud-Based Monitoring)

**Tools:**

- **OnCrawl** (enterprise, $40+/month). Continuous crawling, alerts on new 404s
- **Sitebulb** (desktop, $35-135/month). Scheduled audits, email reports
- **Moz Pro** (all-in-one, $99+/month). Site Crawl feature detects broken links

Configure weekly crawls → Receive email reports → Fix broken links from report.

### Method 4: Broken Link Checker Plugin (WordPress)

**Broken Link Checker** plugin auto-scans WordPress sites:

1. Install plugin → Settings → Broken Link Checker
2. Set check frequency (every 72 hours recommended)
3. Enable email notifications
4. Plugin emails when broken links detected

**Pros:** Fully automated, no external tools needed

**Cons:** Resource-intensive (slows large sites), false positives (flags temporary downtime), abandoned plugin (last updated 2+ years ago as of 2026)

**Alternatives:** **Link Whisper** (paid, $77/year). Active development, better performance.

## Preventing Future Broken Links

**Prevention strategies:**

### Strategy 1: Pre-Delete Redirect Checklist

Before deleting any page, ask:

1. Does this page have inbound internal links? (Check in **Ahrefs** or **Screaming Frog**)
2. Does this page have external backlinks? (Check in **Ahrefs** → Backlinks)
3. Does this page rank for any keywords? (Check in **Google Search Console** → Performance)

If yes to any, create 301 redirect before deleting.

### Strategy 2: URL Slug Stability

Avoid changing URL slugs without redirects. Once a URL is published, treat it as permanent.

**WordPress tip:** Set permalink structure once, never change it. If you must change, use **Redirection** plugin to auto-create redirects.

### Strategy 3: External Link Validation Pre-Publish

Before publishing content with external links:

1. Click every external link to verify it works
2. Use **Check My Links** extension to scan page
3. Update broken links before publishing

### Strategy 4: Quarterly Broken Link Audits

Schedule audits:

- Q1, Q2, Q3, Q4: Run **Screaming Frog** or **Ahrefs** Site Audit
- Fix all broken links found
- Prevents accumulation over time

## Broken Link Fix Tracking

Document fixes to avoid duplicate work:

**Simple spreadsheet tracker:**

| Broken URL | Source Pages | Fix Type | Redirect Target | Date Fixed | Fixed By |
|------------|--------------|----------|-----------------|------------|----------|
| /old-product/ | Homepage, Category A | 301 Redirect | /new-product/ | 2026-02-08 | Victor |
| /dead-blog-post/ | Sidebar widget | Removed Link | N/A | 2026-02-08 | Victor |

Export broken link list from **Screaming Frog**, add columns for fix tracking.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.

## FAQ

**How many broken links is too many?**

<1% of total internal links = healthy. 1-3% = moderate issue, prioritize fixes. 5%+ = critical, massive crawl budget waste and PageRank loss.

**Should I fix broken external links or remove them?**

If destination moved (URL changed), update to new URL. If destination permanently died, remove link and mention in text ("Previously linked resource is no longer available").

**Do 404s hurt rankings directly?**

Not directly (Google doesn't penalize sites for having 404 pages, they're normal). Indirectly, broken links waste crawl budget, dilute PageRank, and hurt user experience, all of which harm rankings.

**What's better: 301 redirect or 410 Gone status?**

Use 301 redirect when you have a replacement page. Use 410 Gone when the content is truly obsolete and no replacement exists. 410 tells Google to drop the URL from the index faster than 404.

**Can I redirect all broken URLs to the homepage?**

No. Mass redirecting to homepage is "soft 404" behavior. **Google** treats it as 404 if target isn't relevant. Redirect to the closest relevant page (category, parent page).

**How long do I keep redirects in place?**

Permanent. **Google** and users may have old links bookmarked or referenced externally. Redirects cost almost nothing to maintain.

**Should I submit a new sitemap after fixing broken links?**

If you added 301 redirects, no need (Google follows redirects automatically). If you removed broken links from content, yes, submit updated sitemap to speed recrawling.

**What if a broken link is in the sitemap?**

Remove it immediately. **Sitemaps** tell Google "these are priority pages." Including 404s wastes crawl slots. Regenerate sitemap excluding broken URLs.

**Do broken links affect Domain Authority or Trust Flow?**

Not directly (those are third-party metrics), but broken links hurt real PageRank flow, which correlates with DA/TF. Fixing internal breaks restores equity flow, indirectly improving metrics over time.

**Can broken links cause manual actions?**

Rare. Only if thousands of broken links create a "poor user experience" or intentional cloaking/deception. Typical broken links don't trigger manual actions, algorithmic ranking penalties.

Run **Screaming Frog** or **Ahrefs** Site Audit today. Fix the top 50 broken links (highest inlink counts) this week. Implement 301 redirects for deleted pages, remove dead external links, and schedule quarterly audits to prevent future accumulation.

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.

---

## Frequently Asked Questions

### How long does this fix take to implement?

Most fixes in this article can be implemented in under an hour. Some require a staging environment for testing before deploying to production. The article flags which changes are safe to deploy immediately versus which need QA review first.

### Will this fix work on WordPress, Shopify, and custom sites?

The underlying SEO principles are platform-agnostic. Implementation details differ. WordPress uses plugins and theme files, Shopify uses Liquid templates, custom sites use direct code changes. The article focuses on the what and why; platform-specific how-to links are provided where available.

### How do I verify the fix worked?

Each fix includes a verification step. For most technical SEO changes: check Google Search Console coverage report 48-72 hours after deployment, validate with a live URL inspection, and monitor the affected pages in your crawl tool. Ranking impact typically surfaces within 1-4 weeks depending on crawl frequency.
