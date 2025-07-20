import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

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
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deploymentId } = await params;
    
    // Check deployment access
    const deploymentDoc = await getDoc(doc(db, 'deployedTools', deploymentId));
    if (!deploymentDoc.exists()) {
      return NextResponse.json({ error: 'Deployment not found' }, { status: 404 });
    }

    const deployment = deploymentDoc.data();
    
    // Verify user can access this deployment
    if (!await canUserAccessState(user.uid, deployment)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get user's state for this deployment
    const stateId = `${deploymentId}_${user.uid}`;
    const stateDoc = await getDoc(doc(db, 'toolStates', stateId));
    
    if (!stateDoc.exists()) {
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
    console.error('Error fetching tool state:', error);
    return NextResponse.json({ error: 'Failed to fetch tool state' }, { status: 500 });
  }
}

// PUT - Update tool state
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
    const body = await request.json();
    const { state, metadata, merge = true } = body;

    // Check deployment access
    const deploymentDoc = await getDoc(doc(db, 'deployedTools', deploymentId));
    if (!deploymentDoc.exists()) {
      return NextResponse.json({ error: 'Deployment not found' }, { status: 404 });
    }

    const deployment = deploymentDoc.data();
    
    // Verify user can access this deployment
    if (!await canUserAccessState(user.uid, deployment)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const stateId = `${deploymentId}_${user.uid}`;
    const now = new Date().toISOString();

    // Get existing state if merging
    let finalState = state;
    if (merge) {
      const existingStateDoc = await getDoc(doc(db, 'toolStates', stateId));
      if (existingStateDoc.exists()) {
        const existingData = existingStateDoc.data();
        finalState = {
          ...existingData.state,
          ...state
        };
      }
    }

    // Validate state size (max 1MB)
    const stateSize = JSON.stringify(finalState).length;
    if (stateSize > 1024 * 1024) {
      return NextResponse.json({ error: 'State data too large (max 1MB)' }, { status: 413 });
    }

    // Prepare state document
    const stateDocument: ToolState = {
      deploymentId,
      toolId: deployment.toolId,
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
    const existingStateDoc = await getDoc(doc(db, 'toolStates', stateId));
    if (existingStateDoc.exists()) {
      stateDocument.createdAt = existingStateDoc.data().createdAt;
    }

    // Save state
    await setDoc(doc(db, 'toolStates', stateId), stateDocument);

    return NextResponse.json({
      success: true,
      state: finalState,
      metadata: stateDocument.metadata,
      updatedAt: now
    });
  } catch (error) {
    console.error('Error updating tool state:', error);
    return NextResponse.json({ error: 'Failed to update tool state' }, { status: 500 });
  }
}

// PATCH - Partial state update
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ deploymentId: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deploymentId } = await params;
    const body = await request.json();
    const { path, value, operation = 'set' } = body;

    if (!path) {
      return NextResponse.json({ error: 'Path is required for partial updates' }, { status: 400 });
    }

    // Check deployment access
    const deploymentDoc = await getDoc(doc(db, 'deployedTools', deploymentId));
    if (!deploymentDoc.exists()) {
      return NextResponse.json({ error: 'Deployment not found' }, { status: 404 });
    }

    const deployment = deploymentDoc.data();
    
    // Verify user can access this deployment
    if (!await canUserAccessState(user.uid, deployment)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const stateId = `${deploymentId}_${user.uid}`;
    const stateDoc = await getDoc(doc(db, 'toolStates', stateId));
    
    if (!stateDoc.exists()) {
      return NextResponse.json({ error: 'State not found' }, { status: 404 });
    }

    const currentState = stateDoc.data();
    const newState = { ...currentState.state };

    // Apply operation based on type
    switch (operation) {
      case 'set':
        setNestedValue(newState, path, value);
        break;
      case 'delete':
        deleteNestedValue(newState, path);
        break;
      case 'increment':
        const currentValue = getNestedValue(newState, path) || 0;
        setNestedValue(newState, path, currentValue + (value || 1));
        break;
      case 'append':
        const currentArray = getNestedValue(newState, path) || [];
        if (Array.isArray(currentArray)) {
          currentArray.push(value);
          setNestedValue(newState, path, currentArray);
        } else {
          return NextResponse.json({ error: 'Path does not point to an array' }, { status: 400 });
        }
        break;
      default:
        return NextResponse.json({ error: 'Unsupported operation' }, { status: 400 });
    }

    // Validate state size
    const stateSize = JSON.stringify(newState).length;
    if (stateSize > 1024 * 1024) {
      return NextResponse.json({ error: 'State data too large (max 1MB)' }, { status: 413 });
    }

    const now = new Date().toISOString();

    // Update state
    await updateDoc(doc(db, 'toolStates', stateId), {
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
    console.error('Error patching tool state:', error);
    return NextResponse.json({ error: 'Failed to patch tool state' }, { status: 500 });
  }
}

// DELETE - Clear tool state
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
    
    // Check deployment access
    const deploymentDoc = await getDoc(doc(db, 'deployedTools', deploymentId));
    if (!deploymentDoc.exists()) {
      return NextResponse.json({ error: 'Deployment not found' }, { status: 404 });
    }

    const deployment = deploymentDoc.data();
    
    // Verify user can access this deployment
    if (!await canUserAccessState(user.uid, deployment)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const stateId = `${deploymentId}_${user.uid}`;
    
    // Delete user's state
    await deleteDoc(doc(db, 'toolStates', stateId));

    return NextResponse.json({
      success: true,
      message: 'Tool state cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing tool state:', error);
    return NextResponse.json({ error: 'Failed to clear tool state' }, { status: 500 });
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
      const membershipQuery = query(
        collection(db, 'members'),
        where('userId', '==', userId),
        where('spaceId', '==', deployment.targetId),
        where('status', '==', 'active')
      );
      const membershipSnapshot = await getDocs(membershipQuery);
      return !membershipSnapshot.empty;
    }

    return false;
  } catch (error) {
    console.error('Error checking state access:', error);
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