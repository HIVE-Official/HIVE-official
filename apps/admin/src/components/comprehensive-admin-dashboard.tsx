"use client";

import { useState, useEffect } from "react";
import { HiveCard as Card, CardContent, CardHeader, CardTitle } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";
import { AdminNavigation } from "./admin-navigation";
import { UserManagementDashboard } from "./user-management-dashboard";
import { SpaceManagementDashboard } from "./space-management-dashboard";
import { ContentModerationDashboard } from "./content-moderation-dashboard";
import { BuilderQueueEnhanced } from "./builder-queue-enhanced";
import { AnalyticsDashboard } from "./analytics-dashboard";
import { MetricCards } from "./metric-cards";
import { AdminNotifications } from "./admin-notifications";
import { AdminActivityLogDashboard } from "./admin-activity-log";

interface AdminDashboardProps {
  initialTab?: string;
}

export function ComprehensiveAdminDashboard({ initialTab = 'overview' }: AdminDashboardProps) {
  const { admin } = useAdminAuth();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [pendingCounts, setPendingCounts] = useState({
    builderRequests: 0,
    flaggedContent: 0,
    userReports: 0,
  });

  const fetchPendingCounts = async () => {
    if (!admin) return;

    try {
      const [builderResponse, contentResponse] = await Promise.all([
        fetch('/api/admin/builder-requests', {
          headers: { 'Authorization': `Bearer ${admin.id}` },
        }),
        fetch('/api/admin/content-moderation', {
          headers: { 'Authorization': `Bearer ${admin.id}` },
        }),
      ]);

      const builderData = await builderResponse.json();
      const contentData = await contentResponse.json();

      setPendingCounts({
        builderRequests: builderData.requests?.filter((r: { status: string }) => r.status === 'pending').length || 0,
        flaggedContent: contentData.flaggedContent?.filter((c: { status: string }) => c.status === 'pending').length || 0,
        userReports: 0, // TODO: Implement user reports
      });
    } catch (error) {
      console.error('Failed to fetch pending counts:', error);
    }
  };

  useEffect(() => {
    fetchPendingCounts();
    // Refresh counts every 30 seconds
    const interval = setInterval(fetchPendingCounts, 30000);
    return () => clearInterval(interval);
  }, [admin]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <MetricCards />
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-gray-700 bg-gray-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Recent Builder Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <BuilderQueueEnhanced />
                </CardContent>
              </Card>
              <Card className="border-gray-700 bg-gray-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Platform Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">System Status</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-400">Healthy</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Pending Actions</span>
                      <span className="text-white">
                        {pendingCounts.builderRequests + pendingCounts.flaggedContent}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Active Admins</span>
                      <span className="text-white">1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="lg:col-span-1">
                <AdminNotifications maxHeight="300px" />
              </div>
            </div>
          </div>
        );
      case 'users':
        return <UserManagementDashboard />;
      case 'spaces':
        return <SpaceManagementDashboard />;
      case 'content':
        return <ContentModerationDashboard />;
      case 'builders':
        return (
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">Builder Approval Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <BuilderQueueEnhanced />
            </CardContent>
          </Card>
        );
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'system':
        return (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-gray-700 bg-gray-900/50">
                <CardHeader>
                  <CardTitle className="text-white">System Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800 rounded-lg">
                        <h4 className="font-semibold text-white mb-2">Platform Settings</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Registration:</span>
                            <span className="text-green-400">Open</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Content Moderation:</span>
                            <span className="text-green-400">Enabled</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Auto-Approval:</span>
                            <span className="text-red-400">Disabled</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-800 rounded-lg">
                        <h4 className="font-semibold text-white mb-2">Feature Flags</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Rituals System:</span>
                            <span className="text-yellow-400">Beta</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tool Marketplace:</span>
                            <span className="text-green-400">Live</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Real-time Chat:</span>
                            <span className="text-green-400">Live</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <AdminNotifications />
            </div>
            <AdminActivityLogDashboard />
          </div>
        );
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-400">Select a tab to view its content</p>
          </div>
        );
    }
  };

  if (!admin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">HIVE Admin Dashboard</h1>
              <p className="mt-2 text-gray-400">
                Complete platform control and oversight
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="font-semibold text-white">{admin.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-500 capitalize">{admin.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <AdminNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pendingCounts={pendingCounts}
        />

        {/* Content */}
        <div className="min-h-96">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 bg-gray-900/30 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">System Status: Healthy</span>
              </div>
              <div className="text-gray-400">
                Last Updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="text-gray-400">
              HIVE Admin v1.0.0 • Built with Next.js & Firebase
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}