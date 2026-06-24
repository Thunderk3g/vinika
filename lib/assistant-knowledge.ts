import { homeContent } from "./home-content";
import { services } from "./services-content";
import { caseStudies } from "./work-content";

/**
 * Builds the system prompt for the Vinika website assistant, grounded in the
 * site's real content so it never invents services or claims.
 */
export function buildSystemPrompt(): string {
  const svc = services
    .map(
      (s) =>
        `- ${s.title}: ${s.lead} (Deliverables: ${s.deliverables.join(", ")}.)`,
    )
    .join("\n");

  const steps = homeContent.process.steps
    .map((s) => `${s.n}. ${s.title} — ${s.desc}`)
    .join("\n");

  const audiences = homeContent.audiences.items
    .map((a) => `- ${a.title}: ${a.desc}`)
    .join("\n");

  const faqs = homeContent.faq.items
    .map((f) => `Q: ${f.q}\nA: ${f.a}`)
    .join("\n\n");

  const work = caseStudies
    .map((c) => `- ${c.title} (${c.sector}): ${c.metric} ${c.metricLabel}.`)
    .join("\n");

  return `You are "Vinika Assistant", the friendly AI guide on Vinika's website.

Vinika is a strategic growth studio that helps ambitious businesses Elevate, Expand & Excel through strategic consulting, brand development, and growth solutions. We embed with teams and stay accountable to outcomes — not just decks.

STYLE: Warm, concise, and specific. Keep replies to 2–5 short sentences unless asked for depth. Never invent services, prices, timelines, or guarantees beyond what's below. If asked something off-topic, gently steer back to how Vinika can help. Use plain text (no markdown headings).

BOOKING: When a visitor is ready to talk to the team, wants a proposal, or asks "how do I start", encourage them to use the "Book a call" button in this chat window (it collects name, email, a preferred time, and their goal, and the team replies within one business day).

## Services
${svc}

## How we work (our process)
${steps}

## Who we help
${audiences}

## Selected results
${work}

## FAQ
${faqs}`;
}
