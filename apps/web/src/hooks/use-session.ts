"use client";

import { useEffect, useState } from 'react';

interface SessionData {
  userId: string;
  email: string;
  schoolId: string;
  needsOnboarding?: boolean;
  onboardingCompleted?: boolean;
  verifiedAt: string;
  profileData?: {
    fullName: string;
    handle: string;
    major: string;
    avatarUrl: string;
    builderOptIn: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  handle?: string;
  major?: string;
  avatarUrl?: string;
  schoolId: string;
  builderOptIn?: boolean;
  onboardingCompleted: boolean;
}

/**
 * Session hook for accessing user authentication and profile data
 * Uses localStorage-based session management
 */
export function useSession() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    const checkSession = () => {
      try {
        // DEVELOPMENT MODE: Auto-create dev session if none exists (DISABLED TO SHOW AUTH FLOW)
        // if (process.env.NODE_ENV === 'development') {
        //   const sessionJson = window.localStorage.getItem('hive_session');
        //   
        //   if (!sessionJson) {
        //     const devSession: SessionData = {
        //       userId: 'dev_user_123',
        //       email: 'dev@hive.com',
        //       schoolId: 'dev_school',
        //       needsOnboarding: true,
        //       onboardingCompleted: false,
        //       verifiedAt: new Date().toISOString()
        //     };
        //     
        //     window.localStorage.setItem('hive_session', JSON.stringify(devSession));
        //     window.localStorage.setItem('dev_auth_mode', 'true');
        //     
        //     const userData: User = {
        //       id: devSession.userId,
        //       email: devSession.email,
        //       schoolId: devSession.schoolId,
        //       onboardingCompleted: false
        //     };

        //     setIsAuthenticated(true);
        //     setUser(userData);
        //     setSessionData(devSession);
        //     setIsLoading(false);
        //     return;
        //   }
        // }
        
        const sessionJson = window.localStorage.getItem('hive_session');
        
        if (!sessionJson) {
          setIsAuthenticated(false);
          setUser(null);
          setSessionData(null);
          setIsLoading(false);
          return;
        }

        const session: SessionData = JSON.parse(sessionJson);
        const devAuth = window.localStorage.getItem('dev_auth_mode');
        
        // For dev auth, skip expiration check
        if (process.env.NODE_ENV === 'development' || devAuth === 'true') {
          // Skip expiration check in development
        } else {
          // Check if session is expired (24 hours)
          const sessionAge = Date.now() - new Date(session.verifiedAt).getTime();
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours
          
          if (sessionAge > maxAge) {
            // Session expired, clear it
            window.localStorage.removeItem('hive_session');
            window.localStorage.removeItem('dev_auth_mode');
            setIsAuthenticated(false);
            setUser(null);
            setSessionData(null);
            setIsLoading(false);
            return;
          }
        }

        // Session is valid, create user object
        // DEV FIX: If user has profile data, consider onboarding completed
        const onboardingCompleted = session.onboardingCompleted || 
          (devAuth === 'true' && !!session.profileData?.fullName);
          
        const userData: User = {
          id: session.userId,
          email: session.email,
          schoolId: session.schoolId,
          onboardingCompleted,
          fullName: session.profileData?.fullName,
          handle: session.profileData?.handle,
          major: session.profileData?.major,
          avatarUrl: session.profileData?.avatarUrl,
          builderOptIn: session.profileData?.builderOptIn,
        };
        
        console.log('🔍 useSession creating user data:', {
          sessionOnboardingCompleted: session.onboardingCompleted,
          userOnboardingCompleted: userData.onboardingCompleted,
          hasProfileData: !!session.profileData,
          fullName: session.profileData?.fullName,
          devAuth
        });

        setIsAuthenticated(true);
        setUser(userData);
        setSessionData(session);
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        // Clear potentially corrupted session
        window.localStorage.removeItem('hive_session');
        window.localStorage.removeItem('dev_auth_mode');
        setIsAuthenticated(false);
        setUser(null);
        setSessionData(null);
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for storage changes (e.g., login/logout in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'hive_session') {
        checkSession();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const logout = () => {
    window.localStorage.removeItem('hive_session');
    window.localStorage.removeItem('dev_auth_mode');
    setIsAuthenticated(false);
    setUser(null);
    setSessionData(null);
    
    // Redirect to schools page
    window.location.href = '/schools';
  };

  return {
    isLoading,
    isAuthenticated,
    user,
    sessionData,
    logout,
  };
}