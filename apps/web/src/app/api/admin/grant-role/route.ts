import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';

const grantRoleSchema = z.object({
  targetUserId: z.string().min(1, 'Target user ID is required'),
  role: z.enum(['admin', 'builder'], {
    errorMap: () => ({ message: 'Role must be either admin or builder' })
  }),
  spaceId: z.string().optional(), // Required for builder role
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { targetUserId, role, spaceId } = grantRoleSchema.parse(body);

    // Get the requesting user's token to verify admin status
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const auth = getAuth();
    
    // Verify the requesting user is an admin
    const decodedToken = await auth.verifyIdToken(token);
    if (!decodedToken.admin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get the target user
    const targetUser = await auth.getUser(targetUserId);
    if (!targetUser) {
      return NextResponse.json(
        { error: 'Target user not found' },
        { status: 404 }
      );
    }

    // Get current custom claims
    const currentClaims = targetUser.customClaims || {};

    if (role === 'admin') {
      // Grant admin role
      await auth.setCustomUserClaims(targetUserId, {
        ...currentClaims,
        admin: true
      });

      // Update user document
      await dbAdmin.collection('users').doc(targetUserId).update({
        isAdmin: true,
        updatedAt: new Date()
      });

    } else if (role === 'builder') {
      if (!spaceId) {
        return NextResponse.json(
          { error: 'Space ID required for builder role' },
          { status: 400 }
        );
      }

      // Verify the space exists
      const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();
      if (!spaceDoc.exists) {
        return NextResponse.json(
          { error: 'Space not found' },
          { status: 404 }
        );
      }

      // Grant builder role
      await auth.setCustomUserClaims(targetUserId, {
        ...currentClaims,
        builder: true,
        builderSpaces: [...(currentClaims.builderSpaces || []), spaceId]
      });

      // Update user document
      await dbAdmin.collection('users').doc(targetUserId).update({
        isBuilder: true,
        updatedAt: new Date()
      });

      // Update the member's role in the space
      await dbAdmin
        .collection('spaces')
        .doc(spaceId)
        .collection('members')
        .doc(targetUserId)
        .update({
          role: 'builder',
          updatedAt: new Date()
        });
    }

    return NextResponse.json({
      success: true,
      message: `${role} role granted successfully`,
      userId: targetUserId,
      role
    });

  } catch (error) {
    console.error('Grant role error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 