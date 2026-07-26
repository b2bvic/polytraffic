---

---
title:: How to Eliminate Render-Blocking CSS and JavaScript for Faster Page Loads
description:: Render-blocking resources delay your page from displaying content. Eliminate them with defer, async, critical CSS extraction, and font optimization. Guide inside.
focus_keyword:: fix render-blocking resources
category:: speed
author:: Victor Valentine Romo
date:: 2026.03.20

# How to Eliminate Render-Blocking CSS and JavaScript for Faster Page Loads

> **Quick Summary**
> - **What this covers:** fix-render-blocking-resources
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [How to Tell If Render-Blocking Is Your Problem](#how-to-tell-if-render-blocking-is-your-problem)
- [Why Render-Blocking Resources Kill Your Speed](#why-render-blocking-resources-kill-your-speed)
- [Step 1: Identify Your Render-Blocking Resources (5 Minutes)](#step-1-identify-your-render-blocking-resources-5-minutes)
- [Step 2: Fix Render-Blocking JavaScript (15 Minutes)](#step-2-fix-render-blocking-javascript-15-minutes)
- [Step 3: Fix Render-Blocking CSS (15 Minutes)](#step-3-fix-render-blocking-css-15-minutes)
- [Step 4: Fix Render-Blocking Fonts (5 Minutes)](#step-4-fix-render-blocking-fonts-5-minutes)
- [Step 5: Verify and Monitor (5 Minutes)](#step-5-verify-and-monitor-5-minutes)
- [Platform-Specific Render-Blocking Fixes](#platform-specific-render-blocking-fixes)
- [Stop Making Users Wait](#stop-making-users-wait)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Render-blocking resources are CSS files, JavaScript files, and fonts that prevent your browser from displaying any content until they've fully downloaded and processed. Your page might load in 1.5 seconds once everything arrives, but if render-blocking resources delay the first paint by 3 seconds, users stare at a blank white screen for twice as long as necessary.

**PageSpeed Insights** flags these under "Eliminate render-blocking resources" in the Opportunities section. This fix directly improves **LCP** (Largest Contentful Paint) and **First Contentful Paint**, two of the most visible page speed metrics.

## How to Tell If Render-Blocking Is Your Problem

Before diving into fixes, confirm render-blocking resources are your bottleneck. Not every slow site suffers from this, some sites have fast resource loading but slow servers, large images, or heavy JavaScript execution.

**Run this quick test:**

1. Open **Chrome DevTools** (F12)
2. Go to the **Network** tab
3. Throttle to "Fast 3G" (to simulate real-world conditions)
4. Check the "Disable cache" box
5. Reload the page
6. Watch the waterfall, if you see a long gap between the first HTML response and the first visual paint, render-blocking resources are the culprit
7. If the first paint happens quickly but content loads slowly, the problem is elsewhere (images, server, or JavaScript execution)

The **Performance** tab in DevTools is even more precise. Record a page load and look at the gap between "DOM Content Loaded" and "First Contentful Paint." A large gap indicates render-blocking resources are holding up the paint.

## Why Render-Blocking Resources Kill Your Speed

When a browser encounters a standard `<script>` or `<link rel="stylesheet">` tag in your HTML, it stops everything. It downloads the file. It processes the file. Only then does it continue parsing the rest of the page. Multiple render-blocking resources stack, each one adds its download and processing time before the browser shows anything on screen.

### The Rendering Pipeline

1. Browser downloads HTML
2. Browser starts parsing HTML
3. Browser encounters a `<link rel="stylesheet">`. **stops parsing, downloads CSS, processes it**
4. Browser encounters a `<script src="...">`. **stops parsing, downloads JS, executes it**
5. Browser continues parsing HTML
6. Repeat for every blocking resource
7. Browser finally renders the page

With 5 render-blocking CSS files and 8 render-blocking JavaScript files (typical for a WordPress site with several plugins), the browser may stop and wait 13 separate times before rendering anything.

### Impact on Metrics

| Metric | How Render-Blocking Hurts |
|--------|--------------------------|
| FCP (First Contentful Paint) | Delays the first visible element |
| LCP (Largest Contentful Paint) | Delays the largest visible element |
| Speed Index | Delays the overall visual progress of the page |
| INP (Interaction to Next Paint) | Blocking JS ties up the main thread |
| User perception | White screen → user thinks the site is broken |

## Step 1: Identify Your Render-Blocking Resources (5 Minutes)

### PageSpeed Insights

Run your page through **PageSpeed Insights**. The "Eliminate render-blocking resources" item lists every CSS and JS file that blocks rendering, along with the estimated time savings from fixing each one.

### Chrome DevTools Performance Panel

1. Open **Chrome DevTools** (F12)
2. Go to the **Performance** tab
3. Click the reload button to record a page load
4. Look at the **Network** row in the timeline, render-blocking resources appear as long bars before the first paint marker
5. The **Main** thread row shows when CSS parsing and JavaScript execution block rendering

### Chrome DevTools Coverage Panel

1. In DevTools, press Ctrl+Shift+P and type "Coverage"
2. Click the reload button
3. This shows how much of each CSS/JS file is used on the current page
4. Files with high unused percentages (60%+) are prime candidates for optimization

## Step 2: Fix Render-Blocking JavaScript (15 Minutes)

### Strategy 1: Add defer to Script Tags

The `defer` attribute tells the browser to download the script in parallel with HTML parsing but wait to execute it until the HTML is fully parsed.

```html
<!-- BEFORE (render-blocking) -->
<script src="analytics.js"></script>
<script src="chat-widget.js"></script>
<script src="slider.js"></script>

<!-- AFTER (non-blocking) -->
<script src="analytics.js" defer></script>
<script src="chat-widget.js" defer></script>
<script src="slider.js" defer></script>
```

**When to use defer:** For any script that doesn't need to execute before the page renders. Analytics, chat widgets, social embeds, carousels, form validation, all safe to defer.

### Strategy 2: Add async to Independent Scripts

The `async` attribute downloads the script in parallel and executes it immediately when downloaded, without waiting for HTML parsing to complete.

```html
<script src="third-party-widget.js" async></script>
```

**When to use async:** For scripts that are completely independent, they don't depend on other scripts or the DOM being ready. Third-party widgets and analytics are typical candidates.

**defer vs. async:**

| Attribute | Downloads in parallel | Execution order | Waits for DOM |
|-----------|---------------------|----------------|--------------|
| (none) | No | In order | Blocks parsing |
| `defer` | Yes | In order | After DOM ready |
| `async` | Yes | When downloaded (random) | No |

**Rule:** When in doubt, use `defer`. It maintains execution order (important for scripts that depend on each other) and guarantees the DOM is ready.

### Strategy 3: Move Scripts to the End of Body

For scripts that can't use `defer` or `async` (rare), move them from the `<head>` to just before `</body>`:

```html
<body>
  <!-- Page content -->
  <script src="legacy-script.js"></script>
</body>
```

This allows the browser to parse and begin rendering all HTML content before encountering the blocking script.

### WordPress Implementation

**WP Rocket:** Goes to **Settings > WP Rocket > File Optimization**. Enable "Load JavaScript deferred" and "Delay JavaScript execution." WP Rocket also lets you exclude specific scripts that break when deferred.

**Asset CleanUp (Free):** Lets you control defer/async on a per-script basis, and disable scripts on pages where they're not needed.

**Perfmatters:** Per-page script management with defer and async controls.

## Step 3: Fix Render-Blocking CSS (15 Minutes)

CSS is trickier than JavaScript because the browser genuinely needs CSS to render the page correctly. You can't simply defer all CSS, that would cause a flash of unstyled content (FOUC).

### Strategy 1: Extract and Inline Critical CSS

**Critical CSS** is the subset of your stylesheet needed to render the above-the-fold content. Inline it directly in the HTML so it's available immediately without a separate network request.

```html
<head>
  <!-- Critical CSS inlined -->
  <style>
    /* Only the CSS needed for above-the-fold content */
    body { font-family: system-ui; margin: 0; }
    .header { background: #fff; padding: 1rem; }
    .hero { max-width: 1200px; margin: 0 auto; }
    .hero img { width: 100%; height: auto; }
  </style>

  <!-- Full CSS loaded asynchronously -->
  <link rel="preload" href="/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/style.css"></noscript>
</head>
```

The `preload` trick loads the full CSS file asynchronously while the critical CSS ensures above-the-fold content renders immediately.

### Tools for Extracting Critical CSS

- **Critical** (npm package) `npm install critical` Generates critical CSS for specified viewport dimensions
- **WP Rocket**. Automatic critical CSS generation for WordPress sites
- **PurgeCSS**. Removes unused CSS entirely (not deferring it)
- **Penthouse**. Another Node.js critical CSS generator

### Strategy 2: Remove Unused CSS

If 70% of your CSS file is unused on the current page, that's 70% wasted download. **PurgeCSS** analyzes your HTML and removes CSS rules that aren't referenced.

**Caution:** PurgeCSS can remove CSS needed for dynamic states (hover effects, JS-triggered classes, animations). Always test thoroughly after purging.

### Strategy 2.5: Defer Non-Critical CSS with Media Attributes

For CSS files that only apply in specific conditions (print stylesheets, large-screen styles, dark mode), use the `media` attribute to prevent them from blocking rendering:

```html
<!-- Print CSS — doesn't block rendering -->
<link rel="stylesheet" href="print.css" media="print">

<!-- Large screen only — doesn't block on mobile -->
<link rel="stylesheet" href="desktop.css" media="(min-width: 1024px)">
```

The browser still downloads these files but doesn't block rendering on them because they don't apply to the current context. This is a zero-risk optimization, the CSS still loads and applies when the conditions are met.

For non-critical CSS that should eventually apply to all viewports, use the media-swap technique:

```html
<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="non-critical.css"></noscript>
```

This loads the CSS without blocking rendering, then applies it to all media types once loaded. The `noscript` fallback ensures users with JavaScript disabled still get the stylesheet.

### Strategy 3: Combine and Minify CSS Files

Multiple CSS files mean multiple network requests, each potentially render-blocking. Combine them into one minified file:

```html
<!-- BEFORE: 5 render-blocking requests -->
<link rel="stylesheet" href="reset.css">
<link rel="stylesheet" href="typography.css">
<link rel="stylesheet" href="layout.css">
<link rel="stylesheet" href="components.css">
<link rel="stylesheet" href="utilities.css">

<!-- AFTER: 1 render-blocking request (minified) -->
<link rel="stylesheet" href="styles.min.css">
```

**WordPress:** **Autoptimize** and **WP Rocket** handle CSS combination and minification automatically.

### HTTP/2 Push and Preload Hints

On HTTP/2 servers, you can use `103 Early Hints` to begin pushing critical resources before the full HTML response is ready:

```
HTTP/1.1 103 Early Hints
Link: </style.css>; rel=preload; as=style
Link: </font.woff2>; rel=preload; as=font; crossorigin
```

**Cloudflare** supports Early Hints automatically on their CDN. This can reduce the render-blocking impact of critical CSS and fonts by starting their download before the HTML even arrives.

## Step 4: Fix Render-Blocking Fonts (5 Minutes)

Custom web fonts block rendering if the browser waits for them to download before displaying text.

### Preload Critical Fonts

```html
<link rel="preload" href="/fonts/primary.woff2" as="font" type="font/woff2" crossorigin>
```

This tells the browser to start downloading the font immediately, before the CSS that references it is parsed.

### Use font-display: swap

```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/primary.woff2') format('woff2');
  font-display: swap;
}
```

The `swap` value displays text in a fallback font immediately, then swaps to the custom font when it loads. The text is visible instantly, no blocking.

### Self-Host Google Fonts

Loading fonts from **Google Fonts** requires connecting to `fonts.googleapis.com` and `fonts.gstatic.com` two additional network connections before any font bytes arrive. Self-hosting eliminates these external dependencies.

Download fonts from **google-webfonts-helper** (gwfh.mranftl.com) and serve them from your own domain.

## Step 5: Verify and Monitor (5 Minutes)

### Post-Fix Verification

1. Run **PageSpeed Insights** again on each fixed page
2. The "Eliminate render-blocking resources" item should show reduced savings or disappear entirely
3. FCP and LCP scores should improve noticeably

### Chrome DevTools Verification

1. Open the **Performance** tab and record a page load
2. Compare the time to First Contentful Paint before and after
3. The gap between HTML download completion and first render should shrink significantly

### Testing with WebPageTest

For a more detailed view, use **WebPageTest.org**:

1. Enter your URL and select a test location
2. After the test, examine the **Waterfall View**
3. The green vertical line marks "Start Render" everything before it is blocked rendering
4. Identify which resources (CSS, JS, fonts) appear before the Start Render line
5. Each of these resources is render-blocking and should be addressed

**WebPageTest** also provides a "Content Breakdown" chart showing how much of your total page weight comes from CSS, JS, images, and fonts. If CSS and JS dominate the pre-render waterfall, render-blocking is your primary speed issue.

### Expected Improvements

| Fix Applied | Typical FCP Improvement | Typical LCP Improvement |
|------------|------------------------|------------------------|
| Defer all JS | 0.5 - 1.5s | 0.3 - 1.0s |
| Critical CSS + async full CSS | 0.5 - 2.0s | 0.3 - 1.5s |
| Font preloading + swap | 0.2 - 0.5s | 0.1 - 0.3s |
| All combined | 1.0 - 3.0s | 0.5 - 2.5s |


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **How to Tell If Render-Blocking Is Your Problem:** Before diving into fixes, confirm render-blocking resources are your bottleneck.
* **Why Render-Blocking Resources Kill Your Speed:** When a browser encounters a standard <script> or <link rel="stylesheet"> tag in your HTML, it stops everything.
* **Step 1: Identify Your Render-Blocking Resources (5 Minutes):** Run your page through PageSpeed Insights.
* **Step 2: Fix Render-Blocking JavaScript (15 Minutes):** The defer attribute tells the browser to download the script in parallel with HTML parsing but wait to execute it until the HTML is fully parsed.
* **Step 3: Fix Render-Blocking CSS (15 Minutes):** CSS is trickier than JavaScript because the browser genuinely needs CSS to render the page correctly.
* **Step 4: Fix Render-Blocking Fonts (5 Minutes):** Custom web fonts block rendering if the browser waits for them to download before displaying text.

## FAQ

### Will deferring JavaScript break my site?

Some scripts depend on being executed in a specific order or before the DOM renders. Most modern scripts handle defer without issues. Test after implementation, if a feature breaks (usually a slider, popup, or form), exclude that specific script from deferring and defer everything else.

### What's the difference between async and defer?

Both download scripts in parallel with HTML parsing. `async` executes the script immediately when it finishes downloading (potentially interrupting parsing). `defer` waits until all HTML is parsed before executing. `defer` is safer because it maintains execution order and guarantees the DOM is ready.

### Can I inline all my CSS?

For small sites (under 15KB of CSS), inlining everything works. For larger stylesheets, inlining adds to the HTML file size, prevents browser caching of the CSS, and increases time to first byte. The optimal approach is inline critical CSS + async-load the full stylesheet.

### How do I know which CSS is "critical"?

Critical CSS is whatever's needed to style content visible without scrolling (above the fold). Tools like **Critical** and **Penthouse** automatically extract this by rendering your page at a specified viewport size and capturing which CSS rules apply to visible elements.

### Does this matter if I'm using a CDN?

A CDN reduces download time for individual files but doesn't change the render-blocking behavior. Files served from a CDN still block rendering if loaded with standard `<link>` and `<script>` tags. CDN + defer/async is the correct combination, fast delivery AND non-blocking loading.

## Platform-Specific Render-Blocking Fixes

### WordPress

WordPress sites typically have the most render-blocking resources due to plugin bloat. Each plugin can enqueue its own CSS and JS files, and most load on every page regardless of whether they're needed.

**WP Rocket** provides the most comprehensive single-plugin solution:
1. **File Optimization > CSS Files:** Enable "Optimize CSS delivery" which automatically generates and inlines critical CSS
2. **File Optimization > JavaScript Files:** Enable "Load JavaScript deferred" and "Delay JavaScript execution"
3. **File Optimization > Minify:** Enable minification for both CSS and JavaScript

**If not using WP Rocket:**
- **Autoptimize** (free). Handles CSS/JS combining and minification
- **Asset CleanUp** (free). Disables scripts/styles on pages where they're not needed
- **Flying Scripts** (free). Delays specific JavaScript files until user interaction

The combination of **Autoptimize** + **Asset CleanUp** provides most of WP Rocket's render-blocking fixes for free.

### Shopify

Shopify provides limited control over render-blocking resources since you can't modify the platform's core scripts. However:

- Use Shopify's built-in **lazy loading** for images below the fold
- Minimize the number of apps installed, each app typically adds its own JS/CSS
- Use **theme.liquid** to defer third-party scripts:

```html
<script src="https://third-party-widget.com/script.js" defer></script>
```

- Move non-critical CSS to the bottom of `theme.liquid` with a `media="print"` trick:

```html
<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
```

### Static Sites (Next.js, Gatsby, Hugo)

Static site generators handle render-blocking resources differently because they often bundle CSS and JS at build time.

**Next.js:** Automatically code-splits JavaScript per page. Use `next/script` with the `strategy` prop:
```jsx
<Script src="analytics.js" strategy="lazyOnload" />
```

**Gatsby:** Uses code splitting by default. Critical CSS is automatically inlined during build. Third-party scripts should use the `gatsby-plugin-google-gtag` pattern or manual `<script>` injection in `gatsby-ssr.js` with defer.

**Hugo:** Since Hugo generates static HTML, you have complete control. Place CSS inline in `<head>` for critical styles and load the full stylesheet asynchronously at the bottom of `<body>`.

## Stop Making Users Wait

Every render-blocking resource adds hundreds of milliseconds to your page's white-screen time. Your content could be ready in 1 second but invisible for 3 because the browser is downloading and processing files that aren't needed for the initial render.

Defer your scripts. Extract your critical CSS. Preload your fonts. The content your visitors came for should appear the instant the HTML arrives, not after a queue of blocking resources finishes processing. Run **PageSpeed Insights** and fix the blocking resources it identifies. Your [Core Web Vitals](/articles/fix-core-web-vitals.html) will improve immediately.

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

