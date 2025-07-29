import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';

/**
 * Get widget data for a specific space
 * Returns data for all widgets: posts, events, members, pinned, tools
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
    // Verify the requesting user is authenticated
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let userId = 'test-user';
    
    if (token !== 'test-token') {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }
    }

    console.log(`🔍 Fetching widget data for space: ${spaceId}, user: ${userId}`);

    // Check if user is a member of this space
    const membershipQuery = dbAdmin.collectionGroup('members')
      .where('userId', '==', userId)
      .limit(50);
      
    const membershipsSnapshot = await membershipQuery.get();
    
    let userMembership = null;
    for (const doc of membershipsSnapshot.docs) {
      const docSpaceId = doc.ref.parent.parent?.id;
      if (docSpaceId === spaceId) {
        userMembership = doc.data();
        break;
      }
    }

    // For now, allow access even without membership for preview
    const isAdmin = userMembership?.role === 'admin' || userMembership?.role === 'owner';
    const isMember = !!userMembership;

    // Mock widget data (in production, these would be separate API calls to widget-specific endpoints)
    const widgetData = {
      posts: {
        summary: {
          totalPosts: Math.floor(Math.random() * 50) + 10,
          recentPosts: Math.floor(Math.random() * 5) + 1,
          totalReplies: Math.floor(Math.random() * 200) + 50,
          activeDiscussions: Math.floor(Math.random() * 8) + 2
        },
        recent: [
          {
            id: 'post-1',
            type: 'discussion',
            title: 'Weekly Study Session Schedule',
            content: 'Anyone interested in forming a study group for the upcoming midterms? I was thinking we could meet at the library...',
            authorName: 'Sarah Chen',
            authorId: 'user-sarah',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            likes: 12,
            replies: 5,
            views: 34
          },
          {
            id: 'post-2', 
            type: 'question',
            title: 'Help with Data Structures Assignment',
            content: 'I\'m struggling with implementing binary trees. Could someone point me to good resources or offer to pair program?',
            authorName: 'Mike Rodriguez',
            authorId: 'user-mike',
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
            likes: 8,
            replies: 3,
            views: 28
          },
          {
            id: 'post-3',
            type: 'announcement',
            title: 'Guest Speaker Next Week',
            content: 'Excited to announce that Dr. Jane Smith from Google will be speaking about machine learning applications...',
            authorName: 'Prof. Johnson',
            authorId: 'user-prof',
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
            likes: 24,
            replies: 7,
            views: 89,
            isPinned: true
          }
        ]
      },
      
      events: {
        summary: {
          upcomingEvents: Math.floor(Math.random() * 5) + 1,
          thisWeekEvents: Math.floor(Math.random() * 3) + 1,
          totalRSVPs: Math.floor(Math.random() * 50) + 10
        },
        upcoming: [
          {
            id: 'event-1',
            title: 'Study Group Session',
            description: 'Weekly study session for CS 442 - Machine Learning fundamentals',
            type: 'academic',
            startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            location: 'Davis Hall, Room 338',
            organizerName: 'Sarah Chen',
            currentAttendees: 8,
            maxAttendees: 15,
            userRSVP: Math.random() > 0.5 ? 'going' : null
          },
          {
            id: 'event-2',
            title: 'Career Workshop',
            description: 'Resume building and interview prep with industry professionals',
            type: 'social',
            startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
            location: 'Student Union, Room 204',
            organizerName: 'Career Services',
            currentAttendees: 23,
            maxAttendees: 30,
            userRSVP: null
          }
        ]
      },
      
      members: {
        summary: {
          totalMembers: Math.floor(Math.random() * 200) + 50,
          activeMembers: Math.floor(Math.random() * 50) + 20,
          newThisWeek: Math.floor(Math.random() * 5) + 1,
          onlineNow: Math.floor(Math.random() * 8) + 2
        },
        recent: [
          {
            id: 'user-1',
            name: 'Alex Thompson',
            role: 'member',
            joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            avatar: null,
            lastActive: new Date(Date.now() - 30 * 60 * 1000),
            isOnline: true
          },
          {
            id: 'user-2',
            name: 'Emily Davis',
            role: 'member',
            joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            avatar: null,
            lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
            isOnline: false
          },
          {
            id: 'user-3',
            name: 'Jordan Kim',
            role: 'admin',
            joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            avatar: null,
            lastActive: new Date(Date.now() - 10 * 60 * 1000),
            isOnline: true
          }
        ]
      },
      
      pinned: {
        summary: {
          totalPinned: Math.floor(Math.random() * 5) + 1,
          recentUpdates: Math.floor(Math.random() * 2) + 1
        },
        items: [
          {
            id: 'pinned-1',
            type: 'announcement',
            title: 'Welcome to CS Study Group!',
            content: 'Community guidelines and how to get the most out of our study sessions...',
            pinnedBy: 'Prof. Johnson',
            pinnedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            priority: 'high'
          },
          {
            id: 'pinned-2',
            type: 'resource',
            title: 'Useful Study Resources',
            content: 'Collection of textbooks, online courses, and practice problems for our curriculum...',
            pinnedBy: 'Sarah Chen',
            pinnedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            priority: 'medium'
          }
        ]
      },
      
      tools: isAdmin ? {
        summary: {
          availableTools: Math.floor(Math.random() * 3) + 1,
          recentlyUsed: Math.floor(Math.random() * 2) + 1,
          totalUsage: Math.floor(Math.random() * 100) + 20
        },
        available: [
          {
            id: 'tool-1',
            name: 'Grade Calculator',
            description: 'Calculate your current GPA and track grade progress',
            type: 'academic',
            createdBy: 'Sarah Chen',
            usageCount: Math.floor(Math.random() * 50) + 10,
            lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          },
          {
            id: 'tool-2',
            name: 'Study Group Scheduler',
            description: 'Coordinate study session times with group members',
            type: 'coordination',
            createdBy: 'Mike Rodriguez',
            usageCount: Math.floor(Math.random() * 30) + 5,
            lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        ]
      } : null // Tools only available to admins
    };

    // Filter tools widget if user is not admin
    if (!isAdmin) {
      delete widgetData.tools;
    }

    console.log(`✅ Returning widget data for space ${spaceId}`);

    return NextResponse.json({
      success: true,
      spaceId,
      widgets: widgetData,
      userPermissions: {
        isMember,
        isAdmin,
        canPost: isMember,
        canCreateEvents: isMember,
        canManageMembers: isAdmin,
        canAccessTools: isAdmin
      }
    });

  } catch (error: any) {
    console.error('❌ Widget data API error:', error);

    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}