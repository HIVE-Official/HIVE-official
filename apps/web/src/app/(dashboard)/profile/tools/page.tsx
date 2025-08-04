"use client";

export const dynamic = 'force-dynamic';

export default function ProfileToolsPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Personal Tools</h1>
        <p className="text-gray-400 mb-8">
          Your personal productivity toolkit is being prepared.
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
            <h3 className="text-white font-semibold mb-2">Coming Soon</h3>
            <p className="text-sm text-gray-400">
              Advanced tool management, analytics, and customization features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}