"use client";

/**
 * SPEC-COMPLIANT PROFILE EDIT PAGE
 *
 * Per SPEC.md:
 * - NO HANDLE DISPLAY: Handles are backend only
 * - CAMPUS ISOLATION: All data filtered by campusId: 'ub-buffalo'
 * - PRIVACY WIDGETS: Per-widget privacy controls
 * - 70% COMPLETION: Behavioral psychology hooks
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileViewLayout, specProfileToUIProfile } from "@hive/ui";
import { useSession } from '@/hooks/use-session';
import { useToast } from '@/hooks/use-toast';
import type { SpecCompliantProfile } from '@hive/core';

export default function EditProfilePage() {
  const router = useRouter();
  const { user: currentUser } = useSession();
  const { toast } = useToast();

  const [profile, setProfile] = useState<SpecCompliantProfile | null>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [spaces, setSpaces] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // HiveLab-related state
  const [isSpaceLeader, setIsSpaceLeader] = useState(false);
  const [hasHiveLabAccess, setHasHiveLabAccess] = useState(false);
  const [toolsCreated, setToolsCreated] = useState(0);
  const [leadingSpaces, setLeadingSpaces] = useState<Array<{ id: string; name: string; memberCount: number }>>([]);

  useEffect(() => {
    const loadOwnProfile = async () => {
      if (!currentUser?.id) {
        router.push('/auth/login');
        return;
      }

      try {
        setIsLoading(true);

        // Load own profile via SPEC-compliant API
        const response = await fetch('/api/profile-v2', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to load profile');
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to load profile');
        }

        setProfile(data.profile);
        setActivities(data.activities || []);
        setSpaces(data.spaces || []);
        setConnections(data.connections || []);

        // Set HiveLab access data
        // SPEC: Space Leaders ONLY get build access
        setIsSpaceLeader(data.isSpaceLeader || false);
        setHasHiveLabAccess(data.hasHiveLabAccess || false);
        setToolsCreated(data.toolsCreated || 0);
        setLeadingSpaces(data.leadingSpaces || []);
        setIsLoading(false);

      } catch (err) {
        console.error('Failed to load profile:', err);
        toast({
          title: 'Error',
          description: 'Failed to load your profile',
          variant: 'destructive'
        });
        setIsLoading(false);
      }
    };

    loadOwnProfile();
  }, [currentUser, router, toast]);

  const handleEditPhoto = () => {
    // TODO: Implement photo upload modal
    toast({
      title: 'Coming Soon',
      description: 'Photo upload will be available soon',
      type: 'info'
    });
  };

  const handlePrivacyChange = async (widget: string, level: 'public' | 'connections' | 'private') => {
    if (!profile) return;

    try {
      setIsSaving(true);

      // Map widget and level to privacy settings
      const privacyUpdate: any = {};
      if (widget === 'email') {
        privacyUpdate.showEmail = level !== 'private';
      } else if (widget === 'schedule') {
        privacyUpdate.showSchedule = level !== 'private';
      } else if (widget === 'profile') {
        privacyUpdate.profileVisibility = level === 'public' ? 'public' : level === 'connections' ? 'connections' : 'private';
      }

      const response = await fetch('/api/profile-v2', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          privacy: {
            ...profile.privacy,
            ...privacyUpdate
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update privacy settings');
      }

      const data = await response.json();
      setProfile(data.profile);

      toast({
        title: 'Privacy Updated',
        description: `${widget} visibility set to ${level}`,
        type: 'success'
      });

    } catch (err) {
      console.error('Failed to update privacy:', err);
      toast({
        title: 'Error',
        description: 'Failed to update privacy settings',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleStepClick = async (stepId: string) => {
    // Navigate to appropriate section for completing profile
    switch (stepId) {
      case 'avatar':
        handleEditPhoto();
        break;
      case 'bio':
        // TODO: Open bio edit modal
        break;
      case 'academic':
        // TODO: Open academic info modal
        break;
      case 'housing':
        // TODO: Open housing selection
        break;
      case 'interests':
        // TODO: Open interests picker
        break;
      case 'spaces':
        router.push('/spaces/browse');
        break;
      default:
        break;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)] mx-auto mb-4"></div>
          <p className="text-white mb-2">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Sign In Required</h1>
          <p className="text-gray-400 mb-6">Please sign in to edit your profile</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-6 py-2 bg-[var(--hive-brand-primary)] text-black rounded-lg font-medium hover:bg-[var(--hive-brand-primary)]/90 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // No profile data
  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Profile Setup Required</h1>
          <p className="text-gray-400 mb-6">Let's set up your profile first</p>
          <button
            onClick={() => router.push('/onboarding')}
            className="px-6 py-2 bg-[var(--hive-brand-primary)] text-black rounded-lg font-medium hover:bg-[var(--hive-brand-primary)]/90 transition-colors"
          >
            Complete Setup
          </button>
        </div>
      </div>
    );
  }

  // Convert to UI profile format for our components
  const uiProfile = specProfileToUIProfile(profile);

  return (
    <ProfileViewLayout
      profile={uiProfile}
      isOwnProfile={true}
      activities={activities}
      spaces={spaces}
      connections={connections}
      onEditPhoto={handleEditPhoto}
      onPrivacyChange={handlePrivacyChange}
      onStepClick={handleStepClick}
      // HiveLab props
      isSpaceLeader={isSpaceLeader}
      hasHiveLabAccess={hasHiveLabAccess}
      toolsCreated={toolsCreated}
      leadingSpaces={leadingSpaces}
      onRequestHiveLabAccess={() => router.push('/spaces/create')}
      onOpenHiveLab={() => router.push('/tools')}
    />
  );
}