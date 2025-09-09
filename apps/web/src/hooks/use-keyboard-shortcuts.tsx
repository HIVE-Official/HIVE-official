'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  cmd?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description?: string;
}

const shortcuts: ShortcutConfig[] = [
  {
    key: 'k',
    cmd: true,
    ctrl: true,
    action: () => {
      // Open search
      const searchButton = document.querySelector('[aria-label="Search"]') as HTMLButtonElement;
      searchButton?.click();
    },
    description: 'Open search'
  },
  {
    key: 'n',
    cmd: true,
    ctrl: true,
    action: () => {
      // Create new post
      const createButton = document.querySelector('[aria-label="Create post"]') as HTMLButtonElement;
      createButton?.click();
    },
    description: 'Create new post'
  },
  {
    key: '/',
    action: () => {
      // Focus search input
      const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
      searchInput?.focus();
    },
    description: 'Focus search'
  },
  {
    key: 'Escape',
    action: () => {
      // Close modals
      const closeButton = document.querySelector('[aria-label="Close"]') as HTMLButtonElement;
      closeButton?.click();
    },
    description: 'Close modal'
  }
];

// Page navigation shortcuts
const pageShortcuts: Record<string, string> = {
  'g h': '/',          // Go Home
  'g f': '/feed',      // Go Feed
  'g s': '/spaces',    // Go Spaces
  'g p': '/profile',   // Go Profile
  'g e': '/events',    // Go Events
  'g n': '/notifications', // Go Notifications
};

export function useKeyboardShortcuts() {
  const router = useRouter();
  const keys: string[] = [];
  let keyTimer: NodeJS.Timeout;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Check for single key shortcuts
    for (const shortcut of shortcuts) {
      const isCtrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : true;
      const isCmdMatch = shortcut.cmd ? (e.metaKey || e.ctrlKey) : true;
      const isShiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
      const isAltMatch = shortcut.alt ? e.altKey : !e.altKey;
      
      if (
        e.key === shortcut.key &&
        isCtrlMatch &&
        isCmdMatch &&
        isShiftMatch &&
        isAltMatch
      ) {
        e.preventDefault();
        shortcut.action();
        return;
      }
    }

    // Check for multi-key shortcuts (like 'g h')
    keys.push(e.key);
    clearTimeout(keyTimer);
    
    const keyCombo = keys.join(' ');
    if (pageShortcuts[keyCombo]) {
      e.preventDefault();
      router.push(pageShortcuts[keyCombo]);
      keys.length = 0;
      return;
    }

    // Clear keys after 1 second
    keyTimer = setTimeout(() => {
      keys.length = 0;
    }, 1000);
  }, [router]);

  useEffect(() => {
    // Don't capture shortcuts when typing in inputs
    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.getAttribute('contenteditable') === 'true'
      );
    };

    const wrappedHandler = (e: KeyboardEvent) => {
      // Skip if typing in an input
      if (isInputFocused() && e.key !== 'Escape') {
        return;
      }
      handleKeyDown(e);
    };

    window.addEventListener('keydown', wrappedHandler);
    return () => {
      window.removeEventListener('keydown', wrappedHandler);
      clearTimeout(keyTimer);
    };
  }, [handleKeyDown]);

  return {
    shortcuts: [...shortcuts, ...Object.entries(pageShortcuts).map(([key, path]) => ({
      key,
      action: () => router.push(path),
      description: `Navigate to ${path}`
    }))]
  };
}

// Help modal component
export function KeyboardShortcutsHelp() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Keyboard Shortcuts</h3>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-400">Navigation</h4>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Go to Home</span>
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">g h</kbd>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Go to Feed</span>
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">g f</kbd>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Go to Spaces</span>
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">g s</kbd>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Go to Profile</span>
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">g p</kbd>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-400">Actions</h4>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Open Search</span>
            <div className="flex gap-1">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">⌘</kbd>
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">K</kbd>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Create Post</span>
            <div className="flex gap-1">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">⌘</kbd>
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">N</kbd>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Focus Search</span>
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">/</kbd>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Close Modal</span>
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd>
          </div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-white/10">
        <p className="text-xs text-gray-500">
          Press <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">?</kbd> to show this help
        </p>
      </div>
    </div>
  );
}