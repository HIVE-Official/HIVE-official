import * as React from "react"
import { Button } from "../button"
import { Card } from "../card"
import { 
  User, 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Star, 
  Clock, 
  Activity, 
  BookOpen, 
  Coffee, 
  Code, 
  MessageCircle, 
  Heart, 
  ChevronRight, 
  Plus,
  Grid3x3,
  List,
  Eye,
  EyeOff,
  Sparkles,
  TrendingUp,
  Calendar as CalendarIcon,
  Edit3,
  Share2,
  ExternalLink,
  Link,
  Github,
  Twitter,
  Mail,
  Phone,
  GraduationCap,
  Building
} from "lucide-react"

// PROFILE LAYOUT A: BENTO GRID - Modern, visual, dashboard-like
export const BentoGridProfile = () => {
  const [isGhostMode, setIsGhostMode] = React.useState(false)

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[var(--hive-text-inverse)] font-['Geist_Sans'] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FFD700] flex items-center justify-center">
              <span className="text-2xl font-black text-[var(--hive-text-primary)]">JS</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-[-0.02em]">Jacob Smith</h1>
              <p className="text-[var(--hive-text-inverse)]/60 text-lg">Computer Science • Class of 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ButtonEnhanced
              variant="ghost"
              size="sm"
              onClick={() => setIsGhostMode(!isGhostMode)}
              className="text-[var(--hive-text-inverse)]/70 hover:text-[var(--hive-text-inverse)]"
            >
              {isGhostMode ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
              Ghost Mode
            </ButtonEnhanced>
            <ButtonEnhanced variant="secondary" size="sm">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </ButtonEnhanced>
            <ButtonEnhanced variant="secondary" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </ButtonEnhanced>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Main Stats - Large tile */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-4">
            <Card className="bg-[#111111] border-white/10 p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Campus Impact</h3>
                <TrendingUp className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#FFD700] mb-2">1,247</div>
                  <div className="text-[var(--hive-text-inverse)]/70">Students Connected</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#FFD700]">23</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">Spaces Run</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#FFD700]">89</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">Tools Created</div>
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#FFD700] h-2 rounded-full w-3/4"></div>
                </div>
                <div className="text-center text-sm text-[var(--hive-text-inverse)]/60">
                  Level 12 • Campus Leader
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 xl:col-span-2">
            <Card className="bg-[#111111] border-white/10 p-6 h-full">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <ButtonEnhanced variant="secondary" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Space
                </ButtonEnhanced>
                <ButtonEnhanced variant="secondary" className="w-full justify-start">
                  <Code className="w-4 h-4 mr-2" />
                  Build Tool
                </ButtonEnhanced>
                <ButtonEnhanced variant="secondary" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Find People
                </ButtonEnhanced>
                <ButtonEnhanced variant="secondary" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </ButtonEnhanced>
              </div>
            </Card>
          </div>

          {/* Current Status */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 xl:col-span-2">
            <Card className="bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 border-[#FFD700]/20 p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-pulse"></div>
                <h3 className="text-lg font-semibold">Currently</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-sm">Studying CS 301</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-sm">Library Study Room 3</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-sm">With 4 study buddies</span>
                </div>
                <div className="text-xs text-[var(--hive-text-inverse)]/60 mt-4">
                  Session started 2h ago
                </div>
              </div>
            </Card>
          </div>

          {/* Achievements */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-4">
            <Card className="bg-[#111111] border-white/10 p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recent Achievements</h3>
                <Trophy className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Study Streak Master</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">30 days of consistent learning</div>
                  </div>
                  <div className="text-xs text-[var(--hive-text-inverse)]/60">2 days ago</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Community Builder</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">Connected 100+ students</div>
                  </div>
                  <div className="text-xs text-[var(--hive-text-inverse)]/60">1 week ago</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <Code className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Tool Creator</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">Built 5 campus tools</div>
                  </div>
                  <div className="text-xs text-[var(--hive-text-inverse)]/60">2 weeks ago</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Active Spaces */}
          <div className="col-span-12 lg:col-span-6">
            <Card className="bg-[#111111] border-white/10 p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Active Spaces</h3>
                <ButtonEnhanced variant="ghost" size="sm">
                  <Grid3x3 className="w-4 h-4 mr-2" />
                  View All
                </ButtonEnhanced>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">CS Study Hub</h4>
                    <div className="px-2 py-1 bg-[#FFD700]/20 text-[#FFD700] text-xs rounded">Admin</div>
                  </div>
                  <div className="space-y-2 text-sm text-[var(--hive-text-inverse)]/70">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      <span>247 members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3" />
                      <span>89 active today</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Dorm 3A</h4>
                    <div className="px-2 py-1 bg-white/20 text-[var(--hive-text-inverse)]/70 text-xs rounded">Member</div>
                  </div>
                  <div className="space-y-2 text-sm text-[var(--hive-text-inverse)]/70">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      <span>47 residents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3" />
                      <span>12 active now</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Algorithm Club</h4>
                    <div className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">Co-founder</div>
                  </div>
                  <div className="space-y-2 text-sm text-[var(--hive-text-inverse)]/70">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      <span>156 members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3" />
                      <span>34 active today</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Coffee & Code</h4>
                    <div className="px-2 py-1 bg-white/20 text-[var(--hive-text-inverse)]/70 text-xs rounded">Member</div>
                  </div>
                  <div className="space-y-2 text-sm text-[var(--hive-text-inverse)]/70">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      <span>89 members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3" />
                      <span>23 active today</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Personal Calendar */}
          <div className="col-span-12 lg:col-span-6">
            <Card className="bg-[#111111] border-white/10 p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Today's Schedule</h3>
                <ButtonEnhanced variant="ghost" size="sm">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Full Calendar
                </ButtonEnhanced>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-12 bg-[#FFD700] rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-semibold">CS 301 Lecture</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">Data Structures & Algorithms</div>
                    <div className="text-xs text-[var(--hive-text-inverse)]/50">10:00 AM - 11:30 AM</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-12 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-semibold">Study Group</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">Algorithm Review Session</div>
                    <div className="text-xs text-[var(--hive-text-inverse)]/50">2:00 PM - 4:00 PM</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-12 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-semibold">Coffee & Code</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">Casual coding session</div>
                    <div className="text-xs text-[var(--hive-text-inverse)]/50">7:00 PM - 9:00 PM</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// PROFILE LAYOUT B: TRADITIONAL CARD GRID - Clean, familiar, structured
export const CardGridProfile = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[var(--hive-text-inverse)] font-['Geist_Sans'] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <Card className="bg-[#111111] border-white/10 p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#FFD700] flex items-center justify-center">
                <span className="text-3xl font-black text-[var(--hive-text-primary)]">JS</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full border-4 border-[#111111] flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold tracking-[-0.02em] mb-2">Jacob Smith</h1>
                  <p className="text-xl text-[var(--hive-text-inverse)]/70">Computer Science • Class of 2026</p>
                </div>
                <div className="flex gap-3 mt-4 lg:mt-0">
                  <ButtonEnhanced variant="secondary" size="sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </ButtonEnhanced>
                  <ButtonEnhanced variant="secondary" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Profile
                  </ButtonEnhanced>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFD700]">1,247</div>
                  <div className="text-sm text-[var(--hive-text-inverse)]/60">Students Connected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFD700]">23</div>
                  <div className="text-sm text-[var(--hive-text-inverse)]/60">Spaces Run</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFD700]">89</div>
                  <div className="text-sm text-[var(--hive-text-inverse)]/60">Tools Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFD700]">12</div>
                  <div className="text-sm text-[var(--hive-text-inverse)]/60">Campus Level</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* About Card */}
            <Card className="bg-[#111111] border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-[#FFD700]" />
                  <div>
                    <div className="font-medium">Computer Science</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">Junior • 3.8 GPA</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-[#FFD700]" />
                  <div>
                    <div className="font-medium">Stanford University</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">Class of 2026</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#FFD700]" />
                  <div>
                    <div className="font-medium">Palo Alto, CA</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">Dorm 3A • Room 214</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-[#FFD700]" />
                  <div>
                    <div className="font-medium">Interests</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">AI, Web Dev, Coffee</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Card */}
            <Card className="bg-[#111111] border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#FFD700]" />
                  <span className="text-[var(--hive-text-inverse)]/80">jacob.smith@stanford.edu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#FFD700]" />
                  <span className="text-[var(--hive-text-inverse)]/80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-[#FFD700]" />
                  <span className="text-[var(--hive-text-inverse)]/80">@jacobsmith</span>
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="w-5 h-5 text-[#FFD700]" />
                  <span className="text-[var(--hive-text-inverse)]/80">@jacob_codes</span>
                </div>
              </div>
            </Card>

            {/* Skills Card */}
            <Card className="bg-[#111111] border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] text-sm rounded-full">JavaScript</span>
                <span className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] text-sm rounded-full">Python</span>
                <span className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] text-sm rounded-full">React</span>
                <span className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] text-sm rounded-full">Node.js</span>
                <span className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] text-sm rounded-full">Machine Learning</span>
                <span className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] text-sm rounded-full">Data Structures</span>
                <span className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] text-sm rounded-full">Algorithms</span>
                <span className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] text-sm rounded-full">UI/UX Design</span>
              </div>
            </Card>
          </div>

          {/* Middle Column */}
          <div className="space-y-8">
            {/* Recent Activity Card */}
            <Card className="bg-[#111111] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recent Activity</h3>
                <ButtonEnhanced variant="ghost" size="sm">
                  <List className="w-4 h-4 mr-2" />
                  View All
                </ButtonEnhanced>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Code className="w-4 h-4 text-[#FFD700]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Created a new tool</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">Study Session Timer for CS Study Hub</div>
                    <div className="text-xs text-[var(--hive-text-inverse)]/50">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-[#FFD700]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Joined Algorithm Club</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">Started following weekly coding challenges</div>
                    <div className="text-xs text-[var(--hive-text-inverse)]/50">1 day ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Trophy className="w-4 h-4 text-[#FFD700]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Achieved Study Streak Master</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">30 days of consistent learning</div>
                    <div className="text-xs text-[var(--hive-text-inverse)]/50">2 days ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle className="w-4 h-4 text-[#FFD700]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Started discussion</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">"Best algorithms for sorting large datasets"</div>
                    <div className="text-xs text-[var(--hive-text-inverse)]/50">3 days ago</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tools Created Card */}
            <Card className="bg-[#111111] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Tools Created</h3>
                <ButtonEnhanced variant="ghost" size="sm">
                  <Code className="w-4 h-4 mr-2" />
                  View All
                </ButtonEnhanced>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Study Session Timer</h4>
                    <div className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">Active</div>
                  </div>
                  <p className="text-sm text-[var(--hive-text-inverse)]/70 mb-3">Pomodoro timer with group sync for study sessions</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--hive-text-inverse)]/50">247 uses this week</span>
                    <ButtonEnhanced variant="ghost" size="sm">
                      <ExternalLink className="w-3 h-3" />
                    </ButtonEnhanced>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Algorithm Visualizer</h4>
                    <div className="px-2 py-1 bg-[#FFD700]/20 text-[#FFD700] text-xs rounded">Popular</div>
                  </div>
                  <p className="text-sm text-[var(--hive-text-inverse)]/70 mb-3">Interactive visualizations for sorting algorithms</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--hive-text-inverse)]/50">1,247 uses this month</span>
                    <ButtonEnhanced variant="ghost" size="sm">
                      <ExternalLink className="w-3 h-3" />
                    </ButtonEnhanced>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Coffee Shop Finder</h4>
                    <div className="px-2 py-1 bg-white/20 text-[var(--hive-text-inverse)]/70 text-xs rounded">Beta</div>
                  </div>
                  <p className="text-sm text-[var(--hive-text-inverse)]/70 mb-3">Find the best study spots on campus</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--hive-text-inverse)]/50">89 uses this week</span>
                    <ButtonEnhanced variant="ghost" size="sm">
                      <ExternalLink className="w-3 h-3" />
                    </ButtonEnhanced>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Current Status Card */}
            <Card className="bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 border-[#FFD700]/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-pulse"></div>
                <h3 className="text-xl font-semibold">Currently Active</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#FFD700]" />
                  <div>
                    <div className="font-medium">Studying CS 301</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/70">Data Structures & Algorithms</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#FFD700]" />
                  <div>
                    <div className="font-medium">Library Study Room 3</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/70">2nd floor, quiet zone</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#FFD700]" />
                  <div>
                    <div className="font-medium">4 study buddies</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/70">Sarah, Mike, Anna, Chris</div>
                  </div>
                </div>
                <div className="text-center pt-4 border-t border-white/10">
                  <div className="text-sm text-[var(--hive-text-inverse)]/60">Session started</div>
                  <div className="text-2xl font-bold text-[#FFD700]">2h 34m</div>
                  <div className="text-sm text-[var(--hive-text-inverse)]/60">ago</div>
                </div>
              </div>
            </Card>

            {/* Spaces Card */}
            <Card className="bg-[#111111] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">My Spaces</h3>
                <ButtonEnhanced variant="ghost" size="sm">
                  <Grid3x3 className="w-4 h-4 mr-2" />
                  View All
                </ButtonEnhanced>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FFD700]/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">CS Study Hub</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">247 members • Admin</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--hive-text-inverse)]/40" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Building className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Dorm 3A</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">47 residents • Member</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--hive-text-inverse)]/40" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Code className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Algorithm Club</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">156 members • Co-founder</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--hive-text-inverse)]/40" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Coffee className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Coffee & Code</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">89 members • Member</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--hive-text-inverse)]/40" />
                </div>
              </div>
            </Card>

            {/* Achievements Card */}
            <Card className="bg-[#111111] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recent Achievements</h3>
                <ButtonEnhanced variant="ghost" size="sm">
                  <Trophy className="w-4 h-4 mr-2" />
                  View All
                </ButtonEnhanced>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Study Streak Master</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">30 days consistent</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Community Builder</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">100+ connections</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <Code className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Tool Creator</div>
                    <div className="text-sm text-[var(--hive-text-inverse)]/60">5 tools built</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// PROFILE LAYOUT C: TIMELINE - Social media inspired, activity-focused
export const TimelineProfile = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[var(--hive-text-inverse)] font-['Geist_Sans'] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="relative mb-8">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-[#FFD700]/20 via-[#FFD700]/10 to-transparent rounded-2xl mb-6"></div>
          
          {/* Profile Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-20 px-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-[#FFD700] flex items-center justify-center border-4 border-[#0A0A0A]">
                <span className="text-4xl font-black text-[var(--hive-text-primary)]">JS</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-full border-4 border-[#0A0A0A] flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-4">
                <h1 className="text-4xl font-bold tracking-[-0.02em] mb-2">Jacob Smith</h1>
                <p className="text-xl text-[var(--hive-text-inverse)]/70 mb-4">Computer Science • Stanford University • Class of 2026</p>
                <p className="text-[var(--hive-text-inverse)]/80 max-w-2xl">
                  Building the future one algorithm at a time. CS student passionate about AI, web development, and creating tools that make campus life better. 
                  Always down for a good coding session with coffee! ☕
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-sm">Palo Alto, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-sm">Joined September 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-sm">github.com/jacobsmith</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <ButtonEnhanced variant="secondary" size="sm">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </ButtonEnhanced>
              <ButtonEnhanced variant="secondary" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </ButtonEnhanced>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#111111] border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-[#FFD700]">1,247</div>
            <div className="text-sm text-[var(--hive-text-inverse)]/60">Students Connected</div>
          </Card>
          <Card className="bg-[#111111] border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-[#FFD700]">23</div>
            <div className="text-sm text-[var(--hive-text-inverse)]/60">Spaces Run</div>
          </Card>
          <Card className="bg-[#111111] border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-[#FFD700]">89</div>
            <div className="text-sm text-[var(--hive-text-inverse)]/60">Tools Created</div>
          </Card>
          <Card className="bg-[#111111] border-white/10 p-4 text-center">
            <div className="text-2xl font-bold text-[#FFD700]">12</div>
            <div className="text-sm text-[var(--hive-text-inverse)]/60">Campus Level</div>
          </Card>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {/* Timeline Item: Achievement */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#FFD700]" />
              </div>
              <div className="w-px h-full bg-white/10 mt-4"></div>
            </div>
            <Card className="bg-[#111111] border-white/10 p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">Achievement Unlocked</h3>
                  <div className="px-2 py-1 bg-[#FFD700]/20 text-[#FFD700] text-xs rounded">New</div>
                </div>
                <span className="text-sm text-[var(--hive-text-inverse)]/60">2 hours ago</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FFD700]/30 to-[#FFD700]/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-[#FFD700]" />
                </div>
                <div>
                  <div className="text-xl font-bold">Study Streak Master</div>
                  <div className="text-[var(--hive-text-inverse)]/70">30 days of consistent learning</div>
                </div>
              </div>
              <p className="text-[var(--hive-text-inverse)]/80 mb-4">
                Incredible dedication! Jacob has maintained a 30-day study streak, showing true commitment to academic excellence.
              </p>
              <div className="flex items-center gap-4">
                <ButtonEnhanced variant="ghost" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  247 reactions
                </ButtonEnhanced>
                <ButtonEnhanced variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  12 comments
                </ButtonEnhanced>
              </div>
            </Card>
          </div>

          {/* Timeline Item: Tool Creation */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Code className="w-6 h-6 text-accent" />
              </div>
              <div className="w-px h-full bg-white/10 mt-4"></div>
            </div>
            <Card className="bg-[#111111] border-white/10 p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Created a New Tool</h3>
                <span className="text-sm text-[var(--hive-text-inverse)]/60">1 day ago</span>
              </div>
              <div className="mb-4">
                <h4 className="text-xl font-bold mb-2">Study Session Timer</h4>
                <p className="text-[var(--hive-text-inverse)]/80 mb-4">
                  Built a collaborative Pomodoro timer that syncs across study groups. Features include break reminders, 
                  progress tracking, and motivational quotes. Perfect for those long algorithm study sessions!
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="px-3 py-1 bg-accent/20 text-accent text-sm rounded">Active</div>
                  <span className="text-sm text-[var(--hive-text-inverse)]/60">247 students using it</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ButtonEnhanced variant="ghost" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  89 reactions
                </ButtonEnhanced>
                <ButtonEnhanced variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  23 comments
                </ButtonEnhanced>
                <ButtonEnhanced variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Try Tool
                </ButtonEnhanced>
              </div>
            </Card>
          </div>

          {/* Timeline Item: Space Activity */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div className="w-px h-full bg-white/10 mt-4"></div>
            </div>
            <Card className="bg-[#111111] border-white/10 p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Joined Algorithm Club</h3>
                <span className="text-sm text-[var(--hive-text-inverse)]/60">3 days ago</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Code className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <div className="text-xl font-bold">Algorithm Club</div>
                  <div className="text-[var(--hive-text-inverse)]/70">156 members • Weekly challenges</div>
                </div>
              </div>
              <p className="text-[var(--hive-text-inverse)]/80 mb-4">
                Excited to join this amazing community of problem solvers! Looking forward to tackling weekly coding challenges 
                and learning from fellow algorithm enthusiasts.
              </p>
              <div className="flex items-center gap-4">
                <ButtonEnhanced variant="ghost" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  45 reactions
                </ButtonEnhanced>
                <ButtonEnhanced variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  8 comments
                </ButtonEnhanced>
              </div>
            </Card>
          </div>

          {/* Timeline Item: Study Session */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <div className="w-px h-full bg-white/10 mt-4"></div>
            </div>
            <Card className="bg-[#111111] border-white/10 p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Hosted Study Session</h3>
                <span className="text-sm text-[var(--hive-text-inverse)]/60">1 week ago</span>
              </div>
              <div className="mb-4">
                <h4 className="text-xl font-bold mb-2">CS 301 Algorithm Review</h4>
                <p className="text-[var(--hive-text-inverse)]/80 mb-4">
                  Led a 3-hour deep dive into sorting algorithms and complexity analysis. Great turnout with 12 students! 
                  We covered quicksort, mergesort, and heapsort with hands-on coding exercises.
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-sm">12 participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-sm">3 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm">Library Study Room 3</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ButtonEnhanced variant="ghost" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  67 reactions
                </ButtonEnhanced>
                <ButtonEnhanced variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  15 comments
                </ButtonEnhanced>
              </div>
            </Card>
          </div>

          {/* Timeline Item: Campus Recognition */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-[#FFD700]" />
              </div>
              <div className="w-px h-full bg-white/10 mt-4"></div>
            </div>
            <Card className="bg-[#111111] border-white/10 p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Campus Recognition</h3>
                <span className="text-sm text-[var(--hive-text-inverse)]/60">2 weeks ago</span>
              </div>
              <div className="mb-4">
                <h4 className="text-xl font-bold mb-2">Featured in Campus Newsletter</h4>
                <p className="text-[var(--hive-text-inverse)]/80 mb-4">
                  "Student Spotlight: Jacob Smith is revolutionizing how students collaborate on campus. His innovative tools and 
                  dedication to building community have connected over 1,000 students this semester."
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] text-sm rounded">Featured</div>
                  <span className="text-sm text-[var(--hive-text-inverse)]/60">Campus Newsletter</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ButtonEnhanced variant="ghost" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  156 reactions
                </ButtonEnhanced>
                <ButtonEnhanced variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  34 comments
                </ButtonEnhanced>
                <ButtonEnhanced variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Article
                </ButtonEnhanced>
              </div>
            </Card>
          </div>

          {/* End of Timeline */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-6 h-6 text-[var(--hive-text-inverse)]/40" />
              </div>
            </div>
            <div className="flex-1 pt-3">
              <p className="text-[var(--hive-text-inverse)]/60 text-center">
                The beginning of Jacob's HIVE journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}