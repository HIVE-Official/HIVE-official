'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { 
  Settings, 
  Save, 
  X, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  Eye, 
  EyeOff,
  RefreshCw,
  Trash2,
  ExternalLink,
  Copy,
  Zap,
  Shield,
  Globe,
  Users,
  Lock,
  Unlock,
  Play,
  Pause,
  RotateCcw,
  HelpCircle,
  Code,
  Database,
  Key,
  Link as LinkIcon,
  FileText,
  Image as ImageIcon,
  Calendar,
  Clock,
  Hash,
  Type,
  ToggleLeft,
  ToggleRight,
  Sliders,
  ListIcon,
  CheckSquare
} from 'lucide-react';

export type ConfigFieldType = 
  | 'text' 
  | 'password' 
  | 'number' 
  | 'email' 
  | 'url' 
  | 'textarea' 
  | 'boolean' 
  | 'select' 
  | 'multiselect'
  | 'date'
  | 'time'
  | 'color'
  | 'file'
  | 'api_key'
  | 'webhook_url';

export interface ConfigField {
  id: string;
  name: string;
  type: ConfigFieldType;
  required: boolean;
  description?: string;
  placeholder?: string;
  defaultValue?: any;
  options?: Array<{ value: string; label: string; description?: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  sensitive?: boolean; // For passwords, API keys
  group?: string; // For organizing fields
}

export interface ToolConfigurationData {
  toolId: string;
  toolName: string;
  toolIcon: string;
  version: string;
  category: 'productivity' | 'social' | 'academic' | 'coordination';
  description: string;
  
  // Configuration
  fields: ConfigField[];
  currentValues: Record<string, unknown>;
  
  // Permissions
  permissions: {
    canConfigure: boolean;
    canView: boolean;
    canActivate: boolean;
    canRemove: boolean;
  };
  
  // Status
  status: 'active' | 'configured' | 'needs_setup' | 'error' | 'disabled';
  isConfigured: boolean;
  lastConfigured?: string;
  configuredBy?: string;
  
  // Advanced settings
  webhookUrl?: string;
  apiEndpoints?: Array<{ name: string; url: string; method: string }>;
  
  // Documentation
  documentationUrl?: string;
  supportUrl?: string;
}

export interface ToolConfigurationPanelProps {
  tool: ToolConfigurationData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (toolId: string, values: Record<string, unknown>) => Promise<void>;
  onActivate?: (toolId: string) => Promise<void>;
  onDeactivate?: (toolId: string) => Promise<void>;
  onReset?: (toolId: string) => Promise<void>;
  onRemove?: (toolId: string) => Promise<void>;
  onTestConfiguration?: (toolId: string, values: Record<string, unknown>) => Promise<{ success: boolean; message: string }>;
  isSaving?: boolean;
  className?: string;
}

const FIELD_ICONS = {
  text: Type,
  password: Lock,
  number: Hash,
  email: Globe,
  url: LinkIcon,
  textarea: FileText,
  boolean: CheckSquare,
  select: ListIcon,
  multiselect: ListIcon,
  date: Calendar,
  time: Clock,
  color: ImageIcon,
  file: FileText,
  api_key: Key,
  webhook_url: Database,
};

export const ToolConfigurationPanel: React.FC<ToolConfigurationPanelProps> = ({
  tool,
  isOpen,
  onClose,
  onSave,
  onActivate,
  onDeactivate,
  onReset,
  onRemove,
  onTestConfiguration,
  isSaving = false,
  className
}) => {
  const [values, setValues] = useState<Record<string, unknown>>(tool.currentValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSensitive, setShowSensitive] = useState<Record<string, boolean>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTestingConfig, setIsTestingConfig] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'advanced' | 'permissions'>('config');

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleValueChange = (fieldId: string, value: any) => {
    setValues(prev => ({ ...prev, [fieldId]: value }));
    setIsDirty(true);
    
    // Clear field-specific errors
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateField = (field: ConfigField, value: any): string | null => {
    if (field.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return `${field.name} is required`;
    }

    if (field.validation) {
      const { min, max, pattern, message } = field.validation;
      
      if (typeof value === 'string' && pattern) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
          return message || `${field.name} format is invalid`;
        }
      }
      
      if (typeof value === 'number') {
        if (min !== undefined && value < min) {
          return `${field.name} must be at least ${min}`;
        }
        if (max !== undefined && value > max) {
          return `${field.name} must be at most ${max}`;
        }
      }
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    tool.fields.forEach(field => {
      const error = validateField(field, values[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await onSave(tool.toolId, values);
      setIsDirty(false);
    } catch (error) {
      console.error('Failed to save configuration:', error);
    }
  };

  const handleTestConfiguration = async () => {
    if (!onTestConfiguration || !validateForm()) return;

    setIsTestingConfig(true);
    try {
      const result = await onTestConfiguration(tool.toolId, values);
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, message: 'Test failed with an error' });
    } finally {
      setIsTestingConfig(false);
    }
  };

  const handleReset = async () => {
    if (!onReset) return;
    
    try {
      await onReset(tool.toolId);
      setValues(tool.currentValues);
      setIsDirty(false);
      setErrors({});
    } catch (error) {
      console.error('Failed to reset configuration:', error);
    }
  };

  const renderField = (field: ConfigField) => {
    const FieldIcon = FIELD_ICONS[field.type] || Settings;
    const value = values[field.id] ?? field.defaultValue ?? '';
    const error = errors[field.id];
    const isPassword = field.type === 'password' || field.sensitive;
    const showValue = !isPassword || showSensitive[field.id];

    const commonInputProps = {
      id: field.id,
      className: cn(
        'w-full px-4 py-3 rounded-xl border transition-all duration-200',
        'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]',
        'placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0',
        error
          ? 'border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]'
          : 'border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50'
      ),
    };

    return (
      <div key={field.id} className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor={field.id} className="flex items-center gap-2 text-sm font-medium text-[var(--hive-text-primary)]">
            <FieldIcon className="w-4 h-4" />
            <span>{field.name}</span>
            {field.required && <span className="text-[var(--hive-status-error)]">*</span>}
          </label>
          
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowSensitive(prev => ({ ...prev, [field.id]: !prev[field.id] }))}
              className="p-1 rounded text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors duration-200"
            >
              {showValue ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>

        {field.description && (
          <p className="text-xs text-[var(--hive-text-muted)]">{field.description}</p>
        )}

        <div className="relative">
          {field.type === 'textarea' ? (
            <textarea
              {...commonInputProps}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleValueChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className={cn(commonInputProps.className, 'resize-none')}
            />
          ) : field.type === 'boolean' ? (
            <label className="flex items-center gap-3 p-3 rounded-xl border border-[var(--hive-border-primary)]/30 cursor-pointer hover:bg-[var(--hive-brand-primary)]/5 transition-all duration-200">
              <input
                type="checkbox"
                checked={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(field.id, e.target.checked)}
                className="w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20"
              />
              <span className="text-[var(--hive-text-primary)]">{field.placeholder || 'Enabled'}</span>
            </label>
          ) : field.type === 'select' ? (
            <select
              {...commonInputProps}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleValueChange(field.id, e.target.value)}
            >
              <option value="">{field.placeholder || 'Select an option'}</option>
              {field.options?.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'file' ? (
            <div>
              <input
                ref={(el: any) => { fileInputRefs.current[field.id] = el; }}
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleValueChange(field.id, file);
                  }
                }}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRefs.current[field.id]?.click()}
                className={cn(
                  commonInputProps.className,
                  'flex items-center justify-between cursor-pointer'
                )}
              >
                <span className={cn(
                  value instanceof File ? 'text-[var(--hive-text-primary)]' : 'text-[var(--hive-text-muted)]'
                )}>
                  {value instanceof File ? value.name : field.placeholder || 'Choose file'}
                </span>
                <FileText className="w-4 h-4 text-[var(--hive-text-muted)]" />
              </button>
            </div>
          ) : (
            <input
              {...commonInputProps}
              type={isPassword && !showValue ? 'password' : field.type === 'number' ? 'number' : field.type}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(field.id, field.type === 'number' ? Number(e.target.value) : e.target.value)}
              placeholder={field.placeholder}
              min={field.validation?.min}
              max={field.validation?.max}
            />
          )}
        </div>

        {error && (
          <p className="text-xs text-[var(--hive-status-error)] flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
      </div>
    );
  };

  const groupedFields = tool.fields.reduce((groups, field) => {
    const group = field.group || 'General';
    if (!groups[group]) groups[group] = [];
    groups[group].push(field);
    return groups;
  }, {} as Record<string, ConfigField[]>);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl"
        />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={cn(
            'relative w-full max-w-4xl max-h-[90vh] overflow-hidden',
            'bg-gradient-to-br from-[var(--hive-background-secondary)]/95 via-[var(--hive-background-tertiary)]/90 to-[var(--hive-background-interactive)]/95',
            'backdrop-blur-xl border border-[var(--hive-border-primary)]/30',
            'rounded-3xl shadow-2xl',
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--hive-border-primary)]/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30 flex items-center justify-center text-2xl">
                {tool.toolIcon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--hive-text-primary)]">
                  Configure {tool.toolName}
                </h2>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  Version {tool.version} • {tool.category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {tool.documentationUrl && (
                <a
                  href={tool.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Status Banner */}
          {tool.status === 'error' && (
            <div className="px-6 py-3 bg-red-400/10 border-b border-red-400/20">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Tool configuration has errors</span>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex items-center px-6 border-b border-[var(--hive-border-primary)]/20">
            {[
              { id: 'config', label: 'Configuration', icon: Settings },
              { id: 'advanced', label: 'Advanced', icon: Code },
              { id: 'permissions', label: 'Permissions', icon: Shield },
            ].map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'config' | 'advanced' | 'permissions')}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-200',
                  activeTab === tab.id
                    ? 'border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]'
                    : 'border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'config' && (
              <div className="space-y-8">
                {Object.entries(groupedFields).map(([groupName, fields]) => (
                  <div key={groupName}>
                    <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                      {groupName}
                    </h3>
                    <div className="space-y-6">
                      {fields.map(renderField)}
                    </div>
                  </div>
                ))}

                {/* Test Configuration */}
                {onTestConfiguration && (
                  <div className="pt-4 border-t border-[var(--hive-border-primary)]/20">
                    <button
                      onClick={handleTestConfiguration}
                      disabled={isTestingConfig}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-400/10 text-blue-400 border border-blue-400/30 hover:bg-blue-400/20 hover:border-blue-400/50 transition-all duration-300 disabled:opacity-50"
                    >
                      {isTestingConfig ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Zap className="w-4 h-4" />
                      )}
                      <span>Test Configuration</span>
                    </button>

                    {testResult && (
                      <div className={cn(
                        'mt-3 p-3 rounded-xl flex items-center gap-2 text-sm',
                        testResult.success
                          ? 'bg-green-400/10 text-green-400 border border-green-400/30'
                          : 'bg-red-400/10 text-red-400 border border-red-400/30'
                      )}>
                        {testResult.success ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                        <span>{testResult.message}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                    Advanced Settings
                  </h3>
                  
                  {tool.webhookUrl && (
                    <div className="p-4 rounded-2xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20">
                      <h4 className="font-medium text-[var(--hive-text-primary)] mb-2">Webhook URL</h4>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 p-2 rounded-lg bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] text-sm font-mono">
                          {tool.webhookUrl}
                        </code>
                        <button
                          onClick={() => navigator.clipboard.writeText(tool.webhookUrl || '')}
                          className="w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200 flex items-center justify-center"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {tool.apiEndpoints && tool.apiEndpoints.length > 0 && (
                    <div className="p-4 rounded-2xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20">
                      <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">API Endpoints</h4>
                      <div className="space-y-2">
                        {tool.apiEndpoints.map((endpoint, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <span className={cn(
                              'px-2 py-1 rounded text-xs font-mono',
                              endpoint.method === 'GET' && 'bg-green-400/20 text-green-400',
                              endpoint.method === 'POST' && 'bg-blue-400/20 text-blue-400',
                              endpoint.method === 'PUT' && 'bg-orange-400/20 text-orange-400',
                              endpoint.method === 'DELETE' && 'bg-red-400/20 text-red-400'
                            )}>
                              {endpoint.method}
                            </span>
                            <code className="text-sm text-[var(--hive-text-primary)] font-mono">
                              {endpoint.url}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'permissions' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                    Tool Permissions
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(tool.permissions).map(([permission, enabled]) => (
                      <div key={permission} className={cn(
                        'p-4 rounded-2xl border',
                        enabled
                          ? 'bg-green-400/10 border-green-400/30'
                          : 'bg-[var(--hive-background-tertiary)]/40 border-[var(--hive-border-primary)]/20'
                      )}>
                        <div className="flex items-center gap-2 mb-2">
                          {enabled ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <X className="w-4 h-4 text-[var(--hive-text-muted)]" />
                          )}
                          <span className="font-medium text-[var(--hive-text-primary)] capitalize">
                            {permission.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-[var(--hive-border-primary)]/20">
            <div className="flex items-center gap-3">
              {onReset && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-2xl border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-300 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              )}

              {onRemove && (
                <button
                  onClick={() => onRemove(tool.toolId)}
                  className="px-4 py-2.5 rounded-2xl border border-red-400/30 text-red-400 hover:bg-red-400/10 hover:border-red-400/50 transition-all duration-300 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove Tool</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-2xl border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-300 disabled:opacity-50"
              >
                Cancel
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={isSaving || !isDirty}
                className={cn(
                  'px-6 py-2.5 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2',
                  'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40',
                  'hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Configuration</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ToolConfigurationPanel;