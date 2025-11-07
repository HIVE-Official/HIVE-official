export default function UXHubPage() {
  return (
    <div className="min-h-screen bg-[var(--hive-background)] text-[var(--hive-foreground)]">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-3xl font-semibold">UX Experiments</h1>
        <p className="text-white/60">Central hub for in-progress flows and interaction prototypes</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <a className="rounded-xl border p-5 hover:bg-white/5 transition" href="/ux/preboarding">
            <div className="text-lg font-medium mb-1">Pre‑Onboarding</div>
            <div className="text-sm text-white/60">Entry choices and campus preview</div>
          </a>
          <a className="rounded-xl border p-5 hover:bg-white/5 transition" href="/ux/onboarding">
            <div className="text-lg font-medium mb-1">Onboarding Flow</div>
            <div className="text-sm text-white/60">Stacked steps, validations, recovery paths</div>
          </a>
          <a className="rounded-xl border p-5 hover:bg-white/5 transition" href="/ux/profile">
            <div className="text-lg font-medium mb-1">Profile Layout</div>
            <div className="text-sm text-white/60">Widgets, privacy toggles, activity</div>
          </a>
        </div>
      </div>
    </div>
  );
}
