import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { sseRealtimeService } from '@/lib/sse-realtime-service';

// Real-time chat interfaces
interface ChatMessage {
  id: string;
  channelId: string;
  spaceId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  messageType: 'text' | 'tool_result' | 'file' | 'image' | 'system' | 'reaction';
  metadata: {
    timestamp: string;
    editedAt?: string;
    replyToMessageId?: string;
    toolId?: string;
    toolResult?: any;
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    isEdited: boolean;
    isDeleted: boolean;
  };
  reactions: Record<string, {
    emoji: string;
    users: string[];
    count: number;
  }>;
  mentions: string[];
  threadCount: number;
  delivery: {
    sent: boolean;
    delivered: string[];
    read: string[];
    failed: string[];
  };
}

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
  };
  lastMessage?: {
    id: string;
    content: string;
    senderId: string;
    timestamp: string;
  };
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

interface TypingIndicator {
  userId: string;
  userName: string;
  channelId: string;
  spaceId: string;
  startedAt: string;
  expiresAt: string;
}

interface ChatAnalytics {
  totalMessages: number;
  activeChannels: number;
  activeUsers: number;
  messageFrequency: Record<string, number>;
  toolIntegrationCount: number;
  averageResponseTime: number;
  peakActivityHours: number[];
}

// POST - Send a new chat message
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const {
      channelId,
      spaceId,
      content,
      messageType = 'text',
      replyToMessageId,
      toolId,
      toolResult,
      mentions = []
    } = body;

    if (!channelId || !spaceId || !content) {
      return NextResponse.json(ApiResponseHelper.error("Channel ID, space ID, and content are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Verify user has access to channel and space
    const hasAccess = await verifyChannelAccess(user.uid, channelId, spaceId);
    if (!hasAccess) {
      return NextResponse.json(ApiResponseHelper.error("Access denied to channel", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get user's space context for role information
    const userContext = await getUserSpaceContext(user.uid, spaceId);
    if (!userContext) {
      return NextResponse.json(ApiResponseHelper.error("User not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Check channel moderation settings
    const channel = await getChannel(channelId);
    if (!channel) {
      return NextResponse.json(ApiResponseHelper.error("Channel not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    if (!canSendMessage(userContext, channel)) {
      return NextResponse.json(ApiResponseHelper.error("Not permitted to send messages in this channel", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Generate message ID
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create message object
    const message: ChatMessage = {
      id: messageId,
      channelId,
      spaceId,
      senderId: user.uid,
      senderName: user.displayName || user.email || 'Unknown User',
      senderRole: userContext.role,
      content,
      messageType,
      metadata: {
        timestamp: new Date().toISOString(),
        replyToMessageId,
        toolId,
        toolResult,
        isEdited: false,
        isDeleted: false
      },
      reactions: {},
      mentions,
      threadCount: 0,
      delivery: {
        sent: true,
        delivered: [],
        read: [user.uid], // Sender automatically reads their own message
        failed: []
      }
    };

    // Store message in Firestore for persistence
    await dbAdmin.collection('chatMessages').doc(messageId).set(message);

    // Send message to Firebase Realtime Database for real-time updates
    await sseRealtimeService.sendChatMessage(spaceId, user.uid, content, messageType);

    // Update channel's last message
    await updateChannelLastMessage(channelId, message);

    // Send real-time message to channel subscribers via WebSocket system
    await broadcastMessageToChannel(message, channel);

    // Handle mentions with real-time notifications
    if (mentions.length > 0) {
      await handleMessageMentions(message, mentions);
    }

    // Update analytics
    await updateChatAnalytics(spaceId, messageType);

    return NextResponse.json({
      success: true,
      message: {
        id: message.id,
        timestamp: message.metadata.timestamp,
        channelId,
        spaceId
      }
    });
  } catch (error) {
    logger.error(
      `Error sending chat message at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to send message", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - Get chat messages for a channel
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');
    const spaceId = searchParams.get('spaceId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const before = searchParams.get('before'); // For pagination
    const includeThreads = searchParams.get('includeThreads') === 'true';

    if (!channelId || !spaceId) {
      return NextResponse.json(ApiResponseHelper.error("Channel ID and space ID are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Verify access
    const hasAccess = await verifyChannelAccess(user.uid, channelId, spaceId);
    if (!hasAccess) {
      return NextResponse.json(ApiResponseHelper.error("Access denied to channel", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Build query
    let messagesQuery = dbAdmin.collection('chatMessages')
      .where('channelId', '==', channelId)
      .where('metadata.isDeleted', '==', false)
      .orderBy('metadata.timestamp', 'desc')
      .limit(limit);

    // Add pagination if specified
    if (before) {
      const beforeDoc = await dbAdmin.collection('chatMessages').doc(before).get();
      if (beforeDoc.exists) {
        messagesQuery = messagesQuery.startAfter(beforeDoc);
      }
    }

    const messagesSnapshot = await messagesQuery.get();
    const messages = messagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ChatMessage[];

    // Mark messages as read for this user
    await markMessagesAsRead(user.uid, channelId, messages.map(m => m.id));

    // Get channel info
    const channel = await getChannel(channelId);

    // Get threads if requested
    let threads = {};
    if (includeThreads) {
      const threadPromises = messages
        .filter(m => m.threadCount > 0)
        .map(async m => {
          const threadMessages = await getThreadMessages(m.id);
          return [m.id, threadMessages];
        });
      
      const threadResults = await Promise.all(threadPromises);
      threads = Object.fromEntries(threadResults);
    }

    return NextResponse.json({
      success: true,
      messages: messages.reverse(), // Return in chronological order
      channel,
      threads,
      hasMore: messagesSnapshot.docs.length === limit,
      lastMessageId: messages.length > 0 ? messages[messages.length - 1].id : null
    });
  } catch (error) {
    logger.error(
      `Error getting chat messages at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to get messages", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PUT - Update a chat message (edit, react, etc.)
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const {
      messageId,
      action, // 'edit', 'react', 'unreact', 'delete'
      content,
      emoji,
      spaceId
    } = body;

    if (!messageId || !action) {
      return NextResponse.json(ApiResponseHelper.error("Message ID and action are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get message
    const messageDoc = await dbAdmin.collection('chatMessages').doc(messageId).get();
    if (!messageDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Message not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const message = { id: messageDoc.id, ...messageDoc.data() } as ChatMessage;

    // Verify permissions
    const canPerformAction = await verifyMessageAction(user.uid, message, action, spaceId);
    if (!canPerformAction) {
      return NextResponse.json(ApiResponseHelper.error("Not authorized to perform this action", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    let updates: any = {};

    switch (action) {
      case 'edit':
        if (message.senderId !== user.uid) {
          return NextResponse.json(ApiResponseHelper.error("Can only edit your own messages", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
        }
        updates = {
          content,
          'metadata.editedAt': new Date().toISOString(),
          'metadata.isEdited': true
        };
        break;

      case 'react': {
        const reactionKey = emoji;
        const currentReaction = message.reactions[reactionKey];
        
        if (currentReaction && currentReaction.users.includes(user.uid)) {
          return NextResponse.json(ApiResponseHelper.error("Already reacted with this emoji", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
        }

        updates[`reactions.${reactionKey}`] = {
          emoji,
          users: [...(currentReaction?.users || []), user.uid],
          count: (currentReaction?.count || 0) + 1
        };
        break;
      }

      case 'unreact': {
        const unreactKey = emoji;
        const existingReaction = message.reactions[unreactKey];
        
        if (!existingReaction || !existingReaction.users.includes(user.uid)) {
          return NextResponse.json(ApiResponseHelper.error("No reaction to remove", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
        }

        const updatedUsers = existingReaction.users.filter(uid => uid !== user.uid);
        
        if (updatedUsers.length === 0) {
          updates[`reactions.${unreactKey}`] = null; // Remove the reaction entirely
        } else {
          updates[`reactions.${unreactKey}`] = {
            emoji,
            users: updatedUsers,
            count: updatedUsers.length
          };
        }
        break;
      }

      case 'delete':
        if (message.senderId !== user.uid) {
          // Check if user is admin/moderator
          const userContext = await getUserSpaceContext(user.uid, message.spaceId);
          if (!userContext || !['admin', 'moderator'].includes(userContext.role)) {
            return NextResponse.json(ApiResponseHelper.error("Not authorized to delete this message", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
          }
        }
        updates = {
          'metadata.isDeleted': true,
          content: '[Message deleted]'
        };
        break;

      default:
        return NextResponse.json(ApiResponseHelper.error("Invalid action", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Apply updates
    await dbAdmin.collection('chatMessages').doc(messageId).update(updates);

    // Broadcast update to channel
    if (action !== 'delete') {
      await broadcastMessageUpdate(messageId, action, updates, message.channelId);
    }

    return NextResponse.json({
      success: true,
      action,
      messageId,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error(
      `Error updating chat message at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to update message", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE - Delete a chat message
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get('messageId');

    if (!messageId) {
      return NextResponse.json(ApiResponseHelper.error("Message ID required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get message
    const messageDoc = await dbAdmin.collection('chatMessages').doc(messageId).get();
    if (!messageDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Message not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const message = { id: messageDoc.id, ...messageDoc.data() } as ChatMessage;

    // Check permissions
    const canDelete = message.senderId === user.uid || 
      await hasModeratorPermissions(user.uid, message.spaceId);
    
    if (!canDelete) {
      return NextResponse.json(ApiResponseHelper.error("Not authorized to delete this message", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Soft delete the message
    await dbAdmin.collection('chatMessages').doc(messageId).update({
      'metadata.isDeleted': true,
      content: '[Message deleted]'
    });

    // Broadcast deletion to channel
    await broadcastMessageDeletion(messageId, message.channelId);

    return NextResponse.json({
      success: true,
      messageId,
      deletedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error(
      `Error deleting chat message at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to delete message", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to verify channel access
async function verifyChannelAccess(userId: string, channelId: string, spaceId: string): Promise<boolean> {
  try {
    // Check space membership
    const memberQuery = dbAdmin.collection('members')
      .where('userId', '==', userId)
      .where('spaceId', '==', spaceId)
      .where('status', '==', 'active');

    const memberSnapshot = await memberQuery.get();
    if (memberSnapshot.empty) {
      return false;
    }

    // Check channel access
    const channel = await getChannel(channelId);
    if (!channel || !channel.isActive) {
      return false;
    }

    // Check if user is in channel participants (for private channels)
    if (channel.type === 'private' && !channel.participants.includes(userId)) {
      return false;
    }

    return true;
  } catch (error) {
    logger.error(
      `Error verifying channel access at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
    return false;
  }
}

// Helper function to get channel information
async function getChannel(channelId: string): Promise<ChatChannel | null> {
  try {
    const channelDoc = await dbAdmin.collection('chatChannels').doc(channelId).get();
    if (!channelDoc.exists) {
      return null;
    }
    return { id: channelDoc.id, ...channelDoc.data() } as ChatChannel;
  } catch (error) {
    logger.error(
      `Error getting channel at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
    return null;
  }
}

// Helper function to get user's space context
async function getUserSpaceContext(userId: string, spaceId: string): Promise<any> {
  try {
    const memberQuery = dbAdmin.collection('members')
      .where('userId', '==', userId)
      .where('spaceId', '==', spaceId)
      .where('status', '==', 'active');

    const memberSnapshot = await memberQuery.get();
    if (memberSnapshot.empty) {
      return null;
    }

    return memberSnapshot.docs[0].data();
  } catch (error) {
    logger.error(
      `Error getting user space context at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
    return null;
  }
}

// Helper function to check if user can send messages in channel
function canSendMessage(userContext: any, channel: ChatChannel): boolean {
  const userRole = userContext.role || 'member';
  
  switch (channel.settings.moderationLevel) {
    case 'admin_only':
      return ['admin'].includes(userRole);
    case 'moderated':
      return ['admin', 'moderator', 'builder'].includes(userRole);
    case 'open':
    default:
      return true;
  }
}

// Helper function to update channel's last message
async function updateChannelLastMessage(channelId: string, message: ChatMessage): Promise<void> {
  try {
    await dbAdmin.collection('chatChannels').doc(channelId).update({
      lastMessage: {
        id: message.id,
        content: message.content.substring(0, 100),
        senderId: message.senderId,
        timestamp: message.metadata.timestamp
      },
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error(
      `Error updating channel last message at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to broadcast message to channel subscribers
async function broadcastMessageToChannel(message: ChatMessage, channel: ChatChannel): Promise<void> {
  try {
    // Create real-time message for WebSocket broadcast
    const realtimeMessage = {
      id: `chat_${message.id}_${Date.now()}`,
      type: 'chat',
      channel: `space:${message.spaceId}:chat`,
      senderId: 'system',
      content: {
        action: 'new_message',
        message,
        channelName: channel.name
      },
      metadata: {
        timestamp: new Date().toISOString(),
        priority: 'normal',
        requiresAck: true,
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
  } catch (error) {
    logger.error(
      `Error broadcasting message at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to handle message mentions
async function handleMessageMentions(message: ChatMessage, mentions: string[]): Promise<void> {
  try {
    for (const mentionedUserId of mentions) {
      // Create notification for mentioned user
      const notification = {
        id: `mention_${message.id}_${mentionedUserId}`,
        type: 'notification',
        channel: `user:${mentionedUserId}:notifications`,
        senderId: 'system',
        content: {
          type: 'mention',
          messageId: message.id,
          channelId: message.channelId,
          spaceId: message.spaceId,
          senderName: message.senderName,
          messagePreview: message.content.substring(0, 100)
        },
        metadata: {
          timestamp: new Date().toISOString(),
          priority: 'high',
          requiresAck: true,
          retryCount: 0
        },
        delivery: {
          sent: [],
          delivered: [],
          read: [],
          failed: []
        }
      };

      await dbAdmin.collection('realtimeMessages').add(notification);
    }
  } catch (error) {
    logger.error(
      `Error handling mentions at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to verify message action permissions
async function verifyMessageAction(userId: string, message: ChatMessage, action: string, spaceId?: string): Promise<boolean> {
  // User can always react to messages they can see
  if (action === 'react' || action === 'unreact') {
    return true;
  }

  // User can edit/delete their own messages
  if (message.senderId === userId) {
    return true;
  }

  // Moderators/admins can delete any message
  if (action === 'delete' && spaceId) {
    return await hasModeratorPermissions(userId, spaceId);
  }

  return false;
}

// Helper function to check moderator permissions
async function hasModeratorPermissions(userId: string, spaceId: string): Promise<boolean> {
  try {
    const userContext = await getUserSpaceContext(userId, spaceId);
    return userContext && ['admin', 'moderator'].includes(userContext.role);
  } catch (error) {
    logger.error(
      `Error checking moderator permissions at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
    return false;
  }
}

// Helper function to mark messages as read
async function markMessagesAsRead(userId: string, channelId: string, messageIds: string[]): Promise<void> {
  try {
    // Update read status for each message
    const updatePromises = messageIds.map(messageId =>
      dbAdmin.collection('chatMessages').doc(messageId).update({
        [`delivery.read`]: [...new Set([...[], userId])] // Add user to read array
      })
    );

    await Promise.all(updatePromises);
  } catch (error) {
    logger.error(
      `Error marking messages as read at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to get thread messages
async function getThreadMessages(parentMessageId: string): Promise<ChatMessage[]> {
  try {
    const threadQuery = dbAdmin.collection('chatMessages')
      .where('metadata.replyToMessageId', '==', parentMessageId)
      .where('metadata.isDeleted', '==', false)
      .orderBy('metadata.timestamp', 'asc')
      .limit(20);

    const threadSnapshot = await threadQuery.get();
    return threadSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ChatMessage[];
  } catch (error) {
    logger.error(
      `Error getting thread messages at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
    return [];
  }
}

// Helper function to broadcast message updates
async function broadcastMessageUpdate(messageId: string, action: string, updates: any, channelId: string): Promise<void> {
  try {
    const updateMessage = {
      id: `chat_update_${messageId}_${Date.now()}`,
      type: 'chat',
      channel: `channel:${channelId}:updates`,
      senderId: 'system',
      content: {
        action: 'message_updated',
        messageId,
        updateType: action,
        updates
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

    await dbAdmin.collection('realtimeMessages').add(updateMessage);
  } catch (error) {
    logger.error(
      `Error broadcasting message update at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to broadcast message deletion
async function broadcastMessageDeletion(messageId: string, channelId: string): Promise<void> {
  try {
    const deletionMessage = {
      id: `chat_delete_${messageId}_${Date.now()}`,
      type: 'chat',
      channel: `channel:${channelId}:updates`,
      senderId: 'system',
      content: {
        action: 'message_deleted',
        messageId
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

    await dbAdmin.collection('realtimeMessages').add(deletionMessage);
  } catch (error) {
    logger.error(
      `Error broadcasting message deletion at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to update chat analytics
async function updateChatAnalytics(spaceId: string, messageType: string): Promise<void> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const analyticsId = `${spaceId}_${today}`;

    const analyticsDoc = await dbAdmin.collection('chatAnalytics').doc(analyticsId).get();
    
    if (analyticsDoc.exists) {
      const currentData = analyticsDoc.data();
      if (currentData) {
        await dbAdmin.collection('chatAnalytics').doc(analyticsId).update({
          totalMessages: (currentData.totalMessages || 0) + 1,
          [`messageFrequency.${messageType}`]: (currentData.messageFrequency?.[messageType] || 0) + 1,
          lastUpdate: new Date().toISOString()
        });
      }
    } else {
      await dbAdmin.collection('chatAnalytics').doc(analyticsId).set({
        spaceId,
        date: today,
        totalMessages: 1,
        messageFrequency: { [messageType]: 1 },
        createdAt: new Date().toISOString(),
        lastUpdate: new Date().toISOString()
      });
    }
  } catch (error) {
    logger.error(
      `Error updating chat analytics at /api/realtime/chat`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}