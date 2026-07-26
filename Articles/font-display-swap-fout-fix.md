---
title:: How to Fix Font Display FOUT with font-display: swap for Better Performance
description:: Eliminate flash of unstyled text and improve Core Web Vitals by implementing font-display swap, preloading web fonts, and optimizing font loading strategies.
focus_keyword:: font display swap fout fix
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Fix Font Display FOUT with font-display: swap for Better Performance

> **Quick Summary**
> - **What this covers:** Eliminate flash of unstyled text and improve Core Web Vitals by implementing font-display swap, preloading web fonts, and optimizing font loading strategies.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why Font Loading Impacts Core Web Vitals](#why-font-loading-impacts-core-web-vitals)
- [Understanding font-display Values](#understanding-font-display-values)
- [Implementing font-display: swap with Google Fonts](#implementing-font-display-swap-with-google-fonts)
- [Implementing font-display with Custom Fonts](#implementing-font-display-with-custom-fonts)
- [Reducing Layout Shift from Font Swapping](#reducing-layout-shift-from-font-swapping)
- [WordPress Implementation](#wordpress-implementation)
- [Measuring Impact on Core Web Vitals](#measuring-impact-on-core-web-vitals)
- [Advanced Optimization: Font Subsetting](#advanced-optimization-font-subsetting)
- [Fallback Strategies for Edge Cases](#fallback-strategies-for-edge-cases)
- [Common Pitfalls](#common-pitfalls)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**Flash of Unstyled Text (FOUT)** occurs when custom web fonts load slowly, causing text to initially render in fallback system fonts before swapping to the intended typeface. **PageSpeed Insights** flags "Ensure text remains visible during webfont load" when fonts block rendering for more than 100ms. This delays **First Contentful Paint (FCP)** and **Largest Contentful Paint (LCP)**, critical **Core Web Vitals** metrics that directly impact rankings.

The `font-display: swap` CSS property tells browsers to show text immediately in fallback fonts, then swap to custom fonts when loaded. This eliminates render-blocking behavior and improves perceived performance. Combined with font preloading and subsetting, `font-display: swap` can reduce FCP by 500-1000ms on slow connections. This guide covers implementation, alternatives, and optimization strategies.

## Why Font Loading Impacts Core Web Vitals

**Browsers** block text rendering while custom fonts download (FOIT - Flash of Invisible Text). Users see blank space for 1-3 seconds on 3G connections while **Google Fonts** or **Adobe Fonts** load. This delays **FCP** (when any text renders) and **LCP** (when the largest text block renders).

**PageSpeed Insights** penalizes render-blocking resources. Each font file over 100KB adds 500ms+ to load time on mobile. Sites using 4-5 font weights (Regular, Medium, Bold, etc.) download 400-500KB of font data before displaying text.

**Search Console's Core Web Vitals report** groups URLs by performance. Pages with slow FCP/LCP land in "Needs Improvement" or "Poor" buckets. These buckets correlate with 15-20% lower click-through rates in mobile search results. **Google** confirmed Core Web Vitals as ranking factors in the Page Experience update (June 2021).

## Understanding font-display Values

The `font-display` descriptor controls font loading behavior.

### font-display: block

**Default behavior** for most browsers:

1. Browser requests font file
2. Text remains **invisible** for up to 3 seconds (block period)
3. After 3 seconds, fallback font displays if custom font hasn't loaded
4. Custom font swaps in when ready (infinite swap period)

**Problem**: 3 seconds of invisible text kills FCP and frustrates users.

### font-display: swap

**Recommended for most sites**:

1. Browser requests font file
2. Text **immediately displays** in fallback font (no block period)
3. Custom font swaps in when ready (100ms swap period)

**Benefit**: Zero render blocking. Text is readable instantly.

**Trade-off**: Layout shift when font swaps (if fallback and custom fonts have different metrics).

### font-display: fallback

**Middle ground**:

1. Text invisible for 100ms (short block period)
2. Fallback font displays if custom font hasn't loaded
3. Custom font can swap in for 3 seconds (swap period)
4. After 3 seconds, fallback becomes permanent

**Use case**: When avoiding layout shift matters more than instant text.

### font-display: optional

**Performance-first**:

1. Text invisible for 100ms
2. Browser decides if font loads fast enough (usually <100ms)
3. If not, fallback becomes permanent (no swap)

**Use case**: Sites prioritizing CLS (Cumulative Layout Shift) over brand consistency.

### font-display: auto

**Browser default** (usually same as `block`). Avoid, no control.

## Implementing font-display: swap with Google Fonts

**Google Fonts** is the easiest implementation.

### Add display=swap to Embed Code

**Old embed** (blocks rendering):

```html
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
```

**New embed** (with swap):

```html
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
```

Notice the `&display=swap` parameter. **Google Fonts** returns CSS with `font-display: swap` applied to all `@font-face` rules.

### Preload Google Fonts for Faster Delivery

Add `<link rel="preload">` before the stylesheet link:

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" as="style">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
```

This tells the browser to prioritize font CSS in the download queue.

### Self-Host Google Fonts for Maximum Control

Download fonts locally to eliminate external requests:

1. Use **google-webfonts-helper** (google-webfonts-helper.herokuapp.com)
2. Select your font and weights
3. Choose **Modern Browsers** (WOFF2 only)
4. Download the ZIP and extract to `/fonts/` directory

Add to CSS:

```css
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/open-sans-v34-latin-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/open-sans-v34-latin-700.woff2') format('woff2');
}

body {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

**Benefits**: No third-party requests, full caching control, GDPR-friendly (no Google data collection).

## Implementing font-display with Custom Fonts

For **Adobe Fonts**, **Typekit**, or licensed fonts.

### Add font-display to @font-face Rules

In your CSS:

```css
@font-face {
  font-family: 'CustomFont';
  font-style: normal;
  font-weight: 400;
  font-display: swap; /* Add this line */
  src: url('/fonts/customfont-regular.woff2') format('woff2'),
       url('/fonts/customfont-regular.woff') format('woff');
}
```

Repeat for all weights and styles.

### Adobe Fonts font-display Configuration

**Adobe Fonts** (formerly Typekit) doesn't allow `font-display` via embed code. **Workaround**: Override with CSS:

```css
@font-face {
  font-family: 'adobe-font-name';
  font-display: swap; /* Override */
}
```

Place this **after** the Adobe Fonts `<link>` tag. This adds `font-display` to Adobe's auto-generated `@font-face` rules.

### Preload Custom Fonts

Add to `<head>`:

```html
<link rel="preload" href="/fonts/customfont-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/customfont-bold.woff2" as="font" type="font/woff2" crossorigin>
```

**Important**: Include `crossorigin` even for same-origin fonts (CORS requirement for font preloading).

## Reducing Layout Shift from Font Swapping

**Cumulative Layout Shift (CLS)** penalties occur when fallback and custom fonts have different dimensions.

### Match Fallback Font Metrics

Use **Font Style Matcher** (meowni.ca/font-style-matcher) to visually match fallback to custom font:

1. Load your custom font in the tool
2. Adjust fallback font size, line height, letter spacing
3. Copy the adjusted CSS

Example output:

```css
body {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.01em;
}

/* Fallback adjustments */
body {
  font-family: Arial, sans-serif;
  font-size: 16.2px; /* Slightly larger to match Open Sans */
  letter-spacing: -0.005em; /* Tighter spacing */
}
```

This reduces layout shift to <0.01 (well under the 0.1 "Good" threshold).

### Use size-adjust Property (Experimental)

**CSS Fonts Level 4** introduces `size-adjust`:

```css
@font-face {
  font-family: 'Open Sans';
  font-display: swap;
  src: url('/fonts/open-sans-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Arial Fallback';
  size-adjust: 106%; /* Scale Arial to match Open Sans */
  src: local('Arial');
}

body {
  font-family: 'Open Sans', 'Arial Fallback', sans-serif;
}
```

Browser support: **Chrome 92+**, **Edge 92+**, **Safari 16+**. Firefox doesn't support it yet (as of 2026). Use as progressive enhancement.

### Load Critical Fonts Only Above the Fold

Split font loading by priority:

**Critical** (above-fold content):

```html
<link rel="preload" href="/fonts/heading-bold.woff2" as="font" type="font/woff2" crossorigin>
```

**Non-critical** (below-fold):

```html
<link rel="preload" href="/fonts/body-italic.woff2" as="font" type="font/woff2" crossorigin media="print" onload="this.media='all'">
```

This delays non-critical fonts until after the initial render.

## WordPress Implementation

**WordPress** themes often load fonts inefficiently.

### Disable Theme's Default Font Loading

Many themes load **Google Fonts** without `font-display`. Dequeue them in `functions.php`:

```php
function remove_google_fonts() {
  wp_dequeue_style('theme-google-fonts');
  wp_deregister_style('theme-google-fonts');
}
add_action('wp_enqueue_scripts', 'remove_google_fonts', 100);
```

Replace `'theme-google-fonts'` with your theme's handle (view source to find it).

### Enqueue Fonts with font-display

Add your own optimized font loading:

```php
function load_optimized_fonts() {
  wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap', array(), null);
}
add_action('wp_enqueue_scripts', 'load_optimized_fonts');
```

Or self-host:

```php
function load_selfhosted_fonts() {
  wp_enqueue_style('custom-fonts', get_template_directory_uri() . '/fonts/fonts.css', array(), '1.0');
}
add_action('wp_enqueue_scripts', 'load_selfhosted_fonts');
```

In `/fonts/fonts.css`:

```css
@font-face {
  font-family: 'Open Sans';
  font-display: swap;
  src: url('open-sans-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}
```

### Use OMGF Plugin for Automatic Self-Hosting

**OMGF (Optimize My Google Fonts)** auto-downloads and self-hosts **Google Fonts**:

1. Install **OMGF**
2. Go to **Settings > Optimize Google Fonts**
3. Click **Start Optimization**
4. Plugin downloads fonts, adds `font-display: swap`, and rewrites URLs

**OMGF** handles updates automatically, recheck for font updates monthly.

## Measuring Impact on Core Web Vitals

Track improvements after implementing `font-display: swap`.

### PageSpeed Insights Before/After

Run **PageSpeed Insights** (pagespeed.web.dev):

**Before**:
- **FCP**: 2.4s
- **LCP**: 3.1s
- Opportunity: "Ensure text remains visible during webfont load" (save 800ms)

**After**:
- **FCP**: 1.6s (-800ms)
- **LCP**: 2.3s (-800ms)
- Opportunity cleared

### Chrome DevTools Performance Tab

Record a page load:

1. Open **DevTools** > **Performance**
2. Click **Record** and reload the page
3. Stop recording
4. Check **FCP** and **LCP** markers in the timeline

**Before**: Long white gap before text renders.
**After**: Text appears immediately (FCP advances).

### Search Console Core Web Vitals Report

**Search Console > Experience > Core Web Vitals**:

Monitor the "Good URLs" count over 28 days. After implementing `font-display: swap`, "Poor" and "Needs Improvement" URLs should migrate to "Good."

**Note**: Field data updates slowly, allow 28 days for statistically significant changes.

## Advanced Optimization: Font Subsetting

Reduce font file sizes by removing unused characters.

### Subset Google Fonts

Add `&text=` parameter to load only specific characters:

```html
<link href="https://fonts.googleapis.com/css2?family=Open+Sans&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" rel="stylesheet">
```

This creates a tiny font file with only English alphanumerics. Use for logos or headings with predictable text.

For full subsetting, use **glyphhanger**:

```bash
npm install -g glyphhanger
glyphhanger https://example.com --subset=fonts/OpenSans-Regular.ttf --formats=woff2
```

This analyzes your site, determines used characters, and generates a subset WOFF2 file.

### Subset with Fonttools (Python)

```bash
pip install fonttools brotli
pyftsubset font.ttf --output-file=font-subset.woff2 --flavor=woff2 --unicodes=U+0020-007F
```

`U+0020-007F` is basic Latin (English). Expand for other languages.

## Fallback Strategies for Edge Cases

### Detect Slow Connections and Skip Fonts

Use **Network Information API**:

```javascript
if ('connection' in navigator && navigator.connection.effectiveType === '2g') {
  // Don't load custom fonts on 2G
  document.body.style.fontFamily = 'Arial, sans-serif';
} else {
  // Load fonts normally
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}
```

### Use Font Loading API for Fine Control

```javascript
const font = new FontFace('Open Sans', 'url(/fonts/open-sans.woff2)');

font.load().then(function(loadedFont) {
  document.fonts.add(loadedFont);
  document.body.style.fontFamily = 'Open Sans, sans-serif';
}).catch(function(error) {
  console.log('Font failed to load:', error);
  // Fallback to system font
});
```

This gives programmatic control over font loading timing.

## Common Pitfalls

### Overriding font-display with !important

Don't use `!important` on `font-display`:

```css
/* Bad */
@font-face {
  font-display: swap !important;
}
```

`!important` doesn't work in `@font-face` rules. use `font-display: swap` directly.

### Loading Too Many Font Weights

Each weight is a separate file. Sites loading 6+ weights download 600-800KB:

- Regular (400)
- Medium (500)
- Semi-Bold (600)
- Bold (700)
- Extra-Bold (800)
- Black (900)

**Fix**: Use only Regular (400) and Bold (700). Use CSS `font-weight: 600` on Regular, browsers simulate Medium weight.

### Forgetting Italic Variants

If you use italics, load italic variants explicitly:

```css
@font-face {
  font-family: 'Open Sans';
  font-display: swap;
  font-style: italic; /* Important */
  font-weight: 400;
  src: url('/fonts/open-sans-italic.woff2') format('woff2');
}
```

Without this, browsers synthesize italics (fake slant), which looks poor.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why Font Loading Impacts Core Web Vitals:** The font-display descriptor controls font loading behavior.
* **Understanding font-display Values:** The font-display descriptor controls font loading behavior.
* **Implementing font-display with Custom Fonts:** For Adobe Fonts, Typekit, or licensed fonts.
* **Reducing Layout Shift from Font Swapping:** Use Font Style Matcher (meowni.ca/font-style-matcher) to visually match fallback to custom font:
* **WordPress Implementation:** Many themes load Google Fonts without font-display.

## FAQ

**Q: Does font-display: swap hurt CLS?**
Yes, slightly. The font swap causes layout shift. Use metric-matched fallbacks to minimize CLS impact.

**Q: Should I use swap for all fonts?**
For body text, yes. For logos or critical brand elements, consider `fallback` or `optional` to avoid jarring swaps.

**Q: Can I use font-display with icon fonts?**
Yes, but consider switching to SVG icons, they're more flexible and don't block rendering.

**Q: Does font-display work in all browsers?**
**Chrome, Firefox, Safari, Edge** all support it (96%+ coverage as of 2026). Older browsers ignore it and fall back to default behavior.

**Q: How do I test FOUT locally?**
Use **Chrome DevTools > Network** tab, throttle to **Slow 3G**, and reload. You'll see fallback text swap to custom font.

**Q: Can I animate font swaps to reduce jarring effect?**
Yes, with CSS:

```css
body {
  font-family: 'Open Sans', Arial, sans-serif;
  transition: font-family 0.3s ease;
}
```

This smooths the swap slightly.

**Q: Should I preload all font weights?**
No. Only preload critical fonts (Regular, Bold for body text). Defer decorative weights.

**Q: Does font-display affect PDF rendering?**
No. PDF fonts are embedded in the file. Web font loading doesn't apply.

**Q: Can I use font-display with variable fonts?**
Yes. Variable fonts support `font-display` like regular fonts but load as a single file covering all weights.

**Q: How do I prevent layout shift completely?**
Use `font-display: optional` (no swap) or perfectly match fallback metrics with `size-adjust`.

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

