'use client';

import { useEffect, useState } from 'react';

export default function DebugClientPage() {
  const [envData, setEnvData] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check client-side environment variables
    const clientEnv = {
      NODE_ENV: process.env.NODE_ENV || 'undefined',
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'undefined',
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'undefined',
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'undefined',
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'undefined',
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'undefined',
      NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'undefined',
    };
    
    setEnvData(clientEnv);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Client-Side Environment Debug</h1>
      <pre style={{ background: '#f5f5f5', padding: '10px' }}>
        {JSON.stringify(envData, null, 2)}
      </pre>
    </div>
  );
} 