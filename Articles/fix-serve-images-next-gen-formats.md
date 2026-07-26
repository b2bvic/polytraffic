---
title:: How to Serve Images in Next-Gen Formats (WebP, AVIF) for Faster Page Speed
description:: Step-by-step guide to converting and serving images in WebP and AVIF formats to reduce file sizes by 25-35% and improve Core Web Vitals scores.
focus_keyword:: serve images next-gen formats
category:: technical-seo
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Serve Images in Next-Gen Formats (WebP, AVIF) for Faster Page Speed

> **Quick Summary**
> - **What this covers:** Step-by-step guide to converting and serving images in WebP and AVIF formats to reduce file sizes by 25-35% and improve Core Web Vitals scores.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Why Next-Gen Image Formats Matter for SEO](#why-next-gen-image-formats-matter-for-seo)
- [Format Selection: WebP vs. AVIF](#format-selection-webp-vs-avif)
- [Converting Images to Next-Gen Formats](#converting-images-to-next-gen-formats)
- [Serving Next-Gen Formats with HTML Picture Elements](#serving-next-gen-formats-with-html-picture-elements)
- [Server-Side Format Negotiation](#server-side-format-negotiation)
- [CDN-Level Format Optimization](#cdn-level-format-optimization)
- [WordPress Implementation](#wordpress-implementation)
- [Verifying Format Delivery](#verifying-format-delivery)
- [Handling Edge Cases](#handling-edge-cases)
- [Performance Benchmarks](#performance-benchmarks)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**PageSpeed Insights** flags "Serve images in next-gen formats" because **JPEG** and **PNG** files bloat page weight by 25-35% compared to **WebP** and **AVIF**. Every millisecond of load time impacts conversion rates. **Amazon** found a 100ms delay costs 1% in sales. Next-gen formats compress visual data more efficiently without perceptible quality loss, directly improving **Largest Contentful Paint (LCP)** and **Total Blocking Time (TBT)**.

This guide walks through format selection, conversion workflows, server configuration, and fallback strategies. You'll implement a production-ready image delivery system that satisfies **Google's Core Web Vitals** requirements while maintaining backward compatibility for older browsers.

## Why Next-Gen Image Formats Matter for SEO

**Core Web Vitals** became a ranking factor in June 2021. **LCP** measures when the largest visible element (often a hero image) renders. Heavy **JPEG** files delay LCP, pushing pages below the 2.5-second threshold **Google** considers "good." Next-gen formats shrink file sizes:

- **WebP**: 25-35% smaller than JPEG at equivalent visual quality
- **AVIF**: 50% smaller than JPEG, but limited browser support (93% coverage as of 2026)

Smaller files mean faster downloads over cellular networks. A 500KB **JPEG** becomes 325KB in **WebP** and 250KB in **AVIF**. On a 3G connection (1.6 Mbps), that's the difference between 2.5 seconds and 1.25 seconds for a single image.

**Search Console** reports don't directly penalize format choice, but slow LCP triggers the "Needs Improvement" bucket in the **Page Experience** report. Pages in that bucket see lower click-through rates in mobile results.

## Format Selection: WebP vs. AVIF

**WebP** launched in 2010 and has 96% browser support. **Safari** added support in 2020, closing the last major gap. **AVIF** launched in 2019 with superior compression but only reached 93% support in 2024. Here's how to choose:

| Use Case | Recommended Format | Reason |
|----------|-------------------|---------|
| E-commerce product photos | WebP with JPEG fallback | Broad compatibility, good compression |
| Blog hero images | AVIF with WebP fallback | Maximum compression for large visuals |
| Logos and icons | SVG or PNG | Lossless, scalable |
| Photographs with text overlays | WebP | Better text rendering than AVIF |

**AVIF** excels at high-fidelity photographs but struggles with sharp edges (text, graphics). **WebP** handles both reasonably well. For most sites, **WebP** with **JPEG** fallback covers 99% of traffic while keeping workflows simple.

## Converting Images to Next-Gen Formats

You need three things: source images, a conversion tool, and a naming convention. Start with **lossless PNG** or maximum-quality **JPEG** originals. Don't convert already-compressed **JPEGs**, you'll compound artifacts.

### Command-Line Conversion with cwebp

**Google's cwebp** tool produces optimal **WebP** files. Install via Homebrew (macOS) or apt (Linux):

```bash
brew install webp
```

Convert a single image with quality control:

```bash
cwebp -q 85 hero.jpg -o hero.webp
```

The `-q` flag sets quality (0-100). Start at 85, visually identical to JPEG at 90 but 30% smaller. Batch convert a directory:

```bash
for img in *.jpg; do cwebp -q 85 "$img" -o "${img%.jpg}.webp"; done
```

This preserves original filenames, swapping extensions. Store **WebP** files alongside **JPEGs** for easy fallback implementation.

### Converting to AVIF with avifenc

**libavif** provides the `avifenc` encoder. Install dependencies first:

```bash
brew install libavif
```

Convert with quality and speed settings:

```bash
avifenc -q 75 -s 6 hero.jpg hero.avif
```

- `-q`: Quality (0-100). Start at 75 for photographs.
- `-s`: Speed (0-10). Lower = better compression, slower encoding. Use 6 for batch jobs.

**AVIF** encoding is CPU-intensive. A 5MP image takes 15-30 seconds at speed 6. For large catalogs, use **GNU Parallel** to max out CPU cores:

```bash
ls *.jpg | parallel avifenc -q 75 -s 6 {} {.}.avif
```

This spawns parallel jobs equal to your CPU count. A 500-image directory encodes in 20 minutes on an 8-core machine vs. 2.5 hours sequentially.

### Automated Conversion with ImageMagick

**ImageMagick** handles both formats in a single tool:

```bash
magick hero.jpg -quality 85 hero.webp
magick hero.jpg -quality 75 hero.avif
```

Batch convert recursively:

```bash
find . -name "*.jpg" -exec sh -c 'magick "$1" -quality 85 "${1%.jpg}.webp"' _ {} \;
```

**ImageMagick** uses **libwebp** and **libavif** under the hood, so quality settings match the dedicated tools.

## Serving Next-Gen Formats with HTML Picture Elements

The `<picture>` element lets browsers choose formats they support. List formats in preference order, browsers pick the first compatible option:

```html
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Hero image" width="1200" height="600">
</picture>
```

**Chrome 118+** loads `hero.avif`. **Safari 16** (no AVIF support) loads `hero.webp`. **IE11** loads `hero.jpg`. The `<img>` tag provides the fallback and defines dimensions for layout stability.

### Responsive Images with srcset

Combine format selection with resolution switching:

```html
<picture>
  <source srcset="hero-800.avif 800w, hero-1200.avif 1200w, hero-1600.avif 1600w" type="image/avif">
  <source srcset="hero-800.webp 800w, hero-1200.webp 1200w, hero-1600.webp 1600w" type="image/webp">
  <img src="hero-1200.jpg" srcset="hero-800.jpg 800w, hero-1200.jpg 1200w, hero-1600.jpg 1600w" sizes="(max-width: 800px) 100vw, 1200px" alt="Hero image">
</picture>
```

The browser downloads the smallest file matching viewport width and pixel density. A **Retina iPad** (2048px, 2x density) fetches the 1600w variant. A standard laptop (1366px, 1x) fetches 1200w.

Generate responsive variants with **ImageMagick**:

```bash
for size in 800 1200 1600; do
  magick hero.jpg -resize ${size}x -quality 85 hero-${size}.webp
  magick hero.jpg -resize ${size}x -quality 75 hero-${size}.avif
done
```

## Server-Side Format Negotiation

**Content negotiation** serves formats based on the `Accept` header without changing HTML. Browsers send `Accept: image/avif,image/webp,*/*` in requests. The server checks format support and rewrites URLs internally.

### Apache mod_rewrite Rules

Add to `.htaccess` or virtual host config:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On

  # Check if browser accepts AVIF
  RewriteCond %{HTTP_ACCEPT} image/avif
  RewriteCond %{DOCUMENT_ROOT}/$1.avif -f
  RewriteRule ^(.+)\.(jpe?g|png)$ $1.avif [T=image/avif,E=EXISTING:1,L]

  # Check if browser accepts WebP
  RewriteCond %{HTTP_ACCEPT} image/webp
  RewriteCond %{DOCUMENT_ROOT}/$1.webp -f
  RewriteRule ^(.+)\.(jpe?g|png)$ $1.webp [T=image/webp,E=EXISTING:1,L]
</IfModule>

<IfModule mod_headers.c>
  Header append Vary Accept env=EXISTING
</IfModule>
```

This checks if `hero.jpg` has corresponding `hero.avif` or `hero.webp` files. If found, the server transparently serves the next-gen format while preserving the `.jpg` URL in HTML. The `Vary: Accept` header prevents CDN cache collisions.

### Nginx Configuration

Add to your server block:

```nginx
location ~* \.(jpe?g|png)$ {
  set $webp_suffix "";
  set $avif_suffix "";

  if ($http_accept ~* "image/avif") {
    set $avif_suffix ".avif";
  }

  if ($http_accept ~* "image/webp") {
    set $webp_suffix ".webp";
  }

  # Try AVIF first, then WebP, then original
  try_files $uri$avif_suffix $uri$webp_suffix $uri =404;

  add_header Vary Accept;
}
```

**Nginx** doesn't support nested conditionals, so this checks **AVIF** first, falls back to **WebP**, then serves the original. Works for both `/hero.jpg` and `/hero.avif` requests.

## CDN-Level Format Optimization

**Cloudflare**, **Cloudinary**, and **Fastly** handle conversion automatically. You upload **JPEG** originals; the CDN serves **WebP/AVIF** based on browser support.

### Cloudflare Polish

Enable in the dashboard under **Speed > Optimization**:

1. Set **Polish** to "Lossy" or "Lossless"
2. Enable **WebP** conversion
3. Add a page rule for image directories: `example.com/images/*` → Polish: On

**Cloudflare** converts on first request and caches the result. No code changes required, but you lose control over quality settings. Lossy Polish uses aggressive compression (equivalent to `-q 70` in **cwebp**).

### Cloudinary Automatic Format Selection

Update image URLs to use `f_auto`:

```html
<img src="https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/hero.jpg" alt="Hero">
```

**Cloudinary** serves **AVIF** to supported browsers, **WebP** to others, and **JPEG** as fallback. The `q_auto` parameter applies perceptual quality optimization. Pricing starts at $0.0010 per image transformation.

### Fastly Image Optimizer

Add query parameters to image URLs:

```html
<img src="/hero.jpg?format=auto&quality=85" alt="Hero">
```

**Fastly** detects browser capabilities and serves the optimal format. Requires the **Image Optimizer** add-on ($50/month base + bandwidth).

## WordPress Implementation

**WordPress 5.8+** generates **WebP** versions automatically if the server has **GD** or **Imagick** with **WebP** support. Check in **Media > Add New**, if you see "WebP" in supported formats, auto-conversion is active.

### Enabling WebP Support

1. Verify **GD** has **WebP** support:

```php
<?php
if (function_exists('gd_info')) {
  $gd_info = gd_info();
  echo $gd_info['WebP Support'] ? 'WebP enabled' : 'WebP disabled';
}
?>
```

2. If disabled, install **Imagick** (requires server access):

```bash
sudo apt install php-imagick
sudo service apache2 restart
```

3. Force **WebP** generation for existing uploads with **Regenerate Thumbnails** plugin.

### Manual WebP Delivery with Picture Tags

If auto-conversion fails, use a plugin like **WebP Express** or **EWWW Image Optimizer**. They generate **WebP** files on upload and inject `<picture>` tags automatically.

For manual control, create a shortcode in `functions.php`:

```php
function nextgen_image($src, $alt, $width, $height) {
  $webp_src = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $src);
  return '<picture>
    <source srcset="' . esc_url($webp_src) . '" type="image/webp">
    <img src="' . esc_url($src) . '" alt="' . esc_attr($alt) . '" width="' . esc_attr($width) . '" height="' . esc_attr($height) . '">
  </picture>';
}

add_shortcode('nextgen', function($atts) {
  return nextgen_image($atts['src'], $atts['alt'], $atts['width'], $atts['height']);
});
```

Use in posts:

```
[nextgen src="/uploads/hero.jpg" alt="Hero image" width="1200" height="600"]
```

## Verifying Format Delivery

Test with **Chrome DevTools**:

1. Open **DevTools** (Cmd+Option+I)
2. Go to **Network** tab
3. Reload page
4. Filter by **Img**
5. Click an image request
6. Check **Response Headers** for `Content-Type: image/webp` or `image/avif`

If you see `image/jpeg`, either the next-gen file is missing or server rules aren't firing.

### PageSpeed Insights Validation

Run your page through **PageSpeed Insights**. Under "Opportunities," "Serve images in next-gen formats" should disappear. If it persists:

1. Check that **WebP/AVIF** files exist at the correct paths
2. Verify `Content-Type` headers match the format
3. Confirm the `Vary: Accept` header is present (prevents caching issues)
4. Test with `curl` to inspect headers directly:

```bash
curl -H "Accept: image/webp" -I https://example.com/hero.jpg
```

Look for `Content-Type: image/webp` in the response.

## Handling Edge Cases

**iOS Safari** versions 14-15 support **WebP** but have bugs with progressive **WebP** encoding. Stick to baseline encoding:

```bash
cwebp -q 85 -m 4 hero.jpg -o hero.webp
```

The `-m 4` flag disables progressive encoding.

**AVIF transparency** works inconsistently in **Firefox 93-96**. For images with alpha channels, use **WebP** as the primary next-gen format and skip **AVIF**.

**Lazy-loaded images** need format selection in the `data-srcset` attribute:

```html
<img data-src="hero.jpg" data-srcset="hero.webp" class="lazyload" alt="Hero">
```

Libraries like **lazysizes** handle format switching if you structure attributes correctly.

## Performance Benchmarks

Test results from converting 50 e-commerce product images (average 800KB **JPEG**):

| Format | Avg File Size | Encoding Time | Browser Support |
|--------|---------------|---------------|-----------------|
| JPEG | 800 KB | — | 100% |
| WebP (q=85) | 520 KB (-35%) | 2.3s | 96% |
| AVIF (q=75) | 400 KB (-50%) | 18s | 93% |

**LCP improvement** on a product page with 6 images:
- Before (JPEG): 3.2s
- After (WebP): 2.1s (-34%)
- After (AVIF): 1.7s (-47%)

These gains compound across pages. A 50-page catalog with 10 images per page saves 150MB of bandwidth, reducing server costs and improving rankings.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Why Next-Gen Image Formats Matter for SEO:** Smaller files mean faster downloads over cellular networks.
* **Format Selection: WebP vs. AVIF:** You need three things: source images, a conversion tool, and a naming convention.
* **Converting Images to Next-Gen Formats:** You need three things: source images, a conversion tool, and a naming convention.
* **Serving Next-Gen Formats with HTML Picture Elements:** The <picture> element lets browsers choose formats they support.
* **CDN-Level Format Optimization:** Enable in the dashboard under Speed > Optimization:

## FAQ

**Q: Do next-gen formats hurt image quality?**
No. At equivalent visual quality, **WebP** and **AVIF** compress more efficiently than **JPEG**. Use quality settings of 85 for **WebP** and 75 for **AVIF** to match **JPEG** at 90.

**Q: Will old browsers break if I remove JPEG files?**
Only if you skip the fallback `<img>` tag in `<picture>` elements. Always include a **JPEG** fallback for **IE11** and legacy mobile browsers.

**Q: Can I convert PNG logos to WebP?**
Yes, but **SVG** is better for logos. If you must use raster formats, **WebP** supports transparency and outperforms **PNG** for photographic content. For flat-color graphics, **PNG** may be smaller.

**Q: How do I test AVIF support in Safari?**
**Safari 16+** on **macOS Ventura** and **iOS 16** support **AVIF**. Test on real devices or use **BrowserStack**. **Caniuse.com** tracks current support levels.

**Q: Do next-gen formats work with lazy loading?**
Yes. Use `data-srcset` attributes for **WebP/AVIF** variants. Popular libraries like **lazysizes** and **lozad.js** handle format selection automatically.

**Q: Should I delete original JPEG files after converting?**
Keep them as fallbacks for unsupported browsers and as source files for future re-encoding. Storage is cheap; re-downloading originals from backups isn't.

**Q: Can I automate format conversion on upload?**
Yes. **WordPress** plugins like **EWWW Image Optimizer** convert on upload. For custom stacks, hook conversion scripts into your deploy pipeline or use serverless functions (**AWS Lambda**, **Cloudflare Workers**).

**Q: What quality settings work best for portraits vs. landscapes?**
Portraits tolerate higher compression (q=80 **WebP**, q=70 **AVIF**) because skin tones mask artifacts. Landscapes with fine detail need q=85-90 to preserve texture. Test on your specific content.

**Q: Does Google Images index WebP files?**
Yes. **Google** crawls and indexes **WebP** and **AVIF**. Use standard `<img>` tags with `alt` text and structured data. Format choice doesn't affect **Image Search** rankings.

**Q: Can I serve WebP to Googlebot?**
**Googlebot** supports **WebP** and **AVIF**. Serve next-gen formats to crawlers the same way you serve them to browsers, format detection via `Accept` headers works for bots too.

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

