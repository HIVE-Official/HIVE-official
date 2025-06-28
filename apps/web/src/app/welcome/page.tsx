"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button, Typography, Dialog } from "@hive/ui";
import { useEffect, useState } from "react";

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Launch date - July 9th, 2025
  const launchDate = new Date("2025-07-09T00:00:00Z");

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const difference = launchDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    // Initial calculation
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [launchDate]);

  const handleWhatsComing = () => {
    setIsDialogOpen(true);
  };

  if (!mounted) {
    return null;
  }

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Clean black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Clean Countdown Timer */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="hero"
              align="center"
              className="text-accent font-mono tracking-widest mb-6"
            >
              LAUNCH IN
            </Typography>

            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Typography
                  variant="hero"
                  align="center"
                  className="text-accent font-mono tracking-widest"
                >
                  {formatNumber(timeLeft.days)}
                </Typography>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-accent/60 font-mono uppercase tracking-wider mt-2"
                >
                  Days
                </Typography>
              </div>

              <div className="text-center">
                <Typography
                  variant="hero"
                  align="center"
                  className="text-accent font-mono tracking-widest"
                >
                  {formatNumber(timeLeft.hours)}
                </Typography>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-accent/60 font-mono uppercase tracking-wider mt-2"
                >
                  Hours
                </Typography>
              </div>

              <div className="text-center">
                <Typography
                  variant="hero"
                  align="center"
                  className="text-accent font-mono tracking-widest"
                >
                  {formatNumber(timeLeft.minutes)}
                </Typography>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-accent/60 font-mono uppercase tracking-wider mt-2"
                >
                  Minutes
                </Typography>
              </div>

              <div className="text-center">
                <Typography
                  variant="hero"
                  align="center"
                  className="text-accent font-mono tracking-widest"
                >
                  {formatNumber(timeLeft.seconds)}
                </Typography>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-accent/60 font-mono uppercase tracking-wider mt-2"
                >
                  Seconds
                </Typography>
              </div>
            </div>
          </motion.div>

          {/* vBETA Signup Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 space-y-8"
          >
            <Typography
              variant="h3"
              align="center"
              className="text-accent font-mono uppercase tracking-wider"
            >
              Sign up for vBETA
            </Typography>

            <Typography
              variant="body"
              align="center"
              className="text-accent/60 max-w-2xl mx-auto leading-relaxed font-sans"
            >
              Project will be fully released by July 9th, 2025, but we&apos;re
              rolling out features in bits and pieces. Sign up now to get
              notified as new elements unlock.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/auth/email">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 px-10 py-4 font-sans"
                >
                  Get Started
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={handleWhatsComing}
                className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 px-10 py-4 font-sans"
              >
                What&apos;s Coming
              </Button>
            </div>
          </motion.div>

          {/* Status Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <Typography
              variant="caption"
              align="center"
              className="text-accent/40 font-mono uppercase tracking-widest"
            >
              System Status: vBETA Development
            </Typography>
          </motion.div>
        </div>
      </div>

      {/* What's Coming Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="🚀 What's Coming to HIVE vBETA"
        description="We're rolling out features gradually. Here's what's on the roadmap:"
        size="lg"
      >
        <div className="space-y-6">
          <div className="flex items-start space-x-4 p-4 rounded-lg bg-surface-02/50 border border-border">
            <div className="text-2xl">👤</div>
            <div>
              <Typography variant="h4" className="font-sans mb-2">
                Profile Dashboard
              </Typography>
              <Typography variant="body" className="text-muted font-sans">
                Complete user profiles with customization options, achievements,
                and campus connections.
              </Typography>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 rounded-lg bg-surface-02/50 border border-border">
            <div className="text-2xl">🏠</div>
            <div>
              <Typography variant="h4" className="font-sans mb-2">
                Spaces
              </Typography>
              <Typography variant="body" className="text-muted font-sans">
                Create and join campus communities, clubs, study groups, and
                interest-based spaces.
              </Typography>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 rounded-lg bg-surface-02/50 border border-border">
            <div className="text-2xl">📱</div>
            <div>
              <Typography variant="h4" className="font-sans mb-2">
                Feed & Rituals Engine
              </Typography>
              <Typography variant="body" className="text-muted font-sans">
                Share moments, discover campus traditions, and engage with your
                community&apos;s daily life.
              </Typography>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Typography
              variant="body-sm"
              className="text-muted font-sans text-center"
            >
              You&apos;ll be notified as each feature becomes available during
              the vBETA rollout.
            </Typography>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
