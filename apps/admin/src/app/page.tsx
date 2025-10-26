// Bounded Context Owner: Governance Guild
import { DashboardHeader, Card } from "@hive/ui";
import { getOverviewMetrics } from "@admin/server/metrics";
import { getAdminSession, isAdmin } from "@admin/server/auth";
import { logAdminEvent } from "@admin/server/audit";
import NotAuthorized from "./not-authorized";

export default async function AdminOverviewPage() {
  if (!(await isAdmin())) {
    return <NotAuthorized />;
  }
  const session = await getAdminSession();
  const metrics = await getOverviewMetrics();
  await logAdminEvent({ action: "view", page: "overview", sessionId: session?.sessionId, actorProfileId: session?.profileId });
  const n = (v: number | null) => (v == null ? "—" : v.toLocaleString());
  return (
    <main className="p-4 md:p-6">
      <DashboardHeader title="Admin Overview" subtitle="Platform health and recent activity" showSearch={false} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card className="p-4">
          <div className="text-caption text-muted-foreground">Signups (24h)</div>
          <div className="text-h3 font-h3">{n(metrics.signups24h)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-caption text-muted-foreground">Active Users</div>
          <div className="text-h3 font-h3">{n(metrics.activeUsers)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-caption text-muted-foreground">Spaces Created</div>
          <div className="text-h3 font-h3">{n(metrics.spaces24h)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-caption text-muted-foreground">Moderation Queue</div>
          <div className="text-h3 font-h3">{n(metrics.moderationOpen)}</div>
        </Card>
      </div>
    </main>
  );
}
