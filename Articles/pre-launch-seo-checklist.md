---
title:: Pre-Launch SEO Checklist: 52 Critical Checks Before Going Live
description:: Prevent catastrophic indexing issues and ranking failures with comprehensive pre-launch SEO validation. Technical audit framework for new sites.
focus_keyword:: pre-launch seo checklist
category:: Technical SEO
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Pre-Launch SEO Checklist: 52 Critical Checks Before Going Live

> **Quick Summary**
> - **What this covers:** Prevent catastrophic indexing issues and ranking failures with comprehensive pre-launch SEO validation. Technical audit framework for new sites.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Technical Infrastructure Validation](#technical-infrastructure-validation)
- [Indexing Controls Verification](#indexing-controls-verification)
- [URL Structure and Redirects](#url-structure-and-redirects)
- [Mobile Optimization Verification](#mobile-optimization-verification)
- [On-Page SEO Elements](#on-page-seo-elements)
- [Page Speed Optimization](#page-speed-optimization)
- [Structured Data Implementation](#structured-data-implementation)
- [Analytics and Tracking Setup](#analytics-and-tracking-setup)
- [Security and Legal Compliance](#security-and-legal-compliance)
- [Pre-Launch Testing Protocol](#pre-launch-testing-protocol)
- [Launch Day Checklist](#launch-day-checklist)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**Pre-launch SEO audits** prevent disasters that take months to fix. A site launching with noindex meta tags on all pages remains invisible in search for weeks before discovery. Incorrect canonical tags consolidate months of content to wrong URLs. Missing robots.txt files block Googlebot from entire sections. These failures occur during 40% of website launches when teams skip systematic validation.

The financial impact compounds daily. An e-commerce site losing 60 days of organic visibility during peak season sacrifices $180K in potential revenue at $3K daily averages. B2B sites delay lead generation 8-12 weeks while fixing indexing issues that pre-launch checks would catch in 4 hours. Systematic pre-launch validation trades 4-8 hours of audit time for months of ranking acceleration.

## Technical Infrastructure Validation

**SSL certificate installation** prevents "Not Secure" warnings that Google penalizes. Modern browsers display security warnings on HTTP sites, increasing bounce rates 42% versus HTTPS equivalents. Verify:

```bash
# Test SSL installation
curl -I https://www.example.com | grep "HTTP/"
# Should return: HTTP/2 200

# Check certificate validity
openssl s_client -connect example.com:443 -servername example.com
# Verify: Verification: OK
```

**HTTPS redirect** from HTTP to HTTPS versions prevents duplicate content:

```
# .htaccess redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

Test all HTTP URLs redirect properly. Missing redirects split ranking signals between HTTP and HTTPS versions.

**WWW vs. non-WWW consistency** prevents duplication. Choose preferred version:

```
# Redirect non-WWW to WWW
RewriteCond %{HTTP_HOST} !^www\.
RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]

# OR redirect WWW to non-WWW
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
```

Google Search Console requires specifying preferred domain. Ensure redirects match preference.

### DNS and Domain Configuration

**DNS propagation** complete before launch prevents accessibility issues. Check from multiple locations:

```bash
# Query DNS from different resolvers
dig @8.8.8.8 example.com
dig @1.1.1.1 example.com

# Verify A record points to correct IP
nslookup example.com
```

DNS propagation takes 24-48 hours globally. Launch after confirming propagation complete across major resolvers.

**Domain age consideration**: New domains face "sandbox" periods where rankings develop slowly over 3-6 months. If possible, register domains 3+ months before launch. Aged domains (1+ years) rank faster than week-old domains.

**Subdomain vs. subdirectory** strategy affects authority transfer. Subdirectories (example.com/blog) inherit domain authority. Subdomains (blog.example.com) build authority separately. Prefer subdirectories unless technical requirements necessitate subdomains.

## Indexing Controls Verification

**Robots meta tag audit** catches accidental noindex directives:

```bash
# Scan all pages for noindex
curl -s https://example.com | grep -i "noindex"

# Better: crawl entire site with Screaming Frog
# Filter by: Meta Robots 1 > "noindex"
```

Common mistake: Developers add noindex during staging, forget removal before launch. **Every page** should either allow indexing or intentionally block it, no accidents.

**Robots.txt validation** ensures crawler access:

```
# Check robots.txt exists and content
curl https://example.com/robots.txt

# Verify critical paths allowed
User-agent: *
Allow: /
Sitemap: https://www.example.com/sitemap.xml
```

Critical checks:
- No `Disallow: /` blocking entire site
- Important directories not blocked (products, blog, services)
- Sitemap URL present and accurate

**Google Search Console verification** enables monitoring:
1. Add property (www vs. non-WWW matching redirect strategy)
2. Verify ownership (HTML file, meta tag, or DNS)
3. Submit XML sitemap
4. Set international targeting if applicable

### XML Sitemap Generation

**Comprehensive sitemap** includes all indexable URLs:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/</loc>
    <lastmod>2026-02-08</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.example.com/about/</loc>
    <lastmod>2026-02-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

Sitemap requirements:
- Only include indexable URLs (no noindex pages)
- Use absolute URLs with HTTPS
- Split large sitemaps (>50K URLs) into sitemap index files
- Update lastmod dates accurately
- Exclude URLs blocked by robots.txt

**Sitemap submission** via Search Console and robots.txt:
1. Upload sitemap.xml to root directory
2. Add to robots.txt: `Sitemap: https://www.example.com/sitemap.xml`
3. Submit via Search Console Sitemaps tool
4. Monitor for errors (404s, blocked URLs, redirects)

## URL Structure and Redirects

**Clean URL format** follows SEO best practices:
- Lowercase only (not MixedCase)
- Hyphens for word separation (not underscores)
- Short, descriptive slugs
- Remove unnecessary parameters

```
Good: https://example.com/products/blue-widget
Bad:  https://example.com/products.php?id=123&cat=widgets
```

**301 redirects for redesigns** preserve authority from old URLs:

```
# Redirect old URL structure to new
Redirect 301 /old-page.html https://example.com/new-page/
Redirect 301 /products.php?id=123 https://example.com/products/widget-123/
```

Create comprehensive redirect mapping:
1. Export URLs from old site
2. Map to equivalent new URLs
3. Implement 301 redirects
4. Test sample URLs verify redirects
5. Monitor 404 errors post-launch

**Trailing slash consistency** prevents duplicate content:

```
# Redirect without trailing slash to with slash
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ https://example.com/$1/ [R=301,L]

# OR redirect with slash to without
RewriteCond %{REQUEST_URI} (.*)/$
RewriteRule ^(.*)$ https://example.com/$1 [R=301,L]
```

Choose one format. Google treats `/products` and `/products/` as separate URLs without redirects.

### Canonical Tag Implementation

**Self-referencing canonicals** on all pages prevent accidental duplication:

```html
<link rel="canonical" href="https://www.example.com/page-url/" />
```

Canonical rules:
- Use absolute URLs (not relative)
- Match exactly (including www/non-www, trailing slash)
- Place in `<head>` section
- Only one canonical per page

**Parameter handling** for filtered/sorted views:

```html
<!-- Base product page -->
<link rel="canonical" href="https://example.com/products/widget/" />

<!-- Sorted view canonicalizes to base -->
<!-- URL: /products/widget/?sort=price -->
<link rel="canonical" href="https://example.com/products/widget/" />
```

## Mobile Optimization Verification

**Viewport meta tag** presence on all templates:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
```

Missing viewport tags cause mobile rendering failures, pages render at desktop widths requiring pinch-zoom.

**Mobile-friendly test** via Google's tool:
- Test 10-20 representative pages
- Verify no "Page is not mobile-friendly" errors
- Check text sizing (minimum 16px)
- Verify touch target spacing (minimum 48×48px)
- Ensure no horizontal scrolling

**Responsive design validation** across device types:
- Test on actual iOS devices (Safari)
- Test on Android devices (Chrome)
- Use Chrome DevTools device emulation
- Verify breakpoints at 320px, 375px, 768px, 1024px

**Mobile page speed** meets Core Web Vitals:
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

Run PageSpeed Insights on mobile for 10+ important pages. Address critical issues before launch.

### Mobile-First Indexing Readiness

**Content parity** between mobile and desktop:
- Identical text content
- Same images with alt text
- Equivalent structured data
- Matching internal links

Common failure: Desktop shows 2,000 words, mobile hides 1,200 words in accordions. Google indexes mobile version, losing 60% of content signals.

**Structured data consistency** across mobile and desktop:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Blue Widget",
  "offers": {
    "@type": "Offer",
    "price": "99.99"
  }
}
```

Validate both mobile and desktop versions include identical schema markup.

## On-Page SEO Elements

**Title tag optimization** for all pages:
- Unique titles (no duplicates)
- 50-60 characters length
- Include target keywords
- Brand name at end
- Descriptive and compelling

```html
<title>Blue Widgets - Professional Grade Tools | Acme Industries</title>
```

**Meta description** on all pages:
- Unique descriptions
- 150-160 characters
- Include target keywords
- Compelling call-to-action
- Accurate page summary

```html
<meta name="description" content="Shop professional-grade blue widgets with lifetime warranties. Free shipping on orders over $50. Industry-leading quality since 1985.">
```

**Heading structure** hierarchy:
- Single H1 per page containing primary keyword
- H2 subheadings for main sections
- H3 for subsections
- Logical nesting (no H4 before H3)

**Image optimization**:
- Descriptive alt text on all images
- Compressed file sizes (WebP format)
- Descriptive filenames (blue-widget.jpg not IMG_1234.jpg)
- Width/height attributes specified

### Internal Linking Architecture

**Logical site hierarchy**:
- Homepage links to main categories
- Categories link to subcategories and products
- Every page reachable within 3 clicks from homepage

**Anchor text optimization**:
- Descriptive link text (not "click here")
- Include target keywords naturally
- Avoid over-optimization (varied anchor text)

**Orphan page detection**:

```bash
# Crawl site with Screaming Frog
# Check "Orphan Pages" report
# Ensure no important pages lack internal links
```

Every page needs at least one internal link from another page. Orphan pages rely solely on sitemaps for discovery, weaker indexing signal.

## Page Speed Optimization

**Core Web Vitals targets**:
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**Image optimization checklist**:
- Modern formats (WebP, AVIF)
- Responsive images (srcset)
- Lazy loading below-fold images
- CDN delivery
- Compression (quality 80-85 for JPEG)

**JavaScript optimization**:
- Minification
- Code splitting
- Defer non-critical scripts
- Remove unused libraries

**CSS optimization**:
- Minification
- Critical CSS inline
- Remove unused styles
- Combine/reduce files

**Caching configuration**:

```
# Browser caching headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### Performance Testing

**Lighthouse audit** on key pages:
- Homepage
- Top 5 product/service pages
- Blog/content pages
- Contact/conversion pages

Target 90+ performance scores. Address blocking issues:
- Unoptimized images
- Render-blocking CSS/JS
- Slow server response time
- Missing compression

**WebPageTest** from multiple locations:
- Test from 3+ geographic regions
- Use 4G throttling
- Run 3 tests, average results
- TTFB should be < 600ms

## Structured Data Implementation

**Organization schema** on homepage:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme Industries",
  "url": "https://www.example.com",
  "logo": "https://www.example.com/logo.png",
  "sameAs": [
    "https://facebook.com/acmeindustries",
    "https://twitter.com/acmeindustries"
  ]
}
```

**Breadcrumb schema** on all pages:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://www.example.com"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Products",
    "item": "https://www.example.com/products"
  }]
}
```

**Product schema** for e-commerce:
- Product name, description, image
- Price, availability, brand
- Aggregate ratings if available

**Article schema** for blog posts:
- Headline, author, publish date
- Featured image
- Organization publisher

**Validation**: Test all schema with Google Rich Results Test and Schema Markup Validator.

## Analytics and Tracking Setup

**Google Analytics 4** implementation:
- GA4 property created
- Tracking code on all pages
- Goals/conversions configured
- E-commerce tracking (if applicable)
- Cross-domain tracking (if needed)

**Google Search Console** setup complete:
- Property verified
- Sitemap submitted
- Email notifications enabled
- All stakeholders added as users

**Conversion tracking** verified:
- Form submissions track
- Phone call tracking (if applicable)
- Purchase events (e-commerce)
- Custom events for key actions

**Tag Manager** (optional but recommended):
- Container published
- GA4 configured via Tag Manager
- Conversion events firing correctly
- Debug mode tested thoroughly

## Security and Legal Compliance

**Privacy policy** page created:
- Describes data collection
- Cookie usage disclosed
- Third-party services listed
- Contact information provided

**Terms of service** for e-commerce/SaaS:
- Return/refund policies
- Service terms clearly stated
- Liability disclaimers
- Contact information

**SSL certificate** valid and properly configured:
- No mixed content warnings
- HTTPS loads on all pages
- Certificate valid for 1+ years
- Includes www and non-www versions

**GDPR compliance** for EU visitors:
- Cookie consent banner
- Data processing disclosures
- User rights explained
- Privacy policy updated

## Pre-Launch Testing Protocol

**Staging site indexing block**:

```html
<!-- Ensure this exists on staging, NOT production -->
<meta name="robots" content="noindex, nofollow">
```

**Browser testing**:
- Chrome (latest and -1 version)
- Safari (desktop and mobile)
- Firefox (latest)
- Edge (latest)

**Device testing**:
- iPhone (various models)
- Android (various brands)
- iPad/tablets
- Desktop (Windows and Mac)

**Link validation**:

```bash
# Use broken link checker
wget --spider -r -o crawler.log https://example.com

# Or use online tool: brokenlinkcheck.com
```

**Form testing**:
- All forms submit successfully
- Validation messages display
- Thank you pages/confirmations work
- Email notifications arrive

## Launch Day Checklist

**Remove staging blocks**:
- Delete noindex meta tags
- Update robots.txt
- Enable sitemap
- Remove password protection

**Search Console submission**:
- Submit sitemap
- Request indexing for homepage
- Request indexing for top 10 pages

**Social media setup**:
- Open Graph tags implemented
- Twitter Card tags added
- Test URL previews on Facebook/Twitter
- Share launch announcements

**Monitoring setup**:
- Uptime monitoring activated
- Error tracking enabled
- Analytics receiving data
- Search Console data populating


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Indexing Controls Verification:** Common mistake: Developers add noindex during staging, forget removal before launch.
* **URL Structure and Redirects:** Create comprehensive redirect mapping:
1. Export URLs from old site
2. Map to equivalent new URLs
3. Implement 301 redirects
4. Test sample URLs verify redirect
* **Mobile Optimization Verification:** Missing viewport tags cause mobile rendering failures, pages render at desktop widths requiring pinch-zoom.
* **On-Page SEO Elements:** Every page needs at least one internal link from another page.

## FAQ

### How long before Google indexes a new site?

New sites typically see initial indexing within 3-7 days after sitemap submission. However, comprehensive indexing of all pages takes 2-4 weeks. Established domains launching new sections index faster (1-3 days) than brand new domains. Submitting URLs via Search Console URL Inspection tool expedites individual page indexing to 24-48 hours.

### Should I launch with minimal content or wait for full inventory?

Launch with at least 20-30 pages of quality content. Thin sites (5-10 pages) struggle gaining traction. E-commerce sites should launch with 50+ products minimum. Each week of delay costs potential ranking progress. Google needs time building authority. Launch with viable inventory, add more post-launch. Delaying 6 months for perfect inventory wastes 6 months of aging advantage.

### Can I launch without a blog or is it required?

Blogs aren't required for rankings but accelerate authority building. Service-based businesses benefit significantly from content marketing. E-commerce sites less so if product pages provide comprehensive information. Prioritize launching core pages (services, products, about, contact) first. Add blog 1-2 months post-launch once traffic patterns stabilize. Never delay launch waiting for blog content.

### What happens if I launch with technical SEO issues?

Recovery time varies by severity. Noindex on all pages: fix immediately, 2-3 weeks for reindexing. Incorrect canonicals: 4-6 weeks sorting duplicate content. Broken redirects: 1-2 weeks after fixes. Severe issues delay ranking momentum 8-12 weeks versus clean launches. Prevention via pre-launch audit eliminates these delays. Fixing takes same effort whether pre-launch or post-launch, but post-launch costs ranking opportunity.

### Should I wait for perfect PageSpeed scores before launching?

No. Target passing Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1) rather than perfect scores. Score 70-80 with passing CWV sufficient for launch. Delaying launch for 95+ scores provides minimal benefit. Post-launch optimization continues, launch when CWV passes and no blocking technical issues exist. Month-long optimization marathons for perfect scores waste valuable aging time.

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

