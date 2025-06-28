"use client";

import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@hive/ui";
import { UserLookup } from "../../components/user-lookup";
import { BuilderQueue } from "../../components/builder-queue";
import { FlagQueue } from "../../components/flag-queue";
import { MetricCards } from "../../components/metric-cards";
import { AnalyticsDashboard } from "../../components/analytics-dashboard";
import { getCurrentAdmin } from "@/lib/auth";


export default function AdminDashboard() {
  const admin = getCurrentAdmin();

  if (!admin) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-gray-400">
            Platform oversight, analytics, and moderation tools
          </p>
        </div>

        {/* Comprehensive Analytics Dashboard */}
        <div className="mb-8">
          <AnalyticsDashboard />
        </div>

        {/* Legacy Metric Cards (for reference) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Quick Overview</h2>
            <span className="text-xs text-gray-500">Legacy metrics - see detailed analytics above</span>
          </div>
          <MetricCards />
        </div>

        {/* Admin Tools Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Admin Tools</h2>
          
          <div className="grid gap-6 lg:grid-cols-2">
            {/* User Lookup */}
            <Card className="border-gray-700 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">User Lookup</CardTitle>
              </CardHeader>
              <CardContent>
                <UserLookup />
              </CardContent>
            </Card>

            {/* Builder Approval Queue */}
            <Card className="border-gray-700 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">Builder Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <BuilderQueue />
              </CardContent>
            </Card>
          </div>

          {/* Flag Queue - Full Width */}
          <div>
            <Card className="border-gray-700 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white">Content Flags</CardTitle>
              </CardHeader>
              <CardContent>
                <FlagQueue />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
