import React from 'react';

export interface LoadingOrchestratorProps {
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const LoadingOrchestrator: React.FC<LoadingOrchestratorProps> = ({ 
  isLoading = false, 
  children 
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return <>{children}</>;
};