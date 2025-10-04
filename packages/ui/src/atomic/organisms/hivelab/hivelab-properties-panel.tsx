/**
 * HiveLab Properties Panel
 *
 * Floating panel for configuring selected element properties.
 * Shows element info, configuration fields, port connections, and actions.
 */

'use client';

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/button';
import { Badge } from '../../atoms/badge';
import { Separator } from '../../atoms/separator';
import { FloatingPanel } from '../../molecules/panels/floating-panel';
import { PropertyField, type PropertyFieldType } from '../../molecules/panels/property-field';
import { DataMappingRow } from '../../molecules/panels/data-mapping-row';
import type { Element, Port } from '../../../types/hivelab.types';
import { Settings, Trash2, Copy, ExternalLink } from 'lucide-react';

export interface HiveLabPropertiesPanelProps {
  /** Selected element (null if nothing selected) */
  selectedElement: Element | null;
  /** All elements (for connection mapping) */
  allElements?: Element[];
  /** Property change handler */
  onPropertyChange?: (property: string, value: any) => void;
  /** Delete element handler */
  onDeleteElement?: () => void;
  /** Duplicate element handler */
  onDuplicateElement?: () => void;
  /** Panel position */
  position?: 'left' | 'right';
  /** Panel width */
  width?: number;
  /** Is panel collapsed? */
  isCollapsed?: boolean;
  /** Collapse handler */
  onToggleCollapse?: () => void;
  /** Close handler */
  onClose?: () => void;
  /** Additional class names */
  className?: string;
}

/**
 * Get element category label
 */
function getCategoryLabel(type: Element['type']): string {
  const labels: Record<Element['type'], string> = {
    trigger: 'Trigger',
    collector: 'Collector',
    transformer: 'Transformer',
    router: 'Router',
    storage: 'Storage',
    display: 'Display',
    action: 'Action',
    connector: 'Connector',
  };
  return labels[type];
}

/**
 * Get element category color
 */
function getCategoryColor(type: Element['type']): string {
  const colors: Record<Element['type'], string> = {
    trigger: 'text-red-500',
    collector: 'text-blue-500',
    transformer: 'text-purple-500',
    router: 'text-orange-500',
    storage: 'text-green-500',
    display: 'text-cyan-500',
    action: 'text-pink-500',
    connector: 'text-yellow-500',
  };
  return colors[type];
}

export function HiveLabPropertiesPanel({
  selectedElement,
  allElements = [],
  onPropertyChange,
  onDeleteElement,
  onDuplicateElement,
  position = 'right',
  width = 320,
  isCollapsed = false,
  onToggleCollapse,
  onClose,
  className,
}: HiveLabPropertiesPanelProps) {
  // Empty state when no element selected
  if (!selectedElement) {
    return (
      <FloatingPanel
        title="Properties"
        icon={<Settings className="h-4 w-4" />}
        position={position}
        width={width}
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
        onClose={onClose}
        className={className}
      >
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div>
            <div className="text-4xl mb-3">⚙️</div>
            <p className="text-sm font-medium mb-1">No Element Selected</p>
            <p className="text-xs text-white/70">
              Click an element on the canvas to configure its properties
            </p>
          </div>
        </div>
      </FloatingPanel>
    );
  }

  // Find connected elements for data mapping display
  const getConnectedElement = (portId: string, portSide: 'input' | 'output'): string | null => {
    // In a real implementation, this would look up connections
    // For now, return null (no connections shown)
    return null;
  };

  return (
    <FloatingPanel
      title="Properties"
      icon={<Settings className="h-4 w-4" />}
      position={position}
      width={width}
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
      onClose={onClose}
      className={className}
    >
      {/* Element Header */}
      <div className="px-3 py-3 border-b space-y-3">
        {/* Element Info */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2 min-w-0 flex-1">
            <span className="text-xl shrink-0">{selectedElement.icon}</span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold truncate">{selectedElement.name}</h3>
              <p className={cn('text-xs font-medium', getCategoryColor(selectedElement.type))}>
                {getCategoryLabel(selectedElement.type)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={onDuplicateElement}
              title="Duplicate element"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-red-500 hover:text-red-500"
              onClick={onDeleteElement}
              title="Delete element"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Description */}
        {selectedElement.description && (
          <p className="text-xs text-white/70 line-clamp-2">
            {selectedElement.description}
          </p>
        )}

        {/* Element Metadata */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedElement.complexity && (
            <Badge variant="sophomore" className="h-5 px-1.5 text-xs">
              {selectedElement.complexity}
            </Badge>
          )}
          {selectedElement.isNew && (
            <Badge variant="freshman" className="h-5 px-1.5 text-xs">
              NEW
            </Badge>
          )}
          <Badge variant="freshman" className="h-5 px-1.5 text-xs">
            {selectedElement.inputs.length} ⬅️ | ➡️ {selectedElement.outputs.length}
          </Badge>
        </div>
      </div>

      {/* Properties Form */}
      <div className="flex-1 overflow-y-auto">
        {/* Basic Properties */}
        <div className="px-3 py-3 space-y-3 border-b">
          <h4 className="text-xs font-semibold">Basic Properties</h4>

          <PropertyField
            label="Name"
            type="text"
            value={selectedElement.name}
            onChange={(value) => onPropertyChange?.('name', value)}
            placeholder="Element name"
          />

          <PropertyField
            label="Description"
            type="textarea"
            value={selectedElement.description}
            onChange={(value) => onPropertyChange?.('description', value)}
            placeholder="Describe what this element does"
          />
        </div>

        {/* Input Connections */}
        {selectedElement.inputs.length > 0 && (
          <div className="px-3 py-3 space-y-3 border-b">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold">Input Connections</h4>
              <Badge variant="sophomore" className="h-5 px-1.5 text-xs">
                {selectedElement.inputs.length}
              </Badge>
            </div>

            <div className="space-y-2">
              {selectedElement.inputs.map((input) => (
                <DataMappingRow
                  key={input.id}
                  port={input}
                  sourceElementName={getConnectedElement(input.id, 'input')}
                />
              ))}
            </div>
          </div>
        )}

        {/* Output Connections */}
        {selectedElement.outputs.length > 0 && (
          <div className="px-3 py-3 space-y-3 border-b">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold">Output Connections</h4>
              <Badge variant="sophomore" className="h-5 px-1.5 text-xs">
                {selectedElement.outputs.length}
              </Badge>
            </div>

            <div className="space-y-2">
              {selectedElement.outputs.map((output) => (
                <DataMappingRow
                  key={output.id}
                  port={output}
                  sourceElementName={getConnectedElement(output.id, 'output')}
                />
              ))}
            </div>
          </div>
        )}

        {/* Element Configuration */}
        <div className="px-3 py-3 space-y-3 border-b">
          <h4 className="text-xs font-semibold">Configuration</h4>

          {/* Render config fields based on element type */}
          {Object.keys(selectedElement.config).length > 0 ? (
            Object.entries(selectedElement.config).map(([key, value]) => {
              // Infer field type from value
              let fieldType: PropertyFieldType = 'text';
              if (typeof value === 'boolean') fieldType = 'boolean';
              else if (typeof value === 'number') fieldType = 'number';

              return (
                <PropertyField
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  type={fieldType}
                  value={value}
                  onChange={(newValue) => {
                    onPropertyChange?.('config', {
                      ...selectedElement.config,
                      [key]: newValue,
                    });
                  }}
                />
              );
            })
          ) : (
            <p className="text-xs text-white/70">
              No configuration options available
            </p>
          )}
        </div>

        {/* Advanced Settings */}
        <div className="px-3 py-3 space-y-3">
          <h4 className="text-xs font-semibold">Advanced</h4>

          <PropertyField
            label="Element ID"
            type="text"
            value={selectedElement.id}
            onChange={() => {}} // Read-only
            disabled
            help="Unique identifier for this element"
          />

          <PropertyField
            label="Page ID"
            type="text"
            value={selectedElement.pageId}
            onChange={() => {}} // Read-only
            disabled
            help="The page this element belongs to"
          />

          <div className="grid grid-cols-2 gap-2">
            <PropertyField
              label="Width"
              type="number"
              value={selectedElement.width}
              onChange={(value) => onPropertyChange?.('width', value)}
            />
            <PropertyField
              label="Height"
              type="number"
              value={selectedElement.height}
              onChange={(value) => onPropertyChange?.('height', value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <PropertyField
              label="X Position"
              type="number"
              value={selectedElement.x}
              onChange={(value) => onPropertyChange?.('x', value)}
            />
            <PropertyField
              label="Y Position"
              type="number"
              value={selectedElement.y}
              onChange={(value) => onPropertyChange?.('y', value)}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t bg-white/5">
        <p className="text-[10px] text-white/70 text-center">
          💾 Changes are saved automatically
        </p>
      </div>
    </FloatingPanel>
  );
}

HiveLabPropertiesPanel.displayName = 'HiveLabPropertiesPanel';
