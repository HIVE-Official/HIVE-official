/**
 * Mobile Native Features Integration
 * Web API integrations for native mobile functionality
 */
export async function shareContent(data) {
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
            const shareText = encodeURIComponent(data.text || '');
            const shareUrl = encodeURIComponent(data.url || '');
            const shareTitle = encodeURIComponent(data.title || 'Check this out!');
            // Try to open share dialog on mobile
            if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                window.open(`https://m.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
                return true;
            }
        }
        return false;
    }
    catch (error) {
        console.error('Error sharing content:', error);
        return false;
    }
}
export async function capturePhoto(options = {}) {
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
            return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], `photo-${Date.now()}.jpg`, {
                            type: 'image/jpeg'
                        });
                        resolve([file]);
                    }
                    else {
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
    }
    catch (error) {
        console.error('Error capturing photo:', error);
        throw error;
    }
}
export function selectFiles(options = {}) {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = options.accept || '*/*';
        input.multiple = options.multiple || false;
        if (options.capture) {
            input.capture = options.capture;
        }
        input.onchange = (event) => {
            const files = event.target.files;
            resolve(files ? Array.from(files) : []);
        };
        input.oncancel = () => resolve([]);
        input.onerror = () => reject(new Error('File selection failed'));
        // Trigger file picker
        input.click();
    });
}
export async function getCurrentLocation(options = {}) {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported'));
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude || undefined,
                altitudeAccuracy: position.coords.altitudeAccuracy || undefined,
                heading: position.coords.heading || undefined,
                speed: position.coords.speed || undefined
            });
        }, (error) => {
            reject(new Error(`Geolocation error: ${error.message}`));
        }, {
            enableHighAccuracy: options.enableHighAccuracy || true,
            timeout: options.timeout || 10000,
            maximumAge: options.maximumAge || 300000
        });
    });
}
// Device vibration
export function vibrate(pattern) {
    if (navigator.vibrate) {
        navigator.vibrate(pattern);
        return true;
    }
    return false;
}
// Screen wake lock (keep screen on)
export class WakeLock {
    constructor() {
        this.wakeLock = null;
    }
    async acquire() {
        try {
            if ('wakeLock' in navigator) {
                this.wakeLock = await navigator.wakeLock.request('screen');
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Wake lock failed:', error);
            return false;
        }
    }
    async release() {
        if (this.wakeLock) {
            await this.wakeLock.release();
            this.wakeLock = null;
        }
    }
    get isActive() {
        return this.wakeLock && !this.wakeLock.released;
    }
}
export function watchOrientation(callback) {
    const handleOrientation = (event) => {
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
    return () => { };
}
export function getNetworkInfo() {
    const connection = navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
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
export async function getBatteryInfo() {
    try {
        if ('getBattery' in navigator) {
            const battery = await navigator.getBattery();
            return {
                level: battery.level,
                charging: battery.charging,
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime
            };
        }
        return null;
    }
    catch (error) {
        console.error('Battery API not available:', error);
        return null;
    }
}
// Install prompt (PWA)
export class InstallPrompt {
    constructor() {
        this.deferredPrompt = null;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
        });
    }
    get canInstall() {
        return this.deferredPrompt !== null;
    }
    async prompt() {
        if (!this.deferredPrompt)
            return false;
        try {
            this.deferredPrompt.prompt();
            const choiceResult = await this.deferredPrompt.userChoice;
            this.deferredPrompt = null;
            return choiceResult.outcome === 'accepted';
        }
        catch (error) {
            console.error('Install prompt failed:', error);
            return false;
        }
    }
}
export async function selectContacts() {
    try {
        if ('contacts' in navigator) {
            const contacts = await navigator.contacts.select(['name', 'email', 'tel'], { multiple: true });
            return contacts.map((contact) => ({
                name: contact.name?.[0] || '',
                email: contact.email?.[0] || undefined,
                tel: contact.tel?.[0] || undefined
            }));
        }
        return [];
    }
    catch (error) {
        console.error('Contact picker not available:', error);
        return [];
    }
}
// Device memory information
export function getDeviceMemory() {
    return navigator.deviceMemory || null;
}
// Hardware concurrency (CPU cores)
export function getHardwareConcurrency() {
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
//# sourceMappingURL=mobile-native-features.js.map