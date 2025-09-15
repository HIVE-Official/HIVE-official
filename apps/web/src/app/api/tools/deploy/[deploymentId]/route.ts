import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/utils/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

// GET - Get specific deployment details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ deploymentId: string }> }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { deploymentId } = await params;
    const deploymentDoc = await dbAdmin.collection('deployedTools').doc(deploymentId).get();

    if (!deploymentDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Deployment not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const deployment = { id: deploymentDoc.id, ...deploymentDoc.data() } as { id: string; toolId?: string; [key: string]: any };

    // Check access permissions
    if (!await canUserManageDeployment(user.uid, deployment)) {
      return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get tool details
    if (!deployment.toolId) {
      return NextResponse.json(ApiResponseHelper.error("Invalid deployment: missing toolId", "INVALID_DATA"), { status: HttpStatus.BAD_REQUEST });
    }
    const toolDoc = await dbAdmin.collection('tools').doc(deployment.toolId).get();
    const toolData = toolDoc.exists ? toolDoc.data() : null;

    // Get execution context
    const executionContext = generateExecutionContext(deployment, user.uid);

    return NextResponse.json({
      deployment,
      toolData,
      executionContext
    });
  } catch (error) {
    logger.error('Error fetching deployment', { error: error, endpoint: '/api/tools/deploy/[deploymentId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch deployment", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PUT - Update deployment configuration
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ deploymentId: string }> }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { deploymentId } = await params;
    const deploymentDoc = await dbAdmin.collection('deployedTools').doc(deploymentId).get();

    if (!deploymentDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Deployment not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const deployment = deploymentDoc.data();
    if (!deployment) {
      return NextResponse.json(ApiResponseHelper.error("Invalid deployment data", "INVALID_DATA"), { status: HttpStatus.BAD_REQUEST });
    }

    // Check access permissions
    if (!await canUserManageDeployment(user.uid, deployment)) {
      return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
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
    await dbAdmin.collection('deployedTools').doc(deploymentId).update(updateData);

    // Log activity event
    await dbAdmin.collection('activityEvents').add({
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
    const updatedDoc = await dbAdmin.collection('deployedTools').doc(deploymentId).get();
    const updatedDeployment = { id: updatedDoc.id, ...updatedDoc.data() };

    return NextResponse.json({
      deployment: updatedDeployment,
      message: 'Deployment updated successfully'
    });
  } catch (error) {
    logger.error('Error updating deployment', { error: error, endpoint: '/api/tools/deploy/[deploymentId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update deployment", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE - Remove deployment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ deploymentId: string }> }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { deploymentId } = await params;
    const deploymentDoc = await dbAdmin.collection('deployedTools').doc(deploymentId).get();

    if (!deploymentDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Deployment not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const deployment = deploymentDoc.data();
    if (!deployment) {
      return NextResponse.json(ApiResponseHelper.error("Invalid deployment data", "INVALID_DATA"), { status: HttpStatus.BAD_REQUEST });
    }

    // Check access permissions - only deployer or space admin can remove
    if (deployment.deployedBy !== user.uid) {
      if (deployment.deployedTo === 'space') {
        // Check if user is space admin
        const spaceDoc = await dbAdmin.collection('spaces').doc(deployment.targetId).get();
        if (!spaceDoc.exists) {
          return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
        }
        
        const spaceData = spaceDoc.data();
        if (!spaceData || spaceData.ownerId !== user.uid) {
          return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
        }
      } else {
        return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
      }
    }

    // Delete deployment
    await dbAdmin.collection('deployedTools').doc(deploymentId).delete();

    // Update tool deployment count
    const toolDoc = await dbAdmin.collection('tools').doc(deployment.toolId).get();
    if (toolDoc.exists) {
      const toolData = toolDoc.data();
      if (toolData) {
        await dbAdmin.collection('tools').doc(deployment.toolId).update({
          deploymentCount: Math.max(0, (toolData.deploymentCount || 1) - 1)
        });
      }
    }

    // Log activity event
    await dbAdmin.collection('activityEvents').add({
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
    logger.error('Error removing deployment', { error: error, endpoint: '/api/tools/deploy/[deploymentId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to remove deployment", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
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
      const spaceDoc = await dbAdmin.collection('spaces').doc(deployment.targetId).get();
      if (!spaceDoc.exists) {
        return false;
      }

      const spaceData = spaceDoc.data();
      if (!spaceData) {
        return false;
      }
      
      // Space owner can manage all deployments
      if (spaceData.ownerId === userId) {
        return true;
      }

      // Check member role
      const membershipSnapshot = await dbAdmin
        .collection('members')
        .where('userId', '==', userId)
        .where('spaceId', '==', deployment.targetId)
        .where('status', '==', 'active')
        .get();
      
      if (!membershipSnapshot.empty) {
        const memberData = membershipSnapshot.docs[0].data();
        return ['admin', 'moderator', 'builder'].includes(memberData.role);
      }
    }

    return false;
  } catch (error) {
    logger.error('Error checking deployment management permissions', { error: error, endpoint: '/api/tools/deploy/[deploymentId]' });
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