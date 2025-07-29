import type { Meta, StoryObj } from '@storybook/react';
import { HiveButton, HiveCard, HiveBadge } from '../../components';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Heart,
  Star,
  Settings,
  Download,
  Upload,
  Trash2
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta = {
  title: '99-Edge Cases/Interactive States',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive coverage of all interactive states, edge cases, and error scenarios.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ButtonStates: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <h3 className="text-xl font-medium">Button Interactive States</h3>
      
      {/* All Button States */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Standard Button States</h4>
          <div className="flex gap-4 flex-wrap">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Destructive
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">HIVE Button States</h4>
          <div className="flex gap-4 flex-wrap">
            <HiveButton>Default</HiveButton>
            <HiveButton disabled>Disabled</HiveButton>
            <HiveButton variant="premium">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading Premium
            </HiveButton>
            <HiveButton variant="gold">
              <Star className="mr-2 h-4 w-4" />
              Gold Accent
            </HiveButton>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Button Sizes with States</h4>
          <div className="flex items-center gap-4 flex-wrap">
            <HiveButton size="sm" disabled>Small Disabled</HiveButton>
            <HiveButton size="default">
              <Download className="mr-2 h-4 w-4" />
              Default
            </HiveButton>
            <HiveButton size="lg" variant="premium">
              <Upload className="mr-2 h-4 w-4" />
              Large Premium
            </HiveButton>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FormStates: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: '',
      notifications: false,
      terms: false,
      newsletter: true,
    });

    return (
      <div className="space-y-8 p-6 max-w-2xl">
        <h3 className="text-xl font-medium">Form Interactive States</h3>
        
        {/* Input States */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Input States</h4>
          <div className="space-y-3">
            <div>
              <Label>Default Input</Label>
              <Input placeholder="Enter your email" />
            </div>
            
            <div>
              <Label>Filled Input</Label>
              <Input value="user@example.com" onChange={() => {}} />
            </div>
            
            <div>
              <Label>Disabled Input</Label>
              <Input disabled value="Disabled value" />
            </div>
            
            <div>
              <Label>Error State</Label>
              <Input 
                className="border-red-500 focus:border-red-500" 
                value="invalid-email" 
                onChange={() => {}}
              />
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                Please enter a valid email address
              </p>
            </div>
            
            <div>
              <Label>Success State</Label>
              <Input 
                className="border-green-500 focus:border-green-500" 
                value="valid@example.com" 
                onChange={() => {}}
              />
              <p className="text-sm text-green-500 mt-1 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Email address is valid
              </p>
            </div>
          </div>
        </div>
        
        {/* Checkbox States */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Checkbox States</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="checkbox-unchecked" 
                checked={false}
                onCheckedChange={() => {}}
              />
              <Label htmlFor="checkbox-unchecked">Unchecked</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="checkbox-checked" 
                checked={true}
                onCheckedChange={() => {}}
              />
              <Label htmlFor="checkbox-checked">Checked</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="checkbox-disabled" 
                disabled
                checked={false}
                onCheckedChange={() => {}}
              />
              <Label htmlFor="checkbox-disabled">Disabled Unchecked</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="checkbox-disabled-checked" 
                disabled
                checked={true}
                onCheckedChange={() => {}}
              />
              <Label htmlFor="checkbox-disabled-checked">Disabled Checked</Label>
            </div>
          </div>
        </div>
        
        {/* Switch States */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Switch States</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch 
                checked={false}
                onCheckedChange={() => {}}
              />
              <Label>Off</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                checked={true}
                onCheckedChange={() => {}}
              />
              <Label>On</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                disabled
                checked={false}
                onCheckedChange={() => {}}
              />
              <Label>Disabled Off</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                disabled
                checked={true}
                onCheckedChange={() => {}}
              />
              <Label>Disabled On</Label>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const LoadingStates: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const simulateLoading = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    };

    return (
      <div className="space-y-8 p-6">
        <h3 className="text-xl font-medium">Loading States</h3>
        
        {/* Button Loading States */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Button Loading</h4>
          <div className="flex gap-4 flex-wrap">
            <Button disabled={isLoading} onClick={simulateLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Start Loading'
              )}
            </Button>
            
            <HiveButton disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'HIVE Button'
              )}
            </HiveButton>
            
            <Button variant="outline" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Card Loading States */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Card Loading</h4>
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            <HiveCard>
              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-sm">Loading content...</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded animate-pulse" />
                      <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-medium mb-2">Loaded Content</h4>
                    <p className="text-sm text-muted-foreground">
                      This content was loaded successfully.
                    </p>
                  </div>
                )}
              </div>
            </HiveCard>
            
            <HiveCard variant="glass">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Status Card</h4>
                  <HiveBadge variant={isLoading ? "warning" : "success"}>
                    {isLoading ? "Loading" : "Ready"}
                  </HiveBadge>
                </div>
                <div className="space-y-2">
                  {isLoading ? (
                    <>
                      <div className="h-3 bg-muted rounded animate-pulse" />
                      <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      All systems operational.
                    </p>
                  )}
                </div>
              </div>
            </HiveCard>
          </div>
        </div>
      </div>
    );
  },
};

export const ErrorStates: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <h3 className="text-xl font-medium">Error States</h3>
      
      {/* Form Errors */}
      <div className="space-y-4 max-w-md">
        <h4 className="text-sm font-medium">Form Validation Errors</h4>
        <div className="space-y-4">
          <div>
            <Label>Email Address</Label>
            <Input 
              className="border-red-500 focus:border-red-500" 
              value="invalid-email" 
            />
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Please enter a valid email address
            </p>
          </div>
          
          <div>
            <Label>Password</Label>
            <Input 
              type="password"
              className="border-red-500 focus:border-red-500" 
              value="123" 
            />
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Password must be at least 8 characters
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms-error" 
              className="border-red-500"
              checked={false}
            />
            <Label htmlFor="terms-error" className="text-red-500">
              You must accept the terms and conditions
            </Label>
          </div>
        </div>
      </div>
      
      {/* Error Cards */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Error Cards</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          <HiveCard variant="outline" className="border-red-500">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <XCircle className="h-5 w-5 text-red-500" />
                <h4 className="font-medium text-red-500">Connection Failed</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Unable to connect to the server. Please check your internet connection.
              </p>
              <HiveButton variant="outline" size="sm">
                Retry Connection
              </HiveButton>
            </div>
          </HiveCard>
          
          <HiveCard>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <h4 className="font-medium">Warning</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                This action cannot be undone. Are you sure you want to continue?
              </p>
              <div className="flex gap-2">
                <HiveButton variant="outline" size="sm">Cancel</HiveButton>
                <HiveButton variant="gold" size="sm">Continue</HiveButton>
              </div>
            </div>
          </HiveCard>
        </div>
      </div>
      
      {/* Error Badges */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Error Badges</h4>
        <div className="flex gap-4 flex-wrap">
          <HiveBadge variant="error">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </HiveBadge>
          <HiveBadge variant="warning">
            <AlertCircle className="w-3 h-3 mr-1" />
            Warning
          </HiveBadge>
          <HiveBadge variant="outline" className="border-red-500 text-red-500">
            Critical Error
          </HiveBadge>
        </div>
      </div>
    </div>
  ),
};

export const KitchenSink: Story = {
  render: () => {
    const [states, setStates] = useState({
      loading: false,
      error: false,
      success: false,
      disabled: false,
    });

    const toggleState = (key: keyof typeof states) => {
      setStates(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="space-y-8 p-6">
        <h3 className="text-xl font-medium">Interactive States Kitchen Sink</h3>
        
        {/* State Controls */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <h4 className="text-sm font-medium">State Controls</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(states).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Switch 
                  checked={value}
                  onCheckedChange={() => toggleState(key as keyof typeof states)}
                />
                <Label className="capitalize">{key}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dynamic Components */}
        <div className="space-y-6">
          {/* Buttons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Dynamic Buttons</h4>
            <div className="flex gap-4 flex-wrap">
              <Button 
                disabled={states.disabled || states.loading}
                variant={states.error ? "destructive" : "default"}
              >
                {states.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : states.error ? (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Error
                  </>
                ) : states.success ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Success
                  </>
                ) : (
                  'Dynamic Button'
                )}
              </Button>
              
              <HiveButton 
                disabled={states.disabled || states.loading}
                variant={states.success ? "premium" : states.error ? "outline" : "default"}
              >
                {states.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'HIVE Button'
                )}
              </HiveButton>
            </div>
          </div>
          
          {/* Cards */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Dynamic Cards</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              <HiveCard 
                variant={states.success ? "elevated" : states.error ? "outline" : "default"}
                className={states.error ? "border-red-500" : ""}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {states.loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : states.error ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : states.success ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Settings className="h-5 w-5" />
                    )}
                    <h4 className="font-medium">
                      {states.loading ? 'Loading...' : 
                       states.error ? 'Error State' :
                       states.success ? 'Success State' : 
                       'Default State'}
                    </h4>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {states.loading ? 'Please wait while we process your request...' :
                     states.error ? 'Something went wrong. Please try again.' :
                     states.success ? 'Operation completed successfully!' :
                     'This card adapts to different states.'}
                  </p>
                  
                  <div className="flex gap-2">
                    <HiveButton 
                      size="sm" 
                      disabled={states.disabled || states.loading}
                      variant={states.success ? "premium" : "outline"}
                    >
                      {states.error ? 'Retry' : states.success ? 'Continue' : 'Action'}
                    </HiveButton>
                  </div>
                </div>
              </HiveCard>
              
              <HiveCard variant="glass">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Status Monitor</h4>
                    <HiveBadge 
                      variant={states.loading ? "warning" : 
                               states.error ? "error" :
                               states.success ? "success" : 
                               "default"}
                    >
                      {states.loading ? 'Processing' :
                       states.error ? 'Failed' :
                       states.success ? 'Success' :
                       'Ready'}
                    </HiveBadge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Status:</span>
                      <span className={
                        states.error ? 'text-red-500' :
                        states.success ? 'text-green-500' :
                        states.loading ? 'text-yellow-500' :
                        'text-muted-foreground'
                      }>
                        {states.loading ? 'In Progress' :
                         states.error ? 'Error' :
                         states.success ? 'Complete' :
                         'Idle'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Enabled:</span>
                      <span>{states.disabled ? 'No' : 'Yes'}</span>
                    </div>
                  </div>
                </div>
              </HiveCard>
            </div>
          </div>
        </div>
      </div>
    );
  },
};