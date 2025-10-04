import React, { createContext, useContext } from 'react';
import type { Preview } from '@storybook/react';
import { MotionConfig } from 'framer-motion';
// import './mocks'; // Temporarily disabled to fix loading issue
import '../src/styles.css';
import a11yConfig from './a11y-config';

// Mock context for components that expect data with status properties
const MockDataContext = createContext({
  user: {
    id: '1',
    name: 'Jacob Smith',
    handle: 'jacob_smith',
    avatar: '/placeholder-avatar.jpg',
    builderStatus: 'active' as const,
    status: 'online' as const
  },
  spaces: [],
  tools: [],
  members: [],
  messages: []
});

export const useMockData = () => useContext(MockDataContext);

const preview: Preview = {
  parameters: {
    // ===  ACCESSIBILITY TESTING ===
    // Enable accessibility addon with WCAG 2.2 rules
    a11y: a11yConfig,

    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Design System', [
            'Overview',
            'Colors',
            'Typography',
            'Spacing',
          ],
          'Features', [
            '01-Onboarding',
            '02-Profile',
            '03-Spaces',
            '04-Feed',
            '05-Tools',
            '06-Notifications',
            '07-Navigation',
            '08-Forms',
            '09-Social',
          ],
          'Atoms',
          'Molecules',
          'Organisms',
          'Templates',
        ],
      },
    },
    backgrounds: {
      default: 'hive-dark',
      values: [
        { name: 'hive-dark', value: '#0A0A0B' },
        { name: 'hive-overlay', value: '#111113' },
        { name: 'hive-tertiary', value: '#1A1A1C' },
        { name: 'light', value: '#FFFFFF' },
      ],
    },
    viewport: {
      viewports: {
        // HIVE-specific breakpoints
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '812px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
        widescreen: {
          name: 'Widescreen',
          styles: { width: '1920px', height: '1080px' },
          type: 'desktop',
        },
        // Campus-specific device scenarios
        campusLaptop: {
          name: 'Campus Laptop',
          styles: { width: '1366px', height: '768px' },
          type: 'desktop',
        },
        studentPhone: {
          name: 'Student Phone',
          styles: { width: '414px', height: '896px' },
          type: 'mobile',
        },
        // MacBook screen sizes for adaptive testing
        macbookAir13: {
          name: 'MacBook Air 13"',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
        macbookPro14: {
          name: 'MacBook Pro 14"',
          styles: { width: '1512px', height: '982px' },
          type: 'desktop',
        },
        macbookPro16: {
          name: 'MacBook Pro 16"',
          styles: { width: '1728px', height: '1117px' },
          type: 'desktop',
        },
      },
    },
    docs: {
      theme: {
        base: 'dark',
        brandTitle: 'HIVE Design System',
        brandUrl: '/',
        brandImage: '/hive-logo.svg',
        brandTarget: '_self',
        
        colorPrimary: '#FFD700', // HIVE Gold
        colorSecondary: '#FFD700',
        
        // UI colors
        appBg: '#0A0A0B',
        appContentBg: '#111113',
        appBorderColor: '#2A2A2C',
        appBorderRadius: 8,
        
        // Typography
        fontBase: 'var(--font-geist-sans), system-ui, sans-serif',
        fontCode: 'var(--font-geist-mono), monospace',
        
        // Text colors
        textColor: '#E5E5E7',
        textInverseColor: '#0A0A0B',
        textMutedColor: '#9CA3AF',
        
        // Toolbar colors
        barTextColor: '#E5E5E7',
        barSelectedColor: '#FFD700',
        barBg: '#111113',
        
        // Form colors
        inputBg: '#1A1A1C',
        inputBorder: '#2A2A2C',
        inputTextColor: '#E5E5E7',
        inputBorderRadius: 6,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      const mockData = {
        user: {
          id: '1',
          name: 'Jacob Smith',
          handle: 'jacob_smith',
          avatar: '/placeholder-avatar.jpg',
          builderStatus: 'active' as const,
          status: 'online' as const
        },
        spaces: [
          {
            id: '1',
            name: 'Design Team',
            status: 'activated' as const,
            memberCount: 12,
            type: 'workspace'
          }
        ],
        tools: [
          {
            id: '1',
            name: 'Sample Tool',
            status: 'published' as const,
            type: 'utility'
          }
        ],
        members: [
          {
            id: '1',
            name: 'Jacob Smith',
            status: 'online' as const,
            role: 'founder'
          }
        ],
        messages: [
          {
            id: '1',
            content: 'Hello world',
            status: 'sent' as const,
            timestamp: new Date()
          }
        ]
      };

      return (
        <MockDataContext.Provider value={mockData}>
          <MotionConfig
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.8
            }}
            reducedMotion="user"
          >
            <div className="dark min-h-screen bg-[#0A0A0B] text-[#E5E5E7] antialiased">
              <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

                :root {
                  --font-geist-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                  --font-geist-mono: ui-monospace, 'SF Mono', 'Monaco', 'Cascadia Mono', 'Segoe UI Mono', monospace;
                }

                body {
                  font-family: var(--font-geist-sans);
                  font-feature-settings: 'cv11', 'ss01';
                  font-optical-sizing: auto;
                }

                .font-sans {
                  font-family: var(--font-geist-sans);
                }

                .font-display {
                  font-family: var(--font-geist-sans);
                  font-weight: 600;
                }

                .font-mono {
                  font-family: var(--font-geist-mono);
                }
              `}</style>
              <div
                className="backdrop-blur-xl bg-gradient-to-br from-[#0A0A0B]/90 via-[#111113]/80 to-[#1A1A1C]/70"
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  backdropFilter: 'blur(12px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                }}
              >
                <Story />
              </div>
            </div>
          </MotionConfig>
        </MockDataContext.Provider>
      );
    },
  ],
};

export default preview; 