// Global type declarations to fix no-undef errors

// Simple global type declarations for ESLint compatibility
declare global {
  interface Window {
    // Ensure Window interface is available
  }
  
  // Simple type declarations that work with ESLint
  var RequestInit: any;
  var HeadersInit: any;
  var NotificationPermission: any;
  var EventListener: any;
  var EventListenerObject: any;
  var EventListenerOrEventListenerObject: any;
}

export {};
