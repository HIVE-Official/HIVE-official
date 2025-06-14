import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@hive/core/src/firebase-admin';

const lookupUserSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  searchType: z.enum(['email', 'handle', 'auto'], {
    errorMap: () => ({ message: 'Search type must be email, handle, or auto' })
  }).default('auto')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, searchType } = lookupUserSchema.parse(body);

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

    let userDoc = null;
    let authUser = null;
    let searchMethod = '';

    // Auto-detect search type if not specified
    const isEmail = query.includes('@');
    const effectiveSearchType = searchType === 'auto' 
      ? (isEmail ? 'email' : 'handle') 
      : searchType;

    try {
      if (effectiveSearchType === 'email') {
        // Look up by email
        try {
          authUser = await auth.getUserByEmail(query);
          userDoc = await dbAdmin.collection('users').doc(authUser.uid).get();
          searchMethod = 'email';
        } catch (error: any) {
          if (error.code !== 'auth/user-not-found') {
            throw error;
          }
        }
      } else {
        // Look up by handle
        const handleDoc = await dbAdmin.collection('handles').doc(query.toLowerCase()).get();
        
        if (handleDoc.exists) {
          const handleData = handleDoc.data();
          userDoc = await dbAdmin.collection('users').doc(handleData!.userId).get();
          
          if (userDoc.exists) {
            authUser = await auth.getUser(handleData!.userId);
            searchMethod = 'handle';
          }
        }
      }

      if (!userDoc || !userDoc.exists || !authUser) {
        return NextResponse.json(
          { 
            found: false, 
            message: `No user found with ${effectiveSearchType}: ${query}` 
          },
          { status: 404 }
        );
      }

      const userData = userDoc.data();
      
      // Get user's spaces
      const spacesQuery = await dbAdmin
        .collectionGroup('members')
        .where('userId', '==', authUser.uid)
        .get();
      
      const userSpaces = [];
      for (const memberDoc of spacesQuery.docs) {
        const spaceId = memberDoc.ref.parent.parent!.id;
        const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();
        
        if (spaceDoc.exists) {
          userSpaces.push({
            id: spaceId,
            name: spaceDoc.data()!.name,
            role: memberDoc.data().role
          });
        }
      }

      // Get waitlist entries
      const waitlistQuery = await dbAdmin
        .collectionGroup('waitlist_entries')
        .where('email', '==', authUser.email)
        .get();
      
      const waitlistEntries = waitlistQuery.docs.map(doc => ({
        schoolId: doc.ref.parent.parent!.id,
        email: doc.data().email,
        joinedAt: doc.data().joinedAt
      }));

      return NextResponse.json({
        found: true,
        searchMethod,
        user: {
          // Auth data
          uid: authUser.uid,
          email: authUser.email,
          emailVerified: authUser.emailVerified,
          disabled: authUser.disabled,
          customClaims: authUser.customClaims || {},
          creationTime: authUser.metadata.creationTime,
          lastSignInTime: authUser.metadata.lastSignInTime,
          
          // Firestore data
          ...userData,
          
          // Related data
          spaces: userSpaces,
          waitlistEntries
        }
      });

    } catch (error) {
      console.error('User lookup error:', error);
      return NextResponse.json(
        { error: 'Error looking up user' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Lookup user error:', error);

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