"use client";

import React, { useState, useEffect } from 'react';
import { logger } from '@hive/core/utils/logger';

import { Card } from '@hive/ui';
import { 
  Clock,
  Edit2,
  Zap
} from 'lucide-react';

interface RightNowCardProps {
  className?: string;
  onUpdate?: () => void;
}

export function RightNowCard({ className, onUpdate }: RightNowCardProps) {
  const [status, setStatus] = useState({
    emoji: '🎯',
    text: 'Focused',
    availability: 'Available 2hr',
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000)
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch current status from API
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/profile/status');
        if (response.ok) {
          const data = await response.json();
          if (data.status) {
            setStatus(data.status);
          }
        }
      } catch (error) {
        logger.error('Error fetching status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const getAvailabilityColor = () => {
    if (status.availability.includes('Available')) {
      return 'text-green-400 bg-green-500/10';
    } else if (status.availability.includes('Busy')) {
      return 'text-[var(--hive-gold)] bg-[var(--hive-gold)]/10';
    }
    return 'text-muted-foreground bg-muted';
  };

  return (
    <Card 
      className={`p-4 h-full flex flex-col justify-between group cursor-pointer hover:border-accent/50 transition-all ${className}`}
      onClick={onUpdate}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-foreground">Right Now</h3>
        <Edit2 className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-muted rounded-full mb-3" />
            <div className="w-20 h-4 bg-muted rounded mb-2" />
            <div className="w-24 h-6 bg-muted rounded-full" />
          </div>
        ) : (
          <>
            {/* Large Emoji */}
            <div className="text-5xl mb-3">
              {status.emoji}
            </div>
            
            {/* Status Text */}
            <div className="text-lg font-medium text-foreground mb-2">
              {status.text}
            </div>
            
            {/* Availability Badge */}
            <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${getAvailabilityColor()}`}>
              <Clock className="h-3 w-3 inline mr-1" />
              {status.availability}
            </div>
          </>
        )}
      </div>

      {/* Update Hint */}
      <div className="pt-3 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Zap className="h-3 w-3" />
          <span>Tap to update</span>
        </div>
      </div>
    </Card>
  );
}