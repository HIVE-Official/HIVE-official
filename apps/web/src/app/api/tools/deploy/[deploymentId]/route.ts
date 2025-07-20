import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, deleteDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

// GET - Get specific deployment details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ deploymentId: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deploymentId } = await params;
    const deploymentDoc = await getDoc(doc(db, 'deployedTools', deploymentId));

    if (!deploymentDoc.exists()) {
      return NextResponse.json({ error: 'Deployment not found' }, { status: 404 });
    }

    const deployment = { id: deploymentDoc.id, ...deploymentDoc.data() };

    // Check access permissions
    if (!await canUserManageDeployment(user.uid, deployment)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get tool details
    const toolDoc = await getDoc(doc(db, 'tools', deployment.toolId));
    const toolData = toolDoc.exists() ? toolDoc.data() : null;

    // Get execution context
    const executionContext = generateExecutionContext(deployment, user.uid);

    return NextResponse.json({
      deployment,
      toolData,
      executionContext
    });
  } catch (error) {
    console.error('Error fetching deployment:', error);
    return NextResponse.json({ error: 'Failed to fetch deployment' }, { status: 500 });
  }
}

// PUT - Update deployment configuration
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ deploymentId: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deploymentId } = await params;
    const deploymentDoc = await getDoc(doc(db, 'deployedTools', deploymentId));

    if (!deploymentDoc.exists()) {
      return NextResponse.json({ error: 'Deployment not found' }, { status: 404 });
    }

    const deployment = deploymentDoc.data();

    // Check access permissions
    if (!await canUserManageDeployment(user.uid, deployment)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const { config, permissions, settings, status, position } = body;

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    if (config !== undefined) {
      updateData.config = config;
    }

    if (permissions) {
      updateData.permissions = {
        ...deployment.permissions,
        ...permissions
      };
    }

    if (settings) {
      updateData.settings = {
        ...deployment.settings,
        ...settings
      };
    }

    if (status && ['active', 'paused', 'disabled'].includes(status)) {
      updateData.status = status;
    }

    if (position !== undefined && typeof position === 'number') {
      updateData.position = position;
    }

    // Update deployment
    await updateDoc(doc(db, 'deployedTools', deploymentId), updateData);

    // Log activity event
    await addDoc(collection(db, 'activityEvents'), {
      userId: user.uid,
      type: 'tool_interaction',
      toolId: deployment.toolId,
      spaceId: deployment.deployedTo === 'space' ? deployment.targetId : undefined,
      metadata: {
        action: 'deployment_updated',
        deploymentId,
        changes: Object.keys(body)
      },
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0]
    });

    // Fetch updated deployment
    const updatedDoc = await getDoc(doc(db, 'deployedTools', deploymentId));
    const updatedDeployment = { id: updatedDoc.id, ...updatedDoc.data() };

    return NextResponse.json({
      deployment: updatedDeployment,
      message: 'Deployment updated successfully'
    });
  } catch (error) {
    console.error('Error updating deployment:', error);
    return NextResponse.json({ error: 'Failed to update deployment' }, { status: 500 });
  }
}

// DELETE - Remove deployment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ deploymentId: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deploymentId } = await params;
    const deploymentDoc = await getDoc(doc(db, 'deployedTools', deploymentId));

    if (!deploymentDoc.exists()) {
      return NextResponse.json({ error: 'Deployment not found' }, { status: 404 });
    }

    const deployment = deploymentDoc.data();

    // Check access permissions - only deployer or space admin can remove
    if (deployment.deployedBy !== user.uid) {
      if (deployment.deployedTo === 'space') {
        // Check if user is space admin
        const spaceDoc = await getDoc(doc(db, 'spaces', deployment.targetId));
        if (!spaceDoc.exists()) {
          return NextResponse.json({ error: 'Access denied' }, { status: 403 });
        }
        
        const spaceData = spaceDoc.data();
        if (spaceData.ownerId !== user.uid) {
          return NextResponse.json({ error: 'Access denied' }, { status: 403 });
        }
      } else {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
      }
    }

    // Delete deployment
    await deleteDoc(doc(db, 'deployedTools', deploymentId));

    // Update tool deployment count
    const toolDoc = await getDoc(doc(db, 'tools', deployment.toolId));
    if (toolDoc.exists()) {
      const toolData = toolDoc.data();
      await updateDoc(doc(db, 'tools', deployment.toolId), {
        deploymentCount: Math.max(0, (toolData.deploymentCount || 1) - 1)
      });
    }

    // Log activity event
    await addDoc(collection(db, 'activityEvents'), {
      userId: user.uid,
      type: 'tool_interaction',
      toolId: deployment.toolId,
      spaceId: deployment.deployedTo === 'space' ? deployment.targetId : undefined,
      metadata: {
        action: 'deployment_removed',
        deploymentId,
        deployedTo: deployment.deployedTo,
        surface: deployment.surface
      },
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0]
    });

    return NextResponse.json({
      success: true,
      message: 'Deployment removed successfully'
    });
  } catch (error) {
    console.error('Error removing deployment:', error);
    return NextResponse.json({ error: 'Failed to remove deployment' }, { status: 500 });
  }
}

// Helper function to check deployment management permissions
async function canUserManageDeployment(userId: string, deployment: any): Promise<boolean> {
  try {
    // User deployed this tool
    if (deployment.deployedBy === userId) {
      return true;
    }

    // Profile deployment - only owner can manage
    if (deployment.deployedTo === 'profile') {
      return deployment.targetId === userId;
    }

    // Space deployment - check space permissions
    if (deployment.deployedTo === 'space') {
      const spaceDoc = await getDoc(doc(db, 'spaces', deployment.targetId));
      if (!spaceDoc.exists()) {
        return false;
      }

      const spaceData = spaceDoc.data();
      
      // Space owner can manage all deployments
      if (spaceData.ownerId === userId) {
        return true;
      }

      // Check member role
      const membershipQuery = query(
        collection(db, 'members'),
        where('userId', '==', userId),
        where('spaceId', '==', deployment.targetId),
        where('status', '==', 'active')
      );
      const membershipSnapshot = await getDocs(membershipQuery);
      
      if (!membershipSnapshot.empty) {
        const memberData = membershipSnapshot.docs[0].data();
        return ['admin', 'moderator', 'builder'].includes(memberData.role);
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking deployment management permissions:', error);
    return false;
  }
}

// Helper function to generate execution context
function generateExecutionContext(deployment: any, userId: string): any {
  const basePermissions = {
    canRead: deployment.permissions.canView,
    canWrite: deployment.permissions.canEdit,
    canExecute: deployment.permissions.canInteract
  };

  // Enhanced permissions for deployer
  if (deployment.deployedBy === userId) {
    basePermissions.canWrite = true;
    basePermissions.canExecute = true;
  }

  return {
    deploymentId: deployment.id || '',
    toolId: deployment.toolId,
    userId,
    targetType: deployment.deployedTo,
    targetId: deployment.targetId,
    surface: deployment.surface,
    permissions: basePermissions,
    environment: deployment.status === 'active' ? 'production' : 'preview',
    config: deployment.config || {},
    settings: deployment.settings || {}
  };
}