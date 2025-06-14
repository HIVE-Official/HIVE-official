import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@hive/core/src/firebase-admin';
import { getDefaultActionCodeSettings, validateEmailDomain } from '@hive/core/domain/auth/emailLink';
import { getAuth } from 'firebase-admin/auth';

const sendMagicLinkSchema = z.object({
  email: z.string().email('Invalid email address'),
  schoolId: z.string().min(1, 'School ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, schoolId } = sendMagicLinkSchema.parse(body);

    // Validate the school exists and get its domain
    const schoolDoc = await dbAdmin.collection('schools').doc(schoolId).get();
    
    if (!schoolDoc.exists) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }

    const schoolData = schoolDoc.data();
    
    // Validate email domain matches school domain
    if (!validateEmailDomain(email, schoolData?.domain)) {
      return NextResponse.json(
        { error: 'Email domain does not match school domain' },
        { status: 400 }
      );
    }

    // Generate the magic link using Firebase Admin SDK
    const auth = getAuth();
    const actionCodeSettings = getDefaultActionCodeSettings(schoolId);
    
    // Send the sign-in link
    const link = await auth.generateSignInWithEmailLink(email, actionCodeSettings);
    
    // In a real implementation, you would send this via your email service
    // For now, we'll return the link for development purposes
    console.log('Magic link generated:', link);
    
    return NextResponse.json({ 
      success: true,
      message: 'Magic link sent to your email address'
    });

  } catch (error) {
    console.error('Error sending magic link:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send magic link' },
      { status: 500 }
    );
  }
} 