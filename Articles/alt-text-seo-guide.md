---
title:: How to Add Alt Text That Actually Helps SEO
description:: Alt text isn't keyword stuffing. Write descriptions that serve blind users and you'll rank in image search. This guide shows what works.
focus_keyword:: alt text SEO best practices
category:: on-page
author:: Victor Valentine Romo
date:: 2026.03.20
---

# How to Add Alt Text That Helps SEO

> **Quick Summary**
> - **What this covers:** Alt text isn't keyword stuffing. Write descriptions that serve blind users and you'll rank in image search. This guide shows what works.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [What Alt Text Is (and Isn't)](#what-alt-text-is-and-isn-t)
- [How to Write Good Alt Text](#how-to-write-good-alt-text)
- [When to Leave Alt Text Empty](#when-to-leave-alt-text-empty)
- [Alt Text for Different Image Types](#alt-text-for-different-image-types)
- [How to Add Alt Text in Different Platforms](#how-to-add-alt-text-in-different-platforms)
- [Alt Text and SEO](#alt-text-and-seo)
- [Common Alt Text Mistakes](#common-alt-text-mistakes)
- [Alt Text Audit Process](#alt-text-audit-process)
- [Alt Text vs. Image File Names vs. Captions](#alt-text-vs-image-file-names-vs-captions)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Alt text (alternative text) describes images for screen readers and serves as a fallback when images fail to load. Google also uses alt text to understand what an image depicts, which affects image search rankings and contextual relevance for the page.

Most sites either skip alt text entirely or stuff it with keywords. Both approaches waste an opportunity to rank in image search and improve accessibility. This guide shows how to write alt text that serves users and search engines without keyword spam.

## What Alt Text Is (and Isn't)

Alt text is an HTML attribute added to `<img>` tags:

```html
<img src="office-desk-setup.jpg" alt="Minimalist office desk with dual monitors, mechanical keyboard, and notebook">
```

### What Alt Text Does

1. **Describes images for screen reader users**. Visually impaired users rely on screen readers to understand page content. Without alt text, images are invisible to them.
2. **Provides context when images don't load**. Slow connections, broken links, or browser settings may prevent images from displaying. Alt text shows in place of the image.
3. **Helps Google understand image content**. Google's image recognition is good but not perfect. Alt text clarifies what the image shows and how it relates to the page topic.
4. **Improves rankings in Google Image Search**. Images with descriptive alt text rank better in image search results.

### What Alt Text Isn't

- **Not a caption**. Captions appear below images and are visible to all users. Alt text is only read by screen readers or shown when images fail to load.
- **Not a place to stuff keywords** "SEO services SEO company SEO agency" as alt text is spam and violates accessibility guidelines.
- **Not a file name** `IMG_4732.jpg` tells users nothing. Alt text should describe what's in the image.

## How to Write Good Alt Text

### Rule 1: Describe What You See

Imagine explaining the image to someone who can't see it. What's important in the image? What does it depict?

**Product image:**
```html
<img src="blue-leather-sofa.jpg" alt="Blue leather three-seat sofa with tufted cushions and wooden legs">
```

**Screenshot:**
```html
<img src="google-analytics-traffic-report.jpg" alt="Google Analytics dashboard showing 12,458 sessions in January 2026">
```

**Infographic:**
```html
<img src="seo-ranking-factors.jpg" alt="Bar chart comparing SEO ranking factors: backlinks 35%, content quality 30%, page speed 20%, technical SEO 15%">
```

### Rule 2: Include Context When Relevant

If the image supports specific content on the page, reference that context in the alt text.

**Example:** On a blog post about fixing redirect chains, you include a screenshot of Screaming Frog showing redirect chains.

Bad:
```html
<img src="screenshot.jpg" alt="Screaming Frog screenshot">
```

Good:
```html
<img src="redirect-chains-screaming-frog.jpg" alt="Screaming Frog redirect chain report showing 47 redirect chains on example.com">
```

The good version describes what the screenshot shows and ties it to the page content.

### Rule 3: Keep It Concise (125 Characters or Less)

Screen readers cut off alt text after 125 characters. Aim for concise descriptions that communicate the essential information.

Too long:
```html
<img src="laptop.jpg" alt="A silver laptop computer sitting on a wooden desk next to a cup of coffee, a notebook, and a pen, with sunlight streaming through a nearby window">
```

Better:
```html
<img src="laptop.jpg" alt="Silver laptop on wooden desk with coffee and notebook">
```

### Rule 4: Skip "Image of" or "Picture of"

Screen readers already announce "image," so adding "image of" is redundant.

Bad:
```html
<img src="mountains.jpg" alt="Image of mountains at sunset">
```

Good:
```html
<img src="mountains.jpg" alt="Mountains at sunset with orange and purple sky">
```

### Rule 5: Use Keywords Naturally (Don't Stuff)

If your focus keyword naturally describes the image, include it. If not, don't force it.

**Example:** On a page about "minimalist office desk setup," you include a photo of a minimalist office desk.

Natural keyword use:
```html
<img src="desk-setup.jpg" alt="Minimalist office desk setup with single monitor and wireless keyboard">
```

Keyword stuffing:
```html
<img src="desk-setup.jpg" alt="Minimalist office desk setup minimalist desk minimalist workspace home office desk setup">
```

Google identifies keyword stuffing and may penalize the page.

## When to Leave Alt Text Empty

Some images are purely decorative and don't add meaning to the content. For these, use an empty alt attribute: `alt=""`.

### Decorative Images That Should Have Empty Alt

- **Background patterns or textures**. Purely aesthetic, no informational value
- **Spacer images**. Used for layout purposes (these shouldn't exist in modern CSS-based layouts)
- **Divider lines or ornamental graphics**. Don't contribute to understanding the content
- **Icons that are labeled in text**. If an icon is immediately followed by text describing it, the icon is redundant

**Example:**
```html
<img src="divider-line.png" alt="">
```

Screen readers skip images with empty alt attributes, avoiding unnecessary clutter.

### When Not to Leave Alt Empty

If the image conveys information, even if it's supplementary, write alt text. This includes:
- Product images
- Charts, graphs, infographics
- Screenshots showing how to do something
- Photos of people, places, or events relevant to the content

## Alt Text for Different Image Types

### Product Images

Describe the product, color, size, and distinguishing features.

```html
<img src="running-shoe.jpg" alt="Nike Air Zoom Pegasus 40 running shoe in black and white, size 10">
```

### Screenshots

Describe what the screenshot shows and its relevance to the page.

```html
<img src="wordpress-plugin-install.jpg" alt="WordPress plugin installation screen with Yoast SEO plugin highlighted">
```

### Infographics and Charts

Summarize the key data or message.

```html
<img src="conversion-rate-chart.jpg" alt="Line graph showing conversion rate increasing from 2.1% in January to 3.8% in December">
```

For complex infographics, consider providing a full text alternative in addition to alt text (e.g., a detailed description in the page content or a linked transcript).

### Logos

Use the company or brand name.

```html
<img src="company-logo.png" alt="Acme Corporation logo">
```

If the logo is linked, describe the destination:

```html
<a href="/"><img src="logo.png" alt="Acme Corporation homepage"></a>
```

### Headshots and Team Photos

Include the person's name and role.

```html
<img src="john-doe.jpg" alt="John Doe, CEO of Acme Corporation">
```

### Buttons (Icons as Buttons)

If an icon functions as a button, describe the action it performs.

```html
<button><img src="search-icon.png" alt="Search"></button>
```

Better yet, use CSS for icon buttons and add `aria-label` instead of relying on image alt text.

## How to Add Alt Text in Different Platforms

### WordPress

When uploading an image in the **Media Library**, fill in the **Alternative Text** field. If you're editing an existing image, click the image in the editor and select **Edit** to add alt text.

### Shopify

When uploading a product image, click **Add alt text** below the image. Shopify displays this field for every image upload.

### HTML (Hardcoded)

Add the `alt` attribute directly to the `<img>` tag:

```html
<img src="image.jpg" alt="Description of the image">
```

### React/Next.js

```jsx
<img src="/images/product.jpg" alt="Blue ceramic coffee mug with white handle" />
```

Or using Next.js `<Image>` component:

```jsx
<Image src="/images/product.jpg" alt="Blue ceramic coffee mug with white handle" width={500} height={500} />
```

### Shopify Liquid Templates

```liquid
{{ product.featured_image | img_tag: alt: product.title }}
```

This uses the product title as alt text. For better alt text, edit the image in Shopify admin.

## Alt Text and SEO

### How Alt Text Affects Rankings

1. **Image search rankings**. Alt text is the primary signal Google uses to rank images in Google Image Search. Descriptive alt text improves visibility.
2. **Contextual relevance**. Alt text reinforces the page's topic. If your page is about "minimalist desk setups" and your images have alt text describing minimalist desk setups, Google sees stronger topical relevance.
3. **Accessibility compliance**. Sites that follow accessibility guidelines (including proper alt text) may receive favorable treatment in rankings, especially for industries where accessibility is legally required.

### Alt Text Won't Save a Bad Page

Alt text is a supporting signal. It won't rescue a page with thin content, slow load times, or poor user experience. Use it as part of a comprehensive on-page SEO strategy.

## Common Alt Text Mistakes

### Mistake 1: Leaving Alt Text Blank on Important Images

Every informational image should have alt text. If you're missing alt text, screen reader users miss context and Google can't fully understand your page.

**How to find missing alt text:**
- Use **Screaming Frog** and filter by **Images Missing Alt Text**
- Use **WAVE** (browser extension) to scan pages for accessibility issues

### Mistake 2: Keyword Stuffing

Stuffing keywords into alt text violates accessibility guidelines and gets flagged as spam.

Bad:
```html
<img src="desk.jpg" alt="office desk office furniture office desk setup home office desk modern office desk minimalist office desk">
```

Google identifies this as manipulation.

### Mistake 3: Using File Names as Alt Text

File names like `IMG_1234.jpg` or `screenshot-2026-02-07.png` tell users nothing.

Bad:
```html
<img src="IMG_1234.jpg" alt="IMG_1234">
```

Good:
```html
<img src="ergonomic-office-chair.jpg" alt="Black ergonomic office chair with lumbar support and adjustable armrests">
```

### Mistake 4: Identical Alt Text for Different Images

If you have multiple images on a page, each should have unique alt text describing what makes that image different.

Bad:
```html
<img src="product-1.jpg" alt="Product image">
<img src="product-2.jpg" alt="Product image">
```

Good:
```html
<img src="product-front.jpg" alt="Front view of blue ceramic coffee mug">
<img src="product-side.jpg" alt="Side view showing ergonomic handle design">
```

### Mistake 5: Describing Decorative Images

If an image is purely decorative (background texture, divider line), use `alt=""` instead of writing a pointless description.

## Alt Text Audit Process

### Step 1: Crawl with Screaming Frog

Run a full site crawl. Go to **Images** tab and filter for **Missing Alt Text**. Export the list.

### Step 2: Prioritize High-Traffic Pages

Focus on pages with the most traffic or highest commercial value. Use **Google Analytics** or **Google Search Console** to identify top pages.

### Step 3: Write Alt Text for Missing Images

For each image missing alt text:
1. View the image
2. Describe what it shows in 125 characters or less
3. Include relevant keywords naturally if applicable
4. Update the image's alt attribute

### Step 4: Fix Keyword-Stuffed Alt Text

Search your source code for alt text containing repeated keywords. Rewrite to be descriptive instead of keyword-focused.

### Step 5: Validate

Re-crawl with **Screaming Frog** or use **WAVE** to confirm all informational images now have alt text.

## Alt Text vs. Image File Names vs. Captions

| Element | Purpose | SEO Impact | Example |
|---------|---------|------------|---------|
| **Alt text** | Describes image for screen readers and when image fails to load | High — affects image search and contextual relevance | `alt="Blue leather sofa with wooden legs"` |
| **File name** | Identifies the file on the server | Low to medium — descriptive file names help Google understand content | `blue-leather-sofa.jpg` (not `IMG1234.jpg`) |
| **Caption** | Visible text displayed below the image | Low — primarily for user experience, not direct ranking factor | "This sofa features hand-stitched tufted cushions" |

All three should be descriptive and relevant, but alt text is the most critical for SEO and accessibility.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **What Alt Text Is (and Isn't):** Alt text is an HTML attribute added to <img> tags:
* **How to Write Good Alt Text:** Imagine explaining the image to someone who can't see it.
* **When to Leave Alt Text Empty:** Some images are purely decorative and don't add meaning to the content.
* **Alt Text for Different Image Types:** Describe the product, color, size, and distinguishing features.
* **How to Add Alt Text in Different Platforms:** When uploading an image in the Media Library, fill in the Alternative Text field.

## Frequently Asked Questions

### Should every image have alt text?

Informational images (photos, screenshots, charts, product images) should have alt text. Decorative images (background patterns, divider lines) should have `alt=""` to prevent screen readers from announcing them unnecessarily.

### Can I use the same alt text as the image caption?

You can, but it's redundant. Screen readers will read both the caption and the alt text. If the caption fully describes the image, use `alt=""` or write alt text that adds different context.

### How does alt text affect image search rankings?

Alt text is one of the strongest signals Google uses to understand what an image shows. Descriptive alt text improves your chances of ranking in Google Image Search for relevant queries.

### Do I need alt text for images in CSS backgrounds?

No. CSS background images are decorative by nature and don't have alt attributes. If a background image conveys important information, it should be an `<img>` element with alt text instead of a CSS background.

### Can I use AI to generate alt text?

Some tools (like **Microsoft Azure AI Vision** or **Google Cloud Vision API**) can auto-generate alt text. These are useful for large image libraries but often produce generic descriptions. Review and edit AI-generated alt text to ensure it's accurate and contextual.

## Next Steps

Audit your site's images using **Screaming Frog** or **WAVE**. Export all images missing alt text and prioritize high-traffic pages. Write descriptive alt text for each image, avoiding keyword stuffing. For deeper image optimization, see [Image SEO Optimization Checklist](/articles/image-seo-optimization-checklist.html), [Fix Missing Alt Text in Bulk](/articles/fix-missing-alt-text-bulk.html), and [Google Image Search Optimization](/articles/google-image-search-optimization.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
