import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { requireEnv } from "@/lib/env/required";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    requireEnv(["SUPABASE_URL"]);
    
    const body = await req.json();
    const { contentType } = body as { contentType: string };

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
    const objectName = `leads/${new Date().toISOString().slice(0,10)}/${randomUUID()}`;

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
      contentType 
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}