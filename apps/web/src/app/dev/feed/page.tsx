"use client";

import { DevLayout } from "@/components/layout/DevLayout";

export default function DevFeedPage() {
  return (
    <DevLayout>
      <div className="min-h-screen bg-background">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              Feed Development
            </h2>
            
            <p className="text-lg text-muted font-sans mb-8 max-w-2xl mx-auto">
              This is the feed section with complete app shell integration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Mock Feed Cards */}
              <div className="bg-surface-01 border border-border rounded-lg p-6">
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                  📝 Post Type: Text
                </h3>
                <p className="text-muted font-sans text-sm mb-4">
                  Sample text post showing how feed content would appear in the app shell.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>👤 User Name</span>
                  <span>•</span>
                  <span>2 hours ago</span>
                </div>
              </div>

              <div className="bg-surface-01 border border-border rounded-lg p-6">
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                  📸 Post Type: Image
                </h3>
                <div className="bg-[#2A2A2A] rounded h-32 mb-4 flex items-center justify-center">
                  <span className="text-muted">Image Placeholder</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>👤 User Name</span>
                  <span>•</span>
                  <span>4 hours ago</span>
                </div>
              </div>

              <div className="bg-surface-01 border border-border rounded-lg p-6">
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                  🎉 Post Type: Event
                </h3>
                <p className="text-muted font-sans text-sm mb-4">
                  Sample event post with RSVP functionality and event details.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>📅 Tomorrow 7PM</span>
                  <span>•</span>
                  <span>CSE Building</span>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-display font-semibold text-[#FFD700] mb-3">
                🔧 Development Features
              </h3>
              <ul className="text-left text-muted space-y-2">
                <li>✅ Complete app shell with navigation</li>
                <li>✅ Responsive desktop and mobile layouts</li>
                <li>✅ Mock feed content structure</li>
                <li>✅ HIVE brand compliance</li>
                <li>🚧 Real-time feed updates (pending)</li>
                <li>🚧 Post creation flow (pending)</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </DevLayout>
  );
}