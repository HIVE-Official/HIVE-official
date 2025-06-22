"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@hive/ui";
import { MotionDiv, AnimatePresence } from "@hive/ui";
import { Clock, Sparkles, X, Play } from "lucide-react";

interface Ritual {
  id: string;
  title: string;
  startTime: Date;
  duration: number; // in minutes
  description: string;
  participantCount: number;
}

interface FeedOverlayProps {
  onDismiss: () => void;
  onSchedulePost: () => void;
  isVisible: boolean;
}

export function FeedOverlay({
  onDismiss,
  onSchedulePost,
  isVisible,
}: FeedOverlayProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [currentRitual, setCurrentRitual] = useState<Ritual | null>(null);
  const [autoDismissTimer, setAutoDismissTimer] = useState<number>(15);

  // Mock ritual data - in real app this would come from Firebase
  useEffect(() => {
    // Simulate first ritual starting in 2 hours
    const ritualStartTime = new Date(Date.now() + 2 * 60 * 60 * 1000);

    setCurrentRitual({
      id: "first-light",
      title: "First Light",
      startTime: ritualStartTime,
      duration: 60,
      description: "Share your first post and light up the campus feed",
      participantCount: 0,
    });
  }, []);

  // Update countdown timer
  useEffect(() => {
    if (!currentRitual) return;

    const updateTimer = () => {
      const now = new Date();
      const diff = currentRitual.startTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Started!");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [currentRitual]);

  // Auto-dismiss timer
  useEffect(() => {
    if (!isVisible) return;

    const countdown = setInterval(() => {
      setAutoDismissTimer((prev) => {
        if (prev <= 1) {
          onDismiss();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isVisible, onDismiss]);

  // Reset auto-dismiss timer when visible
  useEffect(() => {
    if (isVisible) {
      setAutoDismissTimer(15);
    }
  }, [isVisible]);

  if (!currentRitual) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop with 30% dim */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            onClick={onDismiss}
          />

          {/* Main Content */}
          <MotionDiv
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative z-10 max-w-md mx-4"
          >
            {/* Gold Spotlight Effect */}
            <div className="absolute inset-0 -m-8 bg-yellow-500/20 rounded-full blur-xl">
              <MotionDiv
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full bg-yellow-500/30 rounded-full"
              />
            </div>

            {/* Content Card */}
            <div className="relative bg-zinc-900/95 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 shadow-2xl">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="absolute top-3 right-3 text-zinc-400 hover:text-white w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Header */}
              <div className="text-center mb-6">
                <MotionDiv
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                </MotionDiv>
                <h2 className="text-xl font-bold text-white mb-2">
                  Your first ritual awaits
                </h2>
                <p className="text-zinc-400 text-sm">
                  The campus heartbeat is about to begin
                </p>
              </div>

              {/* Timer Widget with Spotlight */}
              <div className="relative mb-6">
                <MotionDiv
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(234, 179, 8, 0.3)",
                      "0 0 30px rgba(234, 179, 8, 0.5)",
                      "0 0 20px rgba(234, 179, 8, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-yellow-500/10 border border-yellow-500/40 rounded-xl p-4 text-center"
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-400">
                      {currentRitual.title} starts in
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">
                    {timeLeft}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    {currentRitual.description}
                  </p>
                </MotionDiv>
              </div>

              {/* Call to Action */}
              <div className="space-y-4">
                <Button
                  onClick={onSchedulePost}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Tap to schedule your first post
                </Button>

                <div className="text-center">
                  <p className="text-xs text-zinc-500">
                    Join {currentRitual.participantCount} others getting ready
                  </p>
                </div>
              </div>

              {/* Auto-dismiss indicator */}
              <div className="mt-4 text-center">
                <p className="text-xs text-zinc-600">
                  Auto-dismiss in {autoDismissTimer}s
                </p>
                <div className="w-full bg-zinc-800 h-1 rounded-full mt-1 overflow-hidden">
                  <MotionDiv
                    className="h-full bg-yellow-500/50"
                    animate={{
                      width: `${(autoDismissTimer / 15) * 100}%`,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </div>
          </MotionDiv>

          {/* Ambient particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <MotionDiv
                key={i}
                className="absolute w-1 h-1 bg-yellow-500/30 rounded-full"
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
              />
            ))}
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}
