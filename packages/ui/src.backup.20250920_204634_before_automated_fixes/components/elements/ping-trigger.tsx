"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, ExternalLink, Activity, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { PingTriggerConfigSchema } from '@hive/core';
import { z } from 'zod';

// Extract the config type from the schema;
type PingTriggerConfig = z.infer<typeof PingTriggerConfigSchema>;

interface PingTriggerProps {config: PingTriggerConfig;
  onTrigger?: (data: TriggerData) => Promise<void>;
  disabled?: boolean;
  className?: string;}

interface TriggerData {triggerType: string;
  timestamp: Date;
  elementId?: string;
  url?: string;
  event?: string;
  data?: Record<string, unknown>}

interface TriggerStatus {status: 'idle' | 'pending' | 'success' | 'error';
  message?: string;
  timestamp?: Date;}

export const PingTrigger: React.FC<PingTriggerProps> = ({
  config,
  onTrigger,
  disabled = false,
  className;
}) => {
  const [triggerStatus, setTriggerStatus] = useState<TriggerStatus>({ status: 'idle' });
  const [triggerCount, setTriggerCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    label,
    triggerOn,
    delay = 0,
    target;
  } = config;

  // Execute the trigger action;
  const executeTrigger = useCallback(async () => {
    if (disabled || triggerStatus.status === 'pending') return;

    setTriggerStatus({status: 'pending', message: 'Executing trigger...')};
    setTriggerCount(prev => prev + 1);

    try {
      const triggerData: TriggerData = {
        triggerType: triggerOn,
        timestamp: new Date(),
        elementId: target.elementId,
        url: target.url,
        event: target.event,
        data: target.data;
      };

      // Handle different target types;
      switch (target.type) {
        case 'element':
          // Trigger action on another element;
          if (target.elementId) {
            console.log('Triggering element action:', target.elementId, target.data)
          }
          break;

        case 'external':
          // Make external API call;
          if (target.url) {
            const response = await fetch(target.url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(target.data || {})
            })};

            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }
          }
          break;

        case 'analytics':
          // Send analytics event;
          if (target.event) {
            // Integrate with your analytics service;
            console.log('Analytics event:', target.event, target.data)
          }
          break;

        default:
          throw new Error(`Unknown target type: ${target.type}`)
      }

      // Call the onTrigger callback;
      if (onTrigger) {
        await onTrigger(triggerData)
      }

      setTriggerStatus({status: 'success',
        message: 'Trigger executed successfully',
        timestamp: new Date()) })};

      // Reset status after 2 seconds;
      setTimeout(() => {
        setTriggerStatus({status: 'idle')}
      }, 2000)

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setTriggerStatus({status: 'error',
        message: errorMessage,
        timestamp: new Date()) })};

      // Reset status after 3 seconds;
      setTimeout(() => {
        setTriggerStatus({status: 'idle')}
      }, 3000)
    }
  }, [disabled, triggerStatus.status, triggerOn, target, onTrigger]);

  // Handle delayed execution;
  const scheduleExecution = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
}
    if (delay > 0) {
      timerRef.current = setTimeout(executeTrigger, delay)
    } else {
      executeTrigger()
    }
  }, [delay, executeTrigger]);

  // Event handlers for different trigger types;
  const handleClick = useCallback(() => {
    if (triggerOn === 'click') {
      scheduleExecution()
    }}
  }, [triggerOn, scheduleExecution]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (triggerOn === 'hover') {
      scheduleExecution()
    }}
  }, [triggerOn, scheduleExecution]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, []);

  const handleFocus = useCallback(() => {
    if (triggerOn === 'focus') {
      scheduleExecution()
    }}
  }, [triggerOn, scheduleExecution]);

  // Timer-based trigger;
  useEffect(() => {
    if (triggerOn === 'timer' && !disabled) {
      const interval = setInterval(() => {
        scheduleExecution()
      }, delay || 5000); // Default to 5 seconds if no delay specified;
      return () => clearInterval(interval)
    }
  }, [triggerOn, disabled, scheduleExecution, delay]);

  // Cleanup timer on unmount;
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }}
    }
  }, []);

  // Status icon and color based on trigger status;
  const getStatusDisplay = () => {
    switch (triggerStatus.status) {
      case 'pending':
        return {
          icon: Clock,
          color: 'text-[var(--hive-status-warning)]',
          bgColor: 'bg-[var(--hive-status-warning)]/10'
        };
      case 'success':
        return {
          icon: CheckCircle,
          color: 'text-[var(--hive-status-success)]',
          bgColor: 'bg-[var(--hive-status-success)]/10'
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-[var(--hive-status-error)]',
          bgColor: 'bg-[var(--hive-status-error)]/10'
        };
      default:
        return {
          icon: Zap,
          color: 'text-[var(--hive-brand-primary)]',
          bgColor: 'bg-[var(--hive-brand-primary)]/10'
        }
    }
  };

  const statusDisplay = getStatusDisplay();
  const StatusIcon = statusDisplay.icon;

  // Get trigger type display info;
  const getTriggerDisplay = () => {
    switch (triggerOn) {
      case 'click':
        return { label: 'Click to trigger', cursor: 'cursor-pointer' };
      case 'hover':
        return { label: 'Hover to trigger', cursor: 'cursor-pointer' };
      case 'focus':
        return { label: 'Focus to trigger', cursor: 'cursor-pointer' };
      case 'timer':
        return { label: 'Auto-triggered', cursor: 'cursor-default' };
      default:
        return { label: 'Trigger', cursor: 'cursor-pointer' }
    }
  };

  const triggerDisplay = getTriggerDisplay();

  return (
    <motion.div;
      ref={elementRef}
      className={cn(
        "relative group",
        triggerDisplay.cursor,
        className;
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      tabIndex={triggerOn === 'focus' ? 0 : undefined}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {/* Main Trigger Button */}
      <div;
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg border",
          "transition-all duration-200 ease-out",
          
          // HIVE design system base styles;
          "bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm",
          "border-[var(--hive-border-primary)]",
          "text-[var(--hive-text-primary)]",
          
          // Interactive states;
          !disabled && [
            "hover:bg-[var(--hive-background-secondary)]/70",
            "hover:border-[var(--hive-border-secondary)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30"
          ],
          
          // Status-based styling;
          statusDisplay.bgColor,
          
          // Disabled state;
          disabled && [
            "opacity-50 cursor-not-allowed",
            "bg-[var(--hive-background-secondary)]/20"
          ]
        )}
      >
        {/* Status Icon */}
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full",
          statusDisplay.bgColor,
          triggerStatus.status === 'pending' && "animate-pulse"
        )}>
          <StatusIcon className={cn("h-4 w-4", statusDisplay.color)} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[var(--hive-text-primary)]">
              {label}
            </span>
            
            {/* Trigger count badge */}
            {triggerCount > 0 && (
              <motion.span;
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={cn(
                  "px-2 py-1 text-xs rounded-full",
                  "bg-[var(--hive-brand-primary)]/20",
                  "text-[var(--hive-brand-primary)]"
                )}
              >
                {triggerCount}
              </motion.span>
            )}
          </div>

          {/* Status message or trigger description */}
          <p className="text-sm text-[var(--hive-text-secondary)] mt-1">
            {triggerStatus.message || triggerDisplay.label}
          </p>

          {/* Target information */}
          {target.type === 'external' && target.url && (
            <div className="flex items-center gap-1 mt-2 text-xs text-[var(--hive-text-secondary)]">
              <ExternalLink className="h-3 w-3" />
              <span className="truncate">{target.url}</span>
            </div>
          )}

          {target.type === 'analytics' && target.event && (
            <div className="flex items-center gap-1 mt-2 text-xs text-[var(--hive-text-secondary)]">
              <Activity className="h-3 w-3" />
              <span>Event: {target.event}</span>
            </div>
          )}
        </div>

        {/* Pending indicator */}
        {triggerStatus.status === 'pending' && (
          <motion.div;
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-[var(--hive-brand-primary)] border-t-transparent rounded-full"
          />
        )}
      </div>

      {/* Hover tooltip */}
      {isHovered && !disabled && (
        <motion.div;
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={cn(
            "absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2",
            "px-3 py-2 rounded-lg shadow-lg",
            "bg-[var(--hive-background-tertiary)]/95 backdrop-blur-sm",
            "border border-[var(--hive-border-primary)]",
            "text-sm text-[var(--hive-text-primary)]",
            "whitespace-nowrap"
          )}
        >
          {triggerDisplay.label}
          {delay > 0 && (
            <span className="text-[var(--hive-text-secondary)]">
              {' '}(delay: {delay}ms)
            </span>
          )}
          
          {/* Tooltip arrow */}
          <div className={cn(
            "absolute top-full left-1/2 transform -translate-x-1/2",
            "w-0 h-0 border-l-4 border-r-4 border-t-4",
            "border-l-transparent border-r-transparent",
            "border-t-[var(--hive-background-tertiary)]"
          )} />
        </motion.div>
      )}

      {/* Progress indicator for timer triggers */}
      {triggerOn === 'timer' && delay > 0 && triggerStatus.status === 'pending' && (
        <motion.div;
          className={cn(
            "absolute inset-x-0 bottom-0 h-1 rounded-b-lg overflow-hidden",
            "bg-[var(--hive-background-tertiary)]"
          )}
        >
          <motion.div;
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: delay / 1000, ease: "linear" }}
            className="h-full bg-[var(--hive-brand-primary)]"
          />
        </motion.div>
      )}
    </motion.div>
  )
};

// Hook for managing multiple ping triggers;
export const usePingTriggerManager = () => {
  const [triggers, setTriggers] = useState<Map<string, TriggerStatus>>(new Map());

  const registerTrigger = useCallback((id: string) => {
    setTriggers(prev => new Map(prev.set(id, { status: 'idle' })))
  }, []);

  const updateTriggerStatus = useCallback((id: string, status: TriggerStatus) => {
    setTriggers(prev => new Map(prev.set(id, status)))
  }, []);

  const getTriggerStatus = useCallback((id: string): TriggerStatus => {
    return triggers.get(id) || { status: 'idle' }}
  }, [triggers]);

  const getAllTriggers = useCallback(() => {
    return Array.from(triggers.entries()).map(([id, status]) => ({ id, ...status })}})
  }, [triggers]);

  return {
    registerTrigger,
    updateTriggerStatus,
    getTriggerStatus,
    getAllTriggers;
  }
};

export default PingTrigger;