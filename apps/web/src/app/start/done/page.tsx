"use client";

import { useRouter } from "next/navigation";
import { Button } from "@hive/ui";

export default function StartDonePage(): JSX.Element {
  const router = useRouter();
  return (
    <main className="space-y-8 text-center">
      <div className="space-y-3">
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
          Step 4 of 4
        </span>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold leading-tight">You’re in.</h1>
          <p className="text-white/70">
            Your campus identity is verified. Next we’ll set up your profile, connect you with clubs, and unlock the builder tools.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-2xl gap-6 rounded-[28px] border border-white/12 bg-black/35 p-8 text-left shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-4 text-emerald-200">
          <span className="text-2xl" aria-hidden>
            ✨
          </span>
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-emerald-100/70">Verified</div>
            <div className="text-lg font-semibold text-white">Welcome to HIVE</div>
          </div>
        </div>

        <ul className="space-y-3 text-sm text-white/75">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-[#FFD678] to-[#F0B93A]" />
            Set up your builder profile and drop a quick intro.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-[#FFD678] to-[#F0B93A]" />
            Join campus spaces—clubs, labs, and interest-led groups curated for you.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-[#FFD678] to-[#F0B93A]" />
            Start posting, hosting rituals, and shipping tools with classmates.
          </li>
        </ul>
      </div>

      <div className="flex justify-center">
        <Button size="lg" variant="primary" onClick={() => router.push("/onboarding")} data-testid="start-done-continue">
          Continue to onboarding
        </Button>
      </div>
    </main>
  );
}
