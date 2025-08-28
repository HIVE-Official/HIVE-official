"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const use_focus_trap_1 = require("../use-focus-trap");
const vitest_1 = require("vitest");
// Test component that uses the hook
const TestDialog = ({ isOpen = true, onClose = () => { }, }) => {
    const ref = (0, use_focus_trap_1.useFocusTrap)({ enabled: isOpen, onEscape: onClose });
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": "dialog", children: [(0, jsx_runtime_1.jsx)("button", { children: "First Button" }), (0, jsx_runtime_1.jsx)("button", { children: "Middle Button" }), (0, jsx_runtime_1.jsx)("button", { children: "Last Button" })] }));
};
(0, vitest_1.describe)('useFocusTrap', () => {
    (0, vitest_1.beforeEach)(() => {
        // Create a mock body since JSDOM doesn't provide one
        if (!document.body) {
            const body = document.createElement('body');
            document.documentElement.appendChild(body);
        }
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('focuses the first focusable element when enabled', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(TestDialog, {}));
        const buttons = react_1.screen.getAllByRole('button');
        (0, vitest_1.expect)(document.activeElement).toBe(buttons[0]);
    });
    (0, vitest_1.it)('traps focus when tabbing forward', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(TestDialog, {}));
        const buttons = react_1.screen.getAllByRole('button');
        // Tab through all buttons
        buttons.forEach((_, index) => {
            react_1.fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });
            (0, vitest_1.expect)(document.activeElement).toBe(buttons[(index + 1) % buttons.length]);
        });
    });
    (0, vitest_1.it)('traps focus when tabbing backward', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(TestDialog, {}));
        const buttons = react_1.screen.getAllByRole('button');
        // Start from last button
        buttons[buttons.length - 1].focus();
        // Shift+Tab should go to previous button
        react_1.fireEvent.keyDown(document.activeElement || document.body, {
            key: 'Tab',
            shiftKey: true,
        });
        (0, vitest_1.expect)(document.activeElement).toBe(buttons[buttons.length - 2]);
        // Shift+Tab from first button should go to last button
        buttons[0].focus();
        react_1.fireEvent.keyDown(document.activeElement || document.body, {
            key: 'Tab',
            shiftKey: true,
        });
        (0, vitest_1.expect)(document.activeElement).toBe(buttons[buttons.length - 1]);
    });
    (0, vitest_1.it)('calls onEscape when Escape key is pressed', () => {
        const onClose = vitest_1.vi.fn();
        (0, react_1.render)((0, jsx_runtime_1.jsx)(TestDialog, { onClose: onClose }));
        react_1.fireEvent.keyDown(document.activeElement || document.body, { key: 'Escape' });
        (0, vitest_1.expect)(onClose).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('does not trap focus when disabled', () => {
        const { rerender } = (0, react_1.render)((0, jsx_runtime_1.jsx)(TestDialog, { isOpen: false }));
        const buttons = react_1.screen.getAllByRole('button');
        // Should not focus first button when disabled
        (0, vitest_1.expect)(document.activeElement).not.toBe(buttons[0]);
        // Enable the trap
        rerender((0, jsx_runtime_1.jsx)(TestDialog, { isOpen: true }));
        (0, vitest_1.expect)(document.activeElement).toBe(buttons[0]);
        // Disable the trap
        rerender((0, jsx_runtime_1.jsx)(TestDialog, { isOpen: false }));
        (0, vitest_1.expect)(document.activeElement).not.toBe(buttons[0]);
    });
    (0, vitest_1.it)('ignores hidden and disabled elements', () => {
        const HiddenButtonDialog = () => {
            const ref = (0, use_focus_trap_1.useFocusTrap)();
            return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, children: [(0, jsx_runtime_1.jsx)("button", { hidden: true, children: "Hidden" }), (0, jsx_runtime_1.jsx)("button", { disabled: true, children: "Disabled" }), (0, jsx_runtime_1.jsx)("button", { children: "Visible" }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("button", { children: "Hidden by aria" }) })] }));
        };
        (0, react_1.render)((0, jsx_runtime_1.jsx)(HiddenButtonDialog, {}));
        const visibleButton = react_1.screen.getByText('Visible');
        (0, vitest_1.expect)(document.activeElement).toBe(visibleButton);
    });
});
//# sourceMappingURL=use-focus-trap.test.js.map