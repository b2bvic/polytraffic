---

---
title:: How to Fix Interaction to Next Paint (INP) Issues Fast
description:: INP replaced FID as a Core Web Vital. If your pages respond slowly to clicks and taps, fix long tasks, heavy JavaScript, and main thread blockers now.
focus_keyword:: fix INP issues
category:: speed
author:: Victor Valentine Romo
date:: 2026.03.20

# How to Fix Interaction to Next Paint (INP) Issues Fast

> **Quick Summary**
> - **What this covers:** fix-interaction-to-next-paint-inp
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [What Causes Poor INP](#what-causes-poor-inp)
- [How to Measure INP](#how-to-measure-inp)
- [Fix 1: Break Up Long JavaScript Tasks (10 Minutes)](#fix-1-break-up-long-javascript-tasks-10-minutes)
- [Fix 2: Defer Non-Critical JavaScript (5 Minutes)](#fix-2-defer-non-critical-javascript-5-minutes)
- [Fix 3: Optimize Event Handlers (10 Minutes)](#fix-3-optimize-event-handlers-10-minutes)
- [Fix 4: Reduce DOM Size (15 Minutes)](#fix-4-reduce-dom-size-15-minutes)
- [Fix 5: Optimize Third-Party Scripts (10 Minutes)](#fix-5-optimize-third-party-scripts-10-minutes)
- [Fix 6: Use CSS contain and content-visibility](#fix-6-use-css-contain-and-content-visibility)
- [INP Debugging Checklist](#inp-debugging-checklist)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Interaction to Next Paint measures how quickly your page responds to user interactions, clicks, taps, and keyboard inputs. When someone clicks a button and nothing happens for 400ms, that's an INP failure. Google wants INP under 200 milliseconds. Anything above that means your page feels sluggish, and it fails **Core Web Vitals**.

INP replaced First Input Delay (FID) as a Core Web Vital in March 2024. It's a harder metric to pass because it measures the worst interaction during the entire page visit, not the first one. A page that responds quickly to the first click but freezes during later interactions still fails.

## What Causes Poor INP

INP failures have one root cause: the browser's main thread is too busy to respond to user input. Three specific mechanisms cause this:

### Long JavaScript Tasks

JavaScript executes on the main thread. When a script runs for 50ms or longer, it blocks the thread, the browser can't process user input until the script finishes. A 200ms script means the user waits 200ms before their click does anything.

### Excessive DOM Size

Large DOMs (over 1,500 nodes) make every interaction expensive. When a user clicks something that triggers a DOM update, the browser must recalculate styles, reflow layout, and repaint, operations that scale with DOM size.

### Heavy Event Handlers

Click handlers, scroll listeners, and input handlers that perform expensive operations (network requests, complex calculations, large DOM manipulations) directly delay the visual response to the interaction.

## How to Measure INP

### Google PageSpeed Insights

Enter your URL. INP appears in the Core Web Vitals section. Check both lab and field data, lab data shows the potential, field data shows what real users experience.

### Chrome DevTools Performance Panel

1. Open **Chrome DevTools > Performance**
2. Start recording
3. Interact with the page, click buttons, open menus, type in forms
4. Stop recording
5. Look for long tasks (gray bars over 50ms) that coincide with your interactions

### Web Vitals Chrome Extension

The **Web Vitals** extension shows INP in real time as you interact with the page. Each interaction updates the INP value, showing which interactions are the slowest.

### Google Search Console

**GSC > Experience > Core Web Vitals** shows sitewide INP data from real users. Pages are categorized as Good (under 200ms), Needs Improvement (200-500ms), or Poor (above 500ms).

## Fix 1: Break Up Long JavaScript Tasks (10 Minutes)

Long tasks block the main thread. The fix is to split them into smaller chunks that give the browser breathing room to process user input between chunks.

### Use requestIdleCallback or setTimeout

```javascript
// BAD: One long task blocks the thread
function processLargeArray(items) {
  items.forEach(item => {
    expensiveOperation(item);
  });
}

// GOOD: Yield to the main thread between chunks
function processLargeArray(items) {
  const CHUNK_SIZE = 50;
  let index = 0;

  function processChunk() {
    const end = Math.min(index + CHUNK_SIZE, items.length);
    for (let i = index; i < end; i++) {
      expensiveOperation(items[i]);
    }
    index = end;
    if (index < items.length) {
      setTimeout(processChunk, 0); // Yield to main thread
    }
  }

  processChunk();
}
```

### Use the scheduler.yield() API

Modern browsers support `scheduler.yield()`, which explicitly returns control to the main thread:

```javascript
async function processItems(items) {
  for (const item of items) {
    expensiveOperation(item);
    await scheduler.yield(); // Let browser process any pending interactions
  }
}
```

This is the cleanest solution for breaking up long tasks while maintaining code readability.

### Identify Long Tasks

In **Chrome DevTools > Performance**, long tasks appear as gray blocks with a red corner. Click on them to see which scripts are responsible. Common culprits:

- **Analytics scripts**. Google Analytics, Mixpanel, Segment
- **Ad scripts**. Google AdSense, header bidding
- **Third-party widgets**. Chat widgets, social share buttons
- **Framework hydration**. React, Vue, Angular bootstrapping

## Fix 2: Defer Non-Critical JavaScript (5 Minutes)

Every script that loads synchronously in your `<head>` blocks the main thread during page load. Interactions that occur during this blocking window will have poor INP.

### Move Scripts to End of Body

```html
<!-- BAD: Blocks in head -->
<head>
  <script src="/js/analytics.js"></script>
  <script src="/js/chat-widget.js"></script>
</head>

<!-- GOOD: Loads after content -->
<body>
  <!-- Page content -->
  <script src="/js/analytics.js" defer></script>
  <script src="/js/chat-widget.js" defer></script>
</body>
```

### Use Dynamic Imports for Non-Critical Features

```javascript
// BAD: Loads entire library on page load
import { heavyLibrary } from './heavy-library.js';

// GOOD: Loads only when needed
document.querySelector('#feature-button').addEventListener('click', async () => {
  const { heavyLibrary } = await import('./heavy-library.js');
  heavyLibrary.run();
});
```

Dynamic imports load code only when the user triggers the feature, keeping the initial main thread free for faster interactions.

## Fix 3: Optimize Event Handlers (10 Minutes)

If a click handler performs expensive work, the visual response to the click is delayed until that work finishes.

### Separate Input Response From Heavy Work

```javascript
// BAD: Heavy work delays visual feedback
button.addEventListener('click', () => {
  // User sees nothing until this completes
  const data = heavyComputation();
  updateDOM(data);
  sendAnalytics();
});

// GOOD: Instant visual feedback, then heavy work
button.addEventListener('click', () => {
  // Instant visual feedback
  button.classList.add('loading');
  button.textContent = 'Processing...';

  // Heavy work in next frame
  requestAnimationFrame(() => {
    setTimeout(() => {
      const data = heavyComputation();
      updateDOM(data);
      sendAnalytics();
      button.classList.remove('loading');
    }, 0);
  });
});
```

The key is to split the interaction into two phases: (1) instant visual feedback and (2) the actual work. The visual update happens in the current frame, and the heavy work happens in the next one.

### Debounce Scroll and Input Handlers

```javascript
// BAD: Fires on every scroll event (hundreds per second)
window.addEventListener('scroll', () => {
  calculateLayout();
  updatePositions();
});

// GOOD: Debounced to once per frame
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      calculateLayout();
      updatePositions();
      ticking = false;
    });
    ticking = true;
  }
});
```

## Fix 4: Reduce DOM Size (15 Minutes)

Pages with over 1,500 DOM nodes make every interaction expensive. DOM operations (querySelector, innerHTML changes, style recalculations) scale linearly or worse with DOM size.

### Audit DOM Size

```javascript
// Check your DOM node count
document.querySelectorAll('*').length
```

Run this in your browser console. If the number exceeds 1,500, you need to reduce DOM complexity.

### Reduction Strategies

1. **Virtualize long lists**. If your page renders 500 product cards, use virtual scrolling (react-window, vue-virtual-scroller) to render only the visible items
2. **Lazy-render below-the-fold content**. Use Intersection Observer to render components only when they approach the viewport
3. **Remove hidden elements**. Elements hidden with `display: none` still exist in the DOM. Use JavaScript to remove them from the DOM tree
4. **Simplify nested structures**. Deeply nested `<div>` wrappers add DOM nodes without serving any purpose

```javascript
// Lazy render with Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      renderComponent(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.lazy-section').forEach(el => observer.observe(el));
```

## Fix 5: Optimize Third-Party Scripts (10 Minutes)

Third-party scripts are the leading cause of INP failures on most sites. Analytics, ads, chat widgets, and social media embeds all compete for main thread time.

### Audit Third-Party Impact

In **Chrome DevTools > Performance**, filter by third-party domains in the call tree. Identify which scripts consume the most main thread time.

### Mitigation Strategies

1. **Load third-party scripts with `defer` or `async`**
2. **Use a facade pattern**. Load a lightweight placeholder, then load the full widget only on user interaction

```html
<!-- Facade: Lightweight placeholder for YouTube embed -->
<div class="youtube-facade" data-video-id="abc123" onclick="loadYouTube(this)">
  <img src="/thumbnails/abc123.webp" alt="Video title">
  <button aria-label="Play video">▶</button>
</div>

<script>
function loadYouTube(el) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${el.dataset.videoId}?autoplay=1`;
  iframe.allow = 'autoplay; encrypted-media';
  el.replaceWith(iframe);
}
</script>
```

3. **Move scripts to a Web Worker**, for computation-heavy tasks that don't need DOM access

## Fix 6: Use CSS contain and content-visibility

These CSS properties tell the browser it can skip work on elements that aren't currently visible or won't affect other elements.

```css
/* Tell browser this element's layout is independent */
.card {
  contain: layout style paint;
}

/* Skip rendering of off-screen sections entirely */
.below-fold-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px; /* Estimated height */
}
```

`content-visibility: auto` can dramatically reduce initial rendering work and improve INP for interactions that happen during page load.

## INP Debugging Checklist

1. **Measure current INP**. PageSpeed Insights + Web Vitals extension
2. **Identify worst interactions**. Performance panel recording during real interactions
3. **Find long tasks**. Any task over 50ms is a candidate for breaking up
4. **Audit third-party scripts**. Identify which external scripts consume the most main thread time
5. **Check DOM size**. Over 1,500 nodes degrades interaction speed
6. **Review event handlers**. Separate visual feedback from heavy computation


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **What Causes Poor INP:** INP failures have one root cause: the browser's main thread is too busy to respond to user input.
* **Fix 2: Defer Non-Critical JavaScript (5 Minutes):** Every script that loads synchronously in your <head> blocks the main thread during page load.
* **Fix 3: Optimize Event Handlers (10 Minutes):** If a click handler performs expensive work, the visual response to the click is delayed until that work finishes.
* **Fix 4: Reduce DOM Size (15 Minutes):** Pages with over 1,500 DOM nodes make every interaction expensive.

## Frequently Asked Questions

### What's the difference between INP and FID?

FID measured the delay of the first interaction only. INP measures the worst interaction throughout the entire page visit. A page that responds quickly to the first click but freezes during a later interaction would pass FID but fail INP. INP is the harder, more representative metric.

### Does INP affect SEO rankings?

INP is one of the three Core Web Vitals that form part of Google's page experience ranking signal, alongside LCP and CLS. It's a confirmed ranking factor, though its weight relative to content relevance and backlinks is lower.

### Can I fix INP without changing my JavaScript code?

Some INP improvements don't require code changes: deferring third-party scripts, reducing DOM size by removing unnecessary elements, and adding CSS `contain` properties. But for the deepest improvements, you'll need to optimize event handlers and break up long tasks in your own code.

### My INP is fine on desktop but fails on mobile. Why?

Mobile devices have significantly less processing power than desktops. JavaScript that executes in 30ms on a desktop may take 150ms on a mid-range mobile phone. Always test INP on throttled CPU in DevTools (4x or 6x slowdown) to simulate real mobile performance.

### How long does it take for INP improvements to reflect in Google Search Console?

**GSC Core Web Vitals** uses a 28-day rolling window of real-user data from the **Chrome User Experience Report (CrUX)**. After fixing INP, expect 4 weeks before field data fully reflects the improvement.

## Next Steps

Open your highest-traffic page in **Chrome DevTools**, start a Performance recording, and click through the page. Look for long tasks (red-cornered blocks over 50ms) that coincide with your interactions. Those long tasks are your INP bottleneck, break them up first.

For related Core Web Vitals fixes, see [How to Fix Core Web Vitals Issues](/articles/how-to-fix-core-web-vitals.html), [How to Reduce JavaScript Execution Time](/articles/reduce-javascript-execution-time.html), and [Fix Long Tasks Blocking the Main Thread](/articles/fix-long-tasks-blocking-main-thread.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
