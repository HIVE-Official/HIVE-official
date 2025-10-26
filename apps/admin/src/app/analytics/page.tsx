// Bounded Context Owner: Governance Guild
import { DashboardHeader } from "@hive/ui";
import { getAdminSession, isAdmin } from "@admin/server/auth";
import { logAdminEvent } from "@admin/server/audit";
import NotAuthorized from "../not-authorized";

export default async function AdminAnalyticsPage() {
  if (!(await isAdmin())) {
    return <NotAuthorized />;
  }
  const session = await getAdminSession();
  await logAdminEvent({ action: "view", page: "analytics", sessionId: session?.sessionId, actorProfileId: session?.profileId });
  return (
    <main className="p-4 md:p-6">
      <DashboardHeader title="Analytics" subtitle="Key platform metrics" showSearch={false} />
      <div className="mt-4 text-muted-foreground">Analytics charts and KPIs coming soon.</div>
    </main>
  );
}
