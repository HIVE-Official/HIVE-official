import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";

const checkHandleSchema = z.object({
  handle: z.string().min(1, "Handle is required"),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = (await request.json()) as unknown;
    const { handle } = checkHandleSchema.parse(body);

    // TODO: Implement actual handle availability check
    // For now, return mock data
    const isAvailable = !["admin", "root", "api", "www"].includes(
      handle.toLowerCase()
    );

    return NextResponse.json({
      available: isAvailable,
      handle,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");

  if (!handle) {
    return NextResponse.json(
      { error: "Handle parameter is required" },
      { status: 400 }
    );
  }

  try {
    const { handle: validatedHandle } = checkHandleSchema.parse({ handle });

    // Normalize handle to lowercase for consistency
    const normalizedHandle = validatedHandle.toLowerCase();

    // Check if handle exists in the handles collection
    const handleDoc = await dbAdmin
      .collection("handles")
      .doc(normalizedHandle)
      .get();

    return NextResponse.json({
      available: !handleDoc.exists,
      handle: normalizedHandle,
    });
  } catch (error) {
    console.error("Error checking handle:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid handle format", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to check handle availability" },
      { status: 500 }
    );
  }
}
