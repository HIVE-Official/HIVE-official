// Bounded Context Owner: HiveLab Guild
"use client";

import Link from "next/link";
import {
  HiveLabShell,
  type HiveLabCanvasShellPayload,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Badge,
} from "@hive/ui";

export function LabCanvasClient({ spaceId, payload }: { spaceId: string; payload: HiveLabCanvasShellPayload }): JSX.Element {
  return (
    <div className="relative">
      {/* Quick actions */}
      <div className="pointer-events-auto absolute right-4 top-4 z-10 flex gap-2">
        <Link
          href={`/lab/${spaceId}/create`}
          className="rounded-lg border border-border/40 bg-background/80 px-3 py-1.5 text-sm text-foreground hover:border-primary/40"
        >
          New tool
        </Link>
        <Link
          href={`/lab/${spaceId}/tools/tool-rsvp-checkin/edit`}
          className="rounded-lg border border-border/40 bg-background/80 px-3 py-1.5 text-sm text-foreground hover:border-primary/40"
        >
          Edit demo tool →
        </Link>
        <button
          className="rounded-lg border border-border/40 bg-background/80 px-3 py-1.5 text-sm text-foreground hover:border-primary/40"
          onClick={() => {
            void (async () => {
              // Prefer active tool id, else first listed tool; fall back to a known seed id
              const candidate = payload.activeTool?.tool?.id || payload.tools?.[0]?.id || "tool-event-rsvp";
              const runId = typeof candidate === "string" && candidate.trim() ? candidate : "tool-event-rsvp";
              const endpoint = `/api/lab/spaces/${encodeURIComponent(spaceId)}/tools/${encodeURIComponent(runId)}/execute?profileId=profile-jwrhineh`;
              try {
                const res = await fetch(endpoint, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ authorHandle: "hivelab", content: "Run from canvas", placement: "board:input" })
                });
                if (!res.ok) {
                  // One retry with tool-event-rsvp if the chosen tool isn't found
                  if (runId !== "tool-event-rsvp" && res.status === 404) {
                    const retry = await fetch(`/api/lab/spaces/${encodeURIComponent(spaceId)}/tools/tool-event-rsvp/execute?profileId=profile-jwrhineh`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ authorHandle: "hivelab", content: "Run from canvas", placement: "board:input" })
                    });
                    if (!retry.ok) throw new Error(`Execute failed (${retry.status})`);
                  } else {
                    throw new Error(`Execute failed (${res.status})`);
                  }
                }
                // Navigate to the space board to see the post
                window.location.assign(`/spaces/${encodeURIComponent(spaceId)}`);
              } catch (e) {
                alert(e instanceof Error ? e.message : "Failed to execute tool");
              }
            })();
          }}
        >
          Run tool →
        </button>
      </div>
      <HiveLabShell payload={payload} />

      {/* Library modal */}
      <Dialog open={payload.overlays.libraryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Library</DialogTitle>
            <DialogDescription>Start from a template that fits your use case.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[{ id: "tpl-rsvp", name: "Campus RSVP" }, { id: "tpl-feedback", name: "Feedback Collector" }].map((t) => (
              <div key={t.id} className="rounded-xl border border-border/40 p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="font-medium">{t.name}</h3>
                  <Badge variant="outline">Starter</Badge>
                </div>
                <p className="text-sm text-muted-foreground">A pre‑configured tool you can customize.</p>
                <div className="mt-3">
                  <Link href={`/lab/${spaceId}/create?templateId=${t.id}`} className="rounded border border-border/40 px-3 py-1.5 text-sm hover:border-primary/40">Use template</Link>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Link href={`/lab/${spaceId}`} className="rounded border border-border/40 px-3 py-1.5 text-sm hover:border-primary/40">
              Close
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Run Test panel */}
      <Sheet open={payload.overlays.runTestOpen}>
        <SheetContent side="right" className="w-[420px] sm:w-[560px]">
          <SheetHeader>
            <SheetTitle>Run Test</SheetTitle>
            <SheetDescription>Preview student experience and health checks.</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border/40 p-4">
              <h4 className="font-medium">Student view</h4>
              <p className="text-sm text-muted-foreground">Start sheet and Live area preview (static for demo).</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/40 p-4">
                <div className="text-xs uppercase text-muted-foreground">Timeline</div>
                <div className="text-sm">24h before • At start • After close</div>
              </div>
              <div className="rounded-xl border border-border/40 p-4">
                <div className="text-xs uppercase text-muted-foreground">Attach</div>
                <div className="text-sm">No event attached</div>
              </div>
            </div>
            <div className="rounded-xl border border-border/40 p-4">
              <div className="text-xs uppercase text-muted-foreground">Health</div>
              <div className="text-sm">Looks good • 0 blocking issues</div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/lab/${spaceId}?toolId=tool-rsvp-checkin&test=1`}
                className="rounded border border-border/40 px-3 py-1.5 text-sm hover:border-primary/40"
              >
                Run test
              </Link>
              <Link
                href={`/lab/${spaceId}?toolId=tool-rsvp-checkin&publish=1`}
                className="rounded border border-border/40 px-3 py-1.5 text-sm hover:border-primary/40"
              >
                Publish
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Publish panel */}
      <Sheet open={payload.overlays.publishOpen}>
        <SheetContent side="right" className="w-[420px] sm:w-[560px]">
          <SheetHeader>
            <SheetTitle>Publish</SheetTitle>
            <SheetDescription>Deploy to your Space. You can pin versions.</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border/40 p-4">
              <h4 className="font-medium">Where</h4>
              <p className="text-sm text-muted-foreground">{spaceId}</p>
            </div>
            <div className="rounded-xl border border-border/40 p-4">
              <h4 className="font-medium">Version</h4>
              <p className="text-sm text-muted-foreground">Latest draft</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Lints panel */}
      <Sheet open={payload.overlays.lintDrawerOpen}>
        <SheetContent side="right" className="w-[420px] sm:w-[560px]">
          <SheetHeader>
            <SheetTitle>Issues</SheetTitle>
            <SheetDescription>Warnings appear here as you build.</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border/40 p-4">
              <div className="text-sm">No blocking issues.</div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Replace Panel */}
      <Sheet open={payload.overlays.replacePickerOpen}>
        <SheetContent side="right" className="w-[420px] sm:w-[560px]">
          <SheetHeader>
            <SheetTitle>Replace</SheetTitle>
            <SheetDescription>Swap an element while preserving wiring.</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border/40 p-4">
              <div className="text-sm">Pick a compatible element.</div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default LabCanvasClient;
