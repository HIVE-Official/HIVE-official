"use client";

import React, { useState, useEffect } from "react";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiveLogo, HiveButton, HiveCard, HiveModal } from "@hive/ui";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
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
          // User is authenticated and onboarded, redirect to dashboard
          router.replace('/');
          return;
        } else if (sessionAge <= maxAge && !session.onboardingCompleted) {
          // User is authenticated but not onboarded
          router.replace('/onboarding');
          return;
        }
      } catch (error) {
        // Clear corrupted session
        window.localStorage.removeItem('hive_session');
      }
    }
  }, [router]);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigateToSchools = () => {
    setIsNavigating(true);
    // Immediate navigation - no delay to prevent gray flash
    router.push('/schools');
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0B', color: '#E5E5E7' }}>
        <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!isNavigating && (
          <motion.div 
            className="min-h-screen" 
            style={{ backgroundColor: '#0A0A0B', color: '#E5E5E7' }}
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 0.95,
              transition: { 
                duration: 0.3, 
                ease: [0.23, 1, 0.32, 1] 
              }
            }}
          >
        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col p-6">
          
          {/* Top Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center pt-8 pb-4"
          >
            <HiveLogo 
              variant="gold" 
              size="xl"
              showWordmark={true}
              className="scale-125"
            />
          </motion.div>

          {/* Center Content */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-5xl mx-auto text-center space-y-16">
              
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
                data-testid="landing-hero"
              >
                <h1 className="hive-font-sans text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Finally, your{" "}
                  </motion.span>
                  <motion.span 
                    className="text-[#ffd700]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    campus
                  </motion.span>
                </h1>
              </motion.div>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <HiveCard className="inline-block bg-hive-background-secondary/80 backdrop-blur-lg border-hive-border-primary">
                  <div className="flex items-center justify-center gap-4 md:gap-6 p-6">
                    <div className="text-center">
                      <div className="hive-font-sans text-2xl md:text-3xl font-bold text-hive-brand-primary mb-1 tabular-nums">
                        {timeLeft.days.toString().padStart(2, '0')}
                      </div>
                      <span className="hive-font-sans text-xs text-hive-text-secondary uppercase tracking-wider font-medium">Days</span>
                    </div>
                    <div className="hive-font-sans text-xl md:text-2xl text-hive-brand-primary font-light">:</div>
                    <div className="text-center">
                      <div className="hive-font-sans text-2xl md:text-3xl font-bold text-hive-brand-primary mb-1 tabular-nums">
                        {timeLeft.hours.toString().padStart(2, '0')}
                      </div>
                      <span className="hive-font-sans text-xs text-hive-text-secondary uppercase tracking-wider font-medium">Hours</span>
                    </div>
                    <div className="hive-font-sans text-xl md:text-2xl text-hive-brand-primary font-light">:</div>
                    <div className="text-center">
                      <div className="hive-font-sans text-2xl md:text-3xl font-bold text-hive-brand-primary mb-1 tabular-nums">
                        {timeLeft.minutes.toString().padStart(2, '0')}
                      </div>
                      <span className="hive-font-sans text-xs text-hive-text-secondary uppercase tracking-wider font-medium">Minutes</span>
                    </div>
                    <div className="hive-font-sans text-xl md:text-2xl text-hive-brand-primary font-light">:</div>
                    <div className="text-center">
                      <div className="hive-font-sans text-2xl md:text-3xl font-bold text-hive-brand-primary mb-1 tabular-nums">
                        {timeLeft.seconds.toString().padStart(2, '0')}
                      </div>
                      <span className="hive-font-sans text-xs text-hive-text-secondary uppercase tracking-wider font-medium">Seconds</span>
                    </div>
                  </div>
                </HiveCard>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <HiveButton 
                  variant="premium" 
                  size="xl" 
                  className="w-full sm:w-auto"
                  onClick={handleNavigateToSchools}
                  data-testid="get-started-button"
                >
                  Get Started
                </HiveButton>
                <HiveButton 
                  variant="secondary" 
                  size="xl" 
                  className="w-full sm:w-auto"
                  onClick={() => setIsLearnMoreOpen(true)}
                >
                  Learn More
                </HiveButton>
              </motion.div>

            </div>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learn More Modal */}
      <AnimatePresence>
        {isLearnMoreOpen && (
          <HiveModal
            isOpen={isLearnMoreOpen}
            onClose={() => setIsLearnMoreOpen(false)}
            title="About HIVE"
            size="lg"
            motionPreset="slideUp"
          >
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
          <div>
            <p className="hive-font-sans text-lg text-hive-text-primary leading-relaxed mb-6">
              Where students collaborate, innovate, and transform their university together.
            </p>
          </div>

          <div className="space-y-4 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#ffd700] mt-2 flex-shrink-0"></div>
              <div>
                <strong className="hive-font-sans text-hive-text-primary font-semibold">Student-Led Tools</strong>
                <p className="hive-font-sans text-sm leading-relaxed text-hive-text-secondary">Create and share custom campus tools</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#ffd700] mt-2 flex-shrink-0"></div>
              <div>
                <strong className="hive-font-sans text-hive-text-primary font-semibold">Dynamic Spaces</strong>
                <p className="hive-font-sans text-sm leading-relaxed text-hive-text-secondary">Organize around interests and events</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#ffd700] mt-2 flex-shrink-0"></div>
              <div>
                <strong className="hive-font-sans text-hive-text-primary font-semibold">Real Connection</strong>
                <p className="hive-font-sans text-sm leading-relaxed text-hive-text-secondary">Build genuine campus relationships</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#ffd700] mt-2 flex-shrink-0"></div>
              <div>
                <strong className="hive-font-sans text-hive-text-primary font-semibold">Campus-First</strong>
                <p className="hive-font-sans text-sm leading-relaxed text-hive-text-secondary">Designed for student life</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="hive-font-sans text-hive-text-secondary mb-6 font-medium tracking-wide">
              Launching July 2025 • Join the beta program
            </p>
            <HiveButton 
              variant="premium" 
              size="xl" 
              className="w-full"
              onClick={() => {
                setIsLearnMoreOpen(false);
                setTimeout(() => handleNavigateToSchools(), 200);
              }}
            >
              Find Your University
            </HiveButton>
          </div>
            </motion.div>
          </HiveModal>
        )}
      </AnimatePresence>
    </>
  );
}