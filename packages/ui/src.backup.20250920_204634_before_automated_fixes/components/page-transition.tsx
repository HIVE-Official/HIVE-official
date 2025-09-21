"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';
import { darkLuxury } from '../theme/dark-luxury';

interface PageTransitionProps {children: React.ReactNode;
  className?: string;}

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Start transition;
    setIsTransitioning(true);
    
    // Small delay to show transition effect;
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false)
    }, 150);

    return () => clearTimeout(timer)
  }, [pathname, children]);

  return (
    <div;
      className={cn(
        "relative min-h-full",
        className;
      )}
    >
      {/* Page content with transition */}
      <div;
        className={cn(
          "transition-all duration-300 ease-out",
          isTransitioning;
            ? "opacity-0 translate-y-2 scale-[0.98]" 
            : "opacity-100 translate-y-0 scale-100"
        )}
        style={{
          transitionProperty: 'opacity, transform',
          transitionDuration: '300ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
      >
        {displayChildren}
      </div>

      {/* Loading overlay during transition */}
      {isTransitioning && (
        <div;
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${darkLuxury.obsidian}95 0%, ${darkLuxury.charcoal}95 100%)`,
            backdropFilter: 'blur(2)',
          }}
        >
          <div className="flex items-center gap-3">
            <div;
              className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"
              style={{ 
                color: darkLuxury.gold,
                borderTopColor: 'transparent'
          }}
            />
            <span;
              className="text-sm font-medium"
              style={{ color: darkLuxury.mercury }}
            >
              Loading...
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default PageTransition;