"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Avatar, AvatarImage, AvatarFallback } from "@hive/ui";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";

interface SessionData {
  userId: string;
  email: string;
  schoolId?: string;
  verifiedAt: string;
  onboardingCompleted?: boolean;
}

export function AuthStatusIndicator() {
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Check for session in localStorage
    const checkSession = () => {
      const sessionJson = window.localStorage.getItem('hive_session');
      if (sessionJson) {
        try {
          const sessionData = JSON.parse(sessionJson);
          // Verify session is not expired (24 hours)
          const sessionAge = Date.now() - new Date(sessionData.verifiedAt).getTime();
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours

          if (sessionAge <= maxAge) {
            setSession(sessionData);
          } else {
            // Session expired
            window.localStorage.removeItem('hive_session');
            setSession(null);
          }
        } catch (error) {
          console.error('Error parsing session:', error);
          window.localStorage.removeItem('hive_session');
          setSession(null);
        }
      } else {
        setSession(null);
      }
    };

    checkSession();
    // Check session on focus
    window.addEventListener('focus', checkSession);
    return () => window.removeEventListener('focus', checkSession);
  }, []);

  const handleSignOut = async () => {
    try {
      // Clear local session
      window.localStorage.removeItem('hive_session');
      window.localStorage.removeItem('emailForSignIn');

      // Call logout API
      await fetch('/api/auth/logout', { method: 'POST' });

      // Redirect to landing
      router.push('/landing');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleNavigateToProfile = () => {
    router.push('/profile');
    setIsDropdownOpen(false);
  };

  const handleNavigateToSettings = () => {
    router.push('/profile/settings');
    setIsDropdownOpen(false);
  };

  // Not logged in - show Sign In button
  if (!session) {
    return (
      <Button
        variant="secondary"
        size="sm"
        onClick={() => router.push('/schools')}
        className="flex items-center gap-2"
      >
        <User className="w-4 h-4" />
        Sign In
      </Button>
    );
  }

  // Logged in - show user menu
  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[var(--hive-background-secondary)] transition-colors duration-200"
      >
        <Avatar size="sm">
          <AvatarImage src="" alt={session.email} />
          <AvatarFallback>{session.email[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-[var(--hive-text-primary)] hidden sm:block">
          {session.email.split('@')[0]}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--hive-text-secondary)] transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsDropdownOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-56 z-50 bg-[var(--hive-background-primary)] rounded-xl shadow-[var(--hive-shadow-level3)] border border-[var(--hive-border-default)] overflow-hidden">
            <div className="p-3 border-b border-[var(--hive-border-default)]">
              <p className="text-sm font-medium text-[var(--hive-text-primary)]">
                {session.email}
              </p>
              <p className="text-xs text-[var(--hive-text-secondary)] mt-1">
                {session.schoolId === 'test-university' ? 'Test University' : 'University at Buffalo'}
              </p>
            </div>

            <div className="p-1">
              <button
                onClick={handleNavigateToProfile}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--hive-background-secondary)] transition-colors duration-200 text-left"
              >
                <User className="w-4 h-4 text-[var(--hive-text-secondary)]" />
                <span className="text-sm text-[var(--hive-text-primary)]">
                  Profile
                </span>
              </button>

              <button
                onClick={handleNavigateToSettings}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--hive-background-secondary)] transition-colors duration-200 text-left"
              >
                <Settings className="w-4 h-4 text-[var(--hive-text-secondary)]" />
                <span className="text-sm text-[var(--hive-text-primary)]">
                  Settings
                </span>
              </button>

              <div className="border-t border-[var(--hive-border-default)] my-1" />

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--hive-status-error)]/10 transition-colors duration-200 text-left group"
              >
                <LogOut className="w-4 h-4 text-[var(--hive-text-secondary)] group-hover:text-[var(--hive-status-error)]" />
                <span className="text-sm text-[var(--hive-text-primary)] group-hover:text-[var(--hive-status-error)]">
                  Sign Out
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}