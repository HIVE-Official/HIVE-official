"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Wrench,
  Plus,
  Save,
  Eye,
  Share,
  Settings,
  AlertTriangle,
  CheckCircle,
  FileText,
  List,
  Calendar,
  Users,
  Poll,
  Link,
  Image,
  ArrowLeft
} from 'lucide-react';

// HIVE UI Components
import { 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Alert,
  AlertDescription
} from '@hive/ui';

// Hooks
import { useHiveAuth } from '@hive/ui';

// Types
interface FormElement {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'url' | 'email';
  label: string;
  description?: string;
  required: boolean;
  options?: string[]; // for select, radio, checkbox
  placeholder?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

interface Tool {
  id?: string;
  name: string;
  description: string;
  category: 'polls' | 'signups' | 'forms' | 'resources' | 'coordination';
  visibility: 'public' | 'space' | 'private';
  spaceId?: string;
  spaceName?: string;
  elements: FormElement[];
  settings: {
    allowMultipleSubmissions: boolean;
    requireAuth: boolean;
    showResults: boolean;
    deadline?: string;
    maxSubmissions?: number;
  };
}

const TOOL_CATEGORIES = [
  {
    id: 'polls',
    name: 'Poll & Voting',
    description: 'Collect opinions and make group decisions',
    icon: Poll,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'signups',
    name: 'Sign-up Sheets',
    description: 'Organize events and collect RSVPs',
    icon: Users,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'forms',
    name: 'Data Collection',
    description: 'Gather information and feedback',
    icon: FileText,
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 'resources',
    name: 'Resource Sharing',
    description: 'Share links, files, and materials',
    icon: Link,
    color: 'from-orange-500 to-amber-600'
  },
  {
    id: 'coordination',
    name: 'Event Coordination',
    description: 'Plan and coordinate group activities',
    icon: Calendar,
    color: 'from-pink-500 to-rose-600'
  }
];

const ELEMENT_TYPES = [
  { id: 'text', name: 'Short Text', icon: FileText, description: 'Single line text input' },
  { id: 'textarea', name: 'Long Text', icon: FileText, description: 'Multi-line text area' },
  { id: 'select', name: 'Dropdown', icon: List, description: 'Select from options' },
  { id: 'radio', name: 'Multiple Choice', icon: Poll, description: 'Choose one option' },
  { id: 'checkbox', name: 'Checkboxes', icon: CheckCircle, description: 'Select multiple options' },
  { id: 'date', name: 'Date', icon: Calendar, description: 'Date picker' },
  { id: 'email', name: 'Email', icon: Link, description: 'Email address input' },
  { id: 'url', name: 'URL', icon: Link, description: 'Website link input' }
];

export default function ToolsBuilderPage() {
  const { user } = useHiveAuth();
  const router = useRouter();
  
  const [tool, setTool] = useState<Tool>({
    name: '',
    description: '',
    category: 'forms',
    visibility: 'public',
    elements: [],
    settings: {
      allowMultipleSubmissions: false,
      requireAuth: true,
      showResults: false
    }
  });
  
  const [currentStep, setCurrentStep] = useState<'category' | 'details' | 'builder' | 'settings' | 'preview'>('category');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [userSpaces, setUserSpaces] = useState<any[]>([]);

  // Fetch user spaces for deployment options
  useEffect(() => {
    const fetchUserSpaces = async () => {
      try {
        const response = await fetch('/api/profile/my-spaces');
        if (response.ok) {
          const data = await response.json();
          setUserSpaces(data.spaces || []);
        }
      } catch (error) {
        console.error('Error fetching user spaces:', error);
      }
    };

    if (user) {
      fetchUserSpaces();
    }
  }, [user]);

  const addElement = (type: FormElement['type']) => {
    const newElement: FormElement = {
      id: `element_${Date.now()}`,
      type,
      label: '',
      required: false,
      ...(type === 'select' || type === 'radio' || type === 'checkbox' ? { options: [''] } : {})
    };

    setTool(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
  };

  const updateElement = (elementId: string, updates: Partial<FormElement>) => {
    setTool(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
  };

  const removeElement = (elementId: string) => {
    setTool(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
  };

  const validateTool = (): string[] => {
    const validationErrors: string[] = [];

    if (!tool.name.trim()) {
      validationErrors.push('Tool name is required');
    }

    if (!tool.description.trim()) {
      validationErrors.push('Tool description is required');
    }

    if (tool.elements.length === 0) {
      validationErrors.push('At least one form element is required');
    }

    tool.elements.forEach((element, index) => {
      if (!element.label.trim()) {
        validationErrors.push(`Element ${index + 1}: Label is required`);
      }

      if ((element.type === 'select' || element.type === 'radio' || element.type === 'checkbox') && 
          (!element.options || element.options.every(opt => !opt.trim()))) {
        validationErrors.push(`Element ${index + 1}: At least one option is required`);
      }
    });

    return validationErrors;
  };

  const saveTool = async () => {
    const validationErrors = validateTool();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    setErrors([]);

    try {
      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...tool,
          createdBy: user?.uid,
          createdAt: new Date().toISOString(),
          status: 'draft'
        })
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/tools/${data.toolId}?created=true`);
      } else {
        setErrors(['Failed to save tool. Please try again.']);
      }
    } catch (error) {
      console.error('Error saving tool:', error);
      setErrors(['An error occurred while saving. Please try again.']);
    } finally {
      setIsSaving(false);
    }
  };

  const renderCategoryStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Create a New Tool</h1>
        <p className="text-muted-foreground">Choose what type of tool you want to build</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOL_CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isSelected = tool.category === category.id;

          return (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-accent bg-accent/10' 
                    : 'hover:border-accent/50'
                }`}
                onClick={() => {
                  setTool(prev => ({ ...prev, category: category.id as any }));
                  setCurrentStep('details');
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Tool Details</h2>
        <p className="text-muted-foreground">Give your tool a name and description</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Tool Name</label>
          <Input
            placeholder="e.g., Study Group Sign-up, Midterm Poll, Resource Collection"
            value={tool.name}
            onChange={(e) => setTool(prev => ({ ...prev, name: e.target.value }))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Description</label>
          <Textarea
            placeholder="Describe what this tool is for and how it will be used..."
            value={tool.description}
            onChange={(e) => setTool(prev => ({ ...prev, description: e.target.value }))}
            className="w-full"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Visibility</label>
          <Select value={tool.visibility} onValueChange={(value: any) => setTool(prev => ({ ...prev, visibility: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public - Anyone can find and use this tool</SelectItem>
              <SelectItem value="space">Space Only - Only space members can access</SelectItem>
              <SelectItem value="private">Private - Only you can access</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {tool.visibility === 'space' && userSpaces.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Deploy to Space</label>
            <Select value={tool.spaceId || ''} onValueChange={(value) => {
              const space = userSpaces.find(s => s.id === value);
              setTool(prev => ({ 
                ...prev, 
                spaceId: value,
                spaceName: space?.name 
              }));
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a space..." />
              </SelectTrigger>
              <SelectContent>
                {userSpaces.map((space) => (
                  <SelectItem key={space.id} value={space.id}>
                    {space.name} ({space.memberCount} members)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={() => setCurrentStep('category')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={() => setCurrentStep('builder')}
            disabled={!tool.name.trim() || !tool.description.trim()}
          >
            Continue to Builder
          </Button>
        </div>
      </div>
    </div>
  );

  const renderBuilderStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Form Builder</h2>
          <p className="text-muted-foreground">Add form elements to collect the data you need</p>
        </div>
        <Button variant="outline" onClick={() => setCurrentStep('details')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Element Types Palette */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Add Elements</h3>
          <div className="space-y-2">
            {ELEMENT_TYPES.map((elementType) => {
              const Icon = elementType.icon;
              return (
                <Button
                  key={elementType.id}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => addElement(elementType.id as FormElement['type'])}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  <div>
                    <div className="font-medium">{elementType.name}</div>
                    <div className="text-xs text-muted-foreground">{elementType.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Form Elements */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-foreground">Form Elements ({tool.elements.length})</h3>
            {tool.elements.length > 0 && (
              <Button size="sm" onClick={() => setCurrentStep('settings')}>
                Continue to Settings
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {tool.elements.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">No elements added yet</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start by adding elements from the left sidebar
                    </p>
                    <Button onClick={() => addElement('text')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Element
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              tool.elements.map((element, index) => (
                <Card key={element.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {ELEMENT_TYPES.find(t => t.id === element.type)?.name}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeElement(element.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Label</label>
                        <Input
                          placeholder="Enter field label..."
                          value={element.label}
                          onChange={(e) => updateElement(element.id, { label: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Required</label>
                        <Select 
                          value={element.required ? 'true' : 'false'} 
                          onValueChange={(value) => updateElement(element.id, { required: value === 'true' })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="false">Optional</SelectItem>
                            <SelectItem value="true">Required</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {element.description !== undefined && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Input
                          placeholder="Optional help text..."
                          value={element.description || ''}
                          onChange={(e) => updateElement(element.id, { description: e.target.value })}
                        />
                      </div>
                    )}

                    {(element.type === 'text' || element.type === 'textarea') && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Placeholder</label>
                        <Input
                          placeholder="Placeholder text..."
                          value={element.placeholder || ''}
                          onChange={(e) => updateElement(element.id, { placeholder: e.target.value })}
                        />
                      </div>
                    )}

                    {(element.type === 'select' || element.type === 'radio' || element.type === 'checkbox') && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Options</label>
                        <div className="space-y-2">
                          {element.options?.map((option, optIndex) => (
                            <div key={optIndex} className="flex gap-2">
                              <Input
                                placeholder={`Option ${optIndex + 1}`}
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...(element.options || [])];
                                  newOptions[optIndex] = e.target.value;
                                  updateElement(element.id, { options: newOptions });
                                }}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newOptions = element.options?.filter((_, i) => i !== optIndex);
                                  updateElement(element.id, { options: newOptions });
                                }}
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newOptions = [...(element.options || []), ''];
                              updateElement(element.id, { options: newOptions });
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Option
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsStep = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Tool Settings</h2>
          <p className="text-muted-foreground">Configure how your tool works</p>
        </div>
        <Button variant="outline" onClick={() => setCurrentStep('builder')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="font-medium text-foreground mb-4">Submission Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-foreground">Allow Multiple Submissions</label>
                <p className="text-sm text-muted-foreground">Users can submit more than once</p>
              </div>
              <Button
                variant={tool.settings.allowMultipleSubmissions ? "default" : "outline"}
                size="sm"
                onClick={() => setTool(prev => ({
                  ...prev,
                  settings: { ...prev.settings, allowMultipleSubmissions: !prev.settings.allowMultipleSubmissions }
                }))}
              >
                {tool.settings.allowMultipleSubmissions ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-foreground">Require Authentication</label>
                <p className="text-sm text-muted-foreground">Only logged-in users can submit</p>
              </div>
              <Button
                variant={tool.settings.requireAuth ? "default" : "outline"}
                size="sm"
                onClick={() => setTool(prev => ({
                  ...prev,
                  settings: { ...prev.settings, requireAuth: !prev.settings.requireAuth }
                }))}
              >
                {tool.settings.requireAuth ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-foreground">Show Results</label>
                <p className="text-sm text-muted-foreground">Make responses visible to users</p>
              </div>
              <Button
                variant={tool.settings.showResults ? "default" : "outline"}
                size="sm"
                onClick={() => setTool(prev => ({
                  ...prev,
                  settings: { ...prev.settings, showResults: !prev.settings.showResults }
                }))}
              >
                {tool.settings.showResults ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium text-foreground mb-4">Optional Limits</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Submission Deadline</label>
              <Input
                type="datetime-local"
                value={tool.settings.deadline || ''}
                onChange={(e) => setTool(prev => ({
                  ...prev,
                  settings: { ...prev.settings, deadline: e.target.value || undefined }
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Maximum Submissions</label>
              <Input
                type="number"
                min="1"
                placeholder="No limit"
                value={tool.settings.maxSubmissions || ''}
                onChange={(e) => setTool(prev => ({
                  ...prev,
                  settings: { 
                    ...prev.settings, 
                    maxSubmissions: e.target.value ? parseInt(e.target.value) : undefined 
                  }
                }))}
              />
            </div>
          </div>
        </Card>

        <div className="flex gap-2">
          <Button onClick={() => setCurrentStep('preview')}>
            <Eye className="h-4 w-4 mr-2" />
            Preview Tool
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPreviewStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Preview & Save</h2>
          <p className="text-muted-foreground">Review your tool before saving</p>
        </div>
        <Button variant="outline" onClick={() => setCurrentStep('settings')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {errors.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div>Please fix the following issues:</div>
            <ul className="mt-2 list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tool Info */}
        <div>
          <h3 className="font-medium text-foreground mb-4">Tool Information</h3>
          <Card className="p-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-foreground">{tool.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-foreground">{tool.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <Badge variant="secondary">
                  {TOOL_CATEGORIES.find(c => c.id === tool.category)?.name}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Visibility</label>
                <Badge variant="outline">{tool.visibility}</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Form Preview */}
        <div>
          <h3 className="font-medium text-foreground mb-4">Form Preview</h3>
          <Card className="p-4">
            <form className="space-y-4">
              {tool.elements.map((element) => (
                <div key={element.id}>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    {element.label}
                    {element.required && <span className="text-destructive ml-1">*</span>}
                  </label>
                  {element.description && (
                    <p className="text-sm text-muted-foreground mb-2">{element.description}</p>
                  )}
                  
                  {element.type === 'text' && (
                    <Input placeholder={element.placeholder} disabled />
                  )}
                  {element.type === 'textarea' && (
                    <Textarea placeholder={element.placeholder} disabled />
                  )}
                  {element.type === 'select' && (
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an option..." />
                      </SelectTrigger>
                    </Select>
                  )}
                  {element.type === 'radio' && (
                    <div className="space-y-2">
                      {element.options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input type="radio" disabled />
                          <label className="text-sm">{option}</label>
                        </div>
                      ))}
                    </div>
                  )}
                  {element.type === 'checkbox' && (
                    <div className="space-y-2">
                      {element.options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input type="checkbox" disabled />
                          <label className="text-sm">{option}</label>
                        </div>
                      ))}
                    </div>
                  )}
                  {element.type === 'date' && (
                    <Input type="date" disabled />
                  )}
                  {element.type === 'email' && (
                    <Input type="email" placeholder="Enter email address" disabled />
                  )}
                  {element.type === 'url' && (
                    <Input type="url" placeholder="https://example.com" disabled />
                  )}
                </div>
              ))}
            </form>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 pt-6">
        <Button
          size="lg"
          onClick={saveTool}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-4 w-4 mr-2"
              >
                <Save className="h-4 w-4" />
              </motion.div>
              Saving Tool...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save & Deploy Tool
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderProgressBar = () => {
    const steps = ['category', 'details', 'builder', 'settings', 'preview'];
    const currentIndex = steps.indexOf(currentStep);
    const progress = ((currentIndex + 1) / steps.length) * 100;

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-muted-foreground">
            Step {currentIndex + 1} of {steps.length}
          </div>
          <div className="text-sm text-muted-foreground">
            {progress.toFixed(0)}% Complete
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            className="bg-accent h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Authentication Required</h2>
            <p className="text-muted-foreground">Please log in to create tools.</p>
            <Button onClick={() => router.push('/auth/login')}>
              Log In
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {renderProgressBar()}

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 'category' && renderCategoryStep()}
        {currentStep === 'details' && renderDetailsStep()}
        {currentStep === 'builder' && renderBuilderStep()}
        {currentStep === 'settings' && renderSettingsStep()}
        {currentStep === 'preview' && renderPreviewStep()}
      </motion.div>
    </div>
  );
}