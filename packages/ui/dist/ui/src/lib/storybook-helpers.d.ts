/**
 * Storybook Helper Utilities for HIVE Design System
 *
 * These utilities help create consistent, accessible stories across
 * all components in the design system.
 */
/**
 * Keyboard Navigation Documentation Badge
 *
 * Adds a visual badge with keyboard shortcuts to story documentation.
 *
 * @example
 * ```typescript
 * export const Interactive: Story = {
 *   parameters: {
 *     docs: {
 *       description: {
 *         story: withKeyboardNav({
 *           Tab: 'Focus button',
 *           'Enter/Space': 'Activate button',
 *           Escape: 'Cancel (if in modal)',
 *         }),
 *       },
 *     },
 *   },
 * };
 * ```
 */
export declare function withKeyboardNav(shortcuts: Record<string, string>): string;
/**
 * ARIA Documentation Badge
 *
 * Adds ARIA attribute documentation to stories.
 *
 * @example
 * ```typescript
 * export const WithARIA: Story = {
 *   parameters: {
 *     docs: {
 *       description: {
 *         story: withARIA({
 *           'aria-label': 'Descriptive label for screen readers',
 *           'aria-expanded': 'true when open, false when closed',
 *           role: 'button',
 *         }),
 *       },
 *     },
 *   },
 * };
 * ```
 */
export declare function withARIA(attributes: Record<string, string>): string;
/**
 * Accessibility Testing Checklist
 *
 * Adds a testing checklist to story documentation.
 *
 * @example
 * ```typescript
 * export const AccessibleExample: Story = {
 *   parameters: {
 *     docs: {
 *       description: {
 *         story: withA11yChecklist([
 *           'Keyboard navigation tested',
 *           'Screen reader tested with VoiceOver',
 *           'Color contrast verified (4.5:1 minimum)',
 *           'Focus indicators visible',
 *         ]),
 *       },
 *     },
 *   },
 * };
 * ```
 */
export declare function withA11yChecklist(items: string[]): string;
/**
 * WCAG Compliance Badge
 *
 * Adds WCAG compliance level documentation.
 *
 * @example
 * ```typescript
 * export const Compliant: Story = {
 *   parameters: {
 *     docs: {
 *       description: {
 *         story: withWCAGLevel('AA', '2.2', [
 *           '1.4.3 Contrast (Minimum)',
 *           '2.1.1 Keyboard',
 *           '2.4.7 Focus Visible',
 *           '2.5.8 Target Size (Minimum)', // WCAG 2.2
 *         ]),
 *       },
 *     },
 *   },
 * };
 * ```
 */
export declare function withWCAGLevel(level: 'A' | 'AA' | 'AAA', version: '2.0' | '2.1' | '2.2', criteria: string[]): string;
/**
 * Keyboard Navigation Visual Demo Component
 *
 * Renders a visual keyboard shortcut guide in stories.
 *
 * @example
 * ```typescript
 * export const WithKeyboardGuide: Story = {
 *   render: () => (
 *     <div>
 *       <KeyboardGuide shortcuts={{
 *         Tab: 'Move focus to button',
 *         'Enter/Space': 'Activate button',
 *         Escape: 'Close (if in modal)',
 *       }} />
 *       <Button>Interactive Button</Button>
 *     </div>
 *   ),
 * };
 * ```
 */
export declare function KeyboardGuide({ shortcuts }: {
    shortcuts: Record<string, string>;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Accessibility Status Badge Component
 *
 * Renders a visual badge showing accessibility test status.
 *
 * @example
 * ```typescript
 * export const Accessible: Story = {
 *   render: () => (
 *     <div>
 *       <A11yBadge
 *         status="passed"
 *         tests={['Keyboard', 'Screen Reader', 'Color Contrast', 'Focus Visible']}
 *       />
 *       <Component />
 *     </div>
 *   ),
 * };
 * ```
 */
export declare function A11yBadge({ status, tests, }: {
    status: 'passed' | 'warning' | 'failed';
    tests: string[];
}): import("react/jsx-runtime").JSX.Element;
/**
 * Interactive Testing Prompt Component
 *
 * Renders interactive testing instructions for users.
 *
 * @example
 * ```typescript
 * export const InteractiveTest: Story = {
 *   render: () => (
 *     <div>
 *       <TestingPrompt steps={[
 *         'Click anywhere on the page',
 *         'Press Tab key',
 *         'Observe focus indicator on button',
 *         'Press Enter to activate',
 *       ]} />
 *       <Button>Test Button</Button>
 *     </div>
 *   ),
 * };
 * ```
 */
export declare function TestingPrompt({ steps }: {
    steps: string[];
}): import("react/jsx-runtime").JSX.Element;
/**
 * Screen Reader Announcement Preview
 *
 * Shows what a screen reader would announce for the component.
 *
 * @example
 * ```typescript
 * export const WithSRAnnouncement: Story = {
 *   render: () => (
 *     <div>
 *       <SRAnnouncement
 *         announcement="Submit form, button"
 *         context="When focused"
 *       />
 *       <button aria-label="Submit form">Submit</button>
 *     </div>
 *   ),
 * };
 * ```
 */
export declare function SRAnnouncement({ announcement, context, }: {
    announcement: string;
    context?: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=storybook-helpers.d.ts.map