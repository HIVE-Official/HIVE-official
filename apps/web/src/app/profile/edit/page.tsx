"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileBentoGrid, Button } from '@hive/ui';
import { profileApiResponseToProfileSystem, type ProfileV2ApiResponse } from '@/components/profile/profile-adapter';
import type { ProfileSystem } from '@hive/core/types/profile-system';
import { useSession } from '@/hooks/use-session';
import { useToast } from '@/hooks/use-toast';

export default function EditProfilePage() {
  const router = useRouter();
  const { user: currentUser } = useSession();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState<ProfileV2ApiResponse | null>(null);
  const [profileSystem, setProfileSystem] = useState<ProfileSystem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser?.id) {
        router.push('/auth/login');
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/profile/v2?id=${currentUser.id}`, {
          credentials: 'include',
        });

        const json = await response.json();
        if (!response.ok || !json.success) {
          throw new Error(json.error || 'Failed to load profile');
        }

        const payload = json.data as ProfileV2ApiResponse;
        setProfileData(payload);
        setProfileSystem(profileApiResponseToProfileSystem(payload));
        setHasPendingChanges(false);
      } catch (err) {
        console.error('Failed to load profile for edit page', err);
        toast({
          title: 'Unable to load profile',
          description: 'Please refresh and try again.',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [currentUser?.id, router, toast]);

  const handleSaveLayout = async (layout: any) => {
    if (!profileSystem) return;
    try {
      setIsSaving(true);
      const response = await fetch('/api/profile/v2', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ grid: layout }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Failed to save layout');
      }

      setProfileSystem((prev) => (prev ? ({ ...prev, grid: layout } as ProfileSystem) : prev));
      setHasPendingChanges(false);
      toast({
        title: 'Profile layout saved',
        description: 'Your bento grid has been updated.',
        type: 'success',
      });
    } catch (err) {
      console.error('Failed to save profile layout', err);
      toast({
        title: 'Save failed',
        description: 'Please try again in a moment.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)] mx-auto mb-4"></div>
          <p className="text-white mb-2">Loading your profile…</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Sign In Required</h1>
          <p className="text-gray-400 mb-6">Please sign in to edit your profile</p>
          <Button onClick={() => router.push('/auth/login')} variant="default">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (!profileSystem || !profileData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Profile data unavailable</h1>
          <p className="text-gray-400 mb-6">We couldn’t load your profile settings.</p>
          <Button onClick={() => router.push('/feed')} variant="secondary">
            Go to Feed
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--hive-background-page,#07080d)] pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--hive-text-primary,#f7f7ff)]">Customize your profile</h1>
            <p className="text-sm text-[var(--hive-text-secondary,#c0c2cc)]">
              Drag tiles to personalize your bento grid. Students will see these changes immediately.
            </p>
          </div>
          <Button
            disabled={isSaving || !hasPendingChanges}
            onClick={() => handleSaveLayout((profileSystem as any).grid)}
          >
            {isSaving ? 'Saving…' : hasPendingChanges ? 'Save Layout' : 'Saved'}
          </Button>
        </div>

        <ProfileBentoGrid
          profile={profileSystem}
          editable
          onLayoutChange={(layout) => {
            setProfileSystem((prev) => (prev ? ({ ...prev, grid: layout } as ProfileSystem) : prev));
            setHasPendingChanges(true);
          }}
        />
      </div>
    </div>
  );
}
