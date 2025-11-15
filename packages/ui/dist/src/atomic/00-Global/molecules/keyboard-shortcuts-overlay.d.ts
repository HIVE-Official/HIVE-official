/**
 * KeyboardShortcutsOverlay - Floating keyboard shortcuts reference
 *
 * Displays available keyboard shortcuts when user presses `?`
 * Dismissible with Escape or click outside
 *
 * Features:
 * - Modal overlay with backdrop blur
 * - Organized by category (Navigation, Actions, General)
 * - Keyboard key visualization
 * - Auto-focus trap
 * - Accessible with ARIA labels
 *
 * Usage:
 * ```tsx
 * import { KeyboardShortcutsOverlay } from '@hive/ui';
 *
 * <KeyboardShortcutsOverlay
 *   isOpen={showShortcuts}
 *   onClose={() => setShowShortcuts(false)}
 * />
 * ```
 */
import * as React from 'react';
export interface KeyboardShortcut {
    key: string;
    description: string;
    category: 'Navigation' | 'Actions' | 'General';
}
export interface KeyboardShortcutsOverlayProps {
    /**
     * Whether the overlay is visible
     */
    isOpen: boolean;
    /**
     * Callback when user closes the overlay
     */
    onClose: () => void;
    /**
     * Custom shortcuts to display (defaults to Feed shortcuts)
     */
    shortcuts?: KeyboardShortcut[];
}
export declare const KeyboardShortcutsOverlay: React.FC<KeyboardShortcutsOverlayProps>;
//# sourceMappingURL=keyboard-shortcuts-overlay.d.ts.map