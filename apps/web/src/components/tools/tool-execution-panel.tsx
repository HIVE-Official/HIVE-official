"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, Button, Input, Label, Textarea, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Progress } from "@hive/ui";
import { Alert, AlertDescription } from "@/components/temp-stubs";
import {
  Play,
  Square,
  Terminal,
  Code,
  Settings,
  Clock,
  Cpu,
  Memory,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Copy,
  Download,
  Share2
} from 'lucide-react';
import { 
  ToolExecutionRuntime, 
  ToolDefinition, 
  ExecutionResult, 
  ExecutionContext 
} from '../../lib/tool-execution-runtime';

interface ToolExecutionPanelProps {
  tool: ToolDefinition;
  onResult?: (result: ExecutionResult) => void;
  userId: string;
  spaceId?: string;
}

export function ToolExecutionPanel({ 
  tool, 
  onResult, 
  userId, 
  spaceId 
}: ToolExecutionPanelProps) {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionId, setExecutionId] = useState<string | null>(null);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [executionHistory, setExecutionHistory] = useState<ExecutionResult[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('inputs');
  
  const runtime = useRef(ToolExecutionRuntime.getInstance());
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Initialize inputs with default values
  useEffect(() => {
    const initialInputs: Record<string, any> = {};
    Object.entries(tool.schema.inputs).forEach(([key, definition]) => {
      if (definition.default !== undefined) {
        initialInputs[key] = definition.default;
      } else {
        // Set default values based on type
        switch (definition.type) {
          case 'string':
            initialInputs[key] = '';
            break;
          case 'number':
            initialInputs[key] = 0;
            break;
          case 'boolean':
            initialInputs[key] = false;
            break;
          case 'array':
            initialInputs[key] = [];
            break;
          case 'object':
            initialInputs[key] = {};
            break;
          default:
            initialInputs[key] = null;
        }
      }
    });
    setInputs(initialInputs);
  }, [tool]);

  const handleInputChange = (key: string, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const parseInputValue = (value: string, type: string): any => {
    switch (type) {
      case 'number': {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
      }
      case 'boolean':
        return value.toLowerCase() === 'true';
      case 'array':
        try {
          return JSON.parse(value);
        } catch {
          return value.split(',').map(s => s.trim());
        }
      case 'object':
        try {
          return JSON.parse(value);
        } catch {
          return {};
        }
      default:
        return value;
    }
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setActiveTab('output');
    setLogs([]);
    
    const context: ExecutionContext = {
      userId,
      toolId: tool.id,
      spaceId,
      permissions: tool.permissions,
      timeout: 10000, // 10 seconds
      maxMemory: 50 * 1024 * 1024 // 50MB
    };

    const currentExecutionId = `exec_${Date.now()}`;
    setExecutionId(currentExecutionId);

    try {
      const execResult = await runtime.current.executeTool(tool, inputs, context);
      
      setResult(execResult);
      setLogs(execResult.logs);
      setExecutionHistory(prev => [execResult, ...prev.slice(0, 9)]); // Keep last 10
      
      if (onResult) {
        onResult(execResult);
      }
    } catch (error) {
      const errorResult: ExecutionResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: 0,
        memoryUsed: 0,
        logs: ['Error: Failed to execute tool']
      };
      
      setResult(errorResult);
      setLogs(errorResult.logs);
    } finally {
      setIsExecuting(false);
      setExecutionId(null);
    }
  };

  const handleCancel = () => {
    if (executionId) {
      runtime.current.cancelExecution(executionId);
      setIsExecuting(false);
      setExecutionId(null);
    }
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    }
  };

  const exportResult = () => {
    if (result) {
      const dataStr = JSON.stringify(result, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${tool.name}_result_${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const renderInputField = (key: string, definition: any) => {
    const value = inputs[key];
    
    switch (definition.type) {
      case 'string':
        if (definition.multiline) {
          return (
            <Textarea
              value={value || ''}
              onChange={(e: React.ChangeEvent) => handleInputChange(key, e.target.value)}
              placeholder={definition.placeholder}
              rows={3}
              className="mt-1"
            />
          );
        }
        return (
          <Input
            value={value || ''}
            onChange={(e: React.ChangeEvent) => handleInputChange(key, e.target.value)}
            placeholder={definition.placeholder}
            className="mt-1"
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            value={value || 0}
            onChange={(e: React.ChangeEvent) => handleInputChange(key, parseFloat(e.target.value))}
            className="mt-1"
          />
        );
      
      case 'boolean':
        return (
          <div className="mt-1">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleInputChange(key, !value)}
              className={value ? 'bg-green-500/20 border-green-500' : ''}
            >
              {value ? 'True' : 'False'}
            </Button>
          </div>
        );
      
      case 'array':
      case 'object':
        return (
          <Textarea
            value={typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
            onChange={(e: React.ChangeEvent) => handleInputChange(key, parseInputValue(e.target.value, definition.type))}
            placeholder={definition.type === 'array' ? '["item1", "item2"]' : '{"key": "value"}'}
            rows={3}
            className="mt-1 font-mono text-sm"
          />
        );
      
      default:
        return (
          <Input
            value={value || ''}
            onChange={(e: React.ChangeEvent) => handleInputChange(key, e.target.value)}
            className="mt-1"
          />
        );
    }
  };

  const getStatusIcon = () => {
    if (isExecuting) return <Clock className="h-4 w-4 animate-spin" />;
    if (!result) return <Play className="h-4 w-4" />;
    return result.success ? 
      <CheckCircle className="h-4 w-4 text-green-400" /> : 
      <XCircle className="h-4 w-4 text-red-400" />;
  };

  const getStatusColor = () => {
    if (isExecuting) return 'border-yellow-500 bg-yellow-500/10';
    if (!result) return 'border-hive-border-default';
    return result.success ? 
      'border-green-500 bg-green-500/10' : 
      'border-red-500 bg-red-500/10';
  };

  return (
    <Card className={`p-6 bg-hive-background-overlay transition-all duration-200 ${getStatusColor()}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-hive-gold rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-hive-obsidian" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{tool.name}</h3>
              <p className="text-sm text-hive-text-mutedLight">
                {tool.language} • v{tool.version}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {result && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={copyResult}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={exportResult}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </>
            )}
            {isExecuting ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCancel}
                className="text-red-400 border-red-400"
              >
                <Square className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            ) : (
              <Button
                onClick={handleExecute}
                disabled={Object.keys(tool.schema.inputs).some(key => 
                  tool.schema.inputs[key].required && !inputs[key]
                )}
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
              >
                <Play className="h-4 w-4 mr-2" />
                Execute
              </Button>
            )}
          </div>
        </div>

        {/* Execution Progress */}
        {isExecuting && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white">Executing...</span>
              <span className="text-hive-text-mutedLight">
                {executionId}
              </span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inputs" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Inputs</span>
            </TabsTrigger>
            <TabsTrigger value="output" className="flex items-center space-x-2">
              {getStatusIcon()}
              <span>Output</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center space-x-2">
              <Terminal className="h-4 w-4" />
              <span>Logs</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>

          {/* Inputs Tab */}
          <TabsContent value="inputs" className="space-y-4 mt-4">
            {Object.keys(tool.schema.inputs).length === 0 ? (
              <p className="text-hive-text-mutedLight text-center py-4">
                This tool doesn't require any inputs
              </p>
            ) : (
              <div className="space-y-4">
                {Object.entries(tool.schema.inputs).map(([key, definition]) => (
                  <div key={key}>
                    <Label className="text-white flex items-center space-x-2">
                      <span>{key}</span>
                      {definition.required && (
                        <Badge variant="sophomore" className="text-xs">Required</Badge>
                      )}
                    </Label>
                    {definition.description && (
                      <p className="text-sm text-hive-text-mutedLight mb-1">
                        {definition.description}
                      </p>
                    )}
                    {renderInputField(key, definition)}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Output Tab */}
          <TabsContent value="output" className="mt-4">
            {result ? (
              <div className="space-y-4">
                {/* Status Banner */}
                <Alert className={result.success ? 'border-green-500/20 bg-green-500/10' : 'border-red-500/20 bg-red-500/10'}>
                  {result.success ? 
                    <CheckCircle className="h-4 w-4 text-green-400" /> : 
                    <XCircle className="h-4 w-4 text-red-400" />
                  }
                  <AlertDescription className={result.success ? 'text-green-200' : 'text-red-200'}>
                    {result.success ? 'Execution completed successfully' : `Execution failed: ${result.error}`}
                  </AlertDescription>
                </Alert>

                {/* Performance Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-hive-background-tertiary rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-hive-text-mutedLight">Execution Time</span>
                    </div>
                    <p className="text-lg font-semibold text-white">{result.executionTime}ms</p>
                  </div>
                  <div className="bg-hive-background-tertiary rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Memory className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-hive-text-mutedLight">Memory Used</span>
                    </div>
                    <p className="text-lg font-semibold text-white">
                      {(result.memoryUsed / 1024).toFixed(1)}KB
                    </p>
                  </div>
                </div>

                {/* Result Data */}
                {result.success && result.result && (
                  <div>
                    <Label className="text-white">Result</Label>
                    <div className="mt-1 bg-hive-background-tertiary rounded-lg p-4">
                      <pre className="text-sm text-white overflow-x-auto">
                        {JSON.stringify(result.result, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-hive-text-mutedLight">
                <Terminal className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No output yet</p>
                <p className="text-sm">Execute the tool to see results</p>
              </div>
            )}
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="mt-4">
            <div className="bg-black rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
              {logs.length === 0 ? (
                <p className="text-gray-500">No logs yet...</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-gray-400">{String(index + 1).padStart(2, '0')} </span>
                    <span className={
                      log.includes('[ERROR]') ? 'text-red-400' :
                      log.includes('[WARN]') ? 'text-yellow-400' :
                      log.includes('[TOAST]') ? 'text-blue-400' :
                      'text-green-400'
                    }>
                      {log}
                    </span>
                  </div>
                ))
              )}
              <div ref={logsEndRef} />
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-4">
            {executionHistory.length === 0 ? (
              <div className="text-center py-8 text-hive-text-mutedLight">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No execution history</p>
              </div>
            ) : (
              <div className="space-y-3">
                {executionHistory.map((exec, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-hive-background-tertiary rounded-lg">
                    <div className="flex items-center space-x-3">
                      {exec.success ? 
                        <CheckCircle className="h-4 w-4 text-green-400" /> : 
                        <XCircle className="h-4 w-4 text-red-400" />
                      }
                      <div>
                        <p className="text-sm text-white">
                          {exec.success ? 'Success' : 'Failed'}
                        </p>
                        <p className="text-xs text-hive-text-mutedLight">
                          {exec.executionTime}ms • {(exec.memoryUsed / 1024).toFixed(1)}KB
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-hive-text-mutedLight">
                      {new Date(exec.metadata?.timestamp || Date.now()).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}