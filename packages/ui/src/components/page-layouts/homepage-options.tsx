import * as React from "react"
import { Button } from "../button"
import { Card } from "../card"
import { 
  Users, 
  Zap, 
  BookOpen, 
  MessageCircle, 
  Calendar,
  Star,
  ArrowRight,
  Play,
  Coffee,
  Code,
  MapPin,
  Activity,
  TrendingUp,
  Heart
} from "lucide-react"

// OPTION A: HERO-FIRST LAYOUT - Traditional SaaS landing approach
export const HeroFirstHomepage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-sm">
              <span className="font-black text-black text-lg">H</span>
            </div>
            <span className="font-bold text-xl tracking-tight">HIVE</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-white/80 hover:text-white">Sign In</Button>
            <Button variant="primary" className="bg-accent text-black hover:bg-accent/90 font-medium">
              Join HIVE
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8 mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
              The programmable
              <br />
              <span className="bg-gradient-to-r from-accent via-accent to-white bg-clip-text text-transparent">
                campus layer
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Where students find their people, make decisions together, and build tools that spread across campus.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-accent text-black hover:bg-accent/90 font-semibold px-8 py-4 text-lg h-auto shadow-lg shadow-accent/20"
            >
              <Play className="w-5 h-5 mr-3" />
              See How It Works
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold px-8 py-4 text-lg h-auto"
            >
              Join Your Campus
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-5xl md:text-6xl font-black text-accent tracking-tight">1,247</div>
              <div className="text-lg text-white/60 font-medium">Students Connected</div>
            </div>
            <div className="space-y-3">
              <div className="text-5xl md:text-6xl font-black text-accent tracking-tight">89</div>
              <div className="text-lg text-white/60 font-medium">Active Spaces</div>
            </div>
            <div className="space-y-3">
              <div className="text-5xl md:text-6xl font-black text-accent tracking-tight">156</div>
              <div className="text-lg text-white/60 font-medium">Tools Built</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to thrive</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              The complete platform for campus connection, collaboration, and creation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-surface border-white/10 p-8 hover:bg-surface/80 transition-colors duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Find Your People</h3>
                  <p className="text-white/70 leading-relaxed">
                    Connect with students in your dorm, major, and interests. Build meaningful relationships that last.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-surface border-white/10 p-8 hover:bg-surface/80 transition-colors duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Build Together</h3>
                  <p className="text-white/70 leading-relaxed">
                    Create tools and experiences that spread across campus. Turn ideas into reality with your community.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-surface border-white/10 p-8 hover:bg-surface/80 transition-colors duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Make Decisions</h3>
                  <p className="text-white/70 leading-relaxed">
                    Coordinate group activities and campus decisions seamlessly. Democracy that actually works.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

// OPTION B: FEED-FIRST LAYOUT - Social media style immediate engagement
export const FeedFirstHomepage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-sm">
              <span className="font-black text-black">H</span>
            </div>
            <span className="font-bold text-lg">HIVE</span>
          </div>
          <Button size="sm" variant="secondary" className="border-white/30 text-white hover:bg-white/10">
            Join Campus
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">What's happening on campus?</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Join 1,247 students building the future of campus life
          </p>
        </div>

        {/* Live Feed Preview */}
        <div className="space-y-8">
          <Card className="bg-surface border-white/10 p-8 hover:bg-surface/80 transition-colors duration-300">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Coffee className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg">CS Study Group</span>
                  <span className="text-sm text-white/60">2 min ago</span>
                </div>
                <p className="text-white/90 text-base leading-relaxed">
                  Late night coding session starting now! Coffee and good vibes in the CS building. 
                  Who's joining? ✨
                </p>
                <div className="flex items-center gap-6 pt-2">
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    12 reactions
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    5 replies
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-surface border-white/10 p-8 hover:bg-surface/80 transition-colors duration-300">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg">Dorm 3A</span>
                  <span className="text-sm text-white/60">5 min ago</span>
                </div>
                <p className="text-white/90 text-base leading-relaxed">
                  🍕 Pizza party in the common room starting at 8pm! Everyone's invited.
                </p>
                <div className="flex items-center gap-6 pt-2">
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    23 reactions
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    8 replies
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-surface border-white/10 p-8 hover:bg-surface/80 transition-colors duration-300">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg">Engineering Club</span>
                  <span className="text-sm text-white/60">8 min ago</span>
                </div>
                <p className="text-white/90 text-base leading-relaxed">
                  New project launched: Campus Energy Tracker! Real-time data about study spaces, 
                  events, and social energy across campus. 
                </p>
                <div className="flex items-center gap-6 pt-2">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="border-accent/30 text-accent hover:bg-accent/10"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Try the Tool
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    47 reactions
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Join CTA */}
        <div className="mt-20 text-center">
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to join the conversation?</h3>
            <p className="text-white/70 mb-8 text-lg max-w-2xl mx-auto">
              Connect with your campus community and start building together.
            </p>
            <Button 
              size="lg" 
              className="bg-accent text-black hover:bg-accent/90 font-semibold px-8 py-4 text-lg h-auto shadow-lg shadow-accent/20"
            >
              <Users className="w-5 h-5 mr-3" />
              Join Your Campus
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// OPTION C: DASHBOARD-FIRST LAYOUT - App-like experience
export const DashboardFirstHomepage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="font-black text-black">H</span>
            </div>
            <span className="font-bold text-xl">HIVE</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-white/60">1,247 students online</div>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Campus Dashboard</h1>
          <p className="text-white/70">Everything happening on campus, organized just for you</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Campus Energy */}
          <Card className="bg-surface border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Campus Energy</h3>
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
            </div>
            <div className="text-3xl font-bold text-accent mb-2">87%</div>
            <div className="text-sm text-white/60 mb-4">
              Peak activity in CS Building and Library
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-accent h-2 rounded-full w-[87%]" />
            </div>
          </Card>

          {/* Active Spaces */}
          <Card className="bg-surface border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Active Spaces</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">CS Study Hub</span>
                <span className="text-xs text-accent">24 active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dorm 3A</span>
                <span className="text-xs text-accent">12 active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Engineering Club</span>
                <span className="text-xs text-accent">8 active</span>
              </div>
            </div>
          </Card>

          {/* Trending Tools */}
          <Card className="bg-surface border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Trending Tools</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Study Session Poll</span>
                <span className="text-xs text-accent">89 votes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dorm Pizza Order</span>
                <span className="text-xs text-accent">45 orders</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Campus Events</span>
                <span className="text-xs text-accent">23 events</span>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-surface border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Recent Activity</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-white/80">Study group started</span>
                <span className="text-xs text-white/60">2m ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-white/80">New tool deployed</span>
                <span className="text-xs text-white/60">5m ago</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-white/80">Event scheduled</span>
                <span className="text-xs text-white/60">8m ago</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-surface border-white/10 p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Find Study Group
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Code className="w-4 h-4 mr-2" />
                Build Tool
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Event
              </Button>
            </div>
          </Card>

          {/* Campus Map */}
          <Card className="bg-surface border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Campus Map</h3>
            </div>
            <div className="bg-white/5 rounded-lg h-24 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-sm text-white/70">Interactive campus map</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Get Started Banner */}
        <div className="mt-12 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to dive in?</h3>
          <p className="text-white/70 mb-6">
            Join your campus community and start building the future of student life together.
          </p>
          <Button size="lg" className="bg-accent text-black hover:bg-accent/90">
            <Zap className="w-5 h-5 mr-2" />
            Join Your Campus
          </Button>
        </div>
      </div>
    </div>
  )
}

// OPTION D: CAMPUS-FIRST LAYOUT - Education focused
export const CampusFirstHomepage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Campus Header */}
      <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-accent/20 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="font-black text-black">H</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">HIVE</h1>
                <p className="text-sm text-white/70">Campus Technology Platform</p>
              </div>
            </div>
            <Button className="bg-accent text-black hover:bg-accent/90">
              Join Campus
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">1,247</div>
              <div className="text-sm text-white/60">Students Connected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">89</div>
              <div className="text-sm text-white/60">Active Study Groups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">156</div>
              <div className="text-sm text-white/60">Campus Tools</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Campus Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dorms */}
          <Card className="bg-surface border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Dorms</h3>
            </div>
            <p className="text-white/70 text-sm mb-4">
              Connect with your dorm community, organize events, and coordinate activities.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between py-2 px-3 bg-white/5 rounded">
                <span className="text-sm">Dorm 3A</span>
                <span className="text-xs text-accent">47 residents</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-white/5 rounded">
                <span className="text-sm">Dorm 2B</span>
                <span className="text-xs text-accent">52 residents</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-white/5 rounded">
                <span className="text-sm">Dorm 1C</span>
                <span className="text-xs text-accent">39 residents</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Find My Dorm
            </Button>
          </Card>

          {/* Majors */}
          <Card className="bg-surface border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Majors</h3>
            </div>
            <p className="text-white/70 text-sm mb-4">
              Study groups, project collaboration, and academic support for your major.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between py-2 px-3 bg-white/5 rounded">
                <span className="text-sm">Computer Science</span>
                <span className="text-xs text-accent">234 students</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-white/5 rounded">
                <span className="text-sm">Engineering</span>
                <span className="text-xs text-accent">189 students</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-white/5 rounded">
                <span className="text-sm">Business</span>
                <span className="text-xs text-accent">167 students</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              <BookOpen className="w-4 h-4 mr-2" />
              Join My Major
            </Button>
          </Card>

          {/* Clubs */}
          <Card className="bg-surface border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Clubs</h3>
            </div>
            <p className="text-white/70 text-sm mb-4">
              Join clubs, organize events, and pursue your interests with like-minded students.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between py-2 px-3 bg-white/5 rounded">
                <span className="text-sm">Engineering Club</span>
                <span className="text-xs text-accent">89 members</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-white/5 rounded">
                <span className="text-sm">Gaming Society</span>
                <span className="text-xs text-accent">156 members</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 bg-white/5 rounded">
                <span className="text-sm">Art Collective</span>
                <span className="text-xs text-accent">67 members</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              <Star className="w-4 h-4 mr-2" />
              Explore Clubs
            </Button>
          </Card>
        </div>

        {/* Campus Tools */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Campus Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-surface border-white/10 p-6 text-center">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Study Sessions</h3>
              <p className="text-sm text-white/70">Schedule and join study groups</p>
            </Card>
            <Card className="bg-surface border-white/10 p-6 text-center">
              <Coffee className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Meetups</h3>
              <p className="text-sm text-white/70">Organize casual hangouts</p>
            </Card>
            <Card className="bg-surface border-white/10 p-6 text-center">
              <MessageCircle className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Discussion</h3>
              <p className="text-sm text-white/70">Campus-wide conversations</p>
            </Card>
            <Card className="bg-surface border-white/10 p-6 text-center">
              <Code className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Build Tools</h3>
              <p className="text-sm text-white/70">Create custom campus tools</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// OPTION E: COMMUNITY-FIRST LAYOUT - Social proof heavy
export const CommunityFirstHomepage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="font-black text-black">H</span>
            </div>
            <span className="font-bold text-xl">HIVE</span>
          </div>
          <Button className="bg-accent text-black hover:bg-accent/90">
            Join Community
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Community Stats */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Join <span className="text-accent">1,247</span> students building the future
          </h1>
          <p className="text-xl text-white/70 mb-8">
            The most active campus community platform, where students connect, collaborate, and create together.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-accent mb-1">1,247</div>
              <div className="text-sm text-white/60">Active Students</div>
            </div>
            <div className="bg-surface border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-accent mb-1">89</div>
              <div className="text-sm text-white/60">Study Groups</div>
            </div>
            <div className="bg-surface border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-accent mb-1">156</div>
              <div className="text-sm text-white/60">Tools Created</div>
            </div>
            <div className="bg-surface border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-accent mb-1">2,489</div>
              <div className="text-sm text-white/60">Connections Made</div>
            </div>
          </div>
        </div>

        {/* Community Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-surface border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="font-semibold text-accent">JS</span>
              </div>
              <div>
                <div className="font-semibold">Jacob Smith</div>
                <div className="text-sm text-white/60">CS Major, Dorm 3A</div>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4">
              "HIVE helped me find my study group and connect with other CS students. 
              The tools we built together made our projects so much easier!"
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-accent fill-current" />
              ))}
            </div>
          </Card>

          <Card className="bg-surface border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="font-semibold text-accent">ML</span>
              </div>
              <div>
                <div className="font-semibold">Maria Lopez</div>
                <div className="text-sm text-white/60">Engineering, Club President</div>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4">
              "Managing our engineering club became so much easier with HIVE. 
              The event organization tools are amazing, and everyone stays connected."
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-accent fill-current" />
              ))}
            </div>
          </Card>

          <Card className="bg-surface border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="font-semibold text-accent">AK</span>
              </div>
              <div>
                <div className="font-semibold">Alex Kim</div>
                <div className="text-sm text-white/60">Business Major, RA</div>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4">
              "As an RA, HIVE transformed how I connect with residents. 
              The dorm coordination tools made organizing events effortless."
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-accent fill-current" />
              ))}
            </div>
          </Card>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Real Impact Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold">CS Study Group Success</h3>
              </div>
              <p className="text-white/80 text-sm">
                Started with 4 students, now 47 members strong. Average GPA improvement of 0.7 points. 
                23 students landed internships through peer connections.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold">Campus Tool Innovation</h3>
              </div>
              <p className="text-white/80 text-sm">
                156 student-built tools deployed across campus. From dining hall polls to 
                study room booking systems, students are solving real problems.
              </p>
            </div>
          </div>
        </div>

        {/* Join CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to be part of something bigger?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already building the future of campus life. 
            Find your community, create together, and make your mark.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-black hover:bg-accent/90">
              <Users className="w-5 h-5 mr-2" />
              Join Your Campus
            </Button>
            <Button size="lg" variant="secondary">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}