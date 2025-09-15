import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin as adminDb } from '@/lib/firebase/admin/firebase-admin';
import { getCurrentUser } from '@/lib/auth/providers/auth-server';
import { z } from 'zod';
import { logger } from "@/lib/utils/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

const InstallRequestSchema = z.object({
  toolId: z.string(),
  installTo: z.enum(['profile', 'space']),
  targetId: z.string(),
  surface: z.enum(['pinned', 'posts', 'events', 'tools', 'chat', 'members']).optional(),
  config: z.record(z.any()).optional(),
  permissions: z.object({
    canInteract: z.boolean().optional(),
    canView: z.boolean().optional(),
    canEdit: z.boolean().optional(),
    allowedRoles: z.array(z.string()).optional()
  }).optional()
});

interface ToolInstallation {
  id?: string;
  toolId: string;
  installerId: string;
  installTo: 'profile' | 'space';
  targetId: string;
  surface?: string;
  config: Record<string, any>;
  permissions: {
    canInteract: boolean;
    canView: boolean;
    canEdit: boolean;
    allowedRoles?: string[];
  };
  status: 'active' | 'paused' | 'disabled';
  installedAt: string;
  lastUsed?: string;
  usageCount: number;
  settings: {
    showInDirectory: boolean;
    allowSharing: boolean;
    collectAnalytics: boolean;
    notifyOnInteraction: boolean;
  };
}

// POST - Install tool from marketplace
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const validatedData = InstallRequestSchema.parse(body);

    // Get tool details from marketplace
    const marketplaceSnapshot = await adminDb
      .collection('marketplace')
      .where('toolId', '==', validatedData.toolId)
      .get();

    if (marketplaceSnapshot.empty) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found in marketplace", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const marketplaceTool = marketplaceSnapshot.docs[0].data();
    
    // Get full tool details
    const toolDoc = await adminDb.collection('tools').doc(validatedData.toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const toolData = toolDoc.data();
    if (!toolData) {
      return NextResponse.json(ApiResponseHelper.error("Tool data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    
    // Check if tool is published and available
    if (toolData.status !== 'published') {
      return NextResponse.json(ApiResponseHelper.error("Tool is not available for installation", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Validate installation target
    if (validatedData.installTo === 'profile' && validatedData.targetId !== user.uid) {
      return NextResponse.json(ApiResponseHelper.error("Can only install to your own profile", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    if (validatedData.installTo === 'space') {
      // Check space membership and permissions
      const spaceDoc = await adminDb.collection('spaces').doc(validatedData.targetId).get();
      if (!spaceDoc.exists) {
        return NextResponse.json(ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
      }

      const membershipSnapshot = await adminDb
        .collection('members')
        .where('userId', '==', user.uid)
        .where('spaceId', '==', validatedData.targetId)
        .where('status', '==', 'active')
        .get();

      if (membershipSnapshot.empty) {
        return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
      }

      const memberData = membershipSnapshot.docs[0].data();
      if (!['builder', 'admin', 'moderator'].includes(memberData.role)) {
        return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to install tools", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
      }
    }

    // Check for existing installation
    const existingInstallSnapshot = await adminDb
      .collection('toolInstallations')
      .where('toolId', '==', validatedData.toolId)
      .where('installTo', '==', validatedData.installTo)
      .where('targetId', '==', validatedData.targetId)
      .where('status', '!=', 'disabled')
      .get();

    if (!existingInstallSnapshot.empty) {
      return NextResponse.json(ApiResponseHelper.error("Tool already installed to this target", "UNKNOWN_ERROR"), { status: 409 });
    }

    // Check pricing and payment (if applicable)
    if (marketplaceTool.pricing?.type === 'paid') {
      // TODO: Implement payment verification
      return NextResponse.json(ApiResponseHelper.error("Paid tools not yet supported", "UNKNOWN_ERROR"), { status: 501 });
    }

    // Check installation limits
    if (validatedData.installTo === 'space') {
      const spaceInstallsSnapshot = await adminDb
        .collection('toolInstallations')
        .where('installTo', '==', 'space')
        .where('targetId', '==', validatedData.targetId)
        .where('status', '==', 'active')
        .get();

      if (spaceInstallsSnapshot.size >= 50) {
        return NextResponse.json(ApiResponseHelper.error("Space has reached maximum tool limit (50)", "UNKNOWN_ERROR"), { status: 409 });
      }
    }

    const now = new Date();
    const installation: ToolInstallation = {
      toolId: validatedData.toolId,
      installerId: user.uid,
      installTo: validatedData.installTo,
      targetId: validatedData.targetId,
      surface: validatedData.surface || (validatedData.installTo === 'space' ? 'tools' : undefined),
      config: validatedData.config || {},
      permissions: {
        canInteract: validatedData.permissions?.canInteract !== false,
        canView: validatedData.permissions?.canView !== false,
        canEdit: validatedData.permissions?.canEdit || false,
        allowedRoles: validatedData.permissions?.allowedRoles || ['member', 'moderator', 'admin', 'builder']
      },
      status: 'active',
      installedAt: now.toISOString(),
      usageCount: 0,
      settings: {
        showInDirectory: true,
        allowSharing: true,
        collectAnalytics: true,
        notifyOnInteraction: false
      }
    };

    // Create installation record
    const installRef = await adminDb.collection('toolInstallations').add(installation);

    // Update marketplace stats
    const marketplaceDocId = marketplaceSnapshot.docs[0].id;
    await adminDb.collection('marketplace').doc(marketplaceDocId).update({
      'stats.downloads': (marketplaceTool.stats?.downloads || 0) + 1,
      lastDownloaded: now.toISOString()
    });

    // Update tool stats
    if (toolData) {
      await adminDb.collection('tools').doc(validatedData.toolId).update({
        installCount: (toolData.installCount || 0) + 1,
        lastInstalledAt: now.toISOString()
      });
    }

    // Create deployment record for compatibility
    const deployment = {
      toolId: validatedData.toolId,
      deployedBy: user.uid,
      deployedTo: validatedData.installTo,
      targetId: validatedData.targetId,
      surface: installation.surface,
      permissions: installation.permissions,
      status: 'active',
      deployedAt: now.toISOString(),
      usageCount: 0,
      settings: installation.settings,
      installationId: installRef.id
    };

    const deploymentRef = await adminDb.collection('deployedTools').add(deployment);

    // Log analytics event
    await adminDb.collection('analytics_events').add({
      eventType: 'tool_installed',
      userId: user.uid,
      toolId: validatedData.toolId,
      installTo: validatedData.installTo,
      targetId: validatedData.targetId,
      timestamp: now.toISOString(),
      metadata: {
        installationId: installRef.id,
        deploymentId: deploymentRef.id,
        surface: installation.surface,
        toolName: toolData.name,
        marketplaceSource: true
      }
    });

    // Create notification for tool owner (if different)
    if (toolData.ownerId !== user.uid) {
      await adminDb.collection('notifications').add({
        type: 'tool_installed',
        title: 'Tool Installed',
        message: `Your tool "${toolData.name}" was installed by ${user.displayName || 'a user'}`,
        data: {
          toolId: validatedData.toolId,
          toolName: toolData.name,
          installerId: user.uid,
          installerName: user.displayName,
          installTo: validatedData.installTo,
          targetId: validatedData.targetId
        },
        recipients: [toolData.ownerId],
        createdAt: now.toISOString(),
        read: false
      });
    }

    return NextResponse.json({
      installationId: installRef.id,
      deploymentId: deploymentRef.id,
      message: 'Tool installed successfully',
      installation: {
        id: installRef.id,
        ...installation
      }
    }, { status: HttpStatus.CREATED });

  } catch (error) {
    logger.error('Error installing tool', { error: error, endpoint: '/api/tools/install' });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Invalid installation data',
        details: error.errors
      }, { status: HttpStatus.BAD_REQUEST });
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to install tool", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - Get user's installed tools
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const installTo = searchParams.get('installTo');
    const targetId = searchParams.get('targetId');
    const status = searchParams.get('status') || 'active';

    let installsQuery = adminDb
      .collection('toolInstallations')
      .where('installerId', '==', user.uid);

    if (installTo) {
      installsQuery = installsQuery.where('installTo', '==', installTo);
    }

    if (targetId) {
      installsQuery = installsQuery.where('targetId', '==', targetId);
    }

    if (status) {
      installsQuery = installsQuery.where('status', '==', status);
    }

    const installsSnapshot = await installsQuery.get();
    const installations = [];

    for (const doc of installsSnapshot.docs) {
      const installData = { id: doc.id, ...doc.data() } as { id: string; toolId?: string; [key: string]: any };
      
      // Get tool details
      if (!installData.toolId) continue;
      const toolDoc = await adminDb.collection('tools').doc(installData.toolId).get();
      const toolData = toolDoc.exists ? { id: toolDoc.id, ...toolDoc.data() } as { id: string; toolId?: string; name?: string; [key: string]: any } : null;

      // Get marketplace details
      const marketplaceSnapshot = await adminDb
        .collection('marketplace')
        .where('toolId', '==', installData.toolId)
        .get();
      
      const marketplaceData = !marketplaceSnapshot.empty ? 
        marketplaceSnapshot.docs[0].data() : null;

      installations.push({
        ...installData,
        tool: toolData ? {
          id: installData.toolId,
          name: toolData.name,
          description: toolData.description,
          currentVersion: toolData.currentVersion,
          category: marketplaceData?.category,
          rating: marketplaceData?.stats?.rating
        } : null
      });
    }

    return NextResponse.json({
      installations,
      count: installations.length
    });

  } catch (error) {
    logger.error('Error fetching installations', { error: error, endpoint: '/api/tools/install' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch installations", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}