---
title:: Async vs Defer for JavaScript: Which to Use for SEO
description:: Render-blocking JavaScript kills page speed. Use async or defer to load scripts without blocking rendering. This guide shows when to use each.
focus_keyword:: async vs defer javascript SEO
category:: speed
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Async vs Defer for JavaScript: Which to Use for SEO

> **Quick Summary**
> - **What this covers:** Render-blocking JavaScript kills page speed. Use async or defer to load scripts without blocking rendering. This guide shows when to use each.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [How JavaScript Blocks Rendering (Default Behavior)](#how-javascript-blocks-rendering-default-behavior)
- [What Async Does](#what-async-does)
- [What Defer Does](#what-defer-does)
- [Async vs Defer: Side-by-Side Comparison](#async-vs-defer-side-by-side-comparison)
- [When to Use Async](#when-to-use-async)
- [When to Use Defer](#when-to-use-defer)
- [When to Use Neither (Inline Critical Scripts)](#when-to-use-neither-inline-critical-scripts)
- [How to Implement Async and Defer](#how-to-implement-async-and-defer)
- [Common Mistakes](#common-mistakes)
- [Testing Async and Defer Impact](#testing-async-and-defer-impact)
- [Async, Defer, and SEO](#async-defer-and-seo)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


JavaScript files block page rendering by default. When the browser encounters a `<script>` tag, it stops parsing HTML, downloads the script, executes it, then resumes parsing. This delays Largest Contentful Paint (LCP) and hurts Core Web Vitals scores.

The `async` and `defer` attributes change how scripts load. Both prevent render-blocking, but they behave differently. Use the wrong one and you break functionality. Use the right one and you shave seconds off load time without touching your code.

This guide explains how `async` and `defer` work, when to use each, and how to implement them without breaking your site.

## How JavaScript Blocks Rendering (Default Behavior)

Without `async` or `defer`, scripts load synchronously:

```html
<script src="analytics.js"></script>
```

**What happens:**
1. Browser parses HTML
2. Browser encounters `<script>` tag
3. Browser stops parsing HTML
4. Browser downloads `analytics.js`
5. Browser executes `analytics.js`
6. Browser resumes parsing HTML

During steps 4-5, rendering is blocked. The user sees a blank screen or partial page until the script finishes executing.

### Impact on Core Web Vitals

Render-blocking JavaScript delays **Largest Contentful Paint (LCP)**, one of the three Core Web Vitals metrics. If your LCP is above 2.5 seconds, Google penalizes your page speed score, which affects rankings.

## What Async Does

The `async` attribute downloads the script in parallel with HTML parsing, then executes it immediately when the download finishes.

```html
<script src="analytics.js" async></script>
```

**What happens:**
1. Browser parses HTML
2. Browser encounters `<script async>` tag
3. Browser starts downloading `analytics.js` in the background (parallel)
4. Browser continues parsing HTML (no blocking)
5. When download finishes, browser pauses HTML parsing, executes the script, then resumes

**Key behavior:** The script executes **as soon as it downloads**, regardless of where the browser is in parsing HTML. Execution order is unpredictable if you have multiple `async` scripts.

### When to Use Async

Use `async` for **independent scripts** that don't rely on other scripts or the DOM being fully loaded.

**Good use cases:**
- Analytics scripts (Google Analytics, Plausible, Fathom)
- Ad scripts
- Tracking pixels
- Error monitoring tools (Sentry, Bugsnag)

**Bad use cases:**
- Scripts that depend on other scripts (e.g., a jQuery plugin that requires jQuery to load first)
- Scripts that manipulate the DOM (they may execute before the DOM is ready)

### Example: Google Analytics with Async

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

Google Analytics doesn't depend on other scripts and doesn't need to manipulate the DOM immediately, so `async` is safe.

## What Defer Does

The `defer` attribute downloads the script in parallel with HTML parsing but waits to execute until **after** HTML parsing completes.

```html
<script src="main.js" defer></script>
```

**What happens:**
1. Browser parses HTML
2. Browser encounters `<script defer>` tag
3. Browser starts downloading `main.js` in the background (parallel)
4. Browser continues parsing HTML (no blocking)
5. After HTML parsing finishes, browser executes `main.js` in the order scripts appear in the HTML

**Key behavior:** Deferred scripts execute **in order** after the DOM is fully loaded but before the `DOMContentLoaded` event.

### When to Use Defer

Use `defer` for **scripts that depend on the DOM or other scripts**.

**Good use cases:**
- Scripts that manipulate the DOM (carousels, modals, form validation)
- Scripts that depend on other scripts (jQuery plugins, framework libraries)
- Scripts that need to run in a specific order

**Bad use cases:**
- Scripts that must execute before the page renders (e.g., A/B testing tools that hide content to prevent flicker)

### Example: Deferred jQuery and Plugin

```html
<script src="jquery.min.js" defer></script>
<script src="jquery-plugin.js" defer></script>
```

Both scripts download in parallel, but `jquery-plugin.js` won't execute until after `jquery.min.js` because `defer` preserves execution order.

## Async vs Defer: Side-by-Side Comparison

| Attribute | Downloads | Executes | Blocks Rendering | Execution Order | Use For |
|-----------|-----------|----------|------------------|----------------|---------|
| **None** | Immediately | Immediately | Yes | Sequential | Critical inline scripts only |
| **async** | In parallel | As soon as downloaded | No (except during execution) | Unpredictable | Independent scripts (analytics, ads) |
| **defer** | In parallel | After HTML parsing | No | Sequential (order preserved) | DOM-dependent scripts, dependencies |

## When to Use Async

### Scenario 1: Analytics Scripts

Google Analytics, Facebook Pixel, and similar tracking scripts don't need to execute before page render.

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
```

### Scenario 2: Ad Scripts

Ad networks (Google AdSense, Media.net) load ads independently and don't depend on page content.

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
```

### Scenario 3: Third-Party Widgets

Embedded widgets (Twitter embeds, social share buttons) that don't affect core page functionality.

```html
<script async src="https://platform.twitter.com/widgets.js"></script>
```

## When to Use Defer

### Scenario 1: Scripts That Manipulate the DOM

JavaScript that changes page elements needs the DOM to be fully parsed.

```html
<script src="carousel.js" defer></script>
```

### Scenario 2: Scripts with Dependencies

If Script B depends on Script A, use `defer` on both to preserve execution order.

```html
<script src="library.js" defer></script>
<script src="plugin.js" defer></script>
```

### Scenario 3: Framework Bundles (React, Vue)

Single-page application bundles need the DOM to be ready for hydration.

```html
<script src="app.bundle.js" defer></script>
```

## When to Use Neither (Inline Critical Scripts)

Some scripts **must** execute before rendering. These should be **inline** in the HTML and placed in the `<head>`.

**Examples:**
- A/B testing scripts that hide content to prevent flicker
- Dark mode toggles (prevent flash of wrong theme)
- Feature detection scripts

```html
<head>
  <script>
    // Critical inline script
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  </script>
</head>
```

Don't use `async` or `defer` for these. They must execute synchronously before the page renders.

## How to Implement Async and Defer

### WordPress

**Manual method:** Edit your theme's `functions.php` and add `async` or `defer` to enqueued scripts:

```php
function add_async_defer_attributes($tag, $handle) {
  $async_scripts = array('google-analytics', 'facebook-pixel');
  $defer_scripts = array('main-js', 'jquery-plugin');

  if (in_array($handle, $async_scripts)) {
    return str_replace(' src', ' async src', $tag);
  }

  if (in_array($handle, $defer_scripts)) {
    return str_replace(' src', ' defer src', $tag);
  }

  return $tag;
}
add_filter('script_loader_tag', 'add_async_defer_attributes', 10, 2);
```

**Plugin method:** Use **Autoptimize** or **WP Rocket** to automatically defer non-critical scripts.

### Shopify

Shopify's default theme scripts are already optimized. For custom scripts in `theme.liquid`:

```liquid
<script src="{{ 'custom.js' | asset_url }}" defer></script>
```

### HTML (Static Sites)

Add the attribute directly to the `<script>` tag:

```html
<script src="script.js" defer></script>
<script src="analytics.js" async></script>
```

### React (Next.js)

Use the `Script` component from `next/script`:

```jsx
import Script from 'next/script';

export default function Page() {
  return (
    <>
      <Script src="https://example.com/analytics.js" strategy="afterInteractive" />
      <Script src="https://example.com/widget.js" strategy="lazyOnload" />
    </>
  );
}
```

- `strategy="afterInteractive"` = equivalent to `defer`
- `strategy="lazyOnload"` = loads after page is interactive (similar to `async`)

## Common Mistakes

### Mistake 1: Using Async for Dependent Scripts

If Script B depends on Script A, using `async` on both causes unpredictable execution order.

**Bad:**
```html
<script src="jquery.js" async></script>
<script src="jquery-plugin.js" async></script>
```

`jquery-plugin.js` may execute before `jquery.js` finishes, causing errors.

**Fix:** Use `defer` to preserve execution order:

```html
<script src="jquery.js" defer></script>
<script src="jquery-plugin.js" defer></script>
```

### Mistake 2: Deferring Critical Scripts

Scripts that modify the initial page render (A/B tests, theme toggles) should execute synchronously, not deferred.

**Bad:**
```html
<script src="ab-test.js" defer></script>
```

Users see the original page before the A/B test executes, causing flicker.

**Fix:** Inline the script in the `<head>` without `defer`.

### Mistake 3: Adding Async/Defer to Inline Scripts

`async` and `defer` only work on external scripts (those with a `src` attribute). They're ignored on inline scripts.

**Ignored:**
```html
<script defer>
  console.log('This runs immediately despite defer');
</script>
```

### Mistake 4: Using Both Async and Defer

Don't use both attributes on the same script. Browsers prioritize `async` and ignore `defer`.

**Bad:**
```html
<script src="script.js" async defer></script>
```

Pick one.

## Testing Async and Defer Impact

### Before: Baseline Test

Run **Google PageSpeed Insights** or **WebPageTest** to measure LCP and render-blocking resources.

### After: Add Async/Defer

Add `async` to analytics scripts and `defer` to DOM-dependent scripts. Re-test.

### What to Look For

- **LCP improvement**. Should decrease by 0.5-2 seconds
- **Elimination of render-blocking JS warnings**. PageSpeed should no longer flag these scripts
- **No JavaScript errors**. Check browser console to ensure scripts still function

## Async, Defer, and SEO

### Direct Impact on Rankings

Async and defer improve **Core Web Vitals**, which is a ranking factor. Faster LCP correlates with better rankings.

### Impact on Crawl Efficiency

**Googlebot** renders JavaScript, but faster-loading pages are crawled more efficiently. Reducing render-blocking scripts means Googlebot can index your content faster.

### Impact on User Experience

Faster pages reduce bounce rate and increase engagement. These user signals indirectly affect rankings.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **How JavaScript Blocks Rendering (Default Behavior):** Without async or defer, scripts load synchronously:
* **What Async Does:** The async attribute downloads the script in parallel with HTML parsing, then executes it immediately when the download finishes.
* **What Defer Does:** The defer attribute downloads the script in parallel with HTML parsing but waits to execute until after HTML parsing completes.
* **Async vs Defer: Side-by-Side Comparison:** Google Analytics, Facebook Pixel, and similar tracking scripts don't need to execute before page render.
* **When to Use Async:** Google Analytics, Facebook Pixel, and similar tracking scripts don't need to execute before page render.
* **When to Use Defer:** JavaScript that changes page elements needs the DOM to be fully parsed.

## Frequently Asked Questions

### Can I use async and defer together?

No. Browsers prioritize `async` and ignore `defer` if both are present. Choose one.

### Does defer work for inline scripts?

No. `defer` only applies to external scripts (those with a `src` attribute). Inline scripts always execute immediately.

### Should I defer jQuery?

Only if you also defer all jQuery plugins and ensure no inline scripts depend on jQuery. Otherwise, inline scripts will fail because jQuery hasn't loaded yet.

### What if my script breaks with async or defer?

Switch from `async` to `defer` (if execution order matters) or inline the script (if it must run before rendering). Test thoroughly.

### Do async scripts execute before DOMContentLoaded?

Maybe. Async scripts execute whenever they finish downloading, which could be before or after `DOMContentLoaded`. If your script needs the DOM, use `defer` instead.

## Next Steps

Audit your site's JavaScript using **Google PageSpeed Insights**. Identify render-blocking scripts. Add `async` to independent scripts (analytics, ads). Add `defer` to DOM-dependent scripts and scripts with dependencies. Re-test to verify LCP improvement. For related optimization, see [Defer JavaScript Without Breaking Your Site](/articles/defer-javascript-without-breaking-site.html), [Remove Render-Blocking Resources](/articles/remove-render-blocking-resources.html), and [Combine External Scripts for Performance](/articles/combine-external-scripts-performance.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
