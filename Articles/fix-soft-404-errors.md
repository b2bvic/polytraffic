---
title:: How to Fix Soft 404 Errors in Google Search Console
description:: Diagnose and resolve soft 404 errors that waste crawl budget and confuse search engines by serving proper HTTP status codes and fixing thin content patterns.
focus_keyword:: fix soft 404 errors
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Fix Soft 404 Errors in Google Search Console

> **Quick Summary**
> - **What this covers:** Diagnose and resolve soft 404 errors that waste crawl budget and confuse search engines by serving proper HTTP status codes and fixing thin content patterns.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why Soft 404s Harm SEO](#why-soft-404s-harm-seo)
- [Identifying Soft 404s in Search Console](#identifying-soft-404s-in-search-console)
- [Testing for Soft 404 Characteristics](#testing-for-soft-404-characteristics)
- [Fixing Soft 404s: Serve Proper 404 Status Codes](#fixing-soft-404s-serve-proper-404-status-codes)
- [Fixing Soft 404s: Add Substantial Content](#fixing-soft-404s-add-substantial-content)
- [Preventing Soft 404s at Scale](#preventing-soft-404s-at-scale)
- [Validating Fixes in Search Console](#validating-fixes-in-search-console)
- [WordPress-Specific Soft 404 Causes](#wordpress-specific-soft-404-causes)
- [Shopify Soft 404 Issues](#shopify-soft-404-issues)
- [Monitoring for New Soft 404s](#monitoring-for-new-soft-404s)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


A **soft 404** occurs when a page returns an HTTP 200 (success) status code but displays "not found" content. **Googlebot** detects thin content patterns, empty templates, generic error messages, minimal text, and flags the page as a soft 404 instead of indexing it. Unlike hard 404s (proper HTTP 404 responses), soft 404s waste crawl budget because **Google** must download and analyze full page content to determine it's useless.

**Search Console** reports soft 404s under **Pages > Not found (404)**. They appear distinct from genuine 404s, grouped as "Soft 404" in the error table. Fixing soft 404s involves either serving proper 404 status codes for dead pages or adding substantial content to thin pages. This guide covers diagnosis, remediation, and prevention workflows.

## Why Soft 404s Harm SEO

**Crawl budget** is the number of pages **Googlebot** crawls per day. Sites with 10k+ pages see crawl rate limits. **Google** won't crawl everything daily. Soft 404s consume crawl budget without contributing indexed pages. If **Googlebot** wastes 30% of daily crawls on soft 404s, fresh content takes longer to index.

**Search Console's Coverage report** treats soft 404s as "Excluded" URLs. They don't rank, don't pass PageRank, and don't appear in search results. Sites with thousands of soft 404s often have structural issues:

- Faceted navigation generating empty filter pages
- Paginated archives extending beyond actual page counts
- E-commerce sites with discontinued products returning 200 instead of 404 or 301
- CMS bugs serving blank templates

Each soft 404 signals to **Google** that your site generates low-quality pages. Persistent soft 404s in the thousands trigger manual review flags where quality raters examine site structure.

## Identifying Soft 404s in Search Console

Go to **Search Console > Pages**. The "Why pages aren't indexed" section lists exclusion reasons. Click **Soft 404** to see affected URLs. The report shows:

- **URL**: The flagged page
- **Last crawl**: When **Googlebot** detected the issue
- **Sitemap**: Whether the URL appears in submitted sitemaps

Export the URL list (top-right export button) for bulk analysis. Common patterns emerge:

**Pattern 1: Empty category pages**
```
/category/page/45/
/category/page/46/
/category/page/47/
```

Pagination extends beyond actual post count. Page 45 exists but has zero posts.

**Pattern 2: Faceted filters with no results**
```
/products?color=red&size=xl&brand=nike
/products?price=100-200&category=shoes&discount=50
```

E-commerce filters create unique URLs with zero matching products.

**Pattern 3: Search result pages**
```
/search?q=asdfasdf
/search?q=1234567890
```

Internal search generates URLs for nonsense queries. **Googlebot** finds these via crawling or external links (spam).

**Pattern 4: Discontinued product pages**
```
/products/old-model-2020
/products/discontinued-item
```

Product deleted from database but URL still accessible via cached links or sitemaps.

## Testing for Soft 404 Characteristics

Manually inspect flagged URLs to understand why **Google** classified them as soft 404s.

### Check HTTP Status Code

Use **curl** to verify the response code:

```bash
curl -I https://example.com/category/page/45/
```

Look for the first line:
```
HTTP/2 200
```

A 200 status on a "not found" page is a soft 404. The correct response is `HTTP/1.1 404 Not Found`.

### Examine Page Content

Visit the URL in a browser. Indicators **Google** uses to detect soft 404s:

- Text containing "not found," "no results," "404," "error"
- Empty main content areas with only navigation/footer visible
- Word count under 100-200 words
- Templates identical to known error pages

**Google's algorithms** compare page structure to your site's 404 template. If a 200-status page matches 80%+ of a 404 template's DOM structure, it's flagged as soft 404.

### Compare to Genuine 404s

Request a URL you know doesn't exist:

```bash
curl -I https://example.com/this-page-definitely-does-not-exist
```

If this returns 404 but soft 404 URLs return 200, your server inconsistently handles missing pages.

## Fixing Soft 404s: Serve Proper 404 Status Codes

The primary fix for legitimate dead pages is returning HTTP 404 instead of 200.

### WordPress Soft 404 Fix

**WordPress** sometimes serves 200 for empty archives. Install the **Yoast SEO** plugin and enable strict 404 handling:

1. Go to **SEO > Search Appearance > Archives**
2. Toggle off empty category indexing
3. Add to `functions.php`:

```php
function fix_soft_404_pagination() {
  global $wp_query;
  if (is_paged() && !have_posts()) {
    status_header(404);
    nocache_headers();
    include(get_query_template('404'));
    exit;
  }
}
add_action('template_redirect', 'fix_soft_404_pagination');
```

This detects empty paginated pages and serves 404.

### PHP Custom Error Handling

For custom PHP applications:

```php
<?php
if (empty($results)) {
  http_response_code(404);
  include('404-template.php');
  exit;
}
?>
```

Place this check before rendering content. The `http_response_code(404)` function sets the proper header.

### Apache .htaccess 404 Redirect

Force specific URL patterns to return 404:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_URI} ^/category/page/([4-9][0-9]|[0-9]{3,})/?$ [NC]
  RewriteRule ^ - [R=404,L]
</IfModule>
```

This returns 404 for pagination beyond page 40 (adjust the regex to match your site's limits).

### Nginx 404 Configuration

In your server block:

```nginx
location ~ ^/category/page/[4-9][0-9]/?$ {
  return 404;
}
```

Restart **Nginx**:

```bash
sudo systemctl reload nginx
```

Test with `curl -I` to verify 404 responses.

## Fixing Soft 404s: Add Substantial Content

If a page should exist but **Google** flagged it as soft 404, the issue is thin content. Bulk up the page.

### Enrich Empty Category Pages

Replace "No posts found" with useful content:

**Before**:
```html
<div class="content">
  <p>No posts in this category.</p>
</div>
```

**After**:
```html
<div class="content">
  <h1>Stay Tuned for [Category Name] Updates</h1>
  <p>We're building out comprehensive content on [topic]. Subscribe to get notified when new articles publish.</p>
  <h2>Related Topics</h2>
  <ul>
    <li><a href="/related-category-1/">Related Category 1</a></li>
    <li><a href="/related-category-2/">Related Category 2</a></li>
  </ul>
  <h2>Popular Articles</h2>
  <!-- Dynamically insert top 5 posts from site -->
</div>
```

Add 200-300 words and internal links. **Googlebot** sees meaningful content and removes the soft 404 flag.

### Fix Empty Search Results

Show alternative suggestions instead of blank pages:

```php
<?php
if (empty($search_results)) {
  echo '<h2>No results for "' . esc_html($query) . '"</h2>';
  echo '<p>Try these popular pages instead:</p>';
  // Display 5 top pages by traffic
  echo '<ul>';
  foreach (get_top_pages(5) as $page) {
    echo '<li><a href="' . $page['url'] . '">' . $page['title'] . '</a></li>';
  }
  echo '</ul>';
} else {
  // Display search results
}
?>
```

This prevents soft 404s on zero-result searches.

### Handle Discontinued Products Properly

**E-commerce** sites should 301 redirect discontinued products to active replacements or the category page:

**WooCommerce**:

```php
function redirect_discontinued_products() {
  if (is_singular('product')) {
    global $post;
    if (get_post_meta($post->ID, '_discontinued', true) === 'yes') {
      $replacement = get_post_meta($post->ID, '_replacement_product', true);
      if ($replacement) {
        wp_redirect(get_permalink($replacement), 301);
        exit;
      } else {
        // Redirect to category
        $terms = get_the_terms($post->ID, 'product_cat');
        if ($terms) {
          wp_redirect(get_term_link($terms[0]), 301);
          exit;
        }
      }
    }
  }
}
add_action('template_redirect', 'redirect_discontinued_products');
```

This checks a custom field `_discontinued` and redirects accordingly.

**Shopify**:

Use **URL redirects** in admin:

1. Go to **Online Store > Navigation > URL Redirects**
2. Add: `/products/old-item` → `/products/new-item`
3. Save

Shopify serves 301 redirects automatically.

## Preventing Soft 404s at Scale

Reactive fixes work for hundreds of URLs. Sites with thousands need systematic prevention.

### Limit Pagination Depth

Calculate max pagination based on post count:

```php
function limit_pagination() {
  global $wp_query;
  $max_page = $wp_query->max_num_pages;
  if (get_query_var('paged') > $max_page) {
    status_header(404);
    include(get_query_template('404'));
    exit;
  }
}
add_action('template_redirect', 'limit_pagination');
```

Pages beyond actual content return 404 instead of empty templates.

### Noindex Faceted Navigation

E-commerce filters create millions of URLs. Prevent indexing:

```php
function noindex_faceted_urls() {
  if (isset($_GET['filter']) || isset($_GET['sort'])) {
    echo '<meta name="robots" content="noindex,follow">';
  }
}
add_action('wp_head', 'noindex_faceted_urls', 1);
```

This adds noindex to filtered URLs, preventing soft 404s from entering the index.

Or use `robots.txt`:

```
User-agent: *
Disallow: /*?filter=
Disallow: /*?sort=
```

This blocks crawling entirely, saving crawl budget.

### Disallow Internal Search in robots.txt

Search result pages rarely provide value to **Google**. Block them:

```
User-agent: *
Disallow: /search?
Disallow: /?s=
```

**WordPress** uses `?s=` for search queries. This prevents **Googlebot** from indexing nonsense searches.

### Auto-Delete Stale Content

Set up automated removal of pages that haven't been updated in 2+ years and get zero traffic:

1. Query **Google Analytics API** for zero-traffic pages
2. Cross-reference against last modified date
3. Either 301 redirect to relevant content or serve 410 (Gone) status

A **410 Gone** signals permanent removal. **Google** drops the URL from the index faster than 404.

## Validating Fixes in Search Console

After implementing fixes:

1. Return to **Search Console > Pages > Soft 404**
2. Click **Validate Fix** (top-right)
3. **Google** recrawls a sample of URLs to verify fixes
4. Validation takes 7-14 days

If validation passes, the soft 404 count drops to zero. If it fails, **Search Console** provides specific URLs still triggering the error. Re-inspect those URLs to identify persistent issues.

### Use URL Inspection Tool

For critical pages:

1. Go to **URL Inspection** (magnifying glass icon)
2. Enter the URL
3. Click **Test Live URL**
4. Check **HTTP response** and **Indexability**

If **Google** still sees a soft 404, the response body likely still matches thin content patterns. Add more text or restructure the template.

## WordPress-Specific Soft 404 Causes

**WordPress** generates soft 404s from plugin conflicts and theme bugs.

### Empty Tag/Category Archives

**WordPress** creates archives for tags with zero posts. Fix with:

```php
function remove_empty_term_archives() {
  if ((is_tag() || is_category()) && !have_posts()) {
    global $wp_query;
    $wp_query->set_404();
    status_header(404);
    include(get_query_template('404'));
    exit;
  }
}
add_action('template_redirect', 'remove_empty_term_archives');
```

### Author Archives with No Posts

Authors without published posts shouldn't have archive pages:

```php
function fix_empty_author_archives() {
  if (is_author() && !have_posts()) {
    global $wp_query;
    $wp_query->set_404();
    status_header(404);
    include(get_query_template('404'));
    exit;
  }
}
add_action('template_redirect', 'fix_empty_author_archives');
```

### Attachment Pages

**WordPress** creates pages for media uploads. These are often thin content. Redirect to parent post:

```php
function redirect_attachment_pages() {
  if (is_attachment()) {
    global $post;
    if ($post->post_parent) {
      wp_redirect(get_permalink($post->post_parent), 301);
      exit;
    } else {
      wp_redirect(home_url(), 301);
      exit;
    }
  }
}
add_action('template_redirect', 'redirect_attachment_pages');
```

## Shopify Soft 404 Issues

**Shopify** generates soft 404s from collections and variant URLs.

### Empty Collections

Collections with zero products return 200. Fix by:

1. Unpublishing empty collections: **Products > Collections** → uncheck **Online Store**
2. Or adding placeholder text via theme editor in `collection.liquid`:

```liquid
{% if collection.products.size == 0 %}
  <div class="empty-collection">
    <h2>Coming Soon</h2>
    <p>We're adding products to this collection. Check back soon!</p>
  </div>
{% endif %}
```

This adds content to prevent soft 404 detection.

### Variant URL Soft 404s

**Shopify** sometimes generates URLs like `/products/shirt?variant=12345` that redirect to the parent product. If the variant is sold out and hidden, the URL may return thin content. Set up proper redirects in **URL Redirects** or use **Shopify Scripts** (Plus plan) to handle programmatically.

## Monitoring for New Soft 404s

Set up alerts to catch soft 404s early.

### Search Console Email Alerts

**Search Console** sends weekly summaries. Enable:

1. Go to **Settings > Users and permissions**
2. Ensure email notifications are on
3. Check weekly digests for "Coverage issues increased"

### Screaming Frog Scheduled Crawls

Crawl your site weekly and export pages with 200 status but <200 words:

1. Configure **Screaming Frog** to crawl
2. Go to **Bulk Export > Response Codes > All**
3. Filter for **Status Code = 200** and **Word Count < 200**
4. Save as CSV and review

Thin content that slipped into production gets caught before **Google** does.

### Google Analytics 404 Tracking

Track soft 404s in **GA4**:

1. Add to your 404 template:

```javascript
gtag('event', 'page_view', {
  'page_title': '404 - Page Not Found',
  'page_location': window.location.href,
  'send_to': 'GA_MEASUREMENT_ID'
});
```

2. Create a custom report in **GA4** filtering for "404" page titles
3. Export URLs receiving traffic but displaying 404 content

These URLs are soft 404 candidates if they return 200.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why Soft 404s Harm SEO:** Each soft 404 signals to Google that your site generates low-quality pages.
* **Testing for Soft 404 Characteristics:** Manually inspect flagged URLs to understand why Google classified them as soft 404s.
* **Fixing Soft 404s: Serve Proper 404 Status Codes:** The primary fix for legitimate dead pages is returning HTTP 404 instead of 200.
* **Fixing Soft 404s: Add Substantial Content:** If a page should exist but Google flagged it as soft 404, the issue is thin content.
* **Preventing Soft 404s at Scale:** Reactive fixes work for hundreds of URLs.

## FAQ

**Q: What's the difference between soft 404s and hard 404s?**
Hard 404s return HTTP 404 status codes and properly signal "page not found." Soft 404s return HTTP 200 but display error content, confusing **Googlebot**.

**Q: Do soft 404s cause ranking penalties?**
Not directly, but they waste crawl budget and signal poor site quality at scale. Sites with 10k+ soft 404s often see overall ranking declines.

**Q: Can I noindex soft 404 pages?**
Noindex prevents indexing but doesn't stop crawling. Serving proper 404s is more efficient. **Googlebot** drops the URL faster and doesn't waste resources downloading content.

**Q: Should I 301 redirect soft 404s?**
Only if relevant replacement content exists. Random 301s to the homepage are user-hostile and may be treated as soft 404s by **Google**.

**Q: How long until Google drops soft 404s from the index?**
After fixing (serving 404s), **Google** recrawls and drops URLs within 30-90 days. Use **Remove URLs** tool in **Search Console** to expedite removal.

**Q: Why does Search Console still show soft 404s after I fixed them?**
**Google** caches crawl results. After fixes, click **Validate Fix** to request recrawls. Full validation takes 7-14 days.

**Q: Can thin content on indexed pages trigger soft 404 flags?**
Yes, if word count drops below ~150 words and the page matches error page patterns. Add content to prevent reclassification.

**Q: Do soft 404s affect sitemap processing?**
Yes. URLs in sitemaps flagged as soft 404s generate **Submitted URL not found (404)** errors, wasting sitemap inclusion.

**Q: Should I serve 410 (Gone) instead of 404 for deleted pages?**
**410** signals permanent removal and **Google** drops URLs faster. Use for discontinued products or deleted blog posts with no replacement.

**Q: Can third-party apps cause soft 404s?**
Yes. Shopify apps, WordPress plugins, or external widgets that generate empty pages can trigger soft 404s. Audit recently installed apps if errors spike.

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

