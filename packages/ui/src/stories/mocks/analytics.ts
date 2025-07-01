// Mock implementation of analytics functions for Storybook
export const captureError = (error: Error, metadata: Record<string, unknown>) => {
  console.warn('[Storybook Mock] Error captured:', { error, metadata });
};

// Mock analytics function for Storybook
export const mockAnalytics = {
  track: (event: string, properties?: Record<string, unknown>) => {
    console.warn('📊 Analytics:', event, properties);
  }
}; 