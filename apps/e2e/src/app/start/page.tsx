"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Badge, Progress, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@hive/ui";
import { GraduationCap, Mail } from "lucide-react";

function useAutoContinue(opts: { holdMs?: number; countdownMs?: number; onComplete: () => void }) {
  const { holdMs = 900, countdownMs = 2000, onComplete } = opts;
  const [active, setActive] = React.useState(true);
  const [remaining, setRemaining] = React.useState(countdownMs);
  const raf = React.useRef<number | null>(null);
  const startAt = React.useRef<number | null>(null);

  const cancel = React.useCallback(() => {
    setActive(false);
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  React.useEffect(() => {
    let holdTimer: number | null = null;
    if (!active) return;
    holdTimer = window.setTimeout(() => {
      startAt.current = performance.now();
      const tick = (t: number) => {
        if (!startAt.current) return;
        const elapsed = t - startAt.current;
        const next = Math.max(0, countdownMs - elapsed);
        setRemaining(next);
        if (next <= 0) {
          onComplete();
          return;
        }
        raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    }, holdMs) as unknown as number;
    return () => {
      if (holdTimer) window.clearTimeout(holdTimer);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [active, holdMs, countdownMs, onComplete]);

  return { active, remaining, cancel } as const;
}

export default function StartEntry(): JSX.Element {
  const router = useRouter();
  const [inviteOpen, setInviteOpen] = React.useState(false);
  // Auto-continue to campus preview (spaces) with a cancellable countdown
  const { active, remaining, cancel } = useAutoContinue({
    holdMs: 900,
    countdownMs: 2000,
    onComplete: () => router.push("/spaces")
  });

  // ESC cancels timer
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) cancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, cancel]);

  // Minimal campus facts using existing endpoints (best-effort)
  const [facts, setFacts] = React.useState<{ spaces: number; eventsThisWeek: number } | null>(null);
  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const rec = await fetch(`/api/spaces/recommended?campusId=ub-buffalo&profileId=demo&limit=5`).then((r) => r.json());
        const spaces = Array.isArray(rec?.spaces) ? rec.spaces : [];
        // Peek at robotics events for a live feel if present
        const rb = spaces.find((s: any) => s.id === "space-robotics");
        let eventsThisWeek = 0;
        if (rb) {
          const ev = await fetch(`/api/spaces/${rb.id}/events`).then((r) => r.json());
          const now = Date.now();
          const week = 7 * 24 * 60 * 60 * 1000;
          eventsThisWeek = Array.isArray(ev?.events)
            ? ev.events.filter((e: any) => new Date(e.startTime).getTime() < now + week).length
            : 0;
        }
        if (alive) setFacts({ spaces: spaces.length, eventsThisWeek });
      } catch (_) {
        if (alive) setFacts(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const pct = Math.round(((2000 - Math.min(2000, remaining)) / 2000) * 100);
  const seconds = Math.ceil(remaining / 1000);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <section className="mx-auto w-full max-w-[960px] px-4 py-12 md:py-16">
        {/* UB context and hero */}
        <div className="keyline-gold-top rounded-xl border border-border bg-card p-6 md:p-8 shadow-hive-1">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-caption text-muted-foreground">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Campus</span>
              <span>UB • University at Buffalo</span>
            </div>
            <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
              <DialogTrigger asChild>
                <button className="text-sm text-foreground/80 underline-offset-4 hover:underline focus-ring rounded px-2 py-1">Have an invite?</button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter invite code</DialogTitle>
                  <DialogDescription>Use your code to jump straight into a Space.</DialogDescription>
                </DialogHeader>
                <div className="mt-2 grid gap-3">
                  <label className="text-sm" htmlFor="invite">Code</label>
                  <input id="invite" className="h-11 rounded-md border border-border bg-background px-3 focus-ring" placeholder="e.g., UB-ROBOTICS-2025" />
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button variant="ghost" onClick={() => setInviteOpen(false)}>Cancel</Button>
                    <Button variant="gold" onClick={() => setInviteOpen(false)}>
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Continue
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-6 space-y-3">
            <h1 className="text-2xl font-semibold md:text-3xl">Welcome, UB students.</h1>
            <p className="text-muted-foreground">Preview campus spaces and join when you’re ready.</p>
          </div>

          {/* Campus facts row (non-generic, data-backed) */}
          <div className="mt-6 flex flex-wrap items-center gap-2 text-caption text-muted-foreground">
            <Badge variant="muted">Campus OS</Badge>
            {facts ? (
              <>
                <span>•</span>
                <span>{facts.spaces} spaces to explore</span>
                {facts.eventsThisWeek > 0 && (
                  <>
                    <span>•</span>
                    <span>{facts.eventsThisWeek} events this week</span>
                  </>
                )}
              </>
            ) : (
              <>
                <span>•</span>
                <span>Fresh spaces and events weekly</span>
              </>
            )}
          </div>

          {/* Primary CTA + timer */}
          <div className="mt-8 max-w-sm">
            <Button
              variant="gold"
              size="lg"
              className="w-full focus-ring"
              onClick={() => router.push("/spaces")}
            >
              Continue to UB Buffalo
            </Button>
            {/* Timer UI: neutral thin progress + inline pill with Cancel */}
            {active ? (
              <div className="mt-3">
                <Progress value={pct} thickness="sm" aria-hidden="true" />
                <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground" aria-live="polite" role="status">
                  <span>Continuing to UB Buffalo in {seconds}s</span>
                  <button onClick={cancel} className="rounded px-2 py-1 underline-offset-4 hover:underline focus-ring">Cancel</button>
                </div>
              </div>
            ) : null}
            <p className="mt-3 text-caption text-muted-foreground">Guest browsing shows public info; joining may require verification.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

