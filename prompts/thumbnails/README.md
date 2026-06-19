# Vinika — Nano Banana Thumbnail Prompts

Production-ready image-generation prompts for **Nano Banana** (Google Gemini 2.5 Flash Image).
These generate the photography thumbnails for the Vinika website. They are PHOTOGRAPHY prompts —
the VINIKA logo/wordmark must **never** appear inside any generated image.

Brand: **Vinika** — a forward-thinking business consultancy for startups, SMEs and scaling
companies. Voice: confident, editorial, premium, human. Tagline: **Elevate · Expand · Excel.**
Aesthetic: cinematic / editorial-brutalist — huge condensed display type (used in the page layout,
not in the photos), generous negative space, smooth motion.

---

## How to use these prompts with Nano Banana

1. **Open** the Gemini app / Google AI Studio / the Gemini API "Nano Banana" (Gemini 2.5 Flash Image) model.
2. **Paste one full prompt variant** (a single `Variant` block from a file below). Each variant is a
   complete natural-language description — Nano Banana rewards rich, descriptive prose over keyword soup.
3. **Set / state the aspect ratio.** The target ratio is written into every prompt sentence. If your
   interface has an explicit aspect-ratio control, also set it there to match (4:5, 3:4, 4:3, etc.).
4. **Generate 2–4 candidates**, then pick the strongest. Use the variants provided to get coverage.
5. **Iterate conversationally.** Nano Banana supports refinement — e.g. "same image, more negative
   space top-left", "warmer amber highlights", "make the color grade cooler in the shadows",
   "remove the laptop", "different person, same lighting and grade". Keep the **House Style block**
   pinned so the look stays consistent across edits.
6. **Keep people real and diverse.** If a result looks like cheesy stock photography, re-prompt with
   "candid, unposed, documentary editorial, natural skin texture, no eye contact with camera".
7. **Never bake in text/logos.** If the model adds signage, slides with words, or watermarks, re-prompt
   with the negative clause and add "blank/unreadable surfaces, no legible text".
8. **Export** at the highest available resolution. Downstream the site crops to the ratios above.

> Tip: To keep the 14-cell results strip cohesive, generate every cell from the **same House Style
> block + Portrait Recipe**, only swapping the subject sentence. Same grade, same lighting, same lens.

---

## House Style block (reusable — paste into / keep pinned for every prompt)

> **HOUSE STYLE (Vinika):** Cinematic editorial photograph, premium business-consultancy brand
> imagery. Shot on a full-frame camera with a fast prime lens, shallow but controlled depth of field,
> gentle filmic grain, true-to-life natural skin texture. Lighting is soft, natural and directional —
> large window light or overcast daylight, never harsh on-camera flash. **Color grade:** desaturated,
> muted editorial palette pulled from the Vinika system — deep navy shadows (`#07254c` / `#0a3165`),
> near-black ink blacks (`#0a0f1a`), warm cream and amber highlights (`#f5e1c8` / `#e0a045`), with
> occasional muted teal (`#3f7d86`), maroon (`#7a1f2b`) and mist blue-grey (`#b9c6d0`) accents.
> Mids are restrained and slightly cool; highlights are warm. Real, diverse, modern people; candid and
> human, not posed stock. Confident, calm, aspirational, premium mood. Clean composition with
> intentional negative space. **Avoid:** visible text, logos, wordmarks, watermarks, UI overlays,
> distorted or extra hands/fingers, plastic AI skin, oversaturated or neon colors, HDR halos, harsh
> direct flash, busy clutter, cheesy stock-photo posing, eye-contact mugging, tilt-shift toy look.

Every individual prompt file references this block. You can prepend the House Style block to any
variant, or rely on the condensed grade/lighting lines already embedded in each variant.

---

## File → site slot mapping

| Prompt file        | Site slot id(s)                                  | Aspect | What it is |
|--------------------|--------------------------------------------------|--------|------------|
| `approach.md`      | `vk-approach`                                     | 4:5    | "How Vinika works" hero still (pairs with amber circle + play button) |
| `story.md`         | `vk-story`                                        | 3:4    | "Our Story" team / founder portrait |
| `method-cards.md`  | `vk-method-0`, `vk-method-1`, `vk-method-2`       | 3:4    | Three floating deliverable document cards (maroon section) |
| `insights.md`      | `vk-insight-0`, `vk-insight-1`, `vk-insight-2`    | 4:3    | Journal headers — Strategy / Brand / Operations |
| `results-strip.md` | `vk-strip-0` … `vk-strip-13` (14 cells)           | 4:5    | Scrolling strip of founder/team/client portraits & workplace moments |

### Suggested generated-filename convention

Save the picked render for each slot under its slot id so the dev can drop them straight in:

```
vk-approach.jpg
vk-story.jpg
vk-method-0.jpg   vk-method-1.jpg   vk-method-2.jpg
vk-insight-0.jpg  vk-insight-1.jpg  vk-insight-2.jpg
vk-strip-0.jpg … vk-strip-13.jpg
```

---

## Consistency checklist (apply to the whole set before shipping)

- [ ] Same color grade everywhere: navy/ink shadows, cream/amber highlights, muted cool mids.
- [ ] Same lighting language: soft natural/window light, no flash.
- [ ] Same lens feel: full-frame prime, shallow-but-controlled DoF, subtle film grain.
- [ ] Diverse, real, candid people; no stock posing or camera mugging.
- [ ] No text, slides-with-words, logos, or watermarks anywhere.
- [ ] `vk-approach` keeps calm negative space (room for amber circle + play button).
- [ ] All 14 strip cells read as one shoot (same recipe, varied subjects).
