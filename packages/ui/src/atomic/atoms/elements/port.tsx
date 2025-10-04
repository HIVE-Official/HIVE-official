/**
 * Port Component
 *
 * Connection point on an element (input or output).
 * Handles hover states, connection creation, and type compatibility indication.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { DataType, Port as PortType } from '@/types/hivelab.types';
import { DATA_TYPE_COLORS } from '@/types/hivelab.types';

export interface PortProps {
  /** Port data */
  port: PortType;
  /** Is this port currently being hovered */
  isHovered?: boolean;
  /** Is this port compatible with current connection draft */
  isCompatible?: boolean;
  /** Is this port part of an active connection */
  isConnected?: boolean;
  /** Is a connection currently being created */
  isConnecting?: boolean;
  /** Mouse down handler (start connection) */
  onMouseDown?: (e: React.MouseEvent) => void;
  /** Click handler (complete connection) */
  onClick?: (e: React.MouseEvent) => void;
  /** Mouse enter handler */
  onMouseEnter?: () => void;
  /** Mouse leave handler */
  onMouseLeave?: () => void;
  /** Additional class names */
  className?: string;
  /** Show label next to port */
  showLabel?: boolean;
}

export function Port({
  port,
  isHovered = false,
  isCompatible = false,
  isConnected = false,
  isConnecting = false,
  onMouseDown,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
  showLabel = false,
}: PortProps) {
  // Get primary data type for color
  const primaryType = Array.isArray(port.type) ? port.type[0] : port.type;
  const color = DATA_TYPE_COLORS[primaryType];

  // Port size based on state
  const baseSize = 12;
  const hoverSize = 16;
  const size = isHovered || isConnecting ? hoverSize : baseSize;

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        port.side === 'input' ? 'flex-row' : 'flex-row-reverse',
        className
      )}
    >
      {/* Port Circle */}
      <button
        type="button"
        className={cn(
          'relative rounded-full border-2 transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'cursor-pointer',
          isHovered && 'scale-110',
          isCompatible && 'scale-125 animate-pulse',
          !isCompatible && isConnecting && 'opacity-30 cursor-not-allowed'
        )}
        style={{
          width: size,
          height: size,
          backgroundColor: isConnected ? color : 'transparent',
          borderColor: color,
        }}
        onMouseDown={onMouseDown}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        title={`${port.name} (${port.side === 'input' ? 'Input' : 'Output'}): ${primaryType}${port.required ? ' - Required' : ''}`}
      >
        {/* Inner dot when not connected */}
        {!isConnected && (
          <div
            className="absolute inset-0 m-auto rounded-full transition-all"
            style={{
              width: size / 3,
              height: size / 3,
              backgroundColor: color,
              opacity: isHovered ? 1 : 0.5,
            }}
          />
        )}

        {/* Glow effect when compatible */}
        {isCompatible && (
          <div
            className="absolute inset-0 rounded-full blur-sm"
            style={{
              backgroundColor: color,
              opacity: 0.6,
              transform: 'scale(1.5)',
            }}
          />
        )}
      </button>

      {/* Label */}
      {showLabel && (
        <span
          className={cn(
            'text-xs font-medium transition-opacity',
            isHovered ? 'opacity-100' : 'opacity-70',
            port.side === 'input' ? 'text-left' : 'text-right'
          )}
        >
          {port.name}
          {port.required && <span className="text-destructive ml-0.5">*</span>}
        </span>
      )}
    </div>
  );
}

Port.displayName = 'Port';
