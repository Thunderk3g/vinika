import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.SMTP_FROM || '"Vinika" <hello@vinika.com>';

/** True only when SMTP env vars are filled in. When false, sendMail no-ops. */
export const mailConfigured = Boolean(host && user && pass);

let transporter: Transporter | null = null;
function getTransporter(): Transporter | null {
  if (!mailConfigured) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // implicit TLS on 465, STARTTLS otherwise
      auth: { user, pass },
    });
  }
  return transporter;
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}): Promise<{ sent: boolean }> {
  const t = getTransporter();
  if (!t) {
    console.warn("[mailer] SMTP not configured — skipping email to", opts.to);
    return { sent: false };
  }
  await t.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    replyTo: opts.replyTo,
  });
  return { sent: true };
}
