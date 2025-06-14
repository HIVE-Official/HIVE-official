import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@hive/core/src/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { type Timestamp } from 'firebase-admin/firestore';

const completeOnboardingSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Full name too long'),
  major: z.string().min(1, 'Major is required'),
  handle: z.string()
    .min(3, 'Handle must be at least 3 characters')
    .max(20, 'Handle must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Handle can only contain letters, numbers, and underscores'),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  builderOptIn: z.boolean().default(false),
  consentGiven: z.boolean().refine(val => val === true, 'Consent must be given'),
});

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const idToken = authHeader.split('Bearer ')[1];
    const auth = getAuth();
    
    // Verify the ID token
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (error) {
      console.error('Invalid ID token:', error);
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;
    const userEmail = decodedToken.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Email not found in token' },
        { status: 400 }
      );
    }

    // Parse and validate the request body
    const body = await request.json();
    const onboardingData = completeOnboardingSchema.parse(body);

    // Normalize handle to lowercase
    const normalizedHandle = onboardingData.handle.toLowerCase();

    // Use a transaction to ensure atomicity
    const result = await dbAdmin.runTransaction(async (transaction) => {
      // Check if user already exists
      const userDoc = await transaction.get(dbAdmin.collection('users').doc(userId));
      
      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const userData = userDoc.data();
      
      // Check if user has already completed onboarding
      if (userData?.handle) {
        throw new Error('Onboarding already completed');
      }

      // Check if handle is available
      const handleDoc = await transaction.get(dbAdmin.collection('handles').doc(normalizedHandle));
      
      if (handleDoc.exists) {
        throw new Error('Handle is already taken');
      }

      const now = new Date() as unknown as Timestamp;

      // Update user document
      const updatedUserData = {
        ...userData,
        fullName: onboardingData.fullName,
        major: onboardingData.major,
        handle: normalizedHandle,
        avatarUrl: onboardingData.avatarUrl || '',
        builderOptIn: onboardingData.builderOptIn,
        consentGiven: onboardingData.consentGiven,
        consentGivenAt: now,
        onboardingCompletedAt: now,
        updatedAt: now,
      };

      // Reserve the handle
      const handleReservation = {
        userId,
        email: userEmail,
        reservedAt: now,
      };

      // Perform the writes
      transaction.update(dbAdmin.collection('users').doc(userId), updatedUserData);
      transaction.set(dbAdmin.collection('handles').doc(normalizedHandle), handleReservation);

      return { updatedUserData, normalizedHandle };
    });

    // After successful onboarding, auto-join the user to relevant spaces
    try {
      const autoJoinResponse = await fetch(`${request.url.split('/api')[0]}/api/spaces/auto-join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!autoJoinResponse.ok) {
        console.warn('Auto-join failed, but onboarding succeeded:', await autoJoinResponse.text());
      } else {
        const autoJoinResult = await autoJoinResponse.json();
        console.log('Auto-join successful:', autoJoinResult);
      }
    } catch (autoJoinError) {
      console.warn('Auto-join error, but onboarding succeeded:', autoJoinError);
    }

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      user: {
        id: userId,
        fullName: result.updatedUserData.fullName,
        handle: result.normalizedHandle,
        major: result.updatedUserData.major,
        builderOptIn: result.updatedUserData.builderOptIn,
      },
    });

  } catch (error) {
    console.error('Error completing onboarding:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      if (error.message === 'Handle is already taken') {
        return NextResponse.json(
          { error: 'Handle is already taken' },
          { status: 409 }
        );
      }
      
      if (error.message === 'Onboarding already completed') {
        return NextResponse.json(
          { error: 'Onboarding already completed' },
          { status: 409 }
        );
      }
      
      if (error.message === 'User not found') {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    );
  }
} 