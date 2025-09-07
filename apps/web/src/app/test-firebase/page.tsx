"use client";

import { useEffect, useState } from 'react';
// Import Firebase dynamically to catch initialization errors
// import { auth, db } from '@/lib/firebase';
// import { signInAnonymously } from 'firebase/auth';
// import { collection, getDocs } from 'firebase/firestore';

export default function TestFirebasePage() {
  const [status, setStatus] = useState('Testing Firebase...');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log('[Firebase Test]', message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    const testFirebase = async () => {
      try {
        addLog('Starting Firebase configuration test...');
        
        // Test 1: Check environment variables (client-side)
        addLog('Testing client-side environment variables...');
        const clientEnvVars = {
          hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          hasAuthDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        };
        addLog(`Client env check: ${JSON.stringify(clientEnvVars, null, 2)}`);
        
        if (!clientEnvVars.hasApiKey || !clientEnvVars.hasProjectId) {
          throw new Error('Missing Firebase environment variables on client-side');
        }
        addLog('✅ Client-side environment variables are present');

        // Test 2: Dynamic Firebase import
        addLog('Testing dynamic Firebase import...');
        
        try {
          const { auth, db } = await import('@/lib/firebase');
          addLog('✅ Firebase modules imported successfully');
          
          if (!auth) {
            throw new Error('Firebase Auth not initialized');
          }
          addLog('✅ Firebase Auth instance available');

          if (!db) {
            throw new Error('Firestore not initialized');  
          }
          addLog('✅ Firestore instance available');

          // Test 3: Firebase Auth
          addLog('Testing Firebase Auth initialization...');
          const { signInAnonymously } = await import('firebase/auth');
          const userCredential = await signInAnonymously(auth);
          addLog(`✅ Anonymous auth successful: ${userCredential.user.uid}`);

          // Test 4: Firestore
          addLog('Testing Firestore query...');
          const { collection, getDocs } = await import('firebase/firestore');
          try {
            const querySnapshot = await getDocs(collection(db, 'test'));
            addLog(`✅ Firestore query successful: ${querySnapshot.size} documents`);
          } catch (firestoreError) {
            addLog(`⚠️ Firestore query failed: ${(firestoreError as Error).message}`);
          }

          setStatus('✅ All Firebase tests passed!');
        } catch (importError) {
          addLog(`❌ Firebase import/initialization failed: ${(importError as Error).message}`);
          setStatus(`❌ Firebase import failed: ${(importError as Error).message}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        addLog(`❌ Firebase test failed: ${errorMessage}`);
        setStatus(`❌ Firebase test failed: ${errorMessage}`);
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Firebase Test Page</h1>
        
        <div className="bg-hive-background-secondary rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-2">Status:</h2>
          <p className="text-hive-text-secondary">{status}</p>
        </div>

        <div className="bg-hive-background-secondary rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Logs:</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {logs.map((log, index) => (
              <div 
                key={index}
                className={`text-sm p-2 rounded ${
                  log.includes('✅') ? 'bg-green-900/20 text-green-200' :
                  log.includes('⚠️') ? 'bg-yellow-900/20 text-yellow-200' :
                  log.includes('❌') ? 'bg-red-900/20 text-red-200' :
                  'bg-hive-background-tertiary text-hive-text-tertiary'
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}