import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { type Space } from "@hive/core";
import { dbAdmin } from "@/lib/firebase-admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  let spaceId: string | undefined;

  try {
    ({ spaceId } = await params);

    if (!spaceId) {
      return NextResponse.json(
        { error: "Space ID is required" },
        { status: 400 }
      );
    }

    // Find the space in the nested structure: spaces/[spacetype]/spaces/spaceID - aligned with new HIVE categories
    const spaceTypes = ['student_organizations', 'university_organizations', 'greek_life', 'campus_living', 'hive_exclusive', 'cohort'];
    let doc: any = null;
    let spaceType: string | null = null;

    // Search through all space types to find the space
    for (const type of spaceTypes) {
      const potentialSpaceRef = dbAdmin.collection("spaces").doc(type).collection("spaces").doc(spaceId);
      const potentialDoc = await potentialSpaceRef.get();
      
      if (potentialDoc.exists) {
        doc = potentialDoc;
        spaceType = type;
        break;
      }
    }

    if (!doc || !doc.exists) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    const space = { id: doc.id, ...doc.data() } as Space;

    return NextResponse.json(space, { status: 200 });
  } catch (error) {
    console.error(`Error fetching space ${spaceId || "unknown"}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch space" },
      { status: 500 }
    );
  }
}
