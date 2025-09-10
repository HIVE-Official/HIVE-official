'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { RefreshCw, ChevronDown } from 'lucide-react';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  refreshThreshold?: number;
  disabled?: boolean;
  className?: string;
}

export function PullToRefresh({
  children,
  onRefresh,
  refreshThreshold = 80,
  disabled = false,
  className
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const isPulling = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isRefreshing) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    // Only allow pull-to-refresh at the top of the container
    if (container.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling.current || disabled || isRefreshing) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY.current;
    
    if (deltaY > 0) {
      // Prevent default scrolling when pulling down
      e.preventDefault();
      
      // Apply resistance to make it feel natural
      const resistance = 0.5;
      const distance = Math.min(deltaY * resistance, refreshThreshold * 1.5);
      
      setPullDistance(distance);
      setCanRefresh(distance >= refreshThreshold);
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling.current) return;
    
    isPulling.current = false;
    
    if (canRefresh && !isRefreshing) {
      setIsRefreshing(true);
      
      // Trigger haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
    setCanRefresh(false);
  };

  // Auto-refresh animation
  useEffect(() => {
    if (isRefreshing && pullDistance > 0) {
      setPullDistance(refreshThreshold);
    }
  }, [isRefreshing, refreshThreshold]);

  const pullProgress = Math.min(pullDistance / refreshThreshold, 1);
  const shouldShowIndicator = pullDistance > 10;

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-auto', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateY(${Math.min(pullDistance, refreshThreshold)}px)`,
        transition: isPulling.current ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {/* Pull indicator */}
      {shouldShowIndicator && (
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center py-4 z-10"
          style={{
            transform: `translateY(-${refreshThreshold}px)`,
            opacity: pullProgress
          }}
        >
          <div className="flex items-center gap-2 text-gray-600">
            {isRefreshing ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span className="text-sm font-medium">Refreshing...</span>
              </>
            ) : canRefresh ? (
              <>
                <ChevronDown className="h-5 w-5 transform rotate-180" />
                <span className="text-sm font-medium">Release to refresh</span>
              </>
            ) : (
              <>
                <ChevronDown 
                  className="h-5 w-5 transition-transform duration-200" 
                  style={{ transform: `rotate(${pullProgress * 180}deg)` }}
                />
                <span className="text-sm font-medium">Pull to refresh</span>
              </>
            )}
          </div>
          
          {/* Progress indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200">
            <div 
              className="h-full bg-hive-primary transition-all duration-200"
              style={{ width: `${pullProgress * 100}%` }}
            />
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
}

// Simplified refresh button for desktop/fallback
export function RefreshButton({
  onRefresh,
  isRefreshing = false,
  className,
  children
}: {
  onRefresh: () => Promise<void>;
  isRefreshing?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    if (isLoading || isRefreshing) return;
    
    setIsLoading(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isLoading || isRefreshing}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium',
        'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
        'border border-gray-200 rounded-lg transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      <RefreshCw className={cn(
        'h-4 w-4',
        (isLoading || isRefreshing) && 'animate-spin'
      )} />
      {children || 'Refresh'}
    </button>
  );
}