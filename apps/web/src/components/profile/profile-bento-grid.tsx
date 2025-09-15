"use client";

import React, { useState } from 'react';
import { logger } from '@hive/core/utils/logger';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Import all Bento cards
import { SpacesHubCard } from './bento-cards/spaces-hub-card';
import { PeopleCard } from './bento-cards/people-card';
import { RightNowCard } from './bento-cards/right-now-card';
import { MyEventsCard } from './bento-cards/my-events-card';
import { MyToolsCard } from './bento-cards/my-tools-card';

interface ProfileBentoGridProps {
  isEditMode?: boolean;
  className?: string;
}

export function ProfileBentoGrid({ isEditMode, className }: ProfileBentoGridProps) {
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  return (
    <>
      {/* Mobile Layout: 328px width with specific card arrangements */}
      <div className={cn(
        "md:hidden grid gap-1",
        "grid-cols-2",
        "px-4",
        className
      )}>
        {/* Row 1: Spaces Hub (2x2) spans left, People and Right Now on right */}
        <motion.div 
          className="col-span-2 row-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="h-[328px]">
            <SpacesHubCard />
          </div>
        </motion.div>
        
        <motion.div 
          className="col-start-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="h-[160px]">
            <PeopleCard />
          </div>
        </motion.div>
        
        <motion.div 
          className="col-start-3 row-start-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="h-[160px]">
            <RightNowCard onUpdate={() => setStatusModalOpen(true)} />
          </div>
        </motion.div>

        {/* Row 2: My Events (2x1) and My Tools (1x1) */}
        <motion.div 
          className="col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="h-[160px]">
            <MyEventsCard />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-[160px]">
            <MyToolsCard />
          </div>
        </motion.div>
      </div>

      {/* Desktop Layout: More flexible grid with larger cards */}
      <div className={cn(
        "hidden md:grid",
        "grid-cols-4 gap-4",
        "max-w-6xl mx-auto",
        className
      )}>
        {/* Spaces Hub - 2x2 */}
        <motion.div 
          className="col-span-2 row-span-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="h-full min-h-[400px]">
            <SpacesHubCard />
          </div>
        </motion.div>

        {/* People Card - 1x1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="h-[190px]">
            <PeopleCard />
          </div>
        </motion.div>

        {/* Right Now Card - 1x1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="h-[190px]">
            <RightNowCard onUpdate={() => setStatusModalOpen(true)} />
          </div>
        </motion.div>

        {/* My Events - 2x1 */}
        <motion.div 
          className="col-span-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="h-[190px]">
            <MyEventsCard />
          </div>
        </motion.div>

        {/* My Tools Card - 1x1 */}
        <motion.div
          className="col-start-3 row-start-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-[190px]">
            <MyToolsCard />
          </div>
        </motion.div>
      </div>

      {/* Status Update Modal */}
      {statusModalOpen && (
        <StatusUpdateModal onClose={() => setStatusModalOpen(false)} />
      )}
    </>
  );
}

// Status Update Modal Component
function StatusUpdateModal({ onClose }: { onClose: () => void }) {
  const [emoji, setEmoji] = useState('🎯');
  const [text, setText] = useState('Thriving');
  const [availability, setAvailability] = useState('Available 2hr');
  const [isUpdating, setIsUpdating] = useState(false);

  const vibeOptions = [
    { emoji: '🎯', text: 'Focused' },
    { emoji: '😴', text: 'Tired' },
    { emoji: '🔥', text: 'On Fire' },
    { emoji: '📚', text: 'Studying' },
    { emoji: '🎉', text: 'Celebrating' },
    { emoji: '😰', text: 'Stressed' },
    { emoji: '💪', text: 'Motivated' },
    { emoji: '🍕', text: 'Hungry' }
  ];

  const availabilityOptions = [
    'Available now',
    'Available 30min',
    'Available 1hr',
    'Available 2hr',
    'Busy - check later',
    'Do not disturb',
    'In class',
    'Studying'
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-lg p-6 max-w-md w-full"
      >
        <h2 className="text-xl font-bold mb-4">Update Your Status</h2>
        
        {/* Vibe Selection */}
        <div className="mb-4">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Current Vibe
          </label>
          <div className="grid grid-cols-4 gap-2">
            {vibeOptions.map((vibe: any) => (
              <button
                key={vibe.text}
                onClick={() => {
                  setEmoji(vibe.emoji);
                  setText(vibe.text);
                }}
                className={cn(
                  "p-3 rounded-lg border transition-all",
                  emoji === vibe.emoji 
                    ? "border-accent bg-accent/10" 
                    : "border-border hover:border-accent/50"
                )}
              >
                <div className="text-2xl mb-1">{vibe.emoji}</div>
                <div className="text-xs">{vibe.text}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Text */}
        <div className="mb-4">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Status Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e: any) => setText(e.target.value)}
            className="w-full px-3 py-2 bg-muted rounded-lg border border-border focus:border-accent focus:outline-none"
            placeholder="How are you feeling?"
          />
        </div>

        {/* Availability */}
        <div className="mb-6">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Availability
          </label>
          <select
            value={availability}
            onChange={(e: any) => setAvailability(e.target.value)}
            className="w-full px-3 py-2 bg-muted rounded-lg border border-border focus:border-accent focus:outline-none"
          >
            {availabilityOptions.map((option: any) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              setIsUpdating(true);
              try {
                const response = await fetch('/api/profile/status', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    emoji,
                    text,
                    availability
                  })
                });
                
                if (response.ok) {
                  onClose();
                } else {
                  logger.error('Failed to update status');
                }
              } catch (error) {
                logger.error('Error updating status:', error);
              } finally {
                setIsUpdating(false);
              }
            }}
            disabled={isUpdating}
            className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}