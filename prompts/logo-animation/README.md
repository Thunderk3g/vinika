# VINIKA — Logo Animation Prompt

This folder holds a ready-to-use creative brief for generating an **animated VINIKA logo reveal** in [Claude Design](https://claude.ai/design).

## Files
- **`vinika-logo-animation.prompt.md`** — the brief. The top block (`⬛ PASTE-READY PROMPT`) is the copy-paste request; everything below it is the detailed spec for refinement.

## How to use
1. Open [claude.ai/design](https://claude.ai/design).
2. Copy the **PASTE-READY PROMPT** block from `vinika-logo-animation.prompt.md` and paste it as your first message.
3. **Attach the logo PNGs** from `../../assets/` so Claude Design matches the real mark:
   - `1000070387.png` — navy on white
   - `1000070389.png` — white (for dark backgrounds)
   - `1000070391.png` — black on white
4. Let it generate the self-contained animated `.dc.html`.
5. **Iterate.** Reference the DETAILED SPEC sections by number, e.g.:
   - "Make Beat E (the gold sheen) slower and add the chromatic edge glow."
   - "Switch to the Light Editorial variant (section 7B)."
   - "Tune `speed` to 0.66 for the 2.8s preloader and wire `onComplete`."

## What it produces
A cinematic navy-on-cream logo reveal: VINIKA rises letter-by-letter out of soft blur, a ruled bar is struck beneath it, the `ELEVATE | EXPAND | EXCEL` tagline slides in, a single gold sheen sweeps the letters, then it settles into a breathing idle loop with drifting particles and pointer parallax. Doubles as a 2.8s website preloader and exports as a clean looping brand bumper.

## Brand quick-reference
- **Palette:** navy `#0a3165`, deep navy `#07254c`, ink `#0a0f1a`, cream `#f5e1c8`, amber/gold `#e0a045`, teal `#3f7d86`, maroon `#7a1f2b`, mist `#b9c6d0`.
- **Fonts:** Anton (display/wordmark), Space Grotesk (text/tagline).
- **Tagline:** Elevate · Expand · Excel.
