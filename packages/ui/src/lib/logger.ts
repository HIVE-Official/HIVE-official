// Simple logger utility for development
const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log('[HIVE]', ...args);
    }
  },
  
  error: (...args: any[]) => {
    console.error('[HIVE ERROR]', ...args);
  },
  
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn('[HIVE WARN]', ...args);
    }
  },
  
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info('[HIVE INFO]', ...args);
    }
  },
  
  debug: (...args: any[]) => {
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