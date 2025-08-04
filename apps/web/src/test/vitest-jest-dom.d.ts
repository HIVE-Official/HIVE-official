/**
 * Jest DOM Type Extensions for Vitest
 * 
 * This file extends Vitest's expect interface with Jest DOM matchers
 * to fix "toBeInTheDocument" and other Jest DOM matcher type errors.
 */

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace Vi {
    interface JestAssertion<T = unknown> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
  }
}

// Extend Vitest's expect interface
declare module 'vitest' {
  interface Assertion<T = unknown> extends TestingLibraryMatchers<T, void> {
    // Additional Vitest-specific extensions can go here
  }
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<unknown, void> {
    // Additional asymmetric matcher extensions can go here
  }
}