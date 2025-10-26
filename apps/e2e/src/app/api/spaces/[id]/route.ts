import { NextRequest, NextResponse } from "next/server";
import { getSpace, getSpaceFull, isMember } from "../../../../server/fake-db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const profileId = String(searchParams.get("profileId") ?? "demo");
  const full = getSpaceFull(id);
  if (full) {
    const joinState = isMember(profileId, id) ? "member" : "not_member";
    return NextResponse.json({ space: full.space, tools: full.tools, resources: full.resources, joinState });
  }
  const minimal = getSpace(id);
  if (!minimal) return NextResponse.json({ error: "not_found" }, { status: 404 });
  // Map minimal to a safe default space shape
  return NextResponse.json({
    space: {
      id: minimal.id,
      campusId: "ub-buffalo",
      name: minimal.name,
      description: minimal.description,
      type: "student_org",
      source: "manual",
      isVerified: false,
      visibility: "public",
      joinPolicy: "open",
      postingPolicy: "members",
      allowPublicPosts: true,
      tags: [],
      featuredLinks: [],
      memberCount: 0,
      activeMembers7d: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    joinState: isMember(profileId, id) ? "member" : "not_member"
  });
}
