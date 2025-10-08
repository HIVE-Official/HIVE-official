import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";

// Validation schema
const grantRoleSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.enum(["admin", "moderator", "builder"], {
    errorMap: () => ({ message: "Role must be admin, moderator, or builder" }),
  }) });

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = (await request.json()) as unknown;
    const validatedData = grantRoleSchema.parse(body);

    const { userId, role } = validatedData;

    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Invalid authorization format", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const decodedToken = await getAuth().verifyIdToken(token);

    // Check if current user is admin
    const db = getFirestore();
    const currentUserDoc = await db
      .collection("users")
      .doc(decodedToken.id)
      .get();
    const currentUserData = currentUserDoc.data() as
      | { role?: string }
      | undefined;

    if (!currentUserData || currentUserData.role !== "admin") {
      return NextResponse.json(ApiResponseHelper.error("Admin access required", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Verify target user exists
    const targetUserDoc = await db.collection("users").doc(userId).get();
    if (!targetUserDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("User not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Update user role
    await db.collection("users").doc(userId).update({
      role,
      updatedAt: new Date(),
      updatedBy: decodedToken.id });

    // Set custom claims for Firebase Auth
    await getAuth().setCustomUserClaims(userId, { role });

    // Log admin action
    await db.collection("admin_logs").add({
      action: "grant_role",
      performedBy: decodedToken.id,
      targetUser: userId,
      newRole: role,
      timestamp: new Date(),
      ip: request.headers.get("x-forwarded-for") || "unknown" });

    return NextResponse.json({
      success: true,
      message: `Role ${role} granted to user ${userId}` });
  } catch (error) {
    logger.error('Error granting role', { error });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
