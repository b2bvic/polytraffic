---
title:: Article Schema Markup for Blog Posts and News
description:: Article schema tells Google your content type, author, publish date, and publisher. Implement it correctly and unlock rich results in search and Discover.
focus_keyword:: article schema markup blog
category:: technical
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Article Schema Markup for Blog Posts and News

> **Quick Summary**
> - **What this covers:** Article schema tells Google your content type, author, publish date, and publisher. Implement it correctly and unlock rich results in search and Discover.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Article Schema Types](#article-schema-types)
- [Required Article Schema Fields](#required-article-schema-fields)
- [Recommended Article Schema Fields](#recommended-article-schema-fields)
- [Full Article Schema Example](#full-article-schema-example)
- [NewsArticle Schema Example](#newsarticle-schema-example)
- [How to Implement Article Schema](#how-to-implement-article-schema)
- [Validating Article Schema](#validating-article-schema)
- [Common Article Schema Mistakes](#common-article-schema-mistakes)
- [Article Schema and Rich Results](#article-schema-and-rich-results)
- [Article Schema vs. FAQ Schema vs. How-To Schema](#article-schema-vs-faq-schema-vs-how-to-schema)
- [Next Steps](#next-steps)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


Article schema (`Article`, `NewsArticle`, `BlogPosting`) is structured data that describes editorial content to search engines. It tells Google who wrote the content, when it was published, what organization published it, and what the article is about. Proper implementation makes your content eligible for rich results in Google Search, Google News, and Google Discover.

Without article schema, Google must infer publication dates, authorship, and content type from HTML alone. With schema, you explicitly declare this information, reducing ambiguity and improving how your content appears in search results.

This guide covers the three article schema types, required and recommended fields, implementation methods, and how to validate your markup.

## Article Schema Types

Google recognizes three article schema types. Choose the one that matches your content type.

### 1. Article

Generic schema for any editorial content that doesn't fit the other two categories.

**Use for:**
- Evergreen blog posts
- Opinion pieces
- Long-form content
- Analysis or commentary

### 2. NewsArticle

Specifically for news content with journalistic standards.

**Use for:**
- Breaking news
- News reports
- Investigative journalism
- Time-sensitive reporting

**Requirements:** Must follow Google News content policies (original reporting, editorial standards, transparency).

### 3. BlogPosting

For blog-style content, typically informal or personal.

**Use for:**
- Personal blogs
- Company blogs
- Tutorials and how-to posts
- Product reviews

**Note:** In practice, `Article` and `BlogPosting` are interchangeable for most blogs. Google treats them similarly.

## Required Article Schema Fields

These fields are mandatory for article schema to be valid.

### headline

The article title. Maximum 110 characters (truncated in search results if longer).

```json
"headline": "How to Fix Redirect Chains in 10 Minutes"
```

### image

Array of images representing the article. Must include at least one image. Recommended image sizes:
- 1200 x 675 pixels (16:9 ratio)
- 1200 x 1200 pixels (1:1 ratio)
- 1200 x 900 pixels (4:3 ratio)

```json
"image": [
  "https://yoursite.com/images/article-image-16x9.jpg",
  "https://yoursite.com/images/article-image-1x1.jpg",
  "https://yoursite.com/images/article-image-4x3.jpg"
]
```

Google may use different image ratios for different surfaces (Discover, Search, News).

### datePublished

ISO 8601 format date and time when the article was first published.

```json
"datePublished": "2026-02-07T08:00:00-05:00"
```

### dateModified

ISO 8601 format date and time when the article was last updated. If the article was never updated, use the same value as `datePublished`.

```json
"dateModified": "2026-02-07T14:30:00-05:00"
```

### author

The person or organization who wrote the article. Use `Person` or `Organization` type.

```json
"author": {
  "@type": "Person",
  "name": "Victor Valentine Romo",
  "url": "https://yoursite.com/about"
}
```

For multiple authors:

```json
"author": [
  {
    "@type": "Person",
    "name": "Author One"
  },
  {
    "@type": "Person",
    "name": "Author Two"
  }
]
```

## Recommended Article Schema Fields

These fields aren't required but improve how Google displays your content.

### publisher

The organization that publishes the article. Requires `name` and `logo`.

```json
"publisher": {
  "@type": "Organization",
  "name": "PolyTraffic",
  "logo": {
    "@type": "ImageObject",
    "url": "https://yoursite.com/logo.png",
    "width": 600,
    "height": 60
  }
}
```

**Logo requirements:**
- Minimum 112 x 112 pixels
- Should be a rectangular logo, not a square icon
- Must represent the publishing organization

### description

A brief summary of the article. Roughly 150-160 characters. Can match your meta description.

```json
"description": "Learn how to find and fix redirect chains using Screaming Frog. Includes step-by-step instructions and .htaccess examples."
```

### mainEntityOfPage

The canonical URL of the article.

```json
"mainEntityOfPage": {
  "@type": "WebPage",
  "@id": "https://yoursite.com/article-slug"
}
```

## Full Article Schema Example

Here's a complete `Article` schema implementation:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Fix Redirect Chains in 10 Minutes",
  "image": [
    "https://yoursite.com/images/redirect-chains-16x9.jpg",
    "https://yoursite.com/images/redirect-chains-1x1.jpg"
  ],
  "datePublished": "2026-02-07T08:00:00-05:00",
  "dateModified": "2026-02-07T14:30:00-05:00",
  "author": {
    "@type": "Person",
    "name": "Victor Valentine Romo",
    "url": "https://yoursite.com/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PolyTraffic",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yoursite.com/logo.png",
      "width": 600,
      "height": 60
    }
  },
  "description": "Step-by-step guide to finding and fixing redirect chains using Screaming Frog and .htaccess rules.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://yoursite.com/fix-redirect-chains"
  }
}
</script>
```

Place this in the `<head>` of your HTML or in the body (Google crawls both locations).

## NewsArticle Schema Example

For news content, use `NewsArticle` and follow Google News policies:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Google Announces Major Algorithm Update Targeting AI Content",
  "image": [
    "https://yoursite.com/images/google-update-16x9.jpg"
  ],
  "datePublished": "2026-02-07T09:15:00-05:00",
  "dateModified": "2026-02-07T11:00:00-05:00",
  "author": {
    "@type": "Person",
    "name": "Jane Reporter"
  },
  "publisher": {
    "@type": "Organization",
    "name": "TechNews Daily",
    "logo": {
      "@type": "ImageObject",
      "url": "https://technewsdaily.com/logo.png"
    }
  },
  "description": "Google released a core update targeting low-quality AI-generated content. Here's what SEOs need to know."
}
</script>
```

## How to Implement Article Schema

### WordPress (Yoast SEO)

**Yoast SEO** automatically adds article schema to posts. To verify:

1. Publish or update a post
2. View the page source
3. Search for `<script type="application/ld+json">`
4. Confirm `@type` is `Article` or `BlogPosting`

**Customization:** Go to **Yoast SEO > Search Appearance > Content Types** and configure schema settings per post type.

### WordPress (Rank Math)

**Rank Math** also adds article schema automatically. To configure:

1. **Rank Math > General Settings > Schema Markup**
2. Set default schema type for posts (`Article`, `BlogPosting`, or `NewsArticle`)
3. Enable author and publisher settings

### Manual Implementation (HTML)

Add the JSON-LD script directly to your HTML template:

```html
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{{ article.title }}",
    "image": ["{{ article.featured_image }}"],
    "datePublished": "{{ article.published_date }}",
    "dateModified": "{{ article.modified_date }}",
    "author": {
      "@type": "Person",
      "name": "{{ article.author }}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "{{ site.name }}",
      "logo": {
        "@type": "ImageObject",
        "url": "{{ site.logo }}"
      }
    }
  }
  </script>
</head>
```

Replace `{{ variables }}` with your templating engine's syntax (Liquid, Jinja2, etc.).

### Shopify (Blog Posts)

Shopify automatically adds article schema to blog posts. Verify by viewing page source and searching for `application/ld+json`.

### Static Site Generators (Jekyll, Hugo, Gatsby)

Create a schema partial or component:

**Jekyll example (_includes/schema-article.html):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{ page.title }}",
  "image": ["{{ page.image }}"],
  "datePublished": "{{ page.date | date_to_xmlschema }}",
  "dateModified": "{% if page.modified %}{{ page.modified | date_to_xmlschema }}{% else %}{{ page.date | date_to_xmlschema }}{% endif %}",
  "author": {
    "@type": "Person",
    "name": "{{ site.author }}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{ site.title }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ site.url }}{{ site.logo }}"
    }
  }
}
</script>
```

Include this partial in your post template.

## Validating Article Schema

### Google Rich Results Test

1. Go to https://search.google.com/test/rich-results
2. Enter your article URL or paste the HTML
3. Click **Test URL**
4. Review detected schema types and any errors

### Schema Markup Validator

1. Go to https://validator.schema.org/
2. Paste your JSON-LD code
3. Click **Run Test**
4. Fix any validation errors

### Google Search Console

After implementation, monitor **Google Search Console > Enhancements > Unparsable Structured Data** for errors.

Google also reports article schema issues in the **Rich Results** report if your content is eligible for rich results.

## Common Article Schema Mistakes

### Mistake 1: Missing or Incorrect dateModified

If you never updated the article, `dateModified` should match `datePublished`. Don't omit it.

**Wrong:**
```json
"datePublished": "2026-02-07T08:00:00-05:00"
```

**Right:**
```json
"datePublished": "2026-02-07T08:00:00-05:00",
"dateModified": "2026-02-07T08:00:00-05:00"
```

### Mistake 2: Image URL Doesn't Resolve

If the image URL in your schema returns a 404, Google can't use it for rich results.

**Fix:** Verify image URLs resolve correctly:

```bash
curl -I https://yoursite.com/images/article-image.jpg
```

Look for `HTTP/1.1 200 OK`.

### Mistake 3: Headline Exceeds 110 Characters

Google truncates headlines longer than 110 characters in search results.

**Fix:** Keep headlines under 110 characters or accept truncation.

### Mistake 4: Publisher Logo Is Too Small

Google requires publisher logos to be at least 112 x 112 pixels.

**Fix:** Use a logo at least 112 x 112 pixels, ideally 600 x 60 for horizontal logos.

### Mistake 5: Using @type Article for Non-Editorial Content

Don't use `Article` schema on product pages, category pages, or service pages. Reserve it for editorial content (blog posts, news, guides).

## Article Schema and Rich Results

Article schema doesn't guarantee rich results, but it makes your content eligible for:

- **Top Stories carousel** (NewsArticle primarily)
- **Article rich results** in Google Search (headline, image, date)
- **Google Discover** (enhanced cards with images and publisher branding)

**Eligibility requirements:**
- Valid article schema
- High-quality images (1200 x 675 minimum)
- Original, substantial content
- Compliance with Google News content policies (for NewsArticle)

## Article Schema vs. FAQ Schema vs. How-To Schema

These schema types often coexist on the same page.

| Schema Type | Purpose | Use On |
|-------------|---------|--------|
| **Article** | Describes the article itself (author, date, publisher) | Blog posts, news articles, guides |
| **FAQ** | Marks up question-and-answer sections | Articles with FAQ sections |
| **How-To** | Marks up step-by-step instructions | Tutorial articles |

You can combine them:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Fix Broken Links",
  "author": {"@type": "Person", "name": "Victor Romo"},
  ...
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What causes broken links?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Broken links occur when..."
      }
    }
  ]
}
</script>
```

See [FAQ Schema Markup Guide](/articles/faq-schema-markup-guide.html) and [How-To Schema Markup Guide](/articles/how-to-schema-markup-guide.html) for implementation.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Article Schema Types:** Google recognizes three article schema types.
* **Required Article Schema Fields:** These fields are mandatory for article schema to be valid.
* **Recommended Article Schema Fields:** These fields aren't required but improve how Google displays your content.
* **Full Article Schema Example:** Here's a complete Article schema implementation:
* **NewsArticle Schema Example:** For news content, use NewsArticle and follow Google News policies:

## Frequently Asked Questions

### Should I use Article or BlogPosting for my blog posts?

Either works. Google treats them nearly identically. Most SEO plugins default to `BlogPosting` for blogs and `Article` for news or editorial sites. Choose one and use it consistently.

### Can I use article schema on product descriptions?

No. Product descriptions should use `Product` schema, not `Article`. Article schema is for editorial content only.

### Do I need article schema to rank in Google News?

No, but it helps. Google News eligibility depends on content quality, editorial standards, and compliance with Google News policies. Article schema (specifically `NewsArticle`) clarifies publication dates and authorship, which strengthens your eligibility.

### Can I have multiple articles on one page?

Yes, if your page contains multiple distinct articles (e.g., a news homepage with article previews), you can include multiple article schema blocks. Each should describe a unique article.

### Does article schema improve rankings?

Indirectly. Article schema doesn't directly boost rankings, but it makes your content eligible for rich results (Top Stories, Discover), which increases visibility and click-through rates.

## Next Steps

Implement article schema on your blog posts using your CMS's built-in tools (Yoast, Rank Math) or by adding JSON-LD manually. Validate using **Google Rich Results Test**. Monitor **Google Search Console** for schema errors. For related schema guidance, see [Schema Markup SEO Implementation Guide](/articles/schema-markup-seo-implementation-guide.html), [FAQ Schema Markup Guide](/articles/faq-schema-markup-guide.html), and [How-To Schema Markup Guide](/articles/how-to-schema-markup-guide.html).

---

## When This Fix Isn't Your Priority

Skip this for now if:

- **Your site has fundamental crawling/indexing issues.** Fixing a meta description is pointless if Google can't reach the page. Resolve access, robots.txt, and crawl errors before optimizing on-page elements.
- **You're mid-migration.** During platform or domain migrations, freeze non-critical changes. The migration itself introduces enough variables, layer optimizations after the new environment stabilizes.
- **The page gets zero impressions in Search Console.** If Google shows no data for the page, the issue is likely discoverability or indexation, not on-page optimization. Investigate why the page isn't indexed first.
