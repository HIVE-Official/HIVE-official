import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getAuthTokenFromRequest } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import * as admin from 'firebase-admin';

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
    const requesterMemberQuery = db.collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', decodedToken.uid)
      .where('isActive', '==', true)
      .limit(1);
    
    const requesterMemberSnapshot = await requesterMemberQuery.get();

    if (requesterMemberSnapshot.empty) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Build query for members using flat spaceMembers collection
    let query: admin.firestore.Query<admin.firestore.DocumentData> = db
      .collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('isActive', '==', true);

    // Filter by role
    if (role) {
      query = query.where("role", "==", role);
    }

    // Apply ordering and pagination
    query = query.orderBy("joinedAt", "desc");
    query = query.offset(offset).limit(limit);

    const membersSnapshot = await query.get();

    const members = [];

    // Process members
    for (const doc of membersSnapshot.docs) {
      const memberData = doc.data();
      const userId = memberData.userId;

      // Get user profile info
      const userDoc = await db
        .collection("users")
        .doc(userId)
        .get();
      
      const userData = userDoc.exists ? userDoc.data() : null;

      // Skip if no user data found
      if (!userData) continue;

      // Calculate member stats using activity events
      const activityQuery = db
        .collection("activityEvents")
        .where("userId", "==", userId)
        .where("spaceId", "==", spaceId)
        .where("type", "in", ["post_created", "comment_created"]);
      
      const activitySnapshot = await activityQuery.get();
      const postCount = activitySnapshot.docs.filter(doc => doc.data().type === "post_created").length;

      const member = {
        id: userId,
        name: userData.fullName || userData.displayName || 'Unknown User',
        username: userData.handle || userData.email?.split('@')[0] || 'unknown',
        avatar: userData.photoURL,
        bio: userData.bio || userData.about,
        role: memberData.role || 'member',
        status: memberData.isOnline ? 'online' : 'offline', // Simplified status
        joinedAt: memberData.joinedAt?.toDate ? memberData.joinedAt.toDate() : new Date(memberData.joinedAt || Date.now()),
        lastActive: memberData.lastActive?.toDate ? memberData.lastActive.toDate() : new Date(),
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
        isOnline: memberData.isOnline || false,
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

      // Apply offline filter if specified
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

    // Get summary stats
    const totalMembers = (await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .get()).size;

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
        hasMore: membersSnapshot.size === limit,
        nextOffset: membersSnapshot.size === limit ? offset + limit : null,
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
    const requesterMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(decodedToken.uid)
      .get();

    if (!requesterMemberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const requesterRole = requesterMemberDoc.data()?.role;
    if (!['owner', 'admin', 'moderator'].includes(requesterRole)) {
      return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to invite members", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const body = await request.json();
    const { userId, role = 'member' } = body;

    if (!userId) {
      return NextResponse.json(ApiResponseHelper.error("User ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Check if user exists
    const userDoc = await dbAdmin.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("User not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Check if user is already a member
    const existingMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .get();

    if (existingMemberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("User is already a member of this space", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Add member to space
    const memberData = {
      userId,
      role,
      joinedAt: new Date(),
      lastActive: new Date(),
      invitedBy: decodedToken.uid,
      isOnline: false,
    };

    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .set(memberData);

    return NextResponse.json({
      success: true,
      message: "Member invited successfully",
      member: {
        id: userId,
        ...memberData,
      } });
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
    const requesterMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(decodedToken.uid)
      .get();

    if (!requesterMemberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const requesterRole = requesterMemberDoc.data()?.role;
    const canManageMembers = ['owner', 'admin'].includes(requesterRole);
    const canModerateModerators = requesterRole === 'owner';

    if (!canManageMembers) {
      return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to manage members", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get target member info
    const targetMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .get();

    if (!targetMemberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Member not found", "NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const targetRole = targetMemberDoc.data()?.role;

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

    // Handle different actions
    const updates: any = {
      updatedAt: new Date(),
      updatedBy: decodedToken.uid
    };

    if (role) {
      updates.role = role;
      updates.roleChangedAt = new Date();
    }

    if (action === 'suspend') {
      updates.isSuspended = true;
      updates.suspendedAt = new Date();
      updates.suspendedBy = decodedToken.uid;
      if (reason) updates.suspensionReason = reason;
    } else if (action === 'unsuspend') {
      updates.isSuspended = false;
      updates.unsuspendedAt = new Date();
      updates.unsuspendedBy = decodedToken.uid;
    }

    // Update member
    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .update(updates);

    // Log the action
    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("activity")
      .add({
        type: 'member_role_changed',
        performedBy: decodedToken.uid,
        targetUserId: userId,
        details: {
          oldRole: targetRole,
          newRole: role || targetRole,
          action: action || 'role_change',
          reason
        },
        timestamp: new Date()
      });

    logger.info(`Member ${action || 'role changed'}: ${userId} in space ${spaceId} by ${decodedToken.uid}`);

    return NextResponse.json(ApiResponseHelper.success({
      message: `Member ${action || 'updated'} successfully`,
      updates
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
    const requesterMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(decodedToken.uid)
      .get();

    if (!requesterMemberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const requesterRole = requesterMemberDoc.data()?.role;
    const canRemoveMembers = ['owner', 'admin', 'moderator'].includes(requesterRole);

    if (!canRemoveMembers) {
      return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to remove members", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get target member info
    const targetMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .get();

    if (!targetMemberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Member not found", "NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const targetRole = targetMemberDoc.data()?.role;

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

    // Remove member
    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .delete();

    // Update space member count
    await db
      .collection("spaces")
      .doc(spaceId)
      .update({
        memberCount: admin.firestore.FieldValue.increment(-1),
        updatedAt: new Date()
      });

    // Log the action
    await db
      .collection("spaces")
      .doc(spaceId)
      .collection("activity")
      .add({
        type: 'member_removed',
        performedBy: decodedToken.uid,
        targetUserId: userId,
        details: {
          removedRole: targetRole,
          reason
        },
        timestamp: new Date()
      });

    logger.info(`Member removed: ${userId} from space ${spaceId} by ${decodedToken.uid}`);

    return NextResponse.json(ApiResponseHelper.success({
      message: "Member removed successfully"
    }));

  } catch (error: any) {
    logger.error("Error removing member:", error);
    return NextResponse.json(ApiResponseHelper.error("Failed to remove member", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}