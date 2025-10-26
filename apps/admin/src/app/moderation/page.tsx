// Bounded Context Owner: Governance Guild
import { DashboardHeader } from "@hive/ui";
import { listOpenModeration } from "@admin/server/moderation";
import { ModerationFilters } from "./ModerationFilters";
import { Suspense } from "react";
import { ModerationClient } from "./ModerationClient";
import { getAdminSession, isAdmin } from "@admin/server/auth";
import { logAdminEvent } from "@admin/server/audit";
import NotAuthorized from "../not-authorized";

export default async function AdminModerationPage() {
  if (!(await isAdmin())) {
    return <NotAuthorized />;
  }
  const session = await getAdminSession();
  await logAdminEvent({ action: "view", page: "moderation", sessionId: session?.sessionId, actorProfileId: session?.profileId });
  const items = await listOpenModeration(25);
  return (
    <main className="p-4 md:p-6">
      <DashboardHeader title="Moderation" subtitle="Review and action on flagged content" showSearch={false} />
      <div className="mt-4 grid grid-cols-1">
        <div className="mb-3"><ModerationFilters /></div>
        <div className="hidden md:grid grid-cols-7 gap-2 px-3 py-2 text-caption text-muted-foreground">
          <div>Type</div>
          <div className="col-span-2">Content</div>
          <div>Reason</div>
          <div>Priority</div>
          <div>Created</div>
          <div className="text-right">Action</div>
        </div>
        <Suspense>
          <ModerationClient initialItems={items.map((m) => ({ ...m, createdAt: m.createdAt ? m.createdAt.toISOString() : null }))} />
        </Suspense>
      </div>
    </main>
  );
}
