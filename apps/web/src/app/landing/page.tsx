"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@hive/ui";
import { ArrowRight } from "lucide-react";
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if user is already authenticated and redirect to dashboard
  useEffect(() => {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      try {
        const session = JSON.parse(sessionJson);
        const sessionAge = Date.now() - new Date(session.verifiedAt).getTime();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (sessionAge <= maxAge && session.onboardingCompleted) {
          router.replace('/');
          return;
        } else if (sessionAge <= maxAge && !session.onboardingCompleted) {
          router.replace('/onboarding');
          return;
        }
      } catch {
        window.localStorage.removeItem('hive_session');
      }
    }
  }, [router]);

  const handleNavigateToSchools = () => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    console.log('🚀 Navigating from landing to schools page');
    
    setTimeout(() => {
      router.push('/schools');
    }, 150);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
        <div className="w-6 h-6 border-2 border-[var(--muted)] border-t-[var(--hive-brand-primary)] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans">
      {/* Simple Header */}
      <header className="border-b border-[var(--border)] backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 transition-all duration-300 hover:scale-105">
              <div className="w-10 h-10 relative">
                <Image 
                  src="/assets/hive-logo-gold.svg" 
                  alt="HIVE Logo" 
                  width={40} 
                  height={40}
                  className="object-contain transition-transform duration-300 hover:rotate-12"
                />
              </div>
              <span className="text-xl font-semibold text-[var(--foreground)]">HIVE</span>
            </div>

            <Button 
              variant="primary" 
              size="sm"
              onClick={handleNavigateToSchools}
              disabled={isNavigating}
              className="transition-all duration-200 hover:scale-105"
            >
              {isNavigating ? 'Loading...' : 'Get Started'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          {/* Hero */}
          <div className="space-y-6">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-[var(--foreground)] font-sans">
                Finally, your campus.
              </h1>
            </div>
          </div>

          {/* CTA */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
            <Button 
              variant="accent" 
              size="xl" 
              className="group px-12 font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={handleNavigateToSchools}
              disabled={isNavigating}
              data-testid="get-started-button"
            >
              {isNavigating ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Loading...
                </span>
              ) : (
                <span className="flex items-center">
                  Join Your Campus
                  <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}