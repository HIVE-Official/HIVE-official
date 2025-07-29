import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin as db } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth-server';

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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { toolId, deployTo, targetId, surface, config, permissions, settings } = body;

    console.log(`🚀 Deploying tool ${toolId} to ${deployTo}:${targetId} by user ${user.uid}`);

    // Validate required fields
    if (!toolId || !deployTo || !targetId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['profile', 'space'].includes(deployTo)) {
      return NextResponse.json({ error: 'Invalid deployment target' }, { status: 400 });
    }

    // Get tool details
    const toolDoc = await db.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    const toolData = toolDoc.data();

    // Check tool permissions
    if (toolData.ownerId !== user.uid && toolData.status !== 'published') {
      return NextResponse.json({ error: 'Tool not available for deployment' }, { status: 403 });
    }

    // Validate deployment target
    if (deployTo === 'profile' && targetId !== user.uid) {
      return NextResponse.json({ error: 'Can only deploy to your own profile' }, { status: 403 });
    }

    if (deployTo === 'space') {
      // Check space membership and permissions
      const spaceDoc = await db.collection('spaces').doc(targetId).get();
      if (!spaceDoc.exists) {
        return NextResponse.json({ error: 'Space not found' }, { status: 404 });
      }

      // Check if user has permission to deploy tools in this space
      const spaceData = spaceDoc.data();
      const userRole = spaceData?.members?.[user.uid]?.role;

      if (!userRole || !['builder', 'admin', 'moderator'].includes(userRole)) {
        return NextResponse.json({ error: 'Insufficient permissions to deploy tools' }, { status: 403 });
      }

      // Validate surface for space deployments
      if (surface && !['pinned', 'posts', 'events', 'tools', 'chat', 'members'].includes(surface)) {
        return NextResponse.json({ error: 'Invalid surface' }, { status: 400 });
      }
    }

    // Check for existing deployment
    const existingSnapshot = await db.collection('deployedTools')
      .where('toolId', '==', toolId)
      .where('deployedTo', '==', deployTo)
      .where('targetId', '==', targetId)
      .where('status', 'in', ['active', 'paused'])
      .get();
    
    if (!existingSnapshot.empty) {
      return NextResponse.json({ error: 'Tool already deployed to this target' }, { status: 409 });
    }

    // Check space tool limits (20 max per space)
    if (deployTo === 'space') {
      const spaceToolsSnapshot = await db.collection('deployedTools')
        .where('deployedTo', '==', 'space')
        .where('targetId', '==', targetId)
        .where('status', '==', 'active')
        .get();
      
      if (spaceToolsSnapshot.size >= 20) {
        return NextResponse.json({ error: 'Space has reached maximum tool limit (20)' }, { status: 409 });
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

    const deploymentRef = await db.collection('deployedTools').add(deployment);

    // Update tool usage stats
    await db.collection('tools').doc(toolId).update({
      deploymentCount: (toolData.deploymentCount || 0) + 1,
      lastDeployedAt: now
    });

    // Log activity event
    await db.collection('analytics_events').add({
      eventType: 'tool_deployed',
      userId: user.uid,
      toolId,
      spaceId: deployTo === 'space' ? targetId : undefined,
      timestamp: new Date(),
      metadata: {
        action: 'tool_deployed',
        deploymentId: deploymentRef.id,
        deployedTo,
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
    }, { status: 201 });
  } catch (error) {
    console.error('Error deploying tool:', error);
    return NextResponse.json({ error: 'Failed to deploy tool' }, { status: 500 });
  }
}

// GET - List deployed tools
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const deployedTo = searchParams.get('deployedTo');
    const targetId = searchParams.get('targetId');
    const surface = searchParams.get('surface');
    const status = searchParams.get('status') || 'active';

    let deploymentsQuery = db.collection('deployedTools');

    // Filter by deployment target
    if (deployedTo) {
      deploymentsQuery = deploymentsQuery.where('deployedTo', '==', deployedTo);
    }

    if (targetId) {
      deploymentsQuery = deploymentsQuery.where('targetId', '==', targetId);
    }

    if (surface) {
      deploymentsQuery = deploymentsQuery.where('surface', '==', surface);
    }

    if (status) {
      deploymentsQuery = deploymentsQuery.where('status', '==', status);
    }

    const deploymentsSnapshot = await deploymentsQuery.get();
    const deployments = deploymentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filter by user permissions
    const accessibleDeployments = [];
    for (const deployment of deployments) {
      if (await canUserAccessDeployment(user.uid, deployment)) {
        // Fetch tool details
        const toolDoc = await db.collection('tools').doc(deployment.toolId).get();
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
    console.error('Error fetching deployed tools:', error);
    return NextResponse.json({ error: 'Failed to fetch deployed tools' }, { status: 500 });
  }
}

// Helper function to get next position for deployment
async function getNextPosition(deployedTo: string, targetId: string, surface?: string): Promise<number> {
  try {
    let positionQuery = db.collection('deployedTools')
      .where('deployedTo', '==', deployedTo)
      .where('targetId', '==', targetId)
      .where('status', '==', 'active');

    if (surface) {
      positionQuery = positionQuery.where('surface', '==', surface);
    }

    const positionSnapshot = await positionQuery.get();
    return positionSnapshot.size;
  } catch (error) {
    console.error('Error getting next position:', error);
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
      const spaceDoc = await db.collection('spaces').doc(deployment.targetId).get();
      if (spaceDoc.exists) {
        const spaceData = spaceDoc.data();
        const userRole = spaceData?.members?.[userId]?.role;
        return deployment.permissions.allowedRoles?.includes(userRole) || false;
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking deployment access:', error);
    return false;
  }
}