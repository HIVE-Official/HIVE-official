import { NextRequest, NextResponse } from 'next/server';
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs, addDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

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
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { toolId, deployTo, targetId, surface, config, permissions, settings } = body;

    // Validate required fields
    if (!toolId || !deployTo || !targetId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['profile', 'space'].includes(deployTo)) {
      return NextResponse.json({ error: 'Invalid deployment target' }, { status: 400 });
    }

    // Get tool details
    const toolDoc = await getDoc(doc(db, 'tools', toolId));
    if (!toolDoc.exists()) {
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
      const spaceDoc = await getDoc(doc(db, 'spaces', targetId));
      if (!spaceDoc.exists()) {
        return NextResponse.json({ error: 'Space not found' }, { status: 404 });
      }

      const membershipQuery = query(
        collection(db, 'members'),
        where('userId', '==', user.uid),
        where('spaceId', '==', targetId),
        where('status', '==', 'active')
      );
      const membershipSnapshot = await getDocs(membershipQuery);
      
      if (membershipSnapshot.empty) {
        return NextResponse.json({ error: 'Not a member of this space' }, { status: 403 });
      }

      const memberData = membershipSnapshot.docs[0].data();
      if (!['builder', 'admin', 'moderator'].includes(memberData.role)) {
        return NextResponse.json({ error: 'Insufficient permissions to deploy tools' }, { status: 403 });
      }

      // Validate surface for space deployments
      if (surface && !['pinned', 'posts', 'events', 'tools', 'chat', 'members'].includes(surface)) {
        return NextResponse.json({ error: 'Invalid surface' }, { status: 400 });
      }
    }

    // Check for existing deployment
    const existingQuery = query(
      collection(db, 'deployedTools'),
      where('toolId', '==', toolId),
      where('deployedTo', '==', deployTo),
      where('targetId', '==', targetId),
      where('status', '!=', 'disabled')
    );
    const existingSnapshot = await getDocs(existingQuery);
    
    if (!existingSnapshot.empty) {
      return NextResponse.json({ error: 'Tool already deployed to this target' }, { status: 409 });
    }

    // Check space tool limits (20 max per space)
    if (deployTo === 'space') {
      const spaceToolsQuery = query(
        collection(db, 'deployedTools'),
        where('deployedTo', '==', 'space'),
        where('targetId', '==', targetId),
        where('status', '==', 'active')
      );
      const spaceToolsSnapshot = await getDocs(spaceToolsQuery);
      
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

    const deploymentRef = await addDoc(collection(db, 'deployedTools'), deployment);

    // Update tool usage stats
    await updateDoc(doc(db, 'tools', toolId), {
      deploymentCount: (toolData.deploymentCount || 0) + 1,
      lastDeployedAt: now
    });

    // Log activity event
    await addDoc(collection(db, 'activityEvents'), {
      userId: user.uid,
      type: 'tool_interaction',
      toolId,
      spaceId: deployTo === 'space' ? targetId : undefined,
      metadata: {
        action: 'tool_deployed',
        deploymentId: deploymentRef.id,
        deployedTo,
        surface
      },
      timestamp: now,
      date: now.split('T')[0]
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
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const deployedTo = searchParams.get('deployedTo');
    const targetId = searchParams.get('targetId');
    const surface = searchParams.get('surface');
    const status = searchParams.get('status') || 'active';

    let deploymentsQuery = query(collection(db, 'deployedTools'));

    // Filter by deployment target
    if (deployedTo) {
      deploymentsQuery = query(deploymentsQuery, where('deployedTo', '==', deployedTo));
    }

    if (targetId) {
      deploymentsQuery = query(deploymentsQuery, where('targetId', '==', targetId));
    }

    if (surface) {
      deploymentsQuery = query(deploymentsQuery, where('surface', '==', surface));
    }

    if (status) {
      deploymentsQuery = query(deploymentsQuery, where('status', '==', status));
    }

    const deploymentsSnapshot = await getDocs(deploymentsQuery);
    const deployments = deploymentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filter by user permissions
    const accessibleDeployments = [];
    for (const deployment of deployments) {
      if (await canUserAccessDeployment(user.uid, deployment)) {
        // Fetch tool details
        const toolDoc = await getDoc(doc(db, 'tools', deployment.toolId));
        if (toolDoc.exists()) {
          accessibleDeployments.push({
            ...deployment,
            toolData: {
              id: toolDoc.id,
              name: toolDoc.data().name,
              description: toolDoc.data().description,
              currentVersion: toolDoc.data().currentVersion,
              elements: toolDoc.data().elements
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
    let positionQuery = query(
      collection(db, 'deployedTools'),
      where('deployedTo', '==', deployedTo),
      where('targetId', '==', targetId),
      where('status', '==', 'active')
    );

    if (surface) {
      positionQuery = query(positionQuery, where('surface', '==', surface));
    }

    const positionSnapshot = await getDocs(positionQuery);
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
      const membershipQuery = query(
        collection(db, 'members'),
        where('userId', '==', userId),
        where('spaceId', '==', deployment.targetId),
        where('status', '==', 'active')
      );
      const membershipSnapshot = await getDocs(membershipQuery);
      
      if (!membershipSnapshot.empty) {
        const memberData = membershipSnapshot.docs[0].data();
        return deployment.permissions.allowedRoles?.includes(memberData.role) || false;
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking deployment access:', error);
    return false;
  }
}