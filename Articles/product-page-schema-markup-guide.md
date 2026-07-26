---
title:: Product Schema Markup: Complete JSON-LD Implementation for E-commerce
description:: Enable rich snippets with Product schema—price, availability, reviews, and offers. Structured data validation and troubleshooting guide.
focus_keyword:: product schema markup
category:: Structured Data
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Product Schema Markup: Complete JSON-LD Implementation for E-commerce

> **Quick Summary**
> - **What this covers:** Enable rich snippets with Product schema—price, availability, reviews, and offers. Structured data validation and troubleshooting guide.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [Required Product Schema Properties](#required-product-schema-properties)
- [Offers Object Implementation](#offers-object-implementation)
- [Review and Rating Schema](#review-and-rating-schema)
- [Product Identifiers (SKU, GTIN, MPN)](#product-identifiers-sku-gtin-mpn)
- [Additional Recommended Properties](#additional-recommended-properties)
- [Implementation Methods](#implementation-methods)
- [Validation and Testing](#validation-and-testing)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**Product schema markup** transforms plain search listings into rich results displaying prices, star ratings, availability, and review counts directly in SERPs. A basic listing shows title and meta description. Schema-enhanced listings show "★★★★☆ 4.8 (284 reviews) · $149.99 · In stock" users see critical purchase information before clicking, increasing CTR 20-35% and pre-qualifying traffic.

Google prioritizes schema-enhanced results for product searches. Sites implementing proper Product schema gain eligibility for rich snippets, Google Shopping integration, and merchant listings. Missing or incorrect schema excludes sites from these features, competitors with proper markup capture traffic while unstructured sites remain invisible in enhanced SERP features.

## Required Product Schema Properties

**Minimal valid markup** requires three properties: name, image, and either offers OR review/aggregateRating:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wireless Bluetooth Headphones",
  "image": "https://example.com/images/headphones.jpg",
  "offers": {
    "@type": "Offer",
    "price": "79.99",
    "priceCurrency": "USD"
  }
}
```

This minimal implementation provides basic product recognition but lacks properties triggering rich snippets. **Complete implementation** includes:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wireless Bluetooth Headphones",
  "image": [
    "https://example.com/images/headphones-1.jpg",
    "https://example.com/images/headphones-2.jpg",
    "https://example.com/images/headphones-3.jpg"
  ],
  "description": "Premium wireless headphones with active noise cancellation, 30-hour battery life, and high-fidelity audio drivers.",
  "brand": {
    "@type": "Brand",
    "name": "AudioTech"
  },
  "sku": "AT-WBH-001",
  "mpn": "ATWBH001",
  "gtin13": "0123456789012",
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/products/wireless-headphones/",
    "priceCurrency": "USD",
    "price": "79.99",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "Example Store"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "284"
  }
}
```

### Name and Description

**Name** should match H1 and page title for consistency. Avoid promotional language in name, use plain product names:

```json
// Good
"name": "Samsung Galaxy S24 Ultra 256GB"

// Bad (promotional language)
"name": "AMAZING Samsung Galaxy S24 Ultra 256GB - LIMITED TIME OFFER!!!"
```

**Description** summarizes product features in 100-200 words. Should match or closely align with meta description and visible page description. Google uses this for understanding product context, accurate descriptions improve matching to relevant queries.

### Images

**Multiple images** in array format provide alternatives for different SERP features:

```json
"image": [
  "https://example.com/images/product-front.jpg",  // Primary image
  "https://example.com/images/product-side.jpg",   // Alternate angle
  "https://example.com/images/product-use.jpg"     // Lifestyle shot
]
```

Image requirements:
- Minimum 160×160 pixels
- Recommended 800×800 pixels or larger
- Square aspect ratio preferred (1:1)
- JPG, PNG, WebP formats
- Absolute URLs (not relative paths)
- High resolution for zooming features

**Primary image** (first in array) appears in rich snippets. Additional images may display in Google Images or Shopping features.

### Brand Information

**Brand object** provides structured manufacturer/brand data:

```json
"brand": {
  "@type": "Brand",
  "name": "Sony"
}
```

For products without established brands (handmade, custom items), use store name:

```json
"brand": {
  "@type": "Organization",
  "name": "Handmade Pottery Studio"
}
```

Consistent brand naming across products strengthens brand entity recognition in Knowledge Graph.

## Offers Object Implementation

**Offer type** describes product availability and purchase options:

```json
"offers": {
  "@type": "Offer",
  "url": "https://example.com/products/widget/",
  "priceCurrency": "USD",
  "price": "199.99",
  "priceValidUntil": "2026-12-31",
  "availability": "https://schema.org/InStock",
  "itemCondition": "https://schema.org/NewCondition"
}
```

**Price** must match visible product price exactly. Discrepancies between schema price and displayed price cause validation errors. Use decimal format (not "19999" for $199.99).

**PriceCurrency** uses ISO 4217 codes (USD, EUR, GBP, CAD, AUD, JPY, etc.).

**Availability** values:
- `https://schema.org/InStock` - Available now
- `https://schema.org/OutOfStock` - Not available
- `https://schema.org/PreOrder` - Available for pre-order
- `https://schema.org/LimitedAvailability` - Low stock
- `https://schema.org/Discontinued` - No longer produced
- `https://schema.org/SoldOut` - Temporarily out of stock

**ItemCondition** values:
- `https://schema.org/NewCondition` - New products
- `https://schema.org/UsedCondition` - Used/pre-owned
- `https://schema.org/RefurbishedCondition` - Refurbished/renewed
- `https://schema.org/DamagedCondition` - Damaged/as-is

### Multiple Offers and Variants

**AggregateOffer** for products with multiple pricing tiers or variants:

```json
"offers": {
  "@type": "AggregateOffer",
  "lowPrice": "49.99",
  "highPrice": "89.99",
  "priceCurrency": "USD",
  "offerCount": "3",
  "offers": [
    {
      "@type": "Offer",
      "name": "Basic Edition",
      "price": "49.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Pro Edition",
      "price": "69.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Enterprise Edition",
      "price": "89.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  ]
}
```

AggregateOffer displays price range ($49.99-$89.99) in rich snippets. Individual offers provide variant-specific details.

**Color/size variants** as separate offers:

```json
"offers": {
  "@type": "AggregateOffer",
  "lowPrice": "79.99",
  "highPrice": "79.99",
  "priceCurrency": "USD",
  "offers": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Wireless Headphones - Black",
        "color": "Black"
      },
      "price": "79.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Wireless Headphones - Silver",
        "color": "Silver"
      },
      "price": "79.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/OutOfStock"
    }
  ]
}
```

## Review and Rating Schema

**AggregateRating** displays star ratings and review counts in SERPs:

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.7",
  "reviewCount": "328",
  "bestRating": "5",
  "worstRating": "1"
}
```

**RatingValue** represents average rating (typically 0-5 scale). Must reflect actual calculated average from reviews.

**ReviewCount** must equal actual number of reviews. Google validates this, mismatched counts cause penalties.

**BestRating** and **worstRating** define rating scale. Default 5-star scale uses bestRating: 5, worstRating: 1. Custom scales (10-point, 100-point) require explicit declaration.

### Individual Reviews

**Review array** provides review details for rich snippets:

```json
"review": [
  {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": "John Smith"
    },
    "datePublished": "2026-01-15",
    "reviewBody": "Excellent headphones with great sound quality and comfortable fit for extended wear.",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    }
  },
  {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": "Sarah Johnson"
    },
    "datePublished": "2026-01-10",
    "reviewBody": "Good audio quality but battery life shorter than advertised.",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4",
      "bestRating": "5"
    }
  }
]
```

Include 3-5 most helpful reviews. Full review lists aren't required, aggregateRating suffices for rich snippet eligibility.

**Review guidelines**:
- Only include genuine user-submitted reviews
- No fake, paid, or incentivized reviews (violates Google policies)
- Reviews must exist publicly on the page (not hidden)
- Self-authored reviews prohibited (business owners can't review own products)

## Product Identifiers (SKU, GTIN, MPN)

**Unique identifiers** help Google match products across merchants:

```json
"sku": "PROD-12345",
"gtin13": "0123456789012",
"mpn": "MFR-MODEL-123"
```

**SKU (Stock Keeping Unit)**: Internal product identifier unique within your store. Required if no GTIN/MPN available.

**GTIN (Global Trade Item Number)**: Barcode number including:
- UPC (gtin12): 12-digit North American barcodes
- EAN (gtin13): 13-digit international barcodes
- JAN (gtin13): Japanese article numbers
- ISBN (gtin13): Book identifiers

**MPN (Manufacturer Part Number)**: Manufacturer's product identifier. Use when GTINs unavailable (handmade goods, custom products).

**Requirement**: Include at least one of GTIN, MPN, or SKU. Having multiple identifiers strengthens product matching. GTIN preferred when available, enables Google Shopping integration.

### Finding GTINs

**UPC lookup tools**:
- upcitemdb.com
- barcodelookup.com
- Product packaging/labels

**ISBN for books**: Use 13-digit ISBN as gtin13. Convert 10-digit ISBNs to 13-digit format.

**No GTIN products**: Handmade, vintage, custom products lack GTINs. Use SKU + MPN (if applicable) instead.

## Additional Recommended Properties

**Category** classifies products:

```json
"category": "Electronics > Audio > Headphones"
```

Use Google product taxonomy for consistency with Shopping categories.

**Color, size, material**:

```json
"color": "Matte Black",
"size": "Large",
"material": "Aluminum"
```

These properties improve filtering in Google Shopping and provide semantic context.

**Weight and dimensions**:

```json
"weight": {
  "@type": "QuantitativeValue",
  "value": "250",
  "unitCode": "GRM"
},
"width": {
  "@type": "QuantitativeValue",
  "value": "18",
  "unitCode": "CMT"
},
"height": {
  "@type": "QuantitativeValue",
  "value": "20",
  "unitCode": "CMT"
},
"depth": {
  "@type": "QuantitativeValue",
  "value": "8",
  "unitCode": "CMT"
}
```

UnitCode uses UN/CEFACT codes: GRM (grams), CMT (centimeters), INH (inches), etc.

### Shipping and Return Policies

**ShippingDetails**:

```json
"shippingDetails": {
  "@type": "OfferShippingDetails",
  "shippingRate": {
    "@type": "MonetaryAmount",
    "value": "5.99",
    "currency": "USD"
  },
  "deliveryTime": {
    "@type": "ShippingDeliveryTime",
    "handlingTime": {
      "@type": "QuantitativeValue",
      "minValue": "1",
      "maxValue": "3",
      "unitCode": "DAY"
    },
    "transitTime": {
      "@type": "QuantitativeValue",
      "minValue": "3",
      "maxValue": "7",
      "unitCode": "DAY"
    }
  }
}
```

**MerchantReturnPolicy**:

```json
"hasMerchantReturnPolicy": {
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "US",
  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
  "merchantReturnDays": 30,
  "returnMethod": "https://schema.org/ReturnByMail",
  "returnFees": "https://schema.org/FreeReturn"
}
```

These properties enable Google's merchant experience features, displaying shipping costs and return policies in listings.

## Implementation Methods

**JSON-LD in HTML head** (recommended approach):

```html
<!DOCTYPE html>
<html>
<head>
  <title>Wireless Bluetooth Headphones</title>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Wireless Bluetooth Headphones",
    "offers": {
      "@type": "Offer",
      "price": "79.99",
      "priceCurrency": "USD"
    }
  }
  </script>
</head>
<body>
  <!-- Product page content -->
</body>
</html>
```

**Dynamic implementation** for e-commerce platforms:

```php
// WordPress/WooCommerce example
function add_product_schema() {
  global $product;

  if (!is_product()) return;

  $schema = [
    '@context' => 'https://schema.org',
    '@type' => 'Product',
    'name' => $product->get_name(),
    'image' => wp_get_attachment_url($product->get_image_id()),
    'description' => $product->get_short_description(),
    'offers' => [
      '@type' => 'Offer',
      'price' => $product->get_price(),
      'priceCurrency' => get_woocommerce_currency(),
      'availability' => $product->is_in_stock() ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    ]
  ];

  echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES) . '</script>';
}
add_action('wp_head', 'add_product_schema');
```

### Shopify Implementation

**Shopify liquid template** (product.liquid):

```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{ product.title }}",
  "image": "{{ product.featured_image | img_url: 'grande' | prepend: 'https:' }}",
  "description": "{{ product.description | strip_html | truncate: 200 }}",
  "offers": {
    "@type": "Offer",
    "price": "{{ product.price | divided_by: 100.0 }}",
    "priceCurrency": "{{ cart.currency.iso_code }}",
    "availability": "{% if product.available %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}"
  }
}
</script>
```

## Validation and Testing

**Google Rich Results Test** (search.google.com/test/rich-results):
1. Enter product page URL
2. Click "Test URL"
3. Review detected structured data
4. Check for errors or warnings
5. Preview how rich snippet appears

**Schema Markup Validator** (validator.schema.org):
- Validates Schema.org compliance
- More strict than Google's tool
- Catches edge cases Google might accept

**Common validation errors**:

```
Error: Missing required field "offers"
Fix: Add offers object with price and currency

Warning: Review missing "author" property
Fix: Include author object in review

Error: "price" must be a number, not string
Fix: Use "79.99" not "$79.99"

Error: "image" is not a valid URL
Fix: Use absolute URL (https://example.com/image.jpg)
```

### Search Console Monitoring

**Product rich results report** (Search Console > Enhancements > Products):
- Shows pages with valid product markup
- Flags errors preventing rich snippets
- Tracks markup deployment across site
- Displays impressions/clicks for rich results

Monitor for:
- Valid items count increasing
- Error rate <5%
- Warnings resolved
- Rich result impressions growing


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **Required Product Schema Properties:** This minimal implementation provides basic product recognition but lacks properties triggering rich snippets.
* **Offers Object Implementation:** AggregateOffer displays price range ($49.99-$89.99) in rich snippets.
* **Product Identifiers (SKU, GTIN, MPN):** Use Google product taxonomy for consistency with Shopping categories.
* **Additional Recommended Properties:** Use Google product taxonomy for consistency with Shopping categories.

## FAQ

### Do reviews have to be user-submitted or can I write them?

Reviews must be genuine user-submitted content. Self-authored reviews violate Google's guidelines and can trigger manual penalties. Incentivized reviews (offering discounts for reviews) are prohibited. Only display authentic customer reviews collected through legitimate means (post-purchase surveys, verified buyer programs).

### What happens if my schema price doesn't match the displayed price?

Google's validation detects price mismatches. The product becomes ineligible for rich snippets and may receive manual action warnings in Search Console. Ensure schema price matches exactly, including sale prices, currency symbols, and decimal formatting. For variable pricing (size/color options), use AggregateOffer with lowPrice/highPrice range.

### Should I include schema markup on out-of-stock products?

Yes, but update availability to OutOfStock. Removing schema from out-of-stock products causes indexing confusion. Maintaining schema with proper availability status preserves product history and enables Google to understand your inventory patterns. Use PreOrder status for upcoming products, Discontinued for permanently removed items.

### How long until Google shows rich snippets after adding schema?

Google typically detects new schema within 7-14 days during regular crawls. However, rich snippet display eligibility takes 2-4 weeks as Google validates markup accuracy against visible page content. Use Search Console URL Inspection to request immediate recrawl. Rich snippets aren't guaranteed. Google displays them based on query relevance and competition.

### Can I use product schema on category/listing pages?

No. Product schema belongs on individual product pages only. Category pages listing multiple products should use ItemList schema referencing individual product URLs. Applying Product schema to category pages causes validation errors. Google expects one product per Product markup instance. Use breadcrumb schema and category-appropriate structured data on listing pages instead.

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

