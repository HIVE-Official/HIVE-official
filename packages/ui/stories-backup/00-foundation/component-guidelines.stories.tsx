import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # HIVE Component Guidelines & Best Practices
 * 
 * Comprehensive documentation for building and maintaining components
 * in the HIVE Design System. This foundation document establishes
 * the standards every component must meet.
 */

const GuidelineExample = ({ children, type = 'good' }: { 
  children: React.ReactNode; 
  type?: 'good' | 'bad' | 'neutral' 
}) => (
  <div className={`
    p-4 rounded-lg border-l-4 
    ${type === 'good' ? 'bg-green-50 border-green-400 dark:bg-green-900/20' : ''}
    ${type === 'bad' ? 'bg-red-50 border-red-400 dark:bg-red-900/20' : ''}
    ${type === 'neutral' ? 'bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]' : ''}
  `}>
    {children}
  </div>
);

const meta: Meta<typeof GuidelineExample> = {
  title: '00-Foundation/Component Guidelines',
  component: GuidelineExample,
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Component Guidelines

Complete standards and best practices for building components in the HIVE Design System.

## Quality Standards

Every HIVE component must meet these requirements:
- ✅ **100% Semantic Token Usage** - Zero hardcoded values
- ✅ **WCAG 2.1 AA Accessibility** - Screen reader and keyboard support
- ✅ **Mobile-First Responsive** - 320px+ compatibility
- ✅ **Campus Context Relevant** - Student-centered design
- ✅ **Motion System Integration** - HIVE liquid metal interactions
- ✅ **TypeScript Type Safety** - Comprehensive type definitions
- ✅ **Story Coverage** - 7+ required story variants
- ✅ **Design System Compliance** - Atomic design principles

## Atomic Design Hierarchy

### Atoms (Foundation)
- Single-purpose UI elements
- No dependencies on other components
- Highly reusable across contexts
- Examples: Button, Input, Badge, Icon

### Molecules (Composition)
- Combinations of 2-5 atoms
- Serve specific functions
- Campus-context aware
- Examples: SearchBar, FormField, UserCard

### Organisms (Complex)
- Multiple molecules working together
- Business logic integration
- Complete feature sections
- Examples: ProfileDashboard, CourseCard, Navigation

### Templates (Layout)
- Page-level component structure
- Multiple organisms composed
- Responsive layout patterns
- Examples: DashboardTemplate, ProfileTemplate

### Pages (Implementation)
- Complete application screens
- Data integration
- Route-specific implementations
- Examples: HomePage, ProfilePage, SettingsPage
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-4xl">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-[var(--hive-brand-primary)]">
          HIVE Component Guidelines
        </h1>
        <p className="text-lg text-[var(--hive-text-secondary)] max-w-2xl mx-auto">
          Standards and best practices for building world-class components
          in the HIVE Design System for campus life.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
            Quality Standards
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              100% Semantic Token Usage
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              WCAG 2.1 AA Accessibility
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              Mobile-First Responsive
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              TypeScript Type Safety
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              Story Coverage Complete
            </li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
            HIVE-Specific Features
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">🎯</span>
              Campus Context Relevant
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">✨</span>
              Liquid Metal Motion
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">🧩</span>
              Atomic Design Principles
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">🎨</span>
              Brand System Integration
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-500">📱</span>
              Student Device Optimized
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export const SemanticTokenUsage: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)]">
        Semantic Token Usage Standards
      </h2>
      
      <div className="space-y-4">
        <GuidelineExample type="good">
          <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">
            ✅ GOOD: 100% Semantic Tokens
          </h3>
          <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded">
{`// Perfect - uses semantic tokens only
<button className="
  bg-[var(--hive-brand-primary)]
  text-[var(--hive-text-inverse)]
  hover:bg-[var(--hive-brand-secondary)]
  border-[var(--hive-border-default)]
  rounded-[var(--hive-radius-md)]
">
  Join Study Group
</button>`}
          </pre>
        </GuidelineExample>
        
        <GuidelineExample type="bad">
          <h3 className="font-semibold text-red-700 dark:text-red-300 mb-2">
            ❌ BAD: Hardcoded Values
          </h3>
          <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded">
{`// Never do this - hardcoded values
<button className="
  bg-blue-500
  text-white
  hover:bg-blue-600
  border-gray-300
  rounded-lg
">
  Join Study Group  
</button>`}
          </pre>
        </GuidelineExample>
        
        <GuidelineExample type="neutral">
          <h3 className="font-semibold mb-2">Available Semantic Tokens</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Colors</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li>--hive-brand-primary</li>
                <li>--hive-brand-secondary</li>
                <li>--hive-text-primary</li>
                <li>--hive-text-secondary</li>
                <li>--hive-background-primary</li>
                <li>--hive-border-default</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Spacing & Layout</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li>--hive-spacing-xs</li>
                <li>--hive-spacing-sm</li>
                <li>--hive-spacing-md</li>
                <li>--hive-radius-sm</li>
                <li>--hive-radius-md</li>
                <li>--hive-shadow-sm</li>
              </ul>
            </div>
          </div>
        </GuidelineExample>
      </div>
    </div>
  )
};

export const AccessibilityStandards: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)]">
        Accessibility Standards (WCAG 2.1 AA)
      </h2>
      
      <div className="space-y-4">
        <GuidelineExample type="good">
          <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">
            ✅ GOOD: Complete Accessibility
          </h3>
          <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded">
{`// Perfect accessibility implementation
<button
  aria-label="Join the Computer Science 101 study group with 12 members"
  aria-describedby="group-description"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleJoinGroup();
    }
  }}
  className="focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
>
  <span aria-hidden="true">👥</span>
  Join CS 101 Study Group
</button>
<p id="group-description" className="sr-only">
  Weekly study sessions every Tuesday at 3 PM
</p>`}
          </pre>
        </GuidelineExample>
        
        <GuidelineExample type="bad">
          <h3 className="font-semibold text-red-700 dark:text-red-300 mb-2">
            ❌ BAD: No Accessibility Support
          </h3>
          <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded">
{`// Missing accessibility features
<div onClick={handleClick} className="button-style">
  <img src="icon.png" />
  Click me
</div>`}
          </pre>
        </GuidelineExample>
        
        <GuidelineExample type="neutral">
          <h3 className="font-semibold mb-2">Accessibility Checklist</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <strong>Semantic HTML:</strong> Use proper HTML elements (button, input, etc.)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <strong>ARIA Labels:</strong> aria-label, aria-labelledby, aria-describedby
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <strong>Keyboard Support:</strong> Tab navigation, Enter/Space activation
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <strong>Focus Management:</strong> Visible focus indicators
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <strong>Screen Readers:</strong> Proper text alternatives and structure
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <strong>Color Contrast:</strong> 4.5:1 minimum ratio for text
            </li>
          </ul>
        </GuidelineExample>
      </div>
    </div>
  )
};

export const AtomicDesignPrinciples: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)]">
        Atomic Design Principles
      </h2>
      
      <div className="grid gap-6">
        <GuidelineExample type="neutral">
          <h3 className="font-semibold mb-3">🔬 Atoms - Foundation Elements</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Purpose:</strong> Single-purpose UI building blocks</p>
            <p><strong>Examples:</strong> Button, Input, Badge, Icon, Label</p>
            <p><strong>Rules:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• No dependencies on other components</li>
              <li>• Highly reusable across all contexts</li>
              <li>• Focus on variants, states, accessibility</li>
              <li>• Must work in isolation</li>
            </ul>
          </div>
        </GuidelineExample>
        
        <GuidelineExample type="neutral">
          <h3 className="font-semibold mb-3">⚛️ Molecules - Functional Groups</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Purpose:</strong> Combinations of atoms serving specific functions</p>
            <p><strong>Examples:</strong> SearchBar, FormField, UserCard, CourseInfo</p>
            <p><strong>Rules:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• Combine 2-5 atomic components</li>
              <li>• Have a clear, specific purpose</li>
              <li>• Campus-context aware design</li>
              <li>• Reusable across different organisms</li>
            </ul>
          </div>
        </GuidelineExample>
        
        <GuidelineExample type="neutral">
          <h3 className="font-semibold mb-3">🧬 Organisms - Complex Sections</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Purpose:</strong> Complete feature sections with business logic</p>
            <p><strong>Examples:</strong> ProfileDashboard, NavigationBar, CourseList</p>
            <p><strong>Rules:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• Multiple molecules working together</li>
              <li>• Handle complex state and interactions</li>
              <li>• Campus-specific functionality</li>
              <li>• Self-contained feature units</li>
            </ul>
          </div>
        </GuidelineExample>
        
        <GuidelineExample type="neutral">
          <h3 className="font-semibold mb-3">📄 Templates - Page Structure</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Purpose:</strong> Page-level layout and component organization</p>
            <p><strong>Examples:</strong> DashboardTemplate, ProfileTemplate</p>
            <p><strong>Rules:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• Define responsive page layouts</li>
              <li>• Organize multiple organisms</li>
              <li>• Handle navigation integration</li>
              <li>• Provide consistent page structure</li>
            </ul>
          </div>
        </GuidelineExample>
      </div>
    </div>
  )
};

export const CampusContextGuidelines: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)]">
        Campus Context Guidelines
      </h2>
      
      <div className="space-y-4">
        <GuidelineExample type="good">
          <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">
            ✅ GOOD: Student-Centered Language
          </h3>
          <div className="space-y-2 text-sm">
            <p><strong>Button Text:</strong> "Join Study Group" instead of "Subscribe"</p>
            <p><strong>Navigation:</strong> "My Classes" instead of "Dashboard"</p>
            <p><strong>Actions:</strong> "Submit Assignment" instead of "Upload File"</p>
            <p><strong>Status:</strong> "Assignment Due" instead of "Deadline"</p>
          </div>
        </GuidelineExample>
        
        <GuidelineExample type="neutral">
          <h3 className="font-semibold mb-2">Campus Life Contexts</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Academic Contexts</h4>
              <ul className="space-y-1">
                <li>• Course registration and planning</li>
                <li>• Assignment submission and tracking</li>
                <li>• Study group formation</li>
                <li>• Office hours scheduling</li>
                <li>• Grade monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Social Contexts</h4>
              <ul className="space-y-1">
                <li>• Campus event discovery</li>
                <li>• Club and organization joining</li>
                <li>• Roommate and friend connections</li>
                <li>• Dining and social planning</li>
                <li>• Campus resource sharing</li>
              </ul>
            </div>
          </div>
        </GuidelineExample>
        
        <GuidelineExample type="neutral">
          <h3 className="font-semibold mb-2">Device Usage Patterns</h3>
          <div className="text-sm space-y-2">
            <p><strong>Primary:</strong> Mobile phones (80% of campus usage)</p>
            <p><strong>Secondary:</strong> Laptops in dorms and libraries</p>
            <p><strong>Tertiary:</strong> Tablets for reading and note-taking</p>
            <p><strong>Design Implications:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• 44px minimum touch targets</li>
              <li>• Thumb-friendly navigation</li>
              <li>• Fast loading on campus WiFi</li>
              <li>• Offline-first where possible</li>
            </ul>
          </div>
        </GuidelineExample>
      </div>
    </div>
  )
};

export const StoryRequirements: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)]">
        Story Coverage Requirements
      </h2>
      
      <div className="space-y-4">
        <GuidelineExample type="neutral">
          <h3 className="font-semibold mb-2">Required Stories (All Components)</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Core Stories</h4>
              <ul className="space-y-1">
                <li><strong>Default:</strong> Basic usage with reasonable defaults</li>
                <li><strong>Playground:</strong> Interactive controls for all props</li>
                <li><strong>All Variants:</strong> Complete variant showcase</li>
                <li><strong>States:</strong> Hover, active, disabled, loading</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Advanced Stories</h4>
              <ul className="space-y-1">
                <li><strong>Responsive:</strong> Mobile, tablet, desktop behavior</li>
                <li><strong>Accessibility:</strong> Screen reader, keyboard nav</li>
                <li><strong>Campus Usage:</strong> Real campus scenarios</li>
                <li><strong>Motion:</strong> HIVE liquid metal interactions</li>
              </ul>
            </div>
          </div>
        </GuidelineExample>
        
        <GuidelineExample type="good">
          <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">
            ✅ Story Template Structure
          </h3>
          <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`// Every component should follow this pattern
const meta: Meta<typeof Component> = {
  title: 'XX-Level/ComponentName',
  component: Component,
  parameters: {
    docs: {
      description: {
        component: 'Comprehensive description...'
      }
    }
  },
  argTypes: { /* Interactive controls */ },
  decorators: [ /* HIVE theme wrapper */ ]
};

export const Default: Story = { /* Basic usage */ };
export const Playground: Story = { /* Interactive */ };
export const AllVariants: Story = { /* All variants */ };
export const States: Story = { /* All states */ };
export const Responsive: Story = { /* Cross-device */ };
export const Accessibility: Story = { /* A11y demo */ };
export const CampusUsage: Story = { /* Real examples */ };
export const Motion: Story = { /* Interactions */ };`}
          </pre>
        </GuidelineExample>
      </div>
    </div>
  )
};

export const QualityChecklist: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)]">
        Component Quality Checklist
      </h2>
      
      <div className="space-y-4">
        <GuidelineExample type="neutral">
          <h3 className="font-semibold mb-3">Pre-Deployment Checklist</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <strong>Semantic Tokens:</strong> Zero hardcoded colors, sizes, or spacing values
              </div>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <strong>Accessibility:</strong> WCAG 2.1 AA compliance verified
              </div>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <strong>TypeScript:</strong> Complete type definitions, no 'any' types
              </div>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <strong>Stories:</strong> All 8 required stories implemented
              </div>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <strong>Responsive:</strong> Mobile-first design, 320px+ compatibility
              </div>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <strong>Motion:</strong> HIVE liquid metal interactions integrated
              </div>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <strong>Campus Context:</strong> Student-relevant examples and language
              </div>
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <strong>Performance:</strong> Optimized rendering and animations
              </div>
            </div>
          </div>
        </GuidelineExample>
        
        <GuidelineExample type="neutral">
          <h3 className="font-semibold mb-2">Automated Quality Tools</h3>
          <div className="text-sm space-y-2">
            <p><strong>Component Auditor:</strong> Run <code>npm run audit:components</code></p>
            <p><strong>Accessibility Testing:</strong> Integrated with Storybook a11y addon</p>
            <p><strong>Token Validation:</strong> ESLint rules for hardcoded value detection</p>
            <p><strong>Story Coverage:</strong> Automated story completeness checking</p>
          </div>
        </GuidelineExample>
      </div>
    </div>
  )
};