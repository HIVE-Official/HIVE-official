import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth, type User, type UserCredential, type IdTokenResult } from "firebase/auth";
import { getFirebaseConfig, isMockConfig } from "./env-config";

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
const isUsingMockConfig = isMockConfig(firebaseConfig);

if (isUsingMockConfig) {
  const configType = firebaseConfig.projectId === "screenshot-mock" ? "screenshot" : "development";
  console.warn(`🔥 Running in ${configType} mode with mock auth`);
  
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
        console.warn("🔥 Mock auth: signInWithCustomToken called");
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
    console.warn(`🚀 Firebase initialized successfully for project: ${firebaseConfig.projectId}`);
  } catch (error) {
    console.error("❌ Failed to initialize Firebase:", error);
    throw error;
  }
}

export { auth };
export default app;
