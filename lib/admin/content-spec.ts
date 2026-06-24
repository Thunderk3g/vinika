/**
 * Presentation specs that drive the generic Site Content editor. Each section
 * maps to one row in `site_content`; the editor renders friendly inputs from
 * these specs and saves the whole section object back. Shapes mirror
 * lib/home-content.ts (HomeContent).
 */

export type ItemField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "stringlist";
};

export type Field =
  | { kind: "text" | "textarea"; path: string; label: string; placeholder?: string }
  | { kind: "stringlist"; path: string; label: string }
  | {
      kind: "list";
      path: string;
      label: string;
      itemLabel: string;
      itemFields: ItemField[];
    };

export type SectionSpec = {
  key: string;
  label: string;
  description: string;
  fields: Field[];
};

const heading = (withBlurb = true): Field[] => [
  { kind: "text", path: "heading.eyebrow", label: "Eyebrow" },
  { kind: "text", path: "heading.title", label: "Title" },
  ...(withBlurb
    ? [{ kind: "textarea", path: "heading.blurb", label: "Blurb" } as Field]
    : []),
];

export const SECTION_SPECS: SectionSpec[] = [
  {
    key: "hero",
    label: "Hero",
    description: "The headline, badge, intro line and call-to-action buttons.",
    fields: [
      { kind: "text", path: "badge", label: "Badge" },
      { kind: "text", path: "titleLead", label: "Headline (lead)" },
      { kind: "text", path: "titleAccent", label: "Headline (accent, in amber)" },
      { kind: "textarea", path: "subtitle", label: "Subtitle" },
      { kind: "text", path: "primaryCta.label", label: "Primary button — label" },
      { kind: "text", path: "primaryCta.href", label: "Primary button — link" },
      { kind: "text", path: "secondaryCta.label", label: "Secondary button — label" },
      { kind: "text", path: "secondaryCta.href", label: "Secondary button — link" },
    ],
  },
  {
    key: "audiences",
    label: "Who we help",
    description: "Section heading plus the audience cards.",
    fields: [
      ...heading(),
      {
        kind: "list",
        path: "items",
        label: "Audience cards",
        itemLabel: "Card",
        itemFields: [
          { key: "k", label: "Marker (A/B/C…)", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "desc", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "services",
    label: "Services",
    description: "The sticky-stacked service cards.",
    fields: [
      ...heading(),
      {
        kind: "list",
        path: "items",
        label: "Services",
        itemLabel: "Service",
        itemFields: [
          { key: "n", label: "Number (01…)", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "desc", label: "Description", type: "textarea" },
          { key: "tags", label: "Tags", type: "stringlist" },
          { key: "href", label: "Link", type: "text" },
        ],
      },
    ],
  },
  {
    key: "process",
    label: "Process",
    description: "The numbered process timeline.",
    fields: [
      ...heading(false),
      {
        kind: "list",
        path: "steps",
        label: "Steps",
        itemLabel: "Step",
        itemFields: [
          { key: "n", label: "Number", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "desc", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "stories",
    label: "Featured work",
    description: "Success-story metric cards.",
    fields: [
      ...heading(false),
      { kind: "text", path: "viewAllLabel", label: "“View all” link label" },
      {
        kind: "list",
        path: "items",
        label: "Stories",
        itemLabel: "Story",
        itemFields: [
          { key: "sector", label: "Sector", type: "text" },
          { key: "client", label: "Client", type: "text" },
          { key: "metric", label: "Metric (big number)", type: "text" },
          { key: "result", label: "Result", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "insights",
    label: "Insights (home cards)",
    description: "The three insight cards shown on the homepage.",
    fields: [
      ...heading(false),
      {
        kind: "list",
        path: "items",
        label: "Cards",
        itemLabel: "Card",
        itemFields: [
          { key: "cat", label: "Category", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "read", label: "Read time", type: "text" },
          { key: "href", label: "Link", type: "text" },
        ],
      },
    ],
  },
  {
    key: "faq",
    label: "FAQ",
    description: "Frequently asked questions.",
    fields: [
      ...heading(false),
      {
        kind: "list",
        path: "items",
        label: "Questions",
        itemLabel: "Question",
        itemFields: [
          { key: "q", label: "Question", type: "text" },
          { key: "a", label: "Answer", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    description: "Contact heading, blurb and details.",
    fields: [
      { kind: "text", path: "eyebrow", label: "Eyebrow" },
      { kind: "text", path: "titleLead", label: "Title (line 1)" },
      { kind: "text", path: "titleAccent", label: "Title (line 2)" },
      { kind: "textarea", path: "blurb", label: "Blurb" },
      { kind: "text", path: "email", label: "Email" },
      { kind: "text", path: "availability", label: "Availability line" },
      { kind: "text", path: "submitLabel", label: "Submit button label" },
    ],
  },
];

export function getSpec(key: string): SectionSpec | undefined {
  return SECTION_SPECS.find((s) => s.key === key);
}
