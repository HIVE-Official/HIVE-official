// Console wrapper to prevent console.log in production
const isDevelopment = process.env.NODE_ENV === 'development';

export const safeConsole = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  error: (...args: any[]) => {
    // Always log errors
    console.error(...args);
  },
  
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
  
  table: (...args: any[]) => {
    if (isDevelopment) {
      console.table(...args);
    }
  },
  
  time: (label?: string) => {
    if (isDevelopment) {
      console.time(label);
    }
  },
  
  timeEnd: (label?: string) => {
    if (isDevelopment) {
      console.timeEnd(label);
    }
  }
};

// Replace global console in production
if (!isDevelopment && typeof window !== 'undefined') {
  window.console.log = () => {};
  window.console.warn = () => {};
  window.console.info = () => {};
  window.console.debug = () => {};
  window.console.table = () => {};
}