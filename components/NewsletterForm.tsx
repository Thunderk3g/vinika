"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        maxWidth: 440,
        margin: "0 auto",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="you@company.com"
        aria-label="Email address"
        disabled={subscribed}
        style={{
          flex: "1 1 220px",
          minWidth: 0,
          background: "rgba(245,225,200,0.04)",
          border: `1px solid ${focused ? "var(--amber)" : "var(--line-strong)"}`,
          borderRadius: 100,
          padding: "14px 22px",
          color: "var(--cream)",
          fontSize: 15,
          fontFamily: "inherit",
          outline: "none",
          transition: "border-color 0.25s",
        }}
      />
      <button type="submit" className="btn-accent" disabled={subscribed}>
        {subscribed ? "Subscribed ✓" : "Subscribe"}
      </button>
    </form>
  );
}
