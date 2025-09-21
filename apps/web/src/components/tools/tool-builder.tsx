"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, Button, Input, Label, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, Switch, Tabs, TabsContent, TabsList, TabsTrigger } from "@hive/ui";
import { Alert, AlertDescription } from "@/components/temp-stubs";
import {
  Code,
  Save,
  Play,
  Settings,
  Eye,
  FileText,
  Shield,
  Zap,
  Plus,
  Trash2,
  Copy,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { ToolExecutionPanel } from './tool-execution-panel';
import { toolTemplates, ToolDefinition } from '../../lib/tool-execution-runtime';
import { useFormValidation, toolValidation } from '../../lib/form-validation';

interface ToolBuilderProps {
  tool?: ToolDefinition;
  onSave: (tool: ToolDefinition) => Promise<void>;
  onCancel: () => void;
  userId: string;
  spaceId?: string;
  isEditing?: boolean;
}

export function ToolBuilder({ 
  tool, 
  onSave, 
  onCancel, 
  userId, 
  spaceId,
  isEditing = false 
}: ToolBuilderProps) {
  const [activeTab, setActiveTab] = useState('editor');
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [inputFields, setInputFields] = useState<Array<{
    key: string;
    type: string;
    required: boolean;
    description: string;
  }>>([]);
  const [outputFields, setOutputFields] = useState<Array<{
    key: string;
    type: string;
    description: string;
  }>>([]);
  const [permissions, setPermissions] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form validation
  const {
    data: formData,
    errors: validationErrors,
    touched,
    isValid: formIsValid,
    setValue,
    setTouched: setFieldTouched,
    validateAll
  } = useFormValidation({
    name: tool?.name || '',
    description: tool?.description || '',
    code: tool?.code || '',
    language: tool?.language || 'javascript',
    category: tool?.category || 'utility',
    version: tool?.version || '1.0.0',
    isPublic: tool?.isPublic || false
  }, toolValidation);

  // Initialize form data
  useEffect(() => {
    if (tool) {
      setValue('name', tool.name);
      setValue('description', tool.description);
      setValue('code', tool.code);
      setValue('language', tool.language);
      setValue('category', tool.category);
      setValue('version', tool.version);
      setValue('isPublic', tool.isPublic);
      
      // Initialize schema fields
      if (tool.schema.inputs) {
        const inputs = Object.entries(tool.schema.inputs).map(([key, def]) => ({
          key,
          type: (def as any).type || 'string',
          required: (def as any).required || false,
          description: (def as any).description || ''
        }));
        setInputFields(inputs);
      }
      
      if (tool.schema.outputs) {
        const outputs = Object.entries(tool.schema.outputs).map(([key, def]) => ({
          key,
          type: (def as any).type || 'string',
          description: (def as any).description || ''
        }));
        setOutputFields(outputs);
      }
      
      setPermissions(tool.permissions || []);
    }
  }, [tool, setValue]);

  const handleInputChange = (field: string, value: any) => {
    setValue(field, value);
  };

  const handleFieldBlur = (field: string) => {
    setFieldTouched(field);
  };

  const loadTemplate = (templateName: string) => {
    const template = toolTemplates[templateName as keyof typeof toolTemplates];
    if (template) {
      setValue('name', template.name);
      setValue('code', template.code);
      
      // Load schema
      const inputs = Object.entries(template.schema.inputs).map(([key, def]) => ({
        key,
        type: (def as any).type || 'string',
        required: (def as any).required || false,
        description: (def as any).description || ''
      }));
      setInputFields(inputs);
      
      const outputs = Object.entries(template.schema.outputs).map(([key, def]) => ({
        key,
        type: (def as any).type || 'string',
        description: (def as any).description || ''
      }));
      setOutputFields(outputs);
    }
  };

  const addInputField = () => {
    setInputFields(prev => [...prev, {
      key: `input${prev.length + 1}`,
      type: 'string',
      required: false,
      description: ''
    }]);
  };

  const removeInputField = (index: number) => {
    setInputFields(prev => prev.filter((_, i) => i !== index));
  };

  const updateInputField = (index: number, field: string, value: any) => {
    setInputFields(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const addOutputField = () => {
    setOutputFields(prev => [...prev, {
      key: `output${prev.length + 1}`,
      type: 'string',
      description: ''
    }]);
  };

  const removeOutputField = (index: number) => {
    setOutputFields(prev => prev.filter((_, i) => i !== index));
  };

  const updateOutputField = (index: number, field: string, value: any) => {
    setOutputFields(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const togglePermission = (permission: string) => {
    setPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const exportTool = () => {
    const toolData = buildToolDefinition();
    const dataStr = JSON.stringify(toolData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.name.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importTool = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const toolData = JSON.parse(e.target?.result as string);
          // Load imported tool data
          setValue('name', toolData.name);
          setValue('description', toolData.description);
          setValue('code', toolData.code);
          setValue('language', toolData.language || 'javascript');
          setValue('category', toolData.category || 'utility');
          setValue('version', toolData.version || '1.0.0');
          setValue('isPublic', toolData.isPublic || false);
          
          // Load schema and permissions
          if (toolData.schema?.inputs) {
            const inputs = Object.entries(toolData.schema.inputs).map(([key, def]) => ({
              key,
              type: (def as any).type || 'string',
              required: (def as any).required || false,
              description: (def as any).description || ''
            }));
            setInputFields(inputs);
          }
          
          if (toolData.schema?.outputs) {
            const outputs = Object.entries(toolData.schema.outputs).map(([key, def]) => ({
              key,
              type: (def as any).type || 'string',
              description: (def as any).description || ''
            }));
            setOutputFields(outputs);
          }
          
          setPermissions(toolData.permissions || []);
        } catch (error) {
          console.error('Failed to import tool:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const buildToolDefinition = (): ToolDefinition => {
    const inputs: Record<string, any> = {};
    inputFields.forEach(field => {
      inputs[field.key] = {
        type: field.type,
        required: field.required,
        description: field.description
      };
    });

    const outputs: Record<string, any> = {};
    outputFields.forEach(field => {
      outputs[field.key] = {
        type: field.type,
        description: field.description
      };
    });

    return {
      id: tool?.id || `tool_${Date.now()}`,
      name: formData.name,
      code: formData.code,
      language: formData.language as 'javascript' | 'typescript' | 'python',
      version: formData.version,
      dependencies: [], // TODO: Parse from code
      permissions,
      schema: { inputs, outputs },
      category: formData.category,
      isPublic: formData.isPublic,
      createdBy: tool?.createdBy || userId,
      createdAt: tool?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: formData.description
    };
  };

  const handleSave = async () => {
    const validation = validateAll();
    if (!validation.isValid) {
      Object.keys(formData).forEach(field => {
        setFieldTouched(field);
      });
      return;
    }

    setIsSaving(true);
    try {
      const toolDef = buildToolDefinition();
      await onSave(toolDef);
    } catch (error) {
      console.error('Failed to save tool:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const availablePermissions = [
    { id: 'user:read', name: 'Read User Data', description: 'Access user profile information' },
    { id: 'user:write', name: 'Write User Data', description: 'Modify user profile information' },
    { id: 'space:read', name: 'Read Space Data', description: 'Access space information and members' },
    { id: 'space:write', name: 'Write Space Data', description: 'Modify space information' },
    { id: 'storage:read', name: 'Read Storage', description: 'Access tool storage data' },
    { id: 'storage:write', name: 'Write Storage', description: 'Store data persistently' },
    { id: 'network:read', name: 'Network Read', description: 'Make HTTP GET requests' },
    { id: 'network:write', name: 'Network Write', description: 'Make HTTP POST/PUT requests' }
  ];

  const fieldTypes = [
    'string', 'number', 'boolean', 'array', 'object', 'date', 'file', 'url', 'email'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {isEditing ? 'Edit Tool' : 'Create New Tool'}
          </h2>
          <p className="text-hive-text-mutedLight">
            Build custom tools for your HIVE community
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button
            variant="secondary"
            onClick={exportTool}
            disabled={!formData.name}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Hide' : 'Show'} Preview
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={importTool}
        className="hidden"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Builder */}
        <div className="space-y-6">
          {/* Templates */}
          <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
            <h3 className="font-medium text-white mb-3">Quick Start Templates</h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(toolTemplates).map(template => (
                <Button
                  key={template}
                  variant="secondary"
                  size="sm"
                  onClick={() => loadTemplate(template)}
                >
                  {toolTemplates[template as keyof typeof toolTemplates].name}
                </Button>
              ))}
            </div>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="editor">
                <Code className="h-4 w-4 mr-2" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="schema">
                <FileText className="h-4 w-4 mr-2" />
                Schema
              </TabsTrigger>
              <TabsTrigger value="permissions">
                <Shield className="h-4 w-4 mr-2" />
                Permissions
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Editor Tab */}
            <TabsContent value="editor" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Tool Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e: React.ChangeEvent) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleFieldBlur('name')}
                    placeholder="Enter tool name"
                    className={`mt-1 ${touched.name && validationErrors.name?.length ? 'border-red-500' : ''}`}
                  />
                  {touched.name && validationErrors.name?.length > 0 && (
                    <p className="text-red-400 text-sm mt-1">{validationErrors.name[0]}</p>
                  )}
                </div>
                
                <div>
                  <Label className="text-white">Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => handleInputChange('language', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-white">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e: React.ChangeEvent) => handleInputChange('description', e.target.value)}
                  onBlur={() => handleFieldBlur('description')}
                  placeholder="Describe what your tool does..."
                  rows={3}
                  className={`mt-1 ${touched.description && validationErrors.description?.length ? 'border-red-500' : ''}`}
                />
                {touched.description && validationErrors.description?.length > 0 && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.description[0]}</p>
                )}
              </div>

              <div>
                <Label className="text-white">Code</Label>
                <Textarea
                  value={formData.code}
                  onChange={(e: React.ChangeEvent) => handleInputChange('code', e.target.value)}
                  onBlur={() => handleFieldBlur('code')}
                  placeholder="// Write your tool code here..."
                  rows={12}
                  className={`mt-1 font-mono text-sm ${touched.code && validationErrors.code?.length ? 'border-red-500' : ''}`}
                />
                {touched.code && validationErrors.code?.length > 0 && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.code[0]}</p>
                )}
              </div>
            </TabsContent>

            {/* Schema Tab */}
            <TabsContent value="schema" className="space-y-6 mt-4">
              {/* Input Fields */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-white">Input Fields</Label>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={addInputField}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Input
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {inputFields.map((field, index) => (
                    <Card key={index} className="p-3 bg-hive-background-tertiary">
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-3">
                          <Input
                            value={field.key}
                            onChange={(e: React.ChangeEvent) => updateInputField(index, 'key', e.target.value)}
                            placeholder="Field name"
                            className="text-sm"
                          />
                        </div>
                        <div className="col-span-2">
                          <Select
                            value={field.type}
                            onValueChange={(value) => updateInputField(index, 'type', value)}
                          >
                            <SelectTrigger className="text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {fieldTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-5">
                          <Input
                            value={field.description}
                            onChange={(e: React.ChangeEvent) => updateInputField(index, 'description', e.target.value)}
                            placeholder="Description"
                            className="text-sm"
                          />
                        </div>
                        <div className="col-span-1">
                          <Switch
                            checked={field.required}
                            onCheckedChange={(checked) => updateInputField(index, 'required', checked)}
                          />
                        </div>
                        <div className="col-span-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => removeInputField(index)}
                            className="text-red-400 border-red-400"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {inputFields.length === 0 && (
                    <p className="text-hive-text-mutedLight text-center py-4">
                      No input fields defined
                    </p>
                  )}
                </div>
              </div>

              {/* Output Fields */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-white">Output Fields</Label>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={addOutputField}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Output
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {outputFields.map((field, index) => (
                    <Card key={index} className="p-3 bg-hive-background-tertiary">
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-3">
                          <Input
                            value={field.key}
                            onChange={(e: React.ChangeEvent) => updateOutputField(index, 'key', e.target.value)}
                            placeholder="Field name"
                            className="text-sm"
                          />
                        </div>
                        <div className="col-span-2">
                          <Select
                            value={field.type}
                            onValueChange={(value) => updateOutputField(index, 'type', value)}
                          >
                            <SelectTrigger className="text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {fieldTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-6">
                          <Input
                            value={field.description}
                            onChange={(e: React.ChangeEvent) => updateOutputField(index, 'description', e.target.value)}
                            placeholder="Description"
                            className="text-sm"
                          />
                        </div>
                        <div className="col-span-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => removeOutputField(index)}
                            className="text-red-400 border-red-400"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {outputFields.length === 0 && (
                    <p className="text-hive-text-mutedLight text-center py-4">
                      No output fields defined
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Permissions Tab */}
            <TabsContent value="permissions" className="space-y-4 mt-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Select the permissions your tool needs. Users will see these when they install your tool.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                {availablePermissions.map(perm => (
                  <Card key={perm.id} className="p-4 bg-hive-background-tertiary">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{perm.name}</h4>
                        <p className="text-sm text-hive-text-mutedLight">{perm.description}</p>
                      </div>
                      <Switch
                        checked={permissions.includes(perm.id)}
                        onCheckedChange={() => togglePermission(perm.id)}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utility">Utility</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-white">Version</Label>
                  <Input
                    value={formData.version}
                    onChange={(e: React.ChangeEvent) => handleInputChange('version', e.target.value)}
                    placeholder="1.0.0"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Public Tool</Label>
                  <p className="text-sm text-hive-text-mutedLight">
                    Make this tool discoverable by other HIVE users
                  </p>
                </div>
                <Switch
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleSave}
                disabled={!formIsValid || isSaving}
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Tool'}
              </Button>
            </div>
          </div>
        </div>

        {/* Preview */}
        {showPreview && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
            {formData.name && formData.code ? (
              <ToolExecutionPanel
                tool={buildToolDefinition()}
                userId={userId}
                spaceId={spaceId}
              />
            ) : (
              <Card className="p-8 bg-hive-background-overlay border-hive-border-default">
                <div className="text-center text-hive-text-mutedLight">
                  <Code className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Complete the tool details to see preview</p>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}