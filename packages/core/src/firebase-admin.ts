import { getApps, initializeApp, cert, getApp } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { logger } from './utils/logger';

// Environment detection
const isProduction = process.env.NODE_ENV === 'production';
const serviceAccountKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

let firebaseInitialized = false;
let firestoreAdmin: Firestore | null = null;
let authAdmin: Auth | null = null;

const initializeFirebaseAdmin = () => {
	if (firebaseInitialized) return;

        try {
                if (!serviceAccountKey) {
                        logger.warn('FIREBASE_ADMIN_PRIVATE_KEY is not set. Skipping Firebase Admin init.');
                        if (!isProduction) {
                                firestoreAdmin = {} as Firestore;
                                authAdmin = {} as Auth;
                                firebaseInitialized = true;
                                return;
                        }
                        return;
                }

		const serviceAccount = JSON.parse(serviceAccountKey);
		const appName = 'hive-admin-app';

		if (!getApps().some((app) => app.name === appName)) {
			initializeApp(
				{
					credential: cert(serviceAccount),
					databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
				},
				appName
			);
			logger.info('Firebase Admin SDK initialized successfully.');
		}

		const app = getApp(appName);
		firestoreAdmin = getFirestore(app);
		authAdmin = getAuth(app);
		firebaseInitialized = true;
	} catch (error) {
		logger.error('Firebase Admin SDK initialization failed:', error);
		// In a non-production environment, you might want to mock the services
		// to allow the application to run without a live Firebase connection.
		if (!isProduction) {
			logger.warn(
				'Running in non-production without Firebase Admin. Using mock services.'
			);
			firestoreAdmin = {} as Firestore; // Mock object
			authAdmin = {} as Auth; // Mock object
			firebaseInitialized = true; // Pretend it's initialized
		} else {
			// In production, this is a fatal error.
			throw error;
		}
	}
};

// Initialize on first import
initializeFirebaseAdmin();

// Re-export for compatibility with runtime checks
export const db = firestoreAdmin!; // Safe after initialization
export const auth = authAdmin!; // Safe after initialization
export const dbAdmin = firestoreAdmin!; // Export dbAdmin for compatibility
export const isFirebaseConfigured = firebaseInitialized;

// Environment info for debugging
export const environmentInfo = {
	environment: process.env.NODE_ENV || "development",
	firebaseConfigured: firebaseInitialized,
	projectId: process.env.FIREBASE_PROJECT_ID || "hive-dev-2025",
	credentialSource: firebaseInitialized
		? process.env.FIREBASE_ADMIN_PRIVATE_KEY
			? "base64_key"
			: "application_default"
		: "none",
};
