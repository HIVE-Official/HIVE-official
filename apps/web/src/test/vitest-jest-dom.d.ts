/**
 * Jest DOM Type Extensions for Vitest
 * 
 * This file extends Vitest's expect interface with Jest DOM matchers
 * to fix "toBeInTheDocument" and other Jest DOM matcher type errors.
 */

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace Vi {
    interface JestAssertion<T = unknown> extends TestingLibraryMatchers<T, void> {
      // Placeholder to satisfy empty interface rule
      _placeholder?: never;
    }
  }
  
  interface Window {
    analyticsEvents?: unknown[];
    __mockToolElements?: unknown;
    __mockElementError?: unknown;
    __mockSlowRender?: unknown;
  }
}

// Extend Vitest's expect interface
declare module 'vitest' {
  interface Assertion<T = unknown> extends TestingLibraryMatchers<T, void> {
    // Placeholder to satisfy empty interface rule
    _placeholder?: never;
  }
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<unknown, void> {
    // Placeholder to satisfy empty interface rule
    _placeholder?: never;
  }
}