"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, Button, Input, Label, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, Switch, Tabs, TabsContent, TabsList, TabsTrigger } from "@hive/ui";
import { Alert, AlertDescription } from "@hive/ui";
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
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { ToolExecutionPanel } from './tool-execution-panel';
import { toolTemplates, ToolDefinition } from '@/lib/tool-execution-runtime';
import { useFormValidation, toolValidation } from '@/lib/form-validation';

// State Management
import { 
  useCreateTool,
  useUpdateTool,
  useUIStore,
  useAuthStore,
  useToolStore
} from '@hive/hooks';

interface ToolBuilderMigratedProps {
  tool?: ToolDefinition;
  onSave: (tool: ToolDefinition) => Promise<void>;
  onCancel: () => void;
  userId: string;
  spaceId?: string;
  isEditing?: boolean;
}

export function ToolBuilderMigrated({ 
  tool, 
  onSave, 
  onCancel, 
  userId, 
  spaceId,
  isEditing = false 
}: ToolBuilderMigratedProps) {
  // Global state
  const { addToast } = useUIStore();
  const { profile } = useAuthStore();
  const { 
    activeTab, 
    setActiveTab, 
    showPreview, 
    setShowPreview,
    saveDraft,
    getDraft,
    clearDraft
  } = useToolStore();

  // React Query mutations
  const createTool = useCreateTool();
  const updateTool = useUpdateTool();

  // Local state
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
      
      if (tool.permissions) {
        setPermissions(tool.permissions);
      }
    } else {
      // Check for draft
      const draft = getDraft(spaceId || 'personal');
      if (draft) {
        Object.entries(draft.formData || {}).forEach(([key, value]) => {
          setValue(key as any, value);
        });
        setInputFields(draft.inputFields || []);
        setOutputFields(draft.outputFields || []);
        setPermissions(draft.permissions || []);
      }
    }
  }, [tool, getDraft, setValue, spaceId]);

  // Auto-save draft
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isEditing && formData.name) {
        saveDraft(spaceId || 'personal', {
          formData,
          inputFields,
          outputFields,
          permissions
        });
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formData, inputFields, outputFields, permissions, saveDraft, spaceId, isEditing]);

  const handleSave = async () => {
    if (!validateAll()) {
      addToast({
        title: 'Validation Error',
        description: 'Please fix all errors before saving',
        type: 'error',
      });
      return;
    }

    const toolData: ToolDefinition = {
      id: tool?.id || `tool_${Date.now()}`,
      name: formData.name,
      description: formData.description,
      code: formData.code,
      language: formData.language,
      category: formData.category,
      version: formData.version,
      isPublic: formData.isPublic,
      createdBy: userId,
      spaceId: spaceId,
      schema: {
        inputs: inputFields.reduce((acc, field) => ({
          ...acc,
          [field.key]: {
            type: field.type,
            required: field.required,
            description: field.description
          }
        }), {}),
        outputs: outputFields.reduce((acc, field) => ({
          ...acc,
          [field.key]: {
            type: field.type,
            description: field.description
          }
        }), {})
      },
      permissions: permissions,
      createdAt: tool?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: tool?.metadata || {}
    };

    const mutation = isEditing ? updateTool : createTool;
    
    mutation.mutate(toolData, {
      onSuccess: () => {
        addToast({
          title: isEditing ? 'Tool Updated' : 'Tool Created',
          description: `${toolData.name} has been ${isEditing ? 'updated' : 'created'} successfully`,
          type: 'success',
        });
        clearDraft(spaceId || 'personal');
        onSave(toolData);
      },
      onError: (error: any) => {
        addToast({
          title: `Failed to ${isEditing ? 'update' : 'create'} tool`,
          description: error.message || 'Something went wrong',
          type: 'error',
        });
      },
    });
  };

  const addInputField = () => {
    setInputFields([...inputFields, {
      key: `input_${inputFields.length + 1}`,
      type: 'string',
      required: false,
      description: ''
    }]);
  };

  const removeInputField = (index: number) => {
    setInputFields(inputFields.filter((_, i) => i !== index));
  };

  const addOutputField = () => {
    setOutputFields([...outputFields, {
      key: `output_${outputFields.length + 1}`,
      type: 'string',
      description: ''
    }]);
  };

  const removeOutputField = (index: number) => {
    setOutputFields(outputFields.filter((_, i) => i !== index));
  };

  const isProcessing = createTool.isPending || updateTool.isPending;

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="editor">
            <Code className="h-4 w-4 mr-2" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="schema">
            <Settings className="h-4 w-4 mr-2" />
            Schema
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Shield className="h-4 w-4 mr-2" />
            Permissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tool Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e: any) => setValue('name', e.target.value)}
                  onBlur={() => setFieldTouched('name')}
                  placeholder="My Awesome Tool"
                  disabled={isProcessing}
                />
                {touched.name && validationErrors.name && (
                  <p className="text-sm text-destructive mt-1">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e: any) => setValue('description', e.target.value)}
                  onBlur={() => setFieldTouched('description')}
                  placeholder="Describe what your tool does..."
                  rows={3}
                  disabled={isProcessing}
                />
                {touched.description && validationErrors.description && (
                  <p className="text-sm text-destructive mt-1">{validationErrors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={formData.language} 
                    onValueChange={(value: any) => setValue('language', value)}
                    disabled={isProcessing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value: any) => setValue('category', value)}
                    disabled={isProcessing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utility">Utility</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="code">Code</Label>
                <Textarea
                  id="code"
                  value={formData.code}
                  onChange={(e: any) => setValue('code', e.target.value)}
                  onBlur={() => setFieldTouched('code')}
                  placeholder="// Your tool code here..."
                  rows={15}
                  className="font-mono text-sm"
                  disabled={isProcessing}
                />
                {touched.code && validationErrors.code && (
                  <p className="text-sm text-destructive mt-1">{validationErrors.code}</p>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="schema" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-6">
              {/* Input Fields */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Input Fields</Label>
                  <Button 
                    onClick={addInputField} 
                    size="sm" 
                    variant="outline"
                    disabled={isProcessing}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Input
                  </Button>
                </div>
                <div className="space-y-3">
                  {inputFields.map((field, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Input
                        placeholder="Field name"
                        value={field.key}
                        onChange={(e: any) => {
                          const updated = [...inputFields];
                          updated[index].key = e.target.value;
                          setInputFields(updated);
                        }}
                        disabled={isProcessing}
                      />
                      <Select
                        value={field.type}
                        onValueChange={(value: any) => {
                          const updated = [...inputFields];
                          updated[index].type = value;
                          setInputFields(updated);
                        }}
                        disabled={isProcessing}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="string">String</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="boolean">Boolean</SelectItem>
                          <SelectItem value="array">Array</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={field.required}
                          onCheckedChange={(checked: any) => {
                            const updated = [...inputFields];
                            updated[index].required = checked;
                            setInputFields(updated);
                          }}
                          disabled={isProcessing}
                        />
                        <Label className="text-sm">Required</Label>
                      </div>
                      <Button
                        onClick={() => removeInputField(index)}
                        size="sm"
                        variant="outline"
                        disabled={isProcessing}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output Fields */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Output Fields</Label>
                  <Button 
                    onClick={addOutputField} 
                    size="sm" 
                    variant="outline"
                    disabled={isProcessing}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Output
                  </Button>
                </div>
                <div className="space-y-3">
                  {outputFields.map((field, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Input
                        placeholder="Field name"
                        value={field.key}
                        onChange={(e: any) => {
                          const updated = [...outputFields];
                          updated[index].key = e.target.value;
                          setOutputFields(updated);
                        }}
                        disabled={isProcessing}
                      />
                      <Select
                        value={field.type}
                        onValueChange={(value: any) => {
                          const updated = [...outputFields];
                          updated[index].type = value;
                          setOutputFields(updated);
                        }}
                        disabled={isProcessing}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="string">String</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="boolean">Boolean</SelectItem>
                          <SelectItem value="array">Array</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={() => removeOutputField(index)}
                        size="sm"
                        variant="outline"
                        disabled={isProcessing}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          {formData.code && (
            <ToolExecutionPanel
              tool={{
                id: tool?.id || 'preview',
                name: formData.name,
                description: formData.description,
                code: formData.code,
                language: formData.language,
                category: formData.category,
                version: formData.version,
                isPublic: formData.isPublic,
                createdBy: userId,
                spaceId: spaceId,
                schema: {
                  inputs: inputFields.reduce((acc, field) => ({
                    ...acc,
                    [field.key]: {
                      type: field.type,
                      required: field.required,
                      description: field.description
                    }
                  }), {}),
                  outputs: outputFields.reduce((acc, field) => ({
                    ...acc,
                    [field.key]: {
                      type: field.type,
                      description: field.description
                    }
                  }), {})
                },
                permissions: permissions,
                createdAt: tool?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                metadata: {}
              }}
              userId={userId}
              mode="preview"
            />
          )}
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="public">Public Tool</Label>
                  <p className="text-sm text-muted-foreground">
                    Make this tool available to everyone
                  </p>
                </div>
                <Switch
                  id="public"
                  checked={formData.isPublic}
                  onCheckedChange={(checked: any) => setValue('isPublic', checked)}
                  disabled={isProcessing}
                />
              </div>

              {spaceId && (
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    This tool will be available to all members of the space
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button 
          onClick={onCancel} 
          variant="outline"
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
            disabled={isProcessing}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Hide' : 'Show'} Preview
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!formIsValid || isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? 'Update Tool' : 'Create Tool'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}