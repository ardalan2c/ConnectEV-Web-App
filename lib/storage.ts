import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

export type StoredFile = { url: string };

export async function storeLeadPhotos(files: File[], leadId: string): Promise<StoredFile[]> {
  if (!env.supabaseUrl || !env.supabaseServiceKey) {
    // Fallback: return synthetic URLs
    return files.map((f) => ({ url: `uploaded://${encodeURIComponent(f.name)}` }));
  }
  const sb = createClient(env.supabaseUrl, env.supabaseServiceKey);
  const out: StoredFile[] = [];
  for (const f of files) {
    if (!f.type.startsWith("image/")) continue;
    if (f.size > 10 * 1024 * 1024) continue;
    const bytes = new Uint8Array(await f.arrayBuffer());
    const path = `${leadId}/${Date.now()}-${(f as any).name || "photo"}.jpg`;
    const { error } = await sb.storage.from(env.supabaseBucket).upload(path, bytes, { contentType: f.type, upsert: true });
    if (!error) {
      const { data } = sb.storage.from(env.supabaseBucket).getPublicUrl(path);
      out.push({ url: data.publicUrl });
    }
  }
  return out;
}

