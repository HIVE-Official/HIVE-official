// Mock implementation of analytics functions for Storybook
export const captureError = (error: Error, metadata: any) => {
  console.log('[Storybook Mock] Error captured:', { error, metadata });
}; 