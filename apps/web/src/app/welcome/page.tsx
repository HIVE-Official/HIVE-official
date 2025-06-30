"use client";

import { motion } from "framer-motion";
import { Button, Typography, Dialog, HiveLogo } from "@hive/ui";
import { useEffect, useState } from "react";
import { logger } from "@hive/core";
import Link from "next/link";

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
    logger.info("Welcome page mounted");

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
    logger.info("What's Coming clicked");
    setIsDialogOpen(true);
  };

  if (!mounted) {
    return null;
  }

  const formatNumber = (num: number) => num.toString().padStart(2, "0");
  
  const timeUnits = [
    { label: "Days", value: formatNumber(timeLeft.days) },
    { label: "Hours", value: formatNumber(timeLeft.hours) },
    { label: "Minutes", value: formatNumber(timeLeft.minutes) },
    { label: "Seconds", value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Top-left logo */}
      <div className="absolute top-8 left-8 z-20">
        <HiveLogo 
          variant="white" 
          size="lg" 
        />
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBjeD0iMjU2IiBjeT0iMjU2IiByPSIyIi8+PC9zdmc+')] bg-repeat" />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-01 to-background" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto space-y-12">
          {/* HIVE Brand Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mt-8">
              <span className="relative inline-block font-display font-black tracking-tight text-8xl md:text-9xl text-foreground">
                HIVE
              </span>
            </div>
          </motion.div>

          {/* Countdown Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Typography
              variant="h3"
              align="center"
              className="text-accent font-mono tracking-widest"
            >
              LAUNCH IN
            </Typography>

            <div className="grid grid-cols-4 gap-6 mb-8">
              {timeUnits.map(({label, value}) => (
                <div key={label} className="text-center">
                  <div className="bg-surface-02 border border-border rounded-lg p-4 mb-2">
                    <Typography
                      variant="hero"
                      align="center"
                      className="text-accent font-mono tracking-widest"
                    >
                      {value}
                    </Typography>
                  </div>
                  <Typography
                    variant="caption"
                    align="center"
                    className="text-muted font-mono uppercase tracking-wider"
                  >
                    {label}
                  </Typography>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleWhatsComing}
                className="border-2 border-accent bg-transparent text-accent hover:bg-accent/10 transition-colors"
              >
                What&apos;s Coming?
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-accent bg-transparent text-accent hover:bg-accent/10 transition-colors"
              >
                <Link href="/auth/school-select">
                  Get Started
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* What's Coming Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="What's Coming in HIVE"
      >
        <div className="space-y-4">
          <Typography variant="body">
            HIVE is transforming how students connect, collaborate, and create on campus.
            Join us for the launch of the next generation of campus social networking.
          </Typography>
          <Typography variant="body">
            • Exclusive campus-only communities
            • Privacy-first social features
            • Real-time campus events and updates
            • Collaborative tools for student projects
          </Typography>
        </div>
      </Dialog>
    </div>
  );
}
