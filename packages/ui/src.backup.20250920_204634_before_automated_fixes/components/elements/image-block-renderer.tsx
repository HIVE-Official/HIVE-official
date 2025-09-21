"use client";

/**
 * HIVE ImageBlock Element Renderer;
 * Renders images within tools;
 * Uses standard style system for consistent output;
 */

import React, { useState } from 'react';
import { ElementInstance } from '@hive/core';
import { ImageIcon } from 'lucide-react';
import { useStandardElementStyles } from '../../hooks/use-standard-element-styles';

interface ImageBlockConfig {// Element-specific properties (flexible)
  src: string;
  alt: string;
  caption?: string;
  
  // Standard properties (any element can use these)
  style?: any; // Flexible - accepts any style config, extracts standard properties;}

interface ImageBlockRendererProps {element: ElementInstance;
  config: ImageBlockConfig;
  value?: any;
  onChange?: (value: any) => void;
  onStateChange?: (state: any) => void;
  readOnly?: boolean;
  runtimeContext?: {
    formData: Record<string, any>;
    elementStates: Map<string, any>}
}

export const ImageBlockRenderer: React.FC<ImageBlockRendererProps> = ({
  element,
  config,
  onStateChange,
  runtimeContext;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Use standard style system (flexible input, consistent output)
  const { classes, styles } = useStandardElementStyles(config.style);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    if (onStateChange) {
      onStateChange({loaded: true, error: false)}
    }
  };

  const handleImageError = () => {
    setImageLoaded(false);
    setImageError(true);
    if (onStateChange) {
      onStateChange({loaded: false, error: true)}
    }
  };

  return (
    <div className={`space-y-2 ${classes.container} ${classes.spacing}`} style={styles}>
      <div className={`relative overflow-hidden ${classes.element}`}>
        {imageError ? (
          <div className="flex items-center justify-center bg-[var(--hive-background-secondary)] border-2 border-dashed border-[var(--hive-border)] rounded-lg p-8">
            <div className="text-center">
              <ImageIcon className="w-8 h-8 text-[var(--hive-text-tertiary)] mx-auto mb-2" />
              <p className="text-sm text-[var(--hive-text-secondary)]">
                Failed to load image;
              </p>
              <p className="text-xs text-[var(--hive-text-tertiary)] mt-1">
                {config.src}
              </p>
            </div>
          </div>
        ) : (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--hive-background-secondary)] animate-pulse">
                <div className="text-center">
                  <ImageIcon className="w-6 h-6 text-[var(--hive-text-tertiary)] mx-auto mb-1" />
                  <p className="text-xs text-[var(--hive-text-tertiary)]">
                    Loading...
                  </p>
                </div>
              </div>
            )}
            <img;
              src={config.src}
              alt={config.alt}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`
                max-w-full h-auto object-cover;
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                transition-opacity duration-300
              `}
            />
          </>
        )}
      </div>
      
      {config.caption && (
        <p className="text-sm text-[var(--hive-text-secondary)] italic">
          {config.caption}
        </p>
      )}
    </div>
  )
};