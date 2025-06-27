import * as react from 'react';

interface UseFocusTrapOptions {
    enabled?: boolean;
    onEscape?: () => void;
}
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
declare function useFocusTrap<T extends HTMLElement>({ enabled, onEscape, }?: UseFocusTrapOptions): react.RefObject<T | null>;

export { useFocusTrap };
