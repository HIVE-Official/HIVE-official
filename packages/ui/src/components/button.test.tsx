import { describe, it, expect } from 'vitest';
import { buttonVariants } from './button';

describe('buttonVariants', () => {
  it('returns classes for variant and size', () => {
    const cls = buttonVariants({ variant: 'accent', size: 'lg' });
    expect(cls).toContain('bg-foreground');
    expect(cls).toContain('h-12');
  });
});
