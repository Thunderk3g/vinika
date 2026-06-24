"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi — I'm the Vinika assistant. Ask me about our services, process, or results — or book a call with the team using the button above.",
};

type BookState = "idle" | "sending" | "done" | "error";

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"chat" | "booking">("chat");
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", company: "", preferredTime: "", goal: "" });
  const [bookState, setBookState] = useState<BookState>("idle");
  const [bookMsg, setBookMsg] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, view]);

  // Never show the assistant inside the admin CMS.
  if (pathname?.startsWith("/admin")) return null;

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              j.error ||
              "Sorry — I'm having trouble right now. You can book a call with the team using the button above.",
          },
        ]);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
      if (!acc.trim()) {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content: "Sorry — I didn't catch that. Could you rephrase, or book a call above?",
          };
          return copy;
        });
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network hiccup — please try again, or book a call above." },
      ]);
    } finally {
      setSending(false);
    }
  }

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    setBookState("sending");
    setBookMsg("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const j = await res.json().catch(() => ({}));
      if (j.ok) {
        setBookState("done");
        setBookMsg(
          j.emailed
            ? "Thanks! A confirmation is on its way to your inbox — we'll reply within one business day."
            : "Thanks! We've got your request and will reply within one business day.",
        );
      } else {
        setBookState("error");
        setBookMsg(j.error || "Something went wrong. Please email hello@vinika.com.");
      }
    } catch {
      setBookState("error");
      setBookMsg("Network error. Please email hello@vinika.com.");
    }
  }

  const accent = "var(--amber)";
  const panelBg = "#0c2f5c";

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          aria-label="Open the Vinika assistant"
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            right: "calc(clamp(16px,3vw,28px) + env(safe-area-inset-right, 0px))",
            bottom: "calc(clamp(16px,3vw,28px) + env(safe-area-inset-bottom, 0px))",
            zIndex: 200,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "13px 20px",
            borderRadius: 100,
            border: "none",
            cursor: "pointer",
            background: accent,
            color: "var(--navy)",
            fontFamily: "'Geist', system-ui, sans-serif",
            fontSize: 15,
            fontWeight: 600,
            boxShadow: "0 12px 40px -8px rgba(224,160,69,.5)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3a8.38 8.38 0 0 1 8.5 8.5z" />
          </svg>
          Ask Vinika
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: "calc(clamp(12px,3vw,28px) + env(safe-area-inset-right, 0px))",
            bottom: "calc(clamp(12px,3vw,28px) + env(safe-area-inset-bottom, 0px))",
            zIndex: 200,
            width: "min(390px, calc(100vw - 24px))",
            maxWidth: "calc(100vw - 24px - env(safe-area-inset-right, 0px) - env(safe-area-inset-left, 0px))",
            height: "min(580px, calc(100dvh - 24px - env(safe-area-inset-bottom, 0px)))",
            maxHeight: "calc(100dvh - 24px - env(safe-area-inset-bottom, 0px))",
            display: "flex",
            flexDirection: "column",
            background: panelBg,
            border: "1px solid var(--line-strong)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 24px 70px -12px rgba(0,0,0,.6)",
            fontFamily: "'Geist', system-ui, sans-serif",
            color: "var(--cream)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              padding: "14px 16px",
              borderBottom: "1px solid var(--line)",
              background: "rgba(245,225,200,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: accent, boxShadow: "0 0 12px rgba(224,160,69,.7)" }} />
              <span style={{ fontWeight: 600, fontSize: 15 }}>Vinika Assistant</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={() => {
                  setView(view === "chat" ? "booking" : "chat");
                  setBookState("idle");
                }}
                style={{
                  fontFamily: "inherit",
                  fontSize: 12.5,
                  fontWeight: 600,
                  padding: "7px 13px",
                  borderRadius: 100,
                  border: "none",
                  cursor: "pointer",
                  background: view === "booking" ? "rgba(245,225,200,0.1)" : accent,
                  color: view === "booking" ? "var(--cream)" : "var(--navy)",
                }}
              >
                {view === "booking" ? "← Chat" : "Book a call"}
              </button>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                style={{ background: "transparent", border: "none", color: "var(--muted)", fontSize: 22, lineHeight: 1, cursor: "pointer" }}
              >
                ×
              </button>
            </div>
          </div>

          {view === "chat" ? (
            <>
              {/* Messages */}
              <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {messages.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                      maxWidth: "85%",
                      padding: "10px 14px",
                      borderRadius: 14,
                      fontSize: 14.5,
                      lineHeight: 1.5,
                      whiteSpace: "pre-wrap",
                      background: m.role === "user" ? "rgba(224,160,69,0.16)" : "rgba(245,225,200,0.05)",
                      border: m.role === "user" ? "1px solid rgba(224,160,69,0.3)" : "1px solid var(--line)",
                      color: "var(--cream)",
                    }}
                  >
                    {m.content || (sending ? "…" : "")}
                  </div>
                ))}
                {sending && messages[messages.length - 1]?.role === "user" && (
                  <div style={{ alignSelf: "flex-start", color: "var(--muted)", fontSize: 14, padding: "4px 6px" }}>…</div>
                )}
              </div>

              {/* Input */}
              <div style={{ padding: 12, borderTop: "1px solid var(--line)", display: "flex", gap: 8 }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Ask about our services…"
                  disabled={sending}
                  style={{
                    flex: 1,
                    background: "rgba(245,225,200,0.04)",
                    border: "1px solid var(--line-strong)",
                    borderRadius: 12,
                    padding: "11px 14px",
                    color: "var(--cream)",
                    fontFamily: "inherit",
                    fontSize: 14.5,
                    outline: "none",
                  }}
                />
                <button
                  onClick={send}
                  disabled={sending || !input.trim()}
                  aria-label="Send"
                  style={{
                    background: accent,
                    color: "var(--navy)",
                    border: "none",
                    borderRadius: 12,
                    padding: "0 16px",
                    fontFamily: "inherit",
                    fontWeight: 600,
                    fontSize: 14.5,
                    cursor: sending || !input.trim() ? "default" : "pointer",
                    opacity: sending || !input.trim() ? 0.6 : 1,
                  }}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            /* Booking */
            <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
              {bookState === "done" ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14, padding: "30px 8px" }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      border: `1px solid ${accent}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: accent,
                      fontSize: 24,
                    }}
                  >
                    ✓
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 600 }}>Request received</div>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55 }}>{bookMsg}</p>
                  <button
                    onClick={() => {
                      setView("chat");
                      setBookState("idle");
                      setForm({ name: "", email: "", company: "", preferredTime: "", goal: "" });
                    }}
                    style={{ marginTop: 6, background: "transparent", border: "1px solid var(--line-strong)", color: "var(--cream)", borderRadius: 100, padding: "10px 18px", fontFamily: "inherit", fontSize: 14, cursor: "pointer" }}
                  >
                    Back to chat
                  </button>
                </div>
              ) : (
                <form onSubmit={submitBooking} style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  <p style={{ margin: "0 0 4px", color: "var(--muted)", fontSize: 14, lineHeight: 1.5 }}>
                    Tell us a little and we'll reach out within one business day.
                  </p>
                  {(
                    [
                      ["name", "Your name", "text", true],
                      ["email", "Work email", "email", true],
                      ["company", "Company (optional)", "text", false],
                      ["preferredTime", "Preferred time (optional)", "text", false],
                    ] as const
                  ).map(([key, ph, type, req]) => (
                    <input
                      key={key}
                      type={type}
                      required={req}
                      placeholder={ph}
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      style={inputStyle}
                    />
                  ))}
                  <textarea
                    placeholder="What are you trying to achieve?"
                    rows={3}
                    value={form.goal}
                    onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                  {bookState === "error" && <p style={{ margin: 0, color: "#e89", fontSize: 13.5 }}>{bookMsg}</p>}
                  <button
                    type="submit"
                    disabled={bookState === "sending"}
                    style={{
                      marginTop: 2,
                      background: accent,
                      color: "var(--navy)",
                      border: "none",
                      borderRadius: 12,
                      padding: "13px",
                      fontFamily: "inherit",
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: bookState === "sending" ? "default" : "pointer",
                      opacity: bookState === "sending" ? 0.7 : 1,
                    }}
                  >
                    {bookState === "sending" ? "Sending…" : "Request a call"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

const inputStyle = {
  width: "100%",
  background: "rgba(245,225,200,0.04)",
  border: "1px solid var(--line-strong)",
  borderRadius: 12,
  padding: "12px 14px",
  color: "var(--cream)",
  fontFamily: "'Geist', system-ui, sans-serif",
  fontSize: 14.5,
  outline: "none",
} as const;
