"use client";

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ButtonEnhanced } from '@hive/ui';
import { CheckCircle, ArrowRight, Clock, Mail } from 'lucide-react';
import { hiveVariants } from '@hive/ui';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const spaceId = searchParams.get('spaceId');

  const handleContinue = () => {
    // In the context of onboarding, this might redirect back to onboarding flow
    // Or to the main app depending on where they came from
    router.push('/feed');
  };

  const handleBackToRequests = () => {
    router.push('/spaces/request');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <motion.div 
        className="w-full max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Content card */}
        <motion.div 
          className="module-border module-surface module-padding space-y-8 text-center"
          variants={hiveVariants.scaleIn}
          initial="hidden"
          animate="visible"
        >
          {/* Success icon */}
          <motion.div 
            className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto"
            variants={hiveVariants.scaleIn}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle className="w-10 h-10 text-accent" />
          </motion.div>

          {/* Header */}
          <motion.div 
            className="space-y-4"
            variants={hiveVariants.item}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl font-display font-semibold text-foreground">
              Request Submitted!
            </h1>
            <p className="text-muted font-body text-lg max-w-lg mx-auto">
              Your space request has been submitted for manual review. We'll email you when there's an update.
            </p>
          </motion.div>

          {/* Request details */}
          {spaceId && (
            <motion.div 
              className="bg-surface-01 border border-border rounded-lg p-4"
              variants={hiveVariants.item}
              transition={{ delay: 0.4 }}
            >
              <div className="text-sm font-medium text-foreground mb-2">Request ID</div>
              <div className="text-xs font-mono text-muted break-all">{spaceId}</div>
            </motion.div>
          )}

          {/* What happens next */}
          <motion.div 
            className="space-y-4"
            variants={hiveVariants.item}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-display font-medium text-foreground">
              What happens next?
            </h3>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-3 h-3 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Manual Review</div>
                  <div className="text-xs text-muted">Our team will review your request and qualifications</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-3 h-3 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Email Notification</div>
                  <div className="text-xs text-muted">You'll receive an email when your request is approved or needs changes</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Space Creation</div>
                  <div className="text-xs text-muted">If approved, your space will be created and you'll become the moderator</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3"
            variants={hiveVariants.item}
            transition={{ delay: 0.6 }}
          >
            <ButtonEnhanced
              variant="outline"
              onClick={handleBackToRequests}
              className="flex-1"
            >
              Submit Another Request
            </ButtonEnhanced>
            <ButtonEnhanced
              variant="ritual"
              onClick={handleContinue}
              className="flex-1"
            >
              Continue to HIVE
              <ArrowRight className="w-4 h-4 ml-2" />
            </ButtonEnhanced>
          </motion.div>

          {/* Note */}
          <motion.div 
            className="text-center"
            variants={hiveVariants.item}
            transition={{ delay: 0.7 }}
          >
            <p className="text-xs text-muted">
              Questions about your request? Contact us at support@hivecampus.com
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SpaceRequestSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}