"use client";

import { useTransition } from "react";
import { Button } from "@hive/ui";
import { toast } from "@hive/ui";

export function ModerationActions({ id }: { id: string }) {
  const [isPending, start] = useTransition();

  const act = (action: "approve" | "remove" | "warn" | "ban") => {
    start(async () => {
      try {
        const res = await fetch(`/api/moderation/${encodeURIComponent(id)}/action`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ action })
        });
        const json = await res.json();
        if (!res.ok || json?.success !== true) throw new Error(json?.error?.message || "Action failed");
        toast({ title: "Action applied", description: `${action} completed` });
        // Simple refresh to reflect removal from queue
        window.location.reload();
      } catch (err: any) {
        toast({ title: "Action failed", description: String(err?.message || err), variant: "destructive" });
      }
    });
  };

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" disabled={isPending} onClick={() => act("approve")}>Approve</Button>
      <Button size="sm" variant="destructive" disabled={isPending} onClick={() => act("remove")}>Remove</Button>
      <Button size="sm" variant="secondary" disabled={isPending} onClick={() => act("warn")}>Warn</Button>
    </div>
  );
}
