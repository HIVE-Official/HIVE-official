"use client";

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@hive/auth-logic';
import { HiveLogo, Button } from '@hive/ui';

export default function HomePage() {
  const router = useRouter();
  const auth = useAuth();
  const { user } = auth;
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (auth.isLoading) return;

    if (user) {
      // Authenticated user - redirect to feed
      setIsRedirecting(true);
      router.replace('/feed');
    }
  }, [user, auth.isLoading, router]);

  if (auth.isLoading || isRedirecting) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <HiveLogo size="lg" variant="gradient" showText={true} />
          <p className="text-white/70 mt-4">Loading HIVE...</p>
        </div>
      </div>
    );
  }

  // Public landing page for unauthenticated users
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <HiveLogo size="xl" variant="gradient" showText={true} className="mx-auto mb-8" />
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-hive-gold">HIVE</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The social utility platform where connections have purpose and every interaction moves your life forward.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-hive-gold text-black hover:bg-yellow-400 font-semibold"
              onClick={() => router.push('/auth/login')}
            >
              Join HIVE
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-hive-gold text-hive-gold hover:bg-hive-gold hover:text-black"
              onClick={() => router.push('/spaces')}
            >
              Explore Spaces
            </Button>
          </div>

          {/* Development only - Test Presence System */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4">
              <Button
                size="sm"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black"
                onClick={() => router.push('/test-presence')}
              >
                🧪 Test Presence System
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-hive-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏫</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Campus-First</h3>
            <p className="text-gray-400">Built specifically for university life and student communities</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-hive-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Purposeful Connections</h3>
            <p className="text-gray-400">Every connection has meaning, every community solves problems</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-hive-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛠️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Social Utility</h3>
            <p className="text-gray-400">Tools and spaces created by students, for students</p>
          </div>
        </div>
      </div>
    </div>
  );
}