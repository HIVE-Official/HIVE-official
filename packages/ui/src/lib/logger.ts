import { logger as coreLogger } from '@hive/core/utils/logger';

// Simple logger utility for development
const isDevelopment = process.env.NODE_ENV === 'development';

export const uiLogger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
    }
  },
  
  error: (...args: unknown[]) => {
    console.error('[HIVE ERROR]', ...args);
  },
  
  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn('[HIVE WARN]', ...args);
    }
  },
  
  info: (...args: unknown[]) => {
    if (isDevelopment) {
    }
  },
  
  debug: (...args: unknown[]) => {
    if (isDevelopment) {
    }
  },
  
  group: (label: string) => {
    if (isDevelopment) {
      console.group(label);
    }
  },
  
  groupEnd: () => {
    if (isDevelopment) {
      console.groupEnd();
    }
  },
  
  time: (label: string) => {
    if (isDevelopment) {
      console.time(label);
    }
  },
  
  timeEnd: (label: string) => {
    if (isDevelopment) {
      console.timeEnd(label);
    }
  },
};