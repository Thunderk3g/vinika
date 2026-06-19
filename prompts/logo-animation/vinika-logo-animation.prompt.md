# VINIKA — Animated Logo Reveal (Claude Design Brief)

> Paste the **PASTE-READY PROMPT** block below straight into Claude Design (claude.ai/design). Attach the three logo PNGs from `assets/` for visual reference. Then iterate using the detailed spec underneath.

---

## ⬛ PASTE-READY PROMPT (copy this block)

Build a self-contained animated logo reveal for **VINIKA**, a premium business consultancy. Output a single `.dc.html` file using **GSAP** (timeline + SplitText-style stagger), inline **SVG** for the wordmark, and CSS for lighting. It is both a cinematic hero brand-reveal and a 2.8s website preloader. Feeling: **engineered, cinematic, quietly luxurious — order assembling out of motion, then a gold light confirming it.**

The mark is the wordmark **"VINIKA"** set in a bold, heavy, condensed geometric all-caps sans-serif (use **Anton**, weight 400, tracked tight). Beneath the wordmark, left-aligned to the V, sits a solid filled horizontal **bar/rule** (about 45% of the wordmark width, ~14px tall on a 720px-wide lockup). Immediately to the right of that bar, baseline-aligned, is the tagline **"ELEVATE | EXPAND | EXCEL"** in small spaced caps (Space Grotesk, 600, letter-spacing ~0.28em) with thin pipe `|` separators. Reproduce this exact lockup — wordmark, then bar + tagline as one horizontal unit below it.

Stage: full-viewport, centered. Background is a deep navy radial-to-linear gradient (`#07254c` core → `#0a3165` → `#0a0f1a` edges) with a faint film grain and a soft vignette. Letters render in **cream `#f5e1c8`**; the hero accent is **amber/gold `#e0a045`**.

Animation (total reveal ~4.2s, then an infinite idle loop):
1. **0–400ms** — Stage fades up from black; grain and vignette settle; a faint vertical light bloom breathes at center.
2. **350–1900ms** — VINIKA reveals **letter by letter** via a signature **clip-path rise + mask wipe**: each glyph starts clipped from below (`inset(100% 0 0 0)`), translateY(40px), blur(8px), and rises into place sharp and clear. Stagger **90ms** per letter, ease **expo.out**, per-letter duration ~700ms. Add a 6px downward motion-blur smear on entry that resolves to 0.
3. **1500–2100ms** — The **underbar draws in** with `scaleX` from 0→1, transform-origin left, ease **power4.out**, ~600ms — as if a ruler is struck under the word.
4. **1900–2600ms** — The **tagline** "ELEVATE | EXPAND | EXCEL" fades + slides in from the bar outward, **character stagger 22ms**, opacity 0→1, x −12px→0, ease **power3.out**. Pipes flick in at full opacity slightly ahead of their neighbors.
5. **2400–3300ms** — **THE AMBER MOMENT**: a metallic gold sheen sweeps left→right across all VINIKA letters using a moving linear-gradient mask (`#e0a045` highlight band over the cream), ~900ms ease **power2.inOut**; simultaneously the underbar momentarily fills/ignites amber then settles back toward cream-navy, and a thin amber underline glints beneath the tagline.
6. **3300ms → ∞** — **Idle loop**: whole lockup "breathes" (scale 1→1.012→1, 6s ease sine.inOut, yoyo); the gold sheen re-sweeps the letters every ~7s; 12–18 slow amber/mist particles drift upward behind the mark; grain animates subtly. Add **pointer parallax** — lockup tilts up to ±6° and shifts ±10px on mouse/gyro for depth.

Signature details to include: gold gradient-mask sheen sweep; entrance motion-blur; soft amber chromatic edge-glow on the letters during the sheen; a center light-bloom; a drifting particle field on canvas; subtle 3D pointer tilt (perspective 900px). Tie all color to the exact hex palette below.

Constraints: single self-contained file, 60fps (animate only transform/opacity/filter, GPU-friendly), **no layout shift / no CLS**, fully responsive (scales the lockup as one SVG group via viewBox), and **respect `prefers-reduced-motion`** (skip blur/sheen/particles, just fade the finished lockup in over 500ms). Expose a JS hook `window.VINIKA_INTRO_DONE` / a `done` callback so it can double as a preloader, and make the reveal compressible to **2.8s** via a `speed` constant. Ship the **Cinematic Dark** version (navy bg, cream letters) as primary; also include a quick toggle/comment for a **Light Editorial** variant (cream `#f5e1c8` bg, navy `#0a3165` letters, amber accent unchanged).

Palette: navy `#0a3165`, deep navy `#07254c`, ink `#0a0f1a`, cream `#f5e1c8`, amber/gold `#e0a045`, teal `#3f7d86`, maroon `#7a1f2b`, mist `#b9c6d0`. Fonts: **Anton** (display/wordmark), **Space Grotesk** (tagline/text).

---

## 📐 DETAILED SPEC

### 1. Concept & Feeling
Cinematic, engineered luxury. The reveal should read as *precision assembling itself*: letters rise into a sharp grid out of soft blur, a ruled bar is struck beneath like a draftsman's line, and a single sweep of gold light certifies the finished mark. It is confident and still — no bounce, no playfulness. Think title-card for a consultancy that promises to **Elevate · Expand · Excel**: structure first, then a moment of warmth (the amber) that signals premium.

### 2. Stage / Canvas
- **Background (Cinematic Dark):** layered — (a) radial gradient bloom at center `#07254c` → `#0a3165` (~40%) → `#0a0f1a` at the corners; (b) a subtle 1.5–2.5% opacity animated film grain (SVG `feTurbulence` or a tiled noise PNG data-URI, slowly jittered); (c) a soft inner vignette darkening the outer 25%.
- **Dimensions:** full viewport (100vw × 100vh / 100dvh). Lockup centered both axes.
- **Responsive:** the entire wordmark + bar + tagline live in ONE SVG with a fixed `viewBox` (e.g. `0 0 720 240`) so everything scales as a unit; cap width at ~min(720px, 86vw). No reflow between breakpoints — only the SVG scales.
- **Safe area:** keep ~7vw padding so the mark never kisses screen edges on mobile.

### 3. Full Animation Timeline (GSAP master timeline)
Use one GSAP timeline (`gsap.timeline()`); `speed` constant multiplies all durations/delays (1.0 = hero ~4.2s, 0.66 ≈ 2.8s preloader).

| Beat | Time (ms) | Element | Motion | Ease | Dur |
|------|-----------|---------|--------|------|-----|
| A | 0–400 | Stage | opacity 0→1 from black; vignette + grain fade in; center bloom begins breathing | power2.out | 400 |
| B | 350–1900 | VINIKA glyphs (V·I·N·I·K·A) | per-glyph: `clip-path: inset(100% 0 0 0)`→`inset(0 0 0 0)`, `y:40→0`, `blur(8px)→0`, motion-blur smear 6px→0 | expo.out | 700/glyph |
|   |  |  | **stagger 90ms** between glyphs | | |
| C | 1500–2100 | Underbar | `scaleX:0→1`, transform-origin left | power4.out | 600 |
| D | 1900–2600 | Tagline chars + pipes | opacity 0→1, `x:-12→0`; **stagger 22ms**; pipes lead +1 step at full opacity | power3.out | 480 |
| E | 2400–3300 | All letters + bar | **gold sheen sweep** L→R (moving gradient mask); bar ignites amber→settles; amber underline glints under tagline; brief chromatic edge-glow | power2.inOut | 900 |
| F | 3300 → ∞ | Whole lockup | **idle:** breathe scale 1→1.012→1 (6s, sine.inOut, yoyo); sheen re-sweep every ~7s; particles drift; grain jitter; pointer parallax tilt ±6° | sine.inOut | loop |

**Letter reveal technique (signature):** clip-path rise + mask wipe. Each glyph is its own SVG `<path>`/`<text>` wrapped in a group with `overflow:hidden`-style clip; animate `clipPath inset` from `100% 0 0 0` (fully hidden, revealed from baseline up) to `0`, combined with `y` translate and a `blur` filter that resolves to 0. The motion-blur smear is a stretched `feGaussianBlur` on the Y axis (or a CSS `filter: blur()` on a duplicated trailing copy) that collapses as the glyph lands. Letters land **sharp** — the contrast between soft-blur entry and crisp settle is the whole effect.

### 4. Signature Detail Effects (how each is built)
- **Gold sheen sweep:** a `linear-gradient(105deg, transparent 35%, #e0a045 50%, #f5e1c8 56%, transparent 65%)` used as a mask/overlay clipped to the letter shapes (`mask-image` or an SVG `<linearGradient>` fill on a duplicate of the wordmark with `mix-blend-mode: screen`). Animate its `background-position` / gradient offset left→right with `power2.inOut`. Re-runs on the idle loop.
- **Entrance motion-blur:** duplicate each glyph as a faint trailing copy offset on Y with `blur`, fading to 0 as the real glyph settles (or SVG `feGaussianBlur stdDeviation` animated 6→0 on Y only).
- **Chromatic edge glow:** during the sheen, add a tiny amber `drop-shadow(0 0 6px rgba(224,160,69,.5))` plus a 1px teal `#3f7d86` offset ghost that fades — a faint premium fringe, not a full RGB split.
- **Center light bloom:** a radial `#0a3165`→transparent blurred ellipse behind the mark, scale/opacity breathing on a 5s sine loop.
- **Particle field:** `<canvas>` behind the SVG; 12–18 particles in amber `#e0a045` and mist `#b9c6d0` at 8–22% opacity, radius 1–3px, drifting upward slowly with slight horizontal sine sway; wrap at top. Pause when tab hidden.
- **Pointer / 3D tilt:** wrap lockup in a `perspective: 900px` container; map pointer (or device gyro) to `rotateX/rotateY` up to ±6° and a ±10px translate for parallax depth between the bloom, particles, and the mark.
- **Optional word-swap flourish (idle, every ~9s):** the tagline can kinetically cycle emphasis — briefly amber-highlight ELEVATE, then EXPAND, then EXCEL in sequence (color tween `#f5e1c8`→`#e0a045`→back, 250ms each). Keep subtle; off by default behind a flag.

### 5. Color & Lighting Choreography
- Base everything on **navy** (`#07254c`/`#0a3165`/`#0a0f1a` gradient). The mark is **cream `#f5e1c8`** so it glows warm against cold navy.
- **Amber `#e0a045` is the only hero accent** and appears at exactly one narrative moment (Beat E) plus the idle sheen — scarcity makes it premium. Underbar flashes amber then relaxes to a cream/navy tone.
- **Teal `#3f7d86`** and **mist `#b9c6d0`** are support-only: faint particle tints and the chromatic fringe. **Maroon `#7a1f2b`** is reserved (do not use in motion) — keep as an available deep accent for the variant only.
- Lighting reads top-left: the sheen travels left→right and slightly downward (~105°), matching the bloom highlight.

### 6. Timing Summary
- **Hero reveal:** ~4.2s end-to-end (Beats A–E), then **infinite idle** (Beat F).
- **Preloader mode:** set `speed ≈ 0.66` → ~2.8s; fire `window.VINIKA_INTRO_DONE = true` and an optional `onComplete()` callback at the end of Beat E so the host site can hand off / fade the loader out. Provide a `minDisplayMs` so it never flashes too fast on quick loads.

### 7. Variants
- **(A) Cinematic Dark — PRIMARY:** navy gradient bg, cream `#f5e1c8` letters, amber `#e0a045` sheen/accent. This is the loader upgrade and hero reveal.
- **(B) Light Editorial — secondary (include behind a `theme` flag/comment):** cream `#f5e1c8` background with faint warm grain, **navy `#0a3165`** letters and bar, amber accent unchanged but slightly deepened, sheen reads as a soft pearlescent shimmer rather than a glow, particles in navy/mist at low opacity. Same timeline; only palette + blend modes swap.

### 8. Technical Constraints / Acceptance Criteria
- **Self-contained single file** (`.dc.html`): GSAP allowed (CDN or inlined). Fonts: load **Anton** + **Space Grotesk** (Google Fonts link or `@font-face`); include a system fallback (`Impact`/`Arial Narrow` for the wordmark) so reveal never waits on a webfont flash — but prefer Anton.
- **60fps:** animate only `transform`, `opacity`, `filter`/`clip-path`; promote animated layers with `will-change`; no animating layout properties (width/top/left).
- **No layout shift (CLS 0):** lockup occupies its final box from frame 0 (visibility via clip/opacity, not display toggles).
- **Accessibility:** honor `prefers-reduced-motion: reduce` → skip blur, sheen, particles, parallax; simply fade the completed lockup in over ~500ms. Provide `role="img"` and `aria-label="VINIKA — Elevate, Expand, Excel"` on the mark; tagline pipes hidden from AT.
- **Exportable as a loop:** the idle state (Beat F) must be seamless and self-looping so it can be screen-recorded into a clean GIF/MP4 brand bumper.
- **Hooks:** `speed`, `theme` ('dark'|'light'), `minDisplayMs`, `onComplete` exposed near the top of the script for easy tuning.

### 9. The Real Mark — reproduce exactly
- **Wordmark:** `VINIKA`, all caps, **Anton 400**, tracked tight. Heavy uniform strokes. The **V** = two thick diagonals to a sharp point; **N** = thick verticals + bold diagonal; **K** = vertical stem with a sharp angled arm/leg; **A** = pointed apex with crossbar. The `VIN` cluster sits slightly tighter than `IKA`. Cream `#f5e1c8` (dark theme).
- **Underbar:** solid filled rectangle, left-aligned to the V's left edge, ~45% of wordmark width, ~14px tall (at 720px lockup), sitting just below the baseline with a small gap.
- **Tagline:** `ELEVATE | EXPAND | EXCEL` — Space Grotesk 600, small, letter-spacing ~0.28em, thin `|` pipe separators, baseline-aligned to the bar, starting just right of the bar's right end. (Match the source art's spacing: note the slightly tight `EXPAND|` join.)
- Use the attached PNGs (`1000070387.png` navy-on-white, `1000070389.png` white-on-dark, `1000070391.png` black-on-white) as the authoritative reference for proportions and the bar+tagline lockup.
