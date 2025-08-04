"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Dashboard redirects to PROFILE (command center) per utility-first IA
// Profile is the primary landing spot for authenticated users
export default function DashboardPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to profile since it's the utility-first command center
    router.replace('/profile');
  }, [router]);
  
  return null; // No UI needed since we're redirecting immediately 
}