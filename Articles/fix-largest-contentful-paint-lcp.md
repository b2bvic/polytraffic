---

---
title:: How to Fix Largest Contentful Paint (LCP) in Under 10 Minutes
description:: LCP over 2.5 seconds kills your Core Web Vitals. Fix it fast with image optimization, server response tuning, and render-blocking elimination. Step-by-step.
focus_keyword:: fix largest contentful paint
category:: speed
author:: Victor Valentine Romo
date:: 2026.03.20

# How to Fix Largest Contentful Paint (LCP) in Under 10 Minutes

> **Quick Summary**
> - **What this covers:** fix-largest-contentful-paint-lcp
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [What Triggers Your LCP Element](#what-triggers-your-lcp-element)
- [Fix 1: Optimize the LCP Image (5 Minutes)](#fix-1-optimize-the-lcp-image-5-minutes)
- [Fix 2: Reduce Server Response Time (3 Minutes)](#fix-2-reduce-server-response-time-3-minutes)
- [Fix 3: Eliminate Render-Blocking Resources (5 Minutes)](#fix-3-eliminate-render-blocking-resources-5-minutes)
- [Fix 4: Preconnect to Required Origins (2 Minutes)](#fix-4-preconnect-to-required-origins-2-minutes)
- [Fix 5: Optimize CSS Background Images (3 Minutes)](#fix-5-optimize-css-background-images-3-minutes)
- [Fix 6: Font-Loading Optimization (3 Minutes)](#fix-6-font-loading-optimization-3-minutes)
- [LCP Debugging Checklist](#lcp-debugging-checklist)
- [Measuring LCP Improvement](#measuring-lcp-improvement)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Largest Contentful Paint measures how long it takes for the biggest visible element on your page to render, typically a hero image, banner, or heading block. Google wants LCP under 2.5 seconds. Anything above that fails **Core Web Vitals**, and failing Core Web Vitals means your page experience signal is working against you in rankings.

The good news: LCP failures have a small number of root causes, and most are fixable in minutes.

## What Triggers Your LCP Element

Before fixing LCP, you need to know which element Google measures. It's not always what you expect.

### Find Your LCP Element

1. Open **Google PageSpeed Insights** and enter your URL
2. Scroll to the **Diagnostics** section
3. Look for "Largest Contentful Paint element" it will identify the exact DOM element

Common LCP elements:
- **Hero image**, the large banner image at the top of the page
- **Background image**, a CSS `background-image` on the hero section
- **H1 text block**, if no large image exists, the heading text becomes LCP
- **Video poster**, the thumbnail of an embedded video
- **Carousel first slide**, the first visible slide of an image carousel

Your fix strategy depends entirely on which element type is your LCP.

## Fix 1: Optimize the LCP Image (5 Minutes)

If your LCP element is an image, and it usually is, image optimization delivers the biggest LCP improvement.

### Compress the Image

Run your LCP image through **TinyPNG**, **ShortPixel**, or **Squoosh**. Target a file size under 200KB for hero images. Most unoptimized hero images are 500KB-2MB. Compression alone can cut LCP by 1-3 seconds.

### Convert to WebP or AVIF

Modern image formats reduce file size by 25-50% compared to JPEG and PNG with no visible quality loss:

```html
<picture>
  <source srcset="/images/hero.avif" type="image/avif">
  <source srcset="/images/hero.webp" type="image/webp">
  <img src="/images/hero.jpg" alt="Description of hero image" width="1200" height="600">
</picture>
```

**AVIF** delivers the best compression. **WebP** has broader browser support. The `<picture>` element serves the best format each browser supports, with JPEG as the fallback.

### Set Explicit Width and Height

Always include `width` and `height` attributes on your LCP image. This prevents layout shift during load and allows the browser to allocate space before the image downloads.

```html
<img src="/images/hero.webp" alt="Hero description" width="1200" height="600" fetchpriority="high">
```

### Use fetchpriority="high"

The `fetchpriority="high"` attribute tells the browser to prioritize downloading this image above other resources. It's specifically designed for LCP images.

```html
<img src="/images/hero.webp" alt="Hero image" width="1200" height="600" fetchpriority="high">
```

### Do NOT Lazy-Load the LCP Image

Lazy loading delays image loading until the element enters the viewport. For images that are immediately visible (above the fold), lazy loading actively hurts LCP by adding an unnecessary delay.

```html
<!-- WRONG: Don't lazy-load your LCP image -->
<img src="/images/hero.webp" loading="lazy" alt="Hero">

<!-- RIGHT: Eager load (default) with high priority -->
<img src="/images/hero.webp" fetchpriority="high" alt="Hero" width="1200" height="600">
```

### Preload the LCP Image

If your LCP image is referenced in CSS (as a background image) or loaded dynamically, preload it in the `<head>`:

```html
<link rel="preload" as="image" href="/images/hero.webp" type="image/webp" fetchpriority="high">
```

This tells the browser to start downloading the image immediately, before it would normally discover it during rendering.

## Fix 2: Reduce Server Response Time (3 Minutes)

TTFB (Time to First Byte) is the foundation of LCP. If your server takes 2 seconds to respond, your LCP can't possibly be under 2.5 seconds, there's only half a second left for everything else.

### Quick TTFB Check

```bash
curl -o /dev/null -s -w "TTFB: %{time_starttransfer}s\n" https://yoursite.com
```

**Target:** Under 600ms. Under 200ms is ideal.

### TTFB Fixes

1. **Enable server-side caching**. If your pages are dynamic (WordPress, Shopify), enable page caching so the server returns cached HTML instead of querying the database on every request
2. **Use a CDN**. **Cloudflare**, **Fastly**, or **AWS CloudFront** serve cached pages from edge servers geographically closer to your visitors
3. **Upgrade hosting**. Shared hosting is the most common TTFB bottleneck. Moving to managed hosting (like **Kinsta**, **WP Engine**, or **Cloudways**) can cut TTFB from 800ms to under 200ms

For the complete TTFB optimization guide, see [Fix Slow Server Response Time](/articles/fix-server-response-time.html).

## Fix 3: Eliminate Render-Blocking Resources (5 Minutes)

Render-blocking CSS and JavaScript prevent the browser from painting your LCP element until these resources finish loading. Every blocking resource adds delay.

### Identify Render-Blocking Resources

**PageSpeed Insights** flags these under "Eliminate render-blocking resources" with the specific files and estimated time savings.

### Defer Non-Critical JavaScript

Add `defer` or `async` to script tags that aren't needed for initial render:

```html
<!-- BEFORE: Blocks rendering -->
<script src="/js/analytics.js"></script>

<!-- AFTER: Loads after HTML parsing -->
<script src="/js/analytics.js" defer></script>
```

### Inline Critical CSS

Extract the CSS needed to render above-the-fold content and inline it directly in the `<head>`. This eliminates the round trip to fetch an external stylesheet:

```html
<style>
  /* Only the CSS needed for above-the-fold content */
  .hero { width: 100%; height: 400px; }
  .hero img { width: 100%; height: auto; object-fit: cover; }
  h1 { font-size: 2rem; font-weight: 700; }
</style>
<link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all'">
```

The `media="print"` trick loads the full stylesheet asynchronously, it doesn't block rendering.

For the complete render-blocking guide, see [How to Remove Render-Blocking Resources](/articles/fix-render-blocking-resources.html).

## Fix 4: Preconnect to Required Origins (2 Minutes)

If your LCP image or critical resources come from external domains (CDNs, image services), the browser must first establish a connection to those domains. Preconnect eliminates that delay:

```html
<link rel="preconnect" href="https://cdn.yoursite.com">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://cdn.yoursite.com">
```

Place these in your `<head>` before any resources that require those connections.

## Fix 5: Optimize CSS Background Images (3 Minutes)

When your LCP element uses a CSS `background-image`, the browser can't start downloading it until the CSS file is parsed. This adds significant delay compared to an `<img>` tag.

### Option 1: Switch to an img Tag

Replace CSS background images with HTML `<img>` tags for your LCP element. The `<img>` tag is discoverable by the browser's preload scanner and starts downloading earlier.

### Option 2: Preload the Background Image

If you can't change the HTML, preload the image in the `<head>`:

```html
<link rel="preload" as="image" href="/images/hero-bg.webp" type="image/webp">
```

### Option 3: Inline the Critical CSS

If the background image is defined in an external stylesheet, move that specific CSS rule inline:

```html
<style>
  .hero-section {
    background-image: url('/images/hero-bg.webp');
    background-size: cover;
  }
</style>
```

## Fix 6: Font-Loading Optimization (3 Minutes)

If your LCP element is text (H1 heading, for example), font loading directly impacts LCP. The browser waits for the web font to download before rendering text by default.

### Use font-display: swap

```css
@font-face {
  font-family: 'Your Font';
  src: url('/fonts/your-font.woff2') format('woff2');
  font-display: swap;
}
```

`font-display: swap` renders text immediately with a system font, then swaps in the web font once loaded. This ensures your text LCP element renders instantly.

### Preload Critical Fonts

```html
<link rel="preload" as="font" href="/fonts/your-font.woff2" type="font/woff2" crossorigin>
```

### Limit Font Variants

Every font weight and style is a separate file download. If you're loading Regular, Bold, Italic, and Bold Italic in two font families, that's 8 font files. Trim to only the variants you use.

## LCP Debugging Checklist

Work through this in order for any page failing LCP:

1. **Identify the LCP element**. PageSpeed Insights tells you which element
2. **If image:** Compress, convert to WebP/AVIF, add fetchpriority="high", don't lazy-load, preload if CSS background
3. **Check TTFB**, must be under 600ms, ideally under 200ms
4. **Remove render-blocking resources**, defer JS, inline critical CSS
5. **Preconnect to external origins**. CDNs, font services, image hosts
6. **If text LCP:** Use font-display: swap, preload fonts

## Measuring LCP Improvement

### Lab Data (Immediate)

Run **PageSpeed Insights** before and after each change. Lab data updates instantly and shows the impact of your optimizations.

### Field Data (2-4 Weeks)

**Google Search Console > Core Web Vitals** shows real-user data. Field data takes 28 days to accumulate enough measurements for a reliable assessment. After fixing LCP in lab data, monitor field data to confirm the improvement holds for real users.

### Chrome User Experience Report (CrUX)

**CrUX** is Google's dataset of real-user performance metrics. The **PageSpeed Insights** tool shows CrUX data at the top of its report. This is the data Google uses for the page experience ranking signal.

For understanding the difference between lab and field data, see [Field Data vs Lab Data Core Web Vitals](/articles/field-data-vs-lab-data-core-web-vitals.html).


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **What Triggers Your LCP Element:** Before fixing LCP, you need to know which element Google measures.
* **Fix 1: Optimize the LCP Image (5 Minutes):** If your LCP element is an image, and it usually is, image optimization delivers the biggest LCP improvement.
* **Fix 2: Reduce Server Response Time (3 Minutes):** TTFB (Time to First Byte) is the foundation of LCP.
* **Fix 3: Eliminate Render-Blocking Resources (5 Minutes):** Render-blocking CSS and JavaScript prevent the browser from painting your LCP element until these resources finish loading.
* **Fix 4: Preconnect to Required Origins (2 Minutes):** If your LCP image or critical resources come from external domains (CDNs, image services), the browser must first establish a connection to those domains.
* **Fix 5: Optimize CSS Background Images (3 Minutes):** When your LCP element uses a CSS background-image, the browser can't start downloading it until the CSS file is parsed.

## Frequently Asked Questions

### What is a good LCP score?

Under 2.5 seconds is "Good." Between 2.5-4.0 seconds is "Needs Improvement." Over 4.0 seconds is "Poor." The 2.5-second threshold is what matters for Core Web Vitals in Google rankings.

### Why is my LCP good on desktop but bad on mobile?

Mobile devices have slower processors and often slower network connections. An image that loads in 1 second on desktop may take 3+ seconds on a mobile device over 4G. Always optimize for mobile first, serve smaller image sizes, use responsive images with `srcset`, and test on throttled connections.

### Does LCP affect SEO rankings?

LCP is one of the three Core Web Vitals (along with CLS and INP) that form part of Google's page experience ranking signal. It's a confirmed ranking factor, though content relevance and backlinks still carry more weight. For pages competing closely on other factors, passing Core Web Vitals can be the tiebreaker.

### Can a slow third-party script affect LCP?

Yes, if the third-party script blocks rendering. Analytics scripts, ad scripts, and chat widgets loaded synchronously in the `<head>` can delay LCP significantly. Defer all third-party scripts unless they're required for above-the-fold rendering.

### My LCP element keeps changing. How do I fix that?

If your LCP element varies between page loads (sometimes an image, sometimes a heading), the page has unstable rendering. This usually means images load at unpredictable speeds or content shifts during load. Stabilize by preloading the intended LCP element and ensuring consistent render order.

## Next Steps

Open **PageSpeed Insights** right now, identify your LCP element, and apply the first applicable fix from this guide. Image optimization alone solves 70% of LCP failures.

For related Core Web Vitals fixes, see [How to Fix Core Web Vitals Issues](/articles/how-to-fix-core-web-vitals.html), [Fix Cumulative Layout Shift (CLS)](/articles/fix-cumulative-layout-shift-cls.html), and [Optimize Hero Images for LCP](/articles/optimize-hero-images-for-lcp.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
