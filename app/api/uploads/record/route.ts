import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { z } from "zod";

const RecordSchema = z.object({
  leadId: z.string().min(1),
  files: z.array(z.object({
    path: z.string(),
    mime: z.string(),
    size: z.number().positive()
  })).min(1).max(10)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RecordSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "validation_failed", details: parsed.error.flatten() }, { status: 400 });
    }
    
    const { leadId, files } = parsed.data;

    // For now, just validate and return success
    // The actual photos will be linked when the lead is created
    console.log(`Upload recorded: ${files.length} files for lead ${leadId}`);

    return NextResponse.json({ ok: true, count: files.length });
  } catch (error) {
    console.warn("Upload record error:", error);
    return NextResponse.json(
      { error: "server_error" }, 
      { status: 500 }
    );
  }
}