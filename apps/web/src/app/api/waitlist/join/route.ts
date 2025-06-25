import { NextResponse } from "next/server";
import { joinWaitlist } from "@/lib/join-waitlist";
import { logger } from "@hive/core";

export async function POST(req: Request) {
  try {
    const { email, schoolId } = await req.json();
    await joinWaitlist(email, schoolId);
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Error joining waitlist:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    if (errorMessage === "Email and school ID are required.") {
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    if (errorMessage === "School not found.") {
      return NextResponse.json({ error: errorMessage }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}
