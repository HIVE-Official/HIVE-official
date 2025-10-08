import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export function withKeyboardNav(shortcuts) {
    const shortcutRows = Object.entries(shortcuts)
        .map(([key, description]) => `| \`${key}\` | ${description} |`)
        .join('\n');
    return `
### ⌨️ Keyboard Navigation

| Key | Action |
|-----|--------|
${shortcutRows}

**Accessibility**: This component is fully keyboard accessible following WCAG 2.1 guidelines.
  `.trim();
}
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
export function withARIA(attributes) {
    const attributeRows = Object.entries(attributes)
        .map(([attr, description]) => `| \`${attr}\` | ${description} |`)
        .join('\n');
    return `
### 🎯 ARIA Attributes

| Attribute | Description |
|-----------|-------------|
${attributeRows}

**Note**: These ARIA attributes improve screen reader accessibility and are tested with axe-core.
  `.trim();
}
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
export function withA11yChecklist(items) {
    const checklistItems = items.map(item => `- ✅ ${item}`).join('\n');
    return `
### ✅ Accessibility Checklist

${checklistItems}

**Testing Tools**: This component has been tested with axe-core and manual keyboard/screen reader testing.
  `.trim();
}
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
export function withWCAGLevel(level, version = '2.2', criteria) {
    const criteriaList = criteria.map(c => `- ${c}`).join('\n');
    return `
### 🏅 WCAG ${version} Level ${level} Compliance

This component meets the following success criteria:

${criteriaList}

**Compliance Level**: WCAG ${version} Level ${level}
  `.trim();
}
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
export function KeyboardGuide({ shortcuts }) {
    return (_jsxs("div", { className: "mb-6 p-4 rounded-lg border border-[var(--hive-brand-primary)]/30 bg-[var(--hive-brand-primary)]/5", role: "region", "aria-label": "Keyboard navigation guide", children: [_jsxs("h3", { className: "text-sm font-semibold text-[var(--hive-brand-primary)] mb-3 flex items-center gap-2", children: [_jsx("span", { children: "\u2328\uFE0F" }), _jsx("span", { children: "Keyboard Navigation" })] }), _jsx("dl", { className: "space-y-2", children: Object.entries(shortcuts).map(([key, description]) => (_jsxs("div", { className: "flex gap-3", children: [_jsx("dt", { className: "flex-shrink-0", children: _jsx("kbd", { className: "px-2 py-1 text-xs font-mono rounded bg-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)] border border-[var(--hive-border-default)]", children: key }) }), _jsx("dd", { className: "text-sm text-[var(--hive-text-secondary)]", children: description })] }, key))) })] }));
}
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
export function A11yBadge({ status, tests, }) {
    const statusConfig = {
        passed: {
            icon: '✅',
            color: 'var(--hive-status-success)',
            label: 'Accessibility Tests Passed',
        },
        warning: {
            icon: '⚠️',
            color: 'var(--hive-status-warning)',
            label: 'Accessibility Warnings',
        },
        failed: {
            icon: '❌',
            color: 'var(--hive-status-error)',
            label: 'Accessibility Issues Found',
        },
    };
    const config = statusConfig[status];
    return (_jsxs("div", { className: "mb-4 p-3 rounded-lg border", style: {
            borderColor: config.color,
            backgroundColor: `${config.color}15`,
        }, role: "status", "aria-label": config.label, children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { children: config.icon }), _jsx("span", { className: "text-sm font-semibold", style: { color: config.color }, children: config.label })] }), _jsx("ul", { className: "text-xs text-[var(--hive-text-secondary)] space-y-1", children: tests.map((test, i) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[10px]", children: "\u2022" }), _jsx("span", { children: test })] }, i))) })] }));
}
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
export function TestingPrompt({ steps }) {
    return (_jsxs("div", { className: "mb-6 p-4 rounded-lg border border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10", role: "region", "aria-label": "Testing instructions", children: [_jsxs("h3", { className: "text-sm font-semibold text-[var(--hive-brand-primary)] mb-3 flex items-center gap-2", children: [_jsx("span", { children: "\uD83E\uDDEA" }), _jsx("span", { children: "Try It: Interactive Testing" })] }), _jsx("ol", { className: "space-y-2 list-decimal list-inside", children: steps.map((step, i) => (_jsx("li", { className: "text-sm text-[var(--hive-text-secondary)]", children: step }, i))) })] }));
}
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
export function SRAnnouncement({ announcement, context, }) {
    return (_jsx("div", { className: "mb-4 p-3 rounded-lg bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)]", role: "region", "aria-label": "Screen reader announcement preview", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-lg", children: "\uD83D\uDD0A" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)] mb-1", children: [context || 'Screen reader announces', ":"] }), _jsxs("div", { className: "text-sm font-mono text-[var(--hive-text-primary)] bg-[var(--hive-background-primary)] px-2 py-1 rounded", children: ["\"", announcement, "\""] })] })] }) }));
}
//# sourceMappingURL=storybook-helpers.js.map