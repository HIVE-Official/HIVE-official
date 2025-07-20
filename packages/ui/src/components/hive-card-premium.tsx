"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// HIVE Premium Card System - Luxury Hardware Feel
// Every card feels like premium equipment with silk-smooth interactions

const hivePremiumCardVariants = cva(
  // Base premium styles - GPU accelerated foundation
  "relative overflow-hidden will-change-transform backface-visibility-hidden transform-gpu",
  {
    variants: {
      variant: {
        // Standard luxury cards with heavy radius
        "default": "bg-[#111113] border border-white/10 rounded-2xl",
        "elevated": "bg-[#1A1A1C] border border-white/15 rounded-2xl",
        "glass": "backdrop-blur-[12px] bg-white/5 border border-white/8 rounded-2xl",
        
        // Gold accent luxury
        "gold-accent": "bg-[#111113] border border-[#FFD700]/20 rounded-2xl",
        "gold-featured": "bg-gradient-to-br from-[#FFD700]/8 via-transparent to-[#FFD700]/3 border border-[#FFD700]/30 rounded-2xl",
        "gold-premium": "bg-[#FFD700]/10 border border-[#FFD700]/40 rounded-2xl",
        
        // Interactive states
        "clickable": "bg-[#111113] border border-white/10 rounded-2xl cursor-pointer",
        "selectable": "bg-[#111113] border border-white/10 rounded-2xl cursor-pointer",
        "selected": "bg-[#FFD700]/10 border border-[#FFD700]/40 rounded-2xl",
        
        // Content specific
        "post": "bg-[#111113] border border-white/8 rounded-2xl",
        "announcement": "bg-gradient-to-r from-[#FFD700]/10 to-[#FFD700]/5 border border-[#FFD700]/20 rounded-2xl",
        "featured-post": "bg-gradient-to-br from-[#FFD700]/8 via-transparent to-transparent border border-[#FFD700]/20 rounded-2xl",
      },
      
      size: {
        "compact": "p-3",
        "sm": "p-4", 
        "default": "p-6",
        "lg": "p-8",
        "xl": "p-10",
      },
      
      radius: {
        "lg": "rounded-xl",
        "xl": "rounded-2xl", 
        "2xl": "rounded-3xl",
        "full": "rounded-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "xl",
    },
  }
);

// Premium Motion Configuration
const magneticMotion = {
  whileHover: {
    y: -4,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.8,
    }
  },
  whileTap: {
    scale: 0.98,
    y: -2,
    transition: {
      type: "spring", 
      stiffness: 600,
      damping: 30,
    }
  }
};

const shadowMotion = {
  initial: { boxShadow: "0 0 0 rgba(0, 0, 0, 0)" },
  whileHover: { 
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  whileTap: { 
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.1 }
  }
};

// Ripple Effect Component
const RippleEffect = ({ x, y, show }: { x: number; y: number; show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="absolute pointer-events-none"
        style={{ left: x, top: y }}
        initial={{ scale: 0, opacity: 0.6 }}
        animate={{ scale: 4, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-4 h-4 -ml-2 -mt-2 bg-gradient-radial from-white/20 to-transparent rounded-full" />
      </motion.div>
    )}
  </AnimatePresence>
);

export interface HivePremiumCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'>,
    VariantProps<typeof hivePremiumCardVariants> {
  magneticHover?: boolean;
  rippleEffect?: boolean;
  autoShadow?: boolean;
  glassMorphism?: boolean;
  interactive?: boolean;
  selected?: boolean;
  goldAccent?: boolean;
}

const HivePremiumCard = React.forwardRef<HTMLDivElement, HivePremiumCardProps>(
  ({ 
    className, 
    variant, 
    size, 
    radius,
    magneticHover = true,
    rippleEffect = true,
    autoShadow = true,
    glassMorphism = false,
    interactive = false,
    selected = false,
    goldAccent = false,
    children,
    onClick,
    onMouseDown,
    ...props 
  }, ref) => {
    
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; show: boolean }>>([]);
    const cardRef = useRef<HTMLDivElement>(null);
    const rippleId = useRef(0);
    
    // Auto-adjust variant based on props
    let finalVariant = variant;
    if (selected && !variant) finalVariant = "selected";
    if (interactive && !variant) finalVariant = "clickable";
    if (goldAccent && !variant) finalVariant = "gold-accent";
    if (glassMorphism && !variant) finalVariant = "glass";
    
    // Handle ripple effect
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (rippleEffect && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const newRipple = {
          id: rippleId.current++,
          x,
          y,
          show: true
        };
        
        setRipples(prev => [...prev, newRipple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
      }
      
      onClick?.(e);
    };
    
    // Motion configuration based on props
    const motionProps = {
      ...(magneticHover && magneticMotion),
      ...(autoShadow && shadowMotion),
    };
    
    return (
      <motion.div
        ref={cardRef}
        className={cn(
          hivePremiumCardVariants({ 
            variant: finalVariant, 
            size, 
            radius,
            className 
          }),
          interactive && "hover:border-[#FFD700]/30",
          glassMorphism && "backdrop-blur-[12px]"
        )}
        onClick={handleClick}
        onMouseDown={onMouseDown}
        {...motionProps}
        {...(props as any)}
      >
        {/* Ripple Effects */}
        {ripples.map(ripple => (
          <RippleEffect 
            key={ripple.id} 
            x={ripple.x} 
            y={ripple.y} 
            show={ripple.show} 
          />
        ))}
        
        {/* Glass morphism overlay */}
        {glassMorphism && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[inherit]" />
        )}
        
        {/* Gold shimmer effect for gold variants */}
        {(finalVariant?.includes('gold') || goldAccent) && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/5 to-transparent pointer-events-none rounded-[inherit]"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 2 
            }}
          />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

HivePremiumCard.displayName = "HivePremiumCard";

// Pre-built premium card variants
const HivePostCard = ({ ...props }: Omit<HivePremiumCardProps, 'variant'>) => (
  <HivePremiumCard variant="post" interactive rippleEffect {...props} />
);

const HiveAnnouncementCard = ({ ...props }: Omit<HivePremiumCardProps, 'variant'>) => (
  <HivePremiumCard variant="announcement" goldAccent magneticHover {...props} />
);

const HiveFeaturedCard = ({ ...props }: Omit<HivePremiumCardProps, 'variant'>) => (
  <HivePremiumCard variant="featured-post" goldAccent magneticHover autoShadow {...props} />
);

const HiveGlassCard = ({ ...props }: Omit<HivePremiumCardProps, 'variant'>) => (
  <HivePremiumCard variant="glass" glassMorphism magneticHover {...props} />
);

export { 
  HivePremiumCard, 
  hivePremiumCardVariants,
  HivePostCard,
  HiveAnnouncementCard, 
  HiveFeaturedCard,
  HiveGlassCard
};