"use client";

import { useState, useEffect } from 'react';
import { renderElement } from '../tools/element-renderers';
import { HiveCard, HiveButton, Badge } from '@hive/ui';
import { Settings, Maximize2, Minimize2, RefreshCw } from 'lucide-react';
import type { SpaceTypeRules } from '@/lib/space-type-rules';
import {
  canUseToolInSpace,
  getToolPermissions,
  type UserPermissions,
  type ToolPermissions
} from '@/lib/permission-system';

interface SpaceToolRendererProps {
  tool: {
    id: string;
    toolId: string;
    name: string;
    description: string;
    category: string;
    status: string;
    icon?: string;
    position: 'inline' | 'contextual' | 'both';
    configuration?: any;
    permissions?: any;
    deployer?: any;
    deployedAt?: string;
    lastUsed?: string;
    usageCount?: number;
  };
  spaceId: string;
  userPermissions: UserPermissions;
  spaceRules: SpaceTypeRules | null;
  position: 'inline' | 'contextual';
}

export function SpaceToolRenderer({
  tool,
  spaceId,
  userPermissions,
  spaceRules,
  position
}: SpaceToolRendererProps) {
  const [toolState, setToolState] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(position === 'inline');
  const [error, setError] = useState<string | null>(null);

  // Check if user has permission to use this tool using unified permission system
  const canUseTool = () => {
    if (!spaceRules) return false;

    const toolPermissions = getToolPermissions(tool.category, {
      toolId: tool.toolId,
      requiredRole: tool.permissions?.isPublic === false ? 'moderator' : 'member'
    });

    const permission = canUseToolInSpace(
      userPermissions,
      spaceRules.name as any, // TODO: Fix type mapping
      spaceRules,
      toolPermissions
    );

    return permission.canUse;
  };

  const permissionResult = canUseTool();

  // Initialize tool state
  useEffect(() => {
    if (permissionResult) {
      initializeTool();
    }
  }, [tool.id, spaceId, permissionResult]);

  const initializeTool = async () => {
    try {
      setLoading(true);

      // Load tool data from API or initialize with defaults
      const initialState = {
        spaceId,
        toolId: tool.toolId,
        deploymentId: tool.id,
        config: tool.configuration || {},
        data: {},
        position,
        lastUsed: tool.lastUsed,
        usageCount: tool.usageCount || 0,
        status: tool.status
      };

      setToolState(initialState);
    } catch (err) {
      setError('Failed to initialize tool');
      console.error('Tool initialization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToolAction = (action: string, data?: any) => {
    console.log('Tool action:', action, data);

    // Handle common tool actions
    switch (action) {
      case 'refresh':
        initializeTool();
        break;
      case 'expand':
        setExpanded(true);
        break;
      case 'collapse':
        setExpanded(false);
        break;
      case 'configure':
        // Open tool configuration modal
        break;
      default:
        // Handle tool-specific actions
        setToolState(prev => ({
          ...prev,
          lastAction: { action, data, timestamp: Date.now() }
        }));
    }
  };

  const handleElementChange = (elementId: string, data: any) => {
    setToolState(prev => ({
      ...prev,
      elements: {
        ...prev.elements,
        [elementId]: data
      }
    }));
  };

  if (!permissionResult) {
    return (
      <div className="p-4 text-center text-gray-500 bg-gray-800/30 rounded-lg">
        <div className="text-sm">
          You don't have permission to use this tool
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 text-center">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-hive-gold" />
        <div className="text-sm text-gray-400">Loading {tool.name}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
        <div className="text-sm">{error}</div>
        <HiveButton
          variant="outline"
          size="sm"
          onClick={() => initializeTool()}
          className="mt-2 border-red-500/30 text-red-400"
        >
          Retry
        </HiveButton>
      </div>
    );
  }

  // Render tool based on position
  if (position === 'contextual') {
    return (
      <div className="space-y-3">
        {/* Contextual Tool Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{tool.icon || '🔧'}</span>
            <div>
              <h4 className="font-semibold text-white text-sm">{tool.name}</h4>
              <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                {tool.category}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {(userPermissions.role === 'admin' || userPermissions.role === 'owner') && (
              <HiveButton
                variant="ghost"
                size="sm"
                onClick={() => handleToolAction('configure')}
              >
                <Settings className="w-3 h-3" />
              </HiveButton>
            )}
            <HiveButton
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </HiveButton>
          </div>
        </div>

        {/* Contextual Tool Content */}
        {expanded && (
          <div className="space-y-2">
            {/* Show tool description and status */}
            <div className="text-xs text-gray-400">
              {tool.description}
            </div>
            {tool.status === 'active' ? (
              <div className="p-3 bg-gray-800/30 rounded text-center text-gray-300">
                <div className="text-2xl mb-2">{tool.icon || '🔧'}</div>
                <div className="text-sm">Tool ready for use</div>
                {tool.lastUsed && (
                  <div className="text-xs text-gray-500 mt-1">
                    Last used: {new Date(tool.lastUsed).toLocaleDateString()}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-center text-yellow-400">
                <div className="text-sm">Tool is being configured</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Inline tool rendering
  return (
    <div className="space-y-4">
      {/* Inline Tool Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{tool.icon || '🔧'}</span>
          <div>
            <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
            <p className="text-sm text-gray-400">
              {tool.description || `${tool.category} tool for this space`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-hive-gold/20 text-hive-gold border-hive-gold/30">
            {tool.category}
          </Badge>

          {(userPermissions.role === 'admin' || userPermissions.role === 'owner') && (
            <HiveButton
              variant="outline"
              size="sm"
              onClick={() => handleToolAction('configure')}
              className="border-gray-700 text-gray-300"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </HiveButton>
          )}

          <HiveButton
            variant="outline"
            size="sm"
            onClick={() => handleToolAction('refresh')}
            className="border-gray-700 text-gray-300"
          >
            <RefreshCw className="w-4 h-4" />
          </HiveButton>
        </div>
      </div>

      {/* Inline Tool Content */}
      <div className="grid grid-cols-1 gap-4">
        {tool.status === 'active' ? (
          <div className="bg-gray-800/30 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">{tool.icon || '🔧'}</div>
            <div className="text-lg font-medium text-white mb-2">{tool.name}</div>
            <div className="text-sm text-gray-400 mb-4">
              {tool.description}
            </div>

            {/* Tool Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-hive-gold">{tool.usageCount || 0}</div>
                <div className="text-xs text-gray-500">Uses</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">Active</div>
                <div className="text-xs text-gray-500">Status</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">
                  {tool.deployer?.name?.split(' ')[0] || 'Admin'}
                </div>
                <div className="text-xs text-gray-500">Deployed by</div>
              </div>
            </div>

            {tool.lastUsed && (
              <div className="text-xs text-gray-500">
                Last used: {new Date(tool.lastUsed).toLocaleDateString()}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-3">{tool.icon || '🔧'}</div>
            <div className="text-lg font-medium text-white mb-2">{tool.name}</div>
            <div className="text-sm">
              This tool is being configured for your space.
            </div>
            {(userPermissions.role === 'admin' || userPermissions.role === 'owner') && (
              <HiveButton
                variant="outline"
                size="sm"
                onClick={() => handleToolAction('configure')}
                className="mt-4 border-hive-gold/30 text-hive-gold"
              >
                Configure Tool
              </HiveButton>
            )}
          </div>
        )}
      </div>

      {/* Tool Actions Bar */}
      {tool.elements && tool.elements.length > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="text-xs text-gray-400">
            Last updated: {new Date(toolState.lastAction?.timestamp || Date.now()).toLocaleTimeString()}
          </div>

          <div className="flex items-center gap-2">
            {tool.config.actions?.map((action: any, index: number) => (
              <HiveButton
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleToolAction(action.id, action.data)}
                className="border-gray-700 text-gray-300 text-xs"
              >
                {action.label}
              </HiveButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}