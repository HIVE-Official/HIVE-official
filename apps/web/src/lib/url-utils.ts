/**
 * URL Utilities - Dynamic URL generation for all environments
 * Never hardcode ports - always use environment-aware URL generation
 */

/**
 * Get the base URL for the current environment
 * Works in both server and client contexts
 */
export function getBaseUrl(): string {
  // Server-side detection
  if (typeof window === 'undefined') {
    // Check for explicit environment variable first
    if (process.env.NEXT_PUBLIC_APP_URL) {
      return process.env.NEXT_PUBLIC_APP_URL;
    }
    
    // Production environments
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    
    if (process.env.VERCEL_BRANCH_URL) {
      return `https://${process.env.VERCEL_BRANCH_URL}`;
    }
    
    // Development fallback - let client handle it
    return 'http://localhost:3000';
  }
  
  // Client-side detection
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    // Build URL with current port
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  }
  
  return 'http://localhost:3000';
}

/**
 * Get the API base URL (for API calls)
 */
export function getApiBaseUrl(): string {
  return `${getBaseUrl()}/api`;
}

/**
 * Get the NextAuth URL (for authentication redirects)
 */
export function getNextAuthUrl(): string {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  return getBaseUrl();
}

/**
 * Build a complete URL from a path
 */
export function buildUrl(path: string): string {
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Build an API URL from a path
 */
export function buildApiUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${getApiBaseUrl()}/${cleanPath}`;
}

/**
 * Get the current environment name
 */
export function getEnvironmentName(): string {
  if (typeof window !== 'undefined') {
    // Client-side detection
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'development';
    }
    if (hostname.includes('vercel.app') && !hostname.includes('hive-')) {
      return 'preview';
    }
    return 'production';
  }
  
  // Server-side detection
  if (process.env.VERCEL_ENV === 'production') return 'production';
  if (process.env.VERCEL_ENV === 'preview') return 'preview'; 
  if (process.env.NODE_ENV === 'development') return 'development';
  return 'production';
}

/**
 * Check if we're in development
 */
export function isDevelopment(): boolean {
  return getEnvironmentName() === 'development';
}

/**
 * Log current environment info (development only)
 */
export function logEnvironmentInfo() {
  if (isDevelopment()) {
    console.log('🌍 Environment Info:', {
      name: getEnvironmentName(),
      baseUrl: getBaseUrl(),
      apiUrl: getApiBaseUrl(),
      nextAuthUrl: getNextAuthUrl(),
    });
  }
}