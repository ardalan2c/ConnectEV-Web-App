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

  // Validate URL format
  if (url && /^postgres(ql)?:\/\//.test(url)) {
    return NextResponse.json(
      { 
        ok: false, 
        error: "SUPABASE_URL must be your https Project URL (https://<ref>.supabase.co), not a Postgres connection string.", 
        hint: "Fix Vercel → Environment Variables." 
      },
      { status: 500 }
    );
  }

  if (url && !/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url)) {
    return NextResponse.json(
      { 
        ok: false, 
        error: "Invalid Supabase URL. Expected https://<ref>.supabase.co.", 
        hint: "Fix Vercel envs." 
      },
      { status: 500 }
    );
  }

  if (!anon) {
    return NextResponse.json(
      { 
        ok: false, 
        error: "Missing anon key.", 
        hint: "Set NEXT_PUBLIC_SUPABASE_ANON_KEY." 
      },
      { status: 500 }
    );
  }

  if (!url) {
    return NextResponse.json(
      { 
        ok: false, 
        error: "Missing Supabase URL.", 
        hint: "Set NEXT_PUBLIC_SUPABASE_URL." 
      },
      { status: 500 }
    );
  }

  // anon key is safe to expose (public)
  return NextResponse.json({ ok: true, url, anon });
}