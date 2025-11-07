"use client";

import Link from 'next/link';
import { AdminGuard } from '@/components/admin/admin-guard';
import { Card } from '@hive/ui';

export default function ControlBoardPage() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
          <header>
            <h1 className="text-3xl font-semibold">HIVE Control Board</h1>
            <p className="text-white/60">Platform configuration across campuses</p>
          </header>

          <section className="grid gap-4 sm:grid-cols-2">
            <Link href="/ux/admin/onboarding-catalog" className="rounded-xl border border-white/15 hover:bg-white/5 transition">
              <Card className="p-5 bg-transparent">
                <div className="text-lg font-medium mb-1">Onboarding Catalog</div>
                <div className="text-sm text-white/60">Majors, graduation years, and interests per campus</div>
              </Card>
            </Link>

            <Link href="/admin" className="rounded-xl border border-white/15 hover:bg-white/5 transition">
              <Card className="p-5 bg-transparent">
                <div className="text-lg font-medium mb-1">Feature Flags</div>
                <div className="text-sm text-white/60">Gate risky features and coordinate rollouts</div>
              </Card>
            </Link>

            <Link href="/admin" className="rounded-xl border border-white/15 hover:bg-white/5 transition">
              <Card className="p-5 bg-transparent">
                <div className="text-lg font-medium mb-1">Campus & Spaces</div>
                <div className="text-sm text-white/60">Spaces system, strict enforcement, campus expansion</div>
              </Card>
            </Link>

            <Link href="/admin" className="rounded-xl border border-white/15 hover:bg-white/5 transition">
              <Card className="p-5 bg-transparent">
                <div className="text-lg font-medium mb-1">Moderation & Safety</div>
                <div className="text-sm text-white/60">Real‑time moderation and behavioral analytics</div>
              </Card>
            </Link>
          </section>
        </div>
      </div>
    </AdminGuard>
  );
}

