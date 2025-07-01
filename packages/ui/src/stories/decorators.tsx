import React from 'react';
import { ToastProvider } from '../components/toast-provider';

export const withProviders = (Story: React.ComponentType) => {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Story />
      </div>
    </ToastProvider>
  );
}; 