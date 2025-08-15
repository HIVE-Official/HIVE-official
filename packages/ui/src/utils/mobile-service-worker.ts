/**
 * Mobile Service Worker Utilities
 * Offline functionality and caching strategies for mobile optimization
 */

import { useState, useEffect } from 'react';

// Service Worker registration utility
export class MobileServiceWorker {
  private static instance: MobileServiceWorker;
  private registration: ServiceWorkerRegistration | null = null;
  private isOnline = navigator.onLine;

  static getInstance(): MobileServiceWorker {
    if (!MobileServiceWorker.instance) {
      MobileServiceWorker.instance = new MobileServiceWorker();
    }
    return MobileServiceWorker.instance;
  }

  constructor() {
    // Listen for online/offline changes
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncWhenOnline();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  async register(swPath = '/sw.js'): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return false;
    }

    try {
      this.registration = await navigator.serviceWorker.register(swPath);
      console.log('Service Worker registered:', this.registration);
      
      // Handle updates
      this.registration.addEventListener('updatefound', () => {
        const newWorker = this.registration?.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              this.notifyUpdate();
            }
          });
        }
      });

      return true;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return false;
    }
  }

  async unregister(): Promise<boolean> {
    if (!this.registration) return false;
    
    try {
      await this.registration.unregister();
      this.registration = null;
      return true;
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
      return false;
    }
  }

  get isRegistered(): boolean {
    return this.registration !== null;
  }

  get networkStatus(): 'online' | 'offline' {
    return this.isOnline ? 'online' : 'offline';
  }

  // Cache management
  async cacheResource(url: string, cacheName = 'hive-mobile-cache'): Promise<boolean> {
    try {
      const cache = await caches.open(cacheName);
      await cache.add(url);
      return true;
    } catch (error) {
      console.error('Failed to cache resource:', error);
      return false;
    }
  }

  async getCachedResource(url: string): Promise<Response | undefined> {
    try {
      const cache = await caches.match(url);
      return cache;
    } catch (error) {
      console.error('Failed to get cached resource:', error);
      return undefined;
    }
  }

  async clearCache(cacheName?: string): Promise<boolean> {
    try {
      if (cacheName) {
        return await caches.delete(cacheName);
      } else {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        return true;
      }
    } catch (error) {
      console.error('Failed to clear cache:', error);
      return false;
    }
  }

  // Background sync
  async queueBackgroundSync(tag: string, data?: any): Promise<boolean> {
    if (!this.registration || !(this.registration as any).sync) {
      console.log('Background Sync not supported');
      return false;
    }

    try {
      // Store data for sync
      if (data) {
        const syncStore = await this.openIndexedDB('hive-sync-store');
        await this.storeData(syncStore, tag, data);
      }

      await (this.registration as any).sync.register(tag);
      return true;
    } catch (error) {
      console.error('Failed to queue background sync:', error);
      return false;
    }
  }

  // Push notifications
  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.registration?.pushManager) {
      console.log('Push messaging not supported');
      return null;
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          // Your VAPID public key would go here
          'your-vapid-public-key'
        )
      });
      
      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push:', error);
      return null;
    }
  }

  // Utility methods
  private async syncWhenOnline(): Promise<void> {
    // Implement sync logic when coming back online
    console.log('Device back online, syncing...');
    
    try {
      const syncStore = await this.openIndexedDB('hive-sync-store');
      const pendingItems = await this.getAllPendingSync(syncStore);
      
      for (const item of pendingItems) {
        await this.processSyncItem(item);
      }
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }

  private notifyUpdate(): void {
    // Notify user about available update
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('HIVE Update Available', {
        body: 'A new version of HIVE is available. Refresh to update.',
        icon: '/icons/icon-192x192.png',
        tag: 'hive-update'
      });
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  private async openIndexedDB(dbName: string): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('sync-items')) {
          db.createObjectStore('sync-items', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  private async storeData(db: IDBDatabase, tag: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['sync-items'], 'readwrite');
      const store = transaction.objectStore('sync-items');
      const request = store.add({ tag, data, timestamp: Date.now() });
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  private async getAllPendingSync(db: IDBDatabase): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['sync-items'], 'readonly');
      const store = transaction.objectStore('sync-items');
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  private async processSyncItem(item: any): Promise<void> {
    // Process individual sync items based on their type
    console.log('Processing sync item:', item);
    
    try {
      switch (item.tag) {
        case 'hive-feed-post':
          await this.syncFeedPost(item.data);
          break;
        case 'hive-space-action':
          await this.syncSpaceAction(item.data);
          break;
        case 'hive-tool-save':
          await this.syncToolSave(item.data);
          break;
        default:
          console.log('Unknown sync item type:', item.tag);
      }
    } catch (error) {
      console.error('Failed to process sync item:', error);
    }
  }

  private async syncFeedPost(data: any): Promise<void> {
    // Implement feed post sync logic
    console.log('Syncing feed post:', data);
  }

  private async syncSpaceAction(data: any): Promise<void> {
    // Implement space action sync logic
    console.log('Syncing space action:', data);
  }

  private async syncToolSave(data: any): Promise<void> {
    // Implement tool save sync logic
    console.log('Syncing tool save:', data);
  }
}

// React hook for service worker integration
export function useServiceWorker(swPath?: string) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const sw = MobileServiceWorker.getInstance();
    
    // Register service worker
    sw.register(swPath).then(setIsRegistered);
    
    // Listen for online/offline changes
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [swPath]);

  return {
    isRegistered,
    isOnline,
    networkStatus: isOnline ? 'online' : 'offline',
    updateAvailable,
    serviceWorker: MobileServiceWorker.getInstance()
  };
}

// Caching strategies
export class CacheStrategies {
  // Cache first, network fallback
  static async cacheFirst(request: Request, cacheName = 'hive-cache-first'): Promise<Response> {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
    
    return networkResponse;
  }

  // Network first, cache fallback
  static async networkFirst(request: Request, cacheName = 'hive-network-first'): Promise<Response> {
    try {
      const networkResponse = await fetch(request);
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  }

  // Stale while revalidate
  static async staleWhileRevalidate(request: Request, cacheName = 'hive-swr'): Promise<Response> {
    const cachedResponse = await caches.match(request);
    
    const networkResponsePromise = fetch(request).then(networkResponse => {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, networkResponse.clone()));
      return networkResponse;
    });
    
    return cachedResponse || networkResponsePromise;
  }
}

// Offline storage utilities
export class OfflineStorage {
  static async store(key: string, data: any, storeName = 'hive-offline'): Promise<boolean> {
    try {
      const db = await openDB(storeName);
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      await store.put({ id: key, data, timestamp: Date.now() });
      return true;
    } catch (error) {
      console.error('Failed to store offline data:', error);
      return false;
    }
  }

  static async retrieve(key: string, storeName = 'hive-offline'): Promise<any> {
    try {
      const db = await openDB(storeName);
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      return new Promise((resolve, reject) => {
        const request = store.get(key);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result?.data);
      });
    } catch (error) {
      console.error('Failed to retrieve offline data:', error);
      return null;
    }
  }

  static async remove(key: string, storeName = 'hive-offline'): Promise<boolean> {
    try {
      const db = await openDB(storeName);
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      await store.delete(key);
      return true;
    } catch (error) {
      console.error('Failed to remove offline data:', error);
      return false;
    }
  }
}

// Helper function for IndexedDB
function openDB(dbName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(dbName)) {
        db.createObjectStore(dbName, { keyPath: 'id' });
      }
    };
  });
}

// Export singleton instance
export const mobileServiceWorker = MobileServiceWorker.getInstance();