import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth-server';
import { sseRealtimeService } from '@/lib/sse-realtime-service';
import { logger } from '@/lib/logger';

/**
 * Server-Sent Events endpoint for real-time communication
 * Replaces broken Firebase Realtime Database WebSocket connection
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = await getCurrentUser(request);
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get channels to subscribe to from query params
    const { searchParams } = new URL(request.url);
    const channelsParam = searchParams.get('channels');
    const channels = channelsParam ? channelsParam.split(',') : ['global'];

    logger.info('SSE connection requested', { 
      userId: user.uid, 
      channels,
      userAgent: request.headers.get('user-agent') 
    });

    // Create SSE stream
    const stream = sseRealtimeService.createConnection(user.uid, channels);

    // Return SSE response with proper headers
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Cache-Control'
      }
    });

  } catch (error) {
    logger.error('SSE connection error', { error });
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}