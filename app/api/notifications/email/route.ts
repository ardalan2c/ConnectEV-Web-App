import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/notifications";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { to, subject, text } = body;
  const res = await sendEmail(to, subject, text);
  return NextResponse.json(res);
}

