import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@hive/core/src/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { type Timestamp } from 'firebase-admin/firestore';

const verifyMagicLinkSchema = z.object({
  email: z.string().email('Invalid email address'),
  schoolId: z.string().min(1, 'School ID is required'),
  oobCode: z.string().min(1, 'Action code is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, schoolId, oobCode } = verifyMagicLinkSchema.parse(body);

    const auth = getAuth();
    
    // Verify the email link code
    try {
      await auth.checkActionCode(oobCode);
    } catch (error) {
      console.error('Invalid or expired action code:', error);
      return NextResponse.json(
        { error: 'Invalid or expired magic link' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
    } catch (error) {
      // User doesn't exist, we'll create them after applying the action code
      userRecord = null;
    }

    // Apply the action code to complete email verification/sign-in
    await auth.applyActionCode(oobCode);

    // If user doesn't exist, create them
    if (!userRecord) {
      userRecord = await auth.createUser({
        email,
        emailVerified: true,
      });
    }

    // Verify the school exists
    const schoolDoc = await dbAdmin.collection('schools').doc(schoolId).get();
    
    if (!schoolDoc.exists) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }

    // Check if user document exists in Firestore
    const userDoc = await dbAdmin.collection('users').doc(userRecord.uid).get();
    
    if (!userDoc.exists) {
      // New user - they need to complete onboarding
      const now = new Date() as unknown as Timestamp;
      
      // Create basic user record
      await dbAdmin.collection('users').doc(userRecord.uid).set({
        id: userRecord.uid,
        email,
        schoolId,
        emailVerified: true,
        createdAt: now,
        updatedAt: now,
        // These will be filled during onboarding
        fullName: '',
        handle: '',
        major: '',
        isPublic: false,
      });

      return NextResponse.json({
        success: true,
        isNewUser: true,
        userId: userRecord.uid,
        redirectTo: '/onboarding',
      });
    } else {
      // Existing user - redirect to app
      return NextResponse.json({
        success: true,
        isNewUser: false,
        userId: userRecord.uid,
        redirectTo: '/',
      });
    }

  } catch (error) {
    console.error('Error verifying magic link:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to verify magic link' },
      { status: 500 }
    );
  }
} 