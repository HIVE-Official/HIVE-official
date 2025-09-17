/**
 * HIVE Service Worker
 * Campus-optimized caching for reliable connectivity
 */

const CACHE_NAME = 'hive-ub-v1';
const STATIC_CACHE = 'hive-static-v1'; 
const API_CACHE = 'hive-api-v1';

// Assets to cache immediately for campus WiFi reliability
const STATIC_ASSETS = [
  '/',
  '/profile', 
  '/spaces',
  '/feed',
  '/tools',
  '/manifest.json',
  // Core UI assets that students need offline
  '/icon-192.png',
  '/icon-512.png'
];

// API endpoints to cache for campus functionality
const API_ENDPOINTS = [
  '/api/profile/me',
  '/api/spaces/my',
  '/api/feed'
];

// Campus-specific caching strategy
const CACHE_STRATEGIES = {
  // Static assets - cache first for speed
  static: {
    cacheName: STATIC_CACHE,
    strategy: 'CacheFirst'
  },
  // API data - network first, fallback to cache for reliability  
  api: {
    cacheName: API_CACHE,
    strategy: 'NetworkFirst',
    maxAge: 5 * 60 * 1000 // 5 minutes for campus data
  },
  // Images - cache with fallback for campus bandwidth
  images: {
    strategy: 'CacheFirst',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
};

self.addEventListener('install', (event) => {
  console.log('HIVE Service Worker: Installing...');
  
  event.waitUntil(
    (async () => {
      // Cache static assets for campus reliability
      const staticCache = await caches.open(STATIC_CACHE);
      await staticCache.addAll(STATIC_ASSETS);
      
      console.log('HIVE Service Worker: Static assets cached for campus use');
      
      // Skip waiting to activate immediately for campus students
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  console.log('HIVE Service Worker: Activating...');
  
  event.waitUntil(
    (async () => {
      // Clean up old caches for campus storage efficiency
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(cacheName => 
            cacheName.startsWith('hive-') && 
            ![CACHE_NAME, STATIC_CACHE, API_CACHE].includes(cacheName)
          )
          .map(cacheName => caches.delete(cacheName))
      );
      
      // Take control of all campus student clients immediately
      await clients.claim();
      console.log('HIVE Service Worker: Active for UB students');
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Only handle same-origin requests for campus security
  if (url.origin !== location.origin) {
    return;
  }
  
  // Determine caching strategy based on campus usage patterns
  if (request.method !== 'GET') {
    return; // Only cache GET requests for campus efficiency
  }
  
  // API requests - Network first for campus data freshness
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }
  
  // Static assets - Cache first for campus speed  
  if (isStaticAsset(url.pathname)) {
    event.respondWith(handleStaticRequest(request));
    return;
  }
  
  // Images - Cache with fallback for campus bandwidth
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
    return;
  }
  
  // Default: Network first for campus connectivity
  event.respondWith(handleDefaultRequest(request));
});

// Campus-optimized API request handling
async function handleApiRequest(request) {
  const cache = await caches.open(API_CACHE);
  
  try {
    // Try network first for fresh campus data
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses for campus offline use
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Campus WiFi issues - fall back to cache
    console.log('HIVE SW: Network failed, using cache for campus offline');
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for campus students
    return new Response(
      JSON.stringify({ 
        error: 'Campus connection unavailable',
        offline: true,
        message: 'HIVE is working offline. Reconnect to campus WiFi for latest updates.'
      }),
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Static asset handling for campus speed
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  
  // Check cache first for campus performance
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Fetch and cache for campus efficiency
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('HIVE SW: Static asset unavailable for campus use');
    return new Response('Campus connection required', { status: 503 });
  }
}

// Image handling optimized for campus bandwidth
async function handleImageRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  
  // Check cache first to save campus bandwidth
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return placeholder for campus offline mode
    return new Response('', { status: 503 });
  }
}

// Default request handling for campus reliability
async function handleDefaultRequest(request) {
  try {
    return await fetch(request);
  } catch (error) {
    // Campus offline fallback
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for campus students
    return new Response('HIVE offline mode - Connect to campus WiFi', { 
      status: 503 
    });
  }
}

// Campus utility functions
function isStaticAsset(pathname) {
  return pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2)$/);
}

function isImageRequest(request) {
  return request.destination === 'image';
}

// Campus background sync for when connectivity returns
self.addEventListener('sync', (event) => {
  if (event.tag === 'campus-sync') {
    event.waitUntil(syncCampusData());
  }
});

async function syncCampusData() {
  console.log('HIVE SW: Syncing campus data after connectivity restored');
  // Implement campus-specific background sync here
}