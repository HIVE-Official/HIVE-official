import admin from 'firebase-admin';

// Initialize Firebase Admin SDK right away
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
  throw new Error(
    'Firebase credentials are not set in environment variables. Please check your .env file or environment configuration.'
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

// Now that the app is initialized, we can safely get the firestore instance.
const db = admin.firestore();

const verifySchools = async () => {
  console.log('Verifying schools collection...');
  const schoolsCollection = db.collection('schools');
  
  try {
    const snapshot = await schoolsCollection.get();
    
    if (snapshot.empty) {
      console.error('Verification failed: No documents found in the schools collection.');
      process.exit(1);
    }
    
    console.log('Verification successful! Found the following schools:');
    snapshot.forEach(doc => {
      console.log(`- ${doc.id}:`, doc.data());
    });
    
    process.exit(0);
  } catch (error) {
    console.error('An error occurred during verification:', error);
    process.exit(1);
  }
};

// Execute the verification
verifySchools(); 