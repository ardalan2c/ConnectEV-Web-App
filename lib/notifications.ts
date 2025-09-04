// Server-only notification helpers; read process.env directly

export async function sendEmail(to: string, subject: string, text: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return { ok: false, skipped: true };
  // Lazy import to keep client bundle clean
  const { Resend } = await import("resend");
  const resend = new Resend(resendKey);
  try {
    await resend.emails.send({ from: "ConnectEV Inc. <no-reply@connectev.example>", to, subject, text });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function sendSMS(to: string, body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const messagingService = process.env.TWILIO_MESSAGING_SERVICE_SID;
  if (!sid || !token || !messagingService) return { ok: false, skipped: true };
  const twilio = (await import("twilio")).default(sid, token);
  try {
    await twilio.messages.create({ from: messagingService, to, body });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function slackNotify(text: string) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return { ok: false, skipped: true };
  try {
    await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
