"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Code, 
  Eye, 
  Settings, 
  Copy,
  Download,
  Save,
  Share,
  Maximize,
  Minimize,
  Palette,
  Sliders,
  Type,
  Hash,
  ToggleLeft,
  ToggleRight,
  Upload,
  Zap
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ElementDefinition, ElementProp } from './element-browser';

interface InteractivePlaygroundProps {
  element: ElementDefinition;
  onSave?: (configuration: ElementConfiguration) => void;
  onClose?: () => void;
  className?: string;
}

interface ElementConfiguration {
  elementId: string;
  props: Record<string, any>;
  metadata: {
    name: string;
    description: string;
    tags: string[];
  };
}

const PropertyEditor = ({ 
  prop, 
  value, 
  onChange 
}: { 
  prop: ElementProp; 
  value: any; 
  onChange: (value: any) => void;
}) => {
  const renderInput = () => {
    switch (prop.type) {
      case 'string':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={prop.defaultValue || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            min={prop.validation?.min}
            max={prop.validation?.max}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        );

      case 'boolean':
        return (
          <button
            onClick={() => onChange(!value)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
              value 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-gray-100 text-gray-600 border border-gray-200"
            )}
          >
            {value ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            {value ? 'Enabled' : 'Disabled'}
          </button>
        );

      case 'select':
        return (
          <select
            value={value || prop.defaultValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            {prop.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'color':
        return (
          <div className="flex gap-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
            />
            <input
              type="text"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        );

      case 'array':
        return (
          <div className="space-y-2">
            <textarea
              value={Array.isArray(value) ? value.join('\n') : ''}
              onChange={(e) => onChange(e.target.value.split('\n').filter(line => line.trim()))}
              placeholder="One item per line"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <p className="text-xs text-gray-500">Enter one item per line</p>
          </div>
        );

      case 'file':
        return (
          <div className="space-y-2">
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // In a real implementation, you'd upload the file and get a URL
                  onChange(`uploaded_file_${file.name}`);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            {value && (
              <p className="text-sm text-gray-600">Current: {value}</p>
            )}
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={JSON.stringify(value) || ''}
            onChange={(e) => {
              try {
                onChange(JSON.parse(e.target.value));
              } catch {
                onChange(e.target.value);
              }
            }}
            placeholder="JSON value"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        );
    }
  };

  const getIcon = () => {
    switch (prop.type) {
      case 'string': return Type;
      case 'number': return Hash;
      case 'boolean': return value ? ToggleRight : ToggleLeft;
      case 'select': return Settings;
      case 'color': return Palette;
      case 'file': return Upload;
      default: return Sliders;
    }
  };

  const Icon = getIcon();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Icon className="w-4 h-4 text-gray-400" />
          {prop.label}
          {prop.required && <span className="text-red-500">*</span>}
        </label>
        {prop.type !== 'boolean' && (
          <HiveButton
            size="sm"
            variant="ghost"
            onClick={() => onChange(prop.defaultValue)}
            className="text-xs"
          >
            Reset
          </HiveButton>
        )}
      </div>
      
      {renderInput()}
      
      {prop.description && (
        <p className="text-xs text-gray-500">{prop.description}</p>
      )}
    </div>
  );
};

const CodeViewer = ({ 
  element, 
  props 
}: { 
  element: ElementDefinition; 
  props: Record<string, any>;
}) => {
  const generatedCode = useMemo(() => {
    const propsString = Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `  ${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return value ? `  ${key}` : '';
        } else {
          return `  ${key}={${JSON.stringify(value)}}`;
        }
      })
      .filter(Boolean)
      .join('\n');

    return `<${element.name}${propsString ? '\n' + propsString + '\n' : ''}/>`;
  }, [element, props]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    // Show toast notification in real implementation
    alert('Code copied to clipboard!');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Generated Code</h3>
        <HiveButton size="sm" variant="outline" onClick={handleCopy}>
          <Copy className="w-3 h-3 mr-1" />
          Copy
        </HiveButton>
      </div>
      
      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
          <code>{generatedCode}</code>
        </pre>
      </div>
    </div>
  );
};

export function InteractivePlayground({ 
  element, 
  onSave, 
  onClose, 
  className 
}: InteractivePlaygroundProps) {
  const [currentProps, setCurrentProps] = useState<Record<string, any>>(element.defaultProps);
  const [activeTab, setActiveTab] = useState<'properties' | 'code' | 'examples'>('properties');
  const [isMaximized, setIsMaximized] = useState(false);
  const [configName, setConfigName] = useState(`${element.name} Configuration`);
  const [configDescription, setConfigDescription] = useState('');

  const updateProp = useCallback((propName: string, value: any) => {
    setCurrentProps(prev => ({
      ...prev,
      [propName]: value
    }));
  }, []);

  const resetProps = useCallback(() => {
    setCurrentProps(element.defaultProps);
  }, [element.defaultProps]);

  const handleSave = useCallback(() => {
    const configuration: ElementConfiguration = {
      elementId: element.id,
      props: currentProps,
      metadata: {
        name: configName,
        description: configDescription,
        tags: element.tags
      }
    };
    
    onSave?.(configuration);
  }, [element.id, element.tags, currentProps, configName, configDescription, onSave]);

  const handleExportCode = useCallback(() => {
    const code = `<${element.name} ${Object.entries(currentProps)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return value ? key : '';
        } else {
          return `${key}={${JSON.stringify(value)}}`;
        }
      })
      .filter(Boolean)
      .join(' ')} />`;
    
    // In a real implementation, this would trigger a download
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  }, [element.name, currentProps]);

  const PreviewComponent = element.previewComponent;

  return (
    <div className={cn(
      "bg-white border border-gray-200 rounded-lg shadow-lg",
      isMaximized ? "fixed inset-4 z-50" : "max-w-6xl mx-auto",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
            <element.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{element.name}</h2>
            <p className="text-sm text-gray-600">Interactive Playground</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <HiveButton
            size="sm"
            variant="outline"
            onClick={() => setIsMaximized(!isMaximized)}
          >
            {isMaximized ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </HiveButton>
          
          <HiveButton size="sm" variant="outline" onClick={handleExportCode}>
            <Code className="w-4 h-4 mr-1" />
            Export
          </HiveButton>
          
          {onSave && (
            <HiveButton size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              Save Config
            </HiveButton>
          )}
          
          {onClose && (
            <HiveButton size="sm" variant="outline" onClick={onClose}>
              ✕
            </HiveButton>
          )}
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Left Panel - Controls */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'properties', label: 'Properties', icon: Settings },
              { id: 'code', label: 'Code', icon: Code },
              { id: 'examples', label: 'Examples', icon: Eye }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-amber-50 text-amber-700 border-b-2 border-amber-500"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'properties' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Element Properties</h3>
                  <HiveButton size="sm" variant="outline" onClick={resetProps}>
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Reset
                  </HiveButton>
                </div>
                
                <div className="space-y-4">
                  {element.props.map((prop) => (
                    <PropertyEditor
                      key={prop.name}
                      prop={prop}
                      value={currentProps[prop.name]}
                      onChange={(value) => updateProp(prop.name, value)}
                    />
                  ))}
                </div>

                {/* Save Configuration */}
                {onSave && (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <h4 className="font-medium text-gray-900">Save Configuration</h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={configName}
                        onChange={(e) => setConfigName(e.target.value)}
                        placeholder="Configuration name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                      <textarea
                        value={configDescription}
                        onChange={(e) => setConfigDescription(e.target.value)}
                        placeholder="Description (optional)"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'code' && (
              <CodeViewer element={element} props={currentProps} />
            )}

            {activeTab === 'examples' && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Usage Examples</h3>
                
                {element.examples && element.examples.length > 0 ? (
                  <div className="space-y-3">
                    {element.examples.map((example) => (
                      <HiveCard key={example.id} className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">{example.title}</h4>
                            <p className="text-xs text-gray-600">{example.description}</p>
                          </div>
                          <HiveButton
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentProps({ ...element.defaultProps, ...example.props })}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Try
                          </HiveButton>
                        </div>
                        
                        {example.code && (
                          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                            <code>{example.code}</code>
                          </pre>
                        )}
                      </HiveCard>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No examples available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 flex flex-col">
          {/* Preview Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Live Preview</span>
            </div>
            
            <div className="flex items-center gap-2">
              <HiveBadge variant="outline" className="text-xs">
                v{element.version}
              </HiveBadge>
              {element.isVerified && (
                <HiveBadge className="bg-green-100 text-green-800 border-green-200 text-xs">
                  Verified
                </HiveBadge>
              )}
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 p-8 flex items-center justify-center bg-white">
            <div className="w-full max-w-md">
              <PreviewComponent {...currentProps} />
            </div>
          </div>

          {/* Preview Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <span>Properties: {Object.keys(currentProps).length}</span>
                <span>Modified: {JSON.stringify(currentProps) !== JSON.stringify(element.defaultProps) ? 'Yes' : 'No'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <HiveButton size="sm" variant="outline">
                  <Share className="w-3 h-3 mr-1" />
                  Share
                </HiveButton>
                <HiveButton size="sm" variant="outline">
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </HiveButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractivePlayground;