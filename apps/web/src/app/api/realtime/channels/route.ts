import { NextRequest, NextResponse } from 'next/server';
import { collection, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, query, where, getDocs, orderBy, limit as fbLimit } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

// Chat channel interfaces
interface ChatChannel {
  id: string;
  spaceId: string;
  name: string;
  description?: string;
  type: 'general' | 'announcements' | 'tools' | 'events' | 'private' | 'thread';
  parentChannelId?: string; // For thread channels
  participants: string[];
  admins: string[];
  settings: {
    allowFiles: boolean;
    allowReactions: boolean;
    allowThreads: boolean;
    allowMentions: boolean;
    moderationLevel: 'open' | 'moderated' | 'admin_only';
    retentionDays: number;
    maxParticipants?: number;
  };
  lastMessage?: {
    id: string;
    content: string;
    senderId: string;
    senderName: string;
    timestamp: string;
  };
  unreadCount: Record<string, number>; // userId -> unread count
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  isActive: boolean;
  isArchived: boolean;
}

interface ChannelMembership {
  userId: string;
  channelId: string;
  spaceId: string;
  role: 'member' | 'admin';
  joinedAt: string;
  lastReadMessageId?: string;
  lastReadTimestamp?: string;
  notificationSettings: {
    muteUntil?: string;
    mentions: boolean;
    allMessages: boolean;
  };
  isActive: boolean;
}

// POST - Create a new chat channel
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      spaceId,
      name,
      description,
      type = 'general',
      parentChannelId,
      participants = [],
      settings = getDefaultChannelSettings(),
      isPrivate = false
    } = body;

    if (!spaceId || !name) {
      return NextResponse.json({ error: 'Space ID and channel name are required' }, { status: 400 });
    }

    // Verify user has permission to create channels in this space
    const canCreate = await verifyChannelCreatePermission(user.uid, spaceId);
    if (!canCreate) {
      return NextResponse.json({ error: 'Not authorized to create channels in this space' }, { status: 403 });
    }

    // Validate channel name is unique in space
    const existingChannel = await checkChannelNameExists(spaceId, name);
    if (existingChannel) {
      return NextResponse.json({ error: 'Channel name already exists in this space' }, { status: 409 });
    }

    // Generate channel ID
    const channelId = `ch_${spaceId}_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;

    // Determine initial participants
    let initialParticipants = [user.uid];
    if (isPrivate) {
      initialParticipants = [...new Set([...initialParticipants, ...participants])];
    } else {
      // For public channels, get all space members
      const spaceMembers = await getSpaceMembers(spaceId);
      initialParticipants = spaceMembers;
    }

    const channel: ChatChannel = {
      id: channelId,
      spaceId,
      name,
      description,
      type: isPrivate ? 'private' : type,
      parentChannelId,
      participants: initialParticipants,
      admins: [user.uid],
      settings,
      unreadCount: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user.uid,
      isActive: true,
      isArchived: false
    };

    // Create channel in Firestore
    await setDoc(doc(db, 'chatChannels', channelId), channel);

    // Create channel memberships for all participants
    await createChannelMemberships(channelId, spaceId, initialParticipants, user.uid);

    // Send system message for channel creation
    await sendChannelSystemMessage(channelId, spaceId, 'channel_created', {
      channelName: name,
      createdBy: user.displayName || user.email
    });

    // Broadcast channel creation to space
    await broadcastChannelUpdate(spaceId, channelId, 'channel_created', channel);

    return NextResponse.json({
      success: true,
      channel: {
        id: channelId,
        name,
        type: channel.type,
        participantCount: initialParticipants.length
      }
    });
  } catch (error) {
    console.error('Error creating chat channel:', error);
    return NextResponse.json({ error: 'Failed to create channel' }, { status: 500 });
  }
}

// GET - Get chat channels for a space or user
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get('spaceId');
    const includeArchived = searchParams.get('includeArchived') === 'true';
    const includeUnreadCounts = searchParams.get('includeUnreadCounts') === 'true';

    if (!spaceId) {
      return NextResponse.json({ error: 'Space ID required' }, { status: 400 });
    }

    // Verify user has access to space
    const hasAccess = await verifySpaceAccess(user.uid, spaceId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied to space' }, { status: 403 });
    }

    // Get user's channel memberships
    const membershipQuery = query(
      collection(db, 'channelMemberships'),
      where('userId', '==', user.uid),
      where('spaceId', '==', spaceId),
      where('isActive', '==', true)
    );

    const membershipSnapshot = await getDocs(membershipQuery);
    const channelIds = membershipSnapshot.docs.map(doc => doc.data().channelId);

    if (channelIds.length === 0) {
      return NextResponse.json({
        channels: [],
        totalCount: 0
      });
    }

    // Get channels user has access to
    const channels: ChatChannel[] = [];
    
    for (const channelId of channelIds) {
      const channelDoc = await getDoc(doc(db, 'chatChannels', channelId));
      if (channelDoc.exists()) {
        const channelData = { id: channelDoc.id, ...channelDoc.data() } as ChatChannel;
        
        // Filter by archived status
        if (!includeArchived && channelData.isArchived) {
          continue;
        }
        
        // Add unread count if requested
        if (includeUnreadCounts) {
          channelData.unreadCount = { [user.uid]: await getUnreadCount(user.uid, channelId) };
        }
        
        channels.push(channelData);
      }
    }

    // Sort channels by last activity
    channels.sort((a, b) => {
      const aTime = a.lastMessage?.timestamp || a.updatedAt;
      const bTime = b.lastMessage?.timestamp || b.updatedAt;
      return new Date(bTime).getTime() - new Date(aTime).getTime();
    });

    return NextResponse.json({
      channels,
      totalCount: channels.length
    });
  } catch (error) {
    console.error('Error getting chat channels:', error);
    return NextResponse.json({ error: 'Failed to get channels' }, { status: 500 });
  }
}

// PUT - Update a chat channel
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      channelId,
      name,
      description,
      settings,
      participants,
      action = 'update' // 'update', 'add_participants', 'remove_participants', 'archive', 'unarchive'
    } = body;

    if (!channelId) {
      return NextResponse.json({ error: 'Channel ID required' }, { status: 400 });
    }

    // Get channel
    const channelDoc = await getDoc(doc(db, 'chatChannels', channelId));
    if (!channelDoc.exists()) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    const channel = { id: channelDoc.id, ...channelDoc.data() } as ChatChannel;

    // Verify user has permission to modify channel
    const canModify = await verifyChannelModifyPermission(user.uid, channel);
    if (!canModify) {
      return NextResponse.json({ error: 'Not authorized to modify this channel' }, { status: 403 });
    }

    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    switch (action) {
      case 'update':
        if (name) updates.name = name;
        if (description !== undefined) updates.description = description;
        if (settings) updates.settings = { ...channel.settings, ...settings };
        break;

      case 'add_participants':
        if (participants && Array.isArray(participants)) {
          const newParticipants = [...new Set([...channel.participants, ...participants])];
          updates.participants = newParticipants;
          
          // Create memberships for new participants
          const addedParticipants = participants.filter(p => !channel.participants.includes(p));
          if (addedParticipants.length > 0) {
            await createChannelMemberships(channelId, channel.spaceId, addedParticipants, user.uid);
          }
        }
        break;

      case 'remove_participants':
        if (participants && Array.isArray(participants)) {
          updates.participants = channel.participants.filter(p => !participants.includes(p));
          
          // Deactivate memberships for removed participants
          await deactivateChannelMemberships(channelId, participants);
        }
        break;

      case 'archive':
        updates.isArchived = true;
        break;

      case 'unarchive':
        updates.isArchived = false;
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Apply updates
    await updateDoc(doc(db, 'chatChannels', channelId), updates);

    // Send system message for significant changes
    if (action === 'add_participants' || action === 'remove_participants') {
      await sendChannelSystemMessage(channelId, channel.spaceId, `participants_${action.split('_')[0]}ed`, {
        participants: participants,
        modifiedBy: user.displayName || user.email
      });
    }

    // Broadcast channel update
    await broadcastChannelUpdate(channel.spaceId, channelId, action, { ...channel, ...updates });

    return NextResponse.json({
      success: true,
      action,
      channelId,
      updatedAt: updates.updatedAt
    });
  } catch (error) {
    console.error('Error updating chat channel:', error);
    return NextResponse.json({ error: 'Failed to update channel' }, { status: 500 });
  }
}

// DELETE - Delete a chat channel
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');

    if (!channelId) {
      return NextResponse.json({ error: 'Channel ID required' }, { status: 400 });
    }

    // Get channel
    const channelDoc = await getDoc(doc(db, 'chatChannels', channelId));
    if (!channelDoc.exists()) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    const channel = { id: channelDoc.id, ...channelDoc.data() } as ChatChannel;

    // Verify user has permission to delete channel
    const canDelete = await verifyChannelDeletePermission(user.uid, channel);
    if (!canDelete) {
      return NextResponse.json({ error: 'Not authorized to delete this channel' }, { status: 403 });
    }

    // Archive channel instead of hard delete (for data retention)
    await updateDoc(doc(db, 'chatChannels', channelId), {
      isActive: false,
      isArchived: true,
      deletedAt: new Date().toISOString(),
      deletedBy: user.uid,
      updatedAt: new Date().toISOString()
    });

    // Deactivate all channel memberships
    await deactivateAllChannelMemberships(channelId);

    // Send system message for channel deletion
    await sendChannelSystemMessage(channelId, channel.spaceId, 'channel_deleted', {
      channelName: channel.name,
      deletedBy: user.displayName || user.email
    });

    // Broadcast channel deletion
    await broadcastChannelUpdate(channel.spaceId, channelId, 'channel_deleted', channel);

    return NextResponse.json({
      success: true,
      channelId,
      message: 'Channel deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting chat channel:', error);
    return NextResponse.json({ error: 'Failed to delete channel' }, { status: 500 });
  }
}

// Helper function to get default channel settings
function getDefaultChannelSettings() {
  return {
    allowFiles: true,
    allowReactions: true,
    allowThreads: true,
    allowMentions: true,
    moderationLevel: 'open',
    retentionDays: 365
  };
}

// Helper function to verify channel creation permission
async function verifyChannelCreatePermission(userId: string, spaceId: string): Promise<boolean> {
  try {
    const memberQuery = query(
      collection(db, 'members'),
      where('userId', '==', userId),
      where('spaceId', '==', spaceId),
      where('status', '==', 'active')
    );

    const memberSnapshot = await getDocs(memberQuery);
    if (memberSnapshot.empty) {
      return false;
    }

    const memberData = memberSnapshot.docs[0].data();
    return ['builder', 'moderator', 'admin'].includes(memberData.role || 'member');
  } catch (error) {
    console.error('Error verifying channel create permission:', error);
    return false;
  }
}

// Helper function to check if channel name exists in space
async function checkChannelNameExists(spaceId: string, name: string): Promise<boolean> {
  try {
    const channelQuery = query(
      collection(db, 'chatChannels'),
      where('spaceId', '==', spaceId),
      where('name', '==', name),
      where('isActive', '==', true)
    );

    const channelSnapshot = await getDocs(channelQuery);
    return !channelSnapshot.empty;
  } catch (error) {
    console.error('Error checking channel name exists:', error);
    return false;
  }
}

// Helper function to get space members
async function getSpaceMembers(spaceId: string): Promise<string[]> {
  try {
    const memberQuery = query(
      collection(db, 'members'),
      where('spaceId', '==', spaceId),
      where('status', '==', 'active')
    );

    const memberSnapshot = await getDocs(memberQuery);
    return memberSnapshot.docs.map(doc => doc.data().userId);
  } catch (error) {
    console.error('Error getting space members:', error);
    return [];
  }
}

// Helper function to create channel memberships
async function createChannelMemberships(
  channelId: string,
  spaceId: string,
  userIds: string[],
  createdBy: string
): Promise<void> {
  try {
    const membershipPromises = userIds.map(userId => {
      const membership: ChannelMembership = {
        userId,
        channelId,
        spaceId,
        role: userId === createdBy ? 'admin' : 'member',
        joinedAt: new Date().toISOString(),
        notificationSettings: {
          mentions: true,
          allMessages: true
        },
        isActive: true
      };

      return setDoc(doc(db, 'channelMemberships', `${channelId}_${userId}`), membership);
    });

    await Promise.all(membershipPromises);
  } catch (error) {
    console.error('Error creating channel memberships:', error);
  }
}

// Helper function to verify space access
async function verifySpaceAccess(userId: string, spaceId: string): Promise<boolean> {
  try {
    const memberQuery = query(
      collection(db, 'members'),
      where('userId', '==', userId),
      where('spaceId', '==', spaceId),
      where('status', '==', 'active')
    );

    const memberSnapshot = await getDocs(memberQuery);
    return !memberSnapshot.empty;
  } catch (error) {
    console.error('Error verifying space access:', error);
    return false;
  }
}

// Helper function to get unread count for user in channel
async function getUnreadCount(userId: string, channelId: string): Promise<number> {
  try {
    // Get user's last read message
    const membershipDoc = await getDoc(doc(db, 'channelMemberships', `${channelId}_${userId}`));
    if (!membershipDoc.exists()) {
      return 0;
    }

    const membership = membershipDoc.data() as ChannelMembership;
    const lastReadTimestamp = membership.lastReadTimestamp || membership.joinedAt;

    // Count messages after last read timestamp
    const unreadQuery = query(
      collection(db, 'chatMessages'),
      where('channelId', '==', channelId),
      where('metadata.timestamp', '>', lastReadTimestamp),
      where('metadata.isDeleted', '==', false)
    );

    const unreadSnapshot = await getDocs(unreadQuery);
    return unreadSnapshot.size;
  } catch (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }
}

// Helper function to verify channel modify permission
async function verifyChannelModifyPermission(userId: string, channel: ChatChannel): Promise<boolean> {
  try {
    // Channel creator and admins can always modify
    if (channel.createdBy === userId || channel.admins.includes(userId)) {
      return true;
    }

    // Space moderators/admins can modify
    const memberQuery = query(
      collection(db, 'members'),
      where('userId', '==', userId),
      where('spaceId', '==', channel.spaceId),
      where('status', '==', 'active')
    );

    const memberSnapshot = await getDocs(memberQuery);
    if (memberSnapshot.empty) {
      return false;
    }

    const memberData = memberSnapshot.docs[0].data();
    return ['moderator', 'admin'].includes(memberData.role || 'member');
  } catch (error) {
    console.error('Error verifying channel modify permission:', error);
    return false;
  }
}

// Helper function to verify channel delete permission
async function verifyChannelDeletePermission(userId: string, channel: ChatChannel): Promise<boolean> {
  try {
    // Only channel creator and space admins can delete channels
    if (channel.createdBy === userId) {
      return true;
    }

    const memberQuery = query(
      collection(db, 'members'),
      where('userId', '==', userId),
      where('spaceId', '==', channel.spaceId),
      where('status', '==', 'active')
    );

    const memberSnapshot = await getDocs(memberQuery);
    if (memberSnapshot.empty) {
      return false;
    }

    const memberData = memberSnapshot.docs[0].data();
    return memberData.role === 'admin';
  } catch (error) {
    console.error('Error verifying channel delete permission:', error);
    return false;
  }
}

// Helper function to deactivate channel memberships
async function deactivateChannelMemberships(channelId: string, userIds: string[]): Promise<void> {
  try {
    const deactivatePromises = userIds.map(userId =>
      updateDoc(doc(db, 'channelMemberships', `${channelId}_${userId}`), {
        isActive: false,
        leftAt: new Date().toISOString()
      })
    );

    await Promise.all(deactivatePromises);
  } catch (error) {
    console.error('Error deactivating channel memberships:', error);
  }
}

// Helper function to deactivate all channel memberships
async function deactivateAllChannelMemberships(channelId: string): Promise<void> {
  try {
    const membershipQuery = query(
      collection(db, 'channelMemberships'),
      where('channelId', '==', channelId),
      where('isActive', '==', true)
    );

    const membershipSnapshot = await getDocs(membershipQuery);
    const deactivatePromises = membershipSnapshot.docs.map(doc =>
      updateDoc(doc.ref, {
        isActive: false,
        leftAt: new Date().toISOString()
      })
    );

    await Promise.all(deactivatePromises);
  } catch (error) {
    console.error('Error deactivating all channel memberships:', error);
  }
}

// Helper function to send system message to channel
async function sendChannelSystemMessage(
  channelId: string,
  spaceId: string,
  type: string,
  data: any
): Promise<void> {
  try {
    const systemMessage = {
      id: `sys_${channelId}_${Date.now()}`,
      channelId,
      spaceId,
      senderId: 'system',
      senderName: 'System',
      senderRole: 'system',
      content: formatSystemMessage(type, data),
      messageType: 'system',
      metadata: {
        timestamp: new Date().toISOString(),
        isEdited: false,
        isDeleted: false,
        systemMessageType: type,
        systemMessageData: data
      },
      reactions: {},
      mentions: [],
      threadCount: 0,
      delivery: {
        sent: true,
        delivered: [],
        read: [],
        failed: []
      }
    };

    await setDoc(doc(db, 'chatMessages', systemMessage.id), systemMessage);
  } catch (error) {
    console.error('Error sending system message:', error);
  }
}

// Helper function to format system messages
function formatSystemMessage(type: string, data: any): string {
  switch (type) {
    case 'channel_created':
      return `Channel "${data.channelName}" was created by ${data.createdBy}`;
    case 'participants_added':
      return `${data.modifiedBy} added participants to the channel`;
    case 'participants_removed':
      return `${data.modifiedBy} removed participants from the channel`;
    case 'channel_deleted':
      return `Channel "${data.channelName}" was deleted by ${data.deletedBy}`;
    default:
      return 'Channel updated';
  }
}

// Helper function to broadcast channel updates
async function broadcastChannelUpdate(
  spaceId: string,
  channelId: string,
  action: string,
  channelData: any
): Promise<void> {
  try {
    const updateMessage = {
      id: `channel_update_${channelId}_${Date.now()}`,
      type: 'system',
      channel: `space:${spaceId}:channels`,
      senderId: 'system',
      content: {
        action,
        channelId,
        channelData: {
          id: channelData.id,
          name: channelData.name,
          type: channelData.type,
          participantCount: channelData.participants?.length || 0
        }
      },
      metadata: {
        timestamp: new Date().toISOString(),
        priority: 'normal',
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

    await addDoc(collection(db, 'realtimeMessages'), updateMessage);
  } catch (error) {
    console.error('Error broadcasting channel update:', error);
  }
}