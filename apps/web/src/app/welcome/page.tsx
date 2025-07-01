"use client";

import { motion } from "framer-motion";
import { Button, Typography, HiveLogo, type ButtonProps, type TypographyProps } from "@hive/ui";
import { useEffect, useState } from "react";
import { logger } from "@hive/core";
import Link from "next/link";

// Define the variant types based on the cva configuration
type ButtonVariant = "default" | "outline" | "ghost" | "accent" | "ritual" | "surface" | "link" | "nav" | "destructive";
type ButtonSize = "xs" | "sm" | "default" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";
type TypographyVariant = "display" | "h1" | "h2" | "h3" | "h4" | "body" | "body-sm" | "caption" | "button" | "label" | "nav" | "code" | "code-block" | "muted" | "subtle" | "small" | "hero" | "lead";
type TypographyAlign = "left" | "center" | "right" | "justify";

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    try {
      // Launch date - July 9th, 2025
      const launchDate = new Date("2025-07-09T00:00:00Z");
      
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
    } catch (err) {
      logger.error("Error in welcome page mount:", err);
      setError(err instanceof Error ? err : new Error("Failed to initialize welcome page"));
    }
  }, []);

  // Show loading state while mounting
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state if something went wrong
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-destructive">Something went wrong</p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
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
                onClick={() => setShowInfo(true)}
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
                <Link href="/auth/school-select">Get Started</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* What's Coming Info (Inline instead of Dialog) */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setShowInfo(false)}
        >
          <motion.div
            className="bg-surface-01 rounded-xl shadow-2xl border border-border p-6 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <h2 className="text-h3 font-display font-semibold mb-4">What&apos;s Coming in HIVE</h2>
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
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setShowInfo(false)}
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
