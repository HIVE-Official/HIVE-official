import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminFirestore } from '@/lib/firebase-admin';

export async function DELETE(request: NextRequest) {
  // Only allow in development/test environments
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    const { uid, email } = await request.json();

    if (!uid && !email) {
      return NextResponse.json({ error: 'UID or email required' }, { status: 400 });
    }

    let userToDelete = uid;

    // If only email provided, get user by email
    if (!uid && email) {
      try {
        const userRecord = await adminAuth.getUserByEmail(email);
        userToDelete = userRecord.uid;
      } catch (error) {
        // User might not exist, that's ok for cleanup
        console.warn('User not found for cleanup:', email);
        return NextResponse.json({ success: true, message: 'User not found, nothing to clean' });
      }
    }

    // Delete user from Firebase Auth
    try {
      await adminAuth.deleteUser(userToDelete);
    } catch (error: any) {
      if (error.code !== 'auth/user-not-found') {
        console.error('Error deleting user from Auth:', error);
      }
    }

    // Delete user document from Firestore
    try {
      await adminFirestore.collection('users').doc(userToDelete).delete();
    } catch (error) {
      console.error('Error deleting user document:', error);
    }

    // Clean up related data (spaces they created, posts, etc.)
    const batch = adminFirestore.batch();
    
    // Delete user's posts
    const postsQuery = await adminFirestore
      .collection('posts')
      .where('authorId', '==', userToDelete)
      .get();
    
    postsQuery.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Remove user from space memberships
    const spacesQuery = await adminFirestore
      .collection('spaces')
      .where('memberIds', 'array-contains', userToDelete)
      .get();
    
    spacesQuery.docs.forEach((doc) => {
      const spaceData = doc.data();
      const updatedMemberIds = (spaceData.memberIds || []).filter((id: string) => id !== userToDelete);
      const updatedLeaderIds = (spaceData.leaderIds || []).filter((id: string) => id !== userToDelete);
      
      batch.update(doc.ref, {
        memberIds: updatedMemberIds,
        leaderIds: updatedLeaderIds,
        memberCount: updatedMemberIds.length,
        updatedAt: new Date(),
      });
    });

    await batch.commit();

    return NextResponse.json({ success: true, deletedUid: userToDelete });

  } catch (error: any) {
    console.error('Error during user cleanup:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup user', details: error.message },
      { status: 500 }
    );
  }
}