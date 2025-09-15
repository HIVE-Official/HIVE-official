import { useState, useEffect } from 'react';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';
import { logger } from '@/lib/utils/structured-logger';

export interface SpaceTool {
  deploymentId: string;
  toolId: string;
  name: string;
  description: string;
  category: string;
  version: string;
  status: string;
  configuration: any;
  permissions: {
    canEdit: string[];
    canView: string[];
    isPublic: boolean;
  };
  isShared: boolean;
  deployer: {
    id: string;
    name: string;
    avatar: string | null;
  } | null;
  deployedAt: string;
  lastUsed: string | null;
  usageCount: number;
  originalTool: {
    averageRating: number;
    ratingCount: number;
    totalDeployments: number;
    isVerified: boolean;
    creatorId: string;
  };
}

interface UseSpaceToolsResult {
  tools: SpaceTool[];
  loading: boolean;
  error: Error | null;
  installTool: (toolId: string, configuration?: any) => Promise<void>;
  uninstallTool: (deploymentId: string) => Promise<void>;
  updateToolConfig: (deploymentId: string, configuration: any) => Promise<void>;
  refresh: () => void;
}

export function useSpaceTools(
  spaceId: string | undefined,
  enabled: boolean = true
): UseSpaceToolsResult {
  const [tools, setTools] = useState<SpaceTool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTools = async () => {
    if (!spaceId || !enabled) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await authenticatedFetch(
        `/api/spaces/${spaceId}/tools?status=active&sortBy=deployments`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tools: ${response.statusText}`);
      }

      const data = await response.json();
      setTools(data.tools || []);

      logger.info('Fetched space tools', { 
        spaceId,
        count: data.tools?.length || 0 
      });
    } catch (err) {
      logger.error('Error fetching space tools', { 
        error: err, 
        spaceId 
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
      
      // Set default empty array on error
      setTools([]);
    } finally {
      setLoading(false);
    }
  };

  // Install a new tool in the space
  const installTool = async (toolId: string, configuration?: any): Promise<void> => {
    if (!spaceId) {
      throw new Error('Space ID is required');
    }

    try {
      setError(null);

      const response = await authenticatedFetch(`/api/spaces/${spaceId}/tools`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolId,
          configuration: configuration || {},
          isShared: true,
          permissions: {
            canEdit: [],
            canView: [],
            isPublic: true
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to install tool: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Add the new tool to the list
      setTools(prev => [...prev, data.deployment]);

      logger.info('Successfully installed tool', { 
        spaceId,
        toolId 
      });
    } catch (err) {
      logger.error('Error installing tool', { 
        error: err, 
        spaceId,
        toolId 
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  // Uninstall a tool from the space
  const uninstallTool = async (deploymentId: string): Promise<void> => {
    if (!spaceId) {
      throw new Error('Space ID is required');
    }

    try {
      setError(null);

      const response = await authenticatedFetch(`/api/spaces/${spaceId}/tools/${deploymentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to uninstall tool: ${response.statusText}`);
      }

      // Remove the tool from the list
      setTools(prev => prev.filter(t => t.deploymentId !== deploymentId));

      logger.info('Successfully uninstalled tool', { 
        spaceId,
        deploymentId 
      });
    } catch (err) {
      logger.error('Error uninstalling tool', { 
        error: err, 
        spaceId,
        deploymentId 
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  // Update tool configuration
  const updateToolConfig = async (deploymentId: string, configuration: any): Promise<void> => {
    if (!spaceId) {
      throw new Error('Space ID is required');
    }

    try {
      setError(null);

      const response = await authenticatedFetch(`/api/spaces/${spaceId}/tools/${deploymentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ configuration }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update tool: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Update the tool in the list
      setTools(prev => prev.map(t => 
        t.deploymentId === deploymentId 
          ? { ...t, configuration: data.deployment.configuration }
          : t
      ));

      logger.info('Successfully updated tool configuration', { 
        spaceId,
        deploymentId 
      });
    } catch (err) {
      logger.error('Error updating tool configuration', { 
        error: err, 
        spaceId,
        deploymentId 
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  useEffect(() => {
    fetchTools();
    
    // Refresh tools every 30 seconds if enabled
    if (enabled) {
      const interval = setInterval(fetchTools, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [spaceId, enabled]);

  return {
    tools,
    loading,
    error,
    installTool,
    uninstallTool,
    updateToolConfig,
    refresh: fetchTools
  };
}

// Helper function to get tool icon
export function getToolIcon(category: string): string {
  const icons: Record<string, string> = {
    study: '📚',
    social: '👥',
    productivity: '⚡',
    coordination: '🎯',
    analytics: '📊',
    communication: '💬',
    resources: '📁',
    fun: '🎮',
    other: '🔧'
  };
  
  return icons[category] || '🔧';
}

// Helper function to get tool status color
export function getToolStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'text-green-400';
    case 'inactive':
      return 'text-yellow-400';
    case 'error':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
}