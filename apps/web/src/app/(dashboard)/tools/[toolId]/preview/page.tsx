"use client";

import { useState, useEffect, useMemo as _useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card } from "@hive/ui";
import { ArrowLeft, Play, Edit, Settings, Eye, Maximize2, Minimize2, RefreshCw, Code2 } from "lucide-react";
import { useFeatureFlags } from "@hive/hooks";
import { useUnifiedAuth } from "@hive/ui";
import { ToolNavigation } from "@/lib/tools/tool-navigation";
import { ToolRuntime } from "@/components/tools/tool-runtime";
import { ToolComposition } from "@/lib/element-system";

interface _ToolPreview {
  id: string;
  name: string;
  description: string;
  elements: Array<{
    id: string;
    type: 'input' | 'button' | 'text' | 'chart' | 'list';
    label: string;
    properties: Record<string, any>;
    position: { x: number; y: number };
    size: { width: number; height: number };
  }>;
  settings: Record<string, any>;
}

// Mock tool composition using the element system
const MOCK_TOOL_COMPOSITION: ToolComposition = {
  id: 'poll-maker',
  name: 'Poll Maker',
  description: 'Create interactive polls for spaces and events',
  elements: [
    {
      elementId: 'form-builder',
      instanceId: 'poll-form',
      config: {
        fields: [
          { name: 'question', type: 'text', label: 'Poll Question', placeholder: 'What should we order for lunch?', required: true },
          { name: 'option1', type: 'text', label: 'Option 1', placeholder: 'Pizza', required: true },
          { name: 'option2', type: 'text', label: 'Option 2', placeholder: 'Sandwiches', required: true },
          { name: 'option3', type: 'text', label: 'Option 3 (optional)', placeholder: 'Salads', required: false },
        ],
        validateOnChange: true,
        showProgress: false
      },
      position: { x: 0, y: 0 },
      size: { width: 400, height: 300 }
    },
    {
      elementId: 'filter-selector',
      instanceId: 'poll-settings',
      config: {
        options: [
          { value: 'anonymous', label: 'Allow Anonymous Voting' },
          { value: 'show_results', label: 'Show Results After Voting' },
          { value: 'multiple_choice', label: 'Allow Multiple Choices' }
        ],
        allowMultiple: true,
        showCounts: false
      },
      position: { x: 420, y: 0 },
      size: { width: 300, height: 150 }
    },
    {
      elementId: 'result-list',
      instanceId: 'poll-preview',
      config: {
        itemsPerPage: 10,
        showPagination: false,
        cardStyle: 'compact'
      },
      position: { x: 420, y: 170 },
      size: { width: 300, height: 130 }
    }
  ],
  connections: [
    {
      from: { instanceId: 'poll-form', output: 'formData' },
      to: { instanceId: 'poll-preview', input: 'items' }
    },
    {
      from: { instanceId: 'poll-settings', output: 'selectedFilters' },
      to: { instanceId: 'poll-form', input: 'settings' }
    }
  ],
  layout: 'grid'
};

// Tool Runtime Wrapper Component
const ToolRuntimeWrapper = ({ composition, mode }: { composition: ToolComposition; mode: 'preview' | 'live' }) => {
  const { user } = useUnifiedAuth();
  const [executionResults, setExecutionResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleExecutionResult = (result: any) => {
    setExecutionResults(prev => [...prev, { timestamp: Date.now(), result }].slice(-10));
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="space-y-4">
      <ToolRuntime
        composition={composition}
        userId={user?.id || 'anonymous'}
        mode={mode}
        onExecutionResult={handleExecutionResult}
        onError={handleError}
      />
      
      {/* Execution Results Display */}
      {executionResults.length > 0 && (
        <Card className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
          <h4 className="text-sm font-medium text-[var(--hive-text-inverse)] mb-2">Recent Executions</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {executionResults.map((entry, index) => (
              <div key={index} className="text-xs p-2 bg-[rgba(255,255,255,0.05)] rounded">
                <div className="flex justify-between text-[var(--hive-text-muted)]">
                  <span>Result {index + 1}</span>
                  <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-[var(--hive-text-inverse)] mt-1">
                  {JSON.stringify(entry.result, null, 2).slice(0, 100)}...
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {/* Error Display */}
      {error && (
        <Card className="p-4 bg-red-900/20 border-red-500/20">
          <div className="text-red-400 text-sm">
            <strong>Error:</strong> {error}
          </div>
        </Card>
      )}
    </div>
  );
};

export default function ToolPreviewPage() {
  const params = useParams();
  const _router = useRouter();
  const [composition] = useState<ToolComposition>(MOCK_TOOL_COMPOSITION);
  const [previewMode, setPreviewMode] = useState<'preview' | 'live'>('preview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const flags = useFeatureFlags();
  const { user: _user } = useUnifiedAuth();

  useEffect(() => {
    flags.trackEvent('tools', 'view', { page: 'tool-preview', toolId: params.toolId });
  }, [flags, params.toolId]);

  const handleEdit = () => {
    flags.trackEvent('tools', 'interact', { action: 'edit_from_preview', toolId: composition.id });
    ToolNavigation.editTool(composition.id);
  };

  const handleRun = () => {
    flags.trackEvent('tools', 'interact', { action: 'run_from_preview', toolId: composition.id });
    ToolNavigation.toRun(composition.id);
  };

  const generatedCode = `// Generated Tool Code - ${composition.name}
export const ${composition.name.replace(/\s+/g, '')}Tool = {
  id: '${composition.id}',
  name: '${composition.name}',
  description: '${composition.description}',
  elements: ${JSON.stringify(composition.elements, null, 2)},
  connections: ${JSON.stringify(composition.connections, null, 2)},
  layout: '${composition.layout}',
  render: (props: any) => {
    // Tool rendering logic using element system
    return <ToolRuntime composition={this} {...props} />;
  }
};`;

  return (
    <div className={`bg-gradient-to-br from-[var(--hive-background-primary)] via-[#0F0F0F] to-[#1A1A1A] ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'}`}>
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.8)] backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => ToolNavigation.goBack('marketplace')}
                className="text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-[var(--hive-text-inverse)]">
                  Preview: {composition.name}
                </h1>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  {composition.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg">
                <Button
                  size="sm"
                  variant={previewMode === 'preview' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('preview')}
                  className={previewMode === 'preview' ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]'}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === 'live' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('live')}
                  className={previewMode === 'live' ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]'}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Live
                </Button>
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="border-[rgba(255,255,255,0.2)] text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleEdit}
                className="border-[rgba(255,255,255,0.2)] text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              
              <Button
                size="sm"
                onClick={handleRun}
                className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[#FFE255]"
              >
                <Play className="h-4 w-4 mr-2" />
                Run Tool
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {/* Tool Preview - Main Panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--hive-text-inverse)]">Tool Preview</h2>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-[rgba(255,255,255,0.2)] text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowCode(!showCode)}
                  className="border-[rgba(255,255,255,0.2)] text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]"
                >
                  <Code2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] flex-1">
              {showCode ? (
                <div className="h-full">
                  <h3 className="text-sm font-medium text-[var(--hive-text-inverse)] mb-4">Generated Code</h3>
                  <div className="h-[calc(100%-2rem)] bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 overflow-auto">
                    <pre className="text-sm text-[var(--hive-text-muted)] whitespace-pre-wrap font-mono">
                      {generatedCode}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-[var(--hive-text-muted)]">
                      {previewMode === 'live' ? 'Live Execution' : 'Preview Mode'}
                    </div>
                    {previewMode === 'live' && (
                      <div className="text-xs text-green-400">● Live Runtime</div>
                    )}
                  </div>
                  <div className="flex-1 min-h-0 overflow-auto">
                    <ToolRuntimeWrapper composition={composition} mode={previewMode} />
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Properties & Info - Side Panel */}
          <div className="space-y-6">
            {/* Tool Information */}
            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Tool Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-[var(--hive-text-muted)]">Name:</span>
                  <span className="text-[var(--hive-text-inverse)] ml-2">{composition.name}</span>
                </div>
                <div>
                  <span className="text-[var(--hive-text-muted)]">ID:</span>
                  <span className="text-[var(--hive-text-inverse)] ml-2 font-mono">{composition.id}</span>
                </div>
                <div>
                  <span className="text-[var(--hive-text-muted)]">Elements:</span>
                  <span className="text-[var(--hive-text-inverse)] ml-2">{composition.elements.length}</span>
                </div>
                <div>
                  <span className="text-[var(--hive-text-muted)]">Connections:</span>
                  <span className="text-[var(--hive-text-inverse)] ml-2">{composition.connections.length}</span>
                </div>
                <div>
                  <span className="text-[var(--hive-text-muted)]">Layout:</span>
                  <span className="text-[var(--hive-text-inverse)] ml-2 capitalize">{composition.layout}</span>
                </div>
                <div>
                  <span className="text-[var(--hive-text-muted)]">Description:</span>
                  <p className="text-[var(--hive-text-inverse)] mt-1">{composition.description}</p>
                </div>
              </div>
            </Card>

            {/* Element List */}
            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] flex-1 min-h-0">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Elements</h3>
              <div className="space-y-2 overflow-auto">
                {composition.elements.map((element, _index) => (
                  <div
                    key={element.instanceId}
                    className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[var(--hive-text-inverse)] font-medium text-sm">{element.instanceId}</span>
                      <span className="text-xs text-[var(--hive-text-muted)] bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded">
                        {element.elementId}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--hive-text-muted)]">
                      Position: ({element.position.x}, {element.position.y}) • 
                      Size: {element.size.width}×{element.size.height}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  onClick={handleRun}
                  className="w-full bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[#FFE255] justify-start"
                >
                  <Play className="h-4 w-4 mr-3" />
                  Run Tool
                </Button>
                <Button
                  onClick={handleEdit}
                  className="w-full bg-[rgba(255,255,255,0.05)] text-[var(--hive-text-inverse)] hover:bg-[rgba(255,255,255,0.1)] justify-start"
                >
                  <Edit className="h-4 w-4 mr-3" />
                  Edit Tool
                </Button>
                <Button
                  onClick={() => ToolNavigation.toSettings(composition.id)}
                  className="w-full bg-[rgba(255,255,255,0.05)] text-[var(--hive-text-inverse)] hover:bg-[rgba(255,255,255,0.1)] justify-start"
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Tool Settings
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}