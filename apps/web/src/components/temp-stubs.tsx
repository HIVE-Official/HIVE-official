// Temporary stub components for components under development

import React from 'react';

export const TempSpaceCard = ({ space }: { space: any }) => (
  <div className="p-4 border rounded-lg">
    <h3 className="font-medium">{space.name}</h3>
    <p className="text-sm text-gray-600">{space.description}</p>
  </div>
);

export const TempEventCard = ({ event }: { event: any }) => (
  <div className="p-4 border rounded-lg">
    <h3 className="font-medium">{event.title}</h3>
    <p className="text-sm text-gray-600">{event.description}</p>
  </div>
);

export const TempToolCard = ({ tool }: { tool: any }) => (
  <div className="p-4 border rounded-lg">
    <h3 className="font-medium">{tool.name}</h3>
    <p className="text-sm text-gray-600">{tool.description}</p>
  </div>
);

// Loading components
export const LoadingSpinner = () => (
  <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-gray-600 rounded-full" />
);

export const LoadingSkeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// Empty state components
export const EmptyState = ({ 
  title, 
  description, 
  action 
}: { 
  title: string; 
  description: string; 
  action?: React.ReactNode; 
}) => (
  <div className="text-center py-8">
    <h3 className="font-medium text-gray-900">{title}</h3>
    <p className="text-gray-600 mt-1">{description}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>
);

// Additional UI components needed by the app
export const Modal = ({ children, isOpen, onClose }: { children: React.ReactNode; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-lg w-full" onClick={(e: any) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="container mx-auto px-4 py-6">{children}</div>
);

export const useUnifiedAuth = () => ({
  user: { id: 'temp-user', email: 'user@example.com' },
  isLoading: false,
  error: null
});

export const Display = ({ children }: { children: React.ReactNode }) => (
  <div className="text-2xl font-bold">{children}</div>
);

export const Heading = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-xl font-semibold">{children}</h1>
);

export const Typography = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base">{children}</p>
);

export const Button = ({ children, onClick, ...props }: any) => (
  <button 
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-lg shadow p-4">{children}</div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-2 py-1 text-xs bg-gray-200 rounded">{children}</span>
);

export default {
  TempSpaceCard,
  TempEventCard,
  TempToolCard,
  LoadingSpinner,
  LoadingSkeleton,
  EmptyState,
  Modal,
  PageContainer,
  useUnifiedAuth,
  Display,
  Heading,
  Typography,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge
};