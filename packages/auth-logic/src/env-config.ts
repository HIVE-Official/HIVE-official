// Environment configuration for Firebase
// This module handles both server-side and client-side environment variable access

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Check if we're running on the client side
const isClientSide = typeof window !== 'undefined';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Get environment variables with fallbacks for client-side
function getEnvVar(key: string): string | undefined {
  // For client-side, we need to access the variables differently
  if (isClientSide) {
    // On client-side, environment variables should be available via process.env
    // or potentially through Next.js injected data
    const windowObj = window as typeof window & {
      __NEXT_DATA__?: {
        props?: {
          pageProps?: {
            env?: Record<string, string>;
          };
        };
      };
    };
    
    return process.env[key] || windowObj.__NEXT_DATA__?.props?.pageProps?.env?.[key];
  }
  
  // Server-side access
  return process.env[key];
}

// Development mock configuration
const MOCK_CONFIG: FirebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-DEMO"
};

// Screenshot/build environment mock configuration
const SCREENSHOT_CONFIG: FirebaseConfig = {
  apiKey: "screenshot-mock-key",
  authDomain: "screenshot-mock.firebaseapp.com",
  projectId: "screenshot-mock",
  storageBucket: "screenshot-mock.appspot.com",
  messagingSenderId: "000000000",
  appId: "1:000000000:web:screenshot",
  measurementId: "G-SCREENSHOT"
};

export function getFirebaseConfig(): FirebaseConfig {
  // Required environment variable keys
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  ];

  // Get all environment variables
  const envVars = Object.fromEntries(
    requiredVars.map(key => [key, getEnvVar(key)])
  );

  // Check which variables are missing
  const missingVars = requiredVars.filter(key => !envVars[key]);
  
  // Debug logging
  if (isDevelopment) {
    console.warn('🔍 Firebase config debug:', {
      isClientSide,
      missingVars,
      availableVars: Object.entries(envVars).reduce((acc, [key, value]) => {
        acc[key] = value ? '✅ Available' : '❌ Missing';
        return acc;
      }, {} as Record<string, string>)
    });
  }

  // Handle special cases
  const isLikelyScreenshotService = getEnvVar('VERCEL_ENV') && !envVars.NEXT_PUBLIC_FIREBASE_API_KEY;
  const isLikelyDemoMode = !envVars.NEXT_PUBLIC_FIREBASE_API_KEY || envVars.NEXT_PUBLIC_FIREBASE_API_KEY === 'demo-api-key';

  if (isLikelyScreenshotService) {
    console.warn('⚠️ Using screenshot environment config');
    return SCREENSHOT_CONFIG;
  }

  if (isDevelopment && isLikelyDemoMode) {
    console.warn('⚠️ Using development mock config');
    return MOCK_CONFIG;
  }

  if (missingVars.length > 0) {
    // If we're on client-side and variables are missing, use mock config in development
    if (isClientSide && isDevelopment) {
      console.warn(`⚠️ Client-side missing vars: ${missingVars.join(', ')}, using mock config`);
      return MOCK_CONFIG;
    }
    
    // In production or server-side, throw error
    throw new Error(
      `🚨 Firebase configuration error: Missing environment variables: ${missingVars.join(', ')}\n` +
      `Environment: ${isClientSide ? 'client' : 'server'}\n` +
      `Please check your .env.local file or Vercel environment variables.`
    );
  }

  // Return production configuration
  return {
    apiKey: envVars.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: envVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: envVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: envVars.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: envVars.NEXT_PUBLIC_FIREBASE_APP_ID!,
    measurementId: getEnvVar('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID')
  };
}

export function isMockConfig(config: FirebaseConfig): boolean {
  return config.projectId === 'demo-project' || config.projectId === 'screenshot-mock';
} 