"use client";

import React from 'react';
import { ProfileFoundationCards } from '@/components/profile/foundation-cards/ProfileFoundationCards';

// Mock user session for development testing
const mockSession = {
  user: {
    uid: 'dev-user',
    email: 'dev@test.edu',
    displayName: 'Development User'
  }
};

// Create a mock useSession hook
const mockUseSession = () => mockSession;

// Mock API responses for development
const mockApiResponses = () => {
  // Mock fetch globally for this component
  const originalFetch = global.fetch;
  
  global.fetch = ((url: string) => {
    console.log('Mocking API call to:', url);
    
    if (url.includes('/api/profile/me')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          profile: {
            id: 'dev-user',
            fullName: 'Development User',
            handle: 'dev-user',
            email: 'dev@test.edu',
            bio: 'Testing the HIVE profile slice components with mock data.',
            major: 'Computer Science',
            graduationYear: 2025,
            avatarUrl: '',
            onboardingCompleted: true,
          }
        })
      });
    }
    
    if (url.includes('/api/profile/spaces')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          memberships: [
            {
              spaceId: 'cs-study-group',
              spaceName: 'CS Study Group',
              spaceType: 'academic',
              memberCount: 45,
              role: 'member',
              status: 'active',
              activityLevel: 'high',
              recentActivity: {
                posts: 8,
                interactions: 15,
                timeSpent: 120
              }
            },
            {
              spaceId: 'ub-dorm-floor',
              spaceName: 'Dorm Floor 3B',
              spaceType: 'housing',
              memberCount: 23,
              role: 'member', 
              status: 'active',
              activityLevel: 'medium',
              recentActivity: {
                posts: 3,
                interactions: 7,
                timeSpent: 45
              }
            }
          ]
        })
      });
    }
    
    // Fallback to original fetch for other URLs
    return originalFetch(url);
  });
  
  return () => {
    global.fetch = originalFetch;
  };
};

// Component that sets up mocks and renders ProfileFoundationCards
function ProfileFoundationCardsWithMocks() {
  React.useEffect(() => {
    const cleanup = mockApiResponses();
    return cleanup;
  }, []);
  
  // Mock the useSession hook for this component tree
  const mockUseSessionHook = React.useCallback(() => mockSession, []);
  
  return <ProfileFoundationCards />;
}

export default function ProfileDevPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-accent">🚧 Profile Development Mode</h1>
              <p className="text-sm text-muted-foreground">
                Testing profile components without full authentication
              </p>
            </div>
            <div className="text-right">
              <a href="/debug-auth?returnTo=/profile" className="text-sm text-accent hover:underline">
                Switch to Debug Auth →
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
          <p className="text-yellow-200 text-sm">
            <strong>Development Note:</strong> This page uses mock data to test profile components. 
            For full functionality with real Firebase data, use the debug auth system.
          </p>
        </div>
        
        <ProfileFoundationCardsWithMocks />
      </div>
    </div>
  );
}