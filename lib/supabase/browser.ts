"use client";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export async function getSupabaseBrowser(): Promise<SupabaseClient> {
  if (cached) return cached;

  // Prefer build-time injected public env
  const inlineUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const inlineAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let url = inlineUrl;
  let anon = inlineAnon;

  if (!url || !anon) {
    // Fallback: fetch from server at runtime
    const res = await fetch("/api/supabase/public", { cache: "no-store" });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Failed to load Supabase public config (${res.status}): ${text || "no body"}`
      );
    }
    const data = await res.json();
    url = data.url;
    anon = data.anon;
  }

  cached = createClient(url as string, anon as string);
  return cached;
}