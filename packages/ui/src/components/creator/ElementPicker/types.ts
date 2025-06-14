import type { Element } from '@hive/core';

export interface ElementPickerProps {
  /** Callback when an element is selected */
  onElementSelect: (elementId: string) => void;
  /** Optional CSS class name */
  className?: string;
  /** Whether the picker is in a loading state */
  isLoading?: boolean;
}

export interface ElementCardProps {
  /** The element to display */
  element: Element;
  /** Callback when the element is selected */
  onSelect: (elementId: string) => void;
  /** Whether drag and drop is enabled */
  enableDrag?: boolean;
  /** Optional CSS class name */
  className?: string;
} 