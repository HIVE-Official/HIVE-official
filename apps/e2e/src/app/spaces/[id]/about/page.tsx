"use client";

import { useEffect, useMemo, useState } from "react";
import { AboutSection } from "@hive/ui";
import { useAuth } from "@auth";

type UiSpace = Parameters<typeof AboutSection>[0]["space"];
type UiLeader = Parameters<typeof AboutSection>[0]["leaders"][number];

export default function SpaceAboutPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { state } = useAuth();
  const [space, setSpace] = useState<UiSpace | null>(null);
  const [leaders, setLeaders] = useState<UiLeader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [s, m] = await Promise.all([
          fetch(`/api/spaces/${id}`, { cache: "no-store" }).then((r) => r.json()),
          fetch(`/api/spaces/${id}/members`, { cache: "no-store" }).then((r) => r.json()),
        ]);
        const castDates = (obj: any) => {
          if (obj && typeof obj === "object") {
            for (const k of Object.keys(obj)) {
              const v = (obj as any)[k];
              if (typeof v === "string" && /\d{4}-\d{2}-\d{2}T/.test(v)) {
                (obj as any)[k] = new Date(v);
              } else if (v && typeof v === "object") {
                castDates(v);
              }
            }
          }
          return obj;
        };
        setSpace(castDates(s.space));
        const members = (m.members as any[]) as UiLeader[];
        setLeaders(members.filter((x) => x.role === "leader" || x.role === "moderator"));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  const isLeader = useMemo(() => {
    const pid = state.profileId ?? "demo";
    return leaders.some((m) => (m as any).userId === pid && ((m as any).role === "leader" || (m as any).role === "moderator"));
  }, [leaders, state.profileId]);

  return (
    <main className="page px-page py-section">
      <div className="container-page max-w-3xl space-y-4">
        {loading || !space ? (
          <p className="text-muted-foreground">Loading about…</p>
        ) : (
          <AboutSection space={space} leaders={leaders} isLeader={isLeader} onSave={() => { /* e2e: no persistence */ }} />
        )}
      </div>
    </main>
  );
}
