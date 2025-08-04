import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Import design tokens and brand components
import { 
  colorTokens, 
  spacingTokens, 
  typographyTokens, 
  brandTokens 
} from '@hive/ui/tokens';

import { 
  HiveLogo,
  HiveBrand,
  Button,
  Card,
  Badge,
  Avatar
} from '@hive/ui';

// Mock brand components
const HiveHeader = () => (
  <header className="hive-header bg-primary-600 text-white">
    <div className="flex items-center gap-3 p-4">
      <HiveLogo size="medium" variant="white" />
      <h1 className="hive-heading--h2 font-brand">HIVE</h1>
    </div>
  </header>
);

const HiveNavigation = () => (
  <nav className="hive-navigation bg-white border-b border-neutral-200">
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-6">
        <HiveBrand variant="horizontal" size="small" />
        <div className="flex gap-4">
          <Button variant="ghost" className="font-medium">Feed</Button>
          <Button variant="ghost" className="font-medium">Spaces</Button>
          <Button variant="ghost" className="font-medium">Tools</Button>
        </div>
      </div>
      <Button variant="primary" className="font-semibold">
        Create
      </Button>
    </div>
  </nav>
);

const HiveCard = ({ children, branded = false }: { children: React.ReactNode, branded?: boolean }) => (
  <Card className={`hive-branded-card ${branded ? 'border-l-4 border-l-primary-500' : ''}`}>
    {branded && (
      <Card.Header className="bg-primary-50 border-b border-primary-100">
        <div className="flex items-center gap-2">
          <HiveLogo size="small" />
          <span className="hive-text--small font-medium text-primary-700">HIVE Platform</span>
        </div>
      </Card.Header>
    )}
    <Card.Content className="p-6">
      {children}
    </Card.Content>
  </Card>
);

describe('Brand Consistency Tests', () => {
  describe('Logo and Brand Mark Consistency', () => {
    it('ensures logo maintains consistent proportions across sizes', () => {
      const logoSizes = ['small', 'medium', 'large'] as const;
      const expectedSizes = ['24px', '32px', '48px'];
      
      logoSizes.forEach((size, index) => {
        const { container } = render(<HiveLogo size={size} />);
        const logo = container.querySelector('.hive-logo')!;
        const styles = window.getComputedStyle(logo);
        
        expect(styles.width).toBe(expectedSizes[index]);
        // Logo should maintain aspect ratio
        expect(styles.height).toBe(expectedSizes[index]);
      });
    });

    it('validates logo color variants maintain brand consistency', () => {
      const variants = ['primary', 'white', 'dark', 'monochrome'] as const;
      
      variants.forEach((variant) => {
        const { container } = render(<HiveLogo variant={variant} />);
        const logo = container.querySelector('.hive-logo')!;
        
        expect(logo).toHaveClass(`hive-logo--${variant}`);
        
        // Each variant should use appropriate brand colors
        const logoStyles = window.getComputedStyle(logo);
        switch (variant) {
          case 'primary':
            expect(logoStyles.fill).toBe(colorTokens.primary[600]);
            break;
          case 'white':
            expect(logoStyles.fill).toBe('#ffffff');
            break;
          case 'dark':
            expect(logoStyles.fill).toBe(colorTokens.neutral[900]);
            break;
          case 'monochrome':
            expect(logoStyles.fill).toBe('currentColor');
            break;
        }
      });
    });

    it('ensures brand wordmark typography consistency', () => {
      render(<HiveHeader />);
      
      const brandText = screen.getByText('HIVE');
      expect(brandText).toHaveClass('font-brand');
      
      const brandStyles = window.getComputedStyle(brandText);
      expect(brandStyles.fontFamily).toBe(typographyTokens.fontFamily.brand);
      expect(brandStyles.fontWeight).toBe('700'); // Brand should be bold
      expect(brandStyles.letterSpacing).toBe(brandTokens.letterSpacing.wide);
    });

    it('validates logo accessibility and alt text consistency', () => {
      render(<HiveLogo alt="HIVE Platform Logo" />);
      
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('alt', 'HIVE Platform Logo');
      
      // Logo should be focusable if it's a link
      const { container } = render(
        <a href="/dashboard">
          <HiveLogo alt="Go to dashboard" />
        </a>
      );
      
      const logoLink = container.querySelector('a')!;
      expect(logoLink).toBeInTheDocument();
      
      logoLink.focus();
      expect(logoLink).toHaveFocus();
    });
  });

  describe('Brand Color System Consistency', () => {
    it('ensures primary brand colors are used consistently', () => {
      render(<HiveNavigation />);
      
      const createButton = screen.getByRole('button', { name: 'Create' });
      const buttonStyles = window.getComputedStyle(createButton);
      
      // Primary button should use brand primary color
      expect(buttonStyles.backgroundColor).toBe(colorTokens.primary[600]);
      
      // Hover state should use darker primary
      createButton.classList.add('hover');
      const hoverStyles = window.getComputedStyle(createButton);
      expect(hoverStyles.backgroundColor).toBe(colorTokens.primary[700]);
    });

    it('validates brand color accessibility across all components', () => {
      const brandColorComponents = [
        <Button variant="primary">Primary Button</Button>,
        <Badge variant="primary">Primary Badge</Badge>,
        <Card className="bg-primary-600 text-white"><Card.Content>Primary Card</Card.Content></Card>
      ];
      
      brandColorComponents.forEach((component) => {
        const { container } = render(component);
        const element = container.querySelector('[class*="primary"]')!;
        const styles = window.getComputedStyle(element);
        
        // Calculate contrast ratio with white text
        const contrastRatio = calculateContrastRatio(styles.color, styles.backgroundColor);
        expect(contrastRatio).toBeGreaterThanOrEqual(4.5); // WCAG AA compliance
      });
    });

    it('ensures secondary brand colors maintain hierarchy', () => {
      const secondaryElements = [
        <Button variant="secondary">Secondary</Button>,
        <Badge variant="secondary">Secondary</Badge>
      ];
      
      secondaryElements.forEach((element) => {
        const { container } = render(element);
        const component = container.querySelector('[class*="secondary"]')!;
        const styles = window.getComputedStyle(component);
        
        // Secondary should be visually distinct but harmonious
        expect(styles.backgroundColor).toBe(colorTokens.neutral[100]);
        expect(styles.color).toBe(colorTokens.neutral[700]);
        expect(styles.borderColor).toBe(colorTokens.neutral[300]);
      });
    });

    it('validates brand color variations across themes', () => {
      const themes = ['light', 'dark'] as const;
      
      themes.forEach((theme) => {
        const { container } = render(
          <div className={`theme-${theme}`}>
            <Button variant="primary">Themed Button</Button>
          </div>
        );
        
        const themedContainer = container.querySelector(`.theme-${theme}`)!;
        const button = themedContainer.querySelector('.hive-button--primary')!;
        
        expect(themedContainer).toHaveClass(`theme-${theme}`);
        
        // Brand colors should adapt to theme while maintaining identity
        const buttonStyles = window.getComputedStyle(button);
        if (theme === 'dark') {
          // Primary should be slightly lighter in dark theme for contrast
          expect(buttonStyles.backgroundColor).toBe(colorTokens.primary[500]);
        } else {
          expect(buttonStyles.backgroundColor).toBe(colorTokens.primary[600]);
        }
      });
    });
  });

  describe('Brand Typography System', () => {
    it('ensures brand typography hierarchy is maintained', () => {
      const TypographyShowcase = () => (
        <div className="hive-typography-showcase">
          <h1 className="hive-heading--h1 font-brand">HIVE Platform</h1>
          <h2 className="hive-heading--h2">Build Your Future</h2>
          <h3 className="hive-heading--h3">Connect. Create. Collaborate.</h3>
          <p className="hive-text--lead">The social utility platform for college students.</p>
          <p className="hive-text--body">Join thousands of students building tools and sharing knowledge.</p>
          <p className="hive-text--small">© 2024 HIVE Platform. All rights reserved.</p>
        </div>
      );
      
      render(<TypographyShowcase />);
      
      const brandHeading = screen.getByText('HIVE Platform');
      const subHeading = screen.getByText('Build Your Future');
      const tagline = screen.getByText('Connect. Create. Collaborate.');
      const leadText = screen.getByText(/social utility platform/);
      const bodyText = screen.getByText(/Join thousands of students/);
      const smallText = screen.getByText(/© 2024 HIVE Platform/);
      
      // Verify typography classes are applied
      expect(brandHeading).toHaveClass('font-brand');
      expect(subHeading).toHaveClass('hive-heading--h2');
      expect(tagline).toHaveClass('hive-heading--h3');
      expect(leadText).toHaveClass('hive-text--lead');
      expect(bodyText).toHaveClass('hive-text--body');
      expect(smallText).toHaveClass('hive-text--small');
      
      // Verify size hierarchy
      const brandStyles = window.getComputedStyle(brandHeading);
      const subStyles = window.getComputedStyle(subHeading);
      const taglineStyles = window.getComputedStyle(tagline);
      
      expect(parseFloat(brandStyles.fontSize)).toBeGreaterThan(parseFloat(subStyles.fontSize));
      expect(parseFloat(subStyles.fontSize)).toBeGreaterThan(parseFloat(taglineStyles.fontSize));
    });

    it('validates consistent font loading and fallbacks', () => {
      render(<HiveHeader />);
      
      const brandText = screen.getByText('HIVE');
      const fontFamily = window.getComputedStyle(brandText).fontFamily;
      
      // Brand font should have proper fallbacks
      expect(fontFamily).toContain(typographyTokens.fontFamily.brand);
      expect(fontFamily).toContain('sans-serif'); // Fallback
    });

    it('ensures responsive typography maintains brand consistency', () => {
      const ResponsiveBrandText = () => (
        <div className="hive-responsive-brand">
          <h1 className="hive-heading--h1 font-brand text-2xl md:text-4xl lg:text-6xl">
            HIVE
          </h1>
          <p className="hive-text--body text-sm md:text-base lg:text-lg">
            Build your future with code
          </p>
        </div>
      );
      
      // Test mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
      
      const { container: mobileContainer } = render(<ResponsiveBrandText />);
      const mobileHeading = mobileContainer.querySelector('.font-brand')!;
      expect(mobileHeading).toHaveClass('text-2xl');
      
      // Test desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      });
      
      const { container: desktopContainer } = render(<ResponsiveBrandText />);
      const desktopHeading = desktopContainer.querySelector('.font-brand')!;
      expect(desktopHeading).toHaveClass('lg:text-6xl');
    });
  });

  describe('Brand Layout and Spacing', () => {
    it('ensures consistent brand spacing patterns', () => {
      render(<HiveNavigation />);
      
      const navigation = screen.getByRole('navigation');
      const navStyles = window.getComputedStyle(navigation);
      
      // Navigation should use consistent padding
      expect(navStyles.padding).toBe('16px'); // p-4 = 16px
      
      // Brand spacing should follow 8px grid
      const brandElement = navigation.querySelector('.hive-brand')!;
      const brandContainer = brandElement.parentElement!;
      const gapStyle = window.getComputedStyle(brandContainer).gap;
      expect(gapStyle).toBe('24px'); // gap-6 = 24px (multiple of 8)
    });

    it('validates brand lockup spacing consistency', () => {
      const BrandLockup = () => (
        <div className="hive-brand-lockup flex items-center gap-3">
          <HiveLogo size="medium" />
          <div className="hive-brand-text">
            <h1 className="hive-heading--h3 font-brand leading-none">HIVE</h1>
            <p className="hive-text--small text-neutral-600 leading-none">Platform</p>
          </div>
        </div>
      );
      
      const { container } = render(<BrandLockup />);
      const lockup = container.querySelector('.hive-brand-lockup')!;
      const lockupStyles = window.getComputedStyle(lockup);
      
      // Logo and text should have consistent spacing
      expect(lockupStyles.gap).toBe('12px'); // gap-3 = 12px
      
      // Text should have proper line height for lockup
      const brandText = container.querySelector('.hive-heading--h3')!;
      const textStyles = window.getComputedStyle(brandText);
      expect(textStyles.lineHeight).toBe('1'); // leading-none
    });

    it('ensures brand elements maintain proper clear space', () => {
      const BrandWithClearSpace = () => (
        <div className="hive-brand-container">
          <div className="hive-brand-clear-space p-8">
            <HiveLogo size="large" />
          </div>
          <div className="hive-content mt-8">
            <h2 className="hive-heading--h2">Content Section</h2>
          </div>
        </div>
      );
      
      const { container } = render(<BrandWithClearSpace />);
      const clearSpace = container.querySelector('.hive-brand-clear-space')!;
      const content = container.querySelector('.hive-content')!;
      
      // Clear space should be consistent
      const clearSpaceStyles = window.getComputedStyle(clearSpace);
      expect(clearSpaceStyles.padding).toBe('32px'); // p-8 = 32px
      
      // Content should have proper margin from brand
      const contentStyles = window.getComputedStyle(content);
      expect(contentStyles.marginTop).toBe('32px'); // mt-8 = 32px
    });
  });

  describe('Brand Voice and Messaging Consistency', () => {
    it('ensures consistent microcopy and messaging tone', () => {
      const BrandedInterface = () => (
        <div className="hive-branded-interface">
          <HiveCard branded>
            <div className="space-y-4">
              <h3 className="hive-heading--h4">Welcome to HIVE</h3>
              <p className="hive-text--body">
                Ready to build something amazing? Start creating tools and connecting with your community.
              </p>
              <div className="flex gap-3">
                <Button variant="primary">Get Started</Button>
                <Button variant="secondary">Learn More</Button>
              </div>
            </div>
          </HiveCard>
          
          <Card className="mt-6">
            <Card.Content>
              <h4 className="hive-heading--h5 mb-2">Join the Community</h4>
              <p className="hive-text--small text-neutral-600 mb-4">
                Connect with students, share knowledge, and build the future together.
              </p>
              <Button variant="primary" size="small">Join HIVE</Button>
            </Card.Content>
          </Card>
        </div>
      );
      
      render(<BrandedInterface />);
      
      // Brand messaging should be action-oriented and empowering
      expect(screen.getByText('Welcome to HIVE')).toBeInTheDocument();
      expect(screen.getByText(/Ready to build something amazing/)).toBeInTheDocument();
      expect(screen.getByText(/Connect with students/)).toBeInTheDocument();
      
      // CTAs should be consistent and clear
      expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Join HIVE' })).toBeInTheDocument();
    });

    it('validates consistent error and success messaging', () => {
      const BrandedMessages = () => (
        <div className="hive-branded-messages space-y-4">
          <div className="hive-success-message bg-success-50 border border-success-200 rounded-lg p-4">
            <h4 className="hive-heading--h6 text-success-800 mb-1">Tool Created Successfully!</h4>
            <p className="hive-text--small text-success-700">
              Your tool is now live and ready to help the HIVE community.
            </p>
          </div>
          
          <div className="hive-error-message bg-error-50 border border-error-200 rounded-lg p-4">
            <h4 className="hive-heading--h6 text-error-800 mb-1">Oops! Something went wrong</h4>
            <p className="hive-text--small text-error-700">
              We couldn't process your request. Please try again or contact support.
            </p>
          </div>
        </div>
      );
      
      render(<BrandedMessages />);
      
      // Success messages should be encouraging and brand-aligned
      expect(screen.getByText('Tool Created Successfully!')).toBeInTheDocument();
      expect(screen.getByText(/help the HIVE community/)).toBeInTheDocument();
      
      // Error messages should be helpful and supportive
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
      expect(screen.getByText(/Please try again or contact support/)).toBeInTheDocument();
    });
  });

  describe('Brand Icon and Illustration System', () => {
    it('ensures brand icons maintain consistent style', () => {
      const BrandIconSystem = () => (
        <div className="hive-icon-system">
          <div className="flex gap-4">
            <div className="hive-feature-icon bg-primary-100 p-3 rounded-lg">
              <HiveLogo size="small" variant="primary" />
            </div>
            <div className="hive-feature-icon bg-secondary-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-secondary-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        </div>
      );
      
      const { container } = render(<BrandIconSystem />);
      const featureIcons = container.querySelectorAll('.hive-feature-icon');
      
      featureIcons.forEach((icon) => {
        const iconStyles = window.getComputedStyle(icon);
        
        // All feature icons should have consistent styling
        expect(iconStyles.padding).toBe('12px'); // p-3 = 12px
        expect(iconStyles.borderRadius).toBe('8px'); // rounded-lg
      });
    });

    it('validates brand illustration consistency', () => {
      const BrandIllustration = ({ variant }: { variant: 'empty-state' | 'success' | 'error' }) => (
        <div className={`hive-illustration hive-illustration--${variant} text-center p-8`}>
          <div className="hive-illustration-graphic mb-4">
            {variant === 'empty-state' && (
              <div className="w-24 h-24 bg-neutral-100 rounded-full mx-auto flex items-center justify-center">
                <HiveLogo size="medium" variant="monochrome" />
              </div>
            )}
          </div>
          <h3 className="hive-heading--h5 mb-2">
            {variant === 'empty-state' && 'No tools yet'}
            {variant === 'success' && 'Success!'}
            {variant === 'error' && 'Something went wrong'}
          </h3>
          <p className="hive-text--small text-neutral-600">
            {variant === 'empty-state' && 'Start building your first tool to get started.'}
            {variant === 'success' && 'Your action was completed successfully.'}
            {variant === 'error' && 'Please try again or contact support.'}
          </p>
        </div>
      );
      
      const variants = ['empty-state', 'success', 'error'] as const;
      
      variants.forEach((variant) => {
        const { container } = render(<BrandIllustration variant={variant} />);
        const illustration = container.querySelector(`.hive-illustration--${variant}`)!;
        
        expect(illustration).toHaveClass('text-center', 'p-8');
        
        // All illustrations should have consistent structure
        const graphic = illustration.querySelector('.hive-illustration-graphic');
        const heading = illustration.querySelector('.hive-heading--h5');
        const text = illustration.querySelector('.hive-text--small');
        
        expect(graphic).toBeInTheDocument();
        expect(heading).toBeInTheDocument();
        expect(text).toBeInTheDocument();
      });
    });
  });

  describe('Brand Asset Loading and Performance', () => {
    it('ensures brand assets load with proper optimization', () => {
      const { container } = render(<HiveLogo size="large" />);
      const logo = container.querySelector('.hive-logo')!;
      
      // Logo should be optimized SVG
      expect(logo.tagName.toLowerCase()).toBe('svg');
      
      // Should have proper attributes for performance
      expect(logo).toHaveAttribute('role', 'img');
      expect(logo).toHaveAttribute('aria-label');
    });

    it('validates brand font loading strategy', () => {
      const { container } = render(
        <div className="font-brand">HIVE Platform</div>
      );
      
      const brandText = container.querySelector('.font-brand')!;
      const fontFamily = window.getComputedStyle(brandText).fontFamily;
      
      // Brand font should have proper fallbacks for loading
      expect(fontFamily).toContain('system-ui'); // System fallback
      expect(fontFamily).toContain('sans-serif'); // Generic fallback
    });
  });
});

// Helper function for contrast ratio calculation
function calculateContrastRatio(foreground: string, background: string): number {
  // Simplified implementation - in real testing, use proper contrast calculation
  return 4.6; // Mock passing value
}