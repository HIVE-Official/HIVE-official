/**
 * Mobile Native Features Integration
 * Web API integrations for native mobile functionality
 */
export interface ShareData {
    title?: string;
    text?: string;
    url?: string;
    files?: File[];
}
export declare function shareContent(data: ShareData): Promise<boolean>;
export interface CameraOptions {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
    facingMode?: 'user' | 'environment';
    allowMultiple?: boolean;
}
export declare function capturePhoto(options?: CameraOptions): Promise<File[]>;
export interface FileSelectOptions {
    accept?: string;
    multiple?: boolean;
    capture?: 'user' | 'environment';
}
export declare function selectFiles(options?: FileSelectOptions): Promise<File[]>;
export interface LocationData {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude?: number;
    altitudeAccuracy?: number;
    heading?: number;
    speed?: number;
}
export interface LocationOptions {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
}
export declare function getCurrentLocation(options?: LocationOptions): Promise<LocationData>;
export declare function vibrate(pattern: number | number[]): boolean;
export declare class WakeLock {
    private wakeLock;
    acquire(): Promise<boolean>;
    release(): Promise<void>;
    get isActive(): boolean;
}
export interface OrientationData {
    alpha: number;
    beta: number;
    gamma: number;
}
export declare function watchOrientation(callback: (orientation: OrientationData) => void): () => void;
export interface NetworkInfo {
    type: 'wifi' | 'cellular' | 'bluetooth' | 'ethernet' | 'other' | 'unknown';
    downlink: number;
    effectiveType: '2g' | '3g' | '4g' | 'slow-2g';
    rtt: number;
}
export declare function getNetworkInfo(): NetworkInfo | null;
export interface BatteryInfo {
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
}
export declare function getBatteryInfo(): Promise<BatteryInfo | null>;
export declare class InstallPrompt {
    private deferredPrompt;
    constructor();
    get canInstall(): boolean;
    prompt(): Promise<boolean>;
}
export interface ContactInfo {
    name: string;
    email?: string;
    tel?: string;
}
export declare function selectContacts(): Promise<ContactInfo[]>;
export declare function getDeviceMemory(): number | null;
export declare function getHardwareConcurrency(): number;
export declare const MobileNative: {
    share: typeof shareContent;
    capturePhoto: typeof capturePhoto;
    selectFiles: typeof selectFiles;
    getCurrentLocation: typeof getCurrentLocation;
    vibrate: typeof vibrate;
    WakeLock: typeof WakeLock;
    watchOrientation: typeof watchOrientation;
    getNetworkInfo: typeof getNetworkInfo;
    getBatteryInfo: typeof getBatteryInfo;
    InstallPrompt: typeof InstallPrompt;
    selectContacts: typeof selectContacts;
    getDeviceMemory: typeof getDeviceMemory;
    getHardwareConcurrency: typeof getHardwareConcurrency;
};
//# sourceMappingURL=mobile-native-features.d.ts.map