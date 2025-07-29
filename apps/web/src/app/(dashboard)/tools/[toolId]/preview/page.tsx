"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card } from "@hive/ui";
import { ArrowLeft, Play, Edit, Settings, Eye, EyeOff, Maximize2, Minimize2, RefreshCw, Code2 } from "lucide-react";
import { useFeatureFlags } from "@hive/hooks";
import { useAuth } from "@/hooks/use-auth";
import { ToolNavigation } from "@/lib/tool-navigation";

interface ToolPreview {
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

// Mock tool data
const MOCK_TOOL: ToolPreview = {
  id: 'poll-maker',
  name: 'Poll Maker',
  description: 'Create interactive polls for spaces and events',
  elements: [
    {
      id: 'title-input',
      type: 'input',
      label: 'Poll Question',
      properties: { placeholder: 'What should we order for lunch?', required: true },
      position: { x: 20, y: 20 },
      size: { width: 460, height: 48 }
    },
    {
      id: 'option1',
      type: 'input',
      label: 'Option 1',
      properties: { placeholder: 'Pizza', required: true },
      position: { x: 20, y: 80 },
      size: { width: 220, height: 40 }
    },
    {
      id: 'option2',
      type: 'input',
      label: 'Option 2',
      properties: { placeholder: 'Sandwiches', required: true },
      position: { x: 260, y: 80 },
      size: { width: 220, height: 40 }
    },
    {
      id: 'add-option',
      type: 'button',
      label: '+ Add Option',
      properties: { variant: 'outline' },
      position: { x: 20, y: 140 },
      size: { width: 120, height: 36 }
    },
    {
      id: 'settings-text',
      type: 'text',
      label: 'Poll Settings',
      properties: { style: 'heading' },
      position: { x: 20, y: 190 },
      size: { width: 200, height: 24 }
    },
    {
      id: 'anonymous',
      type: 'button',
      label: '☐ Allow Anonymous Voting',
      properties: { variant: 'ghost', toggle: true },
      position: { x: 20, y: 220 },
      size: { width: 200, height: 32 }
    },
    {
      id: 'results',
      type: 'button',
      label: '☐ Show Results After Voting',
      properties: { variant: 'ghost', toggle: true },
      position: { x: 240, y: 220 },
      size: { width: 220, height: 32 }
    },
    {
      id: 'create-button',
      type: 'button',
      label: 'Create Poll',
      properties: { variant: 'primary' },
      position: { x: 20, y: 270 },
      size: { width: 140, height: 44 }
    },
    {
      id: 'preview-button',
      type: 'button',
      label: 'Preview',
      properties: { variant: 'outline' },
      position: { x: 180, y: 270 },
      size: { width: 100, height: 44 }
    }
  ],
  settings: {
    allowAnonymousVoting: true,
    showResults: 'after_voting'
  }
};

// Interactive tool renderer
const ToolRenderer = ({ tool, isInteractive = false }: { tool: ToolPreview; isInteractive?: boolean }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    anonymous: true,
    results: true
  });

  const handleInputChange = (elementId: string, value: string) => {
    if (!isInteractive) return;
    setFormData(prev => ({ ...prev, [elementId]: value }));
  };

  const handleToggle = (elementId: string) => {
    if (!isInteractive) return;
    setToggleStates(prev => ({ ...prev, [elementId]: !prev[elementId] }));
  };

  const handleSubmit = () => {
    if (!isInteractive) return;
    alert('Poll created successfully! (This is a preview)');
  };

  return (
    <div className="relative w-full h-[400px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-lg overflow-hidden">
      {tool.elements.map(element => {
        const style = {
          position: 'absolute' as const,
          left: element.position.x,
          top: element.position.y,
          width: element.size.width,
          height: element.size.height
        };

        switch (element.type) {
          case 'input':
            return (
              <input
                key={element.id}
                type="text"
                placeholder={element.properties.placeholder}
                value={formData[element.id] || ''}
                onChange={(e) => handleInputChange(element.id, e.target.value)}
                style={style}
                className={`p-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white text-sm placeholder:text-[#A1A1AA] focus:border-[#FFD700]/50 focus:outline-none ${!isInteractive ? 'pointer-events-none' : ''}`}
              />
            );
            
          case 'button':
            const isToggleButton = element.properties.toggle;
            const isToggled = toggleStates[element.id.replace('-', '')];
            
            if (isToggleButton) {
              return (
                <button
                  key={element.id}
                  onClick={() => handleToggle(element.id.replace('-', ''))}
                  style={style}
                  className={`flex items-center gap-2 px-3 text-sm text-left ${
                    isToggled 
                      ? 'text-[#FFD700]' 
                      : 'text-[#A1A1AA] hover:text-white'
                  } ${!isInteractive ? 'pointer-events-none' : 'transition-colors'}`}
                >
                  {element.label.replace('☐', isToggled ? '☑' : '☐')}
                </button>
              );
            }
            
            const getButtonStyle = (variant: string) => {
              switch (variant) {
                case 'primary':
                  return 'bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]';
                case 'outline':
                  return 'border border-[rgba(255,255,255,0.2)] text-[#A1A1AA] hover:text-white hover:border-[#FFD700]/30';
                default:
                  return 'bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)]';
              }
            };
            
            return (
              <button
                key={element.id}
                onClick={element.id === 'create-button' ? handleSubmit : undefined}
                style={style}
                className={`rounded-lg font-medium text-sm transition-all ${getButtonStyle(element.properties.variant)} ${!isInteractive ? 'pointer-events-none opacity-75' : ''}`}
              >
                {element.label}
              </button>
            );
            
          case 'text':
            const isHeading = element.properties.style === 'heading';
            return (
              <div
                key={element.id}
                style={style}
                className={`text-white flex items-center ${isHeading ? 'font-semibold text-base' : 'text-sm'}`}
              >
                {element.label}
              </div>
            );
            
          default:
            return (
              <div
                key={element.id}
                style={style}
                className="bg-[rgba(255,255,255,0.05)] border border-dashed border-[rgba(255,255,255,0.2)] rounded flex items-center justify-center text-xs text-[#A1A1AA]"
              >
                {element.type}
              </div>
            );
        }
      })}
    </div>
  );
};

export default function ToolPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const [tool] = useState<ToolPreview>(MOCK_TOOL);
  const [previewMode, setPreviewMode] = useState<'static' | 'interactive'>('interactive');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const flags = useFeatureFlags();
  const { user } = useAuth();

  useEffect(() => {
    flags.trackEvent('tools', 'view', { page: 'tool-preview', toolId: params.toolId });
  }, [flags, params.toolId]);

  const handleEdit = () => {
    flags.trackEvent('tools', 'interact', { action: 'edit_from_preview', toolId: tool.id });
    ToolNavigation.editTool(tool.id);
  };

  const handleRun = () => {
    flags.trackEvent('tools', 'interact', { action: 'run_from_preview', toolId: tool.id });
    ToolNavigation.toRun(tool.id);
  };

  const generatedCode = `// Generated Tool Code - ${tool.name}
export const ${tool.name.replace(/\s+/g, '')}Tool = {
  id: '${tool.id}',
  name: '${tool.name}',
  description: '${tool.description}',
  elements: ${JSON.stringify(tool.elements, null, 2)},
  render: (props) => {
    // Tool rendering logic here
    return <ToolRenderer {...props} />;
  }
};`;

  return (
    <div className={`bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A] ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'}`}>
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.8)] backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => ToolNavigation.goBack('marketplace')}
                className="text-[#A1A1AA] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Preview: {tool.name}
                </h1>
                <p className="text-sm text-[#A1A1AA]">
                  {tool.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg">
                <Button
                  size="sm"
                  variant={previewMode === 'static' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('static')}
                  className={previewMode === 'static' ? 'bg-[#FFD700] text-[#0A0A0A]' : 'text-[#A1A1AA] hover:text-white'}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Static
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === 'interactive' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('interactive')}
                  className={previewMode === 'interactive' ? 'bg-[#FFD700] text-[#0A0A0A]' : 'text-[#A1A1AA] hover:text-white'}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Interactive
                </Button>
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="border-[rgba(255,255,255,0.2)] text-[#A1A1AA] hover:text-white"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleEdit}
                className="border-[rgba(255,255,255,0.2)] text-[#A1A1AA] hover:text-white"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              
              <Button
                size="sm"
                onClick={handleRun}
                className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
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
              <h2 className="text-lg font-semibold text-white">Tool Preview</h2>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-[rgba(255,255,255,0.2)] text-[#A1A1AA] hover:text-white"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowCode(!showCode)}
                  className="border-[rgba(255,255,255,0.2)] text-[#A1A1AA] hover:text-white"
                >
                  <Code2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] flex-1">
              {showCode ? (
                <div className="h-full">
                  <h3 className="text-sm font-medium text-white mb-4">Generated Code</h3>
                  <div className="h-[calc(100%-2rem)] bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 overflow-auto">
                    <pre className="text-sm text-[#A1A1AA] whitespace-pre-wrap font-mono">
                      {generatedCode}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-[#A1A1AA]">
                      {previewMode === 'interactive' ? 'Interactive Preview' : 'Static Preview'}
                    </div>
                    {previewMode === 'interactive' && (
                      <div className="text-xs text-green-400">● Live Preview</div>
                    )}
                  </div>
                  <div className="flex-1 min-h-0">
                    <ToolRenderer tool={tool} isInteractive={previewMode === 'interactive'} />
                  </div>
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
                  <span className="text-[#A1A1AA]">Name:</span>
                  <span className="text-white ml-2">{tool.name}</span>
                </div>
                <div>
                  <span className="text-[#A1A1AA]">ID:</span>
                  <span className="text-white ml-2 font-mono">{tool.id}</span>
                </div>
                <div>
                  <span className="text-[#A1A1AA]">Elements:</span>
                  <span className="text-white ml-2">{tool.elements.length}</span>
                </div>
                <div>
                  <span className="text-[#A1A1AA]">Description:</span>
                  <p className="text-white mt-1">{tool.description}</p>
                </div>
              </div>
            </Card>

            {/* Element List */}
            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] flex-1 min-h-0">
              <h3 className="text-lg font-semibold text-white mb-4">Elements</h3>
              <div className="space-y-2 overflow-auto">
                {tool.elements.map((element, index) => (
                  <div
                    key={element.id}
                    className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{element.label}</span>
                      <span className="text-xs text-[#A1A1AA] bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded capitalize">
                        {element.type}
                      </span>
                    </div>
                    <div className="text-xs text-[#A1A1AA]">
                      Position: ({element.position.x}, {element.position.y}) • 
                      Size: {element.size.width}×{element.size.height}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  onClick={handleRun}
                  className="w-full bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255] justify-start"
                >
                  <Play className="h-4 w-4 mr-3" />
                  Run Tool
                </Button>
                <Button
                  onClick={handleEdit}
                  className="w-full bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] justify-start"
                >
                  <Edit className="h-4 w-4 mr-3" />
                  Edit Tool
                </Button>
                <Button
                  onClick={() => ToolNavigation.toSettings(tool.id)}
                  className="w-full bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] justify-start"
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