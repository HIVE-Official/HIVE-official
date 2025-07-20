import { auth, firestore, logger } from "../types/firebase";
import { UserRecord } from "firebase-functions/v1/auth";

/**
 * Firebase Auth trigger that automatically creates a user document in Firestore
 * when a new user is created via authentication.
 * 
 * This ensures that:
 * 1. Every authenticated user has a corresponding Firestore document
 * 2. The onboarding flow can properly check user state
 * 3. Auto-join functions can trigger correctly after onboarding completion
 */
export const onAuthUserCreate = auth()
  .user()
  .onCreate(async (user: UserRecord) => {
    const { uid, email } = user;
    
    logger.info(`Creating user document for authenticated user: ${uid} (${email})`);
    
    try {
      // Extract school ID from email domain if possible
      let schoolId: string | null = null;
      if (email) {
        const domain = email.split('@')[1];
        if (domain) {
          // Try to find the school by domain
          const db = firestore();
          const schoolsQuery = await db
            .collection('schools')
            .where('domain', '==', domain)
            .limit(1)
            .get();
          
          if (!schoolsQuery.empty) {
            schoolId = schoolsQuery.docs[0].id;
            logger.info(`Found school ID ${schoolId} for domain ${domain}`);
          } else {
            logger.warn(`No school found for domain ${domain}`);
          }
        }
      }
      
      // Create the initial user document
      const userDocument = {
        uid,
        email: email || null,
        schoolId,
        // These will be filled during onboarding
        fullName: null,
        handle: null,
        bio: null,
        major: null,
        graduationYear: null,
        avatarUrl: null,
        builderOptIn: false,
        // Consent and completion tracking
        consentGiven: false,
        consentGivenAt: null,
        onboardingCompletedAt: null,
        // Timestamps
        createdAt: firestore().FieldValue.serverTimestamp(),
        updatedAt: firestore().FieldValue.serverTimestamp(),
      };
      
      const db = firestore();
      await db.collection('users').doc(uid).set(userDocument);
      
      logger.info(`Successfully created user document for ${uid}`);
      
    } catch (error) {
      logger.error(`Failed to create user document for ${uid}:`, error as Error);
      // Don't throw here - we don't want to prevent user authentication
      // The user can still complete onboarding manually
    }
  });