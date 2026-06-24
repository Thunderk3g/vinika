"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

/** Only allow same-site, non-protocol-relative paths to prevent open redirects. */
function safeRedirect(raw: string | null): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//") && !raw.includes("://")) {
    return raw;
  }
  return "/admin";
}

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const redirect = safeRedirect(search.get("redirect"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid email or password.");
      setBusy(false);
      return;
    }
    router.replace(redirect);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="adm-card" style={{ width: "100%", maxWidth: 380 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo-white.png" alt="Vinika" style={{ height: 24 }} />
        <span
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "var(--muted)",
          }}
        >
          CMS
        </span>
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "10px 0 4px", color: "var(--cream)" }}>
        Sign in
      </h1>
      <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 22px" }}>
        Admin access to the Vinika content manager.
      </p>

      <div className="adm-field">
        <label className="adm-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="field-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="adm-field">
        <label className="adm-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="field-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && (
        <p style={{ color: "#e89", fontSize: 13.5, margin: "0 0 14px" }}>{error}</p>
      )}

      <button type="submit" className="btn-accent" style={{ width: "100%" }} disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
