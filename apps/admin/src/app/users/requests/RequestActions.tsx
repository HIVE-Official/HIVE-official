"use client";

import { useTransition } from "react";
import { Button } from "@hive/ui";
import { toast } from "@hive/ui";

export function RequestActions({ profileId, requestId }: { profileId: string; requestId: string }) {
  const [isPending, start] = useTransition();

  const approve = () => {
    start(async () => {
      try {
        const res = await fetch(`/api/users/grant-role`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ profileId, role: "builder", requestId })
        });
        const json = await res.json();
        if (!res.ok || json?.success !== true) throw new Error(json?.error?.message || "Grant failed");
        toast({ title: "Granted", description: `Builder role granted to ${profileId}` });
        window.location.reload();
      } catch (e: any) {
        toast({ title: "Grant failed", description: String(e?.message || e), variant: "destructive" });
      }
    });
  };

  const reject = () => {
    start(async () => {
      try {
        const res = await fetch(`/api/users/builder-requests/${encodeURIComponent(requestId)}/reject`, {
          method: "POST"
        });
        const json = await res.json();
        if (!res.ok || json?.success !== true) throw new Error(json?.error?.message || "Reject failed");
        toast({ title: "Rejected", description: `Request ${requestId} rejected` });
        window.location.reload();
      } catch (e: any) {
        toast({ title: "Reject failed", description: String(e?.message || e), variant: "destructive" });
      }
    });
  };

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="secondary" disabled={isPending} onClick={approve}>Approve</Button>
      <Button size="sm" variant="destructive" disabled={isPending} onClick={reject}>Reject</Button>
    </div>
  );
}
