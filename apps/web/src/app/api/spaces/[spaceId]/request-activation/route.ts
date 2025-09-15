import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { logger } from "@/lib/utils/structured-logger";
import { withAuth } from "@/lib/api/middleware/api-auth-middleware";
import { HttpStatus } from "@/lib/api/response-types/api-response-types";

// Validation schema for activation request
const ActivationRequestSchema = z.object({
  connection: z.enum(['major', 'ta', 'leader', 'other']),
  connectionDetails: z.string().optional(),
  reason: z.string().min(10, "Reason must be at least 10 characters"),
  firstToolIdea: z.string().min(1, "First tool idea is required"),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = ActivationRequestSchema.parse(body);
    
    // TODO: Get user ID from authentication
    // For now, we'll use a mock user ID
    const userId = "mock-user-id";
    
    // Check if space exists and is in preview mode
    const spaceDoc = await dbAdmin.doc(`spaces/${spaceId}`).get();
    if (!spaceDoc.exists) {
      return NextResponse.json(
        { error: "Space not found" },
        { status: 404 }
      );
    }
    
    const spaceData = spaceDoc.data();
    if (!spaceData?.isPreviewMode) {
      return NextResponse.json(
        { error: "Space is not in preview mode" },
        { status: 400 }
      );
    }
    
    // Check if user has already submitted a request for this space
    const existingRequest = await dbAdmin
      .collection("activationRequests")
      .where("spaceId", "==", spaceId)
      .where("userId", "==", userId)
      .where("status", "==", "pending")
      .get();
    
    if (!existingRequest.empty) {
      return NextResponse.json(
        { error: "You have already submitted a request for this space" },
        { status: 400 }
      );
    }
    
    // Create activation request
    const activationRequest = {
      id: `${spaceId}-${userId}-${Date.now()}`,
      spaceId,
      userId,
      spaceName: spaceData.name,
      connection: validatedData.connection,
      connectionDetails: validatedData.connectionDetails,
      reason: validatedData.reason,
      firstTool: validatedData.firstTool,
      status: "pending",
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      reviewNotes: null,
    };
    
    // Save to Firestore
    await dbAdmin
      .collection("activationRequests")
      .doc(activationRequest.id)
      .set(activationRequest);
    
    // Update space with pending request count
    await dbAdmin.doc(`spaces/${spaceId}`).update({
      pendingRequests: FieldValue.increment(1),
      lastRequestAt: new Date().toISOString(),
    });
    
    // TODO: Send notification email to admins
    // TODO: Send confirmation email to user
    
    return NextResponse.json({
      success: true,
      requestId: activationRequest.id,
      message: "Activation request submitted successfully",
    });
    
  } catch (error) {
    console.error("Error submitting activation request:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to submit activation request" },
      { status: 500 }
    );
  }
}