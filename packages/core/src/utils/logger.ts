// @ts-check

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") {
       
      console.warn(`[INFO] ${message}`, ...args);
    }
  },

  error: (message: string, error?: Error | unknown) => {
    // Always log errors
     
    console.error(`[ERROR] ${message}`, error);
    // TODO: Add proper error reporting service integration here
  },

  warn: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") {
       
      console.warn(`[WARN] ${message}`, ...args);
    }
  },

  debug: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === "development") {
       
      console.warn(`[DEBUG] ${message}`, ...args);
    }
  },
};
