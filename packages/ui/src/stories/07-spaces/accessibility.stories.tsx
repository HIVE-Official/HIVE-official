import type { Meta, StoryObj } from '@storybook/react';
import { HiveSpaceCard } from '../../components/hive-space-card';
import { HiveSpaceLayout } from '../../components/hive-space-layout';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { HiveInput } from '../../components/hive-input';
import { motion } from 'framer-motion';
import { useState } from 'react';

const meta: Meta = {
  title: 'Spaces/Accessibility',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive accessibility features for HIVE spaces including screen reader support, keyboard navigation, high contrast modes, and inclusive design patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for accessibility features
const accessibilityFeatures = [
  {
    id: 'screen-reader',
    name: 'Screen Reader Support',
    description: 'Full ARIA labels and semantic HTML',
    icon: '👁️',
    status: 'active',
    coverage: '95%'
  },
  {
    id: 'keyboard-nav',
    name: 'Keyboard Navigation',
    description: 'Complete keyboard-only navigation',
    icon: '⌨️',
    status: 'active',
    coverage: '100%'
  },
  {
    id: 'high-contrast',
    name: 'High Contrast Mode',
    description: 'Enhanced contrast for better visibility',
    icon: '🌗',
    status: 'active',
    coverage: '90%'
  },
  {
    id: 'focus-indicators',
    name: 'Focus Indicators',
    description: 'Clear visual focus indicators',
    icon: '🎯',
    status: 'active',
    coverage: '100%'
  },
  {
    id: 'text-scaling',
    name: 'Text Scaling',
    description: 'Supports up to 200% text scaling',
    icon: '📏',
    status: 'active',
    coverage: '85%'
  },
  {
    id: 'color-blind',
    name: 'Color Blind Support',
    description: 'Color-blind friendly design',
    icon: '🌈',
    status: 'active',
    coverage: '80%'
  }
];

export const AccessibilityOverview: Story = {
  render: () => {
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Accessibility Features</h1>
              <p className="text-gray-600">
                Comprehensive accessibility support for inclusive HIVE spaces
              </p>
            </div>
            <HiveButton variant="outline">
              Accessibility Guide
            </HiveButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accessibilityFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <HiveCard 
                  className="h-full cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onClick={() => setSelectedFeature(feature.id)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedFeature(feature.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${feature.name}`}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl" aria-hidden="true">{feature.icon}</div>
                      <div>
                        <h3 className="font-semibold">{feature.name}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <HiveBadge variant="success">
                        {feature.status}
                      </HiveBadge>
                      <div className="text-sm text-gray-500">
                        {feature.coverage} coverage
                      </div>
                    </div>
                  </div>
                </HiveCard>
              </motion.div>
            ))}
          </div>

          {selectedFeature && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
              role="region"
              aria-label="Feature details"
            >
              <HiveCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {accessibilityFeatures.find(f => f.id === selectedFeature)?.name} Details
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {accessibilityFeatures.find(f => f.id === selectedFeature)?.description}
                  </p>
                  <div className="flex gap-2">
                    <HiveButton variant="primary">
                      Learn More
                    </HiveButton>
                    <HiveButton 
                      variant="outline"
                      onClick={() => setSelectedFeature(null)}
                    >
                      Close
                    </HiveButton>
                  </div>
                </div>
              </HiveCard>
            </motion.div>
          )}
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const KeyboardNavigation: Story = {
  render: () => {
    const [currentFocus, setCurrentFocus] = useState<string | null>(null);
    const [keyboardHints, setKeyboardHints] = useState(true);

    const navItems = [
      { id: 'spaces', label: 'Spaces', shortcut: 'Alt+S' },
      { id: 'feed', label: 'Feed', shortcut: 'Alt+F' },
      { id: 'profile', label: 'Profile', shortcut: 'Alt+P' },
      { id: 'settings', label: 'Settings', shortcut: 'Alt+T' }
    ];

    const spaceActions = [
      { id: 'create-post', label: 'Create Post', shortcut: 'Ctrl+N' },
      { id: 'search', label: 'Search', shortcut: 'Ctrl+K' },
      { id: 'notifications', label: 'Notifications', shortcut: 'Ctrl+I' },
      { id: 'help', label: 'Help', shortcut: 'Ctrl+?' }
    ];

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Keyboard Navigation</h1>
              <p className="text-gray-600">
                Complete keyboard-only navigation for all space features
              </p>
            </div>
            <HiveButton 
              variant="outline"
              onClick={() => setKeyboardHints(!keyboardHints)}
              aria-label={`${keyboardHints ? 'Hide' : 'Show'} keyboard hints`}
            >
              {keyboardHints ? 'Hide' : 'Show'} Hints
            </HiveButton>
          </div>

          {/* Keyboard Shortcuts Help */}
          <HiveCard>
            <div className="p-4">
              <h3 className="font-semibold mb-3">Keyboard Shortcuts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Navigation</h4>
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.label}</span>
                        <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {item.shortcut}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Actions</h4>
                  <div className="space-y-1">
                    {spaceActions.map((action) => (
                      <div key={action.id} className="flex justify-between text-sm">
                        <span>{action.label}</span>
                        <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {action.shortcut}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </HiveCard>

          {/* Focus Demonstration */}
          <HiveCard>
            <div className="p-4">
              <h3 className="font-semibold mb-3">Focus Indicators Demo</h3>
              <p className="text-sm text-gray-600 mb-4">
                Use Tab to navigate through these elements and see focus indicators
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <HiveButton
                    key={i}
                    variant={i % 2 === 0 ? 'primary' : 'outline'}
                    className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onFocus={() => setCurrentFocus(`button-${i}`)}
                    onBlur={() => setCurrentFocus(null)}
                    aria-describedby={keyboardHints ? `hint-${i}` : undefined}
                  >
                    Button {i + 1}
                    {keyboardHints && currentFocus === `button-${i}` && (
                      <span 
                        id={`hint-${i}`}
                        className="sr-only"
                        aria-live="polite"
                      >
                        Currently focused on Button {i + 1}
                      </span>
                    )}
                  </HiveButton>
                ))}
              </div>
            </div>
          </HiveCard>

          {/* Skip Links */}
          <HiveCard>
            <div className="p-4">
              <h3 className="font-semibold mb-3">Skip Links</h3>
              <p className="text-sm text-gray-600 mb-4">
                Press Tab from the top of the page to see skip links
              </p>
              
              <div className="space-y-2">
                <a 
                  href="#main-content" 
                  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
                >
                  Skip to main content
                </a>
                <a 
                  href="#navigation" 
                  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 bg-blue-600 text-white px-4 py-2 rounded z-50"
                >
                  Skip to navigation
                </a>
                <a 
                  href="#footer" 
                  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-64 bg-blue-600 text-white px-4 py-2 rounded z-50"
                >
                  Skip to footer
                </a>
              </div>
            </div>
          </HiveCard>
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const ScreenReaderSupport: Story = {
  render: () => {
    const [announcements, setAnnouncements] = useState<string[]>([]);
    const [currentAction, setCurrentAction] = useState<string | null>(null);

    const addAnnouncement = (message: string) => {
      setAnnouncements(prev => [...prev, message]);
      setTimeout(() => {
        setAnnouncements(prev => prev.slice(1));
      }, 5000);
    };

    const handleAction = (action: string) => {
      setCurrentAction(action);
      addAnnouncement(`${action} activated`);
      setTimeout(() => setCurrentAction(null), 2000);
    };

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Screen Reader Support</h1>
              <p className="text-gray-600">
                Comprehensive ARIA labels and semantic HTML for screen readers
              </p>
            </div>
            <HiveButton variant="outline">
              ARIA Guide
            </HiveButton>
          </div>

          {/* Live Region for Announcements */}
          <div 
            className="sr-only" 
            aria-live="polite" 
            aria-atomic="true"
            role="status"
          >
            {announcements.map((announcement, index) => (
              <div key={index}>{announcement}</div>
            ))}
          </div>

          {/* Semantic Structure Demo */}
          <HiveCard>
            <div className="p-4">
              <h2 className="font-semibold mb-3">Semantic Structure</h2>
              <p className="text-sm text-gray-600 mb-4">
                Properly structured content with headings, lists, and landmarks
              </p>
              
              <nav aria-label="Space navigation">
                <h3 className="font-medium mb-2">Navigation</h3>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Posts
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Events
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Tools
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </HiveCard>

          {/* Interactive Elements with ARIA */}
          <HiveCard>
            <div className="p-4">
              <h2 className="font-semibold mb-3">Interactive Elements</h2>
              <p className="text-sm text-gray-600 mb-4">
                All interactive elements have proper ARIA labels and roles
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="space-search" className="block text-sm font-medium mb-1">
                    Search Spaces
                  </label>
                  <HiveInput
                    id="space-search"
                    placeholder="Type to search..."
                    aria-describedby="search-help"
                    className="w-full"
                  />
                  <div id="search-help" className="text-sm text-gray-500 mt-1">
                    Search across all your spaces and content
                  </div>
                </div>

                <div>
                  <fieldset>
                    <legend className="text-sm font-medium mb-2">Space Visibility</legend>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="visibility" 
                          value="public"
                          className="mr-2"
                          aria-describedby="public-help"
                        />
                        <span>Public</span>
                      </label>
                      <div id="public-help" className="text-sm text-gray-500 ml-6">
                        Anyone can discover and join this space
                      </div>
                      
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="visibility" 
                          value="private"
                          className="mr-2"
                          aria-describedby="private-help"
                        />
                        <span>Private</span>
                      </label>
                      <div id="private-help" className="text-sm text-gray-500 ml-6">
                        Only invited members can access this space
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div>
                  <button
                    onClick={() => handleAction('Create space')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                    aria-describedby="create-status"
                  >
                    Create Space
                  </button>
                  <div id="create-status" className="text-sm text-gray-500 mt-1" aria-live="polite">
                    {currentAction === 'Create space' ? 'Creating space...' : 'Ready to create space'}
                  </div>
                </div>
              </div>
            </div>
          </HiveCard>

          {/* Data Tables with Accessibility */}
          <HiveCard>
            <div className="p-4">
              <h2 className="font-semibold mb-3">Accessible Data Tables</h2>
              <p className="text-sm text-gray-600 mb-4">
                Properly structured tables with headers and descriptions
              </p>
              
              <table className="w-full border-collapse border border-gray-300" role="table">
                <caption className="text-sm text-gray-600 mb-2">
                  Space membership statistics
                </caption>
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2 text-left" scope="col">
                      Space Name
                    </th>
                    <th className="border border-gray-300 p-2 text-left" scope="col">
                      Members
                    </th>
                    <th className="border border-gray-300 p-2 text-left" scope="col">
                      Status
                    </th>
                    <th className="border border-gray-300 p-2 text-left" scope="col">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 p-2">
                        Space {i + 1}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {20 + i * 5}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <HiveBadge variant="success">
                          Active
                        </HiveBadge>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <button
                          onClick={() => handleAction(`View Space ${i + 1}`)}
                          className="text-blue-600 hover:underline"
                          aria-label={`View details for Space ${i + 1}`}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </HiveCard>
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const HighContrastMode: Story = {
  render: () => {
    const [highContrast, setHighContrast] = useState(false);
    const [contrastRatio, setContrastRatio] = useState('4.5:1');

    const toggleHighContrast = () => {
      setHighContrast(!highContrast);
      setContrastRatio(highContrast ? '4.5:1' : '7:1');
    };

    return (
      <div className={highContrast ? 'bg-black text-white' : 'bg-gray-50'}>
        <HiveSpaceLayout>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">High Contrast Mode</h1>
                <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                  Enhanced contrast for better visibility and accessibility
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  Contrast: {contrastRatio}
                </span>
                <HiveButton 
                  variant={highContrast ? 'outline' : 'primary'}
                  onClick={toggleHighContrast}
                  className={highContrast ? 'border-white text-white hover:bg-white hover:text-black' : ''}
                >
                  {highContrast ? 'Normal' : 'High Contrast'}
                </HiveButton>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HiveCard className={highContrast ? 'bg-gray-900 border-gray-700' : ''}>
                <div className="p-4">
                  <h3 className="font-semibold mb-3">Text Elements</h3>
                  <div className="space-y-2">
                    <p className="text-lg">Large text (18px)</p>
                    <p className="text-base">Normal text (16px)</p>
                    <p className="text-sm">Small text (14px)</p>
                    <p className={`text-xs ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                      Extra small text (12px)
                    </p>
                  </div>
                </div>
              </HiveCard>

              <HiveCard className={highContrast ? 'bg-gray-900 border-gray-700' : ''}>
                <div className="p-4">
                  <h3 className="font-semibold mb-3">Interactive Elements</h3>
                  <div className="space-y-3">
                    <HiveButton 
                      variant="primary"
                      className={highContrast ? 'bg-white text-black hover:bg-gray-200' : ''}
                    >
                      Primary Button
                    </HiveButton>
                    <HiveButton 
                      variant="outline"
                      className={highContrast ? 'border-white text-white hover:bg-white hover:text-black' : ''}
                    >
                      Outline Button
                    </HiveButton>
                    <HiveInput
                      placeholder="Input field"
                      className={highContrast ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : ''}
                    />
                  </div>
                </div>
              </HiveCard>

              <HiveCard className={highContrast ? 'bg-gray-900 border-gray-700' : ''}>
                <div className="p-4">
                  <h3 className="font-semibold mb-3">Status Indicators</h3>
                  <div className="space-y-2">
                    <HiveBadge 
                      variant="success"
                      className={highContrast ? 'bg-green-800 text-green-100' : ''}
                    >
                      Success
                    </HiveBadge>
                    <HiveBadge 
                      variant="warning"
                      className={highContrast ? 'bg-yellow-800 text-yellow-100' : ''}
                    >
                      Warning
                    </HiveBadge>
                    <HiveBadge 
                      variant="destructive"
                      className={highContrast ? 'bg-red-800 text-red-100' : ''}
                    >
                      Error
                    </HiveBadge>
                  </div>
                </div>
              </HiveCard>

              <HiveCard className={highContrast ? 'bg-gray-900 border-gray-700' : ''}>
                <div className="p-4">
                  <h3 className="font-semibold mb-3">Links & Navigation</h3>
                  <div className="space-y-2">
                    <a 
                      href="#" 
                      className={`${highContrast ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'} underline`}
                    >
                      Regular Link
                    </a>
                    <a 
                      href="#" 
                      className={`${highContrast ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'} underline visited:text-purple-600`}
                    >
                      Visited Link
                    </a>
                    <button className={`${highContrast ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'} underline`}>
                      Button Link
                    </button>
                  </div>
                </div>
              </HiveCard>
            </div>

            <HiveCard className={highContrast ? 'bg-gray-900 border-gray-700' : ''}>
              <div className="p-4">
                <h3 className="font-semibold mb-3">Focus Indicators</h3>
                <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  Use Tab to navigate and see enhanced focus indicators
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <HiveButton
                      key={i}
                      variant="outline"
                      className={`focus:ring-2 focus:ring-offset-2 ${
                        highContrast 
                          ? 'border-white text-white hover:bg-white hover:text-black focus:ring-white' 
                          : 'focus:ring-blue-500'
                      }`}
                    >
                      Focus Test {i + 1}
                    </HiveButton>
                  ))}
                </div>
              </div>
            </HiveCard>
          </div>
        </HiveSpaceLayout>
      </div>
    );
  },
};

export const InclusiveDesignPatterns: Story = {
  render: () => {
    const [fontSize, setFontSize] = useState(16);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [colorBlindMode, setColorBlindMode] = useState('normal');

    const colorBlindModes = [
      { value: 'normal', label: 'Normal Vision' },
      { value: 'protanopia', label: 'Protanopia' },
      { value: 'deuteranopia', label: 'Deuteranopia' },
      { value: 'tritanopia', label: 'Tritanopia' }
    ];

    return (
      <div style={{ fontSize: `${fontSize}px` }}>
        <HiveSpaceLayout>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Inclusive Design Patterns</h1>
                <p className="text-gray-600">
                  Comprehensive accessibility features for all users
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">A11Y</span>
                <HiveBadge variant="success">
                  WCAG 2.1 AA
                </HiveBadge>
              </div>
            </div>

            {/* Accessibility Controls */}
            <HiveCard>
              <div className="p-4">
                <h3 className="font-semibold mb-4">Accessibility Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Font Size: {fontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full"
                      aria-label="Adjust font size"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Color Blind Support
                    </label>
                    <select
                      value={colorBlindMode}
                      onChange={(e) => setColorBlindMode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      aria-label="Select color blind mode"
                    >
                      {colorBlindModes.map((mode) => (
                        <option key={mode.value} value={mode.value}>
                          {mode.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={reducedMotion}
                        onChange={(e) => setReducedMotion(e.target.checked)}
                        aria-describedby="motion-help"
                      />
                      <span className="text-sm font-medium">Reduce Motion</span>
                    </label>
                    <div id="motion-help" className="text-sm text-gray-500 mt-1">
                      Minimizes animations and transitions
                    </div>
                  </div>
                </div>
              </div>
            </HiveCard>

            {/* Content Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HiveCard>
                <div className="p-4">
                  <h3 className="font-semibold mb-3">Text Scaling Demo</h3>
                  <div className="space-y-3">
                    <p>
                      This text scales with the font size control above. 
                      The layout remains usable at all sizes.
                    </p>
                    <p className="text-sm">
                      Small text remains readable even when scaled up.
                    </p>
                    <HiveButton variant="primary">
                      Button text scales too
                    </HiveButton>
                  </div>
                </div>
              </HiveCard>

              <HiveCard>
                <div className="p-4">
                  <h3 className="font-semibold mb-3">Color Accessibility</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span>Error state</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span>Warning state</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span>Success state</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Colors are paired with icons and text for clarity
                    </p>
                  </div>
                </div>
              </HiveCard>
            </div>

            {/* Motion Preferences */}
            <HiveCard>
              <div className="p-4">
                <h3 className="font-semibold mb-3">Motion Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={reducedMotion ? {} : { scale: 1.02 }}
                      transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
                      className="p-4 bg-gray-100 rounded-lg cursor-pointer"
                    >
                      <h4 className="font-medium">Card {i + 1}</h4>
                      <p className="text-sm text-gray-600">
                        {reducedMotion ? 'Motion reduced' : 'Hover for animation'}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HiveCard>
          </div>
        </HiveSpaceLayout>
      </div>
    );
  },
};