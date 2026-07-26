---
title:: Responsive Images: Complete srcset and sizes Attribute Guide
description:: Master responsive images with srcset and sizes attributes. Reduce bandwidth, improve Core Web Vitals, and serve optimal images per viewport.
focus_keyword:: responsive images srcset sizes
category:: Performance
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Responsive Images: Complete srcset and sizes Attribute Guide

> **Quick Summary**
> - **What this covers:** Master responsive images with srcset and sizes attributes. Reduce bandwidth, improve Core Web Vitals, and serve optimal images per viewport.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why Responsive Images Matter for SEO](#why-responsive-images-matter-for-seo)
- [srcset Syntax: Resolution and Width Descriptors](#srcset-syntax-resolution-and-width-descriptors)
- [sizes Attribute: Declaring Image Layout Dimensions](#sizes-attribute-declaring-image-layout-dimensions)
- [Combining srcset and sizes for Art Direction](#combining-srcset-and-sizes-for-art-direction)
- [Modern Image Formats: WebP and AVIF in srcset](#modern-image-formats-webp-and-avif-in-srcset)
- [Lazy Loading with loading="lazy"](#lazy-loading-with-loading-lazy)
- [Preventing Layout Shifts with Width and Height](#preventing-layout-shifts-with-width-and-height)
- [Automating Responsive Image Generation](#automating-responsive-image-generation)
- [Testing Responsive Image Implementation](#testing-responsive-image-implementation)
- [Common Pitfalls and Fixes](#common-pitfalls-and-fixes)
- [Responsive Images in CSS (background-image)](#responsive-images-in-css-background-image)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Serving desktop-resolution images to mobile devices wastes bandwidth, inflates page weight, and degrades Core Web Vitals scores. A 1920×1080 hero image appropriate for 27-inch monitors downloads entirely on 375px smartphone screens, consuming cellular data and delaying Largest Contentful Paint (LCP). **Responsive images** solve this by instructing browsers to request image variants sized appropriately for viewport dimensions and display density.

The `srcset` and `sizes` attributes provide declarative syntax for specifying multiple image sources and selection criteria. Browsers choose optimal variants based on screen width, pixel density, and bandwidth conditions, automatically, without JavaScript. Properly implemented responsive images reduce median page weight by 35-50% on mobile while maintaining visual quality.

## Why Responsive Images Matter for SEO

**Core Web Vitals impact:** LCP measures when the largest visible element renders. Hero images, featured graphics, and product photos frequently constitute the LCP element. Oversized images delay LCP, failing the 2.5-second threshold and incurring ranking penalties.

**Mobile-first indexing:** Google's crawler primarily evaluates mobile performance. Sites serving desktop images to mobile experience slower LCP, higher bounce rates, and lower rankings. Responsive images ensure mobile users download appropriately sized assets.

**Bandwidth efficiency:** Mobile users on metered connections abandon pages that consume excessive data. Responsive images reduce transfer sizes by 60-80% on small viewports, improving engagement metrics that correlate with rankings.

**Lazy loading synergy:** Combining responsive images with [native lazy loading](intersection-observer-lazy-loading.html) further optimizes performance, browsers defer loading and request appropriately sized images only when elements near the viewport.

**Real-world measurement:** PageSpeed Insights flags "Properly size images" when images exceed display dimensions by 4KB+. The audit quantifies potential savings. Sites with savings exceeding 200KB typically see measurable LCP improvements after implementing responsive images.

## srcset Syntax: Resolution and Width Descriptors

The `srcset` attribute lists image sources with associated descriptors. Browsers use descriptors to select the optimal variant.

**Resolution descriptors (`x`):** Specify pixel density multipliers for high-DPI displays (Retina, 4K).

```html
<img
  src="image-1x.jpg"
  srcset="image-1x.jpg 1x, image-2x.jpg 2x, image-3x.jpg 3x"
  alt="Logo">
```

Browsers with 1x pixel density (96 DPI) request `image-1x.jpg`. Retina displays (2x, 192 DPI) request `image-2x.jpg`. High-resolution monitors (3x, 288 DPI) request `image-3x.jpg`.

**Use case:** Fixed-size images like logos, icons, and UI elements that don't scale with viewport.

**Width descriptors (`w`):** Specify intrinsic image widths in pixels. Browsers combine this with the `sizes` attribute to calculate optimal source.

```html
<img
  srcset="small.jpg 480w, medium.jpg 1024w, large.jpg 1920w"
  sizes="100vw"
  src="medium.jpg"
  alt="Hero image">
```

The `480w` descriptor means `small.jpg` is 480 pixels wide. Browsers calculate which source provides sufficient resolution without unnecessary data transfer.

**Formula:** Browser selects the smallest source where `image-width / viewport-width >= pixel-density`.

For a 375px viewport at 2x density:
- Effective resolution needed: 375 × 2 = 750px
- Browser selects `medium.jpg` (1024w) because 1024 > 750 and it's smaller than `large.jpg`

**Best practice:** Provide sources at 480w, 768w, 1024w, 1366w, 1920w, and 2560w to cover mobile, tablet, laptop, desktop, and 4K displays.

## sizes Attribute: Declaring Image Layout Dimensions

The `sizes` attribute tells browsers what portion of the viewport the image occupies at various breakpoints. Without `sizes`, browsers assume `100vw` (full viewport width).

**Syntax:** Media queries paired with length values.

```html
<img
  srcset="small.jpg 480w, medium.jpg 1024w, large.jpg 1920w"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33.3vw"
  src="medium.jpg"
  alt="Product image">
```

**Translation:**
- Viewports ≤768px: Image fills 100% viewport width → select source ≥ viewport width × pixel density
- Viewports 769-1024px: Image occupies 50% viewport → select source ≥ (viewport × 0.5) × pixel density
- Viewports >1024px: Image occupies 33.3% viewport → select source ≥ (viewport × 0.333) × pixel density

**Example calculation for 1200px viewport at 2x density:**
- Sizes evaluates to 33.3vw → 1200 × 0.333 = 400px
- Effective resolution: 400 × 2 = 800px
- Browser selects `medium.jpg` (1024w) because it's the smallest source ≥800px

**Absolute units:** You can specify fixed sizes if layout is predictable:

```html
sizes="(max-width: 768px) 100vw, 800px"
```

On viewports >768px, the image displays at exactly 800px width regardless of viewport size.

**Multiple conditions:** Order matters, browsers evaluate conditions left to right, using the first match:

```html
sizes="(max-width: 480px) 100vw,
       (max-width: 768px) 50vw,
       (max-width: 1024px) 33.3vw,
       25vw"
```

The final value (`25vw`) acts as the default if no conditions match.

**Common mistake:** Setting `sizes` that don't match actual CSS layout. If CSS renders the image at 50vw but `sizes` declares 100vw, the browser requests unnecessarily large sources.

## Combining srcset and sizes for Art Direction

**Art direction** means serving different image crops or compositions for different viewports, not resizing, but reframing content.

Use the `<picture>` element with `<source>` tags specifying different `srcset` per media query:

```html
<picture>
  <source
    media="(max-width: 768px)"
    srcset="portrait-small.jpg 480w, portrait-medium.jpg 768w"
    sizes="100vw">
  <source
    media="(max-width: 1024px)"
    srcset="landscape-medium.jpg 1024w, landscape-large.jpg 1366w"
    sizes="100vw">
  <img
    srcset="landscape-large.jpg 1366w, landscape-xlarge.jpg 1920w"
    sizes="100vw"
    src="landscape-large.jpg"
    alt="Hero banner">
</picture>
```

**How it works:**
- Viewports ≤768px: Browser uses `portrait-small.jpg` or `portrait-medium.jpg`
- Viewports 769-1024px: Browser uses `landscape-medium.jpg` or `landscape-large.jpg`
- Viewports >1024px: Browser uses `landscape-large.jpg` or `landscape-xlarge.jpg`

The `<img>` element acts as fallback for browsers that don't support `<picture>`.

**Use cases:**
- Mobile: Portrait-oriented crop focusing on subject's face
- Desktop: Wide landscape showing environmental context
- Different aspect ratios per device (16:9 on desktop, 4:3 on mobile)

**SEO consideration:** Use identical `alt` text across sources. Google indexes the `<img>` element's attributes, which apply regardless of which source loads.

## Modern Image Formats: WebP and AVIF in srcset

**WebP** provides 25-35% smaller file sizes than JPEG at equivalent quality. **AVIF** offers 40-50% savings but has lower browser support (89% vs. 97% as of 2026).

Serve modern formats with fallbacks using `<picture>`:

```html
<picture>
  <source
    type="image/avif"
    srcset="image-small.avif 480w, image-medium.avif 1024w, image-large.avif 1920w"
    sizes="100vw">
  <source
    type="image/webp"
    srcset="image-small.webp 480w, image-medium.webp 1024w, image-large.webp 1920w"
    sizes="100vw">
  <img
    srcset="image-small.jpg 480w, image-medium.jpg 1024w, image-large.jpg 1920w"
    sizes="100vw"
    src="image-medium.jpg"
    alt="Product showcase">
</picture>
```

Browsers evaluate sources top-to-bottom, selecting the first supported format. Browsers supporting AVIF download `.avif` files. Browsers lacking AVIF support but supporting WebP download `.webp`. Legacy browsers fall back to JPEG.

**Savings example:** A 1920×1080 hero image:
- JPEG (quality 80): 340KB
- WebP (equivalent quality): 220KB (35% savings)
- AVIF (equivalent quality): 180KB (47% savings)

**Generation tools:**
- **ImageMagick:** `convert input.jpg -quality 80 output.webp`
- **cwebp CLI:** `cwebp -q 80 input.jpg -o output.webp`
- **Squoosh CLI:** `squoosh-cli --webp '{quality: 80}' input.jpg`
- **Sharp (Node.js):** `sharp('input.jpg').webp({quality: 80}).toFile('output.webp')`

**CDN automation:** Cloudflare, Imgix, and Cloudinary automatically convert images to WebP/AVIF based on client support via `Accept` header negotiation.

## Lazy Loading with loading="lazy"

Native lazy loading defers image requests until elements approach the viewport, reducing initial page weight and improving LCP by prioritizing above-the-fold content.

```html
<img
  srcset="small.jpg 480w, medium.jpg 1024w, large.jpg 1920w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="medium.jpg"
  alt="Below-the-fold image"
  loading="lazy"
  width="1024"
  height="768">
```

**Browser behavior:**
- Images marked `loading="lazy"` don't load until they're ~1200px from entering the viewport (threshold varies by browser and connection speed)
- Browsers request appropriately sized sources based on viewport dimensions and pixel density
- Native lazy loading has 93%+ browser support as of 2026

**Critical content exception:** **Never lazy-load LCP elements**. The LCP image (typically hero banners, featured graphics) must load immediately. Lazy-loading LCP elements delays rendering and harms performance.

```html
<!-- Hero image: NO lazy loading -->
<img
  srcset="hero-small.jpg 480w, hero-medium.jpg 1024w, hero-large.jpg 1920w"
  sizes="100vw"
  src="hero-medium.jpg"
  alt="Featured product"
  fetchpriority="high"
  width="1920"
  height="1080">

<!-- Below-fold image: YES lazy loading -->
<img
  srcset="gallery-small.jpg 480w, gallery-medium.jpg 1024w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="gallery-medium.jpg"
  alt="Gallery image"
  loading="lazy"
  width="1024"
  height="768">
```

The `fetchpriority="high"` attribute signals browsers to prioritize the LCP image, further optimizing load times.

## Preventing Layout Shifts with Width and Height

Images without explicit dimensions cause Cumulative Layout Shift (CLS) when they load, browsers allocate zero height initially, then reflow the layout once image dimensions arrive.

**Always specify width and height attributes:**

```html
<img
  srcset="small.jpg 480w, medium.jpg 1024w, large.jpg 1920w"
  sizes="100vw"
  src="medium.jpg"
  alt="Hero image"
  width="1920"
  height="1080">
```

Modern browsers calculate aspect ratio from attributes and [reserve space](reserve-space-for-dynamic-content.html) before the image loads, preventing CLS.

**CSS maintains responsiveness:**

```css
img {
  max-width: 100%;
  height: auto;
}
```

The image scales to container width while maintaining aspect ratio derived from `width` and `height` attributes.

**Aspect ratio property:** For decorative containers or background images, use CSS `aspect-ratio`:

```css
.hero-container {
  aspect-ratio: 16 / 9;
  background-image: url('hero.jpg');
  background-size: cover;
}
```

This reserves a 16:9 box before the background image loads.

## Automating Responsive Image Generation

Manually creating 5-6 variants per image doesn't scale. Automate generation via:

**Build tools:**

**Webpack (responsive-loader plugin):**

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png)$/i,
        use: {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
            sizes: [480, 768, 1024, 1366, 1920],
            format: 'webp',
          },
        },
      },
    ],
  },
};
```

Import images in code:

```javascript
import heroImage from './hero.jpg';

// heroImage contains srcset string with all variants
<img srcSet={heroImage.srcSet} src={heroImage.src} alt="Hero" />
```

**Eleventy (eleventy-img plugin):**

```javascript
const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [480, 768, 1024, 1920],
    formats: ['avif', 'webp', 'jpeg'],
    outputDir: './dist/img/',
  });

  let imageAttributes = { alt, sizes, loading: 'lazy', decoding: 'async' };
  return Image.generateHTML(metadata, imageAttributes);
}
```

Use in templates:

```html
{% image "hero.jpg", "Hero banner", "100vw" %}
```

**CDNs:**

**Cloudinary URL parameters:**

```html
<img
  srcset="
    https://res.cloudinary.com/demo/image/upload/w_480,f_auto/sample.jpg 480w,
    https://res.cloudinary.com/demo/image/upload/w_1024,f_auto/sample.jpg 1024w,
    https://res.cloudinary.com/demo/image/upload/w_1920,f_auto/sample.jpg 1920w"
  sizes="100vw"
  src="https://res.cloudinary.com/demo/image/upload/w_1024,f_auto/sample.jpg"
  alt="Sample image">
```

The `w_` parameter resizes dynamically. `f_auto` selects optimal format (AVIF, WebP, JPEG) based on client support.

**Imgix:**

```html
<img
  srcset="
    https://demo.imgix.net/sample.jpg?w=480&auto=format 480w,
    https://demo.imgix.net/sample.jpg?w=1024&auto=format 1024w,
    https://demo.imgix.net/sample.jpg?w=1920&auto=format 1920w"
  sizes="100vw"
  src="https://demo.imgix.net/sample.jpg?w=1024&auto=format"
  alt="Sample image">
```

**WordPress:** Jetpack and ShortPixel automatically generate responsive variants and insert `srcset` attributes.

## Testing Responsive Image Implementation

**DevTools Network Panel:**

1. Open Chrome DevTools → Network tab
2. Filter by Img
3. Throttle network to Fast 3G
4. Resize viewport from 375px (mobile) to 1920px (desktop)
5. Refresh page for each viewport size
6. Verify correct image variant loads per viewport

**Expected behavior:** At 375px viewport, the 480w image loads. At 1920px viewport, the 1920w image loads. If the same large image loads on mobile, `srcset` or `sizes` is misconfigured.

**Lighthouse audit:**

Run Lighthouse via DevTools or PageSpeed Insights. The "Properly size images" audit reports oversized images:

- **Potential savings >10KB:** High priority, images significantly exceed display dimensions
- **Actual transfer size vs. ideal size:** Shows how much bandwidth waste occurs

Fix by adding smaller variants to `srcset`.

**Real User Monitoring (RUM):**

Track LCP impact via web-vitals library:

```javascript
import {getLCP} from 'web-vitals';

getLCP(metric => {
  console.log('LCP:', metric.value);
  console.log('LCP Element:', metric.entries[0].element);
});
```

Correlate LCP improvements with responsive image deployment. Expect 20-40% LCP reduction for image-heavy pages.

**Manual srcset validation:**

Use browser console to check selected source:

```javascript
document.querySelector('img').currentSrc
```

This reveals which `srcset` source the browser chose. Compare against viewport width and pixel density to verify correct selection.

## Common Pitfalls and Fixes

**Pitfall: sizes doesn't match CSS layout**

If CSS renders an image at 50vw but `sizes="100vw"`, the browser requests sources double the necessary width.

**Fix:** Audit actual rendered sizes via DevTools Elements panel → Computed styles. Match `sizes` attribute to real display width.

**Pitfall: Missing width/height attributes**

Images with `srcset` but no dimensions cause CLS when variants load with different aspect ratios.

**Fix:** Always include `width` and `height` matching the largest `srcset` variant's dimensions. Browsers calculate ratio and scale accordingly.

**Pitfall: Lazy-loading LCP images**

Marking the hero image `loading="lazy"` delays LCP, harming Core Web Vitals.

**Fix:** Only lazy-load below-the-fold images. Use `fetchpriority="high"` on LCP images.

**Pitfall: Incorrect descriptor syntax**

Using commas incorrectly or mixing `w` and `x` descriptors breaks parsing.

**Incorrect:**
```html
srcset="small.jpg, 480w medium.jpg, 1024w"
```

**Correct:**
```html
srcset="small.jpg 480w, medium.jpg 1024w"
```

**Pitfall: Serving AVIF/WebP without fallback**

Browsers lacking support display broken images if fallback `<img>` missing.

**Fix:** Always include JPEG/PNG fallback in `<img>` element within `<picture>`.

**Pitfall: Oversized intrinsic image dimensions**

Uploading 4000×3000 source images when max display size is 1920px wastes processing and bandwidth.

**Fix:** Resize master images to 2560px (covers 4K displays) before generating responsive variants.

## Responsive Images in CSS (background-image)

CSS background images don't support `srcset`, but you can use media queries or `image-set()`:

**Media queries:**

```css
.hero {
  background-image: url('hero-small.jpg');
}

@media (min-width: 768px) {
  .hero {
    background-image: url('hero-medium.jpg');
  }
}

@media (min-width: 1920px) {
  .hero {
    background-image: url('hero-large.jpg');
  }
}
```

**image-set() function (88% browser support):**

```css
.hero {
  background-image: image-set(
    url('hero-small.webp') type('image/webp') 1x,
    url('hero-medium.webp') type('image/webp') 2x,
    url('hero-small.jpg') 1x,
    url('hero-medium.jpg') 2x
  );
}
```

Browsers select the first supported format and appropriate resolution.

**Recommendation:** Use `<img>` with `srcset` for content images. Reserve CSS backgrounds for decorative elements where alt text isn't required.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why Responsive Images Matter for SEO:** The srcset attribute lists image sources with associated descriptors.
* **srcset Syntax: Resolution and Width Descriptors:** The srcset attribute lists image sources with associated descriptors.
* **sizes Attribute: Declaring Image Layout Dimensions:** The sizes attribute tells browsers what portion of the viewport the image occupies at various breakpoints.
* **Combining srcset and sizes for Art Direction:** Use the <picture> element with <source> tags specifying different srcset per media query:
* **Modern Image Formats: WebP and AVIF in srcset:** Serve modern formats with fallbacks using <picture>:
* **Lazy Loading with loading="lazy":** Native lazy loading defers image requests until elements approach the viewport, reducing initial page weight and improving LCP by prioritizing above-the-fold content.

## Frequently Asked Questions

**Do I need different srcset sources for WebP and JPEG?**

Yes, if using `<picture>` to serve multiple formats. Each `<source>` element needs its own `srcset`:

```html
<picture>
  <source type="image/webp" srcset="image-480.webp 480w, image-1024.webp 1024w">
  <img srcset="image-480.jpg 480w, image-1024.jpg 1024w" src="image-1024.jpg" alt="Image">
</picture>
```

**Can I use srcset with SVG images?**

SVGs scale infinitely without quality loss, so responsive variants aren't necessary. Use a single SVG file:

```html
<img src="logo.svg" alt="Logo" width="200" height="50">
```

If the SVG is large (complex illustrations), consider rasterizing to PNG/WebP for smaller viewports.

**How many srcset variants should I create?**

Minimum 3 (small, medium, large). Ideal is 5-6 covering:
- 480w (mobile portrait)
- 768w (mobile landscape, small tablet)
- 1024w (tablet, small laptop)
- 1366w (laptop)
- 1920w (desktop, Full HD)
- 2560w (4K displays)

Diminishing returns beyond 6 variants, file size savings decrease while complexity increases.

**Does srcset work with lazy loading?**

Yes. Combine `srcset`, `sizes`, and `loading="lazy"`:

```html
<img
  srcset="small.jpg 480w, medium.jpg 1024w"
  sizes="100vw"
  src="medium.jpg"
  alt="Image"
  loading="lazy"
  width="1024"
  height="768">
```

When the image approaches the viewport, the browser requests the appropriate `srcset` variant based on viewport size and pixel density.

**Why does my browser still download large images on mobile?**

Likely causes:
1. **sizes attribute missing or incorrect:** Browser defaults to `100vw`, selecting larger sources than necessary
2. **Preloading overrides srcset:** `<link rel="preload" as="image" href="large.jpg">` downloads the specified image regardless of `srcset`
3. **Cache headers:** Browser cached large image from previous desktop visit

Fix by verifying `sizes` matches CSS layout and avoiding image preloads when using `srcset`.

**Should I include the original high-res image in srcset?**

Only if you expect users on 4K/5K displays. For most sites, 1920w or 2560w is sufficient. Including 4000w+ variants wastes server storage and processing without meaningful quality improvement.

**How do I handle retina displays with srcset?**

Width descriptors (`w`) automatically account for pixel density. A 375px viewport at 2x density needs 750px effective resolution, browsers select `srcset` sources accordingly. You don't need separate 1x/2x/3x sources when using width descriptors.

**Can I mix resolution (x) and width (w) descriptors?**

No. Use one descriptor type per `srcset`. Width descriptors (`w`) with `sizes` handle responsive layout. Resolution descriptors (`x`) suit fixed-size images like logos. Mixing them is invalid syntax.

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
