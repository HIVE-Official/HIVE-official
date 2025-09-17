"use client";

import React from 'react';
import { Grid3x3 } from 'lucide-react';
import { ElementRendererProps } from '../types';

export function GridRenderer({
  element,
  elementDef,
  isBuilder,
  renderElement
}: ElementRendererProps) {
  const config = element.config;
  const children = config.children || [];
  const columns = config.columns || 2;
  const gap = config.gap || 'medium';
  const responsive = config.responsive !== false;
  
  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <Grid3x3 className="h-3 w-3" />
          Grid Layout
        </div>
        <div className="font-medium">{columns} columns</div>
        <div className="text-xs text-gray-500">{children.length} elements</div>
      </div>
    );
  }
  
  const gapClasses = {
    none: 'gap-0',
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-6'
  };
  
  // Build responsive grid classes
  let gridClasses = '';
  if (responsive) {
    // Mobile first responsive design
    gridClasses = columns === 1 
      ? 'grid grid-cols-1'
      : columns === 2
      ? 'grid grid-cols-1 md:grid-cols-2'
      : columns === 3
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      : columns === 4
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      : `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`;
  } else {
    gridClasses = `grid grid-cols-${columns}`;
  }
  
  return (
    <div className={`${gridClasses} ${gapClasses[gap as keyof typeof gapClasses] || gapClasses.medium}`}>
      {children.length === 0 ? (
        <div className="col-span-full text-sm text-gray-500 italic text-center py-4">
          Empty grid
        </div>
      ) : renderElement ? (
        children.map((childElement: any, index: number) => (
          <div 
            key={childElement.instanceId}
            className={childElement.config?.span ? `col-span-${childElement.config.span}` : ''}
          >
            {renderElement(childElement)}
          </div>
        ))
      ) : (
        <div className="col-span-full text-sm text-gray-500">Grid elements</div>
      )}
    </div>
  );
}