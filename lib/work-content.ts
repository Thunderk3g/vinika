export type CaseStudySection = {
  n: string;
  title: string;
  body: string;
  points?: string[];
};

export type CaseStudy = {
  slug: string;
  sector: string;
  metric: string;
  metricLabel: string;
  title: string;
  summary: string;
  tags: string[];
  heroMetrics: { value: string; label: string }[];
  sections: CaseStudySection[];
  quote: { text: string; attribution: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "manufacturing-pipeline",
    sector: "Industrial · Manufacturing",
    metric: "+40%",
    metricLabel: "qualified leads",
    title: "Rebuilding a stalled pipeline into a predictable growth engine",
    summary:
      "A 40-year-old precision-manufacturing firm relied on word-of-mouth. We helped them build a repeatable demand system — and a 40% lift in qualified leads in two quarters.",
    tags: ["Industrial · Manufacturing", "Business Consulting"],
    heroMetrics: [
      { value: "+40%", label: "Qualified leads" },
      { value: "2 qtrs", label: "To full effect" },
      { value: "3.2×", label: "Pipeline value" },
      { value: "−35%", label: "Cost per lead" },
    ],
    sections: [
      {
        n: "01 — CHALLENGE",
        title: "The challenge",
        body: "The company built an excellent reputation over four decades, but growth had flattened. New business came almost entirely from referrals and repeat orders — unpredictable, slow, and impossible to forecast. Leadership knew the market was bigger than their pipeline, but every attempt at outbound felt scattershot and never produced qualified conversations.",
      },
      {
        n: "02 — ANALYSIS",
        title: "What we found",
        body: "We spent the first three weeks inside the business — interviewing sales, mapping the buying journey, and analyzing two years of won and lost deals. The constraint wasn't demand; it was the system around it.",
        points: [
          "No shared definition of a qualified lead, so sales chased everything",
          "Messaging spoke to engineers, but buying decisions sat with operations leaders",
          "No mechanism to capture and nurture the long, multi-month buying cycle",
        ],
      },
      {
        n: "03 — STRATEGY",
        title: "The strategy",
        body: "We focused on a narrow beachhead segment where the firm's precision capabilities were a clear, defensible advantage — then built the demand system around it.",
        points: [
          "A sharp ICP and qualification framework the whole team agreed on",
          "A repositioned message aimed at the real economic buyer",
          "A content and outbound motion mapped to each stage of the buying cycle",
        ],
      },
      {
        n: "04 — EXECUTION",
        title: "How we executed",
        body: "Strategy on paper changes nothing, so we embedded with the commercial team for the build. We ran the first campaigns alongside them, tuned the qualification criteria weekly, and stood up the dashboards leadership needed to trust the numbers.",
        points: [
          "Built and launched three segment-specific campaigns",
          "Trained sales on the new qualification and handoff process",
          "Installed a pipeline dashboard with leading indicators",
        ],
      },
      {
        n: "05 — RESULTS",
        title: "The results",
        body: "Within two quarters the pipeline was both larger and more predictable — and for the first time, leadership could forecast new business with confidence.",
        points: [
          "40% increase in qualified leads quarter over quarter",
          "Pipeline value grew 3.2× against the prior year",
          "Cost per qualified lead fell 35% as targeting sharpened",
        ],
      },
    ],
    quote: {
      text: "Vinika didn't hand us a strategy and leave. They sat with our sales team until the pipeline actually changed.",
      attribution: "VP of Commercial · Precision Manufacturing",
    },
  },
  {
    slug: "retail-national",
    sector: "Consumer · Retail",
    metric: "3",
    metricLabel: "new markets entered",
    title: "Taking a regional retail brand national",
    summary:
      "A beloved regional retailer had the brand equity to expand but no playbook for it. We built a validated, repeatable market-entry model — and three new regions live within a year.",
    tags: ["Consumer · Retail", "Market Expansion"],
    heroMetrics: [
      { value: "3", label: "Markets entered" },
      { value: "6 mo", label: "To first store" },
      { value: "2.1×", label: "Revenue" },
      { value: "+18%", label: "Margin" },
    ],
    sections: [
      {
        n: "01 — CHALLENGE",
        title: "The challenge",
        body: "The brand was a regional favorite with fiercely loyal customers, but every conversation about expansion stalled on the same question: would the magic travel? Past attempts to open outside the home region had been expensive one-offs — slow, and impossible to repeat.",
      },
      {
        n: "02 — ANALYSIS",
        title: "What we found",
        body: "We pressure-tested the brand's appeal beyond its home turf and mapped what actually drove loyalty.",
        points: [
          "The core promise resonated nationally; the hyper-local flavor did not",
          "Site selection had been driven by gut, not by demand signals",
          "Each new store reinvented its operations from scratch",
        ],
      },
      {
        n: "03 — STRATEGY",
        title: "The strategy",
        body: "We designed a market-entry model that protected the brand's soul while making expansion repeatable.",
        points: [
          "A demand-led scorecard for ranking and sequencing markets",
          "A 'fixed core, flexible edge' format that localized without diluting",
          "A store-opening playbook any regional team could run",
        ],
      },
      {
        n: "04 — EXECUTION",
        title: "How we executed",
        body: "We piloted the model in one new region, learned, then rolled it forward.",
        points: [
          "Opened the first flagship in six months",
          "Codified the playbook from the pilot's wins and misses",
          "Trained two regional teams to operate independently",
        ],
      },
      {
        n: "05 — RESULTS",
        title: "The results",
        body: "Within a year the brand was live in three new markets — and, for the first time, expansion felt like a system rather than a gamble.",
        points: [
          "Three markets entered against a one-market prior pace",
          "Revenue grew 2.1× as new regions ramped",
          "Unit margins improved 18% from a standardized format",
        ],
      },
    ],
    quote: {
      text: "They cracked the code on what makes us, us — and then made it repeatable.",
      attribution: "CEO · Regional Retail Group",
    },
  },
  {
    slug: "saas-retention",
    sector: "Technology · B2B SaaS",
    metric: "2.4×",
    metricLabel: "net revenue retention",
    title: "Turning churn into expansion revenue",
    summary:
      "A B2B SaaS company was filling a leaky bucket — winning logos, then losing them. We rebuilt the post-sale motion around value, turning churn into expansion.",
    tags: ["Technology · B2B SaaS", "Growth Advisory"],
    heroMetrics: [
      { value: "2.4×", label: "Net revenue retention" },
      { value: "−45%", label: "Logo churn" },
      { value: "+31%", label: "Expansion MRR" },
      { value: "1 qtr", label: "To impact" },
    ],
    sections: [
      {
        n: "01 — CHALLENGE",
        title: "The challenge",
        body: "New-logo growth looked healthy, but net revenue was barely moving. Customers signed enthusiastically, adopted narrowly, and quietly churned at renewal — and no one could predict who was at risk until it was too late.",
      },
      {
        n: "02 — ANALYSIS",
        title: "What we found",
        body: "We analyzed two years of accounts to find what separated expanders from churners.",
        points: [
          "Onboarding was optimized for go-live, not for first value",
          "Success was reactive — engaging accounts only once they were already at risk",
          "Pricing punished the very expansion the company wanted",
        ],
      },
      {
        n: "03 — STRATEGY",
        title: "The strategy",
        body: "We re-centered the lifecycle on demonstrated value and made risk visible early.",
        points: [
          "A value-milestone onboarding tied to each customer's own goals",
          "A health model with leading indicators and clear plays",
          "A packaging change that made growing usage the easy path",
        ],
      },
      {
        n: "04 — EXECUTION",
        title: "How we executed",
        body: "We rolled the model out with the customer-success and product teams and instrumented it end to end.",
        points: [
          "Rebuilt onboarding around three early value milestones",
          "Launched a health dashboard with automated risk alerts",
          "Repriced to reward expansion, grandfathering existing accounts",
        ],
      },
      {
        n: "05 — RESULTS",
        title: "The results",
        body: "Within a quarter the bucket stopped leaking — and started compounding.",
        points: [
          "Net revenue retention reached 2.4×",
          "Logo churn fell 45%",
          "Expansion MRR grew 31% as accounts deepened usage",
        ],
      },
    ],
    quote: {
      text: "We stopped firefighting renewals. Now growth comes from the customers we already have.",
      attribution: "VP Customer Success · B2B SaaS",
    },
  },
  {
    slug: "logistics-margin",
    sector: "Industrial · Logistics",
    metric: "−28%",
    metricLabel: "cost-to-serve",
    title: "Redesigning operations for margin",
    summary:
      "Growth had outrun the operating model. We redesigned how the business served its customers — cutting cost-to-serve 28% without touching service levels.",
    tags: ["Industrial · Logistics", "Business Consulting"],
    heroMetrics: [
      { value: "−28%", label: "Cost-to-serve" },
      { value: "+12pt", label: "Gross margin" },
      { value: "99.2%", label: "On-time" },
      { value: "4 mo", label: "Payback" },
    ],
    sections: [
      {
        n: "01 — CHALLENGE",
        title: "The challenge",
        body: "Revenue was climbing but margins were sliding. Every new customer added complexity, and the operating model — built for a smaller, simpler business — was quietly eating the profit.",
      },
      {
        n: "02 — ANALYSIS",
        title: "What we found",
        body: "We traced cost-to-serve account by account and route by route.",
        points: [
          "A long tail of small accounts cost more to serve than they earned",
          "Routing and scheduling were manual and locally optimized",
          "No one owned the end-to-end cost of a shipment",
        ],
      },
      {
        n: "03 — STRATEGY",
        title: "The strategy",
        body: "We redesigned the operating model around true cost and clear accountability.",
        points: [
          "A service-tier model matching effort to account value",
          "Optimized routing and consolidated scheduling",
          "A cost-to-serve metric owned by operations, not finance",
        ],
      },
      {
        n: "04 — EXECUTION",
        title: "How we executed",
        body: "We implemented in waves to protect service while the changes landed.",
        points: [
          "Re-tiered the account base and renegotiated the worst-fit terms",
          "Rolled out routing optimization across the network",
          "Stood up a weekly cost-to-serve operating review",
        ],
      },
      {
        n: "05 — RESULTS",
        title: "The results",
        body: "The business kept its service promise and got its margin back.",
        points: [
          "Cost-to-serve down 28%",
          "Gross margin up 12 points",
          "On-time delivery held at 99.2% throughout",
        ],
      },
    ],
    quote: {
      text: "We finally know which customers make us money — and we serve all of them better for it.",
      attribution: "COO · Logistics Operator",
    },
  },
  {
    slug: "d2c-rebrand",
    sector: "Consumer · D2C",
    metric: "+61%",
    metricLabel: "brand recall",
    title: "A rebrand that finally matched the ambition",
    summary:
      "A fast-growing D2C brand had outgrown its founder-built identity. We rebuilt the brand from positioning out — and recall, conversion, and basket size all followed.",
    tags: ["Consumer · D2C", "Brand Strategy"],
    heroMetrics: [
      { value: "+61%", label: "Brand recall" },
      { value: "2.3×", label: "Conversion" },
      { value: "+44%", label: "AOV" },
      { value: "8 wks", label: "To launch" },
    ],
    sections: [
      {
        n: "01 — CHALLENGE",
        title: "The challenge",
        body: "The brand had scaled fast on a scrappy, founder-built identity — and hit a ceiling. It looked like a startup in a category that had matured around it, and growth was getting more expensive to buy.",
      },
      {
        n: "02 — ANALYSIS",
        title: "What we found",
        body: "We tested the brand against its market and its best customers.",
        points: [
          "The product was loved; the brand was forgettable",
          "Messaging led with features, not the reason people actually bought",
          "The identity didn't survive past the homepage",
        ],
      },
      {
        n: "03 — STRATEGY",
        title: "The strategy",
        body: "We rebuilt from a sharp position and a story worth repeating.",
        points: [
          "A distinctive position the category couldn't claim back",
          "A narrative anchored in the customer's transformation",
          "A flexible identity system built for every channel",
        ],
      },
      {
        n: "04 — EXECUTION",
        title: "How we executed",
        body: "We moved fast, launching the new brand in eight weeks.",
        points: [
          "Ran positioning and narrative workshops with the leadership team",
          "Designed and shipped a full identity and messaging system",
          "Relaunched the site and core channels in one coordinated drop",
        ],
      },
      {
        n: "05 — RESULTS",
        title: "The results",
        body: "The brand finally matched the product — and the numbers moved with it.",
        points: [
          "Aided brand recall up 61%",
          "On-site conversion 2.3× pre-launch",
          "Average order value up 44% as the story justified the price",
        ],
      },
    ],
    quote: {
      text: "For the first time, the brand feels as good as the thing in the box.",
      attribution: "Founder · D2C Brand",
    },
  },
];

export const FEATURED_SLUG = "manufacturing-pipeline";

export function getStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
