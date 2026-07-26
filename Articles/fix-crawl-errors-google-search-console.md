---
title:: How to Fix Crawl Errors in Google Search Console (Complete Guide)
description:: Crawl errors block Googlebot from indexing your pages, crater organic visibility, and signal poor site health. Learn how to diagnose 404s, server errors, redirect loops, and robots.txt blocks in Google Search Console and fix them systematically.
focus_keyword:: fix crawl errors google search console
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Fix Crawl Errors in Google Search Console (Complete Guide)

> **Quick Summary**
> - **What this covers:** Crawl errors block Googlebot from indexing your pages, crater organic visibility, and signal poor site health. Learn how to diagnose 404s, server errors, redirect loops, and robots.txt blocks in Google Search Console and fix them systematically.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Where to Find Crawl Errors in Google Search Console](#where-to-find-crawl-errors-in-google-search-console)
- [The 8 Most Common Crawl Errors (And How to Fix Them)](#the-8-most-common-crawl-errors-and-how-to-fix-them)
- [How to Prioritize Crawl Error Fixes](#how-to-prioritize-crawl-error-fixes)
- [Validating Fixes with Google Search Console](#validating-fixes-with-google-search-console)
- [Advanced: Bulk Fixing Crawl Errors at Scale](#advanced-bulk-fixing-crawl-errors-at-scale)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**Crawl errors** are Googlebot's way of saying "I tried to index your page, but your site broke the conversation." A **404** means the page doesn't exist. A **5xx error** means your server choked. A **redirect loop** means you sent Googlebot in circles until it gave up.

Each crawl error wastes **crawl budget**, strands pages from the index, and signals to Google that your site health is deteriorating. Left unfixed, crawl errors compound, orphaning entire sections, fragmenting your PageRank, and tanking rankings for pages Google can't reliably access.

**Google Search Console** surfaces these errors in the **Coverage** and **Page Indexing** reports. This guide shows you how to diagnose every error type, prioritize fixes by impact, and validate that Google recognizes your remediation.

## Where to Find Crawl Errors in Google Search Console

Google retired the legacy **Crawl Errors report** in 2019. Errors now surface in three locations:

### 1. Coverage Report (Legacy Interface)

**Path:** Google Search Console → Coverage

**Four tabs:**
- **Error:** Pages Google tried to index but failed
- **Valid with warnings:** Indexed but with issues
- **Valid:** Successfully indexed
- **Excluded:** Intentionally not indexed (canonical, noindex, etc.)

Click **Error** tab. You'll see categories:
- **Server error (5xx)**
- **Redirect error**
- **Submitted URL not found (404)**
- **Submitted URL has crawl issue**

Click each category to see affected URLs. Export: **Export → Download → CSV**

### 2. Page Indexing Report (New Interface)

**Path:** Google Search Console → Pages → Why pages aren't indexed

**Categories:**
- **Not found (404)**
- **Server error (5xx)**
- **Redirect error**
- **Blocked by robots.txt**
- **Crawled – currently not indexed**

Click any category to expand the list of affected URLs.

### 3. URL Inspection Tool (Individual Page Analysis)

**Path:** Google Search Console → URL Inspection

Enter any URL. The tool shows:
- **Coverage status:** Indexed, Not indexed, or Error
- **Crawl details:** Last crawl date, user agent, HTTP status code
- **Indexing issues:** Canonical conflicts, noindex tags, robots.txt blocks

Use this for **deep diagnosis** of individual high-priority pages.

## The 8 Most Common Crawl Errors (And How to Fix Them)

### Error #1: Submitted URL Not Found (404)

**What it means:** You included a URL in your sitemap, but it returns a **404 Not Found** error.

**Why it happens:**
- You deleted a page but forgot to remove it from the sitemap
- You migrated content and didn't set up redirects
- Your CMS generates sitemap URLs that don't match actual page URLs (parameter mismatches)

**Impact:** Wasted crawl budget. Google keeps trying to crawl dead links.

**How to fix:**

**Step 1:** Export the list from GSC:
- Coverage → Error → Submitted URL not found (404) → Export

**Step 2:** For each URL, decide:

**Option A (URL should exist):** Fix the page or restore it from backup.

**Option B (URL was intentionally deleted):**
1. Remove from sitemap
2. If the URL has **backlinks** (check Ahrefs/Semrush), 301 redirect to relevant alternative:
   ```apache
   # Apache .htaccess
   Redirect 301 /old-product https://yourdomain.com/new-product
   ```

**Option C (URL is a duplicate):** 301 redirect to canonical version.

**Step 3:** Clean your sitemap. If using WordPress + Yoast SEO:
1. **SEO → General → Features → XML Sitemaps** → Advanced settings
2. **Post types** → Disable sitemaps for post types you don't want indexed (e.g., "Media")

For custom sitemaps, filter out 404s:

```php
// PHP: Only include URLs that return 200
$urls = get_all_urls();
foreach ($urls as $url) {
  $headers = get_headers($url);
  if (strpos($headers[0], '200') !== false) {
    echo '<url><loc>' . $url . '</loc></url>';
  }
}
```

**Step 4:** Request re-indexing:
- GSC → URL Inspection → Test live URL → Request Indexing

Wait 7-14 days for errors to clear.

### Error #2: Server Error (5xx)

**What it means:** Your server returned a **500 Internal Server Error**, **502 Bad Gateway**, or **503 Service Unavailable** when Googlebot tried to crawl.

**Why it happens:**
- Server overload (high traffic, insufficient resources)
- Database connection failures
- Plugin conflicts (WordPress)
- CDN outages
- Coding errors (PHP fatal errors, broken scripts)

**Impact:** Severe. Google may deindex pages if 5xx errors persist for weeks.

**How to diagnose:**

**Step 1:** Check error frequency:
- GSC → Coverage → Server error (5xx)
- Click into the error → **See examples**

**Step 2:** Check your server error logs (not access logs):

**Apache:**
```bash
tail -f /var/log/apache2/error.log
```

**Nginx:**
```bash
tail -f /var/log/nginx/error.log
```

Look for patterns:
```
[error] 12345#0: *67890 FastCGI sent in stderr: "PHP message: PHP Fatal error: Allowed memory size exhausted"
```

**Step 3:** Reproduce the error:
1. Visit the affected URL
2. Open browser DevTools (`F12`) → Network tab
3. Refresh page
4. Check response status code (should be 200, not 5xx)

**How to fix:**

**Temporary overload:**
- Upgrade hosting plan (more CPU, RAM)
- Enable caching (WP Super Cache, W3 Total Cache)
- Use a CDN (Cloudflare, Cloudfront)

**Database issues:**
- Optimize database tables: `mysqlcheck -o --all-databases`
- Increase MySQL memory: Edit `/etc/mysql/my.cnf`, increase `innodb_buffer_pool_size`

**Plugin conflicts (WordPress):**
1. Deactivate all plugins
2. Test URL
3. Reactivate plugins one-by-one until error returns
4. Replace problematic plugin or contact developer

**PHP errors:**
Check PHP error log:
```bash
tail -f /var/log/php-fpm/error.log
```

Fix the reported error (syntax, memory limit, missing function). If memory exhausted:
```php
// In wp-config.php
define('WP_MEMORY_LIMIT', '256M');
```

### Error #3: Redirect Error (Redirect Loop or Chain)

**What it means:** Googlebot followed redirects but either hit a loop (A → B → A) or gave up after too many hops (A → B → C → D → E).

**Why it happens:**
- Conflicting redirect rules in `.htaccess` or `nginx.conf`
- Plugin redirect conflicts (WordPress: Redirection + Yoast both trying to redirect)
- HTTP → HTTPS redirect loops (misconfigured)

**How to diagnose:**

**Step 1:** Test the URL with **Redirect Checker**:
- Use online tool: `https://httpstatus.io`
- Or command line:
  ```bash
  curl -I -L https://yourdomain.com/page
  ```

Output shows each redirect hop:
```
HTTP/1.1 301 Moved Permanently
Location: https://yourdomain.com/page2

HTTP/1.1 301 Moved Permanently
Location: https://yourdomain.com/page3

HTTP/1.1 200 OK
```

**If you see the same URL twice = loop.**

**Step 2:** Check redirect rules:

**Apache (.htaccess):**
```bash
cat .htaccess | grep -i redirect
```

Look for conflicting rules:
```apache
Redirect 301 /page https://yourdomain.com/page2
Redirect 301 /page2 https://yourdomain.com/page  # LOOP
```

**Nginx:**
```bash
grep -r "rewrite" /etc/nginx/sites-enabled/
```

**Step 3:** Check plugin conflicts (WordPress):
1. **Plugins → Redirection** (if installed) → Check redirect list
2. **Yoast SEO → Tools → File Editor** → Check `.htaccess` for duplicates
3. Deactivate **Redirection** plugin temporarily, test URL

**How to fix:**

**Remove conflicting redirects:**
Edit `.htaccess` or `nginx.conf`, delete duplicate redirect rules.

**Consolidate redirect logic:**
Use ONE redirect method (plugin OR .htaccess, not both).

**Fix HTTPS redirect loops:**
Ensure only ONE rule forces HTTPS:

```apache
# Apache (remove duplicates)
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```

**Shorten redirect chains:**
If `/old-url` redirects to `/temp-url` which redirects to `/new-url`, update `/old-url` to redirect directly to `/new-url`.

### Error #4: Blocked by robots.txt

**What it means:** Your `robots.txt` file has a `Disallow` rule blocking Googlebot from crawling the URL.

**Why it happens:**
- Accidental wildcard rules: `Disallow: /`
- Plugin-generated robots.txt (security plugins, SEO plugins)
- Legacy rules from site migration

**How to diagnose:**

**Step 1:** Check your robots.txt:
```
https://yourdomain.com/robots.txt
```

Example problematic rule:
```
User-agent: *
Disallow: /products/
```

This blocks ALL bots from `/products/` directory.

**Step 2:** Use **GSC robots.txt Tester:**
1. GSC → Settings → Open report (under "robots.txt Tester" heading)
2. Enter the blocked URL
3. Click **Test**

If "Blocked," the tester shows which line in robots.txt caused the block.

**How to fix:**

**Remove overly broad rules:**
If you meant to block only test pages:
```
# Wrong
Disallow: /

# Correct
Disallow: /test/
```

**Allow Googlebot explicitly:**
```
User-agent: Googlebot
Allow: /products/

User-agent: *
Disallow: /products/
```

This allows Googlebot while blocking other bots.

**WordPress fix (plugin-generated robots.txt):**
1. **Yoast SEO → Tools → File Editor → robots.txt**
2. Or **Rank Math → General Settings → Edit robots.txt**
3. Remove problematic `Disallow` lines

**Verify fix:**
Re-test in GSC robots.txt Tester. If "Allowed," request re-indexing via URL Inspection.

### Error #5: Soft 404

**What it means:** Your page returns a **200 OK** status but shows "Page not found" or empty content. Google detects this and flags it as a soft 404.

**Why it happens:**
- Custom 404 pages configured to return 200 instead of 404 status
- CMS misconfiguration (WordPress returns 200 for deleted posts instead of 404)
- JavaScript-rendered content fails, leaving blank page

**How to diagnose:**

**Step 1:** Visit the flagged URL. If you see "Page not found" but browser DevTools shows **200 OK**, it's a soft 404.

**Step 2:** Check HTTP headers:
```bash
curl -I https://yourdomain.com/deleted-page
```

Output:
```
HTTP/1.1 200 OK
```

Should be:
```
HTTP/1.1 404 Not Found
```

**How to fix:**

**WordPress:** Ensure deleted posts return 404:
```php
// In functions.php
add_action('template_redirect', function() {
  if (is_404()) {
    status_header(404);
  }
});
```

**Custom 404 page:** Ensure it returns proper header:
```php
// In 404.php template
header("HTTP/1.1 404 Not Found");
```

**JavaScript SPAs (React, Vue):**
Configure server to return 404 for missing routes:

```javascript
// Node.js/Express
app.get('*', (req, res) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});
```

### Error #6: Crawled – Currently Not Indexed

**What it means:** Googlebot successfully crawled the page, but decided not to index it.

**Why it happens:**
- **Low quality:** Thin content (<300 words), duplicate content, or scraped content
- **Low demand:** Google sees the page as low-value (few backlinks, low traffic potential)
- **Crawl budget prioritization:** Large sites with 100,000+ pages; Google indexes high-value pages first

**How to fix:**

**Step 1:** Audit content quality:
1. Visit the URL
2. Check word count (aim for 800+ words for blog posts, 500+ for product pages)
3. Check for duplicate content (use **Copyscape** or **Siteliner**)

**Step 2:** Improve on-page SEO:
- Add **internal links** from high-authority pages (homepage, top blog posts)
- Add **multimedia** (images, videos, infographics)
- Add **structured data** (FAQ schema, HowTo schema, Product schema)

**Step 3:** Request indexing:
- GSC → URL Inspection → Request Indexing

**Step 4 (if still not indexed after 30 days):**
Consider consolidating the page with a higher-priority page (redirect or canonical tag).

### Error #7: Discovered – Currently Not Indexed

**What it means:** Google found the URL (via sitemap, external link, or internal link) but hasn't crawled it yet.

**Why it happens:**
- **New site:** Google hasn't allocated crawl budget yet
- **Low internal linking:** Page is orphaned or buried deep in site architecture
- **Crawl queue backlog:** Google prioritizes higher-value pages first

**How to fix:**

**Step 1:** Increase internal links:
Add 5-10 internal links to the page from high-authority pages (homepage, pillar content).

**Step 2:** Add to sitemap (if not already):
Ensure URL appears in `sitemap.xml`.

**Step 3:** Request indexing:
GSC → URL Inspection → Request Indexing

**Step 4:** Build external backlinks:
If internal fixes don't work, get 2-3 external links (guest posts, partnerships, social shares).

### Error #8: Alternate Page with Proper Canonical Tag

**What it means:** The page is intentionally not indexed because it has a canonical tag pointing to a different URL.

**Why it's flagged:** Google wants you to know it's obeying your canonical directive.

**Is this an error?** No, it's informational. If the canonical is correct, ignore this.

**How to fix (if canonical is wrong):**

**Step 1:** Check the canonical:
```bash
curl -s https://yourdomain.com/page | grep canonical
```

Output:
```html
<link rel="canonical" href="https://yourdomain.com/other-page" />
```

**Step 2:** If the page SHOULD be indexed (not a duplicate), update canonical to self-reference:
```html
<link rel="canonical" href="https://yourdomain.com/page" />
```

**WordPress (Yoast):**
1. Edit the page
2. Scroll to **Yoast SEO meta box → Advanced → Canonical URL**
3. Leave blank (self-referencing) or enter the correct URL

## How to Prioritize Crawl Error Fixes

Not all crawl errors matter equally. Triage based on:

### High Priority (Fix Immediately)

1. **Server errors (5xx)** on high-traffic pages (homepage, product pages)
2. **404s** with external backlinks (check Ahrefs → Backlinks → Filter by 404)
3. **Redirect loops** affecting navigation or checkout flows
4. **Robots.txt blocks** on pages you WANT indexed

### Medium Priority (Fix This Week)

1. **Soft 404s** on product/service pages
2. **Crawled – not indexed** for money pages (transactional intent keywords)
3. **Redirect chains** causing slow page loads

### Low Priority (Batch Monthly)

1. **404s** with zero backlinks and zero internal links (orphans)
2. **Discovered – not indexed** for low-traffic content (old blog posts)
3. **Alternate page with proper canonical tag** (informational, not an error)

## Validating Fixes with Google Search Console

After fixing errors:

### Step 1: Validate Fix in GSC

1. **GSC → Coverage → Error** (or Pages → Why pages aren't indexed)
2. Click the error type you fixed
3. Click **Validate Fix**

Google will re-crawl affected URLs over the next 7-28 days. Status changes from "Pending" → "Passed" (if fixed) or "Failed" (if still broken).

### Step 2: Monitor Coverage Trends

**GSC → Coverage → Overview**

Watch the graph:
- **Error count** should decline
- **Valid count** should rise

If errors persist after 30 days, re-audit for missed issues.

### Step 3: Use URL Inspection for Spot-Checks

For high-priority pages:
1. **GSC → URL Inspection**
2. Enter URL
3. Click **Test live URL**
4. If "Page is indexable," request re-indexing

## Advanced: Bulk Fixing Crawl Errors at Scale

For sites with 1,000+ crawl errors, manual fixes don't scale.

### Use Screaming Frog to Map Issues

1. Crawl your site: **Screaming Frog → Enter domain → Start**
2. Export errors: **Response Codes → Client Error (4xx) → Export**
3. Cross-reference with GSC export (Coverage → Export)

**Identify patterns:**
- All 404s in `/products/` directory? Check sitemap generation logic.
- All 5xx errors during peak hours? Server resource issue.

### Automate Redirects (WordPress)

Use **Redirection** plugin with CSV import:
1. Export GSC 404 list
2. Add "Redirect to" column in Excel
3. Import to **Redirection → Import/Export → Import from CSV**

### Set Up Monitoring Alerts

**Google Search Console:**
1. **Settings → Users and permissions → Add user**
2. Enable **Email notifications for coverage issues**

**Third-party:**
- **Ahrefs Site Audit** → Set up weekly crawls → Email alerts for 404/5xx spikes
- **Sitebulb** → Schedule audits → Slack/email alerts


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.

## FAQ

**How long does it take Google to recognize fixed crawl errors?**

7-14 days for small sites. 4-8 weeks for large sites (50,000+ pages) as Google re-crawls incrementally. Use "Validate Fix" in GSC to expedite.

**Why do crawl errors reappear after I fix them?**

Common causes:
- Cached sitemaps (regenerate sitemap, ping Google)
- CDN caching old responses (purge CDN cache)
- External sites still linking to old URLs (reach out for link updates or redirect)

**Can crawl errors cause a ranking penalty?**

No direct penalty. But they waste crawl budget, delay indexing of fresh content, and signal poor site quality, all of which harm rankings indirectly.

**Should I fix all crawl errors or prioritize high-impact ones?**

Prioritize. Fixing 10 high-impact errors (5xx on top pages, 404s with backlinks) yields more SEO gain than fixing 1,000 low-impact orphan 404s.

**What if GSC shows errors for URLs that don't exist on my site?**

These are likely:
- External sites linking to mistyped URLs (ignore or redirect to homepage)
- Old URLs from previous site version (redirect to relevant page)
- Malicious bot probes (ignore, don't waste time redirecting hacker test URLs)

**Can I ignore "Alternate page with proper canonical tag" errors?**

Yes. This isn't an error, it's informational. Google is confirming it's following your canonical directive.

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.

---

Crawl errors fragment your indexing, bleed crawl budget, and signal site instability to Google. Audit GSC weekly, prioritize fixes by traffic impact, and validate with URL Inspection. A clean crawl profile accelerates indexing, stabilizes rankings, and maximizes your organic visibility.

---

## Frequently Asked Questions

### How long does this fix take to implement?

Most fixes in this article can be implemented in under an hour. Some require a staging environment for testing before deploying to production. The article flags which changes are safe to deploy immediately versus which need QA review first.

### Will this fix work on WordPress, Shopify, and custom sites?

The underlying SEO principles are platform-agnostic. Implementation details differ. WordPress uses plugins and theme files, Shopify uses Liquid templates, custom sites use direct code changes. The article focuses on the what and why; platform-specific how-to links are provided where available.

### How do I verify the fix worked?

Each fix includes a verification step. For most technical SEO changes: check Google Search Console coverage report 48-72 hours after deployment, validate with a live URL inspection, and monitor the affected pages in your crawl tool. Ranking impact typically surfaces within 1-4 weeks depending on crawl frequency.

