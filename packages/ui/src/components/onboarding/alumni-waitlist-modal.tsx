"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { X, Mail, CheckCircle, Loader2, GraduationCap, Star, Users, Calendar } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';

interface AlumniWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolName: string;
  userEmail: string;
}

export const AlumniWaitlistModal: React.FC<AlumniWaitlistModalProps> = ({
  isOpen,
  onClose,
  schoolName,
  userEmail,
}) => {
  const [email, setEmail] = useState(userEmail);
  const [graduationYear, setGraduationYear] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call waitlist API
      const response = await fetch('/api/auth/alumni-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          graduationYear,
          schoolName,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Failed to join waitlist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-surface border border-border rounded-xl p-8 w-full max-w-lg relative overflow-hidden"
            variants={hiveVariants.scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/5 to-accent/10 rounded-full blur-2xl -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/5 to-accent/10 rounded-full blur-2xl translate-y-8 -translate-x-8" />
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-muted hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <motion.div className="space-y-8 relative z-10" variants={hiveVariants.container}>
                {/* Header */}
                <motion.div className="text-center space-y-6" variants={hiveVariants.item}>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <GraduationCap className="w-10 h-10 text-accent" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-accent" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-display font-semibold text-foreground">
                      Welcome back, {schoolName} alumni!
                    </h2>
                    <p className="text-muted font-body text-lg">
                      Join our waitlist to be first to know when alumni features launch
                    </p>
                    
                    {/* Feature preview pills */}
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-xs font-medium text-accent">
                        <Users className="w-3 h-3" />
                        Alumni Network
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-xs font-medium text-accent">
                        <Calendar className="w-3 h-3" />
                        Events
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-xs font-medium text-accent">
                        <Star className="w-3 h-3" />
                        Mentorship
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Form */}
                <motion.form onSubmit={handleSubmit} className="space-y-6" variants={hiveVariants.item}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="waitlist-email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="waitlist-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@alumni.com"
                        required
                        variant="accent"
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grad-year" className="text-sm font-medium">Graduation Year</Label>
                      <Input
                        id="grad-year"
                        type="number"
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        placeholder="2020"
                        min="1950"
                        max={new Date().getFullYear() + 10}
                        required
                        variant="accent"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      type="submit"
                      variant="ritual"
                      size="lg"
                      className="w-full h-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Joining Waitlist...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5 mr-2" />
                          Join Alumni Waitlist
                        </>
                      )}
                    </Button>
                    
                    {/* Trust indicators */}
                    <div className="text-center pt-2">
                      <p className="text-xs text-muted font-body">
                        🔒 We respect your privacy. No spam, just important updates.
                      </p>
                    </div>
                  </div>
                </motion.form>
              </motion.div>
            ) : (
              <motion.div 
                className="text-center space-y-8 relative z-10"
                variants={hiveVariants.container}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="space-y-6" variants={hiveVariants.item}>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-10 h-10 text-accent" />
                    </div>
                    {/* Celebration sparkles */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 text-accent animate-pulse">✨</div>
                    <div className="absolute -top-1 -right-3 w-3 h-3 text-accent animate-pulse delay-300">⭐</div>
                    <div className="absolute -bottom-2 left-1 w-3 h-3 text-accent animate-pulse delay-150">✨</div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-display font-semibold text-foreground">
                      You're on the list!
                    </h2>
                    <p className="text-muted font-body text-lg">
                      We'll email you when alumni features are ready. Stay connected to your {schoolName} community.
                    </p>
                    
                    {/* What's next preview */}
                    <div className="bg-surface-01 border border-border rounded-lg p-4 mt-6">
                      <h3 className="text-sm font-medium text-foreground mb-3">What to expect:</h3>
                      <div className="space-y-2 text-left">
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Exclusive early access to alumni features
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Alumni networking and mentorship tools
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {schoolName} alumni events and opportunities
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={hiveVariants.item}>
                  <Button onClick={handleClose} variant="outline" size="lg" className="w-full h-12">
                    Close
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};