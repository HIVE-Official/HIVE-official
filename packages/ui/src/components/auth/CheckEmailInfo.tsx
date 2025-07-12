"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, RefreshCw } from "lucide-react";
import { Button } from "../button";
import Link from "next/link";

interface CheckEmailInfoProps {
  email: string | null;
  backLinkHref: string;
}

export const CheckEmailInfo = ({
  email,
  backLinkHref,
}: CheckEmailInfoProps) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = async () => {
    if (!email) return;
    
    setIsResending(true);
    try {
      // Add resend logic here if needed
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setTimeLeft(300); // Reset timer
      setCanResend(false);
    } catch (error) {
      console.error("Failed to resend email:", error);
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
        className="w-full max-w-md"
      >
        <div className="bg-surface border border-border rounded-lg p-8 text-center space-y-6">
          {/* Icon */}
          <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5 text-muted" />
          </div>

          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-xl font-display font-medium text-foreground">
              Check Your Email
            </h1>
            <p className="text-sm text-muted font-body">
              We sent a magic link to{" "}
              <span className="text-foreground">{email || "your email address"}</span>
            </p>
          </div>

          {/* Simple Actions */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={handleResend}
              variant="outline"
              disabled={!canResend || isResending}
              className="w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                canResend ? "Resend Email" : `Resend in ${formatTime(timeLeft)}`
              )}
            </Button>
            
            <Button asChild variant="ghost" className="w-full">
              <Link href={backLinkHref}>Back</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 