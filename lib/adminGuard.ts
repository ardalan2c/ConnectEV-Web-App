import { NextRequest, NextResponse } from "next/server";

export function checkAdminAuth(req: NextRequest): boolean {
  const token = process.env.ADMIN_ACCESS_TOKEN;
  if (!token) return false;

  // Check Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7) === token;
  }

  // Check query parameter
  const url = new URL(req.url);
  return url.searchParams.get("token") === token;
}

export function adminGuardResponse(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}