"use client";

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';

import { Tool, ToolVersion } from '@hive/core/domain/tools';
import { Card, Button, Badge, Input } from '@hive/ui';
import { 
  GitBranch, 
  Save, 
  Clock, 
  RefreshCw, 
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Calendar,
  Tag,
  GitCommit,
  GitMerge,
  ChevronDown,
  ChevronRight,
  Download,
  Upload,
  Copy
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface VersionControlProps {
  tool: Tool;
  currentVersion?: ToolVersion;
  onSaveVersion?: (version: ToolVersion) => Promise<void>;
  onRestoreVersion?: (versionId: string) => Promise<void>;
  onPublishVersion?: (versionId: string) => Promise<void>;
  className?: string;
}

interface VersionHistoryItem {
  version: ToolVersion;
  isExpanded: boolean;
}

export function VersionControl({
  tool,
  currentVersion,
  onSaveVersion,
  onRestoreVersion,
  onPublishVersion,
  className = ''
}: VersionControlProps) {
  const [versions, setVersions] = useState<ToolVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingVersion, setSavingVersion] = useState(false);
  const [versionMessage, setVersionMessage] = useState('');
  const [versionTag, setVersionTag] = useState('');
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set());
  const [compareMode, setCompareMode] = useState(false);
  const [selectedVersions, setSelectedVersions] = useState<Set<string>>(new Set());
  
  // Fetch version history
  useEffect(() => {
    fetchVersionHistory();
  }, [tool.id]);
  
  const fetchVersionHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tools/${tool.id}/versions`);
      const data = await response.json();
      setVersions(data.versions || []);
    } catch (error) {
      logger.error('Error fetching version history:', { error: String(error) });
    } finally {
      setLoading(false);
    }
  };
  
  // Save new version
  const handleSaveVersion = async () => {
    if (!onSaveVersion || !versionMessage) return;
    
    setSavingVersion(true);
    try {
      const newVersion: ToolVersion = {
        id: `v${Date.now()}`,
        toolId: tool.id,
        version: getNextVersionNumber(),
        composition: tool.composition,
        config: tool.config,
        interface: tool.interface,
        message: versionMessage,
        tag: versionTag || undefined,
        author: {
          id: 'current-user',
          name: 'You'
        },
        createdAt: new Date(),
        changes: detectChanges()
      };
      
      await onSaveVersion(newVersion);
      setVersions([newVersion, ...versions]);
      setVersionMessage('');
      setVersionTag('');
    } catch (error) {
      logger.error('Error saving version:', { error: String(error) });
    } finally {
      setSavingVersion(false);
    }
  };
  
  // Get next version number
  const getNextVersionNumber = (): string => {
    if (versions.length === 0) return '1.0.0';
    
    const latest = versions[0].version;
    const [major, minor, patch] = latest.split('.').map(Number);
    
    // Auto-increment based on changes
    const changes = detectChanges();
    if (changes.breaking) {
      return `${major + 1}.0.0`;
    } else if (changes.features) {
      return `${major}.${minor + 1}.0`;
    } else {
      return `${major}.${minor}.${patch + 1}`;
    }
  };
  
  // Detect changes between versions
  const detectChanges = () => {
    if (!currentVersion) {
      return { breaking: false, features: true, fixes: false };
    }
    
    // Compare compositions
    const elementCountChanged = tool.composition.elements.length !== 
                                currentVersion.composition.elements.length;
    
    return {
      breaking: false, // Would need deeper analysis
      features: elementCountChanged,
      fixes: !elementCountChanged
    };
  };
  
  // Toggle version expansion
  const toggleVersionExpansion = (versionId: string) => {
    setExpandedVersions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(versionId)) {
        newSet.delete(versionId);
      } else {
        newSet.add(versionId);
      }
      return newSet;
    });
  };
  
  // Toggle version selection for comparison
  const toggleVersionSelection = (versionId: string) => {
    setSelectedVersions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(versionId)) {
        newSet.delete(versionId);
      } else {
        if (newSet.size >= 2) {
          // Only allow 2 versions for comparison
          return prev;
        }
        newSet.add(versionId);
      }
      return newSet;
    });
  };
  
  // Render version item
  const renderVersionItem = (version: ToolVersion, index: number) => {
    const isExpanded = expandedVersions.has(version.id);
    const isSelected = selectedVersions.has(version.id);
    const isCurrent = currentVersion?.id === version.id;
    
    return (
      <Card key={version.id} className={`${isCurrent ? 'border-blue-500' : ''}`}>
        <div className="p-4">
          {/* Version Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleVersionExpansion(version.id)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {compareMode && (
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleVersionSelection(version.id)}
                  className="mr-2"
                />
              )}
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">v{version.version}</span>
                  {isCurrent && (
                    <Badge variant="default" className="text-xs">Current</Badge>
                  )}
                  {version.tag && (
                    <Badge variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {version.tag}
                    </Badge>
                  )}
                  {version.published && (
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Published
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {version.message}
                </p>
              </div>
            </div>
            
            {/* Version Actions */}
            <div className="flex gap-1">
              {!isCurrent && onRestoreVersion && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRestoreVersion(version.id)}
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
              )}
              {!version.published && onPublishVersion && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onPublishVersion(version.id)}
                >
                  <Upload className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Version Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {version.author?.name || 'Unknown'}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(version.createdAt), { addSuffix: true })}
            </div>
            <div className="flex items-center gap-1">
              <GitCommit className="h-3 w-3" />
              {version.composition.elements.length} elements
            </div>
          </div>
          
          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t space-y-3">
              {/* Changes */}
              {version.changes && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Changes</h4>
                  <div className="space-y-1">
                    {version.changes.breaking && (
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <AlertCircle className="h-3 w-3" />
                        <span className="text-xs">Breaking changes</span>
                      </div>
                    )}
                    {version.changes.features && (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle className="h-3 w-3" />
                        <span className="text-xs">New features</span>
                      </div>
                    )}
                    {version.changes.fixes && (
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <GitMerge className="h-3 w-3" />
                        <span className="text-xs">Bug fixes</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Composition Summary */}
              <div>
                <h4 className="text-sm font-medium mb-2">Composition</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Elements:</span>
                    <span className="ml-2 font-medium">
                      {version.composition.elements.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Connections:</span>
                    <span className="ml-2 font-medium">
                      {version.composition.connections?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="h-3 w-3 mr-1" />
                  Duplicate
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="h-3 w-3 mr-1" />
                  View Diff
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };
  
  return (
    <div className={`version-control ${className}`}>
      {/* Save New Version */}
      <Card className="mb-4">
        <div className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Save Version
          </h3>
          
          <div className="space-y-3">
            <div>
              <Input
                placeholder="Version message (e.g., 'Added user authentication')"
                value={versionMessage}
                onChange={(e) => setVersionMessage(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Tag (optional, e.g., 'beta')"
                value={versionTag}
                onChange={(e) => setVersionTag(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleSaveVersion}
                disabled={!versionMessage || savingVersion}
              >
                <Save className="h-4 w-4 mr-2" />
                {savingVersion ? 'Saving...' : 'Save Version'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Version History */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Version History
          </h3>
          
          <Button
            size="sm"
            variant={compareMode ? 'default' : 'outline'}
            onClick={() => {
              setCompareMode(!compareMode);
              setSelectedVersions(new Set());
            }}
          >
            Compare
          </Button>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        ) : versions.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            <GitCommit className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>No versions saved yet</p>
            <p className="text-sm mt-1">Save your first version to start tracking changes</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {compareMode && selectedVersions.size === 2 && (
              <Card className="p-3 bg-blue-50 dark:bg-blue-900/20 border-blue-500">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    {selectedVersions.size} versions selected for comparison
                  </p>
                  <Button size="sm">
                    View Comparison
                  </Button>
                </div>
              </Card>
            )}
            
            {versions.map((version, index) => renderVersionItem(version, index))}
          </div>
        )}
      </div>
    </div>
  );
}