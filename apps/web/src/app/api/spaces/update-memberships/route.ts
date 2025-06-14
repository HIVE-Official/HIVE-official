import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  writeBatch, 
  serverTimestamp,
  increment,
  limit
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAuth } from 'firebase-admin/auth';
import { type User } from '@hive/core/src/domain/firestore/user';
import { type Space } from '@hive/core/src/domain/firestore/space';
import { UB_MAJORS } from '@hive/core/src/constants/majors';

const updateMembershipsSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  previousMajor: z.string().optional(),
  newMajor: z.string().optional(),
  previousResidential: z.string().optional(),
  newResidential: z.string().optional(),
});

/**
 * Update space memberships when user changes major or residential info
 * POST /api/spaces/update-memberships
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

    const requestingUserId = decodedToken.uid;

    // Parse and validate request body
    const body = await request.json();
    const { userId, previousMajor, newMajor, previousResidential, newResidential } = updateMembershipsSchema.parse(body);

    // Verify the requesting user is updating their own profile or is an admin
    if (requestingUserId !== userId) {
      // TODO: Add admin check when admin system is implemented
      return NextResponse.json(
        { error: 'You can only update your own memberships' },
        { status: 403 }
      );
    }

    // Get user data
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const user = userDoc.data() as User;

    if (!user.schoolId) {
      return NextResponse.json(
        { error: 'User missing school ID' },
        { status: 400 }
      );
    }

    const batch = writeBatch(db);
    const changes: string[] = [];

    // Handle major change
    if (previousMajor && newMajor && previousMajor !== newMajor) {
      // Leave old major space
      const oldMajorSpacesQuery = query(
        collection(db, 'spaces'),
        where('type', '==', 'major'),
        where('tags', 'array-contains', { type: 'major', sub_type: previousMajor }),
        limit(1)
      );

      const oldMajorSpacesSnapshot = await getDocs(oldMajorSpacesQuery);
      
      if (!oldMajorSpacesSnapshot.empty) {
        const oldSpaceId = oldMajorSpacesSnapshot.docs[0].id;
        const oldMemberRef = doc(db, 'spaces', oldSpaceId, 'members', userId);
        const oldSpaceRef = doc(db, 'spaces', oldSpaceId);
        
        // Check if user is actually a member before removing
        const oldMemberDoc = await getDoc(oldMemberRef);
        if (oldMemberDoc.exists()) {
          batch.delete(oldMemberRef);
          batch.update(oldSpaceRef, {
            memberCount: increment(-1),
            updatedAt: serverTimestamp(),
          });
          changes.push(`Left ${previousMajor} space`);
        }
      }

      // Join new major space (create if needed)
      const majorData = UB_MAJORS.find(m => m.name === newMajor);
      
      const newMajorSpacesQuery = query(
        collection(db, 'spaces'),
        where('type', '==', 'major'),
        where('tags', 'array-contains', { type: 'major', sub_type: newMajor }),
        limit(1)
      );

      const newMajorSpacesSnapshot = await getDocs(newMajorSpacesQuery);
      
      let newMajorSpaceId: string;
      if (newMajorSpacesSnapshot.empty) {
        // Create the major space if it doesn't exist
        const spaceName = majorData ? `${majorData.name} Majors` : `${newMajor} Majors`;
        newMajorSpaceId = doc(collection(db, 'spaces')).id;
        
        const newMajorSpace: Omit<Space, 'id'> = {
          name: spaceName,
          name_lowercase: spaceName.toLowerCase(),
          description: `Connect with fellow ${newMajor} students, share resources, and collaborate on projects.`,
          memberCount: 0,
          schoolId: user.schoolId,
          type: 'major',
          tags: [{
            type: 'major',
            sub_type: newMajor,
          }],
          status: 'activated',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        const newMajorSpaceRef = doc(db, 'spaces', newMajorSpaceId);
        batch.set(newMajorSpaceRef, newMajorSpace);
        changes.push(`Created and joined ${newMajor} space`);
      } else {
        newMajorSpaceId = newMajorSpacesSnapshot.docs[0].id;
        changes.push(`Joined ${newMajor} space`);
      }

      // Add user to new major space
      const newMajorMemberRef = doc(db, 'spaces', newMajorSpaceId, 'members', userId);
      batch.set(newMajorMemberRef, {
        uid: userId,
        role: 'member',
        joinedAt: serverTimestamp(),
      });

      // Update new major space member count
      const newMajorSpaceRef = doc(db, 'spaces', newMajorSpaceId);
      batch.update(newMajorSpaceRef, {
        memberCount: increment(1),
        updatedAt: serverTimestamp(),
      });
    }

    // Handle residential change (if implemented in the future)
    if (previousResidential && newResidential && previousResidential !== newResidential) {
      // TODO: Implement residential space changes when residential spaces are more specific
      // For now, all users stay in the general "UB Community" space
      changes.push(`Residential change noted (${previousResidential} → ${newResidential})`);
    }

    if (changes.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No membership changes needed',
        changes: [],
      });
    }

    // Execute all changes atomically
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: 'Space memberships updated successfully',
      changes,
    });

  } catch (error) {
    console.error('Error updating space memberships:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update space memberships' },
      { status: 500 }
    );
  }
} 