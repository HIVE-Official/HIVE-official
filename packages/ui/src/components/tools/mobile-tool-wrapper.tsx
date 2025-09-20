"use client";

/**
 * Mobile Tool Wrapper - Responsive Layout for Tools
 * 
 * Ensures all HIVE tools work beautifully on mobile devices with:
 * - Touch-optimized interactions
 * - Responsive grid layouts
 * - Mobile-first component sizing
 * - Swipe gestures for navigation
 */

import React, { useState, useEffect } from 'react';
import { HiveCard, HiveButton } from '../index';
import { ChevronLeft, Menu, X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MobileToolWrapperProps {
  children: React.ReactNode;
  toolName: string;
  onBack?: () => void;
  showMobileMenu?: boolean;
  className?: string
}

export function MobileToolWrapper({
  children,
  toolName,
  onBack,
  showMobileMenu = false,
  className
}: MobileToolWrapperProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile)
  }, []);

  // Mobile-specific styles and behaviors
  const mobileClasses = isMobile ? {
    container: "min-h-screen bg-gray-50",
    header: "sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm",
    content: "p-4 pb-20", // Extra bottom padding for mobile navigation
    button: "h-12 text-base", // Larger touch targets
    card: "shadow-sm border-0 rounded-xl",
  } : {
    container: "",
    header: "",
    content: "p-6",
    button: "",
    card: "",
  };

  return (
    <div className={cn(
      "relative",
      mobileClasses.container,
      isFullscreen && "fixed inset-0 z-50 bg-white",
      className
    )}>
      {/* Mobile Header */}
      {isMobile && (
        <div className={mobileClasses.header}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {onBack && (
                <HiveButton
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="p-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                </HiveButton>
              )}
              <h1 className="font-semibold text-gray-900 truncate">{toolName}</h1>
            </div>
            
            <div className="flex items-center gap-2">
              {showMobileMenu && (
                <HiveButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2"
                >
                  {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </HiveButton>
              )}
              
              <HiveButton
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </HiveButton>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {showMenu && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
              <div className="p-4 space-y-2">
                <HiveButton variant="ghost" className="w-full justify-start">
                  Save Progress
                </HiveButton>
                <HiveButton variant="ghost" className="w-full justify-start">
                  Share Tool
                </HiveButton>
                <HiveButton variant="ghost" className="w-full justify-start">
                  Help & Tips
                </HiveButton>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tool Content */}
      <div className={cn(
        mobileClasses.content,
        "space-y-4"
      )}>
        <MobileOptimizedContent isMobile={isMobile}>
          {children}
        </MobileOptimizedContent>
      </div>

      {/* Mobile Bottom Navigation (if needed) */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex gap-3">
            <HiveButton className="flex-1 h-12">
              Save
            </HiveButton>
            <HiveButton variant="outline" className="flex-1 h-12">
              Submit
            </HiveButton>
          </div>
        </div>
      )}
    </div>
  )
}

// Mobile-optimized content wrapper
interface MobileOptimizedContentProps {
  children: React.ReactNode;
  isMobile: boolean
}

function MobileOptimizedContent({ children, isMobile }: MobileOptimizedContentProps) {
  if (!isMobile) {
    return <>{children}</>
  }

  // Apply mobile-specific transformations to child elements
  return (
    <div className="space-y-6">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          // Add mobile-optimized props to HiveCard components
          if (child.type === HiveCard || (child.props && child.props.className?.includes('HiveCard'))) {
            return React.cloneElement(child as React.ReactElement<any>, {
              className: cn(
                child.props.className,
                "shadow-sm border-0 rounded-xl touch-manipulation"
              )
            })}}}
          }

          // Add mobile-optimized props to HiveButton components
          if (child.type === HiveButton || (child.props && child.props.className?.includes('HiveButton'))) {
            return React.cloneElement(child as React.ReactElement<any>, {
              className: cn(
                child.props.className,
                "h-12 text-base touch-manipulation"
              )
            })
          }

          // Wrap form elements in mobile-friendly containers
          if (child.props && (child.props.type === 'input' || child.props.role === 'textbox')) {
            return (
              <div key={index} className="space-y-2">
                {child}
              </div>
            )
          }
        }

        return child
          })}
    </div>
  )
}

export default MobileToolWrapper;