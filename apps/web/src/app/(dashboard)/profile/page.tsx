"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useHiveProfile } from '../../../hooks/use-hive-profile';
import { ProfileErrorBoundaryEnhanced } from '../../../components/profile/profile-error-boundary-enhanced';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@/lib/logger';

// Dynamic import for massive profile system - reduces main bundle by ~2MB
const CompleteHIVEProfileSystem = dynamic(
  () => import("@hive/ui").then(mod => ({ default: mod.CompleteHIVEProfileSystem })),
  {
    loading: () => (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hive-gold mx-auto mb-4"></div>
          <p className="text-hive-text-secondary">Loading profile dashboard...</p>
        </div>
      </div>
    ),
    ssr: false
  }
);

export default function HiveProfilePage() {
  const router = useRouter();
  
  // Use our centralized profile hook
  const {
    profile,
    isLoading,
    error,
    clearError,
    uploadAvatar
  } = useHiveProfile();

  // Transform profile data for CompleteHIVEProfileSystem
  const user = useMemo(() => {
    if (!profile) return null;
    
    return {
      id: profile.identity.id,
      name: profile.identity.fullName || '',
      handle: profile.identity.handle || '',
      email: profile.identity.email || '',
      avatar: profile.identity.avatarUrl,
      bio: profile.personal.bio,
      location: profile.personal.location || profile.academic.housing,
      school: profile.academic.schoolId,
      major: profile.academic.major,
      year: profile.academic.graduationYear?.toString(),
      joinedAt: profile.timestamps.createdAt,
      status: 'online' as const,
      isOnline: true,
      isBuilder: profile.builder?.isBuilder || false,
      statusMessage: profile.personal.statusMessage || '',
      memberSince: profile.timestamps.createdAt
    };
  }, [profile]);

  // Calculate profile completeness
  const completeness = useMemo(() => {
    if (!profile) return null;
    
    let completed = 0;
    const total = 7;
    
    if (profile.identity.fullName) completed++;
    if (profile.identity.handle) completed++;
    if (profile.identity.avatarUrl) completed++;
    if (profile.personal.bio) completed++;
    if (profile.academic.major) completed++;
    if (profile.academic.graduationYear) completed++;
    if (profile.personal.location || profile.academic.housing) completed++;
    
    return {
      percentage: Math.round((completed / total) * 100),
      completed,
      total
    };
  }, [profile]);

  // Essential event handlers
  const handleEditModeToggle = () => router.push('/profile/edit');
  
  const handleAvatarUpload = async (file: File) => {
    try {
      await uploadAvatar(file);
    } catch (error) {
      logger.error('Failed to upload avatar', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hive-gold mx-auto mb-4"></div>
          <p className="text-hive-text-secondary">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-400 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-hive-text-primary mb-2">Profile Error</h2>
          <p className="text-hive-text-secondary mb-4">{error}</p>
          <button 
            onClick={clearError}
            className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hive-background-primary">
      <ProfileErrorBoundaryEnhanced 
        fallbackTitle="Profile Dashboard Error"
        showLogout={true}
        onRetry={() => window.location.reload()}
      >

        {/* Complete HIVE Profile System - Production Ready with Dynamic Loading */}
        {user && (
          <Suspense fallback={
            <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hive-gold mx-auto mb-4"></div>
                <p className="text-hive-text-secondary">Loading profile dashboard...</p>
              </div>
            </div>
          }>
            <CompleteHIVEProfileSystem
              user={user}
              loading={isLoading}
              onEditModeToggle={handleEditModeToggle}
              onUploadAvatar={handleAvatarUpload}
              completeness={completeness}
              onWidgetConfigure={(widgetId) => logger.debug('Configure widget', { widgetId })}
            />
          </Suspense>
        )}
      </ProfileErrorBoundaryEnhanced>
    </div>
  );
}