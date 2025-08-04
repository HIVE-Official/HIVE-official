import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

// Typing indicator interfaces
interface TypingIndicator {
  id: string;
  userId: string;
  userName: string;
  channelId: string;
  spaceId: string;
  startedAt: string;
  expiresAt: string;
  lastUpdate: string;
}

interface TypingStatus {
  channelId: string;
  isTyping: boolean;
  typingUsers: Array<{
    userId: string;
    userName: string;
    startedAt: string;
  }>;
  lastUpdate: string;
}

// POST - Start typing indicator
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { channelId, spaceId } = body;

    if (!channelId || !spaceId) {
      return NextResponse.json(ApiResponseHelper.error("Channel ID and space ID are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Verify access to channel
    const hasAccess = await verifyChannelAccess(user.uid, channelId, spaceId);
    if (!hasAccess) {
      return NextResponse.json(ApiResponseHelper.error("Access denied to channel", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30000); // 30 seconds

    const typingIndicator: TypingIndicator = {
      id: `typing_${user.uid}_${channelId}`,
      userId: user.uid,
      userName: user.displayName || user.email || 'Unknown User',
      channelId,
      spaceId,
      startedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      lastUpdate: now.toISOString()
    };

    // Store typing indicator
    await setDoc(doc(db, 'typingIndicators', typingIndicator.id), typingIndicator);

    // Broadcast typing indicator to channel
    await broadcastTypingIndicator(typingIndicator, 'start');

    return NextResponse.json({
      success: true,
      typingId: typingIndicator.id,
      expiresAt: typingIndicator.expiresAt
    });
  } catch (error) {
    logger.error('Error starting typing indicator', { error: error, endpoint: '/api/realtime/typing' });
    return NextResponse.json(ApiResponseHelper.error("Failed to start typing indicator", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PUT - Update typing indicator (extend timeout)
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { channelId, spaceId } = body;

    if (!channelId || !spaceId) {
      return NextResponse.json(ApiResponseHelper.error("Channel ID and space ID are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const typingId = `typing_${user.uid}_${channelId}`;
    const typingDoc = await getDoc(doc(db, 'typingIndicators', typingId));

    if (!typingDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("No active typing indicator found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30000); // Extend by 30 seconds

    // Update typing indicator
    await setDoc(doc(db, 'typingIndicators', typingId), {
      ...typingDoc.data(),
      expiresAt: expiresAt.toISOString(),
      lastUpdate: now.toISOString()
    });

    return NextResponse.json({
      success: true,
      expiresAt: expiresAt.toISOString()
    });
  } catch (error) {
    logger.error('Error updating typing indicator', { error: error, endpoint: '/api/realtime/typing' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update typing indicator", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE - Stop typing indicator
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');
    const spaceId = searchParams.get('spaceId');

    if (!channelId || !spaceId) {
      return NextResponse.json(ApiResponseHelper.error("Channel ID and space ID are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const typingId = `typing_${user.uid}_${channelId}`;
    const typingDoc = await getDoc(doc(db, 'typingIndicators', typingId));

    if (!typingDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("No active typing indicator found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const typingIndicator = { id: typingDoc.id, ...typingDoc.data() } as TypingIndicator;

    // Remove typing indicator
    await deleteDoc(doc(db, 'typingIndicators', typingId));

    // Broadcast typing stop to channel
    await broadcastTypingIndicator(typingIndicator, 'stop');

    return NextResponse.json({
      success: true,
      message: 'Typing indicator stopped'
    });
  } catch (error) {
    logger.error('Error stopping typing indicator', { error: error, endpoint: '/api/realtime/typing' });
    return NextResponse.json(ApiResponseHelper.error("Failed to stop typing indicator", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - Get current typing status for a channel
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');
    const spaceId = searchParams.get('spaceId');

    if (!channelId || !spaceId) {
      return NextResponse.json(ApiResponseHelper.error("Channel ID and space ID are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Verify access
    const hasAccess = await verifyChannelAccess(user.uid, channelId, spaceId);
    if (!hasAccess) {
      return NextResponse.json(ApiResponseHelper.error("Access denied to channel", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get active typing indicators for the channel
    const now = new Date().toISOString();
    const typingQuery = dbAdmin.collection(
      dbAdmin.collection('typingIndicators'),
      where('channelId', '==', channelId),
      where('expiresAt', '>', now)
    );

    const typingSnapshot = await getDocs(typingQuery);
    const typingUsers = typingSnapshot.docs
      .map(doc => doc.data() as TypingIndicator)
      .filter(indicator => indicator.userId !== user.uid) // Exclude current user
      .map(indicator => ({
        userId: indicator.userId,
        userName: indicator.userName,
        startedAt: indicator.startedAt
      }));

    const typingStatus: TypingStatus = {
      channelId,
      isTyping: typingUsers.length > 0,
      typingUsers,
      lastUpdate: new Date().toISOString()
    };

    return NextResponse.json(typingStatus);
  } catch (error) {
    logger.error('Error getting typing status', { error: error, endpoint: '/api/realtime/typing' });
    return NextResponse.json(ApiResponseHelper.error("Failed to get typing status", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to verify channel access
async function verifyChannelAccess(userId: string, channelId: string, spaceId: string): Promise<boolean> {
  try {
    // Check space membership
    const memberQuery = dbAdmin.collection(
      dbAdmin.collection('members'),
      where('userId', '==', userId),
      where('spaceId', '==', spaceId),
      where('status', '==', 'active')
    );

    const memberSnapshot = await getDocs(memberQuery);
    if (memberSnapshot.empty) {
      return false;
    }

    // Check channel access
    const channelDoc = await getDoc(doc(db, 'chatChannels', channelId));
    if (!channelDoc.exists) {
      return false;
    }

    const channel = channelDoc.data();
    
    // Check if user is in channel participants (for private channels)
    if (channel.type === 'private' && !channel.participants.includes(userId)) {
      return false;
    }

    return true;
  } catch (error) {
    logger.error('Error verifying channel access', { error: error, endpoint: '/api/realtime/typing' });
    return false;
  }
}

// Helper function to broadcast typing indicator
async function broadcastTypingIndicator(indicator: TypingIndicator, action: 'start' | 'stop'): Promise<void> {
  try {
    const realtimeMessage = {
      id: `typing_${action}_${indicator.id}_${Date.now()}`,
      type: 'chat',
      channel: `space:${indicator.spaceId}:typing`,
      senderId: 'system',
      content: {
        action: `typing_${action}`,
        channelId: indicator.channelId,
        userId: indicator.userId,
        userName: indicator.userName,
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

    await addDoc(dbAdmin.collection('realtimeMessages'), realtimeMessage);
  } catch (error) {
    logger.error('Error broadcasting typing indicator', { error: error, endpoint: '/api/realtime/typing' });
  }
}

// Background cleanup function for expired typing indicators
async function cleanupExpiredTypingIndicators(): Promise<number> {
  try {
    const now = new Date().toISOString();
    const expiredQuery = dbAdmin.collection(
      dbAdmin.collection('typingIndicators'),
      where('expiresAt', '<', now)
    );

    const expiredSnapshot = await getDocs(expiredQuery);
    let cleaned = 0;

    for (const doc of expiredSnapshot.docs) {
      await deleteDoc(doc.ref);
      cleaned++;
    }

    return cleaned;
  } catch (error) {
    logger.error('Error cleaning up expired typing indicators', { error: error, endpoint: '/api/realtime/typing' });
    return 0;
  }
}