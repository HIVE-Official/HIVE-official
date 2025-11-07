import React, { createContext, useContext } from 'react';
import type { Preview } from '@storybook/react';
import { MotionConfig } from 'framer-motion';
// import './mocks'; // Temporarily disabled to fix loading issue
import "../src/tokens.css";
import "../src/styles.css";

// Use system fonts as fallback - Geist fonts loaded via tokens.css or Next.js app
if (typeof document !== 'undefined') {
  const fontStyle = document.getElementById('geist-fonts');
  if (!fontStyle) {
    const style = document.createElement('style');
    style.id = 'geist-fonts';
    style.textContent = `
      :root {
        --font-geist-sans: system-ui, -apple-system, 'Segoe UI', sans-serif;
        --font-geist-mono: 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;
      }
      body {
        font-family: var(--font-geist-sans);
      }
    `;
    document.head.appendChild(style);
  }
}

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
  globalTypes: {
    theme: {
      title: 'Theme',
      description: 'Switches between light and dark tokens.',
      defaultValue: 'dark',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
      },
    },
    emotion: {
      title: 'Mode',
      description: 'Emotional palette modifiers used across components.',
      defaultValue: 'calm',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'calm', title: 'Calm' },
          { value: 'warm', title: 'Warm' },
          { value: 'celebrate', title: 'Celebrate' },
          { value: 'urgent', title: 'Urgent' },
        ],
      },
    },
    motion: {
      title: 'Motion',
      description: 'Control motion preferences for previews.',
      defaultValue: 'system',
      toolbar: {
        icon: 'move',
        items: [
          { value: 'system', title: 'System' },
          { value: 'reduced', title: 'Reduced' },
          { value: 'full', title: 'Full' },
        ],
      },
    },
    tempo: {
      title: 'Tempo',
      description: 'Animation tempo profile (speed + easing).',
      defaultValue: 'butter',
      toolbar: {
        icon: 'hourglass',
        items: [
          { value: 'butter', title: 'Butter (slow + smooth)' },
          { value: 'default', title: 'Default' },
          { value: 'snappy', title: 'Snappy' },
        ],
      },
    },
  },
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
    (Story, context) => {
      const theme = context.globals.theme ?? 'dark';
      const emotion = context.globals.emotion ?? 'calm';
      const motionPreference = context.globals.motion ?? 'system';
      const tempo = (context.globals as any).tempo ?? 'butter';

      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        root.setAttribute('data-emotion', emotion);
        root.setAttribute('data-motion', motionPreference);
        root.setAttribute('data-tempo', String(tempo));
      }

      const motionConfigValue =
        motionPreference === 'reduced'
          ? 'always'
          : motionPreference === 'full'
          ? 'never'
          : 'user';

      // Tempo profile shared across CSS animations and Framer Motion springs
      const tempoProfile = (() => {
        if (tempo === 'snappy') {
          return {
            enter: '140ms',
            exit: '120ms',
            ease: 'cubic-bezier(0.35, 0.8, 0.5, 1)',
            spring: { stiffness: 500, damping: 24, mass: 0.75 },
          } as const;
        }
        if (tempo === 'default') {
          return {
            enter: '200ms',
            exit: '160ms',
            ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            spring: { stiffness: 320, damping: 26, mass: 0.9 },
          } as const;
        }
        // butter (slow + smooth)
        return {
          enter: '320ms',
          exit: '250ms',
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          spring: { stiffness: 180, damping: 28, mass: 1.0 },
        } as const;
      })();

      const isLight = theme === 'light';
      const surface = isLight ? '#FFFFFF' : '#0A0A0B';
      const text = isLight ? '#0A0A0B' : '#E5E5E7';
      const gradientFrom = isLight ? 'rgba(255,255,255,0.92)' : 'rgba(10,10,11,0.9)';
      const gradientVia = isLight ? 'rgba(240,240,245,0.85)' : 'rgba(17,17,19,0.8)';
      const gradientTo = isLight ? 'rgba(230,230,235,0.75)' : 'rgba(26,26,28,0.7)';

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

      // Inject CSS variables to keep Tailwind animate plugin durations in sync
      // with the selected tempo, and provide a strict reduced‑motion override
      if (typeof document !== 'undefined') {
        const existingMotionStyle = document.getElementById('hive-motion-bridge');
        const css = `
          :root {
            --hive-duration-enter: ${tempoProfile.enter};
            --hive-duration-exit: ${tempoProfile.exit};
            --hive-ease-standard: ${tempoProfile.ease};
            /* Map to tailwindcss-animate internals */
            --tw-enter-duration: var(--hive-duration-enter);
            --tw-exit-duration: var(--hive-duration-exit);
            --tw-enter-easing: var(--hive-ease-standard);
            --tw-exit-easing: var(--hive-ease-standard);
          }
          /* Hard override when toolbar sets Reduced motion */
          [data-motion="reduced"] *, [data-motion="reduced"] *::before, [data-motion="reduced"] *::after {
            animation: none !important;
            transition-duration: 0ms !important;
            scroll-behavior: auto !important;
          }
        `;
        if (existingMotionStyle) {
          existingMotionStyle.textContent = css;
        } else {
          const style = document.createElement('style');
          style.id = 'hive-motion-bridge';
          style.textContent = css;
          document.head.appendChild(style);
        }
      }

      return (
        <MockDataContext.Provider value={mockData}>
          <MotionConfig
            transition={{
              type: 'spring',
              stiffness: tempoProfile.spring.stiffness,
              damping: tempoProfile.spring.damping,
              mass: tempoProfile.spring.mass,
            }}
            reducedMotion={motionConfigValue}
          >
            <div
              className="min-h-screen antialiased font-sans"
              style={{
                background: surface,
                color: text,
              }}
            >
              <div
                className="backdrop-blur-xl"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
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
