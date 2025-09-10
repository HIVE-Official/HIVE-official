// Firebase messaging service worker for push notifications
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Firebase configuration - these will be replaced at build time
// or you can hardcode your actual values here
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDQjy0ECi6IGhCIKX7Ln1uF_HLJxvVwQ14",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "hive-staging-demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hive-staging-demo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "hive-staging-demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1019682840821",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1019682840821:web:9bc5c2d4e5ab15784a1c78"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message received:', payload);
  
  const notificationTitle = payload.notification?.title || 'HIVE Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification',
    icon: payload.notification?.icon || '/hive-logo-192.png',
    badge: '/hive-badge-72.png',
    image: payload.notification?.image,
    data: payload.data || {},
    tag: payload.data?.type || 'default',
    requireInteraction: false,
    vibrate: [200, 100, 200],
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/icons/view-icon.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/dismiss-icon.png'
      }
    ]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification clicked:', event);
  
  event.notification.close();
  
  // Handle different actions
  if (event.action === 'dismiss') {
    return;
  }
  
  // Default action or 'view' action
  const urlToOpen = event.notification.data.url || '/dashboard';
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      // If HIVE is already open, focus it
      for (const client of clientList) {
        if (client.url.includes('hive') && 'focus' in client) {
          client.postMessage({
            type: 'notification-click',
            data: event.notification.data
          });
          return client.focus();
        }
      }
      
      // Otherwise, open new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Handle push subscription changes
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('[firebase-messaging-sw.js] Push subscription changed:', event);
  
  event.waitUntil(
    // Resubscribe to push notifications
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_KEY || 'BKagOny0KF_2pCJQ3m-Tk8F8Er6PzC9kV-SAFr8cc8E9ZClvI8x_JO7bnmvJ7VJ8YF0PqC5b8Gz9gY0QIeJBEEU'
    }).then((newSubscription) => {
      // Send new subscription to server
      return fetch('/api/notifications/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscription: newSubscription
        })
      });
    })
  );
});

// Cache management for offline support
self.addEventListener('install', (event) => {
  console.log('[firebase-messaging-sw.js] Service Worker installing');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[firebase-messaging-sw.js] Service Worker activating');
  event.waitUntil(clients.claim());
});