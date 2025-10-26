import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const _body = await req.json().catch(() => ({}));
  // pretend we sent an email
  return NextResponse.json({ ok: true, message: "Magic link sent (fake)." });
}

