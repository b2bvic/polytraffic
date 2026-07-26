---
title:: CMS Migration SEO Guide: WordPress to Shopify and Beyond
description:: CMS migrations break URLs, lose redirects, and drop rankings if executed wrong. Map every URL, preserve link equity, and validate before launch.
focus_keyword:: CMS migration SEO WordPress Shopify
category:: technical
author:: Victor Valentine Romo
date:: 2026.03.20
---

# CMS Migration SEO Guide: WordPress to Shopify and Beyond

> **Quick Summary**
> - **What this covers:** CMS migrations break URLs, lose redirects, and drop rankings if executed wrong. Map every URL, preserve link equity, and validate before launch.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why CMS Migrations Kill Rankings](#why-cms-migrations-kill-rankings)
- [Pre-Migration: Audit Your Current Site](#pre-migration-audit-your-current-site)
- [Migration Planning: Map Old URLs to New URLs](#migration-planning-map-old-urls-to-new-urls)
- [Migration Execution: Build on New CMS](#migration-execution-build-on-new-cms)
- [Pre-Launch: Validate Redirects and Indexing](#pre-launch-validate-redirects-and-indexing)
- [Launch: Go Live](#launch-go-live)
- [Post-Launch: Monitor and Fix](#post-launch-monitor-and-fix)
- [Platform-Specific Gotchas](#platform-specific-gotchas)
- [Common Mistakes](#common-mistakes)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Migrating from one CMS to another. **WordPress to Shopify**, **Magento to WooCommerce**, **Joomla to Drupal**, changes your URL structure, template system, and often your domain architecture. One wrong move and you lose 30-70% of organic traffic in the first month.

The risk isn't the migration itself. It's the **broken redirects**, **missing content**, **duplicate pages**, and **indexing delays** that follow when you skip pre-launch validation.

This guide maps the full CMS migration process from audit to post-launch monitoring, with specific gotchas for popular platform combinations.

## Why CMS Migrations Kill Rankings

### URL Structure Changes

WordPress uses `/blog/post-title/`. Shopify uses `/products/product-title`. Your old URLs return 404s unless you redirect them. If Google can't find your pages, you lose rankings within days.

### Template and Schema Differences

WordPress themes structure content differently than Shopify templates. Headings change. Schema markup changes. Internal linking changes. Google re-evaluates your pages as if they're new.

### Content Loss

Not all CMSs export cleanly. Alt text, meta descriptions, custom fields, and internal links often don't transfer. You rebuild those manually or lose them.

### Indexing Delays

Google takes 2-8 weeks to re-index migrated sites. During that window, old URLs 404 and new URLs aren't ranked yet. Traffic drops.

## Pre-Migration: Audit Your Current Site

### 1. Export Full URL List

Use **Screaming Frog** or your sitemap:

1. **Crawl your site** → Export all URLs to CSV
2. **Include:** Pages, posts, categories, tags, products, media
3. **Record:** URL, status code, meta title, meta description, canonical

**Why:** This is your redirect mapping source. Every old URL needs a new destination.

### 2. Identify High-Value Pages

**Google Search Console > Performance:**

Export pages by:
- **Clicks** (descending) → Top 100 pages by traffic
- **Impressions** (descending) → Top 100 pages by visibility

**Why:** These pages drive traffic. Prioritize them in redirect mapping.

### 3. Export All Metadata

Pull:
- **Meta titles and descriptions** → Export from Yoast/RankMath (WordPress) or manually
- **Alt text** → Screaming Frog > Images tab
- **Schema markup** → Screaming Frog > Structured Data tab

**Why:** New CMS won't preserve these automatically. You'll re-enter them manually.

### 4. Audit Internal Links

**Screaming Frog > Internal > All:**

Export internal links. You'll recreate critical links post-migration (category cross-links, contextual links in content).

### 5. Backup Everything

Download:
- **Full database export** → phpMyAdmin or hosting control panel
- **All media files** → wp-content/uploads (WordPress) or equivalent
- **Theme and plugin files** → In case you need to reference custom code

## Migration Planning: Map Old URLs to New URLs

### Create Redirect Mapping Spreadsheet

| Old URL | New URL | Status Code | Priority |
|---|---|---|---|
| `/blog/seo-tips/` | `/articles/seo-tips/` | 301 | High |
| `/category/tutorials/` | `/tutorials/` | 301 | Medium |
| `/old-product/` | `/products/new-product/` | 301 | High |

### Redirect Rules

1. **Direct match:** Old page exists on new site → 301 redirect old to new
2. **Consolidation:** Multiple old pages merge into one → 301 all to strongest page
3. **Deletion:** Old page has no equivalent → 301 to most relevant parent category or homepage (last resort)
4. **Media:** Images and PDFs → Redirect or re-upload and update URLs

### Handle URL Structure Changes

#### WordPress → Shopify

**WordPress:**
```
/blog/post-title/
/category/category-name/
/product/product-name/
```

**Shopify:**
```
/blogs/news/post-title
/collections/collection-name
/products/product-name
```

**Redirect pattern (Apache .htaccess):**
```apache
RewriteRule ^blog/(.*)$ /blogs/news/$1 [R=301,L]
RewriteRule ^category/(.*)$ /collections/$1 [R=301,L]
```

#### Shopify → WooCommerce (WordPress)

**Shopify:**
```
/collections/shoes
/products/nike-air-max
```

**WooCommerce:**
```
/product-category/shoes/
/product/nike-air-max/
```

**Redirect pattern:**
```apache
RewriteRule ^collections/(.*)$ /product-category/$1 [R=301,L]
RewriteRule ^products/(.*)$ /product/$1 [R=301,L]
```

## Migration Execution: Build on New CMS

### 1. Set Up Staging Environment

Never migrate live. Build on:
- **Subdomain:** `staging.yoursite.com`
- **Password-protected** → Block search engines with `robots.txt`:

```
User-agent: *
Disallow: /
```

### 2. Import Content

Use CMS-specific migration tools:

#### WordPress → Shopify

- **Products:** Export WooCommerce products as CSV → Import to Shopify
- **Blog:** Export WordPress posts via **Matrixify** or manually
- **Pages:** Rebuild manually (Shopify doesn't import WordPress pages cleanly)

#### Shopify → WordPress

- **Products:** Export Shopify products as CSV → Import to WooCommerce via **WP All Import**
- **Blog:** Export Shopify blog as CSV → Import via WordPress Importer
- **Pages:** Rebuild manually

#### WordPress → WordPress (Theme Change)

- **No import needed** → Database stays the same
- **Check:** Theme-specific widgets, custom post types, shortcodes (may break)

### 3. Re-Enter Metadata

Manually re-add:
- **Meta titles and descriptions** → Use exported CSV as reference
- **Alt text** → Upload images, add alt text via Media Library
- **Schema markup** → Reinstall schema plugins or add custom JSON-LD

### 4. Recreate Internal Links

Critical internal links (topic clusters, category cross-links) often don't transfer. Manually recreate high-value links using your Screaming Frog internal link export.

### 5. Test All Functionality

- **Forms** → Submit test form entries
- **Checkout (e-commerce)** → Place test order
- **Search** → Test site search
- **Filters** → Test product filters (if applicable)
- **Mobile** → Test on mobile devices

## Pre-Launch: Validate Redirects and Indexing

### 1. Implement 301 Redirects

Add redirects to `.htaccess` (Apache), `nginx.conf` (Nginx), or use a plugin:

**WordPress:** **Redirection** plugin
**Shopify:** Shopify automatically handles some redirects, but add custom ones via **Bulk Redirects** app

**Test redirects:**
1. Enter old URL in browser
2. Verify it redirects to correct new URL (check address bar)
3. Use **Redirect Path** Chrome extension → Shows redirect chain and status codes

### 2. Update XML Sitemap

Generate new sitemap with all new URLs:

**WordPress:** Yoast SEO or RankMath auto-generates
**Shopify:** Sitemap auto-generates at `/sitemap.xml`

Verify sitemap includes all pages, products, blog posts, and categories.

### 3. Submit Sitemap to Search Console

**Google Search Console:**
1. **Sitemaps** → Add new sitemap URL
2. **Remove old sitemap** (if structure changed)

**Bing Webmaster Tools:** Repeat process

### 4. Update Internal Links to New URLs

Search your content for old internal links:

**WordPress:** Use **Better Search Replace** plugin
- Search: `yoursite.com/blog/`
- Replace: `yoursite.com/articles/`

**Shopify:** Use **Store Content Scanner** app or manually update links

### 5. Block Staging from Indexing

Before launch, ensure staging site has:

```html
<meta name="robots" content="noindex, nofollow">
```

Or `robots.txt`:
```
User-agent: *
Disallow: /
```

## Launch: Go Live

### 1. Remove Staging Blocks

Delete `noindex` meta tags and restore `robots.txt`:

```
User-agent: *
Allow: /
```

### 2. Update DNS (If Changing Hosting)

If migrating to new hosting, update DNS A records to point to new server. Propagation takes 1-24 hours.

### 3. Force HTTPS

Ensure new site uses HTTPS. Redirect HTTP to HTTPS:

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 4. Request Indexing (High-Priority Pages)

**Google Search Console > URL Inspection:**

Submit top 20 pages by traffic for immediate indexing.

### 5. Monitor for Errors

**Search Console > Coverage:**

Watch for:
- **4xx errors** → Broken redirects or missing pages
- **Redirect errors** → Redirect chains or loops
- **Crawled - currently not indexed** → Low-quality or duplicate pages

## Post-Launch: Monitor and Fix

### Week 1: Fix Immediate Issues

1. **404 errors** → Google Search Console > Coverage > Excluded
   - Identify 404s
   - Add 301 redirects to correct pages
2. **Redirect chains** → Screaming Frog > Response Codes > Redirection (3xx)
   - Flatten chains (A→B→C becomes A→C)
3. **Broken internal links** → Screaming Frog > Internal > Broken Links
   - Update or remove links

### Week 2-4: Monitor Traffic

**Google Analytics:**

Compare traffic **4 weeks before migration** vs **4 weeks after**:

- **Expected:** 10-30% drop initially, recovery by week 4
- **Red flag:** 50%+ drop → Major redirect or indexing issue

**Search Console:**

- **Clicks:** Should stabilize by week 3-4
- **Impressions:** May fluctuate as Google re-indexes

### Month 2: Re-Index Check

**Search Console > Coverage:**

- **Indexed pages** should match old site's indexed count (±10%)
- If significantly lower → Submit sitemap again, check for `noindex` tags

### Month 3: Rankings Audit

**Track keyword rankings:**

Use **Ahrefs**, **Semrush**, or **Search Console > Performance > Queries**

- **Expected:** 90%+ of pre-migration rankings recovered
- **Lost rankings?** → Check for content changes, missing internal links, or thin content

## Platform-Specific Gotchas

### WordPress → Shopify

- **Category pages become collections** → Different URL structure, different SEO optimization
- **WordPress plugins don't transfer** → Recreate functionality with Shopify apps
- **Blog post URLs change** → `/blog/title/` → `/blogs/news/title`

### Shopify → WooCommerce

- **Shopify product variants break** → WooCommerce handles variants differently
- **Shopify apps don't exist in WordPress** → Find WooCommerce equivalents
- **Faster checkout in Shopify** → WooCommerce may be slower, optimize accordingly

### Wix → WordPress

- **Wix doesn't export cleanly** → Manually copy/paste content
- **Wix URLs are messy** → Contains random strings, requires aggressive redirect mapping
- **Wix apps and widgets don't transfer** → Rebuild with WordPress plugins

## Common Mistakes

### Mistake 1: No Redirect Mapping

You migrate without mapping old URLs to new URLs. Old URLs return 404s.

**Fix:** Create redirect mapping spreadsheet before migration.

### Mistake 2: Forgetting Media Redirects

Images and PDFs break because old `/wp-content/uploads/` URLs don't exist on new CMS.

**Fix:** Re-upload media and update URLs, or redirect old media paths.

### Mistake 3: Losing Meta Descriptions

CMS doesn't import meta descriptions. All pages have default "Shop now" descriptions.

**Fix:** Export metadata before migration, re-enter manually.

### Mistake 4: Redirect Chains

Old URL redirects to staging URL, then to live URL.

**Fix:** Redirect old URL directly to final live URL (flatten chains).

### Mistake 5: Launching Without Testing

You launch, then discover checkout is broken or forms don't work.

**Fix:** Test everything on staging before launch.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.

## Frequently Asked Questions

### How long does a CMS migration take?

2-8 weeks depending on site size and complexity. Small blog (50 pages): 1-2 weeks. E-commerce store (500+ products): 4-8 weeks.

### Will I lose rankings during migration?

Temporary drop (10-30%) is common. Rankings recover within 4-8 weeks if redirects are correct. Poor execution can cause permanent ranking loss.

### Do I need to change my domain during CMS migration?

No. CMS migration and domain migration are separate. Keep your domain unless you have a business reason to change it.

### Can I migrate without downtime?

Yes, if you build on staging, test, then flip DNS to new server. Downtime should be <1 hour (DNS propagation).

### Should I migrate all at once or in phases?

**All at once** for small sites. **Phases** for large sites (e.g., migrate blog first, then products). Phased migrations are complex, avoid unless necessary.

## Next Steps

Audit your current site. Export URLs, metadata, and internal links. Create redirect mapping spreadsheet matching every old URL to a new destination. Build on staging. Test redirects with Redirect Path extension. Launch and monitor Search Console for errors daily for the first week. For related guidance, see [Site Migration SEO Checklist](/articles/site-migration-seo-checklist.html), [Redirect Mapping Guide](/articles/redirect-mapping-site-migration.html), and [Post-Migration Audit](/articles/site-migration-post-launch-audit.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
