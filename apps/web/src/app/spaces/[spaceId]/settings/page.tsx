export default function SpaceSettingsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Space Settings</h1>
      <p className="text-white/70 mb-6">Leader tools for configuring your space.</p>

      <div className="grid gap-4">
        <div className="rounded-lg border border-white/10 p-4 bg-white/5">
          <h2 className="font-medium mb-2">General</h2>
          <p className="text-sm text-white/70">Name, description, visibility, and join policy.</p>
        </div>
        <div className="rounded-lg border border-white/10 p-4 bg-white/5">
          <h2 className="font-medium mb-2">Roles & Permissions</h2>
          <p className="text-sm text-white/70">Manage admins, moderators, and members.</p>
        </div>
        <div className="rounded-lg border border-white/10 p-4 bg-white/5">
          <h2 className="font-medium mb-2">Integrations</h2>
          <p className="text-sm text-white/70">Enable tools like calendar and polls.</p>
        </div>
      </div>
    </div>
  );
}

