import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { motion } from "framer-motion";
import { Badge } from "../../atomic/atoms/badge";
import { Button } from "../../atomic/atoms/button";
import { Card } from "../../atomic/atoms/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "../../atomic/atoms/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../atomic/atoms/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "../../atomic/atoms/drawer";
import { Input } from "../../atomic/atoms/input";
import { Textarea } from "../../atomic/atoms/textarea";
import { Label } from "../../atomic/atoms/label";
import { cn } from "../../lib/utils";
import { Users, MessageCircle, Calendar, Star, MapPin, TrendingUp, Settings, Share2, Edit3, Sparkles } from "lucide-react";

/**
 * # Profile Page - Production
 *
 * **Single source of truth for HIVE profile pages**
 *
 * ## Design System
 * - Matches Spaces aesthetic exactly (shadcn/ui + Framer Motion)
 * - Uses HIVE motion tokens: `transition-smooth`, `ease-liquid`
 * - No custom borders/colors - trust the design system
 *
 * ## Architecture
 * - **Sticky Portrait Carousel** (left, 340px) - Tinder-style swipeable photos
 * - **Content Grid** (right, 1fr) - Identity, Stats, Schedule preview, Spaces, HiveLab
 * - **Schedule Widget** - Compact preview → links to `/schedule` page
 * - **Mobile-first** - Stacks vertically on mobile, side-by-side on desktop
 *
 * ## Motion Patterns (from Spaces)
 * ```tsx
 * // Card lift on hover
 * <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }} />
 *
 * // Image scale
 * className="transition-smooth ease-liquid group-hover:scale-105"
 *
 * // Border highlight
 * className="hover:shadow-lg hover:border-primary/50"
 * ```
 *
 * ## Data Flow
 * - Profile data from `@hive/core` domain models
 * - Privacy logic via `canViewWidget()` utilities
 * - Real-time updates via Firebase listeners
 * - Optimistic UI for all interactions
 *
 * ## Related Components
 * - ProfileHeader - Organism for identity section
 * - StatGrid - Molecule for metrics display (generic stats grid)
 * - PhotoCarousel - Molecule for portrait carousel
 * - ActivityTimeline - Organism for recent activity
 * - ConnectionList - Organism for connections display
 * - ProgressChecklist - Organism for completion tracking (generic progress UI)
 */
const meta = {
  title: "02-Profile/ProfilePage",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Complete profile page matching HIVE production aesthetic. Uses shadcn/ui components with Framer Motion for interactions.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default profile view (own profile)
 *
 * Student viewing their own profile - full access to all widgets.
 */
export const OwnProfile: Story = {
  render: () => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    // Modal states
    const [editProfileOpen, setEditProfileOpen] = React.useState(false);
    const [statsModalOpen, setStatsModalOpen] = React.useState(false);
    const [selectedStat, setSelectedStat] = React.useState<{ label: string; value: number } | null>(null);
    const [scheduleDrawerOpen, setScheduleDrawerOpen] = React.useState(false);
    const [hiveLabModalOpen, setHiveLabModalOpen] = React.useState(false);
    const [shareProfileOpen, setShareProfileOpen] = React.useState(false);

    const photos = [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=450&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=450&h=600&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=450&h=600&fit=crop",
    ];

    React.useEffect(() => {
      if (!api) return;
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
      api.on("select", () => setCurrent(api.selectedScrollSnap()));
    }, [api]);

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">

            {/* LEFT: Portrait Carousel */}
            <div className="order-1 lg:sticky lg:top-8">
              <motion.div layout>
                <Carousel setApi={setApi} opts={{ loop: true }}>
                  <CarouselContent>
                    {photos.map((photo, index) => (
                      <CarouselItem key={index}>
                        <motion.div
                          className="relative group"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <Card className="overflow-hidden border-0 shadow-lg">
                            <div className="aspect-[3/4] bg-muted">
                              <img
                                src={photo}
                                alt={`Photo ${index + 1}`}
                                className="h-full w-full object-cover transition-smooth ease-liquid group-hover:scale-105"
                              />
                            </div>
                          </Card>

                          {count > 1 && (
                            <div className="absolute top-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                              {Array.from({ length: count }).map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => api?.scrollTo(idx)}
                                  className={cn(
                                    "h-1.5 rounded-full transition-all",
                                    idx === current
                                      ? "w-6 bg-primary"
                                      : "w-1.5 bg-primary/30 hover:bg-primary/60"
                                  )}
                                  aria-label={`Photo ${idx + 1}`}
                                />
                              ))}
                            </div>
                          )}

                          {count > 1 && (
                            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-background/80 backdrop-blur-sm rounded-md text-xs font-medium">
                              {current + 1}/{count}
                            </div>
                          )}
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

                <div className="hidden lg:flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => setShareProfileOpen(true)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditProfileOpen(true)}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Content Grid */}
            <div className="order-2 space-y-6">

              {/* Identity Card */}
              <motion.div layout>
                <Card className="p-6 transition-all duration-smooth ease-liquid hover:shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-3xl lg:text-4xl font-bold">Sarah Chen</h1>
                        <Badge variant="default">
                          <Star className="h-3 w-3 mr-1" />
                          Space Leader
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Computer Science</span>
                        <span>•</span>
                        <span>Junior</span>
                        <span>•</span>
                        <span>she/her</span>
                      </div>

                      <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
                        Building tools that make campus life better. Space leader for AI/ML Club. Always down for coffee.
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Class of 2025</Badge>
                        <Badge variant="secondary">#software-engineering</Badge>
                        <Badge variant="secondary">#ai-ml</Badge>
                      </div>
                    </div>

                    <Button size="lg" onClick={() => setEditProfileOpen(true)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Connections", value: 234, icon: Users },
                  { label: "Spaces", value: 12, icon: MessageCircle },
                  { label: "Posts", value: 156, icon: TrendingUp },
                  { label: "Events", value: 28, icon: Calendar },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Card
                      className="p-4 text-center transition-all duration-smooth ease-liquid hover:shadow-lg hover:border-primary/50 cursor-pointer"
                      onClick={() => {
                        setSelectedStat(stat);
                        setStatsModalOpen(true);
                      }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Schedule Preview */}
              <motion.div layout>
                <Card className="p-6 transition-all duration-smooth ease-liquid hover:shadow-lg group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Schedule</h3>
                      <Badge variant="secondary" className="text-xs">3 today</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-accent"
                      onClick={() => setScheduleDrawerOpen(true)}
                    >
                      View All →
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {[
                      { time: '10:00 AM', title: 'CS Study Session', location: 'Capen Library', emoji: '📚' },
                      { time: '2:00 PM', title: 'AI/ML Club Meeting', location: 'NSC 210', emoji: '🤖' },
                      { time: '6:00 PM', title: 'Hackathon Kickoff', location: 'CSE Building', emoji: '💻' },
                    ].map((event, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-smooth ease-liquid"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="text-2xl">{event.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-sm">{event.title}</p>
                            <span className="text-xs text-muted-foreground">•</span>
                            <p className="text-xs text-muted-foreground">{event.time}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">RSVP</Button>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* My Spaces */}
              <motion.div layout>
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-semibold">My Spaces</h3>
                    <Badge variant="outline">12 joined</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { emoji: "💻", name: "CS Study Group", members: 234, isLeader: true },
                      { emoji: "🤖", name: "AI/ML Club", members: 89, isLeader: true },
                      { emoji: "☕", name: "Coffee Chats", members: 156, isLeader: false },
                      { emoji: "🎨", name: "Design Club", members: 67, isLeader: false },
                      { emoji: "🏃", name: "Running", members: 45, isLeader: false },
                      { emoji: "📚", name: "Book Club", members: 23, isLeader: false },
                    ].map((space, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <Card className="p-4 transition-all duration-smooth ease-liquid hover:shadow-lg hover:border-primary/50 cursor-pointer group">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-4xl transition-smooth ease-liquid group-hover:scale-110">
                              {space.emoji}
                            </div>
                            {space.isLeader && (
                              <Badge variant="default" className="shrink-0">
                                <Star className="h-3 w-3" />
                              </Badge>
                            )}
                          </div>
                          <p className="font-semibold text-sm mb-1 line-clamp-1 transition-smooth ease-liquid group-hover:text-primary">
                            {space.name}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{space.members}</span>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* HiveLab */}
              <motion.div layout>
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">HiveLab</h3>
                      <Badge variant="default">
                        <Star className="h-3 w-3 mr-1" />
                        Leader Access
                      </Badge>
                    </div>
                    <Button size="sm" onClick={() => setHiveLabModalOpen(true)}>
                      <Sparkles className="h-4 w-4 mr-1" />
                      New Tool
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { emoji: "🗳️", name: "Quick Polls", uses: 156 },
                      { emoji: "📊", name: "Event RSVP", uses: 89 },
                    ].map((tool, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <Card className="p-4 transition-all duration-smooth ease-liquid hover:shadow-lg cursor-pointer">
                          <div className="text-3xl mb-3">{tool.emoji}</div>
                          <h4 className="font-semibold text-sm mb-1">{tool.name}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{tool.uses} uses</p>
                          <Badge variant="outline" className="text-xs">Active</Badge>
                        </Card>
                      </motion.div>
                    ))}

                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <Card
                        className="p-4 border-dashed transition-all duration-smooth ease-liquid hover:bg-accent cursor-pointer flex items-center justify-center h-full"
                        onClick={() => setHiveLabModalOpen(true)}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">+</div>
                          <p className="text-sm font-semibold">Build New</p>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Edit Profile Dialog */}
        <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Sarah Chen" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Building tools that make campus life better. Space leader for AI/ML Club. Always down for coffee."
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="major">Major</Label>
                <Input id="major" defaultValue="Computer Science" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" defaultValue="Junior" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pronouns">Pronouns</Label>
                <Input id="pronouns" defaultValue="she/her" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditProfileOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setEditProfileOpen(false)}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Stats Detail Dialog */}
        <Dialog open={statsModalOpen} onOpenChange={setStatsModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedStat?.label}</DialogTitle>
              <DialogDescription>
                View all your {selectedStat?.label.toLowerCase()}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="text-center mb-6">
                <p className="text-5xl font-bold mb-2">{selectedStat?.value}</p>
                <p className="text-sm text-muted-foreground">Total {selectedStat?.label}</p>
              </div>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-smooth">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Item {idx + 1}</p>
                      <p className="text-xs text-muted-foreground">Details about this item</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setStatsModalOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Schedule Drawer */}
        <Drawer open={scheduleDrawerOpen} onOpenChange={setScheduleDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Full Schedule</DrawerTitle>
              <DrawerDescription>Your upcoming events for this week</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-3">
                {[
                  { day: 'Today', events: [
                    { time: '10:00 AM', title: 'CS Study Session', location: 'Capen Library', emoji: '📚' },
                    { time: '2:00 PM', title: 'AI/ML Club Meeting', location: 'NSC 210', emoji: '🤖' },
                    { time: '6:00 PM', title: 'Hackathon Kickoff', location: 'CSE Building', emoji: '💻' },
                  ]},
                  { day: 'Tomorrow', events: [
                    { time: '11:00 AM', title: 'Office Hours', location: 'Davis Hall', emoji: '👨‍🏫' },
                    { time: '4:00 PM', title: 'Coffee Chat', location: 'Starbucks', emoji: '☕' },
                  ]},
                  { day: 'Wednesday', events: [
                    { time: '9:00 AM', title: 'Project Meeting', location: 'Zoom', emoji: '💼' },
                  ]},
                ].map((day, dayIdx) => (
                  <div key={dayIdx}>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">{day.day}</h4>
                    <div className="space-y-2">
                      {day.events.map((event, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-smooth">
                          <div className="text-2xl">{event.emoji}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm">{event.title}</p>
                              <span className="text-xs text-muted-foreground">•</span>
                              <p className="text-xs text-muted-foreground">{event.time}</p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">RSVP</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={() => setScheduleDrawerOpen(false)}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* HiveLab Tool Builder Dialog */}
        <Dialog open={hiveLabModalOpen} onOpenChange={setHiveLabModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Create New Tool
              </DialogTitle>
              <DialogDescription>
                Build a custom tool for your space. No code required.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tool-name">Tool Name</Label>
                <Input id="tool-name" placeholder="e.g., Event RSVP" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tool-type">Tool Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Card className="p-3 cursor-pointer hover:border-primary transition-smooth">
                    <div className="text-2xl mb-1 text-center">🗳️</div>
                    <p className="text-xs text-center font-medium">Poll</p>
                  </Card>
                  <Card className="p-3 cursor-pointer hover:border-primary transition-smooth">
                    <div className="text-2xl mb-1 text-center">📊</div>
                    <p className="text-xs text-center font-medium">Survey</p>
                  </Card>
                  <Card className="p-3 cursor-pointer hover:border-primary transition-smooth">
                    <div className="text-2xl mb-1 text-center">📝</div>
                    <p className="text-xs text-center font-medium">Form</p>
                  </Card>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tool-description">Description</Label>
                <Textarea
                  id="tool-description"
                  placeholder="Describe what this tool does..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setHiveLabModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setHiveLabModalOpen(false)}>
                <Sparkles className="h-4 w-4 mr-2" />
                Create Tool
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Share Profile Dialog */}
        <Dialog open={shareProfileOpen} onOpenChange={setShareProfileOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Share Profile</DialogTitle>
              <DialogDescription>
                Share your profile with others
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg mb-4">
                <Input
                  readOnly
                  value="https://hive.ub.edu/profile/sarah-chen"
                  className="flex-1 bg-background"
                />
                <Button variant="outline" size="sm">Copy</Button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" className="flex flex-col gap-1 h-auto py-3">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-xs">Message</span>
                </Button>
                <Button variant="outline" className="flex flex-col gap-1 h-auto py-3">
                  <Share2 className="h-5 w-5" />
                  <span className="text-xs">Instagram</span>
                </Button>
                <Button variant="outline" className="flex flex-col gap-1 h-auto py-3">
                  <Share2 className="h-5 w-5" />
                  <span className="text-xs">Twitter</span>
                </Button>
                <Button variant="outline" className="flex flex-col gap-1 h-auto py-3">
                  <Share2 className="h-5 w-5" />
                  <span className="text-xs">More</span>
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShareProfileOpen(false)}>Done</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/**
 * Viewing another student's profile (connected)
 *
 * Shows full content because users are connected.
 */
export const ConnectedView: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[340px_1fr] gap-6 lg:gap-8">
          <div className="lg:sticky lg:top-8">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="aspect-[3/4] bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=450&h=600&fit=crop"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </Card>
            <div className="flex gap-2 mt-4">
              <Button className="flex-1">
                Message
              </Button>
              <Button variant="outline">
                <Users className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <h1 className="text-3xl lg:text-4xl font-bold">Alex Morgan</h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Mechanical Engineering</span>
                    <span>•</span>
                    <span>Senior</span>
                  </div>
                  <p className="text-base text-muted-foreground">
                    Robotics enthusiast. President of UB Robotics Club.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Class of 2024</Badge>
                    <Badge variant="secondary">#robotics</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Connections", value: 187 },
                { label: "Spaces", value: 8 },
                { label: "Mutual", value: 12 },
                { label: "Events", value: 15 },
              ].map((stat, idx) => (
                <Card key={idx} className="p-4 text-center">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Minimal profile (not connected)
 *
 * Limited information shown for privacy.
 */
export const NotConnected: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 text-center">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">Jordan Lee</h1>
          <p className="text-muted-foreground mb-4">Biology • Sophomore</p>
          <p className="text-sm text-muted-foreground mb-6">
            Connect to see full profile
          </p>
          <Button>
            Send Connection Request
          </Button>
        </Card>
      </div>
    </div>
  ),
};
