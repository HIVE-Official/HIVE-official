"use client";

import React, { useState, useRef } from 'react';
import { HiveButton } from '../index';
import { Plus, Sparkles, Wand2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LibraryContextualAccess } from './library-contextual-access';
// import { SpaceDefinition } from '../spaces/space-system-core';

interface PlantNewToolButtonProps {
  space: any; // SpaceDefinition;
  onToolInstall?: (elementId: string, configuration?: any) => Promise<void>;
  variant?: 'default' | 'compact' | 'floating';
  className?: string;
  disabled?: boolean;
  showLabel?: boolean;
}

export function PlantNewToolButton({ 
  space, 
  onToolInstall, 
  variant = 'default',
  className,
  disabled = false,
  showLabel = true
}: PlantNewToolButtonProps) {
  const [showLibrary, setShowLibrary] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!disabled) {
      setShowLibrary(true);
    }
  };

  const handleToolInstall = async (elementId: string, configuration?: any) => {
    try {
      await onToolInstall?.(elementId, configuration);
      setShowLibrary(false);
    } catch (error) {
      console.error('Failed to install tool:', error);
      // Keep modal open on error
    }
  };

  const renderButton = () => {
    switch (variant) {
      case 'compact':
        return (
          <HiveButton
            ref={buttonRef}
            size="sm"
            onClick={handleClick}
            disabled={disabled}
            className={cn(
              "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white border-0",
              "shadow-lg hover:shadow-xl transition-all duration-200",
              "group relative overflow-hidden",
              className
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <Plus className="w-4 h-4" />
            {showLabel && <span className="ml-1">Add Tool</span>}
          </HiveButton>
        );

      case 'floating':
        return (
          <button
            ref={buttonRef}
            onClick={handleClick}
            disabled={disabled}
            className={cn(
              "fixed bottom-6 right-6 z-40",
              "w-14 h-14 bg-gradient-to-r from-amber-400 to-amber-500",
              "hover:from-amber-500 hover:to-amber-600",
              "text-white rounded-full shadow-2xl",
              "transition-all duration-200 hover:scale-110",
              "group flex items-center justify-center",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300" />
            <Plus className="w-6 h-6 relative z-10" />
          </button>
        );

      default:
        return (
          <HiveButton
            ref={buttonRef}
            onClick={handleClick}
            disabled={disabled}
            className={cn(
              "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white border-0",
              "shadow-lg hover:shadow-xl transition-all duration-200",
              "group relative overflow-hidden min-w-[140px]",
              className
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <div className="flex items-center gap-2 relative z-10">
              <Plus className="w-4 h-4" />
              {showLabel && <span>Plant New Tool</span>}
              <Sparkles className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
          </HiveButton>
        );
    }
  };

  return (
    <>
      {renderButton()}
      
      <LibraryContextualAccess
        space={space}
        isOpen={showLibrary}
        onClose={() => setShowLibrary(false)}
        onToolInstall={handleToolInstall}
        triggerRef={buttonRef}
      />
    </>
  );
}

export default PlantNewToolButton;