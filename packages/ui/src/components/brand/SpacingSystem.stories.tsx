import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Heading, Text } from "../ui/typography";
import {
  Monitor,
  Smartphone,
  Zap,
  Eye,
  Grid,
  Ruler,
  Layout,
} from "lucide-react";

const SpacingSystem = () => <div>Spacing System</div>;

const meta: Meta = {
  title: "Brand/Spacing System",
  component: SpacingSystem,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "hive-dark",
      values: [{ name: "hive-dark", value: "#0A0A0A" }],
    },
    docs: {
      description: {
        component:
          "HIVE spacing system using shadcn/ui components and 8dp grid system. Optimized for web with responsive breakpoints, performance-conscious layout patterns, and accessibility-first touch targets.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Spacing demo component with shadcn/ui
const SpacingDemo = ({
  size,
  label,
  description,
  isPerformant = true,
  className = "",
}: {
  size: string;
  label: string;
  description: string;
  isPerformant?: boolean;
  className?: string;
}) => (
  <Card className={`w-full ${className}`}>
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
          <CardDescription className="text-xs">
            {size} • {description}
          </CardDescription>
        </div>
        {isPerformant && (
          <Badge variant="secondary" className="text-xs">
            <Zap className="w-3 h-3 mr-1" />
            Optimized
          </Badge>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-center gap-4">
        <div
          className="bg-yellow-400 rounded-lg flex items-center justify-center text-yellow-950 font-medium text-xs"
          style={{ width: size, height: size }}
        >
          {size}
        </div>
        <div className="flex-1">
          <div className="h-2 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Grid system demo
const GridDemo = ({
  columns,
  label,
  breakpoint,
}: {
  columns: number;
  label: string;
  breakpoint: string;
}) => (
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-sm">{label}</CardTitle>
          <CardDescription className="text-xs">
            {columns} columns • {breakpoint}
          </CardDescription>
        </div>
        <Badge variant="outline" className="text-xs">
          <Grid className="w-3 h-3 mr-1" />
          Grid
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }, (_, i) => (
          <div
            key={i}
            className="h-8 bg-yellow-400/20 border border-yellow-400/30 rounded flex items-center justify-center text-xs font-mono"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Component spacing examples
const ComponentSpacingDemo = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Form Layout Example</CardTitle>
          <CardDescription>Using HIVE 8dp spacing system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Text size="sm" weight="medium">
              Email Address
            </Text>
            <div className="h-10 bg-muted rounded-md border flex items-center px-3">
              <Text size="sm" variant="muted">
                user@university.edu
              </Text>
            </div>
          </div>
          <div className="space-y-2">
            <Text size="sm" weight="medium">
              Full Name
            </Text>
            <div className="h-10 bg-muted rounded-md border flex items-center px-3">
              <Text size="sm" variant="muted">
                John Doe
              </Text>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button size="sm" className="flex-1">
              Continue
            </Button>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Card Layout Example</CardTitle>
          <CardDescription>
            Consistent spacing across components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-full" />
                <div>
                  <Text size="sm" weight="medium">
                    Computer Science
                  </Text>
                  <Text size="xs" variant="muted">
                    124 members
                  </Text>
                </div>
              </div>
              <Text size="sm">
                Weekly study sessions, project collaboration, and career
                discussions.
              </Text>
              <Button size="sm" variant="outline" className="w-full">
                Join Space
              </Button>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-full" />
                <div>
                  <Text size="sm" weight="medium">
                    Design Club
                  </Text>
                  <Text size="xs" variant="muted">
                    89 members
                  </Text>
                </div>
              </div>
              <Text size="sm">
                Creative workshops, design critiques, and portfolio reviews.
              </Text>
              <Button size="sm" variant="outline" className="w-full">
                Join Space
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Overview: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <Heading size="h1">HIVE Spacing System</Heading>
        <Text variant="muted">
          8dp-based spacing system using shadcn/ui components for consistent,
          accessible layouts. Optimized for web performance and responsive
          design.
        </Text>
      </div>

      <Separator />

      <div className="space-y-4">
        <Heading size="h3">Spacing Scale (8dp Base)</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SpacingDemo
            size="8px"
            label="Micro (1x)"
            description="Tight spacing, form elements"
          />
          <SpacingDemo
            size="16px"
            label="Small (2x)"
            description="Component padding, button spacing"
          />
          <SpacingDemo
            size="24px"
            label="Base (3x)"
            description="Section spacing, card margins"
          />
          <SpacingDemo
            size="32px"
            label="Large (4x)"
            description="Layout sections, page margins"
          />
          <SpacingDemo
            size="40px"
            label="XL (5x)"
            description="Hero sections, major dividers"
          />
          <SpacingDemo
            size="48px"
            label="2XL (6x)"
            description="Page-level spacing, headers"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <Heading size="h3">Responsive Grid System</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GridDemo columns={12} label="Desktop Grid" breakpoint="≥768px" />
          <GridDemo columns={4} label="Mobile Grid" breakpoint="<768px" />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <Heading size="h3">Real-World Examples</Heading>
        <ComponentSpacingDemo />
      </div>
    </div>
  ),
};

export const AccessibilityGuidelines: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Heading size="h2">Accessibility & Touch Targets</Heading>
        <Text variant="muted">
          Spacing system ensures WCAG 2.1 AA compliance with proper touch target
          sizes
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Touch Target Guidelines
            </CardTitle>
            <CardDescription>
              Minimum sizes for interactive elements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Text size="sm">Minimum touch target</Text>
                <Badge variant="outline">44px × 44px</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">Comfortable spacing</Text>
                <Badge variant="outline">8px margin</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text size="sm">Focus indicator</Text>
                <Badge variant="outline">2px outline</Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Text size="sm" weight="medium">
                Example: Button Row
              </Text>
              <div className="flex gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="outline">
                  Secondary
                </Button>
                <Button size="sm" variant="ghost">
                  Cancel
                </Button>
              </div>
              <Text size="xs" variant="muted">
                Each button meets 44px minimum with 8px spacing
              </Text>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Performance Considerations
            </CardTitle>
            <CardDescription>
              Spacing optimizations for web performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-start">
                <Zap className="w-3 h-3 mr-2" />
                CSS Grid for complex layouts
              </Badge>
              <Badge variant="outline" className="w-full justify-start">
                <Monitor className="w-3 h-3 mr-2" />
                Flexbox for component spacing
              </Badge>
              <Badge variant="outline" className="w-full justify-start">
                <Ruler className="w-3 h-3 mr-2" />
                Consistent rem/px units
              </Badge>
            </div>

            <Separator />

            <div className="p-3 bg-muted/50 rounded-lg">
              <Text size="sm" className="font-mono">
                {"/* Optimized spacing */"}
                <br />
                .space-y-4 &gt; * + * {"{"}
                <br />
                &nbsp;&nbsp;margin-top: 1rem; {"/* 16px */"}
                <br />
                {"}"}
              </Text>
            </div>
            <Text size="xs" variant="muted">
              Uses efficient CSS selectors for spacing
            </Text>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const ResponsiveBreakpoints: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Heading size="h2">Responsive Spacing</Heading>
        <Text variant="muted">
          Adaptive spacing system that scales across device sizes
        </Text>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Breakpoint System</CardTitle>
            <CardDescription>
              Tailwind CSS responsive breakpoints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-border rounded-lg text-center space-y-2">
                <Smartphone className="w-6 h-6 mx-auto text-muted-foreground" />
                <Text size="sm" weight="medium">
                  Mobile
                </Text>
                <Text size="xs" variant="muted">
                  &lt; 640px
                </Text>
                <Badge variant="outline">sm</Badge>
              </div>

              <div className="p-4 border border-border rounded-lg text-center space-y-2">
                <Monitor className="w-6 h-6 mx-auto text-muted-foreground" />
                <Text size="sm" weight="medium">
                  Tablet
                </Text>
                <Text size="xs" variant="muted">
                  ≥ 768px
                </Text>
                <Badge variant="outline">md</Badge>
              </div>

              <div className="p-4 border border-border rounded-lg text-center space-y-2">
                <Monitor className="w-6 h-6 mx-auto text-muted-foreground" />
                <Text size="sm" weight="medium">
                  Desktop
                </Text>
                <Text size="xs" variant="muted">
                  ≥ 1024px
                </Text>
                <Badge variant="outline">lg</Badge>
              </div>

              <div className="p-4 border border-border rounded-lg text-center space-y-2">
                <Monitor className="w-6 h-6 mx-auto text-muted-foreground" />
                <Text size="sm" weight="medium">
                  Wide
                </Text>
                <Text size="xs" variant="muted">
                  ≥ 1280px
                </Text>
                <Badge variant="outline">xl</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Responsive Spacing Example
            </CardTitle>
            <CardDescription>
              How spacing adapts across screen sizes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-dashed border-yellow-400/50 rounded-lg">
                <Text size="sm" className="font-mono mb-2">
                  className=&quot;space-y-2 md:space-y-4 lg:space-y-6&quot;
                </Text>
                <div className="space-y-2 md:space-y-4 lg:space-y-6">
                  <div className="h-8 bg-yellow-400/20 rounded flex items-center px-3">
                    <Text size="xs">Mobile: 8px spacing</Text>
                  </div>
                  <div className="h-8 bg-yellow-400/20 rounded flex items-center px-3">
                    <Text size="xs">Tablet: 16px spacing</Text>
                  </div>
                  <div className="h-8 bg-yellow-400/20 rounded flex items-center px-3">
                    <Text size="xs">Desktop: 24px spacing</Text>
                  </div>
                </div>
              </div>

              <Text size="sm" variant="muted">
                Spacing automatically increases on larger screens for better
                visual hierarchy
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const LayoutVsComponentSpacing: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Heading size="h3">Layout vs. Component Spacing</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-foreground" />
                <CardTitle className="text-sm">Layout Spacing</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Defines the macro structure of the UI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Large margins (32px, 48px)</li>
                <li>Grid system gutters</li>
                <li>Responsive breakpoints</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-foreground" />
                <CardTitle className="text-sm">Component Spacing</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Defines the micro structure of the UI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Small margins (8px, 16px)</li>
                <li>Flexbox for component spacing</li>
                <li>Responsive breakpoints</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <Heading size="h3">Performance Notes</Heading>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>
            Use `gap` for grid/flex layouts instead of individual margins to
            improve rendering performance.
          </li>
          <li>
            Avoid deep nesting; use `{"<Fragment />"}` where possible to keep
            the DOM flat.
          </li>
          <li>
            Leverage Tailwind&apos;s JIT compiler to only include necessary
            spacing utilities in the final bundle.
          </li>
        </ul>
      </div>
    </div>
  ),
};

export const PerformanceConsciousLayout: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Heading size="h3">Performance-Conscious Layout</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Optimized Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                HIVE uses `flexbox` and `grid` for efficient rendering.
                {/* No absolute positioning for main layout */}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Touch Targets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Buttons and interactive elements have a minimum size of 44x44dp
                for accessibility.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
};
