"use client";

import { useEffect, useMemo, useState } from "react";
import { MembersRoster } from "@hive/ui";
import { useAuth } from "@auth";

type UiMember = Parameters<typeof MembersRoster>[0]["members"][number];

export default function SpaceMembersPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { state } = useAuth();
  const [members, setMembers] = useState<UiMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/spaces/${id}/members`, { cache: "no-store" });
        const data = await res.json();
        setMembers((data.members as any[]).map((it) => ({ ...it, joinedAt: new Date(it.joinedAt), lastActiveAt: it.lastActiveAt ? new Date(it.lastActiveAt) : undefined })));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  const currentUserRole = useMemo<"leader" | "moderator" | "member" | "follower" | undefined>(() => {
    const pid = state.profileId ?? "demo";
    const me = members.find((m) => m.userId === pid);
    return me?.role as any;
  }, [members, state.profileId]);

  return (
    <main className="page px-page py-section">
      <div className="container-page max-w-5xl space-y-4">
        {loading ? (
          <p className="text-muted-foreground">Loading members…</p>
        ) : (
          <MembersRoster members={members} totalCount={members.length} currentUserRole={currentUserRole ?? "member"} />
        )}
      </div>
    </main>
  );
}
