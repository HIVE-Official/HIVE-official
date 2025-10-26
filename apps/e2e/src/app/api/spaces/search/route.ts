import { NextResponse } from "next/server";
import { searchableSpacesFixture } from "../../../../fixtures";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").toLowerCase();
  const results = searchableSpacesFixture.filter((space) =>
    space.name.toLowerCase().includes(query) || space.id.toLowerCase().includes(query)
  );

  return NextResponse.json({ results });
}
