"use client";

import React from 'react';
import { FirebaseAuthProvider } from '@hive/ui';

// Check if dev bypass is enabled
const skipAuthInDev = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEV_BYPASS === 'true';

export function DevBypassAuthProvider({ children }: { children: React.ReactNode }) {
  // For now, just use the regular FirebaseAuthProvider
  // The bypass will be handled at the middleware and API level
  
  if (skipAuthInDev) {
    console.log('[DEV BYPASS] Auth bypass enabled - middleware will skip auth checks');
    console.log('[DEV BYPASS] Using mock user: jwhrineh@buffalo.edu');
  }
  
  return <FirebaseAuthProvider>{children}</FirebaseAuthProvider>;
}