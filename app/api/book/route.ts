import { type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import { sendMail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("A valid email is required").max(200),
  company: z.string().trim().max(160).optional().default(""),
  preferredTime: z.string().trim().max(160).optional().default(""),
  goal: z.string().trim().max(2000).optional().default(""),
});

const hits = new Map<string, { n: number; t: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > 3_600_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > 10;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many requests — please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 422 },
    );
  }
  const v = parsed.data;

  try {
    await db.insert(appointments).values({
      name: v.name,
      email: v.email,
      company: v.company || null,
      preferredTime: v.preferredTime || null,
      goal: v.goal || null,
      source: "chat",
    });
  } catch (e) {
    console.error("[book] insert failed", e);
    return Response.json(
      { ok: false, error: "Couldn't save your request. Please email hello@vinika.com." },
      { status: 500 },
    );
  }

  const notify = process.env.BOOKINGS_NOTIFY_EMAIL || "hello@vinika.com";
  const [, confirm] = await Promise.allSettled([
    sendMail({
      to: notify,
      replyTo: v.email,
      subject: `New appointment request — ${v.name}`,
      text:
        `New booking from the website assistant:\n\n` +
        `Name: ${v.name}\n` +
        `Email: ${v.email}\n` +
        `Company: ${v.company || "—"}\n` +
        `Preferred time: ${v.preferredTime || "—"}\n\n` +
        `Goal:\n${v.goal || "—"}\n`,
    }),
    sendMail({
      to: v.email,
      subject: "Thanks — we'll be in touch · Vinika",
      text:
        `Hi ${v.name},\n\n` +
        `Thanks for reaching out to Vinika. We've received your request` +
        `${v.preferredTime ? ` (preferred time: ${v.preferredTime})` : ""} and a senior ` +
        `member of our team will reply within one business day.\n\n` +
        `What you told us:\n${v.goal || "(no details provided)"}\n\n` +
        `— The Vinika team\nElevate · Expand · Excel`,
    }),
  ]);

  const emailed =
    confirm.status === "fulfilled" && (confirm.value as { sent: boolean })?.sent === true;

  return Response.json({ ok: true, emailed });
}
