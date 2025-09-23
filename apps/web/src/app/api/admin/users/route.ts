import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";

/**
 * Admin User Management API
 * Provides comprehensive user management capabilities for HIVE team
 * GET /api/admin/users - List and search users
 * POST /api/admin/users - Create or update user
 * DELETE /api/admin/users - Suspend/delete user
 */

// Admin user IDs (TODO: Move to environment variables or admin table)
const ADMIN_USER_IDS = [
  'test-user', // For development
  // Add real admin user IDs here
];

const userActionSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  action: z.enum(['suspend', 'unsuspend', 'promote', 'demote', 'delete']),
  reason: z.string().min(1, 'Reason is required').max(500, 'Reason must be under 500 characters'),
  duration: z.number().optional() // For temporary suspensions (days)
});

const userUpdateSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  displayName: z.string().optional(),
  email: z.string().email().optional(),
  major: z.string().optional(),
  classYear: z.string().optional(),
  bio: z.string().max(500).optional(),
  isVerified: z.boolean().optional(),
  role: z.enum(['student', 'admin', 'moderator']).optional()
});

/**
 * Check if user is an admin
 */
async function isAdmin(userId: string): Promise<boolean> {
  return ADMIN_USER_IDS.includes(userId);
}

/**
 * Get users with filtering and pagination
 * GET /api/admin/users
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    let adminUserId: string;
    
    // Handle test tokens in development
    if (token === 'test-token') {
      adminUserId = 'test-user';
    } else {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        adminUserId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
      }
    }

    // Check if user is admin
    if (!(await isAdmin(adminUserId))) {
      return NextResponse.json(ApiResponseHelper.error("Admin access required", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Parse query parameters
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const major = url.searchParams.get('major') || '';
    const status = url.searchParams.get('status') || 'all'; // all, active, suspended
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    logger.info('👑 Admin accessing user management', { adminUserId, endpoint: '/api/admin/users' });

    // Get users with filtering
    let usersQuery = dbAdmin.collection('users');
    
    // Apply filters
    if (major && major !== 'all') {
      usersQuery = usersQuery.where('major', '==', major) as any;
    }
    
    if (status !== 'all') {
      if (status === 'suspended') {
        usersQuery = usersQuery.where('isSuspended', '==', true) as any;
      } else if (status === 'active') {
        usersQuery = usersQuery.where('isSuspended', '==', false) as any;
      }
    }

    const usersSnapshot = await usersQuery.limit(limit).offset(offset).get();
    let users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString(),
      lastActiveAt: doc.data().lastActiveAt?.toDate?.()?.toISOString(),
      suspendedAt: doc.data().suspendedAt?.toDate?.()?.toISOString(),
      suspendedUntil: doc.data().suspendedUntil?.toDate?.()?.toISOString()
    }));

    // Apply text search filter (client-side for now)
    if (search) {
      const searchLower = search.toLowerCase();
      users = users.filter(user => 
        (user as any).displayName?.toLowerCase().includes(searchLower) ||
        (user as any).email?.toLowerCase().includes(searchLower) ||
        (user as any).handle?.toLowerCase().includes(searchLower) ||
        (user as any).major?.toLowerCase().includes(searchLower)
      );
    }

    // Get user space memberships for each user
    const usersWithMemberships = await Promise.all(
      users.map(async (user) => {
        try {
          const membershipsSnapshot = await dbAdmin
            .collectionGroup('members')
            .where('uid', '==', user.id)
            .get();
          
          const memberships = membershipsSnapshot.docs.map(doc => {
            const pathParts = doc.ref.path.split('/');
            return {
              spaceId: pathParts[3],
              spaceType: pathParts[1],
              role: doc.data().role,
              joinedAt: doc.data().joinedAt?.toDate?.()?.toISOString()
            };
          });

          return {
            ...user,
            memberships: memberships,
            membershipCount: memberships.length,
            builderCount: memberships.filter(m => m.role === 'builder').length,
            isBuilder: memberships.some(m => m.role === 'builder')
          };
        } catch (error) {
          logger.error('Error getting memberships for user', { userId: user.id, error: error, endpoint: '/api/admin/users' });
          return {
            ...user,
            memberships: [],
            membershipCount: 0,
            builderCount: 0,
            isBuilder: false
          };
        }
      })
    );

    // Get total count for pagination
    const totalUsersSnapshot = await dbAdmin.collection('users').get();
    const totalCount = totalUsersSnapshot.size;

    return NextResponse.json({
      success: true,
      users: usersWithMemberships,
      pagination: {
        limit,
        offset,
        totalCount,
        hasMore: offset + limit < totalCount,
        nextOffset: offset + limit < totalCount ? offset + limit : null
      },
      filters: {
        search: search || null,
        major: major || null,
        status: status || null
      },
      summary: {
        totalUsers: totalCount,
        activeUsers: usersWithMemberships.filter(u => !u.suspendedAt).length,
        suspendedUsers: usersWithMemberships.filter(u => u.suspendedAt).length,
        builders: usersWithMemberships.filter(u => u.isBuilder).length,
        averageMemberships: usersWithMemberships.length > 0 ? 
          Math.round(usersWithMemberships.reduce((sum, u) => sum + u.membershipCount, 0) / usersWithMemberships.length) : 0
      }
    });

  } catch (error) {
    logger.error('Admin users GET error', { error: error, endpoint: '/api/admin/users' });
    return NextResponse.json(ApiResponseHelper.error("Failed to get users", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

/**
 * Update user information
 * POST /api/admin/users
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    let adminUserId: string;
    
    // Handle test tokens in development
    if (token === 'test-token') {
      adminUserId = 'test-user';
    } else {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        adminUserId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
      }
    }

    // Check if user is admin
    if (!(await isAdmin(adminUserId))) {
      return NextResponse.json(ApiResponseHelper.error("Admin access required", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Parse request body
    const body = await request.json();
    const { userId, displayName, email, major, classYear, bio, isVerified, role } = userUpdateSchema.parse(body);

    // Get user document
    const userRef = dbAdmin.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("User not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      lastModifiedBy: adminUserId
    };

    if (displayName !== undefined) updateData.displayName = displayName;
    if (email !== undefined) updateData.email = email;
    if (major !== undefined) updateData.major = major;
    if (classYear !== undefined) updateData.classYear = classYear;
    if (bio !== undefined) updateData.bio = bio;
    if (isVerified !== undefined) updateData.isVerified = isVerified;
    if (role !== undefined) updateData.role = role;

    // Update user document
    await userRef.update(updateData);

    logger.info('👑 Adminupdated user', { adminUserId, userId, endpoint: '/api/admin/users' });

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      userId,
      updatedFields: Object.keys(updateData).filter(key => key !== 'updatedAt' && key !== 'lastModifiedBy'),
      updatedBy: adminUserId
    });

  } catch (error: any) {
    logger.error('Admin users POST error', { error: error, endpoint: '/api/admin/users' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to update user", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

/**
 * User actions (suspend, delete, etc.)
 * DELETE /api/admin/users
 */
export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    let adminUserId: string;
    
    // Handle test tokens in development
    if (token === 'test-token') {
      adminUserId = 'test-user';
    } else {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        adminUserId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
      }
    }

    // Check if user is admin
    if (!(await isAdmin(adminUserId))) {
      return NextResponse.json(ApiResponseHelper.error("Admin access required", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Parse request body
    const body = await request.json();
    const { userId, action, reason, duration } = userActionSchema.parse(body);

    // Get user document
    const userRef = dbAdmin.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("User not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const userData = userDoc.data();

    // Perform the requested action
    const updateData: any = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      lastModifiedBy: adminUserId
    };

    let actionMessage = '';

    switch (action) {
      case 'suspend':
        updateData.isSuspended = true;
        updateData.suspendedAt = admin.firestore.FieldValue.serverTimestamp();
        updateData.suspendedBy = adminUserId;
        updateData.suspendedReason = reason;
        
        if (duration) {
          const suspendedUntil = new Date();
          suspendedUntil.setDate(suspendedUntil.getDate() + duration);
          updateData.suspendedUntil = suspendedUntil;
          actionMessage = `User suspended for ${duration} days`;
        } else {
          actionMessage = 'User suspended indefinitely';
        }
        break;

      case 'unsuspend':
        updateData.isSuspended = false;
        updateData.unsuspendedAt = admin.firestore.FieldValue.serverTimestamp();
        updateData.unsuspendedBy = adminUserId;
        updateData.unsuspendedReason = reason;
        updateData.suspendedUntil = null;
        actionMessage = 'User unsuspended';
        break;

      case 'promote':
        updateData.role = 'admin';
        updateData.promotedAt = admin.firestore.FieldValue.serverTimestamp();
        updateData.promotedBy = adminUserId;
        updateData.promotedReason = reason;
        actionMessage = 'User promoted to admin';
        break;

      case 'demote':
        updateData.role = 'student';
        updateData.demotedAt = admin.firestore.FieldValue.serverTimestamp();
        updateData.demotedBy = adminUserId;
        updateData.demotedReason = reason;
        actionMessage = 'User demoted to student';
        break;

      case 'delete':
        // For safety, we'll mark as deleted rather than actually deleting
        updateData.isDeleted = true;
        updateData.deletedAt = admin.firestore.FieldValue.serverTimestamp();
        updateData.deletedBy = adminUserId;
        updateData.deletedReason = reason;
        actionMessage = 'User marked as deleted';
        break;
    }

    // Update user document
    await userRef.update(updateData);

    // Log admin action
    await logAdminAction(adminUserId, action, userId, reason);

    logger.info('👑 Admin performedon user', {  action, userId, endpoint: '/api/admin/users'  });

    return NextResponse.json({
      success: true,
      message: actionMessage,
      action,
      userId,
      reason,
      duration,
      performedBy: adminUserId,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('Admin users DELETE error', { error: error, endpoint: '/api/admin/users' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to perform user action", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

/**
 * Log admin actions for audit trail
 */
async function logAdminAction(adminUserId: string, action: string, targetUserId: string, reason: string) {
  try {
    await dbAdmin.collection('adminLogs').add({
      adminUserId,
      action,
      targetUserId,
      reason,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      type: 'user_action'
    });
  } catch (error) {
    logger.error('Error logging admin action', { error: error, endpoint: '/api/admin/users' });
  }
}