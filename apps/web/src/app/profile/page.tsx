"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/use-session';

export default function ProfileIndexPage() {
  const router = useRouter();
  const { user } = useSession();

  useEffect(() => {
    if (user?.id) {
      router.replace(`/profile/${user.id}`);
    } else {
      router.replace('/auth/login?from=/profile');
    }
  }, [user?.id, router]);

  // Lightweight fallback while redirecting
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)] mx-auto mb-4" />
        <p className="text-white/80 text-sm">Loading profile…</p>
      </div>
    </div>
  );
}

