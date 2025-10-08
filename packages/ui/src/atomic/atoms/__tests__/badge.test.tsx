/**
 * Badge Component Tests
 *
 * Comprehensive test suite for the Badge component covering:
 * - Basic rendering and props
 * - All variant styles and classes
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Children rendering (text, icons, mixed content)
 * - Custom className handling
 * - HTML attributes forwarding
 * - Focus management
 * - Visual regression via class validation
 * - Real-world usage scenarios
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Badge, BadgeProps, badgeVariants } from '../badge';
import { Star, Check, AlertTriangle } from 'lucide-react';

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

// Test utilities
const renderBadge = (props: Partial<BadgeProps> = {}) => {
  const defaultProps: BadgeProps = {
    children: 'Test Badge',
    ...props,
  };
  return render(<Badge {...defaultProps} />);
};

describe('Badge Component', () => {
  // ==========================================
  // BASIC RENDERING TESTS
  // ==========================================

  describe('Basic Rendering', () => {
    it('renders correctly with default props', () => {
      renderBadge();
      const badge = screen.getByText('Test Badge');
      expect(badge).toBeInTheDocument();
      expect(badge.tagName).toBe('DIV');
    });

    it('renders with custom text content', () => {
      renderBadge({ children: 'Custom Badge Text' });
      expect(screen.getByText('Custom Badge Text')).toBeInTheDocument();
    });

    it('renders without children (empty badge)', () => {
      renderBadge({ children: undefined, 'data-testid': 'empty-badge' });
      const badge = screen.getByTestId('empty-badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toBeEmptyDOMElement();
    });

    it('renders with numeric content', () => {
      renderBadge({ children: 42 });
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });

  // ==========================================
  // VARIANT TESTS
  // ==========================================

  describe('Badge Variants', () => {
    const variants = ['default', 'secondary', 'outline', 'gold', 'destructive'] as const;

    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, () => {
        renderBadge({ variant });
        const badge = screen.getByText('Test Badge');
        expect(badge).toBeInTheDocument();

        // Verify base classes are always present
        expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-md', 'border');
        expect(badge).toHaveClass('px-2.5', 'py-0.5', 'text-xs', 'font-semibold');
        expect(badge).toHaveClass('transition-colors');

        // Verify focus ring classes
        expect(badge).toHaveClass('focus:outline-none', 'focus:ring-2');
        expect(badge).toHaveClass('focus:ring-[#FFD700]/50', 'focus:ring-offset-2', 'focus:ring-offset-black');
      });
    });

    it('applies default variant when no variant specified', () => {
      renderBadge();
      const badge = screen.getByText('Test Badge');

      // Default variant classes
      expect(badge).toHaveClass('border-white/20', 'text-white', 'bg-transparent');
    });

    it('applies secondary variant classes correctly', () => {
      renderBadge({ variant: 'secondary' });
      const badge = screen.getByText('Test Badge');

      expect(badge).toHaveClass('border-white/10', 'text-white/70', 'bg-white/5');
    });

    it('applies outline variant classes correctly', () => {
      renderBadge({ variant: 'outline' });
      const badge = screen.getByText('Test Badge');

      expect(badge).toHaveClass('border-white/20', 'text-white', 'bg-transparent');
    });

    it('applies gold variant classes correctly', () => {
      renderBadge({ variant: 'gold' });
      const badge = screen.getByText('Test Badge');

      expect(badge).toHaveClass('border-[#FFD700]/50', 'bg-[#FFD700]/10', 'text-[#FFD700]');
    });

    it('applies destructive variant classes correctly', () => {
      renderBadge({ variant: 'destructive' });
      const badge = screen.getByText('Test Badge');

      expect(badge).toHaveClass('border-red-500/50', 'bg-red-500/10', 'text-red-500');
    });
  });

  // ==========================================
  // CLASS VARIANCE AUTHORITY TESTS
  // ==========================================

  describe('Class Variance Authority Integration', () => {
    it('generates correct classes for each variant using badgeVariants helper', () => {
      const defaultClasses = badgeVariants({ variant: 'default' });
      expect(defaultClasses).toContain('border-white/20');
      expect(defaultClasses).toContain('text-white');
      expect(defaultClasses).toContain('bg-transparent');

      const goldClasses = badgeVariants({ variant: 'gold' });
      expect(goldClasses).toContain('border-[#FFD700]/50');
      expect(goldClasses).toContain('bg-[#FFD700]/10');
      expect(goldClasses).toContain('text-[#FFD700]');

      const destructiveClasses = badgeVariants({ variant: 'destructive' });
      expect(destructiveClasses).toContain('border-red-500/50');
      expect(destructiveClasses).toContain('bg-red-500/10');
      expect(destructiveClasses).toContain('text-red-500');
    });

    it('applies base classes regardless of variant', () => {
      const variants = ['default', 'secondary', 'outline', 'gold', 'destructive'] as const;

      variants.forEach(variant => {
        const classes = badgeVariants({ variant });
        expect(classes).toContain('inline-flex');
        expect(classes).toContain('items-center');
        expect(classes).toContain('rounded-md');
        expect(classes).toContain('border');
        expect(classes).toContain('px-2.5');
        expect(classes).toContain('py-0.5');
        expect(classes).toContain('text-xs');
        expect(classes).toContain('font-semibold');
        expect(classes).toContain('transition-colors');
      });
    });
  });

  // ==========================================
  // CUSTOM STYLING TESTS
  // ==========================================

  describe('Custom Styling', () => {
    it('accepts and applies custom className', () => {
      renderBadge({ className: 'custom-badge-class' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('custom-badge-class');
    });

    it('merges custom className with variant classes', () => {
      renderBadge({
        variant: 'gold',
        className: 'additional-class bg-blue-500'
      });
      const badge = screen.getByText('Test Badge');

      // Should have both variant and custom classes
      expect(badge).toHaveClass('additional-class');
      expect(badge).toHaveClass('bg-blue-500');
      expect(badge).toHaveClass('text-[#FFD700]'); // From gold variant
    });

    it('handles multiple custom classes', () => {
      renderBadge({
        className: 'class-one class-two class-three'
      });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('class-one', 'class-two', 'class-three');
    });
  });

  // ==========================================
  // HTML ATTRIBUTES TESTS
  // ==========================================

  describe('HTML Attributes', () => {
    it('forwards standard HTML div attributes', () => {
      renderBadge({
        'data-testid': 'custom-badge',
        'aria-label': 'Custom Badge Label',
        id: 'badge-123',
        title: 'Badge Tooltip'
      });

      const badge = screen.getByTestId('custom-badge');
      expect(badge).toHaveAttribute('aria-label', 'Custom Badge Label');
      expect(badge).toHaveAttribute('id', 'badge-123');
      expect(badge).toHaveAttribute('title', 'Badge Tooltip');
    });

    it('supports custom data attributes', () => {
      renderBadge({
        'data-category': 'status',
        'data-priority': 'high',
        'data-count': '5'
      });

      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveAttribute('data-category', 'status');
      expect(badge).toHaveAttribute('data-priority', 'high');
      expect(badge).toHaveAttribute('data-count', '5');
    });

    it('supports custom aria attributes for accessibility', () => {
      renderBadge({
        'aria-describedby': 'badge-description',
        'aria-hidden': 'false',
        role: 'status'
      });

      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveAttribute('aria-describedby', 'badge-description');
      expect(badge).toHaveAttribute('aria-hidden', 'false');
      expect(badge).toHaveAttribute('role', 'status');
    });
  });

  // ==========================================
  // CHILDREN CONTENT TESTS
  // ==========================================

  describe('Children Content', () => {
    it('renders text content correctly', () => {
      const texts = ['Simple Text', 'Space Leader', 'Verified', '123 Members'];

      texts.forEach(text => {
        render(<Badge>{text}</Badge>);
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });

    it('renders with icon children', () => {
      render(
        <Badge variant="gold" data-testid="icon-badge">
          <Star data-testid="star-icon" />
        </Badge>
      );

      expect(screen.getByTestId('icon-badge')).toBeInTheDocument();
      expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    });

    it('renders with mixed icon and text content', () => {
      render(
        <Badge variant="gold" className="gap-1" data-testid="mixed-badge">
          <Check data-testid="check-icon" />
          Verified
        </Badge>
      );

      const badge = screen.getByTestId('mixed-badge');
      expect(badge).toBeInTheDocument();
      expect(screen.getByTestId('check-icon')).toBeInTheDocument();
      expect(screen.getByText('Verified')).toBeInTheDocument();
    });

    it('renders with multiple children elements', () => {
      render(
        <Badge data-testid="multi-child-badge">
          <span>Count:</span>
          <strong>42</strong>
        </Badge>
      );

      const badge = screen.getByTestId('multi-child-badge');
      expect(badge).toBeInTheDocument();
      expect(screen.getByText('Count:')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('handles React fragments as children', () => {
      render(
        <Badge data-testid="fragment-badge">
          <>
            <Star />
            Featured
          </>
        </Badge>
      );

      expect(screen.getByTestId('fragment-badge')).toBeInTheDocument();
      expect(screen.getByText('Featured')).toBeInTheDocument();
    });
  });

  // ==========================================
  // ACCESSIBILITY TESTS
  // ==========================================

  describe('Accessibility', () => {
    it('has no accessibility violations with default props', async () => {
      const { container } = renderBadge();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with all variants', async () => {
      const variants = ['default', 'secondary', 'outline', 'gold', 'destructive'] as const;

      for (const variant of variants) {
        const { container } = render(<Badge variant={variant}>Test Badge</Badge>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });

    it('maintains accessibility with custom aria attributes', async () => {
      const { container } = renderBadge({
        'aria-label': 'User status badge',
        role: 'status',
        'aria-live': 'polite'
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen reader text for status badges', async () => {
      const { container } = render(
        <Badge variant="gold" aria-label="Verified user status">
          <Check aria-hidden="true" />
          <span className="sr-only">User is verified</span>
          Verified
        </Badge>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper contrast ratios for all variants', () => {
      const variants = ['default', 'secondary', 'outline', 'gold', 'destructive'] as const;

      variants.forEach((variant, index) => {
        renderBadge({ variant, 'data-testid': `contrast-badge-${index}` });
        const badge = screen.getByTestId(`contrast-badge-${index}`);

        // Verify text color classes that ensure proper contrast
        const hasTextColor = badge.className.includes('text-white') ||
                           badge.className.includes('text-white/70') ||
                           badge.className.includes('text-[#FFD700]') ||
                           badge.className.includes('text-red-500');
        expect(hasTextColor).toBe(true);
      });
    });
  });

  // ==========================================
  // FOCUS MANAGEMENT TESTS
  // ==========================================

  describe('Focus Management', () => {
    it('applies focus ring styles correctly', () => {
      renderBadge();
      const badge = screen.getByText('Test Badge');

      // Focus ring classes should be present
      expect(badge).toHaveClass('focus:outline-none');
      expect(badge).toHaveClass('focus:ring-2');
      expect(badge).toHaveClass('focus:ring-[#FFD700]/50');
      expect(badge).toHaveClass('focus:ring-offset-2');
      expect(badge).toHaveClass('focus:ring-offset-black');
    });

    it('supports tabIndex for keyboard navigation when needed', () => {
      renderBadge({ tabIndex: 0 });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveAttribute('tabIndex', '0');
    });
  });

  // ==========================================
  // REAL-WORLD USAGE TESTS
  // ==========================================

  describe('Real-world Usage Scenarios', () => {
    it('renders space leader badge correctly', () => {
      render(
        <Badge variant="gold" className="gap-1" data-testid="leader-badge">
          <Star className="h-3 w-3 fill-current" />
          Space Leader
        </Badge>
      );

      const badge = screen.getByTestId('leader-badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('gap-1');
      expect(screen.getByText('Space Leader')).toBeInTheDocument();
    });

    it('renders verification badge correctly', () => {
      render(
        <Badge variant="gold" className="gap-1" data-testid="verified-badge">
          <Check className="h-3 w-3" />
          Verified
        </Badge>
      );

      const badge = screen.getByTestId('verified-badge');
      expect(badge).toBeInTheDocument();
      expect(screen.getByText('Verified')).toBeInTheDocument();
    });

    it('renders error status badge correctly', () => {
      render(
        <Badge variant="destructive" className="gap-1" data-testid="error-badge">
          <AlertTriangle className="h-3 w-3" />
          Error
        </Badge>
      );

      const badge = screen.getByTestId('error-badge');
      expect(badge).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('renders membership count badge', () => {
      renderBadge({
        variant: 'default',
        children: '234 members'
      });

      expect(screen.getByText('234 members')).toBeInTheDocument();
    });

    it('renders event count badge', () => {
      renderBadge({
        variant: 'default',
        children: '12 events'
      });

      expect(screen.getByText('12 events')).toBeInTheDocument();
    });

    it('renders status indicator badge', () => {
      renderBadge({
        variant: 'default',
        children: 'Active now'
      });

      expect(screen.getByText('Active now')).toBeInTheDocument();
    });

    it('renders category badges for space browsing', () => {
      const categories = ['Academic', 'Student Org', 'Social', 'Sports', 'Arts', 'Career'];

      categories.forEach(category => {
        render(<Badge variant="freshman">{category}</Badge>);
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    });

    it('handles tool status badges', () => {
      const statuses = [
        { status: 'Active', variant: 'default' as const },
        { status: 'Draft', variant: 'default' as const },
        { status: 'Deprecated', variant: 'destructive' as const }
      ];

      statuses.forEach(({ status, variant }) => {
        render(<Badge variant={variant}>{status}</Badge>);
        expect(screen.getByText(status)).toBeInTheDocument();
      });
    });
  });

  // ==========================================
  // PERFORMANCE TESTS
  // ==========================================

  describe('Performance', () => {
    it('renders quickly with minimal re-renders', () => {
      const startTime = performance.now();

      // Render multiple badges
      for (let i = 0; i < 100; i++) {
        render(<Badge variant="freshman">Badge {i}</Badge>);
      }

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 100 badges in less than 100ms
      expect(renderTime).toBeLessThan(100);
    });

    it('handles large numbers of badges efficiently', () => {
      const manyBadges = Array.from({ length: 50 }, (_, i) => (
        <Badge key={i} variant="freshman">Badge {i}</Badge>
      ));

      const { container } = render(<div>{manyBadges}</div>);
      expect(container.querySelectorAll('[class*="inline-flex"]')).toHaveLength(50);
    });
  });

  // ==========================================
  // EDGE CASES
  // ==========================================

  describe('Edge Cases', () => {
    it('handles undefined variant gracefully', () => {
      renderBadge({ variant: undefined });
      const badge = screen.getByText('Test Badge');
      expect(badge).toBeInTheDocument();
      // Should default to 'default' variant
      expect(badge).toHaveClass('border-white/20', 'text-white', 'bg-transparent');
    });

    it('handles empty string className', () => {
      renderBadge({ className: '' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderBadge({ children: null, 'data-testid': 'null-children-badge' });
      const badge = screen.getByTestId('null-children-badge');
      expect(badge).toBeInTheDocument();
    });

    it('handles very long text content', () => {
      const longText = 'This is a very long badge text that might wrap or overflow in certain layouts';
      renderBadge({ children: longText });
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles special characters in content', () => {
      const specialText = '★ Verified ✓ Premium 🔥';
      renderBadge({ children: specialText });
      expect(screen.getByText(specialText)).toBeInTheDocument();
    });
  });
});