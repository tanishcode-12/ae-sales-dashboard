# 🦅 American Eagle Outfitters — Sales Intelligence Project

> A complete data analysis, visualization, and strategy project built on FY2021 weekly sales data.

![denim](https://media.giphy.com/media/3o7TKsQ8gqVwzQuYyq/giphy.gif)

---

## 📌 Project Overview

This repository contains a full end-to-end sales intelligence workflow for American Eagle Outfitters, covering:

- 🔍 **Exploratory data analysis** of 1,560 weekly sales records across 7 categories, 2 brands, and 2 regions
- 📊 **Interactive React dashboard** with 3 tabs: profitability, sales trends, and strategic recommendations
- 📈 **52-week sales trend analysis** with annotated seasonal peaks (Back-to-School & Holiday)
- 🎯 **Marketing strategy playbook** with step-by-step campaign execution guides
- 💰 **Revenue projections** through FY2023 based on identified seasonal patterns

---

## 📂 Repository Contents

| File | Description |
|---|---|
| 📄 `ae_sales_analysis.csv` | Raw FY2021 weekly sales dataset (1,560 rows × 14 columns) |
| 🖥️ `AE_Dashboard.jsx` | 3-tab React dashboard — profitability, trend, and strategy views |
| 📋 `AE_Seasonal_Marketing_Strategy.md` | Marketing playbook for BTS and Holiday campaigns |
| 💬 `CONVERSATION.md` | Full analysis transcript — all prompts, findings, and insights |
| 📖 `README.md` | This file |

---

## 🖼️ Dashboard Preview

The `AE_Dashboard.jsx` file is a self-contained React component using **Recharts** and **inline CSS**. It features three tabs:

![dashboard](https://media.giphy.com/media/qcw9dQRYrCMyk/giphy.gif)

### 1️⃣ Tab — Profitability Analysis 💵
- Revenue vs Gross Profit by category
- Gross Margin % and Operating Margin % comparisons
- Brand split (AE 83.8% / Aerie 16.2%) and Region split (US 72.6% / Canada 27.4%)
- Key insight callouts

### 2️⃣ Tab — Sales Trend Analysis 📈
- 52-week revenue line with annotated peaks
- 5-phase seasonal breakdown with average weekly revenue per phase
- Color-coded event markers (BTS, Holiday, Summer Lull)

### 3️⃣ Tab — Strategy & Projections 🚀
- 4 strategic recommendations with implementation steps
- Peak revenue trajectory through FY2023
- Stacked annual revenue projection by seasonal period
- 8 KPI targets with current vs goal values

---

## ⚙️ How to Run the Dashboard

### Option A — CodeSandbox (fastest) ⚡
1. Go to [codesandbox.io](https://codesandbox.io) → New Sandbox → React
2. Replace `App.js` with the contents of `AE_Dashboard.jsx`
3. Install `recharts`: open the terminal and run `npm install recharts`
4. The dashboard renders instantly in the preview pane

### Option B — Local development 💻
```bash
npx create-react-app ae-dashboard
cd ae-dashboard
npm install recharts
# Replace src/App.js with AE_Dashboard.jsx contents
npm start
```

### Option C — GitHub Pages (shareable link) 🌐
```bash
npm install gh-pages --save-dev
# Add to package.json: "homepage": "https://<your-username>.github.io/ae-sales-dashboard"
# Add scripts: "predeploy": "npm run build", "deploy": "gh-pages -d build"
npm run deploy
```

---

## 🔑 Key Findings

| Metric | Value |
|---|---|
| 💰 Total FY2021 Revenue | $9.51B |
| 📦 Gross Profit | $3.86B (40.5% margin) |
| 🏦 Operating Income | $1.20B (12.6% margin) |
| 👕 Units Sold | 253M |
| 🛍️ Peak Week | $264M (Dec 4, 2021 — Black Friday) |
| ☀️ Lowest Week | $129M (Jun 5, 2021 — Summer lull) |
| 🎒 BTS Peak | +51% week-over-week surge (Aug 14) |
| 🎄 Holiday Sustained High | 8 consecutive weeks above $246M |

![growth](https://media.giphy.com/media/26ufoxxIzMyVoVTli/giphy.gif)

---

## 🎯 Strategic Recommendations Summary

1. 🧵 **Denim-to-Ecosystem Flywheel** — Cross-sell from denim into Intimates (45.1% GM) and Accessories (44.7% GM) via "Complete the Look" merchandising. Est. impact: **+$200–350M**.

2. 🌸 **Aerie Revenue Acceleration** — Aerie holds the highest-margin categories but only 16.2% revenue share. Co-locate, bundle, and build dedicated holiday gifting kits. Est. impact: **+$300–500M**.

3. 🍁 **Canada Pricing Testbed** — Pilot 5–8% price increases on hero SKUs in Canada before US rollout. A 2–3pt margin improvement on $8B Apparel base = hundreds of millions. Est. impact: **+$100–180M**.

4. 🍂 **Bridge the Fall Valley** — Oct capsule drop + referral campaign + loyalty event to close the $16M/week gap between BTS and Holiday. Est. impact: **+$80–130M**.

---

## 🗂️ Data Schema

```
ae_sales_analysis.csv
├── Date              — Week start date (YYYY-MM-DD)
├── Week              — Week number (1–52)
├── Region            — United States | Canada
├── Brand             — American Eagle | Aerie
├── Category          — Womens Apparel | Mens Apparel | Intimates | Activewear | Swim | Tops | Accessories
├── Subcategory       — Jeans | Tops | Active Bottoms | Dresses | Accessories | Others (33% null)
├── Revenue           — Weekly revenue in USD
├── COGS              — Cost of goods sold in USD
├── Gross_Profit      — Revenue minus COGS
├── Operating_Expenses — SG&A and other operating costs
├── Operating_Income  — Gross Profit minus Operating Expenses
├── Units             — Units sold
├── Gross_Margin_Percentage    — (Gross Profit / Revenue) × 100
└── Operating_Margin_Percentage — (Operating Income / Revenue) × 100
```

---

## 🛠️ Built With

- ⚛️ **React** — Dashboard framework
- 📊 **Recharts** — Chart components (BarChart, LineChart, ComposedChart, AreaChart)
- 🐍 **Python / Pandas** — Data aggregation and analysis
- 🤖 **Claude (Anthropic)** — Analysis, visualization, and strategy generation

---

<p align="center">
  <i>🦅 FY2021 analysis · American Eagle Outfitters · Sales Intelligence Project 🦅</i>
</p>
