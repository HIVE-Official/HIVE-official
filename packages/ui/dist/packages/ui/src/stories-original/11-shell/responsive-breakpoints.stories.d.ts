/**
 * HIVE Responsive Breakpoint Strategy Demo
 *
 * Demonstrates mobile-first responsive system with:
 * - Mobile (320-768px): Bottom tabs (Feed | Spaces | Profile | Lab)
 * - Tablet (768-1024px): Hybrid layout with collapsible sidebar
 * - Desktop (1024px+): Full sidebar with feed-optimized layouts
 * - Wide (1440px+): Multi-column layouts for productivity
 */
import type { Meta, StoryObj } from '@storybook/react';
declare const meta: Meta;
export default meta;
declare function ResponsiveBreakpointsDemo(): import("react/jsx-runtime").JSX.Element;
type Story = StoryObj<typeof ResponsiveBreakpointsDemo>;
export declare const Default: Story;
export declare const MobileFirst: Story;
export declare const TabletHybrid: Story;
export declare const DesktopFull: Story;
//# sourceMappingURL=responsive-breakpoints.stories.d.ts.map