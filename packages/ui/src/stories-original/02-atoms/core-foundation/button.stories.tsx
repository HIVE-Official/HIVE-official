import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../atomic/atoms/button';
import { Loader2, Plus, Download, Heart, Star } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: '02-atoms/Core Foundation/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The **Button** atom is the primary interactive element in HIVE's design system. 
Built with enhanced HIVE design tokens, it provides consistent styling, accessibility, 
and behavior across all HIVE applications.

### Key Features
- **5 Variants**: Primary, secondary, ghost, outline, destructive
- **4 Sizes**: sm (32px), md (10), lg (48px), xl (56px) 
- **44px+ Touch Targets**: Mobile-optimized for accessibility
- **Loading States**: Built-in spinner with accessible labels
- **Icon Support**: Leading and trailing icon positions
- **Full Accessibility**: WCAG 2.1 AA compliant with proper focus management

### Design Token Usage
Uses \`hive-gold\`, \`hive-obsidian\`, \`hive-background-*\` and \`hive-border-*\` tokens exclusively.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'destructive'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Button size (affects height and padding)'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state with reduced opacity and no interactions'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner and disabled interactions'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expand to full container width'
    },
    children: {
      control: 'text',
      description: 'Button content (text, icons, etc.)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// === BASIC USAGE ===
export const Default: Story = {
  args: {
    children: 'Get Started'
  }
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Action'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary', 
    children: 'Secondary Action'
  }
};

// === ALL VARIANTS ===
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants using HIVE design tokens for consistent styling.'
      }
    }
  }
};

// === ALL SIZES ===
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-end">
      <Button size="sm">Small (32px)</Button>
      <Button size="md">Medium (10)</Button>
      <Button size="lg">Large (48px)</Button>
      <Button size="xl">Extra Large (56px)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available sizes. Large and XL sizes meet 44px minimum touch target for accessibility.'
      }
    }
  }
};

// === STATES ===
export const ButtonStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-md">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
      <Button loading disabled>Loading + Disabled</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button states including loading spinner and disabled state.'
      }
    }
  }
};

// === WITH ICONS ===
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Add Item
      </Button>
      <Button variant="secondary">
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
      <Button variant="ghost">
        Save
        <Heart className="w-4 h-4 ml-2" />
      </Button>
      <Button variant="outline" size="lg">
        <Star className="w-5 h-5 mr-2" />
        Premium Feature
        <Star className="w-5 h-5 ml-2" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons in leading and trailing positions. Icons scale with button size.'
      }
    }
  }
};

// === LOADING STATES ===
export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Processing...</Button>
      <Button variant="secondary" loading>
        <Download className="w-4 h-4 mr-2" />
        Downloading...
      </Button>
      <Button variant="destructive" loading>
        Deleting...
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading states with spinner. Icons are replaced by spinner while loading.'
      }
    }
  }
};

// === FULL WIDTH ===
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-3">
      <Button fullWidth>Full Width Primary</Button>
      <Button variant="secondary" fullWidth>Full Width Secondary</Button>
      <Button variant="outline" fullWidth loading>
        <Download className="w-4 h-4 mr-2" />
        Processing Full Width...
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full width buttons expand to fill their container. Useful for mobile layouts and forms.'
      }
    }
  }
};

// === INTERACTIVE DEMO ===
export const Interactive: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Click me!',
    disabled: false,
    loading: false,
    fullWidth: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different combinations of props.'
      }
    }
  }
};

// === KITCHEN SINK ===
export const KitchenSink: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      {/* Variants x Sizes Grid */}
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">All Variants × All Sizes</h3>
        <div className="grid grid-cols-5 gap-2 text-xs">
          {/* Headers */}
          <div></div>
          <div className="text-center font-medium text-hive-text-secondary">SM</div>
          <div className="text-center font-medium text-hive-text-secondary">MD</div>
          <div className="text-center font-medium text-hive-text-secondary">LG</div>
          <div className="text-center font-medium text-hive-text-secondary">XL</div>
          
          {/* Primary Row */}
          <div className="text-right font-medium text-hive-text-secondary py-2">Primary</div>
          <Button variant="primary" size="sm">Button</Button>
          <Button variant="primary" size="md">Button</Button>
          <Button variant="primary" size="lg">Button</Button>
          <Button variant="primary" size="xl">Button</Button>
          
          {/* Secondary Row */}
          <div className="text-right font-medium text-hive-text-secondary py-2">Secondary</div>
          <Button variant="secondary" size="sm">Button</Button>
          <Button variant="secondary" size="md">Button</Button>
          <Button variant="secondary" size="lg">Button</Button>
          <Button variant="secondary" size="xl">Button</Button>
          
          {/* Ghost Row */}
          <div className="text-right font-medium text-hive-text-secondary py-2">Ghost</div>
          <Button variant="ghost" size="sm">Button</Button>
          <Button variant="ghost" size="md">Button</Button>
          <Button variant="ghost" size="lg">Button</Button>
          <Button variant="ghost" size="xl">Button</Button>
          
          {/* Outline Row */}
          <div className="text-right font-medium text-hive-text-secondary py-2">Outline</div>
          <Button variant="outline" size="sm">Button</Button>
          <Button variant="outline" size="md">Button</Button>
          <Button variant="outline" size="lg">Button</Button>
          <Button variant="outline" size="xl">Button</Button>
          
          {/* Destructive Row */}
          <div className="text-right font-medium text-hive-text-secondary py-2">Destructive</div>
          <Button variant="destructive" size="sm">Button</Button>
          <Button variant="destructive" size="md">Button</Button>
          <Button variant="destructive" size="lg">Button</Button>
          <Button variant="destructive" size="xl">Button</Button>
        </div>
      </div>

      {/* Real-world Usage Examples */}
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Real-world Usage Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CTA Section */}
          <div className="p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default">
            <h4 className="font-semibold text-hive-text-primary mb-2">Call to Action</h4>
            <p className="text-hive-text-secondary mb-4">Primary action with secondary alternative</p>
            <div className="flex gap-3">
              <Button variant="primary">Get Started</Button>
              <Button variant="ghost">Learn More</Button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default">
            <h4 className="font-semibold text-hive-text-primary mb-2">Form Actions</h4>
            <p className="text-hive-text-secondary mb-4">Standard form button layout</p>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </div>
          </div>

          {/* Toolbar Actions */}
          <div className="p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default">
            <h4 className="font-semibold text-hive-text-primary mb-2">Toolbar Actions</h4>
            <p className="text-hive-text-secondary mb-4">Icon buttons in toolbar layout</p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
            </div>
          </div>

          {/* Loading States */}
          <div className="p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default">
            <h4 className="font-semibold text-hive-text-primary mb-2">Loading States</h4>
            <p className="text-hive-text-secondary mb-4">Various loading button examples</p>
            <div className="space-y-3">
              <Button loading fullWidth>Processing Payment...</Button>
              <Button variant="destructive" loading fullWidth>Deleting Account...</Button>
            </div>
          </div>

        </div>
      </div>

      {/* Accessibility Notes */}
      <div className="p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle">
        <h4 className="font-semibold text-hive-text-primary mb-2">♿ Accessibility Notes</h4>
        <ul className="text-sm text-hive-text-secondary space-y-1">
          <li>• All sizes meet or exceed 44px minimum touch target requirement</li>
          <li>• Loading state announces "Loading" to screen readers</li>
          <li>• Disabled buttons are properly excluded from tab order</li>
          <li>• Focus indicators meet WCAG 2.1 AA contrast requirements</li>
          <li>• Semantic HTML button element maintains native keyboard behavior</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comprehensive showcase of all button capabilities, variants, and real-world usage patterns.'
      }
    }
  }
};