// Re-export rate limiting from core package
export * from "@hive/core/utils/rate-limit";

// TEMP: Simple stub to fix missing import
// TODO: Replace with proper rate limiting implementation

export function rateLimit() {
  return {
    check: async () => ({ success: true }),
    reset: async () => ({ success: true }),
  };
}

export default rateLimit;
