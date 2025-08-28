"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFocusTrap = useFocusTrap;
const react_1 = require("react");
/**
 * A hook that traps focus within a container when enabled.
 * This is useful for modals, dialogs, and other overlays.
 *
 * @example
 * ```tsx
 * const Dialog = ({ isOpen, onClose }) => {
 *   const ref = useFocusTrap({ enabled: isOpen, onEscape: onClose })
 *   return (
 *     <div ref={ref}>
 *       <button>Focus me first</button>
 *       <button>Tab to me next</button>
 *     </div>
 *   )
 * }
 * ```
 */
function useFocusTrap({ enabled = true, onEscape, } = {}) {
    const elementRef = (0, react_1.useRef)(null);
    const previousActiveElement = (0, react_1.useRef)(null);
    // Get all focusable elements within the container
    const getFocusableElements = (0, react_1.useCallback)(() => {
        if (!elementRef.current)
            return [];
        return Array.from(elementRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((element) => {
            // Filter out hidden or disabled elements
            return (!element.hasAttribute('disabled') &&
                !element.hasAttribute('hidden') &&
                element.getAttribute('aria-hidden') !== 'true' &&
                // Check if the element or its ancestors are visible
                !Array.from(element.getClientRects()).every((rect) => rect.width === 0 && rect.height === 0));
        });
    }, []);
    // Focus the first focusable element when the trap is enabled
    (0, react_1.useEffect)(() => {
        if (!enabled)
            return;
        // Store the currently focused element
        previousActiveElement.current = document.activeElement;
        // Focus the first focusable element
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
        return () => {
            // Restore focus when the trap is disabled
            if (previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        };
    }, [enabled, getFocusableElements]);
    // Handle keyboard events
    (0, react_1.useEffect)(() => {
        if (!enabled)
            return;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && onEscape) {
                onEscape();
                return;
            }
            if (event.key === 'Tab') {
                const focusableElements = getFocusableElements();
                if (focusableElements.length === 0)
                    return;
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                const activeElement = document.activeElement;
                // Shift + Tab
                if (event.shiftKey) {
                    if (activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    }
                }
                // Tab
                else {
                    if (activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [enabled, getFocusableElements, onEscape]);
    return elementRef;
}
//# sourceMappingURL=use-focus-trap.js.map