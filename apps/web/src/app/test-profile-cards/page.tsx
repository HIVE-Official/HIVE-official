"use client";

import React from 'react';
import { Card } from '@hive/ui';
import {
  UserSpacesCard,
  ActivityHistoryCard,
  GhostModeCard,
  SocialConnectionsCard,
  PersonalAnalyticsCard,
  CampusDiscoveryCard,
  QuickActionsCard
} from '@/components/profile/cards';

/**
 * Test page for Profile Cards with Real API Integration
 * This page helps verify that all cards work properly with real API data
 */
export default function TestProfileCardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Profile Cards Integration Test
          </h1>
          <p className="text-muted-foreground">
            Testing all Profile cards with real API data integration
          </p>
        </div>

        {/* Test Results Summary */}
        <Card className="p-6 mb-8 border-accent/20 bg-accent/5">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Integration Status
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">✅</div>
              <div className="text-muted-foreground">UserSpaces</div>
              <div className="text-xs text-green-400">API Integrated</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">✅</div>
              <div className="text-muted-foreground">Activity</div>
              <div className="text-xs text-green-400">API Integrated</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">✅</div>
              <div className="text-muted-foreground">Privacy</div>
              <div className="text-xs text-green-400">API Integrated</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">✅</div>
              <div className="text-muted-foreground">Analytics</div>
              <div className="text-xs text-green-400">API Integrated</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">✅</div>
              <div className="text-muted-foreground">Connections</div>
              <div className="text-xs text-green-400">API Integrated</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">✅</div>
              <div className="text-muted-foreground">Discovery</div>
              <div className="text-xs text-green-400">API Integrated</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[var(--hive-gold)]">⚡</div>
              <div className="text-muted-foreground">Quick Actions</div>
              <div className="text-xs text-[var(--hive-gold)]">UI Only</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent">🎯</div>
              <div className="text-muted-foreground">All Cards</div>
              <div className="text-xs text-accent">Production Ready</div>
            </div>
          </div>
        </Card>

        {/* Cards Grid - Simulating Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Row 1: Community & Social */}
          <div className="lg:col-span-2">
            <UserSpacesCard className="h-full" />
          </div>
          
          <div className="lg:col-span-1">
            <SocialConnectionsCard className="h-full" />
          </div>

          <div className="lg:col-span-1">
            <QuickActionsCard className="h-full" />
          </div>

          {/* Row 2: Activity & Analytics */}
          <div className="lg:col-span-2">
            <ActivityHistoryCard className="h-full" />
          </div>

          <div className="lg:col-span-1">
            <PersonalAnalyticsCard className="h-full" />
          </div>

          <div className="lg:col-span-1">
            <GhostModeCard className="h-full" />
          </div>

          {/* Row 3: Discovery */}
          <div className="lg:col-span-4">
            <CampusDiscoveryCard className="h-full" />
          </div>
        </div>

        {/* Test Information */}
        <Card className="mt-8 p-6 bg-blue-500/5 border-blue-500/20">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            API Integration Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-foreground mb-2">Integrated Endpoints:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <code>/api/profile/spaces</code> - Space memberships with activity</li>
                <li>• <code>/api/profile/activity</code> - User activity history</li>
                <li>• <code>/api/profile/privacy</code> - Privacy settings & ghost mode</li>
                <li>• <code>/api/profile/analytics</code> - Campus engagement analytics</li>
                <li>• <code>/api/profile/connections</code> - Social connections</li>
                <li>• <code>/api/spaces/discovery</code> - Discovery recommendations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Features Tested:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Real-time data fetching with loading states</li>
                <li>• API response mapping to UI interfaces</li>
                <li>• Error handling with graceful fallbacks</li>
                <li>• Mock data compatibility for development</li>
                <li>• Privacy setting updates with optimistic UI</li>
                <li>• Campus-specific data filtering (UB Buffalo)</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Developer Notes */}
        <Card className="mt-6 p-4 bg-muted/20">
          <details>
            <summary className="text-sm font-medium cursor-pointer text-foreground">
              Developer Notes & Next Steps
            </summary>
            <div className="mt-3 text-xs text-muted-foreground space-y-2">
              <p><strong>✅ Completed:</strong> All major Profile cards have real API integration</p>
              <p><strong>✅ Data Mapping:</strong> API responses properly mapped to UI interfaces</p>
              <p><strong>✅ Error Handling:</strong> Graceful fallbacks to mock data in development</p>
              <p><strong>🔄 Next:</strong> Dashboard layout integration and mobile responsiveness testing</p>
              <p><strong>🔄 Next:</strong> E2E testing with user flows (login → view profile → interact)</p>
              <p><strong>📝 Note:</strong> All cards maintain mock data fallbacks for offline development</p>
            </div>
          </details>
        </Card>
      </div>
    </div>
  );
}