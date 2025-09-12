import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

// Tool state interface
interface ToolState {
  deploymentId: string;
  toolId: string;
  userId: string;
  state: Record<string, any>;
  metadata?: {
    version: string;
    lastSaved: string;
    autoSave: boolean;
    size: number;
  };
  createdAt: string;
  updatedAt: string;
}

// GET - Get tool state for user
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
    
    // Check deployment access
    const deploymentDoc = await dbAdmin.collection('deployedTools').doc(deploymentId).get();
    if (!deploymentDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Deployment not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const deployment = deploymentDoc.data();
    if (!deployment) {
      return NextResponse.json(ApiResponseHelper.error("Deployment data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    
    // Verify user can access this deployment
    if (!await canUserAccessState(user.uid, deployment)) {
      return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get user's state for this deployment
    const stateId = `${deploymentId}_${user.uid}`;
    const stateDoc = await dbAdmin.collection('toolStates').doc(stateId).get();
    
    if (!stateDoc.exists) {
      // Return empty state
      return NextResponse.json({
        state: {},
        metadata: {
          version: '1.0.0',
          lastSaved: null,
          autoSave: true,
          size: 0
        },
        exists: false
      });
    }

    const stateData = stateDoc.data() as ToolState;
    
    return NextResponse.json({
      state: stateData.state,
      metadata: stateData.metadata || {
        version: '1.0.0',
        lastSaved: stateData.updatedAt,
        autoSave: true,
        size: JSON.stringify(stateData.state).length
      },
      exists: true,
      createdAt: stateData.createdAt,
      updatedAt: stateData.updatedAt
    });
  } catch (error) {
    logger.error('Error fetching tool state', { error: error, endpoint: '/api/tools/state/[deploymentId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch tool state", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PUT - Update tool state
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
    const body = await request.json();
    const { state, metadata, merge = true } = body;

    // Check deployment access
    const deploymentDoc = await dbAdmin.collection('deployedTools').doc(deploymentId).get();
    if (!deploymentDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Deployment not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const deployment = deploymentDoc.data();
    if (!deployment) {
      return NextResponse.json(ApiResponseHelper.error("Deployment data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    
    // Verify user can access this deployment
    if (!await canUserAccessState(user.uid, deployment)) {
      return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const stateId = `${deploymentId}_${user.uid}`;
    const now = new Date().toISOString();

    // Get existing state if merging
    let finalState = state;
    if (merge) {
      const existingStateDoc = await dbAdmin.collection('toolStates').doc(stateId).get();
      if (existingStateDoc.exists) {
        const existingData = existingStateDoc.data();
        if (existingData) {
          finalState = {
            ...existingData.state,
            ...state
          };
        }
      }
    }

    // Validate state size (max 1MB)
    const stateSize = JSON.stringify(finalState).length;
    if (stateSize > 1024 * 1024) {
      return NextResponse.json(ApiResponseHelper.error("State data too large (max 1MB)", "UNKNOWN_ERROR"), { status: 413 });
    }

    // Prepare state document
    const stateDocument: ToolState = {
      deploymentId,
      toolId: deployment.toolId || '',
      userId: user.uid,
      state: finalState,
      metadata: {
        version: metadata?.version || '1.0.0',
        lastSaved: now,
        autoSave: metadata?.autoSave !== false,
        size: stateSize
      },
      createdAt: now,
      updatedAt: now
    };

    // Check if state already exists to determine if this is create or update
    const existingStateDoc = await dbAdmin.collection('toolStates').doc(stateId).get();
    if (existingStateDoc.exists) {
      const existingData = existingStateDoc.data();
      if (existingData) {
        stateDocument.createdAt = existingData.createdAt;
      }
    }

    // Save state
    await dbAdmin.collection('toolStates').doc(stateId).set(stateDocument);

    return NextResponse.json({
      success: true,
      state: finalState,
      metadata: stateDocument.metadata,
      updatedAt: now
    });
  } catch (error) {
    logger.error('Error updating tool state', { error: error, endpoint: '/api/tools/state/[deploymentId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update tool state", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PATCH - Partial state update
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ deploymentId: string }> }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { deploymentId } = await params;
    const body = await request.json();
    const { path, value, operation = 'set' } = body;

    if (!path) {
      return NextResponse.json(ApiResponseHelper.error("Path is required for partial updates", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Check deployment access
    const deploymentDoc = await dbAdmin.collection('deployedTools').doc(deploymentId).get();
    if (!deploymentDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Deployment not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const deployment = deploymentDoc.data();
    if (!deployment) {
      return NextResponse.json(ApiResponseHelper.error("Deployment data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    
    // Verify user can access this deployment
    if (!await canUserAccessState(user.uid, deployment)) {
      return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const stateId = `${deploymentId}_${user.uid}`;
    const stateDoc = await dbAdmin.collection('toolStates').doc(stateId).get();
    
    if (!stateDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("State not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const currentState = stateDoc.data();
    if (!currentState) {
      return NextResponse.json(ApiResponseHelper.error("State data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    const newState = { ...currentState.state };

    // Apply operation based on type
    switch (operation) {
      case 'set':
        setNestedValue(newState, path, value);
        break;
      case 'delete':
        deleteNestedValue(newState, path);
        break;
      case 'increment': {
        const currentValue = getNestedValue(newState, path) || 0;
        setNestedValue(newState, path, currentValue + (value || 1));
        break;
      }
      case 'append': {
        const currentArray = getNestedValue(newState, path) || [];
        if (Array.isArray(currentArray)) {
          currentArray.push(value);
          setNestedValue(newState, path, currentArray);
        } else {
          return NextResponse.json(ApiResponseHelper.error("Path does not point to an array", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
        }
        break;
      }
      default:
        return NextResponse.json(ApiResponseHelper.error("Unsupported operation", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Validate state size
    const stateSize = JSON.stringify(newState).length;
    if (stateSize > 1024 * 1024) {
      return NextResponse.json(ApiResponseHelper.error("State data too large (max 1MB)", "UNKNOWN_ERROR"), { status: 413 });
    }

    const now = new Date().toISOString();

    // Update state
    await dbAdmin.collection('toolStates').doc(stateId).update({
      state: newState,
      'metadata.size': stateSize,
      'metadata.lastSaved': now,
      updatedAt: now
    });

    return NextResponse.json({
      success: true,
      state: newState,
      operation,
      path,
      value,
      updatedAt: now
    });
  } catch (error) {
    logger.error('Error patching tool state', { error: error, endpoint: '/api/tools/state/[deploymentId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to patch tool state", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE - Clear tool state
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
    
    // Check deployment access
    const deploymentDoc = await dbAdmin.collection('deployedTools').doc(deploymentId).get();
    if (!deploymentDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Deployment not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const deployment = deploymentDoc.data();
    if (!deployment) {
      return NextResponse.json(ApiResponseHelper.error("Deployment data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    
    // Verify user can access this deployment
    if (!await canUserAccessState(user.uid, deployment)) {
      return NextResponse.json(ApiResponseHelper.error("Access denied", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const stateId = `${deploymentId}_${user.uid}`;
    
    // Delete user's state
    await dbAdmin.collection('toolStates').doc(stateId).delete();

    return NextResponse.json({
      success: true,
      message: 'Tool state cleared successfully'
    });
  } catch (error) {
    logger.error('Error clearing tool state', { error: error, endpoint: '/api/tools/state/[deploymentId]' });
    return NextResponse.json(ApiResponseHelper.error("Failed to clear tool state", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to check state access permissions
async function canUserAccessState(userId: string, deployment: any): Promise<boolean> {
  try {
    // Profile deployments - only owner can access state
    if (deployment.deployedTo === 'profile') {
      return deployment.targetId === userId;
    }

    // Space deployments - check membership
    if (deployment.deployedTo === 'space') {
      const membershipSnapshot = await dbAdmin
        .collection('members')
        .where('userId', '==', userId)
        .where('spaceId', '==', deployment.targetId)
        .where('status', '==', 'active')
        .get();
      return !membershipSnapshot.empty;
    }

    return false;
  } catch (error) {
    logger.error('Error checking state access', { error: error, endpoint: '/api/tools/state/[deploymentId]' });
    return false;
  }
}

// Helper functions for nested object operations
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!(key in current)) {
      current[key] = {};
    }
    return current[key];
  }, obj);
  target[lastKey] = value;
}

function deleteNestedValue(obj: any, path: string): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => current?.[key], obj);
  if (target && lastKey in target) {
    delete target[lastKey];
  }
}