/**
 * Temporary stub components for non-MVP features
 * These will be replaced with full implementations post-launch
 */

import React from 'react';

export const HiveModal = ({ children, ...props }: React.PropsWithChildren<any>) => {
  return <div {...props}>{children}</div>;
};

export const HiveModalContent = ({ children, ...props }: React.PropsWithChildren<any>) => {
  return <div {...props}>{children}</div>;
};

export const PageContainer = ({ children, ...props }: React.PropsWithChildren<any>) => {
  return <div className="min-h-screen bg-[var(--hive-background-primary)] p-4" {...props}>{children}</div>;
};
