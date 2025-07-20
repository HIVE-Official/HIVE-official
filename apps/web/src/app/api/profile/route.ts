import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';

// Validation schema for profile updates
const updateProfileSchema = z.object({
  fullName: z.string().min(1).max(100).optional(),
  major: z.string().min(1).max(100).optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  isPublic: z.boolean().optional(),
  builderOptIn: z.boolean().optional(),
});

/**
 * Get user profile
 * GET /api/profile
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Handle development mode tokens
    if (token.startsWith('dev_token_')) {
      const userId = token.replace('dev_token_', '');
      return NextResponse.json({
        success: true,
        user: {
          id: userId,
          email: `dev_user_${userId}@example.com`,
          fullName: 'Development User',
          handle: `dev_user_${userId}`,
          major: 'Computer Science',
          avatarUrl: '',
          schoolId: 'dev_school',
          emailVerified: true,
          builderOptIn: false,
          isPublic: true,
          onboardingCompleted: true,
          developmentMode: true,
        },
      });
    }
    
    // Verify the token
    const auth = getAuth();
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (authError) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;

    // Get user document from Firestore
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    
    // Return sanitized user profile
    const userProfile = {
      id: userId,
      email: userData?.email || decodedToken.email,
      fullName: userData?.fullName || '',
      handle: userData?.handle || '',
      major: userData?.major || '',
      avatarUrl: userData?.avatarUrl || '',
      schoolId: userData?.schoolId || '',
      emailVerified: userData?.emailVerified || false,
      builderOptIn: userData?.builderOptIn || false,
      isPublic: userData?.isPublic || false,
      onboardingCompleted: !!userData?.onboardingCompletedAt,
      createdAt: userData?.createdAt,
      updatedAt: userData?.updatedAt,
      consentGiven: userData?.consentGiven || false,
      consentGivenAt: userData?.consentGivenAt,
    };

    return NextResponse.json({
      success: true,
      user: userProfile,
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

/**
 * Update user profile
 * PATCH /api/profile
 */
export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Handle development mode tokens
    if (token.startsWith('dev_token_')) {
      const body = await request.json();
      const updateData = updateProfileSchema.parse(body);
      
      console.log('Development mode profile update:', updateData);
      
      return NextResponse.json({
        success: true,
        message: 'Profile updated successfully (development mode)',
        updated: updateData,
      });
    }
    
    // Verify the token
    const auth = getAuth();
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (authError) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;

    // Parse and validate the update data
    const body = await request.json();
    const updateData = updateProfileSchema.parse(body);

    // Update the user document
    const userRef = dbAdmin.collection('users').doc(userId);
    const updatePayload = {
      ...updateData,
      updatedAt: FieldValue.serverTimestamp(),
    };

    await userRef.update(updatePayload);

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      updated: Object.keys(updateData),
    });

  } catch (error) {
    console.error('Profile update error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }
    
    if (error instanceof Error && error.message.includes('auth/id-token-expired')) {
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}