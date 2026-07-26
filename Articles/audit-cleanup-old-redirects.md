---
title:: How to Audit and Clean Up Old Redirects
description:: Old redirects accumulate into chains, loops, and dead ends. Audit your redirect map, flatten chains, remove obsolete redirects, and recover wasted link equity.
focus_keyword:: audit clean up old redirects
category:: technical
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Audit and Clean Up Old Redirects

> **Quick Summary**
> - **What this covers:** Old redirects accumulate into chains, loops, and dead ends. Audit your redirect map, flatten chains, remove obsolete redirects, and recover wasted link equity.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why Old Redirects Become Problems](#why-old-redirects-become-problems)
- [Redirect Audit Process](#redirect-audit-process)
- [How to Clean Up Redirects](#how-to-clean-up-redirects)
- [Platform-Specific Cleanup](#platform-specific-cleanup)
- [How Often to Audit Redirects](#how-often-to-audit-redirects)
- [Redirect Cleanup Checklist](#redirect-cleanup-checklist)
- [Tools for Redirect Audits](#tools-for-redirect-audits)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Redirects accumulate over time. You migrate a site, rename URLs, consolidate pages, delete old content. Each change adds a redirect. Years later, you have hundreds of redirects, some chaining across 3-4 hops, some pointing to 404s, some duplicating each other. This mess wastes link equity, confuses crawlers, and slows down page load times.

An effective redirect audit identifies redirect chains, loops, orphaned redirects, and obsolete rules. Cleaning them up consolidates link equity, reduces server load, and improves crawl efficiency. This guide walks through the audit process and shows how to clean up redirects across different platforms.

## Why Old Redirects Become Problems

### Problem 1: Redirect Chains

A chain occurs when one redirect points to another redirect:

```
https://example.com/old-page (301) →
https://example.com/renamed-page (301) →
https://example.com/final-page
```

Each hop in the chain dilutes link equity and adds latency. Google may stop following the chain after 3-5 hops, abandoning the final destination entirely.

### Problem 2: Redirect Loops

A loop occurs when redirects circle back to themselves:

```
https://example.com/page-a (301) →
https://example.com/page-b (301) →
https://example.com/page-a
```

Browsers and bots abandon the request, returning an error. Users see "Too many redirects" messages.

### Problem 3: Redirects to 404s

Old redirects point to pages that no longer exist:

```
https://example.com/deleted-page (301) →
https://example.com/target-page (404)
```

This wastes link equity. Any backlinks or internal links to `deleted-page` end up at a 404.

### Problem 4: Temporary Redirects Left Permanent

A 302 redirect implemented for A/B testing or a seasonal campaign is never removed. Google treats it as temporary indefinitely, never consolidating link equity.

### Problem 5: Accumulation Bloat

Sites with frequent content changes accumulate thousands of redirects over years. Each redirect consumes server resources. Large redirect files slow down .htaccess parsing or CMS query times.

## Redirect Audit Process

### Step 1: Export All Redirects

Collect every redirect rule from all sources.

**Apache (.htaccess):**
```bash
cat .htaccess | grep -E "Redirect|RewriteRule"
```

**Nginx (nginx.conf):**
```bash
grep -E "return 301|return 302|rewrite" /etc/nginx/nginx.conf
```

**WordPress (Redirection plugin):**
1. Go to **Tools > Redirection > Groups**
2. Click **Export** and download CSV

**Shopify:**
1. **Online Store > Navigation > URL Redirects**
2. Click **Export** to download CSV

**Cloudflare (Page Rules):**
1. **Rules > Page Rules**
2. Manually document forwarding URL rules (no bulk export)

### Step 2: Crawl Your Site

Run a full crawl with **Screaming Frog SEO Spider**:

1. Enter your domain
2. Enable **Spider > Configuration > Spider > Advanced > Always Follow Redirects**
3. Run the crawl
4. Go to **Response Codes > Redirection (3xx)**
5. Export the list

This shows all redirects discovered during the crawl.

### Step 3: Identify Redirect Chains

In Screaming Frog:

1. Go to **Response Codes > Redirection (3xx)**
2. Click **Bulk Export > Response Codes > Redirect Chains**
3. Open the exported CSV

Each chain shows the full redirect path from start to final destination.

**Example chain:**
```
/old-url → /renamed-url → /final-url
```

### Step 4: Find Redirects to 404s

Filter Screaming Frog results for redirects whose target returns a 404:

1. Export **Redirection (3xx)** list
2. Cross-reference with **Client Error (4xx)** list
3. Find redirects pointing to 404 URLs

Alternatively, use **Screaming Frog > Bulk Export > Redirect Chains** and look for chains ending in 404.

### Step 5: Check for Redirect Loops

Loops typically cause crawl errors. Check **Screaming Frog > Response Codes > Error (Too Many Redirects)**.

Alternatively, test manually:

```bash
curl -L https://yoursite.com/suspected-loop
```

If it hangs or returns "Too many redirects," you have a loop.

### Step 6: Identify Temporary Redirects (302s)

Filter for 302 status codes in Screaming Frog. Review each 302:
- Is it genuinely temporary (A/B test, seasonal redirect)?
- Or should it be a permanent 301?

Change long-standing 302s to 301s.

## How to Clean Up Redirects

### Fix 1: Flatten Redirect Chains

Change chained redirects to point directly to the final destination.

**Before:**
```
/page-v1 → /page-v2 → /page-v3
```

**After:**
```
/page-v1 → /page-v3
/page-v2 → /page-v3
```

**Apache (.htaccess) example:**

Before:
```apache
Redirect 301 /page-v1 https://example.com/page-v2
Redirect 301 /page-v2 https://example.com/page-v3
```

After:
```apache
Redirect 301 /page-v1 https://example.com/page-v3
Redirect 301 /page-v2 https://example.com/page-v3
```

### Fix 2: Remove or Update Redirects to 404s

If a redirect points to a 404, either:

**Option A:** Redirect to a relevant live page (category, parent page, homepage)
```apache
Redirect 301 /old-product https://example.com/products
```

**Option B:** Remove the redirect entirely and let it 404 naturally (if it has no backlinks or traffic)

Check backlinks first using **Ahrefs** or **Google Search Console > Links > Top linking sites**. Don't remove redirects with active backlinks.

### Fix 3: Break Redirect Loops

Identify the conflicting redirect rules and remove the circular logic.

**Example loop:**
```apache
Redirect 301 /page-a https://example.com/page-b
Redirect 301 /page-b https://example.com/page-a
```

**Fix:** Determine the correct target and remove the circular rule:
```apache
Redirect 301 /page-a https://example.com/page-b
# Remove the second rule
```

### Fix 4: Convert 302s to 301s

Change temporary redirects to permanent if the move is permanent.

**Before:**
```apache
Redirect 302 /old-page https://example.com/new-page
```

**After:**
```apache
Redirect 301 /old-page https://example.com/new-page
```

In WordPress Redirection plugin, edit the redirect and change the type from **302 - Found** to **301 - Moved Permanently**.

### Fix 5: Remove Obsolete Redirects

Redirects older than 1 year with zero traffic and zero backlinks can be removed.

**How to check:**
1. **Google Analytics**. Filter for redirected URLs, check sessions in last 12 months
2. **Ahrefs** or **Semrush**. Check referring domains to redirected URL
3. **Google Search Console > Links**. Check if any external links point to the old URL

If traffic + backlinks = 0, remove the redirect.

**Exception:** Keep redirects for URLs in external directories, citations, or printed materials (business cards, brochures) even if they show zero traffic.

### Fix 6: Consolidate Duplicate Redirects

Sometimes multiple redirect rules point to the same target or conflict.

**Example duplicates:**
```apache
Redirect 301 /old-page https://example.com/new-page
RedirectMatch 301 /old-page https://example.com/new-page
```

**Fix:** Keep the most efficient rule (usually `Redirect` over `RedirectMatch` for simple one-to-one redirects). Remove duplicates.

## Platform-Specific Cleanup

### WordPress (Redirection Plugin)

1. **Tools > Redirection > Redirects**
2. Sort by **Last Hit** (shows when the redirect was last triggered)
3. Filter for redirects with "Last Hit: Never" or dates older than 1 year
4. Check traffic/backlinks, then delete unused redirects
5. For chains, edit the source redirect to point to the final destination

### Shopify

1. **Online Store > Navigation > URL Redirects**
2. Export current redirects to CSV
3. Use **Ahrefs** or **Google Search Console** to check backlinks for each redirected URL
4. Remove redirects with zero backlinks and zero traffic
5. For chains, update the "Redirect from" URL to point directly to the final "Redirect to" URL

### Apache (.htaccess)

1. Make a backup: `cp .htaccess .htaccess.backup`
2. Open `.htaccess` in a text editor
3. Remove obsolete redirects
4. Flatten chains by updating redirect targets
5. Test changes:

```bash
curl -I https://yoursite.com/old-url
```

Look for `Location:` header pointing to the correct final destination.

### Nginx (nginx.conf)

1. Backup config: `sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup`
2. Edit config: `sudo nano /etc/nginx/nginx.conf`
3. Update `return 301` rules to point directly to final destinations
4. Remove obsolete rules
5. Test config: `sudo nginx -t`
6. Reload: `sudo systemctl reload nginx`

### Cloudflare Page Rules

Cloudflare limits Page Rules (3 on free plan, 20-125 on paid). Prioritize high-traffic redirects. Remove low-traffic rules.

1. **Rules > Page Rules**
2. Identify low-traffic redirects using **Analytics > Traffic**
3. Delete or update rules
4. Test changes by visiting the old URL

## How Often to Audit Redirects

- **After every site migration**. Verify all redirects are implemented correctly and no chains exist
- **Quarterly for active sites**. Catch redirect issues before they accumulate
- **Annually for stable sites**. Remove obsolete redirects and flatten chains

## Redirect Cleanup Checklist

Use this checklist for systematic cleanup:

- [ ] Export all redirects from .htaccess, CMS, or server config
- [ ] Crawl site with Screaming Frog, export redirect report
- [ ] Identify and flatten redirect chains (A → B → C becomes A → C, B → C)
- [ ] Find redirects to 404s, update target or remove redirect
- [ ] Check for redirect loops, remove circular rules
- [ ] Convert long-standing 302s to 301s
- [ ] Remove redirects older than 1 year with zero traffic and zero backlinks
- [ ] Test a sample of redirects using `curl -I` to verify status codes
- [ ] Update internal links to bypass redirects (link directly to final destination)
- [ ] Monitor Google Search Console for crawl errors related to redirects

## Tools for Redirect Audits

| Tool | Use Case | Cost |
|------|----------|------|
| **Screaming Frog** | Crawl site, identify chains and 404 targets | Free (500 URLs) / Paid ($259/year) |
| **Ahrefs** | Check backlinks to redirected URLs | Paid ($129+/month) |
| **Google Search Console** | Monitor crawl errors, check backlinks | Free |
| **Redirect Path (Chrome extension)** | Manually test redirects in browser | Free |
| **curl** | Command-line redirect testing | Free |


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why Old Redirects Become Problems:** A chain occurs when one redirect points to another redirect:
* **Redirect Audit Process:** Collect every redirect rule from all sources.
* **How to Clean Up Redirects:** Change chained redirects to point directly to the final destination.
* **How Often to Audit Redirects:** Use this checklist for systematic cleanup:
* **Redirect Cleanup Checklist:** Use this checklist for systematic cleanup:

## Frequently Asked Questions

### How many redirect hops are too many?

Google recommends no more than 2 hops (source → intermediate → final). Beyond that, link equity dilutes and crawl efficiency drops. Flatten any chain longer than 1 hop.

### Should I remove old redirects with backlinks?

No. Even if traffic is zero, redirects with backlinks should be kept to preserve link equity. Only remove redirects with zero backlinks AND zero traffic.

### Can I delete all 302 redirects and replace them with 301s?

Not all. If a 302 is genuinely temporary (A/B test, seasonal campaign), keep it as a 302. Convert only the 302s that represent permanent changes.

### Do redirects slow down my site?

Yes, slightly. Each redirect adds latency (50-200ms per hop). Chains multiply this delay. Flattening chains and removing unnecessary redirects reduces load time.

### What's the fastest way to fix redirect chains?

Export the chain report from Screaming Frog, identify the final destination for each chain, then update the source redirect to point directly to the final URL. For large chains, write a script to batch-update redirect rules.

## Next Steps

Crawl your site with **Screaming Frog** and export the **Redirect Chains** report. Flatten any chains you find by updating redirect rules to point directly to final destinations. Check **Google Search Console > Coverage** for any redirect-related errors. For related redirect guidance, see [Find and Fix Redirect Chains](/articles/find-fix-redirect-chains.html), Redirect Chain Audit with Screaming Frog, and [Site Migration SEO Checklist](/articles/site-migration-seo-checklist.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
