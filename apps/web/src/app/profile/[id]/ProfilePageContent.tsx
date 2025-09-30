"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { ProfileViewLayout, specProfileToUIProfile } from '@hive/ui';
import type { PresenceStatus } from '@hive/ui';
import { ErrorBoundary } from '@/components/error-boundary';
import { useSession } from '@/hooks/use-session';
import { useProfileContext } from '@/components/profile/ProfileContextProvider';
import type { SpecCompliantProfile } from '@hive/core/domain/profile/spec-compliant-profile';
import { db } from '@hive/core';
import { doc, onSnapshot } from 'firebase/firestore';
import type { PresenceData } from '@hive/core';

export default function ProfilePageContent() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useSession();
  const profileId = params.id as string;

  // Get presence data from context for current user
  const { presenceStatus: ownPresenceStatus, isGhostMode } = useProfileContext();

  const [profile, setProfile] = useState<SpecCompliantProfile | null>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [spaces, setSpaces] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Profile owner's presence data
  const [profilePresenceStatus, setProfilePresenceStatus] = useState<PresenceStatus>('offline');
  const [profileLastSeen, setProfileLastSeen] = useState<Date | null>(null);

  // HiveLab-related state
  const [isSpaceLeader, setIsSpaceLeader] = useState(false);
  const [hasHiveLabAccess, setHasHiveLabAccess] = useState(false);
  const [toolsCreated, setToolsCreated] = useState(0);
  const [leadingSpaces, setLeadingSpaces] = useState<Array<{ id: string; name: string; memberCount: number }>>([]);

  // Subscribe to profile owner's presence
  useEffect(() => {
    if (!profileId || profileId === currentUser?.id) return;

    const presenceRef = doc(db, 'presence', profileId);
    const unsubscribe = onSnapshot(presenceRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as PresenceData;

        // Check if the user is in ghost mode
        if (data.isGhostMode) {
          setProfilePresenceStatus('offline');
        } else {
          setProfilePresenceStatus(data.status as PresenceStatus);
        }

        if (data.lastSeen) {
          setProfileLastSeen(data.lastSeen.toDate());
        }
      } else {
        setProfilePresenceStatus('offline');
      }
    });

    return () => unsubscribe();
  }, [profileId, currentUser?.id]);

  useEffect(() => {
    const loadPublicProfile = async () => {
      if (!profileId) return;

      try {
        setIsLoading(true);
        setError(null);

        // Check if viewing own profile - redirect to edit page
        const isOwnProfile = currentUser?.id === profileId;
        if (isOwnProfile) {
          router.push('/profile/edit');
          return;
        }

        // Load public profile via our SPEC-compliant API
        const response = await fetch(`/api/profile-v2/${profileId}`);

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

        // Set the SPEC-compliant profile
        setProfile(data.profile);

        // Load additional data for widgets
        setActivities(data.activities || []);
        setSpaces(data.spaces || []);
        setConnections(data.connections || []);

        // Set HiveLab access data
        setIsSpaceLeader(data.isSpaceLeader || false);
        setHasHiveLabAccess(data.hasHiveLabAccess || false);
        setToolsCreated(data.toolsCreated || 0);
        setLeadingSpaces(data.leadingSpaces || []);

        setIsLoading(false);

      } catch (err) {
        console.error('Failed to load public profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        setIsLoading(false);
      }
    };

    loadPublicProfile();
  }, [profileId, currentUser, router]);

  // Add presence status to connections
  const connectionsWithPresence = connections.map(conn => ({
    ...conn,
    // TODO: Subscribe to each connection's presence in real app
    presenceStatus: 'offline' as PresenceStatus,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30) // Mock: 30 mins ago
  }));

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)] mx-auto mb-4"></div>
          <p className="text-white mb-2">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Profile Not Available</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => router.push('/spaces/browse')}
            className="px-6 py-2 bg-[var(--hive-brand-primary)] text-black rounded-lg font-medium hover:bg-[var(--hive-brand-primary)]/90 transition-colors"
          >
            Browse Spaces Instead
          </button>
        </div>
      </div>
    );
  }

  // Profile not found
  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Profile Not Found</h1>
          <p className="text-gray-400 mb-6">This profile doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-[var(--hive-brand-primary)] text-black rounded-lg font-medium hover:bg-[var(--hive-brand-primary)]/90 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Convert to UI profile format for our components
  const uiProfile = specProfileToUIProfile(profile);

  return (
    <ErrorBoundary>
      <ProfileViewLayout
        profile={uiProfile}
        isOwnProfile={false}
        presenceStatus={profilePresenceStatus}
        lastSeen={profileLastSeen}
        activities={activities}
        spaces={spaces}
        connections={connectionsWithPresence}
        // HiveLab props
        isSpaceLeader={isSpaceLeader}
        hasHiveLabAccess={hasHiveLabAccess}
        toolsCreated={toolsCreated}
        leadingSpaces={leadingSpaces}
        onRequestHiveLabAccess={() => router.push('/spaces/create')}
        onOpenHiveLab={() => router.push('/tools')}
      />
    </ErrorBoundary>
  );
}