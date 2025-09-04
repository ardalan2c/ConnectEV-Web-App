export function requireEnv(keys: string[]) {
  const missing = keys.filter(k => !process.env[k] || process.env[k] === "");
  if (missing.length) {
    const msg = `Missing required env vars: ${missing.join(", ")}. Check .env.local`;
    if (process.env.NODE_ENV !== "production") {
      throw new Error(msg);
    }
    console.warn(msg);
  }
}