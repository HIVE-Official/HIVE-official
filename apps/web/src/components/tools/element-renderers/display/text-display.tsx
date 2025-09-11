"use client";

import React from 'react';
import { ElementRendererProps } from '../types';
import { cn } from '@/lib/utils';

export function TextDisplayRenderer({
  element,
  elementDef,
  data,
  isBuilder
}: ElementRendererProps) {
  const config = element.config;
  const displayText = data || config.text || 'Display Text';
  const variant = config.variant || 'body';
  const color = config.color;

  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1">Text Display</div>
        <div className="font-medium truncate">{displayText}</div>
      </div>
    );
  }

  const variantClasses = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-medium',
    body: 'text-base',
    caption: 'text-sm text-gray-600 dark:text-gray-400'
  };

  return (
    <div 
      className={cn(variantClasses[variant as keyof typeof variantClasses] || variantClasses.body)}
      style={{ color }}
    >
      {displayText}
    </div>
  );
}