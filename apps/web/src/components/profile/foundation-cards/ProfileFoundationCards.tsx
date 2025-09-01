"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@hive/ui';
import { IdentityCard } from './IdentityCard';
import { CampusConnectionCard } from './CampusConnectionCard';
import { ProfileStrengthCard } from './ProfileStrengthCard';
import { useSession } from '@/hooks/use-session';
// Firebase imports - will fallback to API if not available
let db: any;
let doc: any;
let onSnapshot: any;
let collection: any;
let query: any;
let where: any;
let orderBy: any;

try {
  const firebaseClient = require('@/lib/firebase-client');
  const firestore = require('firebase/firestore');
  
  db = firebaseClient.db;
  doc = firestore.doc;
  onSnapshot = firestore.onSnapshot;
  collection = firestore.collection;
  query = firestore.query;
  where = firestore.where;
  orderBy = firestore.orderBy;
} catch (error) {
  console.warn('Firebase client not available, falling back to API mode');
}

interface ProfileData {
  // Basic profile info
  id: string;
  fullName?: string;
  handle?: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  major?: string;
  graduationYear?: number;
  onboardingCompleted: boolean;
  // Completion tracking
  completedFields: string[];
  completionPercentage: number;
}

interface SpaceMembership {
  spaceId: string;
  spaceName: string;
  spaceType: string;
  memberCount: number;
  role: 'member' | 'moderator' | 'admin' | 'builder';
  status: 'active' | 'inactive' | 'pending';
  activityLevel: 'high' | 'medium' | 'low';
  recentActivity: {
    posts: number;
    interactions: number;
    timeSpent: number;
  };
}

interface CardUnlockStatus {
  identity: boolean; // Always unlocked
  campusConnection: boolean; // Unlocked after basic profile completion
  profileStrength: boolean; // Always unlocked
  // Future cards will be added here
}

export function ProfileFoundationCards() {
  const { user } = useSession();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [spaces, setSpaces] = useState<SpaceMembership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unlockStatus, setUnlockStatus] = useState<CardUnlockStatus>({
    identity: true,
    campusConnection: false,
    profileStrength: true
  });

  // Set up real-time Firebase listeners or fallback to API
  useEffect(() => {
    if (!user) return;
    
    // Check if Firebase is available for real-time updates
    if (db && doc && onSnapshot && collection && query && where && orderBy) {
      // Firebase subscription cleanup functions will be created below
      
      // Real-time profile listener
      const profileDocRef = doc(db, 'users', user.uid);
      const unsubscribeProfile = onSnapshot(profileDocRef, (doc) => {
        if (doc.exists()) {
          const profileData = { id: doc.id, ...doc.data() };
          
          // Calculate completion
          const requiredFields = ['fullName', 'handle', 'bio', 'major', 'avatarUrl'];
          const completedFields = requiredFields.filter(field => profileData[field as keyof typeof profileData]);
          const completionPercentage = Math.round((completedFields.length / requiredFields.length) * 100);
          
          setProfile({
            ...profileData,
            completedFields,
            completionPercentage
          } as ProfileData);
        }
        setIsLoading(false);
      }, (error) => {
        console.error('Error fetching profile:', error);
        // Fallback to API call
        fetchProfileData();
      });
      
      // Real-time spaces listener  
      const spacesQuery = query(
        collection(db, 'members'),
        where('userId', '==', user.uid),
        orderBy('lastActivity', 'desc')
      );
      
      const unsubscribeSpaces = onSnapshot(spacesQuery, async (snapshot) => {
        const memberships = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Transform to expected format - in a real app, you'd want to join with spaces collection
        const spaceMemberships: SpaceMembership[] = memberships.map(membership => ({
          spaceId: membership.spaceId || membership.id,
          spaceName: membership.spaceName || 'Loading...',
          spaceType: membership.spaceType || 'community',
          memberCount: membership.memberCount || 0,
          role: membership.role || 'member',
          status: membership.status || 'active',
          activityLevel: membership.activityLevel || 'medium',
          recentActivity: membership.recentActivity || {
            posts: 0,
            interactions: 0,
            timeSpent: 0
          }
        }));
        
        setSpaces(spaceMemberships);
        setIsLoading(false);
      }, (error) => {
        console.error('Error fetching spaces:', error);
        // Fallback to API call
        fetchSpaceData();
      });
      
      return () => {
        unsubscribeProfile?.();
        unsubscribeSpaces?.();
      };
    } else {
      // Firebase not available, use API calls directly
      console.log('Using API mode for profile data');
      fetchProfileData();
      fetchSpaceData();
    }
  }, [user]);

  // Update unlock status based on profile completion
  useEffect(() => {
    if (!profile) return;

    const hasBasicInfo = profile.fullName && profile.handle && profile.bio;
    
    setUnlockStatus(prev => ({
      ...prev,
      campusConnection: hasBasicInfo || spaces.length > 0
    }));
  }, [profile, spaces]);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/profile/me');
      if (response.ok) {
        const data = await response.json();
        
        // Calculate completion
        const requiredFields = ['fullName', 'handle', 'bio', 'major', 'avatarUrl'];
        const completedFields = requiredFields.filter(field => data.profile[field]);
        const completionPercentage = Math.round((completedFields.length / requiredFields.length) * 100);
        
        setProfile({
          ...data.profile,
          completedFields,
          completionPercentage
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSpaceData = async () => {
    try {
      const response = await fetch('/api/profile/spaces?includeActivity=true&timeRange=week');
      if (response.ok) {
        const data = await response.json();
        setSpaces(data.memberships || []);
      }
    } catch (error) {
      console.error('Error fetching spaces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = useCallback(async (updatedProfile: Partial<ProfileData>) => {
    // Optimistically update local state
    setProfile(prev => prev ? { ...prev, ...updatedProfile } : null);
    
    // Send update to API
    if (user) {
      try {
        const response = await fetch('/api/profile/me', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProfile)
        });
        
        if (!response.ok) {
          console.error('Failed to update profile');
          // Revert optimistic update on failure
          fetchProfileData();
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        fetchProfileData();
      }
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium mb-2">Please sign in</div>
          <div className="text-sm text-muted-foreground">Sign in to view your profile</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-20 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Campus Command Center</h1>
              <p className="text-sm text-muted-foreground">
                Your personalized dashboard for campus life
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Profile Strength</div>
              <div className="text-lg font-semibold text-accent">
                {profile?.completionPercentage || 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid - Tinder-style on mobile, grid on desktop */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
          {/* Foundation Card 1: Identity (Always Visible) */}
          <IdentityCard 
            profile={profile}
            onUpdate={handleProfileUpdate}
            isUnlocked={unlockStatus.identity}
          />

          {/* Foundation Card 2: Campus Connection (Unlocks with basic info) */}
          <CampusConnectionCard
            spaces={spaces}
            totalSpaces={spaces.length}
            activeSpaces={spaces.filter(s => s.activityLevel !== 'low').length}
            isUnlocked={unlockStatus.campusConnection}
            onUnlock={() => setUnlockStatus(prev => ({ ...prev, campusConnection: true }))}
          />

          {/* Foundation Card 3: Profile Strength (Always Visible) */}
          <ProfileStrengthCard
            completionPercentage={profile?.completionPercentage || 0}
            completedFields={profile?.completedFields || []}
            nextSteps={getNextSteps(profile)}
            isUnlocked={unlockStatus.profileStrength}
          />
        </div>
      </div>
    </div>
  );
}

// Helper function to determine next steps for profile completion
function getNextSteps(profile: ProfileData | null): string[] {
  if (!profile) return ['Complete your profile setup'];
  
  const steps: string[] = [];
  
  if (!profile.fullName) steps.push('Add your full name');
  if (!profile.handle) steps.push('Choose your handle');
  if (!profile.bio) steps.push('Write a short bio');
  if (!profile.major) steps.push('Add your major');
  if (!profile.avatarUrl) steps.push('Upload a profile photo');
  
  if (steps.length === 0) {
    steps.push('Join your first space', 'Connect with classmates', 'Explore campus tools');
  }
  
  return steps.slice(0, 3); // Show max 3 next steps
}