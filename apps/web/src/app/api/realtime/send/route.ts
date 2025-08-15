import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-server';
import { sseRealtimeService } from '@/lib/sse-realtime-service';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';

/**
 * Send real-time messages via SSE service
 * POST /api/realtime/send
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Unauthorized', 'UNAUTHORIZED'),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const body = await request.json();
    const { type, channel, content, targetUsers, metadata } = body;

    // Validate required fields
    if (!type || !channel || !content) {
      return NextResponse.json(
        ApiResponseHelper.error('Missing required fields: type, channel, content', 'INVALID_INPUT'),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Send message via SSE service
    const messageId = await sseRealtimeService.sendMessage({
      type,
      channel,
      senderId: user.uid,
      targetUsers,
      content,
      metadata: {
        timestamp: new Date().toISOString(),
        priority: metadata?.priority || 'normal',
        requiresAck: metadata?.requiresAck || false,
        retryCount: 0,
        ...metadata
      }
    });

    logger.info('Real-time message sent', {
      messageId,
      type,
      channel,
      userId: user.uid
    });

    return NextResponse.json({
      success: true,
      messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error sending real-time message', { error });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to send message', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}