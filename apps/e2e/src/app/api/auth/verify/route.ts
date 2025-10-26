import { NextRequest, NextResponse } from "next/server";
import { getPendingMagicLinkFixture, verifyMagicLinkFixture } from "../../../../fixtures";

const DEFAULT_REDIRECT = "/onboarding";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.nextUrl.searchParams.get("token") || undefined;
  const dev = request.nextUrl.searchParams.get("dev");

  // Dev convenience: if dev=1 and there is a pending token, accept without explicit token param.
  let result = verifyMagicLinkFixture(token);
  if (!result && dev === "1") {
    const pending = getPendingMagicLinkFixture();
    if (pending) {
      result = verifyMagicLinkFixture(pending.messageId) || null;
    }
  }

  if (!result) {
    const redirectUrl = new URL("/login", request.nextUrl.origin);
    redirectUrl.searchParams.set("error", token ? "invalid-link" : "missing-token");
    return NextResponse.redirect(redirectUrl);
  }

  // Session is set in-memory by fixture; redirect to onboarding
  return NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.nextUrl.origin));
}

