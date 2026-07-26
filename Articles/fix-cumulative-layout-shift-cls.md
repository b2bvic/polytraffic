---

---
title:: Fix Cumulative Layout Shift (CLS): The Complete Troubleshooting Guide
description:: CLS above 0.1 means your page elements jump around during load. Find the culprits and fix them with explicit dimensions, font strategies, and ad reservations.
focus_keyword:: fix cumulative layout shift
category:: speed
author:: Victor Valentine Romo
date:: 2026.03.20

# Fix Cumulative Layout Shift (CLS): The Complete Troubleshooting Guide

> **Quick Summary**
> - **What this covers:** fix-cumulative-layout-shift-cls
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [How to Measure CLS](#how-to-measure-cls)
- [The 5 Most Common CLS Culprits](#the-5-most-common-cls-culprits)
- [Advanced CLS Debugging](#advanced-cls-debugging)
- [CLS Fix Priority Order](#cls-fix-priority-order)
- [Testing Your Fixes](#testing-your-fixes)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Cumulative Layout Shift measures how much your page content moves around while loading. That paragraph that jumps down when an ad loads above it. That button you're about to click that suddenly moves because an image above finished rendering. Every unexpected movement penalizes your CLS score.

Google wants CLS under 0.1. Anything above that fails **Core Web Vitals**, which directly feeds into the page experience ranking signal. CLS failures are almost always caused by elements that load without reserved space, and fixing them is systematic, not guesswork.

## How to Measure CLS

### Google PageSpeed Insights

Enter your URL at **PageSpeed Insights**. The CLS score appears in the Core Web Vitals assessment section. Check both mobile and desktop. CLS failures are more common on mobile where screen space is tighter.

### Chrome DevTools (Layout Shift Regions)

1. Open **Chrome DevTools** (F12)
2. Press Ctrl+Shift+P to open the command menu
3. Type "Show Layout Shift Regions" and enable it
4. Reload the page

Blue rectangles flash on screen wherever layout shifts occur. This visual overlay shows you exactly which elements are shifting and when.

### Web Vitals Chrome Extension

Install the **Web Vitals** Chrome extension. It shows real-time CLS, LCP, and INP scores as you browse. The CLS number updates live as shifts occur during page load.

### Google Search Console

**GSC > Experience > Core Web Vitals** shows sitewide CLS data based on real users. This is the field data Google uses for rankings. Pages are categorized as Good (under 0.1), Needs Improvement (0.1-0.25), or Poor (above 0.25).

## The 5 Most Common CLS Culprits

### Culprit 1: Images Without Dimensions

When an `<img>` tag has no `width` and `height` attributes, the browser allocates zero space for it initially. When the image loads, everything below it gets pushed down.

**Fix:** Always include `width` and `height` attributes:

```html
<!-- BAD: No dimensions -->
<img src="/photo.webp" alt="Description">

<!-- GOOD: Explicit dimensions -->
<img src="/photo.webp" alt="Description" width="800" height="450">
```

For responsive images, combine explicit attributes with CSS:

```css
img {
  max-width: 100%;
  height: auto;
}
```

The browser uses the `width` and `height` attributes to calculate the aspect ratio and reserve the correct space before the image loads. The CSS ensures the image scales responsively within its container.

**For CSS background images:** Set `aspect-ratio` on the container:

```css
.hero-banner {
  aspect-ratio: 16 / 9;
  background-image: url('/hero.webp');
  background-size: cover;
}
```

### Culprit 2: Ads and Embeds Without Reserved Space

Ads are the most aggressive CLS offender. They load asynchronously, often from slow third-party servers, and inject content that pushes everything else down or sideways.

**Fix:** Reserve space for every ad slot before the ad loads:

```css
.ad-container {
  min-height: 250px; /* Match the expected ad height */
  width: 300px;
  background: #f3f4f6; /* Placeholder color */
}
```

```html
<div class="ad-container">
  <!-- Ad script loads here -->
</div>
```

For responsive ad slots, use `aspect-ratio`:

```css
.ad-container-responsive {
  aspect-ratio: 300 / 250;
  width: 100%;
  max-width: 300px;
}
```

**For embeds (YouTube, Twitter, Instagram):** Use `aspect-ratio` on the container:

```css
.video-embed {
  aspect-ratio: 16 / 9;
  width: 100%;
}
```

See [Fix CLS Caused by Ads and Embeds](/articles/fix-ad-layout-shift-cls.html) for advanced ad CLS strategies.

### Culprit 3: Web Fonts Causing Layout Shift

Web fonts cause CLS in two ways:

1. **FOUT (Flash of Unstyled Text):** Browser renders text in a system font, then swaps to the web font, causing text to reflow
2. **FOIT (Flash of Invisible Text):** Browser hides text until the font loads, then renders it, causing content to suddenly appear

**Fix with font-display: swap + size-adjust:**

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;
  size-adjust: 105%; /* Adjust so fallback font matches web font metrics */
  ascent-override: 90%;
  descent-override: 20%;
  line-gap-override: 0%;
}
```

The `size-adjust`, `ascent-override`, `descent-override`, and `line-gap-override` properties tune the fallback font metrics to match the web font, minimizing reflow when the swap happens.

**Preload critical fonts:**

```html
<link rel="preload" as="font" href="/fonts/custom.woff2" type="font/woff2" crossorigin>
```

### Culprit 4: Dynamically Injected Content

Content that appears after initial render, cookie banners, notification bars, chat widgets, subscription popups, pushes existing content around.

**Fix:** Use CSS transforms or overlays instead of injecting content into the document flow:

```css
/* BAD: Pushes content down */
.cookie-banner {
  position: relative;
  height: 60px;
}

/* GOOD: Overlays on top, no shift */
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
```

For sticky headers that appear on scroll, use `position: fixed` or `position: sticky` instead of inserting elements into the document flow.

### Culprit 5: Late-Loading JavaScript That Modifies the DOM

JavaScript that adds, removes, or resizes elements after the initial page render causes layout shifts. Common offenders:

- **A/B testing scripts** that swap content after load
- **Personalization engines** that inject dynamic content
- **Lazy-loaded components** that change the page layout when they appear

**Fix strategies:**

1. **Reserve space** for content that will be dynamically added
2. **Use CSS `contain: layout`** on elements that might change size
3. **Move DOM-modifying scripts** to execute before first paint (in `<head>` with blocking behavior) if they modify above-the-fold content
4. **Use CSS `content-visibility: auto`** for below-the-fold sections

```css
.dynamic-section {
  contain: layout;
  min-height: 200px; /* Expected minimum height */
}
```

## Advanced CLS Debugging

### Performance Panel in DevTools

1. Open **Chrome DevTools > Performance**
2. Click the Record button and reload the page
3. After the page loads, stop recording
4. Click the "Layout Shifts" section in the timeline
5. Each shift shows the affected elements and the shift score

This gives you precise timestamps and elements for every layout shift, making it easy to correlate shifts with specific resource loads.

### Layout Instability API

For programmatic CLS monitoring, use the Layout Instability API:

```javascript
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      console.log('Layout shift:', entry.value, entry.sources);
      entry.sources?.forEach(source => {
        console.log('Shifted element:', source.node);
      });
    }
  }
}).observe({ type: 'layout-shift', buffered: true });
```

This logs every layout shift with the specific DOM element that caused it. Useful for catching shifts that are hard to reproduce visually.

## CLS Fix Priority Order

1. **Images without dimensions**, highest frequency cause, easiest fix
2. **Ad containers without reserved space**, highest shift magnitude
3. **Web font loading**, affects every text element on the page
4. **Dynamic content injection**, cookie banners, popups, sticky elements
5. **Late DOM modifications**. A/B tests, personalization, lazy components

## Testing Your Fixes

After applying fixes:

1. **Lab test:** Run **PageSpeed Insights**. CLS should drop below 0.1
2. **Visual test:** Enable "Show Layout Shift Regions" in DevTools, no blue flashes should appear during load
3. **Field data:** Wait 28 days and check **GSC > Core Web Vitals**, the real-user CLS should reflect your improvements

CLS field data updates on a rolling 28-day window. Your lab data will improve immediately, but GSC and **CrUX** data takes a month to reflect the change.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.

## Frequently Asked Questions

### What CLS score is "good enough"?

Under 0.1 is the threshold for "Good" in Core Web Vitals. Under 0.05 is excellent. Zero is unrealistic for most sites, even minor font swaps register small CLS values. Aim for under 0.1 and you pass the ranking signal threshold.

### Does CLS only matter during initial page load?

CLS is measured throughout the entire page lifecycle, not during initial load. User-triggered actions (clicking a button that expands content) are excluded from CLS measurement if they happen within 500ms of user input. But content that shifts after load without user interaction (late-loading ads, lazy components) continues to accumulate CLS score.

### Can animations cause CLS?

CSS `transform` animations do NOT cause CLS because they don't change the element's position in the document flow. However, animations that modify `top`, `left`, `width`, `height`, or `margin` DO cause layout shifts. Always animate with `transform` and `opacity` to avoid CLS.

### Why is my CLS different between PageSpeed Insights and Chrome DevTools?

**PageSpeed Insights** simulates a specific device and network condition (Moto G Power on 4G). DevTools reflects your actual device and network. Different load speeds and device capabilities produce different CLS scores because the timing of resource loads changes.

### How do I fix CLS on pages I don't control (third-party widgets)?

If a third-party widget injects content that causes CLS, your options are: (1) reserve space for the widget with a fixed-height container, (2) load the widget only below the fold where shifts are less impactful, or (3) replace the widget with a lighter alternative that doesn't cause shifts.

## Next Steps

Open **Chrome DevTools**, enable Layout Shift Regions, and reload your highest-traffic page. The blue flashes show you exactly where shifts occur. Fix images first (add dimensions), then tackle ad containers and font loading.

For related Core Web Vitals fixes, see [How to Fix Core Web Vitals Issues](/articles/how-to-fix-core-web-vitals.html), [Fix CLS Caused by Ads and Embeds](/articles/fix-ad-layout-shift-cls.html), and [Reserve Space for Dynamic Content](/articles/reserve-space-for-dynamic-content.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
