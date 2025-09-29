'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSimpleAuth } from '@/components/auth/simple-auth-provider';

const ADMIN_EMAILS = ['jwrhineh@buffalo.edu', 'noahowsh@gmail.com'];

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Always call the hook, but use mounted to determine behavior
  const authResult = useSimpleAuth();
  const { user, isLoading } = mounted ? authResult : { user: null, isLoading: true };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading) {
      // Check if user is logged in
      if (!user) {
        console.error('[SECURITY] Unauthorized admin access attempt - no user');
        router.push('/auth/login?error=admin_required');
        return;
      }

      // Check if user email is in admin list
      if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
        console.error(`[SECURITY] Unauthorized admin access attempt by ${user.email}`);
        router.push('/?error=admin_forbidden');
        return;
      }

      // User is authorized
      setIsAuthorized(true);
      console.info(`[ADMIN] Access granted to ${user.email}`);
    }
  }, [user, isLoading, router, mounted]);

  // Show loading while mounting or checking auth
  if (!mounted || isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/60">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Admin verified - show content
  return <>{children}</>;
}