import { RouteGuard } from "@/components/auth/route-guard";
import { ProfileClient } from "./profile-client";

export default function ProfilePage() {
  return (
    <RouteGuard requireAuth={true} requireOnboarding={true}>
      <ProfileClient />
    </RouteGuard>
  );
}