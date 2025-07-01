import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { findAvailableHandle, validateHandle, logger } from "@hive/core";
import { z } from "zod";

const generateHandleSchema = z.object({
  displayName: z.string().min(1),
});

async function checkHandleAvailability(handle: string): Promise<boolean> {
  const handleDoc = await db.collection("handles").doc(handle).get();
  return !handleDoc.exists;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { displayName } = generateHandleSchema.parse(body);

    const availableHandle = await findAvailableHandle(
      displayName,
      checkHandleAvailability
    );

    // Validate the generated handle
    const validation = validateHandle(availableHandle);
    if (!validation.valid) {
      throw new Error(
        `Generated handle validation failed: ${validation.error}`
      );
    }

    logger.info(
      `Generated handle: ${availableHandle} for display name: ${displayName}`
    );

    return NextResponse.json({
      success: true,
      handle: availableHandle,
    });
  } catch (error) {
    logger.error("Handle generation error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate handle" },
      { status: 500 }
    );
  }
}

// Also support GET for checking specific handle availability
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");

    if (!handle) {
      return NextResponse.json(
        { error: "Handle parameter required" },
        { status: 400 }
      );
    }

    const validation = validateHandle(handle);
    if (!validation.valid) {
      return NextResponse.json({
        available: false,
        error: validation.error,
      });
    }

    const available = await checkHandleAvailability(handle);

    return NextResponse.json({
      available,
      handle,
    });
  } catch (error) {
    logger.error("Handle availability check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
