---
title:: How to Fix WWW vs. Non-WWW Duplicate Content Issues for SEO
description:: Eliminate duplicate content from www/non-www URL variants by implementing 301 redirects, canonical tags, and proper Search Console configuration.
focus_keyword:: fix www non-www duplicate content
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Fix WWW vs. Non-WWW Duplicate Content Issues for SEO

> **Quick Summary**
> - **What this covers:** Eliminate duplicate content from www/non-www URL variants by implementing 301 redirects, canonical tags, and proper Search Console configuration.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why WWW vs. Non-WWW Duplication Harms SEO](#why-www-vs-non-www-duplication-harms-seo)
- [Diagnosing WWW vs. Non-WWW Issues](#diagnosing-www-vs-non-www-issues)
- [Choosing Your Canonical Domain](#choosing-your-canonical-domain)
- [Implementing 301 Redirects (Apache)](#implementing-301-redirects-apache)
- [Implementing 301 Redirects (Nginx)](#implementing-301-redirects-nginx)
- [WordPress-Specific Configuration](#wordpress-specific-configuration)
- [Canonical Tags as Secondary Signal](#canonical-tags-as-secondary-signal)
- [Configuring Google Search Console](#configuring-google-search-console)
- [Updating Sitemaps and Internal Links](#updating-sitemaps-and-internal-links)
- [Shopify WWW Configuration](#shopify-www-configuration)
- [Cloudflare and CDN Configuration](#cloudflare-and-cdn-configuration)
- [Monitoring and Validation](#monitoring-and-validation)
- [Edge Cases](#edge-cases)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**WWW vs. non-WWW duplication** occurs when both `www.example.com` and `example.com` resolve without redirecting. Search engines treat them as separate sites, identical content on two domains triggers duplicate content filters that split backlinks, dilute rankings, and force **Google** to choose which version to index (often inconsistently). Sites with unresolved WWW issues see 20-40% of backlinks pointing to the wrong variant, wasting link equity.

**Google Search Console** treats WWW and non-WWW as distinct properties. If you only verified one, you're missing data from the other half of your traffic. Fixing requires choosing a canonical domain, implementing 301 redirects, setting canonical tags, and consolidating properties in **Search Console**. This guide covers diagnosis, implementation across platforms, and validation.

## Why WWW vs. Non-WWW Duplication Harms SEO

**Split backlink profiles**: External sites link inconsistently, some to `www.example.com`, others to `example.com`. If both resolve, **Ahrefs** shows two separate URL entries with divided Domain Rating scores. A site with 500 backlinks might show 300 to non-WWW and 200 to WWW, neither variant reaches its full authority potential.

**Indexing inconsistency**: **Google** may index `www.example.com/page` one month and `example.com/page` the next, causing ranking volatility. **Search Console** reports alternately show traffic for one variant then the other, making performance tracking impossible.

**Crawl budget waste**: **Googlebot** crawls both variants, doubling the number of URLs to process. A 1,000-page site becomes 2,000 URLs. Fresh content takes longer to index because **Google** wastes resources crawling duplicates.

**Canonical conflicts**: If your canonical tags point to non-WWW but external links use WWW, **Google** receives conflicting signals. **Search Console** flags "Duplicate, Google chose different canonical than user" **Google** ignores your preference because the site architecture contradicts it.

## Diagnosing WWW vs. Non-WWW Issues

Test if both variants resolve independently.

### Check HTTP Status Codes

```bash
curl -I http://example.com
curl -I http://www.example.com
curl -I https://example.com
curl -I https://www.example.com
```

**Healthy configuration** (non-WWW canonical):

```
http://example.com → 301 → https://example.com (200)
http://www.example.com → 301 → https://example.com (200)
https://www.example.com → 301 → https://example.com (200)
https://example.com → 200
```

**Problem configuration**:

```
https://example.com → 200
https://www.example.com → 200  ← Both resolve, no redirect
```

### Search for Both Variants in Google

Query:

```
site:www.example.com
site:example.com
```

If both return results, **Google** indexed both variants. Check if result counts differ significantly, if `site:www.example.com` shows 500 pages but `site:example.com` shows 300, **Google** is confused about your canonical domain.

### Screaming Frog Duplicate Detection

Crawl using both starting URLs:

1. Crawl `https://example.com`
2. Export URLs
3. Crawl `https://www.example.com`
4. Export URLs
5. Compare lists, identical pages indicate duplication

### Check Backlink Distribution

**Ahrefs**:

1. Enter `example.com` in **Site Explorer**
2. Go to **Backlinks**
3. Filter by **Target URL** contains `www.` vs. without
4. Compare backlink counts

If 40% of backlinks use the non-canonical variant, you're losing significant authority.

## Choosing Your Canonical Domain

Pick one and stick to it forever.

### Non-WWW (Recommended for Most Sites)

**Pros**:
- Shorter, cleaner URLs
- One less DNS lookup (minor speed benefit)
- Modern convention (Google, Facebook, Twitter all use non-WWW)

**Cons**:
- None significant

### WWW

**Pros**:
- Allows cookie isolation (cookies set on `example.com` apply to subdomains; `www.example.com` cookies don't)
- Traditional format, familiar to older users

**Cons**:
- Extra characters in URLs
- Requires additional DNS records

**Decision rule**: If you use subdomains extensively (`shop.example.com`, `blog.example.com`) and need cookie isolation, use WWW. Otherwise, use non-WWW.

## Implementing 301 Redirects (Apache)

The definitive fix: redirect the non-canonical variant permanently.

### Force Non-WWW (Recommended)

Add to `.htaccess` (before WordPress rules):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On

  # Force HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Force non-WWW
  RewriteCond %{HTTP_HOST} ^www\.example\.com$ [NC]
  RewriteRule ^(.*)$ https://example.com/$1 [L,R=301]
</IfModule>
```

This redirects:
- `http://example.com` → `https://example.com`
- `http://www.example.com` → `https://example.com`
- `https://www.example.com` → `https://example.com`

### Force WWW

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On

  # Force HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Force WWW
  RewriteCond %{HTTP_HOST} ^example\.com$ [NC]
  RewriteRule ^(.*)$ https://www.example.com/$1 [L,R=301]
</IfModule>
```

Replace `example.com` with your domain.

### Test the Configuration

```bash
curl -I http://www.example.com
```

Expected output:

```
HTTP/1.1 301 Moved Permanently
Location: https://example.com/

HTTP/2 200
```

Two hops: HTTP→HTTPS, WWW→non-WWW. Some configurations can consolidate into one redirect.

## Implementing 301 Redirects (Nginx)

### Force Non-WWW

Edit `/etc/nginx/sites-available/example.com`:

```nginx
# Redirect HTTP to HTTPS
server {
  listen 80;
  server_name example.com www.example.com;
  return 301 https://example.com$request_uri;
}

# Redirect WWW to non-WWW
server {
  listen 443 ssl;
  server_name www.example.com;

  ssl_certificate /etc/ssl/certs/example.com.crt;
  ssl_certificate_key /etc/ssl/private/example.com.key;

  return 301 https://example.com$request_uri;
}

# Main server block
server {
  listen 443 ssl;
  server_name example.com;

  ssl_certificate /etc/ssl/certs/example.com.crt;
  ssl_certificate_key /etc/ssl/private/example.com.key;

  # Site configuration
  root /var/www/html;
  index index.php index.html;

  location / {
    try_files $uri $uri/ /index.php?$args;
  }
}
```

Reload **Nginx**:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Force WWW

Replace `server_name example.com` with `www.example.com` in redirect blocks and reverse the redirect logic.

## WordPress-Specific Configuration

**WordPress** handles WWW/non-WWW through Settings and `.htaccess`.

### Set WordPress Address URLs

**Settings > General**:

- **WordPress Address (URL)**: `https://example.com` (no WWW)
- **Site Address (URL)**: `https://example.com` (no WWW)

Both must match your canonical choice. Changing these triggers automatic redirects.

If locked out, edit **wp-config.php**:

```php
define('WP_HOME', 'https://example.com');
define('WP_SITEURL', 'https://example.com');
```

### Check .htaccess Rules

WordPress permalinks generate `.htaccess` rules. Ensure they match your canonical domain. After changing URLs, go to **Settings > Permalinks** and click **Save Changes** (without changing anything) to regenerate `.htaccess`.

### Update Database URLs

If you're migrating from WWW to non-WWW (or vice versa), update all database references:

**Using Better Search Replace plugin**:

1. Install **Better Search Replace**
2. Go to **Tools > Better Search Replace**
3. **Search for**: `https://www.example.com`
4. **Replace with**: `https://example.com`
5. Select all tables
6. Check **Run as dry run** first to preview changes
7. Uncheck dry run and click **Run Search/Replace**

**Using SQL** (backup first):

```sql
UPDATE wp_options SET option_value = REPLACE(option_value, 'https://www.example.com', 'https://example.com') WHERE option_value LIKE '%https://www.example.com%';

UPDATE wp_posts SET post_content = REPLACE(post_content, 'https://www.example.com', 'https://example.com') WHERE post_content LIKE '%https://www.example.com%';

UPDATE wp_postmeta SET meta_value = REPLACE(meta_value, 'https://www.example.com', 'https://example.com') WHERE meta_value LIKE '%https://www.example.com%';
```

This updates internal links, image URLs, and post content.

## Canonical Tags as Secondary Signal

If redirects are impossible (shared hosting limitations), use canonical tags.

### Add Canonical Tag to Header

In `<head>`:

```html
<link rel="canonical" href="https://example.com/page-url">
```

This tells **Google** the preferred version.

### WordPress Canonical Tags

**Yoast SEO** and **RankMath** auto-generate canonicals based on **Settings > General** URLs. Verify by viewing page source:

```html
<link rel="canonical" href="https://example.com/about/">
```

If it points to WWW when you configured non-WWW, a plugin or theme is overriding settings.

### Override WordPress Canonical

Force canonical to match your preference:

```php
function force_canonical_domain($url) {
  return str_replace('https://www.example.com', 'https://example.com', $url);
}
add_filter('wpseo_canonical', 'force_canonical_domain');
add_filter('rank_math/frontend/canonical', 'force_canonical_domain');
```

## Configuring Google Search Console

Consolidate data from both variants.

### Verify Both Properties

Add both:

1. `https://example.com`
2. `https://www.example.com`

**Search Console** treats them as separate properties. Verify both via DNS TXT record or HTML file.

### Set Domain Property (Recommended)

**Domain properties** consolidate all variants (HTTP, HTTPS, WWW, non-WWW):

1. Click **Add Property**
2. Select **Domain** (not URL prefix)
3. Enter `example.com` (no protocol, no WWW)
4. Verify via DNS TXT record

This shows combined data from all variants. Historical data from individual properties remains separate but new data aggregates.

### Check Preferred Domain (Legacy)

Older **Search Console** versions had a "Preferred Domain" setting. This is deprecated, use **Domain property** instead. If you see it under **Settings**, set it to your canonical choice, but it doesn't affect modern indexing.

## Updating Sitemaps and Internal Links

### Ensure Sitemap Uses Canonical Domain

Open `/sitemap.xml`. All URLs should match your canonical choice:

**Correct** (non-WWW):

```xml
<url>
  <loc>https://example.com/page/</loc>
</url>
```

**Incorrect**:

```xml
<url>
  <loc>https://www.example.com/page/</loc>
</url>
```

WordPress plugins (**Yoast**, **RankMath**) use URLs from **Settings > General** automatically. If mixed, regenerate sitemaps.

### Update Navigation Menus

**Appearance > Menus**:

Check each link's URL. Ensure format matches canonical domain. For large menus, use SQL:

```sql
UPDATE wp_postmeta
SET meta_value = REPLACE(meta_value, 'https://www.example.com', 'https://example.com')
WHERE meta_key = '_menu_item_url';
```

### Fix Hard-Coded Template Links

Search theme files for hard-coded URLs:

```bash
grep -r "www.example.com" /path/to/wordpress/wp-content/themes/your-theme/
```

Replace with dynamic URL generation:

**Before**:

```php
<a href="https://www.example.com/contact">Contact</a>
```

**After**:

```php
<a href="<?php echo home_url('/contact'); ?>">Contact</a>
```

## Shopify WWW Configuration

**Shopify** stores handle WWW via domain settings.

### Set Primary Domain

1. Go to **Online Store > Domains**
2. Click **Change primary domain** next to your preferred variant
3. **Shopify** auto-redirects the non-primary to primary

To force non-WWW:

1. Add `example.com` as a domain
2. Set `example.com` as primary
3. `www.example.com` automatically redirects to `example.com`

## Cloudflare and CDN Configuration

CDNs can interfere with WWW redirects.

### Cloudflare DNS Setup

Set up both A records:

```
Type: A
Name: @
Content: [Your origin IP]
Proxy status: Proxied (orange cloud)

Type: A
Name: www
Content: [Your origin IP]
Proxy status: Proxied (orange cloud)
```

### Cloudflare Page Rule for Redirect

If origin doesn't redirect, create a page rule:

1. **Cloudflare > Rules > Page Rules**
2. **If the URL matches**: `www.example.com/*`
3. **Then the settings are**: **Forwarding URL** → **301 Permanent Redirect** → `https://example.com/$1`
4. Save

This handles WWW→non-WWW at the CDN edge before requests hit your origin.

## Monitoring and Validation

### Verify Redirects Work

Test all variants:

```bash
curl -L https://www.example.com
curl -L http://www.example.com
curl -L http://example.com
```

All should redirect to your canonical domain (one final HTTP 200).

### Check Search Console for Duplicates

After implementing fixes, monitor:

**Search Console > Pages > Duplicate, Google chose different canonical than user**

This count should drop to zero within 30-60 days as **Google** recrawls.

### Monitor Backlink Consolidation

Check **Ahrefs** monthly:

- Total referring domains should remain stable or grow
- The canonical domain should accumulate backlinks
- The non-canonical variant should show declining backlinks (redirects transfer equity)

### Set Up 301 Redirect Tracking in Analytics

Tag redirects to measure impact:

**Google Analytics** (via GTM):

1. Create a trigger: **Page View** where **Page Hostname** contains `www.`
2. Create a tag: **GA4 Event** → Event name: `www_redirect`
3. Monitor this event, it should drop to zero after redirects are cached

## Edge Cases

### Email Links Using Wrong Domain

Update email templates to use canonical domain. Check:

- Transactional emails (order confirmations, password resets)
- Marketing campaigns (**Mailchimp**, **Klaviyo**)
- Signature links

### Social Media Profile Links

Update social profiles to use canonical domain:

- **Facebook** page settings
- **Twitter** bio
- **LinkedIn** company page
- **Instagram** bio

This consolidates social referral traffic to one domain and improves brand consistency.

### SSL Certificate Domain Coverage

Ensure your SSL certificate covers both WWW and non-WWW:

```bash
openssl s_client -connect example.com:443 -servername example.com < /dev/null 2>/dev/null | openssl x509 -text | grep "DNS:"
```

Look for:

```
DNS:example.com, DNS:www.example.com
```

If missing, regenerate the certificate to include both.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why WWW vs. Non-WWW Duplication Harms SEO:** Test if both variants resolve independently.
* **Diagnosing WWW vs. Non-WWW Issues:** Test if both variants resolve independently.
* **Implementing 301 Redirects (Apache):** The definitive fix: redirect the non-canonical variant permanently.
* **Implementing 301 Redirects (Nginx):** Edit /etc/nginx/sites-available/example.com:

## FAQ

**Q: Should I use WWW or non-WWW?**
Non-WWW is modern standard. Use WWW only if you need subdomain cookie isolation.

**Q: Can I switch from WWW to non-WWW without losing rankings?**
Yes, with proper 301 redirects. Rankings consolidate within 3-6 months.

**Q: Do I need to update all backlinks manually?**
No. 301 redirects pass link equity automatically. **Google** treats the redirect as a "move" and transfers authority.

**Q: How long until Google consolidates both variants?**
3-6 months. Expedite by requesting recrawls via **Search Console > URL Inspection** for critical pages.

**Q: Will fixing WWW issues hurt traffic temporarily?**
Possibly. **Google** recrawls and re-evaluates canonicalization, causing 1-2 weeks of volatility. Long-term gains outweigh short-term dips.

**Q: Can I use both for different purposes?**
No. Choose one. Using both fragments your brand and confuses users.

**Q: What if my host forces WWW?**
Contact hosting support to change DNS settings or use **Cloudflare** page rules to override.

**Q: Do I need separate SSL certificates for WWW and non-WWW?**
No. Modern SSL certificates (SAN/UCC) cover both by default.

**Q: Can I use a rel="alternate" tag instead of redirects?**
No. **rel="alternate"** is for language/regional variants, not WWW duplication. Use 301 redirects or canonical tags.

**Q: Will this fix my "Duplicate content" warnings in Search Console?**
Yes, if the duplicates stem from WWW/non-WWW issues. Other duplicate content sources (thin pages, scrapers) require separate fixes.

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

