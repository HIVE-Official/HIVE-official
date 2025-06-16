import { NextResponse } from "next/server";
import type * as admin from "firebase-admin";
import type { Space, SpaceType } from "@hive/core";
import { dbAdmin } from "@/lib/firebase-admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filterType = searchParams.get("type") as SpaceType | "all" | null;
    const searchTerm = searchParams.get("q")?.toLowerCase() || null;

    let query: admin.firestore.Query = dbAdmin.collection("spaces");

    if (filterType && filterType !== "all") {
      query = query.where("type", "==", filterType);
    }

    // Note: Firestore doesn't support full-text search on its own.
    // This search implementation is a basic "starts-with" search on the name.
    // For a real-world application, a dedicated search service like Algolia or Typesense would be required.
    if (searchTerm) {
      query = query
        .where("name_lowercase", ">=", searchTerm)
        .where("name_lowercase", "<=", searchTerm + "\uf8ff");
    }

    const snapshot = await query.orderBy("name_lowercase").limit(50).get();

    if (snapshot.empty) {
      return NextResponse.json([], { status: 200 });
    }

    const spaces = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Space[];

    return NextResponse.json(spaces, { status: 200 });
  } catch (error) {
    console.error("Error fetching spaces:", error);
    return NextResponse.json(
      { error: "Failed to fetch spaces" },
      { status: 500 }
    );
  }
}
