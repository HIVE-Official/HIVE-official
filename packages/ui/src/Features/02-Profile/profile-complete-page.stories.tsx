import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../../atomic/atoms/badge";
import { Button } from "../../atomic/atoms/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../atomic/atoms/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "../../atomic/atoms/carousel";
import { cn } from "../../lib/utils";
import { Edit } from "lucide-react";

/**
 * # Profile Complete Page - Priority 1 IA Restructure
 *
 * **UNIFIED RESPONSIVE LAYOUT - Single component for all screen sizes**
 * Mobile: Stacked compact cards | Tablet: 2-column | Desktop: Full bento grid
 *
 * ## Priority 1 IA Changes (2025 Tech Company Standards):
 * 1. ✅ Visual Hierarchy: Photo/Identity > Calendar > Stats > Bio > Widgets
 * 2. ✅ Stats integrated into header (not detached row)
 * 3. ✅ Bio always visible (no scrolling needed)
 * 4. ✅ Calendar reduced to 240px (desktop), 180px (mobile)
 * 5. ✅ Asymmetric widget grid (2 small + 1 large HiveLab)
 * 6. ✅ Desktop fits in viewport (no scrolling on 1440px+)
 * 7. ✅ Photo indicators (Tinder-style dots)
 * 8. ✅ Clear hover affordances (arrows on all interactive elements)
 *
 * ## Design Principles:
 * - Vercel/Linear polish: Subtle animations, clear hierarchy
 * - Arc spatial UI: Progressive disclosure, clear sections
 * - Stripe clarity: No ambiguity about what's clickable
 *
 * ## Next Steps (Priority 2):
 * - Continue mobile-first refactor
 * - Remove duplicate mobile layout
 * - Test at all breakpoints
 */

const meta = {
  title: "02-Profile/ProfileCompletePage",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Complete HIVE profile with Priority 1 IA restructure. Single responsive component matching 2025 tech standards.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data
const mockProfile = {
  name: "Sarah Chen",
  handle: "sarahc",
  pronouns: "she/her",
  major: "Computer Science",
  academicYear: "Junior",
  graduationYear: 2025,
  bio: "CS major passionate about AI/ML and building tools that make campus life better. Always down for coffee chats and hackathons! Currently working on my senior thesis about neural networks.",
  photos: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=450&h=600&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=450&h=600&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=450&h=600&fit=crop",
  ],
  stats: [
    { label: "Connections", value: 234, href: "/connections" },
    { label: "Spaces", value: 12, href: "/spaces" },
    { label: "Posts", value: 156 },
    { label: "Active Days", value: 28 },
  ],
};

const mockScheduleEvents = [
  {
    id: "1",
    title: "CSE 442 Lecture",
    type: "class" as const,
    startTime: "10:00 AM",
    endTime: "11:20 AM",
    location: "NSC 220",
    instructor: "Dr. Smith",
  },
  {
    id: "2",
    title: "AI/ML Club Meeting",
    type: "event" as const,
    startTime: "6:00 PM",
    endTime: "7:30 PM",
    location: "Student Union",
    spaceName: "AI/ML Club",
  },
  {
    id: "3",
    title: "Office Hours",
    type: "office-hours" as const,
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    location: "Davis 338",
    instructor: "Prof. Johnson",
  },
];

const mockSpaces = [
  { id: "1", name: "CS Study Group", icon: "💻", memberCount: 234, role: "Leader" },
  { id: "2", name: "AI/ML Club", icon: "🤖", memberCount: 89, role: "Member" },
  { id: "3", name: "Coffee Chats", icon: "☕", memberCount: 156, role: "Member" },
  { id: "4", name: "UB Hackers", icon: "⚡", memberCount: 312, role: "Member" },
];

const mockActivities = [
  { id: "1", type: "post", time: "2h ago", title: "Posted in CS Study Group", space: "CS Study Group" },
  { id: "2", type: "join", time: "Yesterday", title: "Joined AI/ML Club" },
  { id: "3", type: "event", time: "2d ago", title: "RSVP'd to Hackathon", space: "UB Hackers" },
];

const mockTools = [
  { id: "1", name: "Study Timer", icon: "⏱️", description: "Pomodoro sessions", uses: 42 },
  { id: "2", name: "Grade Calculator", icon: "📊", description: "GPA scenarios", uses: 28 },
  { id: "3", name: "Group Poll", icon: "🗳️", description: "Quick voting", uses: 15 },
];

/**
 * Own Profile - Default view with Priority 1 IA restructure
 */
export const OwnProfile: Story = {
  render: () => {
    // Photo carousel with memoized state to prevent infinite loops
    const ProfilePhotoCarousel = ({ photos }: { photos: string[] }) => {
      const [api, setApi] = React.useState<CarouselApi>();
      const [current, setCurrent] = React.useState(0);

      // Memoized event handler to prevent re-renders
      const handleSelect = React.useCallback(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
      }, [api]);

      // Subscribe to carousel events with proper cleanup
      React.useEffect(() => {
        if (!api) return;

        // Set initial index
        setCurrent(api.selectedScrollSnap());

        // Listen for changes
        api.on("select", handleSelect);

        // Cleanup listener on unmount
        return () => {
          api.off("select", handleSelect);
        };
      }, [api, handleSelect]);

      return (
        <div className="relative h-full">
          <Carousel opts={{ loop: true }} className="w-full h-full" setApi={setApi}>
            <CarouselContent className="h-full">
              {photos.map((photo, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative aspect-[3/4] bg-muted cursor-pointer overflow-hidden rounded-xl">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* PHOTO INDICATORS - Tinder-style dots (always visible) */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {photos.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === current ? "bg-white w-6" : "bg-white/40 w-1.5"
                )}
              />
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

          {/* UNIFIED RESPONSIVE LAYOUT - Single component for all screen sizes */}
          {/* Mobile: Stacked compact cards | Tablet: 2-column | Desktop: Full bento grid */}

          {/* HEADER: Photo + Calendar + Stats + Bio (NEW IA - Priority 1) */}
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr] gap-3 lg:gap-4 mb-6">

            {/* PHOTO WITH IDENTITY OVERLAY - Tinder-style (responsive sizing) */}
            <div className="relative h-[280px] md:h-[520px] lg:h-[560px] rounded-xl overflow-hidden cursor-pointer group">
              <ProfilePhotoCarousel photos={mockProfile.photos} />

              {/* EDIT PROFILE BUTTON - Top-right corner */}
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-4 right-4 z-20 pointer-events-auto bg-black/50 backdrop-blur-sm hover:bg-black/70 border-white/20"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>

              {/* GRADIENT OVERLAY - Black to transparent */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

              {/* IDENTITY OVERLAY - Bottom of photo */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-white z-10 pointer-events-none">
                <h1 className="text-3xl lg:text-4xl font-bold mb-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  {mockProfile.name}
                </h1>
                <p className="text-base lg:text-lg opacity-90 mb-2" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
                  @{mockProfile.handle}
                </p>
                {/* Two-line metadata for better readability */}
                <div className="text-sm lg:text-base opacity-80 space-y-0.5" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                  <div className="flex flex-wrap gap-2">
                    <span>{mockProfile.pronouns}</span>
                    <span>•</span>
                    <span>{mockProfile.major}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span>{mockProfile.academicYear}</span>
                    <span>•</span>
                    <span>Class of {mockProfile.graduationYear}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Calendar + Stats + Bio - Responsive stacking */}
            <div className="flex flex-col gap-3 lg:gap-4">

              {/* CALENDAR - Compact preview (Mobile: 180px | Desktop: 240px) */}
              <Card className="h-[180px] md:h-[240px] overflow-hidden transition-all hover:shadow-lg cursor-pointer group">
                <CardHeader className="pb-2 md:pb-3">
                  <CardTitle className="text-sm md:text-base lg:text-lg flex items-center gap-2">
                    📅 <span className="hidden md:inline">Today's</span> Schedule
                    <Badge variant="secondary" className="text-[9px] md:text-[10px] h-4 md:h-5 ml-auto">
                      {mockScheduleEvents.length}
                    </Badge>
                    <svg className="h-3 w-3 md:h-4 md:w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Show 2-3 events based on screen size */}
                  {mockScheduleEvents.slice(0, 3).map((event, i) => (
                    <div
                      key={event.id}
                      className={cn(
                        "p-2 md:p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors",
                        i === 2 && "hidden md:block" // Hide 3rd event on mobile
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-sm">{event.type === "class" ? "📚" : event.type === "event" ? "🎉" : "⏰"}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-semibold truncate">{event.title}</p>
                          <p className="text-[10px] md:text-xs text-muted-foreground">
                            {event.startTime} - {event.endTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* STATS - Responsive 4-column grid integrated into header */}
              <Card className="p-2 md:p-3">
                <div className="grid grid-cols-4 divide-x divide-border/50">
                  {mockProfile.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="px-2 md:px-3 hover:bg-muted/50 transition-colors cursor-pointer group rounded-sm"
                    >
                      <div className="text-center py-1">
                        <div className="text-lg md:text-2xl font-bold">{stat.value}</div>
                        <div className="text-[10px] md:text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* BIO - Always visible, compact on mobile */}
              <Card className="p-3 md:p-4 hover:shadow-md transition-all cursor-pointer group">
                <CardTitle className="text-xs md:text-sm flex items-center gap-2 mb-2">
                  About
                  <svg className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </CardTitle>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 md:line-clamp-none">
                  {mockProfile.bio}
                </p>
              </Card>
            </div>
          </div>

          {/* WIDGET GRID - Asymmetric Bento-style (2 small + 1 large) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr] gap-3 lg:gap-4">

            {/* LEFT: My Spaces - Small widget */}
            <Card className="overflow-hidden transition-all hover:shadow-lg cursor-pointer group">
              {/* Compact cover strip - Blue → Purple gradient */}
              <div className="h-10 bg-gradient-to-r from-blue-600 to-purple-600 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white text-sm font-semibold">
                  🏢 My Spaces
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 text-[9px] h-4">{mockSpaces.length}</Badge>
                  <svg className="h-3.5 w-3.5 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-2">
                  {mockSpaces.slice(0, 4).map(space => (
                    <div key={space.id} className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                      <div className="text-2xl mb-1">{space.icon}</div>
                      <p className="text-xs font-semibold truncate">{space.name}</p>
                      <p className="text-[10px] text-muted-foreground">{space.memberCount} members</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* MIDDLE: Recent Activity - Small widget */}
            <Card className="overflow-hidden transition-all hover:shadow-lg cursor-pointer group">
              {/* Compact cover strip - Green → Emerald gradient */}
              <div className="h-10 bg-gradient-to-r from-green-600 to-emerald-600 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white text-sm font-semibold">
                  📊 Activity
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 text-[9px] h-4">{mockActivities.length}</Badge>
                  <svg className="h-3.5 w-3.5 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <CardContent className="pt-4 space-y-2">
                {mockActivities.map(activity => (
                  <div key={activity.id} className="p-2 rounded-lg hover:bg-accent/50 transition-colors">
                    <p className="text-xs font-semibold">{activity.title}</p>
                    <p className="text-[10px] text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* RIGHT: HiveLab - LARGE widget (1.2fr width on desktop) */}
            <Card className="md:col-span-2 lg:col-span-1 border-primary/30 overflow-hidden transition-all hover:shadow-xl cursor-pointer group relative">
              {/* Compact cover strip - Gold gradient (premium branding) */}
              <div className="h-10 bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 px-4 flex items-center justify-between relative overflow-hidden">
                {/* Subtle shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex items-center gap-2 text-white text-sm font-semibold relative z-10">
                  🔬 HiveLab
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 text-[9px] h-4">{mockTools.length} tools</Badge>
                  <svg className="h-3.5 w-3.5 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Gold glow effect in card body */}
              <div className="absolute inset-0 top-10 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 pointer-events-none" />
              <div className="absolute inset-0 top-10 bg-[radial-gradient(circle_at_50%_120%,rgba(255,215,0,0.15),rgba(255,255,255,0))] pointer-events-none" />

              <CardContent className="pt-4 space-y-2 relative z-10">
                {mockTools.map(tool => (
                  <div key={tool.id} className="p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors border border-primary/10">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{tool.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold">{tool.name}</p>
                        <p className="text-[10px] text-muted-foreground">{tool.description} • {tool.uses} uses</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2 border-primary/30 hover:bg-primary/10">
                  + Create New Tool
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  },
};
