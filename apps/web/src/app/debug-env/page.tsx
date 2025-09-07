/**
 * Debug Environment Variables Page
 * Server-side environment variable debugging
 */

export default function DebugEnvPage() {
  // Server-side environment check
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    hasFirebaseApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    hasFirebaseProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    hasFirebaseAuthDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    hasFirebaseStorageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    hasFirebaseMessagingSenderId: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    hasFirebaseAppId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    
    // Safe to show these values (project ID and domain are public)
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    
    // Server-side only vars
    hasFirebaseClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
    hasFirebasePrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Environment Debug</h1>
        
        <div className="bg-hive-background-secondary rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Server Environment</h2>
          <pre className="text-sm text-hive-text-secondary bg-hive-background-tertiary p-4 rounded overflow-auto">
            {JSON.stringify(envVars, null, 2)}
          </pre>
        </div>

        <div className="bg-hive-background-secondary rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Runtime Info</h2>
          <div className="space-y-2 text-sm text-hive-text-secondary">
            <div>Rendered at: {new Date().toISOString()}</div>
            <div>Server-side: Yes (this is rendered on the server)</div>
          </div>
        </div>
      </div>
    </div>
  );
}