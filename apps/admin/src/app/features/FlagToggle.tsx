"use client";

import { useState, useTransition } from "react";
import { Switch } from "@hive/ui";
import { toast } from "@hive/ui";

export function FlagToggle({
  flagKey,
  initialEnabled
}: {
  flagKey: string;
  initialEnabled: boolean;
}) {
  const [enabled, setEnabled] = useState<boolean>(initialEnabled);
  const [isPending, startTransition] = useTransition();

  const onChange = (next: boolean) => {
    setEnabled(next);
    startTransition(async () => {
      try {
        const res = await fetch(`/api/features/${encodeURIComponent(flagKey)}/toggle`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ enabled: next })
        });
        const json = await res.json();
        if (!res.ok || json?.success !== true) {
          throw new Error(json?.error?.message || "Failed to toggle feature");
        }
        if (!json?.data?.persisted) {
          toast({ title: "No-op in dev", description: "Feature state not persisted (Firebase not configured)." });
        }
      } catch (err: any) {
        setEnabled((prev) => !prev);
        toast({ title: "Toggle failed", description: String(err?.message || err), variant: "destructive" });
      }
    });
  };

  return (
    <Switch checked={enabled} onCheckedChange={onChange} disabled={isPending} aria-label={`Toggle ${flagKey}`} />
  );
}
