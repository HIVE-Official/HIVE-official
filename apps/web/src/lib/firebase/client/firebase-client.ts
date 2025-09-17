/**
 * Firebase Client Configuration
 * 
 * This file provides Firebase services for client-side usage.
 * It re-exports the initialized Firebase instances from the main firebase.ts file
 * to maintain a single source of truth for Firebase configuration.
 * 
 * Services exported:
 * - app: The initialized Firebase app instance
 * - auth: Firebase Authentication service
 * - db: Firestore database instance
 * - storage: Firebase Storage service
 * - analytics: Firebase Analytics (client-side only)
 */

// Re-export all Firebase services from the main firebase configuration
export { 
  app, 
  auth, 
  db, 
  storage, 
  analytics 
} from '../firebase';

// Export the default app as well for compatibility
export { app as default } from '../firebase';

// Type exports for better TypeScript support
export type { User } from 'firebase/auth';
export type { 
  DocumentData, 
  DocumentReference,
  CollectionReference,
  Query,
  QuerySnapshot,
  DocumentSnapshot,
  Timestamp,
  FieldValue,
  FirestoreError 
} from 'firebase/firestore';