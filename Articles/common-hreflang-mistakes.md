---
title:: Common Hreflang Mistakes That Wreck International SEO
description:: Hreflang tags route users to the correct language version. Get them wrong and Google serves French content to English users or ignores your tags entirely.
focus_keyword:: common hreflang mistakes international SEO
category:: technical
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Common Hreflang Mistakes That Wreck International SEO

> **Quick Summary**
> - **What this covers:** Hreflang tags route users to the correct language version. Get them wrong and Google serves French content to English users or ignores your tags entirely.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why Hreflang Errors Kill International SEO](#why-hreflang-errors-kill-international-seo)
- [Mistake 1: Using Incorrect Language Codes](#mistake-1-using-incorrect-language-codes)
- [Mistake 2: Missing Return Links](#mistake-2-missing-return-links)
- [Mistake 3: No Self-Referencing Hreflang](#mistake-3-no-self-referencing-hreflang)
- [Mistake 4: Using Language-Only When Country Matters](#mistake-4-using-language-only-when-country-matters)
- [Mistake 5: Missing x-default](#mistake-5-missing-x-default)
- [Mistake 6: Conflicting Hreflang and Canonical](#mistake-6-conflicting-hreflang-and-canonical)
- [Mistake 7: Using Hreflang for Near-Duplicates (Not Translations)](#mistake-7-using-hreflang-for-near-duplicates-not-translations)
- [Mistake 8: Pointing Hreflang to Redirects or 404s](#mistake-8-pointing-hreflang-to-redirects-or-404s)
- [Mistake 9: Hreflang in HTTP Header Without HTML Tags](#mistake-9-hreflang-in-http-header-without-html-tags)
- [Mistake 10: Language-Script Code Errors](#mistake-10-language-script-code-errors)
- [Mistake 11: Incomplete Hreflang on Some Pages](#mistake-11-incomplete-hreflang-on-some-pages)
- [Mistake 12: Testing Hreflang Only After Launch](#mistake-12-testing-hreflang-only-after-launch)
- [How to Validate Hreflang](#how-to-validate-hreflang)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**Hreflang tags** tell Google which language and regional version of a page to serve based on user location and language settings. French user in Canada? Show `fr-CA`. English user in Australia? Show `en-AU`.

Get hreflang wrong and Google ignores your tags, serves the wrong version, or penalizes you for duplicate content. Traffic from international markets drops. Users bounce because content is in the wrong language.

This guide catalogs the 12 most common hreflang mistakes and how to fix them before they cost you rankings.

## Why Hreflang Errors Kill International SEO

### Google Ignores Invalid Hreflang

If your hreflang syntax is wrong (incorrect language codes, missing return links, conflicting canonicals), Google ignores the tags entirely and guesses which version to serve. Guesses are often wrong.

### Wrong Language Version Ranks

French content ranks for English queries (or vice versa). Users click, see the wrong language, and bounce. High bounce rate signals poor relevance, and rankings drop.

### Duplicate Content Without Hreflang

Multi-language sites with near-identical content risk duplicate content penalties if hreflang doesn't signal to Google that pages are translations, not duplicates.

## Mistake 1: Using Incorrect Language Codes

### The Error

Using 3-letter codes (`eng`, `fra`) or made-up codes (`en-uk`, `sp`) instead of **ISO 639-1** (language) and **ISO 3166-1 Alpha 2** (country).

**Wrong:**
```html
<link rel="alternate" hreflang="eng-us" href="https://example.com/en-us/" />
<link rel="alternate" hreflang="sp" href="https://example.com/es/" />
```

**Correct:**
```html
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/" />
<link rel="alternate" hreflang="es" href="https://example.com/es/" />
```

### Valid Language Codes

| Language | Code |
|---|---|
| English | en |
| Spanish | es |
| French | fr |
| German | de |
| Italian | it |
| Portuguese | pt |
| Japanese | ja |
| Chinese (Simplified) | zh-Hans |
| Chinese (Traditional) | zh-Hant |

### Valid Country Codes

| Country | Code |
|---|---|
| United States | US |
| United Kingdom | GB (not UK) |
| Canada | CA |
| Australia | AU |
| Mexico | MX |
| Spain | ES |
| France | FR |
| Germany | DE |

### The Fix

Use **ISO 639-1** for language, **ISO 3166-1 Alpha 2** for country. Language is lowercase, country is uppercase.

**Format:** `language-COUNTRY` (e.g., `en-US`, `fr-CA`, `es-MX`)

## Mistake 2: Missing Return Links

### The Error

Page A has hreflang pointing to Page B, but Page B doesn't have hreflang pointing back to Page A.

**Example:**

**Page A (en-US):**
```html
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/" />
```

**Page B (en-GB):**
```html
<!-- No hreflang tags -->
```

**Problem:** Google ignores hreflang if return links are missing.

### The Fix

Every page must link to **all other language versions, including itself**.

**Page A (en-US):**
```html
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en-us/" />
```

**Page B (en-GB):**
```html
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en-us/" />
```

Both pages link to each other and themselves.

## Mistake 3: No Self-Referencing Hreflang

### The Error

Page doesn't include hreflang pointing to itself.

**Wrong:**
```html
<!-- On en-US page -->
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/" />
```

**Problem:** Missing self-reference. Google may ignore tags.

### The Fix

Every page must include a self-referencing hreflang.

**Correct:**
```html
<!-- On en-US page -->
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/" />
```

## Mistake 4: Using Language-Only When Country Matters

### The Error

Using `hreflang="en"` for all English pages instead of `en-US`, `en-GB`, `en-CA`.

**Wrong:**
```html
<link rel="alternate" hreflang="en" href="https://example.com/en/" />
```

**Problem:** Google doesn't know which English-speaking country the page targets. It may serve US content to UK users (or vice versa).

### The Fix

Use **language + country** when targeting specific regions.

**Correct:**
```html
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/" />
<link rel="alternate" hreflang="en-ca" href="https://example.com/en-ca/" />
```

**Exception:** Use language-only (`hreflang="en"`) if you have one English version for **all** English speakers worldwide (not targeting specific countries).

## Mistake 5: Missing `x-default`

### The Error

No `x-default` hreflang. Google doesn't know which version to serve users from unspecified regions or languages.

**Example:** You have `en-US`, `en-GB`, `fr-FR`. User from Japan (no Japanese version) visits. Google guesses.

### The Fix

Add `x-default` as a fallback.

```html
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/" />
<link rel="alternate" hreflang="fr-fr" href="https://example.com/fr-fr/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en-us/" />
```

`x-default` should point to your primary or most universal version (usually English or homepage with language selector).

## Mistake 6: Conflicting Hreflang and Canonical

### The Error

Hreflang points to one page, but canonical points to a different page.

**Example:**

**Page A (en-US):**
```html
<link rel="canonical" href="https://example.com/en-gb/" />
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/" />
```

**Problem:** Conflicting signals. Canonical says "this page is a duplicate of en-GB," but hreflang says "this page is the en-US version." Google ignores hreflang.

### The Fix

Each language version should have a **self-referencing canonical**.

**Correct:**
```html
<!-- On en-US page -->
<link rel="canonical" href="https://example.com/en-us/" />
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/" />
```

## Mistake 7: Using Hreflang for Near-Duplicates (Not Translations)

### The Error

Using hreflang on pages that aren't true language/regional equivalents.

**Example:** Two English pages with 80% identical content but slightly different products.

**Wrong:**
```html
<!-- Page A -->
<link rel="alternate" hreflang="en-us" href="https://example.com/page-a/" />
<link rel="alternate" hreflang="en-gb" href="https://example.com/page-b/" />
```

**Problem:** Hreflang is for **translations** or **regional variations** (same content, different language/currency/region). Not for similar but distinct pages.

### The Fix

Only use hreflang when pages are true equivalents:
- Same product, different language
- Same article, different region (e.g., US spelling vs UK spelling)
- Same service, different currency/pricing

If pages have different content, don't use hreflang.

## Mistake 8: Pointing Hreflang to Redirects or 404s

### The Error

Hreflang URL redirects (301/302) or returns 404.

**Example:**
```html
<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/" />
```

But `https://example.com/en-gb/` redirects to `https://example.com/uk/`.

**Problem:** Google follows redirects but may misinterpret signals or ignore hreflang.

### The Fix

Hreflang URLs must return **200 status** (live, accessible pages). Update hreflang to point to final URL:

```html
<link rel="alternate" hreflang="en-gb" href="https://example.com/uk/" />
```

## Mistake 9: Hreflang in HTTP Header Without HTML Tags

### The Error

Implementing hreflang only in HTTP headers without corresponding HTML tags (or vice versa). Google processes both but prefers consistency.

**HTTP Header:**
```
Link: <https://example.com/en-us/>; rel="alternate"; hreflang="en-us"
```

**But HTML head has no hreflang.**

### The Fix

Use **one method consistently** across all pages:
- **HTML tags** (easiest for most sites)
- **XML sitemap** (for large sites with thousands of pages)
- **HTTP headers** (for non-HTML files like PDFs)

Don't mix methods on the same page.

## Mistake 10: Language-Script Code Errors

### The Error

Using incorrect script codes for Chinese or other languages with multiple scripts.

**Wrong:**
```html
<link rel="alternate" hreflang="zh-cn" href="https://example.com/zh-cn/" />
```

**Problem:** `zh-cn` mixes language (`zh`) and country (`CN`). Should use script code (`Hans` or `Hant`).

**Correct:**
```html
<link rel="alternate" hreflang="zh-Hans" href="https://example.com/zh-hans/" />
<link rel="alternate" hreflang="zh-Hant" href="https://example.com/zh-hant/" />
```

- **`zh-Hans`:** Simplified Chinese (China, Singapore)
- **`zh-Hant`:** Traditional Chinese (Taiwan, Hong Kong)

## Mistake 11: Incomplete Hreflang on Some Pages

### The Error

Homepage has hreflang, but product pages don't.

**Problem:** Google processes hreflang per-page. Missing hreflang on product pages means Google can't route users correctly.

### The Fix

**Every page** with multi-language equivalents must include hreflang.

Use dynamic templates (WordPress, Shopify) to auto-insert hreflang on all pages.

## Mistake 12: Testing Hreflang Only After Launch

### The Error

Launching multi-language site, then discovering hreflang errors months later when traffic doesn't arrive.

### The Fix

Validate hreflang **before launch**:

1. **Google Search Console** → International Targeting → Hreflang errors
2. **Hreflang Testing Tools:**
   - **Merkle Hreflang Tag Checker** (online tool)
   - **Screaming Frog** → Configuration → Custom → Extraction → Hreflang
3. **Manual check:** View source, verify tags

## How to Validate Hreflang

### Use Google Search Console

**Search Console > Legacy Tools > International Targeting:**

- **Hreflang errors** → Missing return tags, incorrect codes, missing pages
- Fix errors, request re-indexing

### Use Screaming Frog

1. **Crawl your site** → Configuration > Custom > Extraction > Hreflang
2. **Hreflang tab** → Shows all hreflang tags per page
3. **Identify errors:** Missing return links, broken URLs, conflicting canonicals

### Use Merkle Hreflang Checker

**technicalseo.com/tools/hreflang/**

Enter URL. Tool validates:
- Correct syntax
- Return links
- Self-referencing tags
- Canonical conflicts


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why Hreflang Errors Kill International SEO:** If your hreflang syntax is wrong (incorrect language codes, missing return links, conflicting canonicals), Google ignores the tags entirely and guesses which version to serve.
* **Mistake 1: Using Incorrect Language Codes:** Using 3-letter codes (eng, fra) or made-up codes (en-uk, sp) instead of ISO 639-1 (language) and ISO 3166-1 Alpha 2 (country).
* **Mistake 2: Missing Return Links:** Page A has hreflang pointing to Page B, but Page B doesn't have hreflang pointing back to Page A.
* **Mistake 3: No Self-Referencing Hreflang:** Page doesn't include hreflang pointing to itself.
* **Mistake 4: Using Language-Only When Country Matters:** Using hreflang="en" for all English pages instead of en-US, en-GB, en-CA.

## Frequently Asked Questions

### Can I use hreflang for different content, not translations?

No. Hreflang is for language/regional equivalents. If content differs significantly, don't use hreflang.

### Do I need hreflang if I only have one language?

No. Hreflang is only necessary for multi-language or multi-regional sites.

### What if I have English for US, UK, and Australia but identical content?

Use `en-US`, `en-GB`, `en-AU` if you want to target specific regions (for local SEO or currency). If content is truly identical and you don't care about regional targeting, use `hreflang="en"` for all.

### Can I use hreflang in XML sitemap instead of HTML?

Yes. Large sites often use XML sitemap for hreflang:

```xml
<url>
  <loc>https://example.com/en-us/</loc>
  <xhtml:link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/" />
  <xhtml:link rel="alternate" hreflang="en-us" href="https://example.com/en-us/" />
</url>
```

### Does hreflang affect rankings?

Indirectly. Correct hreflang ensures users see the right language version, reducing bounce rate and improving engagement, both of which improve rankings.

## Next Steps

Audit hreflang with Screaming Frog or Merkle Hreflang Checker. Fix missing return links, incorrect codes, and canonical conflicts. Add `x-default` fallback. Verify in Google Search Console. For related guidance, see [Hreflang Implementation Guide](/articles/hreflang-implementation-guide.html), [Fix Hreflang Errors](/articles/fix-hreflang-tag-errors.html), and [International SEO Site Structure](/articles/international-seo-site-structure.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
