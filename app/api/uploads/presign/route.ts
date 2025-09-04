import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { requireEnv } from "@/lib/env/required";
import { NextRequest } from "next/server";
import { randomUUID } from "crypto";

const ALLOWED = ["image/jpeg", "image/png", "image/heic"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
function safeName(name: string) { return (name || "upload").replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 80); }

export async function POST(req: NextRequest) {
  try {
    requireEnv(["SUPABASE_URL"]);
    
    const body = await req.json();
    const { leadId, fileName, contentType, contentLength } = body as { leadId?: string; fileName?: string; contentType: string; contentLength?: number };
    if (!ALLOWED.includes(contentType)) {
      return NextResponse.json({ error: "unsupported_type" }, { status: 415 });
    }
    if (typeof contentLength === 'number' && contentLength > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "file_too_large", max: MAX_SIZE_BYTES }, { status: 413 });
    }
    if (!leadId) {
      return NextResponse.json({ error: "lead_required" }, { status: 400 });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { 
          error: "Configure SUPABASE_SERVICE_ROLE_KEY to enable direct uploads; using in-memory stub for now." 
        }, 
        { status: 501 }
      );
    }

    const admin = supabaseAdmin();
    const bucket = "lead-photos";
    const objectName = `${leadId}/${Date.now()}-${safeName(fileName || "upload")}`;

    const { data, error } = await admin.storage
      .from(bucket)
      .createSignedUploadUrl(objectName);

    if (error || !data) {
      return NextResponse.json(
        { error: error?.message || "presign failed" }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      path: data.path, 
      token: data.token, 
      url: data.signedUrl, 
      objectName, 
      bucket, 
      contentType,
      maxSize: MAX_SIZE_BYTES
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}
