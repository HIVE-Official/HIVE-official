import { Element, ComposedElement } from '@hive/core/domain/tools';

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