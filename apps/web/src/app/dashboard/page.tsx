"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@hive/ui';
import { User, LogOut, Settings, Calendar, Users, Home } from 'lucide-react';

/**
 * Dashboard page - Main hub after authentication
 */
export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated
    const authSession = localStorage.getItem('auth_session');
    const userDataStr = localStorage.getItem('user_data');
    
    if (!authSession && !userDataStr) {
      router.push('/signin');
      return;
    }

    if (userDataStr) {
      setUserData(JSON.parse(userDataStr));
    } else if (authSession) {
      const session = JSON.parse(authSession);
      setUserData({
        email: session.email,
        displayName: session.email === 'jwrhineh@buffalo.edu' ? 'Jacob Rhineheart' : 'User',
        handle: session.email.split('@')[0]
      });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_session');
    localStorage.removeItem('user_data');
    localStorage.removeItem('onboarding_complete');
    document.cookie = 'session-token=; path=/; max-age=0';
    router.push('/');
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <div className="text-[var(--hive-text-primary)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Header */}
      <div className="border-b border-[var(--hive-background-tertiary)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">HIVE Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-[var(--hive-text-primary)]">{userData.displayName}</p>
                <p className="text-xs text-[#6B6B6F]">@{userData.handle}</p>
              </div>
              
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-[#8B8B8F] hover:text-[var(--hive-text-primary)]"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quick Actions */}
          <Link href="/feed" className="group">
            <div className="bg-[var(--hive-background-tertiary)] rounded-lg p-6 border border-[var(--hive-gray-700)] hover:border-[var(--hive-gold)] transition-colors">
              <Home className="w-8 h-8 text-[var(--hive-gold)] mb-4" />
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">Feed</h3>
              <p className="text-sm text-[#8B8B8F]">View your campus feed</p>
            </div>
          </Link>

          <Link href="/spaces" className="group">
            <div className="bg-[var(--hive-background-tertiary)] rounded-lg p-6 border border-[var(--hive-gray-700)] hover:border-[var(--hive-gold)] transition-colors">
              <Users className="w-8 h-8 text-[var(--hive-gold)] mb-4" />
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">Spaces</h3>
              <p className="text-sm text-[#8B8B8F]">Join campus communities</p>
            </div>
          </Link>

          <Link href="/calendar" className="group">
            <div className="bg-[var(--hive-background-tertiary)] rounded-lg p-6 border border-[var(--hive-gray-700)] hover:border-[var(--hive-gold)] transition-colors">
              <Calendar className="w-8 h-8 text-[var(--hive-gold)] mb-4" />
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">Events</h3>
              <p className="text-sm text-[#8B8B8F]">Campus calendar</p>
            </div>
          </Link>

          <Link href="/profile/settings" className="group">
            <div className="bg-[var(--hive-background-tertiary)] rounded-lg p-6 border border-[var(--hive-gray-700)] hover:border-[var(--hive-gold)] transition-colors">
              <Settings className="w-8 h-8 text-[var(--hive-gold)] mb-4" />
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">Settings</h3>
              <p className="text-sm text-[#8B8B8F]">Manage your profile</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}