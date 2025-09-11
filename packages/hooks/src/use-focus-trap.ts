import { useEffect, useRef, useCallback } from 'react'

interface UseFocusTrapOptions {
  enabled?: boolean
  onEscape?: () => void
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
export function useFocusTrap<T extends HTMLElement>({
  enabled = true,
  onEscape,
}: UseFocusTrapOptions = {}) {
  const elementRef = useRef<T>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Get all focusable elements within the container
  const getFocusableElements = useCallback(() => {
    if (!elementRef.current) return []

    return Array.from(
      elementRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element: any) => {
      // Filter out hidden or disabled elements
      return (
        !element.hasAttribute('disabled') &&
        !element.hasAttribute('hidden') &&
        element.getAttribute('aria-hidden') !== 'true' &&
        // Check if the element or its ancestors are visible
        !Array.from(element.getClientRects()).every(
          (rect: any) => rect.width === 0 && rect.height === 0
        )
      )
    })
  }, [])

  // Focus the first focusable element when the trap is enabled
  useEffect(() => {
    if (!enabled) return

    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement

    // Focus the first focusable element
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }

    return () => {
      // Restore focus when the trap is disabled
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [enabled, getFocusableElements])

  // Handle keyboard events
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onEscape) {
        onEscape()
        return
      }

      if (event.key === 'Tab') {
        const focusableElements = getFocusableElements()
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        const activeElement = document.activeElement

        // Shift + Tab
        if (event.shiftKey) {
          if (activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        }
        // Tab
        else {
          if (activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [enabled, getFocusableElements, onEscape])

  return elementRef
} 