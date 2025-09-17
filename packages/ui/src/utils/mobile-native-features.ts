import { logger } from './logger';

/**
 * Mobile Native Features Integration
 * Web API integrations for native mobile functionality
 */

// Web Share API integration
export interface ShareData {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}

export async function shareContent(data: ShareData): Promise<boolean> {
  try {
    // Check if Web Share API is available
    if (navigator.share) {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url
      });
      return true;
    }
    
    // Fallback to clipboard if Web Share is not available
    if (data.url && navigator.clipboard) {
      await navigator.clipboard.writeText(data.url);
      return true;
    }
    
    // Final fallback - construct share URLs
    if (data.url || data.text) {
      const _shareText = encodeURIComponent(data.text || '');
      const shareUrl = encodeURIComponent(data.url || '');
      const _shareTitle = encodeURIComponent(data.title || 'Check this out!');
      
      // Try to open share dialog on mobile
      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.open(`https://m.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
        return true;
      }
    }
    
    return false;
  } catch (error) {
    logger.error('Error sharing content:', { error });
    return false;
  }
}

// Camera/file picker integration
export interface CameraOptions {
  quality?: number; // 0-1
  maxWidth?: number;
  maxHeight?: number;
  facingMode?: 'user' | 'environment';
  allowMultiple?: boolean;
}

export async function capturePhoto(options: CameraOptions = {}): Promise<File[]> {
  try {
    // Check if we can use the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: options.facingMode || 'environment',
          width: { ideal: options.maxWidth || 1920 },
          height: { ideal: options.maxHeight || 1080 }
        }
      });
      
      // Create a canvas to capture the photo
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();
      
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      // Stop the stream
      stream.getTracks().forEach(track => track.stop());
      
      // Convert canvas to file
      return new Promise((resolve: any) => {
        canvas.toBlob((blob: any) => {
          if (blob) {
            const file = new File([blob], `photo-${Date.now()}.jpg`, {
              type: 'image/jpeg'
            });
            resolve([file]);
          } else {
            resolve([]);
          }
        }, 'image/jpeg', options.quality || 0.8);
      });
    }
    
    // Fallback to file input
    return selectFiles({
      accept: 'image/*',
      capture: 'environment',
      multiple: options.allowMultiple
    });
  } catch (error) {
    logger.error('Error capturing photo:', { error });
    throw error;
  }
}

export interface FileSelectOptions {
  accept?: string;
  multiple?: boolean;
  capture?: 'user' | 'environment';
}

export function selectFiles(options: FileSelectOptions = {}): Promise<File[]> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = options.accept || '*/*';
    input.multiple = options.multiple || false;
    
    if (options.capture) {
      input.capture = options.capture;
    }
    
    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      resolve(files ? Array.from(files) : []);
    };
    
    input.oncancel = () => resolve([]);
    input.onerror = () => reject(new Error('File selection failed'));
    
    // Trigger file picker
    input.click();
  });
}

// Geolocation integration
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

export async function getCurrentLocation(options: LocationOptions = {}): Promise<LocationData> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position: any) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude || undefined,
          altitudeAccuracy: position.coords.altitudeAccuracy || undefined,
          heading: position.coords.heading || undefined,
          speed: position.coords.speed || undefined
        });
      },
      (error: unknown) => {
        reject(new Error(`Geolocation error: ${(error instanceof Error ? error.message : "Unknown error")}`));
      },
      {
        enableHighAccuracy: options.enableHighAccuracy || true,
        timeout: options.timeout || 10000,
        maximumAge: options.maximumAge || 300000
      }
    );
  });
}

// Device vibration
export function vibrate(pattern: number | number[]): boolean {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
    return true;
  }
  return false;
}

// Screen wake lock (keep screen on)
interface WakeLockSentinel {
  release(): Promise<void>;
  released: boolean;
}

export class WakeLock {
  private wakeLock: WakeLockSentinel | null = null;

  async acquire(): Promise<boolean> {
    try {
      if ('wakeLock' in navigator) {
        this.wakeLock = await (navigator as Navigator & { wakeLock: { request: (type: string) => Promise<WakeLockSentinel> } }).wakeLock.request('screen');
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Wake lock failed:', { error });
      return false;
    }
  }

  async release(): Promise<void> {
    if (this.wakeLock) {
      await this.wakeLock.release();
      this.wakeLock = null;
    }
  }

  get isActive(): boolean {
    return Boolean(this.wakeLock && !this.wakeLock.released);
  }
}

// Device orientation
export interface OrientationData {
  alpha: number; // Compass direction (0-360)
  beta: number;  // Tilt front/back (-180 to 180)
  gamma: number; // Tilt left/right (-90 to 90)
}

export function watchOrientation(
  callback: (orientation: OrientationData) => void
): () => void {
  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
      callback({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      });
    }
  };

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }
  
  return () => {};
}

// Network information
export interface NetworkInfo {
  type: 'wifi' | 'cellular' | 'bluetooth' | 'ethernet' | 'other' | 'unknown';
  downlink: number; // Mbps
  effectiveType: '2g' | '3g' | '4g' | 'slow-2g';
  rtt: number; // Round trip time in ms
}

export function getNetworkInfo(): NetworkInfo | null {
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;

  if (connection) {
    return {
      type: connection.type || 'unknown',
      downlink: connection.downlink || 0,
      effectiveType: connection.effectiveType || 'unknown',
      rtt: connection.rtt || 0
    };
  }
  
  return null;
}

// Battery status
export interface BatteryInfo {
  level: number; // 0-1
  charging: boolean;
  chargingTime: number; // seconds
  dischargingTime: number; // seconds
}

export async function getBatteryInfo(): Promise<BatteryInfo | null> {
  try {
    if ('getBattery' in navigator) {
      const battery = await (navigator as any).getBattery();
      return {
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime
      };
    }
    return null;
  } catch (error) {
    logger.error('Battery API not available:', { error });
    return null;
  }
}

// Install prompt (PWA)
export class InstallPrompt {
  private deferredPrompt: any = null;

  constructor() {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  }

  get canInstall(): boolean {
    return this.deferredPrompt !== null;
  }

  async prompt(): Promise<boolean> {
    if (!this.deferredPrompt) return false;

    try {
      this.deferredPrompt.prompt();
      const choiceResult = await this.deferredPrompt.userChoice;
      this.deferredPrompt = null;
      return choiceResult.outcome === 'accepted';
    } catch (error) {
      logger.error('Install prompt failed:', { error });
      return false;
    }
  }
}

// Contact picker
export interface ContactInfo {
  name: string;
  email?: string;
  tel?: string;
}

export async function selectContacts(): Promise<ContactInfo[]> {
  try {
    if ('contacts' in navigator) {
      const contacts = await (navigator as any).contacts.select(
        ['name', 'email', 'tel'], 
        { multiple: true }
      );
      return contacts.map((contact: any) => ({
        name: contact.name?.[0] || '',
        email: contact.email?.[0] || undefined,
        tel: contact.tel?.[0] || undefined
      }));
    }
    return [];
  } catch (error) {
    logger.error('Contact picker not available:', { error });
    return [];
  }
}

// Device memory information
export function getDeviceMemory(): number | null {
  return (navigator as any).deviceMemory || null;
}

// Hardware concurrency (CPU cores)
export function getHardwareConcurrency(): number {
  return navigator.hardwareConcurrency || 1;
}

// Export utilities for mobile optimization
export const MobileNative = {
  share: shareContent,
  capturePhoto,
  selectFiles,
  getCurrentLocation,
  vibrate,
  WakeLock,
  watchOrientation,
  getNetworkInfo,
  getBatteryInfo,
  InstallPrompt,
  selectContacts,
  getDeviceMemory,
  getHardwareConcurrency
};