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
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient - Subtle gold accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-16 text-center lg:pt-32">
            {/* Brand - Enhanced with proper typography */}
            <div className="mb-8">
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tight font-display">
                <span className="bg-gradient-to-r from-accent to-accent-600 bg-clip-text text-transparent">
                  HIVE
                </span>
              </h1>
              <p className="mt-4 text-xl lg:text-2xl text-muted font-light">
                Where your campus comes alive
              </p>
            </div>

            {/* Hero Copy - Enhanced typography hierarchy */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 font-display">
                Connect. Create.{" "}
                <span className="text-accent relative">
                  Belong.
                  {/* Subtle accent underline */}
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent/40 via-accent/80 to-accent/40 rounded-full" />
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-foreground/90 leading-relaxed mb-8 font-sans">
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
                  className="group bg-accent hover:bg-accent-600 text-background font-semibold px-8 py-4 text-lg transition-all duration-fast ease-hive-smooth hover:scale-[1.02] focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                >
                  Get Inside
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-fast ease-hive-smooth group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-accent text-accent hover:bg-accent hover:text-background font-medium px-8 py-4 text-lg transition-all duration-fast ease-hive-smooth hover:scale-[1.02] focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                >
                  Try Onboarding
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-fast ease-hive-smooth group-hover:translate-x-1" />
                </Button>
              </Link>
              <p className="text-sm text-muted font-sans">
                Exclusive to verified .edu students
              </p>
            </div>

            {/* Enhanced Social Proof with better spacing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center group cursor-default">
                <div className="text-3xl font-bold text-accent mb-2 font-display transition-all duration-fast ease-hive-smooth group-hover:scale-105">
                  50+
                </div>
                <div className="text-muted font-sans">Universities</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-3xl font-bold text-accent mb-2 font-display transition-all duration-fast ease-hive-smooth group-hover:scale-105">
                  10K+
                </div>
                <div className="text-muted font-sans">Students</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="text-3xl font-bold text-accent mb-2 font-display transition-all duration-fast ease-hive-smooth group-hover:scale-105">
                  100+
                </div>
                <div className="text-muted font-sans">Active Spaces</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview - Enhanced with brand-perfect cards */}
      <section className="py-20 border-t border-border/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 font-display">
              More than just another social app
            </h3>
            <p className="text-xl text-muted max-w-2xl mx-auto font-sans">
              HIVE is designed specifically for the college experience, with
              features that help you thrive academically and socially.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Enhanced Feature Cards with brand-perfect styling */}
            <div className="group bg-surface-01 rounded-xl p-6 border border-border/6 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-base ease-hive-smooth hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-border/10">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-fast ease-hive-smooth group-hover:bg-accent/20">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-xl font-semibold mb-3 font-display">
                Campus Feed
              </h4>
              <p className="text-muted font-sans leading-relaxed">
                Stay connected with what&apos;s happening on your campus. Smart
                algorithms surface the most relevant content for you.
              </p>
            </div>

            <div className="group bg-surface-01 rounded-xl p-6 border border-border/6 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-base ease-hive-smooth hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-border/10">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-fast ease-hive-smooth group-hover:bg-accent/20">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-xl font-semibold mb-3 font-display">
                Student Spaces
              </h4>
              <p className="text-muted font-sans leading-relaxed">
                Find your tribe in student organizations, Greek life, academic
                groups, and interest-based communities.
              </p>
            </div>

            <div className="group bg-surface-01 rounded-xl p-6 border border-border/6 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-base ease-hive-smooth hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-border/10">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-fast ease-hive-smooth group-hover:bg-accent/20">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-xl font-semibold mb-3 font-display">
                Privacy First
              </h4>
              <p className="text-muted font-sans leading-relaxed">
                Your data stays yours. Campus-only visibility ensures your
                content is shared only with fellow students.
              </p>
            </div>

            <div className="group bg-surface-01 rounded-xl p-6 border border-border/6 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-base ease-hive-smooth hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-border/10">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-fast ease-hive-smooth group-hover:bg-accent/20">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-xl font-semibold mb-3 font-display">
                Study Tools
              </h4>
              <p className="text-muted font-sans leading-relaxed">
                Collaborative study groups, resource sharing, and academic
                support integrated into your social experience.
              </p>
            </div>

            <div className="group bg-surface-01 rounded-xl p-6 border border-border/6 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-base ease-hive-smooth hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-border/10">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-fast ease-hive-smooth group-hover:bg-accent/20">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-xl font-semibold mb-3 font-display">
                Campus Events
              </h4>
              <p className="text-muted font-sans leading-relaxed">
                Never miss out on campus activities, from study sessions to
                social events and everything in between.
              </p>
            </div>

            <div className="group bg-surface-01 rounded-xl p-6 border border-border/6 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-base ease-hive-smooth hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-border/10">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-fast ease-hive-smooth group-hover:bg-accent/20">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-xl font-semibold mb-3 font-display">
                Wellbeing Focus
              </h4>
              <p className="text-muted font-sans leading-relaxed">
                Mental health resources, stress management tools, and a
                supportive community that cares about your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials - Enhanced typography and spacing */}
      <section className="py-20 border-t border-border/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 font-display">
              What students are saying
            </h3>
            <p className="text-xl text-muted max-w-2xl mx-auto font-sans">
              Join thousands of students who have found their community on HIVE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial Cards */}
            <div className="bg-surface-01 rounded-xl p-6 border border-border/6">
              <p className="text-foreground/90 mb-4 italic font-sans leading-relaxed">
                &quot;HIVE helped me find my study group for organic chemistry.
                We meet every week and I&apos;ve never felt more supported in my
                academic journey.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-accent font-semibold font-display">
                    S
                  </span>
                </div>
                <div>
                  <div className="text-sm text-muted font-sans">
                    Sarah M.
                  </div>
                  <div className="text-xs text-muted font-sans">
                    Biology Major, UCLA
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-01 rounded-xl p-6 border border-border/6">
              <p className="text-foreground/90 mb-4 italic font-sans leading-relaxed">
                &quot;I was struggling to make friends as a transfer student.
                HIVE&apos;s spaces feature connected me with other transfers and
                now I have an amazing friend group.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-accent font-semibold font-display">
                    M
                  </span>
                </div>
                <div>
                  <div className="text-sm text-muted font-sans">
                    Marcus T.
                  </div>
                  <div className="text-xs text-muted font-sans">
                    Computer Science, NYU
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-01 rounded-xl p-6 border border-border/6">
              <p className="text-foreground/90 mb-4 italic font-sans leading-relaxed">
                &quot;The privacy features give me peace of mind. I can share
                what I want with my campus community without worrying about
                the whole internet seeing it.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-accent font-semibold font-display">
                    E
                  </span>
                </div>
                <div>
                  <div className="text-sm text-muted font-sans">
                    Emma L.
                  </div>
                  <div className="text-xs text-muted font-sans">
                    Psychology Major, UT Austin
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 border-t border-border/6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6 font-display">
            Ready to join your campus community?
          </h3>
          <p className="text-xl text-muted mb-8 font-sans">
            Start your HIVE journey today and discover what makes your campus
            special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/campus">
              <Button
                size="lg"
                className="group bg-accent hover:bg-accent-600 text-background font-semibold px-12 py-4 text-lg transition-all duration-fast ease-hive-smooth hover:scale-[1.02] focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-fast ease-hive-smooth group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-2xl font-bold text-accent font-display">
                HIVE
              </h4>
              <p className="text-sm text-muted mt-1 font-sans">
                Built by Students • Owned by Students
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4 font-display">Product</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-muted hover:text-foreground transition-colors duration-fast ease-hive-smooth font-sans"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/safety"
                    className="text-muted hover:text-foreground transition-colors duration-fast ease-hive-smooth font-sans"
                  >
                    Safety
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted hover:text-foreground transition-colors duration-fast ease-hive-smooth font-sans"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 font-display">Support</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/help"
                    className="text-muted hover:text-foreground transition-colors duration-fast ease-hive-smooth font-sans"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted hover:text-foreground transition-colors duration-fast ease-hive-smooth font-sans"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/feedback"
                    className="text-muted hover:text-foreground transition-colors duration-fast ease-hive-smooth font-sans"
                  >
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/6 text-center">
            <p className="text-sm text-muted font-sans">
              © 2024 HIVE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
