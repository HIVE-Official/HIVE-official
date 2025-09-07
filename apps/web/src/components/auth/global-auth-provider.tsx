'use client';

import { useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { initializeAuthSync } from '@hive/hooks';

/**
 * Global auth provider that syncs Firebase Auth with Zustand store
 * Place this at the root of your app
 */
export function GlobalAuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize auth sync
    const cleanup = initializeAuthSync(auth, db);
    
    // Cleanup on unmount
    return cleanup;
  }, []);

  return <>{children}</>;
}