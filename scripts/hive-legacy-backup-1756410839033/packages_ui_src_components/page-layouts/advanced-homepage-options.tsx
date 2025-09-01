import * as React from "react"
import { Button } from "../button"
import { Card } from "../card"
import { 
  Users, 
  Zap, 
  ArrowRight,
  Play,
  Code,
  Sparkles,
  Globe,
  Shield,
  Award,
  Target,
  Layers,
  Command,
  ExternalLink,
  Rocket,
  Compass,
  Brain,
  FlameKindling
} from "lucide-react"

// ADVANCED OPTION A: LINEAR-INSPIRED - Minimalist performance focus
export const LinearInspiredHomepage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[var(--hive-text-inverse)] font-['Geist_Sans']">
      {/* Navigation - Linear style precision */}
      <nav className="border-b border-white/[0.08] px-6 py-4 backdrop-blur-xl bg-black/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFD700] rounded-[6px] flex items-center justify-center shadow-sm shadow-[#FFD700]/20">
              <span className="font-black text-[var(--hive-text-primary)] text-sm">H</span>
            </div>
            <span className="font-semibold text-[15px] tracking-[-0.01em]">HIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <ButtonEnhanced 
              variant="ghost" 
              size="sm"
              className="text-[var(--hive-text-inverse)]/60 hover:text-[var(--hive-text-inverse)]/80 hover:bg-white/[0.04] text-[13px] font-medium h-8 px-3"
            >
              Sign In
            </ButtonEnhanced>
            <ButtonEnhanced 
              size="sm"
              className="bg-[#FFD700] text-[var(--hive-text-primary)] hover:bg-[#FFD700]/90 text-[13px] font-medium h-8 px-4 shadow-sm shadow-[#FFD700]/20"
            >
              Get Started
            </ButtonEnhanced>
          </div>
        </div>
      </nav>

      {/* Hero - Ultra clean and focused */}
      <section className="px-6 pt-20 pb-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFD700]/[0.08] border border-[#FFD700]/20 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
              <span className="text-[13px] font-medium text-[var(--hive-text-inverse)]/90">Built for the next generation</span>
            </div>
            
            <h1 className="text-[56px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[0.9]">
              The programmable
              <br />
              <span className="text-[#FFD700]">campus layer</span>
            </h1>
            
            <p className="text-[18px] text-[var(--hive-text-inverse)]/60 max-w-2xl mx-auto leading-[1.6] font-normal">
              Build tools that spread. Make decisions together. Find your people. 
              The platform where student ideas become campus reality.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <ButtonEnhanced 
              size="lg" 
              className="bg-[#FFD700] text-[var(--hive-text-primary)] hover:bg-[#FFD700]/90 font-medium px-6 py-3 text-[15px] h-auto shadow-lg shadow-[#FFD700]/20 rounded-lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </ButtonEnhanced>
            <ButtonEnhanced 
              size="lg" 
              variant="secondary" 
              className="border-white/20 text-[var(--hive-text-inverse)]/90 hover:bg-white/[0.04] hover:border-white/30 font-medium px-6 py-3 text-[15px] h-auto rounded-lg"
            >
              Explore Platform
              <ArrowRight className="w-4 h-4 ml-2" />
            </ButtonEnhanced>
          </div>
        </div>
      </section>

      {/* Social Proof - Subtle but effective */}
      <section className="px-6 py-16 border-y border-white/[0.08] bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[14px] text-[var(--hive-text-inverse)]/40 font-medium tracking-wide uppercase mb-8">
              Trusted by students at leading universities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-[32px] font-semibold text-[#FFD700] tracking-[-0.02em]">1,247</div>
              <div className="text-[14px] text-[var(--hive-text-inverse)]/50 font-medium">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-[32px] font-semibold text-[#FFD700] tracking-[-0.02em]">89</div>
              <div className="text-[14px] text-[var(--hive-text-inverse)]/50 font-medium">Campus Tools</div>
            </div>
            <div className="space-y-2">
              <div className="text-[32px] font-semibold text-[#FFD700] tracking-[-0.02em]">156</div>
              <div className="text-[14px] text-[var(--hive-text-inverse)]/50 font-medium">Active Spaces</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Clean card grid */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-semibold mb-4 tracking-[-0.02em]">
              Everything you need to build campus community
            </h2>
            <p className="text-[16px] text-[var(--hive-text-inverse)]/60 max-w-2xl mx-auto leading-[1.6]">
              From tools to spaces to connections, HIVE provides the foundation for thriving campus life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/[0.02] border border-white/[0.08] p-8 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 rounded-xl">
              <div className="space-y-6">
                <div className="w-10 h-10 bg-[#FFD700]/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#FFD700]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-[18px] font-semibold tracking-[-0.01em]">Find Your People</h3>
                  <p className="text-[14px] text-[var(--hive-text-inverse)]/60 leading-[1.5]">
                    Connect across dorms, majors, and interests. Build meaningful relationships that last beyond graduation.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/[0.02] border border-white/[0.08] p-8 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 rounded-xl">
              <div className="space-y-6">
                <div className="w-10 h-10 bg-[#FFD700]/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#FFD700]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-[18px] font-semibold tracking-[-0.01em]">Build Together</h3>
                  <p className="text-[14px] text-[var(--hive-text-inverse)]/60 leading-[1.5]">
                    Create tools that spread across campus. Turn ideas into reality with your community.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/[0.02] border border-white/[0.08] p-8 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 rounded-xl">
              <div className="space-y-6">
                <div className="w-10 h-10 bg-[#FFD700]/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#FFD700]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-[18px] font-semibold tracking-[-0.01em]">Make Decisions</h3>
                  <p className="text-[14px] text-[var(--hive-text-inverse)]/60 leading-[1.5]">
                    Coordinate activities and campus decisions seamlessly. Democracy that actually works.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA - Minimal and focused */}
      <section className="px-6 py-20 border-t border-white/[0.08]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[28px] font-semibold mb-4 tracking-[-0.02em]">
            Ready to transform your campus experience?
          </h2>
          <p className="text-[16px] text-[var(--hive-text-inverse)]/60 mb-8 leading-[1.6]">
            Join thousands of students building the future of campus life.
          </p>
          <ButtonEnhanced 
            size="lg" 
            className="bg-[#FFD700] text-[var(--hive-text-primary)] hover:bg-[#FFD700]/90 font-medium px-8 py-4 text-[15px] h-auto shadow-lg shadow-[#FFD700]/20 rounded-lg"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Join Your Campus
          </ButtonEnhanced>
        </div>
      </section>
    </div>
  )
}

// ADVANCED OPTION B: VERCEL-INSPIRED - Developer-focused precision
export const VercelInspiredHomepage = () => {
  return (
    <div className="min-h-screen bg-black text-[var(--hive-text-inverse)] font-['Geist_Sans']">
      {/* Navigation - Vercel style */}
      <nav className="border-b border-white/10 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[#FFD700] rounded-md flex items-center justify-center">
                <span className="font-bold text-[var(--hive-text-primary)] text-xs">H</span>
              </div>
              <span className="font-semibold text-sm">HIVE</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button className="text-xs text-[var(--hive-text-inverse)]/70 hover:text-[var(--hive-text-inverse)] transition-colors">Platform</button>
              <button className="text-xs text-[var(--hive-text-inverse)]/70 hover:text-[var(--hive-text-inverse)] transition-colors">Spaces</button>
              <button className="text-xs text-[var(--hive-text-inverse)]/70 hover:text-[var(--hive-text-inverse)] transition-colors">Tools</button>
              <button className="text-xs text-[var(--hive-text-inverse)]/70 hover:text-[var(--hive-text-inverse)] transition-colors">Docs</button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ButtonEnhanced variant="ghost" size="sm" className="text-xs h-7 px-3">
              Sign In
            </ButtonEnhanced>
            <ButtonEnhanced size="sm" className="bg-[#FFD700] text-[var(--hive-text-primary)] hover:bg-[#FFD700]/90 text-xs h-7 px-3">
              Deploy
            </ButtonEnhanced>
          </div>
        </div>
      </nav>

      {/* Hero - Technical and precise */}
      <section className="px-6 pt-16 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full mb-8">
            <div className="w-1.5 h-1.5 bg-[#FFD700] rounded-full"></div>
            <span className="text-xs text-[var(--hive-text-inverse)]/80">Platform v2.0 — Now available</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">
            Develop. Preview.
            <br />
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FFD700]/60 bg-clip-text text-transparent">
              Ship campus tools.
            </span>
          </h1>
          
          <p className="text-lg text-[var(--hive-text-inverse)]/60 max-w-2xl mx-auto mb-8 leading-relaxed">
            HIVE provides the developer experience and infrastructure to build, preview, and ship campus tools instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <ButtonEnhanced className="bg-[#FFD700] text-[var(--hive-text-primary)] hover:bg-[#FFD700]/90 px-6 py-2.5 text-sm font-medium">
              Start Building
            </ButtonEnhanced>
            <ButtonEnhanced variant="secondary" className="border-white/20 text-[var(--hive-text-inverse)] hover:bg-white/5 px-6 py-2.5 text-sm">
              View Demo
            </ButtonEnhanced>
          </div>
          
          {/* Terminal Preview */}
          <div className="max-w-3xl mx-auto">
            <Card className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-surface rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-accent rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-surface rounded-full"></div>
                </div>
                <span className="text-xs text-[var(--hive-text-inverse)]/50 ml-2">Terminal</span>
              </div>
              <div className="p-4 font-mono text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFD700]">$</span>
                  <span className="text-[var(--hive-text-inverse)]/80">hive create study-group-poll</span>
                </div>
                <div className="text-[var(--hive-text-inverse)]/60">Creating new tool...</div>
                <div className="text-accent">✓ Tool deployed to campus network</div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFD700]">$</span>
                  <span className="text-[var(--hive-text-inverse)]/80 animate-pulse">_</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/[0.02] border border-white/10 p-6 rounded-lg">
              <Command className="w-6 h-6 text-[#FFD700] mb-4" />
              <h3 className="font-semibold mb-2 text-sm">Instant Deployment</h3>
              <p className="text-xs text-[var(--hive-text-inverse)]/60 leading-relaxed">
                Deploy campus tools with zero configuration. From idea to production in seconds.
              </p>
            </Card>
            
            <Card className="bg-white/[0.02] border border-white/10 p-6 rounded-lg">
              <Globe className="w-6 h-6 text-[#FFD700] mb-4" />
              <h3 className="font-semibold mb-2 text-sm">Global Edge Network</h3>
              <p className="text-xs text-[var(--hive-text-inverse)]/60 leading-relaxed">
                Campus-wide distribution for lightning-fast tool access from any location.
              </p>
            </Card>
            
            <Card className="bg-white/[0.02] border border-white/10 p-6 rounded-lg">
              <Shield className="w-6 h-6 text-[#FFD700] mb-4" />
              <h3 className="font-semibold mb-2 text-sm">Enterprise Security</h3>
              <p className="text-xs text-[var(--hive-text-inverse)]/60 leading-relaxed">
                Built-in authentication and authorization for campus-grade security.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

// ADVANCED OPTION C: FIGMA-INSPIRED - Creative and collaborative
export const FigmaInspiredHomepage = () => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[var(--hive-text-inverse)] font-['Geist_Sans']">
      {/* Navigation - Figma style creativity */}
      <nav className="border-b border-white/8 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FFD700]/80 rounded-lg flex items-center justify-center shadow-lg shadow-[#FFD700]/20">
              <span className="font-black text-[var(--hive-text-primary)] text-sm">H</span>
            </div>
            <span className="font-semibold text-base">HIVE</span>
          </div>
          
          <div className="flex items-center gap-3">
            <ButtonEnhanced variant="ghost" className="text-[var(--hive-text-inverse)]/70 hover:text-[var(--hive-text-inverse)] hover:bg-white/5">
              Sign In
            </ButtonEnhanced>
            <ButtonEnhanced className="bg-[#FFD700] text-[var(--hive-text-primary)] hover:bg-[#FFD700]/90 font-medium shadow-sm shadow-[#FFD700]/20">
              Get Started
            </ButtonEnhanced>
          </div>
        </div>
      </nav>

      {/* Hero - Creative and inspiring */}
      <section className="px-6 py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#FFD700]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="space-y-8 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-full">
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span className="text-sm font-medium">Where creativity meets community</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9]">
              Design your
              <br />
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFD700] to-white bg-clip-text text-transparent">
                campus future
              </span>
            </h1>
            
            <p className="text-xl text-[var(--hive-text-inverse)]/70 max-w-3xl mx-auto leading-relaxed">
              Collaborate, create, and connect. HIVE brings together the tools and community 
              to turn your campus ideas into reality.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ButtonEnhanced 
              size="lg" 
              className="bg-[#FFD700] text-[var(--hive-text-primary)] hover:bg-[#FFD700]/90 font-semibold px-8 py-4 text-base h-auto shadow-xl shadow-[#FFD700]/20 rounded-xl"
            >
              <Compass className="w-5 h-5 mr-2" />
              Explore HIVE
            </ButtonEnhanced>
            <ButtonEnhanced 
              size="lg" 
              variant="secondary" 
              className="border-white/30 text-[var(--hive-text-inverse)] hover:bg-white/5 hover:border-white/50 font-semibold px-8 py-4 text-base h-auto rounded-xl"
            >
              Watch in action
              <ExternalLink className="w-5 h-5 ml-2" />
            </ButtonEnhanced>
          </div>
        </div>
      </section>

      {/* Feature Showcase - Visual and engaging */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              Built for campus collaboration
            </h2>
            <p className="text-lg text-[var(--hive-text-inverse)]/60 max-w-2xl mx-auto">
              Everything you need to create, share, and build together as a community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Creative Tools */}
            <Card className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-8 rounded-2xl hover:border-[#FFD700]/20 transition-all duration-500 group">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-xl flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-colors">
                  <Layers className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Creative Tools</h3>
                  <p className="text-[var(--hive-text-inverse)]/60 leading-relaxed">
                    Design and prototype campus solutions with powerful, intuitive tools that bring ideas to life.
                  </p>
                </div>
              </div>
            </Card>

            {/* Real-time Collaboration */}
            <Card className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-8 rounded-2xl hover:border-[#FFD700]/20 transition-all duration-500 group">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-xl flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-colors">
                  <Users className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Live Collaboration</h3>
                  <p className="text-[var(--hive-text-inverse)]/60 leading-relaxed">
                    Work together in real-time. See changes as they happen and build consensus through shared creation.
                  </p>
                </div>
              </div>
            </Card>

            {/* Community Impact */}
            <Card className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-8 rounded-2xl hover:border-[#FFD700]/20 transition-all duration-500 group">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-xl flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-colors">
                  <Award className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Campus Impact</h3>
                  <p className="text-[var(--hive-text-inverse)]/60 leading-relaxed">
                    Create tools and experiences that spread across campus and make a lasting difference.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="px-6 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            Join the creative campus revolution
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-3">
              <div className="text-4xl font-bold text-[#FFD700]">1,247</div>
              <div className="text-sm text-[var(--hive-text-inverse)]/60">Creative students</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-[#FFD700]">89</div>
              <div className="text-sm text-[var(--hive-text-inverse)]/60">Campus projects</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-[#FFD700]">156</div>
              <div className="text-sm text-[var(--hive-text-inverse)]/60">Tools deployed</div>
            </div>
          </div>
          
          <ButtonEnhanced 
            size="lg" 
            className="bg-[#FFD700] text-[var(--hive-text-primary)] hover:bg-[#FFD700]/90 font-semibold px-10 py-4 text-lg h-auto shadow-xl shadow-[#FFD700]/20 rounded-xl"
          >
            <Brain className="w-5 h-5 mr-2" />
            Start Creating
          </ButtonEnhanced>
        </div>
      </section>
    </div>
  )
}

// ADVANCED OPTION D: MODERN BENTO GRID - 2025 cutting edge
export const ModernBentoHomepage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[var(--hive-text-inverse)] font-['Geist_Sans']">
      {/* Navigation */}
      <nav className="border-b border-white/[0.06] px-6 py-4 backdrop-blur-2xl bg-black/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FFD700]/70 rounded-[7px] flex items-center justify-center shadow-md shadow-[#FFD700]/25">
              <span className="font-black text-[var(--hive-text-primary)] text-sm">H</span>
            </div>
            <span className="font-semibold text-[15px] tracking-[-0.01em]">HIVE</span>
          </div>
          
          <div className="flex items-center gap-2">
            <ButtonEnhanced variant="ghost" size="sm" className="text-[var(--hive-text-inverse)]/60 hover:text-[var(--hive-text-inverse)]/90 text-[13px]">
              Sign In
            </ButtonEnhanced>
            <ButtonEnhanced size="sm" className="bg-[#FFD700] text-[var(--hive-text-primary)] hover:bg-[#FFD700]/90 text-[13px] font-medium">
              Get Early Access
            </ButtonEnhanced>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-16 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFD700]/[0.08] border border-[#FFD700]/20 rounded-full mb-8">
              <FlameKindling className="w-3.5 h-3.5 text-[#FFD700]" />
              <span className="text-[12px] font-medium text-[var(--hive-text-inverse)]/90 tracking-wide">NEXT-GEN CAMPUS PLATFORM</span>
            </div>
            
            <h1 className="text-[48px] md:text-[64px] font-bold tracking-[-0.03em] leading-[0.9] mb-6">
              Campus life,
              <br />
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFD700] to-[#FFD700]/60 bg-clip-text text-transparent">
                reimagined
              </span>
            </h1>
            
            <p className="text-[17px] text-[var(--hive-text-inverse)]/60 max-w-2xl mx-auto leading-[1.6] mb-8">
              The programmable layer for student life. Build tools, make decisions, find your people. 
              Welcome to the future of campus community.
            </p>
            
            <ButtonEnhanced 
              size="lg" 
              className="bg-[#FFD700] text-[var(--hive-text-primary)] hover:bg-[#FFD700]/90 font-semibold px-8 py-4 text-[15px] h-auto shadow-xl shadow-[#FFD700]/25 rounded-[10px]"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Join Waitlist
            </ButtonEnhanced>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 h-[600px]">
            {/* Large feature card */}
            <Card className="md:col-span-4 lg:col-span-7 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] rounded-2xl p-8 flex flex-col justify-between overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/[0.02] to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#FFD700]/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <h3 className="text-xl font-semibold">Campus Connection</h3>
                </div>
                <p className="text-[var(--hive-text-inverse)]/70 mb-8 leading-relaxed">
                  Connect across dorms, majors, and interests. Build meaningful relationships with AI-powered matching and community tools.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#FFD700]">1.2K+</div>
                    <div className="text-xs text-[var(--hive-text-inverse)]/50">Active Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#FFD700]">89</div>
                    <div className="text-xs text-[var(--hive-text-inverse)]/50">Study Groups</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#FFD700]">156</div>
                    <div className="text-xs text-[var(--hive-text-inverse)]/50">Connections</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tool building card */}
            <Card className="md:col-span-2 lg:col-span-5 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#FFD700]/10 rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 text-[#FFD700]" />
                  </div>
                  <h3 className="text-lg font-semibold">Build Tools</h3>
                </div>
                <p className="text-sm text-[var(--hive-text-inverse)]/70 mb-6">
                  Create campus tools with zero-config deployment
                </p>
              </div>
              <div className="bg-[#111111] rounded-lg p-3 font-mono text-xs">
                <div className="text-[#FFD700]">$ hive create poll</div>
                <div className="text-accent">✓ Deployed to campus</div>
              </div>
            </Card>

            {/* Campus energy card */}
            <Card className="md:col-span-3 lg:col-span-4 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Campus Energy</h3>
                <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></div>
              </div>
              <div className="text-3xl font-bold text-[#FFD700] mb-2">87%</div>
              <p className="text-sm text-[var(--hive-text-inverse)]/60 mb-6">
                Peak activity in CS Building and Library
              </p>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#FFD700] to-[#FFD700]/60 h-2 rounded-full w-[87%]"></div>
              </div>
            </Card>

            {/* Real-time activity */}
            <Card className="md:col-span-3 lg:col-span-4 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Live Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                  <span className="text-sm text-[var(--hive-text-inverse)]/70">Study group started</span>
                  <span className="text-xs text-[var(--hive-text-inverse)]/40">2m</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                  <span className="text-sm text-[var(--hive-text-inverse)]/70">New tool deployed</span>
                  <span className="text-xs text-[var(--hive-text-inverse)]/40">5m</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                  <span className="text-sm text-[var(--hive-text-inverse)]/70">Event scheduled</span>
                  <span className="text-xs text-[var(--hive-text-inverse)]/40">8m</span>
                </div>
              </div>
            </Card>

            {/* Quick action */}
            <Card className="md:col-span-6 lg:col-span-4 bg-gradient-to-br from-[#FFD700]/[0.08] to-[#FFD700]/[0.02] border border-[#FFD700]/20 rounded-2xl p-6 text-center">
              <h3 className="text-lg font-semibold mb-4">Ready to start building?</h3>
              <p className="text-sm text-[var(--hive-text-inverse)]/70 mb-6">
                Join thousands of students creating the future of campus life
              </p>
              <ButtonEnhanced className="bg-[#FFD700] text-[var(--hive-text-primary)] hover:bg-[#FFD700]/90 font-medium w-full">
                Get Started Now
              </ButtonEnhanced>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}