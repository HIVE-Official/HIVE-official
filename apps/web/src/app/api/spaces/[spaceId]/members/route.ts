import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getAuthTokenFromRequest } from "@/lib/auth";

const GetMembersSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(50),
  offset: z.coerce.number().min(0).default(0),
  role: z.enum(['owner', 'admin', 'moderator', 'member', 'guest']).optional(),
  search: z.string().optional(),
  includeOffline: z.coerce.boolean().default(true),
});

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
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    const { searchParams } = new URL(request.url);
    const { limit, offset, role, search, includeOffline } = GetMembersSchema.parse(
      Object.fromEntries(searchParams.entries())
    );

    // Check if requesting user is member of the space
    const requesterMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(decodedToken.uid)
      .get();

    if (!requesterMemberDoc.exists) {
      return NextResponse.json(
        { error: "Not a member of this space" },
        { status: 403 }
      );
    }

    // Build query for members
    let query = db
      .collection("spaces")
      .doc(spaceId)
      .collection("members");

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

      // Get user profile info
      const userDoc = await db
        .collection("users")
        .doc(doc.id)
        .get();
      
      const userData = userDoc.exists ? userDoc.data() : null;

      // Skip if no user data found
      if (!userData) continue;

      // Calculate member stats (simplified for demo)
      // In production, these would be cached or calculated differently
      const postsSnapshot = await db
        .collection("spaces")
        .doc(spaceId)
        .collection("posts")
        .where("authorId", "==", doc.id)
        .get();

      const member = {
        id: doc.id,
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
          postsCount: postsSnapshot.size,
          likesReceived: 0, // Would need to aggregate from post reactions
          eventsAttended: 0, // Would need to aggregate from event RSVPs
          contributionScore: postsSnapshot.size * 10, // Simplified scoring
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
          member.name.toLowerCase().includes(searchLower) ||
          member.username.toLowerCase().includes(searchLower) ||
          (member.bio && member.bio.toLowerCase().includes(searchLower)) ||
          member.interests.some(interest => interest.toLowerCase().includes(searchLower));
        
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
      },
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
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
      return NextResponse.json(
        { error: "Not a member of this space" },
        { status: 403 }
      );
    }

    const requesterRole = requesterMemberDoc.data()?.role;
    if (!['owner', 'admin', 'moderator'].includes(requesterRole)) {
      return NextResponse.json(
        { error: "Insufficient permissions to invite members" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, role = 'member' } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if user is already a member
    const existingMemberDoc = await db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId)
      .get();

    if (existingMemberDoc.exists) {
      return NextResponse.json(
        { error: "User is already a member of this space" },
        { status: 400 }
      );
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
      },
    });
  } catch (error) {
    console.error("Error inviting member:", error);
    return NextResponse.json(
      { error: "Failed to invite member" },
      { status: 500 }
    );
  }
}