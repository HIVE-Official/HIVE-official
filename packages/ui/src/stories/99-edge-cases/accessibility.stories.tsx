import type { Meta, StoryObj } from '@storybook/react';
import { HiveButton, HiveCard, HiveBadge } from '../../components';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  AlertCircle, 
  CheckCircle, 
  Volume2,
  Palette,
  Keyboard,
  Accessibility
} from 'lucide-react';
import React, { useState } from 'react';

const meta: Meta = {
  title: '99-Edge Cases/Accessibility',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive accessibility testing including WCAG 2.1 AA compliance, keyboard navigation, screen reader support, and reduced motion preferences.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-4xl">
      <div className="space-y-4">
        <h3 className="text-xl font-medium flex items-center gap-2">
          <Keyboard className="w-5 h-5" />
          Keyboard Navigation
        </h3>
        <p className="text-sm text-muted-foreground">
          Use Tab to navigate through focusable elements, Enter/Space to activate buttons, and Arrow keys in button groups.
        </p>
      </div>
      
      {/* Button Navigation */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Button Navigation</h4>
        <div className="flex gap-2 p-4 border rounded-lg">
          <HiveButton>First Button</HiveButton>
          <HiveButton variant="outline">Second Button</HiveButton>
          <HiveButton variant="ghost">Third Button</HiveButton>
          <HiveButton variant="premium">Fourth Button</HiveButton>
        </div>
        <p className="text-xs text-muted-foreground">
          Tab through buttons, use Enter or Space to activate
        </p>
      </div>
      
      {/* Form Navigation */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Form Navigation</h4>
        <form className="space-y-4 p-4 border rounded-lg max-w-md">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">I agree to the terms and conditions</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="notifications" />
            <Label htmlFor="notifications">Enable notifications</Label>
          </div>
          
          <div className="flex gap-2">
            <HiveButton type="submit">Submit</HiveButton>
            <HiveButton type="button" variant="outline">Cancel</HiveButton>
          </div>
        </form>
        <p className="text-xs text-muted-foreground">
          Tab through form elements, use Space for checkboxes/switches
        </p>
      </div>
      
      {/* Tab Navigation */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Tab Navigation</h4>
        <Tabs defaultValue="tab1" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4 border rounded-lg">
            <h5 className="font-medium mb-2">Tab 1 Content</h5>
            <p className="text-sm text-muted-foreground">Content for the first tab.</p>
            <HiveButton size="sm" className="mt-3">Action in Tab 1</HiveButton>
          </TabsContent>
          <TabsContent value="tab2" className="p-4 border rounded-lg">
            <h5 className="font-medium mb-2">Tab 2 Content</h5>
            <p className="text-sm text-muted-foreground">Content for the second tab.</p>
            <HiveButton size="sm" className="mt-3">Action in Tab 2</HiveButton>
          </TabsContent>
          <TabsContent value="tab3" className="p-4 border rounded-lg">
            <h5 className="font-medium mb-2">Tab 3 Content</h5>
            <p className="text-sm text-muted-foreground">Content for the third tab.</p>
            <HiveButton size="sm" className="mt-3">Action in Tab 3</HiveButton>
          </TabsContent>
        </Tabs>
        <p className="text-xs text-muted-foreground">
          Use Arrow keys to navigate between tab triggers
        </p>
      </div>
    </div>
  ),
};

export const ScreenReaderSupport: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-4xl">
      <div className="space-y-4">
        <h3 className="text-xl font-medium flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Screen Reader Support
        </h3>
        <p className="text-sm text-muted-foreground">
          All components include proper ARIA labels, roles, and descriptions for screen reader accessibility.
        </p>
      </div>
      
      {/* Semantic Buttons */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Semantic Buttons</h4>
        <div className="flex gap-2 flex-wrap">
          <HiveButton aria-label="Save document">
            Save
          </HiveButton>
          <HiveButton 
            variant="outline" 
            aria-label="Delete item permanently"
            aria-describedby="delete-help"
          >
            Delete
          </HiveButton>
          <HiveButton 
            variant="premium"
            aria-label="Upgrade to premium account"
          >
            Upgrade
          </HiveButton>
        </div>
        <p id="delete-help" className="text-xs text-muted-foreground">
          This action cannot be undone
        </p>
      </div>
      
      {/* Status Messages */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Status Messages</h4>
        <div className="space-y-3">
          <div 
            role="status" 
            aria-live="polite"
            className="flex items-center gap-2 p-3 border rounded-lg bg-green-50 border-green-200"
          >
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800">Form saved successfully</span>
          </div>
          
          <div 
            role="alert" 
            aria-live="assertive"
            className="flex items-center gap-2 p-3 border rounded-lg bg-red-50 border-red-200"
          >
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800">Error: Please fix the required fields</span>
          </div>
        </div>
      </div>
      
      {/* Form Labels */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Form Labels & Descriptions</h4>
        <form className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username"
              aria-describedby="username-help"
              placeholder="Enter username"
            />
            <p id="username-help" className="text-xs text-muted-foreground mt-1">
              Must be 3-20 characters, letters and numbers only
            </p>
          </div>
          
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">Preferences</legend>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="email-notifications"
                aria-describedby="email-desc"
              />
              <Label htmlFor="email-notifications">Email notifications</Label>
            </div>
            <p id="email-desc" className="text-xs text-muted-foreground ml-6">
              Receive updates via email
            </p>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="dark-mode"
                aria-describedby="dark-desc"
              />
              <Label htmlFor="dark-mode">Dark mode</Label>
            </div>
            <p id="dark-desc" className="text-xs text-muted-foreground ml-6">
              Switch to dark theme
            </p>
          </fieldset>
        </form>
      </div>
      
      {/* Cards with Landmarks */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Semantic Cards</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HiveCard role="article" aria-labelledby="card1-title">
            <div className="p-6">
              <h5 id="card1-title" className="font-medium mb-2">Article Card</h5>
              <p className="text-sm text-muted-foreground">
                This card uses the article role for standalone content.
              </p>
            </div>
          </HiveCard>
          
          <HiveCard role="region" aria-labelledby="card2-title">
            <div className="p-6">
              <h5 id="card2-title" className="font-medium mb-2">Region Card</h5>
              <p className="text-sm text-muted-foreground">
                This card uses the region role for significant content areas.
              </p>
            </div>
          </HiveCard>
        </div>
      </div>
    </div>
  ),
};

export const ReducedMotion: Story = {
  render: () => {
    const [reduceMotion, setReduceMotion] = useState(false);
    
    return (
      <div className="space-y-8 p-6 max-w-4xl">
        <div className="space-y-4">
          <h3 className="text-xl font-medium flex items-center gap-2">
            <Accessibility className="w-5 h-5" />
            Reduced Motion Support
          </h3>
          <p className="text-sm text-muted-foreground">
            All animations respect the user's motion preferences. Components fall back to instant transitions when motion is reduced.
          </p>
        </div>
        
        {/* Motion Toggle */}
        <div className="p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="motion-toggle" className="text-sm font-medium">
                Simulate Reduced Motion
              </Label>
              <p className="text-xs text-muted-foreground">
                Toggle to test reduced motion behavior
              </p>
            </div>
            <Switch 
              id="motion-toggle"
              checked={reduceMotion}
              onCheckedChange={setReduceMotion}
            />
          </div>
        </div>
        
        {/* Motion Examples */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Button Animations</h4>
            <div className="flex gap-2">
              <HiveButton 
                style={{ 
                  transition: reduceMotion ? 'none' : undefined,
                  transform: reduceMotion ? 'none' : undefined 
                }}
              >
                Hover Me
              </HiveButton>
              <HiveButton 
                variant="premium"
                style={{ 
                  transition: reduceMotion ? 'none' : undefined,
                  transform: reduceMotion ? 'none' : undefined 
                }}
              >
                Premium Button
              </HiveButton>
            </div>
            <p className="text-xs text-muted-foreground">
              {reduceMotion ? 'Animations disabled' : 'Hover for smooth animations'}
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Card Interactions</h4>
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <HiveCard 
                interactive
                style={{ 
                  transition: reduceMotion ? 'none' : undefined,
                  transform: reduceMotion ? 'none' : undefined 
                }}
              >
                <div className="p-4">
                  <h5 className="font-medium mb-2">Interactive Card</h5>
                  <p className="text-sm text-muted-foreground">
                    {reduceMotion ? 'Static interaction' : 'Hover for motion effects'}
                  </p>
                </div>
              </HiveCard>
              
              <HiveCard 
                variant="glass"
                interactive
                style={{ 
                  transition: reduceMotion ? 'none' : undefined,
                  transform: reduceMotion ? 'none' : undefined 
                }}
              >
                <div className="p-4">
                  <h5 className="font-medium mb-2">Glass Card</h5>
                  <p className="text-sm text-muted-foreground">
                    Glass effects with {reduceMotion ? 'no' : 'smooth'} motion
                  </p>
                </div>
              </HiveCard>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Loading States</h4>
            <div className="flex gap-4">
              <HiveButton disabled>
                <div 
                  className={`w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full ${
                    reduceMotion ? '' : 'animate-spin'
                  }`}
                  style={{ 
                    animation: reduceMotion ? 'none' : undefined 
                  }}
                />
                {reduceMotion ? 'Loading...' : 'Loading...'}
              </HiveButton>
              
              <div className="flex items-center gap-2">
                <div 
                  className={`w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full ${
                    reduceMotion ? '' : 'animate-spin'
                  }`}
                  style={{ 
                    animation: reduceMotion ? 'none' : undefined 
                  }}
                />
                <span className="text-sm">Processing...</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {reduceMotion ? 'Spinners show static state' : 'Spinners animate continuously'}
            </p>
          </div>
        </div>
        
        {/* CSS Media Query Example */}
        <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
          <h4 className="text-sm font-medium mb-2">CSS Implementation</h4>
          <code className="text-xs text-blue-800 block">
            {`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`}
          </code>
        </div>
      </div>
    );
  },
};

export const ColorContrast: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-4xl">
      <div className="space-y-4">
        <h3 className="text-xl font-medium flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Color Contrast & Visual Accessibility
        </h3>
        <p className="text-sm text-muted-foreground">
          All color combinations meet WCAG 2.1 AA standards with minimum 4.5:1 contrast ratio for normal text and 3:1 for large text.
        </p>
      </div>
      
      {/* Text Contrast */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Text Contrast Examples</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 p-4 border rounded-lg">
            <h5 className="font-medium">High Contrast (AAA)</h5>
            <div className="space-y-2">
              <p className="text-foreground">Primary text on background</p>
              <p className="text-muted-foreground">Secondary text on background</p>
              <div className="bg-primary text-primary-foreground p-2 rounded">
                White text on primary background
              </div>
            </div>
          </div>
          
          <div className="space-y-3 p-4 border rounded-lg">
            <h5 className="font-medium">Component Contrast</h5>
            <div className="space-y-2">
              <HiveBadge variant="default">Default Badge</HiveBadge>
              <HiveBadge variant="secondary">Secondary Badge</HiveBadge>
              <HiveBadge variant="success">Success Badge</HiveBadge>
              <HiveBadge variant="warning">Warning Badge</HiveBadge>
              <HiveBadge variant="error">Error Badge</HiveBadge>
            </div>
          </div>
        </div>
      </div>
      
      {/* Button Contrast */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Button Contrast States</h4>
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            <HiveButton>Default Button</HiveButton>
            <HiveButton variant="secondary">Secondary</HiveButton>
            <HiveButton variant="outline">Outline</HiveButton>
            <HiveButton variant="ghost">Ghost</HiveButton>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <HiveButton disabled>Disabled Default</HiveButton>
            <HiveButton variant="secondary" disabled>Disabled Secondary</HiveButton>
            <HiveButton variant="outline" disabled>Disabled Outline</HiveButton>
            <HiveButton variant="ghost" disabled>Disabled Ghost</HiveButton>
          </div>
        </div>
      </div>
      
      {/* Form Element Contrast */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Form Element Contrast</h4>
        <div className="space-y-4 max-w-md">
          <div>
            <Label>Normal Input</Label>
            <Input placeholder="Enter text here" />
          </div>
          
          <div>
            <Label>Disabled Input</Label>
            <Input disabled value="Disabled input text" />
          </div>
          
          <div>
            <Label>Error Input</Label>
            <Input 
              className="border-red-500 focus:border-red-500" 
              value="Error state text"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="contrast-check" />
            <Label htmlFor="contrast-check">Checkbox with proper contrast</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="contrast-switch" />
            <Label htmlFor="contrast-switch">Switch with accessible colors</Label>
          </div>
        </div>
      </div>
      
      {/* Focus Indicators */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Focus Indicators</h4>
        <p className="text-sm text-muted-foreground">
          All interactive elements have visible focus indicators that meet accessibility standards.
        </p>
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            <Button>Tab to focus</Button>
            <HiveButton>HIVE Button focus</HiveButton>
            <HiveButton variant="outline">Outline focus</HiveButton>
          </div>
          
          <div className="flex items-center gap-4">
            <Input placeholder="Focus with keyboard" />
            <Checkbox id="focus-check" />
            <Label htmlFor="focus-check">Focus indicator</Label>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const KitchenSink: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <h3 className="text-xl font-medium">Accessibility Kitchen Sink</h3>
      
      {/* Comprehensive Form */}
      <section className="space-y-4">
        <h4 className="text-sm font-medium">Complete Accessible Form</h4>
        <form 
          className="space-y-6 p-6 border rounded-lg max-w-2xl"
          aria-labelledby="form-title"
          aria-describedby="form-description"
        >
          <div>
            <h5 id="form-title" className="text-lg font-medium">Registration Form</h5>
            <p id="form-description" className="text-sm text-muted-foreground">
              Complete all required fields to create your account
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first-name">
                First Name <span aria-label="required" className="text-red-500">*</span>
              </Label>
              <Input 
                id="first-name"
                required
                aria-describedby="first-name-error"
              />
            </div>
            
            <div>
              <Label htmlFor="last-name">
                Last Name <span aria-label="required" className="text-red-500">*</span>
              </Label>
              <Input 
                id="last-name"
                required
                aria-describedby="last-name-error"
              />
            </div>
          </div>
          
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">Account Preferences</legend>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing" />
                <Label htmlFor="marketing">Receive marketing emails</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" />
                <Label htmlFor="newsletter">Subscribe to newsletter</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Enable push notifications</Label>
              </div>
            </div>
          </fieldset>
          
          <div className="flex gap-2">
            <HiveButton type="submit">
              Create Account
            </HiveButton>
            <HiveButton type="button" variant="outline">
              Cancel
            </HiveButton>
          </div>
        </form>
      </section>
      
      {/* Accessible Data Display */}
      <section className="space-y-4">
        <h4 className="text-sm font-medium">Accessible Data Cards</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <HiveCard role="region" aria-labelledby="stats-title">
            <div className="p-6 text-center">
              <h5 id="stats-title" className="font-medium mb-2">User Statistics</h5>
              <div className="text-2xl font-bold" aria-label="1,234 total users">1,234</div>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </HiveCard>
          
          <HiveCard role="region" aria-labelledby="growth-title">
            <div className="p-6 text-center">
              <h5 id="growth-title" className="font-medium mb-2">Growth Rate</h5>
              <div className="text-2xl font-bold text-green-600" aria-label="15.3% growth rate">
                +15.3%
              </div>
              <p className="text-sm text-muted-foreground">This Month</p>
            </div>
          </HiveCard>
          
          <HiveCard role="region" aria-labelledby="revenue-title">
            <div className="p-6 text-center">
              <h5 id="revenue-title" className="font-medium mb-2">Revenue</h5>
              <div className="text-2xl font-bold" aria-label="$45,678 revenue">
                $45,678
              </div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </HiveCard>
        </div>
      </section>
      
      {/* Status Announcements */}
      <section className="space-y-4">
        <h4 className="text-sm font-medium">Live Status Announcements</h4>
        <div className="space-y-3">
          <div 
            role="status" 
            aria-live="polite"
            className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm text-blue-800">System status: All services operational</span>
          </div>
          
          <div 
            role="alert" 
            aria-live="assertive"
            className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
          >
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">Warning: Scheduled maintenance in 1 hour</span>
          </div>
        </div>
      </section>
    </div>
  ),
};