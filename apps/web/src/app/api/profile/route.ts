import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin as db, authAdmin as auth } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';

// GET /api/profile - Get current user's profile or search profiles
export async function GET(request: NextRequest) {
  try {
    // Get auth token from header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;
    
    // Check for search parameters
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const filter = searchParams.get('filter');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // If searching for profiles
    if (search) {
      let query = db.collection('users')
        .where('privacy.profileVisibility', 'in', ['public', 'connections'])
        .limit(Math.min(limit, 50));
      
      // Search by handle or name (Firestore doesn't support full-text search natively)
      // In production, use Algolia or ElasticSearch
      const profiles = await query.get();
      const searchLower = search.toLowerCase();
      
      const results = profiles.docs
        .map(doc => ({
          uid: doc.id,
          ...doc.data()
        }))
        .filter(profile => 
          profile.handle?.toLowerCase().includes(searchLower) ||
          profile.displayName?.toLowerCase().includes(searchLower) ||
          profile.major?.toLowerCase().includes(searchLower)
        )
        .slice(0, limit);
      
      return NextResponse.json({
        profiles: results,
        count: results.length
      });
    }
    
    // Otherwise, get current user's profile
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'Profile not found. Please complete onboarding.' },
        { status: 404 }
      );
    }
    
    const userData = userDoc.data();
    
    // Get additional stats
    const [spacesSnapshot, connectionsSnapshot] = await Promise.all([
      db.collection('spaceMembers')
        .where('userId', '==', userId)
        .get(),
      db.collection('connections')
        .where('user1', '==', userId)
        .where('status', '==', 'connected')
        .get()
    ]);
    
    const connections2Snapshot = await db.collection('connections')
      .where('user2', '==', userId)
      .where('status', '==', 'connected')
      .get();
    
    const totalConnections = connectionsSnapshot.size + connections2Snapshot.size;
    
    return NextResponse.json({
      ...userData,
      uid: userId,
      stats: {
        ...userData?.stats,
        spacesJoined: spacesSnapshot.size,
        connectionsCount: totalConnections
      }
    });
    
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// POST /api/profile - Create a new profile
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;
    const userEmail = decodedToken.email;
    
    // Check if profile already exists
    const existingProfile = await db.collection('users').doc(userId).get();
    if (existingProfile.exists) {
      return NextResponse.json(
        { error: 'Profile already exists' },
        { status: 400 }
      );
    }
    
    // Validate email domain
    if (!userEmail?.endsWith('@buffalo.edu')) {
      return NextResponse.json(
        { error: 'Must use a @buffalo.edu email address' },
        { status: 400 }
      );
    }
    
    const profileData = await request.json();
    
    // Validate required fields
    if (!profileData.handle || !profileData.displayName) {
      return NextResponse.json(
        { error: 'Handle and display name are required' },
        { status: 400 }
      );
    }
    
    // Check if handle is available
    const handleQuery = await db
      .collection('users')
      .where('handle', '==', profileData.handle)
      .get();
    
    if (!handleQuery.empty) {
      return NextResponse.json(
        { error: 'Handle already taken' },
        { status: 400 }
      );
    }
    
    // Validate handle format
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(profileData.handle)) {
      return NextResponse.json(
        { error: 'Invalid handle format. Use 3-20 alphanumeric characters or underscores.' },
        { status: 400 }
      );
    }
    
    // Create profile document
    const newProfile = {
      uid: userId,
      email: userEmail,
      handle: profileData.handle,
      displayName: profileData.displayName,
      bio: profileData.bio || '',
      major: profileData.major || '',
      graduationYear: profileData.graduationYear || null,
      year: profileData.year || null,
      interests: profileData.interests || [],
      skills: profileData.skills || [],
      campusId: 'ub-buffalo',
      housing: profileData.housing || '',
      photoURL: profileData.photoURL || null,
      avatarStyle: profileData.avatarStyle || {
        backgroundColor: '#6B46C1',
        textColor: '#FFFFFF'
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showActivity: true,
        allowMessages: 'connections'
      },
      isBuilder: false,
      isVerified: false,
      onboardingCompleted: true,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      lastActive: admin.firestore.Timestamp.now(),
      stats: {
        spacesJoined: 0,
        spacesCreated: 0,
        toolsBuilt: 0,
        connectionsCount: 0,
        resourcesShared: 0,
        studyGroupsJoined: 0
      }
    };
    
    // Save to Firestore
    await db.collection('users').doc(userId).set(newProfile);
    
    // Update metadata
    await db.collection('metadata').doc('collections').update({
      'users.count': admin.firestore.FieldValue.increment(1),
      'users.lastUpdated': admin.firestore.Timestamp.now()
    });
    
    return NextResponse.json({
      message: 'Profile created successfully',
      profile: newProfile
    });
    
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}

// PUT /api/profile - Update current user's profile
export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;
    
    const updates = await request.json();
    
    // Fields that cannot be updated
    const protectedFields = ['uid', 'email', 'createdAt', 'isVerified'];
    protectedFields.forEach(field => delete updates[field]);
    
    // Validate handle if being updated
    if (updates.handle) {
      // Check if handle is already taken
      const handleQuery = await db
        .collection('users')
        .where('handle', '==', updates.handle)
        .get();
      
      if (!handleQuery.empty && handleQuery.docs[0].id !== userId) {
        return NextResponse.json(
          { error: 'Handle already taken' },
          { status: 400 }
        );
      }
      
      // Validate handle format
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(updates.handle)) {
        return NextResponse.json(
          { error: 'Invalid handle format' },
          { status: 400 }
        );
      }
    }
    
    // Add updated timestamp
    updates.updatedAt = admin.firestore.Timestamp.now();
    updates.lastActive = admin.firestore.Timestamp.now();
    
    // Update the profile
    await db.collection('users').doc(userId).update(updates);
    
    // Fetch and return updated profile
    const updatedDoc = await db.collection('users').doc(userId).get();
    const updatedData = updatedDoc.data();
    
    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: {
        ...updatedData,
        uid: userId
      }
    });
    
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}