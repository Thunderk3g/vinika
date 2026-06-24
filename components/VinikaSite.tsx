"use client";

import { CSSProperties, useState } from "react";
import Loader from "./Loader";
import Hero3D from "./Hero3D";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import { homeContent, type HomeContent } from "@/lib/home-content";

const PAD = "clamp(20px,5vw,64px)";
const SECTION_PAD = `clamp(80px,11vh,150px) ${PAD}`;

const eyebrow: CSSProperties = {
  fontFamily: "'Geist Mono', ui-monospace, monospace",
  fontSize: 12,
  letterSpacing: "0.16em",
  color: "var(--amber)",
  margin: 0,
};

const h2Style: CSSProperties = {
  margin: "16px 0 0",
  fontSize: "clamp(30px,4vw,56px)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
};

const mutedP: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.6,
  color: "var(--muted-2)",
  margin: 0,
};


/* --------------------------------------------------------- FAQ ACCORDION */
function Faqs({ items }: { items: HomeContent["faq"]["items"] }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="faq-row"
            onClick={() => setOpen(isOpen ? -1 : i)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 24,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "clamp(17px,1.9vw,22px)",
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: "var(--cream)",
                }}
              >
                {faq.q}
              </h3>
              <span
                style={{
                  fontSize: 24,
                  lineHeight: 1,
                  color: "var(--amber)",
                  flexShrink: 0,
                  transition: "transform 0.3s",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.4s cubic-bezier(0.2,0.7,0.2,1)",
              }}
            >
              <div style={{ overflow: "hidden", minHeight: 0 }}>
                <p
                  style={{
                    margin: "16px 64px 2px 0",
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "rgba(245,225,200,0.62)",
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------- CONTACT FORM */
function ContactForm({ submitLabelInitial }: { submitLabelInitial: string }) {
  const [label, setLabel] = useState(submitLabelInitial);
  const [done, setDone] = useState(false);
  const inputStyle = "field-input";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
        setLabel("Thanks — we'll be in touch");
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 34,
        borderRadius: 24,
        border: "1px solid var(--line)",
        background: "rgba(245,225,200,0.03)",
        backdropFilter: "blur(10px)",
      }}
    >
      <input type="text" placeholder="Your name" className={inputStyle} required />
      <input type="email" placeholder="Work email" className={inputStyle} required />
      <input type="text" placeholder="Company" className={inputStyle} />
      <textarea
        rows={4}
        placeholder="What are you trying to achieve?"
        className={inputStyle}
        style={{ resize: "vertical" }}
      />
      <button type="submit" className="btn-accent" style={{ marginTop: 4, padding: 16 }} disabled={done}>
        {label}
      </button>
    </form>
  );
}

/* ----------------------------------------------------------------- PAGE */
export default function VinikaSite({ content = homeContent }: { content?: HomeContent }) {
  const { hero, audiences, services, process, stories, insights, faq, contact } =
    content;

  return (
    <div className="page-bg">
      {/* LOADER — compulsory VINIKA Reveal intro + asset preload */}
      <Loader />

      <SiteNav />

      {/* ------------------------------------------------------------ HERO */}
      <header
        id="top"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "140px clamp(20px,5vw,64px) 90px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "42%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 760,
            height: 760,
            maxWidth: "120vw",
            background:
              "radial-gradient(circle, rgba(224,160,69,.12) 0%, rgba(224,160,69,0) 62%)",
            pointerEvents: "none",
          }}
        />

        <Hero3D />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 62% 52% at 50% 47%, rgba(10,49,101,.86) 0%, rgba(10,49,101,.55) 38%, rgba(10,49,101,0) 72%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 5, maxWidth: 1000 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 16px",
              borderRadius: 100,
              border: "1px solid var(--line)",
              background: "rgba(245,225,200,0.03)",
              fontFamily: "'Geist Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.12em",
              color: "var(--muted)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--amber)",
              }}
            />
            {hero.badge}
          </div>
          <h1
            style={{
              margin: "30px 0 0",
              fontSize: "clamp(44px,7.4vw,108px)",
              lineHeight: 0.97,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              textWrap: "balance",
            }}
          >
            {hero.titleLead} <span style={{ color: "var(--amber)" }}>{hero.titleAccent}</span>
          </h1>
          <p
            style={{
              margin: "30px auto 0",
              maxWidth: 560,
              fontSize: "clamp(16px,1.5vw,20px)",
              lineHeight: 1.55,
              color: "var(--muted)",
            }}
          >
            {hero.subtitle}
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: 40,
            }}
          >
            <a href={hero.primaryCta.href} className="btn-accent">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn-ghost">
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 34,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 9,
            color: "rgba(245,225,200,0.4)",
            fontFamily: "'Geist Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
            zIndex: 5,
          }}
        >
          SCROLL
          <span
            style={{
              width: 1,
              height: 42,
              background:
                "linear-gradient(180deg,rgba(245,225,200,0.4),transparent)",
            }}
          />
        </div>
      </header>

      {/* ------------------------------------------------------ WHO WE HELP */}
      <section
        style={{
          position: "relative",
          zIndex: 5,
          padding: SECTION_PAD,
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 30,
            flexWrap: "wrap",
            marginBottom: 54,
          }}
        >
          <div>
            <div style={eyebrow}>{audiences.heading.eyebrow}</div>
            <h2 style={{ ...h2Style, maxWidth: "14ch" }}>{audiences.heading.title}</h2>
          </div>
          {audiences.heading.blurb && (
            <p style={{ ...mutedP, maxWidth: 380 }}>{audiences.heading.blurb}</p>
          )}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 18,
          }}
        >
          {audiences.items.map((aud, i) => (
            <div key={i} className="aud-card reveal-up">
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 13,
                  color: "var(--amber)",
                }}
              >
                {aud.k}
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontSize: 19,
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: "var(--cream)",
                }}
              >
                {aud.title}
              </div>
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--muted-2)",
                }}
              >
                {aud.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- SERVICES */}
      <section
        id="services"
        style={{
          position: "relative",
          zIndex: 5,
          padding: `clamp(70px,9vh,120px) ${PAD} clamp(50px,7vh,90px)`,
          borderTop: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={eyebrow}>{services.heading.eyebrow}</div>
          <h2 style={{ ...h2Style, maxWidth: "18ch", marginBottom: 8 }}>
            {services.heading.title}
          </h2>
          {services.heading.blurb && (
            <p style={{ margin: "0 0 46px", fontSize: 15, color: "var(--muted-2)" }}>
              {services.heading.blurb}
            </p>
          )}

          {services.items.map((sv, i) => (
            <div
              key={i}
              style={{
                position: "sticky",
                top: 92 + i * 22,
                marginBottom: i === services.items.length - 1 ? 0 : 20,
              }}
            >
              <div className="svc-card">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 24,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 13,
                        color: "var(--amber)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {sv.n} / {String(services.items.length).padStart(2, "0")}
                    </span>
                    <h3
                      style={{
                        margin: "16px 0 0",
                        fontSize: "clamp(28px,4.2vw,52px)",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.02,
                        color: "var(--cream)",
                      }}
                    >
                      {sv.title}
                    </h3>
                    <p
                      style={{
                        margin: "20px 0 0",
                        maxWidth: "44ch",
                        fontSize: "clamp(15px,1.4vw,18px)",
                        lineHeight: 1.6,
                        color: "rgba(245,225,200,0.66)",
                      }}
                    >
                      {sv.desc}
                    </p>
                  </div>
                  <div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 24 }}>
                      {sv.tags.map((tag) => (
                        <span key={tag} className="svc-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={sv.href} className="svc-link">
                      Explore service →
                    </a>
                  </div>
                </div>
                <div
                  className="svc-ghost-wrap"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    pointerEvents: "none",
                  }}
                >
                  <span className="svc-ghost-num">{sv.n}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- PROCESS */}
      <section
        id="process"
        style={{
          position: "relative",
          zIndex: 5,
          padding: SECTION_PAD,
          borderTop: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={eyebrow}>{process.heading.eyebrow}</div>
          <h2 style={{ ...h2Style, margin: "16px 0 70px", maxWidth: "16ch" }}>
            {process.heading.title}
          </h2>
          <div style={{ position: "relative", paddingLeft: 48 }}>
            <div
              style={{
                position: "absolute",
                left: 11,
                top: 6,
                bottom: 6,
                width: 2,
                background: "rgba(245,225,200,0.1)",
              }}
            />
            <div
              className="proc-line-fill"
              style={{
                position: "absolute",
                left: 11,
                top: 6,
                bottom: 6,
                width: 2,
                background:
                  "linear-gradient(180deg,var(--amber),rgba(224,160,69,0.2))",
              }}
            />
            {process.steps.map((step) => (
              <div
                key={step.n}
                className="reveal-step"
                style={{ position: "relative", padding: "0 0 clamp(34px,5vh,56px)" }}
              >
                <span
                  className="proc-dot"
                  style={{
                    position: "absolute",
                    left: -48,
                    top: 4,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: "2px solid var(--line)",
                    background: "rgba(245,225,200,0.16)",
                  }}
                />
                <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 13,
                      color: "rgba(245,225,200,0.4)",
                    }}
                  >
                    {step.n}
                  </span>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "clamp(24px,3.2vw,38px)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--cream)",
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p
                  style={{
                    margin: "10px 0 0 36px",
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--muted-2)",
                    maxWidth: "48ch",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- SUCCESS STORIES */}
      <section
        id="work"
        style={{
          position: "relative",
          zIndex: 5,
          padding: SECTION_PAD,
          borderTop: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 54,
            }}
          >
            <div>
              <div style={eyebrow}>{stories.heading.eyebrow}</div>
              <h2 style={h2Style}>{stories.heading.title}</h2>
            </div>
            <a
              href="#contact"
              style={{
                textDecoration: "none",
                color: "var(--muted)",
                fontSize: 14,
                fontWeight: 500,
                borderBottom: "1px solid rgba(245,225,200,0.3)",
                paddingBottom: 3,
              }}
            >
              {stories.viewAllLabel}
            </a>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))",
              gap: 22,
            }}
          >
            {stories.items.map((story, i) => (
              <a key={i} href="#contact" className="story-card reveal-up">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      color: "var(--muted-2)",
                    }}
                  >
                    {story.sector}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      padding: "6px 13px",
                      borderRadius: 100,
                      border: "1px solid var(--line-strong)",
                      color: "var(--muted)",
                    }}
                  >
                    {story.client}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "clamp(48px,6vw,76px)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      color: "var(--amber)",
                    }}
                  >
                    {story.metric}
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      fontSize: 21,
                      fontWeight: 600,
                      lineHeight: 1.25,
                      color: "var(--cream)",
                    }}
                  >
                    {story.result}
                  </div>
                  <div
                    style={{
                      marginTop: 26,
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--muted)",
                    }}
                  >
                    View case study →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- INSIGHTS */}
      <section
        id="insights"
        style={{
          position: "relative",
          zIndex: 5,
          padding: SECTION_PAD,
          borderTop: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 50 }}>
            <div style={eyebrow}>{insights.heading.eyebrow}</div>
            <h2 style={h2Style}>{insights.heading.title}</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 22,
            }}
          >
            {insights.items.map((post, i) => (
              <a key={i} href={post.href} className="insight-card reveal-up">
                <div className="insight-thumb">
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      padding: "6px 12px",
                      borderRadius: 100,
                      background: "rgba(10,49,101,0.5)",
                      border: "1px solid var(--line-strong)",
                      color: "var(--cream)",
                    }}
                  >
                    {post.cat}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "20px 0 0",
                    fontSize: 21,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    color: "var(--cream)",
                  }}
                >
                  {post.title}
                </h3>
                <div style={{ marginTop: 12, fontSize: 13, color: "rgba(245,225,200,0.45)" }}>
                  {post.read}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- FAQ */}
      <section
        style={{
          position: "relative",
          zIndex: 5,
          padding: SECTION_PAD,
          borderTop: "1px solid var(--line)",
        }}
      >
        <div
          className="grid-2-collapse"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(220px,0.7fr) 1.6fr",
            gap: "clamp(30px,5vw,70px)",
          }}
        >
          <div>
            <div style={eyebrow}>{faq.heading.eyebrow}</div>
            <h2 style={{ ...h2Style, fontSize: "clamp(28px,3.4vw,46px)", lineHeight: 1.08 }}>
              {faq.heading.title}
            </h2>
          </div>
          <Faqs items={faq.items} />
        </div>
      </section>

      {/* ---------------------------------------------------------- CONTACT */}
      <section
        id="contact"
        style={{
          position: "relative",
          zIndex: 5,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: SECTION_PAD,
          borderTop: "1px solid var(--line)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-12%",
            top: "50%",
            transform: "translateY(-50%)",
            width: 640,
            height: 640,
            maxWidth: "90vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(224,160,69,.18),rgba(224,160,69,0) 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="grid-2-collapse"
          style={{
            position: "relative",
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "clamp(40px,6vw,90px)",
            alignItems: "center",
          }}
        >
          <div>
            <div style={eyebrow}>{contact.eyebrow}</div>
            <h2
              style={{
                margin: "20px 0 0",
                fontSize: "clamp(44px,7vw,96px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                color: "var(--cream)",
              }}
            >
              {contact.titleLead}
              <br />
              {contact.titleAccent}
            </h2>
            <p
              style={{
                margin: "26px 0 0",
                maxWidth: 420,
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--muted)",
              }}
            >
              {contact.blurb}
            </p>
            <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 6 }}>
              <a
                href={`mailto:${contact.email}`}
                className="foot-link"
                style={{ fontSize: 20, color: "var(--cream)", fontWeight: 500 }}
              >
                {contact.email}
              </a>
              <span style={{ fontSize: 14, color: "rgba(245,225,200,0.45)" }}>
                {contact.availability}
              </span>
            </div>
          </div>
          <ContactForm submitLabelInitial={contact.submitLabel} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
