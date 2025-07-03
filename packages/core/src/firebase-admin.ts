import { getApps, initializeApp, cert, getApp } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { logger } from './utils/logger';
import { getFirebaseAdminConfig, isProduction, isBuildTime } from './env';

let firebaseInitialized = false;
let firestoreAdmin: Firestore | null = null;
let authAdmin: Auth | null = null;

const initializeFirebaseAdmin = () => {
	if (firebaseInitialized) return;

        try {
                const adminConfig = getFirebaseAdminConfig();

                if (!adminConfig) {
                        logger.warn('Firebase Admin credentials not found, using mock services');
                        if (!isProduction || isBuildTime) {
                                firestoreAdmin = {} as Firestore;
                                authAdmin = {} as Auth;
                                firebaseInitialized = true;
                                return;
                        }
                        throw new Error('Firebase Admin credentials required in production');
                }

		const appName = 'hive-admin-app';

		if (!getApps().some((app) => app.name === appName)) {
			initializeApp(
				{
					credential: cert(adminConfig),
					databaseURL: `https://${adminConfig.projectId}.firebaseio.com`,
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
		logger.error('Firebase Admin SDK initialization failed', { 
			error: error instanceof Error ? error : new Error(String(error))
		});

		if (!isProduction || isBuildTime) {
			logger.warn('Using mock services in non-production environment');
			firestoreAdmin = {} as Firestore;
			authAdmin = {} as Auth;
			firebaseInitialized = true;
		} else {
			throw error;
		}
	}
};

// Initialize on first import
initializeFirebaseAdmin();

// Export admin services
export const dbAdmin = firestoreAdmin!;
export const firebaseAuth = authAdmin!;

export const isFirebaseConfigured = firebaseInitialized;

// Re-export environment info
export { environmentInfo } from './env';
