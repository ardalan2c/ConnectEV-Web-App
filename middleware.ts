import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  if (!url.pathname.startsWith("/admin")) return NextResponse.next();
  const required = process.env.ADMIN_ACCESS_TOKEN;
  if (!required) return NextResponse.next();
  const fromHeader = req.headers.get("x-admin-token");
  const cookie = req.cookies.get("admin-token")?.value;
  const fromQuery = url.searchParams.get("key");
  const token = fromHeader || cookie || fromQuery;
  if (token === required) {
    if (fromQuery && fromQuery === required) {
      const res = NextResponse.next();
      res.cookies.set("admin-token", token!, { httpOnly: true, secure: true, path: "/" });
      return res;
    }
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", url));
}

export const config = { matcher: ["/admin/:path*"] };

