/**
 * Type definitions for mobile-specific features
 */

export interface NetworkInfo {
  effectiveType?: '4g' | '3g' | '2g' | 'slow-2g' | 'unknown';
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

export interface BatteryInfo {
  charging: boolean;
  level: number;
  chargingTime?: number;
  dischargingTime?: number;
}

export interface SwipeData {
  direction: 'left' | 'right' | 'up' | 'down';
  velocity: number;
  distance: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface ScrollData {
  direction: 'up' | 'down';
  offset: number;
  velocity: number;
  isAtTop: boolean;
  isAtBottom: boolean;
}

export interface TestAssertion {
  type: 'visibility' | 'text' | 'value' | 'enabled' | 'selected';
  selector: string;
  expected: string | boolean | number;
  timeout?: number;
}

export interface FormChangeHandlers {
  [key: string]: (value: string | boolean | number | Date) => void;
}

export interface PerformanceExpectation {
  metric: 'fps' | 'loadTime' | 'renderTime' | 'memoryUsage';
  maxValue?: number;
  minValue?: number;
  tolerance?: number;
}