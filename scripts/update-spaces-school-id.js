/**
 * Script to add schoolId: "ub" to all existing spaces in Firestore
 * Run with: node scripts/update-spaces-school-id.js
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin (you might need to adjust the path to your service account key)
if (!admin.apps.length) {
  // In development, you might want to use the emulator
  if (process.env.NODE_ENV === 'development') {
    admin.initializeApp({
      projectId: 'hive-9265c', // Replace with your project ID
    });
  } else {
    // In production, use service account
    const serviceAccount = require('../path-to-your-service-account-key.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

const db = admin.firestore();

async function updateSpacesWithSchoolId() {
  const spaceTypes = ["major", "residential", "interest", "creative", "organization"];
  let totalUpdated = 0;

  console.log('🔧 Starting to update spaces with schoolId: "ub"...\n');

  for (const type of spaceTypes) {
    console.log(`📁 Processing ${type} spaces...`);
    
    try {
      const spacesRef = db.collection("spaces").doc(type).collection("spaces");
      const snapshot = await spacesRef.get();
      
      console.log(`   Found ${snapshot.size} spaces in ${type} collection`);
      
      if (snapshot.empty) {
        console.log(`   ⚠️  No spaces found in ${type} collection\n`);
        continue;
      }

      let updatedInType = 0;
      const batch = db.batch();

      for (const doc of snapshot.docs) {
        const spaceData = doc.data();
        
        // Check if schoolId already exists
        if (!spaceData.schoolId) {
          // Add schoolId: "ub" to the space
          batch.update(doc.ref, { 
            schoolId: "ub",
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          updatedInType++;
          
          console.log(`   ✅ Queuing update for: ${spaceData.name || doc.id}`);
        } else {
          console.log(`   ⏭️  Space already has schoolId: ${spaceData.name || doc.id} (${spaceData.schoolId})`);
        }
      }

      // Commit the batch
      if (updatedInType > 0) {
        await batch.commit();
        console.log(`   🎉 Successfully updated ${updatedInType} spaces in ${type} collection`);
        totalUpdated += updatedInType;
      } else {
        console.log(`   ℹ️  No updates needed for ${type} collection`);
      }
      
      console.log(''); // Empty line for readability
      
    } catch (error) {
      console.error(`❌ Error processing ${type} spaces:`, error);
    }
  }

  console.log(`\n🎊 Migration complete! Updated ${totalUpdated} spaces total.`);
  
  // Verify the updates
  console.log('\n🔍 Verifying updates...');
  await verifyUpdates();
}

async function verifyUpdates() {
  const spaceTypes = ["major", "residential", "interest", "creative", "organization"];
  
  for (const type of spaceTypes) {
    try {
      const spacesRef = db.collection("spaces").doc(type).collection("spaces");
      const snapshot = await spacesRef.where("schoolId", "==", "ub").get();
      
      console.log(`   ✅ ${type}: ${snapshot.size} spaces now have schoolId: "ub"`);
      
    } catch (error) {
      console.error(`❌ Error verifying ${type}:`, error);
    }
  }
}

// Run the migration
updateSpacesWithSchoolId()
  .then(() => {
    console.log('\n✨ All done! You can now test the space claiming feature.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });