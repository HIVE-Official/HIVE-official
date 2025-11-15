'use client';

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
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { X } from 'lucide-react';

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

const DEFAULT_SHORTCUTS: KeyboardShortcut[] = [
  // Navigation
  { key: 'j', description: 'Next post', category: 'Navigation' },
  { key: 'k', description: 'Previous post', category: 'Navigation' },
  { key: '↑', description: 'Scroll up', category: 'Navigation' },
  { key: '↓', description: 'Scroll down', category: 'Navigation' },
  { key: 'Enter', description: 'Open post', category: 'Navigation' },
  { key: 'Esc', description: 'Close modal/overlay', category: 'Navigation' },

  // Actions
  { key: 'l', description: 'Upvote post', category: 'Actions' },
  { key: 'c', description: 'Comment on post', category: 'Actions' },
  { key: 'b', description: 'Bookmark post', category: 'Actions' },
  { key: 's', description: 'Share post', category: 'Actions' },

  // General
  { key: '?', description: 'Show keyboard shortcuts', category: 'General' },
  { key: 'Cmd+K', description: 'Open command palette', category: 'General' },
  { key: '/', description: 'Focus search', category: 'General' },
];

const KeyboardKey: React.FC<{ keyName: string }> = ({ keyName }) => (
  <kbd
    className={cn(
      'inline-flex min-w-[32px] items-center justify-center rounded-md border border-[var(--hive-border-default)] bg-[var(--hive-background-tertiary)] px-2 py-1 font-mono text-xs font-semibold text-[var(--hive-text-primary)] shadow-sm'
    )}
  >
    {keyName}
  </kbd>
);

export const KeyboardShortcutsOverlay: React.FC<KeyboardShortcutsOverlayProps> = ({
  isOpen,
  onClose,
  shortcuts = DEFAULT_SHORTCUTS,
}) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when overlay is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Focus trap: focus first element when opened
  React.useEffect(() => {
    if (isOpen && overlayRef.current) {
      const firstFocusable = overlayRef.current.querySelector<HTMLElement>('button');
      firstFocusable?.focus();
    }
  }, [isOpen]);

  // Close on click outside
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce(
    (acc, shortcut) => {
      if (!acc[shortcut.category]) {
        acc[shortcut.category] = [];
      }
      acc[shortcut.category].push(shortcut);
      return acc;
    },
    {} as Record<string, KeyboardShortcut[]>
  );

  const categories = ['Navigation', 'Actions', 'General'] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="keyboard-shortcuts-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={cn(
              'relative w-full max-w-2xl rounded-2xl border border-[var(--hive-border-default)] bg-[var(--hive-background-primary)] p-6 shadow-2xl',
              'mx-4'
            )}
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2
                id="keyboard-shortcuts-title"
                className="text-xl font-semibold text-[var(--hive-text-primary)]"
              >
                Keyboard Shortcuts
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close keyboard shortcuts"
                className={cn(
                  'rounded-lg p-2 transition-colors hover:bg-[var(--hive-background-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]'
                )}
              >
                <X className="h-5 w-5 text-[var(--hive-text-secondary)]" />
              </button>
            </div>

            {/* Shortcuts Grid */}
            <div className="space-y-6">
              {categories.map((category) => {
                const categoryShortcuts = groupedShortcuts[category];
                if (!categoryShortcuts || categoryShortcuts.length === 0) return null;

                return (
                  <div key={category}>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--hive-text-tertiary)]">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {categoryShortcuts.map((shortcut, index) => (
                        <div
                          key={`${shortcut.key}-${index}`}
                          className="flex items-center justify-between rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-4 py-3"
                        >
                          <span className="text-sm text-[var(--hive-text-secondary)]">
                            {shortcut.description}
                          </span>
                          <KeyboardKey keyName={shortcut.key} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Hint */}
            <div className="mt-6 rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] p-3 text-center">
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Press <KeyboardKey keyName="?" /> again or <KeyboardKey keyName="Esc" /> to
                close
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

KeyboardShortcutsOverlay.displayName = 'KeyboardShortcutsOverlay';
