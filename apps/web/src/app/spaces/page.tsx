import { RouteGuard } from "@/components/auth/route-guard";
import { SpacesClient } from "./spaces-client";

export default function SpacesPage() {
  return (
    <RouteGuard requireAuth={true} requireOnboarding={true}>
      <SpacesClient />
    </RouteGuard>
  );
}