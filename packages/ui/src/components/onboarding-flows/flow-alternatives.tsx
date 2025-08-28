import * as React from "react"
import { cn } from "../lib/utils"
import { Button } from "../button"
import { Card } from "../card"
import { 
  Users, 
  Zap, 
  BookOpen, 
  ArrowRight,
  Play,
  Code,
  TrendingUp,
  Heart,
  Sparkles,
  Award,
  Settings,
  ChevronRight,
  Rocket,
  Compass,
  GraduationCap,
  Building,
  UserCheck,
  Mail,
  Check,
  Badge,
  ChevronLeft,
  Home,
} from "lucide-react"

// FLOW OPTION A: INSTANT ACTIVATION - Skip heavy onboarding, get users into product quickly
export const InstantActivationFlow = () => {
  const [step, setStep] = React.useState(1)
  const [email, setEmail] = React.useState("")
  const [_school, _setSchool] = React.useState("")
  const [name, setName] = React.useState("")
  const [_username, _setUsername] = React.useState("")

  if (step === 1) {
    return (
      <div className="min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="font-black text-black text-2xl">H</span>
            </div>
            <h1 className="text-3xl font-bold">Welcome to HIVE</h1>
            <p className="text-white/60 mt-2">Join your campus community in 30 seconds</p>
          </div>

          {/* Quick Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">School Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              />
            </div>
            <Button 
              className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold py-3 text-base"
              onClick={() => setStep(2)}
            >
              <Zap className="w-4 h-4 mr-2" />
              Get Started Now
            </Button>
          </div>

          {/* Skip Option */}
          <div className="text-center">
            <button className="text-white/60 hover:text-white text-sm">
              Skip setup, explore first →
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">You're In!</h2>
            <p className="text-white/60 mt-2">Magic link sent to {email}</p>
          </div>

          <div className="bg-white/5 border border-white/20 rounded-lg p-6 text-center">
            <Mail className="w-8 h-8 text-[#FFD700] mx-auto mb-4" />
            <p className="text-sm text-white/70">
              Click the link in your email to verify your account and you'll be redirected to your campus feed.
            </p>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold">
              Open Email App
            </Button>
            <Button variant="secondary" className="w-full border-white/20 text-white hover:bg-white/5">
              Resend Link
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-white/40">
              We'll personalize your experience as you explore
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}

// FLOW OPTION B: COMMUNITY-FIRST - Lead with social proof and community discovery
export const CommunityFirstFlow = () => {
  const [step, setStep] = React.useState(1)
  const [selectedCommunities, setSelectedCommunities] = React.useState<string[]>([])

  const communities = [
    { id: 'cs', name: 'Computer Science', members: 1247, icon: Code, color: 'bg-accent' },
    { id: 'engineering', name: 'Engineering', members: 892, icon: Settings, color: 'bg-accent' },
    { id: 'business', name: 'Business', members: 734, icon: TrendingUp, color: 'bg-accent' },
    { id: 'dorm-3a', name: 'Dorm 3A', members: 156, icon: Home, color: 'bg-orange-500' },
    { id: 'study-group', name: 'Study Groups', members: 2341, icon: BookOpen, color: 'bg-accent' },
    { id: 'gaming', name: 'Gaming Club', members: 445, icon: Play, color: 'bg-accent' }
  ]

  if (step === 1) {
    return (
      <div className="min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="font-black text-black text-2xl">H</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Find Your People</h1>
            <p className="text-white/60 text-lg">
              Join <span className="text-[#FFD700] font-semibold">1,247</span> students already building community
            </p>
          </div>

          {/* Live Community Preview */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Active Communities Right Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((community) => (
                <Card 
                  key={community.id} 
                  className={cn(
                    "bg-white/5 border border-white/20 p-4 cursor-pointer transition-all duration-300",
                    selectedCommunities.includes(community.id) 
                      ? "border-[#FFD700] bg-[#FFD700]/10" 
                      : "hover:border-white/40 hover:bg-white/10"
                  )}
                  onClick={() => {
                    if (selectedCommunities.includes(community.id)) {
                      setSelectedCommunities(prev => prev.filter(id => id !== community.id))
                    } else {
                      setSelectedCommunities(prev => [...prev, community.id])
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", community.color)}>
                      <community.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{community.name}</h3>
                      <p className="text-sm text-white/60">{community.members} members</p>
                    </div>
                    {selectedCommunities.includes(community.id) && (
                      <div className="w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-black" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button 
              className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold px-8 py-3 text-base"
              onClick={() => setStep(2)}
              disabled={selectedCommunities.length === 0}
            >
              <Users className="w-4 h-4 mr-2" />
              Join {selectedCommunities.length} Communities
            </Button>
            <p className="text-xs text-white/40 mt-2">
              You can always discover more communities later
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quick Setup</h2>
            <p className="text-white/60">Just need your email to get you connected</p>
          </div>

          {/* Email Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">School Email</label>
              <input
                type="email"
                placeholder="you@university.edu"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              />
            </div>
            <Button className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold py-3">
              <Mail className="w-4 h-4 mr-2" />
              Send Magic Link
            </Button>
          </div>

          {/* Selected Communities Preview */}
          <div className="bg-white/5 border border-white/20 rounded-lg p-4">
            <h3 className="font-semibold mb-3">You're joining:</h3>
            <div className="space-y-2">
              {selectedCommunities.map(id => {
                const community = communities.find(c => c.id === id)
                return (
                  <div key={id} className="flex items-center gap-3">
                    <div className={cn("w-6 h-6 rounded flex items-center justify-center", community?.color)}>
                      {community?.icon && <community.icon className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm">{community?.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

// FLOW OPTION C: ACADEMIC-FIRST - Focus on educational context and academic credentials
export const AcademicFirstFlow = () => {
  const [step, setStep] = React.useState(1)
  const [selectedLevel, setSelectedLevel] = React.useState("")
  const [selectedYear, setSelectedYear] = React.useState("")
  const [selectedMajor, setSelectedMajor] = React.useState("")

  const academicLevels = [
    { id: 'undergraduate', name: 'Undergraduate', icon: GraduationCap, description: 'Bachelor\'s degree program' },
    { id: 'graduate', name: 'Graduate', icon: Award, description: 'Master\'s or doctoral program' },
    { id: 'faculty', name: 'Faculty', icon: BookOpen, description: 'Teaching or research staff' },
    { id: 'staff', name: 'Staff', icon: Building, description: 'Administrative or support staff' }
  ]

  const years = ['2025', '2026', '2027', '2028', '2029+']
  const majors = ['Computer Science', 'Engineering', 'Business', 'Biology', 'Psychology', 'Art', 'English', 'Mathematics']

  if (step === 1) {
    return (
      <div className="min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Your Academic Journey</h1>
            <p className="text-white/60 text-lg">
              Connect with your academic community at University
            </p>
          </div>

          {/* Academic Level Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What's your role on campus?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {academicLevels.map((level) => (
                <Card 
                  key={level.id}
                  className={cn(
                    "bg-white/5 border border-white/20 p-6 cursor-pointer transition-all duration-300",
                    selectedLevel === level.id 
                      ? "border-[#FFD700] bg-[#FFD700]/10" 
                      : "hover:border-white/40 hover:bg-white/10"
                  )}
                  onClick={() => setSelectedLevel(level.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FFD700]/20 rounded-lg flex items-center justify-center">
                      <level.icon className="w-6 h-6 text-[#FFD700]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{level.name}</h3>
                      <p className="text-sm text-white/60">{level.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button 
              className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold px-8 py-3 text-base"
              onClick={() => setStep(2)}
              disabled={!selectedLevel}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Academic Details</h2>
            <p className="text-white/60">Help us connect you with relevant academic communities</p>
          </div>

          {/* Academic Information */}
          <div className="space-y-6">
            {selectedLevel === 'undergraduate' && (
              <div>
                <label className="block text-sm font-medium mb-3">Graduation Year</label>
                <div className="flex gap-2">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={cn(
                        "px-4 py-2 rounded-lg border transition-colors",
                        selectedYear === year
                          ? "bg-[#FFD700] text-black border-[#FFD700]"
                          : "bg-white/5 border-white/20 text-white hover:border-white/40"
                      )}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-3">Major/Field of Study</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {majors.map(major => (
                  <button
                    key={major}
                    onClick={() => setSelectedMajor(major)}
                    className={cn(
                      "px-3 py-2 rounded-lg border text-sm transition-colors",
                      selectedMajor === major
                        ? "bg-[#FFD700] text-black border-[#FFD700]"
                        : "bg-white/5 border-white/20 text-white hover:border-white/40"
                    )}
                  >
                    {major}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">School Email</label>
              <input
                type="email"
                placeholder="you@university.edu"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              />
            </div>
          </div>

          {/* Preview Communities */}
          <div className="bg-white/5 border border-white/20 rounded-lg p-4">
            <h3 className="font-semibold mb-3">You'll be connected to:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
                  <Code className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm">{selectedMajor || 'Your Major'} Students</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
                  <GraduationCap className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm">Class of {selectedYear || 'Your Year'}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
                  <BookOpen className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm">Study Groups</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button 
              className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold px-8 py-3 text-base"
              onClick={() => setStep(3)}
              disabled={!selectedMajor}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Verification Email
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

// FLOW OPTION D: GAMIFIED - Make onboarding fun with achievements and progress
export const GamifiedFlow = () => {
  const [step, setStep] = React.useState(1)
  const [xp, setXP] = React.useState(0)
  const [achievements, setAchievements] = React.useState<string[]>([])
  const [profile, setProfile] = React.useState({
    name: '',
    email: '',
    avatar: '',
    interests: [] as string[]
  })

  const addXP = (points: number) => {
    setXP(prev => prev + points)
  }

  const unlockAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      setAchievements(prev => [...prev, achievement])
    }
  }

  const interests = [
    'Gaming', 'Music', 'Sports', 'Art', 'Tech', 'Study Groups', 
    'Photography', 'Coding', 'Fitness', 'Movies', 'Reading', 'Travel'
  ]

  if (step === 1) {
    return (
      <div className="min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          {/* Header with XP */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-[#FFD700] rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">Level 1</div>
                <div className="text-sm text-white/60">{xp} XP</div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome to HIVE</h1>
            <p className="text-white/60">Complete your profile to unlock campus features</p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/10 rounded-full h-2">
            <div 
              className="bg-[#FFD700] h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((xp / 100) * 100, 100)}%` }}
            />
          </div>

          {/* Quest: Set Your Name */}
          <div className="bg-white/5 border border-white/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">First Quest: Your Identity</h3>
                  <p className="text-sm text-white/60">+25 XP</p>
                </div>
              </div>
              <Badge className="bg-[#FFD700] text-black">Active</Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                />
              </div>
              <Button 
                className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold"
                onClick={() => {
                  addXP(25)
                  unlockAchievement('first-quest')
                  setStep(2)
                }}
                disabled={!profile.name}
              >
                <Zap className="w-4 h-4 mr-2" />
                Complete Quest (+25 XP)
              </Button>
            </div>
          </div>

          {/* Achievement Unlock */}
          {achievements.length > 0 && (
            <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFD700]" />
                <span className="text-sm font-semibold text-[#FFD700]">Achievement Unlocked!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          {/* Header with XP */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-[#FFD700] rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">Level 1</div>
                <div className="text-sm text-white/60">{xp} XP</div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Great job, {profile.name}!</h2>
            <p className="text-white/60">Next quest: Connect your campus identity</p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/10 rounded-full h-2">
            <div 
              className="bg-[#FFD700] h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((xp / 100) * 100, 100)}%` }}
            />
          </div>

          {/* Quest: Campus Connection */}
          <div className="bg-white/5 border border-white/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Campus Connection</h3>
                  <p className="text-sm text-white/60">+30 XP</p>
                </div>
              </div>
              <Badge className="bg-[#FFD700] text-black">Active</Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">School Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@university.edu"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                />
              </div>
              <Button 
                className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold"
                onClick={() => {
                  addXP(30)
                  unlockAchievement('campus-connected')
                  setStep(3)
                }}
                disabled={!profile.email}
              >
                <Rocket className="w-4 h-4 mr-2" />
                Send Magic Link (+30 XP)
              </Button>
            </div>
          </div>

          {/* Bonus Quest Preview */}
          <div className="bg-white/5 border border-white/20 rounded-lg p-4 opacity-60">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Bonus Quest: Find Your Tribe</h4>
                <p className="text-xs text-white/60">+50 XP • Select your interests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          {/* Header with XP */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-[#FFD700] rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6 text-black" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">Level 2</div>
                <div className="text-sm text-white/60">{xp} XP</div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Level Up!</h2>
            <p className="text-white/60">Final quest: Discover your community</p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/10 rounded-full h-2">
            <div 
              className="bg-[#FFD700] h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((xp / 150) * 100, 100)}%` }}
            />
          </div>

          {/* Quest: Find Your Tribe */}
          <div className="bg-white/5 border border-white/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Find Your Tribe</h3>
                  <p className="text-sm text-white/60">+50 XP • Select 3+ interests</p>
                </div>
              </div>
              <Badge className="bg-[#FFD700] text-black">Bonus</Badge>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {interests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => {
                      if (profile.interests.includes(interest)) {
                        setProfile(prev => ({
                          ...prev,
                          interests: prev.interests.filter(i => i !== interest)
                        }))
                      } else {
                        setProfile(prev => ({
                          ...prev,
                          interests: [...prev.interests, interest]
                        }))
                      }
                    }}
                    className={cn(
                      "px-3 py-2 rounded-lg border text-sm transition-all",
                      profile.interests.includes(interest)
                        ? "bg-[#FFD700] text-black border-[#FFD700] scale-105"
                        : "bg-white/5 border-white/20 text-white hover:border-white/40"
                    )}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              <Button 
                className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold"
                onClick={() => {
                  addXP(50)
                  unlockAchievement('tribe-finder')
                  setStep(4)
                }}
                disabled={profile.interests.length < 3}
              >
                <Compass className="w-4 h-4 mr-2" />
                Complete Adventure (+50 XP)
              </Button>
              <p className="text-xs text-white/40 text-center">
                Selected: {profile.interests.length}/3 minimum
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          {/* Victory Screen */}
          <div className="text-center">
            <div className="w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Adventure Complete!</h1>
            <p className="text-white/60">You've unlocked your campus community</p>
          </div>

          {/* Final Stats */}
          <div className="bg-white/5 border border-white/20 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#FFD700]">{xp}</div>
                <div className="text-sm text-white/60">XP Earned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#FFD700]">{achievements.length}</div>
                <div className="text-sm text-white/60">Achievements</div>
              </div>
            </div>
          </div>

          {/* Unlocked Communities */}
          <div className="bg-white/5 border border-white/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Unlocked Communities:</h3>
            <div className="space-y-2">
              {profile.interests.slice(0, 3).map(interest => (
                <div key={interest} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <span className="text-sm">{interest} Community</span>
                </div>
              ))}
            </div>
          </div>

          <Button 
            className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold py-3 text-base"
            onClick={() => {
              // Navigate to main app
            }}
          >
            <Rocket className="w-4 h-4 mr-2" />
            Enter Campus
          </Button>
        </div>
      </div>
    )
  }

  return null
}

// FLOW OPTION E: PROGRESSIVE WIZARD - Traditional step-by-step with clear progress
export const ProgressiveWizardFlow = () => {
  const [step, setStep] = React.useState(1)
  const [formData, setFormData] = React.useState({
    school: '',
    email: '',
    name: '',
    role: '',
    year: '',
    major: '',
    interests: [] as string[]
  })

  const totalSteps = 5
  const progressPercent = (step / totalSteps) * 100

  const schools = [
    'Stanford University',
    'MIT',
    'Harvard University',
    'UC Berkeley',
    'Carnegie Mellon',
    'Other'
  ]

  const roles = [
    { id: 'student', name: 'Student', description: 'Undergraduate or graduate student' },
    { id: 'faculty', name: 'Faculty', description: 'Professor or instructor' },
    { id: 'staff', name: 'Staff', description: 'Administrative or support staff' },
    { id: 'alumni', name: 'Alumni', description: 'Graduate or former student' }
  ]

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome to HIVE</h2>
              <p className="text-white/60">Let's get you connected to your campus community</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3">Select your school</label>
              <div className="space-y-2">
                {schools.map(school => (
                  <button
                    key={school}
                    onClick={() => setFormData(prev => ({ ...prev, school }))}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border text-left transition-colors",
                      formData.school === school
                        ? "bg-[#FFD700] text-black border-[#FFD700]"
                        : "bg-white/5 border-white/20 text-white hover:border-white/40"
                    )}
                  >
                    {school}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Your Campus Role</h2>
              <p className="text-white/60">This helps us connect you with the right communities</p>
            </div>
            
            <div className="space-y-3">
              {roles.map(role => (
                <Card
                  key={role.id}
                  className={cn(
                    "p-4 cursor-pointer transition-all",
                    formData.role === role.id
                      ? "bg-[#FFD700]/10 border-[#FFD700]"
                      : "bg-white/5 border-white/20 hover:border-white/40"
                  )}
                  onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFD700]/20 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-[#FFD700]" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{role.name}</h3>
                      <p className="text-sm text-white/60">{role.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Account Setup</h2>
              <p className="text-white/60">We'll send you a magic link to get started</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">School Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@university.edu"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Academic Information</h2>
              <p className="text-white/60">Help us connect you with relevant communities</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Graduation Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                >
                  <option value="">Select year</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Major/Field</label>
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                  placeholder="e.g., Computer Science"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Setup Complete!</h2>
              <p className="text-white/60">Magic link sent to {formData.email}</p>
            </div>
            
            <div className="bg-white/5 border border-white/20 rounded-lg p-6 text-center">
              <Mail className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Check your email</h3>
              <p className="text-sm text-white/60">
                Click the magic link in your email to verify your account and complete setup.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-3">You'll be connected to:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFD700]" />
                  <span>{formData.school}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFD700]" />
                  <span>{formData.major} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFD700]" />
                  <span>Class of {formData.year}</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-['Geist_Sans'] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="font-black text-black">H</span>
          </div>
          <div className="text-sm text-white/60 mb-2">Step {step} of {totalSteps}</div>
          <div className="w-full bg-white/10 rounded-full h-2 mb-4">
            <div 
              className="bg-[#FFD700] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 1 && (
            <Button 
              variant="secondary"
              onClick={() => setStep(step - 1)}
              className="border-white/20 text-white hover:bg-white/5"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          {step < totalSteps && (
            <Button 
              className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold"
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && !formData.school) ||
                (step === 2 && !formData.role) ||
                (step === 3 && (!formData.name || !formData.email)) ||
                (step === 4 && (!formData.year || !formData.major))
              }
            >
              {step === 3 ? 'Send Magic Link' : 'Continue'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          
          {step === totalSteps && (
            <Button 
              className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold"
              onClick={() => {
                // Navigate to main app
              }}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Enter HIVE
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}