import { env } from "./env";

export async function sendEmail(to: string, subject: string, text: string) {
  if (!env.resendKey) return { ok: false, skipped: true };
  // Lazy import to keep client bundle clean
  const { Resend } = await import("resend");
  const resend = new Resend(env.resendKey);
  try {
    await resend.emails.send({ from: "ConnectEV Inc. <no-reply@connectev.example>", to, subject, text });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function sendSMS(to: string, body: string) {
  if (!env.twilioSid || !env.twilioToken || !env.twilioMessagingService) return { ok: false, skipped: true };
  const twilio = (await import("twilio")).default(env.twilioSid, env.twilioToken);
  try {
    await twilio.messages.create({ from: env.twilioMessagingService, to, body });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function slackNotify(text: string) {
  if (!env.slackWebhook) return { ok: false, skipped: true };
  try {
    await fetch(env.slackWebhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

