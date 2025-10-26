import { NextResponse } from "next/server";
import { requestMagicLinkFixture } from "../../../fixtures";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => null) as { email?: string; userType?: string } | null;
  const email = body?.email?.trim();
  const userType = (body?.userType ?? "student") as any;
  if (!email) {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }

  const payload = requestMagicLinkFixture(email, userType);
  return NextResponse.json(payload);
}
