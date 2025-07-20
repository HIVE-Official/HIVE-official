import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from './framer-motion-proxy';
import { cn } from '../lib/utils';
import { getMotionProps } from '../lib/motion-utils';
import { HiveMagneticHover } from './hive-magnetic-interactions';
import { 
  magneticInteractions, 
  liquidFlow,
  liquidMetalPerformance,
  liquidMetalUtils 
} from '../motion/hive-liquid-metal';

// HIVE Card variants - Premium black/white/gold aesthetics
const hiveCardVariants = cva(
  // Base styles - sophisticated card design
  "relative overflow-hidden transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        // Standard cards using semantic tokens
        "default": "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)] hover:shadow-lg",
        
        "elevated": "bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-primary)] hover:border-[var(--hive-border-secondary)] hover:shadow-xl shadow-lg",
        
        "minimal": "bg-transparent border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)] hover:bg-[var(--hive-overlay-glass)]",
        
        // Gold accent cards using semantic tokens
        "gold-accent": "bg-[var(--hive-background-secondary)] border border-[var(--hive-overlay-gold-subtle)] hover:border-[var(--hive-border-gold)] hover:shadow-lg hover:shadow-[var(--hive-shadow-gold-glow)]",
        
        "gold-featured": "bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] via-transparent to-[var(--hive-overlay-gold-subtle)] border border-[var(--hive-border-gold)] hover:border-[var(--hive-border-gold-strong)] hover:shadow-xl hover:shadow-[var(--hive-shadow-gold-glow)]",
        
        "gold-premium": "bg-[var(--hive-overlay-gold-subtle)] border border-[var(--hive-border-gold)] hover:border-[var(--hive-border-gold-strong)] hover:shadow-xl hover:shadow-[var(--hive-shadow-gold-glow-strong)]",
        
        // Special variants using semantic tokens
        "builder": "bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] to-[var(--hive-overlay-gold-subtle)]/30 border border-[var(--hive-border-gold)] hover:border-[var(--hive-border-gold-strong)] hover:shadow-lg hover:shadow-[var(--hive-shadow-gold-glow)] relative before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[var(--hive-brand-primary)]",
        
        "student": "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)] hover:shadow-lg hover:shadow-[var(--hive-overlay-glass)]",
        
        "space": "bg-gradient-to-br from-[var(--hive-overlay-glass)] to-[var(--hive-overlay-glass)]/30 border border-[var(--hive-border-primary)] hover:border-[var(--hive-border-glass-strong)] hover:shadow-xl backdrop-blur-sm",
        
        "tool": "bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] hover:border-[var(--hive-overlay-gold-subtle)] hover:shadow-lg hover:shadow-[var(--hive-shadow-gold-glow)] hover:bg-gradient-to-br hover:from-[var(--hive-overlay-gold-subtle)] hover:to-transparent",
        
        // Status cards using semantic status tokens
        "online": "bg-[var(--hive-background-secondary)] border border-[var(--hive-status-success)]/20 hover:border-[var(--hive-status-success)]/40 hover:shadow-lg hover:shadow-[var(--hive-shadow-emerald-glow)]",
        
        "building": "bg-[var(--hive-background-secondary)] border border-[var(--hive-status-info)]/20 hover:border-[var(--hive-status-info)]/40 hover:shadow-lg hover:shadow-[var(--hive-status-info)]/20",
        
        "studying": "bg-[var(--hive-background-secondary)] border border-[var(--hive-status-info)]/20 hover:border-[var(--hive-status-info)]/40 hover:shadow-lg hover:shadow-[var(--hive-status-info)]/20",
        
        // Interactive cards using semantic tokens
        "clickable": "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
        
        "selectable": "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-subtle)] hover:border-[var(--hive-overlay-gold-subtle)] hover:shadow-lg hover:shadow-[var(--hive-shadow-gold-glow)] cursor-pointer transition-all",
        
        "selected": "bg-[var(--hive-overlay-gold-subtle)] border border-[var(--hive-border-gold)] shadow-lg shadow-[var(--hive-shadow-gold-glow)]",
        
        // Content cards using semantic tokens
        "post": "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)] hover:shadow-md",
        
        "announcement": "bg-gradient-to-r from-[var(--hive-overlay-gold-subtle)] to-[var(--hive-overlay-gold-subtle)]/50 border border-[var(--hive-border-gold)] shadow-lg",
        
        "featured-post": "bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] via-transparent to-transparent border border-[var(--hive-border-gold)] hover:border-[var(--hive-border-gold-strong)] hover:shadow-lg hover:shadow-[var(--hive-shadow-gold-glow)]",
      },
      
      size: {
        "compact": "p-3",
        "sm": "p-4", 
        "default": "p-6",
        "lg": "p-8",
        "xl": "p-10",
      },
      
      rounded: {
        "sm": "rounded-[var(--hive-radius-xl)]",        // Heavy radius even on small
        "default": "rounded-[var(--hive-radius-2xl)]",  // Premium heavy radius 
        "lg": "rounded-[var(--hive-radius-3xl)]",       // Ultra heavy for luxury
        "full": "rounded-[var(--hive-radius-3xl)]",     // Maximum luxury radius
      },
      
      shadow: {
        "none": "",
        "sm": "shadow-sm",
        "default": "shadow-md",
        "lg": "shadow-lg",
        "xl": "shadow-xl shadow-black/25",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
      rounded: "default",
      shadow: "none",
    },
  }
);

export interface HiveCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveCardVariants> {
  asChild?: boolean;
  interactive?: boolean;
  selected?: boolean;
  goldAccent?: boolean;
  magneticHover?: boolean;
  magneticIntensity?: 'subtle' | 'medium' | 'strong';
  animateEntrance?: boolean;
  cascadeIndex?: number;
}

const HiveCard = React.forwardRef<HTMLDivElement, HiveCardProps>(
  ({ 
    className, 
    variant, 
    size, 
    rounded, 
    shadow,
    interactive = false,
    selected = false,
    goldAccent = false,
    magneticHover = true,
    magneticIntensity = 'subtle',
    animateEntrance = false,
    cascadeIndex,
    children,
    onClick,
    ...props 
  }, ref) => {
    
    // Auto-adjust variant based on props
    let finalVariant = variant;
    if (selected && !variant) finalVariant = "selected";
    if (interactive && !variant) finalVariant = "clickable";
    if (goldAccent && !variant) finalVariant = "gold-accent";
    
    // Determine if card should have enhanced interactions
    const isPremiumCard = finalVariant?.includes('gold') || finalVariant === 'builder' || finalVariant === 'selected';
    const shouldUseMagneticHover = magneticHover && (interactive || isPremiumCard);
    
    // Create motion variants based on card type
    const cardMotionProps = shouldUseMagneticHover ? {
      whileHover: {
        y: -2,
        scale: 1.01,
        transition: liquidMetalUtils.createSpringTransition('light', 'balanced', 'balanced')
      },
      whileTap: interactive ? {
        scale: 0.99,
        transition: liquidMetalUtils.createSpringTransition('standard', 'firm', 'tight')
      } : undefined
    } : {};
    
    // Entrance animation for cascade effects
    const entranceProps = animateEntrance ? {
      variants: liquidFlow,
      initial: "hidden",
      animate: "visible",
      custom: cascadeIndex || 0
    } : {};
    
    const CardComponent = (
      <motion.div
        className={cn(hiveCardVariants({ 
          variant: finalVariant, 
          size, 
          rounded, 
          shadow, 
          className 
        }))}
        ref={ref}
        onClick={onClick}
        style={liquidMetalPerformance.gpuLayer}
        {...cardMotionProps}
        {...entranceProps}
        {...getMotionProps(props)}
      >
        {children}
      </motion.div>
    );
    
    // Enhanced magnetic hover for premium cards
    if (shouldUseMagneticHover && isPremiumCard) {
      return (
        <HiveMagneticHover
          intensity={magneticIntensity}
          disabled={!interactive}
        >
          {CardComponent}
        </HiveMagneticHover>
      );
    }
    
    return CardComponent;
  }
);

HiveCard.displayName = "HiveCard";

// HIVE Card Header Component
const HiveCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-0 pb-4", className)}
    {...props}
  />
))
HiveCardHeader.displayName = "HiveCardHeader"

// HIVE Card Title Component  
const HiveCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-[var(--hive-text-primary)]",
      className
    )}
    {...props}
  />
))
HiveCardTitle.displayName = "HiveCardTitle"

// HIVE Card Description Component
const HiveCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--hive-text-secondary)]", className)}
    {...props}
  />
))
HiveCardDescription.displayName = "HiveCardDescription"

// HIVE Card Content Component
const HiveCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-0", className)} {...props} />
))
HiveCardContent.displayName = "HiveCardContent"

// HIVE Card Footer Component
const HiveCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-0 pt-4", className)}
    {...props}
  />
))
HiveCardFooter.displayName = "HiveCardFooter"

export { 
  HiveCard, 
  hiveCardVariants,
  HiveCardHeader,
  HiveCardTitle,
  HiveCardDescription,
  HiveCardContent,
  HiveCardFooter
};

// Export as Card for easier migration and consistency
export { 
  HiveCard as Card, 
  hiveCardVariants as cardVariants,
  HiveCardHeader as CardHeader,
  HiveCardTitle as CardTitle,
  HiveCardDescription as CardDescription,
  HiveCardContent as CardContent,
  HiveCardFooter as CardFooter
};