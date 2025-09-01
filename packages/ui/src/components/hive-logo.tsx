import React from 'react';
import { cn } from '../lib/utils';

interface HiveLogoProps extends React.SVGAttributes<SVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'mono' | 'gradient';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

export const HiveLogo: React.FC<HiveLogoProps> = ({
  size = 'md',
  variant = 'default',
  className,
  ...props
}) => {
  const fillColor = variant === 'mono' ? 'currentColor' : '#FFD700';
  
  return (
    <svg
      className={cn(sizeClasses[size], className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {variant === 'gradient' && (
        <defs>
          <linearGradient id="hive-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M50 10L75 25V45L50 60L25 45V25L50 10Z"
        fill={variant === 'gradient' ? 'url(#hive-gradient)' : fillColor}
        stroke={variant === 'mono' ? 'currentColor' : '#FFD700'}
        strokeWidth="2"
      />
      <path
        d="M50 40L65 50V70L50 80L35 70V50L50 40Z"
        fill={variant === 'gradient' ? 'url(#hive-gradient)' : fillColor}
        stroke={variant === 'mono' ? 'currentColor' : '#FFD700'}
        strokeWidth="2"
        opacity="0.8"
      />
      <path
        d="M30 30L45 40V60L30 70L15 60V40L30 30Z"
        fill={variant === 'gradient' ? 'url(#hive-gradient)' : fillColor}
        stroke={variant === 'mono' ? 'currentColor' : '#FFD700'}
        strokeWidth="2"
        opacity="0.6"
      />
      <path
        d="M70 30L85 40V60L70 70L55 60V40L70 30Z"
        fill={variant === 'gradient' ? 'url(#hive-gradient)' : fillColor}
        stroke={variant === 'mono' ? 'currentColor' : '#FFD700'}
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  );
};

HiveLogo.displayName = 'HiveLogo';