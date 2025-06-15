// Temporary stub for rate limiting utilities
// TODO: Implement proper rate limiting with Redis

export function rateLimit(options: { windowMs: number; max: number }) {
  // Stub implementation - always allows requests for now
  // In production, this would implement proper rate limiting
  return {
    check: () => ({ success: true, remaining: options.max }),
  };
}
