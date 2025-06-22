"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "../lib/utils";

export interface RitualUnlockProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onConfirm?: () => void;
  onDismiss?: () => void;
  className?: string;
}

/**
 * RitualUnlock - Reserved for moments of meaning
 * Uses HIVE gold animation system sparingly for maximum impact
 *
 * Usage examples:
 * - First Ritual unlock
 * - Achievement milestones
 * - Builder tool publish success
 * - Major campus moments
 */
export const RitualUnlock = React.forwardRef<HTMLDivElement, RitualUnlockProps>(
  (
    {
      title,
      description,
      icon = <Star className="w-6 h-6" />,
      onConfirm,
      onDismiss,
      className,
    },
    ref
  ) => {
    const [isConfirming, setIsConfirming] = useState(false);

    const handleConfirm = async () => {
      setIsConfirming(true);

      // Brief delay for animation
      await new Promise((resolve) => setTimeout(resolve, 400));

      onConfirm?.();
      setIsConfirming(false);
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{
          duration: 0.24,
          ease: [0.16, 1, 0.3, 1], // HIVE flourish curve
        }}
        className={cn("relative w-full max-w-md mx-auto", className)}
      >
        {/* Gold glow backdrop - only for ritual moments */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.3, 0.6, 0.3, 0],
            scale: [0.8, 1.1, 1.2, 1.3, 1.0],
          }}
          transition={{
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.3, 0.6, 0.8, 1],
          }}
          className="absolute -inset-8 bg-gradient-radial from-hive-gold/20 via-hive-gold/5 to-transparent rounded-full blur-xl"
          aria-hidden="true"
        />

        <Card className="relative border-hive-gold/20 bg-hive-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-hive-gold/10 border border-hive-gold/30 flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  filter: [
                    "drop-shadow(0 0 0px rgba(255, 215, 0, 0))",
                    "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))",
                    "drop-shadow(0 0 0px rgba(255, 215, 0, 0))",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-hive-gold"
              >
                {icon}
              </motion.div>
            </motion.div>

            <CardTitle className="text-xl font-display font-semibold text-hive-white">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-6">
            <p className="text-hive-text-muted leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="secondary" // Gold outlined button for primary action
                size="lg"
                className="flex-1"
                onClick={handleConfirm}
                disabled={isConfirming}
                loading={isConfirming}
              >
                <AnimatePresence mode="wait">
                  {isConfirming ? (
                    <motion.span
                      key="confirming"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                    >
                      Unlocking...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="confirm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Claim Ritual
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              {onDismiss && (
                <Button
                  variant="ghost"
                  size="lg"
                  className="flex-1 sm:flex-initial"
                  onClick={onDismiss}
                  disabled={isConfirming}
                >
                  Later
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

RitualUnlock.displayName = "RitualUnlock";

/**
 * Success animation component for completed rituals
 * Uses gold pulse animation sparingly
 */
export const RitualSuccess = ({ onComplete }: { onComplete?: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      onAnimationComplete={onComplete}
      className="text-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          filter: [
            "drop-shadow(0 0 0px rgba(255, 215, 0, 0))",
            "drop-shadow(0 0 16px rgba(255, 215, 0, 0.8))",
            "drop-shadow(0 0 4px rgba(255, 215, 0, 0.3))",
          ],
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 0.61, 0.36, 1],
        }}
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-hive-gold flex items-center justify-center"
      >
        <Check className="w-10 h-10 text-hive-canvas" />
      </motion.div>

      <h3 className="text-xl font-display font-semibold text-hive-white mb-2">
        Ritual Unlocked!
      </h3>

      <p className="text-hive-text-muted">
        Your campus experience just leveled up.
      </p>
    </motion.div>
  );
};

RitualSuccess.displayName = "RitualSuccess";
