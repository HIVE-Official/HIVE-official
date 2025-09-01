"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DevRedirect() {
  const router = useRouter();

  useEffect(() => {
    console.log('🚀 DEV REDIRECT: Forcing redirect to profile');
    
    // Clear any existing data
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
      
      // Create dev session
      const devSession = {
        userId: 'dev_user_123',
        email: 'dev@hive.com',
        schoolId: 'dev_school',
        needsOnboarding: false,
        onboardingCompleted: true,
        verifiedAt: new Date().toISOString(),
        profileData: {
          fullName: 'Dev User',
          handle: 'devuser',
          major: 'Computer Science',
          avatarUrl: '',
          builderOptIn: true
        }
      };
      
      window.localStorage.setItem('hive_session', JSON.stringify(devSession));
      window.localStorage.setItem('dev_auth_mode', 'true');
      
      // Force redirect
      window.location.href = '/profile';
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-void-900 text-[var(--hive-text-inverse)] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">🚀 DEV MODE</h2>
        <p>Redirecting to profile...</p>
      </div>
    </div>
  );
}