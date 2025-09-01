"use client";

// Force dynamic rendering to avoid SSG issues with auth
export const dynamic = 'force-dynamic';

/**
 * SECURITY: Development login page disabled
 * Use proper authentication flow instead
 */
export default function DevLoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-red-950/20 border border-red-500/30 rounded-lg p-6 text-center">
        <div className="text-red-400 text-4xl mb-4">🚫</div>
        <h1 className="text-xl font-bold text-red-400 mb-3">
          Development Login Disabled
        </h1>
        <p className="text-red-300 text-sm mb-4">
          This development bypass has been disabled for security reasons.
        </p>
        <p className="text-neutral-400 text-xs">
          Use the proper authentication flow at <a href="/auth/login" className="text-blue-400 underline">/auth/login</a>
        </p>
      </div>
    </div>
  );
}