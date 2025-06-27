"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  useFocusTrap: () => useFocusTrap
});
module.exports = __toCommonJS(index_exports);

// src/use-focus-trap.ts
var import_react = require("react");
function useFocusTrap({
  enabled = true,
  onEscape
} = {}) {
  const elementRef = (0, import_react.useRef)(null);
  const previousActiveElement = (0, import_react.useRef)(null);
  const getFocusableElements = (0, import_react.useCallback)(() => {
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
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useFocusTrap
});
