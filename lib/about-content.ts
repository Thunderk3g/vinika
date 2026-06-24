/**
 * Typed content for the Vinika About page.
 *
 * The page (`app/about/page.tsx`) maps over `team` to render the team grid.
 * Remaining copy is inlined in the page itself.
 */

export type TeamMember = {
  /** Two-letter monogram shown on the card's image tile. */
  initials: string;
  name: string;
  role: string;
};

export const team: TeamMember[] = [
  { initials: "AR", name: "Aanya Rao", role: "Founder & Managing Partner" },
  { initials: "DM", name: "David Mehta", role: "Partner, Strategy" },
  { initials: "SK", name: "Sara Khan", role: "Partner, Brand" },
  { initials: "JL", name: "Jonas Lind", role: "Director, Growth" },
];
