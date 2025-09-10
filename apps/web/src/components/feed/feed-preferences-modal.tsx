'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X } from 'lucide-react';
import { Button } from '@hive/ui';
import { FeedPersonalization } from './feed-personalization';
import { cn } from '../../lib/utils';

interface FeedPreferencesModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange?: (settings: any) => void;
  className?: string;
}

export function FeedPreferencesModal({
  userId,
  isOpen,
  onClose,
  onSettingsChange,
  className = ''
}: FeedPreferencesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              'w-full max-w-2xl bg-black border border-white/10 rounded-xl',
              'shadow-2xl z-50',
              className
            )}
          >
            <FeedPersonalization
              userId={userId}
              onSettingsChange={onSettingsChange}
              onClose={onClose}
              className="p-6"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface FeedPreferencesButtonProps {
  userId: string;
  onSettingsChange?: (settings: any) => void;
  className?: string;
}

export function FeedPreferencesButton({
  userId,
  onSettingsChange,
  className = ''
}: FeedPreferencesButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className={cn('border-white/20', className)}
      >
        <Settings className="h-4 w-4 mr-2" />
        Preferences
      </Button>

      <FeedPreferencesModal
        userId={userId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSettingsChange={onSettingsChange}
      />
    </>
  );
}