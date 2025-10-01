import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../atomic/atoms/card';
import { Button } from '../../atomic/atoms/button';
import { Badge } from '../../atomic/atoms/badge';
import { Avatar, AvatarFallback } from '../../atomic/atoms/avatar';

/**
 * # Card (shadcn/ui)
 *
 * **Compound Component** - Composable card with semantic sections
 *
 * ## Features
 * - ✅ Semantic HTML structure (header, content, footer)
 * - ✅ Flexible composition pattern
 * - ✅ Subtle elevation with minimal borders
 * - ✅ Hover states for interactive cards
 * - ✅ True black (#171717) surfaces on black (#000) background
 *
 * ## Composition
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>{children}</CardContent>
 *   <CardFooter>Footer content</CardFooter>
 * </Card>
 * ```
 */
const meta = {
  title: '11-Shared/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'shadcn/ui Card with compound component pattern. Provides semantic structure for content organization. Use CardHeader, CardTitle, CardDescription, CardContent, and CardFooter for proper composition.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic card with all sections
 */
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Action</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Space Card - Real-world example
 */
export const SpaceCard: Story = {
  render: () => (
    <Card className="w-[350px] hover:border-primary/20 transition-colors">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle>ACM Club</CardTitle>
            <CardDescription>247 members</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Association for Computing Machinery - Weekly coding challenges, tech talks, and
          hackathons.
        </p>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">Tech</Badge>
          <Badge variant="secondary">Coding</Badge>
          <Badge variant="secondary">Events</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Join Space</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive space card with hover effect. Shows proper use of Avatar, Badges, and Button composition within Card structure.',
      },
    },
  },
};

/**
 * Without footer
 */
export const NoFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notification</CardTitle>
        <CardDescription>You have a new message</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Your profile was viewed 12 times this week. Keep engaging with your community!
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card without footer - use when no action is needed.',
      },
    },
  },
};

/**
 * Without header
 */
export const NoHeader: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p className="text-sm">Simple content-only card. Useful for compact displays or lists.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card without header. Add pt-6 to CardContent for proper spacing.',
      },
    },
  },
};

/**
 * Minimal card - content only
 */
export const MinimalContent: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold">Quick Stats</h4>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-primary">247</p>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">89</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content-only card for data display. No header or footer needed.',
      },
    },
  },
};

/**
 * Interactive card variations
 */
export const InteractiveCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="w-full hover:border-primary/20 transition-colors cursor-pointer">
        <CardHeader>
          <CardTitle>Clickable Card</CardTitle>
          <CardDescription>Entire card is clickable</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Add hover:border-primary/20 for visual feedback
          </p>
        </CardContent>
      </Card>

      <Card className="w-full border-primary/40">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Selected State</CardTitle>
              <CardDescription>Currently selected</CardDescription>
            </div>
            <Badge>Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use border-primary to indicate selection
          </p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive states: hover effects and selected state with gold border.',
      },
    },
  },
};

/**
 * Grid layout
 */
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>Space {i}</CardTitle>
            <CardDescription>{50 * i} members</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Join this amazing community space
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Join
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards in a responsive grid layout. Common pattern for space/tool browsing.',
      },
    },
  },
};

/**
 * Complex composition
 */
export const ComplexComposition: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">John Doe</CardTitle>
              <CardDescription className="text-xs">@johndoe • 2h ago</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            ⋯
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">
          Just finished the HIVE migration! The new shadcn components are amazing 🚀
        </p>
        <div className="flex gap-2">
          <Badge variant="secondary">#hive</Badge>
          <Badge variant="secondary">#shadcn</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-border pt-4">
        <Button variant="ghost" size="sm">
          💬 12
        </Button>
        <Button variant="ghost" size="sm">
          ❤️ 47
        </Button>
        <Button variant="ghost" size="sm">
          🔁 8
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex social media post card with avatar, badges, and action buttons.',
      },
    },
  },
};

/**
 * Dark theme (HIVE default)
 */
export const DarkTheme: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Dark Theme Card</CardTitle>
        <CardDescription>On true black background</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          HIVE uses #171717 for cards on #000 background. Subtle elevation with minimal borders
          (rgba 0.08).
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Card optimized for true black backgrounds. Subtle borders for depth.',
      },
    },
  },
};
