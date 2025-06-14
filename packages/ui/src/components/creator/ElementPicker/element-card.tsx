'use client';

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { ElementCardProps } from './types';
import { 
  Type, 
  Image, 
  Minus, 
  Square, 
  MousePointer, 
  CheckSquare, 
  TextCursor, 
  Star, 
  Clock, 
  BarChart3, 
  GitBranch, 
  Zap 
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { Element } from '@hive/core';

// Map element types to Lucide icons
const ELEMENT_ICONS = {
  textBlock: Type,
  imageBlock: Image,
  divider: Minus,
  stack: Square,
  button: MousePointer,
  choiceSelect: CheckSquare,
  textInput: TextCursor,
  ratingStars: Star,
  countdownTimer: Clock,
  progressBar: BarChart3,
  conditionGate: GitBranch,
  pingTrigger: Zap,
} as const;

interface ElementCardProps {
  element: Element;
  onDragStart?: (element: Element) => void;
  onSelect?: (element: Element) => void;
  className?: string;
}

export const ElementCard: React.FC<ElementCardProps> = ({
  element,
  onDragStart,
  onSelect,
  className,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      elementId: element.id,
      elementType: element.id
    }));
    onDragStart?.(element);
  };

  const handleClick = () => {
    onSelect?.(element);
  };

  const IconComponent = ELEMENT_ICONS[element.id as keyof typeof ELEMENT_ICONS] || Type;

  return (
    <motion.div
      className={cn(
        'group relative flex flex-col items-center gap-2 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors',
        className
      )}
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-gold/20 text-accent-gold">
        <IconComponent className="w-4 h-4" />
      </div>
      
      <div className="text-center">
        <h3 className="text-sm font-medium text-text-primary">{element.name}</h3>
        <p className="text-xs text-text-muted mt-1 line-clamp-2">{element.description}</p>
      </div>
      
      <div className="absolute inset-0 rounded-lg border-2 border-accent-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}; 