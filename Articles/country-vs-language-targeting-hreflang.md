---
title:: Country vs Language Targeting with Hreflang: Complete Implementation Guide
description:: Master hreflang country and language targeting. Fix duplicate content across regions with proper ISO 639-1 and ISO 3166-1 implementation.
focus_keyword:: country vs language targeting hreflang
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Country vs Language Targeting with Hreflang: Complete Implementation Guide

> **Quick Summary**
> - **What this covers:** Master hreflang country and language targeting. Fix duplicate content across regions with proper ISO 639-1 and ISO 3166-1 implementation.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Hreflang Syntax: Language vs. Language-Country](#hreflang-syntax-language-vs-language-country)
- [When to Use Language-Only vs. Country-Specific Hreflang](#when-to-use-language-only-vs-country-specific-hreflang)
- [Hreflang Implementation Methods](#hreflang-implementation-methods)
- [Common Hreflang Mistakes That Break Country Targeting](#common-hreflang-mistakes-that-break-country-targeting)
- [Validate Hreflang Implementation](#validate-hreflang-implementation)
- [Advanced: Hreflang for Subdirectories, Subdomains, and ccTLDs](#advanced-hreflang-for-subdirectories-subdomains-and-cctlds)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**Hreflang tags** tell **Google** which language and regional variant of a page to serve users based on their location and browser language settings. Sites serving Spanish speakers in Mexico (es-MX), Spain (es-ES), and Argentina (es-AR) need distinct hreflang annotations despite sharing a language, regional dialects, currency, and local intent differ dramatically. Confusing **language-only targeting** (`es`) with **country-specific targeting** (`es-MX`) causes Google to serve wrong variants, suppress regional pages in local search, and flag duplicate content errors in **Google Search Console**. This guide clarifies when to use language-only codes, country-specific codes, and hybrid approaches for global SEO architecture.

## Hreflang Syntax: Language vs. Language-Country

**ISO 639-1** defines two-letter language codes (en, es, fr). **ISO 3166-1 Alpha-2** defines two-letter country codes (US, MX, ES). Hreflang combines both in specific patterns.

### Language-Only Hreflang

Use when content is **language-specific but not region-specific**, same Spanish content serves all Spanish speakers globally.

**Syntax:**
```html
<link rel="alternate" hreflang="es" href="https://example.com/es/product/" />
```

**When to use:**
- Single Spanish version for all Spanish-speaking countries
- Generic English content without regional localization
- Small sites without resources for per-country variants

### Language-Country Hreflang

Use when content is **localized for specific countries**. Mexican Spanish differs from Spanish Spanish in terminology, currency, spelling.

**Syntax:**
```html
<link rel="alternate" hreflang="es-MX" href="https://example.com/mx/product/" />
<link rel="alternate" hreflang="es-ES" href="https://example.com/es/product/" />
<link rel="alternate" hreflang="es-AR" href="https://example.com/ar/product/" />
```

**When to use:**
- E-commerce with country-specific pricing (USD in US, CAD in Canada)
- Content referencing local laws, events, or culture
- Multi-country sites with separate fulfillment regions

### X-Default Hreflang

**x-default** specifies the fallback page when no hreflang matches the user's language/country.

**Syntax:**
```html
<link rel="alternate" hreflang="x-default" href="https://example.com/en/product/" />
```

**When to use:**
- Global homepage serving language selector
- Default English page for undefined regions
- Catch-all for users outside your targeted countries

## When to Use Language-Only vs. Country-Specific Hreflang

### Scenario 1: Single Language, Multiple Countries (English for US, UK, AU)

English speakers in the US, UK, and Australia encounter different spelling (color/colour), terminology (truck/lorry), and local intent (local search prioritizes regional results).

**Use country-specific hreflang:**
```html
<link rel="alternate" hreflang="en-US" href="https://example.com/us/product/" />
<link rel="alternate" hreflang="en-GB" href="https://example.com/uk/product/" />
<link rel="alternate" hreflang="en-AU" href="https://example.com/au/product/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/product/" />
```

**Why country-specific?** Google prioritizes local results. A user searching "solicitor services" in the UK should see en-GB content, not en-US content using "lawyer."

### Scenario 2: Single Language, No Regional Differences (Generic Spanish Content)

A blog publishing SEO guides in Spanish without country-specific localization serves the same content to users in Mexico, Spain, and Argentina.

**Use language-only hreflang:**
```html
<link rel="alternate" hreflang="es" href="https://example.com/es/seo-guide/" />
<link rel="alternate" hreflang="en" href="https://example.com/en/seo-guide/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/seo-guide/" />
```

**Why language-only?** No regional differences justify separate pages. Language-only targeting tells Google to serve this page to all Spanish speakers.

### Scenario 3: Multiple Languages, Multiple Countries (French for France and Canada)

French in France differs from Canadian French (Québécois) in vocabulary, formality, and cultural references.

**Use country-specific hreflang:**
```html
<link rel="alternate" hreflang="fr-FR" href="https://example.com/fr/product/" />
<link rel="alternate" hreflang="fr-CA" href="https://example.com/ca-fr/product/" />
<link rel="alternate" hreflang="en-CA" href="https://example.com/ca-en/product/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/product/" />
```

**Why country-specific?** A Canadian user with French browser settings should see fr-CA content, not fr-FR content written for European French speakers.

### Scenario 4: Fallback Language for Undefined Countries

A site targets Spanish speakers in Mexico (es-MX) and Spain (es-ES) but also wants to serve Spanish users in countries without dedicated pages (Colombia, Chile, Peru).

**Combine country-specific + language-only:**
```html
<link rel="alternate" hreflang="es-MX" href="https://example.com/mx/product/" />
<link rel="alternate" hreflang="es-ES" href="https://example.com/es/product/" />
<link rel="alternate" hreflang="es" href="https://example.com/es/product/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/product/" />
```

**How Google interprets this:**
- Users in Mexico → es-MX page
- Users in Spain → es-ES page
- Users in Colombia, Chile, Peru → es page (fallback)
- Users in non-Spanish countries → x-default (English)

## Hreflang Implementation Methods

### Method 1: HTML Link Tags (Most Common)

Place hreflang tags in the `<head>` of every page variant.

**Example:**
```html
<!DOCTYPE html>
<html lang="es-MX">
<head>
  <link rel="alternate" hreflang="es-MX" href="https://example.com/mx/product/" />
  <link rel="alternate" hreflang="es-ES" href="https://example.com/es/product/" />
  <link rel="alternate" hreflang="en-US" href="https://example.com/us/product/" />
  <link rel="alternate" hreflang="x-default" href="https://example.com/en/product/" />
</head>
```

**Requirements:**
- Every page must include hreflang tags pointing to all language/country variants (including itself)
- Tags must be **bidirectional** (if page A links to page B, page B must link to page A)
- All URLs must be absolute (not relative)

### Method 2: XML Sitemap (Best for Large Sites)

For sites with thousands of pages and dozens of language variants, HTML tags create bloat. **XML sitemaps** centralize hreflang annotations.

**Example sitemap:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/mx/product/</loc>
    <xhtml:link rel="alternate" hreflang="es-MX" href="https://example.com/mx/product/" />
    <xhtml:link rel="alternate" hreflang="es-ES" href="https://example.com/es/product/" />
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/us/product/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/en/product/" />
  </url>
  <url>
    <loc>https://example.com/es/product/</loc>
    <xhtml:link rel="alternate" hreflang="es-MX" href="https://example.com/mx/product/" />
    <xhtml:link rel="alternate" hreflang="es-ES" href="https://example.com/es/product/" />
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/us/product/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/en/product/" />
  </url>
</urlset>
```

**Submit to Google Search Console:**
```
https://example.com/sitemap-hreflang.xml
```

See [dynamic sitemap generation](dynamic-sitemaps-ecommerce.html) for automated hreflang sitemap creation.

### Method 3: HTTP Headers (For Non-HTML Resources)

**PDFs, images, and videos** can't contain HTML tags. Use **HTTP headers** for hreflang.

**Example header:**
```
Link: <https://example.com/mx/document.pdf>; rel="alternate"; hreflang="es-MX",
      <https://example.com/es/document.pdf>; rel="alternate"; hreflang="es-ES",
      <https://example.com/en/document.pdf>; rel="alternate"; hreflang="x-default"
```

**Implementation (Nginx):**
```nginx
location ~* \.pdf$ {
  add_header Link '<https://example.com/mx/$uri>; rel="alternate"; hreflang="es-MX"';
  add_header Link '<https://example.com/es/$uri>; rel="alternate"; hreflang="es-ES"';
}
```

## Common Hreflang Mistakes That Break Country Targeting

### Mistake 1: Missing Self-Referencing Tag

Each page must include hreflang pointing to itself.

**Incorrect:**
```html
<!-- On https://example.com/mx/product/ -->
<link rel="alternate" hreflang="es-ES" href="https://example.com/es/product/" />
<link rel="alternate" hreflang="en-US" href="https://example.com/us/product/" />
<!-- Missing es-MX self-reference! -->
```

**Correct:**
```html
<link rel="alternate" hreflang="es-MX" href="https://example.com/mx/product/" />
<link rel="alternate" hreflang="es-ES" href="https://example.com/es/product/" />
<link rel="alternate" hreflang="en-US" href="https://example.com/us/product/" />
```

### Mistake 2: Non-Bidirectional Links

If page A links to page B with hreflang, page B must link back to page A.

**Incorrect:**
```html
<!-- On https://example.com/mx/ -->
<link rel="alternate" hreflang="es-MX" href="https://example.com/mx/" />
<link rel="alternate" hreflang="es-ES" href="https://example.com/es/" />

<!-- On https://example.com/es/ -->
<link rel="alternate" hreflang="es-ES" href="https://example.com/es/" />
<!-- Missing es-MX link! Non-bidirectional = Google ignores both -->
```

**Google Search Console** reports "No return tags" errors for non-bidirectional hreflang.

### Mistake 3: Using Language-Only When Country-Specific Is Needed

Serving English content to UK users from US pages with `hreflang="en"` (language-only) causes Google to randomly pick US or UK version, or suppress both.

**Incorrect:**
```html
<link rel="alternate" hreflang="en" href="https://example.com/product/" />
<!-- Ambiguous: serves UK and US users the same page -->
```

**Correct:**
```html
<link rel="alternate" hreflang="en-US" href="https://example.com/us/product/" />
<link rel="alternate" hreflang="en-GB" href="https://example.com/uk/product/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/product/" />
```

### Mistake 4: Using Country Code Without Language Code

`hreflang="MX"` (country only) is invalid. **Google** requires language code; country is optional.

**Incorrect:**
```html
<link rel="alternate" hreflang="MX" href="https://example.com/mx/" />
```

**Correct:**
```html
<link rel="alternate" hreflang="es-MX" href="https://example.com/mx/" />
```

### Mistake 5: Mixing Hreflang Methods

Using HTML tags on some pages and XML sitemap on others confuses Google.

**Pick one method:**
- HTML tags for small sites (<1000 pages)
- XML sitemap for large sites or complex architectures (see [large site sitemaps](create-xml-sitemap-large-site.html))

## Validate Hreflang Implementation

### Google Search Console Validation

**Google Search Console** → International Targeting → Language shows hreflang errors.

**Common errors:**
- **No return tags**: Page A links to page B, but B doesn't link back
- **Invalid language/country codes**: Using non-ISO codes (e.g., "eng" instead of "en")
- **URL mismatch**: Hreflang points to non-canonical URL (use [canonical tag guide](cross-domain-canonical-tags-guide.html))

### Hreflang Testing Tools

**Merkle Hreflang Checker** (free tool):
1. Enter URL
2. Tool crawls page, extracts hreflang tags
3. Shows bidirectional validation, missing tags, invalid codes

**Screaming Frog SEO Spider** (desktop crawler):
1. Crawl site
2. Configuration → Spider → Rendering: JavaScript
3. International → Hreflang tab shows all tags, errors highlighted

### Manual Validation

Check raw HTML for hreflang tags:
```bash
curl -s https://example.com/mx/product/ | grep -i hreflang
```

Expected output:
```html
<link rel="alternate" hreflang="es-MX" href="https://example.com/mx/product/" />
<link rel="alternate" hreflang="es-ES" href="https://example.com/es/product/" />
```

## Advanced: Hreflang for Subdirectories, Subdomains, and ccTLDs

**URL structure** affects hreflang implementation complexity.

### Subdirectories (example.com/es/, example.com/mx/)

**Simplest approach** for managing hreflang, all variants on same domain.

**Pros:**
- Consolidates domain authority
- Easy to manage with single CMS
- No cross-domain canonical issues

**Cons:**
- Harder to geo-target in Search Console (can't target /es/ to Spain and /mx/ to Mexico separately)

### Subdomains (es.example.com, mx.example.com)

**Medium complexity**, allows per-region Search Console targeting.

**Pros:**
- Can set country target per subdomain in Search Console
- Isolates regional technical issues

**Cons:**
- Splits domain authority across subdomains
- Requires hreflang across subdomains (still works, more URLs to manage)

### ccTLDs (example.es, example.mx)

**Strongest country signal** to Google..mx domain inherently targets Mexico.

**Pros:**
- Google automatically geo-targets ccTLD domains
- Users trust local domains (.co.uk in UK)

**Cons:**
- Expensive (register separate domain per country)
- Splits domain authority
- Complex [domain migration](domain-migration-seo-guide.html) if consolidating later

**Hreflang still required** even with ccTLDs:
```html
<!-- On example.mx -->
<link rel="alternate" hreflang="es-MX" href="https://example.mx/product/" />
<link rel="alternate" hreflang="es-ES" href="https://example.es/product/" />
<link rel="alternate" hreflang="en-US" href="https://example.com/product/" />
```


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Hreflang Syntax: Language vs. Language-Country:** Use when content is language-specific but not region-specific, same Spanish content serves all Spanish speakers globally.
* **When to Use Language-Only vs. Country-Specific Hreflang:** English speakers in the US, UK, and Australia encounter different spelling (color/colour), terminology (truck/lorry), and local intent (local search prioritizes regional results).
* **Hreflang Implementation Methods:** Place hreflang tags in the <head> of every page variant.
* **Common Hreflang Mistakes That Break Country Targeting:** Each page must include hreflang pointing to itself.
* **Validate Hreflang Implementation:** Check raw HTML for hreflang tags:
bash
curl -s https://example.com/mx/product/ | grep -i hreflang
* **Advanced: Hreflang for Subdirectories, Subdomains, and ccTLDs:** Frameworks only pay off when they run against your numbers.

## Frequently Asked Questions

### Should I use hreflang="en" or hreflang="en-US" for US English content?

Use **en-US** if you have other English variants (en-GB, en-AU). Use **en** (language-only) if you serve the same English content globally without regional differences. If unsure, use **en-US** plus **x-default** pointing to the same page, this ensures US users see the right content while serving it as fallback for undefined regions.

### Can I use hreflang to target regions, not countries (e.g., Latin America)?

No. **Hreflang** only supports ISO 3166-1 country codes. You can't use `hreflang="es-LATAM"`. Instead, use **language-only** (`es`) as a fallback for users in countries without dedicated pages, or implement country-specific pages for major markets (es-MX, es-AR, es-CO) and let `es` catch the rest.

### Do I need x-default if I already have language fallbacks?

Yes. **x-default** handles users whose language/country combination doesn't match any hreflang. Example: A user in Japan with Japanese browser settings visits your site. Without `x-default`, Google might randomly serve them es-MX or en-GB. With `x-default`, they get your designated fallback (usually English homepage).

### Does hreflang pass PageRank between language variants?

No. **Hreflang** is not a ranking signal and doesn't pass authority. Use **canonical tags** to consolidate duplicate content (see [canonical tag guide](cross-domain-canonical-tags-guide.html)). Hreflang only controls which variant Google shows users. For ranking, each regional page competes independently unless canonicalized to a master version.

### How do I handle hreflang for pages that exist in some languages but not others?

Only include hreflang tags for pages that exist. If your Spanish site has 50 pages but English site has 100 pages, the 50 Spanish pages include hreflang to English equivalents. The other 50 English pages have no hreflang (or link to x-default only). Google handles this gracefully, non-linked pages don't inherit hreflang associations.

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
