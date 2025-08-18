import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth-server';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import * as admin from 'firebase-admin';

// Tool deployment interface
interface ToolDeployment {
  id?: string;
  toolId: string;
  deployedBy: string;
  deployedTo: 'profile' | 'space';
  targetId: string; // userId for profile, spaceId for space
  surface?: 'pinned' | 'posts' | 'events' | 'tools' | 'chat' | 'members'; // for space deployments
  position?: number; // for ordering deployments
  config?: Record<string, any>; // deployment-specific configuration
  permissions: {
    canInteract: boolean;
    canView: boolean;
    canEdit: boolean;
    allowedRoles?: string[]; // for space deployments
  };
  status: 'active' | 'paused' | 'disabled';
  deployedAt: string;
  lastUsed?: string;
  usageCount: number;
  settings: {
    showInDirectory: boolean;
    allowSharing: boolean;
    collectAnalytics: boolean;
    notifyOnInteraction: boolean;
  };
  metadata?: Record<string, any>;
}

// Tool execution context
interface ToolExecutionContext {
  deploymentId: string;
  toolId: string;
  userId: string;
  targetType: 'profile' | 'space';
  targetId: string;
  surface?: string;
  permissions: {
    canRead: boolean;
    canWrite: boolean;
    canExecute: boolean;
  };
  environment: 'production' | 'preview' | 'sandbox';
}

// POST - Deploy tool to profile or space
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { toolId, deployTo, targetId, surface, config, permissions, settings } = body;

    logger.info('🚀 Deploying tool to :by user', { toolId, targetId, spaceName: user.uid, endpoint: '/api/tools/deploy'   });

    // Validate required fields
    if (!toolId || !deployTo || !targetId) {
      return NextResponse.json(ApiResponseHelper.error("Missing required fields", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    if (!['profile', 'space'].includes(deployTo)) {
      return NextResponse.json(ApiResponseHelper.error("Invalid deployment target", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get tool details
    const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const toolData = toolDoc.data();
    if (!toolData) {
      return NextResponse.json(ApiResponseHelper.error("Tool data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Check tool permissions
    if (toolData.ownerId !== user.uid && toolData.status !== 'published') {
      return NextResponse.json(ApiResponseHelper.error("Tool not available for deployment", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Validate deployment target
    if (deployTo === 'profile' && targetId !== user.uid) {
      return NextResponse.json(ApiResponseHelper.error("Can only deploy to your own profile", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    if (deployTo === 'space') {
      // Check space membership and permissions
      const spaceDoc = await dbAdmin.collection('spaces').doc(targetId).get();
      if (!spaceDoc.exists) {
        return NextResponse.json(ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
      }

      // Check if user has permission to deploy tools in this space
      const spaceData = spaceDoc.data();
      const userRole = spaceData?.members?.[user.uid]?.role;

      if (!userRole || !['builder', 'admin', 'moderator'].includes(userRole)) {
        return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to deploy tools", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
      }

      // Validate surface for space deployments
      if (surface && !['pinned', 'posts', 'events', 'tools', 'chat', 'members'].includes(surface)) {
        return NextResponse.json(ApiResponseHelper.error("Invalid surface", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
      }
    }

    // Check for existing deployment
    const existingSnapshot = await dbAdmin.collection('deployedTools')
      .where('toolId', '==', toolId)
      .where('deployedTo', '==', deployTo)
      .where('targetId', '==', targetId)
      .where('status', 'in', ['active', 'paused'])
      .get();
    
    if (!existingSnapshot.empty) {
      return NextResponse.json(ApiResponseHelper.error("Tool already deployed to this target", "UNKNOWN_ERROR"), { status: 409 });
    }

    // Check space tool limits (20 max per space)
    if (deployTo === 'space') {
      const spaceToolsSnapshot = await dbAdmin.collection('deployedTools')
        .where('deployedTo', '==', 'space')
        .where('targetId', '==', targetId)
        .where('status', '==', 'active')
        .get();
      
      if (spaceToolsSnapshot.size >= 20) {
        return NextResponse.json(ApiResponseHelper.error("Space has reached maximum tool limit (20)", "UNKNOWN_ERROR"), { status: 409 });
      }
    }

    // Create deployment
    const now = new Date().toISOString();
    const deployment: ToolDeployment = {
      toolId,
      deployedBy: user.uid,
      deployedTo: deployTo as 'profile' | 'space',
      targetId,
      surface: surface || (deployTo === 'space' ? 'tools' : undefined),
      position: await getNextPosition(deployTo, targetId, surface),
      config: config || {},
      permissions: {
        canInteract: permissions?.canInteract !== false,
        canView: permissions?.canView !== false,
        canEdit: permissions?.canEdit || false,
        allowedRoles: permissions?.allowedRoles || ['member', 'moderator', 'admin', 'builder']
      },
      status: 'active',
      deployedAt: now,
      usageCount: 0,
      settings: {
        showInDirectory: settings?.showInDirectory !== false,
        allowSharing: settings?.allowSharing !== false,
        collectAnalytics: settings?.collectAnalytics !== false,
        notifyOnInteraction: settings?.notifyOnInteraction || false
      },
      metadata: {
        toolName: toolData.name,
        toolVersion: toolData.currentVersion,
        deploymentContext: {
          userAgent: request.headers.get('user-agent'),
          timestamp: now
        }
      }
    };

    const deploymentRef = await dbAdmin.collection('deployedTools').add(deployment);

    // Update tool usage stats
    await dbAdmin.collection('tools').doc(toolId).update({
      deploymentCount: (toolData.deploymentCount || 0) + 1,
      lastDeployedAt: now
    });

    // Log activity event
    await dbAdmin.collection('analytics_events').add({
      eventType: 'tool_deployed',
      userId: user.uid,
      toolId,
      spaceId: deployTo === 'space' ? targetId : undefined,
      timestamp: new Date(),
      metadata: {
        action: 'tool_deployed',
        deploymentId: deploymentRef.id,
        deployedTo: deployTo,
        surface
      }
    });

    const createdDeployment = {
      id: deploymentRef.id,
      ...deployment
    };

    return NextResponse.json({ 
      deployment: createdDeployment,
      message: 'Tool deployed successfully'
    }, { status: HttpStatus.CREATED });
  } catch (error) {
    logger.error('Error deploying tool', { error: error, endpoint: '/api/tools/deploy' });
    return NextResponse.json(ApiResponseHelper.error("Failed to deploy tool", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - List deployed tools
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const deployedTo = searchParams.get('deployedTo');
    const targetId = searchParams.get('targetId');
    const surface = searchParams.get('surface');
    const status = searchParams.get('status') || 'active';

    // Build query with filters
    let deploymentsQuery: admin.firestore.Query<admin.firestore.DocumentData> = dbAdmin.collection('deployedTools');
    if (deployedTo) deploymentsQuery = deploymentsQuery.where('deployedTo', '==', deployedTo);
    if (targetId) deploymentsQuery = deploymentsQuery.where('targetId', '==', targetId);
    if (surface) deploymentsQuery = deploymentsQuery.where('surface', '==', surface);
    if (status) deploymentsQuery = deploymentsQuery.where('status', '==', status);

    const deploymentsSnapshot = await deploymentsQuery.get();
    const deployments = deploymentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as { id: string; toolId?: string; [key: string]: any }));

    // Filter by user permissions
    const accessibleDeployments = [];
    for (const deployment of deployments) {
      if (await canUserAccessDeployment(user.uid, deployment)) {
        // Fetch tool details
        if (!deployment.toolId) continue;
        const toolDoc = await dbAdmin.collection('tools').doc(deployment.toolId).get();
        if (toolDoc.exists) {
          const toolData = toolDoc.data();
          accessibleDeployments.push({
            ...deployment,
            toolData: {
              id: toolDoc.id,
              name: toolData?.name,
              description: toolData?.description,
              currentVersion: toolData?.currentVersion,
              elements: toolData?.elements
            }
          });
        }
      }
    }

    return NextResponse.json({
      deployments: accessibleDeployments,
      count: accessibleDeployments.length
    });
  } catch (error) {
    logger.error('Error fetching deployed tools', { error: error, endpoint: '/api/tools/deploy' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch deployed tools", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to get next position for deployment
async function getNextPosition(deployedTo: string, targetId: string, surface?: string): Promise<number> {
  try {
    let positionQuery = dbAdmin.collection('deployedTools')
      .where('deployedTo', '==', deployedTo)
      .where('targetId', '==', targetId)
      .where('status', '==', 'active');

    if (surface) {
      positionQuery = positionQuery.where('surface', '==', surface);
    }

    const positionSnapshot = await positionQuery.get();
    return positionSnapshot.size;
  } catch (error) {
    logger.error('Error getting next position', { error: error, endpoint: '/api/tools/deploy' });
    return 0;
  }
}

// Helper function to check user access to deployment
async function canUserAccessDeployment(userId: string, deployment: any): Promise<boolean> {
  try {
    // User can access their own profile deployments
    if (deployment.deployedTo === 'profile' && deployment.targetId === userId) {
      return true;
    }

    // User deployed this tool
    if (deployment.deployedBy === userId) {
      return true;
    }

    // Check space membership for space deployments
    if (deployment.deployedTo === 'space') {
      const spaceDoc = await dbAdmin.collection('spaces').doc(deployment.targetId).get();
      if (spaceDoc.exists) {
        const spaceData = spaceDoc.data();
        const userRole = spaceData?.members?.[userId]?.role;
        return deployment.permissions.allowedRoles?.includes(userRole) || false;
      }
    }

    return false;
  } catch (error) {
    logger.error('Error checking deployment access', { error: error, endpoint: '/api/tools/deploy' });
    return false;
  }
}