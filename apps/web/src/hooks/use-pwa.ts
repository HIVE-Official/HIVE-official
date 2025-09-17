"use client";

import { useEffect, useState } from 'react';
import { logger } from '@/lib/logger';

interface PWAInstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface UsePWAReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  isOffline: boolean;
  installApp: () => Promise<void>;
  installPromptEvent: PWAInstallPrompt | null;
}

export function usePWA(): UsePWAReturn {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<PWAInstallPrompt | null>(null);

  useEffect(() => {
    // Register service worker for campus caching
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          // 

          // Handle service worker updates for campus students
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available for campus students
                  // 
                  // Could show update notification to students
                }
              });
            }
          });

        } catch (error) {
          logger.error('HIVE PWA: Service Worker registration failed', { error: String(error) });
        }
      });
    }

    // Handle PWA install prompt for campus students
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as PWAInstallPrompt;
      setInstallPromptEvent(promptEvent);
      setIsInstallable(true);
      // 
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    // Check if already installed for campus use
    const checkIfInstalled = () => {
      // Check for display mode
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      // Check for iOS standalone
      const isIOSStandalone = (window.navigator as any).standalone === true;
      // Check for Android installed
      const isAndroidInstalled = document.referrer.includes('android-app://');
      
      setIsInstalled(isStandalone || isIOSStandalone || isAndroidInstalled);
    };

    checkIfInstalled();

    // Handle campus network status for offline support
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
      if (navigator.onLine) {
        // 
      } else {
        // 
      }
    };

    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Handle successful PWA installation
    window.addEventListener('appinstalled', () => {
      // 
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPromptEvent(null);
      
      // Track installation for campus analytics (if needed)
      // Could send campus-specific analytics here
    });

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const installApp = async (): Promise<void> => {
    if (!installPromptEvent) {
      console.warn('HIVE PWA: No install prompt available for campus student');
      return;
    }

    try {
      // Show campus install prompt
      await installPromptEvent.prompt();
      
      // Wait for user choice
      const { outcome } = await installPromptEvent.userChoice;
      
      if (outcome === 'accepted') {
        // 
        setIsInstallable(false);
        setInstallPromptEvent(null);
      } else {
        // 
      }
    } catch (error) {
      logger.error('HIVE PWA: Install failed for campus student', { error: String(error) });
    }
  };

  return {
    isInstallable,
    isInstalled, 
    isOffline,
    installApp,
    installPromptEvent,
  };
}

// Campus-specific PWA utilities
export const PWAUtils = {
  // Check if running in PWA mode for campus features
  isPWA: () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true ||
           document.referrer.includes('android-app://');
  },

  // Campus-specific sharing
  canShare: () => {
    return 'share' in navigator;
  },

  shareContent: async (shareData: {
    title?: string;
    text?: string; 
    url?: string;
  }) => {
    if (PWAUtils.canShare()) {
      try {
        await navigator.share({
          title: shareData.title || 'HIVE - UB Community',
          text: shareData.text || 'Check out HIVE - where UB students connect and build together',
          url: shareData.url || window.location.href,
        });
        // 
      } catch (error) {
        logger.error('HIVE PWA: Campus sharing failed', { error: String(error) });
      }
    } else {
      // Fallback for campus browsers without native sharing
      const url = shareData.url || window.location.href;
      await navigator.clipboard.writeText(url);
      // 
    }
  },

  // Campus notification permission
  requestNotifications: async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      // 
      return permission === 'granted';
    }
    return false;
  }
};