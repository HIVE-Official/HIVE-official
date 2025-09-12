// Simple logger utility for development
const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log('[HIVE]', ...args);
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
      console.info('[HIVE INFO]', ...args);
    }
  },
  
  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug('[HIVE DEBUG]', ...args);
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