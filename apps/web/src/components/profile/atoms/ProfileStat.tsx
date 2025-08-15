"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProfileStatProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
}

export function ProfileStat({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  onClick,
  isLoading = false,
  className = '' 
}: ProfileStatProps) {
  const Wrapper = onClick ? 'button' : 'div';
  
  return (
    <Wrapper
      className={`
        p-4 sm:p-3 rounded-xl border border-hive-border-subtle
        bg-hive-background-secondary/50 backdrop-blur-sm
        min-h-[80px] sm:min-h-[60px]
        ${onClick ? 'hover:border-hive-border-focus hover:bg-hive-background-secondary transition-all cursor-pointer touch-manipulation active:scale-[0.98]' : ''}
        ${isLoading ? 'animate-pulse' : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={isLoading}
    >
      <div className="flex items-center gap-3 sm:gap-2">
        <div className="p-2 sm:p-1.5 rounded-lg bg-hive-brand-secondary/10 flex-shrink-0">
          <Icon className="w-5 h-5 sm:w-4 sm:h-4 text-hive-brand-secondary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-lg font-semibold text-hive-text-primary">
              {isLoading ? '---' : value}
            </span>
            {trend && !isLoading && (
              <span className={`
                text-xs font-medium
                ${trend.direction === 'up' ? 'text-green-600' : ''}
                ${trend.direction === 'down' ? 'text-red-600' : ''}
                ${trend.direction === 'neutral' ? 'text-hive-text-secondary' : ''}
              `}>
                {trend.direction === 'up' ? '↗' : trend.direction === 'down' ? '↘' : '→'} {trend.value}
              </span>
            )}
          </div>
          <p className="text-sm sm:text-xs text-hive-text-secondary truncate">
            {label}
          </p>
        </div>
      </div>
    </Wrapper>
  );
}