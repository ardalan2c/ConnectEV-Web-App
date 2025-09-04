import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { NextRequest } from "next/server";
import { z } from "zod";

const ALLOWED = ["image/jpeg", "image/png", "image/heic"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
function safeName(name: string) { return (name || "upload").replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 80); }

const PresignSchema = z.object({
  leadId: z.string().min(1),
  files: z.array(z.object({
    name: z.string(),
    type: z.string().refine(type => ALLOWED.includes(type), { message: "Unsupported file type" }),
    size: z.number().max(MAX_SIZE_BYTES, { message: "File too large" })
  })).min(1).max(10)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = PresignSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "validation_failed", details: parsed.error.flatten() }, { status: 400 });
    }
    
    const { leadId, files } = parsed.data;

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "storage_not_configured" }, { status: 501 });
    }

    const admin = supabaseAdmin();
    const bucket = "lead-photos";
    const results = [];

    for (const file of files) {
      const timestamp = Date.now();
      const path = `${leadId}/${timestamp}-${safeName(file.name)}`;
      
      try {
        const { data, error } = await admin.storage
          .from(bucket)
          .createSignedUploadUrl(path);

        if (error || !data) {
          console.warn(`Presign failed for ${file.name}:`, error?.message);
          results.push({ 
            name: file.name, 
            error: error?.message || "presign failed" 
          });
        } else {
          results.push({
            name: file.name,
            path: data.path,
            token: data.token,
            mime: file.type
          });
        }
      } catch (err) {
        console.warn(`Presign error for ${file.name}:`, err);
        results.push({ 
          name: file.name, 
          error: "presign error" 
        });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.warn("Presign API error:", error);
    return NextResponse.json(
      { error: "server_error" }, 
      { status: 500 }
    );
  }
}
