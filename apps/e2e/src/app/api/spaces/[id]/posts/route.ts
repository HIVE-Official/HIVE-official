import { NextRequest, NextResponse } from "next/server";
import { createStandardPost, listSpacePosts } from "../../../../../server/fake-db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const posts = listSpacePosts(id);
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const content = String(body.content ?? "").trim();
  const profileId = String(body.profileId ?? "demo");
  if (!content) return NextResponse.json({ error: "content required" }, { status: 400 });
  const result = createStandardPost({ spaceId: id, profileId, content });
  return NextResponse.json({ ok: result.ok, id: result.id });
}

