// Bounded Context Owner: Governance Guild
import { DashboardHeader, Card, Badge } from "@hive/ui";
import { isFirebaseConfigured } from "@hive/firebase";
import { SystemOps } from "./SystemOps";
import { getAdminSession, isAdmin } from "@admin/server/auth";
import { listRecentAdminAudit, logAdminEvent } from "@admin/server/audit";
import NotAuthorized from "../not-authorized";
import { KillSwitches } from "./KillSwitches";

export default async function AdminSystemPage() {
  if (!(await isAdmin())) {
    return <NotAuthorized />;
  }
  const session = await getAdminSession();
  await logAdminEvent({ action: "view", page: "system", sessionId: session?.sessionId, actorProfileId: session?.profileId });
  const recent = await listRecentAdminAudit(20);
  const firebaseConfigured = isFirebaseConfigured();
  return (
    <main className="p-4 md:p-6">
      <DashboardHeader title="System" subtitle="Operational controls and maintenance" showSearch={false} />
      <div className="mt-4 grid grid-cols-1 gap-4">
        <Card className="p-4">
          <div className="text-body font-medium mb-2">Operations</div>
          <div className="text-caption text-muted-foreground mb-3">Run platform checks and maintenance stubs</div>
          <SystemOps />
        </Card>
        <KillSwitches />
        <Card className="p-4">
          <div className="text-body font-medium mb-2">Environment Status</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground">Firebase Configured</div>
              <div>{firebaseConfigured ? <Badge variant="secondary">Yes</Badge> : <Badge variant="destructive">No</Badge>}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Admin Allowlist</div>
              <div>{process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",").length : 0} email(s)</div>
            </div>
            <div>
              <div className="text-muted-foreground">Node</div>
              <div>{process.version}</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-body font-medium mb-2">Recent Admin Activity</div>
          <div className="hidden md:grid grid-cols-5 gap-2 px-3 py-2 text-caption text-muted-foreground">
            <div>When</div>
            <div>Action</div>
            <div>Page</div>
            <div>Target</div>
            <div>Actor</div>
          </div>
          <div className="divide-y divide-border rounded-md border border-border bg-card">
            {recent.length === 0 ? (
              <div className="p-4 text-muted-foreground">No recent activity.</div>
            ) : (
              recent.map((r) => (
                <div key={r.id} className="grid grid-cols-1 md:grid-cols-5 gap-2 px-3 py-3">
                  <div className="text-muted-foreground">
                    {r.timestamp ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(r.timestamp) : "—"}
                  </div>
                  <div>
                    <Badge variant="secondary">{r.action}</Badge>
                  </div>
                  <div className="truncate text-muted-foreground">{r.page ?? "—"}</div>
                  <div className="truncate">{r.targetId ?? "—"}</div>
                  <div className="truncate text-muted-foreground">{r.actorProfileId ?? "—"}</div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
