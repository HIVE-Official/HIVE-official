"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import Image from "next/image";
import { HiveButton } from "../../../../packages/ui/src/components/hive-button";

export function FeedbackToast() {
  const [isOpen, setIsOpen] = useState(false);
  const [_isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: feedback.trim(),
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      
      setIsSubmitted(true);
      setFeedback("");
      
      // Auto-close after success
      setTimeout(() => {
        setIsExpanded(false);
        setIsOpen(false);
        setIsSubmitted(false);
      }, 2000);
      
    } catch (_error) {
      console.error('Failed to submit feedback:', _error);
      // TODO: Show error state to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsOpen(false);
    setIsExpanded(false);
  };

  if (isDismissed || !isMounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-background-tertiary)] 
                     border border-[var(--hive-border-primary)] shadow-lg hover:shadow-xl
                     rounded-full transition-all duration-200 flex items-center justify-center
                     hover:scale-105"
            title="We're new! Problems? Requests? Tell us!"
          >
            <Image
              src="/assets/hive-logo-gold.svg"
              alt="HIVE"
              width={20}
              height={20}
              className="w-5 h-5"
              onError={(e: any) => {
                const target = e.target as HTMLImageElement;
                target.src = "/assets/hive-logo-white.svg";
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-[var(--hive-background-primary)] border border-[var(--hive-border-primary)] 
                     rounded-xl shadow-xl overflow-hidden w-64"
          >
            {/* Header */}
            <div className="p-3 border-b border-[var(--hive-border-subtle)] bg-[var(--hive-background-tertiary)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <Image
                      src="/assets/hive-logo-gold.svg"
                      alt="HIVE"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                      onError={(e: any) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/assets/hive-logo-white.svg";
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-[var(--hive-text-primary)]">
                      Feedback
                    </div>
                    <div className="text-xs text-[var(--hive-text-secondary)]">
                      We're new and improving!
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleDismiss}
                  className="text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] 
                           transition-colors p-1 rounded-lg hover:bg-[var(--hive-background-secondary)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="w-10 h-10 bg-[var(--hive-background-tertiary)] rounded-full 
                                flex items-center justify-center mx-auto mb-3 border border-[var(--hive-status-success)]">
                    <MessageCircle className="w-5 h-5 text-[var(--hive-status-success)]" />
                  </div>
                  <div className="text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                    Thanks for your feedback!
                  </div>
                  <div className="text-xs text-[var(--hive-text-secondary)]">
                    We'll use this to make HIVE better.
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-[var(--hive-text-secondary)]">
                    Found a bug? Have a request? We'd love to hear from you!
                  </div>
                  
                  <div className="relative">
                    <textarea
                      placeholder="Tell us what's on your mind..."
                      value={feedback}
                      onChange={(e: any) => setFeedback(e.target.value)}
                      rows={3}
                      maxLength={500}
                      className="w-full px-3 py-2 bg-[var(--hive-background-secondary)] 
                               border border-[var(--hive-border-subtle)] rounded-lg
                               text-sm text-[var(--hive-text-primary)]
                               placeholder:text-[var(--hive-text-muted)]
                               focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/50
                               focus:border-[var(--hive-brand-primary)]/50
                               resize-none transition-all duration-200"
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-[var(--hive-text-muted)] bg-[var(--hive-background-primary)] px-1.5 py-0.5 rounded">
                      {feedback.length}/500
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-1">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-[var(--hive-text-muted)] hover:text-[var(--hive-text-secondary)] 
                               transition-colors px-1 py-1 rounded hover:bg-[var(--hive-background-tertiary)]"
                    >
                      Later
                    </button>
                    
                    <HiveButton
                      onClick={handleSubmit}
                      disabled={!feedback.trim() || isSubmitting}
                      variant="premium"
                      size="md"
                      leftIcon={isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </HiveButton>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}