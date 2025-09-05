import { NextResponse } from "next/server";

export async function GET() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";
  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "";

  if (!url || !anon) {
    return NextResponse.json(
      { ok: false, error: "Supabase public config missing on server" },
      { status: 500 }
    );
  }
  // anon key is safe to expose (public)
  return NextResponse.json({ ok: true, url, anon });
}