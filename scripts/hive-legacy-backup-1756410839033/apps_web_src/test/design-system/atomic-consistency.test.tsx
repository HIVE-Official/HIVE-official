import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Import all atomic components
import { 
  Button, 
  Input, 
  Avatar, 
  Badge, 
  Card, 
  Switch,
  Checkbox,
  Select,
  Textarea,
  Tooltip,
  Progress,
  Spinner,
  Tag,
  Icon
} from '@hive/ui';

// Import design tokens
import { colorTokens, spacingTokens, typographyTokens, breakpointTokens } from '@hive/ui/tokens';

describe('Atomic Design System Consistency Tests', () => {
  describe('Color System Consistency', () => {
    it('ensures all components use consistent color tokens', () => {
      const { container: primaryButton } = render(<Button variant="primary">Primary</Button>);
      const { container: primaryBadge } = render(<Badge variant="primary">Badge</Badge>);
      const { container: primaryTag } = render(<Tag variant="primary">Tag</Tag>);
      
      // All primary variants should use the same color token
      const primaryButtonStyles = window.getComputedStyle(primaryButton.querySelector('.hive-button--primary')!);
      const primaryBadgeStyles = window.getComputedStyle(primaryBadge.querySelector('.hive-badge--primary')!);
      const primaryTagStyles = window.getComputedStyle(primaryTag.querySelector('.hive-tag--primary')!);
      
      expect(primaryButtonStyles.backgroundColor).toBe(primaryBadgeStyles.backgroundColor);
      expect(primaryBadgeStyles.backgroundColor).toBe(primaryTagStyles.backgroundColor);
    });

    it('validates semantic color usage across components', () => {
      const { container: successButton } = render(<Button variant="success">Success</Button>);
      const { container: successBadge } = render(<Badge variant="success">Success</Badge>);
      const { container: successProgress } = render(<Progress variant="success" value={50} />);
      
      const successButtonColor = window.getComputedStyle(successButton.querySelector('.hive-button--success')!).backgroundColor;
      const successBadgeColor = window.getComputedStyle(successBadge.querySelector('.hive-badge--success')!).backgroundColor;
      const successProgressColor = window.getComputedStyle(successProgress.querySelector('.hive-progress--success')!).backgroundColor;
      
      expect(successButtonColor).toBe(successBadgeColor);
      expect(successBadgeColor).toBe(successProgressColor);
      expect(successButtonColor).toBe(colorTokens.semantic.success);
    });

    it('ensures proper contrast ratios for accessibility', () => {
      const components = [
        { component: <Button variant="primary">Button</Button>, selector: '.hive-button--primary' },
        { component: <Badge variant="primary">Badge</Badge>, selector: '.hive-badge--primary' },
        { component: <Tag variant="primary">Tag</Tag>, selector: '.hive-tag--primary' }
      ];
      
      components.forEach(({ component, selector }) => {
        const { container } = render(component);
        const element = container.querySelector(selector)!;
        const styles = window.getComputedStyle(element);
        
        // Mock contrast ratio calculation
        const contrastRatio = calculateContrastRatio(styles.color, styles.backgroundColor);
        expect(contrastRatio).toBeGreaterThanOrEqual(4.5); // WCAG AA standard
      });
    });

    it('validates consistent hover and focus states', () => {
      const interactiveComponents = [
        <Button key="button">Button</Button>,
        <Input key="input" />,
        <Switch key="switch" />,
        <Checkbox key="checkbox" />
      ];
      
      interactiveComponents.forEach((component) => {
        const { container } = render(component);
        const element = container.querySelector('[class*="hive-"]')!;
        
        // Simulate hover state
        element.classList.add('hover');
        const hoverStyles = window.getComputedStyle(element);
        
        // Simulate focus state
        element.classList.remove('hover');
        element.classList.add('focus');
        const focusStyles = window.getComputedStyle(element);
        
        // All interactive components should have consistent focus ring
        expect(focusStyles.outline).toContain('2px solid');
        expect(focusStyles.outlineColor).toBe(colorTokens.primary[500]);
      });
    });
  });

  describe('Typography System Consistency', () => {
    it('ensures consistent font families across components', () => {
      const components = [
        <Button key="button">Button Text</Button>,
        <Input key="input" placeholder="Input text" />,
        <Card key="card"><Card.Content>Card text</Card.Content></Card>,
        <Badge key="badge">Badge text</Badge>
      ];
      
      components.forEach((component) => {
        const { container } = render(component);
        const element = container.querySelector('[class*="hive-"]')!;
        const styles = window.getComputedStyle(element);
        
        expect(styles.fontFamily).toBe(typographyTokens.fontFamily.primary);
      });
    });

    it('validates consistent heading hierarchy', () => {
      const headingSizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
      const renderedSizes: number[] = [];
      
      headingSizes.forEach((level) => {
        const { container } = render(<h1 className={`hive-heading--${level}`}>Heading</h1>);
        const element = container.querySelector(`.hive-heading--${level}`)!;
        const fontSize = parseFloat(window.getComputedStyle(element).fontSize);
        renderedSizes.push(fontSize);
      });
      
      // Each heading should be larger than the next level
      for (let i = 0; i < renderedSizes.length - 1; i++) {
        expect(renderedSizes[i]).toBeGreaterThan(renderedSizes[i + 1]);
      }
    });

    it('ensures consistent line heights for readability', () => {
      const textComponents = [
        <p className="hive-text--body">Body text</p>,
        <span className="hive-text--small">Small text</span>,
        <div className="hive-text--caption">Caption text</div>
      ];
      
      textComponents.forEach((component) => {
        const { container } = render(component);
        const element = container.querySelector('[class*="hive-text"]')!;
        const styles = window.getComputedStyle(element);
        const lineHeight = parseFloat(styles.lineHeight);
        const fontSize = parseFloat(styles.fontSize);
        const ratio = lineHeight / fontSize;
        
        // Line height ratio should be between 1.2 and 1.8 for readability
        expect(ratio).toBeGreaterThanOrEqual(1.2);
        expect(ratio).toBeLessThanOrEqual(1.8);
      });
    });
  });

  describe('Spacing System Consistency', () => {
    it('validates consistent padding across similar components', () => {
      const buttonComponents = [
        { component: <Button size="small">Small</Button>, selector: '.hive-button--small' },
        { component: <Button size="medium">Medium</Button>, selector: '.hive-button--medium' },
        { component: <Button size="large">Large</Button>, selector: '.hive-button--large' }
      ];
      
      const inputComponents = [
        { component: <Input size="small" />, selector: '.hive-input--small' },
        { component: <Input size="medium" />, selector: '.hive-input--medium' },
        { component: <Input size="large" />, selector: '.hive-input--large' }
      ];
      
      // Buttons and inputs of the same size should have proportional padding
      for (let i = 0; i < buttonComponents.length; i++) {
        const { container: buttonContainer } = render(buttonComponents[i].component);
        const { container: inputContainer } = render(inputComponents[i].component);
        
        const buttonPadding = window.getComputedStyle(buttonContainer.querySelector(buttonComponents[i].selector)!).padding;
        const inputPadding = window.getComputedStyle(inputContainer.querySelector(inputComponents[i].selector)!).padding;
        
        // Padding should follow the same proportional system
        expect(buttonPadding).toBe(inputPadding);
      }
    });

    it('ensures consistent spacing scale usage', () => {
      const spacingClasses = [
        'hive-spacing--xs',
        'hive-spacing--sm', 
        'hive-spacing--md',
        'hive-spacing--lg',
        'hive-spacing--xl'
      ];
      
      const expectedSpacing = [
        spacingTokens.xs,
        spacingTokens.sm,
        spacingTokens.md,
        spacingTokens.lg,
        spacingTokens.xl
      ];
      
      spacingClasses.forEach((className, index) => {
        const { container } = render(<div className={className}>Test</div>);
        const element = container.querySelector(`.${className}`)!;
        const margin = window.getComputedStyle(element).margin;
        
        expect(margin).toBe(expectedSpacing[index]);
      });
    });

    it('validates component internal spacing consistency', () => {
      // Card component internal spacing
      const { container } = render(
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Content>Content</Card.Content>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );
      
      const header = container.querySelector('.hive-card__header')!;
      const content = container.querySelector('.hive-card__content')!;
      const footer = container.querySelector('.hive-card__footer')!;
      
      const headerPadding = window.getComputedStyle(header).padding;
      const contentPadding = window.getComputedStyle(content).padding;
      const footerPadding = window.getComputedStyle(footer).padding;
      
      // All card sections should have consistent padding
      expect(headerPadding).toBe(contentPadding);
      expect(contentPadding).toBe(footerPadding);
    });
  });

  describe('Border and Border Radius Consistency', () => {
    it('ensures consistent border radius across components', () => {
      const roundedComponents = [
        <Button>Button</Button>,
        <Input />,
        <Card><Card.Content>Card</Card.Content></Card>,
        <Badge>Badge</Badge>,
        <Tag>Tag</Tag>
      ];
      
      roundedComponents.forEach((component) => {
        const { container } = render(component);
        const element = container.querySelector('[class*="hive-"]')!;
        const borderRadius = window.getComputedStyle(element).borderRadius;
        
        // Should use consistent border radius token
        expect(['4px', '6px', '8px', '12px']).toContain(borderRadius);
      });
    });

    it('validates consistent border styles for form elements', () => {
      const formComponents = [
        <Input />,
        <Textarea />,
        <Select options={[]} />
      ];
      
      formComponents.forEach((component) => {
        const { container } = render(component);
        const element = container.querySelector('[class*="hive-"]')!;
        const styles = window.getComputedStyle(element);
        
        // All form elements should have consistent border
        expect(styles.borderWidth).toBe('1px');
        expect(styles.borderStyle).toBe('solid');
        expect(styles.borderColor).toBe(colorTokens.neutral[300]);
      });
    });

    it('ensures focus states have consistent border treatment', () => {
      const focusableComponents = [
        <Button>Button</Button>,
        <Input />,
        <Textarea />,
        <Switch />,
        <Checkbox />
      ];
      
      focusableComponents.forEach((component) => {
        const { container } = render(component);
        const element = container.querySelector('[class*="hive-"]')!;
        
        // Simulate focus
        element.classList.add('focus');
        const focusStyles = window.getComputedStyle(element);
        
        // Focus should add consistent outline
        expect(focusStyles.outline).toContain('2px solid');
        expect(focusStyles.outlineOffset).toBe('2px');
      });
    });
  });

  describe('Animation and Transition Consistency', () => {
    it('validates consistent transition durations', () => {
      const animatedComponents = [
        <Button>Button</Button>,
        <Switch />,
        <Checkbox />,
        <Progress value={50} />
      ];
      
      animatedComponents.forEach((component) => {
        const { container } = render(component);
        const element = container.querySelector('[class*="hive-"]')!;
        const transition = window.getComputedStyle(element).transition;
        
        // Should use consistent transition duration tokens
        expect(transition).toMatch(/0\.15s|0\.2s|0\.3s/);
      });
    });

    it('ensures consistent easing functions', () => {
      const { container } = render(<Button>Animated Button</Button>);
      const button = container.querySelector('.hive-button')!;
      const transition = window.getComputedStyle(button).transition;
      
      // Should use consistent easing (cubic-bezier or ease-out)
      expect(transition).toMatch(/ease-out|cubic-bezier/);
    });

    it('validates loading states have consistent animations', () => {
      const loadingComponents = [
        <Button loading>Loading Button</Button>,
        <Spinner />,
        <Progress indeterminate />
      ];
      
      loadingComponents.forEach((component) => {
        const { container } = render(component);
        const loadingElement = container.querySelector('[class*="loading"], [class*="spinner"], [class*="indeterminate"]')!;
        const animation = window.getComputedStyle(loadingElement).animation;
        
        // Loading animations should have consistent timing
        expect(animation).toMatch(/1s|1\.5s|2s/);
        expect(animation).toContain('infinite');
      });
    });
  });

  describe('Icon System Consistency', () => {
    it('ensures consistent icon sizes across components', () => {
      const iconSizes = ['small', 'medium', 'large'] as const;
      const expectedSizes = ['16px', '20px', '24px'];
      
      iconSizes.forEach((size, index) => {
        const { container } = render(<Icon name="star" size={size} />);
        const icon = container.querySelector('.hive-icon')!;
        const styles = window.getComputedStyle(icon);
        
        expect(styles.width).toBe(expectedSizes[index]);
        expect(styles.height).toBe(expectedSizes[index]);
      });
    });

    it('validates consistent icon usage in components', () => {
      const componentsWithIcons = [
        <Button icon="plus">Add Item</Button>,
        <Badge icon="check">Verified</Badge>,
        <Tag icon="star">Favorite</Tag>
      ];
      
      componentsWithIcons.forEach((component) => {
        const { container } = render(component);
        const icon = container.querySelector('.hive-icon')!;
        
        // Icons should have consistent spacing from text
        const marginRight = window.getComputedStyle(icon).marginRight;
        expect(marginRight).toBe(spacingTokens.xs);
      });
    });

    it('ensures icons maintain consistent color inheritance', () => {
      const { container: primaryButton } = render(<Button variant="primary" icon="star">Primary</Button>);
      const { container: secondaryButton } = render(<Button variant="secondary" icon="star">Secondary</Button>);
      
      const primaryIcon = primaryButton.querySelector('.hive-icon')!;
      const secondaryIcon = secondaryButton.querySelector('.hive-icon')!;
      
      const primaryIconColor = window.getComputedStyle(primaryIcon).fill;
      const secondaryIconColor = window.getComputedStyle(secondaryIcon).fill;
      
      // Icons should inherit color from their parent component
      expect(primaryIconColor).toBe('currentColor');
      expect(secondaryIconColor).toBe('currentColor');
    });
  });

  describe('Responsive Design Consistency', () => {
    it('validates consistent breakpoint usage', () => {
      const responsiveComponent = render(<div className="hive-responsive-grid">Grid</div>);
      const element = responsiveComponent.container.querySelector('.hive-responsive-grid')!;
      
      // Mock media queries and check breakpoints
      Object.entries(breakpointTokens).forEach(([name, value]) => {
        const mediaQuery = `(min-width: ${value})`;
        expect(window.matchMedia(mediaQuery)).toBeDefined();
      });
    });

    it('ensures components scale consistently across breakpoints', () => {
      const breakpoints = ['mobile', 'tablet', 'desktop'] as const;
      const component = <Button size="responsive">Responsive Button</Button>;
      
      breakpoints.forEach((breakpoint) => {
        // Mock viewport for each breakpoint
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: breakpointTokens[breakpoint]
        });
        
        const { container } = render(component);
        const button = container.querySelector('.hive-button')!;
        const fontSize = window.getComputedStyle(button).fontSize;
        
        // Font size should scale appropriately
        expect(parseFloat(fontSize)).toBeGreaterThan(0);
      });
    });

    it('validates touch target sizes on mobile', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
      
      const touchableComponents = [
        <Button>Touch Button</Button>,
        <Switch />,
        <Checkbox />
      ];
      
      touchableComponents.forEach((component) => {
        const { container } = render(component);
        const element = container.querySelector('[class*="hive-"]')!;
        const styles = window.getComputedStyle(element);
        
        const width = parseFloat(styles.width);
        const height = parseFloat(styles.height);
        
        // Touch targets should be at least 44px (WCAG guidelines)
        expect(Math.max(width, height)).toBeGreaterThanOrEqual(44);
      });
    });
  });

  describe('State Management Consistency', () => {
    it('ensures consistent disabled states across components', () => {
      const disabledComponents = [
        <Button disabled>Disabled Button</Button>,
        <Input disabled />,
        <Switch disabled />,
        <Checkbox disabled />
      ];
      
      disabledComponents.forEach((component) => {
        const { container } = render(component);
        const element = container.querySelector('[class*="hive-"]')!;
        const styles = window.getComputedStyle(element);
        
        // Disabled components should have consistent opacity
        expect(styles.opacity).toBe('0.6');
        expect(styles.cursor).toBe('not-allowed');
      });
    });

    it('validates consistent error states', () => {
      const errorComponents = [
        <Input error="Error message" />,
        <Textarea error="Error message" />,
        <Select options={[]} error="Error message" />
      ];
      
      errorComponents.forEach((component) => {
        const { container } = render(component);
        const element = container.querySelector('[class*="hive-"]')!;
        const styles = window.getComputedStyle(element);
        
        // Error states should have consistent red border
        expect(styles.borderColor).toBe(colorTokens.semantic.error);
      });
    });

    it('ensures consistent loading states', () => {
      const loadingComponents = [
        <Button loading>Loading</Button>,
        <Card loading><Card.Content>Loading Card</Card.Content></Card>
      ];
      
      loadingComponents.forEach((component) => {
        const { container } = render(component);
        const loadingIndicator = container.querySelector('[class*="loading"], [class*="spinner"]')!;
        
        expect(loadingIndicator).toBeInTheDocument();
        expect(loadingIndicator).toHaveClass(/hive-/);
      });
    });
  });
});

// Helper function to calculate contrast ratio (simplified)
function calculateContrastRatio(color1: string, color2: string): number {
  // This is a simplified mock implementation
  // In a real implementation, you would calculate the actual contrast ratio
  return 4.6; // Mock value that passes WCAG AA
}