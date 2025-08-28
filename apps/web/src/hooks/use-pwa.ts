"use client";

import { useEffect, useState } from 'react';

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

          console.log('HIVE PWA: Service Worker registered for campus use', registration);

          // Handle service worker updates for campus students
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available for campus students
                  console.log('HIVE PWA: New content available for campus');
                  // Could show update notification to students
                }
              });
            }
          });

        } catch (error) {
          console.error('HIVE PWA: Service Worker registration failed', error);
        }
      });
    }

    // Handle PWA install prompt for campus students
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as PWAInstallPrompt;
      setInstallPromptEvent(promptEvent);
      setIsInstallable(true);
      console.log('HIVE PWA: Install prompt available for campus student');
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
        console.log('HIVE PWA: Campus network connected');
      } else {
        console.log('HIVE PWA: Campus offline mode active');
      }
    };

    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Handle successful PWA installation
    window.addEventListener('appinstalled', () => {
      console.log('HIVE PWA: Successfully installed for campus student');
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
        console.log('HIVE PWA: Campus student accepted install');
        setIsInstallable(false);
        setInstallPromptEvent(null);
      } else {
        console.log('HIVE PWA: Campus student dismissed install');
      }
    } catch (error) {
      console.error('HIVE PWA: Install failed for campus student', error);
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
        console.log('HIVE PWA: Content shared successfully on campus');
      } catch (error) {
        console.error('HIVE PWA: Campus sharing failed', error);
      }
    } else {
      // Fallback for campus browsers without native sharing
      const url = shareData.url || window.location.href;
      await navigator.clipboard.writeText(url);
      console.log('HIVE PWA: URL copied for campus sharing');
    }
  },

  // Campus notification permission
  requestNotifications: async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      console.log('HIVE PWA: Campus notification permission:', permission);
      return permission === 'granted';
    }
    return false;
  }
};