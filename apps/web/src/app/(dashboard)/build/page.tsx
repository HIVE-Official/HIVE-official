"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@hive/ui';
import { Wrench } from 'lucide-react';

// Build page now redirects to Tools > HiveLab per @hive.md consolidation
export default function BuildPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to unified tools section with HiveLab tab
    router.replace('/tools?tab=hivelab');
  }, [router]);
  
  return (
    <PageContainer title="Redirecting to HiveLab..." maxWidth="xl">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Wrench className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4 text-hive-obsidian p-1" />
          <p className="text-white">Redirecting to HiveLab tool builder...</p>
        </div>
      </div>
    </PageContainer>
  );
}