"use client";

import React, { useState } from 'react';
import { Button } from '@hive/ui';
import { Loader2 } from 'lucide-react';
import { ElementRendererProps } from '../types';

export function ButtonRenderer({
  element,
  elementDef,
  onAction,
  isPreview,
  isBuilder
}: ElementRendererProps) {
  const config = element.config;
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isPreview || config.disabled) return;
    
    setIsLoading(true);
    
    if (onAction) {
      await onAction(element.instanceId, 'onClick');
    }
    
    // Simulate async action
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1">Button</div>
        <div className="font-medium">{config.label || 'Button'}</div>
      </div>
    );
  }

  const variant = config.variant || 'primary';
  const variantMap: Record<string, any> = {
    primary: 'default',
    secondary: 'secondary',
    outline: 'outline',
    ghost: 'ghost',
    danger: 'destructive'
  };

  return (
    <Button
      variant={variantMap[variant] || 'default'}
      onClick={handleClick}
      disabled={config.disabled || isLoading || isPreview}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          {config.loadingText || 'Loading...'}
        </>
      ) : (
        config.label || 'Click Me'
      )}
    </Button>
  );
}