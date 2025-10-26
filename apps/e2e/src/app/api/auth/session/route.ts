import { NextResponse } from "next/server";
import { destroySessionFixture, getSessionFixture } from "../../../../fixtures";

export async function GET(): Promise<Response> {
  const session = getSessionFixture();
  if (!session) {
    return new Response(null, { status: 204 });
  }
  return NextResponse.json(session);
}

export async function DELETE(): Promise<Response> {
  destroySessionFixture();
  return new Response(null, { status: 204 });
}
