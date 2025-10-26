"use client";

import { useEffect, useState } from "react";
import { Badge } from "@hive/ui";
import { ModerationActions } from "./ModerationActions";

export type ModerationItemUI = {
  id: string;
  contentType: string;
  contentId: string;
  reason?: string;
  priority?: string;
  status?: string;
  createdAt?: string | null; // ISO for client
};

export function ModerationLiveList({ initial, onOpen }: { initial: readonly ModerationItemUI[]; onOpen?: (id: string) => void }) {
  const [items, setItems] = useState<ModerationItemUI[]>(initial as ModerationItemUI[]);

  useEffect(() => {
    let active = true;
    const fetchNow = async () => {
      try {
        const res = await fetch("/api/moderation/open", { cache: "no-store" });
        const json = await res.json();
        if (res.ok && json?.success && active) {
          setItems((json.data?.items || []) as ModerationItemUI[]);
        }
      } catch {}
    };
    const t = setInterval(fetchNow, 10000);
    return () => {
      active = false;
      clearInterval(t);
    };
  }, []);

  return (
    <div className="divide-y divide-border rounded-md border border-border bg-card">
      {items.length === 0 ? (
        <div className="p-4 text-muted-foreground">No open items.</div>
      ) : (
        items.map((m) => (
          <div key={m.id} className="grid grid-cols-1 md:grid-cols-7 gap-2 px-3 py-3 cursor-pointer" onClick={() => onOpen?.(m.id)}>
            <div>
              <Badge variant="secondary">{m.contentType}</Badge>
            </div>
            <div className="md:col-span-2 truncate">{m.contentId}</div>
            <div className="truncate">{m.reason ?? "—"}</div>
            <div>{m.priority ? <Badge variant="outline">{m.priority}</Badge> : "—"}</div>
            <div className="text-muted-foreground">
              {m.createdAt ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(m.createdAt)) : "—"}
            </div>
            <div className="flex md:justify-end"><ModerationActions id={m.id} /></div>
          </div>
        ))
      )}
    </div>
  );
}
