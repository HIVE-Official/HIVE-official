'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { OnboardingWizard } from '@/components/auth/OnboardingWizard';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/motion';
import Image from "next/image";

export default function OnboardingPage() {
  const { user, userProfile, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || userProfile?.onboardingStatus === 'completed')) {
      router.push('/dashboard');
    }
  }, [user, userProfile, loading, router]);

  if (loading || !user) {
    // You can replace this with a proper loading spinner component
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-sm text-center">
        {/* HIVE Logo */}
        <div className="flex justify-center mb-12 animate-fade-in-up">
          <Image
            src="/assets/images/hivelogo.png"
            alt="HIVE Logo"
            width={120}
            height={32}
            className="object-contain"
          />
        </div>

        <OnboardingWizard />

      </div>
    </div>
  );
} 