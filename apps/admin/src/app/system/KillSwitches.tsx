"use client";

import { useEffect, useState, useTransition } from "react";
import { Input, Switch, Card } from "@hive/ui";
import { toast } from "@hive/ui";

type Flag = { key: string; enabled: boolean };

const KEYS = ["POSTING_ENABLED", "MEDIA_UPLOADS_ENABLED", "INVITES_ENABLED"] as const;
type KS = typeof KEYS[number];

export function KillSwitches() {
  const [campus, setCampus] = useState("");
  const [flags, setFlags] = useState<Record<KS, boolean>>({ POSTING_ENABLED: true, MEDIA_UPLOADS_ENABLED: true, INVITES_ENABLED: true });
  const [isPending, start] = useTransition();

  useEffect(() => {
    const load = async () => {
      if (!campus) return;
      try {
        const res = await fetch(`/api/features`);
        const json = await res.json();
        if (!res.ok || json?.success !== true) return;
        const f: Flag[] = json.data.flags || [];
        const next: Record<KS, boolean> = {
          POSTING_ENABLED: true,
          MEDIA_UPLOADS_ENABLED: true,
          INVITES_ENABLED: true
        };
        for (const k of KEYS) {
          const entry = f.find((x) => x.key === `${k}:${campus}`);
          next[k] = entry?.enabled ?? true;
        }
        setFlags(next as Record<KS, boolean>);
      } catch (error) {
        console.warn("kill-switches.fetch_failed", error);
      }
    };
    load();
  }, [campus]);

  const toggle = (k: KS, enabled: boolean) => {
    if (!campus) {
      toast({ title: "Campus required", description: "Enter a campusId to change switches", variant: "destructive" });
      return;
    }
    setFlags((s) => ({ ...s, [k]: enabled }));
    start(async () => {
      try {
        const res = await fetch(`/api/features/${encodeURIComponent(`${k}:${campus}`)}/toggle`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ enabled })
        });
        const j = await res.json();
        if (!res.ok || j?.success !== true) throw new Error(j?.error?.message || "Toggle failed");
        toast({ title: `${k}`, description: enabled ? "Enabled" : "Disabled" });
      } catch (e: any) {
        toast({ title: "Toggle failed", description: String(e?.message || e), variant: "destructive" });
      }
    });
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="text-body font-medium">Kill Switches (per campus)</div>
      <div className="text-caption text-muted-foreground">Enter campusId and toggle subsystems. Off = paused.</div>
      <div className="flex gap-2 items-center">
        <Input placeholder="campusId (e.g., ub-buffalo)" value={campus} onChange={(e) => setCampus(e.target.value)} className="max-w-xs" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        {KEYS.map((k) => (
          <Card key={k} className="p-3 flex items-center justify-between">
            <div className="text-sm">{k.replace(/_/g, " ")}</div>
            <Switch checked={!!flags[k]} onCheckedChange={(v) => toggle(k, !!v)} disabled={isPending || !campus} />
          </Card>
        ))}
      </div>
    </Card>
  );
}
