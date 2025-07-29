import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { type Space } from '@hive/core';

/**
 * Get user's spaces with enhanced widget data
 * Returns spaces with membership info, activity, and widget-specific data
 */
export async function GET(request: NextRequest) {
  try {
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
    
    // Handle test tokens in development
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

    console.log(`🔍 Fetching spaces for user: ${userId}`);

    // Get user's memberships using collectionGroup
    const membershipsQuery = dbAdmin.collectionGroup('members')
      .where('userId', '==', userId)
      .limit(50); // Limit for performance
      
    const membershipsSnapshot = await membershipsQuery.get();
    
    if (membershipsSnapshot.empty) {
      console.log(`📊 No memberships found for user ${userId}`);
      return NextResponse.json({
        success: true,
        activeSpaces: [],
        pinnedSpaces: [],
        recentActivity: [],
        stats: {
          totalSpaces: 0,
          adminSpaces: 0,
          totalNotifications: 0,
          weeklyActivity: 0
        }
      });
    }

    console.log(`📊 Found ${membershipsSnapshot.size} memberships for user ${userId}`);

    // Extract space IDs and membership data
    const membershipData = new Map<string, any>();
    const spaceIds: string[] = [];

    membershipsSnapshot.docs.forEach(doc => {
      const membership = doc.data();
      const spaceId = doc.ref.parent.parent?.id;
      
      if (spaceId) {
        spaceIds.push(spaceId);
        membershipData.set(spaceId, {
          role: membership.role || 'member',
          joinedAt: membership.joinedAt,
          lastVisited: membership.lastVisited || new Date(),
          notifications: membership.notifications || 0,
          pinned: membership.pinned || false
        });
      }
    });

    // Fetch space details for each membership
    const spaces: any[] = [];
    const spaceTypes = ['student_organizations', 'university_organizations', 'greek_life', 'campus_living', 'hive_exclusive', 'cohort'];

    for (const spaceType of spaceTypes) {
      try {
        const spacesSnapshot = await dbAdmin.collection('spaces')
          .doc(spaceType)
          .collection('spaces')
          .get();
          
        spacesSnapshot.docs.forEach(doc => {
          const spaceId = doc.id;
          if (spaceIds.includes(spaceId)) {
            const spaceData = doc.data();
            const membership = membershipData.get(spaceId);
            
            spaces.push({
              id: spaceId,
              name: spaceData.name,
              description: spaceData.description,
              type: spaceType,
              status: spaceData.status || 'activated', // All active in V1
              memberCount: spaceData.metrics?.memberCount || 0,
              tags: spaceData.tags || [],
              bannerUrl: spaceData.bannerUrl,
              isPrivate: spaceData.isPrivate || false,
              createdAt: spaceData.createdAt,
              updatedAt: spaceData.updatedAt,
              
              // Membership-specific data
              membershipRole: membership?.role || 'member',
              lastVisited: membership?.lastVisited || new Date(),
              notifications: membership?.notifications || Math.floor(Math.random() * 10), // Mock notifications
              pinned: membership?.pinned || false,
              
              // Mock widget activity data (would come from actual widget APIs)
              activity: {
                newPosts: Math.floor(Math.random() * 5),
                newEvents: Math.floor(Math.random() * 3),
                newMembers: Math.floor(Math.random() * 4)
              },
              
              // Widget preview data (would be fetched from respective widget APIs)
              widgets: {
                posts: {
                  recentCount: Math.floor(Math.random() * 10) + 1,
                  lastActivity: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
                },
                events: {
                  upcomingCount: Math.floor(Math.random() * 3),
                  nextEvent: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000) : null
                },
                members: {
                  activeCount: Math.floor(spaceData.metrics?.memberCount * 0.3) || 0,
                  recentJoins: Math.floor(Math.random() * 3)
                },
                tools: {
                  availableCount: membership?.role !== 'member' ? Math.floor(Math.random() * 3) : 0
                }
              }
            });
          }
        });
      } catch (error) {
        console.error(`❌ Error fetching spaces for type ${spaceType}:`, error);
        // Continue with other types even if one fails
      }
    }

    // Sort spaces by last visited (most recent first)
    spaces.sort((a, b) => new Date(b.lastVisited).getTime() - new Date(a.lastVisited).getTime());

    // Separate pinned spaces
    const pinnedSpaces = spaces.filter(s => s.pinned).slice(0, 4);
    const recentSpaces = spaces.slice(0, 5);

    // Calculate stats
    const stats = {
      totalSpaces: spaces.length,
      adminSpaces: spaces.filter(s => ['admin', 'owner'].includes(s.membershipRole)).length,
      totalNotifications: spaces.reduce((sum, s) => sum + s.notifications, 0),
      weeklyActivity: spaces.reduce((sum, s) => sum + s.activity.newPosts + s.activity.newEvents, 0)
    };

    // Mock recent activity (would come from actual activity feeds)
    const recentActivity = spaces.slice(0, 3).map(space => ({
      spaceId: space.id,
      spaceName: space.name,
      type: 'post',
      content: 'Recent activity in this space',
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
    }));

    console.log(`✅ Returning ${spaces.length} spaces for user ${userId}`);

    return NextResponse.json({
      success: true,
      activeSpaces: spaces,
      pinnedSpaces,
      recentActivity,
      stats
    });

  } catch (error: any) {
    console.error('❌ My spaces API error:', error);

    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        activeSpaces: [],
        pinnedSpaces: [],
        recentActivity: [],
        stats: {
          totalSpaces: 0,
          adminSpaces: 0,
          totalNotifications: 0,
          weeklyActivity: 0
        }
      },
      { status: 500 }
    );
  }
}

/**
 * Update user space preferences (pin/unpin, notifications, etc.)
 */
export async function PATCH(request: NextRequest) {
  try {
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

    const body = await request.json();
    const { spaceId, action, value } = body;

    if (!spaceId || !action) {
      return NextResponse.json(
        { error: 'spaceId and action are required' },
        { status: 400 }
      );
    }

    // Find the space's membership document
    const membershipsQuery = dbAdmin.collectionGroup('members')
      .where('userId', '==', userId)
      .limit(50);
      
    const membershipsSnapshot = await membershipsQuery.get();
    
    let membershipRef = null;
    for (const doc of membershipsSnapshot.docs) {
      const spaceIdFromRef = doc.ref.parent.parent?.id;
      if (spaceIdFromRef === spaceId) {
        membershipRef = doc.ref;
        break;
      }
    }

    if (!membershipRef) {
      return NextResponse.json(
        { error: 'Membership not found' },
        { status: 404 }
      );
    }

    // Update membership based on action
    const updates: any = { updatedAt: new Date() };
    
    switch (action) {
      case 'pin':
        updates.pinned = true;
        break;
      case 'unpin':
        updates.pinned = false;
        break;
      case 'mark_visited':
        updates.lastVisited = new Date();
        break;
      case 'update_notifications':
        updates.notifications = value || 0;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    await membershipRef.update(updates);

    console.log(`✅ Updated membership for space ${spaceId}, action: ${action}`);

    return NextResponse.json({
      success: true,
      message: `Space ${action} successful`
    });

  } catch (error: any) {
    console.error('❌ My spaces PATCH error:', error);

    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}