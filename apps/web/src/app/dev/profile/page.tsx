"use client";

import { DevLayout } from "@/components/layout/DevLayout";
import { BentoProfileDashboard } from "@hive/ui";

// Enhanced mock user data for development
const mockUser = {
  fullName: "Jacob Developer",
  handle: "jacobdev",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jacobdev",
  major: "Computer Science",
  graduationYear: 2025,
  isBuilder: true,
  builderAchievements: {
    toolsCreated: 5,
    totalEngagement: 2840
  }
};

export default function DevProfilePage() {
  return (
    <DevLayout>
      <div className="min-h-screen bg-[#0A0A0A]">
        <main className="container mx-auto px-4 py-8">
          {/* Dev Info Section */}
          <div className="mb-8 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-4">
            <h2 className="text-lg font-display font-semibold text-[#FFD700] mb-2">
              🎛️ Profile Development Mode
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted">User:</span>
                <span className="text-foreground ml-2">{mockUser.fullName}</span>
              </div>
              <div>
                <span className="text-muted">Builder Status:</span>
                <span className="text-[#FFD700] ml-2">Active Builder</span>
              </div>
              <div>
                <span className="text-muted">Tools Created:</span>
                <span className="text-foreground ml-2">{mockUser.builderAchievements.toolsCreated}</span>
              </div>
            </div>
          </div>

          {/* Bento Profile Dashboard */}
          <BentoProfileDashboard user={mockUser} />

          {/* Development Notes */}
          <div className="mt-8 bg-surface-01 border border-border rounded-lg p-6">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">
              📋 Profile Development Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-semibold text-foreground mb-2">✅ Completed</h4>
                <ul className="text-sm text-muted space-y-1">
                  <li>• Bento grid layout system</li>
                  <li>• Profile header card</li>
                  <li>• HiveLAB card (builder/non-builder)</li>
                  <li>• Calendar card with events</li>
                  <li>• Tools showcase card</li>
                  <li>• Ghost mode privacy toggle</li>
                  <li>• Social features preview (locked)</li>
                  <li>• App shell integration</li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold text-foreground mb-2">🚧 In Progress</h4>
                <ul className="text-sm text-muted space-y-1">
                  <li>• Real user data integration</li>
                  <li>• Space membership display</li>
                  <li>• Activity tracking system</li>
                  <li>• Builder stats analytics</li>
                  <li>• Tool usage metrics</li>
                  <li>• Social readiness tracking</li>
                  <li>• Privacy settings API</li>
                  <li>• Profile editing functionality</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DevLayout>
  );
}