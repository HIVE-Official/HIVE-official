import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../atomic/atoms';
import { HiveButton } from '../atomic/atoms/hive-button';

/**
 * # HIVE Design System 2.0
 *
 * **Vercel Geist-Inspired Minimalism** - True black foundation, monochrome base, selective gold accent
 *
 * ## Philosophy
 *
 * "If Vercel and Linear designed a campus social app"
 *
 * ### Five Design Pillars:
 * 1. **Speed as Design** - Instant transitions, zero friction
 * 2. **Monochromatic Foundation** - True black (#000) + grayscale + gold accent
 * 3. **Information Density** - Show more, decorate less
 * 4. **OLED Optimization** - Pure black for battery efficiency
 * 5. **Selective Color** - Reserve color for meaning, not decoration
 */
const meta: Meta = {
  title: '00-Design-System/Introduction',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete overview of the HIVE Design System v2.0 with shadcn/ui foundation',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DesignSystemOverview: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="space-y-4">
          <Badge className="bg-primary text-primary-foreground">v2.0 - shadcn Foundation</Badge>
          <h1 className="text-4xl font-bold text-foreground">HIVE Design System</h1>
          <p className="text-xl text-muted-foreground">
            Vercel Geist-inspired minimalism for campus social platform
          </p>
        </div>

        {/* Color Palette */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Color Palette</h2>

          <Card>
            <CardHeader>
              <CardTitle>Foundation Colors</CardTitle>
              <CardDescription>True black (#000) OLED-optimized with grayscale elevation</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="h-24 rounded-lg bg-background border border-border" />
                <p className="text-xs mt-2 font-mono text-muted-foreground">#000000</p>
                <p className="text-sm">Background</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-card border border-border" />
                <p className="text-xs mt-2 font-mono text-muted-foreground">#171717</p>
                <p className="text-sm">Card</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-secondary border border-border" />
                <p className="text-xs mt-2 font-mono text-muted-foreground">#262626</p>
                <p className="text-sm">Secondary</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-foreground" />
                <p className="text-xs mt-2 font-mono text-muted-foreground">#FFFFFF</p>
                <p className="text-sm text-foreground">Foreground</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Accent (Selective Use)</CardTitle>
              <CardDescription>Gold - Reserved for CTAs, focus states, interactive highlights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="h-24 rounded-lg bg-primary" />
                  <p className="text-xs mt-2 font-mono text-muted-foreground">#FFD700</p>
                  <p className="text-sm">Primary (Gold)</p>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <p>✅ CTAs</p>
                    <p>✅ Focus rings</p>
                    <p>❌ Decorations</p>
                  </div>
                </div>
                <div>
                  <div className="h-24 rounded-lg bg-destructive" />
                  <p className="text-xs mt-2 font-mono text-muted-foreground">#FF3737</p>
                  <p className="text-sm">Destructive</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg border border-border flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
                  </div>
                  <p className="text-xs mt-2 font-mono text-muted-foreground">rgba(255,255,255,0.08)</p>
                  <p className="text-sm">Border (Subtle)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Typography</h2>

          <Card>
            <CardHeader>
              <CardTitle>Type Scale</CardTitle>
              <CardDescription>Geist Sans - Vercel's design system font</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-2xl font-semibold">Heading 2XL</p>
                <p className="text-xs text-muted-foreground font-mono">text-2xl font-semibold</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Heading XL</p>
                <p className="text-xs text-muted-foreground font-mono">text-xl font-semibold</p>
              </div>
              <div>
                <p className="text-lg font-medium">Heading LG</p>
                <p className="text-xs text-muted-foreground font-mono">text-lg font-medium</p>
              </div>
              <div>
                <p className="text-base">Body Text Base</p>
                <p className="text-xs text-muted-foreground font-mono">text-base</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Body Text Small (Secondary)</p>
                <p className="text-xs text-muted-foreground font-mono">text-sm text-muted-foreground</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Caption / Label</p>
                <p className="text-xs text-muted-foreground font-mono">text-xs text-muted-foreground</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Component Showcase */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Core Components</h2>

          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>shadcn Button variants + HIVE brand extensions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">shadcn Variants</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Primary (Gold)</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">HIVE Brand Extensions</p>
                <div className="flex flex-wrap gap-2">
                  <HiveButton variant="brand">Brand Gradient</HiveButton>
                  <HiveButton variant="success">Success</HiveButton>
                  <HiveButton variant="warning">Warning</HiveButton>
                  <HiveButton loading>Loading...</HiveButton>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Sizes</p>
                <div className="flex items-center flex-wrap gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <span>→</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>Inputs, selects, and form controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Search spaces..." className="max-w-sm" />
              <Select>
                <SelectTrigger className="max-w-sm">
                  <SelectValue placeholder="Select a space" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">ACM Club</SelectItem>
                  <SelectItem value="2">UB Gaming</SelectItem>
                  <SelectItem value="3">Study Group</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges & Avatars</CardTitle>
              <CardDescription>Status indicators and user representation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Error</Badge>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar className="h-16 w-16">
                  <AvatarFallback>XL</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Example: Space Card */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Real-World Example</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>ACM Club</CardTitle>
                    <CardDescription>247 members</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Association for Computing Machinery - Weekly coding challenges, tech talks, and hackathons.
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">Tech</Badge>
                  <Badge variant="secondary">Coding</Badge>
                  <Badge variant="secondary">Events</Badge>
                </div>
                <Button className="w-full">Join Space</Button>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>UG</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>UB Gaming</CardTitle>
                    <CardDescription>512 members</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Competitive gaming tournaments, LAN parties, and casual game nights every week.
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">Gaming</Badge>
                  <Badge variant="secondary">Esports</Badge>
                  <Badge variant="secondary">Social</Badge>
                </div>
                <Button className="w-full">Join Space</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Design Principles */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Design Principles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>✅ Do</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Use gold accent sparingly for CTAs and focus</p>
                <p>• Compose from shadcn primitives</p>
                <p>• Maintain true black (#000) backgrounds</p>
                <p>• Use CSS variables for colors</p>
                <p>• Test keyboard navigation</p>
                <p>• Keep borders subtle (rgba 0.08)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>❌ Don't</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Use gold for decoration</p>
                <p>• Recreate shadcn components from scratch</p>
                <p>• Use grays darker than #171717</p>
                <p>• Hardcode color values</p>
                <p>• Skip accessibility testing</p>
                <p>• Add excessive shadows/borders</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>HIVE Design System v2.0 - shadcn/ui Foundation</p>
          <p className="mt-2">Last Updated: 2025-10-01 | See DESIGN_SYSTEM.md for complete documentation</p>
        </div>
      </div>
    </div>
  ),
};
