import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";

// Real-time tool update interfaces
interface ToolUpdateEvent {
  id: string;
  toolId: string;
  toolName: string;
  deploymentId?: string;
  spaceId?: string;
  userId: string;
  updateType: 'state_change' | 'value_update' | 'configuration_change' | 'deployment_update' | 'execution_result' | 'error' | 'status_change';
  eventData: {
    previousState?: any;
    newState?: any;
    changedFields: string[];
    executionResult?: any;
    errorMessage?: string;
    metadata: Record<string, any>;
  };
  affectedUsers: string[]; // Users who should receive this update
  timestamp: string;
  sequenceNumber: number;
  broadcastChannels: string[];
  requiresAck: boolean;
  expiresAt?: string;
}

interface ToolStateSnapshot {
  toolId: string;
  deploymentId?: string;
  spaceId?: string;
  currentState: any;
  lastUpdate: string;
  version: number;
  activeConnections: string[];
  pendingUpdates: ToolUpdateEvent[];
  metadata: {
    createdAt: string;
    updatedBy: string;
    syncStatus: 'synced' | 'pending' | 'conflict' | 'error';
    conflictResolution?: 'manual' | 'automatic' | 'latest_wins';
  };
}

interface ToolSyncRequest {
  toolId: string;
  deploymentId?: string;
  clientVersion: number;
  requestedFields?: string[];
  connectionId: string;
  includeHistory: boolean;
  conflictResolution: 'manual' | 'automatic' | 'latest_wins';
}

interface ToolConflictResolution {
  conflictId: string;
  toolId: string;
  deploymentId?: string;
  conflictingUpdates: ToolUpdateEvent[];
  resolutionStrategy: 'manual' | 'automatic' | 'latest_wins' | 'merge';
  resolvedState: any;
  resolvedBy: string;
  resolvedAt: string;
}

// POST - Process tool update and broadcast to subscribers
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const {
      toolId,
      deploymentId,
      spaceId,
      updateType,
      eventData,
      targetUsers = [], // Specific users to notify, empty = all tool users
      broadcastToSpace = true,
      requiresAck = false,
      expiresInMinutes = 60
    } = body;

    if (!toolId || !updateType || !eventData) {
      return NextResponse.json(ApiResponseHelper.error("Tool ID, update type, and event data are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Verify user has permission to update this tool
    const hasPermission = await verifyToolUpdatePermission(user.uid, toolId, deploymentId, spaceId);
    if (!hasPermission) {
      return NextResponse.json(ApiResponseHelper.error("Not authorized to update this tool", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get tool information
    const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    const tool = toolDoc.data();
    if (!tool) {
      return NextResponse.json(ApiResponseHelper.error("Tool data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Determine affected users
    let affectedUsers = targetUsers;
    if (affectedUsers.length === 0) {
      affectedUsers = await getToolUsers(toolId, deploymentId, spaceId);
    }

    // Get current tool state for conflict detection
    const currentSnapshot = await getToolStateSnapshot(toolId, deploymentId);
    
    // Generate sequence number for ordering
    const sequenceNumber = await getNextSequenceNumber(toolId, deploymentId);

    // Create update event
    const updateEvent: ToolUpdateEvent = {
      id: `tool_update_${toolId}_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
      toolId,
      toolName: tool?.name || 'Unknown Tool',
      deploymentId,
      spaceId,
      userId: user.uid,
      updateType,
      eventData: {
        ...eventData,
        changedFields: eventData.changedFields || [],
        metadata: {
          ...eventData.metadata,
          triggeredBy: user.uid,
          timestamp: new Date().toISOString()
        }
      },
      affectedUsers,
      timestamp: new Date().toISOString(),
      sequenceNumber,
      broadcastChannels: generateBroadcastChannels(toolId, deploymentId, spaceId, broadcastToSpace),
      requiresAck,
      expiresAt: expiresInMinutes ? new Date(Date.now() + expiresInMinutes * 60 * 1000).toISOString() : undefined
    };

    // Store update event
    await dbAdmin.collection('toolUpdateEvents').doc(updateEvent.id).set(updateEvent);

    // Update tool state snapshot
    await updateToolStateSnapshot(updateEvent, currentSnapshot);

    // Broadcast update to affected channels
    await broadcastToolUpdate(updateEvent);

    // Send notifications to affected users
    await notifyAffectedUsers(updateEvent, affectedUsers);

    // Handle acknowledgment tracking if required
    if (requiresAck) {
      await initializeAckTracking(updateEvent);
    }

    return NextResponse.json({
      success: true,
      updateEvent: {
        id: updateEvent.id,
        toolId,
        updateType,
        sequenceNumber,
        affectedUsers: affectedUsers.length,
        timestamp: updateEvent.timestamp
      }
    });
  } catch (error) {
    logger.error(
      `Error processing tool update at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to process tool update", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - Get tool updates and sync information
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get('toolId');
    const deploymentId = searchParams.get('deploymentId');
    const spaceId = searchParams.get('spaceId');
    const since = searchParams.get('since'); // Get updates since timestamp
    const limit = parseInt(searchParams.get('limit') || '50');
    const includeSnapshot = searchParams.get('includeSnapshot') === 'true';

    if (!toolId) {
      return NextResponse.json(ApiResponseHelper.error("Tool ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Verify user has access to this tool
    const hasAccess = await verifyToolAccess(user.uid, toolId, deploymentId ?? undefined, spaceId ?? undefined);
    if (!hasAccess) {
      return NextResponse.json(ApiResponseHelper.error("Access denied to this tool", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Build query for updates
    let updatesQuery = dbAdmin.collection('toolUpdateEvents')
      .where('toolId', '==', toolId);

    if (deploymentId) {
      updatesQuery = updatesQuery.where('deploymentId', '==', deploymentId);
    }

    if (spaceId) {
      updatesQuery = updatesQuery.where('spaceId', '==', spaceId);
    }

    if (since) {
      updatesQuery = updatesQuery.where('timestamp', '>', since);
    }

    updatesQuery = updatesQuery
      .orderBy('sequenceNumber', 'desc')
      .limit(limit);

    const updatesSnapshot = await updatesQuery.get();
    const updates = updatesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ToolUpdateEvent[];

    // Get current tool state snapshot if requested
    let stateSnapshot = null;
    if (includeSnapshot) {
      stateSnapshot = await getToolStateSnapshot(toolId, deploymentId ?? undefined);
    }

    // Get sync status
    const syncStatus = await getToolSyncStatus(toolId, deploymentId ?? undefined, user.uid);

    return NextResponse.json({
      success: true,
      updates: updates.reverse(), // Return in chronological order
      stateSnapshot,
      syncStatus,
      hasMore: updatesSnapshot.docs.length === limit,
      lastSequenceNumber: updates.length > 0 ? Math.max(...updates.map(u => u.sequenceNumber)) : 0
    });
  } catch (error) {
    logger.error(
      `Error getting tool updates at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to get tool updates", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PUT - Sync tool state and resolve conflicts
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const {
      toolId,
      deploymentId,
      clientVersion,
      clientState,
      conflictResolution = 'latest_wins',
      forceMerge = false
    } = body;

    if (!toolId || clientVersion === undefined || !clientState) {
      return NextResponse.json(ApiResponseHelper.error("Tool ID, client version, and client state are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Verify access
    const hasAccess = await verifyToolAccess(user.uid, toolId, deploymentId ?? undefined);
    if (!hasAccess) {
      return NextResponse.json(ApiResponseHelper.error("Access denied to this tool", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get current server state
    const serverSnapshot = await getToolStateSnapshot(toolId, deploymentId);
    
    if (!serverSnapshot) {
      // No server state exists, create new one with client state
      await createToolStateSnapshot(toolId, deploymentId, clientState, user.uid);
      
      return NextResponse.json({
        success: true,
        syncResult: 'client_state_accepted',
        serverState: clientState,
        serverVersion: 1,
        conflicts: []
      });
    }

    // Check for conflicts
    const hasConflict = serverSnapshot.version !== clientVersion;
    
    if (!hasConflict && !forceMerge) {
      // No conflict, update server state
      const syncUpdateEvent: ToolUpdateEvent = {
        id: `sync_${toolId}_${Date.now()}`,
        toolId,
        toolName: 'Tool', // This would need to be fetched properly
        deploymentId,
        spaceId: undefined,
        userId: user.uid,
        updateType: 'state_change',
        eventData: {
          previousState: serverSnapshot.currentState,
          newState: clientState,
          changedFields: getChangedFields(serverSnapshot.currentState, clientState),
          metadata: { syncedFrom: 'client' }
        },
        affectedUsers: [],
        timestamp: new Date().toISOString(),
        sequenceNumber: 0,
        broadcastChannels: [],
        requiresAck: false
      };
      await updateToolStateSnapshot(syncUpdateEvent, serverSnapshot);

      return NextResponse.json({
        success: true,
        syncResult: 'sync_successful',
        serverState: clientState,
        serverVersion: serverSnapshot.version + 1,
        conflicts: []
      });
    }

    // Handle conflict resolution
    const conflictResolutionResult = await resolveToolStateConflict(
      toolId,
      deploymentId,
      serverSnapshot,
      clientState,
      clientVersion,
      conflictResolution,
      user.uid
    );

    return NextResponse.json({
      success: true,
      syncResult: 'conflict_resolved',
      serverState: conflictResolutionResult.resolvedState,
      serverVersion: conflictResolutionResult.newVersion,
      conflicts: conflictResolutionResult.conflicts,
      resolutionStrategy: conflictResolution
    });
  } catch (error) {
    logger.error(
      `Error syncing tool state at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to sync tool state", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE - Clean up old tool updates and events
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get('toolId');
    const deploymentId = searchParams.get('deploymentId');
    const olderThan = searchParams.get('olderThan'); // ISO string
    const eventId = searchParams.get('eventId'); // Delete specific event

    if (!toolId) {
      return NextResponse.json(ApiResponseHelper.error("Tool ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Verify permission to clean up tool data
    const hasPermission = await verifyToolUpdatePermission(user.uid, toolId, deploymentId ?? undefined);
    if (!hasPermission) {
      return NextResponse.json(ApiResponseHelper.error("Not authorized to clean up this tool", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    let deletedCount = 0;

    if (eventId) {
      // Delete specific event
      const eventDoc = await dbAdmin.collection('toolUpdateEvents').doc(eventId).get();
      if (eventDoc.exists && eventDoc.data()?.toolId === toolId) {
        await dbAdmin.collection('toolUpdateEvents').doc(eventId).delete();
        deletedCount = 1;
      }
    } else if (olderThan) {
      // Delete events older than specified date
      const cutoffDate = new Date(olderThan).toISOString();
      let cleanupQuery = dbAdmin.collection('toolUpdateEvents')
        .where('toolId', '==', toolId)
        .where('timestamp', '<', cutoffDate);

      if (deploymentId) {
        cleanupQuery = cleanupQuery.where('deploymentId', '==', deploymentId);
      }

      const cleanupSnapshot = await cleanupQuery.get();
      const deletePromises = cleanupSnapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletePromises);
      deletedCount = cleanupSnapshot.size;
    } else {
      return NextResponse.json(ApiResponseHelper.error("Event ID or olderThan parameter required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    return NextResponse.json({
      success: true,
      deletedCount,
      message: `Cleaned up ${deletedCount} tool update events`
    });
  } catch (error) {
    logger.error(
      `Error cleaning up tool updates at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to clean up tool updates", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to verify tool update permission
async function verifyToolUpdatePermission(
  userId: string,
  toolId: string,
  deploymentId?: string,
  spaceId?: string
): Promise<boolean> {
  try {
    // Check if user owns the tool
    const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
      return false;
    }

    const tool = toolDoc.data();
    if (tool?.authorId === userId) {
      return true;
    }

    // Check deployment permissions if deploymentId provided
    if (deploymentId) {
      const deploymentDoc = await dbAdmin.collection('toolDeployments').doc(deploymentId).get();
      if (deploymentDoc.exists) {
        const deployment = deploymentDoc.data();
        if (deployment?.deployedBy === userId) {
          return true;
        }
      }
    }

    // Check space permissions if spaceId provided
    if (spaceId) {
      const memberQuery = dbAdmin.collection('members')
        .where('userId', '==', userId)
        .where('spaceId', '==', spaceId)
        .where('status', '==', 'active')
        .where('campusId', '==', CURRENT_CAMPUS_ID);

      const memberSnapshot = await memberQuery.get();
      if (!memberSnapshot.empty) {
        const memberData = memberSnapshot.docs[0].data();
        return ['builder', 'moderator', 'admin'].includes(memberData.role || 'member');
      }
    }

    return false;
  } catch (error) {
    logger.error(
      `Error verifying tool update permission at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
    return false;
  }
}

// Helper function to verify tool access
async function verifyToolAccess(
  userId: string,
  toolId: string,
  deploymentId?: string,
  spaceId?: string
): Promise<boolean> {
  try {
    // Tool owners always have access
    const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
    if (toolDoc.exists && toolDoc.data()?.authorId === userId) {
      return true;
    }

    // Check deployment access
    if (deploymentId) {
      const deploymentDoc = await dbAdmin.collection('toolDeployments').doc(deploymentId).get();
      if (deploymentDoc.exists) {
        const deployment = deploymentDoc.data();
        
        // Check if user deployed this tool or is in the space
        if (deployment?.deployedBy === userId) {
          return true;
        }
        
        if (deployment?.spaceId) {
          const memberQuery = dbAdmin.collection('members')
            .where('userId', '==', userId)
            .where('spaceId', '==', deployment.spaceId)
            .where('status', '==', 'active')
            .where('campusId', '==', CURRENT_CAMPUS_ID);
          
          const memberSnapshot = await memberQuery.get();
          return !memberSnapshot.empty;
        }
      }
    }

    // Check space access
    if (spaceId) {
      const memberQuery = dbAdmin.collection('members')
        .where('userId', '==', userId)
        .where('spaceId', '==', spaceId)
        .where('status', '==', 'active')
        .where('campusId', '==', CURRENT_CAMPUS_ID);
      
      const memberSnapshot = await memberQuery.get();
      return !memberSnapshot.empty;
    }

    return false;
  } catch (error) {
    logger.error(
      `Error verifying tool access at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
    return false;
  }
}

// Helper function to get tool users
async function getToolUsers(toolId: string, deploymentId?: string, spaceId?: string): Promise<string[]> {
  try {
    const users = new Set<string>();

    // Add tool owner
    const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
    if (toolDoc.exists) {
      const tool = toolDoc.data();
      if (tool?.authorId) {
        users.add(tool.authorId);
      }
    }

    // Add deployment users
    if (deploymentId) {
      const deploymentDoc = await dbAdmin.collection('toolDeployments').doc(deploymentId).get();
      if (deploymentDoc.exists) {
        const deployment = deploymentDoc.data();
        if (deployment?.deployedBy) {
          users.add(deployment.deployedBy);
        }
        
        // Add space members if deployed to space
        if (deployment?.spaceId) {
          const spaceMembers = await getSpaceMembers(deployment.spaceId);
          spaceMembers.forEach(member => users.add(member));
        }
      }
    }

    // Add space members if spaceId provided
    if (spaceId) {
      const spaceMembers = await getSpaceMembers(spaceId);
      spaceMembers.forEach(member => users.add(member));
    }

    return Array.from(users);
  } catch (error) {
    logger.error(
      `Error getting tool users at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
    return [];
  }
}

// Helper function to get space members
async function getSpaceMembers(spaceId: string): Promise<string[]> {
  try {
    const memberQuery = dbAdmin.collection('members')
      .where('spaceId', '==', spaceId)
      .where('status', '==', 'active')
      .where('campusId', '==', CURRENT_CAMPUS_ID);

    const memberSnapshot = await memberQuery.get();
    return memberSnapshot.docs.map(doc => doc.data().userId);
  } catch (error) {
    logger.error(
      `Error getting space members at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
    return [];
  }
}

// Helper function to get next sequence number
async function getNextSequenceNumber(toolId: string, deploymentId?: string): Promise<number> {
  try {
    const snapshotId = deploymentId ? `${toolId}_${deploymentId}` : toolId;
    const snapshotDoc = await dbAdmin.collection('toolStateSnapshots').doc(snapshotId).get();
    
    if (snapshotDoc.exists) {
      const snapshot = snapshotDoc.data() as ToolStateSnapshot;
      return snapshot.version + 1;
    }
    
    return 1;
  } catch (error) {
    logger.error(
      `Error getting next sequence number at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
    return Date.now(); // Fallback to timestamp
  }
}

// Helper function to generate broadcast channels
function generateBroadcastChannels(
  toolId: string,
  deploymentId?: string,
  spaceId?: string,
  broadcastToSpace = true
): string[] {
  const channels: string[] = [];
  
  // Tool-specific channel
  channels.push(`tool:${toolId}:updates`);
  
  // Deployment-specific channel
  if (deploymentId) {
    channels.push(`deployment:${deploymentId}:updates`);
  }
  
  // Space-specific channel
  if (spaceId && broadcastToSpace) {
    channels.push(`space:${spaceId}:tools`);
  }
  
  return channels;
}

// Helper function to get tool state snapshot
async function getToolStateSnapshot(toolId: string, deploymentId?: string): Promise<ToolStateSnapshot | null> {
  try {
    const snapshotId = deploymentId ? `${toolId}_${deploymentId}` : toolId;
    const snapshotDoc = await dbAdmin.collection('toolStateSnapshots').doc(snapshotId).get();
    
    if (snapshotDoc.exists) {
      return { ...snapshotDoc.data() } as ToolStateSnapshot;
    }
    
    return null;
  } catch (error) {
    logger.error(
      `Error getting tool state snapshot at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
    return null;
  }
}

// Helper function to update tool state snapshot
async function updateToolStateSnapshot(updateEvent: ToolUpdateEvent, currentSnapshot?: ToolStateSnapshot | null): Promise<void> {
  try {
    const snapshotId = updateEvent.deploymentId ? `${updateEvent.toolId}_${updateEvent.deploymentId}` : updateEvent.toolId;
    
    let newSnapshot: ToolStateSnapshot;
    
    if (currentSnapshot) {
      newSnapshot = {
        ...currentSnapshot,
        currentState: updateEvent.eventData.newState || currentSnapshot.currentState,
        lastUpdate: updateEvent.timestamp,
        version: updateEvent.sequenceNumber,
        metadata: {
          ...currentSnapshot.metadata,
          updatedBy: updateEvent.userId,
          syncStatus: 'synced'
        }
      };
    } else {
      newSnapshot = {
        toolId: updateEvent.toolId,
        deploymentId: updateEvent.deploymentId,
        spaceId: updateEvent.spaceId,
        currentState: updateEvent.eventData.newState || {},
        lastUpdate: updateEvent.timestamp,
        version: updateEvent.sequenceNumber,
        activeConnections: [],
        pendingUpdates: [],
        metadata: {
          createdAt: updateEvent.timestamp,
          updatedBy: updateEvent.userId,
          syncStatus: 'synced'
        }
      };
    }
    
    await dbAdmin.collection('toolStateSnapshots').doc(snapshotId).set(newSnapshot);
  } catch (error) {
    logger.error(
      `Error updating tool state snapshot at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to create tool state snapshot
async function createToolStateSnapshot(
  toolId: string,
  deploymentId: string | undefined,
  state: any,
  userId: string
): Promise<void> {
  try {
    const snapshotId = deploymentId ? `${toolId}_${deploymentId}` : toolId;
    
    const snapshot: ToolStateSnapshot = {
      toolId,
      deploymentId,
      currentState: state,
      lastUpdate: new Date().toISOString(),
      version: 1,
      activeConnections: [],
      pendingUpdates: [],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedBy: userId,
        syncStatus: 'synced'
      }
    };
    
    await dbAdmin.collection('toolStateSnapshots').doc(snapshotId).set(snapshot);
  } catch (error) {
    logger.error(
      `Error creating tool state snapshot at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to broadcast tool update
async function broadcastToolUpdate(updateEvent: ToolUpdateEvent): Promise<void> {
  try {
    for (const channel of updateEvent.broadcastChannels) {
      const realtimeMessage = {
        id: `tool_update_broadcast_${updateEvent.id}_${Date.now()}`,
        type: 'tool_update',
        channel,
        senderId: 'system',
        content: {
          action: 'tool_updated',
          updateEvent: {
            id: updateEvent.id,
            toolId: updateEvent.toolId,
            toolName: updateEvent.toolName,
            updateType: updateEvent.updateType,
            timestamp: updateEvent.timestamp,
            sequenceNumber: updateEvent.sequenceNumber,
            eventData: updateEvent.eventData
          }
        },
        metadata: {
          timestamp: new Date().toISOString(),
          priority: 'normal',
          requiresAck: updateEvent.requiresAck,
          expiresAt: updateEvent.expiresAt,
          retryCount: 0
        },
        delivery: {
          sent: [],
          delivered: [],
          read: [],
          failed: []
        }
      };

      await dbAdmin.collection('realtimeMessages').add(realtimeMessage);
    }
  } catch (error) {
    logger.error(
      `Error broadcasting tool update at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to notify affected users
async function notifyAffectedUsers(updateEvent: ToolUpdateEvent, userIds: string[]): Promise<void> {
  try {
    for (const userId of userIds) {
      const notification = {
        targetUserId: userId,
        type: 'tool_update',
        title: `${updateEvent.toolName} Updated`,
        content: `Tool "${updateEvent.toolName}" has been updated with ${updateEvent.updateType}`,
        sourceId: updateEvent.toolId,
        sourceType: 'tool',
        spaceId: updateEvent.spaceId,
        metadata: {
          priority: 'normal',
          actionUrl: `/tools/${updateEvent.toolId}${updateEvent.deploymentId ? `?deployment=${updateEvent.deploymentId}` : ''}`,
          category: 'tool_update',
          tags: ['tool', updateEvent.updateType]
        },
        deliveryChannels: ['in_app']
      };

      // Call notification API (would be implemented separately)
      // await createNotification(notification);
    }
  } catch (error) {
    logger.error(
      `Error notifying affected users at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to initialize acknowledgment tracking
async function initializeAckTracking(updateEvent: ToolUpdateEvent): Promise<void> {
  try {
    const ackTracking = {
      updateEventId: updateEvent.id,
      toolId: updateEvent.toolId,
      requiredAcks: updateEvent.affectedUsers,
      receivedAcks: [],
      ackDeadline: updateEvent.expiresAt || new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour default
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    await dbAdmin.collection('toolUpdateAcks').doc(updateEvent.id).set(ackTracking);
  } catch (error) {
    logger.error(
      `Error initializing ack tracking at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to get tool sync status
async function getToolSyncStatus(toolId: string, deploymentId?: string, userId?: string): Promise<any> {
  try {
    const snapshot = await getToolStateSnapshot(toolId, deploymentId);
    
    if (!snapshot) {
      return {
        status: 'no_state',
        lastSync: null,
        version: 0,
        pendingUpdates: 0
      };
    }

    return {
      status: snapshot.metadata.syncStatus,
      lastSync: snapshot.lastUpdate,
      version: snapshot.version,
      pendingUpdates: snapshot.pendingUpdates.length,
      activeConnections: snapshot.activeConnections.length
    };
  } catch (error) {
    logger.error(
      `Error getting tool sync status at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
    return {
      status: 'error',
      lastSync: null,
      version: 0,
      pendingUpdates: 0
    };
  }
}

// Helper function to get changed fields
function getChangedFields(oldState: any, newState: any): string[] {
  const changes: string[] = [];
  
  // Simple field comparison (could be enhanced for deep comparison)
  const allKeys = new Set([...Object.keys(oldState || {}), ...Object.keys(newState || {})]);
  
  for (const key of allKeys) {
    if (JSON.stringify(oldState?.[key]) !== JSON.stringify(newState?.[key])) {
      changes.push(key);
    }
  }
  
  return changes;
}

// Helper function to resolve tool state conflicts
async function resolveToolStateConflict(
  toolId: string,
  deploymentId: string | undefined,
  serverSnapshot: ToolStateSnapshot,
  clientState: any,
  clientVersion: number,
  strategy: string,
  userId: string
): Promise<any> {
  try {
    let resolvedState: any;
    const conflicts: any[] = [];

    switch (strategy) {
      case 'latest_wins':
        resolvedState = serverSnapshot.currentState; // Server wins by default
        break;
        
      case 'client_wins':
        resolvedState = clientState;
        break;
        
      case 'merge':
        // Simple merge strategy - could be enhanced
        resolvedState = { ...serverSnapshot.currentState, ...clientState };
        break;
        
      default:
        resolvedState = serverSnapshot.currentState;
    }

    // Update server state with resolution
    const conflictResolutionEvent: ToolUpdateEvent = {
      id: `conflict_resolution_${toolId}_${Date.now()}`,
      toolId,
      toolName: 'Tool', // This would need to be fetched properly
      deploymentId,
      spaceId: undefined,
      userId,
      updateType: 'configuration_change',
      eventData: {
        previousState: serverSnapshot.currentState,
        newState: resolvedState,
        changedFields: getChangedFields(serverSnapshot.currentState, resolvedState),
        metadata: { 
          conflictResolution: strategy,
          clientVersion,
          serverVersion: serverSnapshot.version
        }
      },
      affectedUsers: [],
      timestamp: new Date().toISOString(),
      sequenceNumber: 0,
      broadcastChannels: [],
      requiresAck: false
    };
    await updateToolStateSnapshot(conflictResolutionEvent, serverSnapshot);

    return {
      resolvedState,
      newVersion: serverSnapshot.version + 1,
      conflicts,
      strategy
    };
  } catch (error) {
    logger.error(
      `Error resolving tool state conflict at /api/realtime/tool-updates`,
      error instanceof Error ? error : new Error(String(error))
    );
    throw error;
  }
}
