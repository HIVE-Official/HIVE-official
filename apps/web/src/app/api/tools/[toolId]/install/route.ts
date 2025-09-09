import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getAuthTokenFromRequest } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import * as admin from 'firebase-admin';

const InstallToolSchema = z.object({
  spaceId: z.string().optional(),
  configuration: z.record(z.any()).optional(),
  permissions: z.object({
    canUse: z.array(z.string()).optional(),
    canConfigure: z.array(z.string()).optional()
  }).optional()
});

const db = dbAdmin;

// POST /api/tools/[toolId]/install - Install tool for user or space
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  try {
    const { toolId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    const body = await request.json();
    const validatedData = InstallToolSchema.parse(body);

    // Get tool document
    const toolDoc = await db.collection("tools").doc(toolId).get();
    
    if (!toolDoc.exists) {
      return NextResponse.json(
        ApiResponseHelper.error("Tool not found", "NOT_FOUND"), 
        { status: HttpStatus.NOT_FOUND }
      );
    }

    const toolData = toolDoc.data()!;

    // Check if tool is published
    if (toolData.status !== 'published') {
      return NextResponse.json(
        ApiResponseHelper.error("Tool is not available for installation", "FORBIDDEN"), 
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Check visibility permissions
    if (toolData.visibility === 'private' && toolData.authorId !== decodedToken.uid) {
      if (!toolData.permissions?.canUse?.includes(decodedToken.uid)) {
        return NextResponse.json(
          ApiResponseHelper.error("Tool is private", "FORBIDDEN"), 
          { status: HttpStatus.FORBIDDEN }
        );
      }
    }

    // If installing to a space, check permissions
    if (validatedData.spaceId) {
      const memberDoc = await db
        .collection("spaceMembers")
        .where("spaceId", "==", validatedData.spaceId)
        .where("userId", "==", decodedToken.uid)
        .get();

      if (memberDoc.empty) {
        return NextResponse.json(
          ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), 
          { status: HttpStatus.FORBIDDEN }
        );
      }

      const memberData = memberDoc.docs[0].data();
      const memberRole = memberData.role;

      // Only admins and owners can install tools to spaces
      if (!['admin', 'owner'].includes(memberRole)) {
        return NextResponse.json(
          ApiResponseHelper.error("Insufficient permissions to install tools in this space", "FORBIDDEN"), 
          { status: HttpStatus.FORBIDDEN }
        );
      }

      // Check if tool is already installed in space
      const existingInstall = await db
        .collection("spaces")
        .doc(validatedData.spaceId)
        .collection("tools")
        .doc(toolId)
        .get();

      if (existingInstall.exists && existingInstall.data()?.isEnabled) {
        return NextResponse.json(
          ApiResponseHelper.error("Tool is already installed in this space", "CONFLICT"), 
          { status: HttpStatus.CONFLICT }
        );
      }

      // Install to space
      await db
        .collection("spaces")
        .doc(validatedData.spaceId)
        .collection("tools")
        .doc(toolId)
        .set({
          toolId,
          name: toolData.name,
          description: toolData.description,
          type: toolData.type,
          configuration: {
            ...toolData.configuration?.defaultSettings,
            ...validatedData.configuration
          },
          permissions: validatedData.permissions || {
            canUse: ['member'],
            canConfigure: ['admin', 'owner']
          },
          installedBy: decodedToken.uid,
          installedAt: new Date(),
          isEnabled: true,
          isCustom: false,
          version: toolData.version
        });

      // Log space installation
      await db.collection("activityEvents").add({
        type: 'tool_installed_to_space',
        userId: decodedToken.uid,
        spaceId: validatedData.spaceId,
        toolId,
        toolName: toolData.name,
        timestamp: new Date()
      });

    } else {
      // Personal installation
      // Check if already installed for user
      const existingInstall = await db
        .collection("users")
        .doc(decodedToken.uid)
        .collection("installedTools")
        .doc(toolId)
        .get();

      if (existingInstall.exists) {
        return NextResponse.json(
          ApiResponseHelper.error("Tool is already installed", "CONFLICT"), 
          { status: HttpStatus.CONFLICT }
        );
      }

      // Install for user
      await db
        .collection("users")
        .doc(decodedToken.uid)
        .collection("installedTools")
        .doc(toolId)
        .set({
          toolId,
          name: toolData.name,
          description: toolData.description,
          type: toolData.type,
          configuration: {
            ...toolData.configuration?.defaultSettings,
            ...validatedData.configuration
          },
          installedAt: new Date(),
          lastUsed: null,
          usageCount: 0,
          version: toolData.version
        });

      // Log personal installation
      await db.collection("activityEvents").add({
        type: 'tool_installed_personal',
        userId: decodedToken.uid,
        toolId,
        toolName: toolData.name,
        timestamp: new Date()
      });
    }

    // Update tool analytics
    await toolDoc.ref.update({
      "analytics.deployments": admin.firestore.FieldValue.increment(1),
      "analytics.totalUsers": admin.firestore.FieldValue.increment(1)
    });

    return NextResponse.json(
      ApiResponseHelper.success({
        message: validatedData.spaceId 
          ? "Tool installed to space successfully" 
          : "Tool installed successfully",
        toolId,
        spaceId: validatedData.spaceId
      })
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid installation data",
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error installing tool', { error });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to install tool", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// DELETE /api/tools/[toolId]/install - Uninstall tool
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  try {
    const { toolId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get("spaceId");

    if (spaceId) {
      // Uninstall from space
      // Check permissions
      const memberDoc = await db
        .collection("spaceMembers")
        .where("spaceId", "==", spaceId)
        .where("userId", "==", decodedToken.uid)
        .get();

      if (memberDoc.empty) {
        return NextResponse.json(
          ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), 
          { status: HttpStatus.FORBIDDEN }
        );
      }

      const memberData = memberDoc.docs[0].data();
      const memberRole = memberData.role;

      if (!['admin', 'owner'].includes(memberRole)) {
        return NextResponse.json(
          ApiResponseHelper.error("Insufficient permissions to uninstall tools", "FORBIDDEN"), 
          { status: HttpStatus.FORBIDDEN }
        );
      }

      // Check if tool is installed
      const toolInstallDoc = await db
        .collection("spaces")
        .doc(spaceId)
        .collection("tools")
        .doc(toolId)
        .get();

      if (!toolInstallDoc.exists) {
        return NextResponse.json(
          ApiResponseHelper.error("Tool is not installed in this space", "NOT_FOUND"), 
          { status: HttpStatus.NOT_FOUND }
        );
      }

      // Delete tool installation
      await toolInstallDoc.ref.delete();

      // Delete tool data
      const toolDataSnapshot = await db
        .collection("spaces")
        .doc(spaceId)
        .collection("tools")
        .doc(toolId)
        .collection("data")
        .get();

      const batch = db.batch();
      toolDataSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      // Log uninstallation
      await db.collection("activityEvents").add({
        type: 'tool_uninstalled_from_space',
        userId: decodedToken.uid,
        spaceId,
        toolId,
        timestamp: new Date()
      });

    } else {
      // Personal uninstallation
      const toolInstallDoc = await db
        .collection("users")
        .doc(decodedToken.uid)
        .collection("installedTools")
        .doc(toolId)
        .get();

      if (!toolInstallDoc.exists) {
        return NextResponse.json(
          ApiResponseHelper.error("Tool is not installed", "NOT_FOUND"), 
          { status: HttpStatus.NOT_FOUND }
        );
      }

      // Delete tool installation
      await toolInstallDoc.ref.delete();

      // Delete tool data
      const toolDataSnapshot = await db
        .collection("users")
        .doc(decodedToken.uid)
        .collection("toolData")
        .where("toolId", "==", toolId)
        .get();

      const batch = db.batch();
      toolDataSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      // Log uninstallation
      await db.collection("activityEvents").add({
        type: 'tool_uninstalled_personal',
        userId: decodedToken.uid,
        toolId,
        timestamp: new Date()
      });
    }

    // Update tool analytics
    const toolDoc = await db.collection("tools").doc(toolId).get();
    if (toolDoc.exists) {
      await toolDoc.ref.update({
        "analytics.deployments": admin.firestore.FieldValue.increment(-1),
        "analytics.totalUsers": admin.firestore.FieldValue.increment(-1)
      });
    }

    return NextResponse.json(
      ApiResponseHelper.success({
        message: spaceId 
          ? "Tool uninstalled from space successfully" 
          : "Tool uninstalled successfully",
        toolId,
        spaceId
      })
    );

  } catch (error) {
    logger.error('Error uninstalling tool', { error });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to uninstall tool", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}