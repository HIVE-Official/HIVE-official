import { DashboardDemo } from '../../components/dashboard/dashboard-demo';
const meta = {
    title: 'Dashboard/DashboardDemo',
    component: DashboardDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
# HIVE Dashboard Demo

A comprehensive demonstration of the HIVE dashboard system featuring:

## Core Components

- **BentoGrid**: Flexible, responsive grid layout system with drag-and-drop reordering
- **HiveDashboard**: Main dashboard with user profile and activity summary
- **PersonalTools**: Interactive personal productivity tools management
- **CalendarWidget**: Event and deadline management with calendar integration
- **ActivityTracker**: Analytics and insights for user engagement patterns

## Key Features

### Interactive Layout Management
- **Drag & Drop Reordering**: Reorganize widgets by dragging with grip handles
- **Dynamic Resizing**: Change widget sizes from small (1x1) to extra large (3x2)
- **Responsive Design**: Automatic layout adaptation for mobile, tablet, and desktop
- **Live Configuration**: Add, remove, and configure widgets in real-time

### Dashboard Variants
- **Academic**: Focus on GPA tracking, study analytics, and academic tools
- **Productivity**: Emphasis on time tracking, goal management, and efficiency metrics
- **Social**: Community events, social interactions, and collaborative spaces

### Advanced Grid System
- **Bento Grid Layout**: Modern card-based layout inspired by macOS and modern web design
- **Smart Positioning**: Automatic optimization based on widget priority and size
- **Visual Feedback**: Hover states, drag indicators, and smooth animations
- **Customizable Columns**: Responsive column counts with mobile-first design

## Technical Implementation

Built using HIVE's design system with:
- **Framer Motion**: Smooth animations and layout transitions
- **TypeScript**: Full type safety for all components and data structures
- **Responsive Grid**: CSS Grid with dynamic column allocation
- **State Management**: React hooks for layout persistence and real-time updates

## Usage Patterns

Perfect for:
- Student dashboard interfaces
- Productivity application layouts
- Analytics dashboard presentations
- Customizable workspace interfaces
- Educational platform interfaces

## Accessibility

- Keyboard navigation support
- Screen reader compatible
- High contrast mode support
- Focus management during drag operations
        `
            }
        }
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['academic', 'productivity', 'social', 'custom'],
            description: 'Dashboard layout variant'
        },
        editable: {
            control: 'boolean',
            description: 'Enable interactive editing features'
        },
        showControls: {
            control: 'boolean',
            description: 'Show demo controls and instructions'
        }
    }
};
export default meta;
// Main dashboard demo with full functionality
export const Default = {
    args: {
        variant: 'academic',
        editable: true,
        showControls: true
    }
};
// Academic-focused dashboard
export const Academic = {
    args: {
        variant: 'academic',
        editable: true,
        showControls: true
    }
};
// Productivity-focused dashboard
export const Productivity = {
    args: {
        variant: 'productivity',
        editable: true,
        showControls: true
    }
};
// Social-focused dashboard
export const Social = {
    args: {
        variant: 'social',
        editable: true,
        showControls: true
    }
};
// Read-only mode (non-editable)
export const ReadOnly = {
    args: {
        variant: 'academic',
        editable: false,
        showControls: true
    }
};
// Clean view without controls
export const CleanView = {
    args: {
        variant: 'academic',
        editable: true,
        showControls: false
    }
};
// Minimal setup for embedding
export const Embedded = {
    args: {
        variant: 'productivity',
        editable: false,
        showControls: false
    }
};
// Mobile viewport demonstration
export const Mobile = {
    args: {
        variant: 'academic',
        editable: true,
        showControls: true
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    }
};
// Tablet viewport demonstration
export const Tablet = {
    args: {
        variant: 'productivity',
        editable: true,
        showControls: true
    },
    parameters: {
        viewport: {
            defaultViewport: 'tablet'
        }
    }
};
// Dark mode variant
export const DarkMode = {
    args: {
        variant: 'academic',
        editable: true,
        showControls: true
    },
    parameters: {
        backgrounds: { default: 'dark' }
    }
};
// High contrast mode
export const HighContrast = {
    args: {
        variant: 'academic',
        editable: true,
        showControls: true
    },
    parameters: {
        backgrounds: { default: 'light' }
    }
};
// Performance demo with many widgets
export const PerformanceTest = {
    args: {
        variant: 'academic',
        editable: true,
        showControls: true
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates dashboard performance with multiple widgets and animations.'
            }
        }
    }
};
// Accessibility showcase
export const AccessibilityFocus = {
    args: {
        variant: 'academic',
        editable: true,
        showControls: true
    },
    parameters: {
        docs: {
            description: {
                story: 'Focus on accessibility features including keyboard navigation and screen reader support.'
            }
        }
    }
};
//# sourceMappingURL=dashboard-demo.stories.js.map