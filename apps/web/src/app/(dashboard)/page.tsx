"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@hive/ui';
import { Activity } from 'lucide-react';

// Dashboard now redirects to FEED per @hive.md four-pillar structure
// Profile is the "Personal Campus Dashboard" with bento grid layout
export default function DashboardPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to feed since dashboard functionality moved to profile per @hive.md
    router.replace('/feed');
  }, [router]);
  
  return (
    <PageContainer title="Redirecting to Feed..." maxWidth="xl">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4 text-hive-obsidian p-1" />
          <p className="text-white">Redirecting to your campus feed...</p>
        </div>
      </div>
    </PageContainer>
  );
}