import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { ComprehensiveAdminDashboard } from "../../components/comprehensive-admin-dashboard";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Admin Dashboard | HIVE",
  description: "HIVE administration and moderation tools - complete platform control.",
};

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/auth/login");
  }

  return <ComprehensiveAdminDashboard />;
}
