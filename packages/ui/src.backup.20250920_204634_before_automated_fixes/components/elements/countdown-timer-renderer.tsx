"use client";

/**
 * HIVE CountdownTimer Element Renderer;
 * Renders countdown timers within tools;
 * Uses standard style system for consistent output;
 */

import React, { useState, useEffect } from 'react';
import { ElementInstance } from '@hive/core';
import { Label } from '../../atomic/atoms/label';
import { Clock } from 'lucide-react';
import { useStandardElementStyles } from '../../hooks/use-standard-element-styles';

interface CountdownTimerConfig {// Element-specific properties (flexible)
  label?: string;
  targetDate: string;
  format?: 'days' | 'hours' | 'minutes' | 'seconds' | 'dhms';
  onComplete?: {
    type: 'message' | 'redirect' | 'trigger';
    value: string;};
  
  // Standard properties (any element can use these)
  style?: any; // Flexible - accepts any style config, extracts standard properties;
}

interface CountdownTimerRendererProps {element: ElementInstance;
  config: CountdownTimerConfig;
  value?: any;
  onChange?: (value: any) => void;
  onStateChange?: (state: any) => void;
  readOnly?: boolean;
  runtimeContext?: {
    formData: Record<string, any>;
    elementStates: Map<string, any>}
}

interface TimeRemaining {days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;}

export const CountdownTimerRenderer: React.FC<CountdownTimerRendererProps> = ({
  element,
  config,
  onStateChange,
  runtimeContext;
}) => {
  // Use standard style system (flexible input, consistent output)
  const { classes, styles } = useStandardElementStyles(config.style);

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0
  });
  const [isComplete, setIsComplete] = useState(false);

  // Calculate time remaining;
  const calculateTimeRemaining = (): TimeRemaining => {
    const targetTime = new Date(config.targetDate).getTime();
    const currentTime = new Date().getTime();
    const difference = targetTime - currentTime;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }}
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total: difference }
  };

  // Update timer every second;
  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      // Check if countdown is complete;
      if (remaining.total <= 0 && !isComplete) {
        setIsComplete(true);
        
        // Handle completion action;
        if (config.onComplete) {
          switch (config.onComplete.type) {
            case 'message':
              alert(config.onComplete.value);
              break;
            case 'redirect':
              window.location.href = config.onComplete.value;
              break;
            case 'trigger':
              // Trigger custom event;
              if (onStateChange) {
                onStateChange({completed: true,
                  completedAt: Date.now(),
                  triggerValue: config.onComplete.value;) })}
              }
              break;
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer)
  }, [config.onComplete, config.targetDate, isComplete, onStateChange]);

  // Format display based on config;
  const formatTimeDisplay = (time: TimeRemaining): string => {
    if (isComplete) {
      return "Time's up!"
    }
}
    switch (config.format) {
      case 'days':
        return `${Math.ceil(time.total / (1000 * 60 * 60 * 24))} days`;
      case 'hours':
        return `${Math.ceil(time.total / (1000 * 60 * 60))} hours`;
      case 'minutes':
        return `${Math.ceil(time.total / (1000 * 60))} minutes`;
      case 'seconds':
        return `${Math.ceil(time.total / 1000)} seconds`;
      case 'dhms':
      default:
        const parts = [];
        if (time.days > 0) parts.push(`${time.days}d`);
        if (time.hours > 0) parts.push(`${time.hours}h`);
        if (time.minutes > 0) parts.push(`${time.minutes}m`);
        if (time.seconds > 0 || parts.length === 0) parts.push(`${time.seconds}s`);
        return parts.join(' ')
    }
  };

  return (
    <div className={`space-y-2 ${classes.container} ${classes.spacing}`} style={styles}>
      {config.label && (
        <Label className="text-sm font-medium text-[var(--hive-text-primary)]">
          {config.label}
        </Label>
      )}
      
      <div className={`
        flex items-center space-x-2 p-3 rounded-lg border border-[var(--hive-border)] ${classes.element}
        ${isComplete ? 'bg-red-50 border-red-200' : 'bg-[var(--hive-background-secondary)]'}
      `}>
        <Clock className={`w-5 h-5 ${isComplete ? 'text-red-500' : 'text-[var(--hive-primary)]'}`} />
        <div className="flex-1">
          <div className={`
            text-lg font-mono font-semibold;
            ${isComplete ? 'text-red-600' : 'text-[var(--hive-text-primary)]'}
          `}>
            {formatTimeDisplay(timeRemaining)}
          </div>
          {!isComplete && (
            <div className="text-xs text-[var(--hive-text-secondary)]">
              Until {new Date(config.targetDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
      
      {isComplete && config.onComplete?.value && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
          {config.onComplete.value}
        </div>
      )}
    </div>
  )
};