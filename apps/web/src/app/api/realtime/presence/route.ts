import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { getCurrentUser } from '@/lib/auth/providers/auth-server';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import { sseRealtimeService } from '@/lib/services/sse-realtime-service';

// Presence indicator interfaces
interface UserPresence {
  userId: string;
  userName: string;
  userRole?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: string;
  currentActivity: {
    type: 'viewing' | 'editing' | 'chatting' | 'using_tool' | 'idle';
    context?: {
      spaceId?: string;
      spaceName?: string;
      toolId?: string;
      toolName?: string;
      channelId?: string;
      channelName?: string;
      pageUrl?: string;
      documentId?: string;
    };
    startedAt: string;
    details?: string;
  };
  device: {
    type: 'desktop' | 'mobile' | 'tablet' | 'unknown';
    platform: string;
    browser?: string;
  };
  connections: {
    connectionId: string;
    establishedAt: string;
    lastPing: string;
  }[];
  settings: {
    showOnlineStatus: boolean;
    showCurrentActivity: boolean;
    allowDisturbance: boolean;
    invisibleMode: boolean;
  };
  metadata: {
    timezone: string;
    locale: string;
    lastActivityUpdate: string;
  };
}

interface SpacePresence {
  spaceId: string;
  spaceName: string;
  activeUsers: {
    userId: string;
    userName: string;
    status: string;
    activity: string;
    joinedAt: string;
  }[];
  recentActivity: {
    userId: string;
    userName: string;
    action: string;
    timestamp: string;
    context?: any;
  }[];
  statistics: {
    totalOnline: number;
    totalActive: number;
    totalMembers: number;
    averageSessionDuration: number;
    peakOnlineTime: string;
  };
  lastUpdate: string;
}

interface ActivityContext {
  spaceId?: string;
  toolId?: string;
  channelId?: string;
  pageUrl?: string;
  documentId?: string;
  customData?: Record<string, any>;
}

interface PresenceEvent {
  id: string;
  userId: string;
  eventType: 'status_change' | 'activity_change' | 'join_space' | 'leave_space' | 'tool_interaction' | 'heartbeat';
  previousStatus?: string;
  newStatus?: string;
  context?: ActivityContext;
  timestamp: string;
  broadcastToSpaces: string[];
}

// POST - Update user presence and activity
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const {
      status,
      activity,
      context,
      connectionId,
      device,
      settings
    } = body;

    if (!status && !activity) {
      return NextResponse.json(ApiResponseHelper.error("Status or activity update is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get current presence
    const currentPresence = await getUserPresence(user.uid);
    
    // Prepare presence update
    const presenceUpdate: Partial<UserPresence> = {
      userId: user.uid,
      userName: user.displayName || user.email || 'Unknown User',
      lastSeen: new Date().toISOString(),
      metadata: {
        timezone: 'UTC',
        locale: 'en-US',
        lastActivityUpdate: new Date().toISOString()
      }
    };

    // Update status if provided
    if (status) {
      presenceUpdate.status = status;
    }

    // Update activity if provided
    if (activity) {
      presenceUpdate.currentActivity = {
        type: activity.type,
        context: activity.context,
        startedAt: activity.startedAt || new Date().toISOString(),
        details: activity.details
      };
    }

    // Update device info if provided
    if (device) {
      presenceUpdate.device = device;
    }

    // Update settings if provided
    if (settings) {
      presenceUpdate.settings = { 
        ...getDefaultPresenceSettings(), 
        ...settings 
      };
    }

    // Update connection info if provided
    if (connectionId) {
      const newConnection = {
        connectionId,
        establishedAt: currentPresence?.connections?.find(c => c.connectionId === connectionId)?.establishedAt || new Date().toISOString(),
        lastPing: new Date().toISOString()
      };

      const existingConnections = currentPresence?.connections || [];
      const updatedConnections = existingConnections.filter(c => c.connectionId !== connectionId);
      updatedConnections.push(newConnection);
      
      presenceUpdate.connections = updatedConnections;
    }

    // Store presence update
    await dbAdmin.collection('userPresence').doc(user.uid).update(presenceUpdate);

    // Create presence event
    const presenceEvent: PresenceEvent = {
      id: `presence_${user.uid}_${Date.now()}`,
      userId: user.uid,
      eventType: status ? 'status_change' : 'activity_change',
      previousStatus: currentPresence?.status,
      newStatus: status || currentPresence?.status,
      context,
      timestamp: new Date().toISOString(),
      broadcastToSpaces: await getUserSpaces(user.uid)
    };

    // Store presence event
    await dbAdmin.collection('presenceEvents').doc(presenceEvent.id).set(presenceEvent);

    // Broadcast presence update to relevant spaces
    await broadcastPresenceUpdate(presenceEvent);

    // Update space presence statistics
    if (context?.spaceId) {
      await updateSpacePresence(context.spaceId, presenceEvent);
    }

    return NextResponse.json({
      success: true,
      presence: {
        userId: user.uid,
        status: presenceUpdate.status || currentPresence?.status,
        activity: presenceUpdate.currentActivity || currentPresence?.currentActivity,
        lastUpdate: presenceUpdate.metadata?.lastActivityUpdate
      }
    });
  } catch (error) {
    logger.error('Error updating user presence', { error: error, endpoint: '/api/realtime/presence' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update presence", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - Get presence information
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get('spaceId');
    const userId = searchParams.get('userId');
    const includeActivity = searchParams.get('includeActivity') === 'true';
    const includeOffline = searchParams.get('includeOffline') === 'true';

    if (userId) {
      // Get specific user's presence
      const userPresence = await getUserPresence(userId);
      
      if (!userPresence) {
        return NextResponse.json(ApiResponseHelper.error("User presence not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
      }

      // Check if requesting user has permission to see this presence
      const canView = await canViewUserPresence(user.uid, userId, spaceId ?? undefined);
      if (!canView) {
        return NextResponse.json({ 
          presence: getPrivacyFilteredPresence(userPresence) 
        });
      }

      return NextResponse.json({ presence: userPresence });
    } else if (spaceId) {
      // Get space presence
      const spacePresence = await getSpacePresence(spaceId, user.uid, includeOffline);
      
      if (!spacePresence) {
        return NextResponse.json(ApiResponseHelper.error("Space not found or access denied", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
      }

      return NextResponse.json({ spacePresence });
    } else {
      // Get user's own presence and active spaces
      const userPresence = await getUserPresence(user.uid);
      const userSpaces = await getUserSpaces(user.uid);
      
      // Get presence summary for user's spaces
      const spacePresenceSummaries = await Promise.all(
        userSpaces.map(async spaceId => {
          const spacePresence = await getSpacePresence(spaceId, user.uid, false);
          return {
            spaceId,
            onlineCount: spacePresence?.statistics.totalOnline || 0,
            activeCount: spacePresence?.statistics.totalActive || 0
          };
        })
      );

      return NextResponse.json({
        userPresence,
        spacePresenceSummaries,
        activeSpaces: userSpaces.length
      });
    }
  } catch (error) {
    logger.error('Error getting presence information', { error: error, endpoint: '/api/realtime/presence' });
    return NextResponse.json(ApiResponseHelper.error("Failed to get presence information", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PUT - Update presence settings
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { settings } = body;

    if (!settings) {
      return NextResponse.json(ApiResponseHelper.error("Settings are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get current presence
    const currentPresence = await getUserPresence(user.uid);
    
    // Update settings
    const updatedSettings = {
      ...getDefaultPresenceSettings(),
      ...currentPresence?.settings,
      ...settings
    };

    await dbAdmin.collection('userPresence').doc(user.uid).update({
      settings: updatedSettings,
      'metadata.lastActivityUpdate': new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      settings: updatedSettings
    });
  } catch (error) {
    logger.error('Error updating presence settings', { error: error, endpoint: '/api/realtime/presence' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update presence settings", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE - Remove user presence or clean up old data
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const connectionId = searchParams.get('connectionId');
    const cleanupOld = searchParams.get('cleanupOld') === 'true';
    const olderThan = searchParams.get('olderThan');

    if (connectionId) {
      // Remove specific connection
      const currentPresence = await getUserPresence(user.uid);
      if (currentPresence?.connections) {
        const updatedConnections = currentPresence.connections.filter(c => c.connectionId !== connectionId);
        
        await dbAdmin.collection('userPresence').doc(user.uid).update({
          connections: updatedConnections,
          status: updatedConnections.length === 0 ? 'offline' : currentPresence.status,
          'metadata.lastActivityUpdate': new Date().toISOString()
        });

        // Broadcast offline status if no connections remain
        if (updatedConnections.length === 0) {
          await broadcastPresenceUpdate({
            id: `presence_disconnect_${user.uid}_${Date.now()}`,
            userId: user.uid,
            eventType: 'status_change',
            previousStatus: currentPresence.status,
            newStatus: 'offline',
            timestamp: new Date().toISOString(),
            broadcastToSpaces: await getUserSpaces(user.uid)
          });
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Connection removed'
      });
    } else if (cleanupOld && olderThan) {
      // Clean up old presence events
      const cutoffDate = new Date(olderThan).toISOString();
      const oldEventsQuery = dbAdmin.collection('presenceEvents')
        .where('userId', '==', user.uid)
        .where('timestamp', '<', cutoffDate);

      const oldEventsSnapshot = await oldEventsQuery.get();
      const deletePromises = oldEventsSnapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletePromises);

      return NextResponse.json({
        success: true,
        deletedEvents: oldEventsSnapshot.size
      });
    } else {
      // Set user offline
      await dbAdmin.collection('userPresence').doc(user.uid).update({
        status: 'offline',
        connections: [],
        'metadata.lastActivityUpdate': new Date().toISOString()
      });

      // Broadcast offline status
      await broadcastPresenceUpdate({
        id: `presence_offline_${user.uid}_${Date.now()}`,
        userId: user.uid,
        eventType: 'status_change',
        newStatus: 'offline',
        timestamp: new Date().toISOString(),
        broadcastToSpaces: await getUserSpaces(user.uid)
      });

      return NextResponse.json({
        success: true,
        message: 'User set to offline'
      });
    }
  } catch (error) {
    logger.error('Error updating presence', { error: error, endpoint: '/api/realtime/presence' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update presence", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to get user presence
async function getUserPresence(userId: string): Promise<UserPresence | null> {
  try {
    const presenceDoc = await dbAdmin.collection('userPresence').doc(userId).get();
    
    if (presenceDoc.exists) {
      return { ...presenceDoc.data() } as UserPresence;
    }
    
    return null;
  } catch (error) {
    logger.error('Error getting user presence', { error: error, endpoint: '/api/realtime/presence' });
    return null;
  }
}

// Helper function to get space presence
async function getSpacePresence(spaceId: string, requestingUserId: string, includeOffline = false): Promise<SpacePresence | null> {
  try {
    // Verify user has access to space
    const hasAccess = await verifySpaceAccess(requestingUserId, spaceId);
    if (!hasAccess) {
      return null;
    }

    // Get space members
    const spaceMembers = await getSpaceMembers(spaceId);
    
    // Get presence for each member
    const memberPresences: UserPresence[] = [];
    for (const memberId of spaceMembers) {
      const presence = await getUserPresence(memberId);
      if (presence && (includeOffline || presence.status !== 'offline')) {
        memberPresences.push(presence);
      }
    }

    // Get space info
    const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();
    const spaceData = spaceDoc.exists ? spaceDoc.data() : null;
    const spaceName = spaceData?.name ?? 'Unknown Space';

    // Build active users list
    const activeUsers = memberPresences
      .filter(p => p.status !== 'offline')
      .map(p => ({
        userId: p.userId,
        userName: p.userName,
        status: p.status,
        activity: p.currentActivity.type,
        joinedAt: p.currentActivity.startedAt
      }));

    // Get recent activity
    const recentActivity = await getRecentSpaceActivity(spaceId);

    // Calculate statistics
    const onlineStatuses = ['online', 'away', 'busy'];
    const totalOnline = memberPresences.filter(p => onlineStatuses.includes(p.status)).length;
    const totalActive = memberPresences.filter(p => 
      p.status !== 'offline' && 
      p.currentActivity.type !== 'idle' &&
      new Date(p.currentActivity.startedAt).getTime() > Date.now() - 30 * 60 * 1000 // Active in last 30 minutes
    ).length;

    const spacePresence: SpacePresence = {
      spaceId,
      spaceName,
      activeUsers,
      recentActivity,
      statistics: {
        totalOnline,
        totalActive,
        totalMembers: spaceMembers.length,
        averageSessionDuration: 0, // Could be calculated from historical data
        peakOnlineTime: '' // Could be calculated from historical data
      },
      lastUpdate: new Date().toISOString()
    };

    return spacePresence;
  } catch (error) {
    logger.error('Error getting space presence', { error: error, endpoint: '/api/realtime/presence' });
    return null;
  }
}

// Helper function to get user spaces
async function getUserSpaces(userId: string): Promise<string[]> {
  try {
    const memberQuery = dbAdmin.collection('members')
      .where('userId', '==', userId)
      .where('status', '==', 'active');

    const memberSnapshot = await memberQuery.get();
    return memberSnapshot.docs.map(doc => doc.data().spaceId);
  } catch (error) {
    logger.error('Error getting user spaces', { error: error, endpoint: '/api/realtime/presence' });
    return [];
  }
}

// Helper function to get space members
async function getSpaceMembers(spaceId: string): Promise<string[]> {
  try {
    const memberQuery = dbAdmin.collection('members')
      .where('spaceId', '==', spaceId)
      .where('status', '==', 'active');

    const memberSnapshot = await memberQuery.get();
    return memberSnapshot.docs.map(doc => doc.data().userId);
  } catch (error) {
    logger.error('Error getting space members', { error: error, endpoint: '/api/realtime/presence' });
    return [];
  }
}

// Helper function to verify space access
async function verifySpaceAccess(userId: string, spaceId: string): Promise<boolean> {
  try {
    const memberQuery = dbAdmin.collection('members')
      .where('userId', '==', userId)
      .where('spaceId', '==', spaceId)
      .where('status', '==', 'active');

    const memberSnapshot = await memberQuery.get();
    return !memberSnapshot.empty;
  } catch (error) {
    logger.error('Error verifying space access', { error: error, endpoint: '/api/realtime/presence' });
    return false;
  }
}

// Helper function to check if user can view another user's presence
async function canViewUserPresence(viewerId: string, targetUserId: string, spaceId?: string): Promise<boolean> {
  // Users can always view their own presence
  if (viewerId === targetUserId) {
    return true;
  }

  // Get target user's privacy settings
  const targetPresence = await getUserPresence(targetUserId);
  if (!targetPresence || targetPresence.settings.invisibleMode) {
    return false;
  }

  // Check if they're in the same space
  if (spaceId) {
    const viewerHasAccess = await verifySpaceAccess(viewerId, spaceId);
    const targetHasAccess = await verifySpaceAccess(targetUserId, spaceId);
    return viewerHasAccess && targetHasAccess;
  }

  // Check if they share any spaces
  const viewerSpaces = await getUserSpaces(viewerId);
  const targetSpaces = await getUserSpaces(targetUserId);
  const sharedSpaces = viewerSpaces.filter(space => targetSpaces.includes(space));
  
  return sharedSpaces.length > 0;
}

// Helper function to get privacy-filtered presence
function getPrivacyFilteredPresence(presence: UserPresence): Partial<UserPresence> {
  return {
    userId: presence.userId,
    userName: presence.userName,
    status: presence.settings.showOnlineStatus ? presence.status : 'offline',
    lastSeen: presence.lastSeen,
    currentActivity: presence.settings.showCurrentActivity ? presence.currentActivity : {
      type: 'idle',
      startedAt: presence.currentActivity.startedAt
    }
  };
}

// Helper function to get default presence settings
function getDefaultPresenceSettings() {
  return {
    showOnlineStatus: true,
    showCurrentActivity: true,
    allowDisturbance: true,
    invisibleMode: false
  };
}

// Helper function to broadcast presence update
async function broadcastPresenceUpdate(presenceEvent: PresenceEvent): Promise<void> {
  try {
    // Broadcast to each space the user is in
    for (const spaceId of presenceEvent.broadcastToSpaces) {
      const realtimeMessage = {
        id: `presence_broadcast_${presenceEvent.id}_${spaceId}`,
        type: 'presence',
        channel: `space:${spaceId}:presence`,
        senderId: 'system',
        content: {
          action: 'presence_updated',
          userId: presenceEvent.userId,
          eventType: presenceEvent.eventType,
          previousStatus: presenceEvent.previousStatus,
          newStatus: presenceEvent.newStatus,
          context: presenceEvent.context,
          timestamp: presenceEvent.timestamp
        },
        metadata: {
          timestamp: new Date().toISOString(),
          priority: 'low',
          requiresAck: false,
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
    logger.error('Error broadcasting presence update', { error: error, endpoint: '/api/realtime/presence' });
  }
}

// Helper function to update space presence
async function updateSpacePresence(spaceId: string, presenceEvent: PresenceEvent): Promise<void> {
  try {
    const spacePresenceId = `space_presence_${spaceId}`;
    
    // Get current space presence stats
    const spacePresenceDoc = await dbAdmin.collection('spacePresenceStats').doc(spacePresenceId).get();
    
    let currentStats = {
      spaceId,
      totalOnline: 0,
      totalActive: 0,
      lastUpdate: new Date().toISOString(),
      recentEvents: []
    };

    if (spacePresenceDoc.exists) {
      currentStats = { ...currentStats, ...spacePresenceDoc.data() };
    }

    // Add this event to recent events
    const recentEvent = {
      userId: presenceEvent.userId,
      eventType: presenceEvent.eventType,
      timestamp: presenceEvent.timestamp,
      context: presenceEvent.context
    };

    const updatedRecentEvents = [recentEvent, ...currentStats.recentEvents].slice(0, 20); // Keep last 20 events

    // Update stats
    await dbAdmin.collection('spacePresenceStats').doc(spacePresenceId).set({
      ...currentStats,
      recentEvents: updatedRecentEvents,
      lastUpdate: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error updating space presence', { error: error, endpoint: '/api/realtime/presence' });
  }
}

// Helper function to get recent space activity
async function getRecentSpaceActivity(spaceId: string, limit = 10): Promise<any[]> {
  try {
    const statsDoc = await dbAdmin.collection('spacePresenceStats').doc(`space_presence_${spaceId}`).get();
    
    if (statsDoc.exists) {
      const data = statsDoc.data();
      return (data?.recentEvents || []).slice(0, limit).map((event: any) => ({
        userId: event.userId,
        userName: event.userName || 'Unknown User',
        action: event.eventType,
        timestamp: event.timestamp,
        context: event.context
      }));
    }
    
    return [];
  } catch (error) {
    logger.error('Error getting recent space activity', { error: error, endpoint: '/api/realtime/presence' });
    return [];
  }
}

// Background cleanup function for stale presence data
async function cleanupStalePresence(): Promise<number> {
  try {
    const staleThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours
    const stalePresenceQuery = dbAdmin.collection('userPresence')
      .where('metadata.lastActivityUpdate', '<', staleThreshold.toISOString());

    const stalePresenceSnapshot = await stalePresenceQuery.get();
    let cleaned = 0;

    for (const presenceDoc of stalePresenceSnapshot.docs) {
      // Set to offline instead of deleting
      await presenceDoc.ref.update({
        status: 'offline',
        connections: [],
        'metadata.lastActivityUpdate': new Date().toISOString()
      });
      cleaned++;
    }

    return cleaned;
  } catch (error) {
    logger.error('Error cleaning up stale presence', { error: error, endpoint: '/api/realtime/presence' });
    return 0;
  }
}