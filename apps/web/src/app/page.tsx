"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@hive/ui';

/**
 * HIVE Entry Page
 * Simple, minimal entry page with liquid button animations
 */
export default function EntryPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        {/* HIVE Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/hive-logo-white.svg"
            alt="HIVE"
            width={80}
            height={80}
            className="w-20 h-20"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/assets/whitelogo.svg";
            }}
          />
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl font-black text-white mb-2 tracking-tight">
          HIVE
        </h1>
        
        {/* Tagline */}
        <p className="text-lg text-white/60 mb-12">
          Your Campus, Connected
        </p>

        {/* Single Primary Action */}
        <div className="max-w-xs mx-auto">
          <Link href="/schools" className="block">
            <Button 
              variant="accent"
              className="w-full"
            >
              Get Started
            </Button>
          </Link>
          
          {/* Simple text link for returning users */}
          <p className="text-sm text-white/40 mt-6 text-center">
            <Link href="/auth/login" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD700] rounded-full blur-[200px] opacity-[0.02]" />
      </div>

    </div>
  );
}