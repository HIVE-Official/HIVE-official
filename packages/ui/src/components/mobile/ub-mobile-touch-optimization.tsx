'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ButtonEnhanced as Button } from '../../atomic/atoms/button-enhanced';
import { Text } from '../../atomic/atoms/text';
import { Icon } from '../../ui/icon';
import { cn } from '../lib/utils';
import { 
  Smartphone,
  TouchIcon as Touch,
  Zap,
  Users,
  Home,
  Calendar,
  Settings,
  Bell,
  Search,
  Plus,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Heart,
  Share2,
  Bookmark,
  MessageCircle,
  MoreHorizontal,
  Filter,
  SortAsc,
  Eye,
  Activity
} from 'lucide-react';

// =============================================================================
// MOBILE TOUCH OPTIMIZATION HOOKS
// =============================================================================

export interface TouchRipple {
  id: string;
  x: number;
  y: number;
  timestamp: number;
}

export interface HapticFeedbackOptions {
  type: 'light' | 'medium' | 'heavy' | 'selection' | 'impact' | 'notification';
  enabled?: boolean;
}

// Touch Ripple Hook
export function useTouchRipple() {
  const [ripples, setRipples] = React.useState<TouchRipple[]>([]);
  
  const createRipple = React.useCallback((event: React.TouchEvent | React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = 'touches' in event 
      ? event.touches[0].clientX - rect.left 
      : event.clientX - rect.left;
    const y = 'touches' in event 
      ? event.touches[0].clientY - rect.top 
      : event.clientY - rect.top;
    
    const newRipple: TouchRipple = {
      id: Date.now().toString(),
      x,
      y,
      timestamp: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  }, []);
  
  const rippleHandlers = {
    onTouchStart: createRipple,
    onMouseDown: createRipple
  };
  
  return { ripples, rippleHandlers };
}

// Haptic Feedback Hook
export function useHapticFeedback() {
  const triggerHaptic = React.useCallback((type: HapticFeedbackOptions['type']) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      switch (type) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(20);
          break;
        case 'heavy':
          navigator.vibrate(50);
          break;
        case 'selection':
          navigator.vibrate([10, 5, 10]);
          break;
        case 'impact':
          navigator.vibrate(30);
          break;
        case 'notification':
          navigator.vibrate([100, 50, 100]);
          break;
        default:
          navigator.vibrate(10);
      }
    }
  }, []);
  
  return { triggerHaptic };
}

// Touch Gesture Hook
export function useTouchGestures() {
  const [isPressed, setIsPressed] = React.useState(false);
  const [pressPosition, setPressPosition] = React.useState({ x: 0, y: 0 });
  
  const handleTouchStart = React.useCallback((event: React.TouchEvent) => {
    const touch = event.touches[0];
    setIsPressed(true);
    setPressPosition({ x: touch.clientX, y: touch.clientY });
  }, []);
  
  const handleTouchEnd = React.useCallback(() => {
    setIsPressed(false);
  }, []);
  
  const gestureHandlers = {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd
  };
  
  return { isPressed, pressPosition, gestureHandlers };
}

// =============================================================================
// UB MOBILE BOTTOM NAVIGATION
// =============================================================================

export interface UBMobileNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: {
    count?: number;
    color?: 'primary' | 'secondary' | 'warning' | 'error';
    pulse?: boolean;
  };
  isActive?: boolean;
  isDisabled?: boolean;
}

interface UBMobileBottomNavProps {
  items: UBMobileNavItem[];
  onNavigate: (href: string) => void;
  className?: string;
}

export function UBMobileBottomNav({ items, onNavigate, className }: UBMobileBottomNavProps) {
  const { triggerHaptic } = useHapticFeedback();
  
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50",
      "bg-[var(--hive-background-primary)]/95 backdrop-blur-xl",
      "border-t border-[var(--hive-border-default)]",
      "pb-safe-area-inset-bottom",
      className
    )}>
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => (
          <UBMobileNavItem
            key={item.id}
            item={item}
            onNavigate={(href) => {
              triggerHaptic('selection');
              onNavigate(href);
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface UBMobileNavItemProps {
  item: UBMobileNavItem;
  onNavigate: (href: string) => void;
}

function UBMobileNavItem({ item, onNavigate }: UBMobileNavItemProps) {
  const { ripples, rippleHandlers } = useTouchRipple();
  const IconComponent = item.icon;
  
  return (
    <button
      type="button"
      onClick={() => !item.isDisabled && onNavigate(item.href)}
      disabled={item.isDisabled}
      {...rippleHandlers}
      className={cn(
        "relative flex flex-col items-center justify-center",
        "w-full max-w-[80px] min-h-[44px] p-1",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]",
        "active:scale-95",
        item.isDisabled && "opacity-50 cursor-not-allowed"
      )}
      aria-label={item.label}
      aria-current={item.isActive ? 'page' : undefined}
    >
      {/* Active indicator */}
      {item.isActive && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-[var(--hive-brand-secondary)] rounded-full" />
      )}
      
      {/* Icon container */}
      <div className={cn(
        "relative flex items-center justify-center w-8 h-8 rounded-lg",
        "transition-all duration-200",
        item.isActive 
          ? "bg-[var(--hive-brand-secondary)]/15" 
          : "bg-transparent"
      )}>
        <IconComponent className={cn(
          "w-5 h-5 transition-colors duration-200",
          item.isActive 
            ? "text-[var(--hive-brand-secondary)]"
            : "text-[var(--hive-text-secondary)]"
        )} />
        
        {/* Badge */}
        {item.badge && (
          <div className={cn(
            "absolute -top-1 -right-1 min-w-[16px] h-4 px-1",
            "flex items-center justify-center text-xs font-medium rounded-full",
            "border-2 border-[var(--hive-background-primary)]",
            item.badge.color === 'error' && "bg-red-500 text-white",
            item.badge.color === 'warning' && "bg-yellow-500 text-black",
            item.badge.color === 'primary' && "bg-[var(--hive-brand-secondary)] text-white",
            !item.badge.color && "bg-red-500 text-white",
            item.badge.pulse && "animate-pulse"
          )}>
            {item.badge.count && item.badge.count > 99 ? '99+' : item.badge.count}
          </div>
        )}
      </div>
      
      {/* Label */}
      <Text variant="body-xs" className={cn(
        "mt-1 transition-colors duration-200 truncate max-w-full",
        item.isActive 
          ? "text-[var(--hive-brand-secondary)]"
          : "text-[var(--hive-text-tertiary)]"
      )}>
        {item.label}
      </Text>
      
      {/* Touch ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${ripple.x}px ${ripple.y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`
          }}
        />
      ))}
    </button>
  );
}

// =============================================================================
// UB MOBILE HEADER COMPONENT
// =============================================================================

interface UBMobileHeaderProps {
  title: string;
  subtitle?: string;
  leftAction?: {
    icon: React.ComponentType<any>;
    label: string;
    onPress: () => void;
  };
  rightActions?: {
    icon: React.ComponentType<any>;
    label: string;
    onPress: () => void;
    badge?: { count?: number; pulse?: boolean };
  }[];
  className?: string;
}

export function UBMobileHeader({ 
  title, 
  subtitle, 
  leftAction, 
  rightActions = [], 
  className 
}: UBMobileHeaderProps) {
  const { triggerHaptic } = useHapticFeedback();
  
  return (
    <div className={cn(
      "sticky top-0 z-40",
      "bg-[var(--hive-background-primary)]/95 backdrop-blur-xl",
      "border-b border-[var(--hive-border-default)]",
      "pt-safe-area-inset-top",
      className
    )}>
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left action */}
        <div className="flex items-center min-w-[44px]">
          {leftAction && (
            <UBMobileTouchButton
              icon={leftAction.icon}
              label={leftAction.label}
              onPress={() => {
                triggerHaptic('light');
                leftAction.onPress();
              }}
              size="sm"
            />
          )}
        </div>
        
        {/* Title */}
        <div className="flex-1 text-center px-4">
          <Text variant="h3" weight="semibold" className="truncate">
            {title}
          </Text>
          {subtitle && (
            <Text variant="body-xs" color="secondary" className="truncate">
              {subtitle}
            </Text>
          )}
        </div>
        
        {/* Right actions */}
        <div className="flex items-center gap-2 min-w-[44px] justify-end">
          {rightActions.map((action, index) => (
            <UBMobileTouchButton
              key={index}
              icon={action.icon}
              label={action.label}
              badge={action.badge}
              onPress={() => {
                triggerHaptic('light');
                action.onPress();
              }}
              size="sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// UB MOBILE TOUCH BUTTON COMPONENT
// =============================================================================

interface UBMobileTouchButtonProps {
  icon: React.ComponentType<any>;
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  badge?: { count?: number; pulse?: boolean };
  disabled?: boolean;
  className?: string;
}

export function UBMobileTouchButton({ 
  icon, 
  label, 
  onPress, 
  variant = 'ghost',
  size = 'md',
  badge,
  disabled = false,
  className 
}: UBMobileTouchButtonProps) {
  const { ripples, rippleHandlers } = useTouchRipple();
  const { gestureHandlers } = useTouchGestures();
  const IconComponent = icon;
  
  const sizeClasses = {
    sm: 'w-8 h-8 p-1',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-3'
  };
  
  const variantClasses = {
    primary: 'bg-[var(--hive-brand-secondary)] text-white',
    secondary: 'bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]',
    ghost: 'bg-transparent text-[var(--hive-text-secondary)]'
  };
  
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      {...rippleHandlers}
      {...gestureHandlers}
      className={cn(
        "relative flex items-center justify-center rounded-lg",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-secondary)]",
        "active:scale-95",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      aria-label={label}
    >
      <IconComponent className="w-5 h-5" />
      
      {/* Badge */}
      {badge && (
        <div className={cn(
          "absolute -top-1 -right-1 min-w-[16px] h-4 px-1",
          "flex items-center justify-center text-xs font-medium rounded-full",
          "bg-red-500 text-white border-2 border-[var(--hive-background-primary)]",
          badge.pulse && "animate-pulse"
        )}>
          {badge.count && badge.count > 99 ? '99+' : badge.count}
        </div>
      )}
      
      {/* Touch ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${ripple.x}px ${ripple.y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`
          }}
        />
      ))}
    </button>
  );
}

// =============================================================================
// UB MOBILE SWIPE CARD COMPONENT
// =============================================================================

interface UBMobileSwipeCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onPress?: () => void;
  className?: string;
}

export function UBMobileSwipeCard({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  onPress, 
  className 
}: UBMobileSwipeCardProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragX, setDragX] = React.useState(0);
  const startX = React.useRef(0);
  const currentX = React.useRef(0);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    currentX.current = e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;
    setDragX(deltaX);
  };
  
  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    
    if (Math.abs(dragX) > threshold) {
      if (dragX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (dragX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    } else if (Math.abs(dragX) < 10 && onPress) {
      // Small movement, treat as press
      onPress();
    }
    
    setIsDragging(false);
    setDragX(0);
  };
  
  return (
    <div
      className={cn(
        "relative transition-transform duration-200 ease-out",
        "touch-pan-y", // Allow vertical scrolling
        className
      )}
      style={{
        transform: `translateX(${dragX}px)`,
        opacity: Math.max(0.7, 1 - Math.abs(dragX) / 200)
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {children}
      
      {/* Swipe indicators */}
      {isDragging && Math.abs(dragX) > 50 && (
        <>
          {dragX > 0 && onSwipeRight && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400">
              <ChevronRight className="w-8 h-8" />
            </div>
          )}
          {dragX < 0 && onSwipeLeft && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400">
              <X className="w-8 h-8" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

// =============================================================================
// UB MOBILE PULL TO REFRESH COMPONENT
// =============================================================================

interface UBMobilePullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  isRefreshing?: boolean;
  threshold?: number;
  className?: string;
}

export function UBMobilePullToRefresh({ 
  children, 
  onRefresh, 
  isRefreshing = false, 
  threshold = 100,
  className 
}: UBMobilePullToRefreshProps) {
  const [pullDistance, setPullDistance] = React.useState(0);
  const [isPulling, setIsPulling] = React.useState(false);
  const startY = React.useRef(0);
  const { triggerHaptic } = useHapticFeedback();
  
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY.current;
    
    if (deltaY > 0 && window.scrollY === 0) {
      setIsPulling(true);
      setPullDistance(Math.min(deltaY / 2, threshold * 1.5));
      
      if (deltaY > threshold && !isRefreshing) {
        triggerHaptic('impact');
      }
    }
  };
  
  const handleTouchEnd = async () => {
    if (isPulling && pullDistance > threshold && !isRefreshing) {
      triggerHaptic('success');
      await onRefresh();
    }
    
    setIsPulling(false);
    setPullDistance(0);
  };
  
  return (
    <div 
      className={cn("relative", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* Pull indicator */}
      {(isPulling || isRefreshing) && (
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center z-10"
          style={{ 
            height: Math.max(pullDistance, isRefreshing ? threshold : 0),
            transition: isPulling ? 'none' : 'height 0.3s ease-out'
          }}
        >
          <div className={cn(
            "flex flex-col items-center text-[var(--hive-text-secondary)]",
            "transition-opacity duration-200",
            pullDistance > threshold / 2 || isRefreshing ? "opacity-100" : "opacity-50"
          )}>
            <div className={cn(
              "w-6 h-6 rounded-full border-2 border-[var(--hive-brand-secondary)]",
              "border-t-transparent animate-spin",
              isRefreshing ? "block" : "hidden"
            )} />
            <ChevronDown className={cn(
              "w-6 h-6 transition-transform duration-200",
              pullDistance > threshold ? "rotate-180" : "rotate-0",
              isRefreshing ? "hidden" : "block"
            )} />
            <Text variant="body-xs" className="mt-1">
              {isRefreshing ? 'Refreshing...' : 
               pullDistance > threshold ? 'Release to refresh' : 'Pull to refresh'}
            </Text>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div 
        style={{ 
          transform: `translateY(${isPulling ? pullDistance : isRefreshing ? threshold : 0}px)`,
          transition: isPulling ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {children}
      </div>
    </div>
  );
}