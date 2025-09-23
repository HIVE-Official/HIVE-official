import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import * as admin from 'firebase-admin';
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { withAuthValidationAndErrors, withAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";

// Schema for tool deployment requests
const DeployToolSchema = z.object({
  spaceId: z.string().min(1, "spaceId is required"),
  configuration: z.record(z.any()).default({}),
  permissions: z.record(z.any()).default({})
});

export const POST = withAuthValidationAndErrors(
  DeployToolSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ toolId: string }> },
    { spaceId, configuration, permissions },
    respond
  ) => {
    const userId = getUserId(request);
    const { toolId } = await params;
    const db = dbAdmin;

    // Verify user has admin access to the space
    const spaceMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .get();

    if (!spaceMemberDoc.exists) {
      return respond.error("Access denied to this space", "FORBIDDEN", { status: 403 });
    }

    const memberData = spaceMemberDoc.data();
    if (memberData?.role !== "admin") {
      return respond.error("Admin access required to deploy tools", "FORBIDDEN", { status: 403 });
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
      deployedBy: userId,
      deployedAt: admin.firestore.FieldValue.serverTimestamp(),
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
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
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
        deploymentCount: admin.firestore.FieldValue.increment(1),
        lastDeployed: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp() });

    // Update space's tool count
    await db
      .collection("spaces")
      .doc(spaceId)
      .update({
        toolCount: admin.firestore.FieldValue.increment(1),
        updatedAt: admin.firestore.FieldValue.serverTimestamp() });

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
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp() });

    return respond.success({
      deploymentId,
      deployment: {
        ...deploymentData,
        deployedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    });
  }
);

export const DELETE = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ toolId: string }> },
  respond
) => {
  const userId = getUserId(request);
  const { toolId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const spaceId = searchParams.get("spaceId");

  if (!spaceId) {
    return respond.error("spaceId parameter is required", "INVALID_INPUT", { status: 400 });
  }

  const db = dbAdmin;

  // Verify user has admin access to the space
  const spaceMemberDoc = await db
    .collection("spaces")
    .doc(spaceId)
    .collection("members")
    .doc(userId)
    .get();

  if (!spaceMemberDoc.exists) {
    return respond.error("Access denied to this space", "FORBIDDEN", { status: 403 });
  }

  const memberData = spaceMemberDoc.data();
  if (memberData?.role !== "admin") {
    return respond.error("Admin access required to undeploy tools", "FORBIDDEN", { status: 403 });
  }

    const deploymentId = `${toolId}_${spaceId}`;

    // Check if deployment exists
    const deploymentDoc = await db
      .collection("tool_deployments")
      .doc(deploymentId)
      .get();

    if (!deploymentDoc.exists) {
      return respond.error("Tool deployment not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    // Deactivate deployment (soft delete to preserve analytics)
    await db
      .collection("tool_deployments")
      .doc(deploymentId)
      .update({
        isActive: false,
        undeployedBy: userId,
        undeployedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp() });

    // Update tool's deployment count
    await db
      .collection("tools")
      .doc(toolId)
      .update({
        deploymentCount: admin.firestore.FieldValue.increment(-1),
        updatedAt: admin.firestore.FieldValue.serverTimestamp() });

    // Update space's tool count
    await db
      .collection("spaces")
      .doc(spaceId)
      .update({
        toolCount: admin.firestore.FieldValue.increment(-1),
        updatedAt: admin.firestore.FieldValue.serverTimestamp() });

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
          archivedAt: admin.firestore.FieldValue.serverTimestamp(),
          archivedBy: userId,
        }
      );
      
      // Delete from active collection
      batch.delete(doc.ref);
    });

    await batch.commit();

    return respond.success({
      undeployedAt: new Date().toISOString(),
      archivedStates: stateDocsQuery.size
    });
});

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ toolId: string }> },
  respond
) => {
  const userId = getUserId(request);
  const { toolId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const spaceId = searchParams.get("spaceId");

  if (!spaceId) {
    return respond.error("spaceId parameter is required", "INVALID_INPUT", { status: 400 });
  }

  const db = dbAdmin;

  // Verify user has access to the space
  const spaceMemberDoc = await db
    .collection("spaces")
    .doc(spaceId)
    .collection("members")
    .doc(userId)
    .get();

  if (!spaceMemberDoc.exists) {
    return respond.error("Access denied to this space", "FORBIDDEN", { status: 403 });
  }

    const deploymentId = `${toolId}_${spaceId}`;

    // Get deployment details
    const deploymentDoc = await db
      .collection("tool_deployments")
      .doc(deploymentId)
      .get();

    if (!deploymentDoc.exists) {
      return respond.error("Tool deployment not found", "RESOURCE_NOT_FOUND", { status: 404 });
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

    return respond.success({
      deployment: deploymentData,
      analytics
    });
});