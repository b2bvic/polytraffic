---
title:: How to Fix Sitemap Errors in Google Search Console
description:: Diagnose and resolve sitemap errors in Google Search Console including parse errors, URL not found issues, and indexing blockers that prevent pages from ranking.
focus_keyword:: fix sitemap errors
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Fix Sitemap Errors in Google Search Console

> **Quick Summary**
> - **What this covers:** Diagnose and resolve sitemap errors in Google Search Console including parse errors, URL not found issues, and indexing blockers that prevent pages from ranking.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why Sitemaps Matter for Crawl Efficiency](#why-sitemaps-matter-for-crawl-efficiency)
- [Diagnosing Sitemap Errors in Search Console](#diagnosing-sitemap-errors-in-search-console)
- [Fixing "Couldn't Fetch" Errors](#fixing-couldn-t-fetch-errors)
- [Fixing "Couldn't Read" Parsing Errors](#fixing-couldn-t-read-parsing-errors)
- [Resolving "Submitted URL Not Found (404)"](#resolving-submitted-url-not-found-404)
- [Fixing "Submitted URL Marked 'noindex'"](#fixing-submitted-url-marked-noindex)
- [Fixing "Submitted URL Blocked by robots.txt"](#fixing-submitted-url-blocked-by-robots-txt)
- [Fixing "Submitted URL Redirects"](#fixing-submitted-url-redirects)
- [Fixing "Sitemap Contains Invalid URL"](#fixing-sitemap-contains-invalid-url)
- [Verifying Fixes in Search Console](#verifying-fixes-in-search-console)
- [Automating Sitemap Monitoring](#automating-sitemap-monitoring)
- [WordPress-Specific Fixes](#wordpress-specific-fixes)
- [Shopify Sitemap Issues](#shopify-sitemap-issues)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**Google Search Console** reports sitemap errors when your XML file contains invalid URLs, malformed markup, or pages blocked by robots directives. These errors prevent **Googlebot** from discovering new content and updating the index. A broken sitemap doesn't directly trigger penalties, but it cripples crawl efficiency, pages that should rank in days take weeks to appear.

Sitemap errors fall into three categories: **structural problems** (XML syntax, encoding), **URL issues** (redirects, 404s, canonicals), and **robots blocks** (noindex tags, disallow rules). This guide walks through diagnosis using **Search Console**, systematic fixes, and validation workflows that prevent recurrence.

## Why Sitemaps Matter for Crawl Efficiency

**Googlebot** discovers URLs through three mechanisms: internal links, external backlinks, and sitemaps. A comprehensive sitemap ensures pages without strong internal linking (category archives, paginated series, dynamically generated product pages) reach the index. Without a clean sitemap:

- New blog posts take 7-10 days to rank instead of 24-48 hours
- Orphaned pages (no incoming links) never appear in results
- Large sites exhaust crawl budget on error pages instead of fresh content

**Search Console's Sitemaps report** shows submission status, discovered URLs, and error counts. The "Couldn't fetch" status means **Googlebot** can't download the file. "Couldn't read" indicates parsing failures. "URL errors" flag individual entries that violate indexing rules.

A healthy sitemap has:
- 100% URLs successfully crawled
- Zero "Submitted URL not found (404)" errors
- Zero "Submitted URL marked 'noindex'"
- Zero "Submitted URL blocked by robots.txt"

Fixing errors restores crawl flow, allowing **Google** to allocate resources to indexing real content instead of chasing broken references.

## Diagnosing Sitemap Errors in Search Console

Go to **Search Console > Sitemaps**. The overview panel lists submitted sitemaps with status indicators:

| Status | Meaning | Action |
|--------|---------|--------|
| Success | Parsed without errors | Monitor for URL-level issues |
| Couldn't fetch | Server timeout or 404 | Verify sitemap URL is accessible |
| Couldn't read | XML syntax error | Validate with XML linter |
| URL errors | Individual URLs rejected | Drill into error details |

Click a sitemap to view the detailed report. The top section shows:
- **Discovered URLs**: Total URLs found in the file
- **Last read**: When **Googlebot** last parsed the sitemap
- **Status**: Error categories and counts

Common error types:

**Submitted URL not found (404)**: The sitemap lists a URL that returns a 404. Happens when pages are deleted without updating the sitemap.

**Submitted URL marked 'noindex'**: The URL has a `<meta name="robots" content="noindex">` tag or `X-Robots-Tag: noindex` header. Contradicts sitemap inclusion, if you don't want it indexed, remove it from the sitemap.

**Submitted URL blocked by robots.txt**: The URL matches a `Disallow` rule in robots.txt. **Googlebot** can't crawl it, so it shouldn't be in the sitemap.

**Submitted URL redirects**: The URL returns a 301/302. Sitemaps should list final destination URLs, not redirects.

**Sitemap contains invalid URL**: Malformed URLs (missing protocol, invalid characters, relative paths). XML requires full absolute URLs with proper encoding.

**Unsupported file format**: Non-XML file uploaded or incorrect `Content-Type` header. Sitemaps must be `application/xml` or `text/xml`.

## Fixing "Couldn't Fetch" Errors

**Googlebot** returns a fetch error when it can't download the sitemap file. Test accessibility first:

```bash
curl -I https://example.com/sitemap.xml
```

Look for:
- **HTTP 200**: File serves correctly
- **HTTP 404**: File missing or wrong path
- **HTTP 500**: Server error (PHP crash, timeout)
- **HTTP 403**: Permission denied

### Verify Sitemap Location

**WordPress** sites typically generate sitemaps at `/sitemap_index.xml` (Yoast, RankMath) or `/wp-sitemap.xml` (core feature since 5.5). Check your plugin's settings to confirm the path.

Static sites place sitemaps at `/sitemap.xml`. If you moved your sitemap, remove the old URL from **Search Console** and submit the new one.

### Check robots.txt Accessibility

**Googlebot** reads robots.txt before fetching sitemaps. If robots.txt is blocked, **Google** can't find the sitemap reference. Test:

```bash
curl https://example.com/robots.txt
```

Ensure the file includes:

```
User-agent: *
Sitemap: https://example.com/sitemap.xml
```

Absolute URLs only, relative paths break parsing.

### Fix Server Timeouts

Large sitemaps (50k+ URLs) may time out. Break into sitemap index files:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-posts.xml</loc>
    <lastmod>2026-02-08</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-pages.xml</loc>
    <lastmod>2026-02-08</lastmod>
  </sitemap>
</sitemapindex>
```

Each child sitemap should contain <50k URLs and compress below 50MB. Submit the index file to **Search Console**, not individual fragments.

## Fixing "Couldn't Read" Parsing Errors

Parsing failures stem from invalid XML syntax. Download your sitemap and validate locally:

```bash
xmllint --noout sitemap.xml
```

**xmllint** reports line numbers and error descriptions. Common issues:

### Invalid Characters

URLs must escape special characters:

| Character | Escaped Form |
|-----------|--------------|
| & | `&amp;` |
| < | `&lt;` |
| > | `&gt;` |
| " | `&quot;` |
| ' | `&apos;` |

Example of incorrect URL:

```xml
<loc>https://example.com/tags?tag=SEO&category=blog</loc>
```

Corrected:

```xml
<loc>https://example.com/tags?tag=SEO&amp;category=blog</loc>
```

### Missing XML Namespace

Every sitemap needs the namespace declaration:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/page</loc>
  </url>
</urlset>
```

Omitting `xmlns` causes immediate parse failure.

### Mismatched Tags

Every `<url>` needs a closing `</url>`. Editors with syntax highlighting (VSCode, Sublime) catch these instantly. Automated sitemap generators rarely produce mismatched tags, but manual edits introduce errors.

### Incorrect Date Formats

The `<lastmod>` tag requires **W3C Datetime** format (ISO 8601):

```xml
<lastmod>2026-02-08T14:30:00+00:00</lastmod>
```

**WordPress** plugins sometimes output shortened dates (`2026-02-08`) which still validate. Avoid non-standard formats like `02/08/2026`.

## Resolving "Submitted URL Not Found (404)"

Dead URLs in sitemaps waste crawl budget. **Googlebot** visits each one, receives a 404, and marks it as an error. Run a sitemap audit:

```bash
wget -O- https://example.com/sitemap.xml | grep -oP '(?<=<loc>)[^<]+' | while read url; do
  status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
  if [ "$status" != "200" ]; then
    echo "$url - $status"
  fi
done
```

This extracts all URLs from the sitemap and checks HTTP status codes. Output shows non-200 responses.

### Regenerate Dynamic Sitemaps

**WordPress** and **JAMstack** sites generate sitemaps automatically. If you deleted posts but the sitemap still lists them:

1. **WordPress**: Clear cache (plugin + server), then visit `/sitemap.xml` to force regeneration
2. **Next.js**: Rebuild the site (`npm run build`) to update static sitemaps
3. **Shopify**: Wait 24 hours for auto-regeneration or trigger manually via app settings

### Update Static Sitemaps

Hand-maintained sitemaps require manual edits. Remove deleted URLs and add new pages:

```bash
nano /var/www/html/sitemap.xml
```

After edits, validate with **xmllint** before resubmitting to **Search Console**.

### Handle Soft 404s

Soft 404s return HTTP 200 but display error content. **Googlebot** detects thin content patterns ("Page Not Found" text, empty templates) and flags them. Fix by:

1. Serving proper 404 status codes: `header("HTTP/1.1 404 Not Found");`
2. Removing soft 404 URLs from the sitemap
3. Adding redirects if replacement content exists

## Fixing "Submitted URL Marked 'noindex'"

This error means a URL in your sitemap has a **noindex** directive. **Google** ignores contradictory signals, the noindex wins and the page never indexes.

Check for **noindex** tags:

```bash
curl -s https://example.com/page | grep -i noindex
```

Look in:
- `<meta name="robots" content="noindex">`
- HTTP headers: `X-Robots-Tag: noindex`

### Common Causes

**Staging site leak**: Developers forget to remove noindex when launching. Check `wp-config.php` (WordPress) or environment variables (Node.js apps).

**SEO plugin misconfiguration**: **Yoast** and **RankMath** have per-page noindex toggles. Bulk edits sometimes apply noindex to public content by accident.

**Pagination settings**: Some themes noindex paginated archives (`/page/2/`). If you want these indexed, remove the directive and add them to the sitemap.

### Resolution Steps

1. Remove the noindex tag from the page source or HTTP headers
2. Request reindexing via **URL Inspection** tool in **Search Console**
3. Verify removal after **Googlebot** recrawls (usually 3-7 days)

If you intentionally noindexed the page, remove it from the sitemap instead of waiting for **Google** to ignore it.

## Fixing "Submitted URL Blocked by robots.txt"

**robots.txt Disallow** rules prevent crawling. Pages blocked by robots.txt shouldn't appear in sitemaps. Test a URL:

```bash
curl https://example.com/robots.txt | grep -A5 "Disallow"
```

Example problem:

```
User-agent: *
Disallow: /admin/
Disallow: /private/
```

If `/admin/settings` appears in your sitemap, **Googlebot** can't crawl it. Solutions:

### Remove Blocked URLs from Sitemap

Edit the sitemap generator to exclude disallowed paths. In **WordPress** (Yoast):

1. Go to **SEO > General > Features**
2. Enable **Advanced Settings**
3. Go to **SEO > Tools > File Editor**
4. Edit sitemap settings to exclude `/admin/` paths

For static sitemaps, filter URLs programmatically:

```python
import xml.etree.ElementTree as ET

tree = ET.parse('sitemap.xml')
root = tree.getroot()
namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

blocked_paths = ['/admin/', '/private/']

for url in root.findall('ns:url', namespace):
    loc = url.find('ns:loc', namespace).text
    if any(blocked in loc for blocked in blocked_paths):
        root.remove(url)

tree.write('sitemap-clean.xml', encoding='UTF-8', xml_declaration=True)
```

### Adjust robots.txt Rules

If the URL should be public, remove the **Disallow** rule. Be cautious, opening admin sections to crawlers risks exposing sensitive URLs in search results.

## Fixing "Submitted URL Redirects"

Sitemaps should list canonical URLs, not redirects. When **Googlebot** encounters a 301, it follows to the destination but flags the original URL as an error. Audit redirects:

```bash
wget -O- https://example.com/sitemap.xml | grep -oP '(?<=<loc>)[^<]+' | while read url; do
  final=$(curl -Ls -o /dev/null -w "%{url_effective}" "$url")
  if [ "$url" != "$final" ]; then
    echo "$url -> $final"
  fi
done
```

This shows URLs that redirect. Update the sitemap to list final destinations:

**Before**:
```xml
<loc>https://example.com/old-page</loc>
```

**After**:
```xml
<loc>https://example.com/new-page</loc>
```

### Fixing WWW vs. Non-WWW Mismatches

If your canonical domain is `https://example.com` but the sitemap lists `https://www.example.com`, every URL triggers a redirect. Standardize:

1. Check **Search Console > Settings > Property** to confirm your canonical domain
2. Update sitemap URLs to match
3. Ensure robots.txt lists the correct sitemap URL

## Fixing "Sitemap Contains Invalid URL"

**Google** rejects malformed URLs. Common mistakes:

**Relative paths**:
```xml
<loc>/blog/post-title</loc>  ❌
<loc>https://example.com/blog/post-title</loc>  ✅
```

**Missing protocol**:
```xml
<loc>example.com/page</loc>  ❌
<loc>https://example.com/page</loc>  ✅
```

**Invalid characters**:
```xml
<loc>https://example.com/blog/10 tips</loc>  ❌ (space)
<loc>https://example.com/blog/10-tips</loc>  ✅
```

Validate programmatically before submission:

```python
from urllib.parse import urlparse

def is_valid_url(url):
    parsed = urlparse(url)
    return all([parsed.scheme in ['http', 'https'], parsed.netloc, parsed.path])

urls = ['https://example.com/page', '/relative-path', 'example.com']
for url in urls:
    print(f"{url}: {'Valid' if is_valid_url(url) else 'Invalid'}")
```

## Verifying Fixes in Search Console

After correcting errors:

1. Resubmit the sitemap via **Search Console > Sitemaps**
2. Click **Request Indexing** for critical URLs using **URL Inspection**
3. Monitor the **Coverage** report for changes in indexed URL counts

**Googlebot** recrawls sitemaps every 24-48 hours for active sites. Large sites with infrequent updates may wait 5-7 days. Expedite by:

- Publishing new content (triggers a crawl)
- Submitting individual URLs via **URL Inspection**
- Increasing crawl rate in **Settings > Crawl Rate** (for verified high-traffic sites)

Check the **Sitemaps report** weekly. Error counts should drop to zero within 7 days of fixes. Persistent errors indicate ongoing issues (plugin bugs, incorrect robots.txt, dynamic pages returning 404s).

## Automating Sitemap Monitoring

Set up alerts to catch errors before they impact rankings.

### Screaming Frog Scheduled Crawls

**Screaming Frog** can crawl sitemaps on a schedule:

1. Go to **Configuration > Spider > Crawl**
2. Enable **Crawl Sitemaps**
3. Set **Mode** to **List** and input sitemap URL
4. Save crawl config
5. Schedule via **File > Schedule**

Configure alerts for:
- 404 errors exceeding 5% of URLs
- Redirect chains longer than 2 hops
- URLs with noindex tags

### Python Monitoring Script

Run daily via cron:

```python
import requests
import xml.etree.ElementTree as ET

def validate_sitemap(url):
    response = requests.get(url)
    if response.status_code != 200:
        return f"Sitemap fetch failed: {response.status_code}"

    root = ET.fromstring(response.content)
    namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

    urls = [elem.text for elem in root.findall('.//ns:loc', namespace)]
    errors = []

    for url in urls[:100]:  # Check first 100 URLs
        try:
            r = requests.head(url, timeout=5)
            if r.status_code != 200:
                errors.append(f"{url} - {r.status_code}")
        except requests.exceptions.RequestException as e:
            errors.append(f"{url} - {str(e)}")

    return errors if errors else "All URLs valid"

print(validate_sitemap('https://example.com/sitemap.xml'))
```

Email results or log to a monitoring dashboard.

## WordPress-Specific Fixes

**WordPress** generates sitemaps via plugins or core functionality (5.5+). Common issues:

### Yoast SEO Conflicts

If **Yoast** and **WordPress core sitemaps** both run, you get duplicate URLs. Disable one:

```php
// Disable core sitemaps in functions.php
add_filter('wp_sitemaps_enabled', '__return_false');
```

Or disable **Yoast** sitemaps: **SEO > General > Features** → Toggle off **XML Sitemaps**.

### Cache Plugin Interference

**WP Rocket**, **W3 Total Cache**, and **LiteSpeed Cache** sometimes serve stale sitemaps. After editing posts:

1. Clear all caches (plugin + server)
2. Manually visit `/sitemap.xml` to regenerate
3. Submit to **Search Console**

### Custom Post Type Exclusion

Some themes noindex custom post types. Enable in **SEO > Search Appearance > Content Types** → Set to **Yes** for each post type.

## Shopify Sitemap Issues

**Shopify** auto-generates sitemaps at `/sitemap.xml`. Common errors:

**Hidden products in sitemap**: Products with "Online Store" channel disabled still appear. Fix by unpublishing completely or archiving.

**Collections with no products**: Empty collections create thin-content pages. Remove from sitemap by:
1. Going to **Online Store > Preferences**
2. Editing `robots.txt` to disallow empty collections
3. Manually excluding via Shopify Scripts (Shopify Plus only)

**Variant URLs**: **Shopify** sometimes lists variant URLs (`/products/shirt?variant=12345`) which redirect. The sitemap should only include parent product URLs. This is a platform bug, report to **Shopify Support** for escalation.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why Sitemaps Matter for Crawl Efficiency:** A healthy sitemap has:
- 100% URLs successfully crawled
- Zero "Submitted URL not found (404)" errors
- Zero "Submitted URL marked 'noindex'"
- Zero "Submitted
* **Fixing "Couldn't Fetch" Errors:** Look for:
- HTTP 200: File serves correctly
- HTTP 404: File missing or wrong path
- HTTP 500: Server error (PHP crash, timeout)
- HTTP 403: Permission denied
* **Fixing "Couldn't Read" Parsing Errors:** Parsing failures stem from invalid XML syntax.
* **Resolving "Submitted URL Not Found (404)":** Dead URLs in sitemaps waste crawl budget.
* **Fixing "Submitted URL Marked 'noindex'":** This error means a URL in your sitemap has a noindex directive.

## FAQ

**Q: How often does Googlebot check sitemaps?**
Active sites see daily crawls. Low-traffic sites may wait 5-7 days. Publishing new content triggers immediate recrawls.

**Q: Can I submit multiple sitemaps?**
Yes. Submit up to 500 sitemaps per property in **Search Console**. Useful for splitting by content type (posts, pages, products).

**Q: Should I include images in sitemaps?**
Yes. Use image extensions to help **Google Images** discover photos. Each URL can list up to 1,000 images.

**Q: What happens if I don't fix sitemap errors?**
Pages may still index via other discovery methods (internal links, backlinks), but crawl inefficiency delays indexing and wastes budget on error pages.

**Q: Do sitemap errors cause ranking drops?**
Not directly. But delays in indexing fresh content and wasted crawl budget on errors indirectly harm visibility.

**Q: Can I remove the sitemap entirely?**
Yes, but only if your site has strong internal linking. Large sites (1k+ pages) or sites with deep navigation hierarchies need sitemaps for efficient discovery.

**Q: How do I handle paginated URLs in sitemaps?**
Include page 1 only, or use `rel="next"`/`rel="prev"` tags on paginated pages. **Google** discovers subsequent pages via links.

**Q: Should I include nofollow links in sitemaps?**
No. Sitemaps declare URLs you want indexed. **Nofollow** doesn't prevent indexing (it prevents link equity transfer), but including URLs you don't want indexed creates confusion.

**Q: How long until errors clear after fixes?**
Most errors resolve within 7 days. Expedite by requesting reindexing via **URL Inspection** for critical pages.

**Q: Can I automate sitemap submission to Search Console?**
Not directly via API, but you can use **ping** functionality by requesting:
```
https://www.google.com/ping?sitemap=https://example.com/sitemap.xml
```
Triggers immediate recrawl.

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

