---
title:: Domain Migration SEO Guide: Move Sites Without Losing Rankings
description:: Migrate domains without losing traffic. Implement 301 redirects, update Search Console, preserve link equity, and monitor ranking recovery post-migration.
focus_keyword:: domain migration seo
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Domain Migration SEO Guide: Move Sites Without Losing Rankings

> **Quick Summary**
> - **What this covers:** Migrate domains without losing traffic. Implement 301 redirects, update Search Console, preserve link equity, and monitor ranking recovery post-migration.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Pre-Migration Planning (4-6 Weeks Before)](#pre-migration-planning-4-6-weeks-before)
- [Phase 1: Set Up New Domain and Test](#phase-1-set-up-new-domain-and-test)
- [Phase 2: Implement 301 Redirects on Old Domain](#phase-2-implement-301-redirects-on-old-domain)
- [Phase 3: Launch Migration](#phase-3-launch-migration)
- [Phase 4: Notify Google of Domain Change](#phase-4-notify-google-of-domain-change)
- [Phase 5: Monitor Migration Progress](#phase-5-monitor-migration-progress)
- [Phase 6: Maintain Old Domain (6-12 Months)](#phase-6-maintain-old-domain-6-12-months)
- [Phase 7: Update External Properties](#phase-7-update-external-properties)
- [Common Domain Migration Mistakes](#common-domain-migration-mistakes)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**Domain migrations**, moving content from one root domain to another (olddomain.com → newdomain.com), risk catastrophic ranking losses if 301 redirects miss URLs, **Google Search Console** properties aren't updated, or migrations execute during high-traffic periods without [DNS TTL optimization](dns-configuration-seo-guide.html). Successful migrations preserve 90-95% of organic traffic by mapping every old URL to equivalent new URLs with proper 301 redirects, submitting change-of-address notifications to Google, maintaining old domain for 6-12 months, and monitoring [crawl budget](crawl-budget-optimization-large-sites.html) to ensure Googlebot discovers redirects quickly. Rushed migrations, launching redirects without testing, migrating during peak season, or decommissioning old domains before Google updates indexes, cause 30-60% traffic drops that take 6+ months to recover. This guide architects migration strategies for single-domain moves, subdomain consolidations, and HTTPS migrations with minimal SEO disruption.

## Pre-Migration Planning (4-6 Weeks Before)

**Preparation determines migration success.** Skipping planning causes avoidable traffic losses.

### Inventory All URLs on Old Domain

**Export complete URL list from old domain.**

**Method 1: XML Sitemap**
```bash
# Download sitemap
wget https://olddomain.com/sitemap.xml

# Extract URLs
grep -oP '<loc>\K[^<]+' sitemap.xml > old-urls.txt
```

**Method 2: Screaming Frog Crawl**
1. Screaming Frog → Enter URL → Start
2. Export → All URLs
3. Save as CSV

**Method 3: Google Search Console**
Search Console → Performance → Export → Download all pages

**Goal:** Complete list of indexed URLs for 301 redirect mapping.

### Create URL Mapping Spreadsheet

**Map each old URL to new URL:**
```
Old URL,New URL,Redirect Type
https://olddomain.com/,https://newdomain.com/,301
https://olddomain.com/about,https://newdomain.com/about-us,301
https://olddomain.com/products/widget,https://newdomain.com/shop/widget,301
https://olddomain.com/old-page,https://newdomain.com/,410
```

**Rules:**
- 1:1 mapping where possible (same content, different domain)
- Consolidate similar pages (3 old product pages → 1 new product page)
- 410 Gone for permanently deleted content
- Redirect to homepage ONLY for pages with no equivalent (max 10% of URLs)

### Preserve URL Structure When Possible

**Best case:** URL paths stay identical:
```
olddomain.com/blog/post-title → newdomain.com/blog/post-title
```

**Easy redirect rule:**
```apache
RewriteRule ^(.*)$ https://newdomain.com/$1 [R=301,L]
```

**Worst case:** Complete URL structure change:
```
olddomain.com/category/post-title → newdomain.com/blog/yyyy/mm/dd/post-title
```

Requires individual redirect rules or database-driven redirect logic.

### Lower DNS TTL 48 Hours Before Migration

**High TTL** (86400s) delays DNS propagation during migration.

**Current DNS:**
```
Type: A
Name: olddomain.com
Value: 192.0.2.1
TTL: 86400  (24 hours)
```

**Lower to 300s:**
```
TTL: 300  (5 minutes)
```

**Wait 48 hours** for old high-TTL records to expire globally before migration day.

## Phase 1: Set Up New Domain and Test

**Launch new domain privately** before redirecting old domain.

### Configure New Domain Infrastructure

**1. DNS records:**
```
Type: A
Name: newdomain.com
Value: 192.0.2.50  (new server IP)
TTL: 300
```

**2. SSL certificate:**
Install SSL on new domain (Let's Encrypt, Cloudflare, or commercial cert).

**3. Content:**
Upload complete site content to new domain.

**4. Verify accessibility:**
```bash
curl -I https://newdomain.com
# Should return: HTTP/2 200
```

### Block Public Access During Testing

**Prevent premature indexing of new domain:**

**Method 1: Password protection (.htaccess)**
```apache
AuthType Basic
AuthName "Staging"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

**Method 2: Noindex meta tag (temporary)**
```html
<meta name="robots" content="noindex, nofollow">
```

**Remove before launch day.**

### Test New Site Thoroughly

**Check:**
- All pages load (no 404s)
- Forms submit correctly
- E-commerce checkout works
- Internal links point to newdomain.com (not olddomain.com)
- Images, CSS, JavaScript load from newdomain.com

**Use Screaming Frog to crawl new domain:**
- Check for broken links
- Verify all internal links use https://newdomain.com

## Phase 2: Implement 301 Redirects on Old Domain

**301 redirects** tell Google and users that content permanently moved.

### Method 1: Apache .htaccess (Simple Migrations)

**For identical URL structure:**
```apache
# .htaccess on olddomain.com
RewriteEngine On
RewriteCond %{HTTP_HOST} ^olddomain\.com [NC,OR]
RewriteCond %{HTTP_HOST} ^www\.olddomain\.com [NC]
RewriteRule ^(.*)$ https://newdomain.com/$1 [L,R=301]
```

**Example:**
- `olddomain.com/page` → `newdomain.com/page`
- `olddomain.com/blog/post` → `newdomain.com/blog/post`

### Method 2: Individual Redirect Rules (Complex Migrations)

**For changed URL structures:**
```apache
# .htaccess
RewriteEngine On

# Homepage
RewriteRule ^$ https://newdomain.com/ [R=301,L]

# Specific page redirects
RewriteRule ^old-page$ https://newdomain.com/new-page [R=301,L]
RewriteRule ^products/widget$ https://newdomain.com/shop/widget [R=301,L]

# Category redirects
RewriteRule ^category/(.*)$ https://newdomain.com/blog/$1 [R=301,L]

# Catch-all (last resort)
RewriteRule ^(.*)$ https://newdomain.com/ [R=301,L]
```

### Method 3: Nginx (Server Block)

```nginx
server {
  server_name olddomain.com www.olddomain.com;
  return 301 https://newdomain.com$request_uri;
}
```

**For complex mappings, use map directive:**
```nginx
map $request_uri $new_url {
  /old-page /new-page;
  /products/widget /shop/widget;
  default /;
}

server {
  server_name olddomain.com;
  return 301 https://newdomain.com$new_url;
}
```

### Method 4: Cloudflare Page Rules (No Server Access)

**If hosting doesn't allow .htaccess edits:**
1. Cloudflare → Page Rules → Create Page Rule
2. URL: `olddomain.com/*`
3. Setting: Forwarding URL (301 Permanent Redirect)
4. Destination: `https://newdomain.com/$1`

**Free plan:** 3 page rules
**Pro plan:** 20 page rules

### Test Redirects Before Launch

**Validate redirects:**
```bash
curl -I https://olddomain.com/page
# Expected: HTTP/1.1 301 Moved Permanently
# Location: https://newdomain.com/page
```

**Test multiple URLs:**
```bash
for url in / /about /products/widget; do
  echo "Testing: $url"
  curl -I https://olddomain.com$url | grep -E "HTTP|Location"
done
```

**Screaming Frog redirect check:**
1. Configuration → Spider → Redirect chains: Yes
2. Crawl old domain
3. Response Codes → Filter: 3xx
4. Verify all redirect to correct new URLs

## Phase 3: Launch Migration

**Execute migration during low-traffic period** (Sunday 2am-6am typical).

### Launch Day Checklist

**1. Remove noindex from new domain** (if used during testing)
**2. Activate 301 redirects on old domain**
**3. Update DNS if changing servers:**
```
Type: A
Name: newdomain.com
Value: 192.0.2.50  (new server)
TTL: 300
```
**4. Verify redirects live:**
```bash
curl -I https://olddomain.com
# Should redirect to newdomain.com
```

**5. Monitor server logs** for errors

### Update Internal Links (Post-Launch)

**Search and replace internal links:**

**WordPress (WP-CLI):**
```bash
wp search-replace 'https://olddomain.com' 'https://newdomain.com' --dry-run
# Verify changes look correct
wp search-replace 'https://olddomain.com' 'https://newdomain.com'
```

**Database SQL:**
```sql
UPDATE wp_posts
SET post_content = REPLACE(post_content, 'https://olddomain.com', 'https://newdomain.com');

UPDATE wp_postmeta
SET meta_value = REPLACE(meta_value, 'https://olddomain.com', 'https://newdomain.com');
```

**Why:** Reduces redirect hops, improves internal link equity.

## Phase 4: Notify Google of Domain Change

**Google Search Console** change-of-address accelerates discovery of new domain.

### Add New Domain to Search Console

1. Search Console → Add Property
2. Enter `https://newdomain.com`
3. Verify ownership (DNS TXT record, HTML file, etc.)

### Submit Change of Address

1. Search Console (old property) → Settings → Change of Address
2. Select new property from dropdown
3. Click "Submit"

**Requirements:**
- 301 redirects must be live
- New property verified in Search Console
- Old domain still accessible (don't decommission yet)

**Processing time:** Google recrawls within days, but full migration takes 3-6 months.

### Submit New Sitemap

**Generate sitemap for new domain:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://newdomain.com/</loc>
    <lastmod>2026-02-08</lastmod>
  </url>
  <!-- All new domain URLs -->
</urlset>
```

**Submit to Search Console:**
1. New property → Sitemaps
2. Enter sitemap URL: `https://newdomain.com/sitemap.xml`
3. Submit

**Leave old domain sitemap active**, helps Google discover redirects faster.

## Phase 5: Monitor Migration Progress

**Track metrics weekly** for 3-6 months post-migration.

### Monitor Rankings and Traffic

**Track in Google Analytics:**
- Organic sessions to new domain (should climb)
- Organic sessions to old domain (should drop to near-zero)
- Overall organic traffic (temporary 10-20% dip normal, should recover within 6 weeks)

**Track in Search Console:**
- Clicks to new domain (trending up)
- Impressions (should stabilize within 4 weeks)
- Coverage errors (watch for unexpected 404s on new domain)

### Check Redirect Discovery in Search Console

**Old domain Search Console:**
- Coverage → Excluded → "Page with redirect"
- Should show growing number of redirected URLs

**New domain Search Console:**
- Coverage → Valid → Check indexed page count
- Should approach old domain's indexed count within 8-12 weeks

### Monitor [Crawl Budget](crawl-budget-optimization-large-sites.html)

**Search Console** → Crawl Stats

**Expected pattern:**
- Old domain: Crawl rate drops gradually (Googlebot discovering redirects)
- New domain: Crawl rate increases (Googlebot indexing new URLs)

**Red flag:** Old domain crawl rate stays high after 4 weeks (redirects not working).

## Phase 6: Maintain Old Domain (6-12 Months)

**Don't decommission old domain immediately**. Google needs time to update indexes.

### Keep 301 Redirects Active

**Minimum duration:** 6 months
**Recommended:** 12 months
**Ideal:** Permanently (if affordable)

**Why:**
- Backlinks from other sites still point to old domain
- Google may take 6+ months to fully migrate authority
- Users with old bookmarks need redirects

### Renew Old Domain Registration

**Don't let old domain expire** during migration window.

**If domain expires:**
- Domain squatters buy it
- Redirects break
- Link equity lost
- Possible negative SEO if squatter builds spam site

**Minimum:** Renew for 1 year post-migration

### Monitor Old Domain for Issues

**Check monthly:**
- Redirects still working
- SSL certificate valid (if HTTPS)
- Server accessible (hosting not suspended)

## Phase 7: Update External Properties

**Third-party profiles pointing to old domain** need manual updates.

### Update Social Media Profiles

- Facebook Page → About → Website
- Twitter/X bio link
- LinkedIn company page
- Instagram bio link

### Update Business Listings

- Google Business Profile
- Yelp
- Industry directories
- Local citations

### Update Backlinks (High-Authority Only)

**Reach out to high-authority sites linking to old domain:**

**Email template:**
```
Subject: Domain Change Notification - Update Link

Hi [Name],

Thanks for linking to our site from [their page URL]. We recently migrated to a new domain:

Old: https://olddomain.com/page
New: https://newdomain.com/page

301 redirects are active, so the link still works, but updating it would help our users and avoid redirect delays.

Thanks!
[Your name]
```

**Prioritize sites with DA >40**, low-authority links benefit less from updates.

## Common Domain Migration Mistakes

### Mistake 1: Migrating Without 301 Redirects

**Launching new domain without redirecting old domain** causes:
- 404 errors on all old URLs
- Loss of all link equity
- Google treats as brand new site (no inherited authority)

**Fix:** Always implement 301 redirects before announcing new domain.

### Mistake 2: Redirect Chains

**Old domain → temporary domain → new domain** creates multiple hops.

**Example:**
```
olddomain.com → 301 → temp.com → 301 → newdomain.com
```

**Problem:** Google may not follow multi-hop redirects, link equity diluted.

**Fix:** Redirect directly from old to new:
```
olddomain.com → 301 → newdomain.com
```

### Mistake 3: Decommissioning Old Domain Too Soon

**Canceling old domain hosting after 1 month** breaks redirects before Google finishes migration.

**Timeline for safe decommissioning:**
- Month 1-3: Active monitoring, high priority
- Month 4-6: Monitor weekly, medium priority
- Month 7-12: Check monthly, low priority
- 12+ months: Safe to decommission (or keep permanently)

### Mistake 4: Not Updating Canonical Tags

**Internal canonicals pointing to old domain** confuse Google.

**Before migration:**
```html
<link rel="canonical" href="https://olddomain.com/page" />
```

**After migration:**
```html
<link rel="canonical" href="https://newdomain.com/page" />
```

**Use search-replace** (see Phase 3) to update all canonicals.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Pre-Migration Planning (4-6 Weeks Before):** Requires individual redirect rules or database-driven redirect logic.
* **Phase 1: Set Up New Domain and Test:** server {
  servername olddomain.com;
  return 301 https://newdomain.com$newurl;
}
* **Phase 2: Implement 301 Redirects on Old Domain:** server {
  servername olddomain.com;
  return 301 https://newdomain.com$newurl;
}
* **Phase 3: Launch Migration:** UPDATE wppostmeta
SET metavalue = REPLACE(metavalue, 'https://olddomain.com', 'https://newdomain.com');

## Frequently Asked Questions

### How long does it take to fully migrate domain authority?

**Typical timeline:** 3-6 months for 90% authority transfer, 6-12 months for full transfer. Speed depends on [crawl frequency](crawl-budget-optimization-large-sites.html), redirect quality, and backlink profile. High-authority sites with strong backlink profiles migrate faster. Small sites may see near-complete transfer in 4-6 weeks.

### Should I redirect old domain to new domain forever?

**Ideally, yes.** Permanent redirects ensure no link equity is ever lost and accommodate users with old bookmarks. **Minimum:** 12 months. **Practical compromise:** Keep redirects until old domain backlink count drops below 10% of peak (check in Ahrefs/Moz). Many companies maintain redirects indefinitely if domain renewal cost is reasonable ($10-20/year).

### Will I lose rankings during domain migration?

**Temporary 10-20% traffic dip is normal** during first 2-4 weeks as Google recrawls and updates indexes. Rankings should fully recover within 6-8 weeks if 301 redirects are implemented correctly. **Larger drops (>30%)** indicate implementation issues, check for broken redirects, missing URLs, or [crawl budget problems](crawl-budget-optimization-large-sites.html).

### Can I migrate domain and change URL structure simultaneously?

**Not recommended.** Migrate domain first (keep URL structure identical), let traffic stabilize 2-3 months, THEN change URL structure with additional redirects. Changing both simultaneously makes troubleshooting impossible, you won't know if traffic drops are from domain change or URL structure change.

### Should I use 302 temporary redirects during testing?

**No.** 302 redirects tell Google move is temporary, so link equity doesn't transfer. Use **password protection or noindex** during testing phase, then switch directly to 301 permanent redirects on launch day. Never use 302 redirects for domain migrations unless you truly intend to move content back (rare scenario). See [cross-domain canonicals](cross-domain-canonical-tags-guide.html) for related duplicate content handling.

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
