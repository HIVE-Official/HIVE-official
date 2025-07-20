import { NextRequest, NextResponse } from 'next/server';
import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where, getDocs, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

// WebSocket connection interfaces
interface WebSocketConnection {
  id: string;
  userId: string;
  socketId: string;
  spaceId?: string;
  connectionType: 'chat' | 'notifications' | 'tool_updates' | 'presence' | 'feed';
  status: 'connected' | 'disconnected' | 'reconnecting';
  channels: string[];
  metadata: {
    userAgent: string;
    connectionTime: string;
    lastActivity: string;
    platform: string;
    clientVersion: string;
  };
  settings: {
    enableNotifications: boolean;
    enablePresence: boolean;
    enableToolUpdates: boolean;
    messagePreferences: {
      sound: boolean;
      desktop: boolean;
      mobile: boolean;
    };
  };
}

interface RealtimeMessage {
  id: string;
  type: 'chat' | 'notification' | 'tool_update' | 'presence' | 'system';
  channel: string;
  senderId: string;
  targetUsers?: string[];
  content: any;
  metadata: {
    timestamp: string;
    priority: 'low' | 'normal' | 'high' | 'urgent';
    requiresAck: boolean;
    expiresAt?: string;
    retryCount: number;
  };
  delivery: {
    sent: string[];
    delivered: string[];
    read: string[];
    failed: string[];
  };
}

interface ChannelSubscription {
  userId: string;
  channel: string;
  permissions: {
    canRead: boolean;
    canWrite: boolean;
    canModerate: boolean;
  };
  filters: {
    messageTypes: string[];
    senderFilters: string[];
    priorityFilter: string;
  };
  subscriptionTime: string;
  lastActivity: string;
}

// POST - Establish WebSocket connection
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      connectionType = 'notifications',
      spaceId,
      channels = [],
      settings = getDefaultConnectionSettings(),
      clientInfo = {}
    } = body;

    // Generate connection ID
    const connectionId = `conn_${user.uid}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create connection record
    const connection: WebSocketConnection = {
      id: connectionId,
      userId: user.uid,
      socketId: connectionId, // In real implementation, this would be the actual WebSocket ID
      spaceId,
      connectionType,
      status: 'connected',
      channels: channels,
      metadata: {
        userAgent: request.headers.get('user-agent') || 'Unknown',
        connectionTime: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        platform: clientInfo.platform || 'web',
        clientVersion: clientInfo.version || '1.0.0'
      },
      settings
    };

    // Store connection in Firestore
    await setDoc(doc(db, 'realtimeConnections', connectionId), connection);

    // Subscribe to default channels based on connection type
    const defaultChannels = await getDefaultChannels(user.uid, connectionType, spaceId);
    await subscribeToChannels(connectionId, user.uid, defaultChannels);

    // Update user presence
    await updateUserPresence(user.uid, 'online', connectionId);

    // Start connection monitoring
    startConnectionMonitoring(connectionId);

    return NextResponse.json({
      success: true,
      connectionId,
      channels: defaultChannels,
      settings: connection.settings,
      metadata: {
        serverTime: new Date().toISOString(),
        connectionType,
        supportedFeatures: [
          'chat',
          'notifications', 
          'tool_updates',
          'presence',
          'typing_indicators',
          'message_reactions',
          'file_sharing'
        ]
      }
    });
  } catch (error) {
    console.error('Error establishing WebSocket connection:', error);
    return NextResponse.json({ error: 'Failed to establish connection' }, { status: 500 });
  }
}

// GET - Get connection info and channel subscriptions
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const connectionId = searchParams.get('connectionId');
    const includeChannels = searchParams.get('includeChannels') === 'true';

    if (connectionId) {
      // Get specific connection
      const connectionDoc = await getDoc(doc(db, 'realtimeConnections', connectionId));
      if (!connectionDoc.exists() || connectionDoc.data().userId !== user.uid) {
        return NextResponse.json({ error: 'Connection not found' }, { status: 404 });
      }

      const connection = { id: connectionDoc.id, ...connectionDoc.data() };
      
      let channels = [];
      if (includeChannels) {
        channels = await getUserChannelSubscriptions(user.uid);
      }

      return NextResponse.json({
        connection,
        channels,
        serverTime: new Date().toISOString()
      });
    } else {
      // Get all user connections
      const connectionsQuery = query(
        collection(db, 'realtimeConnections'),
        where('userId', '==', user.uid),
        where('status', '==', 'connected')
      );

      const connectionsSnapshot = await getDocs(connectionsQuery);
      const connections = connectionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const channels = includeChannels ? await getUserChannelSubscriptions(user.uid) : [];

      return NextResponse.json({
        connections,
        channels,
        activeConnections: connections.length,
        serverTime: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error getting connection info:', error);
    return NextResponse.json({ error: 'Failed to get connection info' }, { status: 500 });
  }
}

// PUT - Update connection settings or channels
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { connectionId, settings, channels, action = 'update' } = body;

    if (!connectionId) {
      return NextResponse.json({ error: 'Connection ID required' }, { status: 400 });
    }

    // Verify connection ownership
    const connectionDoc = await getDoc(doc(db, 'realtimeConnections', connectionId));
    if (!connectionDoc.exists() || connectionDoc.data().userId !== user.uid) {
      return NextResponse.json({ error: 'Connection not found or not owned' }, { status: 404 });
    }

    const updates: any = {
      'metadata.lastActivity': new Date().toISOString()
    };

    if (settings) {
      updates.settings = settings;
    }

    if (channels) {
      switch (action) {
        case 'subscribe':
          await subscribeToChannels(connectionId, user.uid, channels);
          break;
        case 'unsubscribe':
          await unsubscribeFromChannels(connectionId, user.uid, channels);
          break;
        case 'replace':
          await replaceChannelSubscriptions(connectionId, user.uid, channels);
          break;
      }
    }

    // Update connection
    await updateDoc(doc(db, 'realtimeConnections', connectionId), updates);

    return NextResponse.json({
      success: true,
      connectionId,
      action,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating connection:', error);
    return NextResponse.json({ error: 'Failed to update connection' }, { status: 500 });
  }
}

// DELETE - Close WebSocket connection
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const connectionId = searchParams.get('connectionId');
    const closeAll = searchParams.get('closeAll') === 'true';

    if (closeAll) {
      // Close all connections for user
      const connectionsQuery = query(
        collection(db, 'realtimeConnections'),
        where('userId', '==', user.uid)
      );

      const connectionsSnapshot = await getDocs(connectionsQuery);
      let closedCount = 0;

      for (const connectionDoc of connectionsSnapshot.docs) {
        await closeConnection(connectionDoc.id, user.uid);
        closedCount++;
      }

      // Update user presence to offline
      await updateUserPresence(user.uid, 'offline');

      return NextResponse.json({
        success: true,
        closedConnections: closedCount,
        message: 'All connections closed'
      });
    } else if (connectionId) {
      // Close specific connection
      const success = await closeConnection(connectionId, user.uid);
      
      if (!success) {
        return NextResponse.json({ error: 'Connection not found or not owned' }, { status: 404 });
      }

      // Check if user has other active connections
      const remainingConnectionsQuery = query(
        collection(db, 'realtimeConnections'),
        where('userId', '==', user.uid),
        where('status', '==', 'connected')
      );

      const remainingSnapshot = await getDocs(remainingConnectionsQuery);
      
      if (remainingSnapshot.empty) {
        await updateUserPresence(user.uid, 'offline');
      }

      return NextResponse.json({
        success: true,
        connectionId,
        message: 'Connection closed'
      });
    } else {
      return NextResponse.json({ error: 'Connection ID required' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error closing connection:', error);
    return NextResponse.json({ error: 'Failed to close connection' }, { status: 500 });
  }
}

// Helper function to get default connection settings
function getDefaultConnectionSettings(): WebSocketConnection['settings'] {
  return {
    enableNotifications: true,
    enablePresence: true,
    enableToolUpdates: true,
    messagePreferences: {
      sound: true,
      desktop: true,
      mobile: true
    }
  };
}

// Helper function to get default channels for connection type
async function getDefaultChannels(userId: string, connectionType: string, spaceId?: string): Promise<string[]> {
  const channels: string[] = [];

  // Always subscribe to user-specific channels
  channels.push(`user:${userId}:notifications`);
  channels.push(`user:${userId}:presence`);

  switch (connectionType) {
    case 'chat':
      if (spaceId) {
        channels.push(`space:${spaceId}:chat`);
        channels.push(`space:${spaceId}:typing`);
      }
      break;

    case 'notifications':
      channels.push('system:announcements');
      // Add space notification channels for user's spaces
      const userSpaces = await getUserSpaces(userId);
      userSpaces.forEach(space => {
        channels.push(`space:${space}:notifications`);
      });
      break;

    case 'tool_updates':
      if (spaceId) {
        channels.push(`space:${spaceId}:tools`);
      }
      channels.push(`user:${userId}:tools`);
      break;

    case 'presence':
      if (spaceId) {
        channels.push(`space:${spaceId}:presence`);
      }
      break;

    case 'feed':
      channels.push(`user:${userId}:feed`);
      break;
  }

  return channels;
}

// Helper function to get user's spaces
async function getUserSpaces(userId: string): Promise<string[]> {
  try {
    const membershipsQuery = query(
      collection(db, 'members'),
      where('userId', '==', userId),
      where('status', '==', 'active')
    );

    const membershipsSnapshot = await getDocs(membershipsQuery);
    return membershipsSnapshot.docs.map(doc => doc.data().spaceId);
  } catch (error) {
    console.error('Error getting user spaces:', error);
    return [];
  }
}

// Helper function to subscribe to channels
async function subscribeToChannels(connectionId: string, userId: string, channels: string[]): Promise<void> {
  try {
    for (const channel of channels) {
      const subscription: ChannelSubscription = {
        userId,
        channel,
        permissions: await getChannelPermissions(userId, channel),
        filters: {
          messageTypes: ['all'],
          senderFilters: [],
          priorityFilter: 'normal'
        },
        subscriptionTime: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      };

      const subscriptionId = `${connectionId}_${channel}`;
      await setDoc(doc(db, 'channelSubscriptions', subscriptionId), {
        ...subscription,
        connectionId
      });
    }

    // Update connection with new channels
    const connectionDoc = await getDoc(doc(db, 'realtimeConnections', connectionId));
    if (connectionDoc.exists()) {
      const currentChannels = connectionDoc.data().channels || [];
      const updatedChannels = [...new Set([...currentChannels, ...channels])];
      
      await updateDoc(doc(db, 'realtimeConnections', connectionId), {
        channels: updatedChannels
      });
    }
  } catch (error) {
    console.error('Error subscribing to channels:', error);
  }
}

// Helper function to get channel permissions
async function getChannelPermissions(userId: string, channel: string): Promise<ChannelSubscription['permissions']> {
  // Parse channel format: type:id:subtype
  const [type, id, subtype] = channel.split(':');

  switch (type) {
    case 'user':
      return {
        canRead: id === userId,
        canWrite: id === userId,
        canModerate: id === userId
      };

    case 'space':
      // Check space membership and role
      const membershipQuery = query(
        collection(db, 'members'),
        where('userId', '==', userId),
        where('spaceId', '==', id),
        where('status', '==', 'active')
      );

      const membershipSnapshot = await getDocs(membershipQuery);
      if (membershipSnapshot.empty) {
        return { canRead: false, canWrite: false, canModerate: false };
      }

      const memberData = membershipSnapshot.docs[0].data();
      const role = memberData.role || 'member';

      return {
        canRead: true,
        canWrite: ['builder', 'admin', 'moderator'].includes(role) || subtype !== 'announcements',
        canModerate: ['admin', 'moderator'].includes(role)
      };

    case 'system':
      return {
        canRead: true,
        canWrite: false, // Only system can write to system channels
        canModerate: false
      };

    default:
      return { canRead: false, canWrite: false, canModerate: false };
  }
}

// Helper function to unsubscribe from channels
async function unsubscribeFromChannels(connectionId: string, userId: string, channels: string[]): Promise<void> {
  try {
    for (const channel of channels) {
      const subscriptionId = `${connectionId}_${channel}`;
      await deleteDoc(doc(db, 'channelSubscriptions', subscriptionId));
    }

    // Update connection channels
    const connectionDoc = await getDoc(doc(db, 'realtimeConnections', connectionId));
    if (connectionDoc.exists()) {
      const currentChannels = connectionDoc.data().channels || [];
      const updatedChannels = currentChannels.filter((ch: string) => !channels.includes(ch));
      
      await updateDoc(doc(db, 'realtimeConnections', connectionId), {
        channels: updatedChannels
      });
    }
  } catch (error) {
    console.error('Error unsubscribing from channels:', error);
  }
}

// Helper function to replace channel subscriptions
async function replaceChannelSubscriptions(connectionId: string, userId: string, channels: string[]): Promise<void> {
  try {
    // Get current subscriptions
    const currentSubscriptionsQuery = query(
      collection(db, 'channelSubscriptions'),
      where('connectionId', '==', connectionId)
    );

    const currentSubscriptionsSnapshot = await getDocs(currentSubscriptionsQuery);
    
    // Remove all current subscriptions
    for (const subDoc of currentSubscriptionsSnapshot.docs) {
      await deleteDoc(subDoc.ref);
    }

    // Add new subscriptions
    await subscribeToChannels(connectionId, userId, channels);
  } catch (error) {
    console.error('Error replacing channel subscriptions:', error);
  }
}

// Helper function to get user channel subscriptions
async function getUserChannelSubscriptions(userId: string): Promise<any[]> {
  try {
    const subscriptionsQuery = query(
      collection(db, 'channelSubscriptions'),
      where('userId', '==', userId)
    );

    const subscriptionsSnapshot = await getDocs(subscriptionsQuery);
    return subscriptionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting channel subscriptions:', error);
    return [];
  }
}

// Helper function to update user presence
async function updateUserPresence(userId: string, status: 'online' | 'offline' | 'away', connectionId?: string): Promise<void> {
  try {
    const presenceData = {
      userId,
      status,
      lastSeen: new Date().toISOString(),
      connectionId,
      updatedAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'userPresence', userId), presenceData);

    // Broadcast presence update to relevant channels
    const userSpaces = await getUserSpaces(userId);
    for (const spaceId of userSpaces) {
      await broadcastPresenceUpdate(spaceId, userId, status);
    }
  } catch (error) {
    console.error('Error updating user presence:', error);
  }
}

// Helper function to broadcast presence update
async function broadcastPresenceUpdate(spaceId: string, userId: string, status: string): Promise<void> {
  try {
    const presenceMessage: RealtimeMessage = {
      id: `presence_${userId}_${Date.now()}`,
      type: 'presence',
      channel: `space:${spaceId}:presence`,
      senderId: 'system',
      content: {
        userId,
        status,
        timestamp: new Date().toISOString()
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

    await addDoc(collection(db, 'realtimeMessages'), presenceMessage);
  } catch (error) {
    console.error('Error broadcasting presence update:', error);
  }
}

// Helper function to close connection
async function closeConnection(connectionId: string, userId: string): Promise<boolean> {
  try {
    const connectionDoc = await getDoc(doc(db, 'realtimeConnections', connectionId));
    
    if (!connectionDoc.exists() || connectionDoc.data().userId !== userId) {
      return false;
    }

    // Update connection status
    await updateDoc(doc(db, 'realtimeConnections', connectionId), {
      status: 'disconnected',
      'metadata.lastActivity': new Date().toISOString()
    });

    // Remove channel subscriptions
    const subscriptionsQuery = query(
      collection(db, 'channelSubscriptions'),
      where('connectionId', '==', connectionId)
    );

    const subscriptionsSnapshot = await getDocs(subscriptionsQuery);
    for (const subDoc of subscriptionsSnapshot.docs) {
      await deleteDoc(subDoc.ref);
    }

    return true;
  } catch (error) {
    console.error('Error closing connection:', error);
    return false;
  }
}

// Helper function to start connection monitoring
function startConnectionMonitoring(connectionId: string): void {
  // In a real implementation, this would set up monitoring
  // For now, we'll just log that monitoring started
  console.log(`Started monitoring connection: ${connectionId}`);
}