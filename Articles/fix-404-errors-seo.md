---

---
title:: How to Fix 404 Errors That Hurt Your SEO
description:: 404 errors bleed link equity and waste crawl budget. Find the ones that matter, fix them with redirects, and stop losing rankings. Step-by-step guide inside.
focus_keyword:: fix 404 errors SEO
category:: technical
author:: Victor Valentine Romo
date:: 2026.03.20

# How to Fix 404 Errors That Hurt Your SEO

> **Quick Summary**
> - **What this covers:** fix-404-errors-seo
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why 404 Errors Damage Your Rankings](#why-404-errors-damage-your-rankings)
- [Step 1: Find Your 404 Errors (5 Minutes)](#step-1-find-your-404-errors-5-minutes)
- [Step 2: Prioritize Which 404s to Fix (10 Minutes)](#step-2-prioritize-which-404s-to-fix-10-minutes)
- [Step 3: Implement 301 Redirects (15 Minutes)](#step-3-implement-301-redirects-15-minutes)
- [Step 4: Fix Broken Internal Links (10 Minutes)](#step-4-fix-broken-internal-links-10-minutes)
- [Step 5: Create a Custom 404 Page (10 Minutes)](#step-5-create-a-custom-404-page-10-minutes)
- [Step 6: Monitor Going Forward](#step-6-monitor-going-forward)
- [Common 404 Fix Mistakes](#common-404-fix-mistakes)
- [404 Errors and JavaScript-Rendered Sites](#404-errors-and-javascript-rendered-sites)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


A 404 error means a URL on your site returns "page not found." Not all 404s damage your rankings, some are expected and harmless. The dangerous ones are the 404s that sit on pages with backlinks, pages that used to receive organic traffic, and pages that other pages on your site still link to internally.

Those 404s hemorrhage link equity, waste **Googlebot's** crawl budget, and send visitors into dead ends. Fixing the right 404s can recover lost rankings within days.

## Why 404 Errors Damage Your Rankings

### Link Equity Evaporates

When an external site links to your page and that page returns a 404, the link equity, the ranking power passed through that backlink, disappears. It doesn't redistribute to other pages. It vanishes. A single high-authority backlink from a DA 70+ site, lost to a 404, can represent months of link building work destroyed.

**Google's John Mueller** has confirmed that 404 pages do not pass PageRank. Every backlink pointing to a dead page is a backlink that does nothing for your site.

### Internal Links Create Dead Ends

Internal links pointing to 404 pages create a broken user experience and waste crawl equity. When **Googlebot** follows an internal link and hits a 404, that crawl is wasted. Multiply this across dozens of internal links pointing to deleted pages, and you have a meaningful drag on crawl efficiency.

### User Experience Tanks

Visitors who land on a 404 page bounce. Your bounce rate rises, dwell time drops, and **Google Analytics** records another failed visit. While Google claims bounce rate isn't a direct ranking signal, the behavioral pattern of users consistently hitting dead ends and returning to search results does trigger pogo-sticking signals.

## Step 1: Find Your 404 Errors (5 Minutes)

### Method 1: Google Search Console

Open **Google Search Console** and go to **Indexing > Pages**. Look for URLs categorized under "Not found (404)" in the error section. Export this entire list, you'll need it for prioritization.

**GSC** shows you 404s that **Googlebot** actively attempted to crawl. These are the 404s Google knows about and cares about.

### Method 2: Screaming Frog Crawl

Run a full crawl of your site with **Screaming Frog SEO Spider**:

1. Enter your homepage URL and start the crawl
2. Once complete, go to **Response Codes > Client Error (4xx)**
3. Export the full list of 4xx URLs
4. Switch to the **Inlinks** tab to see which pages link to each 404

**Screaming Frog** catches 404s that GSC might miss, particularly internal 404s created by broken links within your own site.

### Method 3: Ahrefs Broken Backlinks Report

Open **Ahrefs Site Explorer**, enter your domain, and go to **Backlinks > Broken**. This report shows every external backlink pointing to a page that returns a 404. These are your highest-priority fixes because each one represents lost external link equity.

Sort by **Domain Rating** to prioritize the most valuable lost backlinks first.

## Step 2: Prioritize Which 404s to Fix (10 Minutes)

Not every 404 deserves a redirect. Fix them in this order:

### Priority 1: 404s With External Backlinks

These are actively losing link equity. Every day they remain broken, you lose ranking power.

**Criteria for Priority 1:**
- Has at least one external backlink (check **Ahrefs** or **Moz**)
- The referring domain has a Domain Rating above 20
- The backlink was followed (not nofollow)

### Priority 2: 404s With Historical Traffic

Check **Google Analytics** or **Google Search Console** historical data for URLs that previously received organic traffic. A page that used to rank for a keyword and now returns 404 is a page you're actively losing traffic on.

### Priority 3: 404s With Internal Links

Broken internal links waste crawl budget and create bad user experience. These should be fixed by either:
- Redirecting the 404 URL to a relevant replacement
- Updating the internal link to point to the correct destination

### Priority 4: Everything Else

404s with no backlinks, no historical traffic, and no internal links pointing to them are harmless. Leave them alone. Google will eventually stop crawling them.

## Step 3: Implement 301 Redirects (15 Minutes)

For every Priority 1 and Priority 2 URL, implement a 301 redirect to the most relevant existing page on your site.

### Apache (.htaccess)

```apache
# Individual 301 redirects
Redirect 301 /old-product-page https://yoursite.com/current-product-page
Redirect 301 /deleted-blog-post https://yoursite.com/updated-blog-post

# Pattern-based redirects for entire sections
RedirectMatch 301 ^/old-blog/(.*) https://yoursite.com/blog/$1
```

### Nginx

```nginx
# Individual redirects
location = /old-product-page {
    return 301 https://yoursite.com/current-product-page;
}

# Pattern-based redirects
location ~* ^/old-blog/(.*) {
    return 301 https://yoursite.com/blog/$1;
}
```

### WordPress (PHP)

If you're on **WordPress**, use the **Redirection** plugin or add to your theme's `functions.php`:

```php
// In wp-config.php or functions.php
function custom_redirects() {
    $redirects = array(
        '/old-page' => '/new-page',
        '/deleted-post' => '/replacement-post',
    );

    $request = $_SERVER['REQUEST_URI'];
    $path = parse_url($request, PHP_URL_PATH);

    if (isset($redirects[$path])) {
        wp_redirect(site_url($redirects[$path]), 301);
        exit;
    }
}
add_action('template_redirect', 'custom_redirects');
```

### Critical Redirect Rules

**Map to relevant pages.** Redirect `/old-running-shoes-review` to your current running shoes page, not your homepage. Google treats mass homepage redirects as soft 404s.

**Never redirect to a page that also 404s.** Check that every redirect target resolves before implementing.

**Avoid redirect chains.** If Page A already redirects to Page B, don't redirect a 404 to Page A. Redirect directly to Page B.

## Step 4: Fix Broken Internal Links (10 Minutes)

Open the **Screaming Frog** crawl data from Step 1. For each 404 URL, check the **Inlinks** tab to see which pages on your site link to the dead URL.

You have two options:

1. **Update the internal link** to point to the redirect destination directly (preferred, avoids the redirect hop)
2. **Remove the internal link** if no relevant replacement exists

For **WordPress** sites, the **Broken Link Checker** plugin automates detection. For static sites, run a grep across your HTML or markdown files:

```bash
grep -rn "href=\"/old-page\"" ./content/
```

Replace every instance with the correct destination URL.

## Step 5: Create a Custom 404 Page (10 Minutes)

Your default 404 page is almost certainly a blank white page or a generic server error. Replace it with a custom 404 page that:

1. **Confirms the page doesn't exist**, clear messaging, no confusion
2. **Provides a search bar**, let visitors find what they were looking for
3. **Links to popular content**, your top 5-10 most visited pages
4. **Maintains your site design**, same header, footer, navigation
5. **Returns a proper 404 status code**, do not return 200 with a "page not found" message (that creates soft 404s)

A good custom 404 page recovers 10-15% of visitors who would otherwise bounce immediately.

## Step 6: Monitor Going Forward

### Set Up Crawl Error Alerts

In **Google Search Console**, the **Indexing > Pages** report updates regularly. Check it weekly.

For real-time monitoring, configure server-side 404 logging:

```nginx
# Nginx: Log 404s to a separate file
error_log /var/log/nginx/404.log;

# Then filter for 404s
if ($status = 404) {
    access_log /var/log/nginx/404_access.log;
}
```

### Schedule Monthly Crawls

Run a **Screaming Frog** crawl monthly to catch new broken links before they accumulate. Set a calendar reminder. The crawl takes minutes for sites under 10,000 pages.

### Watch for New Backlinks to Dead Pages

Set up a monthly check in **Ahrefs** or **Google Search Console** for new backlinks pointing to non-existent URLs. When someone links to a page you deleted, add the redirect immediately.

## Common 404 Fix Mistakes

### Mistake 1: Redirecting Everything to the Homepage

This is the most common error. When you redirect 50 different product pages to your homepage, Google interprets all 50 as soft 404s. The link equity from those backlinks is effectively discarded.

**Instead:** Map each 404 to the most topically relevant replacement page. If no relevant page exists, create one.

### Mistake 2: Using 302 Instead of 301

A 302 redirect tells Google the move is temporary. Google may continue to index the old URL and not pass full link equity. Use 301 for permanent redirects.

### Mistake 3: Ignoring Soft 404s

A soft 404 returns a 200 status code but displays "page not found" content. **Google Search Console** flags these under **Indexing > Pages** as "Soft 404." These are worse than real 404s because Google wastes crawl budget rendering and evaluating pages that provide no value.

**Fix:** Either return a proper 404 status code or add real content to the page.

### Mistake 4: Creating Redirect Chains

If `/page-a` redirects to `/page-b` and `/page-b` redirects to `/page-c`, you have a redirect chain. Each hop loses a small amount of link equity and adds latency. Flatten chains so every redirect points directly to the final destination.

Read more about redirect chain cleanup in [How to Find and Fix Redirect Chains](/articles/fix-redirect-chains.html).

## 404 Errors and JavaScript-Rendered Sites

Single-page applications built with **React**, **Vue**, or **Angular** often return a 200 status code for every URL, even non-existent ones, because the server sends the same JavaScript bundle regardless of the requested path. The client-side router then displays a "not found" message.

Google sees a 200 status code, renders the page, finds minimal content, and flags it as a soft 404.

**Fix:** Configure server-side rendering or static generation to return proper 404 status codes for non-existent URLs. In **Next.js**, use `notFound: true` in `getServerSideProps`. In **Nuxt.js**, throw a 404 error in the route handler.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why 404 Errors Damage Your Rankings:** When an external site links to your page and that page returns a 404, the link equity, the ranking power passed through that backlink, disappears.
* **Step 1: Find Your 404 Errors (5 Minutes):** Open Google Search Console and go to Indexing > Pages.
* **Step 3: Implement 301 Redirects (15 Minutes):** For every Priority 1 and Priority 2 URL, implement a 301 redirect to the most relevant existing page on your site.
* **Step 4: Fix Broken Internal Links (10 Minutes):** Open the Screaming Frog crawl data from Step 1.
* **Step 5: Create a Custom 404 Page (10 Minutes):** Your default 404 page is almost certainly a blank white page or a generic server error.

## Frequently Asked Questions

### Do 404 errors directly hurt my Google rankings?

A 404 on a page with no backlinks and no internal links has zero ranking impact. The damage comes when 404s exist on pages that previously had link equity, traffic, or internal links. Those 404s actively lose ranking power that was being passed through the deleted page.

### How long should I keep 301 redirects active?

Keep redirects active for at least one year. Google recrawls URLs at varying intervals, and external sites may update their links slowly. After a year, most link equity will have been consolidated. Removing redirects too early re-exposes the 404 and loses whatever equity the redirect was preserving.

### Should I fix 404s from pages I intentionally deleted?

If the deleted page had backlinks or was receiving traffic, yes, redirect it to the closest relevant page. If it had neither, a 404 is the correct response. Google explicitly states that 404s are a normal part of the web and don't inherently harm your site.

### Can too many 404 errors trigger a Google penalty?

No. There is no penalty for having 404 errors. However, a large volume of 404s (hundreds or thousands) wastes crawl budget and may signal to Google that your site is poorly maintained. The practical impact is reduced crawl efficiency, not a ranking penalty.

### What's the difference between a 404 and a 410?

A 404 means "not found" the page might come back. A 410 means "gone permanently" the page is intentionally and permanently removed. **Googlebot** will stop recrawling a 410 URL faster than a 404. Use 410 for pages you have no intention of restoring or redirecting.

## Next Steps

Fix your highest-priority 404s right now, the ones with external backlinks. That single action recovers more lost ranking power than any other fix on this list.

Then work through broken internal links, set up your custom 404 page, and establish a monthly monitoring process. 404 errors are a chronic condition, they'll keep appearing as content changes, URLs evolve, and external sites link to non-existent pages. The goal isn't zero 404s. It's zero *damaging* 404s.

For related fixes, see [Find and Fix Broken Links Fast](/articles/find-broken-links-fix-fast.html), [How to Create a Custom 404 Page That Saves SEO Value](/articles/custom-404-page-seo-guide.html), and [Fix Soft 404 Errors in Google Search Console](/articles/fix-soft-404-errors.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
