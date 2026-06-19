"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Theme = "light" | "dark";

const TAGLINE = "ELEVATE  |  EXPAND  |  EXCEL";

const THEMES: Record<
  Theme,
  { ink: string; outline: string; bar: string; tag: string }
> = {
  light: {
    ink: "#0a3165",
    outline: "rgba(10,49,101,.22)",
    bar: "#0a3165",
    tag: "rgba(10,49,101,.72)",
  },
  dark: {
    ink: "#f5e1c8",
    outline: "rgba(245,225,200,.24)",
    bar: "#f5e1c8",
    tag: "rgba(245,225,200,.7)",
  },
};

const LETTERS = ["V", "I", "N", "I", "K", "A"];

/**
 * VINIKA Reveal — the brand intro loader (ported from the "VINIKA Reveal.dc.html"
 * Claude Design canvas). The wordmark fills bottom→top like a loading meter, a
 * ruled bar strikes in, the tagline staggers in, and a gold sheen sweeps across.
 * Calls `onComplete` when the intro timeline finishes.
 */
export default function VinikaReveal({
  theme = "dark",
  accent = "#e0a045",
  speed = 1,
  onComplete,
}: {
  theme?: Theme;
  accent?: string;
  speed?: number;
  onComplete?: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const tagUnderRef = useRef<HTMLDivElement>(null);
  const replayRef = useRef<HTMLButtonElement>(null);
  const playRef = useRef<() => void>(() => {});

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const T = THEMES[theme];
    stage.style.setProperty("--vk-ink", T.ink);
    stage.style.setProperty("--vk-outline", T.outline);
    stage.style.setProperty("--vk-bar", T.bar);
    stage.style.setProperty("--vk-tag", T.tag);
    stage.style.setProperty("--vk-accent", accent);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const layout = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const lw = 752;
      const lh = 280;
      const s = Math.min((W * 0.86) / lw, (H * 0.78) / lh, 1.15);
      if (scaleRef.current)
        scaleRef.current.style.transform = "scale(" + s + ")";
    };
    layout();
    window.addEventListener("resize", layout);

    const tagChars = Array.from(
      tagRef.current?.children || []
    ).filter((c) => (c.textContent || "").trim() !== "") as HTMLElement[];

    const idleCalls: gsap.core.Tween[] = [];
    let idleBreathe: gsap.core.Tween | null = null;
    let tl: gsap.core.Timeline | null = null;

    const clearIdle = () => {
      idleBreathe?.kill();
      idleCalls.forEach((c) => c.kill());
      idleCalls.length = 0;
    };

    const sweep = (k: number, glow: boolean) => {
      const t = gsap.timeline();
      t.set(sheenRef.current, { opacity: 1, backgroundPosition: "150% 0" })
        .to(sheenRef.current, {
          backgroundPosition: "-60% 0",
          duration: 0.9 * k,
          ease: "power2.inOut",
        })
        .to(
          sheenRef.current,
          { opacity: 0, duration: 0.3 * k, ease: "power1.out" },
          ">-0.18"
        );
      if (glow) {
        t.fromTo(
          wordRef.current,
          { filter: "drop-shadow(0 0 0px rgba(224,160,69,0))" },
          {
            filter: "drop-shadow(0 0 9px rgba(224,160,69,.45))",
            duration: 0.45 * k,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
          },
          0.15 * k
        );
      }
      return t;
    };

    const startIdle = () => {
      clearIdle();
      idleBreathe = gsap.to(lockRef.current, {
        scale: 1.012,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      const loop = () => {
        sweep(1, false);
        idleCalls.push(gsap.delayedCall(7, loop));
      };
      idleCalls.push(gsap.delayedCall(7, loop));
    };

    let completed = false;
    const fireComplete = () => {
      if (completed) return;
      completed = true;
      onComplete?.();
    };

    const play = () => {
      tl?.kill();
      clearIdle();
      const k = 1 / (speed || 1);

      gsap.set(stage, { opacity: 0 });
      gsap.set(wordRef.current, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(barRef.current, { scaleX: 0 });
      gsap.set(lockRef.current, { scale: 1 });
      gsap.set(tagChars, { opacity: 0, x: -12 });
      gsap.set(tagUnderRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(sheenRef.current, { opacity: 0, backgroundPosition: "150% 0" });
      gsap.set(replayRef.current, { opacity: 0 });

      if (reduce) {
        gsap.set(stage, { opacity: 1 });
        gsap.set(wordRef.current, { clipPath: "inset(0% 0 0 0)" });
        gsap.set(barRef.current, { scaleX: 1 });
        gsap.set(tagChars, { opacity: 1, x: 0 });
        gsap.set(replayRef.current, { opacity: 0.55 });
        fireComplete();
        return;
      }

      tl = gsap.timeline({
        onComplete: () => {
          fireComplete();
          gsap.to(replayRef.current, { opacity: 0.55, duration: 0.6 });
          startIdle();
        },
      });
      tl.to(
        stage,
        { opacity: 1, duration: 0.4 * k, ease: "power2.out" },
        0
      )
        .to(
          wordRef.current,
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.7 * k,
            ease: "power2.inOut",
          },
          0.3 * k
        )
        .to(
          barRef.current,
          { scaleX: 1, duration: 0.6 * k, ease: "power4.out" },
          1.5 * k
        )
        .to(
          tagChars,
          {
            opacity: 1,
            x: 0,
            duration: 0.48 * k,
            ease: "power3.out",
            stagger: 0.022 * k,
          },
          1.9 * k
        )
        .add(sweep(k, true), 2.4 * k)
        .to(
          barRef.current,
          {
            backgroundColor: accent,
            duration: 0.32 * k,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
          },
          2.5 * k
        )
        .fromTo(
          tagUnderRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5 * k, ease: "power2.out" },
          2.6 * k
        )
        .to(
          tagUnderRef.current,
          { opacity: 0.32, duration: 0.7 * k, ease: "power1.out" },
          ">-0.1"
        );
    };
    playRef.current = play;

    // GSAP is bundled, so play immediately on next frame.
    const raf = requestAnimationFrame(play);

    // pointer parallax
    let qx: ((v: number) => void) | undefined;
    let qy: ((v: number) => void) | undefined;
    const onMove = (e: PointerEvent) => {
      if (reduce) return;
      if (!qx && tiltRef.current) {
        qx = gsap.quickTo(tiltRef.current, "rotationY", {
          duration: 0.7,
          ease: "power3.out",
        });
        qy = gsap.quickTo(tiltRef.current, "rotationX", {
          duration: 0.7,
          ease: "power3.out",
        });
      }
      if (!qx || !qy) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      qx(nx * 6);
      qy(-ny * 6);
    };
    window.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      tl?.kill();
      clearIdle();
      window.removeEventListener("resize", layout);
      window.removeEventListener("pointermove", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wordFont: React.CSSProperties = {
    display: "flex",
    gap: 30,
    alignItems: "flex-end",
    fontFamily: "'Anton','Arial Narrow',Impact,sans-serif",
    fontWeight: 400,
    fontSize: 172,
    lineHeight: 0.86,
  };

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label="VINIKA — Elevate, Expand, Excel"
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        perspective: "900px",
        opacity: 0,
        background: "transparent",
        fontFamily: "'Space Grotesk',Arial,sans-serif",
      }}
    >
      <div
        ref={tiltRef}
        style={{ position: "relative", transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <div ref={scaleRef} style={{ transformOrigin: "center center" }}>
          <div
            ref={lockRef}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              willChange: "transform",
            }}
          >
            <div style={{ position: "relative" }}>
              {/* outline (empty meter) */}
              <div
                ref={outlineRef}
                aria-hidden
                style={{
                  ...wordFont,
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "2px var(--vk-outline,rgba(10,49,101,.22))",
                }}
              >
                {LETTERS.map((l, i) => (
                  <span key={i} style={{ display: "inline-block" }}>
                    {l}
                  </span>
                ))}
              </div>
              {/* color fill rising bottom -> top */}
              <div
                ref={wordRef}
                style={{
                  ...wordFont,
                  position: "absolute",
                  inset: 0,
                  color: "var(--vk-ink,#0a3165)",
                  clipPath: "inset(100% 0 0 0)",
                  willChange: "clip-path",
                }}
              >
                {LETTERS.map((l, i) => (
                  <span key={i} style={{ display: "inline-block" }}>
                    {l}
                  </span>
                ))}
              </div>
              {/* gold sheen */}
              <div
                ref={sheenRef}
                aria-hidden
                style={{
                  ...wordFont,
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  opacity: 0,
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "250% 100%",
                  backgroundPosition: "150% 0",
                  mixBlendMode: "screen",
                  backgroundImage:
                    "linear-gradient(105deg, transparent 38%, var(--vk-accent,#e0a045) 48%, #fff7ec 52%, var(--vk-accent,#e0a045) 56%, transparent 64%)",
                }}
              >
                {LETTERS.map((l, i) => (
                  <span key={i} style={{ display: "inline-block" }}>
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "flex-end",
                gap: 22,
                marginTop: 26,
              }}
            >
              <div
                ref={barRef}
                style={{
                  flex: "0 0 auto",
                  width: "45%",
                  height: 15,
                  background: "var(--vk-bar,#0a3165)",
                  transform: "scaleX(0)",
                  transformOrigin: "left center",
                  willChange: "transform",
                }}
              />
              <div style={{ position: "relative", paddingBottom: 2 }}>
                <div
                  ref={tagRef}
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 600,
                    fontSize: 23,
                    letterSpacing: ".28em",
                    whiteSpace: "nowrap",
                    color: "var(--vk-tag,rgba(10,49,101,.72))",
                  }}
                >
                  {TAGLINE.split("").map((ch, i) => (
                    <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
                      {ch}
                    </span>
                  ))}
                </div>
                <div
                  ref={tagUnderRef}
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -7,
                    height: 2,
                    background: "var(--vk-accent,#e0a045)",
                    transform: "scaleX(0)",
                    transformOrigin: "left center",
                    opacity: 0,
                    boxShadow: "0 0 8px var(--vk-accent,#e0a045)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        ref={replayRef}
        onClick={() => playRef.current()}
        aria-label="Replay"
        style={{
          position: "absolute",
          right: 22,
          bottom: 20,
          width: 34,
          height: 34,
          display: "grid",
          placeItems: "center",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          opacity: 0,
          transition: "opacity .3s, background .2s",
          background: theme === "dark" ? "rgba(245,225,200,.08)" : "rgba(10,49,101,.08)",
          color: "var(--vk-ink,#0a3165)",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 3-6.7"></path>
          <path d="M3 4v4h4"></path>
        </svg>
      </button>
    </div>
  );
}
