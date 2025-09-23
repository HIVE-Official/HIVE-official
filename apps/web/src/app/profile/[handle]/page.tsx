"use client";

/**
 * 🚀 UNIFIED PUBLIC PROFILE VIEW
 *
 * BEFORE: 226 lines with ad-hoc ProfileSystem transformation
 * AFTER: Clean implementation using ProfileContextProvider + API + @hive/ui
 *
 * Strategy: Public profile API + ProfileBentoGrid + Privacy controls
 */

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { ProfileBentoGrid, Card, Button } from '@hive/ui';
import { transformHiveProfileToProfileSystem } from '@/lib/profile-transformers';
import { ErrorBoundary } from '@/components/error-boundary';
import { useSession } from '@/hooks/use-session';
import type { HiveProfile } from '@hive/core';
// TODO: Export ProfileSystem from @hive/core main index
import type { ProfileSystem } from '../../../lib/profile-transformers';

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useSession();
  const handle = params.handle as string;

  const [hiveProfile, setHiveProfile] = useState<HiveProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transform HiveProfile to ProfileSystem for ProfileBentoGrid
  const profileSystem: ProfileSystem | null = hiveProfile
    ? transformHiveProfileToProfileSystem(hiveProfile)
    : null;

  useEffect(() => {
    const loadPublicProfile = async () => {
      if (!handle) return;

      try {
        setIsLoading(true);
        setError(null);

        // Check if viewing own profile - redirect to dashboard
        const isOwnProfile = currentUser?.handle === handle;
        if (isOwnProfile) {
          router.push('/profile');
          return;
        }

        // Load public profile via our new API endpoint
        const response = await fetch(`/api/profile/public/${handle}`);

        if (response.status === 404) {
          notFound();
          return;
        }

        if (response.status === 403) {
          setError('This profile is private');
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to load profile');
        }

        // API now returns HiveProfile format directly
        setHiveProfile(data.user);
        setIsLoading(false);

      } catch (err) {
        console.error('Failed to load public profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        setIsLoading(false);
      }
    };

    loadPublicProfile();
  }, [handle, currentUser, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hive-gold mx-auto mb-4"></div>
          <p className="text-white mb-2">Loading profile...</p>
          <p className="text-hive-text-secondary text-sm">@{handle}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <Card className="max-w-md p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
              {error === 'This profile is private' ? 'Private Profile' : 'Profile Not Found'}
            </h2>
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <Button onClick={() => router.back()} variant="default">
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // No profile data
  if (!profileSystem) {
    return (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <Card className="max-w-md p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Profile Not Available</h2>
            <p className="text-gray-400 text-sm mb-4">Unable to load profile data</p>
            <Button onClick={() => router.back()} variant="default">
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-hive-background-primary">
        {/* Profile Header */}
        <div className="bg-hive-background-overlay border-b border-hive-border-default px-6 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {hiveProfile?.identity?.fullName || 'Anonymous'}
                </h1>
                <p className="text-hive-text-secondary">@{hiveProfile?.identity?.handle || handle}</p>
              </div>

              {/* Connect/Message buttons could go here in future */}
              <div className="flex items-center space-x-3">
                {hiveProfile?.privacy.allowDirectMessages && (
                  <Button variant="outline" size="sm">
                    Message
                  </Button>
                )}
                <Button variant="default" size="sm">
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ProfileBentoGrid - Unified @hive/ui Experience */}
        <div className="max-w-6xl mx-auto">
          <ProfileBentoGrid
            profile={profileSystem}
            editable={false}
            className="p-6"
          />
        </div>

        {/* Privacy Notice for Ghost Mode */}
        {hiveProfile?.privacy?.ghostMode && (
          <div className="max-w-6xl mx-auto px-6 pb-6">
            <Card className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
              <div className="flex items-center space-x-3">
                <div className="text-amber-400">🛡️</div>
                <div>
                  <p className="text-sm text-white font-medium">Limited Profile View</p>
                  <p className="text-xs text-amber-200">
                    This user has privacy settings enabled. Some information may be hidden.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}