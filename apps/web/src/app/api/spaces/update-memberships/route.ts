import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import type { User, UB_MAJORS  } from '@/types/core';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

// Server-side space type that allows FieldValue for timestamps
interface ServerSpace {
  name: string;
  name_lowercase: string;
  description: string;
  memberCount: number;
  schoolId: string;
  type: "major" | "residential" | "interest" | "creative" | "organization";
  tags: Array<{
    type: string;
    sub_type: string;
  }>;
  status: "dormant" | "activated" | "frozen";
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

// Server-side member type that allows FieldValue for timestamps
interface ServerMember {
  uid: string;
  role: "member" | "builder" | "requested_builder";
  joinedAt: FieldValue;
}

const updateMembershipsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  previousMajor: z.string().optional(),
  newMajor: z.string().optional(),
  previousResidential: z.string().optional(),
  newResidential: z.string().optional() });

/**
 * Update space memberships when user changes major or residential info
 * NOTE: This function is deprecated since we now use pre-seeded spaces.
 * POST /api/spaces/update-memberships
 */
export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      { 
        error: "Update memberships is deprecated. Use browse and join APIs for pre-seeded spaces.",
        note: "With 360+ pre-seeded spaces, users should manually join/leave spaces using browse and join/leave APIs."
      },
      { status: 410 }
    );
  } catch (error) {
    logger.error('Update memberships error', { error: error, endpoint: '/api/spaces/update-memberships' });
    return NextResponse.json(ApiResponseHelper.error("Failed to process membership update request", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
