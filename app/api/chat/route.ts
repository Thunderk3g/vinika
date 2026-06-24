import { type NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/assistant-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant"; content: string };

// Lightweight in-memory rate limit (per server instance): 20 msgs / minute / IP.
const hits = new Map<string, { n: number; t: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > 20;
}

export async function POST(req: NextRequest) {
  const key = process.env.XAI_API_KEY;
  const model = process.env.XAI_MODEL || "grok-3";
  const base = process.env.XAI_BASE_URL || "https://api.x.ai/v1";

  if (!key) {
    return Response.json(
      { error: "The assistant isn't configured yet." },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "You're sending messages a bit fast — give it a moment." },
      { status: 429 },
    );
  }

  let body: { messages?: Msg[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const incoming = (Array.isArray(body.messages) ? body.messages : [])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  const messages = [
    { role: "system", content: buildSystemPrompt() },
    ...incoming,
  ];

  let upstream: Response;
  try {
    upstream = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        temperature: 0.5,
        max_tokens: 800,
      }),
    });
  } catch {
    return Response.json(
      { error: "Couldn't reach the assistant service." },
      { status: 502 },
    );
  }

  if (!upstream.ok || !upstream.body) {
    const txt = await upstream.text().catch(() => "");
    let error = "The assistant is unavailable right now.";
    if (upstream.status === 403 && /credit|license/i.test(txt)) {
      error =
        "The assistant isn't active yet — the Grok account needs credits. You can still book a call below and the team will reach out.";
    } else if (upstream.status === 401) {
      error = "The assistant key is invalid.";
    }
    return Response.json({ error }, { status: 502 });
  }

  // Transform xAI's OpenAI-style SSE into a plain-text token stream.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        const l = line.trim();
        if (!l.startsWith("data:")) continue;
        const data = l.slice(5).trim();
        if (data === "[DONE]") {
          controller.close();
          return;
        }
        try {
          const j = JSON.parse(data);
          const delta = j.choices?.[0]?.delta?.content;
          if (typeof delta === "string" && delta) {
            controller.enqueue(encoder.encode(delta));
          }
        } catch {
          // ignore keep-alive / partial frames
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
