import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getAuthTokenFromRequest } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { getSpaceMember } from '@/lib/spaces-db';

const db = dbAdmin;

// GET /api/spaces/[spaceId]/analytics - Get analytics for a space
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Check if user has permission to view analytics
    const member = await getSpaceMember(spaceId, decodedToken.uid);
    if (!member) {
      return NextResponse.json(
        ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), 
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Only owners, admins, and moderators can view analytics
    if (!['owner', 'admin', 'moderator'].includes(member.role)) {
      return NextResponse.json(
        ApiResponseHelper.error("Insufficient permissions to view analytics", "FORBIDDEN"), 
        { status: HttpStatus.FORBIDDEN }
      );
    }

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Fetch various analytics data in parallel
    const [
      spaceDoc,
      postsSnapshot,
      postsThisWeekSnapshot,
      eventsSnapshot,
      upcomingEventsSnapshot,
      membersSnapshot,
      toolsSnapshot,
      pinnedSnapshot,
      activitySnapshot
    ] = await Promise.all([
      // Get space details
      db.collection("spaces").doc(spaceId).get(),
      
      // Get total posts
      db.collection("spaces").doc(spaceId).collection("posts").get(),
      
      // Get posts from this week
      db.collection("spaces").doc(spaceId).collection("posts")
        .where("createdAt", ">=", oneWeekAgo)
        .get(),
      
      // Get total events
      db.collection("spaces").doc(spaceId).collection("events").get(),
      
      // Get upcoming events
      db.collection("spaces").doc(spaceId).collection("events")
        .where("startDate", ">=", now)
        .get(),
      
      // Get members
      db.collection("spaceMembers")
        .where("spaceId", "==", spaceId)
        .get(),
      
      // Get tools
      db.collection("spaces").doc(spaceId).collection("tools")
        .where("isEnabled", "==", true)
        .get(),
      
      // Get pinned items
      db.collection("spaces").doc(spaceId).collection("pinned")
        .where("isActive", "==", true)
        .get(),
      
      // Get recent activity
      db.collection("activityEvents")
        .where("spaceId", "==", spaceId)
        .where("timestamp", ">=", oneWeekAgo)
        .orderBy("timestamp", "desc")
        .limit(100)
        .get()
    ]);

    const space = spaceDoc.exists ? spaceDoc.data() : null;

    // Calculate engagement metrics
    let totalReactions = 0;
    let totalComments = 0;
    const activePosters = new Set();
    
    for (const postDoc of postsSnapshot.docs) {
      const post = postDoc.data();
      if (post.reactions?.heart) totalReactions += post.reactions.heart;
      activePosters.add(post.authorId);
      
      // Count comments (simplified - in production, use subcollection count)
      const commentsSnapshot = await db
        .collection("spaces").doc(spaceId)
        .collection("posts").doc(postDoc.id)
        .collection("comments")
        .get();
      totalComments += commentsSnapshot.size;
    }

    const engagementRate = postsSnapshot.size > 0 
      ? Math.round(((totalReactions + totalComments) / postsSnapshot.size) * 100) 
      : 0;

    // Calculate member activity
    const activeMembersSet = new Set();
    const activityByType: Record<string, number> = {};
    
    activitySnapshot.forEach(doc => {
      const activity = doc.data();
      activeMembersSet.add(activity.userId);
      activityByType[activity.type] = (activityByType[activity.type] || 0) + 1;
    });

    // Calculate event attendance (simplified)
    let totalAttendance = 0;
    let eventsWithAttendees = 0;
    
    for (const eventDoc of eventsSnapshot.docs) {
      const rsvpSnapshot = await db
        .collection("spaces").doc(spaceId)
        .collection("events").doc(eventDoc.id)
        .collection("rsvps")
        .where("status", "==", "going")
        .get();
      
      if (rsvpSnapshot.size > 0) {
        totalAttendance += rsvpSnapshot.size;
        eventsWithAttendees++;
      }
    }

    const averageAttendance = eventsWithAttendees > 0 
      ? Math.round((totalAttendance / eventsWithAttendees) * 100) / 100
      : 0;

    // Calculate tool usage
    let totalToolUsage = 0;
    const topTools: string[] = [];
    
    for (const toolDoc of toolsSnapshot.docs) {
      const tool = toolDoc.data();
      const usageSnapshot = await db
        .collection("spaces").doc(spaceId)
        .collection("tools").doc(toolDoc.id)
        .collection("usage")
        .where("timestamp", ">=", oneWeekAgo)
        .get();
      
      totalToolUsage += usageSnapshot.size;
      if (usageSnapshot.size > 0) {
        topTools.push(tool.name);
      }
    }

    // Sort tools by usage and take top 3
    topTools.sort().slice(0, 3);

    // Find most viewed pinned resource
    let mostViewedResource = null;
    let maxViews = 0;
    
    pinnedSnapshot.forEach(doc => {
      const pinned = doc.data();
      if (pinned.viewCount > maxViews) {
        maxViews = pinned.viewCount;
        mostViewedResource = pinned.title || 'Untitled';
      }
    });

    // Calculate growth metrics
    const postsLastWeekSnapshot = await db
      .collection("spaces").doc(spaceId)
      .collection("posts")
      .where("createdAt", ">=", new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000))
      .where("createdAt", "<", oneWeekAgo)
      .get();

    const contentGrowthRate = postsLastWeekSnapshot.size > 0
      ? Math.round(((postsThisWeekSnapshot.size - postsLastWeekSnapshot.size) / postsLastWeekSnapshot.size) * 100)
      : 0;

    // Calculate new members this week
    const newMembersSnapshot = await db
      .collection("spaceMembers")
      .where("spaceId", "==", spaceId)
      .where("joinedAt", ">=", oneWeekAgo)
      .get();

    // Determine overall health score (0-10)
    let healthScore = 5; // Base score
    
    if (activeMembersSet.size > 10) healthScore += 1;
    if (activeMembersSet.size > 20) healthScore += 1;
    if (postsThisWeekSnapshot.size > 10) healthScore += 1;
    if (engagementRate > 50) healthScore += 1;
    if (contentGrowthRate > 0) healthScore += 1;
    
    healthScore = Math.min(10, healthScore);

    // Determine activity level
    const activityLevel = 
      activitySnapshot.size > 50 ? 'High' :
      activitySnapshot.size > 20 ? 'Medium' : 'Low';

    // Determine engagement level
    const engagementLevel = 
      engagementRate > 75 ? 'High' :
      engagementRate > 40 ? 'Medium' : 'Low';

    // Determine growth status
    const growthStatus = 
      contentGrowthRate > 10 ? 'Growing' :
      contentGrowthRate > -10 ? 'Steady' : 'Declining';

    // Determine retention (simplified)
    const retentionRate = membersSnapshot.size > 0
      ? Math.round((activeMembersSet.size / membersSnapshot.size) * 100)
      : 0;
    
    const retentionStatus = 
      retentionRate > 80 ? 'Excellent' :
      retentionRate > 60 ? 'Good' :
      retentionRate > 40 ? 'Fair' : 'Poor';

    // Compile analytics response
    const analytics = {
      // Content Analytics
      contentData: {
        postsThisWeek: postsThisWeekSnapshot.size,
        averageEngagement: engagementRate,
        totalPosts: postsSnapshot.size,
        contentGrowthRate,
        totalReactions,
        totalComments,
        uniquePosters: activePosters.size
      },
      
      // Membership Analytics
      membershipData: {
        totalMembers: membersSnapshot.size,
        activeMembers: activeMembersSet.size,
        newMembers: newMembersSnapshot.size,
        averageEngagement: engagementRate,
        healthScore,
        activity: activityLevel,
        engagement: engagementLevel,
        growth: growthStatus,
        retention: retentionStatus,
        retentionRate
      },
      
      // Events Analytics
      eventsData: {
        upcomingEvents: upcomingEventsSnapshot.size,
        totalEvents: eventsSnapshot.size,
        averageAttendance: averageAttendance,
        totalAttendance,
        eventsWithAttendees
      },
      
      // Tools Analytics
      toolsData: {
        activeTools: toolsSnapshot.size,
        toolUsage: totalToolUsage,
        topTools
      },
      
      // Resources Analytics
      resourcesData: {
        items: pinnedSnapshot.size,
        totalViews: maxViews,
        mostViewed: mostViewedResource
      },
      
      // Overall Metrics
      overallHealth: healthScore,
      activity: activityByType,
      
      // Time-based metrics
      metrics: {
        daily: {
          posts: Math.round(postsThisWeekSnapshot.size / 7),
          activeUsers: Math.round(activeMembersSet.size / 7)
        },
        weekly: {
          posts: postsThisWeekSnapshot.size,
          activeUsers: activeMembersSet.size,
          newMembers: newMembersSnapshot.size
        },
        monthly: {
          posts: postsSnapshot.size,
          events: eventsSnapshot.size,
          members: membersSnapshot.size
        }
      },
      
      // Alerts and recommendations
      alerts: [],
      recommendations: []
    };

    // Add alerts based on analytics
    if (healthScore < 5) {
      analytics.alerts.push({
        type: 'warning',
        message: 'Space health is below average. Consider increasing engagement activities.'
      });
    }
    
    if (postsThisWeekSnapshot.size === 0) {
      analytics.alerts.push({
        type: 'info',
        message: 'No posts this week. Encourage members to share content.'
      });
    }
    
    if (upcomingEventsSnapshot.size === 0) {
      analytics.alerts.push({
        type: 'info',
        message: 'No upcoming events. Consider scheduling activities to boost engagement.'
      });
    }

    // Add recommendations
    if (engagementRate < 30) {
      analytics.recommendations.push('Create polls or questions to increase engagement');
    }
    
    if (toolsSnapshot.size === 0) {
      analytics.recommendations.push('Add tools to enhance space functionality');
    }
    
    if (pinnedSnapshot.size < 3) {
      analytics.recommendations.push('Pin important resources for easy member access');
    }

    return NextResponse.json({ analytics });

  } catch (error) {
    logger.error('Error fetching space analytics', { error, endpoint: '/api/spaces/[spaceId]/analytics' });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to fetch analytics", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}