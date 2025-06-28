import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK with production credentials
const serviceAccount = require('./service-account-prod.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'hive-9265c'
});

const db = admin.firestore();

async function addTestData() {
  console.log('🎯 Adding test data to make collections visible in Firebase Console...\n');
  
  try {
    // Add test data to creation_tools
    await db.collection('creation_tools').doc('test-tool-1').set({
      name: 'Test Creation Tool',
      category: 'productivity',
      description: 'A test tool for the creation engine',
      createdBy: 'system',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      popularity: 0,
      isActive: true
    });
    console.log('✅ Added test data to creation_tools');

    // Add test data to platform_analytics
    await db.collection('platform_analytics').doc('test-analytics-1').set({
      type: 'daily_metrics',
      date: admin.firestore.FieldValue.serverTimestamp(),
      totalUsers: 3,
      activeUsers: 2,
      totalSpaces: 5,
      totalPosts: 0,
      engagementRate: 0.75
    });
    console.log('✅ Added test data to platform_analytics');

    // Add test data to content_reports
    await db.collection('content_reports').doc('test-report-1').set({
      contentType: 'post',
      contentId: 'test-post-123',
      reportedBy: 'test-user',
      reason: 'inappropriate_content',
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      description: 'Test report for system validation'
    });
    console.log('✅ Added test data to content_reports');

    // Add test notification to first user
    const usersSnapshot = await db.collection('users').limit(1).get();
    if (!usersSnapshot.empty) {
      const firstUser = usersSnapshot.docs[0];
      await firstUser.ref.collection('notifications').doc('test-notification-1').set({
        type: 'system',
        title: 'Welcome to HIVE!',
        message: 'Your comprehensive structure is now active.',
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        userId: firstUser.id
      });
      console.log(`✅ Added test notification to user ${firstUser.id}`);
    }

    // Add test tool to first space
    const spacesSnapshot = await db.collection('spaces').limit(1).get();
    if (!spacesSnapshot.empty) {
      const firstSpace = spacesSnapshot.docs[0];
      await firstSpace.ref.collection('tools').doc('test-space-tool-1').set({
        name: 'Space Management Tool',
        category: 'management',
        description: 'A tool for managing space activities',
        createdBy: 'system',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        spaceId: firstSpace.id,
        isActive: true
      });
      console.log(`✅ Added test tool to space ${firstSpace.id}`);

      // Add test analytics to first space
      await firstSpace.ref.collection('analytics').doc('test-space-analytics-1').set({
        type: 'daily_metrics',
        date: admin.firestore.FieldValue.serverTimestamp(),
        memberCount: 10,
        postsCount: 5,
        engagementScore: 8.5,
        spaceId: firstSpace.id
      });
      console.log(`✅ Added test analytics to space ${firstSpace.id}`);
    }

    console.log('\n🎉 Test data added successfully!');
    console.log('🔍 Now check the Firebase Console - you should see:');
    console.log('   - creation_tools collection with 1 document');
    console.log('   - platform_analytics collection with 1 document');
    console.log('   - content_reports collection with 1 document');
    console.log('   - User subcollections with notifications');
    console.log('   - Space subcollections with tools and analytics');
    
  } catch (error) {
    console.error('❌ Error adding test data:', error);
  }
}

addTestData().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
}); 