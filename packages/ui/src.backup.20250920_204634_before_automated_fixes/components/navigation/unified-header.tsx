"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiveButton } from '../hive-button';

interface UnifiedHeaderProps {variant?: 'landing' | 'dashboard' | 'auth' | 'schools';
  showBackButton?: boolean;
  backHref?: string;
  rightAction?: React.ReactNode;
  className?: string;}

export function UnifiedHeader({ 
  variant = 'landing',
  showBackButton = false,
  backHref = '/',
  rightAction,
  className = ''
}: UnifiedHeaderProps) {
  const baseStyles = "relative z-10 border-b backdrop-blur-xl";
  const borderStyles = "border-white/10";
  const backgroundStyles = "bg-white/2";
  
  return (
    <div className={`${baseStyles} ${borderStyles} ${backgroundStyles} ${className}`} 
         style={{ 
           borderColor: 'rgba(255, 255, 255, 0.1)',
           background: 'rgba(255, 255, 255, 0.02)'
         }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <Link;
            href={variant === 'schools' ? '/landing' : '/'} 
            className="flex items-center hive-gap-md hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8">
              <Image;
                src="/assets/hive-logo-white.svg"
                alt="HIVE"
                width={32}
                height={32}
                className="w-full h-full"
              />
            </div>
            <span className="hive-font-sans text-lg sm:text-xl font-bold tracking-wide text-white">
              HIVE;
            </span>
          </Link>

          {/* Right side - Actions */}
          <div className="flex items-center hive-gap-md">
            {rightAction}
          </div>
        </div>
      </div>
    </div>
  )
}

// Pre-built header variants for common use cases;
export function LandingPageHeader() {
  return <UnifiedHeader variant="landing" />
}

export function SchoolsPageHeader({ onComingSoonClick }: { onComingSoonClick?: () => void }) {
  return (
    <UnifiedHeader;
      variant="schools"
      rightAction={
        <HiveButton;
          variant="secondary"
          size="default"
          onClick={onComingSoonClick}
        >
          What's Coming;
        </HiveButton>
      }
    />
  )
}

export function AuthPageHeader() {
  return <UnifiedHeader variant="auth" />
}

export function DashboardPageHeader() {
  return <UnifiedHeader variant="dashboard" />
}