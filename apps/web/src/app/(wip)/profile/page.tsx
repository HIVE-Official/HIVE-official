import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ProfileDashboard } from "./components/profile-dashboard";

export const metadata: Metadata = {
  title: "Profile | HIVE",
  description: "Your HIVE profile dashboard.",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/email");
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <ProfileDashboard user={user} />
    </main>
  );
}
