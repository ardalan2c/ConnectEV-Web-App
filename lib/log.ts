const emailRe = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const phoneRe = /\+?\d[\d\s().-]{7,}\d/g;

function redact(s: string) {
  return s.replace(emailRe, "[redacted-email]").replace(phoneRe, "[redacted-phone]");
}

export const log = {
  info(msg: string, meta?: unknown) {
    try { console.info(redact(msg), meta ? JSON.stringify(meta) : ""); } catch {}
  },
  warn(msg: string, meta?: unknown) {
    try { console.warn(redact(msg), meta ? JSON.stringify(meta) : ""); } catch {}
  },
  error(msg: string, meta?: unknown) {
    try { console.error(redact(msg), meta ? JSON.stringify(meta) : ""); } catch {}
  }
};

