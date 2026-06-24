/**
 * Typed content for the Vinika Services page.
 *
 * Single source of truth for the five service engagements. The page
 * (`app/services/page.tsx`) maps over `services` to render one block each.
 * Keep the shape stable — the page layout depends on these fields.
 */

export type Service = {
  /** URL fragment / anchor id, e.g. "brand-strategy". */
  id: string;
  /** Index label, e.g. "01 / 05". */
  n: string;
  title: string;
  lead: string;
  problem: string;
  approach: string;
  method: string[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    id: "brand-strategy",
    n: "01 / 05",
    title: "Brand Strategy",
    lead: "When your reputation has outgrown your brand, we realign the story with the ambition — and make it impossible to ignore.",
    problem:
      "Your business has evolved, but your positioning, message, and identity still describe who you were two years ago.",
    approach:
      "We start from the market and the truth of what you do best, then build a sharp position and a brand system that scales with you.",
    method: [
      "Market & competitor mapping",
      "Positioning & narrative workshops",
      "Identity & messaging system",
      "Rollout playbook",
    ],
    deliverables: [
      "Positioning",
      "Brand narrative",
      "Messaging framework",
      "Identity system",
      "Naming",
    ],
  },
  {
    id: "business-consulting",
    n: "02 / 05",
    title: "Business Consulting",
    lead: "Operational drag is quietly capping your growth. We find the few levers that actually move the business and build the plan to pull them.",
    problem:
      "Growth is stalling and the reasons aren't obvious — costs, pricing, structure, and process all feel tangled together.",
    approach:
      "Rigorous diagnosis to isolate the real constraints, then a prioritized, executable plan your team can run with.",
    method: [
      "Diagnostic & data review",
      "Constraint analysis",
      "Prioritized roadmap",
      "Execution support",
    ],
    deliverables: [
      "Operating model",
      "Pricing strategy",
      "Org design",
      "Growth roadmap",
      "KPI framework",
    ],
  },
  {
    id: "market-expansion",
    n: "03 / 05",
    title: "Market Expansion",
    lead: "Proven at home, untested abroad. We de-risk the move into new geographies, segments, and channels with a validated entry plan.",
    problem:
      "There's clear opportunity in new markets, but the cost of getting entry wrong is high and the path is unclear.",
    approach:
      "We validate demand, choose the right entry mode, and line up the partnerships and localization to win the beachhead.",
    method: [
      "Opportunity sizing",
      "Entry-mode selection",
      "Partnership & channel design",
      "Localization plan",
    ],
    deliverables: [
      "Market assessment",
      "Entry strategy",
      "Partnership map",
      "Localization plan",
      "GTM plan",
    ],
  },
  {
    id: "digital-transformation",
    n: "04 / 05",
    title: "Digital Transformation",
    lead: "Modernize how you operate — the systems, data, and digital products that move your core metrics, without a multi-year overhaul.",
    problem:
      "Manual process and disconnected systems are slowing the business and hiding the data you need to make decisions.",
    approach:
      "We sequence change around impact — automate the highest-leverage workflows first and build the data backbone to see clearly.",
    method: [
      "Systems & data audit",
      "Opportunity prioritization",
      "Automation & tooling",
      "Adoption & enablement",
    ],
    deliverables: [
      "Systems audit",
      "Data architecture",
      "Automation build",
      "Digital product",
      "Adoption plan",
    ],
  },
  {
    id: "growth-advisory",
    n: "05 / 05",
    title: "Growth Advisory",
    lead: "An ongoing strategic partnership that keeps momentum compounding — a senior sounding board in the room quarter after quarter.",
    problem:
      "You've got the plan, but you need a trusted, senior partner to keep it sharp and hold the bar as you scale.",
    approach:
      "A lightweight, high-trust cadence — roadmaps, KPI reviews, and leadership coaching tuned to where the business is going.",
    method: [
      "Quarterly strategy reviews",
      "KPI & roadmap tuning",
      "Leadership coaching",
      "On-call advisory",
    ],
    deliverables: [
      "Advisory cadence",
      "Strategic roadmaps",
      "KPI design",
      "Leadership coaching",
    ],
  },
];
