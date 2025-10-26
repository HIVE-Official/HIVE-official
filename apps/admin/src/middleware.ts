import { NextRequest, NextResponse } from "next/server";

export function middleware(_req: NextRequest) {
  const res = NextResponse.next();
  // Ensure admin app is not indexed even if meta misses
  res.headers.set("X-Robots-Tag", "noindex, nofollow");

  // TODO: Wire real admin session/role check here
  // Example placeholder:
  // const isAdmin = Boolean(req.cookies.get("hive-admin"));
  // if (!isAdmin) return NextResponse.redirect(new URL("/login", req.url));

  return res;
}

export const config = {
  matcher: "/:path*"
};
