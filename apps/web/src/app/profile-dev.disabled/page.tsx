"use client";

import type { AuthUser } from "@hive/auth-logic";
import { BentoProfileDashboard } from "@hive/ui";

// Mock user data for development
const mockUser: AuthUser = {
  uid: "dev-user-123",
  email: "dev@ub.edu",
  fullName: "Jacob Developer",
  onboardingCompleted: true,
  emailVerified: true,
  customClaims: {
    isBuilder: true,
    schoolId: "university-at-buffalo"
  }
};

export default function ProfileDevPage() {
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Dev banner */}
      <div className="bg-[var(--hive-brand-secondary)]/10 border-b border-[var(--hive-brand-secondary)]/30 px-4 py-2">
        <div className="container mx-auto">
          <p className="text-[var(--hive-brand-secondary)] text-sm font-mono">
            🚀 DEVELOPMENT MODE - Profile System Testing
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <BentoProfileDashboard 
          user={{
            fullName: mockUser.fullName || "Jacob Developer",
            handle: "jacobdev",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jacobdev",
            major: "Computer Science",
            graduationYear: 2025,
            isBuilder: true,
            builderAchievements: {
              toolsCreated: 3,
              totalEngagement: 1250
            }
          }}
        />
      </main>
    </div>
  );
}