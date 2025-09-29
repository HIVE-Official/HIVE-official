import { FirebaseApp } from 'firebase/app';
export { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
export { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
export { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
export { FirebaseStorage } from 'firebase/storage';
import { Analytics } from 'firebase/analytics';
export { Analytics } from 'firebase/analytics';

/**
 * Firebase Configuration and Initialization
 * Centralized Firebase setup with security enforcement
 */

declare let app: FirebaseApp;
declare const auth: Auth;
declare const db: Firestore;
declare const storage: FirebaseStorage;
declare let analytics: Analytics | undefined;
declare const validateCampusAccess: (userCampusId: string, requestedCampusId: string) => boolean;
declare const checkRateLimit: (identifier: string, maxRequests?: number, windowMs?: number) => boolean;

export { analytics, app, auth, checkRateLimit, db, storage, validateCampusAccess };
