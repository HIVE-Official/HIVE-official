"use client";

import { motion } from "framer-motion";
import { Button, Typography, Dialog, HiveLogo } from "@hive/ui";
import { useEffect, useState, useMemo } from "react";
import { logger } from "@hive/core";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Launch date - July 9th, 2025
  const launchDate = useMemo(() => new Date("2025-07-09T00:00:00Z"), []);

  useEffect(() => {
    setMounted(true);
    logger.info("Welcome page mounted");

    const calculateTimeLeft = () => {
      const difference = launchDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / 1000 * 60 * 60) % 24),
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

  const handleGetStarted = () => {
    logger.info("Get Started clicked - navigating to school selection");
    router.push("/auth/school-select");
  };

  if (!mounted) {
    return null;
  }

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBjeD0iMjU2IiBjeT0iMjU2IiByPSIyIi8+PC9zdmc+')] bg-repeat" />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-01 to-background" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto space-y-12">

          {/* HIVE Brand Header */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Logo */}
            <div className="flex justify-center">
              <HiveLogo 
                variant="white" 
                size="3xl" 
                animationType="gentle-float"
                className="drop-shadow-2xl"
              />
            </div>
            
            {/* Brand Name */}
            <div className="space-y-2">
              <Typography
                variant="hero"
                align="center"
                className="text-foreground font-display font-black tracking-tight"
              >
                HIVE
              </Typography>
              <Typography
                variant="h2"
                align="center"
                className="text-muted font-display font-medium"
              >
                Your Campus OS
              </Typography>
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
              <div className="text-center">
                <div className="bg-surface-02 border border-border rounded-lg p-4 mb-2">
                  <Typography
                    variant="hero"
                    align="center"
                    className="text-accent font-mono tracking-widest"
                  >
                    {formatNumber(timeLeft.days)}
                  </Typography>
                </div>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-muted font-mono uppercase tracking-wider"
                >
                  Days
                </Typography>
              </div>
              
              <div className="text-center">
                <div className="bg-surface-02 border border-border rounded-lg p-4 mb-2">
                  <Typography
                    variant="hero"
                    align="center"
                    className="text-accent font-mono tracking-widest"
                  >
                    {formatNumber(timeLeft.hours)}
                  </Typography>
                </div>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-muted font-mono uppercase tracking-wider"
                >
                  Hours
                </Typography>
              </div>
              
              <div className="text-center">
                <div className="bg-surface-02 border border-border rounded-lg p-4 mb-2">
                  <Typography
                    variant="hero"
                    align="center"
                    className="text-accent font-mono tracking-widest"
                  >
                    {formatNumber(timeLeft.minutes)}
                  </Typography>
                </div>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-muted font-mono uppercase tracking-wider"
                >
                  Minutes
                </Typography>
              </div>
              
              <div className="text-center">
                <div className="bg-surface-02 border border-border rounded-lg p-4 mb-2">
                  <Typography
                    variant="hero"
                    align="center"
                    className="text-accent font-mono tracking-widest"
                  >
                    {formatNumber(timeLeft.seconds)}
                  </Typography>
                </div>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-muted font-mono uppercase tracking-wider"
                >
                  Seconds
                </Typography>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleGetStarted}
                className="bg-accent hover:bg-accent/90 text-background font-medium px-8 py-3 text-lg"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                onClick={handleWhatsComing}
                className="border-accent text-accent hover:bg-accent hover:text-background px-8 py-3 text-lg"
              >
                What&apos;s Coming
              </Button>
            </div>
          </motion.div>

          {/* Footer Credo */}
          <motion.div
            className="pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Typography
              variant="caption"
              align="center"
              className="text-muted font-sans tracking-wide"
            >
              Built by Students · Owned by Students.
            </Typography>
          </motion.div>
        </div>
      </div>

      {/* What's Coming Dialog */}
      <Dialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        title="What's Coming to HIVE"
        size="md"
      >
        <div className="space-y-3 text-sm text-muted">
          <div>🏫 <strong>Campus Spaces:</strong> Join clubs, organizations, and interest groups</div>
          <div>📱 <strong>Smart Feed:</strong> Real-time campus events and updates</div>
          <div>🛠️ <strong>Creator Tools:</strong> Build and share campus utilities</div>
          <div>🎯 <strong>Event Discovery:</strong> Find parties, study groups, and activities</div>
          <div>🔗 <strong>Real Connections:</strong> Meet people who share your interests</div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => setIsDialogOpen(false)}
            className="border-accent text-accent hover:bg-accent hover:text-background"
          >
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
