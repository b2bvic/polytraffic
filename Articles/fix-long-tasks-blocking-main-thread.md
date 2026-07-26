---
title:: How to Fix Long Tasks Blocking the Main Thread (Complete Performance Guide)
description:: Lighthouse warns about long tasks blocking your main thread? Learn how to identify JavaScript bottlenecks, code-split heavy bundles, and implement web workers for smooth, responsive page performance.
focus_keyword:: fix long tasks blocking main thread
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Fix Long Tasks Blocking the Main Thread (Complete Performance Guide)

> **Quick Summary**
> - **What this covers:** Lighthouse warns about long tasks blocking your main thread? Learn how to identify JavaScript bottlenecks, code-split heavy bundles, and implement web workers for smooth, responsive page performance.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Understanding Main Thread Blocking](#understanding-main-thread-blocking)
- [Identifying Long Tasks with Performance Tools](#identifying-long-tasks-with-performance-tools)
- [Code Splitting Large JavaScript Bundles](#code-splitting-large-javascript-bundles)
- [Deferring and Asyncing Script Loading](#deferring-and-asyncing-script-loading)
- [Implementing Web Workers](#implementing-web-workers)
- [Optimizing Third-Party Scripts](#optimizing-third-party-scripts)
- [Minimizing Layout Thrashing](#minimizing-layout-thrashing)
- [Reducing DOM Size and Complexity](#reducing-dom-size-and-complexity)
- [Monitoring Long Task Improvements](#monitoring-long-task-improvements)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**Long tasks** are JavaScript operations taking longer than 50 milliseconds to execute. When these tasks run on the main thread, they freeze your entire page, users can't click buttons, scroll smoothly, or interact with forms. **Lighthouse** flags these as "Avoid long main-thread tasks," directly impacting your performance score and user experience.

This guide covers long task identification, code optimization strategies, and implementation of web workers. You'll learn how to split heavy JavaScript bundles, defer non-critical operations, and create responsive pages that remain interactive even while processing complex operations.

## Understanding Main Thread Blocking

The **main thread** handles everything in your browser, parsing HTML, executing JavaScript, calculating layouts, painting pixels, responding to user input. When JavaScript monopolizes this thread for extended periods, everything else freezes.

**Tasks under 50ms** allow smooth 60fps rendering. The browser renders frames every 16.67ms (1000ms ÷ 60fps). Tasks completing within 50ms leave room for rendering between JavaScript execution.

**Tasks over 50ms** create noticeable lag. A 500ms task freezes the page for half a second, buttons don't respond, scrolling stutters, animations freeze. Users perceive pages as broken or slow.

**Total Blocking Time (TBT)** measures cumulative main thread blocking. Lighthouse sums all time beyond the 50ms threshold for tasks occurring during page load:

- Task 1: 120ms → 70ms blocking time (120 - 50)
- Task 2: 80ms → 30ms blocking time (80 - 50)
- Task 3: 200ms → 150ms blocking time (200 - 50)
- Total: 250ms TBT

**Low TBT targets**: Under 200ms is good, under 100ms is excellent. Sites exceeding 600ms TBT frustrate users and rank lower.

**First Input Delay (FID)** measures real-world responsiveness. FID tracks the delay between user interaction (click, tap) and the browser's ability to respond. Long tasks increase FID, if a user clicks during a 300ms task, they wait 300ms for any response.

**Common long task causes**:

- **Unoptimized JavaScript**: Large bundles executing synchronously
- **Third-party scripts**: Analytics, ads, chat widgets executing heavy operations
- **DOM manipulation**: Bulk updates forcing expensive layout recalculations
- **Synchronous data processing**: Large dataset parsing or transformation
- **Framework overhead**: Bloated component rendering in React, Vue, Angular

For related JavaScript performance issues, see our guide on [fixing JavaScript SEO crawling issues](/articles/fix-javascript-seo-crawling-issues.html).

## Identifying Long Tasks with Performance Tools

Several tools reveal which operations block your main thread.

**Lighthouse performance audit**:

1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Performance" category
4. Click "Analyze page load"
5. Check "Avoid long main-thread tasks" section

Lighthouse lists:

- Number of long tasks
- Total blocking time
- Specific scripts causing longest tasks

**Chrome DevTools Performance tab**:

1. Open DevTools → Performance
2. Click Record (Ctrl/Cmd+E)
3. Reload page or interact with it
4. Stop recording
5. View timeline showing task durations

**Reading the Performance timeline**:

- **Yellow bars**: JavaScript execution (longer bars = longer tasks)
- **Purple bars**: Layout and style calculations
- **Green bars**: Painting operations
- **Red triangles**: Long tasks (over 50ms)

Click any long task to view:

- **Function name**: Which function executed
- **Source URL**: Which file contains the code
- **Duration**: How long it ran

**WebPageTest main thread analysis**:

1. Visit [webpagetest.org](https://www.webpagetest.org/)
2. Enter your URL
3. Run test
4. View "Main Thread" chart
5. Review periods where main thread is busy

Long continuous blocks indicate blocking operations.

**Lighthouse User Flow** for interaction-based long tasks:

```javascript
import { startFlow } from 'lighthouse/lighthouse-core/fraggle-rock/api.js';
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

const flow = await startFlow(page);
await flow.navigate('https://example.com');
await flow.startTimespan();
await page.click('#search-button');
await page.type('#search-input', 'query');
await flow.endTimespan();

await browser.close();

const report = await flow.generateReport();
```

This profiles long tasks during user interactions, not initial page load.

**Real User Monitoring (RUM)** with Web Vitals:

```javascript
import {getFID, getTTFB, getCLS} from 'web-vitals';

getFID(console.log);
getTTFB(console.log);
getCLS(console.log);
```

Deploy to production to measure real user experiences. High FID correlates with long main thread tasks.

## Code Splitting Large JavaScript Bundles

**Bundle splitting** breaks monolithic JavaScript files into smaller chunks loaded on demand, reducing initial parse and execution time.

**Webpack code splitting**:

**Dynamic imports** split code at module boundaries:

```javascript
// Before: Synchronous import
import HeavyFeature from './HeavyFeature';

// After: Dynamic import (creates separate bundle)
const button = document.querySelector('#feature-button');
button.addEventListener('click', async () => {
  const { default: HeavyFeature } = await import('./HeavyFeature');
  HeavyFeature.init();
});
```

Webpack automatically creates HeavyFeature as a separate chunk, loaded only when users click the button.

**webpack.config.js optimization**:

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

This splits vendor code (node_modules) from application code, allowing long-term caching of rarely-changing dependencies.

**React lazy loading**:

```javascript
import React, { lazy, Suspense } from 'react';

// Before: Synchronous import
// import Dashboard from './Dashboard';

// After: Lazy import
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
```

Dashboard code splits into separate bundle, loading only when component renders.

**Route-based code splitting** (Next.js):

Next.js automatically splits code by route:

```javascript
// pages/dashboard.js loads separately from pages/index.js
export default function Dashboard() {
  return <h1>Dashboard</h1>;
}
```

No configuration needed, each page becomes a separate bundle.

**Vue.js lazy loading**:

```javascript
// router/index.js
const routes = [
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue')
  }
];
```

Vue Router dynamically imports components as routes activate.

**Bundle analysis**:

Install webpack-bundle-analyzer:

```bash
npm install --save-dev webpack-bundle-analyzer
```

Configure:

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};
```

Run build and view interactive treemap showing:

- Size of each module
- Which dependencies consume most space
- Opportunities for splitting or removing unused code

Target: No single chunk over 200KB (compressed). Split larger bundles into smaller pieces.

For bundle optimization in frameworks, see our guide on [fixing JavaScript SEO crawling issues](/articles/fix-javascript-seo-crawling-issues.html).

## Deferring and Asyncing Script Loading

**Script loading strategies** control when JavaScript downloads and executes, preventing blocking during critical rendering.

**Default synchronous loading**:

```html
<script src="/heavy-script.js"></script>
```

This blocks HTML parsing until script downloads and executes. Avoid for non-critical scripts.

**Async attribute**:

```html
<script async src="/analytics.js"></script>
```

Browser downloads script in parallel with HTML parsing. Script executes immediately upon download, potentially interrupting parsing. Use for independent scripts without DOM dependencies (analytics, tracking).

**Defer attribute**:

```html
<script defer src="/main.js"></script>
```

Browser downloads script in parallel but delays execution until HTML parsing completes. Scripts execute in order they appear. Use for scripts requiring complete DOM.

**Async vs. Defer comparison**:

| Type | Downloads | Executes | Order |
|------|-----------|----------|-------|
| Sync | Blocks parsing | Immediately | In order |
| Async | Parallel | On download complete | No guarantee |
| Defer | Parallel | After parsing | In order |

**Module scripts**:

```html
<script type="module" src="/app.js"></script>
```

Module scripts defer by default, support imports/exports, and execute after parsing.

**Dynamic script injection**:

```javascript
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Load after user interaction
document.querySelector('#chat-button').addEventListener('click', async () => {
  await loadScript('/chat-widget.js');
  initChat();
});
```

This loads scripts programmatically only when needed.

**Critical CSS inlining**:

Instead of loading external stylesheet synchronously:

```html
<style>
  /* Critical above-the-fold styles inlined */
  body { font-family: Arial; margin: 0; }
  .header { background: #333; color: white; }
</style>
<link rel="preload" href="/full-styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/full-styles.css"></noscript>
```

Critical styles load immediately, full stylesheet loads asynchronously.

**Loadash debounce for heavy operations**:

```javascript
import debounce from 'lodash.debounce';

const heavySearch = debounce((query) => {
  // Expensive search operation
  performSearch(query);
}, 300);

searchInput.addEventListener('input', (e) => {
  heavySearch(e.target.value);
});
```

Debouncing delays execution until user stops typing, reducing main thread work.

## Implementing Web Workers

**Web Workers** run JavaScript on separate threads, keeping the main thread responsive. Heavy computation moves to workers while the main thread handles UI.

**Basic Web Worker setup**:

Create worker file:

```javascript
// worker.js
self.addEventListener('message', (e) => {
  const { data } = e;

  // Heavy computation
  const result = processLargeDataset(data);

  self.postMessage(result);
});

function processLargeDataset(data) {
  // Expensive operation that would block main thread
  return data.map(item => complexTransformation(item));
}
```

Use worker from main thread:

```javascript
// main.js
const worker = new Worker('/worker.js');

worker.addEventListener('message', (e) => {
  const result = e.data;
  displayResults(result);
});

worker.postMessage(largeDataset);
```

Heavy processing occurs in worker thread. Main thread remains responsive.

**Comlink for easier worker communication**:

```bash
npm install comlink
```

Worker side:

```javascript
// worker.js
import { expose } from 'comlink';

const api = {
  processData(data) {
    return expensiveOperation(data);
  }
};

expose(api);
```

Main thread:

```javascript
// main.js
import { wrap } from 'comlink';

const worker = new Worker('/worker.js');
const api = wrap(worker);

const result = await api.processData(data);
```

Comlink handles message passing, making worker calls feel like async function calls.

**Use cases for Web Workers**:

- **Data processing**: Parsing large JSON, CSV, or XML files
- **Cryptography**: Hashing, encryption, decryption operations
- **Image manipulation**: Canvas operations, filters, compressions
- **Search indexing**: Building client-side search indexes
- **Calculations**: Complex mathematical operations, simulations

**Web Worker limitations**:

- No DOM access (can't manipulate HTML elements)
- No access to `window`, `document`, `parent` objects
- Can't share functions or variables directly (must serialize data)

**OffscreenCanvas for graphics**:

```javascript
// main.js
const canvas = document.querySelector('#canvas');
const offscreen = canvas.transferControlToOffscreen();

const worker = new Worker('/canvas-worker.js');
worker.postMessage({ canvas: offscreen }, [offscreen]);
```

```javascript
// canvas-worker.js
self.addEventListener('message', (e) => {
  const canvas = e.data.canvas;
  const ctx = canvas.getContext('2d');

  function render() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(render);
  }

  render();
});
```

Offscreen canvas allows rendering in workers, keeping animations smooth while main thread handles interaction.

For understanding how workers integrate with modern frameworks, see our guide on [fixing JavaScript SEO crawling issues](/articles/fix-javascript-seo-crawling-issues.html).

## Optimizing Third-Party Scripts

**Third-party scripts**, analytics, ads, chat widgets, often cause severe main thread blocking while providing no value until after initial page load.

**Audit third-party impact**:

**Lighthouse Third-Party Impact**:

1. Run Lighthouse audit
2. Check "Reduce the impact of third-party code" section
3. Review blocking time attributed to each third-party domain

**Request Blocking Tool**:

1. Open DevTools → Network tab
2. Right-click domain → Block request domain
3. Reload page
4. Measure performance difference

Significant improvements indicate problematic third-party scripts.

**Lazy-load third-party scripts**:

Load scripts after user interaction:

```javascript
let analyticsLoaded = false;

function loadAnalytics() {
  if (analyticsLoaded) return;

  const script = document.createElement('script');
  script.src = 'https://www.google-analytics.com/analytics.js';
  document.head.appendChild(script);

  analyticsLoaded = true;
}

// Load after first interaction
['mousedown', 'touchstart', 'scroll'].forEach(event => {
  window.addEventListener(event, loadAnalytics, { once: true });
});

// Or load after delay
setTimeout(loadAnalytics, 3000);
```

**Partytown for third-party relegation**:

Install Partytown:

```bash
npm install @builder.io/partytown
```

Configure to run third-party scripts in workers:

```html
<script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

Partytown relocates third-party script execution to web workers, preventing main thread blocking.

**Facade pattern for heavy embeds**:

Instead of loading full YouTube embed immediately:

```html
<!-- Lightweight facade -->
<div class="youtube-facade" data-video-id="VIDEO_ID">
  <img src="thumbnail.jpg" alt="Video thumbnail">
  <button>Play</button>
</div>

<script>
document.querySelectorAll('.youtube-facade').forEach(facade => {
  facade.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${facade.dataset.videoId}?autoplay=1`;
    facade.replaceWith(iframe);
  });
});
</script>
```

Full embed loads only after user clicks play.

**Self-host when possible**:

```html
<!-- Before: Third-party -->
<script src="https://cdn.example.com/library.js"></script>

<!-- After: Self-hosted with versioning -->
<script src="/js/vendor/library.v2.1.3.js"></script>
```

Self-hosting gives full control over caching, minification, and loading strategies.

**Resource hints for unavoidable third-parties**:

```html
<link rel="preconnect" href="https://www.google-analytics.com">
<link rel="dns-prefetch" href="https://connect.facebook.net">
```

Preconnect establishes early connections, reducing latency when scripts do load.

For additional third-party optimization, see our guide on [fixing advantage browser caching warnings](/articles/fix-leverage-browser-caching-warning.html).

## Minimizing Layout Thrashing

**Layout thrashing** occurs when JavaScript repeatedly reads and writes DOM properties, forcing multiple layout recalculations within single frames.

**What causes layout thrashing**:

```javascript
// Bad: Forces multiple layouts
for (let i = 0; i < elements.length; i++) {
  const height = elements[i].offsetHeight; // Read (forces layout)
  elements[i].style.height = height + 10 + 'px'; // Write (invalidates layout)
}
```

Each loop iteration forces layout recalculation, browser calculates layouts thousands of times unnecessarily.

**Batch reads and writes**:

```javascript
// Good: Batch all reads, then all writes
const heights = [];

// Batch reads
for (let i = 0; i < elements.length; i++) {
  heights[i] = elements[i].offsetHeight;
}

// Batch writes
for (let i = 0; i < elements.length; i++) {
  elements[i].style.height = heights[i] + 10 + 'px';
}
```

Browser calculates layout once after reads, applies all writes, then recalculates once more.

**FastDOM library**:

```bash
npm install fastdom
```

```javascript
import fastdom from 'fastdom';

elements.forEach(element => {
  fastdom.measure(() => {
    const height = element.offsetHeight;

    fastdom.mutate(() => {
      element.style.height = height + 10 + 'px';
    });
  });
});
```

FastDOM automatically batches reads (measure) and writes (mutate), preventing layout thrashing.

**Properties that trigger layout**:

**Avoid reading these during animation loops**:

- `offsetWidth`, `offsetHeight`, `offsetLeft`, `offsetTop`
- `clientWidth`, `clientHeight`, `clientLeft`, `clientTop`
- `scrollWidth`, `scrollHeight`, `scrollLeft`, `scrollTop`
- `getComputedStyle()`, `getBoundingClientRect()`

**Safe alternatives**:

- Use transforms instead of position changes:

```javascript
// Bad: Triggers layout
element.style.top = '100px';

// Good: Uses compositor
element.style.transform = 'translateY(100px)';
```

- Cache layout values outside animation loops:

```javascript
const height = element.offsetHeight; // Read once

function animate() {
  element.style.transform = `scale(${height / 100})`;
  requestAnimationFrame(animate);
}
```

**requestAnimationFrame for smooth animations**:

```javascript
let lastFrame = Date.now();

function animate() {
  const now = Date.now();
  const delta = now - lastFrame;

  // Update logic based on time delta
  updatePosition(delta);

  lastFrame = now;
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

`requestAnimationFrame` synchronizes with browser repaint cycle, preventing unnecessary layout calculations.

**CSS containment**:

```css
.widget {
  contain: layout style paint;
}
```

Containment tells browsers changes inside `.widget` won't affect external layout, allowing browsers to optimize recalculation scope.

## Reducing DOM Size and Complexity

**Large DOMs** increase layout calculation time. Every DOM manipulation potentially requires recalculating thousands of elements.

**DOM size targets**:

- Under 1,500 total nodes: Good
- Under 800 total nodes: Excellent
- Over 3,000 nodes: Problematic

**Lighthouse DOM size audit**:

1. Run Lighthouse
2. Check "Avoid an excessive DOM size" diagnostic
3. Review:
   - Total DOM elements
   - Maximum DOM depth
   - Maximum child elements

**Strategies for reducing DOM size**:

**Virtual scrolling** for long lists:

```javascript
// Before: Render 10,000 list items (huge DOM)
items.forEach(item => {
  list.innerHTML += `<li>${item}</li>`;
});

// After: Render only visible items
import { VirtualScroller } from 'virtual-scroller';

const scroller = new VirtualScroller({
  container: list,
  itemHeight: 50,
  items: items,
  renderItem: (item) => `<li>${item}</li>`
});
```

Virtual scrolling renders only visible items (20-50), dramatically reducing DOM size.

**React Virtualized**:

```bash
npm install react-virtualized
```

```javascript
import { List } from 'react-virtualized';

<List
  width={300}
  height={600}
  rowCount={items.length}
  rowHeight={50}
  rowRenderer={({ index, key, style }) => (
    <div key={key} style={style}>
      {items[index]}
    </div>
  )}
/>
```

**Pagination instead of infinite scroll**:

```javascript
// Replace infinite scroll with paginated loading
const ITEMS_PER_PAGE = 50;
let currentPage = 1;

function loadPage(page) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = allItems.slice(start, end);

  renderItems(pageItems);
}

nextButton.addEventListener('click', () => {
  currentPage++;
  loadPage(currentPage);
});
```

**Remove hidden elements from DOM**:

```javascript
// Instead of hiding with CSS
element.style.display = 'none';

// Remove from DOM entirely
element.remove();

// Store reference to reinsert later
const removedElement = element;
```

**Simplify component trees**:

```javascript
// Before: Unnecessary wrapper divs
<div className="container">
  <div className="wrapper">
    <div className="inner">
      <Component />
    </div>
  </div>
</div>

// After: Minimal structure
<Component />
```

**Lighthouse Tree Shaking**:

Use production builds that eliminate unused code:

```bash
NODE_ENV=production npm run build
```

Production builds automatically remove development-only code and dead code paths.

## Monitoring Long Task Improvements

After optimization, measure effectiveness with before/after comparisons.

**Lighthouse score comparison**:

1. Run Lighthouse before optimization (save report)
2. Implement optimizations
3. Run Lighthouse after optimization
4. Compare:
   - Performance score (target: 90+)
   - Total Blocking Time (target: under 200ms)
   - Long Tasks count (target: under 10)

**Chrome User Experience Report (CrUX)**:

```javascript
// Query CrUX API
const API_KEY = 'YOUR_API_KEY';
const url = 'https://chromeuxreport.googleapis.com/v1/records:queryRecord';

const response = await fetch(`${url}?key=${API_KEY}`, {
  method: 'POST',
  body: JSON.stringify({
    origin: 'https://example.com'
  })
});

const data = await response.json();
console.log(data.record.metrics.first_input_delay);
```

CrUX provides real-world user experience data from Chrome users.

**Continuous monitoring with CI/CD**:

```yaml
# .github/workflows/performance.yml
name: Performance Check

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://example.com
          uploadArtifacts: true
          temporaryPublicStorage: true
```

Fail CI/CD builds if performance regresses.

**Real User Monitoring in production**:

```javascript
import {getFID, getCLS, getLCP} from 'web-vitals';

function sendToAnalytics({name, value}) {
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify({metric: name, value})
  });
}

getFID(sendToAnalytics);
getCLS(sendToAnalytics);
getLCP(sendToAnalytics);
```

Track real user metrics to identify performance regressions affecting actual users.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Understanding Main Thread Blocking:** The main thread handles everything in your browser, parsing HTML, executing JavaScript, calculating layouts, painting pixels, responding to user input.
* **Identifying Long Tasks with Performance Tools:** Several tools reveal which operations block your main thread.
* **Code Splitting Large JavaScript Bundles:** // After: Dynamic import (creates separate bundle)
const button = document.querySelector('#feature-button');
button.addEventListener('click', async () => {
  co
* **Deferring and Asyncing Script Loading:** This blocks HTML parsing until script downloads and executes.

## FAQ

**What's considered a "long task" exactly?**

Any JavaScript execution taking longer than 50 milliseconds. This threshold allows browsers to maintain 60fps rendering (16.67ms per frame) while leaving budget for other operations. Tasks exceeding 50ms create noticeable lag and janky scrolling.

**Will code splitting hurt first-time page load performance?**

Initially, code splitting may slightly increase first load time due to multiple requests. However, caching benefits overwhelm this cost on repeat visits. More importantly, splitting allows loading only necessary code, often reducing total initial payload significantly. The trade-off strongly favors code splitting.

**Should I move all JavaScript to web workers?**

No. Web workers can't access the DOM, limiting their use cases. Use workers for CPU-intensive operations, data processing, cryptography, calculations, but keep DOM manipulation, event handling, and UI updates on the main thread. Workers complement main thread code; they don't replace it.

**How do I know which third-party scripts to remove?**

Use the "block request domain" feature in Chrome DevTools to selectively block third-party domains and measure performance impact. Scripts providing negligible value but causing significant blocking time (analytics on low-traffic sites, excessive tracking pixels) are prime candidates for removal or lazy-loading.

**Can I use async and defer on the same script?**

Technically yes, but async takes precedence. If both attributes are present, browsers treat the script as async. There's no benefit to combining them, choose one based on your needs (async for independent scripts, defer for scripts requiring complete DOM).

**What's the difference between Total Blocking Time and First Input Delay?**

TBT measures blocking time during page load in lab tests. FID measures real user interaction delays in production. TBT is predictive (lab metric), FID is diagnostic (field metric). Improve TBT in testing to reduce FID for real users.

**Will optimizing for long tasks improve my SEO?**

Indirectly yes. Google's Core Web Vitals include First Input Delay, directly correlated with long tasks. Pages with poor FID may rank lower. Additionally, faster, more responsive pages reduce bounce rates and increase engagement, positive user behavior signals affecting rankings.

**Should I inline critical JavaScript like I inline critical CSS?**

Generally no. Inlining JavaScript bloats HTML, making it uncacheable and increasing initial download size. Unlike CSS (which blocks rendering), JavaScript can load asynchronously. Use async/defer attributes instead of inlining. Exception: Tiny (under 1KB) critical scripts with zero external dependencies.

**How do I handle long tasks in animations?**

Use CSS animations and transitions instead of JavaScript when possible, browser optimizations handle these efficiently. For JavaScript animations, use requestAnimationFrame and keep individual frame work under 16ms. Consider offloading complex calculations to web workers, passing results back for rendering.

**What if my framework (React/Vue/Angular) causes long tasks?**

Modern frameworks can create long tasks during initial mount and rendering. Solutions include: lazy-loading routes/components, implementing virtual scrolling for lists, using production builds (development builds include debugging overhead), code-splitting large components, and considering server-side rendering to shift work from client to server.

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

