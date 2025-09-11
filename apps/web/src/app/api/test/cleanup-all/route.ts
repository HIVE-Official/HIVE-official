import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminFirestore } from '@/lib/firebase-admin';

export async function DELETE(request: NextRequest) {
  // Only allow in development/test environments
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    let deletedCount = 0;
    const errors = [];

    // Clean up test users from Firestore
    const testUsersQuery = await adminFirestore
      .collection('users')
      .where('isTestUser', '==', true)
      .get();

    const batch = adminFirestore.batch();
    const userUids = [];

    for (const doc of testUsersQuery.docs) {
      const userData = doc.data();
      userUids.push(doc.id);
      
      // Delete user document
      batch.delete(doc.ref);
      
      // Clean up user's posts
      const postsQuery = await adminFirestore
        .collection('posts')
        .where('authorId', '==', doc.id)
        .get();
      
      postsQuery.docs.forEach((postDoc: any) => {
        batch.delete(postDoc.ref);
      });
    }

    // Remove test users from spaces
    const spacesQuery = await adminFirestore.collection('spaces').get();
    
    for (const spaceDoc of spacesQuery.docs) {
      const spaceData = spaceDoc.data();
      let needsUpdate = false;
      
      let updatedMemberIds = spaceData.memberIds || [];
      let updatedLeaderIds = spaceData.leaderIds || [];
      
      // Remove test users from member and leader arrays
      for (const uid of userUids) {
        if (updatedMemberIds.includes(uid)) {
          updatedMemberIds = updatedMemberIds.filter((id: string) => id !== uid);
          needsUpdate = true;
        }
        if (updatedLeaderIds.includes(uid)) {
          updatedLeaderIds = updatedLeaderIds.filter((id: string) => id !== uid);
          needsUpdate = true;
        }
      }
      
      if (needsUpdate) {
        batch.update(spaceDoc.ref, {
          memberIds: updatedMemberIds,
          leaderIds: updatedLeaderIds,
          memberCount: updatedMemberIds.length,
          updatedAt: new Date(),
        });
      }
    }

    // Clean up test spaces
    const testSpacesQuery = await adminFirestore
      .collection('spaces')
      .where('isTestSpace', '==', true)
      .get();
    
    testSpacesQuery.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    deletedCount += testUsersQuery.docs.length + testSpacesQuery.docs.length;

    // Clean up test users from Firebase Auth
    for (const uid of userUids) {
      try {
        await adminAuth.deleteUser(uid);
        deletedCount++;
      } catch (error: any) {
        if (error.code !== 'auth/user-not-found') {
          errors.push(`Failed to delete user ${uid} from Auth: ${error.message}`);
        }
      }
    }

    // Clean up old test data (older than 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const oldTestDataQuery = await adminFirestore
      .collection('users')
      .where('createdAt', '<', oneDayAgo)
      .get();
    
    const oldDataBatch = adminFirestore.batch();
    
    for (const doc of oldTestDataQuery.docs) {
      const userData = doc.data();
      // Only delete if it looks like test data (email contains 'test' or created programmatically)
      if (userData.email?.includes('test') || userData.isTestUser) {
        oldDataBatch.delete(doc.ref);
        
        try {
          await adminAuth.deleteUser(doc.id);
        } catch (error: any) {
          if (error.code !== 'auth/user-not-found') {
            errors.push(`Failed to delete old user ${doc.id}: ${error.message}`);
          }
        }
      }
    }

    await oldDataBatch.commit();

    return NextResponse.json({ 
      success: true, 
      deletedCount,
      errors: errors.length > 0 ? errors : undefined,
      message: `Cleaned up ${deletedCount} test records`
    });

  } catch (error: any) {
    console.error('Error during global cleanup:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup test data', details: error.message },
      { status: 500 }
    );
  }
}