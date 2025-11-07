import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { logger } from "@/lib/logger";
import { withSecureAuth } from '@/lib/api-auth-secure';
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

// Validation schema
const grantRoleSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.enum(["admin", "moderator", "builder"], {
    errorMap: () => ({ message: "Role must be admin, moderator, or builder" }),
  }) });

export const POST = withSecureAuth(async (request: NextRequest, token) => {
  try {
    // Parse and validate request body
    const body = (await request.json()) as unknown;
    const validatedData = grantRoleSchema.parse(body);

    const { userId, role } = validatedData;

    // Check if current user is admin
    const db = getFirestore();
    const currentUserDoc = await db
      .collection("users")
      .doc(token?.uid || 'unknown')
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
    // Campus isolation: ensure target user is on current campus
    const targetUserData = targetUserDoc.data() as any;
    if (targetUserData?.campusId && targetUserData.campusId !== CURRENT_CAMPUS_ID) {
      return NextResponse.json(ApiResponseHelper.error("Access denied - campus mismatch", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Update user role
    await db.collection("users").doc(userId).update({
      role,
      updatedAt: new Date(),
      updatedBy: token?.uid || 'unknown' });

    // Set custom claims for Firebase Auth
    await getAuth().setCustomUserClaims(userId, { role });

    // Log admin action
    await db.collection("admin_logs").add({
      action: "grant_role",
      performedBy: token?.uid || 'unknown',
      targetUser: userId,
      newRole: role,
      timestamp: new Date(),
      ip: request.headers.get("x-forwarded-for") || "unknown" });

    return NextResponse.json({
      success: true,
      message: `Role ${role} granted to user ${userId}` });
  } catch (error) {
    logger.error('Error granting role', { error: error instanceof Error ? error : new Error(String(error))});

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { requireAdmin: true });
