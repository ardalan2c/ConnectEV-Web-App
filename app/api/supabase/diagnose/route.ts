import { NextResponse } from "next/server";

export async function GET() {
  const nextPublicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const nextPublicAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const serverUrl = process.env.SUPABASE_URL || "";
  const serverAnon = process.env.SUPABASE_ANON_KEY || "";

  const url = nextPublicUrl || serverUrl;
  const anon = nextPublicAnon || serverAnon;

  // Determine URL type
  let chosenUrlType: "https" | "postgres" | "invalid" | "missing";
  if (!url) {
    chosenUrlType = "missing";
  } else if (/^postgres(ql)?:\/\//.test(url)) {
    chosenUrlType = "postgres";
  } else if (/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url)) {
    chosenUrlType = "https";
  } else {
    chosenUrlType = "invalid";
  }

  // Mask anon key (first 6 + "…" + last 4)
  const maskedAnon = anon ? 
    (anon.length > 10 ? `${anon.substring(0, 6)}…${anon.substring(anon.length - 4)}` : "***masked***") 
    : null;

  // Determine overall status
  const ok = chosenUrlType === "https" && !!anon;
  
  let reason: string | undefined;
  let hint: string | undefined;

  if (!ok) {
    if (chosenUrlType === "postgres") {
      reason = "URL is a Postgres connection string, not HTTPS Project URL";
      hint = "Use https://<ref>.supabase.co, not the Database URL";
    } else if (chosenUrlType === "invalid") {
      reason = "Invalid Supabase URL format";
      hint = "Expected https://<ref>.supabase.co";
    } else if (chosenUrlType === "missing") {
      reason = "Missing Supabase URL";
      hint = "Set NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL";
    } else if (!anon) {
      reason = "Missing anon key";
      hint = "Set NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY";
    }
  }

  return NextResponse.json({
    ok,
    reason,
    hasNextPublicUrl: !!nextPublicUrl,
    hasNextPublicAnon: !!nextPublicAnon,
    hasServerUrl: !!serverUrl,
    hasServerAnon: !!serverAnon,
    chosenUrl: url || null,
    chosenUrlType,
    maskedAnon,
    hint
  });
}