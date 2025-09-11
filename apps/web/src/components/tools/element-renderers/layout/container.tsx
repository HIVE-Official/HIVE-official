"use client";

import React from 'react';
import { Box } from 'lucide-react';
import { ElementRendererProps } from '../types';

export function ContainerRenderer({
  element,
  elementDef,
  isBuilder,
  renderElement
}: ElementRendererProps) {
  const config = element.config;
  const children = config.children || [];
  const layout = config.layout || 'vertical';
  const padding = config.padding || 'medium';
  const background = config.background;
  const border = config.border;
  const rounded = config.rounded || 'medium';
  
  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <Box className="h-3 w-3" />
          Container
        </div>
        <div className="font-medium">{children.length} elements</div>
        <div className="text-xs text-gray-500">{layout} layout</div>
      </div>
    );
  }
  
  const paddingClasses = {
    none: '',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6'
  };
  
  const roundedClasses = {
    none: '',
    small: 'rounded',
    medium: 'rounded-lg',
    large: 'rounded-xl'
  };
  
  const layoutClasses = {
    vertical: 'flex flex-col space-y-3',
    horizontal: 'flex flex-row space-x-3',
    wrap: 'flex flex-wrap gap-3'
  };
  
  const containerStyles: React.CSSProperties = {};
  if (background) {
    containerStyles.backgroundColor = background;
  }
  
  const borderClasses = border ? 'border' : '';
  
  return (
    <div 
      className={`
        ${paddingClasses[padding as keyof typeof paddingClasses] || paddingClasses.medium}
        ${roundedClasses[rounded as keyof typeof roundedClasses] || roundedClasses.medium}
        ${borderClasses}
        ${config.className || ''}
      `}
      style={containerStyles}
    >
      {config.title && (
        <h3 className="font-semibold text-lg mb-3">{config.title}</h3>
      )}
      
      <div className={layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.vertical}>
        {children.length === 0 ? (
          <div className="text-sm text-gray-500 italic">Empty container</div>
        ) : renderElement ? (
          children.map((childElement: any) => (
            <div key={childElement.instanceId}>
              {renderElement(childElement)}
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">Container elements</div>
        )}
      </div>
    </div>
  );
}