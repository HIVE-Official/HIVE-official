/**
 * Property Field Component
 *
 * Single configuration field in the properties panel.
 * Supports multiple field types: text, number, boolean, select, etc.
 */

'use client';

import React from 'react';
import { cn } from '../../../lib/utils';
import { Input } from '../../atoms/input';
import { Label } from '../../atoms/label';
import { Textarea } from '../../atoms/textarea';
import { Switch } from '../../atoms/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../atoms/select';
import { HelpCircle } from 'lucide-react';

export type PropertyFieldType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'select'
  | 'textarea'
  | 'color'
  | 'date';

export interface PropertyFieldProps {
  /** Field label */
  label: string;
  /** Field type */
  type: PropertyFieldType;
  /** Current value */
  value: any;
  /** Change handler */
  onChange: (value: any) => void;
  /** Is this field required? */
  required?: boolean;
  /** Help text */
  helpText?: string;
  /** Help text (alias for helpText) */
  help?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Options (for select type) */
  options?: Array<{ value: string; label: string }>;
  /** Min value (for number type) */
  min?: number;
  /** Max value (for number type) */
  max?: number;
  /** Is field disabled? */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

export function PropertyField({
  label,
  type,
  value,
  onChange,
  required = false,
  helpText: propHelpText,
  help,
  placeholder,
  options = [],
  min,
  max,
  disabled = false,
  className,
}: PropertyFieldProps) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const helpText = propHelpText ?? help;

  const renderField = () => {
    switch (type) {
      case 'text':
        return (
          <Input
            id={id}
            type="text"
            value={value || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
          />
        );

      case 'number':
        return (
          <Input
            id={id}
            type="number"
            value={value ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange((e.target as HTMLInputElement).valueAsNumber)}
            placeholder={placeholder}
            min={min}
            max={max}
            disabled={disabled}
            required={required}
          />
        );

      case 'boolean':
        return (
          <div className="flex items-center gap-2">
            <Switch
              id={id}
              checked={value || false}
              onCheckedChange={onChange}
              disabled={disabled}
            />
            <Label htmlFor={id} className="text-sm cursor-pointer">
              {value ? 'Enabled' : 'Disabled'}
            </Label>
          </div>
        );

      case 'select':
        return (
          <Select value={value} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger id={id}>
              <SelectValue placeholder={placeholder || 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'textarea':
        return (
          <Textarea
            id={id}
            value={value || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={4}
          />
        );

      case 'color':
        return (
          <div className="flex items-center gap-2">
            <input
              id={id}
              type="color"
              value={value || '#000000'}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
              disabled={disabled}
              className="h-9 w-16 rounded border cursor-pointer"
            />
            <Input
              type="text"
              value={value || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
              placeholder="#000000"
              disabled={disabled}
              className="flex-1"
            />
          </div>
        );

      case 'date':
        return (
          <Input
            id={id}
            type="date"
            value={value || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
            disabled={disabled}
            required={required}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn('property-field space-y-2', className)}>
      {/* Label */}
      {type !== 'boolean' && (
        <div className="flex items-center gap-2">
          <Label htmlFor={id} className="text-sm font-medium">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>

          {helpText && (
            <div className="group relative">
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
              <div className="absolute left-0 top-6 hidden group-hover:block z-10 w-64 p-2 bg-popover border rounded-md shadow-md text-xs">
                {helpText}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Field */}
      {renderField()}

      {/* Help text (for boolean, shown below) */}
      {type === 'boolean' && helpText && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}

PropertyField.displayName = 'PropertyField';
