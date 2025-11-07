"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { ErrorBoundary } from '@/components/error-boundary';
import { useSession } from '@/hooks/use-session';
import { ProfileBentoGrid, Button, Avatar, AvatarImage, AvatarFallback, Badge } from '@hive/ui';
import { profileApiResponseToProfileSystem, type ProfileV2ApiResponse } from '@/components/profile/profile-adapter';
import type { ProfileSystem } from '@hive/core/types/profile-system';
import type { PresenceData } from '@hive/core';
import { db } from '@hive/core';
import { doc, onSnapshot } from 'firebase/firestore';
import { Users, Sparkles, Zap, Flame } from 'lucide-react';

const formatRelativeTime = (iso?: string | null) => {
  if (!iso) return 'Just now';
  const date = new Date(iso);
  const diff = Date.now() - date.getTime();
  if (Number.isNaN(diff)) return 'Just now';
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

const presenceLabel = (status?: string, lastSeen?: string | null) => {
  switch (status) {
    case 'online':
      return 'Online now';
    case 'away':
      return 'Away';
    default:
      return lastSeen ? `Last seen ${formatRelativeTime(lastSeen)}` : 'Offline';
  }
};

export default function ProfilePageContent() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useSession();
  const profileId = params.id as string;

  const [profileData, setProfileData] = useState<ProfileV2ApiResponse | null>(null);
  const [profileSystem, setProfileSystem] = useState<ProfileSystem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadProfile = async () => {
      if (!profileId) return;

      try {
        setIsLoading(true);
        setError(null);

        if (currentUser?.id === profileId) {
          router.replace('/profile/edit');
          return;
        }

        const response = await fetch(`/api/profile/v2?id=${profileId}`, {
          credentials: 'include',
        });

        if (response.status === 404) {
          notFound();
          return;
        }

        if (response.status === 403) {
          setError('This profile is private');
          setIsLoading(false);
          return;
        }

        const json = await response.json();
        if (!json.success) {
          throw new Error(json.error || 'Failed to load profile');
        }

        if (cancelled) return;

        const payload = json.data as ProfileV2ApiResponse;
        setProfileData(payload);
        setProfileSystem(profileApiResponseToProfileSystem(payload));
        setIsLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error('Failed to load profile v2', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        setIsLoading(false);
      }
    };

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [profileId, currentUser?.id, router]);

  useEffect(() => {
    if (!profileId || !profileData || profileData.viewer.isOwnProfile) return;

    const presenceRef = doc(db, 'presence', profileId);
    const unsubscribe = onSnapshot(presenceRef, (snapshot) => {
      const presence = snapshot.exists() ? (snapshot.data() as PresenceData) : null;
      setProfileData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          profile: {
            ...prev.profile,
            presence: {
              status: presence?.isGhostMode ? 'offline' : presence?.status ?? 'offline',
              lastSeen: presence?.lastSeen ? presence.lastSeen.toDate().toISOString() : prev.profile.presence?.lastSeen ?? null,
              isGhostMode: presence?.isGhostMode ?? prev.profile.presence?.isGhostMode ?? false,
            },
          },
        };
      });
    });

    return () => unsubscribe();
  }, [profileId, profileData?.viewer?.isOwnProfile]);

  useEffect(() => {
    if (!profileData) return;
    setProfileSystem(profileApiResponseToProfileSystem(profileData));
  }, [profileData]);

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

  if (!profileData || !profileSystem) {
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

  const stats = profileData.stats ?? {};
  const statItems = useMemo(
    () => [
      { label: 'Spaces', value: stats.spacesJoined ?? profileData.spaces.length ?? 0, icon: Users },
      { label: 'Friends', value: stats.friends ?? profileData.connections.filter((c) => c.isFriend).length ?? 0, icon: Sparkles },
      { label: 'Tools', value: stats.toolsCreated ?? 0, icon: Zap },
      { label: 'Streak', value: stats.currentStreak ?? 0, icon: Flame },
    ],
    [stats, profileData.spaces, profileData.connections],
  );

  const presenceStatus = profileData.profile.presence?.status;
  const presenceText = presenceLabel(presenceStatus, profileData.profile.presence?.lastSeen ?? null);
  const initials = useMemo(() => {
    return profileData.profile.fullName
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'UB';
  }, [profileData.profile.fullName]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[var(--hive-background-page,#07080d)] text-[var(--hive-text-primary,#f7f7ff)] pb-16">
        <section className="bg-[radial-gradient(circle_at_top,rgba(66,56,140,0.45),transparent)]">
          <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 shadow-[0_0_0_3px_rgba(250,204,21,0.35)]">
                    <AvatarImage src={profileData.profile.avatarUrl ?? undefined} alt={profileData.profile.fullName} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-3xl font-semibold tracking-tight text-[var(--hive-text-primary,#f7f7ff)]">
                        {profileData.profile.fullName}
                      </h1>
                      <Badge variant="primary">
                        {profileData.profile.campusId.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    {profileData.profile.pronouns ? (
                      <p className="text-sm text-[var(--hive-text-secondary,#c0c2cc)]">
                        {profileData.profile.pronouns}
                      </p>
                    ) : null}
                    <p className="text-sm text-[var(--hive-text-secondary,#c0c2cc)]">
                      {profileData.profile.major || 'Campus builder'}
                    </p>
                  </div>
                </div>
                <p className="max-w-2xl text-sm text-[var(--hive-text-secondary,#c0c2cc)]">
                  {profileData.profile.bio || 'UB student building the next wave of campus experiences.'}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--hive-text-muted,#9396aa) 85%,transparent)]">
                  <span>{presenceText}</span>
                  <span aria-hidden>•</span>
                  <span>{stats.spacesJoined ?? profileData.spaces.length ?? 0} spaces active</span>
                  <span aria-hidden>•</span>
                  <span>{stats.friends ?? profileData.connections.filter((c) => c.isFriend).length ?? 0} close friends</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="rounded-full">
                  Message
                </Button>
                <Button variant="default" className="rounded-full">
                  Connect
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statItems.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-3xl border border-[color-mix(in_srgb,var(--hive-border-default,#292c3c) 65%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#0f1019) 88%,transparent)] px-5 py-4 shadow-[0_18px_36px_rgba(8,9,16,0.45)] backdrop-blur-lg"
                >
                  <div className="flex items-center justify-between text-[var(--hive-text-secondary,#c0c2cc)]">
                    <span className="text-xs uppercase tracking-[0.24em]">{label}</span>
                    <Icon className="h-4 w-4 text-[var(--hive-brand-primary,#facc15)]" aria-hidden />
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-[var(--hive-text-primary,#f7f7ff)]">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto mt-10 w-full max-w-6xl px-4">
          <ProfileBentoGrid profile={profileSystem} editable={false} />
        </div>

        {profileData.spaces.length > 0 ? (
          <section className="mx-auto mt-14 w-full max-w-6xl px-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--hive-text-primary,#f7f7ff)]">Spaces</h2>
              <Button variant="ghost" size="sm" className="text-[var(--hive-text-secondary,#c0c2cc)]">
                View all
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {profileData.spaces.slice(0, 4).map((space) => (
                <div
                  key={space.id}
                  className="rounded-3xl border border-[color-mix(in_srgb,var(--hive-border-default,#292c3c) 45%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(15,16,25,0.95)) 88%,transparent)] p-5"
                >
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium text-[var(--hive-text-primary,#f7f7ff)]">{space.name}</div>
                    <span className="rounded-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 12%,transparent)] px-3 py-1 text-xs text-[var(--hive-brand-primary,#facc15)]">
                      {space.role}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[var(--hive-text-secondary,#c0c2cc)]">
                    {space.headline || 'Student-led experiences across UB.'}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-[color-mix(in_srgb,var(--hive-text-muted,#9396aa) 82%,transparent)]">
                    <span className="text-xs uppercase tracking-[0.28em]">{space.memberCount} members</span>
                    <span className="text-xs uppercase tracking-[0.28em]">Active {formatRelativeTime(space.lastActivityAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {profileData.connections.length > 0 ? (
          <section className="mx-auto mt-14 w-full max-w-6xl px-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--hive-text-primary,#f7f7ff)]">Connections</h2>
              <span className="text-sm text-[var(--hive-text-secondary,#c0c2cc)]">
                {profileData.connections.length} total
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {profileData.connections.slice(0, 6).map((connection) => (
                <div
                  key={connection.id}
                  className="rounded-3xl border border-[color-mix(in_srgb,var(--hive-border-default,#292c3c) 45%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(13,14,22,0.96)) 88%,transparent)] p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 18%,transparent)] text-sm font-semibold text-[var(--hive-background-primary,#090a14)]">
                      {connection.name
                        .split(' ')
                        .filter(Boolean)
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[var(--hive-text-primary,#f7f7ff)]">
                        {connection.name}
                      </div>
                      <div className="text-xs text-[var(--hive-text-secondary,#c0c2cc)]">
                        {connection.sharedSpaces?.length || 0} shared spaces
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </ErrorBoundary>
  );
}
