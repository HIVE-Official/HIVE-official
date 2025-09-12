/**
 * Remove all fake/duplicate data from Firebase
 * Run with: node apps/web/scripts/clean-fake-data.js
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

    const _app = admin.initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    return app;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
}

async function cleanFakeData() {
  const _app = initializeFirebase();
  const db = admin.firestore();
  
  console.log('🧹 CLEANING FAKE/DUPLICATE DATA FROM FIREBASE');
  console.log('═'.repeat(60));
  
  // List of duplicates to remove
  const toDelete = [
    // Fraternity/Sorority duplicates
    { type: 'fraternity_and_sorority', id: 'ItofUDxHPalzcbDdDd11', name: 'Alpha Kappa Alpha (duplicate)' },
    { type: 'fraternity_and_sorority', id: 'vassnNtXUjZoH5lvVgdv', name: 'Alpha Phi Alpha (duplicate)' },
    
    // Campus Living duplicates
    { type: 'campus_living', id: 'BXEZ0avfOlpi5vpDGuuP', name: 'Upper Hall (duplicate)' },
    { type: 'campus_living', id: 'hfz9eT43cJaqUTVIlcci', name: 'North Commons (duplicate)' },
    { type: 'campus_living', id: '3rjAv1j9O1zw2Hdjp287', name: 'Governors Complex (duplicate)' },
    { type: 'campus_living', id: 'M1DlfA4DbIRY3Uvw17id', name: 'Lower Hall (duplicate)' },
    
    // University Organizations duplicates and fake entries
    { type: 'university_organizations', id: 'z9H05nu4Lx2ApeiupuQR', name: 'Academic Support (duplicate)' },
    { type: 'university_organizations', id: 'PfijUOB3AVIrC8xBrZh2', name: 'Publications Committee (duplicate)' },
    { type: 'university_organizations', id: 'Uk3GL3UKu7lRGXkLIeAy', name: 'Publications Committee (duplicate)' },
    { type: 'university_organizations', id: 'zH6p4RDuI9QKp8PuvlLb', name: 'Sustainability Committee (duplicate)' },
    { type: 'university_organizations', id: 'oqBc0gnvHKHYbZHbG9zV', name: 'Peer Mentoring (duplicate)' },
    { type: 'university_organizations', id: 'jTFRwRdQtQeFsthl5uYG', name: 'Career Services (duplicate)' },
    { type: 'university_organizations', id: 'PFVDSAsDyroQFwVkDZ6C', name: 'Campus Tours (duplicate)' },
    { type: 'university_organizations', id: 'GIB12ZDtVSpHrnDZh1Mh', name: 'Study Abroad Ambassadors (duplicate)' },
    { type: 'university_organizations', id: 'RUn1jocHXdnhrfk0VSaS', name: 'Study Abroad Ambassadors (duplicate)' },
    { type: 'university_organizations', id: 'fFMttC3GyucEb8xIJlOD', name: 'Honor Society (duplicate)' },
    { type: 'university_organizations', id: 'hI0jJwFPCZIBSZq1rY93', name: 'Honor Society (duplicate)' },
    { type: 'university_organizations', id: 'momGmciKxFywSeYCRuUb', name: 'Athletics Board (duplicate)' },
    { type: 'university_organizations', id: 'ttFwFzIARqxmuxRbewYZ', name: 'Athletics Board (duplicate)' },
    { type: 'university_organizations', id: 'PMdJNQBfbRZTGjF5jy6J', name: 'Research Showcase (duplicate)' },
    { type: 'university_organizations', id: 'hq9vRJ9d7nG2bqOXOniy', name: 'Research Showcase (duplicate)' },
    { type: 'university_organizations', id: 'i2xlgDxI7IlQzZqwT9gS', name: 'IT Student Help (duplicate)' },
    { type: 'university_organizations', id: 'nspWhihmK6GEJ5qU0JGW', name: 'Library Associates (duplicate)' },
    { type: 'university_organizations', id: 'W6IsTblQVDxjTNdO8KXk', name: 'Diversity Council (duplicate)' }
  ];
  
  // Also clean up entries with generic descriptions
  const genericDescriptions = [
    'University committees focused on campus-wide initiatives and support.',
    'University services focused on campus-wide initiatives and support.',
    'University programs focused on campus-wide initiatives and support.'
  ];
  
  let deletedCount = 0;
  let updatedCount = 0;
  let errorCount = 0;
  
  // Delete duplicates
  console.log('\n📝 Deleting duplicates...\n');
  for (const item of toDelete) {
    try {
      await db
        .collection('spaces')
        .doc(item.type)
        .collection('spaces')
        .doc(item.id)
        .delete();
      
      console.log(`✅ Deleted: ${item.name}`);
      console.log(`   Path: /spaces/${item.type}/spaces/${item.id}`);
      deletedCount++;
    } catch (error) {
      console.error(`❌ Failed to delete ${item.name}: ${error.message}`);
      errorCount++;
    }
  }
  
  // Update entries with generic descriptions
  console.log('\n📝 Checking for entries with generic descriptions...\n');
  
  const spaceTypes = ['university_organizations']; // These are the main offenders
  
  for (const spaceType of spaceTypes) {
    const snapshot = await db
      .collection('spaces')
      .doc(spaceType)
      .collection('spaces')
      .get();
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (genericDescriptions.includes(data.description)) {
        // Check if this is one we're already deleting
        const isBeingDeleted = toDelete.some(item => 
          item.type === spaceType && item.id === doc.id
        );
        
        if (!isBeingDeleted) {
          // Update with a better description based on the name
          const name = data.name || 'Unknown';
          const betterDescription = `${name} - University organization supporting student success and campus initiatives. Contact for more information about programs and services.`;
          
          try {
            await db
              .collection('spaces')
              .doc(spaceType)
              .collection('spaces')
              .doc(doc.id)
              .update({
                description: betterDescription,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                descriptionUpdatedFrom: 'generic-placeholder'
              });
            
            console.log(`✅ Updated description for: ${name}`);
            updatedCount++;
          } catch (error) {
            console.error(`❌ Failed to update ${name}: ${error.message}`);
            errorCount++;
          }
        }
      }
    }
  }
  
  // Summary
  console.log('\n\n📊 CLEANUP SUMMARY');
  console.log('═'.repeat(60));
  console.log(`✅ Deleted: ${deletedCount} duplicate entries`);
  console.log(`✅ Updated: ${updatedCount} generic descriptions`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount} operations failed`);
  }
  console.log('\n🎉 Cleanup complete! Database is now clean.');
}

// Run the cleanup
cleanFakeData()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });