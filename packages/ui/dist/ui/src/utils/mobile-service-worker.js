/**
 * Mobile Service Worker Utilities
 * Offline functionality and caching strategies for mobile optimization
 */
import { useState, useEffect } from 'react';
// Service Worker registration utility
export class MobileServiceWorker {
    static instance;
    registration = null;
    isOnline = navigator.onLine;
    static getInstance() {
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
    async register(swPath = '/sw.js') {
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
        }
        catch (error) {
            console.error('Service Worker registration failed:', error);
            return false;
        }
    }
    async unregister() {
        if (!this.registration)
            return false;
        try {
            await this.registration.unregister();
            this.registration = null;
            return true;
        }
        catch (error) {
            console.error('Service Worker unregistration failed:', error);
            return false;
        }
    }
    get isRegistered() {
        return this.registration !== null;
    }
    get networkStatus() {
        return this.isOnline ? 'online' : 'offline';
    }
    // Cache management
    async cacheResource(url, cacheName = 'hive-mobile-cache') {
        try {
            const cache = await caches.open(cacheName);
            await cache.add(url);
            return true;
        }
        catch (error) {
            console.error('Failed to cache resource:', error);
            return false;
        }
    }
    async getCachedResource(url) {
        try {
            const cache = await caches.match(url);
            return cache;
        }
        catch (error) {
            console.error('Failed to get cached resource:', error);
            return undefined;
        }
    }
    async clearCache(cacheName) {
        try {
            if (cacheName) {
                return await caches.delete(cacheName);
            }
            else {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
                return true;
            }
        }
        catch (error) {
            console.error('Failed to clear cache:', error);
            return false;
        }
    }
    // Background sync
    async queueBackgroundSync(tag, data) {
        if (!this.registration || !this.registration.sync) {
            console.log('Background Sync not supported');
            return false;
        }
        try {
            // Store data for sync
            if (data) {
                const syncStore = await this.openIndexedDB('hive-sync-store');
                await this.storeData(syncStore, tag, data);
            }
            await this.registration.sync.register(tag);
            return true;
        }
        catch (error) {
            console.error('Failed to queue background sync:', error);
            return false;
        }
    }
    // Push notifications
    async subscribeToPush() {
        if (!this.registration?.pushManager) {
            console.log('Push messaging not supported');
            return null;
        }
        try {
            const subscription = await this.registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(
                // Your VAPID public key would go here
                'your-vapid-public-key')
            });
            return subscription;
        }
        catch (error) {
            console.error('Failed to subscribe to push:', error);
            return null;
        }
    }
    // Utility methods
    async syncWhenOnline() {
        // Implement sync logic when coming back online
        console.log('Device back online, syncing...');
        try {
            const syncStore = await this.openIndexedDB('hive-sync-store');
            const pendingItems = await this.getAllPendingSync(syncStore);
            for (const item of pendingItems) {
                await this.processSyncItem(item);
            }
        }
        catch (error) {
            console.error('Sync failed:', error);
        }
    }
    notifyUpdate() {
        // Notify user about available update
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('HIVE Update Available', {
                body: 'A new version of HIVE is available. Refresh to update.',
                icon: '/icons/icon-192x192.png',
                tag: 'hive-update'
            });
        }
    }
    urlBase64ToUint8Array(base64String) {
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
    async openIndexedDB(dbName) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, 1);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('sync-items')) {
                    db.createObjectStore('sync-items', { keyPath: 'id', autoIncrement: true });
                }
            };
        });
    }
    async storeData(db, tag, data) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['sync-items'], 'readwrite');
            const store = transaction.objectStore('sync-items');
            const request = store.add({ tag, data, timestamp: Date.now() });
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }
    async getAllPendingSync(db) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['sync-items'], 'readonly');
            const store = transaction.objectStore('sync-items');
            const request = store.getAll();
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result || []);
        });
    }
    async processSyncItem(item) {
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
        }
        catch (error) {
            console.error('Failed to process sync item:', error);
        }
    }
    async syncFeedPost(data) {
        // Implement feed post sync logic
        console.log('Syncing feed post:', data);
    }
    async syncSpaceAction(data) {
        // Implement space action sync logic
        console.log('Syncing space action:', data);
    }
    async syncToolSave(data) {
        // Implement tool save sync logic
        console.log('Syncing tool save:', data);
    }
}
// React hook for service worker integration
export function useServiceWorker(swPath) {
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
    static async cacheFirst(request, cacheName = 'hive-cache-first') {
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
    static async networkFirst(request, cacheName = 'hive-network-first') {
        try {
            const networkResponse = await fetch(request);
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        catch (error) {
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }
            throw error;
        }
    }
    // Stale while revalidate
    static async staleWhileRevalidate(request, cacheName = 'hive-swr') {
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
    static async store(key, data, storeName = 'hive-offline') {
        try {
            const db = await openDB(storeName);
            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            await store.put({ id: key, data, timestamp: Date.now() });
            return true;
        }
        catch (error) {
            console.error('Failed to store offline data:', error);
            return false;
        }
    }
    static async retrieve(key, storeName = 'hive-offline') {
        try {
            const db = await openDB(storeName);
            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            return new Promise((resolve, reject) => {
                const request = store.get(key);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result?.data);
            });
        }
        catch (error) {
            console.error('Failed to retrieve offline data:', error);
            return null;
        }
    }
    static async remove(key, storeName = 'hive-offline') {
        try {
            const db = await openDB(storeName);
            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            await store.delete(key);
            return true;
        }
        catch (error) {
            console.error('Failed to remove offline data:', error);
            return false;
        }
    }
}
// Helper function for IndexedDB
function openDB(dbName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(dbName)) {
                db.createObjectStore(dbName, { keyPath: 'id' });
            }
        };
    });
}
// Export singleton instance
export const mobileServiceWorker = MobileServiceWorker.getInstance();
//# sourceMappingURL=mobile-service-worker.js.map