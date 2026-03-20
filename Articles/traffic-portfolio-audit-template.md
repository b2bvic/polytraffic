---
title:: Traffic Portfolio Audit Template: Comprehensive Risk Assessment Checklist
description:: Step-by-step audit framework to evaluate traffic portfolio health. Scoring system, benchmarks, and remediation priorities.
focus_keyword:: traffic portfolio audit
category:: Templates
author:: Victor Valentine Romo
date:: 2026.03.20
---

# Traffic Portfolio Audit Template: Comprehensive Risk Assessment Checklist

> **Quick Summary**
> - **What this covers:** Step-by-step audit framework to evaluate traffic portfolio health. Scoring system, benchmarks, and remediation priorities.
> - **Who it's for:** traffic strategists and growth operators
> - **Key takeaway:** Read the first section for the core framework, then use the specific tactics that match your situation.


**You can't fix what you haven't measured.**

This audit template provides a systematic framework for evaluating your traffic portfolio's health across six dimensions: concentration risk, correlation exposure, channel quality, monetization resilience, owned audience strength, and growth sustainability.

Complete this audit quarterly to identify emerging risks before they become crises. Each section includes scoring criteria, benchmarks, and specific remediation actions for underperforming areas.

## Audit Overview: The Six-Dimension Framework

| Dimension | Weight | Risk Level Thresholds |
|-----------|--------|----------------------|
| Concentration Risk | 25% | Score <60 = High Risk |
| Correlation Exposure | 20% | Score <65 = High Risk |
| Channel Quality | 15% | Score <70 = Moderate Risk |
| Monetization Resilience | 20% | Score <65 = High Risk |
| Owned Audience Strength | 15% | Score <60 = High Risk |
| Growth Sustainability | 5% | Score <70 = Moderate Risk |

**Overall portfolio score**: Weighted average of all dimensions.

- **80-100**: Excellent (antifragile portfolio)
- **65-79**: Good (resilient portfolio)
- **50-64**: Fair (vulnerable but improvable)
- **<50**: Poor (critical risk, immediate action required)

## Section 1: Concentration Risk Assessment (25% of total score)

### Metric 1.1: Herfindahl-Hirschman Index (HHI)

**What to calculate**:

```
HHI = Σ(Traffic_Share²) for all sources
```

**Example**:

| Source | Traffic | % Share | (Share)² |
|--------|---------|---------|----------|
| Google | 38,000 | 54% | 0.2916 |
| Email | 14,000 | 20% | 0.04 |
| YouTube | 12,000 | 17% | 0.0289 |
| Pinterest | 6,000 | 9% | 0.0081 |

HHI = 0.2916 + 0.04 + 0.0289 + 0.0081 = **0.3686**

**Scoring**:

- HHI <0.20 = 100 points (highly diversified)
- HHI 0.20-0.30 = 85 points (well diversified)
- HHI 0.30-0.40 = 70 points (moderate concentration)
- HHI 0.40-0.50 = 50 points (high concentration)
- HHI >0.50 = 25 points (dangerous concentration)

**This example scores**: 70 points (HHI 0.37 falls in 0.30-0.40 range)

### Metric 1.2: Top Channel Dependency

**What to calculate**: % of traffic from single largest source.

**Scoring**:

- <30% = 100 points
- 30-40% = 85 points
- 40-50% = 70 points
- 50-60% = 50 points
- 60-70% = 30 points
- >70% = 10 points

**This example**: 54% from Google = **50 points**

### Metric 1.3: Traffic Volatility (Standard Deviation)

**What to calculate**: Standard deviation of monthly total traffic over past 12 months.

```
Coefficient of Variation = (StdDev / Mean) × 100
```

**Scoring**:

- CV <10% = 100 points (very stable)
- CV 10-15% = 85 points (stable)
- CV 15-20% = 70 points (moderate volatility)
- CV 20-30% = 50 points (high volatility)
- CV >30% = 25 points (extreme volatility)

**Example**: Mean monthly traffic 70K, StdDev 12K → CV = 17% = **70 points**

### Section 1 Score Calculation

Average of three metrics:

(70 + 50 + 70) / 3 = **63.3 points**

**Assessment**: Fair. Moderate concentration risk due to Google dependency (54%). Remediation: Grow email list and YouTube to reduce Google share below 45%.

## Section 2: Correlation Exposure Assessment (20% of total score)

### Metric 2.1: Primary-Secondary Correlation

**What to calculate**: Pearson correlation coefficient between largest and second-largest traffic sources.

**Data needed**: 12 months of weekly traffic for both channels (52 data points).

```
r = CORREL(Channel_1_Weekly_Traffic, Channel_2_Weekly_Traffic)
```

**Scoring**:

- r <0.20 = 100 points (uncorrelated—excellent)
- r 0.20-0.35 = 85 points (low correlation—good)
- r 0.35-0.50 = 70 points (moderate correlation—acceptable)
- r 0.50-0.65 = 50 points (high correlation—clustered risk)
- r >0.65 = 25 points (very high correlation—false diversification)

**Example**: Google ↔ Email correlation = 0.14 = **100 points**

### Metric 2.2: Cross-Channel Correlation Matrix

**What to calculate**: Average correlation across all channel pairs.

**Formula**:

```
Avg Correlation = Sum of all pairwise correlations / Number of pairs
```

**Example** (4 channels = 6 pairs):

- Google ↔ Email: 0.14
- Google ↔ YouTube: 0.38
- Google ↔ Pinterest: 0.22
- Email ↔ YouTube: 0.09
- Email ↔ Pinterest: 0.12
- YouTube ↔ Pinterest: 0.44

Avg = (0.14 + 0.38 + 0.22 + 0.09 + 0.12 + 0.44) / 6 = **0.23**

**Scoring**:

- Avg <0.25 = 100 points
- Avg 0.25-0.35 = 85 points
- Avg 0.35-0.45 = 70 points
- Avg 0.45-0.55 = 50 points
- Avg >0.55 = 30 points

**This example**: 0.23 = **100 points**

### Metric 2.3: Algorithmic Clustering

**What to assess**: How many of your channels are algorithm-dependent platforms?

**Scoring**:

- 0-1 algorithmic channels = 100 points
- 2 algorithmic channels = 80 points
- 3 algorithmic channels = 60 points
- 4+ algorithmic channels = 40 points

**Algorithmic platforms**: Google, YouTube, Facebook, Instagram, TikTok, Pinterest

**Non-algorithmic**: Email, RSS, Direct, Paid (when you control it)

**This example**: 3 algorithmic (Google, YouTube, Pinterest) = **60 points**

### Section 2 Score Calculation

(100 + 100 + 60) / 3 = **86.7 points**

**Assessment**: Excellent. Low correlation between channels, minimal clustered risk. Primary concern is 3 algorithmic channels—consider adding non-algorithmic source (community, RSS).

## Section 3: Channel Quality Assessment (15% of total score)

### Metric 3.1: Engagement Rate by Channel

**What to measure**: Time on page, pages per session, bounce rate for each channel.

**Benchmark comparison**: Calculate % above/below median for each channel.

**Example** (Google channel):

- Your avg session duration: 2:45
- Industry median: 2:20
- Performance: +18% above median = 85 points

**Scoring** (average across all channels):

- All channels >+15% above median = 100 points
- All channels >+5% above median = 85 points
- All channels within ±5% of median = 70 points
- Any channel >-10% below median = 50 points
- Multiple channels >-20% below median = 30 points

### Metric 3.2: Conversion Rate Variance

**What to measure**: Standard deviation of conversion rates across channels.

Low variance = consistent audience quality across channels (good)
High variance = some channels deliver low-intent traffic (bad)

**Scoring**:

- CV <20% = 100 points
- CV 20-30% = 85 points
- CV 30-40% = 70 points
- CV 40-60% = 50 points
- CV >60% = 30 points

**Example**:

| Channel | Conversion Rate |
|---------|----------------|
| Google | 1.8% |
| Email | 4.2% |
| YouTube | 2.1% |
| Pinterest | 0.9% |

Mean = 2.25%, StdDev = 1.32%, CV = 58.7% = **50 points**

**Diagnosis**: Pinterest is dragging down portfolio quality (0.9% conversion vs. 2.25% average). Consider pruning or optimizing Pinterest content for higher-intent topics.

### Section 3 Score Calculation

(85 + 50) / 2 = **67.5 points**

**Assessment**: Good engagement, but high conversion variance indicates quality inconsistency. Action: Optimize Pinterest or reallocate effort to higher-converting channels.

## Section 4: Monetization Resilience Assessment (20% of total score)

### Metric 4.1: Revenue Source Diversification

**What to calculate**: HHI for revenue sources (same formula as traffic HHI).

**Example**:

| Revenue Source | Revenue | % Share | (Share)² |
|----------------|---------|---------|----------|
| Display Ads (AdThrive) | $7,200 | 48% | 0.2304 |
| Affiliate (Amazon) | $5,400 | 36% | 0.1296 |
| Sponsored Content | $2,400 | 16% | 0.0256 |

HHI = 0.3856

**Scoring**:

- HHI <0.25 = 100 points
- HHI 0.25-0.35 = 85 points
- HHI 0.35-0.45 = 70 points
- HHI 0.45-0.55 = 50 points
- HHI >0.55 = 30 points

**This example**: HHI 0.39 = **70 points**

### Metric 4.2: Revenue per Visit Consistency

**What to measure**: RPV for each traffic channel. Lower variance = better.

**Example**:

| Channel | RPV |
|---------|-----|
| Google | $0.18 |
| Email | $0.41 |
| YouTube | $0.22 |
| Pinterest | $0.08 |

CV = 61% = **50 points** (using same CV scoring as Section 3)

### Metric 4.3: Platform Dependency Risk

**What to assess**: % of revenue from single platform (e.g., Google AdSense, Amazon Associates).

**Scoring**:

- No single platform >40% = 100 points
- Single platform 40-50% = 80 points
- Single platform 50-60% = 60 points
- Single platform 60-70% = 40 points
- Single platform >70% = 20 points

**This example**: AdThrive 48% = **80 points**

### Section 4 Score Calculation

(70 + 50 + 80) / 3 = **66.7 points**

**Assessment**: Good but improvable. Revenue is moderately diversified, but high RPV variance indicates over-dependence on email for revenue generation. If email list decays, revenue collapses disproportionately.

## Section 5: Owned Audience Strength (15% of total score)

### Metric 5.1: Owned Audience Percentage

**What to calculate**: % of traffic from owned channels (email, RSS, app installs, community platform you control).

**Scoring**:

- >40% = 100 points (Stage 5 maturity)
- 30-40% = 90 points (Stage 4)
- 20-30% = 80 points (Stage 4)
- 15-20% = 70 points (Stage 3)
- 10-15% = 60 points (Stage 3)
- 5-10% = 40 points (Stage 2)
- <5% = 20 points (Stage 1-2)

**This example**: Email 20% = **80 points**

### Metric 5.2: Email List Health

**What to measure**: Open rate + unsubscribe rate.

**Scoring**:

- Open rate >45%, unsub <1.5% = 100 points
- Open rate 35-45%, unsub 1.5-2.5% = 85 points
- Open rate 25-35%, unsub 2.5-3.5% = 70 points
- Open rate 20-25%, unsub 3.5-5% = 50 points
- Open rate <20%, unsub >5% = 30 points

**This example**: 38% open, 2.1% unsub = **85 points**

### Metric 5.3: Owned Audience Growth Rate

**What to calculate**: MoM email list growth rate (avg over past 6 months).

**Scoring**:

- >15% MoM = 100 points
- 10-15% MoM = 90 points
- 8-10% MoM = 80 points
- 5-8% MoM = 70 points
- 2-5% MoM = 50 points
- <2% MoM or declining = 30 points

**This example**: 9.2% MoM = **80 points**

### Section 5 Score Calculation

(80 + 85 + 80) / 3 = **81.7 points**

**Assessment**: Excellent. Owned audience is strong and growing. Continue momentum—owned audience is your primary insurance asset.

## Section 6: Growth Sustainability (5% of total score)

### Metric 6.1: Evergreen Content Ratio

**What to calculate**: % of traffic from articles >12 months old.

**Scoring**:

- >60% = 100 points (perpetual system)
- 50-60% = 90 points
- 40-50% = 80 points
- 30-40% = 70 points
- 20-30% = 50 points
- <20% = 30 points (content treadmill)

**This example**: 42% from articles >12mo = **80 points**

### Metric 6.2: Traffic Growth vs. Content Velocity

**What to assess**: Is traffic growth proportional to publishing frequency, or compounding?

**Calculation**:

```
Efficiency Ratio = (% Traffic Growth) / (% Content Production Change)
```

**Example**: Traffic grew 18%, content production increased 12% → Ratio = 1.5

**Scoring**:

- Ratio >2.0 = 100 points (compounding growth)
- Ratio 1.5-2.0 = 85 points (efficient growth)
- Ratio 1.0-1.5 = 70 points (linear growth)
- Ratio 0.5-1.0 = 50 points (inefficient growth)
- Ratio <0.5 = 30 points (declining returns)

**This example**: 1.5 = **85 points**

### Section 6 Score Calculation

(80 + 85) / 2 = **82.5 points**

**Assessment**: Excellent. Growth is efficient and partially compounding. Evergreen content provides traffic floor that reduces dependency on publishing velocity.

## Overall Portfolio Score Calculation

| Section | Weight | Raw Score | Weighted Score |
|---------|--------|-----------|----------------|
| 1. Concentration Risk | 25% | 63.3 | 15.8 |
| 2. Correlation Exposure | 20% | 86.7 | 17.3 |
| 3. Channel Quality | 15% | 67.5 | 10.1 |
| 4. Monetization Resilience | 20% | 66.7 | 13.3 |
| 5. Owned Audience Strength | 15% | 81.7 | 12.3 |
| 6. Growth Sustainability | 5% | 82.5 | 4.1 |

**Overall Score**: 72.9/100

**Grade**: Good (resilient portfolio with room for improvement)

## Remediation Priority Matrix

Based on this audit, prioritize improvements:

| Issue | Current Score | Target Score | Priority | Estimated Effort |
|-------|---------------|--------------|----------|------------------|
| Google dependency (54%) | 63.3 | 75+ | HIGH | 6-9 months to grow Email + YouTube |
| Pinterest low conversion (0.9%) | 67.5 | 75+ | MEDIUM | 2-3 months to optimize or prune |
| Revenue concentration (48% AdThrive) | 66.7 | 75+ | MEDIUM | 3-6 months to diversify monetization |

**Recommended action plan**:

**Q1**: Focus on growing email list (target 30% traffic share to reduce Google dependency)

**Q2**: Optimize Pinterest for higher-intent topics OR reallocate effort to YouTube

**Q3**: Add secondary monetization partner (e.g., Mediavine alongside AdThrive, or direct affiliate partnerships)

**Q4**: Re-audit to measure progress, adjust strategy

## FAQ: Traffic Portfolio Audit

**How often should I run this audit?**
Quarterly minimum. Monthly if you're actively diversifying or in high-volatility niche. Annual is too infrequent—risks can emerge and escalate within 3-6 months.

**What if I score <50 overall?**
Critical risk. Prioritize Section 1 (Concentration) and Section 5 (Owned Audience) immediately. Pause growth initiatives, focus on risk reduction for 90 days.

**Can I skip sections if they don't apply?**
No. If a section doesn't apply (e.g., no email list yet), that section scores 0, which tanks your overall score—accurately reflecting your risk. Don't skip—fix the gap.

**What's a "good" score for a new site (<12 months old)?**
50-60 is realistic. New sites haven't had time to build diversification. Below 50 at 12+ months indicates strategic problem, not just early-stage limitations.

**Should I weight sections differently for my niche?**
Only if you have quantified reasoning. Default weights work for 90% of publishers. Custom weighting requires understanding which risks are highest in your specific situation.

**Related guides**: [Traffic Portfolio Risk Calculator](traffic-portfolio-risk-calculator.html) | [Traffic Diversification Strategy Framework](traffic-diversification-strategy-framework.html) | [Traffic Monitoring Alert System](traffic-monitoring-alert-system.html)

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

