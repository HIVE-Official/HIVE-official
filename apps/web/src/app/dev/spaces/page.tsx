"use client";

import { DevLayout } from "@/components/layout/DevLayout";

export default function DevSpacesPage() {
  return (
    <DevLayout>
      <div className="min-h-screen bg-background">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              Spaces Development
            </h2>
            
            <p className="text-lg text-muted font-sans mb-8 max-w-2xl mx-auto">
              Campus community discovery and management interface.
            </p>
          </div>

          {/* Spaces Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Academic Spaces */}
            <div className="bg-surface-01 border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
                  <span className="text-black font-semibold">📚</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Academic
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#2A2A2A]/30 rounded">
                  <span className="text-foreground">CS 250 - Data Structures</span>
                  <span className="text-xs text-[#FFD700]">Joined</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#2A2A2A]/30 rounded">
                  <span className="text-foreground">MTH 241 - Calculus</span>
                  <span className="text-xs text-muted">Available</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#2A2A2A]/30 rounded">
                  <span className="text-foreground">CS Honor Society</span>
                  <span className="text-xs text-[#FFD700]">Builder</span>
                </div>
              </div>
            </div>

            {/* Residential Spaces */}
            <div className="bg-surface-01 border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-semibold">🏠</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Residential
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#2A2A2A]/30 rounded">
                  <span className="text-foreground">Greiner Hall</span>
                  <span className="text-xs text-[#FFD700]">Joined</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#2A2A2A]/30 rounded">
                  <span className="text-foreground">Floor 3 Study Group</span>
                  <span className="text-xs text-[#FFD700]">Joined</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#2A2A2A]/30 rounded">
                  <span className="text-foreground">Dorm Activities</span>
                  <span className="text-xs text-muted">Available</span>
                </div>
              </div>
            </div>

            {/* Social Spaces */}
            <div className="bg-surface-01 border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-semibold">🎯</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Organizations
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#2A2A2A]/30 rounded">
                  <span className="text-foreground">Tech Entrepreneurship</span>
                  <span className="text-xs text-[#FFD700]">Builder</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#2A2A2A]/30 rounded">
                  <span className="text-foreground">UB ACM</span>
                  <span className="text-xs text-[#FFD700]">Joined</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#2A2A2A]/30 rounded">
                  <span className="text-foreground">Design Society</span>
                  <span className="text-xs text-muted">Request Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Space Discovery */}
          <div className="bg-surface-01 border border-border rounded-lg p-6 mb-8">
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              🔍 Discover New Spaces
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#2A2A2A]/30 rounded-lg">
                <h4 className="text-md font-semibold text-foreground mb-2">Research Labs</h4>
                <p className="text-sm text-muted mb-3">Find research opportunities in your field</p>
                <button className="text-xs text-[#FFD700] hover:text-[#FFD700]/80">
                  Browse Labs →
                </button>
              </div>
              <div className="p-4 bg-[#2A2A2A]/30 rounded-lg">
                <h4 className="text-md font-semibold text-foreground mb-2">Study Groups</h4>
                <p className="text-sm text-muted mb-3">Join collaborative learning sessions</p>
                <button className="text-xs text-[#FFD700] hover:text-[#FFD700]/80">
                  Find Groups →
                </button>
              </div>
            </div>
          </div>

          {/* Development Status */}
          <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-6">
            <h3 className="text-xl font-display font-semibold text-[#FFD700] mb-4">
              🔧 Spaces Development Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-semibold text-foreground mb-3">✅ Shell Complete</h4>
                <ul className="text-sm text-muted space-y-1">
                  <li>• App navigation integration</li>
                  <li>• Space categorization UI</li>
                  <li>• Mock space data display</li>
                  <li>• Responsive grid layout</li>
                  <li>• Brand-compliant design</li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold text-foreground mb-3">🚧 Pending Features</h4>
                <ul className="text-sm text-muted space-y-1">
                  <li>• Real space data integration</li>
                  <li>• Space joining/leaving functionality</li>
                  <li>• Search and filtering</li>
                  <li>• Space creation workflow</li>
                  <li>• Membership management</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DevLayout>
  );
}