import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getFirestoreAdmin } from "@hive/core/firebase-admin";
import { validateAuth } from "../../../../../lib/auth-server";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

export async function POST(
  request: NextRequest,
  { params }: { params: { toolId: string } }
) {
  try {
    // Validate authentication
    const user = await validateAuth(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { toolId } = params;
    const body = await request.json();
    const { spaceId, configuration = {}, permissions = {} } = body;

    if (!spaceId) {
      return NextResponse.json(ApiResponseHelper.error("spaceId is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const db = getFirestoreAdmin();
    
    // Verify user has admin access to the space
    const spaceMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(user.uid)
      .get();

    if (!spaceMemberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Access denied to this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const memberData = spaceMemberDoc.data();
    if (memberData?.role !== "admin") {
      return NextResponse.json(ApiResponseHelper.error("Admin access required to deploy tools", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Verify tool exists and can be deployed
    const toolDoc = await db
      .collection("tools")
      .doc(toolId)
      .get();

    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const toolData = toolDoc.data();
    if (toolData?.status !== "published") {
      return NextResponse.json(ApiResponseHelper.error("Only published tools can be deployed", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Check if tool is already deployed to this space
    const existingDeploymentQuery = await db
      .collection("tool_deployments")
      .where("toolId", "==", toolId)
      .where("spaceId", "==", spaceId)
      .where("isActive", "==", true)
      .limit(1)
      .get();

    if (!existingDeploymentQuery.empty) {
      return NextResponse.json(ApiResponseHelper.error("Tool is already deployed to this space", "UNKNOWN_ERROR"), { status: 409 });
    }

    // Check space's tool deployment limits
    const spaceDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .get();

    const spaceData = spaceDoc.data();
    const maxTools = spaceData?.limits?.maxTools || 20;

    const activeDeploymentsQuery = await db
      .collection("tool_deployments")
      .where("spaceId", "==", spaceId)
      .where("isActive", "==", true)
      .get();

    if (activeDeploymentsQuery.size >= maxTools) {
      return NextResponse.json(
        { error: `Space has reached the maximum of ${maxTools} deployed tools` },
        { status: 409 }
      );
    }

    // Create deployment document
    const deploymentId = `${toolId}_${spaceId}`;
    const deploymentData = {
      id: deploymentId,
      toolId,
      spaceId,
      deployedBy: user.uid,
      deployedAt: FieldValue.serverTimestamp(),
      isActive: true,
      configuration: {
        ...toolData.defaultConfiguration,
        ...configuration,
      },
      permissions: {
        canUse: ["member", "admin"], // Default permissions
        canConfigure: ["admin"],
        canViewAnalytics: ["admin"],
        ...permissions,
      },
      metadata: {
        toolVersion: toolData.version,
        toolName: toolData.name,
        toolDescription: toolData.description,
        deploymentVersion: "1.0.0",
      },
      analytics: {
        totalUses: 0,
        uniqueUsers: 0,
        lastUsed: null,
        averageRating: 0,
        totalRatings: 0,
      },
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    // Save deployment
    await db
      .collection("tool_deployments")
      .doc(deploymentId)
      .set(deploymentData);

    // Update tool's deployment analytics
    await db
      .collection("tools")
      .doc(toolId)
      .update({
        deploymentCount: FieldValue.increment(1),
        lastDeployed: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp() });

    // Update space's tool count
    await db
      .collection("spaces")
      .doc(spaceId)
      .update({
        toolCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp() });

    // Create initial analytics document
    await db
      .collection("tool_analytics")
      .doc(deploymentId)
      .set({
        toolId,
        spaceId,
        deploymentId,
        usageCount: 0,
        uniqueUsers: [],
        activeUsers: [],
        dailyUsage: {},
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp() });

    return NextResponse.json({
      success: true,
      deploymentId,
      deployment: {
        ...deploymentData,
        deployedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } });
  } catch (error) {
    return NextResponse.json(ApiResponseHelper.error("Failed to deploy tool", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { toolId: string } }
) {
  try {
    // Validate authentication
    const user = await validateAuth(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { toolId } = params;
    const searchParams = request.nextUrl.searchParams;
    const spaceId = searchParams.get("spaceId");

    if (!spaceId) {
      return NextResponse.json(ApiResponseHelper.error("spaceId parameter is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const db = getFirestoreAdmin();
    
    // Verify user has admin access to the space
    const spaceMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(user.uid)
      .get();

    if (!spaceMemberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Access denied to this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const memberData = spaceMemberDoc.data();
    if (memberData?.role !== "admin") {
      return NextResponse.json(ApiResponseHelper.error("Admin access required to undeploy tools", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const deploymentId = `${toolId}_${spaceId}`;

    // Check if deployment exists
    const deploymentDoc = await db
      .collection("tool_deployments")
      .doc(deploymentId)
      .get();

    if (!deploymentDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool deployment not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Deactivate deployment (soft delete to preserve analytics)
    await db
      .collection("tool_deployments")
      .doc(deploymentId)
      .update({
        isActive: false,
        undeployedBy: user.uid,
        undeployedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp() });

    // Update tool's deployment count
    await db
      .collection("tools")
      .doc(toolId)
      .update({
        deploymentCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp() });

    // Update space's tool count
    await db
      .collection("spaces")
      .doc(spaceId)
      .update({
        toolCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp() });

    // Archive user states (move to archived collection for data preservation)
    const stateDocsQuery = await db
      .collection("tool_states")
      .where("toolId", "==", toolId)
      .where("spaceId", "==", spaceId)
      .get();

    const batch = dbAdmin.batch();
    stateDocsQuery.docs.forEach(doc => {
      // Copy to archived collection
      batch.set(
        dbAdmin.collection("tool_states_archived").doc(doc.id),
        {
          ...doc.data(),
          archivedAt: FieldValue.serverTimestamp(),
          archivedBy: user.uid,
        }
      );
      
      // Delete from active collection
      batch.delete(doc.ref);
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      undeployedAt: new Date().toISOString(),
      archivedStates: stateDocsQuery.size });
  } catch (error) {
    return NextResponse.json(ApiResponseHelper.error("Failed to undeploy tool", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { toolId: string } }
) {
  try {
    // Validate authentication
    const user = await validateAuth(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { toolId } = params;
    const searchParams = request.nextUrl.searchParams;
    const spaceId = searchParams.get("spaceId");

    if (!spaceId) {
      return NextResponse.json(ApiResponseHelper.error("spaceId parameter is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const db = getFirestoreAdmin();
    
    // Verify user has access to the space
    const spaceMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(user.uid)
      .get();

    if (!spaceMemberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Access denied to this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const deploymentId = `${toolId}_${spaceId}`;

    // Get deployment details
    const deploymentDoc = await db
      .collection("tool_deployments")
      .doc(deploymentId)
      .get();

    if (!deploymentDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool deployment not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const deploymentData = deploymentDoc.data();

    // Get analytics if user has permission
    const memberData = spaceMemberDoc.data();
    let analytics = null;
    
    if (memberData?.role === "admin" || deploymentData?.permissions?.canViewAnalytics?.includes(memberData?.role)) {
      const analyticsDoc = await db
        .collection("tool_analytics")
        .doc(deploymentId)
        .get();
      
      if (analyticsDoc.exists) {
        analytics = analyticsDoc.data();
      }
    }

    return NextResponse.json({
      deployment: deploymentData,
      analytics });
  } catch (error) {
    return NextResponse.json(ApiResponseHelper.error("Failed to get tool deployment", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}