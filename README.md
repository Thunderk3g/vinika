# vinika

Vinika — business consultancy landing site. A Next.js (App Router + TypeScript) clone of the
`Vinika.dc.html` Claude Design canvas, with GSAP + Lenis motion.

## Stack
- Next.js 15 (App Router) · React 19 · TypeScript
- [GSAP](https://gsap.com) for reveal/timeline animation
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure
- `app/` — layout, page, global styles
- `components/VinikaSite.tsx` — the full page + motion engine
- `components/ImageSlot.tsx` — placeholder for photo slots (swap in real assets)
- `lib/content.ts` — copy for process, services, FAQ, about, insights
- `public/assets/` — logo files
- `prompts/` — Nano Banana thumbnail prompts + Claude Design logo-animation brief

## Assets
Photo slots render branded placeholders until real images are dropped in. Pass a `src`
to `ImageSlot` (or wire up the generated thumbnails) to populate them.

Tagline: **Elevate · Expand · Excel.**
