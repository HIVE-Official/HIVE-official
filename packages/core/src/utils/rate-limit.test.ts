import { describe, it, expect } from 'vitest';
import { checkRateLimit } from './rate-limit';

describe('checkRateLimit', () => {
  it('allows requests under the limit', () => {
    const res = checkRateLimit('user1', { maxRequests: 2, windowMs: 1000 });
    expect(res.success).toBe(true);
  });

  it('blocks after exceeding limit', () => {
    checkRateLimit('user2', { maxRequests: 1, windowMs: 1000 });
    const res = checkRateLimit('user2', { maxRequests: 1, windowMs: 1000 });
    expect(res.success).toBe(false);
  });
});
