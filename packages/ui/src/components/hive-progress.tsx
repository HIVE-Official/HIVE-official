"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Zap,
  Target,
  TrendingUp,
  Activity,
  Loader,
  Play,
  Pause,
  Square,
  MoreHorizontal
} from 'lucide-react';

// HIVE Progress System - Advanced Loading States with Liquid Metal Motion
// Sophisticated progress indicators with magnetic interactions and smooth animations

const hiveProgressVariants = cva(
  // Base progress styles
  "relative overflow-hidden rounded-full bg-[var(--hive-background-primary)]/20 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-background-primary)]/20",
        premium: "bg-yellow-500/10 border border-yellow-500/20",
        minimal: "bg-[var(--hive-text-primary)]/10",
        gradient: "bg-gradient-to-r from-black/20 to-black/30",
      },
      
      size: {
        xs: "h-1",
        sm: "h-2",
        default: "h-3",
        lg: "h-4",
        xl: "h-6",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const progressFillVariants = cva(
  // Progress fill styles
  "h-full rounded-full transition-all",
  {
    variants: {
      variant: {
        default: "bg-yellow-400",
        success: "bg-green-400",
        warning: "bg-orange-400",
        danger: "bg-red-400",
        info: "bg-blue-400",
        gradient: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Basic Progress Bar Component
export interface HiveProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value'>,
    VariantProps<typeof hiveProgressVariants> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  showPercentage?: boolean;
  animated?: boolean;
  striped?: boolean;
  pulse?: boolean;
  fillVariant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'gradient';
}

export const HiveProgressBar = React.forwardRef<HTMLDivElement, HiveProgressBarProps>(
  ({ 
    className,
    variant,
    size,
    value,
    max = 100,
    label,
    showValue = false,
    showPercentage = true,
    animated = true,
    striped = false,
    pulse = false,
    fillVariant = 'default',
    ...props 
  }, ref) => {
    
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    return (
      <div className="space-y-2">
        {/* Label and Value */}
        {(label || showValue || showPercentage) && (
          <div className="flex items-center justify-between text-sm">
            {label && (
              <span className="font-medium text-[var(--hive-text-primary)]/80">{label}</span>
            )}
            
            <div className="flex items-center space-x-2 text-[var(--hive-text-primary)]/60">
              {showValue && (
                <span>{value}/{max}</span>
              )}
              {showPercentage && (
                <span>{percentage.toFixed(1)}%</span>
              )}
            </div>
          </div>
        )}
        
        {/* Progress Bar */}
        <div
          ref={ref}
          className={cn(hiveProgressVariants({ variant, size, className }))}
          {...props}
        >
          <motion.div
            className={cn(
              progressFillVariants({ variant: fillVariant }),
              striped && "bg-stripes bg-stripes-white/10",
              pulse && "animate-pulse"
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{
              duration: animated ? motionDurations.smooth : 0,
              ease: liquidMetal.easing as any,
            }}
          >
            {/* Shimmer effect */}
            {animated && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </motion.div>
        </div>
      </div>
    );
  }
);

HiveProgressBar.displayName = "HiveProgressBar";

// Circular Progress Component
export interface HiveCircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showValue?: boolean;
  showPercentage?: boolean;
  animated?: boolean;
  children?: React.ReactNode;
}

export const HiveCircularProgress = React.forwardRef<HTMLDivElement, HiveCircularProgressProps>(
  ({ 
    className,
    value,
    max = 100,
    size = 120,
    strokeWidth = 8,
    color = 'var(--hive-brand-secondary)',
    backgroundColor = 'var(--hive-interactive-active)',
    showValue = false,
    showPercentage = true,
    animated = true,
    children,
    ...props 
  }, ref) => {
    
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: animated ? strokeDashoffset : strokeDashoffset }}
            transition={{
              duration: animated ? motionDurations.smooth : 0,
              ease: liquidMetal.easing as any,
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {children || (
            <div className="text-center">
              {showPercentage && (
                <motion.div 
                  className="text-lg font-bold text-[var(--hive-text-primary)]"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: motionDurations.smooth, delay: 0.3 }}
                >
                  {percentage.toFixed(0)}%
                </motion.div>
              )}
              {showValue && (
                <div className="text-xs text-[var(--hive-text-primary)]/60">
                  {value}/{max}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

HiveCircularProgress.displayName = "HiveCircularProgress";

// Step Progress Component
export interface StepProgressItem {
  id: string;
  label: string;
  description?: string;
  status: 'pending' | 'current' | 'completed' | 'error';
  icon?: React.ReactNode;
}

export interface HiveStepProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  steps: StepProgressItem[];
  direction?: 'horizontal' | 'vertical';
  showConnectors?: boolean;
  clickable?: boolean;
  onStepClick?: (step: StepProgressItem, index: number) => void;
}

export const HiveStepProgress = React.forwardRef<HTMLDivElement, HiveStepProgressProps>(
  ({ 
    className,
    steps,
    direction = 'horizontal',
    showConnectors = true,
    clickable = false,
    onStepClick,
    ...props 
  }, ref) => {
    
    const getStepIcon = (step: StepProgressItem, index: number) => {
      if (step.icon) return step.icon;
      
      switch (step.status) {
        case 'completed':
          return <CheckCircle size={20} />;
        case 'error':
          return <AlertCircle size={20} />;
        case 'current':
          return <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />;
        default:
          return <div className="w-6 h-6 rounded-full border-2 border-white/40 flex items-center justify-center text-xs font-medium text-[var(--hive-text-primary)]/60">{index + 1}</div>;
      }
    };
    
    const getStepColor = (status: StepProgressItem['status']) => {
      switch (status) {
        case 'completed':
          return 'text-green-400 border-green-400/30 bg-green-400/10';
        case 'current':
          return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
        case 'error':
          return 'text-red-400 border-red-400/30 bg-red-400/10';
        default:
          return 'text-[var(--hive-text-primary)]/60 border-white/20 bg-[var(--hive-text-primary)]/5';
      }
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === 'horizontal' ? "items-center space-x-4" : "flex-col space-y-4",
          className
        )}
        {...props}
      >
        {steps.map((step, index) => (
          <div key={step.id} className={cn(
            "flex items-center",
            direction === 'vertical' && "w-full",
            clickable && "cursor-pointer group"
          )}>
            {/* Step Indicator */}
            <motion.div
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full border transition-all",
                getStepColor(step.status),
                clickable && "group-hover:scale-110"
              )}
              onClick={() => clickable && onStepClick?.(step, index)}
              whileHover={clickable ? { scale: 1.05 } : {}}
              whileTap={clickable ? { scale: 0.95 } : {}}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: motionDurations.smooth,
                delay: index * 0.1,
                ease: liquidMetal.easing as any 
              }}
            >
              {getStepIcon(step, index)}
            </motion.div>
            
            {/* Step Content */}
            <div className={cn(
              "ml-3 flex-1",
              direction === 'horizontal' && index < steps.length - 1 && "mr-4"
            )}>
              <motion.div
                className={cn(
                  "font-medium text-sm",
                  step.status === 'completed' ? "text-green-400" :
                  step.status === 'current' ? "text-yellow-400" :
                  step.status === 'error' ? "text-red-400" :
                  "text-[var(--hive-text-primary)]/60"
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: motionDurations.smooth,
                  delay: index * 0.1 + 0.1 
                }}
              >
                {step.label}
              </motion.div>
              
              {step.description && (
                <motion.div
                  className="text-xs text-[var(--hive-text-primary)]/40 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: motionDurations.smooth,
                    delay: index * 0.1 + 0.2 
                  }}
                >
                  {step.description}
                </motion.div>
              )}
            </div>
            
            {/* Connector */}
            {showConnectors && index < steps.length - 1 && (
              <motion.div
                className={cn(
                  "border-t-2 border-dashed transition-colors",
                  direction === 'horizontal' ? "flex-1 mx-4" : "absolute left-5 top-10 h-8 border-l-2 border-t-0",
                  step.status === 'completed' ? "border-green-400/30" : "border-white/20"
                )}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: motionDurations.smooth,
                  delay: index * 0.1 + 0.3 
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
);

HiveStepProgress.displayName = "HiveStepProgress";

// Loading Spinner Component
export interface HiveSpinnerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  color?: string;
  speed?: 'slow' | 'normal' | 'fast';
  variant?: 'spin' | 'pulse' | 'bounce' | 'dots' | 'bars';
  label?: string;
}

export const HiveSpinner = React.forwardRef<HTMLDivElement, HiveSpinnerProps>(
  ({ 
    className,
    size = 'default',
    color = 'var(--hive-brand-secondary)',
    speed = 'normal',
    variant = 'spin',
    label,
    ...props 
  }, ref) => {
    
    const sizeClasses = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      default: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    };
    
    const speedDuration = {
      slow: 2,
      normal: 1,
      fast: 0.5,
    };
    
    const renderSpinner = () => {
      switch (variant) {
        case 'pulse':
          return (
            <motion.div
              className={cn("rounded-full", sizeClasses[size])}
              style={{ backgroundColor: color }}
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{
                duration: speedDuration[speed],
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
          
        case 'bounce':
          return (
            <motion.div
              className={cn("rounded-full", sizeClasses[size])}
              style={{ backgroundColor: color }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: speedDuration[speed],
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
          
        case 'dots':
          return (
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: speedDuration[speed],
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          );
          
        case 'bars':
          return (
            <div className="flex space-x-1 items-end">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full"
                  style={{ backgroundColor: color, height: '4px' }}
                  animate={{ scaleY: [1, 2, 1] }}
                  transition={{
                    duration: speedDuration[speed],
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          );
          
        default: // spin
          return (
            <motion.div
              className={cn("border-2 border-t-transparent rounded-full", sizeClasses[size])}
              style={{ borderColor: `${color} transparent ${color} ${color}` }}
              animate={{ rotate: 360 }}
              transition={{
                duration: speedDuration[speed],
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
      }
    };
    
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <div className="flex flex-col items-center space-y-2">
          {renderSpinner()}
          {label && (
            <span className="text-sm text-[var(--hive-text-primary)]/60">{label}</span>
          )}
        </div>
      </div>
    );
  }
);

HiveSpinner.displayName = "HiveSpinner";

// Loading Skeleton Component
export interface HiveSkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  animated?: boolean;
  lines?: number;
}

export const HiveSkeleton = React.forwardRef<HTMLDivElement, HiveSkeletonProps>(
  ({ 
    className,
    width,
    height,
    variant = 'rectangular',
    animated = true,
    lines = 1,
    ...props 
  }, ref) => {
    
    const getVariantClasses = () => {
      switch (variant) {
        case 'text':
          return 'rounded h-4';
        case 'circular':
          return 'rounded-full';
        case 'rounded':
          return 'rounded-xl';
        default:
          return 'rounded';
      }
    };
    
    const skeletonStyle = {
      width: width || (variant === 'text' ? '100%' : '100px'),
      height: height || (variant === 'circular' ? '100px' : variant === 'text' ? '16px' : '100px'),
    };
    
    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
          {Array.from({ length: lines }, (_, i) => (
            <motion.div
              key={i}
              className={cn(
                "bg-[var(--hive-text-primary)]/10 backdrop-blur-sm",
                getVariantClasses(),
                animated && "animate-pulse"
              )}
              style={{
                ...skeletonStyle,
                width: i === lines - 1 ? '75%' : '100%',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: motionDurations.smooth,
                delay: i * 0.1 
              }}
            >
              {animated && (
                <motion.div
                  className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      );
    }
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-[var(--hive-text-primary)]/10 backdrop-blur-sm overflow-hidden",
          getVariantClasses(),
          animated && "animate-pulse",
          className
        )}
        style={skeletonStyle}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: motionDurations.smooth }}
        {...props}
      >
        {animated && (
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </motion.div>
    );
  }
);

HiveSkeleton.displayName = "HiveSkeleton";

// Unified HiveProgress Component
export interface HiveProgressProps {
  variant?: 'bar' | 'circular' | 'step' | 'spinner' | 'skeleton';
  value?: number;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  showPercentage?: boolean;
  animated?: boolean;
  label?: string;
  steps?: StepProgressItem[];
  currentStep?: number;
  className?: string;
}

export const HiveProgress = React.forwardRef<HTMLDivElement, HiveProgressProps>(
  ({ 
    variant = 'bar',
    value = 0,
    max = 100,
    size = 'md',
    status = 'default',
    showLabel = false,
    showPercentage = true,
    animated = true,
    label,
    steps,
    currentStep,
    className,
    ...props 
  }, ref) => {
    
    switch (variant) {
      case 'circular':
        return (
          <HiveCircularProgress
            ref={ref}
            value={value}
            max={max}
            size={size === 'xs' ? 40 : size === 'sm' ? 60 : size === 'md' ? 80 : size === 'lg' ? 120 : 160}
            showPercentage={showPercentage}
            animated={animated}
            className={className}
            {...props}
          />
        );
        
      case 'step':
        if (!steps) {
          console.warn('HiveProgress: steps prop is required for step variant');
          return null;
        }
        return (
          <HiveStepProgress
            ref={ref}
            steps={steps}
            className={className}
            {...props}
          />
        );
        
      case 'spinner':
        return (
          <HiveSpinner
            ref={ref}
            size={size === 'md' ? 'default' : size}
            variant="spin"
            speed="normal"
            label={label}
            className={className}
            {...props}
          />
        );
        
      case 'skeleton':
        return (
          <HiveSkeleton
            ref={ref}
            variant="rectangular"
            animated={animated}
            className={className}
            {...props}
          />
        );
        
      default: // bar
        return (
          <HiveProgressBar
            ref={ref}
            value={value}
            max={max}
            size={size === 'md' ? 'default' : size}
            variant="default"
            fillVariant={status === 'error' ? 'danger' : status}
            showValue={false}
            showPercentage={showPercentage}
            animated={animated}
            label={label}
            className={className}
            {...props}
          />
        );
    }
  }
);

HiveProgress.displayName = "HiveProgress";

// Export aliases for compatibility
export const Progress = HiveProgress;
export const ProgressBar = HiveProgressBar;
export const CircularProgress = HiveCircularProgress;
export const StepProgress = HiveStepProgress;
export const Spinner = HiveSpinner;
// Note: Use HiveSkeleton to avoid conflicts with ui/skeleton

export { 
  hiveProgressVariants,
  progressFillVariants
};