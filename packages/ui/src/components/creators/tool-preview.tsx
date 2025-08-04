// HIVE Tool Preview - Atomic Design: Template
// Real-time tool preview with responsive testing

"use client";

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Monitor, 
  Tablet, 
  Smartphone, 
  RotateCcw, 
  RefreshCw,
  ExternalLink,
  Share2,
  Settings,
  Play,
  Pause
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { HiveCard, HiveCardContent } from '../hive-card';
import { HiveMotionWrapper } from '../hive-motion-wrapper';
import type { ToolPreviewProps, Tool, ElementInstance, Element } from './types';

// Device viewport configurations
const DEVICE_VIEWPORTS = {
  desktop: {
    width: 1200,
    height: 800,
    name: 'Desktop',
    icon: Monitor
  },
  tablet: {
    width: 768,
    height: 1024,
    name: 'Tablet',
    icon: Tablet
  },
  mobile: {
    width: 375,
    height: 667,
    name: 'Mobile',
    icon: Smartphone
  }
} as const;

// Element runtime renderer
interface ElementRendererProps {
  instance: ElementInstance;
  element?: Element;
  isPreview?: boolean;
}

const ElementRenderer: React.FC<ElementRendererProps> = ({ 
  instance, 
  element,
  isPreview = true 
}) => {
  if (!element) {
    return (
      <div className="w-full h-12 bg-red-100 border border-red-300 rounded flex items-center justify-center text-red-600 text-sm">
        Element not found: {instance.elementId}
      </div>
    );
  }

  const IconComponent = element.icon;

  // Render based on element type - simplified for preview
  const renderElementContent = () => {
    switch (element.id) {
      case 'text':
        return (
          <div 
            className="text-[var(--hive-text-primary)]"
            style={{
              fontSize: instance.config.fontSize || '16px',
              color: instance.config.color || 'var(--hive-text-primary)',
              fontWeight: instance.config.fontWeight || 'normal',
              textAlign: instance.config.textAlign || 'left'
            }}
          >
            {instance.config.content || 'Sample text'}
          </div>
        );

      case 'button':
        return (
          <HiveButton
            variant={instance.config.variant || 'default'}
            size={instance.config.size || 'default'}
            disabled={instance.config.disabled || false}
            className="w-full"
          >
            {instance.config.label || 'Button'}
          </HiveButton>
        );

      case 'input':
        return (
          <div className="space-y-1">
            {instance.config.label && (
              <label className="text-sm font-medium text-[var(--hive-text-primary)]">
                {instance.config.label}
                {instance.config.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            <input
              type={instance.config.type || 'text'}
              placeholder={instance.config.placeholder || 'Enter text...'}
              disabled={instance.config.disabled || false}
              className="w-full px-3 py-2 border border-[var(--hive-border-default)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] focus:ring-2 focus:ring-[var(--hive-color-gold-primary)] focus:border-transparent"
            />
          </div>
        );

      case 'image':
        return (
          <div 
            className="bg-[var(--hive-background-secondary)] border-2 border-dashed border-[var(--hive-border-default)] rounded-lg flex items-center justify-center"
            style={{
              width: instance.config.width || '200px',
              height: instance.config.height || '150px',
              borderRadius: instance.config.borderRadius || '0px'
            }}
          >
            {instance.config.src ? (
              <img
                src={instance.config.src}
                alt={instance.config.alt || 'Image'}
                className="max-w-full max-h-full object-contain rounded"
              />
            ) : (
              <div className="text-center text-[var(--hive-text-tertiary)]">
                <IconComponent size={24} className="mx-auto mb-2" />
                <span className="text-xs">No image selected</span>
              </div>
            )}
          </div>
        );

      case 'container':
        return (
          <div 
            className="border border-[var(--hive-border-default)] rounded-lg"
            style={{
              backgroundColor: instance.config.backgroundColor || 'transparent',
              borderRadius: instance.config.borderRadius || '0px',
              border: instance.config.border || '1px solid var(--hive-border-default)',
              padding: instance.config.padding || '16px'
            }}
          >
            {instance.config.title && (
              <h3 className="font-medium text-[var(--hive-text-primary)] mb-2">
                {instance.config.title}
              </h3>
            )}
            <div className="min-h-[60px] bg-[var(--hive-background-secondary)] rounded border-2 border-dashed border-[var(--hive-border-default)] flex items-center justify-center text-[var(--hive-text-tertiary)] text-sm">
              Container content area
            </div>
          </div>
        );

      case 'poll':
        return (
          <div className="space-y-3">
            <h3 className="font-medium text-[var(--hive-text-primary)]">
              {instance.config.question || 'What do you think?'}
            </h3>
            <div className="space-y-2">
              {(instance.config.options || ['Option 1', 'Option 2']).map((option: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type={instance.config.allowMultiple ? 'checkbox' : 'radio'}
                    name={`poll-${instance.id}`}
                    id={`poll-${instance.id}-${index}`}
                    className="w-4 h-4"
                  />
                  <label 
                    htmlFor={`poll-${instance.id}-${index}`}
                    className="text-sm text-[var(--hive-text-primary)] cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {instance.config.showResults && (
              <div className="text-xs text-[var(--hive-text-secondary)] pt-2 border-t border-[var(--hive-border-default)]">
                Results will appear here after voting
              </div>
            )}
          </div>
        );

      case 'calendar':
        return (
          <div className="border border-[var(--hive-border-default)] rounded-lg p-4 bg-[var(--hive-background-secondary)]">
            <div className="text-center">
              <IconComponent size={32} className="mx-auto mb-2 text-[var(--hive-text-secondary)]" />
              <div className="text-sm font-medium text-[var(--hive-text-primary)]">Calendar Widget</div>
              <div className="text-xs text-[var(--hive-text-tertiary)] mt-1">
                Interactive calendar will render here
              </div>
            </div>
          </div>
        );

      case 'chart':
        return (
          <div className="border border-[var(--hive-border-default)] rounded-lg p-4 bg-[var(--hive-background-secondary)]">
            <div className="text-center">
              <IconComponent size={32} className="mx-auto mb-2 text-[var(--hive-text-secondary)]" />
              <div className="text-sm font-medium text-[var(--hive-text-primary)]">
                {instance.config.title || 'Chart'}
              </div>
              <div className="text-xs text-[var(--hive-text-tertiary)] mt-1">
                {instance.config.type || 'bar'} chart will render here
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="border border-[var(--hive-border-default)] rounded-lg p-4 bg-[var(--hive-background-secondary)] text-center">
            <IconComponent size={24} className="mx-auto mb-2 text-[var(--hive-text-secondary)]" />
            <div className="text-sm font-medium text-[var(--hive-text-primary)]">
              {element.name}
            </div>
            <div className="text-xs text-[var(--hive-text-tertiary)] mt-1">
              {element.description}
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "transition-all duration-200",
        !instance.isVisible && "opacity-50"
      )}
      style={{
        position: 'absolute',
        left: instance.position.x,
        top: instance.position.y,
        width: instance.size.width === 'auto' ? 'auto' : instance.size.width,
        height: instance.size.height === 'auto' ? 'auto' : instance.size.height,
        zIndex: instance.zIndex,
        padding: instance.style.padding ? 
          `${instance.style.padding.top}px ${instance.style.padding.right}px ${instance.style.padding.bottom}px ${instance.style.padding.left}px` : 
          undefined,
        margin: instance.style.margin ? 
          `${instance.style.margin.top}px ${instance.style.margin.right}px ${instance.style.margin.bottom}px ${instance.style.margin.left}px` : 
          undefined,
        backgroundColor: instance.style.backgroundColor,
        borderRadius: instance.style.borderRadius,
        opacity: instance.style.opacity,
        transform: instance.style.transform,
        boxShadow: instance.style.boxShadow
      }}
    >
      {renderElementContent()}
    </div>
  );
};

// Main Tool Preview component
export const ToolPreview: React.FC<ToolPreviewProps> = ({
  tool,
  mode = 'desktop',
  onClose
}) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [isRotated, setIsRotated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const viewport = DEVICE_VIEWPORTS[currentMode];
  const actualWidth = isRotated && currentMode !== 'desktop' ? viewport.height : viewport.width;
  const actualHeight = isRotated && currentMode !== 'desktop' ? viewport.width : viewport.height;

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'r' && e.metaKey) {
        e.preventDefault();
        handleRefresh();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <HiveMotionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="w-full h-full max-w-7xl max-h-[90vh] bg-[var(--hive-background-primary)] rounded-xl border border-[var(--hive-border-default)] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--hive-color-gold-primary)] rounded-lg flex items-center justify-center">
                  <Play size={16} className="text-[var(--hive-background-primary)]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                    {tool.name} - Preview
                  </h2>
                  <p className="text-sm text-[var(--hive-text-secondary)]">
                    {tool.elements.length} elements • {currentMode} view
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Device mode selector */}
                <div className="flex gap-1 p-1 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-default)]">
                  {Object.entries(DEVICE_VIEWPORTS).map(([key, device]) => {
                    const IconComponent = device.icon;
                    return (
                      <HiveButton
                        key={key}
                        variant={currentMode === key ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => {
                          setCurrentMode(key as keyof typeof DEVICE_VIEWPORTS);
                          setIsRotated(false);
                        }}
                        className="px-3"
                      >
                        <IconComponent size={16} />
                        <span className="hidden sm:inline ml-1">{device.name}</span>
                      </HiveButton>
                    );
                  })}
                </div>

                {/* Controls */}
                {currentMode !== 'desktop' && (
                  <HiveButton
                    variant="outline"
                    size="sm"
                    onClick={() => setIsRotated(!isRotated)}
                  >
                    <RotateCcw size={16} />
                  </HiveButton>
                )}

                <HiveButton
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  <RefreshCw size={16} className={cn(isLoading && "animate-spin")} />
                </HiveButton>

                <HiveButton
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                >
                  <X size={16} />
                </HiveButton>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 flex items-center justify-center p-8 bg-[var(--hive-background-tertiary)]">
            <div className="relative">
              {/* Device Frame */}
              <div
                className={cn(
                  "bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] shadow-xl transition-all duration-300",
                  currentMode === 'desktop' ? "rounded-lg" : "rounded-2xl",
                  currentMode === 'mobile' && "border-8 border-gray-800"
                )}
                style={{
                  width: actualWidth,
                  height: actualHeight,
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              >
                {/* Mobile notch/status bar */}
                {currentMode === 'mobile' && !isRotated && (
                  <div className="h-6 bg-gray-800 rounded-t-xl flex items-center justify-center">
                    <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                )}

                {/* Tool Content */}
                <div 
                  className="relative w-full h-full overflow-auto bg-[var(--hive-background-primary)] rounded-lg"
                  style={{ 
                    height: currentMode === 'mobile' && !isRotated ? 'calc(100% - 24px)' : '100%'
                  }}
                >
                  {/* Loading overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-color-gold-primary)] mx-auto mb-2"></div>
                        <p className="text-sm text-[var(--hive-text-secondary)]">Loading preview...</p>
                      </div>
                    </div>
                  )}

                  {/* Render tool elements */}
                  {tool.elements.length > 0 ? (
                    tool.elements.map((instance) => (
                      <ElementRenderer
                        key={instance.id}
                        instance={instance}
                        isPreview={true}
                      />
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-[var(--hive-background-secondary)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Play size={24} className="text-[var(--hive-text-tertiary)]" />
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                          Empty Tool
                        </h3>
                        <p className="text-[var(--hive-text-secondary)]">
                          Add elements to see them in preview
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Device info */}
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <HiveBadge variant="tool-tag" className="text-xs">
                  {actualWidth} × {actualHeight}px
                  {isRotated && " (rotated)"}
                </HiveBadge>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] rounded-b-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-[var(--hive-text-secondary)]">
                  Preview Mode • Press <kbd className="px-1.5 py-0.5 bg-[var(--hive-background-tertiary)] rounded text-xs">ESC</kbd> to close
                </div>
              </div>

              <div className="flex gap-2">
                <HiveButton variant="outline" size="sm">
                  <Share2 size={16} />
                  Share Preview
                </HiveButton>
                <HiveButton variant="outline" size="sm">
                  <ExternalLink size={16} />
                  Open in New Tab
                </HiveButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HiveMotionWrapper>
  );
};

export default ToolPreview;