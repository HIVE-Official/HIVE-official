"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@hive/ui';
import { User, LogOut, Settings, Calendar, Users, Home } from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Dashboard page - Main hub after authentication
 */
export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated with Firebase
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      // Fetch user profile from Firestore
      try {
        const userDoc = await getDoc(doc(db, 'users', user.id));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            email: user.email,
            displayName: data.displayName || data.name || user.displayName || 'User',
            handle: data.handle || user.email?.split('@')[0]
          });
        } else {
          // User exists but no profile - redirect to onboarding
          router.push('/onboarding');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData({
          email: user.email,
          displayName: user.displayName || 'User',
          handle: user.email?.split('@')[0]
        });
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
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