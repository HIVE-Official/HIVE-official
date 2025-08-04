import { NextResponse } from "next/server";
import { joinWaitlist } from "@/lib/join-waitlist";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

export async function POST(req: Request) {
  try {
    const { email, schoolId } = await req.json();
    await joinWaitlist(email, schoolId);
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
     if (errorMessage === "Email and school ID are required.") {
      return NextResponse.json({ error: errorMessage }, { status: HttpStatus.BAD_REQUEST });
    }
    if (errorMessage === "School not found.") {
      return NextResponse.json({ error: errorMessage }, { status: HttpStatus.NOT_FOUND });
    }
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
} 