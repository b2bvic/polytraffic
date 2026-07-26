---

---
title:: Site Migration SEO Checklist: Prevent Traffic Loss
description:: Site migrations destroy rankings when done wrong. Use this 47-point SEO checklist to migrate without losing traffic. Pre-launch, launch day, and post-launch steps.
focus_keyword:: site migration SEO checklist
category:: technical
author:: Victor Valentine Romo
date:: 2026.03.20

# Site Migration SEO Checklist: Prevent Traffic Loss

> **Quick Summary**
> - **What this covers:** site-migration-seo-checklist
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [What Counts as a Site Migration](#what-counts-as-a-site-migration)
- [Phase 1: Pre-Migration (2-4 Weeks Before)](#phase-1-pre-migration-2-4-weeks-before)
- [Phase 2: Launch Day Execution](#phase-2-launch-day-execution)
- [Phase 3: Post-Migration Monitoring (Days 1-30)](#phase-3-post-migration-monitoring-days-1-30)
- [Complete Pre-Launch Checklist](#complete-pre-launch-checklist)
- [Migration-Specific Issues](#migration-specific-issues)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Site migrations are the highest-risk SEO events your domain will ever face. A botched migration can erase years of ranking progress in hours. A well-executed one preserves everything, traffic, rankings, backlink equity, and indexed page count.

The difference between disaster and smooth transition is a checklist. This one covers every phase: pre-migration preparation, launch day execution, and post-migration monitoring.

## What Counts as a Site Migration

Any of these changes qualifies as a site migration from an SEO perspective:

- **Domain change**, moving from olddomain.com to newdomain.com
- **Protocol change**. HTTP to HTTPS (or vice versa)
- **CMS change**. WordPress to Shopify, Drupal to custom, etc.
- **URL structure change**, modifying URL patterns (e.g., `/blog/post-title` to `/articles/post-title`)
- **Subdomain migration**, blog.site.com to site.com/blog
- **Site redesign**, when the redesign changes URL paths or removes pages
- **Server/hosting change**, moving to a different host or infrastructure

Each type carries different risk levels, but every one requires the same disciplined approach.

## Phase 1: Pre-Migration (2-4 Weeks Before)

### Benchmark Everything

Before touching anything, record your current state. You can't measure migration impact without a baseline.

1. **Export full crawl data** from **Screaming Frog**, every URL, status code, title, meta description, canonical, and internal link
2. **Export organic keywords** from **Google Search Console** Performance report, queries, pages, clicks, impressions, average position for the last 90 days
3. **Export backlink profile** from **Ahrefs** or **Semrush**, every referring domain and the specific URLs they link to
4. **Screenshot your Google Analytics overview**, organic traffic by page for the last 90 days
5. **Record indexed page count**, search `site:yourdomain.com` in Google and note the number

### Build Your Redirect Map

This is the most critical deliverable of any migration. Every old URL must map to the most relevant new URL.

Create a spreadsheet with these columns:

| Old URL | New URL | Status Code | Backlinks | Monthly Traffic | Priority |
|---------|---------|-------------|-----------|-----------------|----------|

**Populate the Old URL column** from your **Screaming Frog** crawl. Include every URL that returns a 200 status code.

**Map each old URL** to its new equivalent:
- Same content, new path → 301 redirect to new URL
- Content merged into another page → 301 redirect to merged page
- Content deleted → 301 redirect to closest relevant page OR 410 if no relevant replacement exists

**Prioritize by backlinks and traffic.** URLs with external backlinks and organic traffic must have precise redirect targets. Low-value pages with no backlinks can be handled with pattern-based redirects.

For detailed redirect mapping, see [Redirect Mapping for Site Migrations](/articles/redirect-mapping-site-migration.html).

### Prepare the New Site

Before launching the new site, verify:

- **Every page has a unique title tag and meta description**, don't launch with placeholder text
- **Canonical tags point to the correct new URLs**, not the old URLs
- **Internal links use the new URL structure**, no links to old paths
- **XML sitemap contains only new, live URLs**, remove any old URLs or placeholders
- **Robots.txt allows crawling of all intended pages**, don't accidentally block sections
- **Schema markup validates**, test with **Google Rich Results Test**
- **hreflang tags updated** (if international), point to new URL structure
- **Noindex tags removed** from staging, this mistake is more common than anyone admits

### Stage and Test Redirects

Implement your redirect map on a staging environment or test server. Verify:

1. Every redirect resolves to the correct destination
2. No redirect chains exist (A → B → C should be A → C)
3. No redirect loops exist
4. HTTP status codes are correct (301, not 302)
5. Redirects work for both trailing slash and non-trailing slash versions

**Test tool:** Use **Screaming Frog** in list mode, upload your old URLs and crawl to verify each redirect target.

### Notify Google

1. If changing domains, use **Google Search Console's Change of Address** tool
2. If your site has manual crawl rate settings in GSC, consider increasing temporarily to speed up recrawling post-migration

## Phase 2: Launch Day Execution

### Deploy Redirects First

Redirects must be live before anything else. Deploy them to production and verify they work using live URLs, not staging.

```bash
# Quick verification of redirects
curl -sI https://oldsite.com/important-page | grep -i "location"
# Should return: Location: https://newsite.com/important-page
```

### Switch DNS (If Changing Domains or Hosts)

Update DNS records. Keep in mind:
- DNS propagation takes 24-72 hours globally
- Set a low TTL (300 seconds) on your DNS records 48 hours before migration to speed up propagation
- Don't change TTL and DNS records simultaneously

### Submit New XML Sitemap

1. Open **Google Search Console** for the new site
2. Go to **Sitemaps**
3. Submit the new XML sitemap URL
4. If domain changed, add and verify the new domain in GSC

### Request Indexing for Critical Pages

For your top 20 highest-traffic pages, manually request indexing through **Google Search Console > URL Inspection > Request Indexing**. This doesn't guarantee immediate indexing, but it puts these URLs at the front of the crawl queue.

### Monitor Server Load

Migration day often brings increased server load as **Googlebot** discovers redirects and crawls the new site aggressively. Monitor your server metrics:
- CPU utilization
- Memory usage
- Response time (TTFB)
- Error rates

If your server starts returning 503 errors under crawl load, you need to scale up temporarily or implement rate limiting for bots.

## Phase 3: Post-Migration Monitoring (Days 1-30)

### Day 1-3: Immediate Checks

**Crawl the new site with Screaming Frog:**
- Every page returns 200
- No broken internal links
- No orphan pages
- Canonical tags correct
- Meta data intact

**Check Google Search Console:**
- No new crawl errors
- Coverage report shows pages being discovered
- Sitemap has been processed

**Check redirect integrity:**
- Sample 50 old URLs and verify they redirect correctly
- Test with different user agents (including Googlebot)

### Day 3-7: Index Monitoring

Track how quickly Google indexes your new URLs:

1. Search `site:newdomain.com` daily and record indexed page count
2. Monitor **GSC > Indexing > Pages** for the "Indexed" count
3. Watch for "Redirect" notices in the coverage report, these are expected

Indexed page count will temporarily drop. This is normal during migration. Google needs to discover the new URLs, crawl them, and add them to its index. For large sites, full re-indexing can take 2-4 weeks.

### Day 7-14: Ranking and Traffic Analysis

Compare current performance to your pre-migration baseline:

- **Organic traffic**. 10-20% fluctuation in the first two weeks is normal
- **Keyword rankings**, expect temporary drops of 2-5 positions for most keywords
- **Indexed page count**, should be approaching pre-migration levels by day 14

**Red flags that indicate a problem:**
- Organic traffic drops more than 30%
- Rankings disappear entirely (not drop, gone)
- Indexed page count isn't recovering after 2 weeks
- New crawl errors appearing in bulk

### Day 14-30: Stabilization

By week 3-4, your rankings should be stabilizing. If they're still declining:

1. **Re-crawl with Screaming Frog**, look for broken redirects, new 404s, incorrect canonicals
2. **Check for redirect chains**, pages redirecting through multiple hops
3. **Verify no pages are accidentally noindexed**. CMS migrations frequently copy staging noindex tags to production
4. **Review server logs**, confirm Googlebot is successfully crawling the new site

## Complete Pre-Launch Checklist

Use this as your final gate before migration:

- [ ] Full crawl exported (Screaming Frog)
- [ ] Keyword rankings exported (GSC/Ahrefs)
- [ ] Backlink profile exported (Ahrefs/Semrush)
- [ ] Redirect map complete (every old URL mapped)
- [ ] Redirects tested on staging
- [ ] No redirect chains or loops
- [ ] New site title tags and meta descriptions verified
- [ ] New site canonical tags verified
- [ ] New site internal links verified (no old URLs)
- [ ] New XML sitemap generated and validated
- [ ] Robots.txt reviewed
- [ ] Schema markup validated
- [ ] Hreflang tags updated (if applicable)
- [ ] Noindex tags removed from all intended-to-index pages
- [ ] Analytics tracking code installed on new site
- [ ] GSC verified for new domain (if applicable)
- [ ] Change of Address tool submitted (if domain change)
- [ ] DNS TTL lowered 48 hours before
- [ ] Server capacity confirmed for increased crawl load
- [ ] Team notified of launch timeline and responsibilities

## Migration-Specific Issues

### WordPress to Shopify Migration

**URL structure changes are unavoidable.** WordPress uses `/category/post-name/` while Shopify forces `/blogs/blog-name/post-name` and `/products/product-name`. Build comprehensive redirect rules in Shopify's redirect manager or in your CDN layer.

**Shopify's built-in redirect limit** is 200,000 URLs. For larger sites, implement redirects at the DNS or CDN level using **Cloudflare Workers** or **Netlify** redirects.

### HTTP to HTTPS Migration

Simpler than domain changes but still requires:
- Sitewide 301 redirects from HTTP to HTTPS
- Updated canonical tags (HTTPS versions)
- Updated internal links (HTTPS versions)
- Updated XML sitemap (HTTPS URLs)
- Updated **Google Search Console** property (add HTTPS version)
- Updated **Google Analytics** default URL

See [HTTPS Migration SEO Checklist](/articles/https-migration-seo-checklist.html) for the full protocol.

### Subdomain to Subdirectory Migration

Moving `blog.site.com` to `site.com/blog` consolidates domain authority but requires:
- 301 redirects from every subdomain URL to its subdirectory equivalent
- Proper server configuration to handle requests for the old subdomain
- Updated internal links across the entire main domain


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **What Counts as a Site Migration:** Any of these changes qualifies as a site migration from an SEO perspective:
* **Phase 1: Pre-Migration (2-4 Weeks Before):** Before touching anything, record your current state.
* **Phase 2: Launch Day Execution:** Redirects must be live before anything else.
* **Phase 3: Post-Migration Monitoring (Days 1-30):** Track how quickly Google indexes your new URLs:
* **Complete Pre-Launch Checklist:** Use this as your final gate before migration:
* **Migration-Specific Issues:** Simpler than domain changes but still requires:
- Sitewide 301 redirects from HTTP to HTTPS
- Updated canonical tags (HTTPS versions)
- Updated internal links (

## Frequently Asked Questions

### How much traffic loss is normal during a migration?

Expect a 10-20% temporary decline in organic traffic for 2-4 weeks. If the decline exceeds 30% or lasts more than 6 weeks, something went wrong, most likely broken redirects, missing pages, or noindex tags carried over from staging.

### Should I migrate all at once or in phases?

For sites under 50,000 pages, migrate all at once. Phased migrations introduce complexity, you're running two systems simultaneously, managing redirects between them, and extending the recovery window. For sites over 50,000 pages, phased migration by section (e.g., blog first, then product pages) can reduce risk.

### How long should I keep the old domain active after a domain migration?

Minimum 12 months. The old domain needs to remain active to serve 301 redirects to the new domain. Dropping the old domain before Google has fully transferred signals means losing the link equity those redirects were passing.

### Can I change my URL structure and domain at the same time?

You can, but doing both simultaneously doubles the risk. If possible, change the domain first and keep URL structure identical. Wait for rankings to stabilize (4-6 weeks), then change URL structure on the new domain. This way, if something breaks, you know which change caused it.

### Will my rankings fully recover after migration?

In most cases, yes, rankings recover to pre-migration levels within 4-8 weeks for well-executed migrations. However, if the old site was benefiting from factors you didn't carry over (like structured data, internal linking density, or page speed advantages of the old platform), rankings may settle at a different equilibrium.

## Next Steps

If you're planning a migration, start the redirect map today. It takes the longest and matters the most. Then work through this checklist systematically, pre-migration, launch day, post-migration.

For additional migration guidance, see [Redirect Mapping for Site Migrations](/articles/redirect-mapping-site-migration.html), [Post-Migration SEO Audit](/articles/site-migration-post-launch-audit.html), and [301 vs 302 Redirects for SEO](/articles/301-vs-302-redirects-seo.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
