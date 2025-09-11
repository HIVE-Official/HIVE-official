"use client";

import React, { useState } from 'react';
import { ComposedElement, Element } from '@hive/core/domain/tools';
import { Input, Button, Switch, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hive/ui';
import { 
  Settings2, 
  Type, 
  Hash, 
  Calendar,
  ToggleLeft,
  List,
  FileText,
  Image,
  Link2,
  Palette,
  Layout,
  Code,
  Eye,
  EyeOff,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PropertyPanelProps {
  element: ComposedElement;
  elementDef: Element;
  onUpdate: (config: any) => void;
  onDelete?: () => void;
  className?: string;
}

interface PropertySection {
  title: string;
  icon: React.ReactNode;
  properties: PropertyField[];
}

interface PropertyField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'color' | 'array' | 'json';
  options?: { value: string; label: string }[];
  placeholder?: string;
  description?: string;
  defaultValue?: any;
}

export function PropertyPanel({
  element,
  elementDef,
  onUpdate,
  onDelete,
  className = ''
}: PropertyPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['basic']));
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({});
  
  // Define property sections based on element type
  const getPropertySections = (): PropertySection[] => {
    const sections: PropertySection[] = [];
    
    // Basic properties (all elements)
    sections.push({
      title: 'Basic',
      icon: <Settings2 className="h-4 w-4" />,
      properties: [
        {
          key: 'label',
          label: 'Label',
          type: 'text',
          placeholder: 'Element label'
        },
        {
          key: 'description',
          label: 'Description',
          type: 'text',
          placeholder: 'Help text or description'
        },
        {
          key: 'visible',
          label: 'Visible',
          type: 'boolean',
          defaultValue: true
        },
        {
          key: 'disabled',
          label: 'Disabled',
          type: 'boolean',
          defaultValue: false
        }
      ]
    });
    
    // Type-specific properties
    switch (elementDef.type) {
      case 'text-input':
        sections.push({
          title: 'Input Settings',
          icon: <Type className="h-4 w-4" />,
          properties: [
            {
              key: 'placeholder',
              label: 'Placeholder',
              type: 'text'
            },
            {
              key: 'defaultValue',
              label: 'Default Value',
              type: 'text'
            },
            {
              key: 'required',
              label: 'Required',
              type: 'boolean'
            },
            {
              key: 'maxLength',
              label: 'Max Length',
              type: 'number'
            },
            {
              key: 'pattern',
              label: 'Validation Pattern',
              type: 'text',
              placeholder: '^[A-Za-z]+$'
            }
          ]
        });
        break;
        
      case 'number-input':
        sections.push({
          title: 'Number Settings',
          icon: <Hash className="h-4 w-4" />,
          properties: [
            {
              key: 'min',
              label: 'Minimum',
              type: 'number'
            },
            {
              key: 'max',
              label: 'Maximum',
              type: 'number'
            },
            {
              key: 'step',
              label: 'Step',
              type: 'number',
              defaultValue: 1
            },
            {
              key: 'defaultValue',
              label: 'Default Value',
              type: 'number'
            },
            {
              key: 'required',
              label: 'Required',
              type: 'boolean'
            }
          ]
        });
        break;
        
      case 'dropdown':
        sections.push({
          title: 'Dropdown Settings',
          icon: <List className="h-4 w-4" />,
          properties: [
            {
              key: 'options',
              label: 'Options',
              type: 'array',
              description: 'Add dropdown options'
            },
            {
              key: 'defaultValue',
              label: 'Default Selection',
              type: 'text'
            },
            {
              key: 'multiple',
              label: 'Multiple Selection',
              type: 'boolean'
            },
            {
              key: 'searchable',
              label: 'Searchable',
              type: 'boolean'
            }
          ]
        });
        break;
        
      case 'button':
        sections.push({
          title: 'Button Settings',
          icon: <ToggleLeft className="h-4 w-4" />,
          properties: [
            {
              key: 'text',
              label: 'Button Text',
              type: 'text',
              placeholder: 'Click me'
            },
            {
              key: 'variant',
              label: 'Variant',
              type: 'select',
              options: [
                { value: 'default', label: 'Default' },
                { value: 'primary', label: 'Primary' },
                { value: 'secondary', label: 'Secondary' },
                { value: 'outline', label: 'Outline' },
                { value: 'ghost', label: 'Ghost' },
                { value: 'destructive', label: 'Destructive' }
              ]
            },
            {
              key: 'size',
              label: 'Size',
              type: 'select',
              options: [
                { value: 'sm', label: 'Small' },
                { value: 'default', label: 'Default' },
                { value: 'lg', label: 'Large' }
              ]
            },
            {
              key: 'action',
              label: 'Action Type',
              type: 'select',
              options: [
                { value: 'submit', label: 'Submit' },
                { value: 'reset', label: 'Reset' },
                { value: 'custom', label: 'Custom' }
              ]
            }
          ]
        });
        break;
        
      case 'container':
      case 'grid':
        sections.push({
          title: 'Layout Settings',
          icon: <Layout className="h-4 w-4" />,
          properties: [
            {
              key: 'layout',
              label: 'Layout Type',
              type: 'select',
              options: [
                { value: 'vertical', label: 'Vertical' },
                { value: 'horizontal', label: 'Horizontal' },
                { value: 'wrap', label: 'Wrap' }
              ]
            },
            {
              key: 'padding',
              label: 'Padding',
              type: 'select',
              options: [
                { value: 'none', label: 'None' },
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
              ]
            },
            {
              key: 'gap',
              label: 'Gap',
              type: 'select',
              options: [
                { value: 'none', label: 'None' },
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' }
              ]
            },
            {
              key: 'background',
              label: 'Background',
              type: 'color'
            },
            {
              key: 'border',
              label: 'Show Border',
              type: 'boolean'
            }
          ]
        });
        break;
    }
    
    // Styling properties (all elements)
    sections.push({
      title: 'Styling',
      icon: <Palette className="h-4 w-4" />,
      properties: [
        {
          key: 'className',
          label: 'CSS Classes',
          type: 'text',
          placeholder: 'Additional Tailwind classes'
        },
        {
          key: 'style',
          label: 'Custom Styles',
          type: 'json',
          placeholder: '{"color": "red", "fontSize": "16px"}'
        }
      ]
    });
    
    // Advanced properties
    sections.push({
      title: 'Advanced',
      icon: <Code className="h-4 w-4" />,
      properties: [
        {
          key: 'dataBinding',
          label: 'Data Binding',
          type: 'text',
          placeholder: '{{variable}}'
        },
        {
          key: 'condition',
          label: 'Show Condition',
          type: 'text',
          placeholder: 'age > 18'
        },
        {
          key: 'validation',
          label: 'Validation Rules',
          type: 'json',
          placeholder: '{"required": true, "min": 0}'
        }
      ]
    });
    
    return sections;
  };
  
  // Toggle section expansion
  const toggleSection = (title: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };
  
  // Handle property change
  const handlePropertyChange = (key: string, value: any) => {
    onUpdate({
      ...element.config,
      [key]: value
    });
  };
  
  // Handle array property (for dropdown options, etc.)
  const handleArrayProperty = (key: string, action: 'add' | 'remove', index?: number, value?: any) => {
    const currentArray = element.config[key] || [];
    let newArray;
    
    if (action === 'add') {
      newArray = [...currentArray, value || { value: '', label: '' }];
    } else if (action === 'remove' && index !== undefined) {
      newArray = currentArray.filter((_: any, i: number) => i !== index);
    } else {
      newArray = currentArray;
    }
    
    handlePropertyChange(key, newArray);
  };
  
  // Handle JSON property
  const handleJsonProperty = (key: string, value: string) => {
    try {
      const parsed = JSON.parse(value);
      handlePropertyChange(key, parsed);
      setJsonErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    } catch (error) {
      setJsonErrors(prev => ({
        ...prev,
        [key]: 'Invalid JSON format'
      }));
    }
  };
  
  // Render property field
  const renderPropertyField = (field: PropertyField) => {
    const value = element.config[field.key] ?? field.defaultValue;
    
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e: any) => handlePropertyChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );
        
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e: any) => handlePropertyChange(field.key, e.target.value ? Number(e.target.value) : undefined)}
            placeholder={field.placeholder}
          />
        );
        
      case 'boolean':
        return (
          <Switch
            checked={value || false}
            onCheckedChange={(checked: any) => handlePropertyChange(field.key, checked)}
          />
        );
        
      case 'select':
        return (
          <Select value={value || ''} onValueChange={(v: any) => handlePropertyChange(field.key, v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'color':
        return (
          <div className="flex gap-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e: any) => handlePropertyChange(field.key, e.target.value)}
              className="w-10 h-10 rounded border cursor-pointer"
            />
            <Input
              value={value || ''}
              onChange={(e: any) => handlePropertyChange(field.key, e.target.value)}
              placeholder="#000000"
            />
          </div>
        );
        
      case 'array':
        return (
          <div className="space-y-2">
            {(value || []).map((item: any, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item.label || ''}
                  onChange={(e: any) => {
                    const newArray = [...(value || [])];
                    newArray[index] = { ...item, label: e.target.value };
                    handlePropertyChange(field.key, newArray);
                  }}
                  placeholder="Label"
                />
                <Input
                  value={item.value || ''}
                  onChange={(e: any) => {
                    const newArray = [...(value || [])];
                    newArray[index] = { ...item, value: e.target.value };
                    handlePropertyChange(field.key, newArray);
                  }}
                  placeholder="Value"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleArrayProperty(field.key, 'remove', index)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleArrayProperty(field.key, 'add')}
              className="w-full"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Option
            </Button>
          </div>
        );
        
      case 'json':
        return (
          <div>
            <textarea
              value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value || ''}
              onChange={(e: any) => handleJsonProperty(field.key, e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 font-mono text-xs"
              rows={3}
              placeholder={field.placeholder}
            />
            {jsonErrors[field.key] && (
              <p className="text-red-500 text-xs mt-1">{jsonErrors[field.key]}</p>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const sections = getPropertySections();
  
  return (
    <div className={`property-panel space-y-4 ${className}`}>
      {/* Element Header */}
      <div className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{elementDef.name}</h3>
            <p className="text-xs text-gray-500 mt-1">ID: {element.instanceId.slice(0, 8)}</p>
          </div>
          {onDelete && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="text-red-500 hover:text-red-600"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
      
      {/* Property Sections */}
      {sections.map(section => (
        <div key={section.title} className="border rounded-lg">
          <button
            onClick={() => toggleSection(section.title)}
            className="w-full px-3 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              {section.icon}
              <span className="font-medium text-sm">{section.title}</span>
            </div>
            {expandedSections.has(section.title) ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.has(section.title) && (
            <div className="p-3 space-y-3 border-t">
              {section.properties.map(field => (
                <div key={field.key}>
                  <label className="text-sm font-medium mb-1 block">
                    {field.label}
                  </label>
                  {field.description && (
                    <p className="text-xs text-gray-500 mb-1">{field.description}</p>
                  )}
                  {renderPropertyField(field)}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}