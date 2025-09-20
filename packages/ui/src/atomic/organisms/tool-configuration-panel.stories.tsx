import type { Meta, StoryObj } from '@storybook/react';
import { ToolConfigurationPanel, ToolConfigurationData } from './tool-configuration-panel';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

const meta: Meta<typeof ToolConfigurationPanel> = {
  title: 'HIVE/Tools/Organisms/ToolConfigurationPanel',
  component: ToolConfigurationPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Advanced configuration panel for planted tools with field validation, sensitive data handling, testing capabilities, and permission management.',
      },
    },
  },
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
    isSaving: { control: { type: 'boolean' } },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToolConfigurationPanel>;

const mockBasicTool: ToolConfigurationData = {
  toolId: 'event-management',
  toolName: 'Event Management',
  toolIcon: '📅',
  version: '2.1.0',
  category: 'coordination',
  description: 'Create, manage, and track events with RSVP functionality and calendar integration',
  
  fields: [
    {
      id: 'title_prefix',
      name: 'Event Title Prefix',
      type: 'text',
      required: false,
      description: 'Optional prefix to add to all event titles',
      placeholder: 'e.g., "[CS Club]"',
      group: 'General',
    },
    {
      id: 'default_location',
      name: 'Default Location',
      type: 'text',
      required: true,
      description: 'Default location for events',
      placeholder: 'Enter default meeting location',
      group: 'General',
    },
    {
      id: 'rsvp_required',
      name: 'Require RSVP',
      type: 'boolean',
      required: false,
      description: 'Require RSVP for all events by default',
      placeholder: 'Require RSVP for events',
      group: 'Settings',
    },
    {
      id: 'reminder_time',
      name: 'Reminder Time',
      type: 'select',
      required: true,
      description: 'When to send event reminders',
      options: [
        { value: '15', label: '15 minutes before' },
        { value: '30', label: '30 minutes before' },
        { value: '60', label: '1 hour before' },
        { value: '1440', label: '1 day before' },
      ],
      group: 'Notifications',
    },
    {
      id: 'max_capacity',
      name: 'Default Max Capacity',
      type: 'number',
      required: false,
      description: 'Default maximum number of attendees',
      placeholder: 'Leave empty for unlimited',
      validation: { min: 1, max: 1000 },
      group: 'Settings',
    },
  ],
  
  currentValues: {
    title_prefix: '[CS Club]',
    default_location: 'Engineering Building, Room 101',
    rsvp_required: true,
    reminder_time: '60',
    max_capacity: 50,
  },
  
  permissions: {
    canConfigure: true,
    canView: true,
    canActivate: true,
    canRemove: true,
  },
  
  status: 'active',
  isConfigured: true,
  lastConfigured: '2024-01-20T10:30:00Z',
  configuredBy: 'sarah_cs',
  
  documentationUrl: 'https://docs.hive.college/tools/event-management',
  supportUrl: 'https://support.hive.college',
};

const mockAdvancedTool: ToolConfigurationData = {
  toolId: 'calendar-sync',
  toolName: 'Calendar Sync',
  toolIcon: '🔄',
  version: '1.3.2',
  category: 'productivity',
  description: 'Sync events with external calendar services like Google Calendar and Outlook',
  
  fields: [
    {
      id: 'service_provider',
      name: 'Calendar Service',
      type: 'select',
      required: true,
      description: 'Choose your calendar service provider',
      options: [
        { value: 'google', label: 'Google Calendar' },
        { value: 'outlook', label: 'Microsoft Outlook' },
        { value: 'apple', label: 'Apple iCloud' },
      ],
      group: 'Connection',
    },
    {
      id: 'api_key',
      name: 'API Key',
      type: 'api_key',
      required: true,
      sensitive: true,
      description: 'Your calendar service API key',
      placeholder: 'Enter your API key',
      group: 'Authentication',
    },
    {
      id: 'client_secret',
      name: 'Client Secret',
      type: 'password',
      required: true,
      sensitive: true,
      description: 'OAuth client secret for calendar access',
      placeholder: 'Enter client secret',
      group: 'Authentication',
    },
    {
      id: 'calendar_id',
      name: 'Calendar ID',
      type: 'text',
      required: true,
      description: 'ID of the calendar to sync with',
      placeholder: 'primary or specific calendar ID',
      group: 'Connection',
    },
    {
      id: 'sync_frequency',
      name: 'Sync Frequency',
      type: 'select',
      required: true,
      description: 'How often to sync with the external calendar',
      options: [
        { value: '5', label: 'Every 5 minutes' },
        { value: '15', label: 'Every 15 minutes' },
        { value: '60', label: 'Every hour' },
        { value: '360', label: 'Every 6 hours' },
      ],
      group: 'Settings',
    },
    {
      id: 'two_way_sync',
      name: 'Two-way Sync',
      type: 'boolean',
      required: false,
      description: 'Allow changes in external calendar to sync back to HIVE',
      placeholder: 'Enable bidirectional sync',
      group: 'Settings',
    },
    {
      id: 'webhook_url',
      name: 'Webhook URL',
      type: 'webhook_url',
      required: false,
      description: 'Webhook endpoint for real-time updates',
      placeholder: 'https://your-app.com/webhook',
      validation: {
        pattern: '^https?://.*',
        message: 'Must be a valid HTTP/HTTPS URL',
      },
      group: 'Advanced',
    },
  ],
  
  currentValues: {
    service_provider: 'google',
    api_key: 'AIzaSyB...',
    client_secret: 'GOCSPX-...',
    calendar_id: 'primary',
    sync_frequency: '15',
    two_way_sync: false,
    webhook_url: '',
  },
  
  permissions: {
    canConfigure: true,
    canView: true,
    canActivate: true,
    canRemove: true,
  },
  
  status: 'configured',
  isConfigured: true,
  lastConfigured: '2024-01-19T15:45:00Z',
  configuredBy: 'mike_physics',
  
  webhookUrl: 'https://api.hive.college/webhooks/tools/calendar-sync/abc123',
  apiEndpoints: [
    { name: 'Get Events', url: '/api/calendar/events', method: 'GET' },
    { name: 'Create Event', url: '/api/calendar/events', method: 'POST' },
    { name: 'Update Event', url: '/api/calendar/events/{id}', method: 'PUT' },
    { name: 'Delete Event', url: '/api/calendar/events/{id}', method: 'DELETE' },
  ],
  
  documentationUrl: 'https://docs.hive.college/tools/calendar-sync',
  supportUrl: 'https://support.hive.college',
};

const mockErrorTool: ToolConfigurationData = {
  ...mockAdvancedTool,
  toolId: 'calendar-sync-error',
  toolName: 'Calendar Sync (Error)',
  status: 'error',
  currentValues: {
    ...mockAdvancedTool.currentValues,
    api_key: 'invalid_key',
  },
};

const mockNeedsSetupTool: ToolConfigurationData = {
  toolId: 'assignment-tracker',
  toolName: 'Assignment Tracker',
  toolIcon: '📝',
  version: '1.0.0',
  category: 'academic',
  description: 'Track assignments, due dates, and submission status across all your courses',
  
  fields: [
    {
      id: 'semester',
      name: 'Current Semester',
      type: 'select',
      required: true,
      description: 'Select your current semester',
      options: [
        { value: 'fall2024', label: 'Fall 2024' },
        { value: 'spring2025', label: 'Spring 2025' },
        { value: 'summer2025', label: 'Summer 2025' },
      ],
      group: 'Academic',
    },
    {
      id: 'courses',
      name: 'Course List',
      type: 'textarea',
      required: true,
      description: 'List your courses, one per line (e.g., "CS 101 - Intro to Programming")',
      placeholder: 'CS 101 - Intro to Programming\nMATH 201 - Calculus II\nENG 102 - Writing',
      group: 'Academic',
    },
    {
      id: 'default_reminder',
      name: 'Default Reminder',
      type: 'select',
      required: true,
      description: 'Default reminder time for assignments',
      options: [
        { value: '1', label: '1 day before' },
        { value: '2', label: '2 days before' },
        { value: '3', label: '3 days before' },
        { value: '7', label: '1 week before' },
      ],
      group: 'Notifications',
    },
    {
      id: 'grade_tracking',
      name: 'Track Grades',
      type: 'boolean',
      required: false,
      description: 'Enable grade tracking for assignments',
      placeholder: 'Track assignment grades',
      group: 'Features',
    },
  ],
  
  currentValues: {},
  
  permissions: {
    canConfigure: true,
    canView: true,
    canActivate: false,
    canRemove: true,
  },
  
  status: 'needs_setup',
  isConfigured: false,
  
  documentationUrl: 'https://docs.hive.college/tools/assignment-tracker',
};

export const BasicTool: Story = {
  args: {
    tool: mockBasicTool,
    isOpen: true,
    onClose: action('close'),
    onSave: action('save'),
    onActivate: action('activate'),
    onDeactivate: action('deactivate'),
    onReset: action('reset'),
    onRemove: action('remove'),
    onTestConfiguration: action('test-configuration'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic tool configuration with simple fields and validation.',
      },
    },
  },
};

export const AdvancedTool: Story = {
  args: {
    tool: mockAdvancedTool,
    isOpen: true,
    onClose: action('close'),
    onSave: action('save'),
    onActivate: action('activate'),
    onDeactivate: action('deactivate'),
    onReset: action('reset'),
    onRemove: action('remove'),
    onTestConfiguration: action('test-configuration'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced tool with sensitive fields, API configuration, and webhook endpoints.',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    tool: mockErrorTool,
    isOpen: true,
    onClose: action('close'),
    onSave: action('save'),
    onReset: action('reset'),
    onRemove: action('remove'),
    onTestConfiguration: action('test-configuration'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool in error state showing configuration issues.',
      },
    },
  },
};

export const NeedsSetup: Story = {
  args: {
    tool: mockNeedsSetupTool,
    isOpen: true,
    onClose: action('close'),
    onSave: action('save'),
    onActivate: action('activate'),
    onRemove: action('remove'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool that needs initial setup with empty configuration.',
      },
    },
  },
};

export const SavingState: Story = {
  args: {
    tool: mockBasicTool,
    isOpen: true,
    isSaving: true,
    onClose: action('close'),
    onSave: action('save'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration panel in saving state with disabled interactions.',
      },
    },
  },
};

export const LimitedPermissions: Story = {
  args: {
    tool: {
      ...mockBasicTool,
      permissions: {
        canConfigure: false,
        canView: true,
        canActivate: false,
        canRemove: false,
      },
    },
    isOpen: true,
    onClose: action('close'),
    onSave: action('save'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration panel for user with limited permissions (view-only).',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [tool, setTool] = useState<ToolConfigurationData>(mockAdvancedTool);

    const handleSave = async (toolId: string, values: Record<string, any>) => {
      setIsSaving(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setTool(prev => ({
          ...prev,
          currentValues: values,
          status: 'active',
          isConfigured: true,
          lastConfigured: new Date().toISOString(),
        }));
        
        action('save')(toolId, values);
      } catch (error) {
        console.error('Failed to save:', error);
      } finally {
        setIsSaving(false);
      }
    };

    const handleTestConfiguration = async (toolId: string, values: Record<string, any>) => {
      // Simulate test based on API key
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const apiKey = values.api_key;
      const isValid = apiKey && apiKey.length > 10 && !apiKey.includes('invalid');
      
      return {
        success: isValid,
        message: isValid 
          ? 'Configuration test successful! Calendar connection established.'
          : 'Configuration test failed. Please check your API key and try again.',
      };
    };

    const handleReset = async (toolId: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTool(prev => ({
        ...prev,
        currentValues: {},
        status: 'needs_setup',
        isConfigured: false,
      })});
      
      action('reset')(toolId);
    };

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-8">
        {!isOpen && (
          <div className="text-center">
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300"
            >
              Configure Tool
            </button>
          </div>
        )}

        <ToolConfigurationPanel
          tool={tool}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
          onActivate={action('activate')}
          onDeactivate={action('deactivate')}
          onReset={handleReset}
          onRemove={action('remove')}
          onTestConfiguration={handleTestConfiguration}
          isSaving={isSaving}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive demo with state management, validation, and testing.',
      },
    },
  },
};

export const AllFieldTypes: Story = {
  args: {
    tool: {
      ...mockBasicTool,
      toolName: 'Field Types Demo',
      toolIcon: '🔧',
      description: 'Demonstration of all available field types',
      fields: [
        {
          id: 'text_field',
          name: 'Text Field',
          type: 'text',
          required: true,
          placeholder: 'Enter some text',
          group: 'Basic Fields',
        },
        {
          id: 'password_field',
          name: 'Password Field',
          type: 'password',
          required: true,
          sensitive: true,
          placeholder: 'Enter password',
          group: 'Basic Fields',
        },
        {
          id: 'number_field',
          name: 'Number Field',
          type: 'number',
          required: false,
          placeholder: 'Enter a number',
          validation: { min: 0, max: 100 },
          group: 'Basic Fields',
        },
        {
          id: 'email_field',
          name: 'Email Field',
          type: 'email',
          required: false,
          placeholder: 'user@example.com',
          group: 'Basic Fields',
        },
        {
          id: 'url_field',
          name: 'URL Field',
          type: 'url',
          required: false,
          placeholder: 'https://example.com',
          group: 'Basic Fields',
        },
        {
          id: 'textarea_field',
          name: 'Textarea Field',
          type: 'textarea',
          required: false,
          placeholder: 'Enter multi-line text',
          group: 'Text Fields',
        },
        {
          id: 'boolean_field',
          name: 'Boolean Field',
          type: 'boolean',
          required: false,
          placeholder: 'Enable this feature',
          group: 'Selection Fields',
        },
        {
          id: 'select_field',
          name: 'Select Field',
          type: 'select',
          required: true,
          options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ],
          group: 'Selection Fields',
        },
        {
          id: 'date_field',
          name: 'Date Field',
          type: 'date',
          required: false,
          group: 'Date/Time Fields',
        },
        {
          id: 'time_field',
          name: 'Time Field',
          type: 'time',
          required: false,
          group: 'Date/Time Fields',
        },
        {
          id: 'api_key_field',
          name: 'API Key Field',
          type: 'api_key',
          required: true,
          sensitive: true,
          placeholder: 'Enter API key',
          group: 'Security Fields',
        },
        {
          id: 'webhook_field',
          name: 'Webhook URL Field',
          type: 'webhook_url',
          required: false,
          placeholder: 'https://api.example.com/webhook',
          validation: {
            pattern: '^https?://.*',
            message: 'Must be a valid URL',
          },
          group: 'Advanced Fields',
        },
      ],
      currentValues: {
        text_field: 'Sample text',
        password_field: 'secret123',
        number_field: 42,
        email_field: 'user@example.com',
        url_field: 'https://example.com',
        textarea_field: 'Multi-line\ntext example',
        boolean_field: true,
        select_field: 'option2',
        date_field: '2024-01-20',
        time_field: '14:30',
        api_key_field: 'sk_test_12345',
        webhook_field: 'https://api.example.com/webhook',
      },
    },
    isOpen: true,
    onClose: action('close'),
    onSave: action('save'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive demonstration of all available field types and their validation.',
      },
    },
  },
};