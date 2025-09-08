import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin as db, authAdmin as auth } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';

// GET /api/profile/[userId] - Get a user's profile
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    
    // Get auth token from header
    const authHeader = request.headers.get('Authorization');
    let requesterId: string | null = null;
    
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.split('Bearer ')[1];
        const decodedToken = await auth.verifyIdToken(token);
        requesterId = decodedToken.uid;
      } catch (error) {
        console.warn('Invalid auth token:', error);
      }
    }
    
    // Special handling for 'me' endpoint
    if (userId === 'me') {
      if (!requesterId) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      // Redirect to the user's own profile
      const userDoc = await db.collection('users').doc(requesterId).get();
      if (!userDoc.exists) {
        return NextResponse.json(
          { error: 'Profile not found' },
          { status: 404 }
        );
      }
      
      const userData = userDoc.data();
      return NextResponse.json({
        ...userData,
        uid: requesterId,
        isOwnProfile: true
      });
    }
    
    // Get the requested user's profile
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const userData = userDoc.data();
    const isOwnProfile = requesterId === userId;
    
    // Check privacy settings
    if (!isOwnProfile && userData?.privacy) {
      const { profileVisibility } = userData.privacy;
      
      if (profileVisibility === 'private') {
        return NextResponse.json(
          { error: 'This profile is private' },
          { status: 403 }
        );
      }
      
      if (profileVisibility === 'connections' && requesterId) {
        // Check if they're connected
        const connectionId1 = `${requesterId}_${userId}`;
        const connectionId2 = `${userId}_${requesterId}`;
        
        const [conn1, conn2] = await Promise.all([
          db.collection('connections').doc(connectionId1).get(),
          db.collection('connections').doc(connectionId2).get()
        ]);
        
        const isConnected = (conn1.exists || conn2.exists) && 
          (conn1.data()?.status === 'connected' || conn2.data()?.status === 'connected');
        
        if (!isConnected) {
          // Return limited profile for non-connections
          return NextResponse.json({
            uid: userId,
            displayName: userData.displayName,
            handle: userData.handle,
            bio: userData.bio,
            major: userData.major,
            year: userData.year,
            avatarStyle: userData.avatarStyle,
            isBuilder: userData.isBuilder,
            isVerified: userData.isVerified,
            stats: {
              spacesJoined: userData.stats?.spacesJoined || 0,
              connectionsCount: userData.stats?.connectionsCount || 0
            },
            isLimitedView: true
          });
        }
      }
    }
    
    // Track profile view (if not own profile)
    if (!isOwnProfile && requesterId) {
      const viewDoc = {
        viewerId: requesterId,
        viewedAt: admin.firestore.Timestamp.now()
      };
      
      // Store in subcollection for the viewed user
      await db
        .collection('users')
        .doc(userId)
        .collection('views')
        .doc(`${requesterId}_${Date.now()}`)
        .set(viewDoc);
    }
    
    // Return full profile (with appropriate filtering)
    const profileData = {
      ...userData,
      uid: userId,
      isOwnProfile,
      // Remove sensitive data if not own profile
      ...(isOwnProfile ? {} : {
        email: userData.privacy?.showEmail ? userData.email : undefined,
        lastActive: undefined
      })
    };
    
    return NextResponse.json(profileData);
    
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PUT /api/profile/[userId] - Update a user's profile
export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    
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
    
    // Only allow users to update their own profile
    if (decodedToken.uid !== userId && userId !== 'me') {
      return NextResponse.json(
        { error: 'You can only update your own profile' },
        { status: 403 }
      );
    }
    
    const actualUserId = userId === 'me' ? decodedToken.uid : userId;
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
      
      if (!handleQuery.empty && handleQuery.docs[0].id !== actualUserId) {
        return NextResponse.json(
          { error: 'Handle already taken' },
          { status: 400 }
        );
      }
      
      // Validate handle format
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(updates.handle)) {
        return NextResponse.json(
          { error: 'Invalid handle format. Use 3-20 alphanumeric characters or underscores.' },
          { status: 400 }
        );
      }
    }
    
    // Add updated timestamp
    updates.updatedAt = admin.firestore.Timestamp.now();
    
    // Update the profile
    await db.collection('users').doc(actualUserId).update(updates);
    
    // Fetch and return updated profile
    const updatedDoc = await db.collection('users').doc(actualUserId).get();
    const updatedData = updatedDoc.data();
    
    return NextResponse.json({
      ...updatedData,
      uid: actualUserId,
      message: 'Profile updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// DELETE /api/profile/[userId] - Delete a user's profile
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    
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
    
    // Only allow users to delete their own profile
    if (decodedToken.uid !== userId) {
      return NextResponse.json(
        { error: 'You can only delete your own profile' },
        { status: 403 }
      );
    }
    
    // Delete user data (consider soft delete in production)
    const batch = db.batch();
    
    // Delete profile
    batch.delete(db.collection('users').doc(userId));
    
    // Delete connections
    const connections = await db
      .collection('connections')
      .where('user1', '==', userId)
      .get();
    
    const connections2 = await db
      .collection('connections')
      .where('user2', '==', userId)
      .get();
    
    [...connections.docs, ...connections2.docs].forEach(doc => {
      batch.delete(doc.ref);
    });
    
    // Commit batch delete
    await batch.commit();
    
    // Delete auth user
    try {
      await auth.deleteUser(userId);
    } catch (authError) {
      console.warn('Could not delete auth user:', authError);
    }
    
    return NextResponse.json({
      message: 'Profile deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting profile:', error);
    return NextResponse.json(
      { error: 'Failed to delete profile' },
      { status: 500 }
    );
  }
}