/**
 * HIVE Unified Bento Grid System
 * Production-ready, mobile-first, responsive grid for campus profiles
 */

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Grip, 
  Eye, 
  EyeOff, 
  Settings, 
  Lock,
  Plus,
  X
} from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type BentoCardSize = 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'hero';
export type BentoCardPriority = 'essential' | 'high' | 'medium' | 'low' | 'hidden';

export interface BentoCardProps {
  id: string;
  title: string;
  size: BentoCardSize;
  priority: BentoCardPriority;
  children: React.ReactNode;
  
  // Customization
  isVisible?: boolean;
  isLocked?: boolean;
  isBuilderOnly?: boolean;
  comingSoon?: boolean;
  
  // Interactions
  onResize?: (newSize: BentoCardSize) => void;
  onToggleVisibility?: () => void;
  onRemove?: () => void;
  onConfigure?: () => void;
  
  // Visual
  className?: string;
  icon?: React.ReactNode;
  description?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
}

export interface BentoGridProps {
  cards: BentoCardProps[];
  
  // Layout
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: number;
  minCardHeight?: number;
  
  // Features
  isCustomizable?: boolean;
  isEditMode?: boolean;
  showHiddenCards?: boolean;
  
  // Events
  onCardReorder?: (newOrder: string[]) => void;
  onToggleEditMode?: () => void;
  onCardUpdate?: (cardId: string, updates: Partial<BentoCardProps>) => void;
  
  // Styling
  className?: string;
}

// ============================================================================
// GRID SIZE MAPPING
// ============================================================================

const GRID_SIZES: Record<BentoCardSize, {
  mobile: string;
  tablet: string;
  desktop: string;
  minHeight: number;
}> = {
  small: {
    mobile: 'col-span-1 row-span-1',
    tablet: 'col-span-1 row-span-1', 
    desktop: 'col-span-1 row-span-1',
    minHeight: 160
  },
  medium: {
    mobile: 'col-span-1 row-span-1',
    tablet: 'col-span-2 row-span-1',
    desktop: 'col-span-2 row-span-1', 
    minHeight: 160
  },
  large: {
    mobile: 'col-span-1 row-span-2',
    tablet: 'col-span-2 row-span-2',
    desktop: 'col-span-2 row-span-2',
    minHeight: 340
  },
  wide: {
    mobile: 'col-span-1 row-span-1',
    tablet: 'col-span-3 row-span-1',
    desktop: 'col-span-3 row-span-1',
    minHeight: 160
  },
  tall: {
    mobile: 'col-span-1 row-span-2',
    tablet: 'col-span-1 row-span-3',
    desktop: 'col-span-1 row-span-3',
    minHeight: 520
  },
  hero: {
    mobile: 'col-span-1 row-span-2',
    tablet: 'col-span-3 row-span-2',
    desktop: 'col-span-4 row-span-2',
    minHeight: 340
  }
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const cardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

const controlsVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

// ============================================================================
// BENTO CARD COMPONENT
// ============================================================================

const BentoCard: React.FC<BentoCardProps & {
  isEditMode: boolean;
  isMobile: boolean;
  onUpdate: (updates: Partial<BentoCardProps>) => void;
}> = ({ 
  id,
  title,
  size,
  priority,
  children,
  isVisible = true,
  isLocked = false,
  isBuilderOnly = false,
  comingSoon = false,
  isEditMode,
  isMobile,
  onResize,
  onToggleVisibility,
  onRemove,
  onConfigure,
  onUpdate,
  className,
  icon,
  description,
  badge
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const sizeConfig = GRID_SIZES[size];
  const gridClasses = isMobile ? sizeConfig.mobile : 
                     (typeof window !== 'undefined' && window.innerWidth < 1024) ? 
                     sizeConfig.tablet : sizeConfig.desktop;

  const handleSizeChange = useCallback((newSize: BentoCardSize) => {
    onResize?.(newSize);
    onUpdate({ size: newSize });
  }, [onResize, onUpdate]);

  if (!isVisible && !isEditMode) return null;

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        gridClasses,
        'relative group',
        !isVisible && 'opacity-50',
        className
      )}
      style={{
        minHeight: `${sizeConfig.minHeight}px`
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={cn(
        'h-full w-full relative overflow-hidden transition-all duration-300',
        'border-[var(--hive-border-default)] bg-[var(--hive-background-elevated)]',
        'hover:border-[var(--hive-brand-secondary)]/30 hover:shadow-lg',
        isBuilderOnly && 'border-[var(--hive-brand-secondary)]/20 bg-gradient-to-br from-[var(--hive-brand-secondary)]/5 to-transparent',
        comingSoon && 'opacity-60',
        isEditMode && 'cursor-move'
      )}>
        
        {/* Edit Mode Controls */}
        <AnimatePresence>
          {isEditMode && (isHovered || isMobile || showControls) && !isLocked && (
            <motion.div
              variants={controlsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-[var(--hive-background-primary)]/90 backdrop-blur-sm rounded-lg border border-[var(--hive-border-subtle)] p-1"
            >
              <Button
                size="sm"
                variant="ghost"
                onClick={onToggleVisibility}
                className="h-7 w-7 p-0"
              >
                {isVisible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </Button>
              
              {onConfigure && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onConfigure}
                  className="h-7 w-7 p-0"
                >
                  <Settings className="h-3 w-3" />
                </Button>
              )}
              
              {onRemove && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onRemove}
                  className="h-7 w-7 p-0 text-red-500 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              
              <div className="h-7 w-7 flex items-center justify-center cursor-grab active:cursor-grabbing">
                <Grip className="h-3 w-3 text-[var(--hive-text-secondary)]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lock Indicator */}
        {isLocked && (
          <div className="absolute top-3 left-3 z-10">
            <div className="h-6 w-6 bg-[var(--hive-background-primary)]/90 backdrop-blur-sm rounded border border-[var(--hive-border-subtle)] flex items-center justify-center">
              <Lock className="h-3 w-3 text-[var(--hive-text-tertiary)]" />
            </div>
          </div>
        )}

        {/* Builder Badge */}
        {isBuilderOnly && (
          <div className="absolute top-3 left-3 z-10">
            <div className="px-2 py-1 bg-[var(--hive-brand-secondary)]/15 border border-[var(--hive-brand-secondary)]/30 rounded-full">
              <span className="text-xs font-medium text-[var(--hive-brand-secondary)]">Builder</span>
            </div>
          </div>
        )}

        {/* Coming Soon Overlay */}
        {comingSoon && (
          <div className="absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <Lock className="h-6 w-6 text-[var(--hive-brand-secondary)] mx-auto mb-2" />
              <p className="text-sm font-medium text-[var(--hive-text-primary)]">Coming Soon</p>
              <p className="text-xs text-[var(--hive-text-tertiary)] mt-1">Available in v1</p>
            </div>
          </div>
        )}

        {/* Card Content */}
        <div className={cn(
          'h-full w-full p-4',
          comingSoon && 'opacity-40 pointer-events-none'
        )}>
          {/* Card Header */}
          {(title || icon || badge) && (
            <div className="mb-3">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  {icon}
                  <h3 className="text-sm font-semibold text-[var(--hive-text-primary)] truncate">
                    {title}
                  </h3>
                </div>
                {badge && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] rounded-full shrink-0">
                    {badge.text}
                  </span>
                )}
              </div>
              {description && (
                <p className="text-xs text-[var(--hive-text-secondary)] line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          )}
          
          {/* Main Content */}
          <div className="flex-1 h-full">
            {children}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// MAIN BENTO GRID COMPONENT
// ============================================================================

export const BentoGrid: React.FC<BentoGridProps> = ({
  cards,
  columns = { mobile: 1, tablet: 2, desktop: 4 },
  gap = 4,
  minCardHeight = 160,
  isCustomizable = true,
  isEditMode = false,
  showHiddenCards = false,
  onCardReorder,
  onToggleEditMode,
  onCardUpdate,
  className
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check mobile on mount and resize
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sort and filter cards
  const sortedCards = useMemo(() => {
    const priorityOrder = { essential: 0, high: 1, medium: 2, low: 3, hidden: 4 };
    return cards
      .filter(card => showHiddenCards || card.priority !== 'hidden')
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }, [cards, showHiddenCards]);

  const visibleCards = sortedCards.filter(card => card.isVisible !== false || isEditMode);
  const hiddenCards = cards.filter(card => card.isVisible === false);

  const handleCardUpdate = useCallback((cardId: string, updates: Partial<BentoCardProps>) => {
    onCardUpdate?.(cardId, updates);
  }, [onCardUpdate]);

  return (
    <div className={cn('w-full space-y-6', className)}>
      
      {/* Grid Header */}
      {isCustomizable && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
              Your Campus Command Center
            </h2>
            <p className="text-sm text-[var(--hive-text-secondary)] mt-1">
              Customize your profile dashboard • {visibleCards.length} active cards
            </p>
          </div>
          
          <Button
            variant={isEditMode ? "default" : "outline"}
            onClick={onToggleEditMode}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            {isEditMode ? 'Done' : 'Customize'}
          </Button>
        </div>
      )}

      {/* Edit Mode Instructions */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-lg bg-[var(--hive-brand-secondary)]/10 border border-[var(--hive-brand-secondary)]/20"
          >
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 bg-[var(--hive-brand-secondary)] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Settings className="h-3 w-3 text-black" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--hive-brand-secondary)] mb-1">
                  Profile Customization Active
                </p>
                <p className="text-xs text-[var(--hive-text-secondary)]">
                  Drag cards to reorder • Use controls to hide/show cards • Your changes save automatically
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid */}
      <motion.div
        layout
        className={cn(
          'grid auto-rows-fr gap-4',
          // Mobile: Single column
          'grid-cols-1',
          // Tablet: 2-3 columns  
          `md:grid-cols-${columns.tablet}`,
          // Desktop: Full columns
          `lg:grid-cols-${columns.desktop}`,
          // Dynamic gap
          `gap-${gap}`
        )}
        style={{
          minHeight: `${minCardHeight}px`
        }}
      >
        <AnimatePresence mode="popLayout">
          {visibleCards.map((card) => (
            <BentoCard
              key={card.id}
              {...card}
              isEditMode={isEditMode}
              isMobile={isMobile}
              onUpdate={(updates) => handleCardUpdate(card.id, updates)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Hidden Cards Panel */}
      <AnimatePresence>
        {isEditMode && hiddenCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-lg bg-[var(--hive-background-subtle)] border border-[var(--hive-border-default)]"
          >
            <h3 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3 flex items-center gap-2">
              <EyeOff className="h-4 w-4" />
              Hidden Cards
            </h3>
            <div className="flex flex-wrap gap-2">
              {hiddenCards.map((card) => (
                <Button
                  key={card.id}
                  variant="secondary"
                  size="sm"
                  onClick={card.onToggleVisibility}
                  className="gap-2"
                >
                  <Eye className="h-3 w-3" />
                  {card.title}
                  {card.comingSoon && <Lock className="h-3 w-3 text-[var(--hive-text-tertiary)]" />}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {visibleCards.length === 0 && !isEditMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="h-16 w-16 bg-[var(--hive-background-subtle)] rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-[var(--hive-text-tertiary)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">
            No cards visible
          </h3>
          <p className="text-[var(--hive-text-secondary)] mb-4">
            Enable customization to add and organize your profile cards
          </p>
          {isCustomizable && (
            <Button onClick={onToggleEditMode} variant="secondary">
              <Settings className="h-4 w-4 mr-2" />
              Customize Profile
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
};

// ============================================================================
// UTILITIES & HELPERS
// ============================================================================

export const createBentoCard = (
  id: string,
  title: string,
  size: BentoCardSize = 'medium',
  priority: BentoCardPriority = 'medium',
  overrides: Partial<BentoCardProps> = {}
): BentoCardProps => ({
  id,
  title,
  size,
  priority,
  children: null,
  isVisible: true,
  isLocked: false,
  isBuilderOnly: false,
  comingSoon: false,
  ...overrides
});

export const CAMPUS_CARD_PRESETS = {
  avatar: createBentoCard('avatar', 'Profile Photo', 'small', 'essential'),
  calendar: createBentoCard('calendar', 'Campus Schedule', 'medium', 'high'),
  spaces: createBentoCard('spaces', 'My Spaces', 'large', 'essential'),
  tools: createBentoCard('tools', 'Built Tools', 'medium', 'high'),
  activity: createBentoCard('activity', 'Recent Activity', 'wide', 'medium'),
  analytics: createBentoCard('analytics', 'Impact Stats', 'small', 'low'),
  social: createBentoCard('social', 'Campus Connections', 'large', 'medium', { comingSoon: true }),
  hivelab: createBentoCard('hivelab', 'HiveLab Access', 'medium', 'low', { isBuilderOnly: true })
} as const;

export default BentoGrid;