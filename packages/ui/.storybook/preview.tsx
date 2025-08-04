import React, { createContext, useContext } from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import './mocks'; // Import browser mocks first
import '../src/globals.css';

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
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
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
        fontBase: '"Geist Sans", system-ui, sans-serif',
        fontCode: '"JetBrains Mono", monospace',
        
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
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <MotionConfig 
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                mass: 0.8
              }}
              reducedMotion="user"
            >
              <div className="min-h-screen bg-[#0A0A0B] text-[#E5E5E7] antialiased font-sans">
                <style>{`
                  @import url('https://fonts.googleapis.com/css2?family=Geist+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
                  .font-sans { font-family: 'Geist Sans', system-ui, sans-serif; }
                  .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
                `}</style>
                <div 
                  className="backdrop-blur-xl bg-gradient-to-br from-[#0A0A0B]/90 via-[#111113]/80 to-[#1A1A1C]/70"
                  style={{
                    backdropFilter: 'blur(12px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                  }}
                >
                  <Story />
                </div>
              </div>
            </MotionConfig>
          </ThemeProvider>
        </MockDataContext.Provider>
      );
    },
  ],
};

export default preview; 