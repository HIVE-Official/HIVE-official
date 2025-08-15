import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../../../atomic/atoms/tooltip';
import { Button } from '../../../atomic/atoms/button';
import { Badge } from '../../../atomic/atoms/badge';
import { InfoIcon, HelpCircle, AlertTriangle, Star, Settings } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: '02-atoms/Content Media/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The **Tooltip** atom provides contextual information on hover, click, or focus.
Built with proper accessibility support and flexible positioning options.

### Key Features
- **4 Placements**: Top, bottom, left, right with automatic positioning
- **3 Triggers**: Hover (default), click, focus for different interaction patterns
- **3 Variants**: Default, dark, light with HIVE design token theming
- **3 Sizes**: sm, md, lg for different content amounts
- **Arrow Support**: Optional arrow pointer with automatic color matching
- **Accessibility**: Full keyboard support, ARIA labels, screen reader friendly

### Design Token Usage
Uses \`hive-background-*\`, \`hive-border-*\`, \`hive-text-*\` tokens for consistent theming.

### When to Use
- **Hover**: Additional context or help text
- **Click**: More complex content or persistent display
- **Focus**: Keyboard navigation and accessibility
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position relative to trigger element'
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus'],
      description: 'How the tooltip is activated'
    },
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light'],
      description: 'Visual theme variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tooltip size for different content amounts'
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow pointer to trigger element'
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before showing tooltip'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable tooltip interactions'
    },
    content: {
      control: 'text',
      description: 'Tooltip content (text or React nodes)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// === BASIC USAGE ===
export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    children: <Button>Hover me</Button>
  }
};

export const WithArrow: Story = {
  args: {
    content: 'Tooltip with arrow pointer',
    arrow: true,
    children: <Button>Hover for tooltip</Button>
  }
};

export const LongContent: Story = {
  args: {
    content: 'This is a longer tooltip message that provides more detailed information about the element.',
    size: 'lg',
    arrow: true,
    children: <Button>Extended info</Button>
  }
};

// === ALL PLACEMENTS ===
export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 place-items-center w-96 h-64">
      <div></div>
      <Tooltip content="Top placement" placement="top" arrow>
        <Button variant="outline">Top</Button>
      </Tooltip>
      <div></div>
      
      <Tooltip content="Left placement" placement="left" arrow>
        <Button variant="outline">Left</Button>
      </Tooltip>
      
      <div className="text-center text-hive-text-secondary">
        Hover buttons for tooltips
      </div>
      
      <Tooltip content="Right placement" placement="right" arrow>
        <Button variant="outline">Right</Button>
      </Tooltip>
      
      <div></div>
      <Tooltip content="Bottom placement" placement="bottom" arrow>
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <div></div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All four placement options with arrows. Tooltips automatically adjust for viewport boundaries.'
      }
    }
  }
};

// === ALL TRIGGERS ===
export const AllTriggers: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Tooltip content="Appears on hover (default)" trigger="hover" arrow>
        <Button variant="ghost">
          <InfoIcon className="w-4 h-4 mr-2" />
          Hover Trigger
        </Button>
      </Tooltip>
      
      <Tooltip content="Click to toggle tooltip" trigger="click" arrow>
        <Button variant="outline">
          <HelpCircle className="w-4 h-4 mr-2" />
          Click Trigger
        </Button>
      </Tooltip>
      
      <Tooltip content="Focus with keyboard or mouse" trigger="focus" arrow>
        <Button variant="secondary">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Focus Trigger
        </Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different trigger types: hover (default), click (persistent), and focus (keyboard accessible).'
      }
    }
  }
};

// === ALL VARIANTS ===
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Tooltip content="Default variant tooltip" variant="default" arrow>
        <Badge>Default</Badge>
      </Tooltip>
      
      <Tooltip content="Dark variant tooltip" variant="dark" arrow>
        <Badge variant="secondary">Dark</Badge>
      </Tooltip>
      
      <Tooltip content="Light variant tooltip" variant="light" arrow>
        <Badge variant="outline">Light</Badge>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual variants using different HIVE design token combinations for various contexts.'
      }
    }
  }
};

// === ALL SIZES ===
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-end">
      <Tooltip content="Small" size="sm" arrow>
        <Button size="sm">Small</Button>
      </Tooltip>
      
      <Tooltip content="Medium tooltip with more content" size="md" arrow>
        <Button size="md">Medium</Button>
      </Tooltip>
      
      <Tooltip 
        content="Large tooltip with even more detailed content that can accommodate longer explanations" 
        size="lg" 
        arrow
      >
        <Button size="lg">Large</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip sizes scale with content needs. Match tooltip size to trigger element size for visual harmony.'
      }
    }
  }
};

// === RICH CONTENT ===
export const RichContent: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Tooltip
        content={
          <div className="space-y-2">
            <div className="font-semibold">Feature Status</div>
            <div className="text-sm">
              <div>• Available in Pro plan</div>
              <div>• Includes advanced analytics</div>
              <div>• 24/7 support included</div>
            </div>
          </div>
        }
        size="lg"
        trigger="click"
        arrow
      >
        <Button variant="primary">
          <Star className="w-4 h-4 mr-2" />
          Premium Feature
        </Button>
      </Tooltip>
      
      <Tooltip
        content={
          <div className="space-y-1">
            <div className="font-medium">Settings</div>
            <div className="text-xs opacity-75">Configure your preferences</div>
          </div>
        }
        variant="dark"
        arrow
      >
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can contain rich content including multiple lines, formatting, and structured information.'
      }
    }
  }
};

// === DELAY & DISABLED ===
export const DelayAndDisabled: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Tooltip content="Appears immediately" delay={0} arrow>
        <Button variant="outline">No Delay</Button>
      </Tooltip>
      
      <Tooltip content="Appears after 500ms" delay={500} arrow>
        <Button variant="outline">500ms Delay</Button>
      </Tooltip>
      
      <Tooltip content="This won't show" disabled arrow>
        <Button variant="outline">Disabled Tooltip</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Control tooltip timing with delay prop and disable when needed for conditional help text.'
      }
    }
  }
};

// === INTERACTIVE DEMO ===
export const Interactive: Story = {
  render: (args) => (
    <div className="p-8">
      <Tooltip {...args}>
        <Button>Interactive Tooltip</Button>
      </Tooltip>
    </div>
  ),
  args: {
    content: 'Customizable tooltip',
    placement: 'top',
    trigger: 'hover',
    variant: 'default',
    size: 'md',
    arrow: true,
    delay: 200,
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different tooltip configurations.'
      }
    }
  }
};

// === KITCHEN SINK ===
export const KitchenSink: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      {/* Real-world Usage Examples */}
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Real-world Usage Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Help Text */}
          <div className="p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default">
            <h4 className="font-semibold text-hive-text-primary mb-3">Help Text</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span>Password</span>
                <Tooltip content="Must be at least 8 characters with uppercase, lowercase, and numbers" size="md" arrow>
                  <HelpCircle className="w-4 h-4 text-hive-text-secondary cursor-help" />
                </Tooltip>
              </div>
              <div className="flex items-center gap-2">
                <span>API Key</span>
                <Tooltip content="Found in your account settings under Developer Tools" size="md" arrow>
                  <InfoIcon className="w-4 h-4 text-hive-text-secondary cursor-help" />
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default">
            <h4 className="font-semibold text-hive-text-primary mb-3">Status Indicators</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="success">Active</Badge>
                <Tooltip content="Service is running normally. Last check: 2 minutes ago" variant="dark" arrow>
                  <InfoIcon className="w-4 h-4 text-hive-text-secondary cursor-help" />
                </Tooltip>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="warning">Degraded</Badge>
                <Tooltip 
                  content={
                    <div className="space-y-1">
                      <div className="font-medium">Performance Issues</div>
                      <div className="text-xs">Response times 20% higher than normal</div>
                    </div>
                  }
                  variant="default" 
                  size="md"
                  arrow
                >
                  <AlertTriangle className="w-4 h-4 text-[var(--hive-brand-secondary)] cursor-help" />
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Feature Previews */}
          <div className="p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default">
            <h4 className="font-semibold text-hive-text-primary mb-3">Feature Previews</h4>
            <div className="space-y-3">
              <Tooltip
                content={
                  <div className="space-y-2">
                    <div className="font-semibold">AI Assistant</div>
                    <div className="text-sm">Get intelligent suggestions and automation</div>
                    <div className="text-xs opacity-75">Coming in v2.1</div>
                  </div>
                }
                trigger="click"
                size="lg"
                arrow
              >
                <Button variant="outline" disabled>
                  <Star className="w-4 h-4 mr-2" />
                  AI Assistant (Preview)
                </Button>
              </Tooltip>
            </div>
          </div>

          {/* Keyboard Navigation */}
          <div className="p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default">
            <h4 className="font-semibold text-hive-text-primary mb-3">Keyboard Navigation</h4>
            <div className="space-y-3">
              <Tooltip content="Press Tab to focus, Enter to activate" trigger="focus" arrow>
                <Button variant="ghost">Focus me with Tab</Button>
              </Tooltip>
              <p className="text-sm text-hive-text-secondary">
                Try tabbing through elements to see focus tooltips
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Accessibility Notes */}
      <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
        <h4 className="font-semibold text-hive-text-primary mb-2">♿ Accessibility Features</h4>
        <ul className="text-sm text-hive-text-secondary space-y-1">
          <li>• <strong>Keyboard Support:</strong> Focus trigger reveals tooltip</li>
          <li>• <strong>Screen Readers:</strong> aria-describedby links tooltip to trigger</li>
          <li>• <strong>Escape Key:</strong> Dismisses click-triggered tooltips</li>
          <li>• <strong>Focus Management:</strong> Returns focus to trigger on close</li>
          <li>• <strong>Role Attribution:</strong> Proper tooltip role for assistive technology</li>
          <li>• <strong>Content Guidelines:</strong> Tooltip content shouldn't repeat visible text</li>
        </ul>
      </div>

      {/* Performance Notes */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">⚡ Performance Notes</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Tooltips are rendered on-demand, not hidden in DOM</li>
          <li>• Event listeners are cleaned up automatically</li>
          <li>• Delay prop helps prevent accidental triggers</li>
          <li>• Use sparingly - too many tooltips can overwhelm users</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comprehensive showcase of tooltip patterns, accessibility features, and real-world usage examples.'
      }
    }
  }
};