"use client";

/**
 * HIVE RatingStars Element Renderer
 * Renders star rating inputs within tools
 * Uses standard style system for consistent output
 */

import React, { useState } from 'react';
import { ElementInstance } from '@hive/core';
import { Label } from '../ui/label';
import { Star } from 'lucide-react';
import { useStandardElementStyles, useStandardElementBehavior } from '../../hooks/use-standard-element-styles';

interface RatingStarsConfig {
  // Element-specific properties (flexible)
  label: string;
  maxRating?: number;
  allowHalf?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  
  // Standard properties (any element can use these)
  required?: boolean;
  disabled?: boolean;
  style?: any; // Flexible - accepts any style config, extracts standard properties
}

interface RatingStarsRendererProps {
  element: ElementInstance;
  config: RatingStarsConfig;
  value?: number;
  onChange?: (value: number) => void;
  onStateChange?: (state: any) => void;
  readOnly?: boolean;
  runtimeContext?: {
    formData: Record<string, any>;
    elementStates: Map<string, any>;
  };
}

export const RatingStarsRenderer: React.FC<RatingStarsRendererProps> = ({
  element,
  config,
  value = 0,
  onChange,
  onStateChange,
  readOnly = false,
  runtimeContext
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  // Use standard style system (flexible input, consistent output)
  const { classes, styles } = useStandardElementStyles(config.style);
  const behavior = useStandardElementBehavior({
    required: config.required,
    disabled: config.disabled,
    readOnly,
  });
  
  const maxRating = config.maxRating || 5;
  const starColor = config.color || '#fbbf24';
  
  // Size mapping (element-specific feature)
  const getSizeClass = (size?: string) => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-5 h-5';
      case 'lg': return 'w-6 h-6';
      default: return 'w-5 h-5';
    }
  };

  const handleStarClick = (rating: number) => {
    if (behavior.isReadOnly || behavior.isDisabled || !onChange) return;
    
    // If clicking the same star, toggle to 0
    const newRating = value === rating ? 0 : rating;
    onChange(newRating);
    
    if (onStateChange) {
      onStateChange({
        rating: newRating,
        lastUpdated: Date.now(),
      });
    }
  };

  const handleStarHover = (rating: number) => {
    if (behavior.isReadOnly || behavior.isDisabled) return;
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    if (behavior.isReadOnly || behavior.isDisabled) return;
    setHoverRating(0);
  };

  // Determine which rating to show (hover takes precedence)
  const displayRating = hoverRating || value;

  return (
    <div className={`space-y-2 ${classes.container} ${classes.spacing}`} style={styles}>
      <Label className="text-sm font-medium text-[var(--hive-text-primary)]">
        {config.label}
        {behavior.isRequired && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </Label>
      
      <div 
        className={`flex items-center space-x-1 ${classes.element}`}
        onMouseLeave={handleMouseLeave}
        {...behavior.ariaAttributes}
      >
        {Array.from({ length: maxRating }, (_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= displayRating;
          const isHalfFilled = config.allowHalf && 
            starNumber - 0.5 === displayRating;
          
          return (
            <button
              key={starNumber}
              type="button"
              onClick={() => handleStarClick(starNumber)}
              onMouseEnter={() => handleStarHover(starNumber)}
              disabled={behavior.isDisabled}
              className={`
                transition-all duration-150 
                ${behavior.isReadOnly || behavior.isDisabled ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                focus:outline-none focus:ring-2 focus:ring-[var(--hive-primary)] focus:ring-offset-1 rounded
                disabled:opacity-50
              `}
            >
              <Star
                className={`${getSizeClass(config.size)} transition-colors duration-150`}
                fill={isFilled || isHalfFilled ? starColor : 'transparent'}
                stroke={isFilled || isHalfFilled || hoverRating >= starNumber ? starColor : '#d1d5db'}
                strokeWidth={1.5}
              />
            </button>
          );
        })}
        
        {/* Rating display */}
        <span className="ml-2 text-sm text-[var(--hive-text-secondary)]">
          {value > 0 ? `${value}/${maxRating}` : 'No rating'}
        </span>
      </div>
      
      {/* Allow half ratings with additional click */}
      {config.allowHalf && !behavior.isReadOnly && !behavior.isDisabled && (
        <p className="text-xs text-[var(--hive-text-tertiary)]">
          Click between stars for half ratings
        </p>
      )}
    </div>
  );
};