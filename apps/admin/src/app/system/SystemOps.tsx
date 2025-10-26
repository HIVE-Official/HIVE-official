"use client";

import { useTransition } from "react";
import { Button } from "@hive/ui";
import { toast } from "@hive/ui";

export function SystemOps() {
  const [isPending, start] = useTransition();

  const check = () => {
    start(async () => {
      try {
        const res = await fetch("/api/system/indexes/check", { cache: "no-store" });
        const json = await res.json();
        if (!res.ok || json?.success !== true) throw new Error(json?.error?.message || "Check failed");
        toast({ title: "Indexes status", description: json?.data?.note || "OK" });
      } catch (e: any) {
        toast({ title: "Check failed", description: String(e?.message || e), variant: "destructive" });
      }
    });
  };

  const deploy = () => {
    start(async () => {
      try {
        const res = await fetch("/api/system/indexes/deploy", { method: "POST" });
        const json = await res.json();
        if (!res.ok || json?.success !== true) throw new Error(json?.error?.message || "Deploy failed");
        toast({ title: "Triggered", description: json?.data?.note || "Deployment stub" });
      } catch (e: any) {
        toast({ title: "Deploy failed", description: String(e?.message || e), variant: "destructive" });
      }
    });
  };

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" disabled={isPending} onClick={check}>Check Indexes</Button>
      <Button size="sm" variant="secondary" disabled={isPending} onClick={deploy}>Deploy Indexes</Button>
    </div>
  );
}
