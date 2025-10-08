import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "../../atomic/atoms/avatar";

/**
 * # Avatar
 *
 * Display user profile pictures with automatic fallback to initials.
 * Built on @radix-ui/react-avatar with HIVE design system integration.
 *
 * ## HIVE Motion System
 * - Uses `transition-smooth ease-liquid` for gentle state changes
 * - Respects `prefers-reduced-motion` for accessibility
 *
 * ## Usage
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/profile.jpg" alt="@username" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
const meta = {
  title: "11-Shared/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default avatar with image loaded successfully
 */
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Avatar with fallback initials (simulated failed image load)
 */
export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/invalid-url.jpg" alt="@user" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Different sizes using className (no CVA variants needed)
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="Small" />
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="Default" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14">
        <AvatarImage src="https://github.com/shadcn.png" alt="Large" />
        <AvatarFallback className="text-lg">LG</AvatarFallback>
      </Avatar>
      <Avatar className="h-20 w-20">
        <AvatarImage src="https://github.com/shadcn.png" alt="Extra Large" />
        <AvatarFallback className="text-2xl">XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * Avatar group with overlapping effect (common social pattern)
 */
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-4">
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/vercel.png" alt="User 2" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarImage src="/invalid.jpg" alt="User 3" />
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>+5</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * Interactive avatars with HIVE motion system
 */
export const Interactive: Story = {
  render: () => (
    <div className="flex gap-6">
      <button className="group cursor-pointer rounded-full transition-smooth ease-liquid">
        <Avatar className="transition-smooth ease-liquid group-hover:ring-2 group-hover:ring-primary group-hover:ring-offset-2 group-hover:ring-offset-background">
          <AvatarImage src="https://github.com/shadcn.png" alt="Click me" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </button>

      <button className="group cursor-pointer rounded-full transition-smooth ease-liquid">
        <Avatar className="transition-smooth ease-liquid group-hover:scale-110">
          <AvatarImage src="https://github.com/vercel.png" alt="Hover me" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
      </button>

      <button className="group cursor-pointer rounded-full transition-smooth ease-liquid">
        <Avatar className="transition-smooth ease-liquid group-hover:opacity-70">
          <AvatarImage src="/invalid.jpg" alt="Hover for fade" />
          <AvatarFallback>FD</AvatarFallback>
        </Avatar>
      </button>
    </div>
  ),
};

/**
 * Avatar with status indicator (online/offline/away)
 */
export const WithStatusIndicator: Story = {
  render: () => (
    <div className="flex gap-6">
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Online user" />
          <AvatarFallback>ON</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
      </div>

      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/vercel.png" alt="Away user" />
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-yellow-500 ring-2 ring-background" />
      </div>

      <div className="relative">
        <Avatar>
          <AvatarImage src="/invalid.jpg" alt="Offline user" />
          <AvatarFallback>OF</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-muted ring-2 ring-background" />
      </div>
    </div>
  ),
};

/**
 * Avatar with custom backgrounds for fallback
 */
export const ColorfulFallbacks: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar>
        <AvatarFallback className="bg-primary text-primary-foreground">
          GP
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-destructive text-destructive-foreground">
          ER
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-secondary text-secondary-foreground">
          SC
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
          GR
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * Profile header pattern with avatar and info
 */
export const ProfileHeader: Story = {
  render: () => (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-6 transition-smooth ease-liquid hover:border-primary/50">
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-xl">CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-foreground">shadcn</h3>
        <p className="text-sm text-muted-foreground">@shadcn</p>
        <p className="text-xs text-muted-foreground">
          Building beautiful interfaces
        </p>
      </div>
    </div>
  ),
};

/**
 * Loading state with skeleton animation
 */
export const Loading: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-3 w-16 animate-pulse rounded bg-muted" />
      </div>
    </div>
  ),
};

/**
 * HIVE Pattern: Feed post author (appears on every post)
 */
export const FeedPostAuthor: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      {/* Standard post header */}
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="Sarah Chen" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Sarah Chen</span>
            <span className="text-xs text-muted-foreground">@sarahc</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">2h ago</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Posted in</span>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              CS Study Group
            </span>
          </div>
        </div>
      </div>

      {/* Post with verified badge */}
      <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/vercel.png" alt="Alex Morgan" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Alex Morgan</span>
            <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-muted-foreground">@alex</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">5m ago</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Posted in</span>
            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500">
              Campus Events
            </span>
          </div>
        </div>
      </div>

      {/* Comment thread author */}
      <div className="ml-6 flex items-start gap-2 border-l-2 border-border pl-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/invalid.jpg" alt="Jordan Lee" />
          <AvatarFallback className="text-xs">JL</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-foreground">Jordan Lee</span>
            <span className="text-xs text-muted-foreground">@jordan</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">1m ago</span>
          </div>
          <p className="text-xs text-muted-foreground">This is a reply comment...</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Space member card (used in space member lists)
 */
export const SpaceMemberCard: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-3">
      {/* Space leader */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-smooth ease-liquid hover:border-primary/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="Sarah Chen" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-background">
              👑
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Sarah Chen</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Leader
              </span>
            </div>
            <span className="text-xs text-muted-foreground">@sarahc • Joined 6 months ago</span>
          </div>
        </div>
      </div>

      {/* Active member */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-smooth ease-liquid hover:border-primary/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/vercel.png" alt="Alex Morgan" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">Alex Morgan</span>
            <span className="text-xs text-muted-foreground">@alex • Joined 2 weeks ago</span>
          </div>
        </div>
        <button className="rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium transition-smooth ease-liquid hover:bg-accent">
          Follow
        </button>
      </div>

      {/* New member */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-smooth ease-liquid hover:border-primary/50">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/invalid.jpg" alt="Jordan Lee" />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Jordan Lee</span>
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-500">
                New
              </span>
            </div>
            <span className="text-xs text-muted-foreground">@jordan • Joined 1 day ago</span>
          </div>
        </div>
        <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90">
          Follow
        </button>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * Production showcase: All patterns together
 */
export const ProductionShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Team Members</h2>
        <div className="flex -space-x-2">
          <Avatar className="border-2 border-background transition-smooth ease-liquid hover:z-10 hover:scale-110">
            <AvatarImage src="https://github.com/shadcn.png" alt="Member 1" />
            <AvatarFallback>M1</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background transition-smooth ease-liquid hover:z-10 hover:scale-110">
            <AvatarImage src="https://github.com/vercel.png" alt="Member 2" />
            <AvatarFallback>M2</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background transition-smooth ease-liquid hover:z-10 hover:scale-110">
            <AvatarFallback>+12</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Team list */}
      <div className="flex flex-col gap-3">
        {[
          { name: "Sarah Chen", handle: "@sarah", src: "https://github.com/shadcn.png", status: "online" },
          { name: "Alex Morgan", handle: "@alex", src: "/invalid.jpg", fallback: "AM", status: "away" },
          { name: "Jordan Lee", handle: "@jordan", src: "https://github.com/vercel.png", status: "offline" },
        ].map((member) => (
          <button
            key={member.handle}
            className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-smooth ease-liquid hover:border-primary/50 hover:bg-accent"
          >
            <div className="relative">
              <Avatar className="transition-smooth ease-liquid group-hover:ring-2 group-hover:ring-primary group-hover:ring-offset-2 group-hover:ring-offset-background">
                <AvatarImage src={member.src} alt={member.name} />
                <AvatarFallback>{member.fallback || member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background ${
                  member.status === 'online' ? 'bg-green-500' :
                  member.status === 'away' ? 'bg-yellow-500' :
                  'bg-muted'
                }`}
              />
            </div>
            <div className="flex flex-1 flex-col items-start">
              <span className="text-sm font-medium text-foreground">{member.name}</span>
              <span className="text-xs text-muted-foreground">{member.handle}</span>
            </div>
            <span className={`text-xs ${
              member.status === 'online' ? 'text-green-500' :
              member.status === 'away' ? 'text-yellow-500' :
              'text-muted-foreground'
            }`}>
              {member.status}
            </span>
          </button>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
