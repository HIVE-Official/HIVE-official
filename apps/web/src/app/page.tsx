import Link from "next/link";
import { Button } from "@hive/ui";
import {
  ArrowRight,
  Users,
  MessageSquare,
  Sparkles,
  Shield,
  BookOpen,
  Heart,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient - Subtle gold accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-[#FFD700]/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-16 text-center lg:pt-32">
            {/* Brand - Enhanced with proper typography */}
            <div className="mb-8">
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight font-display">
                <span className="bg-gradient-to-r from-[#FFD700] to-[#FFE255] bg-clip-text text-transparent">
                  HIVE
                </span>
              </h1>
              <p className="mt-4 text-xl lg:text-2xl text-[#A1A1AA] font-light">
                Where your campus comes alive
              </p>
            </div>

            {/* Hero Copy - Enhanced typography hierarchy */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 font-display">
                Connect. Create.{" "}
                <span className="text-[#FFD700] relative">
                  Belong.
                  {/* Subtle accent underline */}
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700]/40 via-[#FFD700]/80 to-[#FFD700]/40 rounded-full" />
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-[#FFFFFF]/90 leading-relaxed mb-8 font-sans">
                The social platform built exclusively for college students.
                Discover spaces, join conversations, and build meaningful
                connections with your campus community.
              </p>
            </div>

            {/* Enhanced CTA with subtle animations */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/campus">
                <Button
                  size="lg"
                  className="group bg-[#FFD700] hover:bg-[#FFE255] text-[#0A0A0A] font-semibold px-8 py-4 text-lg transition-all duration-[90ms] ease-out hover:scale-[1.02] focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
                >
                  Get Inside
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-[90ms] group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#0A0A0A] font-medium px-8 py-4 text-lg transition-all duration-[90ms] ease-out hover:scale-[1.02] focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
                >
                  Try Onboarding
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-[90ms] group-hover:translate-x-1" />
                </Button>
              </Link>
              <p className="text-sm text-[#A1A1AA] font-sans">
                Exclusive to verified .edu students
              </p>
            </div>

            {/* Enhanced Social Proof with better spacing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center group cursor-default">
                <div className="text-3xl font-bold text-[#FFD700] mb-2 font-display transition-all duration-[90ms] group-hover:scale-105">
                  50+
                </div>
                <div className="text-[#A1A1AA] font-sans">Universities</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-3xl font-bold text-[#FFD700] mb-2 font-display transition-all duration-[90ms] group-hover:scale-105">
                  10K+
                </div>
                <div className="text-[#A1A1AA] font-sans">Students</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-3xl font-bold text-[#FFD700] mb-2 font-display transition-all duration-[90ms] group-hover:scale-105">
                  100+
                </div>
                <div className="text-[#A1A1AA] font-sans">Active Spaces</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview - Enhanced with brand-perfect cards */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 font-display">
              More than just another social app
            </h3>
            <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto font-sans">
              HIVE is designed specifically for the college experience, with
              features that help you thrive academically and socially.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Enhanced Feature Cards with brand-perfect styling */}
            <div className="group bg-white/[0.02] rounded-xl p-6 border border-white/6 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-[200ms] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-white/10">
              <div className="w-12 h-12 bg-[#FFD700]/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-[90ms] group-hover:bg-[#FFD700]/20">
                <MessageSquare className="w-6 h-6 text-[#FFD700]" />
              </div>
              <h4 className="text-xl font-semibold mb-3 font-display">
                Campus Feed
              </h4>
              <p className="text-[#A1A1AA] font-sans leading-relaxed">
                Stay connected with what's happening on your campus. Smart
                algorithms surface the most relevant content for you.
              </p>
            </div>

            <div className="group bg-white/[0.02] rounded-xl p-6 border border-white/6 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-[200ms] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-white/10">
              <div className="w-12 h-12 bg-[#FFD700]/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-[90ms] group-hover:bg-[#FFD700]/20">
                <Users className="w-6 h-6 text-[#FFD700]" />
              </div>
              <h4 className="text-xl font-semibold mb-3 font-display">
                Student Spaces
              </h4>
              <p className="text-[#A1A1AA] font-sans leading-relaxed">
                Find your tribe in student organizations, Greek life, academic
                groups, and interest-based communities.
              </p>
            </div>

            <div className="group bg-white/[0.02] rounded-xl p-6 border border-white/6 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-[200ms] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-white/10">
              <div className="w-12 h-12 bg-[#FFD700]/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-[90ms] group-hover:bg-[#FFD700]/20">
                <Shield className="w-6 h-6 text-[#FFD700]" />
              </div>
              <h4 className="text-xl font-semibold mb-3 font-display">
                Privacy First
              </h4>
              <p className="text-[#A1A1AA] font-sans leading-relaxed">
                Your data stays yours. Campus-only visibility ensures your
                content is shared only with fellow students.
              </p>
            </div>

            <div className="group bg-white/[0.02] rounded-xl p-6 border border-white/6 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-[200ms] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-white/10">
              <div className="w-12 h-12 bg-[#FFD700]/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-[90ms] group-hover:bg-[#FFD700]/20">
                <BookOpen className="w-6 h-6 text-[#FFD700]" />
              </div>
              <h4 className="text-xl font-semibold mb-3 font-display">
                Study Tools
              </h4>
              <p className="text-[#A1A1AA] font-sans leading-relaxed">
                Collaborative study groups, resource sharing, and academic
                support integrated into your social experience.
              </p>
            </div>

            <div className="group bg-white/[0.02] rounded-xl p-6 border border-white/6 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-[200ms] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-white/10">
              <div className="w-12 h-12 bg-[#FFD700]/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-[90ms] group-hover:bg-[#FFD700]/20">
                <Sparkles className="w-6 h-6 text-[#FFD700]" />
              </div>
              <h4 className="text-xl font-semibold mb-3 font-display">
                Campus Events
              </h4>
              <p className="text-[#A1A1AA] font-sans leading-relaxed">
                Never miss out on campus activities, from study sessions to
                social events and everything in between.
              </p>
            </div>

            <div className="group bg-white/[0.02] rounded-xl p-6 border border-white/6 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-[200ms] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-white/10">
              <div className="w-12 h-12 bg-[#FFD700]/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-[90ms] group-hover:bg-[#FFD700]/20">
                <Heart className="w-6 h-6 text-[#FFD700]" />
              </div>
              <h4 className="text-xl font-semibold mb-3 font-display">
                Wellbeing Focus
              </h4>
              <p className="text-[#A1A1AA] font-sans leading-relaxed">
                Mental health resources, stress management tools, and a
                supportive community that cares about your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials - Enhanced typography and spacing */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 font-display">
              Loved by students everywhere
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white/[0.015] rounded-xl p-6 border border-white/6 transition-all duration-[200ms] hover:border-white/10 hover:bg-white/[0.025]">
              <p className="text-[#FFFFFF]/90 mb-4 italic font-sans leading-relaxed">
                "HIVE helped me find my study group for organic chemistry. We
                went from strangers to best friends, and I actually passed the
                class!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#FFD700]/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-[#FFD700] font-semibold font-display">
                    S
                  </span>
                </div>
                <div>
                  <div className="font-semibold font-display">Sarah M.</div>
                  <div className="text-sm text-[#A1A1AA] font-sans">
                    UCLA, Biochemistry
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white/[0.015] rounded-xl p-6 border border-white/6 transition-all duration-[200ms] hover:border-white/10 hover:bg-white/[0.025]">
              <p className="text-[#FFFFFF]/90 mb-4 italic font-sans leading-relaxed">
                "Finally, a social app that actually understands college life.
                No algorithms pushing random content - just my campus
                community."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#FFD700]/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-[#FFD700] font-semibold font-display">
                    M
                  </span>
                </div>
                <div>
                  <div className="font-semibold font-display">Marcus T.</div>
                  <div className="text-sm text-[#A1A1AA] font-sans">
                    Stanford, Computer Science
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white/[0.015] rounded-xl p-6 border border-white/6 transition-all duration-[200ms] hover:border-white/10 hover:bg-white/[0.025]">
              <p className="text-[#FFFFFF]/90 mb-4 italic font-sans leading-relaxed">
                "I was so overwhelmed freshman year until I found my people on
                HIVE. Now I can't imagine college without this community."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#FFD700]/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-[#FFD700] font-semibold font-display">
                    A
                  </span>
                </div>
                <div>
                  <div className="font-semibold font-display">Aisha K.</div>
                  <div className="text-sm text-[#A1A1AA] font-sans">
                    NYU, Psychology
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced with brand-perfect styling */}
      <section className="py-20 border-t border-white/6">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6 font-display">
            Ready to find your campus community?
          </h3>
          <p className="text-xl text-[#A1A1AA] mb-8 font-sans">
            Join thousands of students already connecting on HIVE.
          </p>
          <Link href="/campus">
            <Button
              size="lg"
              className="group bg-[#FFD700] hover:bg-[#FFE255] text-[#0A0A0A] font-semibold px-12 py-4 text-lg transition-all duration-[90ms] ease-out hover:scale-[1.02] focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-[90ms] group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer - Enhanced with brand colors */}
      <footer className="border-t border-white/6 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-[#FFD700] font-display">
                HIVE
              </span>
              <p className="text-sm text-[#A1A1AA] mt-1 font-sans">
                © 2024 HIVE. Built for students, by students.
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/legal/privacy"
                className="text-[#A1A1AA] hover:text-white transition-colors duration-[90ms] font-sans"
              >
                Privacy
              </Link>
              <Link
                href="/legal/terms"
                className="text-[#A1A1AA] hover:text-white transition-colors duration-[90ms] font-sans"
              >
                Terms
              </Link>
              <Link
                href="/legal/community-guidelines"
                className="text-[#A1A1AA] hover:text-white transition-colors duration-[90ms] font-sans"
              >
                Community Guidelines
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
