'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play,
  Pause,
  RotateCcw,
  Smartphone,
  Monitor,
  Tablet,
  Maximize2,
  Minimize2,
  Download,
  Share2,
  Bug,
  CheckCircle,
  XCircle,
  AlertCircle,
  Terminal,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreviewState {
  isRunning: boolean;
  output: any[];
  errors: string[];
  logs: string[];
  performance: {
    renderTime: number;
    memoryUsage: number;
  };
}

interface DevicePreset {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
}

interface PreviewPanelProps {
  toolConfig: any;
  elements: any[];
  connections: any[];
  onTest?: (testResult: any) => void;
  className?: string;
}

const DEVICE_PRESETS: DevicePreset[] = [
  { name: 'Desktop', width: 1920, height: 1080, icon: <Monitor className="h-4 w-4" /> },
  { name: 'Tablet', width: 768, height: 1024, icon: <Tablet className="h-4 w-4" /> },
  { name: 'Mobile', width: 375, height: 812, icon: <Smartphone className="h-4 w-4" /> }
];

export function PreviewPanel({ 
  toolConfig, 
  elements, 
  connections,
  onTest,
  className 
}: PreviewPanelProps) {
  const [previewState, setPreviewState] = useState<PreviewState>({
    isRunning: false,
    output: [],
    errors: [],
    logs: [],
    performance: {
      renderTime: 0,
      memoryUsage: 0
    }
  });
  
  const [selectedDevice, setSelectedDevice] = useState<DevicePreset>(DEVICE_PRESETS[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [scale, setScale] = useState(1);
  const previewRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Generate preview HTML
  const generatePreviewHTML = () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Tool Preview</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, system-ui, sans-serif;
              background: #0A0A0A;
              color: white;
              padding: 20px;
            }
            .container { max-width: 800px; margin: 0 auto; }
            .element {
              padding: 12px;
              margin: 8px 0;
              background: #1a1a1a;
              border: 1px solid #333;
              border-radius: 8px;
            }
            .input { 
              width: 100%;
              padding: 8px;
              background: #0a0a0a;
              border: 1px solid #444;
              border-radius: 4px;
              color: white;
            }
            .button {
              padding: 8px 16px;
              background: #FF6B35;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
            .button:hover { opacity: 0.9; }
            .output {
              padding: 12px;
              background: #0a0a0a;
              border: 1px solid #444;
              border-radius: 4px;
              min-height: 100px;
              white-space: pre-wrap;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2 style="margin-bottom: 20px;">${toolConfig?.name || 'Tool Preview'}</h2>
            ${elements.map(element => renderElement(element)).join('')}
          </div>
          <script>
            // Tool runtime
            window.addEventListener('message', function(e) {
              if (e.data.type === 'execute') {
                try {
                  // Execute tool logic
                  const result = { success: true, output: 'Tool executed successfully' };
                  window.parent.postMessage({ type: 'result', data: result }, '*');
                } catch (error) {
                  window.parent.postMessage({ type: 'error', error: error.message }, '*');
                }
              }
            });
            
            // Log function
            const originalLog = console.log;
            console.log = function(...args) {
              originalLog.apply(console, args);
              window.parent.postMessage({ type: 'log', data: args.join(' ') }, '*');
            };
          </script>
        </body>
      </html>
    `;
    return html;
  };

  const renderElement = (element: any) => {
    switch (element.type) {
      case 'text-input':
        return `<div class="element">
          <label>${element.name}</label>
          <input type="text" class="input" placeholder="Enter ${element.name}">
        </div>`;
      
      case 'button':
        return `<div class="element">
          <button class="button" onclick="handleClick('${element.id}')">${element.name}</button>
        </div>`;
      
      case 'text-display':
        return `<div class="element">
          <div class="output" id="output-${element.id}">Output will appear here...</div>
        </div>`;
      
      default:
        return `<div class="element">${element.name} (${element.type})</div>`;
    }
  };

  // Handle preview execution
  const handleRun = () => {
    const startTime = performance.now();
    setPreviewState(prev => ({
      ...prev,
      isRunning: true,
      errors: [],
      logs: [],
      output: []
    }));

    // Send execute command to iframe
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'execute' }, '*');
    }

    // Simulate execution
    setTimeout(() => {
      const endTime = performance.now();
      setPreviewState(prev => ({
        ...prev,
        isRunning: false,
        performance: {
          renderTime: endTime - startTime,
          memoryUsage: Math.random() * 50 + 10
        },
        logs: [...prev.logs, `Tool executed in ${(endTime - startTime).toFixed(2)}ms`]
      }));

      if (onTest) {
        onTest({
          success: true,
          duration: endTime - startTime,
          elements: elements.length,
          connections: connections.length
        });
      }
    }, 1000);
  };

  const handleStop = () => {
    setPreviewState(prev => ({
      ...prev,
      isRunning: false
    }));
  };

  const handleReset = () => {
    setPreviewState({
      isRunning: false,
      output: [],
      errors: [],
      logs: [],
      performance: {
        renderTime: 0,
        memoryUsage: 0
      }
    });
    
    // Reload iframe
    if (iframeRef.current) {
      iframeRef.current.src = 'about:blank';
      setTimeout(() => {
        if (iframeRef.current) {
          const doc = iframeRef.current.contentDocument;
          if (doc) {
            doc.open();
            doc.write(generatePreviewHTML());
            doc.close();
          }
        }
      }, 100);
    }
  };

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'result') {
        setPreviewState(prev => ({
          ...prev,
          output: [...prev.output, event.data.data]
        }));
      } else if (event.data.type === 'error') {
        setPreviewState(prev => ({
          ...prev,
          errors: [...prev.errors, event.data.error]
        }));
      } else if (event.data.type === 'log') {
        setPreviewState(prev => ({
          ...prev,
          logs: [...prev.logs, event.data.data]
        }));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Initialize iframe content
  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(generatePreviewHTML());
        doc.close();
      }
    }
  }, [elements, toolConfig]);

  // Calculate scale for device preview
  useEffect(() => {
    if (previewRef.current) {
      const containerWidth = previewRef.current.clientWidth - 32;
      const containerHeight = previewRef.current.clientHeight - 120;
      const scaleX = containerWidth / selectedDevice.width;
      const scaleY = containerHeight / selectedDevice.height;
      setScale(Math.min(scaleX, scaleY, 1));
    }
  }, [selectedDevice, isFullscreen]);

  return (
    <div className={cn("bg-gray-950 flex flex-col h-full", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-400">Preview</h3>
          <div className="flex items-center gap-2">
            {/* Device Selector */}
            <div className="flex items-center bg-gray-900 rounded-lg p-1">
              {DEVICE_PRESETS.map(device => (
                <button
                  key={device.name}
                  onClick={() => setSelectedDevice(device)}
                  className={cn(
                    "p-2 rounded transition-all",
                    selectedDevice.name === device.name
                      ? "bg-gray-800 text-white"
                      : "text-gray-500 hover:text-gray-400"
                  )}
                  title={device.name}
                >
                  {device.icon}
                </button>
              ))}
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Control Bar */}
        <div className="flex items-center gap-2">
          {!previewState.isRunning ? (
            <button
              onClick={handleRun}
              className="flex-1 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="h-4 w-4" />
              Run
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
            >
              <Pause className="h-4 w-4" />
              Stop
            </button>
          )}
          
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-gray-900 text-gray-400 rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={cn(
              "px-3 py-2 rounded-lg text-sm transition-colors",
              showConsole 
                ? "bg-gray-800 text-white" 
                : "bg-gray-900 text-gray-400 hover:bg-gray-800"
            )}
          >
            <Terminal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div ref={previewRef} className="flex-1 relative overflow-hidden bg-gray-900/50 p-4">
        <div 
          className={cn(
            "mx-auto transition-all duration-300",
            isFullscreen && "absolute inset-4"
          )}
          style={{
            width: selectedDevice.width * scale,
            height: selectedDevice.height * scale
          }}
        >
          {/* Device Frame */}
          <div className="relative w-full h-full bg-black rounded-lg border-2 border-gray-700 overflow-hidden">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-2 z-10">
              <span className="text-[10px] text-gray-500">{selectedDevice.name}</span>
              <span className="text-[10px] text-gray-500">
                {selectedDevice.width} × {selectedDevice.height}
              </span>
            </div>

            {/* Iframe Preview */}
            <iframe
              ref={iframeRef}
              className="absolute top-6 left-0 right-0 bottom-0 w-full h-[calc(100%-24px)] border-0"
              sandbox="allow-scripts allow-same-origin"
              title="Tool Preview"
            />

            {/* Running Indicator */}
            {previewState.isRunning && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                <div className="bg-gray-900 rounded-lg p-4 flex items-center gap-3">
                  <div className="animate-spin h-5 w-5 border-2 border-gray-600 border-t-[var(--hive-brand-primary)] rounded-full" />
                  <span className="text-sm text-white">Running...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Console Panel */}
      <AnimatePresence>
        {showConsole && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 200 }}
            exit={{ height: 0 }}
            className="border-t border-gray-800 bg-gray-900 overflow-hidden"
          >
            <div className="p-2 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs">
                <span className="text-gray-400">Console</span>
                <span className="text-gray-500">
                  {previewState.logs.length} logs
                </span>
                {previewState.errors.length > 0 && (
                  <span className="text-red-400">
                    {previewState.errors.length} errors
                  </span>
                )}
              </div>
              <button
                onClick={() => setPreviewState(prev => ({ ...prev, logs: [], errors: [] }))}
                className="text-xs text-gray-500 hover:text-gray-400"
              >
                Clear
              </button>
            </div>
            
            <div className="p-3 h-[160px] overflow-y-auto font-mono text-xs space-y-1">
              {previewState.logs.map((log, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5" />
                  <span className="text-gray-300">{log}</span>
                </div>
              ))}
              {previewState.errors.map((error, i) => (
                <div key={i} className="flex items-start gap-2">
                  <XCircle className="h-3 w-3 text-red-400 mt-0.5" />
                  <span className="text-red-300">{error}</span>
                </div>
              ))}
              {previewState.logs.length === 0 && previewState.errors.length === 0 && (
                <div className="text-gray-600">Console output will appear here...</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance Stats */}
      {previewState.performance.renderTime > 0 && (
        <div className="p-3 border-t border-gray-800 bg-gray-900/50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="text-gray-500">
              Render: <span className="text-green-400">{previewState.performance.renderTime.toFixed(2)}ms</span>
            </span>
            <span className="text-gray-500">
              Memory: <span className="text-blue-400">{previewState.performance.memoryUsage.toFixed(1)}MB</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-500 hover:text-gray-400">
              <Download className="h-3 w-3" />
            </button>
            <button className="p-1 text-gray-500 hover:text-gray-400">
              <Share2 className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}