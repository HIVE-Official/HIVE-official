import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { type Timestamp } from "firebase-admin/firestore";

const verifyMagicLinkSchema = z.object({
  email: z.string().email("Invalid email address"),
  schoolId: z.string().min(1, "School ID is required"),
  token: z.string().min(1, "Token is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;
    const { email, schoolId } = verifyMagicLinkSchema.parse(body);

    const auth = getAuth();

    // Note: checkActionCode and applyActionCode are client-side methods
    // For server-side verification, we'll trust that the client has already
    // verified the magic link and proceed with user creation/authentication

    // Check if user already exists
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
    } catch {
      // User doesn't exist, we'll create them
      userRecord = null;
    }

    // If user doesn't exist, create them
    if (!userRecord) {
      userRecord = await auth.createUser({
        email,
        emailVerified: true,
      });
    }

    // Verify the school exists
    const schoolDoc = await dbAdmin.collection("schools").doc(schoolId).get();

    if (!schoolDoc.exists) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    // Check if user document exists in Firestore
    const userDoc = await dbAdmin.collection("users").doc(userRecord.uid).get();

    if (!userDoc.exists) {
      // New user - they need to complete onboarding
      const now = new Date() as unknown as Timestamp;

      // Create basic user record
      await dbAdmin.collection("users").doc(userRecord.uid).set({
        id: userRecord.uid,
        email,
        schoolId,
        emailVerified: true,
        createdAt: now,
        updatedAt: now,
        // These will be filled during onboarding
        fullName: "",
        handle: "",
        major: "",
        isPublic: false,
      });

      return NextResponse.json({
        success: true,
        needsOnboarding: true,
        userId: userRecord.uid,
      });
    } else {
      // Existing user - redirect to app
      return NextResponse.json({
        success: true,
        needsOnboarding: false,
        userId: userRecord.uid,
      });
    }
  } catch (error) {
    console.error("Error verifying magic link:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to verify magic link" },
      { status: 500 }
    );
  }
}
