"use client";

import React from 'react';
import { Element, ComposedElement } from '@hive/core/domain/tools';

// Import all element renderers
import { TextInputRenderer } from './input/text-input';
import { NumberInputRenderer } from './input/number-input';
import { DatePickerRenderer } from './input/date-picker';
import { DropdownRenderer } from './input/dropdown';
import { CheckboxRenderer } from './input/checkbox';
import { FileUploadRenderer } from './input/file-upload';

import { TextDisplayRenderer } from './display/text-display';
import { ImageDisplayRenderer } from './display/image-display';
import { ChartDisplayRenderer } from './display/chart-display';
import { TableDisplayRenderer } from './display/table-display';

import { ButtonRenderer } from './action/button';
import { LinkRenderer } from './action/link';
import { TimerRenderer } from './action/timer';

import { ConditionRenderer } from './logic/condition';
import { CalculatorRenderer } from './logic/calculator';

import { ContainerRenderer } from './layout/container';
import { GridRenderer } from './layout/grid';
import { TabsRenderer } from './layout/tabs';

/**
 * Element Renderer Props
 */
export interface ElementRendererProps {
  element: ComposedElement;
  elementDef: Element;
  data?: any;
  onChange?: (instanceId: string, value: any) => void;
  onAction?: (instanceId: string, action: string, payload?: any) => void;
  isPreview?: boolean;
  isBuilder?: boolean;
  context?: any;
  renderElement?: (element: ComposedElement) => JSX.Element;
}

/**
 * Registry of element renderers
 */
const ELEMENT_RENDERERS: Record<string, React.ComponentType<ElementRendererProps>> = {
  // Input elements
  'text-input': TextInputRenderer,
  'number-input': NumberInputRenderer,
  'date-picker': DatePickerRenderer,
  'dropdown': DropdownRenderer,
  'checkbox': CheckboxRenderer,
  'file-upload': FileUploadRenderer,
  
  // Display elements
  'display-text': TextDisplayRenderer,
  'display-image': ImageDisplayRenderer,
  'display-chart': ChartDisplayRenderer,
  'display-table': TableDisplayRenderer,
  
  // Action elements
  'button': ButtonRenderer,
  'link': LinkRenderer,
  'timer': TimerRenderer,
  
  // Logic elements
  'condition': ConditionRenderer,
  'calculation': CalculatorRenderer,
  
  // Layout elements
  'container': ContainerRenderer,
  'grid': GridRenderer,
  'tabs': TabsRenderer,
};

/**
 * Main element renderer component
 */
export function ElementRenderer({
  element,
  elementDef,
  data,
  onChange,
  onAction,
  isPreview = false,
  isBuilder = false,
  context = {}
}: ElementRendererProps) {
  const Renderer = ELEMENT_RENDERERS[elementDef.type];
  
  if (!Renderer) {
    return (
      <div className="p-4 border border-red-500 rounded bg-red-50 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400 text-sm">
          Unknown element type: {elementDef.type}
        </p>
      </div>
    );
  }
  
  return (
    <Renderer
      element={element}
      elementDef={elementDef}
      data={data}
      onChange={onChange}
      onAction={onAction}
      isPreview={isPreview}
      isBuilder={isBuilder}
      context={context}
    />
  );
}

/**
 * Render an element by ID
 */
export function renderElement(
  elementId: string,
  element: ComposedElement,
  elementDef: Element,
  props: Partial<ElementRendererProps> = {}
): JSX.Element {
  return (
    <ElementRenderer
      key={element.instanceId}
      element={element}
      elementDef={elementDef}
      {...props}
    />
  );
}

/**
 * Get element renderer component by type
 */
export function getElementRenderer(type: string): React.ComponentType<ElementRendererProps> | null {
  return ELEMENT_RENDERERS[type] || null;
}

/**
 * Register a custom element renderer
 */
export function registerElementRenderer(
  type: string,
  renderer: React.ComponentType<ElementRendererProps>
) {
  ELEMENT_RENDERERS[type] = renderer;
}