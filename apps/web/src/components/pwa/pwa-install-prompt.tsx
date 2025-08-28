"use client";

import { useState, useEffect } from 'react';
import { Button } from '@hive/ui';
import { HiveCard } from '@hive/ui';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWA } from '@/hooks/use-pwa';

interface PWAInstallPromptProps {
  className?: string;
  variant?: 'banner' | 'card' | 'button';
  autoShow?: boolean;
}

export function PWAInstallPrompt({ 
  className = '', 
  variant = 'banner',
  autoShow = true
}: PWAInstallPromptProps) {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show PWA prompt for campus students after delay
    if (autoShow && isInstallable && !isInstalled && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // 3 second delay for campus UX

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, isDismissed, autoShow]);

  const handleInstall = async () => {
    try {
      await installApp();
      setIsVisible(false);
    } catch (error) {
      console.error('HIVE PWA: Campus install failed', error);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // Remember dismissal for campus students (could use localStorage)
    localStorage.setItem('hive-pwa-dismissed', 'true');
  };

  // Check if previously dismissed by campus student
  useEffect(() => {
    const wasDismissed = localStorage.getItem('hive-pwa-dismissed');
    if (wasDismissed) {
      setIsDismissed(true);
    }
  }, []);

  // Don't show if not installable, already installed, or dismissed
  if (!isInstallable || isInstalled || (isDismissed && autoShow)) {
    return null;
  }

  // Button variant for inline usage
  if (variant === 'button') {
    return (
      <Button
        onClick={handleInstall}
        variant="default"
        size="sm" 
        className={`gap-2 ${className}`}
      >
        <Download className="w-4 h-4" />
        Install HIVE App
      </Button>
    );
  }

  // Card variant for dedicated sections
  if (variant === 'card') {
    return (
      <HiveCard className={`bg-accent/10 border-accent/20 p-6 ${className}`}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2 bg-accent/20 rounded-lg">
              <Smartphone className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Install HIVE for Campus
              </h3>
              <p className="text-muted-foreground">
                Add HIVE to your home screen for instant access to UB community features, 
                offline support, and campus notifications.
              </p>
              <div className="flex gap-2">
                <Button onClick={handleInstall} size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Install Now
                </Button>
                <Button 
                  onClick={handleDismiss}
                  variant="ghost"
                  size="sm"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
      </HiveCard>
    );
  }

  // Banner variant (default) for top-level prompts
  if (!isVisible) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-accent/10 border-b border-accent/20 backdrop-blur-sm ${className}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Smartphone className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Install HIVE for the best campus experience
              </p>
              <p className="text-xs text-muted-foreground">
                Quick access, offline support, and campus notifications
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleInstall}
              size="sm"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Install
            </Button>
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}