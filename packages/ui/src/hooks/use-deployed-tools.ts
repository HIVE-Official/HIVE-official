/**
 * Hook for fetching deployed tools for a space
 */
import { useState, useEffect } from 'react';

export interface DeployedTool {
  id: string;
  deploymentId: string;
  toolId: string;
  name: string;
  description: string;
  type: string;
  surface: string;
  createdBy: string;
  deployedBy: string;
  deployedAt: string;
  usageCount: number;
  lastUsed: Date | null;
  permissions: {
    canInteract: boolean;
    canView: boolean;
    canEdit: boolean;
    allowedRoles?: string[];
  };
  settings: {
    showInDirectory: boolean;
    allowSharing: boolean;
    collectAnalytics: boolean;
    notifyOnInteraction: boolean;
  };
  position: number;
  toolData: {
    elements: any[];
    currentVersion: string;
    status: string;
  };
}

export interface DeployedToolsResponse {
  summary: {
    availableTools: number;
    recentlyUsed: number;
    totalUsage: number;
  };
  available: DeployedTool[];
}

export function useDeployedTools(spaceId: string | null) {
  const [tools, setTools] = useState<DeployedTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!spaceId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchDeployedTools = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch widget data which includes deployed tools
        const response = await fetch(`/api/spaces/${spaceId}/widgets`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch deployed tools: ${response.status}`);
        }

        const data = await response.json();
        
        if (isMounted) {
          // Extract tools from widget data
          const toolsData = data.widgets?.tools;
          if (toolsData && toolsData.available) {
            setTools(toolsData.available);
          } else {
            setTools([]);
          }
        }
      } catch (err) {
        console.error('Error fetching deployed tools:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch deployed tools');
          setTools([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDeployedTools();

    return () => {
      isMounted = false;
    };
  }, [spaceId]);

  return { tools, loading, error };
}