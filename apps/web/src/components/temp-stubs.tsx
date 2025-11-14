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

export const Alert = ({ children, ...props }: React.PropsWithChildren<any>) => {
  return (
    <div role="alert" className="rounded-md border border-white/10 bg-white/5 p-3 text-sm" {...props}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, ...props }: React.PropsWithChildren<any>) => {
  return (
    <div className="text-xs opacity-80" {...props}>
      {children}
    </div>
  );
};

export const SchoolsPageHeader = ({ onComingSoonClick }: { onComingSoonClick?: () => void }) => {
  return (
    <header className="relative z-10 max-w-6xl mx-auto px-6 pt-10 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          HIVE Campus Network
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-white">
          Universities building with HIVE
        </h2>
      </div>
      <button
        type="button"
        onClick={onComingSoonClick}
        className="text-xs font-medium text-white/80 border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 transition"
      >
        See coming soon campuses
      </button>
    </header>
  );
};
