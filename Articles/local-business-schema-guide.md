---
title:: Local Business Schema Guide: Complete Structured Data Implementation
description:: Implement LocalBusiness schema with hours, address, reviews, and service areas. Optimize for Google Maps, local pack, and knowledge panels.
focus_keyword:: local business schema
category:: Local SEO
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Local Business Schema Guide: Complete Structured Data Implementation

> **Quick Summary**
> - **What this covers:** Implement LocalBusiness schema with hours, address, reviews, and service areas. Optimize for Google Maps, local pack, and knowledge panels.
> - **Who it's for:** site owners and SEO practitioners
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.

- [LocalBusiness Schema Fundamentals](#localbusiness-schema-fundamentals)
- [Business Type Selection](#business-type-selection)
- [Address and Contact Details](#address-and-contact-details)
- [Opening Hours Implementation](#opening-hours-implementation)
- [Reviews and Ratings](#reviews-and-ratings)
- [Service Area Configuration](#service-area-configuration)
- [Images and Media](#images-and-media)
- [Price Range and Payment](#price-range-and-payment)
- [WordPress Implementation](#wordpress-implementation)
- [Validation and Testing](#validation-and-testing)
- [Common Mistakes](#common-mistakes)
- [When This Fix Isn't Your Priority](#when-this-fix-isn-t-your-priority)


**LocalBusiness schema** communicates critical location data to Google, business hours, service areas, contact methods, and review aggregates, enabling rich local search features like knowledge panels, local pack prominence, and enhanced map listings. Proper structured data implementation increases local visibility by 30-50% through improved ranking signals and featured result eligibility.

## LocalBusiness Schema Fundamentals

**LocalBusiness schema type** extends Organization, inheriting general business properties while adding location-specific fields. Google recognizes 100+ LocalBusiness subtypes (Restaurant, Store, MedicalBusiness) for specialized businesses.

**Core required properties** for functional implementation:
- `@type`: "LocalBusiness" or specific subtype
- `name`: Official business name
- `address`: Physical location with structured PostalAddress
- `telephone`: Primary phone number
- `url`: Website homepage

**Recommended properties** for enhanced features:
- `openingHoursSpecification`: Operating hours
- `geo`: Latitude/longitude coordinates
- `priceRange`: Cost indicator ($, $$, $$$)
- `image`: Business photos
- `aggregateRating`: Review ratings
- `servesCuisine`: (Restaurants) Food type

**JSON-LD format** injects schema via `<script>` tags in page `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Example Coffee Shop",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94102",
    "addressCountry": "US"
  },
  "telephone": "+1-415-555-0123",
  "url": "https://example.com"
}
</script>
```

## Business Type Selection

**Specific subtypes** outperform generic "LocalBusiness" by signaling exact business category:

- **Restaurant**: Cafes, diners, bistros
- **Store**: Retail shops, clothing stores
- **FoodEstablishment**: Bakeries, fast food, bars
- **ProfessionalService**: Law firms, consulting, agencies
- **HomeAndConstructionBusiness**: Contractors, electricians, plumbers
- **MedicalBusiness**: Doctors, dentists, clinics
- **AutomotiveBusiness**: Repair shops, dealerships
- **LodgingBusiness**: Hotels, B&Bs, resorts

**Reference Schema.org** for complete subtype list: schema.org/LocalBusiness. Choose the most specific applicable type "ItalianRestaurant" beats "Restaurant" which beats "FoodEstablishment."

**Multiple locations** require separate LocalBusiness entries per physical location. Multi-location businesses should implement schema on each location page, not the homepage:

```html
<!-- Location 1 page -->
<script type="application/ld+json">
{
  "@type": "LocalBusiness",
  "name": "Example Coffee - Downtown",
  "address": { "streetAddress": "123 Main St", "addressLocality": "San Francisco" }
}
</script>

<!-- Location 2 page -->
<script type="application/ld+json">
{
  "@type": "LocalBusiness",
  "name": "Example Coffee - Marina",
  "address": { "streetAddress": "456 Bay St", "addressLocality": "San Francisco" }
}
</script>
```

## Address and Contact Details

**PostalAddress structure** requires five components for US addresses:

```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "123 Main Street Suite 200",
  "addressLocality": "San Francisco",
  "addressRegion": "CA",
  "postalCode": "94102",
  "addressCountry": "US"
}
```

**streetAddress** includes building numbers, street names, and suite/unit numbers. **addressLocality** is the city name. **addressRegion** uses two-letter state codes (CA, NY, TX). **postalCode** follows local formatting (ZIP for US, postal codes for other countries).

**International addresses** adapt components:

```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "10 Downing Street",
  "addressLocality": "London",
  "postalCode": "SW1A 2AA",
  "addressCountry": "GB"
}
```

**Telephone formatting** should include country code with plus prefix:

```json
"telephone": "+1-415-555-0123"
```

Avoid letters in phone numbers, format as digits with hyphens. Multiple contact methods use `telephone` (primary) and `contactPoint` for additional:

```json
"telephone": "+1-415-555-0123",
"contactPoint": {
  "@type": "ContactPoint",
  "telephone": "+1-415-555-0199",
  "contactType": "customer service"
}
```

**Geo coordinates** improve map accuracy:

```json
"geo": {
  "@type": "GeoCoordinates",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

Find coordinates via Google Maps: right-click location → select coordinates (copies to clipboard). Precision to 4 decimal places suffices (±11 meters accuracy).

## Opening Hours Implementation

**openingHoursSpecification** defines operating hours per day:

```json
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": "Saturday",
    "opens": "09:00",
    "closes": "15:00"
  }
]
```

**Time format** uses 24-hour notation (08:00 for 8 AM, 18:00 for 6 PM). Group consecutive days with identical hours to reduce verbosity.

**Closed days** omit from openingHoursSpecification, absence signals closed. If explicitly stating closure:

```json
{
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": "Sunday",
  "opens": "00:00",
  "closes": "00:00"
}
```

**24/7 operations** span midnight:

```json
"openingHoursSpecification": {
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  "opens": "00:00",
  "closes": "23:59"
}
```

**Seasonal hours** require special event markup:

```json
"specialOpeningHoursSpecification": {
  "@type": "OpeningHoursSpecification",
  "opens": "00:00",
  "closes": "00:00",
  "validFrom": "2026-12-25",
  "validThrough": "2026-12-25"
}
```

This indicates Christmas closure without permanently modifying standard hours.

## Reviews and Ratings

**aggregateRating** displays star ratings in search results:

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.5",
  "reviewCount": "127"
}
```

**ratingValue** represents average rating (1-5 scale). **reviewCount** indicates total reviews. Google validates these numbers against discoverable reviews, inflating values risks penalties.

**Individual reviews** add credibility with review schema:

```json
"review": [
  {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": "John Smith"
    },
    "datePublished": "2026-02-01",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "reviewBody": "Excellent service and great coffee. Highly recommend!"
  }
]
```

**First-party reviews** (hosted on your site) require visible review content matching schema. Don't markup reviews existing only in schema. Google detects and penalizes hidden reviews.

**Third-party review aggregation** should pull from Google Business Profile, Yelp, or industry-specific platforms. Update aggregateRating monthly to reflect current ratings.

## Service Area Configuration

**Service area businesses** (plumbers, contractors, delivery) serve regions without requiring customers to visit:

```json
"@type": "HomeAndConstructionBusiness",
"name": "ABC Plumbing",
"areaServed": [
  {
    "@type": "City",
    "name": "San Francisco"
  },
  {
    "@type": "City",
    "name": "Oakland"
  },
  {
    "@type": "City",
    "name": "Berkeley"
  }
]
```

**Radius-based service areas** specify distance:

```json
"areaServed": {
  "@type": "GeoCircle",
  "geoMidpoint": {
    "@type": "GeoCoordinates",
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "geoRadius": "50 miles"
}
```

**Postal code ranges** define service boundaries:

```json
"areaServed": {
  "@type": "PostalCodeRangeSpecification",
  "postalCodeBegin": "94102",
  "postalCodeEnd": "94199",
  "addressCountry": "US"
}
```

**Virtual businesses** without physical addresses use serviceArea exclusively, omitting physical address schema to avoid confusion.

## Images and Media

**image property** displays business photos in knowledge panels:

```json
"image": [
  "https://example.com/storefront.jpg",
  "https://example.com/interior.jpg",
  "https://example.com/products.jpg"
]
```

**Image requirements**:
- Minimum 1200px width
- 16:9, 4:3, or 1:1 aspect ratios
- JPEG or PNG format
- Show actual business (exterior, interior, products), not stock photos

**Logo specification** differentiates from general images:

```json
"logo": "https://example.com/logo.png"
```

Logos should be square (1:1 ratio), minimum 112px, representing the official business mark.

**Video content** via VideoObject enhances engagement:

```json
"video": {
  "@type": "VideoObject",
  "name": "Tour of Example Coffee Shop",
  "description": "Virtual tour of our downtown location",
  "thumbnailUrl": "https://example.com/video-thumb.jpg",
  "uploadDate": "2026-02-01",
  "contentUrl": "https://example.com/videos/tour.mp4"
}
```

## Price Range and Payment

**priceRange** indicates cost level:

```json
"priceRange": "$$"
```

Use 1-4 dollar signs: $ (inexpensive), $$ (moderate), $$$ (expensive), $$$$ (expensive). This appears in Google Maps and search results helping users filter by budget.

**Payment methods** via acceptedPaymentMethod:

```json
"paymentAccepted": "Cash, Credit Card, Debit Card, Apple Pay"
```

Or structured format:

```json
"acceptedPaymentMethod": [
  "http://purl.org/goodrelations/v1#Cash",
  "http://purl.org/goodrelations/v1#ByBankTransferInAdvance"
]
```

**Menu links** (restaurants) provide direct access:

```json
"hasMenu": "https://example.com/menu"
```

Or structured menu schema:

```json
"hasMenu": {
  "@type": "Menu",
  "url": "https://example.com/menu"
}
```

## WordPress Implementation

**Schema plugins** automate LocalBusiness markup:

- **Rank Math**: Schema tab → Local Business → Fill form fields → Auto-generates JSON-LD
- **Yoast SEO Local**: Dedicated local business extension ($69/year)
- **Schema Pro**: Visual schema builder supporting LocalBusiness type
- **All in One Schema.org**: Free plugin with LocalBusiness templates

**Manual implementation** via theme functions:

```php
function add_local_business_schema() {
  $schema = [
    '@context' => 'https://schema.org',
    '@type' => 'LocalBusiness',
    'name' => get_bloginfo('name'),
    'address' => [
      '@type' => 'PostalAddress',
      'streetAddress' => '123 Main St',
      'addressLocality' => 'San Francisco',
      'addressRegion' => 'CA',
      'postalCode' => '94102',
      'addressCountry' => 'US'
    ],
    'telephone' => '+1-415-555-0123',
    'url' => home_url()
  ];
  echo '<script type="application/ld+json">' . json_encode($schema) . '</script>';
}
add_action('wp_head', 'add_local_business_schema');
```

**Custom fields** enable schema editing via WordPress admin:

```php
// Add custom fields for hours, ratings, etc. using ACF or CMB2
// Pull field values into schema generation function
$hours = get_field('business_hours');
$rating = get_field('average_rating');
```

## Validation and Testing

**Google's Rich Results Test** validates schema syntax:

1. Visit search.google.com/test/rich-results
2. Enter URL or paste schema code
3. Review errors and warnings
4. Fix issues highlighted in red
5. Retest until validation passes

**Schema Markup Validator** (schema.org validator) tests against official specifications:

1. Visit validator.schema.org
2. Paste schema code
3. Check for specification compliance
4. Address any warnings

**Google Search Console** monitors schema performance:

1. Go to Enhancements → Unparsable structured data
2. Review errors preventing rich result eligibility
3. Fix flagged issues
4. Request re-indexing via URL Inspection

**Mobile-Friendly Test** ensures schema functions on mobile:

1. Visit search.google.com/test/mobile-friendly
2. Enter URL
3. Verify schema appears in rendered HTML
4. Check mobile display of structured data

**Preview tools** show how schema displays:

- Google SERP Preview: See potential search result appearance
- Google Maps Preview: Check how business listing appears
- Facebook Open Graph Debugger: Verify social sharing (if using OpenGraph alongside schema)

## Common Mistakes

**Mismatched NAP** (Name, Address, Phone) between schema and visible page content confuses Google. Schema must exactly match displayed information, no abbreviations, formatting differences, or variations.

**Missing required properties** cause validation failures. Every LocalBusiness requires at minimum: @type, name, address, and telephone. Omitting any prevents rich results.

**Incorrect business type** reduces relevance. Using generic "LocalBusiness" instead of specific subtype (Restaurant, MedicalBusiness) misses category-specific features.

**Fake or inflated reviews** in aggregateRating trigger manual penalties. Only markup genuinely collected reviews with verifiable sources.

**Multiple schemas for same business** on one page create conflicting data. Use one comprehensive LocalBusiness schema per page, not multiple partial implementations.


**Take Action: Map Your Traffic Portfolio**

Frameworks only pay off when they run against your numbers. The [Find setup](/setup.html) maps every channel you operate, what each costs, what each converts, and where the portfolio is concentrated, so decisions like the ones above start from your data instead of hypotheticals.


## Key Recap

* **LocalBusiness Schema Fundamentals:** <!-- Location 2 page -->
<script type="application/ld+json">
{
  "@type": "LocalBusiness",
  "name": "Example Coffee - Marina",
  "address": { "streetAddress":
* **Business Type Selection:** <!-- Location 2 page -->
<script type="application/ld+json">
{
  "@type": "LocalBusiness",
  "name": "Example Coffee - Marina",
  "address": { "streetAddress":
* **Address and Contact Details:** Avoid letters in phone numbers, format as digits with hyphens.
* **Opening Hours Implementation:** This indicates Christmas closure without permanently modifying standard hours.
* **Reviews and Ratings:** Logos should be square (1:1 ratio), minimum 112px, representing the official business mark.
* **Service Area Configuration:** Logos should be square (1:1 ratio), minimum 112px, representing the official business mark.

## FAQ: Local Business Schema

### Does schema directly improve local rankings?

**Schema provides ranking signals** but doesn't guarantee top positions. Google confirmed structured data helps understand business details, which influences relevance matching and knowledge panel display. Studies show businesses with complete schema rank 10-20% higher in local pack on average, though causation is unclear, businesses investing in schema also optimize other factors. Schema's primary benefit is **enabling rich results** (star ratings, hours, attributes) that increase CTR by 20-30%, indirectly improving rankings through engagement signals. Implement schema as foundational hygiene, not a ranking miracle, combine with citations, reviews, and on-page optimization for measurable local SEO improvement.

### Should schema match Google Business Profile exactly?

**Yes, consistency is critical.** Google cross-references schema against Google Business Profile (GBP), citations, and on-page content. Mismatches (different phone numbers, addresses, hours) signal data quality issues, reducing trust and rich result eligibility. Use identical formatting: if GBP shows "123 Main Street," schema should too, not "123 Main St." Synchronize hours, ensuring schema reflects current GBP hours. Update both simultaneously when business details change. Automated tools pulling from GBP API ensure perfect synchronization but aren't always necessary, manual checks quarterly suffice for most businesses.

### Can I use schema if I don't have a physical location?

**Service area businesses** without physical addresses should use `areaServed` instead of `address`. Don't fabricate addresses to satisfy schema requirements. Google penalizes deceptive location data. Virtual consultants, freelancers, and delivery-only businesses use:

```json
{
  "@type": "ProfessionalService",
  "name": "Virtual Consulting",
  "areaServed": "United States",
  "url": "https://example.com"
}
```

Omit address entirely. If required for validation, use a registered business address (accountant, registered agent) marked as not publicly visible, though this risks local pack exclusion, service area businesses rarely rank in traditional local pack.

### How often should I update business schema?

Update **immediately when business details change**: new hours, phone numbers, addresses, or price ranges. Google recrawls pages irregularly, request re-indexing via Search Console URL Inspection after schema updates to accelerate processing. For aggregateRating, update monthly to reflect current review counts and averages. Annual reviews ensure schema stays current even without obvious changes, verify hours during holiday seasons, check that images remain accessible, confirm phone numbers are still active. Schema doesn't require constant maintenance but demands accuracy, stale hours showing you're open when you're closed harms UX and rankings.

### Does LocalBusiness schema work for franchises?

**Yes, each location needs separate schema.** Franchise locations should implement individual LocalBusiness markup on their location-specific pages. Don't use generic corporate schema on franchise pages. Corporate homepage can use Organization schema with `subOrganization` referencing locations:

```json
{
  "@type": "Organization",
  "name": "Example Franchise Corporate",
  "subOrganization": [
    { "@type": "LocalBusiness", "name": "Example - Location 1", "address": {...} },
    { "@type": "LocalBusiness", "name": "Example - Location 2", "address": {...} }
  ]
}
```

However, this quickly becomes unwieldy for 10+ locations. Better approach: location-specific schema on each location page, aggregate Organization schema on corporate site linking to location pages.

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

