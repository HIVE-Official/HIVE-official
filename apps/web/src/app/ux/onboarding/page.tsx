"use client";

import { HiveCard, Button, Input } from "@hive/ui";

export default function OnboardingUXPage() {
  return (
    <div className="min-h-screen bg-[var(--hive-background)] text-[var(--hive-foreground)]">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-2xl font-semibold">Onboarding Sandbox</h1>
        <p className="text-white/60">Explore step variants and micro‑interactions before wiring data</p>

        <div className="space-y-6">
          <HiveCard className="p-6 space-y-4">
            <h2 className="text-lg font-medium">Step: Email</h2>
            <Input placeholder="you@school.edu" />
            <div className="flex gap-3">
              <Button variant="brand">Continue</Button>
              <Button variant="ghost">Use Google</Button>
            </div>
          </HiveCard>

          <HiveCard className="p-6 space-y-4">
            <h2 className="text-lg font-medium">Step: Interests</h2>
            <div className="text-white/60 text-sm">Chip selection UI goes here</div>
            <div className="flex gap-2 flex-wrap">
              {['AI', 'Study', 'Clubs', 'Events', 'Sports'].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full border text-sm">{t}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="secondary">Back</Button>
              <Button variant="brand">Next</Button>
            </div>
          </HiveCard>
        </div>
      </div>
    </div>
  );
}

