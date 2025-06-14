import { NextRequest, NextResponse } from 'next/server';
import { type User } from '@hive/core/src/domain/firestore/user';
import { type Space, type SpaceType } from '@hive/core/src/domain/firestore/space';
import { UB_MAJORS } from '@hive/core/src/constants/majors';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  writeBatch, 
  serverTimestamp,
  limit,
  increment
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Auto-join a user to relevant spaces (major and residential).
 * Creates spaces if they don't exist.
 * POST /api/spaces/auto-join
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
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
    
    if (!user.major || !user.schoolId) {
      return NextResponse.json(
        { error: 'User missing required fields (major, schoolId)' },
        { status: 400 }
      );
    }

    // Find if the user's major exists in our UB_MAJORS list
    const majorData = UB_MAJORS.find(m => m.name === user.major);

    const batch = writeBatch(db);
    const spacesJoined: string[] = [];

    // 1. Handle Major Space
    const majorSpacesQuery = query(
      collection(db, 'spaces'),
      where('type', '==', 'major'),
      where('tags', 'array-contains', { type: 'major', sub_type: user.major }),
      limit(1)
    );

    const majorSpacesSnapshot = await getDocs(majorSpacesQuery);
    
    let majorSpaceId: string;
    if (majorSpacesSnapshot.empty) {
      // Create the major space if it doesn't exist
      const spaceName = majorData ? `${majorData.name} Majors` : `${user.major} Majors`;
      majorSpaceId = doc(collection(db, 'spaces')).id;
      
      const newMajorSpace: Omit<Space, 'id'> = {
        name: spaceName,
        name_lowercase: spaceName.toLowerCase(),
        description: `Connect with fellow ${user.major} students, share resources, and collaborate on projects.`,
        memberCount: 0,
        schoolId: user.schoolId,
        type: 'major',
        tags: [{
          type: 'major',
          sub_type: user.major,
        }],
        status: 'activated',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const majorSpaceRef = doc(db, 'spaces', majorSpaceId);
      batch.set(majorSpaceRef, newMajorSpace);
    } else {
      majorSpaceId = majorSpacesSnapshot.docs[0].id;
    }

    // Add user to major space
    const majorMemberRef = doc(db, 'spaces', majorSpaceId, 'members', userId);
    batch.set(majorMemberRef, {
      uid: userId,
      role: 'member',
      joinedAt: serverTimestamp(),
    });

    // Update major space member count
    const majorSpaceRef = doc(db, 'spaces', majorSpaceId);
    batch.update(majorSpaceRef, {
      memberCount: increment(1),
      updatedAt: serverTimestamp(),
    });

    spacesJoined.push(majorSpaceId);

    // 2. Handle General Residential Space
    const residentialSpacesQuery = query(
      collection(db, 'spaces'),
      where('type', '==', 'residential'),
      where('tags', 'array-contains', { type: 'residential', sub_type: 'general' }),
      limit(1)
    );

    const residentialSpacesSnapshot = await getDocs(residentialSpacesQuery);
    
    let residentialSpaceId: string;
    if (residentialSpacesSnapshot.empty) {
      // Create a general residential space if it doesn't exist
      residentialSpaceId = doc(collection(db, 'spaces')).id;
      
      const newResidentialSpace: Omit<Space, 'id'> = {
        name: 'UB Community',
        name_lowercase: 'ub community',
        description: 'A general community space for all UB students to connect, share experiences, and build friendships.',
        memberCount: 0,
        schoolId: user.schoolId,
        type: 'residential',
        tags: [{
          type: 'residential',
          sub_type: 'general',
        }],
        status: 'activated',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const residentialSpaceRef = doc(db, 'spaces', residentialSpaceId);
      batch.set(residentialSpaceRef, newResidentialSpace);
    } else {
      residentialSpaceId = residentialSpacesSnapshot.docs[0].id;
    }

    // Add user to residential space
    const residentialMemberRef = doc(db, 'spaces', residentialSpaceId, 'members', userId);
    batch.set(residentialMemberRef, {
      uid: userId,
      role: 'member',
      joinedAt: serverTimestamp(),
    });

    // Update residential space member count
    const residentialSpaceRef = doc(db, 'spaces', residentialSpaceId);
    batch.update(residentialSpaceRef, {
      memberCount: increment(1),
      updatedAt: serverTimestamp(),
    });

    spacesJoined.push(residentialSpaceId);

    // Execute all operations atomically
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: `Successfully auto-joined user to ${spacesJoined.length} spaces`,
      spacesJoined,
    });

  } catch (error) {
    console.error('Auto-join error:', error);
    return NextResponse.json(
      { error: 'Failed to auto-join user to spaces' },
      { status: 500 }
    );
  }
} 