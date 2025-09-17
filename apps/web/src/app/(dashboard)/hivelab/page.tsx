"use client";

import { useState, useCallback } from 'react';
import { logger } from '@/lib/logger';

import { HiveLabBuilder } from '@/components/hivelab/HiveLabBuilder';
import { useUnifiedAuth } from '@hive/ui';
import { authenticatedFetch } from '@/lib/api/api-client';
import { useToast } from '@/hooks/use-toast';

// Define a simple Tool type for the builder
interface Tool {
  id: string;
  name: string;
  description: string;
  elements?: any[];
  config?: any;
}
import { PageContainer } from "@hive/ui";
import { Zap, Wrench, Code, Palette, Database, BarChart3, Users, Rocket, ArrowLeft } from 'lucide-react';

export default function HiveLabPage() {
  const [mode, setMode] = useState<'overview' | 'visual' | 'template' | 'wizard'>('overview');
  const [, setCurrentTool] = useState<Tool | null>(null);
  const { user } = useUnifiedAuth();
  const { toast } = useToast();

  // Handle tool saving
  const handleToolSave = useCallback((tool: Tool) => {
    // Handle async operation without returning promise
    (async () => {
      try {
        if (!user) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to save tools",
            variant: "destructive"
          });
          return;
        }

        // Save to Firebase via API
        const response = await authenticatedFetch('/api/tools', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: tool.name,
            description: tool.description,
            elements: tool.elements || [],
            config: tool.config || {},
            status: 'draft',
            visibility: 'private',
            authorId: user.id
          })
        });

        if (!response.ok) {
          throw new Error('Failed to save tool');
        }

        const savedTool = await response.json();
        
        toast({
          title: "Tool Saved!",
          description: `"${tool.name}" has been saved to your tools library`,
          variant: "default"
        });
        
        setCurrentTool(savedTool);
      } catch (error) {
        logger.error('Failed to save tool:', { error: String(error) });
        toast({
          title: "Save Failed",
          description: "Unable to save tool. Please try again.",
          variant: "destructive"
        });
      }
    })();
  }, [user, toast]);

  // Handle tool preview
  const handleToolPreview = useCallback((_tool: Tool) => {
    
    // Preview is handled within the VisualToolBuilder
  }, []);

  // Handle mode selection
  const handleModeSelect = useCallback((selectedMode: 'visual' | 'template' | 'wizard') => {
    setMode(selectedMode);
  }, []);

  if (mode === 'visual') {
    return (
      <div className="h-screen flex flex-col">
        <div className="border-b border-[var(--hive-border-default)] bg-[var(--hive-background-primary)] px-4 py-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMode('overview')}
              className="flex items-center space-x-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to HiveLab</span>
            </button>
            <span className="text-[var(--hive-text-tertiary)]">|</span>
            <span className="text-sm text-[var(--hive-text-primary)]">Visual Builder</span>
          </div>
        </div>
        <div className="flex-1">
          <HiveLabBuilder
            userId={user?.id || 'anonymous'}
            onSave={async (tool) => {
              handleToolSave(tool);
            }}
            onClose={() => setMode('overview')}
          />
        </div>
      </div>
    );
  }
  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-[var(--hive-background-primary)]" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-2">
              HiveLAB
            </h1>
            <p className="text-lg text-[var(--hive-text-secondary)] max-w-2xl mx-auto">
              Visual tool composer for campus utilities. Build with elements, deploy to spaces, solve real problems collaboratively.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-2 text-sm text-[var(--hive-text-secondary)]">
                <Code className="w-4 h-4 text-blue-400" />
                <span>No code required</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[var(--hive-text-secondary)]">
                <Users className="w-4 h-4 text-green-400" />
                <span>Deploy to spaces</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[var(--hive-text-secondary)]">
                <Palette className="w-4 h-4 text-purple-400" />
                <span>Element composition</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Visual Builder - Element System */}
          <div 
            onClick={() => handleModeSelect('visual')}
            className="group p-6 rounded-xl border border-[var(--hive-border-default)] bg-[var(--hive-bg-secondary)] hover:border-yellow-400/50 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                <Palette className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">Element Builder</h3>
            </div>
            <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
              Compose campus tools from visual elements - inputs, displays, filters, actions
            </p>
            <div className="flex items-center space-x-2 mb-3">
              <div className="text-xs bg-blue-400/20 text-blue-400 px-2 py-1 rounded">8 Elements</div>
              <div className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded">Drag & Drop</div>
            </div>
            <div className="text-xs text-yellow-400 font-medium">🎭 Most Unique HIVE Feature</div>
          </div>

          {/* Code Editor */}
          <div className="group p-6 rounded-xl border border-[var(--hive-border-default)] bg-[var(--hive-bg-secondary)] hover:border-[var(--hive-border-hover)] transition-all duration-200 cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-400/20 flex items-center justify-center">
                <Code className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">Code Editor</h3>
            </div>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Advanced development environment for custom solutions
            </p>
          </div>

          {/* Database Tools */}
          <div className="group p-6 rounded-xl border border-[var(--hive-border-default)] bg-[var(--hive-bg-secondary)] hover:border-[var(--hive-border-hover)] transition-all duration-200 cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-400/20 flex items-center justify-center">
                <Database className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">Database Tools</h3>
            </div>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Manage data structures and integrations
            </p>
          </div>

          {/* Analytics */}
          <div className="group p-6 rounded-xl border border-[var(--hive-border-default)] bg-[var(--hive-bg-secondary)] hover:border-[var(--hive-border-hover)] transition-all duration-200 cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-400/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">Analytics</h3>
            </div>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Track usage and performance of your tools
            </p>
          </div>

          {/* Templates */}
          <div className="group p-6 rounded-xl border border-[var(--hive-border-default)] bg-[var(--hive-bg-secondary)] hover:border-[var(--hive-border-hover)] transition-all duration-200 cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-400/20 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">Templates</h3>
            </div>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Start with pre-built solutions for common use cases
            </p>
          </div>

          {/* Collaboration */}
          <div className="group p-6 rounded-xl border border-[var(--hive-border-default)] bg-[var(--hive-bg-secondary)] hover:border-[var(--hive-border-hover)] transition-all duration-200 cursor-pointer">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-pink-400/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="font-semibold text-[var(--hive-text-primary)]">Collaboration</h3>
            </div>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Work together on tools and share with your community
            </p>
          </div>
        </div>

        {/* Element System Showcase */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">Available Elements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Input Elements */}
            <div className="p-4 rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-bg-secondary)]">
              <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center mb-3">
                <Code className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="font-medium text-[var(--hive-text-primary)] mb-1">Input Elements</h4>
              <p className="text-xs text-[var(--hive-text-secondary)]">Text fields, buttons, selectors</p>
            </div>
            
            {/* Display Elements */}
            <div className="p-4 rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-bg-secondary)]">
              <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center mb-3">
                <BarChart3 className="w-4 h-4 text-green-400" />
              </div>
              <h4 className="font-medium text-[var(--hive-text-primary)] mb-1">Display Elements</h4>
              <p className="text-xs text-[var(--hive-text-secondary)]">Charts, lists, data views</p>
            </div>
            
            {/* Filter Elements */}
            <div className="p-4 rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-bg-secondary)]">
              <div className="w-8 h-8 bg-purple-400/20 rounded-lg flex items-center justify-center mb-3">
                <Wrench className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="font-medium text-[var(--hive-text-primary)] mb-1">Filter Elements</h4>
              <p className="text-xs text-[var(--hive-text-secondary)]">Search, date range, categories</p>
            </div>
            
            {/* Action Elements */}
            <div className="p-4 rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-bg-secondary)]">
              <div className="w-8 h-8 bg-orange-400/20 rounded-lg flex items-center justify-center mb-3">
                <Zap className="w-4 h-4 text-orange-400" />
              </div>
              <h4 className="font-medium text-[var(--hive-text-primary)] mb-1">Action Elements</h4>
              <p className="text-xs text-[var(--hive-text-secondary)]">Submit, share, export, notify</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <div className="p-8 rounded-xl border border-[var(--hive-border-default)] bg-gradient-to-br from-[var(--hive-bg-secondary)] to-[var(--hive-background-primary)] text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-6 h-6 text-[var(--hive-text-inverse)]" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">Build Your First Tool</h3>
            <p className="text-[var(--hive-text-secondary)] mb-6 max-w-md mx-auto">
              Join the community of campus builders creating solutions that matter. No code required - just drag, drop, and deploy to your spaces.
            </p>
            <button
              onClick={() => handleModeSelect('visual')}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[var(--hive-text-inverse)] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Start Building →
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}