/**
 * Data Type Badge Component
 *
 * Small badge showing data type with color-coding and optional icon.
 * Used in properties panels, port labels, and element configuration.
 */

'use client';

import React from 'react';
import { cn } from '../../../lib/utils';
import type { DataType } from '../../../types/hivelab.types';
import { DATA_TYPE_COLORS } from '../../../types/hivelab.types';
import {
  Type,
  Hash,
  ToggleLeft,
  Calendar,
  User,
  List,
  Box,
  Zap,
  File,
  CheckCircle2,
  Circle,
} from 'lucide-react';

// Icon mapping for each data type
const DATA_TYPE_ICONS: Record<DataType, React.ComponentType<{ className?: string }>> = {
  any: Circle,
  text: Type,
  number: Hash,
  boolean: ToggleLeft,
  date: Calendar,
  user: User,
  list: List,
  object: Box,
  event: Zap,
  file: File,
  validation: CheckCircle2,
};

export interface DataTypeBadgeProps {
  /** Data type */
  type: DataType | DataType[];
  /** Show icon */
  showIcon?: boolean;
  /** Show label text */
  showLabel?: boolean;
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Badge variant */
  variant?: 'default' | 'outline' | 'subtle';
  /** Additional class names */
  className?: string;
}

export function DataTypeBadge({
  type,
  showIcon = true,
  showLabel = true,
  size = 'md',
  variant = 'default',
  className,
}: DataTypeBadgeProps) {
  // Get primary type for display
  const primaryType = Array.isArray(type) ? type[0] : type;
  const color = DATA_TYPE_COLORS[primaryType];
  const Icon = DATA_TYPE_ICONS[primaryType];

  // Size classes
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs gap-1',
    md: 'px-2 py-1 text-xs gap-1.5',
    lg: 'px-2.5 py-1.5 text-sm gap-2',
  };

  const iconSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  // Variant styles
  const getVariantStyle = () => {
    switch (variant) {
      case 'outline':
        return {
          borderColor: color,
          color: color,
          backgroundColor: 'transparent',
        };
      case 'subtle':
        return {
          backgroundColor: `${color}15`,
          color: color,
        };
      case 'default':
      default:
        return {
          backgroundColor: color,
          color: 'hsl(var(--background))',
        };
    }
  };

  const variantStyle = getVariantStyle();

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md font-medium whitespace-nowrap',
        variant === 'outline' && 'border-2',
        sizeClasses[size],
        className
      )}
      style={variantStyle}
    >
      {showIcon && Icon && (
        <Icon className={iconSizeClasses[size]} />
      )}
      {showLabel && (
        <span className="capitalize">
          {Array.isArray(type) ? type.join(' | ') : type}
        </span>
      )}
    </span>
  );
}

DataTypeBadge.displayName = 'DataTypeBadge';
