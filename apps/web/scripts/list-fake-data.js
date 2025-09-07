/**
 * List all fake/duplicate data in Firebase for removal
 * Run with: node apps/web/scripts/list-fake-data.js
 */

require('dotenv').config({ path: './apps/web/.env.local' });
const admin = require('firebase-admin');

// Initialize Firebase Admin
function initializeFirebase() {
  try {
    if (admin.apps?.length > 0) {
      return admin.app();
    }

    let credential;
    if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      credential = admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
    }

    const app = admin.initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    return app;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
}

async function listFakeData() {
  const app = initializeFirebase();
  const db = admin.firestore();
  
  console.log('🚨 COMPREHENSIVE LIST OF FAKE/DUPLICATE DATA IN FIREBASE');
  console.log('═'.repeat(70));
  
  const fakeData = {
    duplicates: [],
    genericDescriptions: [],
    likelyFake: []
  };
  
  const spaceTypes = [
    'student_organizations',
    'fraternity_and_sorority',
    'campus_living',
    'university_organizations'
  ];
  
  // Track all spaces for analysis
  const allSpaces = [];
  
  // Collect all spaces
  for (const spaceType of spaceTypes) {
    try {
      const spacesSnapshot = await db
        .collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .get();
      
      for (const doc of spacesSnapshot.docs) {
        const data = doc.data();
        allSpaces.push({
          id: doc.id,
          name: data.name || '',
          description: data.description || '',
          type: spaceType,
          path: `/spaces/${spaceType}/spaces/${doc.id}`,
          createdAt: data.createdAt,
          isRSSImport: doc.id.startsWith('space_') || 
                       (data.description && data.description.includes('Events organized by'))
        });
      }
    } catch (error) {
      console.error(`Error checking ${spaceType}:`, error.message);
    }
  }
  
  // Find duplicates
  const nameGroups = {};
  allSpaces.forEach(space => {
    const nameLower = space.name.toLowerCase();
    if (!nameGroups[nameLower]) nameGroups[nameLower] = [];
    nameGroups[nameLower].push(space);
  });
  
  Object.entries(nameGroups).forEach(([name, spaces]) => {
    if (spaces.length > 1) {
      // Determine which to keep (prefer RSS imports)
      const rssImports = spaces.filter(s => s.isRSSImport);
      const nonRSS = spaces.filter(s => !s.isRSSImport);
      
      // Mark duplicates for removal (keep RSS version or first one)
      const toRemove = rssImports.length > 0 
        ? [...nonRSS, ...rssImports.slice(1)]  // Keep first RSS, remove others
        : spaces.slice(1);  // Keep first, remove others
      
      toRemove.forEach(space => {
        fakeData.duplicates.push(space);
      });
    }
  });
  
  // Find generic descriptions
  const genericDesc = [
    'University committees focused on campus-wide initiatives and support.',
    'University services focused on campus-wide initiatives and support.',
    'University programs focused on campus-wide initiatives and support.'
  ];
  
  allSpaces.forEach(space => {
    if (genericDesc.includes(space.description)) {
      fakeData.genericDescriptions.push(space);
    }
  });
  
  // Print results
  console.log('\n📋 DUPLICATES TO REMOVE (Keep only one version of each):');
  console.log('─'.repeat(70));
  
  // Group duplicates by name
  const dupsByName = {};
  fakeData.duplicates.forEach(dup => {
    if (!dupsByName[dup.name]) dupsByName[dup.name] = [];
    dupsByName[dup.name].push(dup);
  });
  
  Object.entries(dupsByName).forEach(([name, dups]) => {
    console.log(`\n"${name}":`);
    dups.forEach(dup => {
      console.log(`  ❌ REMOVE: ${dup.path}`);
      console.log(`     ID: ${dup.id}`);
      console.log(`     Type: ${dup.type}`);
    });
  });
  
  console.log('\n\n📋 SPACES WITH FAKE/GENERIC DESCRIPTIONS:');
  console.log('─'.repeat(70));
  console.log('These have copy-pasted placeholder descriptions:\n');
  
  // Group by type for easier viewing
  const genericByType = {};
  fakeData.genericDescriptions.forEach(space => {
    if (!genericByType[space.type]) genericByType[space.type] = [];
    genericByType[space.type].push(space);
  });
  
  Object.entries(genericByType).forEach(([type, spaces]) => {
    console.log(`\n${type.toUpperCase()}:`);
    spaces.forEach(space => {
      console.log(`  ❌ "${space.name}"`);
      console.log(`     Path: ${space.path}`);
      console.log(`     Desc: "${space.description.substring(0, 50)}..."`);
    });
  });
  
  // Additional suspicious patterns
  console.log('\n\n📋 ADDITIONAL SUSPICIOUS ENTRIES:');
  console.log('─'.repeat(70));
  
  // Find test data
  const testData = allSpaces.filter(space => 
    space.name.toLowerCase().includes('test') ||
    space.id.includes('test-') ||
    space.id.includes('mock-')
  );
  
  if (testData.length > 0) {
    console.log('\nTest/Mock Data:');
    testData.forEach(space => {
      console.log(`  ⚠️  "${space.name}" - ${space.path}`);
    });
  }
  
  // Summary counts
  console.log('\n\n📊 SUMMARY TO CLEAN UP:');
  console.log('═'.repeat(70));
  console.log(`Total duplicates to remove: ${fakeData.duplicates.length}`);
  console.log(`Spaces with generic descriptions: ${fakeData.genericDescriptions.length}`);
  console.log(`Test/Mock entries: ${testData.length}`);
  
  const totalToClean = fakeData.duplicates.length + 
                       fakeData.genericDescriptions.filter(s => 
                         !fakeData.duplicates.some(d => d.id === s.id)
                       ).length;
  
  console.log(`\n🗑️  TOTAL ENTRIES THAT NEED CLEANUP: ${totalToClean}`);
  
  // Create deletion script
  console.log('\n\n💾 DELETION COMMANDS:');
  console.log('═'.repeat(70));
  console.log('To remove these entries, you can run these Firebase commands:\n');
  
  // Duplicates
  console.log('// Remove duplicates');
  fakeData.duplicates.forEach(dup => {
    console.log(`db.collection('spaces').doc('${dup.type}').collection('spaces').doc('${dup.id}').delete();`);
  });
  
  console.log('\n// Update or remove entries with generic descriptions');
  fakeData.genericDescriptions
    .filter(s => !fakeData.duplicates.some(d => d.id === s.id))
    .forEach(space => {
      console.log(`// ${space.name}: needs real description`);
      console.log(`// db.collection('spaces').doc('${space.type}').collection('spaces').doc('${space.id}').update({ description: 'REAL_DESCRIPTION_HERE' });`);
    });
}

// Run the listing
listFakeData()
  .then(() => {
    console.log('\n✅ Analysis complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Analysis failed:', error);
    process.exit(1);
  });