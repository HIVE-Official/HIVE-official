// Bounded Context Owner: Governance Guild
import { DashboardHeader, Card, Badge } from "@hive/ui";
import { RequestActions } from "./RequestActions";
import { getAdminSession, isAdmin } from "@admin/server/auth";
import { logAdminEvent } from "@admin/server/audit";
import { listBuilderRequests } from "@admin/server/users";
import NotAuthorized from "../../not-authorized";

export default async function BuilderRequestsPage() {
  if (!(await isAdmin())) return <NotAuthorized />;
  const session = await getAdminSession();
  await logAdminEvent({ action: "view", page: "users:builder-requests", sessionId: session?.sessionId, actorProfileId: session?.profileId });
  const requests = await listBuilderRequests(50);
  return (
    <main className="p-4 md:p-6">
      <DashboardHeader title="Builder Requests" subtitle="Approve or reject builder role requests" showSearch={false} />
      <div className="mt-4 grid grid-cols-1 gap-4">
        <Card className="p-4">
          <div className="hidden md:grid grid-cols-6 gap-2 px-3 py-2 text-caption text-muted-foreground">
            <div>Profile</div>
            <div>Email</div>
            <div>Reason</div>
            <div>Status</div>
            <div>Created</div>
            <div className="text-right">Actions</div>
          </div>
          <div className="divide-y divide-border rounded-md border border-border bg-card">
            {requests.length === 0 ? (
              <div className="p-4 text-muted-foreground">No open requests.</div>
            ) : (
              requests.map((r) => (
                <div key={r.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 px-3 py-3">
                  <div className="truncate">{r.profileId}</div>
                  <div className="truncate">{r.email ?? "—"}</div>
                  <div className="truncate text-muted-foreground">{r.reason ?? "—"}</div>
                  <div>{r.status ? <Badge variant="secondary">{r.status}</Badge> : "—"}</div>
                  <div className="text-muted-foreground">{r.createdAt ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(r.createdAt) : "—"}</div>
                  <div className="flex md:justify-end gap-2"><RequestActions profileId={r.profileId} requestId={r.id} /></div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
