// Bounded Context Owner: Identity & Access Management Guild
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "./server/auth/constants";

const PUBLIC_PATHS = [
  "/login",
  "/auth",
  "/api",
  "/_next",
  "/static",
  "/storybook",
  "/__feature",
  "/schools"
];
const BYPASS_AUTH =
  process.env.NEXT_PUBLIC_AUTH_MODE === "mock" ||
  process.env.DISABLE_AUTH === "true";

const isPublicPath = (pathname: string): boolean => {
  if (pathname === "/") {
    return true;
  }
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cookie-based local bypass: set via /__feature?name=auth.bypass&value=1
  const bypassCookie =
    request.cookies.get("ff.auth.bypass")?.value === "1" ||
    request.cookies.get("ff.bypassAuth")?.value === "1";

  // Lightweight feature flag toggle endpoint (public)
  // Usage:
  //   /__feature?name=spaces.v2&value=1&redirect=/spaces
  //   /__feature?name=spaces.v2&value=0
  if (pathname.startsWith("/__feature")) {
    const url = request.nextUrl;
    const name = url.searchParams.get("name");
    const value = url.searchParams.get("value");
    const redirectTo = url.searchParams.get("redirect") || "/";

    const response = NextResponse.redirect(new URL(redirectTo, url.origin));

    if (name && value !== null) {
      const cookieName = `ff.${name}`; // e.g., ff.spaces.v2
      if (value === "0" || value === "false") {
        response.cookies.set(cookieName, "", { path: "/", maxAge: 0 });
      } else {
        response.cookies.set(cookieName, "1", { path: "/", httpOnly: false });
      }
    }

    return response;
  }

  if (BYPASS_AUTH || bypassCookie) {
    // In bypass mode, allow /login to render instead of redirecting to /spaces
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  if (!sessionCookie) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
