// Environment configuration for Firebase
// This module handles both server-side and client-side environment variable access
// Check if we're running on the client side
const isClientSide = typeof window !== 'undefined';
// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';
// Get environment variables with fallbacks for client-side
function getEnvVar(key) {
    // For client-side, we need to access the variables differently
    if (isClientSide) {
        // On client-side, environment variables should be available via process.env
        // or potentially through Next.js injected data
        const windowObj = window;
        return process.env[key] || windowObj.__NEXT_DATA__?.props?.pageProps?.env?.[key];
    }
    // Server-side access
    return process.env[key];
}
// Development mock configuration
const MOCK_CONFIG = {
    apiKey: "demo-api-key",
    authDomain: "demo-project.firebaseapp.com",
    projectId: "demo-project",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456",
    measurementId: "G-DEMO"
};
// Screenshot/build environment mock configuration
const SCREENSHOT_CONFIG = {
    apiKey: "screenshot-mock-key",
    authDomain: "screenshot-mock.firebaseapp.com",
    projectId: "screenshot-mock",
    storageBucket: "screenshot-mock.appspot.com",
    messagingSenderId: "000000000",
    appId: "1:000000000:web:screenshot",
    measurementId: "G-SCREENSHOT"
};
export function getFirebaseConfig() {
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
    const envVars = Object.fromEntries(requiredVars.map(key => [key, getEnvVar(key)]));
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
            }, {})
        });
    }
    // Handle special cases
    const isLikelyScreenshotService = getEnvVar('VERCEL_ENV') && !envVars.NEXT_PUBLIC_FIREBASE_API_KEY;
    const isLikelyDemoMode = !envVars.NEXT_PUBLIC_FIREBASE_API_KEY || envVars.NEXT_PUBLIC_FIREBASE_API_KEY === 'demo-api-key';
    if (isLikelyScreenshotService) {
        return SCREENSHOT_CONFIG;
    }
    if (isDevelopment && isLikelyDemoMode) {
        return MOCK_CONFIG;
    }
    if (missingVars.length > 0) {
        // Always use mock config when environment variables are missing
        // This prevents Firebase initialization errors in production
        return MOCK_CONFIG;
    }
    // Return production configuration
    return {
        apiKey: envVars.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: envVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: envVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: envVars.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: envVars.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: getEnvVar('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID')
    };
}
export function isMockConfig(config) {
    return config.projectId === 'demo-project' || config.projectId === 'screenshot-mock';
}
//# sourceMappingURL=env-config.js.map