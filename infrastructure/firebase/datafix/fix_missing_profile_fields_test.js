// Test script to demonstrate proper null-safety handling for field counts
// This script simulates the profile field fix functionality without Firebase dependencies

// Mock data
const mockUsers = [
  { id: 'user1', data: { displayName: 'User 1', bio: null } },
  { id: 'user2', data: { username: '', location: 'New York' } },
  { id: 'user3', data: { displayName: 'User 3', profileImageUrl: null } },
  { id: 'user4', data: { } },  // Empty profile
  { id: 'user5', data: { username: 'user5', displayName: 'User 5', bio: 'Hello' } }  // Complete profile
];

// Default values for missing fields
const defaultValues = {
  displayName: 'HIVE User',
  username: '',  // Special handling for username below
  profileImageUrl: 'https://example.com/default_profile.png',
  bio: '',
  location: '',
  website: '',
  interests: [],
  following: [],
  followers: []
};

// Start the fix process
console.log('🔧 Starting profile field fix process (TEST)...');

// Track stats
let totalProfiles = mockUsers.length;
let profilesUpdated = 0;
const missingFieldCounts = {};

console.log(`📊 Processing ${totalProfiles} user profiles...`);

// Process each user
for (const user of mockUsers) {
  const userId = user.id;
  const userData = user.data;
  
  console.log(`👤 Checking user: ${userId}`);
  
  let needsUpdate = false;
  const updates = {};
  
  // Special handling for username - use userId as default if missing
  if (!userData.username || userData.username === '') {
    updates.username = `user_${userId}`.substring(0, 15);  // Ensure username isn't too long
    missingFieldCounts['username'] = (missingFieldCounts['username'] || 0) + 1;  // Proper null-safety handling
    needsUpdate = true;
    console.log(`  - Adding missing username: ${updates.username}`);
  }
  
  // Check and add all other missing fields
  Object.entries(defaultValues).forEach(([field, defaultValue]) => {
    if (field !== 'username' && (!userData[field] || userData[field] === null)) {
      updates[field] = defaultValue;
      missingFieldCounts[field] = (missingFieldCounts[field] || 0) + 1;  // Proper null-safety handling
      needsUpdate = true;
      console.log(`  - Adding missing field: ${field}`);
    }
  });
  
  // Simulate update
  if (needsUpdate) {
    // In real code, we would update the document in Firestore here
    profilesUpdated++;
    console.log(`  ✅ Would update profile for user: ${userId}`);
    console.log(`  Fields to update: ${Object.keys(updates).join(', ')}`);
  } else {
    console.log(`  ✓ Profile has all required fields`);
  }
}

// Check for duplicate usernames (simplified)
console.log('\n🔍 Checking for duplicate usernames...');
const usernameToUserIds = {};

// Build username to userId mapping
mockUsers.forEach(user => {
  if (user.data.username) {
    const username = user.data.username;
    usernameToUserIds[username] = usernameToUserIds[username] || [];
    usernameToUserIds[username].push(user.id);
  }
});

// Fix duplicate usernames
let duplicateUsernamesFixed = 0;

for (const [username, userIds] of Object.entries(usernameToUserIds)) {
  if (userIds.length > 1) {
    console.log(`  ⚠️ Found duplicate username: ${username} used by ${userIds.length} users`);
    
    // Update all but the first user with the duplicate username
    for (let i = 1; i < userIds.length; i++) {
      const userId = userIds[i];
      const newUsername = `${username}_${i}`;
      
      // In real code, we would update the document in Firestore here
      duplicateUsernamesFixed++;  // Proper increment (no null check needed here as it's initialized to 0)
      console.log(`  ✅ Would change username for user ${userId} from ${username} to ${newUsername}`);
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