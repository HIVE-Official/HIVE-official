declare global {
  interface Window {
    analyticsEvents: Array<{
      type: string;
      stepName?: string;
      properties?: Record<string, unknown>;
      timestamp?: number;
    }>;
  }
}

export {}; 