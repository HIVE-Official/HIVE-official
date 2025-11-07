"use client";

import { HiveCard, Button } from "@hive/ui";

export default function ProfileUXPage() {
  return (
    <div className="min-h-screen bg-[var(--hive-background)] text-[var(--hive-foreground)]">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-2xl font-semibold">Profile Layout Sandbox</h1>
        <p className="text-white/60">Assemble blocks and test privacy/empty states</p>

        <div className="grid md:grid-cols-3 gap-6">
          <HiveCard className="p-5 space-y-3">
            <div className="text-sm text-white/60">Identity</div>
            <div className="h-24 rounded-lg bg-white/5" />
            <Button variant="ghost">Edit identity</Button>
          </HiveCard>

          <HiveCard className="p-5 space-y-3">
            <div className="text-sm text-white/60">Spaces</div>
            <div className="h-24 rounded-lg bg-white/5" />
            <Button variant="ghost">Manage spaces</Button>
          </HiveCard>

          <HiveCard className="p-5 space-y-3">
            <div className="text-sm text-white/60">Connections</div>
            <div className="h-24 rounded-lg bg-white/5" />
            <Button variant="ghost">Invite friends</Button>
          </HiveCard>
        </div>
      </div>
    </div>
  );
}

