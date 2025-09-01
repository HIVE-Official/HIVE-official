// HIVE Element Configuration - Atomic Design: Organism
// Dynamic property editing for tool elements

"use client";

import React, { useState, useCallback } from 'react';
import { 
  Settings, 
  Palette, 
  Layout, 
  Type, 
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Trash2,
  Info,
  ChevronDown,
  ChevronRight,
  Hash,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { HiveInput } from '../hive-input';
import { HiveTextarea } from '../hive-textarea';  
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle } from '../hive-card';
import { HiveSwitch } from '../hive-switch';
import { HiveSelect } from '../hive-select';
import { HiveMotionWrapper } from '../hive-motion-wrapper';
import type { Element, ElementInstance, ElementConfigProps } from './types';

// Property input components based on type
interface PropertyInputProps {
  property: any;
  value: any;
  onChange: (value: any) => void;
  propertyKey: string;
}

const PropertyInput: React.FC<PropertyInputProps> = ({ 
  property, 
  value, 
  onChange, 
  propertyKey 
}) => {
  switch (property.type) {
    case 'string':
      if (property.options) {
        // Dropdown for predefined options
        return (
          <Select
            options={property.options.map(opt => ({ value: opt, label: opt }))}
            value={value || property.default}
            onValueChange={onChange}
            placeholder="Select option..."
          >
            {property.options.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        );
      }
      
      // Text input or textarea for long strings
      if (propertyKey.toLowerCase().includes('description') || 
          propertyKey.toLowerCase().includes('content') ||
          (typeof value === 'string' && value.length > 50)) {
        return (
          <Textarea
            value={value || property.default || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${property.type}...`}
            rows={3}
          />
        );
      }
      
      return (
        <Input
          type="text"
          value={value || property.default || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${property.type}...`}
        />
      );

    case 'number':
      return (
        <Input
          type="number"
          value={value || property.default || 0}
          onChange={(e) => onChange(Number(e.target.value))}
          min={property.min}
          max={property.max}
          placeholder={`Enter ${property.type}...`}
        />
      );

    case 'boolean':
      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={value !== undefined ? value : property.default}
            onCheckedChange={onChange}
          />
          <span className="text-sm text-[var(--hive-text-secondary)]">
            {value !== undefined ? value : property.default ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      );

    case 'array':
      return (
        <div className="space-y-2">
          <Textarea
            value={Array.isArray(value) ? value.join('\n') : ''}
            onChange={(e) => {
              const items = e.target.value.split('\n').filter(item => item.trim());
              onChange(items);
            }}
            placeholder="Enter items, one per line..."
            rows={4}
          />
          <div className="text-xs text-[var(--hive-text-tertiary)]">
            {Array.isArray(value) ? value.length : 0} items
          </div>
        </div>
      );

    default:
      return (
        <Input
          type="text"
          value={JSON.stringify(value) || JSON.stringify(property.default) || ''}
          onChange={(e) => {
            try {
              onChange(JSON.parse(e.target.value));
            } catch {
              onChange(e.target.value);
            }
          }}
          placeholder={`Enter ${property.type}...`}
        />
      );
  }
};

// Property section component
interface PropertySectionProps {
  title: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const PropertySection: React.FC<PropertySectionProps> = ({ 
  title, 
  icon: Icon, 
  children, 
  defaultExpanded = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-[var(--hive-border-default)] rounded-lg overflow-hidden">
      <button
        className="w-full p-3 bg-[var(--hive-background-tertiary)] hover:bg-[var(--hive-interactive-hover)] transition-colors flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-[var(--hive-text-secondary)]" />
          <span className="font-medium text-[var(--hive-text-primary)]">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronDown size={16} className="text-[var(--hive-text-secondary)]" />
        ) : (
          <ChevronRight size={16} className="text-[var(--hive-text-secondary)]" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

// Main Element Configuration component
export const ElementConfig: React.FC<ElementConfigProps> = ({
  element,
  instance,
  onChange
}) => {
  const [activeTab, setActiveTab] = useState<'properties' | 'style' | 'events'>('properties');

  // Handle property changes
  const handlePropertyChange = useCallback((key: string, value: any) => {
    const newConfig = { ...instance.config, [key]: value };
    onChange(newConfig);
  }, [instance.config, onChange]);

  // Handle style changes
  const handleStyleChange = useCallback((key: string, value: any) => {
    // This would be handled by parent component
    console.log('Style change:', key, value);
  }, []);

  const IconComponent = element.icon;

  return (
    <div className="flex flex-col h-full bg-[var(--hive-background-primary)]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--hive-border-default)]">
        <div className="flex items-start gap-3 mb-4">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${element.color}15`, color: element.color }}
          >
            <IconComponent size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] truncate">
              {element.name}
            </h2>
            <p className="text-sm text-[var(--hive-text-secondary)] mt-1">
              {element.description}
            </p>
            <div className="flex gap-1 mt-2">
              <Badge variant="tool-tag" className="text-xs">
                {element.category}
              </Badge>
              <Badge variant="tool-tag" className="text-xs">
                v{element.version}
              </Badge>
            </div>
          </div>
        </div>

        {/* Element Actions */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {/* Handle visibility toggle */}}
            className="flex-1"
          >
            {instance.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
            {instance.isVisible ? 'Visible' : 'Hidden'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {/* Handle lock toggle */}}
            className="flex-1"
          >
            {instance.isLocked ? <Lock size={16} /> : <Unlock size={16} />}
            {instance.isLocked ? 'Locked' : 'Unlocked'}
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-[var(--hive-border-default)]">
        <div className="flex">
          {[
            { id: 'properties', label: 'Properties', icon: Settings },
            { id: 'style', label: 'Style', icon: Palette },
            { id: 'events', label: 'Events', icon: Hash }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={cn(
                "flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2",
                activeTab === id
                  ? "border-[var(--hive-color-gold-primary)] text-[var(--hive-color-gold-primary)] bg-[var(--hive-color-gold-primary)]/5"
                  : "border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]"
              )}
              onClick={() => setActiveTab(id as any)}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'properties' && (
          <div className="p-4 space-y-4">
            {/* Element Name */}
            <PropertySection title="Basic Settings" icon={Settings}>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                    Element Name
                  </label>
                  <Input
                    value={instance.name || element.name}
                    onChange={(e) => {/* Handle name change */}}
                    placeholder="Enter element name..."
                  />
                </div>
              </div>
            </PropertySection>

            {/* Element-specific Properties */}
            {Object.keys(element.schema.config).length > 0 && (
              <PropertySection title="Element Properties" icon={Type}>
                <div className="space-y-4">
                  {Object.entries(element.schema.config).map(([key, property]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        {property.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      <PropertyInput
                        property={property}
                        value={instance.config[key]}
                        onChange={(value) => handlePropertyChange(key, value)}
                        propertyKey={key}
                      />
                      {property.validation && (
                        <div className="mt-1 text-xs text-[var(--hive-text-tertiary)]">
                          {property.validation.min && `Min: ${property.validation.min}`}
                          {property.validation.max && ` Max: ${property.validation.max}`}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </PropertySection>
            )}

            {/* Layout Properties */}
            <PropertySection title="Layout & Position" icon={Layout}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                      X Position
                    </label>
                    <Input
                      type="number"
                      value={instance.position.x}
                      onChange={(e) => {/* Handle position change */}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                      Y Position
                    </label>
                    <Input
                      type="number"
                      value={instance.position.y}
                      onChange={(e) => {/* Handle position change */}}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                      Width
                    </label>
                    <Input
                      value={instance.size.width}
                      onChange={(e) => {/* Handle size change */}}
                      placeholder="auto, 100px, 50%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                      Height
                    </label>
                    <Input
                      value={instance.size.height}
                      onChange={(e) => {/* Handle size change */}}
                      placeholder="auto, 100px, 50%"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                    Z-Index
                  </label>
                  <Input
                    type="number"
                    value={instance.zIndex}
                    onChange={(e) => {/* Handle z-index change */}}
                    min={0}
                  />
                </div>
              </div>
            </PropertySection>
          </div>
        )}

        {activeTab === 'style' && (
          <div className="p-4 space-y-4">
            <PropertySection title="Appearance" icon={Palette}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                    Background Color
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={instance.style.backgroundColor || 'transparent'}
                      onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      className="w-16"
                    />
                    <Input
                      value={instance.style.backgroundColor || 'transparent'}
                      onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      placeholder="transparent, #ff0000, rgb(255,0,0)"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                    Border Radius
                  </label>
                  <Input
                    type="number"
                    value={instance.style.borderRadius || 0}
                    onChange={(e) => handleStyleChange('borderRadius', Number(e.target.value))}
                    min={0}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                    Opacity
                  </label>
                  <Input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={instance.style.opacity || 1}
                    onChange={(e) => handleStyleChange('opacity', Number(e.target.value))}
                  />
                  <div className="text-xs text-[var(--hive-text-tertiary)] mt-1">
                    {Math.round((instance.style.opacity || 1) * 100)}%
                  </div>
                </div>
              </div>
            </PropertySection>

            <PropertySection title="Spacing" icon={Layout}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Padding
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Top"
                      value={instance.style.padding?.top || 0}
                      onChange={(e) => {/* Handle padding change */}}
                    />
                    <Input
                      type="number"
                      placeholder="Right"
                      value={instance.style.padding?.right || 0}
                      onChange={(e) => {/* Handle padding change */}}
                    />
                    <Input
                      type="number"
                      placeholder="Bottom"
                      value={instance.style.padding?.bottom || 0}
                      onChange={(e) => {/* Handle padding change */}}
                    />
                    <Input
                      type="number"
                      placeholder="Left"
                      value={instance.style.padding?.left || 0}
                      onChange={(e) => {/* Handle padding change */}}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Margin
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Top"
                      value={instance.style.margin?.top || 0}
                      onChange={(e) => {/* Handle margin change */}}
                    />
                    <Input
                      type="number"
                      placeholder="Right"
                      value={instance.style.margin?.right || 0}
                      onChange={(e) => {/* Handle margin change */}}
                    />
                    <Input
                      type="number"
                      placeholder="Bottom"
                      value={instance.style.margin?.bottom || 0}
                      onChange={(e) => {/* Handle margin change */}}
                    />
                    <Input
                      type="number"
                      placeholder="Left"
                      value={instance.style.margin?.left || 0}
                      onChange={(e) => {/* Handle margin change */}}
                    />
                  </div>
                </div>
              </div>
            </PropertySection>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="p-4 space-y-4">
            <PropertySection title="Available Events" icon={Hash}>
              <div className="space-y-3">
                {element.schema.events.length > 0 ? (
                  element.schema.events.map((event) => (
                    <div key={event} className="flex items-center justify-between p-3 border border-[var(--hive-border-default)] rounded-lg">
                      <div>
                        <div className="font-medium text-[var(--hive-text-primary)]">
                          {event}
                        </div>
                        <div className="text-sm text-[var(--hive-text-secondary)]">
                          Trigger action when {event.replace('on', '').toLowerCase()} occurs
                        </div>
                      </div>
                      <Button variant="secondary" size="sm">
                        Add Action
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-[var(--hive-text-secondary)]">
                    <Hash size={24} className="mx-auto mb-2 opacity-50" />
                    <p>No events available for this element</p>
                  </div>
                )}
              </div>
            </PropertySection>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1">
            <Copy size={16} />
            Duplicate
          </Button>
          <Button variant="secondary" size="sm" className="flex-1 text-red-600 border-red-600 hover:bg-red-50">
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElementConfig;