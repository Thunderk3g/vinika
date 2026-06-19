export type Step = {
  n: string;
  title: string;
  sub: string;
  desc: string;
};

export const steps: Step[] = [
  [
    "01",
    "Discovery",
    "Understand your business",
    "We begin by understanding your goals, challenges, and long-term vision. By listening closely, we lay the foundation for consulting that feels aligned and purposeful.",
  ],
  [
    "02",
    "Research",
    "Understand the market",
    "We study your audience, competitors, and industry trends to see where you stand and where opportunities exist — strategies grounded in real insight, not assumptions.",
  ],
  [
    "03",
    "Strategy",
    "Create a clear roadmap",
    "Using everything we have learned, we build a tailored brand and marketing strategy that gives you direction and structure, so you move forward with clarity.",
  ],
  [
    "04",
    "Creative",
    "Design what connects",
    "We bring strategy to life through visuals, messaging, and content that feel authentic — a consistent identity people recognise, relate to, and remember.",
  ],
  [
    "05",
    "Execution",
    "Bring the strategy to life",
    "We handle marketing execution across the right channels, so every campaign and piece of content works together to support your goals.",
  ],
  [
    "06",
    "Optimisation",
    "Refine and grow",
    "We track performance, review results, and improve over time — strengthening your positioning and supporting sustainable, long-term growth.",
  ],
].map(([n, title, sub, desc]) => ({ n, title, sub, desc }));

export type Service = {
  title: string;
  tagline: string;
  desc: string;
  best: string;
};

export const services: Service[] = [
  [
    "Brand Awareness & Positioning",
    "Be clear. Be consistent. Be remembered.",
    "We shape how your brand is seen, understood and remembered — refining your message and strengthening your presence into a brand that feels authentic and recognisable.",
    "Startups and growing businesses looking to stand out and build trust.",
  ],
  [
    "Business Growth Consulting",
    "Make confident decisions as you scale.",
    "We help founders navigate change, growth and uncertainty with clarity — strategic direction that creates structure, reduces guesswork and supports sustainable growth.",
    "Founders who want clarity and direction during key growth phases.",
  ],
  [
    "Marketing Strategy & Execution",
    "Turn plans into consistent action.",
    "We create focused marketing strategies and bring them to life — from planning campaigns to managing content and tracking performance, aligned with your goals.",
    "Businesses that want marketing to feel structured, purposeful and manageable.",
  ],
].map(([title, tagline, desc, best]) => ({ title, tagline, desc, best }));

export type Accordion = { q: string; a: string };

export const about: Accordion[] = [
  [
    "What is Vinika?",
    "Vinika is a strategic business consultancy focused on building brands that matter. We work closely with startups, SMEs and growing businesses to create tailored brand and marketing strategies that evolve with the market, not fight against it.",
  ],
  [
    "Our mission",
    "To craft intelligent, adaptive strategies that empower ambitious startups, SMEs and businesses to grow with confidence — defining their foundation, sharpening direction and navigating every stage with clarity.",
  ],
  [
    "Our vision",
    "A future where startups and growing businesses achieve sustainable growth and long-term independence — founders equipped with the clarity, strategies and confidence to build businesses that last.",
  ],
  [
    "Core values",
    "Reliable, Adaptive, Genuine, Evolving. We show up with consistency, stay flexible as markets change, keep conversations honest, and continuously refine — just like the brands we build.",
  ],
].map(([q, a]) => ({ q, a }));

export const faqs: Accordion[] = [
  [
    "What is business consulting?",
    "Business consulting is professional guidance that helps businesses make clearer decisions, solve challenges and grow with confidence. At Vinika, we focus on understanding your goals, creating structure and supporting your growth so you don't have to rely on trial and error.",
  ],
  [
    "Marketing vs. brand strategy?",
    "Brand strategy defines the foundation of your business — who you are, what you stand for and how you want to be perceived. Marketing strategy is how that brand is communicated through campaigns, channels and messaging to reach the right audience.",
  ],
  [
    "Brand awareness vs. positioning?",
    "Brand awareness is about how many people know your brand exists. Brand positioning is about what your brand stands for in their minds and how it stands out from others in your space.",
  ],
  [
    "What comes under marketing execution?",
    "Marketing execution covers campaign planning, content creation and management, channel activation and performance tracking — turning your strategy into consistent, coordinated action.",
  ],
].map(([q, a]) => ({ q, a }));

export type Article = { cat: string; title: string; meta: string };

export const articles: Article[] = [
  ["Strategy", "Why most growth stalls at the same place", "6 min read"],
  ["Brand", "Positioning is a decision, not a tagline", "4 min read"],
  ["Operations", "Building a system that compounds", "5 min read"],
].map(([cat, title, meta]) => ({ cat, title, meta }));

/** [rotate, left, top, width] for the three tilted method cards */
export const methodSpecs: [string, string, string, string][] = [
  ["-9deg", "6%", "8%", "220px"],
  ["7deg", "38%", "0%", "240px"],
  ["-4deg", "66%", "14%", "210px"],
];
