import { NextResponse } from "next/server";
import type * as admin from "firebase-admin";
import { logger, type Space, type SpaceType } from "@hive/core";
import { dbAdmin } from "@/lib/firebase-admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filterType = searchParams.get("type") as SpaceType | "all" | null;
    const searchTerm = searchParams.get("q")?.toLowerCase() || null;

    let allSpaces: Space[] = [];

    // Define space types to search through
    const spaceTypes: SpaceType[] = ["major", "residential", "interest", "creative", "organization"];
    const typesToSearch = filterType && filterType !== "all" ? [filterType] : spaceTypes;

    // Search through each space type's nested collection
    for (const spaceType of typesToSearch) {
      let query: admin.firestore.Query = dbAdmin
        .collection("spaces")
        .doc(spaceType)
        .collection("spaces");

      // Apply text search if needed
      if (searchTerm) {
        query = query
          .where("name_lowercase", ">=", searchTerm)
          .where("name_lowercase", "<=", `${searchTerm  }\uf8ff`);
      }

      const snapshot = await query.orderBy("name_lowercase").limit(50).get();

      // Convert to array and add to results
      const spaces = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: spaceType, // Ensure type is set from collection path
      })) as Space[];

      allSpaces = allSpaces.concat(spaces);
    }

    // Sort by member count (most popular first) and name
    allSpaces.sort((a, b) => {
      if (b.memberCount !== a.memberCount) {
        return b.memberCount - a.memberCount;
      }
      return a.name.localeCompare(b.name);
    });

    // Limit total results
    const limitedSpaces = allSpaces.slice(0, 50);

    return NextResponse.json(limitedSpaces, { status: 200 });
  } catch (error) {
    logger.error("Error fetching spaces:", error);
    return NextResponse.json(
      { error: "Failed to fetch spaces" },
      { status: 500 }
    );
  }
}
