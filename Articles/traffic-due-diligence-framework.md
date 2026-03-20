---
title:: Traffic Due Diligence Framework: Pre-Acquisition Site Analysis
description:: Evaluate traffic portfolio quality before buying a site. Red flags, correlation analysis, and platform dependency assessment.
focus_keyword:: traffic due diligence
category:: Strategy
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Traffic Due Diligence Framework: Pre-Acquisition Site Analysis

> **Quick Summary**
> - **What this covers:** Evaluate traffic portfolio quality before buying a site. Red flags, correlation analysis, and platform dependency assessment.
> - **Who it's for:** traffic strategists and growth operators
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.


**What looks like a "stable" traffic portfolio is often a house of cards waiting for an algorithm update.**

When evaluating a site for acquisition—whether you're buying outright, partnering, or investing—traffic quality determines business viability. A site generating 100K visits from diverse-looking sources can be more fragile than a 40K-visit site with true diversification.

This framework dissects traffic portfolios to identify hidden concentration risks, correlation traps, and platform dependencies that don't show up in Google Analytics screenshots.

It's the due diligence checklist used by site buyers who avoided catastrophic acquisitions disguised as "stable, diversified assets."

## The Core Question: Is This Traffic Portfolio Antifragile?

**Antifragile traffic** doesn't just survive shocks—it benefits from volatility. When Google updates, YouTube algorithm changes, or social platforms shift priorities, an antifragile portfolio maintains or improves total traffic.

**Fragile traffic** looks stable until it isn't. One algorithm change and 60-80% of traffic vanishes.

**Due diligence answers**: Is this portfolio antifragile, robust, or fragile?

## Stage 1: Traffic Source Inventory (Surface Analysis)

**Request from seller**:

1. **12 months of Google Analytics exports** (Acquisition > All Traffic > Source/Medium)
2. **Weekly traffic data** (not monthly—you need granularity to detect volatility)
3. **Revenue by traffic source** (not just visits—some sources deliver 5× higher value)

**Red flag #1: Seller provides only monthly data or screenshots**

Monthly aggregation hides volatility. A channel averaging 10K visits/month could be 15K in January and 5K in February, or it could be 10K ±500 every month. These have radically different risk profiles.

**Minimum acceptable**: Weekly data for 52 weeks across all traffic sources.

### Calculate Traffic Concentration Index

**Formula** (Herfindahl-Hirschman Index adapted for traffic):

```
HHI = Σ(si²)
```

Where si = market share (% of total traffic) for each source.

**Example calculation**:

| Source | Traffic | % Share | (Share)² |
|--------|---------|---------|----------|
| Google | 42,000 | 70% | 0.49 |
| Direct | 8,000 | 13.3% | 0.018 |
| Pinterest | 6,000 | 10% | 0.01 |
| Email | 4,000 | 6.7% | 0.0045 |

```
HHI = 0.49 + 0.018 + 0.01 + 0.0045 = 0.5225
```

**Interpretation**:

- **HHI < 0.25**: Highly diversified (low concentration risk)
- **HHI 0.25-0.45**: Moderate concentration (acceptable with caveats)
- **HHI > 0.45**: High concentration (significant risk)

This site's HHI of 0.52 indicates **dangerous concentration** despite appearing to have "4 traffic sources." The Google dominance creates fragility.

**Pass/fail threshold**: HHI <0.40 for acquisition consideration. Above 0.40, demand 20-30% discount to compensate for concentration risk.

## Stage 2: Correlation Analysis (Hidden Risk Detection)

**Objective**: Determine if secondary traffic sources truly diversify risk or are correlated with primary source.

**Action items**:

1. Export weekly traffic for top 3-5 sources
2. Calculate Pearson correlation coefficient between all source pairs
3. Identify clustered risks (sources that move together)

**Red flag #2: Seller claims diversification but sources are highly correlated**

**Example correlation matrix** (real acquisition target, disguised to protect seller):

|           | Google | Facebook | Instagram | Twitter |
|-----------|--------|----------|-----------|---------|
| Google    | 1.00   | 0.68     | 0.72      | 0.64    |
| Facebook  | 0.68   | 1.00     | 0.89      | 0.58    |
| Instagram | 0.72   | 0.89     | 1.00      | 0.61    |
| Twitter   | 0.64   | 0.58     | 0.61      | 1.00    |

**Analysis**: This site claimed "diversified traffic across 4 major platforms." Reality: all four sources are highly correlated (0.58-0.89). They're all algorithmically-driven engagement platforms. When Google devalued the content (low authority, thin coverage), Facebook/Instagram/Twitter did the same within 2-4 weeks.

**The buyer who skipped correlation analysis** purchased this site for $180K. Three months later, a Google Core Update dropped traffic 67%. Facebook/Instagram/Twitter traffic dropped 58%, 61%, and 54% respectively (all within weeks of each other). The portfolio wasn't diversified—it was clustered risk disguised as diversification.

**Pass/fail threshold**: No two sources should exceed 0.50 correlation. If top two sources are >0.60 correlated, that's **dual concentration risk**—fail or demand 30-40% discount.

### Correlation Red Flags by Source Pairs

**High-risk combinations** (typically correlated >0.50):

- **Google + Bing** (share algorithmic principles)
- **Facebook + Instagram** (same parent company, similar algorithms)
- **YouTube + TikTok** (both video engagement algorithms)
- **Reddit + Hacker News** (similar voting/ranking mechanics)

**Low-risk combinations** (typically correlated <0.30):

- **Google + Email** (search intent vs. owned audience)
- **Pinterest + YouTube** (discovery vs. entertainment intent)
- **Email + Any platform** (owned vs. rented)
- **Direct + Paid** (brand loyalty vs. acquisition)

**Buyer's advantage**: Sellers rarely calculate correlations. If you do this analysis and discover 0.70 correlation between what seller calls "diversified sources," you have negotiating leverage.

## Stage 3: Platform Dependency Risk Audit

**Objective**: Identify single points of failure where platform policy changes could destroy traffic.

### Audit Checklist

**Question 1: What % of traffic is "owned" vs. "rented"?**

- **Owned traffic**: Email list, RSS subscribers, mobile app installs, direct bookmarks
- **Rented traffic**: Google, social platforms, aggregators, referrals

**Red flag #3: <15% owned traffic**

If 85%+ traffic is platform-dependent, the business is fundamentally a rented asset. You're buying access to distribution platforms, not an audience.

**Calculation example**:

- **Total traffic**: 60,000/month
- **Email**: 4,000 (6.7%)
- **Direct**: 8,000 (13.3%)
- **Owned %**: 20%

This is acceptable (above 15% threshold). Below 15%, demand seller demonstrate path to owned audience growth or discount 25-35% for platform risk.

**Question 2: Are traffic sources subject to arbitrary policy enforcement?**

**High-risk platforms** (frequent, unpredictable policy changes):

- **Facebook/Instagram**: Content policies change monthly, appeal processes are opaque
- **YouTube**: Demonetization, shadow bans, and recommendation algorithm shifts are common
- **TikTok**: "Community guidelines" violations are algorithmically detected with high false-positive rates
- **Google**: Core updates every 3-6 months with major ranking volatility

**Low-risk platforms**:

- **Email**: You control delivery (ISP spam filters are predictable)
- **Pinterest**: More stable algorithm, rare policy enforcement
- **RSS**: Zero platform risk (direct protocol)

**Risk scoring** (weight by traffic %):

| Source | Traffic % | Risk Score (1-10) | Weighted Risk |
|--------|-----------|-------------------|---------------|
| Google | 70% | 8 | 5.6 |
| Facebook | 12% | 9 | 1.08 |
| Email | 10% | 2 | 0.2 |
| Pinterest | 8% | 4 | 0.32 |

**Total portfolio risk**: 7.2/10 (high risk)

**Interpretation**: Score >6 = high platform dependency. Score 3-6 = moderate. Score <3 = low (resilient portfolio).

**Pass/fail threshold**: Portfolio risk score <5 for acquisition. Score >6 demands contingency planning or price adjustment.

**Question 3: Has the site survived an algorithm update in the past 12 months?**

**Red flag #4: Seller shows 12 months of "stable growth" with no volatility**

This often means the site hasn't been tested. Google's Core Updates occur every 4-6 months. If traffic was stable for 12 months, either:

1. The site hasn't experienced an update (lucky timing, not resilience)
2. The site operates in a low-competition niche that Google hasn't re-evaluated
3. The seller is cherry-picking data (showing only stable period, hiding drops)

**Request**: Traffic data covering at least one major algorithm update (Google Core Update, YouTube algorithm shift, Facebook reach decline).

**How the site performed during the update** is the true stress test of portfolio resilience.

**Case example**: Buyer acquired site showing 12 months of 15% MoM growth. Looked perfect. Two months post-acquisition, Google Core Update hit. Traffic dropped 58%. Buyer discovered seller had hidden prior update data where traffic dropped 62%, recovered slowly, then grew during "stable period" shown in listing.

**Takeaway**: Demand complete traffic history (24-36 months minimum), not just the "good period."

## Stage 4: Revenue Quality Analysis

**Objective**: Determine if traffic sources deliver monetizable intent or vanity metrics.

### Revenue per Visit (RPV) by Source

**Action**: Request revenue attribution by traffic source (Acquisition > Source/Medium > E-commerce or Goals).

**Red flag #5: Seller provides total revenue but not revenue by source**

This hides low-quality traffic sources. A site generating $10K/month from 100K visits could be:

- **Scenario A**: 50K Google visits @ $0.18 RPV = $9K, 50K social @ $0.02 RPV = $1K
- **Scenario B**: 80K email visits @ $0.125 RPV = $10K, 20K Google @ $0 RPV (informational)

Scenario A has valuable Google traffic—if that drops, revenue collapses. Scenario B has resilient email revenue—more robust.

**Analysis framework**:

| Source | Traffic | Revenue | RPV | Intent Quality |
|--------|---------|---------|-----|----------------|
| Google | 40,000 | $7,200 | $0.18 | High |
| Email | 8,000 | $3,200 | $0.40 | Very High |
| Pinterest | 10,000 | $800 | $0.08 | Low |
| Facebook | 6,000 | $180 | $0.03 | Very Low |

**Insight**: Email delivers 2.2× higher RPV than Google despite lower volume. If Google traffic drops 50%, revenue drops 32%. If email traffic drops 50%, revenue drops 14%. **Email-heavy portfolios are more resilient** to individual channel shocks.

**Pass/fail threshold**: If top traffic source (by volume) also has highest RPV, that's **dual dependency**—both traffic and revenue concentrated. Fail or discount.

**Ideal profile**: Top traffic source by volume ≠ top source by revenue. This creates natural hedging.

## Stage 5: Growth Trajectory vs. Maintenance Requirements

**Objective**: Determine if traffic growth is organic (compounding) or input-dependent (treadmill).

**Question 1: What's the content velocity required to maintain traffic?**

**Request from seller**: Articles published per month vs. traffic growth rate.

**Analysis example**:

- **Months 1-6**: Published 12 articles/month, traffic grew 8% MoM
- **Months 7-12**: Published 6 articles/month, traffic grew 2% MoM

**Interpretation**: Traffic growth is input-dependent. Cut publication rate 50%, growth dropped 75%. This site requires continuous content production to maintain trajectory.

**Red flag #6: Traffic decays rapidly when content production pauses**

Indicates **extractive traffic model** (each article is independent event) rather than **perpetual model** (articles compound over time).

**Pass/fail threshold**: If traffic grew <3% in any month where content production was <50% of peak, the site requires high ongoing effort to maintain. Adjust financial model to account for required content investment.

**Question 2: What % of traffic comes from articles >12 months old?**

**Request from seller**: Landing page report (Behavior > Site Content > Landing Pages) filtered by publish date.

**Calculation**:

- **Traffic from articles <6 months old**: 40%
- **Traffic from articles 6-12 months old**: 35%
- **Traffic from articles >12 months old**: 25%

**Red flag #7: <30% of traffic from articles >12 months old**

Indicates content decays quickly. The site is a "content treadmill"—you must keep publishing or traffic collapses.

**Healthy profile**: 50%+ traffic from evergreen content >12 months old. This demonstrates **compounding traffic**—old content continues delivering value.

**Buyer's adjustment**: If <30% traffic is evergreen, increase estimated monthly content production requirement by 50% in your financial model.

## Stage 6: Email List Quality Assessment

**Objective**: If seller includes email list in sale, verify it's a real asset (not inflated or low-engagement).

**Question 1: What's the email open rate?**

**Red flag #8: Seller won't disclose open rate or claims >50% open rate**

Industry benchmarks:

- **20-30%**: Acceptable for larger lists (5K+ subscribers)
- **30-40%**: Good (engaged audience)
- **40-50%**: Excellent (high-quality list)
- **>50%**: Either small list (<500 subs) or fabricated data

If seller claims 60% open rate on 10K+ list, demand proof (full email platform export with campaign data).

**Question 2: List growth rate vs. churn rate**

**Request**: Monthly subscriber adds and unsubscribes for past 12 months.

**Healthy profile**:

- **Growth rate**: 8-15% MoM
- **Churn rate**: <2% per send

**Red flag #9: Churn >5% or list shrinking**

High churn indicates low-quality subscribers (bought lists, poor content fit) or overly promotional emails. The list is burning out.

**Question 3: Engagement recency**

**Request**: % of list that opened email in past 30 days.

**Benchmark**:

- **>40%**: Highly engaged
- **20-40%**: Moderate engagement
- **<20%**: Mostly dead list

If only 15% of "10,000 subscribers" engaged in past 30 days, the real list size is 1,500. Adjust valuation accordingly.

## Stage 7: Technical Infrastructure Audit

**Objective**: Identify technical debt that could impact traffic post-acquisition.

**Checklist**:

### Core Web Vitals Compliance

**Request**: Google Search Console Core Web Vitals report (past 6 months).

**Red flag #10: >20% of pages failing Core Web Vitals**

Google uses page experience as ranking factor. If site is currently passing but has technical debt (slow hosting, unoptimized images, render-blocking scripts), post-acquisition performance could decline.

**Action**: Run Lighthouse audit on top 10 traffic pages. Failing pages require remediation budget.

### Backlink Profile Health

**Request**: Ahrefs or SEMrush export (backlink profile, anchor text distribution, referring domains).

**Red flag #11: Spammy backlink profile**

If >30% of backlinks are from low-DR (<20) domains, link schemes, or exact-match anchor text, the site is at risk of manual penalty or algorithm devaluation.

**Toxic backlink indicators**:

- **Exact-match anchor text** >15% of total anchors
- **Links from PBNs** (Private Blog Networks—identifiable via shared IP ranges, WHOIS privacy, thin content)
- **Sudden backlink spikes** (100+ links acquired in single month)

**Action**: Budget for link disavowal + natural link building campaign post-acquisition.

### Content Ownership and Originality

**Run**: Copyscape or plagiarism check on top 20 articles.

**Red flag #12: Content is scraped, spun, or AI-generated without editing**

Google's "Helpful Content" updates (2023-2024) target low-quality AI content. If site's content is thin, generated, or duplicated, traffic is at immediate risk.

**Action**: Budget for content refresh or rewrite post-acquisition.

## Stage 8: Competitive and Market Risk Assessment

**Objective**: Determine if traffic is defensible or vulnerable to competitive displacement.

**Question 1: What % of traffic comes from branded queries?**

**Request**: Google Search Console > Performance > Queries (filter for branded terms).

**Red flag #13: <10% branded traffic**

Low branded traffic means users arrive via generic queries ("best coffee maker," "how to lose weight") where competition is intense. Small algorithm shifts or new competitors can displace traffic.

**Healthy profile**: 20-40% branded traffic. Indicates brand equity and repeat visitors.

**Question 2: How many competitors rank for the same keywords?**

**Action**: Identify top 10 traffic-driving keywords (from GSC). Search each keyword, note how many competitors rank in top 10 results.

**Red flag #14: 8-10 competitors for every top keyword**

High competition means traffic is fragile—any competitor improving content can displace rankings.

**Low competition**: 3-5 competitors in top 10 (defensible niche).

## Stage 9: Seller Motivation and Transparency

**Objective**: Understand why seller is exiting now.

**Question 1: Why are you selling?**

**Red flags** (common lies):

- **"Don't have time"** → Site requires more effort than advertised
- **"Pursuing other projects"** → Traffic is declining, exiting before it shows
- **"Health issues"** → Generic excuse to avoid explaining underperformance

**Credible reasons**:

- **Life event** (verifiable: relocation, career change)
- **Portfolio pruning** (seller shows other sites they're keeping)
- **Strategic exit** (selling high after building asset to target value)

**Question 2: Will you provide 30-60 day transition support?**

**Red flag #15: Seller refuses transition support**

Indicates seller knows business will struggle post-acquisition and doesn't want to be associated with failure.

**Insist on**: 30 days minimum transition (technical handoff, process documentation, vendor intros).

## Stage 10: Valuation Adjustment Framework

After completing Stages 1-9, apply discounts for identified risks:

| Risk Factor | Severity | Discount |
|-------------|----------|----------|
| HHI >0.45 | High concentration | -25% |
| Correlation >0.60 between top 2 sources | Clustered risk | -20% |
| Platform risk score >6 | High platform dependency | -15% |
| <15% owned traffic | No audience moat | -20% |
| <30% evergreen traffic | Content treadmill | -15% |
| Email churn >5% | Burning list | -10% |
| Core Web Vitals failing | Technical debt | -10% |
| Spammy backlinks | Penalty risk | -20% |

**Cumulative discount cap**: 60% (if site fails so many checks it warrants >60% discount, don't acquire at any price).

**Example valuation adjustment**:

- **Listed price**: $150,000
- **HHI**: 0.52 (25% discount) = $112,500
- **Top 2 sources correlation**: 0.68 (20% discount) = $90,000
- **Platform risk**: 7.2/10 (15% discount) = $76,500
- **Adjusted fair value**: $76,500

**Offer**: $70,000-75,000 with earnout (future payment if traffic maintains).

## Post-Acquisition Diversification Plan

If you acquire a fragile traffic portfolio, immediate diversification is critical:

**Months 1-3**: Build email infrastructure, capture 3%+ of existing traffic as subscribers

**Months 4-6**: Launch secondary channel (YouTube, Pinterest, based on niche fit)

**Months 7-12**: Target portfolio rebalance to HHI <0.35, no source >50% traffic

**Contingency budget**: Allocate 20-30% of purchase price to diversification investment in Year 1.

## FAQ: Traffic Due Diligence

**How long does full due diligence take?**
40-60 hours for comprehensive analysis (Stages 1-10). Smaller sites (<$50K valuation) can compress to 20-30 hours (skip Stages 7-8).

**Can sellers fake traffic data?**
Yes. Insist on direct Google Analytics access (not screenshots or PDFs). Verify with Search Console data (seller can't fake GSC impressions/clicks).

**What if seller refuses to provide requested data?**
Walk away. Legitimate sellers provide full transparency. Refusal indicates hidden problems. No asset is worth buying blind.

**Is traffic diversification a requirement for acquisition?**
No. Mono-channel sites can be excellent acquisitions if priced appropriately. Just adjust valuation to reflect concentration risk. A $200K "diversified" site with hidden correlation might be worse than a $80K mono-channel site priced honestly.

**How do you verify email list quality without seller disclosing subscribers?**
Request aggregate data (open rates, list size, churn) and sample email campaign exports (anonymized). Seller can prove engagement without sharing subscriber identities.

**Related guides**: [Traffic Diversification Strategy Framework](traffic-diversification-strategy-framework.html) | [Traffic Portfolio Risk Calculator](traffic-portfolio-risk-calculator.html) | [Traffic Monitoring Alert System](traffic-monitoring-alert-system.html)

---

## When This Analysis Doesn't Apply

Skip this framework if:

- **You're in the first 3 months of a new site.** Traffic diversification assumes you have at least one working channel. Establish your first reliable traffic source before optimizing the portfolio.
- **Your traffic is already diversified below 40% from any single source.** You've solved the concentration problem. Focus on channel efficiency and conversion optimization instead.
- **You're running a time-limited campaign.** Short-term projects (product launches, events) benefit from channel concentration, not diversification. Spread resources after the sprint.

---

## Frequently Asked Questions

### How quickly can I implement this traffic strategy?

Most frameworks in this article can be partially deployed within a week. Full implementation with measurement infrastructure typically takes 2-4 weeks. Start with the diagnostic steps before committing to major channel shifts.

### Does this work for sites with less than 10K monthly visitors?

Yes. The principles apply at any traffic level. Smaller sites benefit more from channel diversification because single-source dependency is riskier with a smaller base. The measurement approach scales down — start with simpler attribution before building complex models.

### What tools do I need to execute this?

Google Search Console and Google Analytics cover the baseline. For deeper analysis: Ahrefs or Semrush for competitive data, a spreadsheet for channel attribution tracking. No enterprise tools required — the strategy is more important than the tooling.

