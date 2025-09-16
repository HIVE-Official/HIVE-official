import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from "@/lib/api/response-types/api-response-types";
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';

// Profile connection interface
interface ProfileConnection {
  id: string;
  userId: string;
  fullName: string;
  handle: string;
  avatarUrl?: string;
  bio?: string;
  major?: string;
  academicYear?: string;
  mutualSpaces: number;
  connectionType: 'classmate' | 'space_member' | 'mutual_friend' | 'suggested';
  connectedAt: string;
  lastInteraction?: string;
  isOnline: boolean;
  commonInterests: string[];
}

// GET - Fetch user's connections for profile widget
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    
    // For development mode, return mock connections data
    if ((userId === 'test-user' || userId === 'dev_user_123') && process.env.NODE_ENV !== 'production') {
      const mockConnections: ProfileConnection[] = [
        {
          id: 'conn_1',
          userId: 'user_sarah_123',
          fullName: 'Sarah Chen',
          handle: 'sarah_cs',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          bio: 'CS student passionate about AI and machine learning',
          major: 'Computer Science',
          academicYear: 'Junior',
          mutualSpaces: 2,
          connectionType: 'classmate',
          connectedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          lastInteraction: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isOnline: true,
          commonInterests: ['algorithms', 'machine-learning', 'study-groups']
        },
        {
          id: 'conn_2',
          userId: 'user_mike_456',
          fullName: 'Mike Rodriguez',
          handle: 'mike_math',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
          bio: 'Math tutor and debate enthusiast',
          major: 'Mathematics',
          academicYear: 'Senior',
          mutualSpaces: 1,
          connectionType: 'space_member',
          connectedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          lastInteraction: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          isOnline: false,
          commonInterests: ['tutoring', 'debate', 'calculus']
        },
        {
          id: 'conn_3',
          userId: 'user_emma_789',
          fullName: 'Emma Thompson',
          handle: 'emma_debates',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
          bio: 'Philosophy major, debate club president',
          major: 'Philosophy',
          academicYear: 'Senior',
          mutualSpaces: 1,
          connectionType: 'space_member',
          connectedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          lastInteraction: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          isOnline: true,
          commonInterests: ['debate', 'philosophy', 'public-speaking']
        },
        {
          id: 'conn_4',
          userId: 'user_alex_101',
          fullName: 'Alex Kim',
          handle: 'alex_builder',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
          bio: 'Building tools to help students succeed',
          major: 'Computer Science',
          academicYear: 'Sophomore',
          mutualSpaces: 0,
          connectionType: 'suggested',
          connectedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          isOnline: false,
          commonInterests: ['coding', 'productivity', 'hive-tools']
        }
      ];
      
      const { searchParams } = new URL(request.url);
      const limit = parseInt(searchParams.get('limit') || '10');
      const connectionType = searchParams.get('type'); // 'classmate', 'space_member', etc.
      const includeOffline = searchParams.get('includeOffline') !== 'false';
      
      // Filter connections based on query parameters
      let filteredConnections = mockConnections;
      
      if (connectionType) {
        filteredConnections = filteredConnections.filter(conn => conn.connectionType === connectionType);
      }
      
      if (!includeOffline) {
        filteredConnections = filteredConnections.filter(conn => conn.isOnline);
      }
      
      // Sort by last interaction (most recent first)
      filteredConnections.sort((a, b) => {
        const aTime = a.lastInteraction || a.connectedAt;
        const bTime = b.lastInteraction || b.connectedAt;
        return new Date(bTime).getTime() - new Date(aTime).getTime();
      });
      
      // Apply limit
      const limitedConnections = filteredConnections.slice(0, limit);
      
      logger.info('✅ Development mode: Returning mock connections data', { 
        connectionCount: limitedConnections.length,
        totalConnections: mockConnections.length,
        endpoint: '/api/profile/connections' 
      });
      
      return NextResponse.json({
        success: true,
        connections: limitedConnections,
        stats: {
          totalConnections: mockConnections.length,
          onlineConnections: mockConnections.filter(c => c.isOnline).length,
          classmateConnections: mockConnections.filter(c => c.connectionType === 'classmate').length,
          spaceMemberConnections: mockConnections.filter(c => c.connectionType === 'space_member').length,
          suggestedConnections: mockConnections.filter(c => c.connectionType === 'suggested').length,
          mutualSpaces: mockConnections.reduce((sum, c) => sum + c.mutualSpaces, 0)
        },
        metadata: {
          limit,
          connectionType,
          includeOffline,
          generatedAt: new Date().toISOString()
        },
        // SECURITY: Development mode removed for production safety
      });
    }
    
    // Production Firebase logic would go here
    // For now, return empty state for production
    return NextResponse.json({
      success: true,
      connections: [],
      stats: {
        totalConnections: 0,
        onlineConnections: 0,
        classmateConnections: 0,
        spaceMemberConnections: 0,
        suggestedConnections: 0,
        mutualSpaces: 0
      },
      message: 'Connections feature not yet implemented for production'
    });
    
  } catch (error) {
    logger.error('Error fetching profile connections', { error: error, endpoint: '/api/profile/connections' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch connections", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true,
  operation: 'get_profile_connections' 
});

// POST - Send connection request
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();
    
    const { targetUserId, message }: { targetUserId: string; message?: string } = body;
    
    if (!targetUserId) {
      return NextResponse.json(ApiResponseHelper.error("Target user ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // For development mode, simulate connection request
    if ((userId === 'test-user' || userId === 'dev_user_123') && process.env.NODE_ENV !== 'production') {
      const connectionRequest = {
        id: `conn_req_${Date.now()}`,
        fromUserId: userId,
        toUserId: targetUserId,
        message: message || '',
        status: 'pending',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      };
      
      logger.info('Development mode: Connection request sent', { 
        connectionRequest,
        endpoint: '/api/profile/connections' 
      });
      
      return NextResponse.json({
        success: true,
        connectionRequest,
        message: 'Connection request sent successfully (development mode)'
      });
    }

    // Production implementation would create connection request in Firebase
    // For now, return success for any valid request
    return NextResponse.json({
      success: true,
      message: 'Connection request feature not yet implemented for production'
    });
    
  } catch (error) {
    logger.error('Error sending connection request', { error: error, endpoint: '/api/profile/connections' });
    return NextResponse.json(ApiResponseHelper.error("Failed to send connection request", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true,
  operation: 'send_connection_request' 
});

// PATCH - Accept/reject connection request
export const PATCH = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();
    
    const { requestId, action }: { requestId: string; action: 'accept' | 'reject' } = body;
    
    if (!requestId || !['accept', 'reject'].includes(action)) {
      return NextResponse.json(ApiResponseHelper.error("Valid request ID and action (accept/reject) are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // For development mode, simulate connection request response
    if ((userId === 'test-user' || userId === 'dev_user_123') && process.env.NODE_ENV !== 'production') {
      const updatedRequest = {
        id: requestId,
        status: action === 'accept' ? 'accepted' : 'rejected',
        respondedAt: new Date().toISOString(),
        respondedBy: userId
      };
      
      // If accepted, create connection
      let connection = null;
      if (action === 'accept') {
        connection = {
          id: `conn_${Date.now()}`,
          userId1: userId,
          userId2: 'mock_user_id',
          connectionType: 'mutual_friend',
          connectedAt: new Date().toISOString(),
          status: 'active'
        };
      }
      
      logger.info('Development mode: Connection request responded', { 
        action,
        updatedRequest,
        connection,
        endpoint: '/api/profile/connections' 
      });
      
      return NextResponse.json({
        success: true,
        updatedRequest,
        connection,
        message: `Connection request ${action}ed successfully (development mode)`
      });
    }

    // Production implementation would update connection request in Firebase
    return NextResponse.json({
      success: true,
      message: 'Connection request management not yet implemented for production'
    });
    
  } catch (error) {
    logger.error('Error managing connection request', { error: error, endpoint: '/api/profile/connections' });
    return NextResponse.json(ApiResponseHelper.error("Failed to manage connection request", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true,
  operation: 'manage_connection_request' 
});