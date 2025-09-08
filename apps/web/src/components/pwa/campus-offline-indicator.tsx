"use client";

import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@hive/ui';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { Button } from '@hive/ui';
import { usePWA } from '@/hooks/use-pwa';

export function CampusOfflineIndicator() {
  const { isOffline } = usePWA();
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (isOffline) {
      // Show offline message after brief delay for campus UX
      const timer = setTimeout(() => {
        setShowOfflineMessage(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setShowOfflineMessage(false);
      setRetryCount(0);
    }
  }, [isOffline]);

  const handleRetry = async () => {
    setRetryCount(prev => prev + 1);
    
    // Try to reconnect to campus network
    try {
      const response = await fetch('/api/health', { 
        method: 'GET',
        cache: 'no-cache' 
      });
      
      if (response.ok) {
        console.log('HIVE PWA: Campus connection restored');
        setShowOfflineMessage(false);
      }
    } catch (error) {
      console.log('HIVE PWA: Still offline from campus network');
    }
  };

  // Don't show if online
  if (!isOffline || !showOfflineMessage) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-[var(--hive-gold)]/10 border-b border-[var(--hive-gold)]/20">
      <div className="container mx-auto px-4 py-2">
        <Alert className="border-[var(--hive-gold)]/20 bg-[var(--hive-gold)]/5">
          <WifiOff className="h-4 w-4 text-[var(--hive-gold)]" />
          <AlertDescription className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Campus Network Unavailable
              </span>
              <span className="text-xs text-[var(--hive-gold-dark)] dark:text-[var(--hive-gold)]">
                HIVE is running in offline mode
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-xs text-[var(--hive-gold-dark)] dark:text-[var(--hive-gold)]">
                {retryCount > 0 && `Tried ${retryCount} time${retryCount > 1 ? 's' : ''}`}
              </div>
              <Button
                onClick={handleRetry}
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-orange-700 dark:text-orange-300 hover:bg-[var(--hive-gold)]/20"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Retry
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

// Campus-specific network status hook
export function useCampusNetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState<{
    isOnline: boolean;
    isSlowConnection: boolean;
    connectionType: string;
  }>({
    isOnline: navigator.onLine,
    isSlowConnection: false,
    connectionType: 'unknown'
  });

  useEffect(() => {
    const updateNetworkStatus = () => {
      const isOnline = navigator.onLine;
      
      // Check for slow campus connection
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const isSlowConnection = connection ? 
        (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') : 
        false;
      
      const connectionType = connection ? connection.effectiveType : 'unknown';

      setNetworkStatus({
        isOnline,
        isSlowConnection,
        connectionType
      });

      if (isOnline) {
        console.log('HIVE: Campus network connected', { connectionType, effectiveType: connection?.effectiveType });
      } else {
        console.log('HIVE: Campus network disconnected - offline mode active');
      }
    };

    updateNetworkStatus();
    
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    // Listen for connection changes (campus WiFi strength)
    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      if ((navigator as any).connection) {
        (navigator as any).connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return networkStatus;
}