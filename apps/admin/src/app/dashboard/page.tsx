import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@hive/ui";
import { UserLookup } from "../../components/user-lookup";
import { BuilderQueue } from "../../components/builder-queue";
import { FlagQueue } from "../../components/flag-queue";
import { MetricCards } from "../../components/metric-cards";
import { getCurrentAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard | HIVE",
  description: "HIVE administration and moderation tools.",
};

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
            Moderation tools and platform oversight
          </p>
        </div>

        {/* Metric Cards */}
        <div className="mb-8">
          <MetricCards />
        </div>

        {/* Main Tools Grid */}
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
        <div className="mt-6">
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
  );
}
