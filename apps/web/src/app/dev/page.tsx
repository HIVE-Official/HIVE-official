"use client";

import { DevLayout } from "@/components/layout/DevLayout";
import Link from "next/link";

export default function DevHomePage() {
  return (
    <DevLayout>
      <div className="min-h-screen bg-background">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">
              HIVE Development Environment
            </h1>
            <p className="text-xl text-muted font-sans max-w-3xl mx-auto">
              Complete app shell testing environment with full navigation, 
              authentication bypass, and realistic mock data.
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link href="/dev/feed" className="group">
              <div className="bg-surface-01 border border-border rounded-lg p-6 hover:border-[#FFD700]/50 transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center">
                    <span className="text-black text-xl">📝</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-[#FFD700]">
                    Feed
                  </h3>
                </div>
                <p className="text-muted mb-4">
                  Campus community posts, events, and social interactions with complete app shell.
                </p>
                <div className="text-xs text-[#FFD700]">
                  View Development →
                </div>
              </div>
            </Link>

            <Link href="/dev/profile" className="group">
              <div className="bg-surface-01 border border-border rounded-lg p-6 hover:border-[#FFD700]/50 transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center">
                    <span className="text-black text-xl">👤</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-[#FFD700]">
                    Profile
                  </h3>
                </div>
                <p className="text-muted mb-4">
                  Bento grid profile dashboard with tools, calendar, and privacy controls.
                </p>
                <div className="text-xs text-[#FFD700]">
                  View Development →
                </div>
              </div>
            </Link>

            <Link href="/dev/spaces" className="group">
              <div className="bg-surface-01 border border-border rounded-lg p-6 hover:border-[#FFD700]/50 transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center">
                    <span className="text-black text-xl">🏛️</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-[#FFD700]">
                    Spaces
                  </h3>
                </div>
                <p className="text-muted mb-4">
                  Campus community discovery, academic spaces, and organizations.
                </p>
                <div className="text-xs text-[#FFD700]">
                  View Development →
                </div>
              </div>
            </Link>
          </div>

          {/* Development Features */}
          <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-display font-semibold text-[#FFD700] mb-6">
              🛠️ Development Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">✅ App Shell Complete</h3>
                <ul className="space-y-2 text-muted">
                  <li>• Unified navigation across all sections</li>
                  <li>• Responsive desktop and mobile layouts</li>
                  <li>• HIVE brand system compliance</li>
                  <li>• Authentication bypass for development</li>
                  <li>• Working navigation between sections</li>
                  <li>• Profile avatar with user initials</li>
                  <li>• Development mode indicators</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">🎨 Design System</h3>
                <ul className="space-y-2 text-muted">
                  <li>• Monochrome + gold (#FFD700) palette</li>
                  <li>• Space Grotesk display typography</li>
                  <li>• 180ms transition timing</li>
                  <li>• Consistent spacing and hierarchy</li>
                  <li>• Interactive hover states</li>
                  <li>• Focus ring accessibility</li>
                  <li>• Mobile-first responsive design</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="bg-surface-01 border border-border rounded-lg p-6">
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              🚀 Quick Access
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dev/feed" className="text-center p-3 rounded hover:bg-[#2A2A2A]/30 transition-colors">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-sm text-foreground">Feed</div>
              </Link>
              <Link href="/dev/profile" className="text-center p-3 rounded hover:bg-[#2A2A2A]/30 transition-colors">
                <div className="text-2xl mb-2">👤</div>
                <div className="text-sm text-foreground">Profile</div>
              </Link>
              <Link href="/dev/spaces" className="text-center p-3 rounded hover:bg-[#2A2A2A]/30 transition-colors">
                <div className="text-2xl mb-2">🏛️</div>
                <div className="text-sm text-foreground">Spaces</div>
              </Link>
              <Link href="/profile-dev" className="text-center p-3 rounded hover:bg-[#2A2A2A]/30 transition-colors">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="text-sm text-foreground">Profile-Only</div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </DevLayout>
  );
}