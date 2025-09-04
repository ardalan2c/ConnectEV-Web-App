// Simple in-memory LRU-ish rate limiter by key (e.g., IP)
// Not durable; replace with Redis in production if needed.

type Rec = { count: number; ts: number };
const store = new Map<string, Rec>();

export function rateLimited(key: string, opts: { limit: number; windowMs: number }) {
  const now = Date.now();
  const rec = store.get(key);
  if (!rec || now - rec.ts > opts.windowMs) {
    store.set(key, { count: 1, ts: now });
    // GC old entries
    if (store.size > 5000) {
      const cutoff = now - opts.windowMs * 2;
      for (const [k, v] of store) if (v.ts < cutoff) store.delete(k);
    }
    return false;
  }
  if (rec.count >= opts.limit) return true;
  rec.count++;
  return false;
}

