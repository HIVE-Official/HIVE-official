'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings,
  Type,
  Hash,
  ToggleLeft,
  Calendar,
  Upload,
  Search,
  ChevronDown,
  ChevronRight,
  X,
  Save,
  Trash2,
  Copy,
  Link,
  Eye,
  EyeOff,
  Lock,
  Unlock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ElementProperty {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'color' | 'json';
  value: any;
  options?: { label: string; value: any }[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
}

interface ElementConfig {
  id: string;
  type: string;
  name: string;
  category: string;
  properties: ElementProperty[];
  permissions?: {
    canEdit: boolean;
    canDelete: boolean;
    canDuplicate: boolean;
  };
  connections?: {
    inputs: string[];
    outputs: string[];
  };
}

interface PropertyPanelProps {
  element: ElementConfig | null;
  onUpdate: (elementId: string, updates: Partial<ElementConfig>) => void;
  onDelete: (elementId: string) => void;
  onDuplicate: (elementId: string) => void;
  className?: string;
}

export function PropertyPanel({ 
  element, 
  onUpdate, 
  onDelete, 
  onDuplicate,
  className 
}: PropertyPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['properties', 'connections'])
  );
  const [localProperties, setLocalProperties] = useState<ElementProperty[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (element) {
      setLocalProperties(element.properties);
      setHasChanges(false);
    }
  }, [element]);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handlePropertyChange = (key: string, value: any) => {
    const updatedProperties = localProperties.map(prop =>
      prop.key === key ? { ...prop, value } : prop
    );
    setLocalProperties(updatedProperties);
    setHasChanges(true);
  };

  const handleSave = () => {
    if (!element || !hasChanges) return;
    
    onUpdate(element.id, { properties: localProperties });
    setHasChanges(false);
  };

  const handleReset = () => {
    if (!element) return;
    setLocalProperties(element.properties);
    setHasChanges(false);
  };

  const renderPropertyInput = (property: ElementProperty) => {
    switch (property.type) {
      case 'text':
        return (
          <input
            type="text"
            value={property.value || ''}
            onChange={(e) => handlePropertyChange(property.key, e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
            placeholder={property.label}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={property.value || 0}
            onChange={(e) => handlePropertyChange(property.key, Number(e.target.value))}
            min={property.validation?.min}
            max={property.validation?.max}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
            placeholder={property.label}
          />
        );
      
      case 'boolean':
        return (
          <button
            onClick={() => handlePropertyChange(property.key, !property.value)}
            className={cn(
              "relative w-12 h-6 rounded-full transition-colors",
              property.value ? "bg-[var(--hive-brand-primary)]" : "bg-gray-700"
            )}
          >
            <motion.div
              animate={{ x: property.value ? 24 : 0 }}
              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
            />
          </button>
        );
      
      case 'select':
        return (
          <select
            value={property.value || ''}
            onChange={(e) => handlePropertyChange(property.key, e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-gray-700"
          >
            <option value="">Select {property.label}</option>
            {property.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'color':
        return (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={property.value || '#000000'}
              onChange={(e) => handlePropertyChange(property.key, e.target.value)}
              className="w-8 h-8 bg-gray-900 border border-gray-800 rounded cursor-pointer"
            />
            <input
              type="text"
              value={property.value || '#000000'}
              onChange={(e) => handlePropertyChange(property.key, e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
              placeholder="#000000"
            />
          </div>
        );
      
      case 'json':
        return (
          <textarea
            value={typeof property.value === 'object' ? JSON.stringify(property.value, null, 2) : property.value}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                handlePropertyChange(property.key, parsed);
              } catch {
                handlePropertyChange(property.key, e.target.value);
              }
            }}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 font-mono"
            rows={4}
            placeholder="{}"
          />
        );
      
      default:
        return null;
    }
  };

  if (!element) {
    return (
      <div className={cn("bg-gray-950 flex flex-col h-full", className)}>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-400 mb-2">No Element Selected</h3>
            <p className="text-sm text-gray-500">
              Select an element to view and edit its properties
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-gray-950 flex flex-col h-full", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-400">Properties</h3>
          <button
            onClick={() => onUpdate(element.id, { properties: [] })}
            className="p-1 text-gray-500 hover:text-gray-400 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {/* Element Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              element.category === 'input' && "bg-blue-500",
              element.category === 'display' && "bg-green-500",
              element.category === 'action' && "bg-purple-500",
              element.category === 'logic' && "bg-orange-500",
              element.category === 'data' && "bg-teal-500"
            )} />
            <span className="text-sm font-medium text-white">{element.name}</span>
          </div>
          <p className="text-xs text-gray-500">Type: {element.type}</p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => onDuplicate(element.id)}
            className="flex-1 px-2 py-1 bg-gray-900 rounded text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-all flex items-center justify-center gap-1"
          >
            <Copy className="h-3 w-3" />
            Duplicate
          </button>
          <button
            onClick={() => onDelete(element.id)}
            className="flex-1 px-2 py-1 bg-gray-900 rounded text-xs text-gray-400 hover:text-red-500 hover:bg-gray-800 transition-all flex items-center justify-center gap-1"
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </button>
        </div>
      </div>

      {/* Properties Sections */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Properties Section */}
        <div className="space-y-2">
          <button
            onClick={() => toggleSection('properties')}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <span className="text-sm font-medium text-gray-300">Properties</span>
            {expandedSections.has('properties') ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.has('properties') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 overflow-hidden"
              >
                {localProperties.map(property => (
                  <div key={property.key} className="space-y-1">
                    <label className="text-xs text-gray-400 flex items-center justify-between">
                      {property.label}
                      {property.validation?.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {renderPropertyInput(property)}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Connections Section */}
        {element.connections && (
          <div className="space-y-2">
            <button
              onClick={() => toggleSection('connections')}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <span className="text-sm font-medium text-gray-300">Connections</span>
              {expandedSections.has('connections') ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>

            <AnimatePresence>
              {expandedSections.has('connections') && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 overflow-hidden"
                >
                  {/* Inputs */}
                  {element.connections.inputs.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Inputs</p>
                      <div className="space-y-1">
                        {element.connections.inputs.map(input => (
                          <div key={input} className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                            <Link className="h-3 w-3 text-blue-400" />
                            <span className="text-xs text-gray-300">{input}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Outputs */}
                  {element.connections.outputs.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Outputs</p>
                      <div className="space-y-1">
                        {element.connections.outputs.map(output => (
                          <div key={output} className="flex items-center gap-2 p-2 bg-gray-900 rounded">
                            <Link className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-gray-300">{output}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Permissions Section */}
        {element.permissions && (
          <div className="space-y-2">
            <button
              onClick={() => toggleSection('permissions')}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <span className="text-sm font-medium text-gray-300">Permissions</span>
              {expandedSections.has('permissions') ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>

            <AnimatePresence>
              {expandedSections.has('permissions') && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-2 bg-gray-900 rounded">
                    <span className="text-xs text-gray-400">Can Edit</span>
                    {element.permissions.canEdit ? (
                      <Unlock className="h-3 w-3 text-green-400" />
                    ) : (
                      <Lock className="h-3 w-3 text-red-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-900 rounded">
                    <span className="text-xs text-gray-400">Can Delete</span>
                    {element.permissions.canDelete ? (
                      <Unlock className="h-3 w-3 text-green-400" />
                    ) : (
                      <Lock className="h-3 w-3 text-red-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-900 rounded">
                    <span className="text-xs text-gray-400">Can Duplicate</span>
                    {element.permissions.canDuplicate ? (
                      <Unlock className="h-3 w-3 text-green-400" />
                    ) : (
                      <Lock className="h-3 w-3 text-red-400" />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {hasChanges && (
        <div className="p-4 border-t border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex-1 px-3 py-2 bg-gray-800 text-gray-400 rounded-lg text-sm hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-2 bg-[var(--hive-brand-primary)] text-white rounded-lg text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}