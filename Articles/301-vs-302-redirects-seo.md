---
title:: 301 vs 302 Redirects for SEO: When to Use Each
description:: 301 redirects pass link equity. 302 redirects don't signal permanence. Choose wrong and you leak rankings. This guide shows when to use each redirect type.
focus_keyword:: 301 vs 302 redirects SEO
category:: technical
author:: Victor Valentine Romo
date:: 2026.03.20
---

# 301 vs 302 Redirects for SEO: When to Use Each

> **Quick Summary**
> - **What this covers:** 301 redirects pass link equity. 302 redirects don't signal permanence. Choose wrong and you leak rankings. This guide shows when to use each redirect type.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [How HTTP Redirects Work](#how-http-redirects-work)
- [When to Use a 301 Redirect](#when-to-use-a-301-redirect)
- [When to Use a 302 Redirect](#when-to-use-a-302-redirect)
- [Common Redirect Mistakes](#common-redirect-mistakes)
- [How to Implement Redirects](#how-to-implement-redirects)
- [Redirect Audit Process](#redirect-audit-process)
- [301 vs 302: Decision Matrix](#301-vs-302-decision-matrix)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


A 301 redirect tells Google "this page moved permanently — transfer all ranking signals to the new URL." A 302 redirect says "this page moved temporarily — keep the old URL in your index." Choose the wrong redirect type and you leak link equity, confuse crawlers, and watch rankings crater for no apparent reason.

Most redirects you implement should be 301s. But there are specific scenarios where a 302 is the correct choice. This guide breaks down both redirect types, shows when to use each, and walks through implementation for common platforms.

## How HTTP Redirects Work

When a browser or bot requests a URL, the server responds with an HTTP status code. Redirect codes sit in the 300 range:

- **301 Moved Permanently**. The resource has permanently moved to a new URL
- **302 Found (Moved Temporarily)**. The resource temporarily exists at a different URL
- **307 Temporary Redirect**. Same as 302 but preserves HTTP method (POST stays POST)
- **308 Permanent Redirect**. Same as 301 but preserves HTTP method

For SEO purposes, **301** and **302** are what you'll use 99% of the time.

### What Happens During a Redirect

1. Browser requests `https://yoursite.com/old-page`
2. Server responds with status code (301 or 302) and a `Location` header pointing to the new URL
3. Browser automatically goes to the new URL
4. If it's a 301, **Googlebot** notes this is permanent and transfers ranking signals to the new URL
5. If it's a 302, **Googlebot** keeps the old URL in the index and treats the new URL as temporary

### Link Equity Transfer

**301 redirects** pass approximately 90-99% of link equity to the target URL. Google treats the new URL as the replacement for the old URL. Backlinks pointing to the old URL get attributed to the new URL.

**302 redirects** historically did not pass link equity because Google interpreted them as temporary. In recent years, Google has stated that 302s pass link equity similar to 301s, but the old URL remains in the index. This creates ambiguity. Google may rank either the old or new URL depending on other signals.

**The rule:** Use 301s for permanent moves. Use 302s only when the redirect is genuinely temporary and you plan to revert.

## When to Use a 301 Redirect

### Scenario 1: Permanent URL Changes

You renamed a page, changed your URL structure, or reorganized your site architecture. The old URL will never come back.

```
Old: https://yoursite.com/services/seo-optimization
New: https://yoursite.com/seo-services
```

Implement a 301 redirect. This tells Google the old URL no longer exists and all ranking signals should transfer to the new URL.

### Scenario 2: Site Migrations

You're moving to a new domain, switching from HTTP to HTTPS, or consolidating multiple sites into one. Every old URL should 301 redirect to its corresponding new URL.

```
Old: http://oldsite.com/page
New: https://newsite.com/page
```

Map every old URL to its new equivalent and implement 301 redirects. See [Redirect Mapping for Site Migration](/articles/redirect-mapping-site-migration.html) for the full process.

### Scenario 3: Deleting Pages Without a Replacement

A page is being removed and has no direct replacement. If the page has backlinks or traffic, 301 redirect it to the most relevant existing page (usually the parent category or homepage).

```
Deleted: https://yoursite.com/outdated-service
Redirect to: https://yoursite.com/services
```

Don't leave it as a 404 if the page has accumulated link equity.

### Scenario 4: Consolidating Duplicate Content

You have two pages targeting the same topic. Merge them into one comprehensive page and 301 redirect the weaker page to the stronger one.

```
Weak: https://yoursite.com/seo-tips
Strong: https://yoursite.com/seo-guide
```

This consolidates link equity and eliminates keyword cannibalization.

### Scenario 5: WWW vs. Non-WWW or Trailing Slash Fixes

Pick one version and redirect all variations to it via 301.

```
Redirect: https://www.yoursite.com/page/
To: https://yoursite.com/page
```

Implement this sitewide via server configuration or .htaccess rules.

## When to Use a 302 Redirect

### Scenario 1: A/B Testing

You're running a split test and temporarily redirecting a percentage of traffic to a variant page. Once the test concludes, the redirect will be removed.

```
Original: https://yoursite.com/landing-page
Test variant: https://yoursite.com/landing-page-v2
```

Use a 302 so Google continues indexing the original URL. Google has guidelines for A/B testing redirects, use the `rel="canonical"` tag on test variants pointing back to the original.

### Scenario 2: Temporary Product or Service Unavailability

A product is out of stock and you want to redirect users to an alternative. Once restocked, the redirect will be removed.

```
Temporarily unavailable: https://yoursite.com/product/widget-2024
Redirect to: https://yoursite.com/product/widget-2025
```

Use a 302 to indicate the original URL will return. Set the product page to return when inventory is replenished.

### Scenario 3: Seasonal Campaigns

You redirect a generic URL to a holiday-specific landing page during a promotional period. After the campaign, the redirect is removed.

```
During campaign: https://yoursite.com/offers → https://yoursite.com/black-friday-sale
After campaign: https://yoursite.com/offers (back to original page)
```

A 302 signals this is temporary.

### Scenario 4: Site Maintenance

Your site is down for maintenance and you redirect users to a maintenance page. Once maintenance completes, the redirect is removed.

```
During maintenance: https://yoursite.com/* → https://yoursite.com/maintenance
```

Use a 302 or serve a 503 status code with a `Retry-After` header.

### Scenario 5: Geo-Targeted Redirects

Users are redirected based on location, but the original URL still exists for other regions.

```
US users: https://yoursite.com/product → https://yoursite.com/us/product
UK users: https://yoursite.com/product → https://yoursite.com/uk/product
```

Use 302 because the redirect depends on the user's location and isn't permanent for all users. Better yet, avoid redirects and use **hreflang** tags for international targeting.

## Common Redirect Mistakes

### Mistake 1: Using 302 When You Mean 301

The most common error. Developers default to 302 redirects because they're easier to implement or reverse. But if the move is permanent, this wastes link equity and delays ranking consolidation.

**How to check:** Use a redirect checker or inspect with `curl`:

```bash
curl -sI https://yoursite.com/old-page | grep -i "HTTP\|Location"
```

Look for `HTTP/1.1 301` or `HTTP/1.1 302`.

### Mistake 2: Redirect Chains

Page A redirects to Page B, which redirects to Page C. Google follows redirect chains but it's inefficient and can cause link equity loss.

**Fix:** Redirect directly to the final destination:

```
Bad: A → B → C
Good: A → C
```

See [Find and Fix Redirect Chains](/articles/find-fix-redirect-chains.html) for detection and repair.

### Mistake 3: Redirecting Everything to the Homepage

When shutting down a site or deleting pages, lazy implementations redirect all URLs to the homepage. This provides a poor user experience and wastes link equity.

**Fix:** Map each old URL to the most relevant new URL:

```
Old: https://yoursite.com/category/product
New: https://yoursite.com/category (not homepage)
```

### Mistake 4: Not Updating Internal Links

You implement redirects but leave internal links pointing to old URLs. This forces users and bots to follow redirects unnecessarily, slowing page speed and crawl efficiency.

**Fix:** Update internal links to point directly to the new URL. Use **Screaming Frog** to find all internal links to redirected URLs and update them.

### Mistake 5: Redirect Loops

Page A redirects to Page B, and Page B redirects back to Page A. This creates an infinite loop.

```bash
# Check for loops
curl -L https://yoursite.com/page
```

If it never resolves, you have a redirect loop. Browsers and bots will abandon the request.

## How to Implement Redirects

### Apache (.htaccess)

Place this in your `.htaccess` file:

```apache
# 301 Redirect
Redirect 301 /old-page https://yoursite.com/new-page

# 302 Redirect
Redirect 302 /temporary-page https://yoursite.com/current-page

# Redirect entire directory
RedirectMatch 301 ^/old-category/(.*)$ https://yoursite.com/new-category/$1
```

For more complex rules, see [.htaccess Redirect Rules Guide](/articles/htaccess-redirect-rules-guide.html).

### Nginx

Add to your server block configuration:

```nginx
# 301 Redirect
location /old-page {
    return 301 https://yoursite.com/new-page;
}

# 302 Redirect
location /temporary-page {
    return 302 https://yoursite.com/current-page;
}

# Redirect with regex
location ~ ^/old-category/(.*)$ {
    return 301 https://yoursite.com/new-category/$1;
}
```

### WordPress (Plugin)

Install **Redirection** plugin:

1. Go to **Tools > Redirection**
2. Add new redirect
3. Enter source URL and target URL
4. Select redirect type (301 or 302)
5. Save

Alternatively, use **Yoast SEO Premium**, it has built-in redirect management.

### Shopify

Shopify's redirect interface only supports 301 redirects:

1. Go to **Online Store > Navigation > URL Redirects**
2. Click **Add URL redirect**
3. Enter old URL and new URL
4. Save (automatically 301)

For 302 redirects on Shopify, you need to edit `theme.liquid` and add custom Liquid code or use a third-party app.

### JavaScript (Not Recommended for SEO)

JavaScript redirects execute client-side after the page loads. Bots may or may not execute JavaScript, so these are unreliable for SEO.

```javascript
// 301-equivalent (not true server-side 301)
window.location.replace("https://yoursite.com/new-page");

// 302-equivalent
window.location.href = "https://yoursite.com/new-page";
```

**Use server-side redirects whenever possible.**

## Redirect Audit Process

### Step 1: Crawl Your Site

Run a **Screaming Frog** crawl with "Follow Redirects" enabled. Export the **Redirect Chains** and **Redirects** reports.

### Step 2: Identify Redirect Type

Check each redirect's status code:
- 301 = permanent
- 302 = temporary

Verify that temporary redirects are temporary. If a 302 has been in place for months, it should probably be a 301.

### Step 3: Check for Chains and Loops

Look for redirect chains (A → B → C) and loops (A → B → A). Fix these by redirecting directly to the final destination.

### Step 4: Verify Internal Links

Filter for internal links pointing to redirected URLs. Update these links to point directly to the final destination.

### Step 5: Test in Google Search Console

Use **URL Inspection** to check how Google sees redirected URLs. If Google still indexes the old URL despite a 301, investigate why. Common causes:
- Redirect was recently implemented (Google hasn't recrawled yet)
- Conflicting signals (sitemap contains old URL, internal links point to old URL)
- Redirect chain or loop

## 301 vs 302: Decision Matrix

| Situation | Redirect Type | Why |
|-----------|--------------|-----|
| Permanent URL change | 301 | Transfers link equity, removes old URL from index |
| Site migration | 301 | New domain/structure is permanent |
| Page deletion with no replacement | 301 | Redirect to most relevant page |
| A/B testing | 302 | Test variant is temporary |
| Seasonal campaign redirect | 302 | Campaign ends, redirect is removed |
| Product temporarily unavailable | 302 | Product will return to original URL |
| Geo-based redirect | 302 | Redirect varies by user location |
| Maintenance page | 302 or 503 | Site will return to normal |

**Default to 301 unless you have a specific reason to use 302.**


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **How HTTP Redirects Work:** When a browser or bot requests a URL, the server responds with an HTTP status code.
* **When to Use a 301 Redirect:** You renamed a page, changed your URL structure, or reorganized your site architecture.
* **When to Use a 302 Redirect:** You're running a split test and temporarily redirecting a percentage of traffic to a variant page.
* **Redirect Audit Process:** Run a Screaming Frog crawl with "Follow Redirects" enabled.

## Frequently Asked Questions

### Do 302 redirects pass link equity?

Google has stated that 302 redirects pass link equity similarly to 301s, but the old URL may remain in the index. This creates ambiguity. Google might rank either URL. For permanent changes, use 301 to ensure clean consolidation.

### How long should I keep 301 redirects in place?

Indefinitely. Once Google has transferred all ranking signals to the new URL (usually 6-12 months), the redirect's SEO importance decreases, but removing it breaks backlinks and direct traffic. Keep redirects in place unless the old URL has zero traffic and zero backlinks.

### Can I change a 302 to a 301?

Yes. If you implemented a 302 but the move turned out to be permanent, change it to a 301. Google will reprocess the redirect and transfer link equity. Allow a few weeks for Google to recrawl and update its index.

### What happens if I redirect a 301 to another 301?

You create a redirect chain. Each hop in the chain dilutes link equity slightly and slows down page load. Redirect directly to the final destination instead of chaining redirects.

### Should I redirect old 404 pages?

If the 404 page once had traffic or backlinks, yes, redirect it to the most relevant page. If it's a junk page with no history, leave it as a 404 or serve a 410 Gone status to signal it's permanently deleted.

## Next Steps

Audit your current redirects. Run a **Screaming Frog** crawl and export the Redirects report. Check each 302 redirect, if it's been in place for more than 6 months and the change is permanent, switch it to a 301. Fix any redirect chains by updating redirects to point directly to the final destination.

For advanced redirect scenarios, see Redirect Chain Audit with Screaming Frog and [Site Migration SEO Checklist](/articles/site-migration-seo-checklist.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
