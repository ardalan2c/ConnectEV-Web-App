import { NextResponse } from "next/server";
import { sendSMS } from "@/lib/notifications";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { to, body: text } = body;
  const res = await sendSMS(to, text);
  return NextResponse.json(res);
}

