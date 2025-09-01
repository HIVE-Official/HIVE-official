/**
 * Advanced Authentication Loading Component
 * Provides smooth, branded loading experience during auth flows
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

interface AdvancedAuthLoadingProps {
  stage: 'initializing' | 'validating' | 'loading_profile' | 'securing' | 'complete' | 'error';
  message?: string;
  progress?: number;
  error?: string;
  onRetry?: () => void;
  showProgressBar?: boolean;
  showSecurityIndicator?: boolean;
}

const STAGE_MESSAGES = {
  initializing: 'Connecting to HIVE...',
  validating: 'Verifying your identity...',
  loading_profile: 'Loading your profile...',
  securing: 'Securing your session...',
  complete: 'Welcome to HIVE!',
  error: 'Authentication failed'
};

const STAGE_ICONS = {
  initializing: Loader2,
  validating: Shield,
  loading_profile: Loader2,
  securing: Shield,
  complete: CheckCircle,
  error: AlertTriangle
};

export function AdvancedAuthLoading({
  stage,
  message,
  progress = 0,
  error,
  onRetry,
  showProgressBar = true,
  showSecurityIndicator = true
}: AdvancedAuthLoadingProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [dots, setDots] = useState('');

  // Smooth progress animation
  useEffect(() => {
    const targetProgress = stage === 'complete' ? 100 : progress;
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 1) return targetProgress;
        return prev + diff * 0.1;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [progress, stage]);

  // Animated loading dots
  useEffect(() => {
    if (stage === 'error' || stage === 'complete') return;
    
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, [stage]);

  const Icon = STAGE_ICONS[stage];
  const displayMessage = message || STAGE_MESSAGES[stage];

  const getStageColor = () => {
    switch (stage) {
      case 'complete': return 'text-white';
      case 'error': return 'text-white';
      case 'securing': return 'text-white';
      default: return 'text-white';
    }
  };

  const getProgressColor = () => {
    switch (stage) {
      case 'complete': return 'bg-green-400';
      case 'error': return 'bg-red-400';
      case 'securing': return 'bg-yellow-400';
      default: return 'bg-[var(--hive-brand-primary)]';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Main Loading Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hive-glass-strong p-8 rounded-2xl text-center border border-[var(--hive-border-glass)]"
        >
          {/* Icon Animation */}
          <motion.div
            className="mb-6"
            animate={stage === 'error' ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: stage === 'error' ? 2 : 0 }}
          >
            <div className={`mx-auto w-16 h-16 rounded-full border-2 border-current ${getStageColor()} flex items-center justify-center`}>
              <Icon 
                className={`w-8 h-8 ${getStageColor()} ${stage !== 'complete' && stage !== 'error' ? 'animate-spin' : ''}`} 
              />
            </div>
          </motion.div>

          {/* Status Message */}
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
                {displayMessage}{stage !== 'error' && stage !== 'complete' && (
                  <span className="inline-block w-8 text-left">{dots}</span>
                )}
              </h2>
              
              {error && (
                <p className="text-sm text-white mb-4">
                  {error}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          {showProgressBar && stage !== 'error' && (
            <div className="mb-6">
              <div className="w-full bg-[var(--hive-background-secondary)] rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full ${getProgressColor()} rounded-full`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${displayProgress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between text-xs text-[var(--hive-text-muted)] mt-2">
                <span>Authenticating</span>
                <span>{Math.round(displayProgress)}%</span>
              </div>
            </div>
          )}

          {/* Security Indicator */}
          {showSecurityIndicator && stage === 'securing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-sm text-[var(--hive-text-muted)] mb-4"
            >
              <Shield className="w-4 h-4" />
              <span>Enhanced security validation</span>
            </motion.div>
          )}

          {/* Action Buttons */}
          {stage === 'error' && onRetry && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={onRetry}
              className="hive-button-primary px-6 py-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          )}

          {stage === 'complete' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-sm"
            >
              Redirecting to your dashboard...
            </motion.div>
          )}
        </motion.div>

        {/* Development Mode Indicator */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-3 rounded-lg bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30 text-center"
          >
            <p className="text-sm text-[var(--hive-brand-primary)] font-medium">
              🛠️ Development Mode Active
            </p>
          </motion.div>
        )}

        {/* Background Ambient Animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[var(--hive-brand-primary)]/5 via-transparent to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Preset configurations for common auth flows
export const AuthLoadingPresets = {
  login: {
    stages: [
      { stage: 'validating' as const, message: 'Verifying credentials...', progress: 25 },
      { stage: 'securing' as const, message: 'Securing session...', progress: 75 },
      { stage: 'complete' as const, message: 'Welcome back!', progress: 100 }
    ]
  },
  
  onboarding: {
    stages: [
      { stage: 'initializing' as const, message: 'Setting up your account...', progress: 33 },
      { stage: 'loading_profile' as const, message: 'Creating your profile...', progress: 66 },
      { stage: 'complete' as const, message: 'Account created successfully!', progress: 100 }
    ]
  },

  sessionRefresh: {
    stages: [
      { stage: 'validating' as const, message: 'Refreshing session...', progress: 50 },
      { stage: 'complete' as const, message: 'Session updated', progress: 100 }
    ]
  }
};