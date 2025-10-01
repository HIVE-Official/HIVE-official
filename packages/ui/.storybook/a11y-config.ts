/**
 * Storybook Accessibility Addon Configuration
 *
 * This file configures the axe-core accessibility testing rules
 * for Storybook's a11y addon.
 *
 * @see https://storybook.js.org/addons/@storybook/addon-a11y
 * @see https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
 */

export const a11yConfig = {
  // Configure which rules to run
  config: {
    rules: [
      // WCAG 2.2 Level A & AA rules
      {
        id: 'color-contrast',
        enabled: true, // Ensure sufficient color contrast
      },
      {
        id: 'focus-order-semantics',
        enabled: true, // WCAG 2.2: Focus Appearance
      },
      {
        id: 'target-size',
        enabled: true, // WCAG 2.2: Target Size (Minimum) - 24x24px
      },
      {
        id: 'label',
        enabled: true, // Form labels must be associated with controls
      },
      {
        id: 'button-name',
        enabled: true, // Buttons must have accessible names
      },
      {
        id: 'link-name',
        enabled: true, // Links must have accessible names
      },
      {
        id: 'aria-valid-attr',
        enabled: true, // ARIA attributes must be valid
      },
      {
        id: 'aria-valid-attr-value',
        enabled: true, // ARIA attribute values must be valid
      },
      {
        id: 'aria-required-attr',
        enabled: true, // Required ARIA attributes must be present
      },
      {
        id: 'landmark-one-main',
        enabled: true, // Document should have one main landmark
      },
      {
        id: 'region',
        enabled: true, // All content should be within landmarks
      },
      {
        id: 'bypass',
        enabled: true, // Page must have means to bypass repeated content
      },
      {
        id: 'heading-order',
        enabled: true, // Heading levels should increase by one
      },
      {
        id: 'image-alt',
        enabled: true, // Images must have alt text
      },
      {
        id: 'input-image-alt',
        enabled: true, // Image buttons must have alt text
      },
      {
        id: 'frame-title',
        enabled: true, // Frames must have title attribute
      },
      {
        id: 'document-title',
        enabled: false, // Disable for Storybook (no document titles in stories)
      },
      {
        id: 'html-has-lang',
        enabled: false, // Disable for Storybook (controlled by Storybook)
      },
    ],
  },

  // Options for the axe-core engine
  options: {
    // Test component in isolation (not full page)
    runOnly: {
      type: 'tag',
      values: [
        'wcag2a',    // WCAG 2.0 Level A
        'wcag2aa',   // WCAG 2.0 Level AA
        'wcag21a',   // WCAG 2.1 Level A
        'wcag21aa',  // WCAG 2.1 Level AA
        'wcag22aa',  // WCAG 2.2 Level AA (NEW)
        'best-practice', // Axe best practices
      ],
    },
    // Increase result limit (default is 20)
    resultTypes: ['violations', 'incomplete'],
  },

  // Manual checks that should be performed
  // (automated tools can't catch everything)
  manualChecks: [
    '✓ Keyboard navigation: Tab through all interactive elements',
    '✓ Screen reader: Test with VoiceOver (Mac) or NVDA (Windows)',
    '✓ Focus indicators: All focused elements have visible outline',
    '✓ Reduced motion: Test with prefers-reduced-motion enabled',
    '✓ Zoom: Test at 200% zoom level',
    '✓ Color blindness: Test with color blindness simulators',
    '✓ High contrast: Test with high contrast mode',
  ],
};

/**
 * Global accessibility parameters for all stories
 *
 * Add this to your story's parameters to enable accessibility testing:
 *
 * ```typescript
 * export const MyStory: Story = {
 *   parameters: {
 *     a11y: a11yConfig,
 *   },
 * };
 * ```
 */
export default a11yConfig;
