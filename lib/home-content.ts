/**
 * Typed content for the Vinika home page.
 *
 * This is the single source of truth for the homepage copy. The public site
 * reads from here today; in a later phase the same shape is stored in Supabase
 * (`site_content`) and edited from the admin CRM, then hydrated into these types.
 * Keep the shape stable — the editor and the DB seed both depend on it.
 */

export type HeroContent = {
  badge: string;
  /** Headline is split so the accent fragment can be highlighted in amber. */
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type Audience = { k: string; title: string; desc: string };

export type Service = {
  n: string; // "01"
  title: string;
  desc: string;
  tags: string[];
  href: string;
};

export type ProcessStep = { n: string; title: string; desc: string };

export type Story = {
  sector: string;
  client: string;
  metric: string;
  result: string;
};

export type InsightCard = { cat: string; title: string; read: string; href: string };

export type Faq = { q: string; a: string };

export type ContactContent = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  blurb: string;
  email: string;
  availability: string;
  submitLabel: string;
};

export type SectionHeading = {
  eyebrow: string;
  title: string;
  blurb?: string;
};

export type HomeContent = {
  hero: HeroContent;
  audiences: { heading: SectionHeading; items: Audience[] };
  services: { heading: SectionHeading; items: Service[] };
  process: { heading: SectionHeading; steps: ProcessStep[] };
  stories: { heading: SectionHeading; viewAllLabel: string; items: Story[] };
  insights: { heading: SectionHeading; items: InsightCard[] };
  faq: { heading: SectionHeading; items: Faq[] };
  contact: ContactContent;
};

export const homeContent: HomeContent = {
  hero: {
    badge: "STRATEGIC GROWTH STUDIO",
    titleLead: "Helping Businesses Elevate, Expand",
    titleAccent: "& Excel",
    subtitle:
      "Strategic consulting, brand development, and growth solutions for ambitious businesses.",
    primaryCta: { label: "Start a conversation", href: "#contact" },
    secondaryCta: { label: "See our work", href: "#work" },
  },

  audiences: {
    heading: {
      eyebrow: "WHO WE HELP",
      title: "Built for businesses at an inflection point.",
      blurb:
        "We partner with leaders who are done with incremental — and ready to make a decisive move.",
    },
    items: [
      {
        k: "A",
        title: "Founders scaling past chaos",
        desc: "You've found product–market fit. Now you need the systems and strategy to scale without breaking.",
      },
      {
        k: "B",
        title: "Established firms entering new markets",
        desc: "Proven at home, untested abroad. We de-risk the move into new geographies and segments.",
      },
      {
        k: "C",
        title: "Brands that have outgrown their identity",
        desc: "Your reputation is bigger than your brand. We realign the story with the ambition.",
      },
      {
        k: "D",
        title: "Teams in the middle of transformation",
        desc: "Change is decided — execution is hard. We turn the mandate into measurable progress.",
      },
    ],
  },

  services: {
    heading: {
      eyebrow: "WHAT WE DO",
      title: "Five disciplines, one outcome — momentum.",
      blurb: "Keep scrolling — each practice stacks into view.",
    },
    items: [
      {
        n: "01",
        title: "Brand Strategy",
        desc: "Building memorable brands with clear positioning, narrative, and identity systems that compound over time.",
        tags: ["Positioning", "Identity", "Narrative", "Naming", "Messaging"],
        href: "#contact",
      },
      {
        n: "02",
        title: "Business Consulting",
        desc: "Solving operational and growth challenges with rigorous analysis and pragmatic, executable plans.",
        tags: ["Operations", "Org Design", "Pricing", "Go-to-market", "Finance"],
        href: "#contact",
      },
      {
        n: "03",
        title: "Market Expansion",
        desc: "Helping businesses unlock new geographies, segments, and channels with validated entry strategies.",
        tags: ["Market Research", "Entry Strategy", "Partnerships", "Localization"],
        href: "#contact",
      },
      {
        n: "04",
        title: "Digital Transformation",
        desc: "Modernizing how you operate — systems, data, and digital products that move the core metrics.",
        tags: ["Systems", "Data & AI", "Automation", "Digital Product"],
        href: "#contact",
      },
      {
        n: "05",
        title: "Growth Advisory",
        desc: "An ongoing strategic partnership that keeps momentum compounding quarter after quarter.",
        tags: ["Advisory", "Roadmaps", "KPI Design", "Leadership Coaching"],
        href: "#contact",
      },
    ],
  },

  process: {
    heading: {
      eyebrow: "OUR PROCESS",
      title: "A disciplined path from insight to lasting growth.",
    },
    steps: [
      {
        n: "01",
        title: "Discover",
        desc: "We immerse in your business, market, and ambitions — separating the real constraints from the assumed ones.",
      },
      {
        n: "02",
        title: "Diagnose",
        desc: "Rigorous analysis to find the few levers that actually move your outcomes, backed by evidence.",
      },
      {
        n: "03",
        title: "Strategize",
        desc: "A sharp, prioritized plan with clear bets, sequencing, and the metrics that prove they're working.",
      },
      {
        n: "04",
        title: "Execute",
        desc: "We work shoulder-to-shoulder with your team to ship the plan — not hand over a deck and leave.",
      },
      {
        n: "05",
        title: "Scale",
        desc: "Double down on what's working, systematize it, and remove the friction holding growth back.",
      },
      {
        n: "06",
        title: "Sustain",
        desc: "Embed the habits, dashboards, and rhythms so momentum continues long after we're gone.",
      },
    ],
  },

  stories: {
    heading: { eyebrow: "FEATURED WORK", title: "Outcomes, not deliverables." },
    viewAllLabel: "View all case studies →",
    items: [
      {
        sector: "Industrial",
        client: "Manufacturing",
        metric: "40%",
        result: "Growth in qualified leads within two quarters",
      },
      {
        sector: "Consumer",
        client: "Retail Brand",
        metric: "3",
        result: "New markets entered with a validated playbook",
      },
      {
        sector: "Technology",
        client: "B2B SaaS",
        metric: "2.4×",
        result: "Increase in net revenue retention",
      },
    ],
  },

  insights: {
    heading: { eyebrow: "INSIGHTS", title: "Thinking worth your time." },
    items: [
      {
        cat: "STRATEGY",
        title: "Why most growth plans fail in the first 90 days",
        read: "6 min read",
        href: "/insights",
      },
      {
        cat: "BRANDING",
        title: "Positioning is a decision, not a tagline",
        read: "4 min read",
        href: "/insights",
      },
      {
        cat: "OPERATIONS",
        title: "The compounding cost of unmade decisions",
        read: "5 min read",
        href: "/insights",
      },
    ],
  },

  faq: {
    heading: { eyebrow: "FAQ", title: "Questions, answered." },
    items: [
      {
        q: "What kind of businesses do you work with?",
        a: "From scaling founders to established firms entering new markets. The common thread is ambition and a moment of real decision — not size or sector.",
      },
      {
        q: "How is Vinika different from a traditional consultancy?",
        a: "We don't hand you a deck and disappear. We embed with your team, execute alongside you, and stay accountable to the outcome — not the engagement length.",
      },
      {
        q: "What does a typical engagement look like?",
        a: "It starts with Discover and Diagnose to find the real levers, then a focused strategy sprint, then hands-on execution. Most partnerships run 3–9 months, with advisory continuing after.",
      },
      {
        q: "How long until we see results?",
        a: "Early signals usually appear within the first 6–8 weeks. Meaningful, durable change typically lands within a quarter or two, depending on the lever.",
      },
      {
        q: "Do you execute or just advise?",
        a: "Both. Advisory keeps you sharp; execution makes it real. Most clients want a partner who does the work with them — that's our default.",
      },
      {
        q: "How do we get started?",
        a: "Send us a note about where you want to go. We'll set up a short call, scope a first engagement, and move fast from there.",
      },
    ],
  },

  contact: {
    eyebrow: "CONTACT",
    titleLead: "Let's Build",
    titleAccent: "What's Next.",
    blurb:
      "Tell us where you want to go. We'll show you the path — and walk it with you.",
    email: "hello@vinika.com",
    availability: "Mon–Fri · We reply within one business day",
    submitLabel: "Send message",
  },
};
