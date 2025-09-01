import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebase-admin";
import { type Post } from "@hive/core";
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth } from '@/lib/api-auth-middleware';
import { z } from 'zod';

const GetActivityFeedSchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  types: z.string().optional(), // comma-separated activity types
  since: z.string().optional(), // ISO date string
});

// Activity types for space activity feed
export interface ActivityItem {
  id: string;
  type: 'post' | 'event' | 'member_join' | 'member_leave' | 'tool_deploy' | 'tool_remove' | 'event_rsvp' | 'space_update';
  spaceId: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    handle?: string;
  };
  content: any; // Specific to activity type
  metadata?: {
    isHighlighted?: boolean;
    isPinned?: boolean;
    [key: string]: any;
  };
}

export const GET = withAuth(async (
  request: Request,
  authContext,
  { params }: { params: Promise<{ spaceId: string }> }
) => {
  let spaceId: string | undefined;

  try {
    ({ spaceId } = await params);

    if (!spaceId) {
      return NextResponse.json(ApiResponseHelper.error("Space ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const { searchParams } = new URL(request.url);
    const { limit, offset, types, since } = GetActivityFeedSchema.parse(
      Object.fromEntries(searchParams.entries())
    );

    // Parse activity types filter
    const activityTypes = types ? types.split(',') : ['post', 'event', 'member_join', 'tool_deploy', 'event_rsvp'];
    const sinceDate = since ? new Date(since) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Default: last 7 days

    // Check if user is member of the space
    const memberDoc = await dbAdmin
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(authContext.userId)
      .get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const activities: ActivityItem[] = [];

    // Fetch Posts
    if (activityTypes.includes('post')) {
      try {
        const postsSnapshot = await dbAdmin
          .collection("spaces")
          .doc(spaceId)
          .collection("posts")
          .where("createdAt", ">=", sinceDate)
          .orderBy("createdAt", "desc")
          .limit(limit)
          .get();

        for (const postDoc of postsSnapshot.docs) {
          const postData = postDoc.data();
          
          // Get author info
          let author = { id: postData.authorId, name: 'Unknown User', avatar: undefined, handle: undefined };
          try {
            const authorDoc = await dbAdmin.collection('users').doc(postData.authorId).get();
            if (authorDoc.exists) {
              const authorData = authorDoc.data();
              author = {
                id: postData.authorId,
                name: authorData?.fullName || 'Unknown User',
                avatar: authorData?.photoURL,
                handle: authorData?.handle,
              };
            }
          } catch (e) {
            logger.warn('Failed to fetch post author', { postId: postDoc.id, authorId: postData.authorId });
          }

          activities.push({
            id: `post_${postDoc.id}`,
            type: 'post',
            spaceId,
            timestamp: postData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            user: author,
            content: {
              id: postDoc.id,
              title: postData.title,
              content: postData.content,
              type: postData.type,
              likesCount: postData.likesCount || 0,
              repliesCount: postData.repliesCount || 0,
              isPinned: postData.isPinned || false,
            },
            metadata: {
              isPinned: postData.isPinned || false,
              isHighlighted: postData.type === 'announcement',
            }
          });
        }
      } catch (error) {
        logger.warn('Failed to fetch posts for activity feed', { error, spaceId });
      }
    }

    // Fetch Events
    if (activityTypes.includes('event')) {
      try {
        const eventsSnapshot = await dbAdmin
          .collection("spaces")
          .doc(spaceId)
          .collection("events")
          .where("createdAt", ">=", sinceDate)
          .orderBy("createdAt", "desc")
          .limit(limit)
          .get();

        for (const eventDoc of eventsSnapshot.docs) {
          const eventData = eventDoc.data();
          
          // Get organizer info
          let organizer = { id: eventData.organizerId, name: 'Unknown User', avatar: undefined, handle: undefined };
          try {
            const organizerDoc = await dbAdmin.collection('users').doc(eventData.organizerId).get();
            if (organizerDoc.exists) {
              const organizerData = organizerDoc.data();
              organizer = {
                id: eventData.organizerId,
                name: organizerData?.fullName || 'Unknown User',
                avatar: organizerData?.photoURL,
                handle: organizerData?.handle,
              };
            }
          } catch (e) {
            logger.warn('Failed to fetch event organizer', { eventId: eventDoc.id, organizerId: eventData.organizerId });
          }

          activities.push({
            id: `event_${eventDoc.id}`,
            type: 'event',
            spaceId,
            timestamp: eventData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            user: organizer,
            content: {
              id: eventDoc.id,
              title: eventData.title,
              description: eventData.description,
              startDate: eventData.startDate?.toDate?.()?.toISOString(),
              location: eventData.location,
              currentAttendees: eventData.currentAttendees || 0,
              maxAttendees: eventData.maxAttendees,
              type: eventData.type,
              isFeatured: eventData.isFeatured || false,
            },
            metadata: {
              isHighlighted: eventData.isFeatured || false,
            }
          });
        }
      } catch (error) {
        logger.warn('Failed to fetch events for activity feed', { error, spaceId });
      }
    }

    // Fetch Member Activities (joins)
    if (activityTypes.includes('member_join')) {
      try {
        const membersSnapshot = await dbAdmin
          .collection("spaces")
          .doc(spaceId)
          .collection("members")
          .where("joinedAt", ">=", sinceDate)
          .orderBy("joinedAt", "desc")
          .limit(limit)
          .get();

        for (const memberDoc of membersSnapshot.docs) {
          const memberData = memberDoc.data();
          
          // Get member info
          let member = { id: memberDoc.id, name: 'Unknown User', avatar: undefined, handle: undefined };
          try {
            const userDoc = await dbAdmin.collection('users').doc(memberDoc.id).get();
            if (userDoc.exists) {
              const userData = userDoc.data();
              member = {
                id: memberDoc.id,
                name: userData?.fullName || 'Unknown User',
                avatar: userData?.photoURL,
                handle: userData?.handle,
              };
            }
          } catch (e) {
            logger.warn('Failed to fetch member info', { memberId: memberDoc.id });
          }

          activities.push({
            id: `member_join_${memberDoc.id}`,
            type: 'member_join',
            spaceId,
            timestamp: memberData.joinedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            user: member,
            content: {
              role: memberData.role || 'member',
              isNewMember: true,
            }
          });
        }
      } catch (error) {
        logger.warn('Failed to fetch member joins for activity feed', { error, spaceId });
      }
    }

    // Fetch Tool Deployments
    if (activityTypes.includes('tool_deploy')) {
      try {
        const deploymentsSnapshot = await dbAdmin
          .collection("deployments")
          .where("spaceId", "==", spaceId)
          .where("deployedAt", ">=", sinceDate)
          .orderBy("deployedAt", "desc")
          .limit(limit)
          .get();

        for (const deploymentDoc of deploymentsSnapshot.docs) {
          const deploymentData = deploymentDoc.data();
          
          // Get deployer info
          let deployer = { id: deploymentData.userId, name: 'Unknown User', avatar: undefined, handle: undefined };
          try {
            const userDoc = await dbAdmin.collection('users').doc(deploymentData.userId).get();
            if (userDoc.exists) {
              const userData = userDoc.data();
              deployer = {
                id: deploymentData.userId,
                name: userData?.fullName || 'Unknown User',
                avatar: userData?.photoURL,
                handle: userData?.handle,
              };
            }
          } catch (e) {
            logger.warn('Failed to fetch deployer info', { deploymentId: deploymentDoc.id, userId: deploymentData.userId });
          }

          // Get tool info
          let toolName = 'Unknown Tool';
          try {
            const toolDoc = await dbAdmin.collection('tools').doc(deploymentData.toolId).get();
            if (toolDoc.exists) {
              toolName = toolDoc.data()?.name || 'Unknown Tool';
            }
          } catch (e) {
            logger.warn('Failed to fetch tool info', { toolId: deploymentData.toolId });
          }

          activities.push({
            id: `tool_deploy_${deploymentDoc.id}`,
            type: 'tool_deploy',
            spaceId,
            timestamp: deploymentData.deployedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            user: deployer,
            content: {
              toolId: deploymentData.toolId,
              toolName,
              deploymentId: deploymentDoc.id,
              status: deploymentData.status,
              configuration: deploymentData.configuration,
            }
          });
        }
      } catch (error) {
        logger.warn('Failed to fetch tool deployments for activity feed', { error, spaceId });
      }
    }

    // Sort all activities by timestamp
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Apply pagination
    const paginatedActivities = activities.slice(offset, offset + limit);

    return NextResponse.json({
      activities: paginatedActivities,
      total: activities.length,
      hasMore: activities.length > offset + limit,
      pagination: {
        limit,
        offset,
        nextOffset: activities.length > offset + limit ? offset + limit : null,
      },
      summary: {
        totalActivities: activities.length,
        typeBreakdown: activities.reduce((acc, activity) => {
          acc[activity.type] = (acc[activity.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        lastActivity: activities[0]?.timestamp || null,
      }
    }, { status: HttpStatus.OK });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid query parameters',
          details: error.errors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error fetching space activity feed', {
      spaceId: spaceId || "unknown",
      error: error instanceof Error ? error.message : String(error),
      endpoint: '/api/spaces/[spaceId]/feed'
    });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch activity feed", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: false,
  operation: 'fetch_space_activity_feed' 
});
