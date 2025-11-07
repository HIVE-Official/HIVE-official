"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, HiveCard } from "@hive/ui";
import { SocialFeed } from "@/components/social/social-feed";

export default function PreboardingUXPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold">Pre‑Onboarding Flow Sandbox</h1>
          <p className="text-white/60">Entry → Campus → Email → Code → Done → Onboarding</p>
        </header>

        {/* 1) Entry: choices */}
        <section className="grid gap-4 md:grid-cols-2">
          <HiveCard className="p-6 space-y-3">
            <div className="text-lg font-medium">Start with school email</div>
            <p className="text-sm text-white/60">
              Campus‑first access. Verify with your <span className="font-mono">@buffalo.edu</span> or similar.
            </p>
            <div className="flex gap-3">
              <Button variant="brand" onClick={() => router.push("/start")}>Get Started</Button>
              <Link href="/landing" className="text-sm underline underline-offset-2 self-center text-white/70 hover:text-white">
                Learn more
              </Link>
            </div>
          </HiveCard>

          <HiveCard className="p-6 space-y-3">
            <div className="text-lg font-medium">Peek your campus</div>
            <p className="text-sm text-white/60">
              Read‑only preview of what students post. Complete onboarding to join in.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => router.push("#preview-feed")}>Preview feed</Button>
            </div>
          </HiveCard>
        </section>

        {/* 2) Preview feed (mocked) */}
        <section id="preview-feed" aria-labelledby="preview-title" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="preview-title" className="text-lg font-medium">Tonight at UB (Preview)</h2>
            <Link href="/start" className="text-sm underline underline-offset-2 text-white/70 hover:text-white">
              Verify to post
            </Link>
          </div>
          <p className="text-sm text-white/60">
            This is a non‑interactive preview using development data. Performance and visuals mirror the real feed.
          </p>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2 sm:p-3">
            <SocialFeed feedType="home" className="max-w-2xl" />
          </div>
        </section>

        {/* 3) UX notes */}
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Micro‑interactions and states</h2>
          <ul className="list-disc pl-5 text-sm text-white/70 space-y-1">
            <li>Mobile stepper + desktop rail persist across Start pages.</li>
            <li>Code input supports paste and one‑time‑code autofill, with 5‑minute TTL and resend throttle.</li>
            <li>Campus badge appears in the header after selection, editable from Email step.</li>
            <li>All calls use the secure API wrapper with credentials included by default.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

