"use client";

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { ProfileBentoGrid, Card, Button } from '@hive/ui';
import { toUnifiedProfile, toProfileSystem } from '@/lib/profile-transformers';
import { ErrorBoundary } from '@/components/error-boundary';
import { useSession } from '@/hooks/use-session';
import type { HiveProfile, UnifiedHiveProfile, ProfileSystem } from '@hive/core';

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useSession();
  const handle = params.handle as string;

  const [unifiedProfile, setUnifiedProfile] = useState<UnifiedHiveProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transform UnifiedProfile to ProfileSystem for ProfileBentoGrid
  const profileSystem: ProfileSystem | null = unifiedProfile
    ? toProfileSystem(unifiedProfile)
    : null;

  useEffect(() => {
    const loadPublicProfile = async () => {
      if (!handle) return;

      try {
        setIsLoading(true);
        setError(null);

        // Check if viewing own profile - redirect to settings for editing
        const isOwnProfile = currentUser?.handle === handle;
        if (isOwnProfile) {
          // Own profile - show with edit capabilities
          router.push('/settings');
          return;
        }

        // Load public profile
        const response = await fetch(`/api/profile/public/${handle}`);

        if (response.status === 404) {
          notFound();
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to load profile');
        }

        const data = await response.json();
        // Convert HiveProfile to UnifiedHiveProfile
        const unified = toUnifiedProfile(data.profile || data);
        setUnifiedProfile(unified);

      } catch (err) {
        console.error('Error loading public profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    loadPublicProfile();
  }, [handle, currentUser, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)] mx-auto mb-4" />
          <p className="text-white/70">Loading @{handle}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center bg-gray-900 border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Profile Not Found</h2>
          <p className="text-gray-400 mb-6">
            The profile @{handle} could not be found or is not available.
          </p>
          <Button onClick={() => router.push('/')} variant="default">
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  if (!profileSystem) {
    notFound();
    return null;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* Profile Header with @handle */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              @{handle}
            </h1>
            <p className="text-[var(--hive-brand-primary)] text-lg">
              {unifiedProfile?.identity?.displayName || handle}
            </p>
          </div>

          {/* Main Profile Content */}
          <ProfileBentoGrid
            profile={profileSystem}
            editable={false}
            onLayoutChange={() => {}} // No-op for public view
          />

          {/* Social Actions */}
          <div className="mt-8 flex justify-center gap-4">
            <Button
              variant="default"
              className="bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
            >
              Follow
            </Button>
            <Button variant="outline">
              Message
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}