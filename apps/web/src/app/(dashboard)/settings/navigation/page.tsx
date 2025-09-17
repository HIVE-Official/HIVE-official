"use client";

import React from 'react';
import { useNavigationStore } from '@/store/navigation-store';
import { Monitor, Layout, Smartphone, Check } from 'lucide-react';

export default function NavigationSettingsPage() {
  const { mode, setMode, preferences, updatePreferences } = useNavigationStore();

  const navigationModes = [
    {
      id: 'sidebar',
      title: 'Sidebar Navigation',
      description: 'Traditional sidebar on the left with all navigation options',
      icon: Layout,
      preview: (
        <div className="w-full h-32 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-white)]/[0.08] flex overflow-hidden">
          <div className="w-12 bg-[#0D0D0E] border-r border-[var(--hive-white)]/[0.08]" />
          <div className="flex-1 p-2">
            <div className="h-3 bg-[var(--hive-white)]/[0.06] rounded mb-2" />
            <div className="h-3 bg-[var(--hive-white)]/[0.04] rounded mb-2 w-3/4" />
            <div className="h-3 bg-[var(--hive-white)]/[0.04] rounded w-1/2" />
          </div>
        </div>
      ),
    },
    {
      id: 'header',
      title: 'Header Navigation',
      description: 'Horizontal navigation bar at the top with more content space',
      icon: Monitor,
      preview: (
        <div className="w-full h-32 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-white)]/[0.08] flex flex-col overflow-hidden">
          <div className="h-8 bg-[#0D0D0E] border-b border-[var(--hive-white)]/[0.08] flex items-center px-2 gap-2">
            <div className="w-4 h-4 bg-[var(--hive-gold)] rounded" />
            <div className="flex gap-1">
              <div className="w-8 h-3 bg-[var(--hive-white)]/[0.08] rounded" />
              <div className="w-8 h-3 bg-[var(--hive-white)]/[0.08] rounded" />
              <div className="w-8 h-3 bg-[var(--hive-white)]/[0.08] rounded" />
            </div>
          </div>
          <div className="flex-1 p-2">
            <div className="h-3 bg-[var(--hive-white)]/[0.06] rounded mb-2" />
            <div className="h-3 bg-[var(--hive-white)]/[0.04] rounded mb-2 w-3/4" />
            <div className="h-3 bg-[var(--hive-white)]/[0.04] rounded w-1/2" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-2">
            Navigation Settings
          </h1>
          <p className="text-gray-400">
            Customize how you navigate through HIVE
          </p>
        </div>

        {/* Desktop Navigation Mode */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-4">
            Desktop Navigation Style
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {navigationModes.map((navMode) => {
              const Icon = navMode.icon;
              const isSelected = mode === navMode.id;
              
              return (
                <button
                  key={navMode.id}
                  onClick={() => setMode(navMode.id as 'sidebar' | 'header')}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-200
                    ${isSelected 
                      ? 'border-[var(--hive-gold)] bg-[var(--hive-gold)]/10' 
                      : 'border-[var(--hive-white)]/[0.08] hover:border-[var(--hive-white)]/[0.16] bg-[var(--hive-white)]/[0.02]'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`
                        p-2 rounded-lg
                        ${isSelected ? 'bg-[var(--hive-gold)]/20' : 'bg-[var(--hive-white)]/[0.08]'}
                      `}>
                        <Icon className={`
                          h-5 w-5
                          ${isSelected ? 'text-[var(--hive-gold)]' : 'text-gray-400'}
                        `} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-[var(--hive-text-primary)]">
                          {navMode.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {navMode.description}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="p-1 rounded-full bg-[var(--hive-gold)]">
                        <Check className="h-3 w-3 text-[var(--hive-black)]" />
                      </div>
                    )}
                  </div>
                  {navMode.preview}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Info */}
        <div className="bg-[var(--hive-white)]/[0.04] rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[var(--hive-gold)]/20">
              <Smartphone className="h-5 w-5 text-[var(--hive-gold)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                Mobile Navigation
              </h3>
              <p className="text-sm text-gray-400">
                On mobile devices, HIVE automatically uses a bottom navigation bar with quick access to Feed, Spaces, and Profile. Additional options are available in the menu.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Preferences */}
        <div>
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-4">
            Navigation Preferences
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-[var(--hive-white)]/[0.02] rounded-lg border border-[var(--hive-white)]/[0.08] cursor-pointer hover:bg-[var(--hive-white)]/[0.04] transition-colors">
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Show Badges</p>
                <p className="text-sm text-gray-400 mt-1">Display notification counts on navigation items</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.showBadges}
                onChange={(e) => updatePreferences({ showBadges: e.target.checked })}
                className="w-5 h-5 rounded bg-[var(--hive-white)]/[0.08] border-[var(--hive-white)]/[0.16] text-[var(--hive-gold)] focus:ring-[var(--hive-gold)] focus:ring-offset-0"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[var(--hive-white)]/[0.02] rounded-lg border border-[var(--hive-white)]/[0.08] cursor-pointer hover:bg-[var(--hive-white)]/[0.04] transition-colors">
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Compact Mode</p>
                <p className="text-sm text-gray-400 mt-1">Reduce spacing and use smaller text in navigation</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.compactMode}
                onChange={(e) => updatePreferences({ compactMode: e.target.checked })}
                className="w-5 h-5 rounded bg-[var(--hive-white)]/[0.08] border-[var(--hive-white)]/[0.16] text-[var(--hive-gold)] focus:ring-[var(--hive-gold)] focus:ring-offset-0"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[var(--hive-white)]/[0.02] rounded-lg border border-[var(--hive-white)]/[0.08] cursor-pointer hover:bg-[var(--hive-white)]/[0.04] transition-colors">
              <div>
                <p className="font-medium text-[var(--hive-text-primary)]">Auto-collapse Sidebar</p>
                <p className="text-sm text-gray-400 mt-1">Automatically minimize sidebar on smaller screens (Desktop only)</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.autoCollapseSidebar}
                onChange={(e) => updatePreferences({ autoCollapseSidebar: e.target.checked })}
                disabled={mode !== 'sidebar'}
                className="w-5 h-5 rounded bg-[var(--hive-white)]/[0.08] border-[var(--hive-white)]/[0.16] text-[var(--hive-gold)] focus:ring-[var(--hive-gold)] focus:ring-offset-0 disabled:opacity-50"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}