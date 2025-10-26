// Bounded Context Owner: Governance Guild
import { DashboardHeader, Card } from "@hive/ui";
import { FlagsTable } from "./FlagsTable";
import { getAdminSession, isAdmin } from "@admin/server/auth";
import { listFeatureFlags } from "@admin/server/features";
import { logAdminEvent } from "@admin/server/audit";
import NotAuthorized from "../not-authorized";

export default async function AdminFeaturesPage() {
  if (!(await isAdmin())) {
    return <NotAuthorized />;
  }
  const session = await getAdminSession();
  await logAdminEvent({ action: "view", page: "features", sessionId: session?.sessionId, actorProfileId: session?.profileId });
  const flags = await listFeatureFlags(50);

  return (
    <main className="p-4 md:p-6">
      <DashboardHeader title="Features" subtitle="Feature flags and controlled rollouts" showSearch={false} />

      <div className="mt-4 grid grid-cols-1 gap-4">
        <Card className="p-4">
          <div className="text-body-sm text-muted-foreground mb-3">
            Manage platform feature availability per audience. Changes are audited.
          </div>
          <FlagsTable flags={flags} />
        </Card>
      </div>
    </main>
  );
}
