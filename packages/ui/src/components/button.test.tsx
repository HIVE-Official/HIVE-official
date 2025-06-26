import { describe, it, expect } from 'vitest';
import { buttonVariants } from './button';

describe('buttonVariants', () => {
  it('returns classes for variant and size', () => {
    const cls = buttonVariants({ variant: 'primary', size: 'lg' });
    expect(cls).toContain('bg-primary');
    expect(cls).toContain('h-11');
  });
});
