"use client";

/**
 * Tool Runtime Execution Engine;
 * 
 * This is the CRITICAL missing piece - the actual runtime where students use tools.
 * Takes a tool definition (composed of elements) and renders a working, interactive tool.
 */

import React, { useState, useCallback, useEffect } from 'react';
import { HiveCard, HiveButton } from '../index';
import { Play, Save, Share, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MobileToolWrapper } from './mobile-tool-wrapper';

// Event Elements (complete 24-element library)
import {
  TextInputElement,
  DatePickerElement,
  LocationElement,
  SelectElement,
  NumberInputElement,
  CheckboxElement,
  RadioElement,
  EventCardElement,
  CounterElement,
  QRCodeElement,
  RSVPElement,
  ConditionalElement,
  FilterElement,
  AttendeeListElement,
  CalendarViewElement,
  NotificationElement,
  AnalyticsChartElement,
  FeedbackFormElement,
  ShareElement,
  RecurrenceElement,
  TagsElement,
  StatusElement,
} from '../events/event-elements';

// Tool Definition Structure;
export interface ToolDefinition {id: string;
  name: string;
  description: string;
  version: string;
  elements: ToolElement[];
  actions: ToolAction[];
  style?: ToolStyle;
  metadata: {
    createdBy: string;
    createdAt: string;
    category: string;
    tags: string[];};
}

export interface ToolElement {id: string;
  type: string;
  label?: string;
  properties: Record<string, any>;
  position: { x: number; y: number};
  size: { width: number; height: number };
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface ToolAction {id: string;
  trigger: string; // element ID that triggers this;
  type: 'save' | 'calculate' | 'submit' | 'redirect' | 'show_message' | 'update_element';
  config: Record<string, any>;}

export interface ToolStyle {primaryColor?: string;
  backgroundColor?: string;
  borderRadius?: string;
  spacing?: 'compact' | 'normal' | 'relaxed';}

// Tool Runtime State;
interface ToolRuntimeState {values: Record<string, any>;
  errors: Record<string, string>;
  loading: boolean;
  lastSaved?: string;
  actions: Record<string, boolean>; // track which actions are running;}

interface ToolRuntimeEngineProps {tool: ToolDefinition;
  userId?: string;
  spaceId?: string;
  mode?: 'preview' | 'production';
  onSave?: (data: Record<string, any>) => Promise<void>;
  onSubmit?: (data: Record<string, any>) => Promise<void>;
  className?: string;}

export function ToolRuntimeEngine({
  tool,
  userId = 'current_user',
  spaceId,
  mode = 'production',
  onSave,
  onSubmit,
  className;
}: ToolRuntimeEngineProps) {
  // Runtime state management;
  const [state, setState] = useState<ToolRuntimeState>({
    values: {},
    errors: {},
    loading: false,
    actions: {},
  });

  // Update element value;
  const updateValue = useCallback((elementId: string, value: any) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [elementId]: value },
      errors: { ...prev.errors, [elementId]: '' }, // Clear error when value changes;
    }));
  }, []);

  // Validate element;
  const validateElement = useCallback((element: ToolElement, value: any): string => {
    const { validation } = element;
    if (!validation) return '';

    if (validation.required && (!value || value === '')) {
      return `${element.label || 'This field'} is required`;
    }

    if (validation.minLength && value && value.length < validation.minLength) {
      return `Minimum length is ${validation.minLength} characters`;
    }

    if (validation.maxLength && value && value.length > validation.maxLength) {
      return `Maximum length is ${validation.maxLength} characters`;
    }

    if (validation.pattern && value) {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(value)) {
        return 'Invalid format';
      }
    }

    return '';
  }, []);

  // Execute tool action;
  const executeAction = useCallback(async (action: ToolAction) => {
    setState(prev => ({ ...prev, actions: { ...prev.actions, [action.id]: true } }));

    try {
      switch (action.type) {
        case 'save':
          if (onSave) {
            await onSave(state.values);
            setState(prev => ({ ...prev, lastSaved: new Date().toISOString() }));
          }
          break;

        case 'submit':
          // Validate all elements first;
          const errors: Record<string, string> = {};
          tool.elements.forEach(element => {
            const error = validateElement(element, state.values[element.id]);
            if (error) errors[element.id] = error;
          })};

          if (Object.keys(errors).length > 0) {
            setState(prev => ({ ...prev, errors }));
            return;
          }

          if (onSubmit) {
            await onSubmit(state.values);
          }
          break;

        case 'show_message':
          alert(action.config.message || 'Action completed!');
          break;

        case 'calculate':
          // Basic calculation example;
          if (action.config.formula && action.config.targetElement) {
            try {
              // Simple calculation - in production this would be more sophisticated;
              const result = eval(action.config.formula.replace(/\{(\w+)\}/g, (match: string, elementId: string) => {
                return state.values[elementId] || 0;
              })});
              updateValue(action.config.targetElement, result);
            } catch (error) {
              console.error('Calculation error:', error);
            }
          }
          break;

        case 'update_element':
          if (action.config.targetElement && action.config.value !== undefined) {
            updateValue(action.config.targetElement, action.config.value);
          }
          break;
      }
    } catch (error) {
      console.error(`Action ${action.type} failed:`, error);
      // Show error to user;
    } finally {
      setState(prev => ({ ...prev, actions: { ...prev.actions, [action.id]: false } }));
    }
  }, [state.values, tool.elements, validateElement, updateValue, onSave, onSubmit]);

  // Render individual element;
  const renderElement = useCallback((element: ToolElement) => {
    const value = state.values[element.id];
    const error = state.errors[element.id];
    const onChange = (newValue: any) => updateValue(element.id, newValue);

    // Find actions triggered by this element;
    const elementActions = tool.actions.filter(action => action.trigger === element.id);

    const commonProps = {
      id: element.id,
      label: element.label,
      value,
      onChange,
      disabled: state.loading,
      className: error ? 'border-red-300 ring-red-500' : undefined,
    };

    let elementComponent;

    switch (element.type) {
      case 'text_input':
        elementComponent = (
          <TextInputElement;
            {...commonProps}
            placeholder={element.properties.placeholder}
            maxLength={element.properties.maxLength}
            required={element.validation?.required}
          />
        );
        break;

      case 'textarea':
        elementComponent = (
          <div className="space-y-2">
            {element.label && (
              <label className="block text-sm font-medium text-gray-900">
                {element.label} {element.validation?.required && <span className="text-red-500">*</span>}
              </label>
            )}
            <textarea;
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={element.properties.placeholder}
              rows={element.properties.rows || 3}
              disabled={state.loading}
              className={cn(
                "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500",
                error && "border-red-300 ring-red-500"
              )}
            />
          </div>
        );
        break;

      case 'date_picker':
        elementComponent = (
          <DatePickerElement;
            {...commonProps}
            includeTime={element.properties.includeTime}
            minDate={element.properties.minDate ? new Date(element.properties.minDate) : undefined}
            maxDate={element.properties.maxDate ? new Date(element.properties.maxDate) : undefined}
            required={element.validation?.required}
          />
        );
        break;

      case 'select':
        elementComponent = (
          <SelectElement;
            {...commonProps}
            options={element.properties.options || []}
            placeholder={element.properties.placeholder}
            required={element.validation?.required}
          />
        );
        break;

      case 'number_input':
        elementComponent = (
          <NumberInputElement;
            {...commonProps}
            min={element.properties.min}
            max={element.properties.max}
            step={element.properties.step}
            placeholder={element.properties.placeholder}
            required={element.validation?.required}
          />
        );
        break;

      case 'checkbox':
        elementComponent = (
          <CheckboxElement;
            {...commonProps}
            description={element.properties.description}
          />
        );
        break;

      case 'radio':
        elementComponent = (
          <RadioElement;
            {...commonProps}
            options={element.properties.options || []}
          />
        );
        break;

      case 'button':
        elementComponent = (
          <HiveButton;
            onClick={() => {
              elementActions.forEach(action => executeAction(action));
            }}
            disabled={state.loading || elementActions.some(a => state.actions[a.id])}
            variant={element.properties.variant || 'default'}
            size={element.properties.size || 'md'}
          >
            {elementActions.some(a => state.actions[a.id]) && (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            )}
            {element.label || 'Button'}
          </HiveButton>
        );
        break;

      case 'display_text':
        elementComponent = (
          <div className="space-y-1">
            {element.label && (
              <label className="block text-sm font-medium text-gray-900">{element.label}</label>
            )}
            <p className={cn(
              "text-gray-700",
              element.properties.size === 'lg' && "text-lg",
              element.properties.size === 'xl' && "text-xl",
              element.properties.weight === 'bold' && "font-bold",
              element.properties.weight === 'semibold' && "font-semibold"
            )}>
              {element.properties.text || 'Display text'}
            </p>
          </div>
        );
        break;

      case 'divider':
        elementComponent = <hr className="border-gray-300 my-4" />;
        break;

      case 'event_card':
        elementComponent = (
          <EventCardElement;
            id={element.id}
            event={element.properties.event || {
              title: 'Sample Event',
              startDate: new Date(),
              category: 'academic',
              status: 'published'
            }}
            showActions={element.properties.showActions}
            onRSVP={element.properties.onRSVP}
            onEdit={element.properties.onEdit}
            className={className}
          />
        );
        break;

      case 'counter':
        elementComponent = (
          <CounterElement;
            id={element.id}
            label={element.label}
            current={element.properties.current || 0}
            total={element.properties.total}
            color={element.properties.color}
            className={className}
          />
        );
        break;

      case 'qr_code':
        elementComponent = (
          <QRCodeElement;
            id={element.id}
            label={element.label}
            data={element.properties.data || 'https://hive.app'}
            size={element.properties.size}
            onScan={element.properties.onScan}
            className={className}
          />
        );
        break;

      case 'rsvp':
        elementComponent = (
          <RSVPElement;
            id={element.id}
            eventId={element.properties.eventId || 'sample-event'}
            currentResponse={value}
            allowGuests={element.properties.allowGuests}
            maxGuests={element.properties.maxGuests}
            onSubmit={(response) => {
              onChange(response);
              elementActions.forEach(action => executeAction(action));
            }}
            className={className}
          />
        );
        break;

      case 'attendee_list':
        elementComponent = (
          <AttendeeListElement;
            id={element.id}
            attendees={element.properties.attendees || []}
            showCheckIn={element.properties.showCheckIn}
            onCheckIn={element.properties.onCheckIn}
            className={className}
          />
        );
        break;

      case 'calendar_view':
        elementComponent = (
          <CalendarViewElement;
            id={element.id}
            events={element.properties.events || []}
            currentDate={value || new Date()}
            onDateChange={onChange}
            onEventClick={element.properties.onEventClick}
            className={className}
          />
        );
        break;

      case 'notification':
        elementComponent = (
          <NotificationElement;
            id={element.id}
            notifications={element.properties.notifications || []}
            onMarkRead={element.properties.onMarkRead}
            onMarkAllRead={element.properties.onMarkAllRead}
            className={className}
          />
        );
        break;

      case 'analytics_chart':
        elementComponent = (
          <AnalyticsChartElement;
            id={element.id}
            data={element.properties.data || []}
            title={element.properties.title}
            type={element.properties.type}
            className={className}
          />
        );
        break;

      case 'feedback_form':
        elementComponent = (
          <FeedbackFormElement;
            id={element.id}
            eventId={element.properties.eventId || 'sample-event'}
            questions={element.properties.questions}
            onSubmit={(feedback) => {
              onChange(feedback);
              elementActions.forEach(action => executeAction(action));
            }}
            className={className}
          />
        );
        break;

      case 'share':
        elementComponent = (
          <ShareElement;
            id={element.id}
            eventId={element.properties.eventId || 'sample-event'}
            eventTitle={element.properties.eventTitle || 'Sample Event'}
            shareUrl={element.properties.shareUrl}
            onShare={element.properties.onShare}
            className={className}
          />
        );
        break;

      case 'recurrence':
        elementComponent = (
          <RecurrenceElement;
            id={element.id}
            recurrence={value || { type: 'none', interval: 1 }}
            onRecurrenceChange={onChange}
            className={className}
          />
        );
        break;

      case 'tags':
        elementComponent = (
          <TagsElement;
            id={element.id}
            tags={value || []}
            availableTags={element.properties.availableTags}
            onTagsChange={onChange}
            maxTags={element.properties.maxTags}
            className={className}
          />
        );
        break;

      case 'status':
        elementComponent = (
          <StatusElement;
            id={element.id}
            status={value || 'draft'}
            statusHistory={element.properties.statusHistory}
            onStatusChange={(status, reason) => {
              onChange({status, reason)};
              elementActions.forEach(action => executeAction(action));
            }}
            className={className}
          />
        );
        break;

      case 'filter':
        elementComponent = (
          <FilterElement;
            id={element.id}
            filters={value || {}}
            onFiltersChange={onChange}
            className={className}
          />
        );
        break;

      default:
        elementComponent = (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Unknown element type: {element.type}
            </p>
          </div>
        );
    }

    return (
      <div key={element.id} className="space-y-2">
        {elementComponent}
        {error && (
          <div className="flex items-center gap-1 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }, [state, tool.actions, updateValue, executeAction]);

  // Auto-save functionality;
  useEffect(() => {
    if (mode === 'production' && Object.keys(state.values).length > 0) {
      const autoSave = setTimeout(() => {
        if (onSave) {
          onSave(state.values).catch(console.error);
        }}
      }, 2000); // Auto-save after 2 seconds of inactivity;
      return () => clearTimeout(autoSave);
    }
  }, [state.values, mode, onSave]);

  const toolContent = (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{tool.name}</h2>
            {tool.description && (
              <p className="text-gray-600 mt-1">{tool.description}</p>
            )}
          </div>
          
          {mode === 'preview' && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <Play className="w-4 h-4" />
                <span>Preview Mode</span>
              </div>
            </div>
          )}
        </div>

        {state.lastSaved && (
          <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
            <CheckCircle className="w-4 h-4" />
            <span>Last saved: {new Date(state.lastSaved).toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {/* Tool Elements */}
      <div className="space-y-6">
        {tool.elements;
          .sort((a, b) => a.position.y - b.position.y) // Sort by vertical position;
          .map(renderElement)}
      </div>

      {/* Global Actions */}
      {tool.actions.filter(action => !action.trigger || action.trigger === 'global').length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex gap-3 flex-wrap">
            {tool.actions;
              .filter(action => !action.trigger || action.trigger === 'global')
              .map(action => (
                <HiveButton;
                  key={action.id}
                  onClick={() => executeAction(action)}
                  disabled={state.loading || state.actions[action.id]}
                  variant={action.type === 'submit' ? 'primary' : 'outline'}
                  className="flex-1 md:flex-none"
                >
                  {state.actions[action.id] && (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {action.config.label || action.type}
                </HiveButton>
              ))}
          </div>
        </div>
      )}

      {/* Runtime Info (only in preview mode) */}
      {mode === 'preview' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">🔧 Runtime Information</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• Tool ID: {tool.id}</p>
            <p>• Elements: {tool.elements.length}</p>
            <p>• Actions: {tool.actions.length}</p>
            <p>• Current Values: {JSON.stringify(state.values, null, 2)}</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <MobileToolWrapper;
      toolName={tool.name}
      showMobileMenu={mode === 'production'}
      className={className}
    >
      {toolContent}
    </MobileToolWrapper>
  );
}

// Helper function to create a simple tool for testing;
export function createSampleTool(): ToolDefinition {
  return {
    id: 'sample-feedback-form',
    name: 'Event Feedback Form',
    description: 'Collect feedback from event attendees',
    version: '1.0.0',
    elements: [
      {
        id: 'event-rating',
        type: 'select',
        label: 'How would you rate this event?',
        properties: {
          options: [
            { value: '5', label: '⭐⭐⭐⭐⭐ Excellent' },
            { value: '4', label: '⭐⭐⭐⭐ Good' },
            { value: '3', label: '⭐⭐⭐ Average' },
            { value: '2', label: '⭐⭐ Poor' },
            { value: '1', label: '⭐ Terrible' },
          ],
          placeholder: 'Select a rating...'
        },
        position: { x: 0, y: 0 },
        size: { width: 100, height: 60 },
        validation: { required: true }
      },
      {
        id: 'feedback-text',
        type: 'textarea',
        label: 'Additional Comments',
        properties: {
          placeholder: 'Tell us what you thought about the event...',
          rows: 4
        },
        position: { x: 0, y: 100 },
        size: { width: 100, height: 120 }
      },
      {
        id: 'recommend',
        type: 'radio',
        label: 'Would you recommend this event to others?',
        properties: {
          options: [
            { value: 'yes', label: 'Yes, definitely' },
            { value: 'maybe', label: 'Maybe' },
            { value: 'no', label: 'No' }
          ]
        },
        position: { x: 0, y: 250 },
        size: { width: 100, height: 80 },
        validation: { required: true }
      },
      {
        id: 'submit-feedback',
        type: 'button',
        label: 'Submit Feedback',
        properties: {
          variant: 'default',
          size: 'md'
        },
        position: { x: 0, y: 350 },
        size: { width: 200, height: 40 }
      }
    ],
    actions: [
      {
        id: 'submit-action',
        trigger: 'submit-feedback',
        type: 'submit',
        config: {
          endpoint: '/api/feedback/submit',
          successMessage: 'Thank you for your feedback!'
        }
      }
    ],
    metadata: {
      createdBy: 'sample-user',
      createdAt: new Date().toISOString(),
      category: 'feedback',
      tags: ['event', 'feedback', 'form']
    }
  };
}

export default ToolRuntimeEngine;