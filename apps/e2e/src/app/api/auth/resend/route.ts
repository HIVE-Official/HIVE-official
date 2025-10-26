import { NextResponse } from "next/server";
import { getPendingMagicLinkFixture, requestMagicLinkFixture } from "../../../../fixtures";

// Simple in-memory throttle: 1 resend per 10 seconds per email
const RESEND_THROTTLE_MS = 10_000;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { email?: string; userType?: string };
  const email = body?.email?.trim();
  const userType = (body?.userType ?? "student") as any;

  if (!email) {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }

  const pending = getPendingMagicLinkFixture();
  if (pending && pending.email === email) {
    const since = Date.now() - pending.requestedAt;
    if (since < RESEND_THROTTLE_MS) {
      const waitMs = Math.max(0, RESEND_THROTTLE_MS - since);
      return NextResponse.json(
        { error: `Please wait ${Math.ceil(waitMs / 1000)}s before resending.` },
        { status: 429, headers: { "Retry-After": `${Math.ceil(waitMs / 1000)}` } }
      );
    }
  }

  const payload = requestMagicLinkFixture(email, userType);
  return NextResponse.json({ messageId: payload.messageId });
}

