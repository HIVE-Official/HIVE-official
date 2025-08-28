import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminFirestore } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  // Only allow in development/test environments
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    const userData = await request.json();
    
    // Create user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      uid: userData.uid,
      email: userData.email,
      emailVerified: true,
      displayName: `${userData.firstName} ${userData.lastName}`,
      disabled: false,
    });

    // Create user document in Firestore
    const userDoc = {
      uid: userRecord.uid,
      email: userData.email,
      firstName: userData.firstName || 'Test',
      lastName: userData.lastName || 'User',
      handle: userData.handle || `testuser${Date.now()}`,
      isOnboarded: userData.isOnboarded || false,
      userType: userData.userType || 'student',
      year: userData.year,
      school: userData.school,
      major: userData.major,
      department: userData.department,
      interests: userData.interests || [],
      campusId: 'ub-buffalo',
      isTestUser: true, // Mark as test user for easy cleanup
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await adminFirestore.collection('users').doc(userRecord.uid).set(userDoc);

    return NextResponse.json({ 
      success: true, 
      user: { ...userDoc, uid: userRecord.uid } 
    });

  } catch (error: any) {
    console.error('Error creating test user:', error);
    return NextResponse.json(
      { error: 'Failed to create test user', details: error.message },
      { status: 500 }
    );
  }
}