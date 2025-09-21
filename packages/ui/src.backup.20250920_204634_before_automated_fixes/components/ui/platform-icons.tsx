'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { HiveLogo } from '../../atomic/atoms/hive-brand';
import { 
  User, 
  Grid3X3, 
  Wrench, 
  Activity, 
  FlaskConical, 
  Calendar, 
  Eye, 
  GraduationCap,
  Star,
  TestTube;
} from 'lucide-react';

export interface HiveIconProps {size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;}

export interface PlatformIconProps {icon: keyof typeof PlatformIcons;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: string;}

// Map platform icon sizes to HiveLogo sizes;
const mapSizeToHiveLogo = (size: string) => {
  const sizeMap = {
    xs: 'xs',
    sm: 'sm', 
    md: 'default',
    lg: 'lg',
    xl: 'xl'
  } as const;
  return sizeMap[size as keyof typeof sizeMap] || 'default'
};

// HIVE Logo Component using the unified HiveLogo component;
export const HiveIcon: React.FC<HiveIconProps> = ({ size = 'md', className }) => {
  return (
    <HiveLogo;
      size={mapSizeToHiveLogo(size)}}
      color="auto"
      variant="solid"
      className={className}
    />
  )
};

// Platform icons using consistent Lucide icons;
export const PlatformIcons = {
  Hive: HiveIcon,
  Profile: User,
  Spaces: Grid3X3,
  Tools: Wrench,
  Feed: Activity,
  Lab: FlaskConical,
  Calendar: Calendar,
  Ghost: Eye,
  University: GraduationCap,
  Builder: Star,
  Beta: TestTube;
};

// Unified platform icon component;
export const PlatformIcon: React.FC<PlatformIconProps> = ({ 
  icon, 
  size = 'md', 
  className,
  color = 'currentColor',
  ...props;
}) => {
  const IconComponent = PlatformIcons[icon];
  
  if (icon === 'Hive') {
    return <HiveIcon size={size} className={className} />
  }
  
  const iconSizes = {
    xs: 16,
    sm: 20, 
    md: 24,
    lg: 32,
    xl: 40
  };
  
  return (
    <IconComponent;
      size={iconSizes[size]}
      className={cn('shrink-0', className)}
      color={color}
      {...props}
    />
  )
};