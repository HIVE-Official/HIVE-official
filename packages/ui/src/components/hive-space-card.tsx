"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, magneticHover } from '../motion/hive-motion-system';
import { getMotionProps } from '../lib/motion-utils';
import { type Space } from '@hive/core';
import { 
  Users, 
  Building, 
  EyeOff, 
  Pause, 
  Sparkles,
  TrendingUp,
  Clock,
  Crown,
  Star,
  ArrowRight,
  Calendar,
  MessageCircle,
  BookOpen,
  Home,
  GraduationCap
} from 'lucide-react';

// HIVE Space Card - Premium Space Discovery Component
// Sophisticated space representation with magnetic interactions and liquid metal motion

const hiveSpaceCardVariants = cva(
  // Base styles - matte obsidian glass with premium interactions
  "relative group block overflow-hidden will-change-transform cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl",
        premium: "bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/30 rounded-2xl",
        featured: "bg-gradient-to-br from-yellow-500/20 via-black/20 to-black/20 backdrop-blur-xl border border-yellow-500/40 rounded-2xl",
        minimal: "bg-white/5 backdrop-blur-sm border-0 rounded-xl",
      },
      size: {
        sm: "h-48 max-w-xs",
        md: "h-64 max-w-sm", 
        lg: "h-80 max-w-md",
        xl: "h-96 max-w-lg",
      },
      status: {
        activated: "",
        dormant: "opacity-80",
        frozen: "opacity-60 grayscale",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      status: "activated",
    },
  }
);

// Enhanced status configuration with HIVE design system
const statusConfig = {
  activated: {
    icon: null,
    label: "Active",
    className: "bg-green-500/20 text-green-400 border-green-500/30",
    pulse: true,
  },
  dormant: {
    icon: Pause,
    label: "Coming Soon",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    pulse: false,
  },
  frozen: {
    icon: EyeOff,
    label: "View Only", 
    className: "bg-red-500/20 text-red-400 border-red-500/30",
    pulse: false,
  },
} as const;

// Space type configurations with appropriate icons
const spaceTypeConfig = {
  academic: { icon: GraduationCap, color: "text-blue-400" },
  social: { icon: Users, color: "text-green-400" },
  residential: { icon: Home, color: "text-purple-400" },
  administrative: { icon: Building, color: "text-gray-400" },
} as const;

export interface HiveSpaceCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>,
    VariantProps<typeof hiveSpaceCardVariants> {
  space: Space;
  href?: string;
  onClick?: (space: Space) => void;
  onJoin?: (space: Space) => void;
  onLeave?: (space: Space) => void;
  isJoined?: boolean;
  isTrending?: boolean;
  activityScore?: number;
  recentActivity?: string;
  showActivityIndicator?: boolean;
  showMemberPreview?: boolean;
  memberAvatars?: string[];
  disabled?: boolean;
}

export const HiveSpaceCard = React.forwardRef<HTMLDivElement, HiveSpaceCardProps>(
  ({ 
    className,
    variant,
    size,
    space,
    href,
    onClick,
    onJoin,
    onLeave,
    isJoined = false,
    isTrending = false,
    activityScore = 0,
    recentActivity,
    showActivityIndicator = true,
    showMemberPreview = true,
    memberAvatars = [],
    disabled = false,
    ...props 
  }, ref) => {
    
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Motion values for sophisticated hover effects
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
    const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);
    
    const statusInfo = statusConfig[space.status];
    const typeInfo = spaceTypeConfig[space.tags?.[0]?.type || 'academic'];
    const StatusIcon = statusInfo.icon;
    const TypeIcon = typeInfo.icon;
    
    // Handle sophisticated mouse interactions
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!cardRef.current || disabled) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    
    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      setIsHovered(false);
      setIsPressed(false);
    };
    
    const handleClick = (e: React.MouseEvent) => {
      if (disabled) return;
      
      if (onClick) {
        e.preventDefault();
        onClick(space);
      }
    };
    
    const handleJoinClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (isJoined) {
        onLeave?.(space);
      } else {
        onJoin?.(space);
      }
    };
    
    // Calculate activity level for visual feedback
    const activityLevel = activityScore > 80 ? 'high' : activityScore > 40 ? 'medium' : 'low';
    
    const cardClassName = cn(
      hiveSpaceCardVariants({ 
        variant: isTrending ? 'featured' : variant, 
        size, 
        status: space.status,
        className 
      }),
      disabled && "opacity-50 cursor-not-allowed",
      "transform-gpu" // Enable GPU acceleration
    );

    const cardStyle = {
      rotateX: disabled ? 0 : rotateX,
      rotateY: disabled ? 0 : rotateY,
      transformPerspective: 1000,
    };

    const cardEventHandlers = {
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: handleMouseLeave,
      onMouseDown: () => setIsPressed(true),
      onMouseUp: () => setIsPressed(false),
      onClick: handleClick,
    };

    const cardMotionProps = {
      whileHover: !disabled ? magneticHover : {},
      whileTap: !disabled ? { scale: 0.98 } : {},
      transition: { duration: motionDurations.smooth, ease: liquidMetal.easing as any },
    };

    const cardContent = (
      <>
        {/* Trending Indicator */}
        {isTrending && (
          <motion.div
            className="absolute top-3 left-3 z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: motionDurations.smooth }}
          >
            <div className="flex items-center gap-1.5 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/40 rounded-full px-3 py-1.5">
              <TrendingUp className="w-3 h-3 text-yellow-400" />
              <span className="text-xs font-medium text-yellow-400">Trending</span>
            </div>
          </motion.div>
        )}
        
        {/* Banner Section with Gradient Overlay */}
        <div className="relative h-32 w-full overflow-hidden">
          {space.bannerUrl ? (
            <motion.img
              src={space.bannerUrl}
              alt=""
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: motionDurations.smooth, ease: liquidMetal.easing as any }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50" />
          )}
          
          {/* Sophisticated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          {/* Status Badge */}
          <AnimatePresence>
            {space.status !== "activated" && (
              <motion.div
                className={cn(
                  "absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border",
                  statusInfo.className
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: motionDurations.quick }}
              >
                {StatusIcon && <StatusIcon className="w-3 h-3" />}
                {statusInfo.label}
                {statusInfo.pulse && (
                  <motion.div
                    className="w-2 h-2 bg-current rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Activity Indicator */}
          {showActivityIndicator && activityScore > 0 && (
            <motion.div
              className={cn(
                "absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs backdrop-blur-sm border",
                activityLevel === 'high' && "bg-green-500/20 text-green-400 border-green-500/30",
                activityLevel === 'medium' && "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                activityLevel === 'low' && "bg-gray-500/20 text-gray-400 border-gray-500/30"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-current rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span>{activityScore}% active</span>
            </motion.div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="relative p-5 flex-1 flex flex-col">
          {/* Header with Space Name and Type */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <motion.h3 
                className="font-semibold text-white text-lg leading-tight mb-1 group-hover:text-yellow-400 transition-colors duration-200"
                layoutId={`space-title-${space.id}`}
              >
                {space.name}
              </motion.h3>
              
              <div className="flex items-center gap-2 text-sm">
                <TypeIcon className={cn("w-4 h-4", typeInfo.color)} />
                <span className="text-gray-400 capitalize">
                  {space.tags?.[0]?.sub_type || space.tags?.[0]?.type || 'General'}
                </span>
              </div>
            </div>
            
            {/* Join/Leave Button */}
            <motion.button
              className={cn(
                "ml-3 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                isJoined 
                  ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30"
              )}
              onClick={handleJoinClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: motionDurations.quick }}
            >
              {isJoined ? 'Joined' : 'Join'}
            </motion.button>
          </div>
          
          {/* Description */}
          {space.description && (
            <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2 flex-1">
              {space.description}
            </p>
          )}
          
          {/* Recent Activity */}
          {recentActivity && (
            <motion.div
              className="flex items-center gap-2 text-xs text-gray-500 mb-4 p-2 bg-white/5 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Clock className="w-3 h-3" />
              <span className="truncate">{recentActivity}</span>
            </motion.div>
          )}
          
          {/* Footer Metadata */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4">
              {/* Member Count */}
              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>
                  {space.memberCount.toLocaleString()}{" "}
                  {space.memberCount === 1 ? "member" : "members"}
                </span>
              </div>
              
              {/* Member Avatars Preview */}
              {showMemberPreview && memberAvatars.length > 0 && (
                <div className="flex -space-x-1">
                  {memberAvatars.slice(0, 3).map((avatar, index) => (
                    <motion.img
                      key={index}
                      src={avatar}
                      alt=""
                      className="w-6 h-6 rounded-full border-2 border-black/20 bg-gray-600"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    />
                  ))}
                  {memberAvatars.length > 3 && (
                    <div className="w-6 h-6 rounded-full border-2 border-black/20 bg-gray-600 flex items-center justify-center text-xs text-gray-300">
                      +{memberAvatars.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Enter Indicator */}
            <AnimatePresence>
              {isHovered && !disabled && (
                <motion.div
                  className="flex items-center gap-1 text-xs text-yellow-400 font-medium"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: motionDurations.quick }}
                >
                  <span>Enter</span>
                  <ArrowRight className="w-3 h-3" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Magnetic Field Visualization on Hover */}
        <AnimatePresence>
          {isHovered && !disabled && (
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-yellow-500/10 via-transparent to-transparent pointer-events-none rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: motionDurations.quick }}
            />
          )}
        </AnimatePresence>
        
        {/* Press Feedback */}
        <AnimatePresence>
          {isPressed && !disabled && (
            <motion.div
              className="absolute inset-0 bg-white/5 pointer-events-none rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            />
          )}
        </AnimatePresence>
      </>
    );

    if (href) {
      return (
        <motion.a
          ref={ref as any || cardRef}
          href={href}
          className={cardClassName}
          style={cardStyle}
          {...cardEventHandlers}
          {...cardMotionProps}
          aria-label={`${space.name} space - ${space.memberCount} members`}
          {...getMotionProps(props)}
        >
          {cardContent}
        </motion.a>
      );
    }

    return (
      <motion.div
        ref={ref as any || cardRef}
        className={cardClassName}
        style={cardStyle}
        {...cardEventHandlers}
        {...cardMotionProps}
        aria-label={`${space.name} space - ${space.memberCount} members`}
        {...getMotionProps(props)}
      >
        {cardContent}
      </motion.div>
    );
  }
);

HiveSpaceCard.displayName = "HiveSpaceCard";

export { hiveSpaceCardVariants };