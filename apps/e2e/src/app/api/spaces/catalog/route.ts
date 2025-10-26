import { NextResponse } from "next/server";
import { listJoined, listRecommended, buildCategorySections } from "../../../../server/fake-db";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const profileId = String(searchParams.get("profileId") ?? "demo");
  const joined = listJoined(profileId);
  const recommended = listRecommended({ profileId, limit: 12 });
  const sections = buildCategorySections();
  const filters = sections.map((section) => ({ id: section.id, label: section.title, count: section.spaces.length }));
  return NextResponse.json({ joined, recommended, sections, filters });
}

