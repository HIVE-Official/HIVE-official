"use client";

import { DevLayout } from "@/components/layout/DevLayout";

export default function DevCampusPage() {
  return (
    <DevLayout>
      <div className="min-h-screen bg-background">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
              Campus Development
            </h2>
            
            <p className="text-lg text-muted font-sans mb-8 max-w-2xl mx-auto">
              Campus-wide features, resources, and university integration.
            </p>
          </div>

          {/* Campus Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Campus Map */}
            <div className="bg-surface-01 border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
                  <span className="text-black font-semibold">🗺️</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Campus Map
                </h3>
              </div>
              <p className="text-muted text-sm mb-4">
                Interactive campus navigation with building locations and real-time events.
              </p>
              <div className="bg-[#2A2A2A] rounded h-32 mb-4 flex items-center justify-center">
                <span className="text-muted">Map Placeholder</span>
              </div>
              <button className="text-xs text-[#FFD700] hover:text-[#FFD700]/80">
                Open Full Map →
              </button>
            </div>

            {/* Events Calendar */}
            <div className="bg-surface-01 border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-semibold">📅</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Campus Events
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-[#2A2A2A]/30 rounded">
                  <div className="text-sm font-medium text-foreground">Career Fair</div>
                  <div className="text-xs text-muted">Today 2:00 PM • Student Union</div>
                </div>
                <div className="p-3 bg-[#2A2A2A]/30 rounded">
                  <div className="text-sm font-medium text-foreground">Research Showcase</div>
                  <div className="text-xs text-muted">Tomorrow 6:00 PM • Davis Hall</div>
                </div>
                <div className="p-3 bg-[#2A2A2A]/30 rounded">
                  <div className="text-sm font-medium text-foreground">Guest Lecture</div>
                  <div className="text-xs text-muted">Friday 3:00 PM • Knox 20</div>
                </div>
              </div>
            </div>

            {/* Campus Resources */}
            <div className="bg-surface-01 border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-semibold">📚</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Resources
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-[#2A2A2A]/30 rounded">
                  <div className="text-sm font-medium text-foreground">Library Hours</div>
                  <div className="text-xs text-[#FFD700]">Open 24/7</div>
                </div>
                <div className="p-3 bg-[#2A2A2A]/30 rounded">
                  <div className="text-sm font-medium text-foreground">Dining Halls</div>
                  <div className="text-xs text-muted">5 locations open</div>
                </div>
                <div className="p-3 bg-[#2A2A2A]/30 rounded">
                  <div className="text-sm font-medium text-foreground">Shuttle Tracker</div>
                  <div className="text-xs text-muted">3 min • Blue Line</div>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FFD700] mb-2">32K</div>
              <div className="text-sm text-muted">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">1.2K</div>
              <div className="text-sm text-muted">Active Now</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">240</div>
              <div className="text-sm text-muted">Active Spaces</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">18</div>
              <div className="text-sm text-muted">Events Today</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-surface-01 border border-border rounded-lg p-6 mb-8">
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              🎯 Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 bg-[#2A2A2A]/30 rounded-lg hover:bg-[#2A2A2A]/50 transition-colors text-left">
                <div className="text-lg mb-2">🍽️</div>
                <div className="text-sm font-medium text-foreground">Dining Menu</div>
              </button>
              <button className="p-4 bg-[#2A2A2A]/30 rounded-lg hover:bg-[#2A2A2A]/50 transition-colors text-left">
                <div className="text-lg mb-2">🚌</div>
                <div className="text-sm font-medium text-foreground">Shuttle Times</div>
              </button>
              <button className="p-4 bg-[#2A2A2A]/30 rounded-lg hover:bg-[#2A2A2A]/50 transition-colors text-left">
                <div className="text-lg mb-2">📖</div>
                <div className="text-sm font-medium text-foreground">Study Spaces</div>
              </button>
              <button className="p-4 bg-[#2A2A2A]/30 rounded-lg hover:bg-[#2A2A2A]/50 transition-colors text-left">
                <div className="text-lg mb-2">🎭</div>
                <div className="text-sm font-medium text-foreground">Events</div>
              </button>
            </div>
          </div>

          {/* Development Status */}
          <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-6">
            <h3 className="text-xl font-display font-semibold text-[#FFD700] mb-4">
              🔧 Campus Development Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-semibold text-foreground mb-3">✅ Shell Complete</h4>
                <ul className="text-sm text-muted space-y-1">
                  <li>• Campus overview interface</li>
                  <li>• Resource directory layout</li>
                  <li>• Event listing structure</li>
                  <li>• Quick actions grid</li>
                  <li>• Campus stats display</li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold text-foreground mb-3">🚧 Pending Features</h4>
                <ul className="text-sm text-muted space-y-1">
                  <li>• Live campus map integration</li>
                  <li>• Real event data sync</li>
                  <li>• Dining hall menus API</li>
                  <li>• Shuttle tracking system</li>
                  <li>• Study space availability</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DevLayout>
  );
}