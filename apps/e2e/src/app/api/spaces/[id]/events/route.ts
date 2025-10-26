import { NextRequest, NextResponse } from "next/server";
import { listSpaceEvents, rsvpEvent } from "../../../../../server/fake-db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const events = listSpaceEvents(id);
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: _spaceId } = await params;
  const body = await req.json().catch(() => ({}));
  const profileId = String(body.profileId ?? "demo");
  const eventId = String(body.eventId ?? "");
  const status = body.status as "going" | "maybe" | "not_going" | "waitlist" | undefined;
  if (!eventId || !status) return NextResponse.json({ error: "eventId and status required" }, { status: 400 });
  const result = rsvpEvent(profileId, eventId, status);
  return NextResponse.json({ ...result });
}

