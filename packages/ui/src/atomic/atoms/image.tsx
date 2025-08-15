'use client';

import React from 'react';
import { cn } from '../../lib/utils';

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  fallback?: React.ReactNode;
  aspectRatio?: 'square' | 'video' | 'photo' | 'wide' | 'portrait' | number;
  fit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'skeleton' | 'none';
  sizes?: string;
  priority?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  bordered?: boolean;
  grayscale?: boolean;
  blur?: boolean;
}

const aspectRatios = {
  square: 'aspect-square',
  video: 'aspect-video',
  photo: 'aspect-[4/3]',
  wide: 'aspect-[21/9]',
  portrait: 'aspect-[3/4]'
};

const objectFits = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  'scale-down': 'object-scale-down'
};

const roundedVariants = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
};

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(({
  src,
  alt,
  fallback,
  aspectRatio,
  fit = 'cover',
  loading = 'lazy',
  placeholder = 'skeleton',
  sizes,
  priority = false,
  rounded = 'md',
  bordered = false,
  grayscale = false,
  blur = false,
  className,
  style,
  onError,
  onLoad,
  ...props
}, ref) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(src);

  // Reset states when src changes
  React.useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setImageSrc(src);
  }, [src]);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    onLoad?.(event);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(event);
  };

  const containerClasses = [
    'relative overflow-hidden',
    'bg-[var(--hive-background-tertiary)]',
    
    // Aspect ratio
    typeof aspectRatio === 'string' ? aspectRatios[aspectRatio] : '',
    
    // Rounded corners
    roundedVariants[rounded],
    
    // Border
    bordered && 'border border-[var(--hive-border-primary)]',
    
    // Custom aspect ratio
    typeof aspectRatio === 'number' && 'relative'
  ].filter(Boolean).join(' ');

  const imageClasses = [
    'w-full h-full',
    'transition-all duration-300 ease-out',
    
    // Object fit
    objectFits[fit],
    
    // Visual effects
    grayscale && 'grayscale',
    blur && 'blur-sm',
    
    // Loading state
    isLoading && placeholder !== 'none' && 'opacity-0',
    !isLoading && !hasError && 'opacity-100'
  ].filter(Boolean).join(' ');

  const customStyle = React.useMemo(() => {
    const computedStyle: React.CSSProperties = { ...style };
    
    if (typeof aspectRatio === 'number') {
      computedStyle.aspectRatio = aspectRatio.toString();
    }
    
    return computedStyle;
  }, [style, aspectRatio]);

  // Show fallback if error and fallback provided
  if (hasError && fallback) {
    return (
      <div className={cn(containerClasses, className)} style={customStyle}>
        {typeof fallback === 'string' ? (
          <div className="flex items-center justify-center h-full text-[var(--hive-text-secondary)] text-sm">
            {fallback}
          </div>
        ) : (
          fallback
        )}
      </div>
    );
  }

  return (
    <div className={cn(containerClasses, className)} style={customStyle}>
      {/* Loading placeholder */}
      {isLoading && placeholder === 'skeleton' && (
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--hive-background-tertiary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] animate-pulse" />
      )}
      
      {/* Blur placeholder */}
      {isLoading && placeholder === 'blur' && (
        <div className="absolute inset-0 bg-[var(--hive-background-tertiary)] blur-sm" />
      )}
      
      {/* Actual image */}
      {!hasError && (
        <img
          ref={ref}
          src={imageSrc}
          alt={alt}
          loading={priority ? 'eager' : loading}
          sizes={sizes}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
      
      {/* Error state without fallback */}
      {hasError && !fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--hive-background-tertiary)]">
          <div className="text-center text-[var(--hive-text-secondary)]">
            <div className="w-8 h-8 mx-auto mb-2 bg-[var(--hive-text-muted)] rounded opacity-50" />
            <p className="text-xs">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  );
});

Image.displayName = 'Image';

// Convenient preset components
// Avatar is now provided by the dedicated avatar.tsx component
// This maintains the Image component focused on its core responsibility
export const ProfileImage = React.forwardRef<HTMLImageElement, Omit<ImageProps, 'aspectRatio' | 'rounded'>>(
  (props, ref) => (
    <Image
      ref={ref}
      aspectRatio="square"
      rounded="full"
      fit="cover"
      {...props}
    />
  )
);

ProfileImage.displayName = 'ProfileImage';

export const ThumbnailImage = React.forwardRef<HTMLImageElement, Omit<ImageProps, 'aspectRatio'>>(
  (props, ref) => (
    <Image
      ref={ref}
      aspectRatio="square"
      fit="cover"
      rounded="md"
      {...props}
    />
  )
);

ThumbnailImage.displayName = 'ThumbnailImage';

export const HeroImage = React.forwardRef<HTMLImageElement, Omit<ImageProps, 'aspectRatio' | 'fit'>>(
  (props, ref) => (
    <Image
      ref={ref}
      aspectRatio="video"
      fit="cover"
      priority
      {...props}
    />
  )
);

HeroImage.displayName = 'HeroImage';