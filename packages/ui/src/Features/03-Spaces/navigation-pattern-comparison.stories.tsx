/**
 * Navigation Pattern Comparison
 *
 * Three different approaches for HIVE's IA:
 * 1. Shell + Breadcrumbs (Discord/Notion style)
 * 2. Hybrid (Shell for top-level, Adaptive for spaces)
 * 3. Three-Zone Adaptive (Current - workspace-first)
 *
 * Click through each to feel the navigation flow.
 */

import type { Meta, StoryObj } from "@storybook/react"
import { Card } from "../../atomic/atoms/card"
import { Button } from "../../atomic/atoms/button"
import { Badge } from "../../atomic/atoms/badge"
import { Separator } from "../../atomic/atoms/separator"
import { Avatar } from "../../atomic/atoms/avatar"
import { Input } from "../../atomic/atoms/input"
import {
  Home,
  Search,
  Users,
  Wrench,
  Target,
  ChevronRight,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  Bell,
  Plus
} from "lucide-react"

const meta = {
  title: "Features/03-Spaces/Navigation Pattern Comparison",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#000000" }],
    },
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// PATTERN 1: Shell + Breadcrumbs (Discord/Notion Style)
// ============================================================================

const ShellBreadcrumbsPattern = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left Navigation Shell */}
      <div className="w-64 border-r border-white/10 bg-[#0c0c0c] p-4 flex flex-col gap-2">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#FFD700]">HIVE</h1>
          <p className="text-xs text-white/50">University at Buffalo</p>
        </div>

        <Button variant="ghost" className="justify-start gap-3 h-12">
          <Home className="h-5 w-5" />
          Feed
        </Button>

        <Button variant="default" className="justify-start gap-3 h-12 bg-white/10">
          <Users className="h-5 w-5" />
          Spaces
          <Badge variant="secondary" className="ml-auto">12</Badge>
        </Button>

        <Button variant="ghost" className="justify-start gap-3 h-12">
          <Users className="h-5 w-5" />
          Profile
        </Button>

        <Button variant="ghost" className="justify-start gap-3 h-12">
          <Wrench className="h-5 w-5" />
          HiveLab
        </Button>

        <Button variant="ghost" className="justify-start gap-3 h-12">
          <Target className="h-5 w-5" />
          Rituals
        </Button>

        <Separator className="my-4" />

        <div className="mt-auto">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="h-16 border-b border-white/10 bg-[#0c0c0c] px-6 flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white/50">Home</Button>
          <ChevronRight className="h-4 w-4 text-white/30" />
          <Button variant="ghost" size="sm" className="text-white/50">Spaces</Button>
          <ChevronRight className="h-4 w-4 text-white/30" />
          <span className="text-sm font-medium">UB Robotics Club</span>

          <div className="ml-auto flex gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Space Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Space Header */}
          <div className="mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">UB Robotics Club</h2>
                <p className="text-sm text-white/60 mb-3">
                  Build, program, and compete with robots! All skill levels welcome.
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">247 members</Badge>
                  <Badge variant="secondary">834 posts</Badge>
                  <Badge variant="secondary">12 events</Badge>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-white/10">
              <Button variant="ghost" className="border-b-2 border-[#FFD700] text-[#FFD700]">
                Stream
              </Button>
              <Button variant="ghost" className="text-white/60">
                Events
              </Button>
              <Button variant="ghost" className="text-white/60">
                Tools
              </Button>
              <Button variant="ghost" className="text-white/60">
                Files
              </Button>
              <Button variant="ghost" className="text-white/60">
                Members
              </Button>
            </div>
          </div>

          {/* Post Feed */}
          <div className="space-y-4">
            <Card className="p-4 bg-[#0c0c0c] border-white/10">
              <div className="flex gap-3 mb-3">
                <Avatar className="h-10 w-10" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Sarah Chen</p>
                  <p className="text-xs text-white/50">2 hours ago</p>
                </div>
              </div>
              <p className="text-sm mb-3">
                Just finished the autonomous navigation algorithm! The bot can now detect obstacles and reroute in real-time. Check out the demo video 🤖
              </p>
              <div className="flex gap-4 text-sm text-white/60">
                <button className="hover:text-white">❤️ 23</button>
                <button className="hover:text-white">💬 8</button>
                <button className="hover:text-white">🔗 Share</button>
              </div>
            </Card>

            <Card className="p-4 bg-[#0c0c0c] border-white/10">
              <div className="flex gap-3 mb-3">
                <Avatar className="h-10 w-10" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Mike Johnson</p>
                  <p className="text-xs text-white/50">4 hours ago</p>
                </div>
              </div>
              <p className="text-sm mb-3">
                Quick question - anyone have experience with OpenCV for object recognition? Need help tuning the camera calibration.
              </p>
              <div className="flex gap-4 text-sm text-white/60">
                <button className="hover:text-white">❤️ 5</button>
                <button className="hover:text-white">💬 12</button>
                <button className="hover:text-white">🔗 Share</button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Pattern1_ShellBreadcrumbs: Story = {
  render: () => <ShellBreadcrumbsPattern />,
  parameters: {
    docs: {
      description: {
        story: `**Pattern 1: Shell + Breadcrumbs (Discord/Notion Style)**

**How it works:**
- Universal left navigation shell (Feed, Spaces, Profile, HiveLab, Rituals)
- Breadcrumb trail at top shows navigation depth
- Tab navigation within spaces
- Traditional tree hierarchy

**Pros:**
✅ Familiar pattern (low learning curve)
✅ Simple mental model
✅ Proven UX conventions
✅ Easy to explain

**Cons:**
❌ Feels like Discord/Notion clone
❌ Tools are secondary (tabs)
❌ Breadcrumbs add navigation steps
❌ Less unique identity`,
      },
    },
  },
}

// ============================================================================
// PATTERN 2: Hybrid (Shell + Adaptive Canvas)
// ============================================================================

const HybridPattern = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left Navigation Shell */}
      <div className="w-64 border-r border-white/10 bg-[#0c0c0c] p-4 flex flex-col gap-2">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#FFD700]">HIVE</h1>
          <p className="text-xs text-white/50">University at Buffalo</p>
        </div>

        <Button variant="ghost" className="justify-start gap-3 h-12">
          <Home className="h-5 w-5" />
          Feed
        </Button>

        <Button variant="default" className="justify-start gap-3 h-12 bg-white/10">
          <Users className="h-5 w-5" />
          Spaces
          <Badge variant="secondary" className="ml-auto">12</Badge>
        </Button>

        <Button variant="ghost" className="justify-start gap-3 h-12">
          <Users className="h-5 w-5" />
          Profile
        </Button>

        <Button variant="ghost" className="justify-start gap-3 h-12">
          <Wrench className="h-5 w-5" />
          HiveLab
        </Button>

        <Button variant="ghost" className="justify-start gap-3 h-12">
          <Target className="h-5 w-5" />
          Rituals
        </Button>

        <Separator className="my-4" />

        <div className="mt-auto">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Adaptive Space Canvas (Three-Zone within Space) */}
      <div className="flex-1 flex">
        {/* Quick Access Panel (20%) */}
        <div className="w-1/5 border-r border-white/10 bg-[#0c0c0c] p-4">
          <div className="mb-6">
            <h2 className="text-sm font-bold mb-1">UB Robotics</h2>
            <p className="text-xs text-white/50">247 members</p>
          </div>

          <div className="space-y-1">
            <Button variant="default" className="w-full justify-start gap-2 h-10 bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
              <MessageSquare className="h-4 w-4" />
              Stream
              <Badge className="ml-auto bg-white/20">42</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 h-10">
              <Wrench className="h-4 w-4" />
              Tools
              <Badge variant="secondary" className="ml-auto">4</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 h-10">
              <Calendar className="h-4 w-4 text-[#FFD700]" />
              Events
              <Badge className="ml-auto bg-[#FFD700] text-black">12</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 h-10">
              <FileText className="h-4 w-4" />
              Files
              <Badge variant="secondary" className="ml-auto">23</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 h-10">
              <Users className="h-4 w-4" />
              Members
              <Badge variant="secondary" className="ml-auto">247</Badge>
            </Button>
          </div>

          <Separator className="my-4" />

          <Button className="w-full gap-2 bg-white/10 hover:bg-white/20">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </div>

        {/* Adaptive Canvas (50%) */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            <Card className="p-4 bg-[#0c0c0c] border-white/10">
              <div className="flex gap-3 mb-3">
                <Avatar className="h-10 w-10" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Sarah Chen</p>
                  <p className="text-xs text-white/50">2 hours ago</p>
                </div>
              </div>
              <p className="text-sm mb-3">
                Just finished the autonomous navigation algorithm! The bot can now detect obstacles and reroute in real-time. 🤖
              </p>
              <div className="flex gap-4 text-sm text-white/60">
                <button className="hover:text-white">❤️ 23</button>
                <button className="hover:text-white">💬 8</button>
              </div>
            </Card>

            <Card className="p-4 bg-[#0c0c0c] border-white/10">
              <div className="flex gap-3 mb-3">
                <Avatar className="h-10 w-10" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Mike Johnson</p>
                  <p className="text-xs text-white/50">4 hours ago</p>
                </div>
              </div>
              <p className="text-sm mb-3">
                Anyone have experience with OpenCV? Need help with camera calibration.
              </p>
              <div className="flex gap-4 text-sm text-white/60">
                <button className="hover:text-white">❤️ 5</button>
                <button className="hover:text-white">💬 12</button>
              </div>
            </Card>
          </div>
        </div>

        {/* Ambient Context (30%) */}
        <div className="w-[30%] border-l border-white/10 bg-[#0c0c0c] p-4 overflow-auto">
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3">Online Now (6)</h3>
            <div className="space-y-2">
              {["Sarah Chen", "Mike Johnson", "Emma Davis", "Alex Kim", "Jordan Lee", "Taylor Swift"].map((name) => (
                <div key={name} className="flex items-center gap-2">
                  <div className="relative">
                    <Avatar className="h-8 w-8" />
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-black" />
                  </div>
                  <span className="text-xs">{name}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Invite Member
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Create Event
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Pin Post
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-sm font-bold mb-3">Space Stats</h3>
            <div className="space-y-2 text-xs text-white/60">
              <div className="flex justify-between">
                <span>Posts this week:</span>
                <span className="text-white">34</span>
              </div>
              <div className="flex justify-between">
                <span>Upcoming events:</span>
                <span className="text-white">12</span>
              </div>
              <div className="flex justify-between">
                <span>Active tools:</span>
                <span className="text-white">4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Pattern2_Hybrid: Story = {
  render: () => <HybridPattern />,
  parameters: {
    docs: {
      description: {
        story: `**Pattern 2: Hybrid (Shell + Adaptive Canvas)**

**How it works:**
- Universal shell on left for top-level navigation
- Three-zone adaptive layout ONLY within spaces
- No breadcrumbs needed (max 2 levels deep)
- Combines familiar + unique

**Pros:**
✅ Familiar top-level structure
✅ Unique space experience (workspace-first)
✅ Tools are first-class within spaces
✅ No breadcrumbs needed
✅ Best of both worlds

**Cons:**
❌ Two different navigation patterns to learn
❌ More complex implementation
❌ Might feel inconsistent`,
      },
    },
  },
}

// ============================================================================
// PATTERN 3: Three-Zone Adaptive (Current - Workspace First)
// ============================================================================

const ThreeZoneAdaptivePattern = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Quick Access Panel (20%) */}
      <div className="w-1/5 border-r border-white/10 bg-[#0c0c0c] p-4">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#FFD700]">HIVE</h1>
          <p className="text-xs text-white/50 mb-2">UB Robotics Club</p>
          <p className="text-xs text-white/40">247 members • 34 online</p>
        </div>

        <div className="space-y-1 mb-6">
          <Button variant="default" className="w-full justify-start gap-2 h-10 bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
            <MessageSquare className="h-4 w-4" />
            Stream
            <Badge className="ml-auto bg-white/20">42</Badge>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 h-10">
            <Wrench className="h-4 w-4" />
            Tools
            <Badge variant="secondary" className="ml-auto">4</Badge>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 h-10">
            <Calendar className="h-4 w-4 text-[#FFD700]" />
            Events
            <Badge className="ml-auto bg-[#FFD700] text-black">12</Badge>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 h-10">
            <FileText className="h-4 w-4" />
            Files
            <Badge variant="secondary" className="ml-auto">23</Badge>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 h-10">
            <Users className="h-4 w-4" />
            Members
            <Badge variant="secondary" className="ml-auto">247</Badge>
          </Button>
        </div>

        <Button className="w-full gap-2 bg-white/10 hover:bg-white/20">
          <Plus className="h-4 w-4" />
          New Post
        </Button>

        <Separator className="my-4" />

        <div className="text-xs text-white/40">
          <button className="hover:text-white/60">← Back to Spaces</button>
        </div>
      </div>

      {/* Adaptive Canvas (50%) */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          <Card className="p-4 bg-[#0c0c0c] border-white/10">
            <div className="flex gap-3 mb-3">
              <Avatar className="h-10 w-10" />
              <div className="flex-1">
                <p className="font-medium text-sm">Sarah Chen</p>
                <p className="text-xs text-white/50">2 hours ago</p>
              </div>
            </div>
            <p className="text-sm mb-3">
              Just finished the autonomous navigation algorithm! The bot can now detect obstacles and reroute in real-time. Check out the demo video 🤖
            </p>
            <div className="flex gap-4 text-sm text-white/60">
              <button className="hover:text-white">❤️ 23</button>
              <button className="hover:text-white">💬 8</button>
              <button className="hover:text-white">🔗 Share</button>
            </div>
          </Card>

          <Card className="p-4 bg-[#0c0c0c] border-white/10">
            <div className="flex gap-3 mb-3">
              <Avatar className="h-10 w-10" />
              <div className="flex-1">
                <p className="font-medium text-sm">Mike Johnson</p>
                <p className="text-xs text-white/50">4 hours ago</p>
              </div>
            </div>
            <p className="text-sm mb-3">
              Quick question - anyone have experience with OpenCV for object recognition? Need help tuning the camera calibration.
            </p>
            <div className="flex gap-4 text-sm text-white/60">
              <button className="hover:text-white">❤️ 5</button>
              <button className="hover:text-white">💬 12</button>
              <button className="hover:text-white">🔗 Share</button>
            </div>
          </Card>

          <Card className="p-4 bg-[#0c0c0c] border-white/10">
            <div className="flex gap-3 mb-3">
              <Avatar className="h-10 w-10" />
              <div className="flex-1">
                <p className="font-medium text-sm">Alex Rodriguez</p>
                <p className="text-xs text-white/50">1 day ago • 📌 Pinned</p>
              </div>
            </div>
            <p className="text-sm mb-3">
              🎉 We just got approved for competition funding! $5,000 to build our competition bot for regionals. Team meeting this Friday to plan the build.
            </p>
            <div className="flex gap-4 text-sm text-white/60">
              <button className="hover:text-white">❤️ 67</button>
              <button className="hover:text-white">💬 24</button>
              <button className="hover:text-white">🔗 Share</button>
            </div>
          </Card>
        </div>
      </div>

      {/* Ambient Context Sidebar (30%) */}
      <div className="w-[30%] border-l border-white/10 bg-[#0c0c0c] p-4 overflow-auto">
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-3">Online Now (6)</h3>
          <div className="space-y-2">
            {["Sarah Chen", "Mike Johnson", "Emma Davis", "Alex Kim", "Jordan Lee", "Taylor Swift"].map((name) => (
              <div key={name} className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="h-8 w-8" />
                  <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-black" />
                </div>
                <span className="text-xs">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        <div className="mb-6">
          <h3 className="text-sm font-bold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              Invite Member
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              Create Event
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              Pin Post
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <h3 className="text-sm font-bold mb-3">Space Stats</h3>
          <div className="space-y-2 text-xs text-white/60">
            <div className="flex justify-between">
              <span>Posts this week:</span>
              <span className="text-white">34</span>
            </div>
            <div className="flex justify-between">
              <span>Upcoming events:</span>
              <span className="text-white">12</span>
            </div>
            <div className="flex justify-between">
              <span>Active tools:</span>
              <span className="text-white">4</span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <h3 className="text-sm font-bold mb-3">Leaders</h3>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8" />
            <div>
              <p className="text-xs font-medium">Alex Rodriguez</p>
              <p className="text-xs text-white/50">Founder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Pattern3_ThreeZoneAdaptive: Story = {
  render: () => <ThreeZoneAdaptivePattern />,
  parameters: {
    docs: {
      description: {
        story: `**Pattern 3: Three-Zone Adaptive (Current - Workspace First)**

**How it works:**
- No universal shell - you're "inside" the space
- Quick Access Panel (20%) for view switching
- Adaptive Canvas (50%) transforms based on view
- Ambient Context (30%) for presence and actions
- "Back to Spaces" link to exit

**Pros:**
✅ Unique identity (not Discord/Notion)
✅ Tools are first-class (equal to posts)
✅ Spaces feel like "environments"
✅ Quick context switching within space
✅ Ambient presence always visible

**Cons:**
❌ Novel pattern (learning curve)
❌ No familiar navigation shell
❌ Might confuse initial users
❌ Requires onboarding`,
      },
    },
  },
}

// Comparison Summary Story
export const ComparisonSummary: Story = {
  render: () => (
    <div className="p-12 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-[#FFD700]">Navigation Pattern Comparison</h1>
      <p className="text-lg text-white/60 mb-12 max-w-3xl">
        Three different approaches to HIVE's information architecture. Click through each pattern above to feel the navigation flow.
      </p>

      <div className="grid gap-8 max-w-6xl">
        {/* Pattern 1 */}
        <Card className="p-6 bg-[#0c0c0c] border-white/10">
          <h2 className="text-2xl font-bold mb-3">Pattern 1: Shell + Breadcrumbs</h2>
          <p className="text-white/60 mb-4">Discord/Notion style with universal left nav</p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-bold mb-2 text-green-500">Pros</h3>
              <ul className="text-sm space-y-1 text-white/60">
                <li>✅ Familiar pattern</li>
                <li>✅ Simple mental model</li>
                <li>✅ Proven UX</li>
                <li>✅ Easy to explain</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 text-red-500">Cons</h3>
              <ul className="text-sm space-y-1 text-white/60">
                <li>❌ Feels like Discord clone</li>
                <li>❌ Tools are secondary</li>
                <li>❌ Breadcrumbs add steps</li>
                <li>❌ Less unique identity</li>
              </ul>
            </div>
          </div>

          <Badge variant="outline">Best for: Quick implementation, familiar UX</Badge>
        </Card>

        {/* Pattern 2 */}
        <Card className="p-6 bg-[#0c0c0c] border-white/10">
          <h2 className="text-2xl font-bold mb-3">Pattern 2: Hybrid</h2>
          <p className="text-white/60 mb-4">Shell for top-level, adaptive canvas within spaces</p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-bold mb-2 text-green-500">Pros</h3>
              <ul className="text-sm space-y-1 text-white/60">
                <li>✅ Familiar top-level</li>
                <li>✅ Unique space experience</li>
                <li>✅ Tools first-class in spaces</li>
                <li>✅ Best of both worlds</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 text-red-500">Cons</h3>
              <ul className="text-sm space-y-1 text-white/60">
                <li>❌ Two navigation patterns</li>
                <li>❌ More complex to implement</li>
                <li>❌ Might feel inconsistent</li>
              </ul>
            </div>
          </div>

          <Badge variant="outline" className="bg-[#FFD700] text-black">Recommended: Balances familiar + unique</Badge>
        </Card>

        {/* Pattern 3 */}
        <Card className="p-6 bg-[#0c0c0c] border-white/10">
          <h2 className="text-2xl font-bold mb-3">Pattern 3: Three-Zone Adaptive</h2>
          <p className="text-white/60 mb-4">Workspace-first, no universal shell</p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-bold mb-2 text-green-500">Pros</h3>
              <ul className="text-sm space-y-1 text-white/60">
                <li>✅ Unique identity</li>
                <li>✅ Tools first-class</li>
                <li>✅ Spaces feel like environments</li>
                <li>✅ Ambient presence</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 text-red-500">Cons</h3>
              <ul className="text-sm space-y-1 text-white/60">
                <li>❌ Novel pattern</li>
                <li>❌ No familiar shell</li>
                <li>❌ Learning curve</li>
                <li>❌ Requires onboarding</li>
              </ul>
            </div>
          </div>

          <Badge variant="outline">Best for: Differentiation, workspace-first</Badge>
        </Card>
      </div>

      <div className="mt-12 p-6 bg-[#FFD700] text-black rounded-lg max-w-3xl">
        <h3 className="text-xl font-bold mb-2">Decision Framework</h3>
        <p className="text-sm mb-4">Consider these questions:</p>
        <ul className="text-sm space-y-2">
          <li><strong>Speed to ship:</strong> Pattern 1 is fastest (proven conventions)</li>
          <li><strong>Differentiation:</strong> Pattern 3 is most unique</li>
          <li><strong>Balance:</strong> Pattern 2 (Hybrid) offers best of both</li>
          <li><strong>Student behavior:</strong> Do they hop between spaces or stay in one?</li>
          <li><strong>Tool importance:</strong> Are tools core to the value prop?</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Summary comparison of all three navigation patterns with decision framework.",
      },
    },
  },
}
