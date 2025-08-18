import { Metadata } from "next";
import { redirect } from "next/navigation";
import { HiveCard as Card, CardContent, CardHeader, CardTitle } from "@hive/ui";
import { getCurrentAdmin } from "@/lib/auth";
import { UserManagementDashboard } from "../../components/user-management-dashboard";
import { BuilderQueueEnhanced } from "../../components/builder-queue-enhanced";
import { AnalyticsDashboard } from "../../components/analytics-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | HIVE",
  description: "HIVE administration and moderation tools - full control over the platform.",
};

export default async function EnhancedAdminDashboard() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header with Admin Info */}
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

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg">
            <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-md">
              Overview
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">
              Users
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">
              Spaces
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">
              Content
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">
              Analytics
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 hover:bg-amber-500/20 transition-colors">
                  <div className="text-sm font-medium">Seed Spaces</div>
                  <div className="text-xs text-gray-400">Add new campus spaces</div>
                </button>
                <button className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors">
                  <div className="text-sm font-medium">Bulk Actions</div>
                  <div className="text-xs text-gray-400">Mass user operations</div>
                </button>
                <button className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 hover:bg-green-500/20 transition-colors">
                  <div className="text-sm font-medium">Export Data</div>
                  <div className="text-xs text-gray-400">Download platform data</div>
                </button>
                <button className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/20 transition-colors">
                  <div className="text-sm font-medium">System Config</div>
                  <div className="text-xs text-gray-400">Platform settings</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* User Management */}
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <UserManagementDashboard />
            </CardContent>
          </Card>

          {/* Builder Queue */}
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">Builder Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <BuilderQueueEnhanced />
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section - Full Width */}
        <div className="mt-6">
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">Platform Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsDashboard />
            </CardContent>
          </Card>
        </div>

        {/* System Status Footer */}
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