import * as React from 'react';

import { Button, Card } from '../../atomic';
import { ArrowLeft, Play, Edit, Settings, Eye, Maximize2, Minimize2, RefreshCw, Code2 } from 'lucide-react';
import type { ToolComposition } from '../../lib/hivelab/element-system';

export interface ToolPreviewPageProps {
  composition: ToolComposition;
  initialMode?: 'preview' | 'live';
  onBack?: () => void;
  onEdit?: (composition: ToolComposition) => void;
  onRun?: (composition: ToolComposition) => void;
  onOpenSettings?: (composition: ToolComposition) => void;
  renderRuntime: (composition: ToolComposition, mode: 'preview' | 'live') => React.ReactNode;
}

export function ToolPreviewPage({
  composition,
  initialMode = 'preview',
  onBack,
  onEdit,
  onRun,
  onOpenSettings,
  renderRuntime,
}: ToolPreviewPageProps) {
  const [previewMode, setPreviewMode] = React.useState<'preview' | 'live'>(initialMode);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showCode, setShowCode] = React.useState(false);

  const generatedCode = `// Generated Tool Code - ${composition.name}\nexport const ${composition.name.replace(/\\s+/g, '')}Tool = {\n  id: '${composition.id}',\n  name: '${composition.name}',\n  description: '${composition.description}',\n  elements: ${JSON.stringify(composition.elements, null, 2)},\n  connections: ${JSON.stringify(composition.connections, null, 2)},\n  layout: '${composition.layout}',\n};`;

  return (
    <div className={`bg-gradient-to-br from-hive-background-primary via-hive-background-tertiary to-hive-background-secondary ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'}`}>
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.8)] backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button size="sm" variant="ghost" onClick={onBack} className="text-hive-text-tertiary hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-white">Preview: {composition.name}</h1>
                <p className="text-sm text-hive-text-tertiary">{composition.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg">
                <Button
                  size="sm"
                  variant={previewMode === 'preview' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('preview')}
                  className={previewMode === 'preview' ? 'bg-[var(--hive-brand-primary)] text-hive-brand-on-gold' : 'text-hive-text-tertiary hover:text-white'}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === 'live' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('live')}
                  className={previewMode === 'live' ? 'bg-[var(--hive-brand-primary)] text-hive-brand-on-gold' : 'text-hive-text-tertiary hover:text-white'}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Live
                </Button>
              </div>

              <Button size="sm" variant="secondary" onClick={() => setIsFullscreen(!isFullscreen)} className="border-[rgba(255,255,255,0.2)] text-hive-text-tertiary hover:text-white">
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>

              <Button size="sm" variant="secondary" onClick={() => onEdit?.(composition)} className="border-[rgba(255,255,255,0.2)] text-hive-text-tertiary hover:text-white">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>

              <Button size="sm" onClick={() => onRun?.(composition)} className="bg-[var(--hive-brand-primary)] text-hive-brand-on-gold hover:bg-hive-brand-hover">
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
              <h2 className="text-lg font-semibold text-white">Tool Preview</h2>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => window.location.reload()} className="border-[rgba(255,255,255,0.2)] text-hive-text-tertiary hover:text-white">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setShowCode(!showCode)} className="border-[rgba(255,255,255,0.2)] text-hive-text-tertiary hover:text-white">
                  <Code2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] flex-1">
              {showCode ? (
                <div className="h-full">
                  <h3 className="text-sm font-medium text-white mb-4">Generated Code</h3>
                  <div className="h-[calc(100%-2rem)] bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 overflow-auto">
                    <pre className="text-sm text-hive-text-tertiary whitespace-pre-wrap font-mono">{generatedCode}</pre>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-hive-text-tertiary">{previewMode === 'live' ? 'Live Execution' : 'Preview Mode'}</div>
                    {previewMode === 'live' && <div className="text-xs text-green-400">● Live Runtime</div>}
                  </div>
                  <div className="flex-1 min-h-0 overflow-auto">{renderRuntime(composition, previewMode)}</div>
                </div>
              )}
            </Card>
          </div>

          {/* Properties & Info - Side Panel */}
          <div className="space-y-6">
            {/* Tool Information */}
            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <h3 className="text-lg font-semibold text-white mb-4">Tool Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-hive-text-tertiary">Name:</span>
                  <span className="text-white ml-2">{composition.name}</span>
                </div>
                <div>
                  <span className="text-hive-text-tertiary">ID:</span>
                  <span className="text-white ml-2 font-mono">{composition.id}</span>
                </div>
                <div>
                  <span className="text-hive-text-tertiary">Elements:</span>
                  <span className="text-white ml-2">{composition.elements.length}</span>
                </div>
                <div>
                  <span className="text-hive-text-tertiary">Connections:</span>
                  <span className="text-white ml-2">{composition.connections.length}</span>
                </div>
                <div>
                  <span className="text-hive-text-tertiary">Layout:</span>
                  <span className="text-white ml-2 capitalize">{composition.layout}</span>
                </div>
                {composition.description && (
                  <div>
                    <span className="text-hive-text-tertiary">Description:</span>
                    <p className="text-white mt-1">{composition.description}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button onClick={() => onRun?.(composition)} className="w-full bg-[var(--hive-brand-primary)] text-hive-brand-on-gold hover:bg-hive-brand-hover justify-start">
                  <Play className="h-4 w-4 mr-3" />
                  Run Tool
                </Button>
                <Button onClick={() => onEdit?.(composition)} className="w-full bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] justify-start">
                  <Edit className="h-4 w-4 mr-3" />
                  Edit Tool
                </Button>
                <Button onClick={() => onOpenSettings?.(composition)} className="w-full bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] justify-start">
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

ToolPreviewPage.displayName = 'ToolPreviewPage';

