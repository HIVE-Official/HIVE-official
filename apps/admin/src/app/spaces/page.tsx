import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { EnhancedSpaceControlDashboard } from "../../components/enhanced-space-control-dashboard";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Space Control Center | HIVE Admin",
  description: "Complete administrative control over all campus spaces - activation, management, analytics, and bulk operations.",
};

export default async function SpacesAdminPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]">
      <EnhancedSpaceControlDashboard />
    </div>
  );
}