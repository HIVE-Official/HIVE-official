"use client";

import { useEffect, useState } from "react";
import { SpaceCalendarView } from "@hive/ui";

type UiEvent = Parameters<typeof SpaceCalendarView>[0]["events"][number];

export default function SpaceCalendarPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [events, setEvents] = useState<UiEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/spaces/${id}/events`, { cache: "no-store" });
        const data = await res.json();
        setEvents((data.events as any[]).map((it) => ({ ...it, startTime: new Date(it.startTime), endTime: new Date(it.endTime), createdAt: new Date(it.createdAt), updatedAt: new Date(it.updatedAt) })));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  return (
    <main className="page px-page py-section">
      <div className="container-page max-w-5xl space-y-4">
        {loading ? (
          <p className="text-muted-foreground">Loading calendar…</p>
        ) : (
          <SpaceCalendarView
            events={events}
            defaultView="list"
            lockScopeToSpace
            showOpenFullCalendarLink={false}
            showSourcesToggle={false}
          />
        )}
      </div>
    </main>
  );
}
