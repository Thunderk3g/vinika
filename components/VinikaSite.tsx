"use client";

import {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ImageSlot from "./ImageSlot";
import {
  about,
  articles,
  faqs,
  methodSpecs,
  services,
  steps,
  type Accordion,
} from "@/lib/content";

const anton: CSSProperties = {
  fontFamily: "'Anton', sans-serif",
  fontWeight: 400,
  textTransform: "uppercase",
};

const PAD = "clamp(18px,3.5vw,46px)";

/* ---------------- Accordion (about / faq) ---------------- */
function AccordionList({
  items,
  openFirst,
}: {
  items: Accordion[];
  openFirst?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(openFirst ? 0 : null);
  return (
    <div>
      {items.map((it, i) => (
        <div
          key={it.q}
          data-reveal
          className={"vk-acc-row" + (open === i ? " open" : "")}
        >
          <button
            className="vk-ah"
            data-cursor
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="vk-ah-title">{it.q}</span>
            <span className="vk-pm">{open === i ? "–" : "+"}</span>
          </button>
          <div className="vk-ac">
            <p>{it.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function VinikaSite() {
  const rootRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  /* ---------------- Mobile menu link nav ---------------- */
  const menuNav = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const t = document.querySelector(href);
    lenisRef.current?.start();
    if (t) {
      setTimeout(() => {
        try {
          lenisRef.current?.scrollTo(t as HTMLElement, {
            offset: 0,
            duration: 1.2,
          });
        } catch {
          (t as HTMLElement).scrollIntoView();
        }
      }, 420);
    }
  }, []);

  useEffect(() => {
    if (menuOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [menuOpen]);

  /* ---------------- Form submit ---------------- */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = successRef.current;
    if (s) {
      s.style.visibility = "visible";
      requestAnimationFrame(() => (s.style.opacity = "1"));
    }
  };

  /* ---------------- Motion engine ---------------- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let pending: HTMLElement[] = [];
    let drifters: { el: HTMLElement; amt: number }[] = [];
    let theme = "";
    let vel = 0;
    let velSmooth = 0;
    let marqX = 0;
    let stripX = 0;
    let lastY = 0;
    const cursor = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      rx: window.innerWidth / 2,
      ry: window.innerHeight / 2,
    };
    let raf = 0;
    let lraf = 0;
    let revInt = 0;

    const hideLoader = () =>
      loaderRef.current?.classList.add("vk-hide-loader");
    const loadFb = setTimeout(hideLoader, 2800);

    const countUp = (el: HTMLElement) => {
      if ((el as any).__d) return;
      (el as any).__d = true;
      const target = parseInt(el.getAttribute("data-count") || "0", 10) || 0;
      const o = { v: 0 };
      gsap.to(o, {
        v: target,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => (el.textContent = String(Math.round(o.v))),
      });
    };

    const checkReveals = () => {
      if (!pending.length) return;
      const vh = window.innerHeight;
      const still: HTMLElement[] = [];
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) {
          if (el.hasAttribute("data-line"))
            gsap.to(el, { scaleX: 1, duration: 1.25, ease: "power3.inOut" });
          else if (el.hasAttribute("data-rise"))
            gsap.to(el, { yPercent: 0, duration: 1.15, ease: "power4.out" });
          else gsap.to(el, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" });
          el.querySelectorAll("[data-count]").forEach((c) =>
            countUp(c as HTMLElement)
          );
        } else still.push(el);
      });
      pending = still;
    };

    const updateTheme = () => {
      let t = "dark";
      root.querySelectorAll("[data-theme]").forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= 70 && r.bottom > 70) t = s.getAttribute("data-theme") || t;
      });
      if (t === theme) return;
      theme = t;
      const dark = t === "dark";
      if (logoRef.current)
        logoRef.current.src = dark
          ? "/assets/logo-white.png"
          : "/assets/logo-b.png";
      if (navLinksRef.current)
        navLinksRef.current.style.color = dark ? "#fff" : "var(--navy)";
      if (burgerRef.current)
        burgerRef.current.style.color = dark ? "#fff" : "var(--navy)";
    };

    /* reveals initial state */
    root
      .querySelectorAll("[data-rise]")
      .forEach((el) => gsap.set(el, { yPercent: 118 }));
    root
      .querySelectorAll("[data-reveal]")
      .forEach((el) => gsap.set(el, { opacity: 0, y: 40 }));
    root
      .querySelectorAll("[data-line]")
      .forEach((el) =>
        gsap.set(el, { scaleX: 0, transformOrigin: "left center" })
      );
    pending = Array.from(
      root.querySelectorAll("[data-rise],[data-reveal],[data-line]")
    ) as HTMLElement[];
    drifters = (
      Array.from(root.querySelectorAll("[data-drift]")) as HTMLElement[]
    ).map((el) => ({
      el,
      amt: parseFloat(el.getAttribute("data-drift") || "0") || 0,
    }));
    checkReveals();
    let n = 0;
    revInt = window.setInterval(() => {
      checkReveals();
      if (++n > 60 || pending.length === 0) clearInterval(revInt);
    }, 120);

    /* lenis smooth scroll */
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, lerp: 0.085 });
    lenisRef.current = lenis;
    const lenisRaf = (t: number) => {
      lenis.raf(t);
      lraf = requestAnimationFrame(lenisRaf);
    };
    lraf = requestAnimationFrame(lenisRaf);

    const nav = navRef.current!;
    const cta = ctaRef.current!;
    lenis.on("scroll", ({ scroll, velocity }: any) => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollP = scroll / max;
      if (typeof velocity === "number") vel = velocity;
      if (progressRef.current)
        progressRef.current.style.width = scrollP * 100 + "%";
      if (scroll > window.innerHeight * 0.7) {
        cta.style.opacity = "1";
        cta.style.transform = "translateY(0)";
      } else {
        cta.style.opacity = "0";
        cta.style.transform = "translateY(20px)";
      }
      nav.style.transform =
        scroll > lastY && scroll > 460 ? "translateY(-120%)" : "translateY(0)";
      lastY = scroll;
      checkReveals();
      updateTheme();
    });

    /* anchor smooth scroll (excludes mobile-menu links — handled in React) */
    const onAnchor = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const id = a.getAttribute("href") || "";
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (t) {
        e.preventDefault();
        lenis.scrollTo(t as HTMLElement, { offset: 0, duration: 1.4 });
      }
    };
    root.querySelectorAll('a[href^="#"]').forEach((a) => {
      if (a.hasAttribute("data-vk-menulink")) return;
      a.addEventListener("click", onAnchor);
    });

    /* custom cursor */
    const ring = ringRef.current;
    const dot = dotRef.current;
    const grow = () => {
      if (!ring) return;
      ring.style.width = "58px";
      ring.style.height = "58px";
      ring.style.background = "rgba(255,255,255,.12)";
    };
    const reset = () => {
      if (!ring) return;
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.background = "transparent";
    };
    const bind = () =>
      root
        .querySelectorAll("[data-cursor],a,button,input,textarea")
        .forEach((el) => {
          if ((el as any).__c) return;
          (el as any).__c = true;
          el.addEventListener("mouseenter", grow);
          el.addEventListener("mouseleave", reset);
        });
    bind();
    const rebindT = setTimeout(bind, 900);
    root.querySelectorAll("[data-magnetic]").forEach((el) => {
      const m = el as HTMLElement;
      m.addEventListener("mousemove", (e) => {
        const ev = e as MouseEvent;
        const r = m.getBoundingClientRect();
        m.style.transform =
          "translate(" +
          (ev.clientX - (r.left + r.width / 2)) * 0.25 +
          "px," +
          (ev.clientY - (r.top + r.height / 2)) * 0.4 +
          "px)";
      });
      m.addEventListener(
        "mouseenter",
        () => (m.style.transition = "transform .1s")
      );
      m.addEventListener("mouseleave", () => {
        m.style.transition = "transform .5s cubic-bezier(.2,.8,.2,1)";
        m.style.transform = "translate(0,0)";
      });
    });

    const onMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };
    addEventListener("mousemove", onMove);

    updateTheme();
    setTimeout(hideLoader, 1500);

    /* render loop */
    const lp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      velSmooth = lp(velSmooth, vel, 0.12);
      vel *= 0.9;
      const vC = Math.max(-40, Math.min(40, velSmooth));

      if (marqueeRef.current) {
        const half = marqueeRef.current.scrollWidth / 2 || 1;
        marqX -= 0.6 + vC * 0.1;
        if (marqX <= -half) marqX += half;
        if (marqX > 0) marqX -= half;
        marqueeRef.current.style.transform = "translateX(" + marqX + "px)";
      }
      if (stripRef.current) {
        const sw = stripRef.current.scrollWidth / 2 || 1;
        stripX += 0.5 + vC * 0.08;
        if (stripX >= 0) stripX -= sw;
        if (stripX < -sw) stripX += sw;
        stripRef.current.style.transform = "translateX(" + stripX + "px)";
      }
      const vh = window.innerHeight;
      drifters.forEach((d) => {
        const r = d.el.getBoundingClientRect();
        const prog = 1 - (r.top + r.height / 2) / (vh + r.height);
        const x = (prog - 0.5) * 2 * d.amt;
        d.el.style.transform = "translateX(" + x + "px)";
      });
      cursor.rx = lp(cursor.rx, cursor.x, 0.2);
      cursor.ry = lp(cursor.ry, cursor.y, 0.2);
      if (dot)
        dot.style.transform =
          "translate(" + cursor.x + "px," + cursor.y + "px) translate(-50%,-50%)";
      if (ring)
        ring.style.transform =
          "translate(" +
          cursor.rx +
          "px," +
          cursor.ry +
          "px) translate(-50%,-50%)";
    };
    tick();

    return () => {
      clearInterval(revInt);
      clearTimeout(loadFb);
      clearTimeout(rebindT);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(lraf);
      try {
        lenis.destroy();
      } catch {}
      removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        width: "100%",
        background: "var(--navy)",
        fontFamily: "'Space Grotesk', sans-serif",
        color: "#0a0f1a",
        overflowX: "clip",
        cursor: "none",
      }}
    >
      {/* LOADER */}
      <div
        ref={loaderRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "var(--navy)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          transition: "opacity .55s ease",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logo-white.png"
          alt="Vinika"
          style={{
            height: "clamp(26px,4.6vw,44px)",
            width: "auto",
            opacity: 0,
            animation: "vk-loadfade .8s ease forwards",
          }}
        />
        <div
          style={{
            height: 4,
            background: "var(--amber)",
            width: 0,
            animation: "vk-loadbar 1.3s cubic-bezier(.66,0,.2,1) .15s forwards",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: "10.5px",
            letterSpacing: ".34em",
            textTransform: "uppercase",
            color: "rgba(245,225,200,.7)",
            opacity: 0,
            animation: "vk-loadfade .8s ease .5s forwards",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--amber)",
              animation: "vk-loaddot 1.1s ease-in-out infinite",
            }}
          />
          Elevate · Expand · Excel
        </div>
      </div>

      {/* CURSOR */}
      <div
        ref={ringRef}
        className="vk-desk vk-cursor-only"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          border: "1.4px solid #fff",
          borderRadius: "50%",
          zIndex: 120,
          pointerEvents: "none",
          transform: "translate(-50%,-50%)",
          mixBlendMode: "difference",
          transition:
            "width .28s cubic-bezier(.2,.8,.2,1),height .28s cubic-bezier(.2,.8,.2,1),background .28s",
        }}
      />
      <div
        ref={dotRef}
        className="vk-desk vk-cursor-only"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          background: "#fff",
          borderRadius: "50%",
          zIndex: 121,
          pointerEvents: "none",
          transform: "translate(-50%,-50%)",
          mixBlendMode: "difference",
        }}
      />

      {/* PROGRESS */}
      <div
        ref={progressRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          width: "0%",
          background: "var(--amber)",
          zIndex: 110,
        }}
      />

      {/* NAV */}
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `20px ${PAD}`,
          transition:
            "transform .5s cubic-bezier(.2,.8,.2,1),background .4s,padding .4s",
        }}
      >
        <a
          href="#top"
          data-cursor
          data-magnetic
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={logoRef}
            src="/assets/logo-white.png"
            alt="Vinika"
            style={{ height: 26, width: "auto", display: "block" }}
          />
        </a>
        <div
          ref={navLinksRef}
          className="vk-desk"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            fontSize: 13,
            letterSpacing: ".02em",
            color: "#fff",
          }}
        >
          {[
            ["#approach", "Approach"],
            ["#services", "Services"],
            ["#process", "Process"],
            ["#story", "About"],
            ["#insights", "Insights"],
            ["#contact", "Contact"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              data-cursor
              data-navlink
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {label}
            </a>
          ))}
        </div>
        <button
          ref={burgerRef}
          className="vk-burger"
          data-cursor
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "transparent",
            border: "none",
            cursor: "none",
            padding: 8,
            color: "#fff",
          }}
        >
          <span style={{ display: "block", width: 24, height: 2, background: "currentColor" }} />
          <span style={{ display: "block", width: 24, height: 2, background: "currentColor" }} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 115,
          background: "var(--navy)",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform .6s cubic-bezier(.76,0,.24,1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          padding: `0 ${PAD}`,
        }}
      >
        <button
          data-cursor
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            top: 22,
            right: PAD,
            background: "transparent",
            border: "none",
            color: "var(--cream)",
            fontSize: 32,
            lineHeight: 1,
            cursor: "none",
          }}
        >
          ×
        </button>
        {[
          ["#approach", "Approach", "var(--cream)"],
          ["#services", "Services", "var(--cream)"],
          ["#process", "Process", "var(--cream)"],
          ["#story", "About", "var(--cream)"],
          ["#insights", "Insights", "var(--cream)"],
          ["#faq", "FAQs", "var(--cream)"],
          ["#contact", "Contact", "var(--amber)"],
        ].map(([href, label, color]) => (
          <a
            key={href}
            href={href}
            data-vk-menulink
            onClick={(e) => menuNav(e, href)}
            style={{
              ...anton,
              fontSize: "clamp(2rem,9vw,3.4rem)",
              color,
              textDecoration: "none",
              lineHeight: 1.08,
            }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* STICKY CTA */}
      <a
        ref={ctaRef}
        href="#contact"
        data-cursor
        data-magnetic
        style={{
          position: "fixed",
          right: "clamp(14px,2.5vw,28px)",
          bottom: "clamp(14px,2.5vw,28px)",
          zIndex: 105,
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          background: "#0a0f1a",
          color: "#fff",
          textDecoration: "none",
          padding: "14px 16px 14px 22px",
          borderRadius: 2,
          fontSize: "13.5px",
          fontWeight: 500,
          letterSpacing: ".02em",
          boxShadow: "0 14px 40px rgba(0,0,0,.35)",
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity .5s,transform .5s",
        }}
      >
        Start a project{" "}
        <span
          style={{
            display: "inline-flex",
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,.35)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
          }}
        >
          ↗
        </span>
      </a>

      <main style={{ position: "relative", zIndex: 10 }}>
        {/* HERO */}
        <section
          id="top"
          data-theme="dark"
          style={{
            position: "relative",
            minHeight: "100vh",
            background: "var(--navy)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: `110px ${PAD} 150px`,
            overflow: "hidden",
          }}
        >
          <div
            data-reveal
            style={{
              position: "absolute",
              top: 96,
              left: PAD,
              fontSize: 12,
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "rgba(245,225,200,.7)",
            }}
          >
            Business Consulting
          </div>
          <div
            data-line
            className="vk-desk"
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: "100%",
              height: 2,
              background:
                "linear-gradient(90deg,rgba(245,225,200,0),rgba(245,225,200,.32) 12%,rgba(224,160,69,.55) 88%,rgba(224,160,69,0))",
              transform: "scaleX(0)",
              transformOrigin: "left center",
              zIndex: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(8px,2.2vh,40px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {[
              ["Elevate", "55", "var(--cream)", "0"],
              ["Expand", "-55", "var(--amber)", "auto"],
              ["Excel", "40", "var(--cream)", "0"],
            ].map(([word, drift, color, ml]) => (
              <div key={word} style={{ overflow: "hidden" }}>
                <h1
                  data-rise
                  data-drift={drift}
                  className="vk-huge"
                  style={{
                    ...anton,
                    lineHeight: 0.82,
                    letterSpacing: "-.005em",
                    margin: 0,
                    color,
                    fontSize: "clamp(2.7rem,12.5vw,13rem)",
                    width: "max-content",
                    marginLeft: ml === "auto" ? "auto" : 0,
                  }}
                >
                  {word}
                </h1>
              </div>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              left: PAD,
              bottom: 46,
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "rgba(245,225,200,.65)",
            }}
          >
            <span
              style={{
                width: 1,
                height: 30,
                background: "rgba(245,225,200,.5)",
                display: "inline-block",
                animation: "vk-bob 1.8s ease-in-out infinite",
              }}
            />
            Scroll
          </div>
          <p
            data-reveal
            className="vk-heroP"
            style={{
              position: "absolute",
              right: PAD,
              bottom: 50,
              maxWidth: "34ch",
              textAlign: "right",
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(245,241,234,.82)",
              margin: 0,
            }}
          >
            Vinika is a forward-thinking business consultancy helping startups,
            SMEs and scaling companies build brands that connect, grow and last.
          </p>
        </section>

        {/* MARQUEE */}
        <div
          data-theme="dark"
          style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--ink)",
            padding: "18px 0",
            borderTop: "1px solid rgba(245,225,200,.12)",
            borderBottom: "1px solid rgba(245,225,200,.12)",
          }}
        >
          <div
            ref={marqueeRef}
            style={{ display: "flex", width: "max-content", willChange: "transform" }}
          >
            {[0, 1].map((k) => (
              <div
                key={k}
                aria-hidden={k === 1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 26,
                  paddingRight: 26,
                  ...anton,
                  fontSize: "clamp(1.3rem,2.5vw,2rem)",
                  letterSpacing: ".01em",
                  color: "var(--cream)",
                  whiteSpace: "nowrap",
                }}
              >
                {["Strategy", "Brand", "Growth", "Innovation", "Transformation"].map(
                  (w) => (
                    <span key={w} style={{ display: "contents" }}>
                      <span>{w}</span>
                      <span style={{ color: "var(--amber)" }}>◆</span>
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* APPROACH */}
        <section
          id="approach"
          data-theme="light"
          className="vk-sec-pad"
          style={{
            position: "relative",
            minHeight: "100vh",
            background: "var(--cream)",
            padding: `14vh ${PAD}`,
            overflow: "hidden",
          }}
        >
          <div
            data-line
            style={{
              width: "100%",
              height: 1,
              background: "rgba(10,49,101,.25)",
              transform: "scaleX(0)",
              transformOrigin: "left center",
              marginBottom: "5vh",
            }}
          />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
            <h2
              data-rise
              data-drift="60"
              className="vk-huge"
              style={{
                ...anton,
                lineHeight: 0.84,
                letterSpacing: "-.005em",
                margin: 0,
                color: "var(--navy)",
                fontSize: "clamp(3rem,12.5vw,12.5rem)",
                width: "max-content",
                textAlign: "right",
              }}
            >
              Who we
              <br />
              partner with
            </h2>
          </div>
          <div
            className="vk-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(30px,5vw,70px)",
              alignItems: "center",
              marginTop: "6vh",
            }}
          >
            <div
              data-reveal
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "78%",
                  aspectRatio: "1",
                  borderRadius: "50%",
                  background: "var(--amber)",
                  zIndex: 0,
                }}
              />
              <div
                data-cursor
                data-cursor-label="Play"
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  maxWidth: 440,
                  aspectRatio: "4/5",
                  boxShadow: "0 30px 70px rgba(10,49,101,.25)",
                }}
              >
                <ImageSlot placeholder="Drop a photo or video still" />
                <div
                  style={{
                    position: "absolute",
                    left: 16,
                    bottom: 16,
                    fontSize: 13,
                    lineHeight: 1.3,
                    color: "#fff",
                    textShadow: "0 1px 6px rgba(0,0,0,.5)",
                  }}
                >
                  How Vinika
                  <br />
                  works
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 54,
                    height: 54,
                    background: "rgba(10,15,26,.85)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  ▶
                </div>
              </div>
            </div>
            <div>
              <div
                data-reveal
                style={{
                  ...anton,
                  fontSize: "clamp(1.5rem,2.6vw,2.1rem)",
                  lineHeight: 1.2,
                  color: "var(--navy)",
                }}
              >
                <div>– Startups finding their feet.</div>
                <div>– SMEs ready to scale.</div>
                <div>– Founders building something meaningful.</div>
              </div>
              <p
                data-reveal
                style={{
                  margin: "30px 0 0",
                  fontSize: "clamp(1.2rem,2vw,1.7rem)",
                  lineHeight: 1.35,
                  color: "var(--navy)",
                  maxWidth: "26ch",
                }}
              >
                Strategy should feel clear, not complicated — we work as an
                extension of your team to turn understanding into momentum.
              </p>
            </div>
          </div>
        </section>

        {/* METHOD */}
        <section
          data-theme="dark"
          style={{
            position: "relative",
            minHeight: "100vh",
            background: "var(--maroon)",
            padding: `14vh ${PAD}`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            data-rise
            data-drift="-80"
            className="vk-huge"
            style={{
              ...anton,
              lineHeight: 0.82,
              letterSpacing: "-.01em",
              margin: 0,
              color: "var(--cream)",
              fontSize: "clamp(3.4rem,16vw,16rem)",
              width: "max-content",
            }}
          >
            The Method
          </h2>
          <div
            data-reveal
            className="vk-desk"
            style={{
              position: "relative",
              height: "clamp(260px,34vw,420px)",
              marginTop: "2vh",
            }}
          >
            {methodSpecs.map((s, i) => (
              <div
                key={i}
                data-cursor
                className="vk-method-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "rotate(0deg) translateY(-14px) scale(1.04)";
                  e.currentTarget.style.zIndex = "9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "rotate(" + s[0] + ")";
                  e.currentTarget.style.zIndex = String(i + 1);
                }}
                style={{
                  left: s[1],
                  top: s[2],
                  width: s[3],
                  transform: "rotate(" + s[0] + ")",
                  zIndex: i + 1,
                }}
              >
                <ImageSlot placeholder="Drop a deliverable" bg="rgba(0,0,0,.18)" />
              </div>
            ))}
          </div>
          <div
            data-reveal
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
              marginTop: "5vh",
            }}
          >
            <p
              style={{
                fontSize: "clamp(1.3rem,2.2vw,2rem)",
                lineHeight: 1.3,
                color: "var(--cream)",
                maxWidth: "24ch",
                margin: 0,
              }}
            >
              A clear path from ambition to outcome — designed, built and shipped
              with you.
            </p>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1.8rem",
                  color: "var(--amber)",
                }}
              >
                strategy made tangible
              </span>
              <span style={{ fontSize: "1.6rem", color: "var(--amber)" }}>✶</span>
            </div>
          </div>
          <div
            className="vk-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 18,
              marginTop: "6vh",
            }}
          >
            {[
              ["Diagnose", "We find the real constraint on your growth — fast."],
              ["Design", "A strategy and system built around how you actually operate."],
              ["Deploy", "We ship it with you and stay until it compounds."],
            ].map(([t, d]) => (
              <div
                key={t}
                data-reveal
                style={{
                  borderTop: "1px solid rgba(245,225,200,.3)",
                  paddingTop: 16,
                }}
              >
                <div
                  style={{
                    ...anton,
                    fontSize: "1.4rem",
                    color: "var(--cream)",
                  }}
                >
                  {t}
                </div>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: "13.5px",
                    lineHeight: 1.55,
                    color: "rgba(245,225,200,.75)",
                  }}
                >
                  {d}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* RESULTS */}
        <section
          data-theme="dark"
          style={{
            position: "relative",
            minHeight: "100vh",
            background: "var(--teal)",
            padding: `14vh ${PAD} 0`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2
              data-rise
              data-drift="70"
              className="vk-huge"
              style={{
                ...anton,
                lineHeight: 0.82,
                letterSpacing: "-.01em",
                margin: 0,
                color: "#fff",
                fontSize: "clamp(3.4rem,15.5vw,16rem)",
                width: "max-content",
              }}
            >
              Real Results
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 30,
                marginTop: "5vh",
              }}
            >
              <p
                data-reveal
                style={{
                  fontSize: "clamp(1.3rem,2.2vw,2rem)",
                  lineHeight: 1.3,
                  color: "#fff",
                  maxWidth: "26ch",
                  margin: 0,
                }}
              >
                A growth engine that keeps compounding long after the engagement
                ends.
              </p>
              <p
                data-reveal
                className="vk-desk"
                style={{
                  fontSize: "13.5px",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,.8)",
                  maxWidth: "24ch",
                  textAlign: "right",
                  margin: 0,
                }}
              >
                Already, dozens of founders and teams have scaled their business
                with Vinika.
              </p>
            </div>
            <div
              className="vk-2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 24,
                marginTop: "5vh",
                maxWidth: 760,
              }}
            >
              {[
                [["3", "4"], "average revenue growth", "."],
                [["90"], "brands put into motion", "+"],
                [["12"], "years compounding outcomes", "+"],
              ].map((row, i) => {
                const nums = row[0] as string[];
                const label = row[1] as string;
                const suffix = row[2] as string;
                return (
                  <div key={i} data-reveal>
                    <div
                      style={{
                        ...anton,
                        fontWeight: 400,
                        fontFamily: "'Anton', sans-serif",
                        fontSize: "clamp(2.4rem,5vw,4rem)",
                        color: "#fff",
                        lineHeight: 1,
                      }}
                    >
                      {nums.map((nv, j) => (
                        <span key={j}>
                          <span data-count={nv}>{nv}</span>
                          {j === 0 && nums.length > 1 ? suffix : ""}
                        </span>
                      ))}
                      {nums.length > 1 ? "×" : suffix}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 13,
                        color: "rgba(255,255,255,.8)",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            ref={stripRef}
            style={{
              display: "flex",
              gap: 14,
              width: "max-content",
              padding: "30px 0 36px",
              willChange: "transform",
            }}
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: "none",
                  width: "clamp(150px,16vw,210px)",
                  aspectRatio: "4/5",
                }}
              >
                <ImageSlot placeholder="" bg="rgba(255,255,255,.12)" />
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section
          id="process"
          data-theme="dark"
          style={{
            position: "relative",
            background: "var(--ink)",
            padding: `16vh ${PAD}`,
            overflow: "hidden",
          }}
        >
          <div
            data-line
            style={{
              width: "100%",
              height: 1,
              background: "rgba(245,225,200,.22)",
              transform: "scaleX(0)",
              transformOrigin: "left center",
              marginBottom: "5vh",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
              marginBottom: 30,
            }}
          >
            <h2
              data-rise
              data-drift="-50"
              className="vk-huge"
              style={{
                ...anton,
                lineHeight: 0.84,
                letterSpacing: "-.01em",
                margin: 0,
                color: "var(--cream)",
                fontSize: "clamp(2.8rem,11vw,11rem)",
                width: "max-content",
              }}
            >
              The Process
            </h2>
            <p
              data-reveal
              style={{
                maxWidth: "30ch",
                color: "rgba(245,225,200,.7)",
                fontSize: "14.5px",
                lineHeight: 1.6,
              }}
            >
              Six stages, one continuous motion — each its own environment, all
              connected.
            </p>
          </div>
          <div>
            {steps.map((s) => (
              <div key={s.n} data-reveal data-cursor className="vk-step">
                <div className="vk-step-num">{s.n}</div>
                <div className="vk-step-head">
                  <div>
                    <h3>{s.title}</h3>
                    <div className="vk-step-sub">{s.sub}</div>
                    <p className="vk-d">{s.desc}</p>
                  </div>
                  <span className="vk-ar">↗</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          data-theme="light"
          style={{
            position: "relative",
            background: "var(--cream)",
            padding: `16vh ${PAD}`,
            overflow: "hidden",
          }}
        >
          <div
            data-reveal
            style={{
              fontSize: 12,
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "var(--maroon)",
              marginBottom: 18,
            }}
          >
            ( Capabilities )
          </div>
          <h2
            data-rise
            data-drift="55"
            className="vk-huge"
            style={{
              ...anton,
              lineHeight: 0.84,
              letterSpacing: "-.01em",
              margin: "0 0 5vh",
              color: "var(--navy)",
              fontSize: "clamp(2.8rem,11vw,11rem)",
              width: "max-content",
            }}
          >
            What we do
          </h2>
          <div style={{ borderTop: "1px solid rgba(10,49,101,.22)" }}>
            {services.map((sv, i) => (
              <div key={sv.title} data-reveal data-cursor className="vk-svc">
                <div className="vk-g" />
                <div className="vk-idx">{String(i + 1).padStart(2, "0")}</div>
                <div className="vk-body">
                  <h3 className="vk-t">{sv.title}</h3>
                  <div className="vk-sub">{sv.tagline}</div>
                  <div className="vk-tags">
                    <p>{sv.desc}</p>
                    <p>
                      <span className="vk-best">Best for:</span> {sv.best}
                    </p>
                  </div>
                </div>
                <div className="vk-ar">↗</div>
              </div>
            ))}
          </div>
        </section>

        {/* STORY / ABOUT */}
        <section
          id="story"
          data-theme="light"
          style={{
            position: "relative",
            minHeight: "100vh",
            background: "var(--mist)",
            padding: `14vh ${PAD}`,
            overflow: "hidden",
          }}
        >
          <div
            className="vk-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr .9fr",
              gap: "clamp(30px,5vw,70px)",
              alignItems: "center",
            }}
          >
            <AccordionList items={about} openFirst />
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <h2
                data-rise
                data-drift="90"
                className="vk-huge"
                style={{
                  position: "absolute",
                  right: "-4vw",
                  top: "50%",
                  transform: "translateY(-50%)",
                  ...anton,
                  lineHeight: 0.8,
                  letterSpacing: "-.01em",
                  margin: 0,
                  color: "var(--navy)",
                  fontSize: "clamp(3rem,14vw,14rem)",
                  width: "max-content",
                  zIndex: 0,
                  textAlign: "right",
                  opacity: 0.16,
                }}
              >
                Our
                <br />
                Story
              </h2>
              <div
                data-reveal
                data-cursor
                data-cursor-label="Play"
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  maxWidth: 420,
                  aspectRatio: "3/4",
                  boxShadow: "0 30px 70px rgba(10,49,101,.22)",
                }}
              >
                <ImageSlot placeholder="Drop a team photo" />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 54,
                    height: 54,
                    background: "rgba(10,15,26,.85)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  ▶
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "8%",
                  left: 0,
                  fontSize: "1.6rem",
                  color: "var(--navy)",
                  zIndex: 2,
                }}
              >
                ✶✶
              </div>
            </div>
          </div>
        </section>

        {/* INSIGHTS */}
        <section
          id="insights"
          data-theme="dark"
          style={{
            position: "relative",
            background: "var(--navy)",
            padding: `16vh ${PAD}`,
            overflow: "hidden",
          }}
        >
          <div
            data-line
            style={{
              width: "100%",
              height: 1,
              background: "rgba(245,225,200,.22)",
              transform: "scaleX(0)",
              transformOrigin: "left center",
              marginBottom: "5vh",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
              marginBottom: "6vh",
            }}
          >
            <div>
              <div
                data-reveal
                style={{
                  fontSize: 12,
                  letterSpacing: ".24em",
                  textTransform: "uppercase",
                  color: "var(--amber)",
                  marginBottom: 18,
                }}
              >
                ( Our Blogs )
              </div>
              <div style={{ overflow: "hidden" }}>
                <h2
                  data-rise
                  data-drift="50"
                  className="vk-huge"
                  style={{
                    ...anton,
                    lineHeight: 0.84,
                    letterSpacing: "-.01em",
                    margin: 0,
                    color: "var(--cream)",
                    fontSize: "clamp(2.8rem,11vw,11rem)",
                    width: "max-content",
                  }}
                >
                  Insights
                </h2>
              </div>
            </div>
            <a
              href="#insights"
              data-reveal
              data-cursor
              data-magnetic
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                color: "var(--cream)",
                textDecoration: "none",
                fontSize: "13.5px",
                border: "1px solid rgba(245,225,200,.3)",
                padding: "13px 22px",
                borderRadius: 2,
              }}
            >
              View all articles <span style={{ fontSize: 14 }}>↗</span>
            </a>
          </div>
          <div
            className="vk-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 26,
            }}
          >
            {articles.map((a, i) => (
              <a
                key={a.title}
                href="#insights"
                data-reveal
                data-cursor
                data-cursor-label="Read"
                className="vk-insight"
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4/3",
                    overflow: "hidden",
                  }}
                >
                  <ImageSlot
                    placeholder="Drop article image"
                    bg="rgba(245,225,200,.08)"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 11,
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    color: "var(--amber)",
                  }}
                >
                  <span>{a.cat}</span>
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "rgba(245,225,200,.4)",
                    }}
                  />
                  <span style={{ color: "rgba(245,225,200,.6)" }}>{a.meta}</span>
                </div>
                <h3>{a.title}</h3>
                <span className="vk-rl">
                  Read article <span style={{ fontSize: 13 }}>↗</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          data-theme="light"
          style={{
            position: "relative",
            background: "var(--cream)",
            padding: `16vh ${PAD}`,
            overflow: "hidden",
          }}
        >
          <div
            data-line
            style={{
              width: "100%",
              height: 1,
              background: "rgba(10,49,101,.25)",
              transform: "scaleX(0)",
              transformOrigin: "left center",
              marginBottom: "5vh",
            }}
          />
          <div
            className="vk-2"
            style={{
              display: "grid",
              gridTemplateColumns: ".8fr 1.2fr",
              gap: "clamp(30px,5vw,70px)",
              alignItems: "start",
            }}
          >
            <div>
              <div
                data-reveal
                style={{
                  fontSize: 12,
                  letterSpacing: ".24em",
                  textTransform: "uppercase",
                  color: "var(--maroon)",
                  marginBottom: 18,
                }}
              >
                ( FAQs )
              </div>
              <div style={{ overflow: "hidden" }}>
                <h2
                  data-rise
                  data-drift="38"
                  className="vk-huge"
                  style={{
                    ...anton,
                    lineHeight: 0.84,
                    letterSpacing: "-.01em",
                    margin: 0,
                    color: "var(--navy)",
                    fontSize: "clamp(2.6rem,9vw,8rem)",
                    width: "max-content",
                  }}
                >
                  Questions
                </h2>
              </div>
            </div>
            <AccordionList items={faqs} />
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          data-theme="light"
          style={{
            position: "relative",
            minHeight: "100vh",
            background: "var(--amber)",
            padding: `14vh ${PAD}`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <h2
              data-rise
              data-drift="-70"
              className="vk-huge"
              style={{
                ...anton,
                lineHeight: 0.82,
                letterSpacing: "-.01em",
                margin: 0,
                color: "var(--navy)",
                fontSize: "clamp(3.6rem,17vw,18rem)",
                width: "max-content",
              }}
            >
              Let&apos;s talk
            </h2>
          </div>
          <div
            className="vk-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(30px,5vw,70px)",
              alignItems: "start",
              marginTop: "5vh",
            }}
          >
            <div>
              <p
                data-reveal
                style={{
                  fontSize: "clamp(1.2rem,2vw,1.7rem)",
                  lineHeight: 1.35,
                  color: "var(--navy)",
                  maxWidth: "26ch",
                  margin: 0,
                }}
              >
                Tell us where you&apos;re headed. We&apos;ll bring the strategy,
                the systems, and the momentum to get you there.
              </p>
              <a
                data-reveal
                href="mailto:hello@vinika.co"
                data-cursor
                data-cursor-label="Email us"
                style={{
                  display: "inline-block",
                  marginTop: 28,
                  ...anton,
                  fontSize: "clamp(1.6rem,3.4vw,2.8rem)",
                  color: "var(--navy)",
                  textDecoration: "none",
                  borderBottom: "3px solid var(--navy)",
                }}
              >
                hello@vinika.co
              </a>
            </div>
            <form
              onSubmit={onSubmit}
              data-reveal
              className="vk-form"
              style={{
                position: "relative",
                background: "var(--navy)",
                borderRadius: 2,
                padding: "clamp(26px,3vw,40px)",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {[
                  ["Name", "name", "text", "Your name", null],
                  ["Company name", "company", "text", "Your company", "(optional)"],
                  ["Phone no.", "phone", "tel", "+1 (555) 000-0000", null],
                  ["Email id", "email", "email", "you@company.com", null],
                ].map(([label, name, type, ph, opt]) => (
                  <label
                    key={name as string}
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: ".16em",
                        textTransform: "uppercase",
                        color: "rgba(245,225,200,.65)",
                      }}
                    >
                      {label}{" "}
                      {opt && (
                        <span style={{ textTransform: "none", opacity: 0.6 }}>
                          {opt}
                        </span>
                      )}
                    </span>
                    <input
                      type={type as string}
                      name={name as string}
                      placeholder={ph as string}
                      data-cursor
                      style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid rgba(245,225,200,.3)",
                        padding: "9px 0",
                        color: "#fff",
                        fontFamily: "inherit",
                        fontSize: 16,
                        outline: "none",
                      }}
                    />
                  </label>
                ))}
                <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: "rgba(245,225,200,.65)",
                    }}
                  >
                    Notes
                  </span>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Tell us a little about your business…"
                    data-cursor
                    style={{
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid rgba(245,225,200,.3)",
                      padding: "9px 0",
                      color: "#fff",
                      fontFamily: "inherit",
                      fontSize: 16,
                      outline: "none",
                      resize: "none",
                    }}
                  />
                </label>
                <button
                  type="submit"
                  data-cursor
                  data-magnetic
                  data-cursor-label="Send"
                  style={{
                    marginTop: 4,
                    background: "var(--amber)",
                    color: "var(--navy)",
                    border: "none",
                    padding: "15px 16px 15px 24px",
                    borderRadius: 2,
                    fontFamily: "inherit",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  Send it over{" "}
                  <span
                    style={{
                      display: "inline-flex",
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "var(--navy)",
                      color: "var(--amber)",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                    }}
                  >
                    ↗
                  </span>
                </button>
              </div>
              <div
                ref={successRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "var(--navy)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                  textAlign: "center",
                  padding: 30,
                  opacity: 0,
                  visibility: "hidden",
                  transition: "opacity .5s",
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: "50%",
                    border: "1px solid var(--amber)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--amber)",
                    fontSize: 24,
                  }}
                >
                  ✓
                </div>
                <div
                  style={{ ...anton, fontSize: "1.7rem", color: "#fff" }}
                >
                  Beautifully done
                </div>
                <div
                  style={{
                    color: "rgba(245,225,200,.8)",
                    fontSize: 14,
                    maxWidth: "30ch",
                    lineHeight: 1.6,
                  }}
                >
                  Your message is on its way. We&apos;ll be in touch shortly.
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          data-theme="dark"
          style={{
            position: "relative",
            background: "var(--navy)",
            padding: `16vh ${PAD} 40px`,
            overflow: "hidden",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <div
              data-rise
              data-drift="60"
              className="vk-huge"
              style={{
                ...anton,
                lineHeight: 0.82,
                letterSpacing: "-.01em",
                margin: 0,
                color: "var(--cream)",
                fontSize: "clamp(4rem,21vw,23rem)",
                width: "max-content",
              }}
            >
              Join us
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 30,
              marginTop: "6vh",
            }}
          >
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo-white.png"
                alt="Vinika"
                style={{
                  height: 30,
                  width: "auto",
                  display: "block",
                  marginBottom: 20,
                }}
              />
              <div style={{ display: "flex", gap: 14 }}>
                {["in", "ig", "x"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    data-cursor
                    style={{
                      width: 38,
                      height: 38,
                      border: "1px solid rgba(245,225,200,.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--cream)",
                      textDecoration: "none",
                      fontSize: 13,
                    }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "clamp(30px,5vw,80px)",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "rgba(245,225,200,.5)",
                    marginBottom: 4,
                  }}
                >
                  Explore
                </div>
                {[
                  ["#approach", "Approach"],
                  ["#services", "Services"],
                  ["#process", "Process"],
                  ["#story", "About"],
                ].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    data-cursor
                    style={{ color: "var(--cream)", textDecoration: "none", fontSize: 14 }}
                  >
                    {label}
                  </a>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "rgba(245,225,200,.5)",
                    marginBottom: 4,
                  }}
                >
                  Get in touch
                </div>
                <a
                  href="mailto:hello@vinika.co"
                  data-cursor
                  style={{ color: "var(--cream)", textDecoration: "none", fontSize: 14 }}
                >
                  hello@vinika.co
                </a>
                <span style={{ color: "rgba(245,225,200,.7)", fontSize: 14 }}>
                  Mon–Fri · within a day
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 16,
              marginTop: 50,
              paddingTop: 24,
              borderTop: "1px solid rgba(245,225,200,.15)",
              fontSize: 12,
              color: "rgba(245,225,200,.6)",
              letterSpacing: ".03em",
            }}
          >
            <span>© 2026 Vinika — Elevate · Expand · Excel</span>
            <span>Strategy in motion</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
