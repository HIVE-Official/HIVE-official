// Bounded Context Owner: Governance Guild
import { DashboardHeader } from "@hive/ui";
import { getAdminSession, isAdmin } from "@admin/server/auth";
import { logAdminEvent } from "@admin/server/audit";
import { listCtaEvents, countCtaEvents24h } from "@admin/server/cta";
import NotAuthorized from "../../not-authorized";

export default async function AdminCtaAnalyticsPage() {
  if (!(await isAdmin())) {
    return <NotAuthorized />;
  }
  const session = await getAdminSession();
  const [items, count24h] = await Promise.all([
    listCtaEvents(200),
    countCtaEvents24h()
  ]);
  await logAdminEvent({ action: "view", page: "analytics:cta", sessionId: session?.sessionId, actorProfileId: session?.profileId });

  return (
    <main className="p-4 md:p-6">
      <DashboardHeader title="CTA Analytics" subtitle="Recent landing page click events" showSearch={false} />
      <div className="mt-3 text-sm text-muted-foreground">
        Last 24h events: {count24h ?? 0}
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr>
              <th className="py-2 pr-3">When</th>
              <th className="py-2 pr-3">ID</th>
              <th className="py-2 pr-3">Href</th>
              <th className="py-2 pr-3">Surface</th>
              <th className="py-2 pr-3">Pos</th>
              <th className="py-2 pr-3">Path</th>
              <th className="py-2 pr-3">CID</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e, idx) => (
              <tr key={idx} className="border-t border-border/60">
                <td className="py-2 pr-3 whitespace-nowrap">{e.createdAt ? e.createdAt.toLocaleString() : "—"}</td>
                <td className="py-2 pr-3">{e.id}</td>
                <td className="py-2 pr-3">{e.href ?? "—"}</td>
                <td className="py-2 pr-3">{e.surface ?? "—"}</td>
                <td className="py-2 pr-3">{e.pos ?? "—"}</td>
                <td className="py-2 pr-3">{e.path ?? "—"}</td>
                <td className="py-2 pr-3">{e.cid ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
