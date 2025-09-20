/**
 * HIVE Tools Marketplace Stub
 * Temporary components for tools ecosystem
 */

import React from 'react';
import { HiveCard } from './hive-card';

export interface ToolMarketplaceProps {
  className?: string;
  children?: React.ReactNode
}

export const ToolMarketplace: React.FC<ToolMarketplaceProps> = ({ 
  className, 
  children 
}) => {
  return (
    <HiveCard className={className} variant="elevated">
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Tool Marketplace
        </h3>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Coming soon - Discover and install tools built by the HIVE community
        </p>
        {children}
      </div>
    </HiveCard>
  )
};

export interface LiveToolRuntimeProps {
  toolId?: string;
  className?: string;
  onToolLoad?: (toolId: string) => void
}

export const LiveToolRuntime: React.FC<LiveToolRuntimeProps> = ({ 
  toolId, 
  className, 
  onToolLoad 
}) => {
  React.useEffect(() => {
    if (toolId && onToolLoad) {
      onToolLoad(toolId)
    }
  }, [toolId, onToolLoad]);

  return (
    <HiveCard className={className} variant="elevated">
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Live Tool Runtime
        </h3>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          {toolId ? `Loading tool: ${toolId}` : 'Ready to execute HIVE tools'}
        </p>
      </div>
    </HiveCard>
  )
};