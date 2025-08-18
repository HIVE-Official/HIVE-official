/**
 * Mobile Service Worker Utilities
 * Offline functionality and caching strategies for mobile optimization
 */
export declare class MobileServiceWorker {
    private static instance;
    private registration;
    private isOnline;
    static getInstance(): MobileServiceWorker;
    constructor();
    register(swPath?: string): Promise<boolean>;
    unregister(): Promise<boolean>;
    get isRegistered(): boolean;
    get networkStatus(): 'online' | 'offline';
    cacheResource(url: string, cacheName?: string): Promise<boolean>;
    getCachedResource(url: string): Promise<Response | undefined>;
    clearCache(cacheName?: string): Promise<boolean>;
    queueBackgroundSync(tag: string, data?: any): Promise<boolean>;
    subscribeToPush(): Promise<PushSubscription | null>;
    private syncWhenOnline;
    private notifyUpdate;
    private urlBase64ToUint8Array;
    private openIndexedDB;
    private storeData;
    private getAllPendingSync;
    private processSyncItem;
    private syncFeedPost;
    private syncSpaceAction;
    private syncToolSave;
}
export declare function useServiceWorker(swPath?: string): {
    isRegistered: boolean;
    isOnline: boolean;
    networkStatus: string;
    updateAvailable: boolean;
    serviceWorker: MobileServiceWorker;
};
export declare class CacheStrategies {
    static cacheFirst(request: Request, cacheName?: string): Promise<Response>;
    static networkFirst(request: Request, cacheName?: string): Promise<Response>;
    static staleWhileRevalidate(request: Request, cacheName?: string): Promise<Response>;
}
export declare class OfflineStorage {
    static store(key: string, data: any, storeName?: string): Promise<boolean>;
    static retrieve(key: string, storeName?: string): Promise<any>;
    static remove(key: string, storeName?: string): Promise<boolean>;
}
export declare const mobileServiceWorker: MobileServiceWorker;
//# sourceMappingURL=mobile-service-worker.d.ts.map