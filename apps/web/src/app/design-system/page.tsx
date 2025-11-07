"use client";

import React from "react";
import { Button, HiveCard, Skeleton, Input, Badge } from "@hive/ui";

const colorVars = [
  "--hive-brand-primary",
  "--hive-brand-primary-strong",
  "--hive-background",
  "--hive-background-secondary",
  "--hive-foreground",
  "--hive-border-primary",
  "--hive-overlay-glass-strong",
  "--hive-overlay-gold-subtle",
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[var(--hive-background)] text-[var(--hive-foreground)]">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">HIVE Design System</h1>
          <p className="text-white/60">Tokens, components, and UX building blocks</p>
        </header>

        {/* Color tokens */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Color Tokens</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {colorVars.map((v) => (
              <div key={v} className="rounded-xl border p-4" style={{ borderColor: "var(--hive-border-primary)" }}>
                <div className="h-16 rounded-lg mb-3" style={{ background: `var(${v})` }} />
                <div className="text-sm font-mono text-white/80">{v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="brand">Brand</Button>
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        {/* Cards + Inputs */}
        <section className="grid md:grid-cols-2 gap-6">
          <HiveCard className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Card + Form</h3>
            <div className="space-y-3">
              <label className="text-sm text-white/70">Name</label>
              <Input placeholder="Enter name" />
            </div>
            <div className="space-y-3">
              <label className="text-sm text-white/70">Email</label>
              <Input type="email" placeholder="your@school.edu" />
            </div>
            <div className="pt-2">
              <Button variant="brand" className="w-full">Save</Button>
            </div>
          </HiveCard>

          <HiveCard className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Skeleton + Badges</h3>
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-24 w-full" />
              <div className="flex gap-2">
                <Badge>Default</Badge>
                <Badge>Member</Badge>
                <Badge>Leader</Badge>
              </div>
            </div>
          </HiveCard>
        </section>

        {/* UX Links */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">UX Sandboxes</h2>
          <p className="text-white/60">Quick links to live design playgrounds</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <a className="rounded-xl border p-5 hover:bg-white/5 transition" href="/ux/onboarding">
              <div className="text-lg font-medium mb-1">Onboarding Flow</div>
              <div className="text-sm text-white/60">Step variants, microcopy, error states</div>
            </a>
            <a className="rounded-xl border p-5 hover:bg-white/5 transition" href="/ux/profile">
              <div className="text-lg font-medium mb-1">Profile Layout</div>
              <div className="text-sm text-white/60">Blocks, privacy levels, empty states</div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

