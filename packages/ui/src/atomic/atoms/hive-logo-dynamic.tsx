import React from 'react';
import Image from 'next/image';

/**
 * HIVE Dynamic Logo Component
 * Automatically selects the right logo variant based on context
 */

export interface HiveLogoDynamicProps {
  /** Explicitly set variant (auto-detect if not provided) */
  variant?: 'gold' | 'black' | 'white' | 'auto';
  /** Size of the logo */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Custom className for additional styling */
  className?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Whether to add glow effect (for gold variant) */
  glow?: boolean;
  /** Whether to animate on hover */
  animated?: boolean;
}

const LOGO_PATHS = {
  gold: '/assets/hive-logo-gold.svg',
  black: '/assets/hive-logo-black.svg',
  white: '/assets/hive-logo-white.svg',
} as const;

const SIZES = {
  xs: { width: 24, height: 24 },
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 64, height: 64 },
  xl: { width: 96, height: 96 },
} as const;

export const HiveLogoDynamic: React.FC<HiveLogoDynamicProps> = ({
  variant = 'auto',
  size = 'md',
  className = '',
  alt = 'HIVE',
  glow = false,
  animated = false,
}) => {
  // Auto-detect variant based on parent background
  const [detectedVariant, setDetectedVariant] = React.useState<'gold' | 'black' | 'white'>('gold');

  React.useEffect(() => {
    if (variant === 'auto') {
      // Check if we're in a dark theme context
      const isDark = document.documentElement.classList.contains('dark') ||
                     window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Check parent background color
      const checkParentBackground = (element: HTMLElement | null): void => {
        if (!element) return;

        const bgColor = window.getComputedStyle(element).backgroundColor;
        if (bgColor && bgColor !== 'transparent') {
          // Parse RGB values
          const rgb = bgColor.match(/\d+/g);
          if (rgb) {
            const [r, g, b] = rgb.map(Number);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;

            // Use gold on dark backgrounds, black on light backgrounds
            setDetectedVariant(brightness < 128 ? 'gold' : 'black');
          }
        }
      };

      // Try to detect from immediate parent
      const parent = document.querySelector('.logo-container') as HTMLElement;
      if (parent) {
        checkParentBackground(parent);
      } else {
        // Default based on theme
        setDetectedVariant(isDark ? 'gold' : 'black');
      }
    }
  }, [variant]);

  const finalVariant = variant === 'auto' ? detectedVariant : variant;
  const dimensions = SIZES[size];

  return (
    <div
      className={`
        relative inline-block
        ${animated ? 'transition-transform hover:scale-110' : ''}
        ${className}
      `}
    >
      <Image
        src={LOGO_PATHS[finalVariant]}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        priority
        className={`
          ${finalVariant === 'gold' && glow ? 'drop-shadow-[0_0_20px_color-mix(in srgb, var(--hive-brand-secondary) 50%, transparent)]' : ''}
        `}
      />

      {/* Optional animated glow effect for gold variant */}
      {finalVariant === 'gold' && glow && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={LOGO_PATHS.gold}
            alt=""
            width={dimensions.width}
            height={dimensions.height}
            className="blur-xl opacity-50 animate-pulse"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

/**
 * Logo with text lockup
 */
export const HiveLogoLockup: React.FC<{
  variant?: 'gold' | 'black' | 'white' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  tagline?: string;
}> = ({
  variant = 'auto',
  size = 'md',
  orientation = 'horizontal',
  tagline
}) => {
  const textSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  const logoSizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
  } as const;

  const textColors = {
    gold: 'text-[var(--hive-brand-secondary)]',
    black: 'text-black',
    white: 'text-white',
    auto: 'text-current'
  };

  return (
    <div
      className={`
        flex items-center gap-3
        ${orientation === 'vertical' ? 'flex-col text-center' : 'flex-row'}
      `}
    >
      <HiveLogoDynamic
        variant={variant}
        size={logoSizes[size]}
        glow={variant === 'gold'}
        animated
      />
      <div>
        <div className={`font-black tracking-tight ${textSizes[size]} ${textColors[variant]}`}>
          HIVE
        </div>
        {tagline && (
          <div className={`text-xs uppercase tracking-wider opacity-60 mt-1`}>
            {tagline}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Animated logo for loading states
 */
export const HiveLogoSpinner: React.FC<{
  size?: 'sm' | 'md' | 'lg';
}> = ({ size = 'md' }) => {
  return (
    <div className="relative">
      <HiveLogoDynamic
        variant="gold"
        size={size}
        className="animate-spin"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/2 h-1/2 bg-black rounded-full" />
      </div>
    </div>
  );
};

/**
 * Logo usage examples
 */
export const LogoUsageExamples: React.FC = () => {
  return (
    <div className="space-y-8 p-8">
      {/* On black background */}
      <div className="bg-black p-8 rounded-lg">
        <h3 className="text-white mb-4">On Black (Gold Logo)</h3>
        <div className="flex items-center gap-4">
          <HiveLogoDynamic variant="gold" size="sm" />
          <HiveLogoDynamic variant="gold" size="md" glow />
          <HiveLogoDynamic variant="gold" size="lg" glow animated />
        </div>
      </div>

      {/* On white background */}
      <div className="bg-white p-8 rounded-lg">
        <h3 className="text-black mb-4">On White (Black Logo)</h3>
        <div className="flex items-center gap-4">
          <HiveLogoDynamic variant="black" size="sm" />
          <HiveLogoDynamic variant="black" size="md" />
          <HiveLogoDynamic variant="black" size="lg" animated />
        </div>
      </div>

      {/* On gold background */}
      <div className="bg-[var(--hive-brand-secondary)] p-8 rounded-lg">
        <h3 className="text-black mb-4">On Gold (Black Logo)</h3>
        <div className="flex items-center gap-4">
          <HiveLogoDynamic variant="black" size="sm" />
          <HiveLogoDynamic variant="black" size="md" />
          <HiveLogoDynamic variant="black" size="lg" />
        </div>
      </div>

      {/* Logo lockups */}
      <div className="bg-black p-8 rounded-lg">
        <h3 className="text-white mb-4">Logo Lockups</h3>
        <div className="space-y-4">
          <HiveLogoLockup variant="gold" size="md" tagline="Campus Operating System" />
          <HiveLogoLockup variant="gold" size="lg" orientation="vertical" tagline="Built by students, for students" />
        </div>
      </div>

      {/* Loading spinner */}
      <div className="bg-black p-8 rounded-lg">
        <h3 className="text-white mb-4">Loading States</h3>
        <div className="flex items-center gap-4">
          <HiveLogoSpinner size="sm" />
          <HiveLogoSpinner size="md" />
          <HiveLogoSpinner size="lg" />
        </div>
      </div>
    </div>
  );
};

export default HiveLogoDynamic;