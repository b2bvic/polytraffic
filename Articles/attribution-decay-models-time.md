---
title:: Attribution Decay Models: How Time Between Touchpoints Changes Credit
description:: Time decay attribution assigns credit based on touchpoint proximity to conversion. 7-day, 14-day, and 30-day decay models produce different channel valuations and budget decisions.
focus_keyword:: attribution decay model
category:: analytics
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Attribution Decay Models: How Time Between Touchpoints Changes Credit

> **Quick Summary**
> - **What this covers:** Time decay attribution assigns credit based on touchpoint proximity to conversion. 7-day, 14-day, and 30-day decay models produce different channel valuations and budget decisions.
> - **Who it's for:** traffic strategists and growth operators
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.


Attribution credit isn't binary.

A customer who sees your ad Monday, reads your blog Wednesday, gets an email Friday, and purchases Saturday didn't convert solely from the email. Each touchpoint contributed value. The question: how much credit does each touchpoint deserve?

**Linear attribution** assigns equal credit across all touchpoints (each gets 25% in the above example). **Last-touch attribution** assigns 100% credit to the final touchpoint before conversion (email gets 100%, everything else gets zero). **Time decay attribution** assigns credit proportionally based on temporal proximity to conversion—touchpoints closer to purchase get more credit than earlier touchpoints.

Time decay models assume recency matters: the email sent Friday (1 day before purchase) influenced conversion more than the ad seen Monday (5 days before purchase). This reflects customer psychology—recent interactions are top-of-mind when buying decisions happen.

The **half-life** parameter determines decay rate: how quickly credit diminishes over time. A 7-day half-life means a touchpoint 7 days before conversion gets 50% the credit of a touchpoint on conversion day. A 14-day half-life assigns 50% credit at 14 days. A 30-day half-life maintains credit longer.

**Different decay models produce radically different channel valuations:**
- **7-day decay:** Bottom-funnel channels (email, retargeting) get most credit, top-funnel channels (organic search, social discovery) get minimal credit
- **30-day decay:** Top-funnel channels retain credit because they're still within decay window when conversions happen
- **90-day decay:** Awareness channels (SEO, content marketing) receive meaningful credit for conversions happening months after initial discovery

**The challenge:** There is no objectively "correct" decay model. Customer journeys vary by industry, product price, buying cycle length. B2B SaaS with 90-day sales cycles requires different decay models than e-commerce with 3-day decision windows.

Choosing the wrong decay model misallocates budget: over-investing in bottom-funnel channels that get conversion credit but don't drive awareness, or over-investing in top-funnel channels that assisted conversions that would have happened anyway.

Links: [first-touch-last-touch-multi-touch-attribution](first-touch-last-touch-multi-touch-attribution.html), [multi-touch-attribution-small-business](multi-touch-attribution-small-business.html), [data-driven-attribution-ga4](data-driven-attribution-ga4.html)

---

## Time Decay Attribution Mechanics and Half-Life Parameters

Time decay attribution applies exponential decay functions to reduce credit as time between touchpoint and conversion increases.

### Exponential Decay Formula and Credit Calculation

**Standard time decay formula:**

Credit = Base Credit × e^(-λt)

Where:
- **Base Credit** = starting credit value (100% for most recent touchpoint)
- **e** = Euler's number (2.71828)
- **λ** (lambda) = decay constant, derived from half-life
- **t** = time elapsed between touchpoint and conversion (in days)

**Decay constant calculation:**

λ = ln(2) / half-life

For 7-day half-life: λ = 0.693 / 7 = 0.099
For 14-day half-life: λ = 0.693 / 14 = 0.0495
For 30-day half-life: λ = 0.693 / 30 = 0.0231

**Example calculation:**

Customer journey:
- Day 1: Organic search visit
- Day 8: Social media click
- Day 14: Email click
- Day 15: Purchase

**7-day half-life decay:**

Touchpoint 1 (organic, 14 days before purchase):
- Credit = 1 × e^(-0.099 × 14) = 1 × e^(-1.386) = 1 × 0.25 = 0.25

Touchpoint 2 (social, 7 days before purchase):
- Credit = 1 × e^(-0.099 × 7) = 1 × e^(-0.693) = 1 × 0.50 = 0.50

Touchpoint 3 (email, 1 day before purchase):
- Credit = 1 × e^(-0.099 × 1) = 1 × e^(-0.099) = 1 × 0.906 = 0.906

**Normalized credit (total = 100%):**
- Organic: 0.25 / (0.25 + 0.50 + 0.906) = 15.0%
- Social: 0.50 / 1.656 = 30.2%
- Email: 0.906 / 1.656 = 54.8%

**30-day half-life decay:**

Touchpoint 1 (organic, 14 days):
- Credit = e^(-0.0231 × 14) = e^(-0.323) = 0.724

Touchpoint 2 (social, 7 days):
- Credit = e^(-0.0231 × 7) = e^(-0.162) = 0.850

Touchpoint 3 (email, 1 day):
- Credit = e^(-0.0231 × 1) = e^(-0.023) = 0.977

**Normalized:**
- Organic: 0.724 / 2.551 = 28.4%
- Social: 0.850 / 2.551 = 33.3%
- Email: 0.977 / 2.551 = 38.3%

**Analysis:**

Same journey, different decay models:
- 7-day decay: Email gets 54.8% credit (favors recent touchpoints heavily)
- 30-day decay: Email gets 38.3% credit (distributes credit more evenly)
- 7-day organic credit: 15.0%
- 30-day organic credit: 28.4% (+89% more credit)

**Implication:** Channel valuation changes dramatically based on decay parameter. SEO looks nearly 2x more valuable under 30-day decay vs 7-day decay.

### Half-Life Selection Based on Purchase Cycle Length

**Principle:** Match decay half-life to typical customer decision timeline.

**Purchase cycle definitions:**

**Short cycle (1-7 days):**
- Low-cost e-commerce ($20-100 products)
- Impulse purchases
- Replacement purchases (batteries, toiletries)
- Fast food, entertainment, casual services

**Recommended half-life:** 3-7 days
**Reasoning:** Customers decide quickly. Touchpoints older than 1 week rarely influence final decision.

**Medium cycle (7-30 days):**
- Mid-price e-commerce ($100-500)
- Considered purchases (electronics, furniture)
- Service subscriptions (software, gym memberships)
- Local services (contractors, dentists)

**Recommended half-life:** 14-21 days
**Reasoning:** Research period spans 2-3 weeks. Early awareness touchpoints still influence final decision.

**Long cycle (30-90+ days):**
- High-price e-commerce ($500+)
- B2B SaaS
- Enterprise software
- Real estate, vehicles, major services

**Recommended half-life:** 30-60 days
**Reasoning:** Decision makers research for months. Early content (whitepapers, blog posts) influences eventual purchase even if conversion happens 60+ days later.

**Example industry mappings:**

| Industry | Typical Cycle | Recommended Half-Life |
|----------|--------------|---------------------|
| Fashion e-commerce | 3-7 days | 5-7 days |
| Consumer electronics | 14-21 days | 14 days |
| B2C SaaS | 14-30 days | 21 days |
| B2B SaaS (SMB) | 30-60 days | 30 days |
| B2B SaaS (enterprise) | 90-180 days | 60-90 days |
| Professional services | 30-90 days | 45 days |
| E-learning courses | 7-21 days | 14 days |

**Testing process:**

Select half-life based on industry benchmark → run attribution for 90 days → analyze channel credit distribution → validate against known customer journey data → adjust half-life if needed.

### Platform Default Decay Windows and Their Biases

**Google Analytics 4 default attribution:**
- **Model:** Data-driven attribution (default for properties with sufficient conversion volume)
- **Fallback:** Last-click attribution
- **Decay model:** Not exposed to users (Google's black-box algorithm)
- **Lookback window:** 90 days (can't be changed)

**Bias:** GA4's data-driven model tends to favor Google Ads because Google has complete visibility into ad touchpoints but limited visibility into off-platform touchpoints (social, email, offline). This creates attribution bias toward Google-owned channels.

**Facebook Ads attribution:**
- **Model:** Last-touch within attribution window
- **Default window:** 7-day click, 1-day view
- **Options:** 1-day click, 7-day click, 28-day click (can customize)
- **Decay:** None (last-touch, not time-decay)

**Bias:** 7-day click window favors bottom-funnel retargeting campaigns over awareness campaigns. Awareness campaigns that drive clicks 10+ days before purchase get zero credit.

**LinkedIn attribution:**
- **Model:** Last-touch within 30 days (B2B default)
- **Decay:** None (last-touch)
- **View-through tracking:** 30-day view window

**Bias:** 30-day window is appropriate for B2B but still last-touch, so early funnel content (blog posts, whitepapers) gets zero credit if later touchpoint exists.

**Third-party attribution tools:**

**Segment (Twilio):**
- Configurable decay models (linear, time decay, position-based)
- Custom half-life parameters (7, 14, 30, 60, 90 days)
- Cross-platform tracking

**Bias:** Requires implementation across all platforms—gaps in tracking create attribution blind spots.

**HubSpot:**
- Multiple models: first-touch, last-touch, linear, time decay
- Time decay uses 7-day default half-life (configurable)
- Full-funnel visibility for HubSpot-tracked channels

**Bias:** Non-HubSpot channels (organic social, offline) have limited tracking, receive less credit.

**Ruler Analytics:**
- Focuses on phone call attribution
- Time decay models for call tracking
- Integrates with CRM for full-cycle attribution

**Bias:** Over-weights call conversions vs digital conversions.

**Platform comparison:**

| Platform | Default Model | Decay Half-Life | Lookback Window | Bias |
|----------|--------------|----------------|----------------|------|
| GA4 | Data-driven | Hidden | 90 days | Favors Google Ads |
| Facebook Ads | Last-touch | N/A | 7 days | Favors retargeting |
| LinkedIn | Last-touch | N/A | 30 days | B2B appropriate but last-touch |
| HubSpot | Configurable | 7 days (default) | Unlimited | Favors HubSpot channels |
| Segment | Configurable | Custom | Custom | Neutral if implemented fully |

**Implication:** Every platform's default attribution is biased toward making that platform look more valuable. Use third-party attribution with custom decay models to get unbiased channel valuation.

---

## Channel Valuation Differences Across Decay Models

Decay model selection changes which channels appear valuable.

### SEO and Content Marketing Under Different Decay Curves

**SEO characteristics:**
- Top-funnel channel (awareness, discovery)
- Long time between touchpoint and conversion (typically 14-60 days)
- Customers often research via SEO, convert via other channels (email, direct)

**Valuation under 7-day decay:**

Customer discovers brand via SEO blog post → reads content → subscribes to email → receives nurture sequence → purchases 21 days later via email link

**Credit distribution (7-day half-life):**
- SEO blog post (21 days before purchase): 12% credit
- Email touchpoints (3, 10, 17 days before): 88% credit combined

**SEO appears low-value:** Contributed awareness but receives minimal attribution credit.

**Valuation under 30-day decay:**

Same journey, 30-day half-life:
- SEO blog post (21 days): 34% credit
- Email touchpoints: 66% credit combined

**SEO valuation nearly triples** (12% → 34%) simply by changing decay parameter.

**Valuation under 90-day decay:**

Same journey, 90-day half-life:
- SEO blog post (21 days): 42% credit
- Email touchpoints: 58% credit

**SEO gets nearly half the conversion credit** despite being earliest touchpoint.

**Budget implications:**

Publisher using 7-day decay concludes SEO is low-ROI, shifts budget to email. But email only works because SEO drives initial awareness. Cutting SEO budget reduces email performance 6-9 months later when organic traffic declines and email list growth slows.

Publisher using 30-day decay sees SEO's true contribution, maintains SEO investment, email list continues growing from organic traffic.

**Correct approach for content-driven businesses:**

Use 30-60 day decay to properly value awareness channels. Short decay models systematically under-value top-funnel channels that drive discovery.

### Email Marketing Attribution Across Time Windows

**Email marketing characteristics:**
- Mid-to-bottom funnel (nurture, conversion)
- Subscribers already aware of brand
- Time to conversion varies: immediate (promotional email) to weeks (nurture sequence)

**Promotional email example:**

Email sent → customer clicks → purchases same day

**Credit under any decay model:** ~100% (only touchpoint within conversion window)

**Nurture sequence example:**

Welcome email (Day 1) → Educational email (Day 7) → Case study email (Day 14) → Promotional email (Day 21) → Purchase (Day 22)

**7-day decay:**
- Welcome (21 days): 6% credit
- Educational (15 days): 13% credit
- Case study (8 days): 29% credit
- Promotional (1 day): 52% credit

**Interpretation:** Bottom-funnel promotional email gets most credit.

**30-day decay:**
- Welcome (21 days): 18% credit
- Educational (15 days): 24% credit
- Case study (8 days): 29% credit
- Promotional (1 day): 29% credit

**Interpretation:** All emails contribute roughly equally.

**Budget implications:**

Under 7-day decay, promotional emails look highly valuable, educational emails look weak. Publisher might cut educational content, send more promotions.

**Result:** Unsubscribe rate increases, list engagement drops, promotional emails become less effective because relationship-building emails were eliminated.

Under 30-day decay, publisher sees that educational emails contribute to eventual promotional email success. Maintains balanced nurture sequence. List engagement remains high.

**Correct approach for email:**

Use decay window matching typical nurture sequence length. If sequences run 30 days, use 30-day decay. If sequences run 60 days, use 60-day decay. Match attribution window to actual customer journey.

### Paid Advertising and Retargeting Credit Shifts

**Paid advertising attribution complexity:**

Customers often see ads multiple times across different stages:
- Awareness ad (cold traffic, brand introduction)
- Consideration ad (warm traffic, feature education)
- Conversion ad (hot traffic, discount/trial offer)
- Retargeting ad (cart abandonment, re-engagement)

**Example customer journey:**

Facebook awareness ad (Day 1) → Google search ad (Day 8) → Facebook retargeting ad (Day 14) → Purchase (Day 15)

**7-day decay:**
- Facebook awareness (14 days): 8% credit
- Google search (7 days): 25% credit
- Facebook retargeting (1 day): 67% credit

**Interpretation:** Retargeting dominates attribution. Awareness ads look inefficient.

**30-day decay:**
- Facebook awareness (14 days): 24% credit
- Google search (7 days): 31% credit
- Facebook retargeting (1 day): 45% credit

**Interpretation:** All ad touchpoints contribute meaningfully.

**Budget implications:**

Under 7-day decay, advertiser sees retargeting has 67% credit, awareness ads have 8%. Decision: Cut awareness budget, increase retargeting budget.

**6 months later:** Retargeting audience shrinks because awareness ads stopped feeding top of funnel. Retargeting performance collapses due to audience depletion. Total conversions drop 40%.

Under 30-day decay, advertiser sees awareness ads contribute 24% of credit. Maintains awareness budget. Retargeting audience remains large. Performance stays stable.

**Retargeting paradox:**

Retargeting always appears highly valuable under short decay windows because it's last touchpoint before conversion. But retargeting only works if awareness/consideration channels feed it. Over-indexing on retargeting starves the funnel.

**Correct approach for paid advertising:**

Use 14-30 day decay for most B2C. Use 30-60 day decay for B2B. Avoid 7-day decay unless selling impulse products. Longer decay windows prevent over-investment in retargeting at expense of awareness.

---

## Implementing Custom Decay Models in Analytics Platforms

Most platforms offer limited decay customization. Advanced attribution requires custom implementation.

### Google Analytics 4 Time Decay Configuration

**GA4 limitations:**
- Data-driven attribution is default, can't customize decay parameters
- No exposed time-decay model with configurable half-life
- Comparison tool shows multiple models but doesn't let you customize them

**Workaround: Exploration reports with custom segments**

**Implementation:**

1. Navigate to **Explore** → Create new exploration
2. Select **Funnel exploration** or **Path exploration**
3. Create custom segments for touchpoint timing:
   - "First interaction 0-7 days before conversion"
   - "First interaction 8-14 days before conversion"
   - "First interaction 15-30 days before conversion"
   - "First interaction 31-60 days before conversion"
4. Apply segments to conversions
5. Export data to spreadsheet
6. Apply custom decay formula in spreadsheet

**Example spreadsheet calculation:**

| Touchpoint Timing | Conversions | Decay Weight (30-day half-life) | Weighted Conversions |
|-------------------|-------------|-------------------------------|---------------------|
| 0-7 days | 450 | 0.90 | 405 |
| 8-14 days | 280 | 0.75 | 210 |
| 15-30 days | 190 | 0.50 | 95 |
| 31-60 days | 80 | 0.25 | 20 |

**Weighted total:** 730 weighted conversions vs 1,000 raw conversions

**Channel credit:** Distribute weighted conversions by channel across timing buckets.

**Limitation:** Manual process, not real-time, requires spreadsheet work.

### Building Time Decay Models in Spreadsheets

**Full custom implementation:**

**Step 1: Export raw touchpoint data**

Export from GA4, CRM, or data warehouse with columns:
- User ID
- Touchpoint timestamp
- Channel/source
- Conversion timestamp (if converted)
- Conversion value

**Step 2: Calculate days between touchpoint and conversion**

Formula (Google Sheets):
```
=IF(ISBLANK(D2), "", C2-B2)
```

Where:
- B2 = Touchpoint timestamp
- C2 = Conversion timestamp
- D2 = Conversion value (to filter non-converters)

**Step 3: Apply decay formula**

Formula for 30-day half-life:
```
=EXP(-0.0231*E2)
```

Where E2 = days between touchpoint and conversion

**Step 4: Calculate weighted credit**

For each user, sum decay weights across all touchpoints, then calculate percentage:

```
=F2/SUMIFS($F$2:$F$1000, $A$2:$A$1000, A2)
```

Where:
- F2 = Decay weight for this touchpoint
- A2 = User ID (to group touchpoints by user)

**Step 5: Aggregate by channel**

Pivot table:
- Rows: Channel
- Values: Sum of weighted credit, Count of conversions
- Calculated field: Weighted conversions per channel

**Output example:**

| Channel | Raw Conversions | Weighted Conversions | Difference |
|---------|----------------|---------------------|------------|
| Email | 420 | 385 | -8.3% |
| Paid Search | 310 | 245 | -21.0% |
| Organic | 180 | 225 | +25.0% |
| Social | 90 | 95 | +5.6% |

**Interpretation:** Organic search gains +25% credit under time decay vs last-touch, paid search loses -21% credit. Organic is more valuable than last-touch suggests.

### Third-Party Attribution Tool Configurations

**Segment time decay setup:**

1. Navigate to **Warehouse** → **SQL Editor**
2. Query touchpoint data with timestamps
3. Apply decay formula in SQL:

```sql
SELECT
  user_id,
  channel,
  timestamp,
  conversion_timestamp,
  DATEDIFF(conversion_timestamp, timestamp) AS days_to_conversion,
  EXP(-0.0231 * DATEDIFF(conversion_timestamp, timestamp)) AS decay_weight
FROM touchpoints
WHERE conversion_timestamp IS NOT NULL
```

4. Create materialized view for decay-weighted attribution
5. Build dashboard from materialized view

**HubSpot time decay setup:**

1. Navigate to **Reports** → **Analytics Tools** → **Attribution Reports**
2. Select **Time Decay** model
3. Choose half-life parameter (HubSpot offers 7, 14, 30 days)
4. Apply to revenue or conversion reports
5. Compare against first-touch, last-touch, linear models

**Ruler Analytics configuration:**

1. Set up **Call Tracking** with matched sessions
2. Navigate to **Attribution** → **Models**
3. Select **Time Decay**
4. Configure decay rate (Ruler uses percentage-based decay, not half-life)
   - Fast decay: 50% credit reduction every 7 days
   - Medium decay: 50% reduction every 14 days
   - Slow decay: 50% reduction every 30 days
5. Apply model to phone calls + digital conversions

**Comparison output:**

| Tool | Ease of Setup | Customization | Cross-Platform | Cost |
|------|--------------|--------------|----------------|------|
| GA4 Exploration | Medium | Low | GA4 only | Free |
| Spreadsheet | Hard | Full | Manual export | Free |
| Segment | Hard | Full | Yes | $120+/month |
| HubSpot | Easy | Medium | HubSpot channels | $800+/month |
| Ruler Analytics | Medium | Medium | Yes | $199+/month |

**Recommendation:**

Start with GA4 Exploration for basic time decay insights. Graduate to spreadsheet implementation for full customization. Invest in third-party tool (Segment, Ruler) only if managing $50k+/month ad spend where attribution precision justifies cost.

---

## Common Decay Model Mistakes and Corrections

Time decay attribution introduces specific failure modes.

### Over-Weighting Retargeting Due to Short Windows

**Mistake:**

Using 7-day decay window for product with 30-day consideration cycle.

**Example:**

Furniture e-commerce (typical purchase cycle: 21-35 days):
- Customer discovers brand via Pinterest (Day 1)
- Reads blog posts via Google (Days 3, 8, 15)
- Sees Facebook retargeting ad (Day 22)
- Purchases (Day 23)

**7-day decay attribution:**
- Pinterest (22 days): 4% credit
- Google visits (20, 15, 8 days): 16% combined credit
- Facebook retargeting (1 day): 80% credit

**Advertiser conclusion:** Facebook retargeting is primary driver, Pinterest and SEO are weak. Decision: Cut Pinterest and SEO budget, increase Facebook retargeting.

**6 months later:**
- Pinterest traffic (which fed retargeting audience) dropped 70%
- SEO traffic dropped 40%
- Facebook retargeting audience shrunk 60%
- Retargeting performance collapsed (fewer people to retarget)
- Total revenue dropped 35%

**Correction:**

Use 30-day decay matching actual purchase cycle:
- Pinterest (22 days): 17% credit
- Google visits: 31% combined credit
- Facebook retargeting (1 day): 52% credit

**Insight:** Top-funnel channels contribute meaningfully. Maintain awareness budget to feed retargeting audience.

**Rule:** Decay window must equal or exceed typical purchase consideration period. Short windows systematically over-credit retargeting.

### Ignoring Offline Touchpoints in Decay Calculations

**Mistake:**

Applying time decay only to digital touchpoints while offline touchpoints exist in customer journey.

**Example:**

Local service business (HVAC repair):
- Customer sees Google Ad (Day 1)
- Visits website, doesn't convert
- Receives direct mail postcard (Day 8, not tracked digitally)
- Calls business from postcard (Day 10)
- Schedules appointment via phone (Day 10)
- Service completed, payment collected (Day 15)

**Digital-only attribution (7-day decay):**
- Google Ad (14 days): 100% credit
- Direct mail: 0% credit (not tracked)

**Advertiser conclusion:** Google Ads driving all conversions. Increase Google budget, question direct mail ROI.

**Reality:** Direct mail actually drove conversion. Customer saw ad initially but didn't act until direct mail reminded them.

**Correction:**

Implement offline tracking:
- Unique phone numbers on direct mail (call tracking)
- Unique promo codes ("Use code MAIL10 for 10% off")
- Survey customers: "How did you hear about us?"

**Integrated attribution (30-day decay, including offline):**
- Google Ad (14 days): 35% credit
- Direct mail (5 days): 65% credit

**Insight:** Direct mail is primary conversion driver. Google Ad contributes awareness. Maintain both channels.

**Rule:** Time decay attribution fails if touchpoints are invisible. Track offline channels (direct mail, radio, TV, in-person events) or attribution systematically under-values them.

### Applying Same Decay Rate Across Different Product Lines

**Mistake:**

Using single decay model for business selling products with different purchase cycles.

**Example:**

E-commerce selling both low-ticket ($20-50) and high-ticket ($500-2,000) products:
- Low-ticket: 3-7 day purchase cycle (impulse)
- High-ticket: 21-45 day purchase cycle (research-heavy)

**Company applies 14-day decay to both:**

**Low-ticket results:**
- Decay window too long (customers decide in 3-7 days)
- Early touchpoints get excess credit for decisions that were actually made quickly
- Awareness channels look more valuable than they are

**High-ticket results:**
- Decay window too short (customers research 21-45 days)
- Early research touchpoints get insufficient credit
- Top-funnel content looks weak despite driving discovery

**Correction:**

Segment attribution by product category:
- Low-ticket products: 7-day decay
- High-ticket products: 30-day decay

**Run separate attribution reports:**

**Low-ticket attribution (7-day decay):**
- Social ads: 45% credit (drive impulse)
- Retargeting: 40% credit (close quick buyers)
- SEO: 15% credit (some discovery)

**High-ticket attribution (30-day decay):**
- SEO: 38% credit (primary discovery)
- Social ads: 22% credit (awareness)
- Email nurture: 25% credit (education)
- Retargeting: 15% credit (final push)

**Budget allocation:**

Low-ticket: Heavy social + retargeting (bottom-funnel focus)
High-ticket: Heavy SEO + email nurture (top/mid-funnel focus)

**Rule:** One decay model doesn't fit all products. Segment by purchase cycle length and apply appropriate decay parameters.

---

## Advanced: Position-Based Decay Hybrids

Sophisticated models combine time decay with position-based credit.

### U-Shaped (Position-Based) Time Decay Models

**Standard position-based model:**
- First touch: 40% credit
- Last touch: 40% credit
- Middle touches: 20% divided equally

**Problem:** Ignores time between touchpoints.

**U-shaped time decay hybrid:**
- First touch: 30% base credit + time decay
- Last touch: 30% base credit + time decay
- Middle touches: 40% credit distributed via time decay

**Formula:**

First-touch credit = 0.30 + (0.40 × decay_weight / total_decay_weight)
Last-touch credit = 0.30 + (0.40 × decay_weight / total_decay_weight)
Middle-touch credit = (0.40 × decay_weight / total_decay_weight)

**Example journey:**

Customer sees Facebook ad (Day 1) → Reads blog via SEO (Day 10) → Gets email (Day 20) → Clicks retargeting ad (Day 27) → Purchases (Day 28)

**Standard U-shaped (no decay):**
- Facebook (first): 40%
- SEO: 10% (20% / 2 middle touches)
- Email: 10%
- Retargeting (last): 40%

**U-shaped with 30-day time decay:**

Calculate decay weights:
- Facebook (27 days): e^(-0.0231 × 27) = 0.51
- SEO (18 days): e^(-0.0231 × 18) = 0.66
- Email (8 days): e^(-0.0231 × 8) = 0.83
- Retargeting (1 day): e^(-0.0231 × 1) = 0.98

Total decay weight: 2.98

**First-touch (Facebook):**
- Base: 30%
- Decay bonus: 40% × (0.51 / 2.98) = 6.8%
- Total: 36.8%

**Last-touch (Retargeting):**
- Base: 30%
- Decay bonus: 40% × (0.98 / 2.98) = 13.2%
- Total: 43.2%

**Middle touches:**
- SEO: 40% × (0.66 / 2.98) = 8.9%
- Email: 40% × (0.83 / 2.98) = 11.1%

**Comparison:**

| Channel | Standard U-Shaped | U-Shaped + Time Decay | Difference |
|---------|------------------|---------------------|------------|
| Facebook (first) | 40% | 36.8% | -3.2% |
| SEO (middle) | 10% | 8.9% | -1.1% |
| Email (middle) | 10% | 11.1% | +1.1% |
| Retargeting (last) | 40% | 43.2% | +3.2% |

**Insight:** Hybrid model recognizes both position importance (first/last) and recency (time decay). More recent middle touches (email at 8 days) get more credit than older middle touches (SEO at 18 days).

### Custom Decay Curves for Different Funnel Stages

**Problem:** Linear decay assumes consistent influence deterioration. Reality: awareness touchpoints maintain influence longer, conversion touchpoints lose influence rapidly.

**Custom decay by funnel stage:**

**Awareness touchpoints (SEO, social discovery, PR):**
- Use 60-90 day half-life (slow decay)
- These create brand memory that persists for months

**Consideration touchpoints (blog content, comparison pages, reviews):**
- Use 30-day half-life (medium decay)
- Influence lasts weeks but fades as customer researches competitors

**Conversion touchpoints (product pages, pricing, demos):**
- Use 7-14 day half-life (fast decay)
- Relevant only when customer is actively evaluating, loses relevance quickly

**Implementation:**

Classify each channel by typical funnel stage:

**Awareness:**
- Organic social
- PR/media mentions
- Top-funnel SEO (informational keywords)
- Display ads

**Consideration:**
- Email nurture sequences
- Educational blog content
- Webinars/guides
- Comparison pages

**Conversion:**
- Product pages
- Pricing pages
- Free trial signups
- Retargeting ads

**Apply stage-appropriate decay:**

Customer journey:
- Organic social post (Day 1, awareness)
- Blog post via SEO (Day 15, consideration)
- Pricing page (Day 28, conversion)
- Purchase (Day 30)

**Awareness (60-day half-life):**
- Social (29 days): e^(-0.0116 × 29) = 0.71

**Consideration (30-day half-life):**
- SEO (15 days): e^(-0.0231 × 15) = 0.69

**Conversion (7-day half-life):**
- Pricing page (2 days): e^(-0.099 × 2) = 0.82

**Normalized credit:**
- Social: 0.71 / 2.22 = 32.0%
- SEO: 0.69 / 2.22 = 31.1%
- Pricing: 0.82 / 2.22 = 36.9%

**Comparison to single 30-day decay:**
- Social: 24% (vs 32% custom)
- SEO: 35% (vs 31% custom)
- Pricing: 41% (vs 37% custom)

**Insight:** Custom decay increases awareness channel credit (+8 points) because awareness influence persists longer. Conversion channel credit decreases (-4 points) because pricing page influence is temporary.

**Result:** More accurate valuation of awareness investments.

---

## When This Analysis Doesn't Apply

Skip this framework if:

- **You're in the first 3 months of a new site.** Traffic diversification assumes you have at least one working channel. Establish your first reliable traffic source before optimizing the portfolio.
- **Your traffic is already diversified below 40% from any single source.** You've solved the concentration problem. Focus on channel efficiency and conversion optimization instead.
- **You're running a time-limited campaign.** Short-term projects (product launches, events) benefit from channel concentration, not diversification. Spread resources after the sprint.

---

## FAQ

### What decay half-life should I use if I don't know my average purchase cycle?

Start with 30-day half-life as universal default. This works reasonably well for most B2C products with mid-range consideration (electronics, services, courses). Run attribution for 90 days, then validate by surveying customers: "How long did you research before buying?" If average is <14 days, switch to 14-day decay. If >45 days, switch to 60-day. Refine iteratively based on actual customer behavior data.

### Does time decay attribution work for subscription businesses where customers stay for months or years?

Time decay applies to initial conversion attribution, not lifetime value. Use decay models to assign credit for first subscription signup across acquisition channels. For retention/expansion attribution, use separate model tracking touchpoints between signup and renewal (support interactions, feature usage, email engagement). Renewal decisions have different influence patterns than acquisition decisions—track them separately.

### How do I apply time decay when customers have multiple devices and cross-device tracking is incomplete?

Incomplete tracking biases decay models toward tracked devices (typically desktop/laptop). Mobile touchpoints get under-counted. Correction: Use device distribution data from industry benchmarks. If industry shows 60% mobile / 40% desktop but your tracking shows 40% mobile / 60% desktop, apply 1.5x weight to mobile touchpoints to compensate for tracking gaps. Better solution: Implement proper cross-device tracking (GA4 User ID, CRM matching).

### Should I use shorter decay windows during promotional periods when purchase cycles compress?

Yes. Time decay should match actual customer behavior, which changes during promotions. During Black Friday or limited-time sales, purchase cycles compress from 30 days to 3-7 days. Apply shorter decay window (7-day) during promotional periods, revert to 30-day for steady-state periods. Run separate attribution reports for promotional vs non-promotional conversions to see channel effectiveness differences.

### Can I use time decay attribution if most of my traffic is direct or unknown source?

Time decay requires visible touchpoints. If 60%+ traffic is direct/unknown, attribution models (including time decay) will be inaccurate. Fix tracking first: deploy UTM parameters on all external links, implement better referrer tracking, use first-party cookies to identify returning users. Once you can track 70%+ of touchpoints, decay models become useful. Attribution with invisible journeys produces garbage insights regardless of sophistication.

---

## Frequently Asked Questions

### How quickly can I implement this traffic strategy?

Most frameworks in this article can be partially deployed within a week. Full implementation with measurement infrastructure typically takes 2-4 weeks. Start with the diagnostic steps before committing to major channel shifts.

### Does this work for sites with less than 10K monthly visitors?

Yes. The principles apply at any traffic level. Smaller sites benefit more from channel diversification because single-source dependency is riskier with a smaller base. The measurement approach scales down — start with simpler attribution before building complex models.

### What tools do I need to execute this?

Google Search Console and Google Analytics cover the baseline. For deeper analysis: Ahrefs or Semrush for competitive data, a spreadsheet for channel attribution tracking. No enterprise tools required — the strategy is more important than the tooling.

