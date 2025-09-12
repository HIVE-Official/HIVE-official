"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Badge } from "@hive/ui";
import { PageContainer } from "@/components/layout/page-container";
import { 
  Play, 
  Settings, 
  BarChart3, 
  Share2, 
  Download,
  Star,
  Users,
  Clock,
  Code,
  Zap
} from 'lucide-react';
import { authenticatedFetch } from "@/lib/auth-utils";
import { useSession } from "@/hooks/use-session";
import { ErrorBoundary } from "@/components/error-boundary";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  creator: string;
  downloads: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  version: string;
  lastUpdated: string;
  isInstalled?: boolean;
  isRunning?: boolean;
}

export default function ToolPage() {
  const params = useParams();
  const router = useRouter();
  const { user: _user, isAuthenticated } = useSession();
  const toolId = params.toolId as string;
  
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const [_isRunning, _setIsRunning] = useState(false);

  const fetchTool = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authenticatedFetch(`/api/tools/${toolId}`);
      if (response.ok) {
        const data = await response.json();
        setTool(data.tool);
      } else {
        setError('Tool not found');
      }
    } catch (err) {
      setError('Failed to load tool');
    } finally {
      setLoading(false);
    }
  }, [toolId]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    fetchTool();
  }, [toolId, isAuthenticated, router, fetchTool]);

  const handleInstallTool = async () => {
    if (!tool) return;
    
    try {
      setIsInstalling(true);
      const response = await authenticatedFetch('/api/tools/install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: tool.id })
      });
      
      if (response.ok) {
        setTool({ ...tool, isInstalled: true });
      }
    } catch (err) {
      console.error('Failed to install tool:', err);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleRunTool = async () => {
    if (!tool) return;
    
    router.push(`/tools/${tool.id}/run`);
  };

  if (loading) {
    return (
      <PageContainer title="Loading Tool...">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </PageContainer>
    );
  }

  if (error || !tool) {
    return (
      <PageContainer title="Tool Not Found">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">Tool Not Found</h2>
          <p className="text-neutral-400 mb-4">{error || 'The requested tool could not be found.'}</p>
          <Button onClick={() => router.push('/tools')}>
            Back to Tools
          </Button>
        </Card>
      </PageContainer>
    );
  }

  return (
    <ErrorBoundary>
      <PageContainer title={tool.name}>
        <div className="space-y-6">
          {/* Tool Header */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Code className="h-8 w-8 text-blue-400" />
                  <h1 className="text-2xl font-bold text-[var(--hive-text-inverse)]">{tool.name}</h1>
                  <Badge variant="secondary">{tool.category}</Badge>
                </div>
                <p className="text-neutral-300 mb-4">{tool.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{tool.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-[var(--hive-gold)] text-[var(--hive-gold)]" />
                    <span>{tool.rating.toFixed(1)} ({tool.ratingCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Updated {new Date(tool.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 ml-6">
                {!tool.isInstalled ? (
                  <Button 
                    onClick={handleInstallTool}
                    disabled={isInstalling}
                    className="min-w-[120px]"
                  >
                    {isInstalling ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--hive-white)] mr-2"></div>
                        Installing...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Install Tool
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleRunTool}
                    className="min-w-[120px]"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Run Tool
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={() => router.push(`/tools/${tool.id}/analytics`)}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => router.push(`/tools/${tool.id}/settings`)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </Card>

          {/* Tool Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hover:bg-neutral-800 transition-colors cursor-pointer" 
                  onClick={() => router.push(`/tools/${tool.id}/run`)}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Zap className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--hive-text-inverse)]">Run Tool</h3>
                  <p className="text-sm text-neutral-400">Execute this tool</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:bg-neutral-800 transition-colors cursor-pointer"
                  onClick={() => router.push(`/tools/${tool.id}/analytics`)}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--hive-text-inverse)]">View Analytics</h3>
                  <p className="text-sm text-neutral-400">Usage insights</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:bg-neutral-800 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--hive-gold)]/20 rounded-lg">
                  <Share2 className="h-5 w-5 text-[var(--hive-gold)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--hive-text-inverse)]">Share Tool</h3>
                  <p className="text-sm text-neutral-400">Share with others</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tool Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">About {tool.name}</h2>
            <div className="space-y-4 text-neutral-300">
              <div>
                <h3 className="font-medium text-[var(--hive-text-inverse)] mb-2">Creator</h3>
                <p>{tool.creator}</p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--hive-text-inverse)] mb-2">Version</h3>
                <p>{tool.version}</p>
              </div>
              <div>
                <h3 className="font-medium text-[var(--hive-text-inverse)] mb-2">Category</h3>
                <p>{tool.category}</p>
              </div>
            </div>
          </Card>
        </div>
      </PageContainer>
    </ErrorBoundary>
  );
}