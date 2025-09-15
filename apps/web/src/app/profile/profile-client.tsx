"use client";

import { useUnifiedAuth } from "@hive/ui";
import { AppLayout } from "@/components/layout/AppLayout";
import { BentoProfileDashboard } from "@hive/ui";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ProfileData {
  uid: string;
  email: string;
  fullName: string;
  handle?: string;
  avatarUrl?: string;
  onboardingCompleted: boolean;
  role: string;
  academicLevel: string;
  majors: string[];
  graduationYear: number;
  interests: string[];
  isStudentLeader: boolean;
  createdAt: string;
  updatedAt: string;
}

export function ProfileClient() {
  const { user, isLoading } = useUnifiedAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
      try {
        const response = await fetch('/api/profile/me');
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        setProfile(data.profile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setProfileLoading(false);
      }
    }

    if (user && !isLoading) {
      fetchProfile();
    }
  }, [user, isLoading]);

  if (isLoading || profileLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
          <div className="flex items-center gap-3 text-[var(--hive-brand-secondary)]">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-medium">Loading your profile...</span>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!user || !profile) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Profile Not Found</h2>
            <p className="text-muted">
              {error ? `Error: ${error}` : "Unable to load your profile information."}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[var(--hive-brand-secondary)] text-[var(--hive-text-primary)] rounded-lg font-medium text-sm hover:bg-[var(--hive-brand-secondary)]/90 transition-colors duration-180"
            >
              Try Again
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-[var(--hive-background-primary)]">
        <main className="container mx-auto px-4 py-8">
          <BentoProfileDashboard 
            user={{
              fullName: profile.fullName || "HIVE User",
              handle: profile.handle || profile.uid?.slice(0, 8) || "user",
              avatarUrl: profile.avatarUrl,
              major: profile.majors?.[0] || "Undeclared",
              graduationYear: profile.graduationYear,
              isBuilder: (user.customClaims?.isBuilder as boolean) || false,
              builderAchievements: {
                toolsCreated: 0,
                totalEngagement: 0
              }
            }}
          />
        </main>
      </div>
    </AppLayout>
  );
}