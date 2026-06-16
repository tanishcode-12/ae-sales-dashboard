import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell, ReferenceLine,
  ComposedChart, Area
} from "recharts";

// ── Brand palette ──────────────────────────────────────────────────────────
const AE = {
  navy:    "#1B2A4A",
  blue:    "#1F4690",
  mid:     "#2E6BC4",
  sky:     "#5B9BD5",
  gold:    "#C8963E",
  sand:    "#E8D5B0",
  cream:   "#F7F2EA",
  white:   "#FFFFFF",
  dark:    "#0D1B2A",
  muted:   "#6B7C93",
  success: "#2E8B5C",
  warn:    "#D4701A",
};

// ── Data ───────────────────────────────────────────────────────────────────
const categoryData = [
  { name: "Womens Apparel", revenue: 3.999, profit: 1.612, units: 102.48, gm: 40.31, om: 12.34, color: AE.mid },
  { name: "Mens Apparel",   revenue: 3.973, profit: 1.591, units: 102.13, gm: 40.04, om: 12.17, color: AE.blue },
  { name: "Intimates",      revenue: 0.542, profit: 0.244, units: 16.83,  gm: 45.06, om: 16.99, color: AE.gold },
  { name: "Activewear",     revenue: 0.382, profit: 0.155, units: 12.15,  gm: 40.49, om: 12.98, color: AE.sky },
  { name: "Swim",           revenue: 0.233, profit: 0.098, units: 7.52,   gm: 42.02, om: 14.03, color: AE.success },
  { name: "Tops",           revenue: 0.227, profit: 0.086, units: 7.19,   gm: 37.89, om: 9.86,  color: AE.warn },
  { name: "Accessories",    revenue: 0.155, profit: 0.069, units: 4.86,   gm: 44.65, om: 16.46, color: "#9B59B6" },
];

const weeklyData = [
  {w:1,d:"Jan 30",r:156.00},{w:2,d:"Feb 6",r:154.59},{w:3,d:"Feb 13",r:154.20},
  {w:4,d:"Feb 20",r:194.55},{w:5,d:"Feb 27",r:137.92},{w:6,d:"Mar 6",r:149.74},
  {w:7,d:"Mar 13",r:140.74},{w:8,d:"Mar 20",r:149.27},{w:9,d:"Mar 27",r:170.67},
  {w:10,d:"Apr 3",r:156.54},{w:11,d:"Apr 10",r:180.22},{w:12,d:"Apr 17",r:178.10},
  {w:13,d:"Apr 24",r:164.96},{w:14,d:"May 1",r:178.77},{w:15,d:"May 8",r:164.24},
  {w:16,d:"May 15",r:175.63},{w:17,d:"May 22",r:171.01},{w:18,d:"May 29",r:158.26},
  {w:19,d:"Jun 5",r:129.35},{w:20,d:"Jun 12",r:192.58},{w:21,d:"Jun 19",r:153.54},
  {w:22,d:"Jun 26",r:173.15},{w:23,d:"Jul 3",r:165.97},{w:24,d:"Jul 10",r:180.65},
  {w:25,d:"Jul 17",r:154.15},{w:26,d:"Jul 24",r:158.98},{w:27,d:"Jul 31",r:187.02},
  {w:28,d:"Aug 7",r:159.15},{w:29,d:"Aug 14",r:240.82},{w:30,d:"Aug 21",r:241.81},
  {w:31,d:"Aug 28",r:193.37},{w:32,d:"Sep 4",r:242.07},{w:33,d:"Sep 11",r:178.36},
  {w:34,d:"Sep 18",r:145.86},{w:35,d:"Sep 25",r:156.70},{w:36,d:"Oct 2",r:164.51},
  {w:37,d:"Oct 9",r:168.61},{w:38,d:"Oct 16",r:158.87},{w:39,d:"Oct 23",r:168.37},
  {w:40,d:"Oct 30",r:169.79},{w:41,d:"Nov 6",r:170.19},{w:42,d:"Nov 13",r:163.69},
  {w:43,d:"Nov 20",r:166.15},{w:44,d:"Nov 27",r:176.46},{w:45,d:"Dec 4",r:264.34},
  {w:46,d:"Dec 11",r:247.85},{w:47,d:"Dec 18",r:250.88},{w:48,d:"Dec 25",r:246.34},
  {w:49,d:"Jan 1",r:259.37},{w:50,d:"Jan 8",r:252.40},{w:51,d:"Jan 15",r:247.84},
  {w:52,d:"Jan 22",r:246.75},
];

const avg = weeklyData.reduce((a,b)=>a+b.r,0)/weeklyData.length;

const projectionData = [
  { period: "BTS 2021", actual: 242, projected: null, target: null },
  { period: "Holiday 2021", actual: 264, projected: null, target: null },
  { period: "BTS 2022", actual: null, projected: 262, target: 270 },
  { period: "Holiday 2022", actual: null, projected: 285, target: 295 },
  { period: "BTS 2023", actual: null, projected: 280, target: 300 },
  { period: "Holiday 2023", actual: null, projected: 305, target: 320 },
];

const revenueGrowthData = [
  { year: "FY2021 Actual", bts: 918, holiday: 1960, valley: 1926, total: 9511 },
  { year: "FY2022 Target", bts: 1050, holiday: 2200, valley: 2100, total: 10500 },
  { year: "FY2023 Target", bts: 1180, holiday: 2450, valley: 2250, total: 11500 },
];

// ── Shared components ──────────────────────────────────────────────────────
const MetricCard = ({ label, value, sub, accent }) => (
  <div style={{
    background: AE.white, borderRadius: 12,
    border: `1px solid ${AE.sand}`,
    padding: "16px 20px", flex: 1, minWidth: 140,
    borderLeft: `4px solid ${accent || AE.blue}`,
  }}>
    <div style={{ fontSize: 11, color: AE.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 700, color: AE.navy, lineHeight: 1.1 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: AE.muted, marginTop: 4 }}>{sub}</div>}
  </div>
);

const InsightPill = ({ icon, text, color }) => (
  <div style={{
    display: "flex", alignItems: "flex-start", gap: 10,
    background: AE.cream, borderRadius: 10, padding: "12px 16px",
    borderLeft: `3px solid ${color || AE.gold}`,
  }}>
    <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
    <span style={{ fontSize: 13, color: AE.navy, lineHeight: 1.5 }}>{text}</span>
  </div>
);

const SectionTitle = ({ children }) => (
  <div style={{ fontSize: 13, fontWeight: 700, color: AE.blue, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14, display:"flex", alignItems:"center", gap:8 }}>
    <div style={{ width: 20, height: 3, background: AE.gold, borderRadius: 2 }} />
    {children}
  </div>
);

const CustomTooltipStyle = {
  background: AE.dark, border: "none", borderRadius: 10,
  padding: "10px 16px", color: AE.white, fontSize: 12,
};

// ── Tab 1: Profitability ───────────────────────────────────────────────────
function ProfitabilityTab() {
  const shortNames = categoryData.map(d => d.name.replace(" Apparel","").replace("Activewear","Active"));

  const CustomBar = (props) => {
    const { x, y, width, height, fill } = props;
    return <rect x={x} y={y} width={width} height={height} fill={fill} rx={3} />;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* KPI row */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <MetricCard label="Total Revenue" value="$9.51B" sub="FY2021 full year" accent={AE.blue} />
        <MetricCard label="Gross Profit" value="$3.86B" sub="40.53% gross margin" accent={AE.success} />
        <MetricCard label="Operating Income" value="$1.20B" sub="12.61% op. margin" accent={AE.gold} />
        <MetricCard label="Units Sold" value="253M" sub="Across all categories" accent={AE.mid} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Revenue & Profit by Category */}
        <div style={{ background: AE.white, borderRadius: 14, border: `1px solid ${AE.sand}`, padding: 20 }}>
          <SectionTitle>Revenue vs Gross Profit by Category ($B)</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryData} margin={{ top: 4, right: 8, bottom: 40, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={AE.sand} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: AE.muted }}
                tickFormatter={n => n.replace(" Apparel","").replace("Activewear","Active")}
                angle={-30} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 10, fill: AE.muted }} tickFormatter={v=>`$${v}B`} width={42} />
              <Tooltip
                contentStyle={CustomTooltipStyle}
                formatter={(v, n) => [`$${v.toFixed(3)}B`, n]}
                labelFormatter={l => l}
              />
              <Bar dataKey="revenue" name="Revenue" fill={AE.blue} radius={[3,3,0,0]} maxBarSize={28} />
              <Bar dataKey="profit" name="Gross Profit" fill={AE.gold} radius={[3,3,0,0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Margin comparison */}
        <div style={{ background: AE.white, borderRadius: 14, border: `1px solid ${AE.sand}`, padding: 20 }}>
          <SectionTitle>Gross Margin % by Category</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryData} layout="vertical" margin={{ top: 4, right: 40, bottom: 4, left: 70 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={AE.sand} horizontal={false} />
              <XAxis type="number" domain={[34,48]} tick={{ fontSize: 10, fill: AE.muted }} tickFormatter={v=>`${v}%`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: AE.muted }} width={68}
                tickFormatter={n => n.replace(" Apparel","").replace("Activewear","Active")} />
              <Tooltip contentStyle={CustomTooltipStyle} formatter={v=>[`${v}%`,"Gross Margin"]} />
              <ReferenceLine x={40.53} stroke={AE.mid} strokeDasharray="4 3" label={{ value:"Avg 40.5%", position:"insideTopRight", fontSize:10, fill:AE.mid }} />
              <Bar dataKey="gm" name="Gross Margin %" radius={[0,3,3,0]} maxBarSize={18}>
                {categoryData.map((d,i) => <Cell key={i} fill={d.gm > 40.53 ? AE.success : AE.warn} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Units vs Margin scatter-style */}
        <div style={{ background: AE.white, borderRadius: 14, border: `1px solid ${AE.sand}`, padding: 20 }}>
          <SectionTitle>Operating Margin % by Category</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} margin={{ top: 4, right: 8, bottom: 40, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={AE.sand} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: AE.muted }}
                tickFormatter={n => n.replace(" Apparel","").replace("Activewear","Active")}
                angle={-30} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 10, fill: AE.muted }} tickFormatter={v=>`${v}%`} width={38} domain={[0,20]} />
              <Tooltip contentStyle={CustomTooltipStyle} formatter={(v,n)=>[`${v}%`,n]} />
              <ReferenceLine y={12.61} stroke={AE.mid} strokeDasharray="4 3" label={{ value:"Avg 12.6%", position:"insideTopRight", fontSize:10, fill:AE.mid }} />
              <Bar dataKey="om" name="Operating Margin %" radius={[3,3,0,0]} maxBarSize={28}>
                {categoryData.map((d,i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Brand & Region split */}
        <div style={{ background: AE.white, borderRadius: 14, border: `1px solid ${AE.sand}`, padding: 20, display:"flex", flexDirection:"column", gap:16 }}>
          <SectionTitle>Revenue Split</SectionTitle>
          <div>
            <div style={{ fontSize: 12, color: AE.muted, marginBottom: 8, fontWeight: 600 }}>By Brand</div>
            <div style={{ display:"flex", gap:8, marginBottom: 6 }}>
              {[{label:"American Eagle", pct:83.8, color:AE.blue},{label:"Aerie",pct:16.2,color:AE.gold}].map(b=>(
                <div key={b.label} style={{ flex:b.pct, background:b.color, borderRadius:6, padding:"8px 12px" }}>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.8)" }}>{b.label}</div>
                  <div style={{ fontSize:20, fontWeight:700, color:AE.white }}>{b.pct}%</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: AE.muted, marginBottom: 8, fontWeight: 600 }}>By Region</div>
            <div style={{ display:"flex", gap:8 }}>
              {[{label:"United States",pct:72.6,color:AE.navy},{label:"Canada",pct:27.4,color:AE.sky}].map(r=>(
                <div key={r.label} style={{ flex:r.pct, background:r.color, borderRadius:6, padding:"8px 12px" }}>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.8)" }}>{r.label}</div>
                  <div style={{ fontSize:20, fontWeight:700, color:AE.white }}>{r.pct}%</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 4, display:"flex", flexDirection:"column", gap:6 }}>
            <InsightPill icon="💡" color={AE.gold}
              text="Aerie holds the highest gross margin categories (Intimates 45.1%, Accessories 44.7%) yet generates only 16.2% of revenue — major upside potential." />
          </div>
        </div>
      </div>

      {/* Insights row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <InsightPill icon="📈" color={AE.blue}
          text="Womens & Mens Apparel together account for 83.6% of total revenue ($7.97B) — the revenue engine of the brand." />
        <InsightPill icon="💎" color={AE.success}
          text="Intimates leads all categories in gross margin (45.1%) and operating margin (17.0%), making it the most efficient profit generator." />
        <InsightPill icon="⚠️" color={AE.warn}
          text="Tops carries the lowest gross margin (37.9%) and operating margin (9.9%) — a candidate for pricing review or SKU rationalization." />
      </div>
    </div>
  );
}

// ── Tab 2: Sales Trend ─────────────────────────────────────────────────────
function SalesTrendTab() {
  const enriched = weeklyData.map(d => ({
    ...d,
    zone: d.w >= 29 && d.w <= 32 ? "bts" : d.w >= 45 ? "holiday" : "base",
    aboveAvg: d.r > avg,
  }));

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.zone === "bts") return <circle cx={cx} cy={cy} r={5} fill={AE.gold} stroke={AE.white} strokeWidth={2} />;
    if (payload.zone === "holiday") return <circle cx={cx} cy={cy} r={5} fill={AE.success} stroke={AE.white} strokeWidth={2} />;
    if (payload.w === 19) return <circle cx={cx} cy={cy} r={5} fill={AE.warn} stroke={AE.white} strokeWidth={2} />;
    return <circle cx={cx} cy={cy} r={2.5} fill={AE.blue} />;
  };

  const CustomTT = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    const diff = d.r - avg;
    const pct = ((diff/avg)*100).toFixed(1);
    const sign = diff >= 0 ? "+" : "";
    const zoneLabel = d.zone === "bts" ? "Back-to-School Peak" : d.zone === "holiday" ? "Holiday Surge" : "Standard Week";
    return (
      <div style={{ ...CustomTooltipStyle, minWidth: 180 }}>
        <div style={{ fontWeight: 700, marginBottom: 4, color: AE.gold }}>Week {d.w} · {d.d}</div>
        <div style={{ color: "#CBD5E1", fontSize: 11, marginBottom: 6 }}>{zoneLabel}</div>
        <div>Revenue: <b style={{color:AE.white}}>${d.r.toFixed(1)}M</b></div>
        <div>vs avg: <b style={{color: diff>=0?AE.success:AE.warn}}>{sign}{pct}% ({sign}${diff.toFixed(0)}M)</b></div>
      </div>
    );
  };

  const phases = [
    { label: "Q1 Plateau", weeks: "1–18", avg: "$162M", color: AE.muted },
    { label: "Summer Lull", weeks: "19–27", avg: "$163M", color: AE.warn },
    { label: "BTS Peak", weeks: "28–32", avg: "$216M", color: AE.gold },
    { label: "Fall Valley", weeks: "33–44", avg: "$164M", color: AE.sky },
    { label: "Holiday Surge", weeks: "45–52", avg: "$252M", color: AE.success },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* KPIs */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <MetricCard label="Peak Week" value="$264M" sub="Wk 45 · Dec 4, 2021" accent={AE.success} />
        <MetricCard label="Lowest Week" value="$129M" sub="Wk 19 · Jun 5, 2021" accent={AE.warn} />
        <MetricCard label="Annual Average" value="$183M" sub="Per week baseline" accent={AE.blue} />
        <MetricCard label="Peak vs Trough" value="+104%" sub="Peak/trough spread" accent={AE.gold} />
      </div>

      {/* Phase summary */}
      <div style={{ display: "flex", gap: 10 }}>
        {phases.map(p => (
          <div key={p.label} style={{ flex:1, background:AE.white, borderRadius:10, border:`1px solid ${AE.sand}`, padding:"12px 14px", borderTop:`3px solid ${p.color}` }}>
            <div style={{ fontSize:11, fontWeight:700, color:p.color, marginBottom:4 }}>{p.label}</div>
            <div style={{ fontSize:11, color:AE.muted }}>Wks {p.weeks}</div>
            <div style={{ fontSize:18, fontWeight:700, color:AE.navy, marginTop:4 }}>{p.avg}</div>
            <div style={{ fontSize:10, color:AE.muted }}>avg weekly rev</div>
          </div>
        ))}
      </div>

      {/* Main trend chart */}
      <div style={{ background:AE.white, borderRadius:14, border:`1px solid ${AE.sand}`, padding:20 }}>
        <SectionTitle>52-Week Revenue Trend — FY2021</SectionTitle>
        <div style={{ display:"flex", gap:16, marginBottom:14, fontSize:11, color:AE.muted, flexWrap:"wrap" }}>
          <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:20,height:2,background:AE.blue,display:"inline-block",borderRadius:2 }}/>Weekly Revenue</span>
          <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:10,height:10,borderRadius:"50%",background:AE.gold,display:"inline-block" }}/>Back-to-School</span>
          <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:10,height:10,borderRadius:"50%",background:AE.success,display:"inline-block" }}/>Holiday Surge</span>
          <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:10,height:10,borderRadius:"50%",background:AE.warn,display:"inline-block" }}/>Summer Low</span>
          <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:20,height:0,borderTop:`2px dashed ${AE.muted}`,display:"inline-block" }}/>Annual Avg $183M</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={enriched} margin={{ top:8, right:16, bottom:8, left:10 }}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={AE.blue} stopOpacity={0.15} />
                <stop offset="95%" stopColor={AE.blue} stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={AE.sand} vertical={false} />
            <XAxis dataKey="d" tick={{ fontSize: 9, fill: AE.muted }} interval={5} angle={-30} textAnchor="end" height={40} />
            <YAxis tick={{ fontSize: 10, fill: AE.muted }} tickFormatter={v=>`$${v}M`} domain={[100,290]} width={48} />
            <ReferenceLine y={avg} stroke={AE.muted} strokeDasharray="5 3" label={{ value:`Avg $${avg.toFixed(0)}M`, position:"insideTopRight", fontSize:10, fill:AE.muted }} />
            <Tooltip content={<CustomTT />} />
            <Area type="monotone" dataKey="r" fill="url(#areaGrad)" stroke="none" />
            <Line type="monotone" dataKey="r" stroke={AE.blue} strokeWidth={2.5} dot={<CustomDot />} activeDot={false} name="Revenue" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <InsightPill icon="🎒" color={AE.gold}
          text="Back-to-school (Aug 14 – Sep 4) produced a 51% revenue spike in a single week — from $159M to $242M — the sharpest one-week acceleration of the year." />
        <InsightPill icon="🎄" color={AE.success}
          text="Holiday surge (Dec 4 – Jan 22) is the most sustained high-revenue period, holding above $246M for 8 consecutive weeks — driven by gifting + gift card redemptions." />
        <InsightPill icon="📉" color={AE.warn}
          text="The fall valley (Wks 33–44, avg $164M) is $88M below the holiday baseline — the single biggest revenue opportunity to close with a targeted fall capsule launch." />
        <InsightPill icon="🇨🇦" color={AE.sky}
          text="Canada (27.4% of revenue) provides a lower-risk testbed for pricing elasticity experiments before rolling out to the larger US market." />
      </div>
    </div>
  );
}

// ── Tab 3: Recommendations ────────────────────────────────────────────────
function RecommendationsTab() {
  const recs = [
    {
      num: "01", color: AE.blue,
      title: "Denim-to-Ecosystem Flywheel",
      when: "Year-round / BTS peak",
      impact: "+$200–350M",
      steps: [
        "Implement 'Complete the Look' cross-sell on every denim PDP",
        "Trigger loyalty cross-category offers within 30 days of denim purchase",
        "Pull buyers into Intimates (45.1% GM) and Accessories (44.7% GM)",
        "Bundle denim + Aerie top as a flagship wardrobe kit SKU",
      ]
    },
    {
      num: "02", color: AE.gold,
      title: "Aerie Revenue Acceleration",
      when: "BTS + Holiday",
      impact: "+$300–500M",
      steps: [
        "Co-locate Aerie collections inside AE flagship stores",
        "Run unified loyalty rewards across both brands",
        "Launch Aerie 'Dorm Room Essentials' sub-campaign in BTS tail",
        "Build dedicated Aerie gifting bundles for holiday — highest-margin SKUs",
      ]
    },
    {
      num: "03", color: AE.success,
      title: "Canada Pricing Testbed",
      when: "Q3–Q4 testing window",
      impact: "+$100–180M",
      steps: [
        "Test 5–8% price increases on hero denim/tops SKUs in Canada",
        "Monitor unit volume sensitivity across 4–6 week windows",
        "Apply learnings to inform US pricing before holiday season",
        "Target: 2–3 point margin improvement on $8B Apparel base",
      ]
    },
    {
      num: "04", color: AE.warn,
      title: "Bridge the Fall Revenue Valley",
      when: "Sep 11 – Oct 31 (Wks 33–44)",
      impact: "+$80–130M",
      steps: [
        "Release limited fall capsule drop in first week of October",
        "Launch 'Refer a Friend' campaign from fresh BTS buyer cohort",
        "Run loyalty double-points event through October",
        "Use Canada to pilot promotional mechanics before US rollout",
      ]
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Revenue projection chart */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background:AE.white, borderRadius:14, border:`1px solid ${AE.sand}`, padding:20 }}>
          <SectionTitle>Peak Week Revenue Trajectory ($M)</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={projectionData} margin={{ top:8, right:16, bottom:8, left:10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={AE.sand} vertical={false} />
              <XAxis dataKey="period" tick={{ fontSize:9, fill:AE.muted }} angle={-20} textAnchor="end" height={50} interval={0} />
              <YAxis tick={{ fontSize:10, fill:AE.muted }} tickFormatter={v=>`$${v}M`} domain={[220,340]} width={52} />
              <Tooltip contentStyle={CustomTooltipStyle} formatter={(v,n)=>[`$${v}M`,n]} />
              <Bar dataKey="actual" name="Actual" fill={AE.blue} radius={[4,4,0,0]} maxBarSize={30} />
              <Bar dataKey="projected" name="Projected" fill={AE.sky} radius={[4,4,0,0]} maxBarSize={30} />
              <Bar dataKey="target" name="Target" fill={AE.gold} radius={[4,4,0,0]} maxBarSize={30} />
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", gap:12, marginTop:8, fontSize:11, color:AE.muted }}>
            <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:10,height:10,borderRadius:2,background:AE.blue,display:"inline-block" }}/>Actual</span>
            <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:10,height:10,borderRadius:2,background:AE.sky,display:"inline-block" }}/>Projected</span>
            <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:10,height:10,borderRadius:2,background:AE.gold,display:"inline-block" }}/>Target</span>
          </div>
        </div>

        <div style={{ background:AE.white, borderRadius:14, border:`1px solid ${AE.sand}`, padding:20 }}>
          <SectionTitle>Annual Revenue Projection by Period ($M)</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueGrowthData} margin={{ top:8, right:8, bottom:8, left:10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={AE.sand} vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize:10, fill:AE.muted }} />
              <YAxis tick={{ fontSize:10, fill:AE.muted }} tickFormatter={v=>`$${(v/1000).toFixed(1)}B`} width={48} />
              <Tooltip contentStyle={CustomTooltipStyle} formatter={(v,n)=>[`$${v}M`,n]} />
              <Bar dataKey="bts" name="Back-to-School" stackId="a" fill={AE.gold} />
              <Bar dataKey="holiday" name="Holiday" stackId="a" fill={AE.success} />
              <Bar dataKey="valley" name="Base Periods" stackId="a" fill={AE.blue} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", gap:12, marginTop:8, fontSize:11, color:AE.muted }}>
            <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:10,height:10,borderRadius:2,background:AE.gold,display:"inline-block" }}/>BTS</span>
            <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:10,height:10,borderRadius:2,background:AE.success,display:"inline-block" }}/>Holiday</span>
            <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:10,height:10,borderRadius:2,background:AE.blue,display:"inline-block" }}/>Base</span>
          </div>
        </div>
      </div>

      {/* Strategy cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {recs.map(r => (
          <div key={r.num} style={{ background:AE.white, borderRadius:14, border:`1px solid ${AE.sand}`, padding:20, borderTop:`4px solid ${r.color}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div>
                <div style={{ fontSize:11, color:r.color, fontWeight:700, letterSpacing:"0.1em" }}>STRATEGY {r.num}</div>
                <div style={{ fontSize:16, fontWeight:700, color:AE.navy, marginTop:2 }}>{r.title}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:10, color:AE.muted }}>Revenue impact</div>
                <div style={{ fontSize:16, fontWeight:700, color:r.color }}>{r.impact}</div>
              </div>
            </div>
            <div style={{ fontSize:11, color:AE.muted, marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ background:AE.cream, borderRadius:6, padding:"3px 8px", color:AE.navy, fontWeight:600 }}>{r.when}</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {r.steps.map((s,i) => (
                <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:r.color, color:AE.white, fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>{i+1}</div>
                  <div style={{ fontSize:12, color:AE.navy, lineHeight:1.5 }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* KPI targets */}
      <div style={{ background:AE.white, borderRadius:14, border:`1px solid ${AE.sand}`, padding:20 }}>
        <SectionTitle>Success Metrics & Targets</SectionTitle>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {[
            { label:"BTS Peak Revenue", current:"$242M", target:"$270M", color:AE.gold },
            { label:"Holiday Peak Revenue", current:"$264M", target:"$295M", color:AE.success },
            { label:"Avg Order Value Lift", current:"Baseline", target:"+15%", color:AE.blue },
            { label:"Aerie Revenue Share", current:"16.2%", target:"22%", color:AE.warn },
            { label:"Gross Margin (Blended)", current:"40.5%", target:"42.5%", color:AE.success },
            { label:"Holiday Loyalty Sign-ups", current:"—", target:"250K", color:AE.mid },
            { label:"Paid Media ROAS", current:"Baseline", target:"5.0x", color:AE.gold },
            { label:"Total Annual Revenue", current:"$9.51B", target:"$10.5B+", color:AE.blue },
          ].map(m => (
            <div key={m.label} style={{ background:AE.cream, borderRadius:10, padding:"12px 14px", borderLeft:`3px solid ${m.color}` }}>
              <div style={{ fontSize:10, color:AE.muted, marginBottom:4 }}>{m.label}</div>
              <div style={{ fontSize:11, color:AE.navy }}>Now: <b>{m.current}</b></div>
              <div style={{ fontSize:14, fontWeight:700, color:m.color, marginTop:2 }}>{m.target}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function AEDashboard() {
  const [tab, setTab] = useState(0);
  const tabs = ["Profitability Analysis", "Sales Trend Analysis", "Strategy & Projections"];
  const icons = ["📊", "📈", "🎯"];

  return (
    <div style={{ fontFamily:"'DM Sans', 'Segoe UI', sans-serif", background:AE.cream, minHeight:"100vh", padding:0 }}>
      {/* Header */}
      <div style={{ background:AE.navy, padding:"24px 32px 0", borderBottom:`3px solid ${AE.gold}` }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ background:AE.gold, color:AE.navy, fontWeight:900, fontSize:18, padding:"4px 10px", borderRadius:6, letterSpacing:"0.05em" }}>AE</div>
              <div>
                <div style={{ color:AE.white, fontSize:20, fontWeight:700, letterSpacing:"0.02em" }}>American Eagle Outfitters</div>
                <div style={{ color:AE.sand, fontSize:12, marginTop:1 }}>Sales Intelligence Dashboard · FY2021 Analysis</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ color:AE.sand, fontSize:11 }}>Data Period</div>
            <div style={{ color:AE.white, fontSize:13, fontWeight:600 }}>Jan 30, 2021 – Jan 22, 2022</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:4 }}>
          {tabs.map((t,i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              background: tab===i ? AE.white : "transparent",
              color: tab===i ? AE.navy : AE.sand,
              border:"none", cursor:"pointer",
              padding:"10px 20px", fontSize:13, fontWeight: tab===i ? 700 : 500,
              borderRadius:"8px 8px 0 0",
              transition:"all 0.15s",
            }}>
              {icons[i]} {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding:"28px 32px", maxWidth:1200, margin:"0 auto" }}>
        {tab === 0 && <ProfitabilityTab />}
        {tab === 1 && <SalesTrendTab />}
        {tab === 2 && <RecommendationsTab />}
      </div>

      {/* Footer */}
      <div style={{ borderTop:`1px solid ${AE.sand}`, padding:"14px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:11, color:AE.muted }}>American Eagle Outfitters · Sales Intelligence Report · Prepared by Strategy & Analytics</div>
        <div style={{ fontSize:11, color:AE.muted }}>FY2021 · 52 weeks · 1,560 data records</div>
      </div>
    </div>
  );
}
