// Bounded Context Owner: Governance Guild
import { DashboardHeader, Input, Button } from "@hive/ui";
import { listUsersPage } from "@admin/server/users";
import { Badge } from "@hive/ui";
import { getAdminSession, isAdmin } from "@admin/server/auth";
import { logAdminEvent } from "@admin/server/audit";
import NotAuthorized from "../not-authorized";

export default async function AdminUsersPage({ searchParams }: { searchParams?: { q?: string; limit?: string; cursor?: string } }) {
  if (!(await isAdmin())) {
    return <NotAuthorized />;
  }
  const session = await getAdminSession();
  await logAdminEvent({ action: "view", page: "users", sessionId: session?.sessionId, actorProfileId: session?.profileId });
  const q = searchParams?.q?.trim();
  const limit = Number.parseInt(searchParams?.limit || "25") || 25;
  const page = await listUsersPage(limit, q, searchParams?.cursor);
  return (
    <main className="p-4 md:p-6">
      <DashboardHeader
        title="Users"
        subtitle="Search, filter, and manage accounts"
        showSearch={false}
        renderSearch={
          <form className="w-full" method="GET">
            <div className="relative w-full">
              <Input type="search" name="q" placeholder="Search by email or handle" defaultValue={q} className="w-full pl-3 h-9" />
              <Button type="submit" variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">Search</Button>
            </div>
          </form>
        }
        rightSlot={<a href="/users/requests" className="text-sm underline">Builder Requests</a>}
      />
      <div className="mt-4 grid grid-cols-1">
        <div className="hidden md:grid grid-cols-6 gap-2 px-3 py-2 text-caption text-muted-foreground">
          <div className="col-span-2">Name</div>
          <div>Email</div>
          <div>Handle</div>
          <div>Status</div>
          <div>Created</div>
        </div>
        <div className="divide-y divide-border rounded-md border border-border bg-card">
          {page.items.length === 0 ? (
            <div className="p-4 text-muted-foreground">No users found.</div>
          ) : (
            page.items.map((u) => (
              <div key={u.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 px-3 py-3">
                <div className="md:col-span-2 font-medium">
                  <div className="text-body-sm">{u.name}</div>
                  <div className="md:hidden text-caption text-muted-foreground">{u.email}</div>
                </div>
                <div className="hidden md:block">{u.email}</div>
                <div className="hidden md:block">{u.handle ? `@${u.handle}` : "—"}</div>
                <div>
                  {u.isActive ? (
                    <Badge variant="secondary">Active</Badge>
                  ) : (
                    <Badge variant="destructive">Inactive</Badge>
                  )}
                </div>
                <div className="text-muted-foreground">
                  {u.createdAt ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(u.createdAt) : "—"}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-end mt-3">
          {page.nextCursor ? (
            <a className="text-sm underline" href={`?${new URLSearchParams({ q: q || "", limit: String(limit), cursor: page.nextCursor }).toString()}`}>
              Next →
            </a>
          ) : (
            <span className="text-sm text-muted-foreground">End of results</span>
          )}
        </div>
      </div>
    </main>
  );
}
