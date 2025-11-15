// Firebase Admin SDK script to fix missing profile fields
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

async function fixMissingProfileFields() {
  console.log('🔧 Starting profile field fix process...');
  
  // Track stats
  let totalProfiles = 0;
  let profilesUpdated = 0;
  const missingFieldCounts = {};
  
  // Default values for missing fields
  const defaultValues = {
    displayName: 'HIVE User',
    username: '',  // Special handling for username below
    profileImageUrl: 'https://firebasestorage.googleapis.com/v0/b/hive-social-app.appspot.com/o/default_profile.png',
    bio: '',
    location: '',
    website: '',
    interests: [],
    following: [],
    followers: [],
    createdAt: admin.firestore.Timestamp.now(),
    notificationSettings: {
      events: true,
      messages: true,
      follows: true,
      mentions: true
    }
  };
  
  try {
    // Get all users
    const usersSnapshot = await firestore.collection('users').get();
    totalProfiles = usersSnapshot.size;
    
    console.log(`📊 Processing ${totalProfiles} user profiles...`);
    
    // Process each user document
    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const userData = userDoc.data();
      
      console.log(`👤 Checking user: ${userId}`);
      
      let needsUpdate = false;
      const updates = {};
      
      // Special handling for username - use userId as default if missing
      if (!userData.username || userData.username === '') {
        updates.username = `user_${userId}`.substring(0, 15);  // Ensure username isn't too long
        missingFieldCounts['username'] = (missingFieldCounts['username'] || 0) + 1;
        needsUpdate = true;
        console.log(`  - Adding missing username: ${updates.username}`);
      }
      
      // Check and add all other missing fields
      Object.entries(defaultValues).forEach(([field, defaultValue]) => {
        if (field !== 'username' && (!userData[field] || userData[field] === null)) {
          updates[field] = defaultValue;
          missingFieldCounts[field] = (missingFieldCounts[field] || 0) + 1;
          needsUpdate = true;
          console.log(`  - Adding missing field: ${field}`);
        }
      });
      
      // Update document if needed
      if (needsUpdate) {
        try {
          await firestore.collection('users').doc(userId).update(updates);
          profilesUpdated++;
          console.log(`  ✅ Updated profile for user: ${userId}`);
        } catch (e) {
          console.log(`  ❌ Error updating profile for user ${userId}: ${e}`);
        }
      } else {
        console.log(`  ✓ Profile has all required fields`);
      }
    }
    
    // Check for duplicate usernames and fix if found
    console.log('\n🔍 Checking for duplicate usernames...');
    const usernameToUserIds = {};
    
    // Get all users again after updates
    const updatedUsersSnapshot = await firestore.collection('users').get();
    
    // Build username to userId mapping
    for (const userDoc of updatedUsersSnapshot.docs) {
      const userId = userDoc.id;
      const userData = userDoc.data();
      
      if (userData.username) {
        const username = userData.username;
        
        usernameToUserIds[username] = usernameToUserIds[username] || [];
        usernameToUserIds[username].push(userId);
      }
    }
    
    // Fix duplicate usernames
    let duplicateUsernamesFixed = 0;
    
    for (const [username, userIds] of Object.entries(usernameToUserIds)) {
      if (userIds.length > 1) {
        console.log(`  ⚠️ Found duplicate username: ${username} used by ${userIds.length} users`);
        
        // Update all but the first user with the duplicate username
        for (let i = 1; i < userIds.length; i++) {
          const userId = userIds[i];
          const newUsername = `${username}_${i}`;
          
          try {
            await firestore.collection('users').doc(userId).update({
              username: newUsername
            });
            
            duplicateUsernamesFixed++;
            console.log(`  ✅ Changed username for user ${userId} from ${username} to ${newUsername}`);
          } catch (e) {
            console.log(`  ❌ Error updating username for user ${userId}: ${e}`);
          }
        }
      }
    }
    
    // Print summary
    console.log('\n📊 Summary:');
    console.log(`  - Total profiles processed: ${totalProfiles}`);
    console.log(`  - Profiles updated: ${profilesUpdated}`);
    console.log(`  - Duplicate usernames fixed: ${duplicateUsernamesFixed}`);
    console.log('\n  Missing field counts:');
    Object.entries(missingFieldCounts).forEach(([field, count]) => {
      console.log(`    - ${field}: ${count}`);
    });
    
  } catch (e) {
    console.log(`❌ Error fixing missing profile fields: ${e}`);
  } finally {
    // End the Firebase app
    admin.app().delete();
  }
}

// Run the function
fixMissingProfileFields(); 