import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { 
  collection, 
  doc, 
  getDoc, 
  writeBatch, 
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAuth } from 'firebase-admin/auth';
import { type Space } from '@hive/core/src/domain/firestore/space';
import { type Member } from '@hive/core/src/domain/firestore/member';

const joinSpaceSchema = z.object({
  spaceId: z.string().min(1, 'Space ID is required'),
});

/**
 * Join a space manually
 * POST /api/spaces/join
 */
export async function POST(request: NextRequest) {
  try {
    // Get the authorization header and verify the user
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const idToken = authHeader.split('Bearer ')[1];
    const auth = getAuth();
    
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;

    // Parse and validate request body
    const body = await request.json();
    const { spaceId } = joinSpaceSchema.parse(body);

    // Check if space exists and is joinable
    const spaceDocRef = doc(db, 'spaces', spaceId);
    const spaceDoc = await getDoc(spaceDocRef);
    
    if (!spaceDoc.exists()) {
      return NextResponse.json(
        { error: 'Space not found' },
        { status: 404 }
      );
    }

    const space = spaceDoc.data() as Space;
    
    // Check if space is in a joinable status
    if (space.status === 'frozen') {
      return NextResponse.json(
        { error: 'This space is currently frozen and not accepting new members' },
        { status: 403 }
      );
    }

    if (space.status === 'dormant') {
      return NextResponse.json(
        { error: 'This space is not yet active' },
        { status: 403 }
      );
    }

    // Check if user is already a member
    const memberDocRef = doc(db, 'spaces', spaceId, 'members', userId);
    const memberDoc = await getDoc(memberDocRef);
    
    if (memberDoc.exists()) {
      return NextResponse.json(
        { error: 'You are already a member of this space' },
        { status: 409 }
      );
    }

    // Get user data to verify they're from the same school
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    
    // Verify user is from the same school as the space
    if (userData.schoolId !== space.schoolId) {
      return NextResponse.json(
        { error: 'You can only join spaces from your school' },
        { status: 403 }
      );
    }

    // Perform the join operation atomically
    const batch = writeBatch(db);

    // Add user to members sub-collection
    const newMember: Omit<Member, 'uid'> = {
      uid: userId,
      role: 'member',
      joinedAt: serverTimestamp(),
    };

    batch.set(memberDocRef, newMember);

    // Increment the space's member count
    batch.update(spaceDocRef, {
      memberCount: increment(1),
      updatedAt: serverTimestamp(),
    });

    // Execute the transaction
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the space',
      space: {
        id: spaceId,
        name: space.name,
        type: space.type,
      },
    });

  } catch (error) {
    console.error('Error joining space:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to join space' },
      { status: 500 }
    );
  }
} 