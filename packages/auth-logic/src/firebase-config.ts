import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth, type User, type UserCredential, type IdTokenResult } from "firebase/auth";
import { logger } from "@hive/core";

// Check if we're in development mode without proper Firebase config
const isDevelopmentWithoutFirebase = () => {
  return process.env.NODE_ENV === 'development' && 
         (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
          process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'demo-api-key');
};

// Get Firebase configuration from environment variables
function getFirebaseConfig() {
  // Check if all required Firebase config is available
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  // Debug logging for client-side
  if (typeof window !== 'undefined') {
    console.log('🔍 Client-side Firebase config check:', {
      missingVars,
      NODE_ENV: process.env.NODE_ENV,
      isDevelopmentWithoutFirebase: isDevelopmentWithoutFirebase(),
      availableVars: requiredVars.map(varName => ({
        [varName]: process.env[varName] ? '✅ Available' : '❌ Missing'
      }))
    });
  }
  
  if (missingVars.length > 0 && !isDevelopmentWithoutFirebase()) {
    // Check if this might be a Vercel screenshot service or similar
    const isLikelyScreenshotService = process.env.VERCEL_ENV && 
                                      !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    
    // Check if this is client-side in development - use mock config
    const isClientSideDevelopment = typeof window !== 'undefined' && 
                                    process.env.NODE_ENV === 'development';
    
    if (isLikelyScreenshotService) {
      console.warn(
        `⚠️ Firebase config missing in screenshot environment. Missing: ${missingVars.join(', ')}`
      );
      // Return a minimal mock config for screenshot generation
      return {
        apiKey: "screenshot-mock-key",
        authDomain: "screenshot-mock.firebaseapp.com", 
        projectId: "screenshot-mock",
        storageBucket: "screenshot-mock.appspot.com",
        messagingSenderId: "000000000",
        appId: "1:000000000:web:screenshot",
        measurementId: "G-SCREENSHOT"
      };
    }
    
    if (isClientSideDevelopment) {
      console.warn(
        `⚠️ Client-side development: Firebase env vars missing, using mock config. Missing: ${missingVars.join(', ')}`
      );
      // Return demo config for client-side development
      return {
        apiKey: "demo-api-key",
        authDomain: "demo-project.firebaseapp.com",
        projectId: "demo-project",
        storageBucket: "demo-project.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abcdef123456",
        measurementId: "G-DEMO"
      };
    }
    
    throw new Error(
      `🚨 Firebase configuration error: Missing environment variables: ${missingVars.join(', ')}\n` +
      `Please check your .env.local file or Vercel environment variables.\n` +
      `See ENV_TEMPLATE.md for complete setup instructions.`
    );
  }

  // Return demo config for development without Firebase
  if (isDevelopmentWithoutFirebase()) {
    return {
      apiKey: "demo-api-key",
      authDomain: "demo-project.firebaseapp.com",
      projectId: "demo-project",
      storageBucket: "demo-project.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:abcdef123456",
      measurementId: "G-DEMO"
    };
  }

  // Return real config from environment variables
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

// Mock user type matching Firebase User interface
interface MockUser extends Partial<User> {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  getIdTokenResult(): Promise<IdTokenResult>;
  getIdToken(): Promise<string>;
}

// Initialize Firebase or create mock auth for development
const firebaseConfig = getFirebaseConfig();
const isUsingMockConfig = firebaseConfig.projectId === "demo-project" || 
                         firebaseConfig.projectId === "screenshot-mock";

if (isDevelopmentWithoutFirebase() || isUsingMockConfig) {
  const configType = firebaseConfig.projectId === "screenshot-mock" ? "screenshot" : "development";
  logger.info(`🔥 Running in ${configType} mode with mock auth`);
  
  // Create a complete mock auth object with all necessary methods
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback: (user: User | null) => void) => {
      // Immediately call with null user (unauthenticated)
      setTimeout(() => callback(null), 0);
      // Return unsubscribe function
      return () => {};
    },
    signOut: () => Promise.resolve(),
    signInWithCustomToken: () => {
      logger.info("🔥 Mock auth: signInWithCustomToken called");
      const mockUser: MockUser = {
        uid: 'mock-uid',
        email: 'dev@buffalo.edu',
        displayName: 'Dev User',
        emailVerified: true,
        getIdTokenResult: () => Promise.resolve({
          claims: {
            onboardingCompleted: false,
            isBuilder: true
          },
          token: 'mock-token',
          authTime: new Date().toISOString(),
          issuedAtTime: new Date().toISOString(),
          expirationTime: new Date(Date.now() + 3600000).toISOString(),
          signInProvider: 'custom',
          signInSecondFactor: null
        }),
        getIdToken: () => Promise.resolve('mock-token')
      };
      
      return Promise.resolve({
        user: mockUser,
        operationType: 'signIn',
        providerId: 'custom'
      } as UserCredential);
    },
    signInWithEmailAndPassword: () => Promise.reject(new Error("Mock auth - not implemented")),
    createUserWithEmailAndPassword: () => Promise.reject(new Error("Mock auth - not implemented")),
    sendPasswordResetEmail: () => Promise.reject(new Error("Mock auth - not implemented")),
    updateProfile: () => Promise.reject(new Error("Mock auth - not implemented")),
    app: null,
    name: "mock-auth",
    config: firebaseConfig,
  } as unknown as Auth;
} else {
  // Production mode - use real Firebase
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    logger.info(`🚀 Firebase initialized successfully for project: ${firebaseConfig.projectId}`);
  } catch (error) {
    logger.error("❌ Failed to initialize Firebase:", error);
    throw error;
  }
}

export { auth };
export default app;
