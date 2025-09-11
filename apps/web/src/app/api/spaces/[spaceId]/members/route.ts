import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getAuthTokenFromRequest } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import * as admin from 'firebase-admin';
import { getSpaceMembers, getSpaceMember, addSpaceMember, removeSpaceMember, updateMemberRole } from '@/lib/spaces-db';

const GetMembersSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(50),
  offset: z.coerce.number().min(0).default(0),
  role: z.enum(['owner', 'admin', 'moderator', 'member', 'guest']).optional(),
  search: z.string().optional(),
  includeOffline: z.coerce.boolean().default(true) });

const db = dbAdmin;

// GET /api/spaces/[spaceId]/members - Get members for a space
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    const { searchParams } = new URL(request.url);
    const { limit, offset, role, search, includeOffline } = GetMembersSchema.parse(
      Object.fromEntries(searchParams.entries())
    );

    // Check if requesting user is member of the space using flat spaceMembers collection
    const requesterMember = await getSpaceMember(spaceId, decodedToken.uid);

    if (!requesterMember) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get all members using helper function
    const spaceMembers = await getSpaceMembers(spaceId);
    
    const members = [];

    // Process members with filtering and pagination
    for (let i = offset; i < Math.min(offset + limit, spaceMembers.length); i++) {
      const memberData = spaceMembers[i];
      
      // Filter by role if specified
      if (role && memberData.role !== role) continue;

      const userId = memberData.userId;

      // Get user profile info
      const userDoc = await db
        .collection("users")
        .doc(userId)
        .get();
      
      const userData = userDoc.exists ? userDoc.data() : null;

      // Skip if no user data found
      if (!userData) continue;

      // Calculate member stats using activity events (simplified for now)
      let postCount = 0;
      try {
        const activityQuery = db
          .collection("activityEvents")
          .where("userId", "==", userId)
          .where("spaceId", "==", spaceId)
          .where("type", "==", "post_created")
          .limit(100);
        
        const activitySnapshot = await activityQuery.get();
        postCount = activitySnapshot.size;
      } catch (error) {
        // Activity counting is optional, continue without it
        logger.warn('Could not count user posts', { userId, spaceId });
      }

      const member = {
        id: userId,
        name: memberData.displayName || userData.fullName || userData.displayName || 'Unknown User',
        username: userData.handle || userData.email?.split('@')[0] || 'unknown',
        avatar: memberData.photoURL || userData.photoURL,
        bio: userData.bio || userData.about,
        role: memberData.role || 'member',
        status: 'online', // Simplified - would need real presence tracking
        joinedAt: memberData.joinedAt?.toDate ? memberData.joinedAt?.toDate ? joinedAt.toDate() : new Date(joinedAt) : new Date(memberData.joinedAt || Date.now()),
        lastActive: memberData.lastActiveAt?.toDate ? memberData.lastActiveAt?.toDate ? lastActiveAt.toDate() : new Date(lastActiveAt) : new Date(),
        isVerified: userData.isVerified || false,
        badges: userData.badges || [],
        stats: {
          postsCount: postCount,
          likesReceived: 0, // Would need to aggregate from post reactions
          eventsAttended: 0, // Would need to aggregate from event RSVPs
          contributionScore: postCount * 10, // Simplified scoring
        },
        interests: userData.interests || [],
        major: userData.major,
        graduationYear: userData.graduationYear,
        location: userData.location,
        socialLinks: userData.socialLinks || {},
        permissions: {
          canMessage: memberData.role !== 'guest',
          canViewProfile: true,
          canInviteOthers: ['owner', 'admin', 'moderator'].includes(memberData.role),
        },
        // Internal fields
        spaceRole: memberData.role,
        isOnline: true, // Simplified for now
      };

      // Apply search filter if specified
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch = 
          (member.name?.toLowerCase() || '').includes(searchLower) ||
          (member.username?.toLowerCase() || '').includes(searchLower) ||
          (member.bio && member.bio.toLowerCase().includes(searchLower)) ||
          (member.interests || []).some((interest: string) => interest.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) continue;
      }

      // Apply offline filter if specified (simplified since we're showing everyone as online for now)
      if (!includeOffline && member.status === 'offline') {
        continue;
      }

      members.push(member);
    }

    // Sort members by role hierarchy and online status
    const roleOrder = { owner: 5, admin: 4, moderator: 3, member: 2, guest: 1 };
    members.sort((a, b) => {
      // Role hierarchy first
      const aRoleScore = roleOrder[a.role as keyof typeof roleOrder] || 1;
      const bRoleScore = roleOrder[b.role as keyof typeof roleOrder] || 1;
      
      if (aRoleScore !== bRoleScore) {
        return bRoleScore - aRoleScore;
      }
      
      // Online status second
      if (a.status !== 'offline' && b.status === 'offline') return -1;
      if (a.status === 'offline' && b.status !== 'offline') return 1;
      
      // Join date last (most recent first)
      return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
    });

    // Get summary stats from flat spaceMembers collection
    const totalMembers = spaceMembers.length;
    const onlineMembers = members.filter(m => m.status !== 'offline').length;

    return NextResponse.json({
      members,
      summary: {
        totalMembers,
        onlineMembers,
        activeMembers: members.filter(m => {
          const daysSinceActive = (Date.now() - new Date(m.lastActive).getTime()) / (1000 * 60 * 60 * 24);
          return daysSinceActive <= 7;
        }).length,
      },
      pagination: {
        limit,
        offset,
        hasMore: offset + limit < spaceMembers.length,
        nextOffset: offset + limit < spaceMembers.length ? offset + limit : null,
      } });
  } catch (error) {
    logger.error('Error fetching members', { error: error, endpoint: '/api/spaces/[spaceId]/members' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch members", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// POST /api/spaces/[spaceId]/members - Invite a member to the space
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
    // Get auth header and verify token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Check if requesting user can invite members
    const requesterMember = await getSpaceMember(spaceId, decodedToken.uid);

    if (!requesterMember) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const requesterRole = requesterMember.role;
    if (!['owner', 'admin', 'moderator'].includes(requesterRole)) {
      return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to invite members", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const body = await request.json();
    const { userId, role = 'member' } = body;

    if (!userId) {
      return NextResponse.json(ApiResponseHelper.error("User ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Check if user exists and get user data
    const userDoc = await dbAdmin.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("User not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    
    const userData = userDoc.data()!;

    // Check if user is already a member
    const existingMember = await getSpaceMember(spaceId, userId);

    if (existingMember) {
      return NextResponse.json(ApiResponseHelper.error("User is already a member of this space", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Add member to space using helper
    const newMember = await addSpaceMember(
      spaceId, 
      userId, 
      {
        displayName: userData.fullName || userData.displayName || userData.email?.split('@')[0] || 'Unknown User',
        email: userData.email,
        photoURL: userData.photoURL
      }, 
      role as any
    );

    if (!newMember) {
      throw new Error('Failed to add member');
    }

    return NextResponse.json({
      success: true,
      message: "Member invited successfully",
      member: newMember
    });
  } catch (error) {
    logger.error('Error inviting member', { error: error, endpoint: '/api/spaces/[spaceId]/members' });
    return NextResponse.json(ApiResponseHelper.error("Failed to invite member", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PATCH /api/spaces/[spaceId]/members - Update member role or status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Parse request body
    const body = await request.json();
    const { userId, role, action, reason } = body;

    if (!userId) {
      return NextResponse.json(ApiResponseHelper.error("User ID is required", "VALIDATION_ERROR"), { status: HttpStatus.BAD_REQUEST });
    }

    // Check if requesting user has permission to manage members
    const requesterMember = await getSpaceMember(spaceId, decodedToken.uid);

    if (!requesterMember) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const requesterRole = requesterMember.role;
    const canManageMembers = ['owner', 'admin'].includes(requesterRole);
    const canModerateModerators = requesterRole === 'owner';

    if (!canManageMembers) {
      return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to manage members", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get target member info
    const targetMember = await getSpaceMember(spaceId, userId);

    if (!targetMember) {
      return NextResponse.json(ApiResponseHelper.error("Member not found", "NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const targetRole = targetMember.role;

    // Role change validation
    if (role) {
      const validRoles = ['member', 'moderator', 'admin'];
      if (!validRoles.includes(role)) {
        return NextResponse.json(ApiResponseHelper.error("Invalid role", "VALIDATION_ERROR"), { status: HttpStatus.BAD_REQUEST });
      }

      // Only owners can promote to admin or manage other admins
      if ((role === 'admin' || targetRole === 'admin') && requesterRole !== 'owner') {
        return NextResponse.json(ApiResponseHelper.error("Only space owners can manage admin roles", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
      }

      // Only owners can demote moderators
      if (targetRole === 'moderator' && !canModerateModerators) {
        return NextResponse.json(ApiResponseHelper.error("Only space owners can manage moderator roles", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
      }

      // Can't change owner role
      if (targetRole === 'owner' || role === 'owner') {
        return NextResponse.json(ApiResponseHelper.error("Cannot change owner role", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
      }
    }

    // Handle role change
    if (role) {
      const success = await updateMemberRole(spaceId, userId, role as any);
      if (!success) {
        throw new Error('Failed to update member role');
      }
    }

    // TODO: Implement suspension/unsuspension in the flat structure
    if (action === 'suspend' || action === 'unsuspend') {
      logger.warn('Suspension actions not yet implemented in flat structure', { spaceId, userId, action });
    }

    // Log the action to activity events
    try {
      await db
        .collection("activityEvents")
        .add({
          type: 'member_role_changed',
          userId: decodedToken.uid,
          spaceId,
          targetUserId: userId,
          details: {
            oldRole: targetRole,
            newRole: role || targetRole,
            action: action || 'role_change',
            reason
          },
          timestamp: new Date()
        });
    } catch (error) {
      logger.error('Failed to log member update activity', { error });
      // Don't fail the operation if logging fails
    }

    logger.info(`Member ${action || 'role changed'}: ${userId} in space ${spaceId} by ${decodedToken.uid}`);

    return NextResponse.json(ApiResponseHelper.success({
      message: `Member ${action || 'updated'} successfully`,
      updatedMember: {
        id: userId,
        role: role || targetRole
      }
    }));

  } catch (error: any) {
    logger.error("Error updating member:", error);
    return NextResponse.json(ApiResponseHelper.error("Failed to update member", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// DELETE /api/spaces/[spaceId]/members - Remove member from space
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;
    
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Parse request query
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const reason = searchParams.get("reason");

    if (!userId) {
      return NextResponse.json(ApiResponseHelper.error("User ID is required", "VALIDATION_ERROR"), { status: HttpStatus.BAD_REQUEST });
    }

    // Check if requesting user has permission to remove members
    const requesterMember = await getSpaceMember(spaceId, decodedToken.uid);

    if (!requesterMember) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const requesterRole = requesterMember.role;
    const canRemoveMembers = ['owner', 'admin', 'moderator'].includes(requesterRole);

    if (!canRemoveMembers) {
      return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to remove members", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get target member info
    const targetMember = await getSpaceMember(spaceId, userId);

    if (!targetMember) {
      return NextResponse.json(ApiResponseHelper.error("Member not found", "NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const targetRole = targetMember.role;

    // Permission validation
    if (targetRole === 'owner') {
      return NextResponse.json(ApiResponseHelper.error("Cannot remove space owner", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    if (targetRole === 'admin' && requesterRole !== 'owner') {
      return NextResponse.json(ApiResponseHelper.error("Only space owners can remove admins", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    if (targetRole === 'moderator' && !['owner', 'admin'].includes(requesterRole)) {
      return NextResponse.json(ApiResponseHelper.error("Only admins and owners can remove moderators", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Remove member using helper function
    const success = await removeSpaceMember(spaceId, userId);
    if (!success) {
      throw new Error('Failed to remove member');
    }

    // Log the action to activity events
    try {
      await db
        .collection("activityEvents")
        .add({
          type: 'member_removed',
          userId: decodedToken.uid,
          spaceId,
          targetUserId: userId,
          details: {
            removedRole: targetRole,
            reason
          },
          timestamp: new Date()
        });
    } catch (error) {
      logger.error('Failed to log member removal activity', { error });
      // Don't fail the operation if logging fails
    }

    logger.info(`Member removed: ${userId} from space ${spaceId} by ${decodedToken.uid}`);

    return NextResponse.json(ApiResponseHelper.success({
      message: "Member removed successfully"
    }));

  } catch (error: any) {
    logger.error("Error removing member:", error);
    return NextResponse.json(ApiResponseHelper.error("Failed to remove member", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}