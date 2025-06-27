'use strict';

var react = require('react');

// src/use-focus-trap.ts
function useFocusTrap({
  enabled = true,
  onEscape
} = {}) {
  const elementRef = react.useRef(null);
  const previousActiveElement = react.useRef(null);
  const getFocusableElements = react.useCallback(() => {
    if (!elementRef.current) return [];
    return Array.from(
      elementRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => {
      return !element.hasAttribute("disabled") && !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true" && // Check if the element or its ancestors are visible
      !Array.from(element.getClientRects()).every(
        (rect) => rect.width === 0 && rect.height === 0
      );
    });
  }, []);
  react.useEffect(() => {
    if (!enabled) return;
    previousActiveElement.current = document.activeElement;
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
    return () => {
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [enabled, getFocusableElements]);
  react.useEffect(() => {
    if (!enabled) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && onEscape) {
        onEscape();
        return;
      }
      if (event.key === "Tab") {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;
        if (event.shiftKey) {
          if (activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, getFocusableElements, onEscape]);
  return elementRef;
}

exports.useFocusTrap = useFocusTrap;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map