"use client";

import React from 'react';
import { Card } from '@hive/ui';
import { IdentityCard } from './IdentityCard';
import { CampusConnectionCard } from './CampusConnectionCard';
import { ProfileStrengthCard } from './ProfileStrengthCard';
import { useSession } from '@/hooks/use-session';
import { useProfileModern } from '@hive/hooks';

export function ProfileFoundationCards() {
  const { user } = useSession();
  
  // Modern hook replaces all useState/useEffect logic
  const {
    profile,
    spaces,
    unlocks,
    loading,
    errors,
    completionPercentage,
    nextSteps,
    updateProfile,
  } = useProfileModern();

  const isLoading = loading.profile || loading.spaces;

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
                {completionPercentage}%
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
            onUpdate={updateProfile}
            isUnlocked={unlocks.identity}
          />

          {/* Foundation Card 2: Campus Connection (Unlocks with basic info) */}
          <CampusConnectionCard
            spaces={spaces}
            totalSpaces={spaces.length}
            activeSpaces={spaces.filter(s => s.activityLevel !== 'low').length}
            isUnlocked={unlocks.campusConnection}
          />

          {/* Foundation Card 3: Profile Strength (Always Visible) */}
          <ProfileStrengthCard
            completionPercentage={completionPercentage}
            completedFields={profile?.completedFields || []}
            nextSteps={nextSteps}
            isUnlocked={unlocks.profileStrength}
          />
        </div>
      </div>
    </div>
  );
}