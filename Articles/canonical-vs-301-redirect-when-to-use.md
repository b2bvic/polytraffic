---
title:: Canonical vs 301 Redirect: Which to Use and When
description:: Canonical tags and 301 redirects both consolidate duplicate content, but they work differently. Choose wrong and you leak link equity or confuse users.
focus_keyword:: canonical vs 301 redirect when to use
category:: technical
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Canonical vs 301 Redirect: Which to Use and When

> **Quick Summary**
> - **What this covers:** Canonical tags and 301 redirects both consolidate duplicate content, but they work differently. Choose wrong and you leak link equity or confuse users.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [How Canonical Tags Work](#how-canonical-tags-work)
- [How 301 Redirects Work](#how-301-redirects-work)
- [Canonical vs 301 Redirect: Side-by-Side Comparison](#canonical-vs-301-redirect-side-by-side-comparison)
- [When to Use a Canonical Tag](#when-to-use-a-canonical-tag)
- [When to Use a 301 Redirect](#when-to-use-a-301-redirect)
- [Common Mistakes](#common-mistakes)
- [Decision Matrix: Canonical vs 301 Redirect](#decision-matrix-canonical-vs-301-redirect)
- [Can You Use Both on the Same Page?](#can-you-use-both-on-the-same-page)
- [How to Implement](#how-to-implement)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Canonical tags and 301 redirects both solve duplicate content problems by consolidating ranking signals to a single URL. But they work differently and serve different purposes. Use a canonical when both URLs need to remain accessible. Use a 301 redirect when the old URL should no longer exist.

Choosing wrong causes problems. A canonical when you need a redirect leaves duplicate URLs accessible, wasting link equity. A redirect when you need a canonical forces users to a different URL unnecessarily, breaking direct links or bookmarks.

This guide explains how canonical tags and 301 redirects work, when to use each, and how to avoid common misconfigurations that harm SEO.

## How Canonical Tags Work

A canonical tag is an HTML element in the `<head>` that tells Google which version of a page is the preferred one:

```html
<link rel="canonical" href="https://yoursite.com/preferred-url">
```

### What Canonical Tags Do

1. **Both URLs remain accessible**. Users and bots can visit both the canonical and non-canonical URLs
2. **Google consolidates signals to the canonical**. Link equity, rankings, and indexing focus on the canonical URL
3. **Google treats it as a hint**. Google may ignore your canonical if other signals conflict (sitemap, internal links, redirects)

### When Google Shows the Non-Canonical URL

Even with a canonical tag, Google may show the non-canonical URL in search results if it better matches the user's query or device (e.g., showing a mobile URL for mobile searches).

## How 301 Redirects Work

A 301 redirect is a server-side instruction that permanently moves a URL to a new location. When a browser or bot requests the old URL, the server responds with HTTP status `301 Moved Permanently` and redirects to the new URL.

### What 301 Redirects Do

1. **Old URL is no longer accessible**. Requests to the old URL automatically redirect to the new URL
2. **Google transfers signals to the new URL**. Link equity, rankings, and indexing move to the new URL
3. **Google treats it as authoritative**. 301 redirects are directives, not hints. Google follows them.

### Link Equity Transfer

301 redirects pass approximately **90-99%** of link equity to the new URL. Canonical tags pass similar equity, but because the old URL remains accessible, there's potential for signal dilution if Google receives conflicting signals.

## Canonical vs 301 Redirect: Side-by-Side Comparison

| Factor | Canonical Tag | 301 Redirect |
|--------|--------------|-------------|
| **Both URLs accessible?** | Yes | No (old URL redirects) |
| **User experience** | Users can visit either URL | Users are redirected automatically |
| **Link equity passed?** | Yes (~90-99%) | Yes (~90-99%) |
| **Google's treatment** | Hint (can be ignored) | Directive (followed) |
| **Speed of consolidation** | Slower (Google processes as hint) | Faster (immediate enforcement) |
| **Use when...** | Both URLs need to exist | Old URL should no longer be visited |
| **Reversal difficulty** | Easy (remove tag) | Harder (remove redirect rule, potential 404s) |

## When to Use a Canonical Tag

### Scenario 1: URL Parameters (Tracking, Filters, Sorting)

URLs with parameters create duplicates:

```
https://yoursite.com/products
https://yoursite.com/products?sort=price
https://yoursite.com/products?color=red
https://yoursite.com/products?utm_source=email
```

All show the same or similar content. Use canonical tags to consolidate signals to the base URL:

```html
<!-- On https://yoursite.com/products?sort=price -->
<link rel="canonical" href="https://yoursite.com/products">
```

**Why not a redirect:** Users may have bookmarked or shared the parameterized URL. Redirecting breaks those links.

### Scenario 2: Print or Mobile-Specific Pages

You have a print-friendly version or mobile-specific URL:

```
https://yoursite.com/article (main page)
https://yoursite.com/article/print (print version)
```

Canonical the print version to the main page:

```html
<!-- On /article/print -->
<link rel="canonical" href="https://yoursite.com/article">
```

**Why not a redirect:** Users who specifically request the print version expect to see it.

### Scenario 3: Syndicated or Republished Content

You publish content on Medium, LinkedIn, or a partner site. Those platforms republish your content with a canonical pointing back to your original:

```html
<!-- On external site republishing your content -->
<link rel="canonical" href="https://yoursite.com/original-article">
```

**Why not a redirect:** The external site needs the content to remain accessible on their domain.

### Scenario 4: Product Variations with Minimal Differences

You sell the same product in different colors, each with its own URL:

```
https://yoursite.com/product/widget-blue
https://yoursite.com/product/widget-red
```

If the only difference is color and you want one variation to rank, canonical the others to it:

```html
<!-- On /product/widget-red -->
<link rel="canonical" href="https://yoursite.com/product/widget-blue">
```

**Why not a redirect:** Users may link directly to the red widget. Redirecting breaks those links.

### Scenario 5: HTTP to HTTPS (Backup Method)

If your HTTP pages are still accessible (you haven't forced HTTPS via redirect), use canonical tags to signal HTTPS as preferred:

```html
<!-- On http://yoursite.com/page -->
<link rel="canonical" href="https://yoursite.com/page">
```

**Better approach:** Implement a 301 redirect from HTTP to HTTPS sitewide. Canonical is a fallback if you can't control redirects.

## When to Use a 301 Redirect

### Scenario 1: Permanent URL Changes

You renamed a page or restructured your URLs:

```
Old: https://yoursite.com/services/seo-optimization
New: https://yoursite.com/seo-services
```

Implement a 301 redirect. The old URL should no longer exist:

```apache
Redirect 301 /services/seo-optimization https://yoursite.com/seo-services
```

**Why not a canonical:** The old URL is obsolete. Redirecting ensures users and bots always land on the new URL.

### Scenario 2: Site Migrations

You're migrating to a new domain or changing URL structure:

```
Old: http://oldsite.com/page
New: https://newsite.com/page
```

301 redirect every old URL to its new equivalent.

**Why not a canonical:** Cross-domain canonicals are supported but less reliable than redirects. Redirects are authoritative.

### Scenario 3: Consolidating Duplicate Pages

You have two pages covering the same topic and want to merge them:

```
Weak: https://yoursite.com/seo-tips
Strong: https://yoursite.com/seo-guide
```

Merge the content into the stronger page and 301 redirect the weaker page:

```apache
Redirect 301 /seo-tips https://yoursite.com/seo-guide
```

**Why not a canonical:** Once merged, the weaker page shouldn't exist anymore.

### Scenario 4: Deleting Pages with Backlinks

A page is being removed, but it has backlinks or traffic. Redirect it to the most relevant page:

```
Deleted: https://yoursite.com/outdated-service
Redirect to: https://yoursite.com/services
```

**Why not a canonical:** The deleted page no longer has content. Redirecting preserves link equity.

### Scenario 5: Enforcing Preferred Domain (WWW vs Non-WWW)

Redirect all www traffic to non-www (or vice versa):

```apache
# Redirect www to non-www
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.yoursite\.com [NC]
RewriteRule ^(.*)$ https://yoursite.com/$1 [L,R=301]
```

**Why not a canonical:** This is a site-wide structural decision. Redirects enforce it for all users and bots.

## Common Mistakes

### Mistake 1: Using Canonical Instead of Redirect for Deleted Pages

A page is deleted, but you add a canonical to the homepage instead of redirecting.

**Problem:** The deleted page returns a 404 with a canonical tag. Google ignores the canonical because the page doesn't exist.

**Fix:** 301 redirect the deleted page to a relevant live page.

### Mistake 2: Using Redirect Instead of Canonical for Parameter URLs

You redirect all `?sort=` parameter variations to the base URL.

**Problem:** Users who bookmarked `?sort=price` get redirected to the unsorted view, breaking their preferred filter.

**Fix:** Use canonical tags. Keep the parameterized URLs accessible but consolidate SEO signals.

### Mistake 3: Canonical and Redirect Conflict

A page has a canonical tag pointing to `/page-b`, but the page is also 301 redirected to `/page-c`.

**Problem:** Conflicting signals. Google may ignore both.

**Fix:** If the page redirects, remove the canonical tag. Redirects supersede canonicals.

### Mistake 4: Chaining Redirects When Canonical Would Work

You redirect `/page-old` → `/page-interim` → `/page-new`.

**Problem:** Redirect chains slow down page load and dilute link equity.

**Fix:** Either flatten the redirect (`/page-old` → `/page-new`) or use canonical tags if all pages need to remain accessible.

### Mistake 5: Using Canonical for Cross-Domain Without Verification

You canonical your content on Domain A to Domain B, but Domain B doesn't allow it (e.g., Medium doesn't let you canonical to them).

**Problem:** Google may ignore the cross-domain canonical.

**Fix:** Verify the target domain supports cross-domain canonicals before implementing.

## Decision Matrix: Canonical vs 301 Redirect

| Situation | Use Canonical | Use 301 Redirect |
|-----------|--------------|-----------------|
| URL parameters (filters, sorting, tracking) | ✅ | ❌ |
| Print/mobile-specific versions | ✅ | ❌ |
| Syndicated content | ✅ | ❌ |
| Permanent URL rename | ❌ | ✅ |
| Site migration | ❌ | ✅ |
| Deleted pages with backlinks | ❌ | ✅ |
| Consolidating duplicate pages | ❌ | ✅ |
| WWW vs non-WWW | ❌ | ✅ |
| HTTP to HTTPS | ❌ | ✅ (canonical as backup) |
| Product variations (minor differences) | ✅ | ❌ |

**Rule of thumb:** If the old URL should still be accessible to users, use a canonical. If it should no longer exist, use a 301 redirect.

## Can You Use Both on the Same Page?

Yes, but only in specific scenarios.

**Valid use case:** A 301 redirect exists, and the target page has a self-referencing canonical.

```apache
# .htaccess redirect
Redirect 301 /old-page https://yoursite.com/new-page
```

```html
<!-- On https://yoursite.com/new-page -->
<link rel="canonical" href="https://yoursite.com/new-page">
```

This is valid. The redirect moves users to the new page, and the canonical reinforces that the new page is canonical.

**Invalid use case:** A page returns 200 status, has a canonical pointing to Page B, and also has a redirect in .htaccess pointing to Page C.

**Problem:** Conflicting signals. Google doesn't know whether to treat Page B or Page C as canonical.

**Fix:** Remove the canonical or the redirect, not both.

## How to Implement

### Canonical Tag (HTML)

```html
<head>
  <link rel="canonical" href="https://yoursite.com/preferred-url">
</head>
```

### 301 Redirect (Apache .htaccess)

```apache
Redirect 301 /old-page https://yoursite.com/new-page
```

### 301 Redirect (Nginx)

```nginx
location /old-page {
  return 301 https://yoursite.com/new-page;
}
```

### 301 Redirect (WordPress Plugin)

Use **Redirection** or **Yoast SEO Premium**:

1. Go to **Tools > Redirection**
2. Add source URL and target URL
3. Select **301 - Permanent**
4. Save


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **How Canonical Tags Work:** A canonical tag is an HTML element in the <head> that tells Google which version of a page is the preferred one:
* **How 301 Redirects Work:** A 301 redirect is a server-side instruction that permanently moves a URL to a new location.
* **When to Use a 301 Redirect:** You renamed a page or restructured your URLs:
* **Common Mistakes:** A page is deleted, but you add a canonical to the homepage instead of redirecting.

## Frequently Asked Questions

### Can I use a canonical tag across domains?

Yes. Cross-domain canonicals tell Google that the authoritative version of content lives on a different domain (common for syndication). But they're less reliable than same-domain canonicals. Google verifies that the target domain allows the canonical.

### Does a 301 redirect pass link equity?

Yes, approximately 90-99% of link equity passes through a 301 redirect. This is comparable to canonical tags.

### What happens if I remove a canonical tag?

The page becomes self-canonical (Google treats it as the preferred version by default). If you previously canonicalized it to another page, removing the tag signals that the page should now rank on its own.

### Can I change a canonical to a redirect later?

Yes. If you initially used a canonical but later decide the old URL should no longer exist, replace the canonical with a 301 redirect.

### Do canonicals and redirects affect Core Web Vitals?

Redirects add latency (50-200ms per hop), which can increase Largest Contentful Paint (LCP). Canonicals don't add latency because both URLs remain accessible. For speed-critical pages, canonicals are better than redirects if both URLs need to exist.

## Next Steps

Audit your site for canonical and redirect usage. Use **Screaming Frog** to identify pages with canonicals and check if redirects would be more appropriate (e.g., deleted pages). Use **Google Search Console > Coverage** to find indexing issues caused by canonical/redirect conflicts. For related guidance, see [Canonical Tag Implementation Guide](/articles/canonical-tag-implementation-guide.html), [301 vs 302 Redirects for SEO](/articles/301-vs-302-redirects-seo.html), and [Fix Duplicate Content Fast](/articles/fix-duplicate-content-fast.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
