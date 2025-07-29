'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from './framer-motion-proxy';
import { cn } from '../lib/utils';
import { HiveCard } from './hive-card';
import { HiveButton } from './hive-button';
import { GripVertical, Eye, EyeOff, Maximize2, Minimize2, Settings, Lock } from 'lucide-react';

export type BentoCardSize = 'sm' | 'md' | 'lg' | 'xl';
export type BentoCardType = 'avatar' | 'calendar' | 'tools' | 'spaces' | 'activity' | 'social' | 'ghostmode' | 'hivelab' | 'analytics' | 'leadership';

export interface BentoCard {
  id: string;
  type: BentoCardType;
  title: string;
  size: BentoCardSize;
  isVisible: boolean;
  isLocked?: boolean;
  isBuilderOnly?: boolean;
  comingSoon?: boolean;
  children: React.ReactNode;
  onResize?: (newSize: BentoCardSize) => void;
  onToggleVisibility?: () => void;
  onSettings?: () => void;
}

export interface BentoGridProps {
  cards: BentoCard[];
  isCustomizable?: boolean;
  isEditMode?: boolean;
  onCardReorder?: (cards: BentoCard[]) => void;
  onToggleEditMode?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: 'col-span-1 row-span-1',
  md: 'col-span-1 md:col-span-2 row-span-1', 
  lg: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2',
  xl: 'col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 row-span-1 md:row-span-2'
};

const mobileSizeClasses = {
  sm: 'col-span-1 row-span-1',
  md: 'col-span-1 row-span-1',
  lg: 'col-span-1 row-span-1', // Compressed on mobile
  xl: 'col-span-1 row-span-1'  // Compressed on mobile
};

const BentoCardWrapper: React.FC<{
  card: BentoCard;
  isEditMode: boolean;
  isMobile: boolean;
  dragConstraints: React.RefObject<HTMLDivElement>;
}> = ({ card, isEditMode, isMobile, dragConstraints }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleResize = useCallback((newSize: BentoCardSize) => {
    if (card.onResize) {
      card.onResize(newSize);
    }
  }, [card]);

  if (!card.isVisible) return null;

  const cardClasses = cn(
    isMobile ? mobileSizeClasses[card.size] : sizeClasses[card.size],
    'relative group transition-all duration-300',
    isExpanded && 'z-50',
    card.isLocked && 'opacity-75'
  );

  return (
    <motion.div
      className={cardClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <HiveCard 
        variant={card.isBuilderOnly ? "gold-featured" : card.comingSoon ? "minimal" : "elevated"}
        magneticHover={true}
        magneticIntensity={card.isBuilderOnly ? "strong" : "medium"}
        interactive={!card.isLocked}
        className={cn(
          'h-full w-full relative overflow-hidden',
          isEditMode && !card.isLocked && 'cursor-move'
        )}
      >
        {/* Edit Mode Controls */}
        <AnimatePresence>
          {isEditMode && (isHovered || isMobile) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-2 right-2 z-20 flex items-center gap-1"
            >
              {!card.isLocked && (
                <>
                  <HiveButton
                    size="sm"
                    variant="ghost"
                    onClick={() => card.onToggleVisibility?.()}
                    className="h-6 w-6 p-0"
                  >
                    {card.isVisible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </HiveButton>
                  
                  <HiveButton
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="h-6 w-6 p-0"
                  >
                    {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
                  </HiveButton>

                  {card.onSettings && (
                    <HiveButton
                      size="sm"
                      variant="ghost"
                      onClick={card.onSettings}
                      className="h-6 w-6 p-0"
                    >
                      <Settings className="h-3 w-3" />
                    </HiveButton>
                  )}
                </>
              )}

              {card.isLocked && (
                <div className="h-6 w-6 flex items-center justify-center">
                  <Lock className="h-3 w-3 text-gray-400" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag Handle */}
        <AnimatePresence>
          {isEditMode && !card.isLocked && (isHovered || isMobile) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute top-2 left-2 z-20"
            >
              <div className="p-1 rounded bg-gray-800/60 backdrop-blur-sm">
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coming Soon Overlay */}
        {card.comingSoon && (
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <Lock className="h-8 w-8 text-[var(--hive-brand-secondary)] mx-auto mb-2" />
              <p className="text-sm font-medium text-[var(--hive-text-primary)]">Coming in v1</p>
              <p className="text-xs text-gray-400 mt-1">Social features unlock soon</p>
            </div>
          </div>
        )}

        {/* Builder Only Badge */}
        {card.isBuilderOnly && (
          <div className="absolute top-2 left-2 z-10">
            <div className="px-2 py-1 bg-[var(--hive-brand-secondary)]/20 border border-hive-gold/30 rounded-full">
              <span className="text-xs font-medium text-[var(--hive-brand-secondary)]">Builder</span>
            </div>
          </div>
        )}

        {/* Card Content */}
        <div className={cn('h-full w-full', card.comingSoon && 'opacity-30')}>
          {card.children}
        </div>
      </HiveCard>
    </motion.div>
  );
};

export const BentoGrid: React.FC<BentoGridProps> = ({
  cards,
  isCustomizable = true,
  isEditMode = false,
  onCardReorder,
  onToggleEditMode,
  className
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleCards = cards.filter(card => card.isVisible);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleReorder = useCallback((reorderedCards: BentoCard[]) => {
    if (onCardReorder) {
      const allCards = [...cards];
      const hiddenCards = cards.filter(card => !card.isVisible);
      
      onCardReorder([...reorderedCards, ...hiddenCards]);
    }
  }, [cards, onCardReorder]);

  return (
    <div className={cn('relative', className)}>
      {/* Edit Mode Toggle */}
      {isCustomizable && (
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">Your Profile</h2>
            <div className="text-sm text-gray-400">
              Customize your dashboard
            </div>
          </div>
          
          <HiveButton
            variant={isEditMode ? "primary" : "outline"}
            onClick={onToggleEditMode}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            {isEditMode ? 'Done Editing' : 'Customize'}
          </HiveButton>
        </div>
      )}

      {/* Edit Mode Instructions */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-lg bg-[var(--hive-brand-secondary)]/10 border border-hive-gold/20"
          >
            <p className="text-sm text-[var(--hive-brand-secondary)]">
              <strong>Your Profile = Your Rules</strong> • Drag to reorder, click settings to customize, use eye icon to hide cards
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Container */}
      <div
        ref={containerRef}
        className={cn(
          'grid gap-6 auto-rows-[50]',
          isMobile 
            ? 'grid-cols-1' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        )}
      >
        {visibleCards.map((card) => (
          <motion.div key={card.id} className="contents">
            <BentoCardWrapper
              card={card}
              isEditMode={isEditMode}
              isMobile={isMobile}
              dragConstraints={containerRef}
            />
          </motion.div>
        ))}
      </div>

      {/* Hidden Cards Panel */}
      <AnimatePresence>
        {isEditMode && cards.some(card => !card.isVisible) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 p-4 rounded-lg bg-gray-800/40 border border-[var(--hive-border-default)]"
          >
            <h3 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">Hidden Cards</h3>
            <div className="flex flex-wrap gap-2">
              {cards
                .filter(card => !card.isVisible)
                .map((card) => (
                  <HiveButton
                    key={card.id}
                    variant="outline"
                    size="sm"
                    onClick={card.onToggleVisibility}
                    className="gap-2"
                  >
                    <Eye className="h-3 w-3" />
                    {card.title}
                    {card.comingSoon && <Lock className="h-3 w-3 text-gray-400" />}
                  </HiveButton>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BentoGrid;