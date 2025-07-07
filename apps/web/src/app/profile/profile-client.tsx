"use client";

import { useAuth } from "@hive/auth-logic";
import { AppLayout } from "@/components/layout/AppLayout";
import { BentoProfileDashboard } from "@hive/ui";
import { Loader2 } from "lucide-react";

export function ProfileClient() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <div className="flex items-center gap-3 text-[#FFD700]">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-medium">Loading your profile...</span>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!user) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Profile Not Found</h2>
            <p className="text-muted">Unable to load your profile information.</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#0A0A0A]">
        <main className="container mx-auto px-4 py-8">
          <BentoProfileDashboard 
            user={{
              fullName: user.fullName || "HIVE User",
              handle: user.uid?.slice(0, 8) || "user",
              avatarUrl: undefined, // AuthUser doesn't include avatarUrl
              major: "Computer Science", // Mock data - would come from user profile
              graduationYear: 2025, // Mock data
              isBuilder: (user.customClaims?.isBuilder as boolean) || false,
              builderAchievements: {
                toolsCreated: 0, // Mock data - would come from backend
                totalEngagement: 0 // Mock data
              }
            }}
          />
        </main>
      </div>
    </AppLayout>
  );
}