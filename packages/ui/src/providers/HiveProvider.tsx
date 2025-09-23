/**
 * HIVE Provider
 * Main application provider that wraps all other providers
 * This is the root provider for the entire HIVE platform
 */

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationProvider } from '../systems/modal-toast-system';
import UniversalShell from '../shells/UniversalShell';

// HIVE Configuration
export interface HiveConfig {
  environment: 'development' | 'staging' | 'production';
  campusId: string;
  features: {
    rituals: boolean;
    tools: boolean;
    events: boolean;
    messaging: boolean;
  };
  theme: {
    primaryColor: string;
    mode: 'light' | 'dark';
  };
}

// HIVE Context
interface HiveContextType {
  config: HiveConfig;
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateConfig: (updates: Partial<HiveConfig>) => void;
}

const HiveContext = createContext<HiveContextType>({
  config: {
    environment: 'development',
    campusId: 'ub-buffalo',
    features: {
      rituals: true,
      tools: true,
      events: true,
      messaging: true,
    },
    theme: {
      primaryColor: 'var(--hive-brand-secondary)',
      mode: 'dark',
    },
  },
  user: null,
  isAuthenticated: false,
  isLoading: true,
  updateConfig: () => {},
});

export const useHive = () => useContext(HiveContext);

// Main HIVE Provider
export const HiveProvider: React.FC<{
  children: React.ReactNode;
  config?: Partial<HiveConfig>;
  withShell?: boolean;
  shellProps?: any;
}> = ({
  children,
  config: initialConfig,
  withShell = true,
  shellProps = {}
}) => {
  const [config, setConfig] = useState<HiveConfig>({
    environment: initialConfig?.environment || 'development',
    campusId: initialConfig?.campusId || 'ub-buffalo',
    features: {
      rituals: initialConfig?.features?.rituals ?? true,
      tools: initialConfig?.features?.tools ?? true,
      events: initialConfig?.features?.events ?? true,
      messaging: initialConfig?.features?.messaging ?? true,
    },
    theme: {
      primaryColor: initialConfig?.theme?.primaryColor || 'var(--hive-brand-secondary)',
      mode: initialConfig?.theme?.mode || 'dark',
    },
  });

  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user session
  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Check for existing session
        const sessionData = localStorage.getItem('hive-session');
        if (sessionData) {
          const session = JSON.parse(sessionData);
          setUser(session.user);
        }
      } catch (error) {
        console.error('Failed to initialize session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', config.theme.primaryColor);
    document.documentElement.className = config.theme.mode;
  }, [config.theme]);

  const updateConfig = (updates: Partial<HiveConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...updates,
      features: {
        ...prev.features,
        ...updates.features,
      },
      theme: {
        ...prev.theme,
        ...updates.theme,
      },
    }));
  };

  const content = withShell ? (
    <UniversalShell {...shellProps}>
      {children}
    </UniversalShell>
  ) : children;

  return (
    <HiveContext.Provider
      value={{
        config,
        user,
        isAuthenticated: !!user,
        isLoading,
        updateConfig,
      }}
    >
      <NotificationProvider>
        {content}
      </NotificationProvider>
    </HiveContext.Provider>
  );
};

// Layout Wrapper Components
export const PageWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
}> = ({
  children,
  className = '',
  maxWidth = '2xl',
  padding = true
}) => {
  const maxWidths = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div className={`page-wrapper min-h-screen ${className}`}>
      <div className={`${maxWidths[maxWidth]} mx-auto ${padding ? 'p-4 lg:p-8' : ''}`}>
        {children}
      </div>
    </div>
  );
};

// Section Wrapper
export const SectionWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}> = ({ children, className = '', title, description, actions }) => {
  return (
    <section className={`section-wrapper ${className}`}>
      {(title || description || actions) && (
        <div className="section-header mb-6 flex items-start justify-between">
          <div className="flex-1">
            {title && (
              <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            )}
            {description && (
              <p className="text-white/60">{description}</p>
            )}
          </div>
          {actions && (
            <div className="section-actions ml-4">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

// Grid Layout Wrapper
export const GridWrapper: React.FC<{
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
  responsive?: boolean;
  className?: string;
}> = ({
  children,
  columns = 3,
  gap = 'md',
  responsive = true,
  className = ''
}) => {
  const gaps = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const columnClasses = responsive ? {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  } : {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  return (
    <div className={`grid ${columnClasses[columns]} ${gaps[gap]} ${className}`}>
      {children}
    </div>
  );
};

// Flex Layout Wrapper
export const FlexWrapper: React.FC<{
  children: React.ReactNode;
  direction?: 'row' | 'col';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: 'none' | 'sm' | 'md' | 'lg';
  wrap?: boolean;
  className?: string;
}> = ({
  children,
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  gap = 'md',
  wrap = false,
  className = ''
}) => {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const gapClasses = {
    none: '',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div className={`
      flex
      ${directionClasses[direction]}
      ${justifyClasses[justify]}
      ${alignClasses[align]}
      ${gapClasses[gap]}
      ${wrap ? 'flex-wrap' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Loading State Wrapper
export const LoadingWrapper: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}> = ({ isLoading, children, fallback, className = '' }) => {
  if (isLoading) {
    return (
      <div className={`loading-wrapper flex items-center justify-center min-h- ${className}`}>
        {fallback || (
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-4 border-[var(--hive-brand-secondary)] border-t-transparent rounded-full animate-spin" />
            <p className="text-white/60">Loading...</p>
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

// Error Boundary Wrapper
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-white/60 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--hive-brand-secondary)] text-black font-medium rounded-lg hover:bg-[var(--hive-brand-secondary-hover)] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Export everything
export default {
  HiveProvider,
  PageWrapper,
  SectionWrapper,
  GridWrapper,
  FlexWrapper,
  LoadingWrapper,
  ErrorBoundary,
  useHive,
};