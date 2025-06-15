import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebase-admin";
import { type Post } from "@hive/core";

export async function GET(
  request: Request,
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

    const postsRef = dbAdmin
      .collection("spaces")
      .doc(spaceId)
      .collection("posts");
    const snapshot = await postsRef
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();

    if (snapshot.empty) {
      return NextResponse.json([], { status: 200 });
    }

    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(
      `Error fetching feed for space ${spaceId || "unknown"}:`,
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch feed" },
      { status: 500 }
    );
  }
}
