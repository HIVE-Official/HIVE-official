"use client";

import { Button } from "@hive/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Users,
  BookOpen,
  Calendar,
  Star,
  Zap,
} from "lucide-react";
import { useAuth } from "@hive/hooks";

export default function WelcomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Animated reveal sequence - BRAND COMPLIANT TIMING
    const timer1 = setTimeout(() => setAnimationStep(1), 90); // 90ms micro
    const timer2 = setTimeout(() => setAnimationStep(2), 220); // 220ms content
    const timer3 = setTimeout(() => setAnimationStep(3), 440); // 220ms * 2

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  const handleSchoolSelect = () => {
    setAnimationStep(1);
    // In a real app, you'd save the school selection here
    router.push("/onboarding");
  };

  const handleGoToSpaces = () => {
    router.push("/spaces");
  };

  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Minimal background elements - BRAND COMPLIANT */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#6B7280]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Welcome Header */}
          <div
            className={`space-y-4 transition-all duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
              animationStep >= 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-full px-4 py-2 text-[#FFD700] text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Successfully Authenticated</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight font-display text-white">
              Welcome to <span className="text-[#FFD700]">HIVE</span>
            </h1>

            <p className="text-xl lg:text-2xl text-[#6B7280] leading-relaxed max-w-xl mx-auto font-sans">
              {user.profile?.name ? `Hey ${user.profile.name}! ` : ""}
              You're now part of the exclusive college social platform. Let's
              get you set up.
            </p>
          </div>

          {/* Next Steps */}
          <div
            className={`space-y-6 transition-all duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] delay-[90ms] ${
              animationStep >= 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl font-semibold text-white mb-6 font-display">
              Choose your path
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Complete Profile */}
              <div
                className="group bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#FFD700]/50 transition-all duration-[90ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] cursor-pointer"
                onClick={handleSchoolSelect}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#FFD700]/10 rounded-lg flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-colors duration-[90ms]">
                    <Star className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-[#FFD700] transition-colors duration-[90ms] font-display">
                      Complete Your Profile
                    </h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed mb-3 font-sans">
                      Add your photo, interests, and academic info to help
                      others find and connect with you.
                    </p>
                    <div className="inline-flex items-center text-[#FFD700] text-sm font-medium group-hover:translate-x-1 transition-transform duration-[90ms] font-sans">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Explore Spaces */}
              <div
                className="group bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#6B7280]/50 transition-all duration-[90ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] cursor-pointer"
                onClick={handleGoToSpaces}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#6B7280]/10 rounded-lg flex items-center justify-center group-hover:bg-[#6B7280]/20 transition-colors duration-[90ms]">
                    <Users className="w-6 h-6 text-[#6B7280]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-[#6B7280] transition-colors duration-[90ms] font-display">
                      Explore Campus Spaces
                    </h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed mb-3 font-sans">
                      Browse student organizations, study groups, and
                      communities on your campus.
                    </p>
                    <div className="inline-flex items-center text-[#6B7280] text-sm font-medium group-hover:translate-x-1 transition-transform duration-[90ms] font-sans">
                      Explore Now
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div
            className={`transition-all duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] delay-[180ms] ${
              animationStep >= 3
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 font-display">
                What you can do on HIVE
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-3 text-[#6B7280]">
                  <div className="w-8 h-8 bg-[#6B7280]/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-[#6B7280]" />
                  </div>
                  <span className="font-sans">Join study groups</span>
                </div>

                <div className="flex items-center space-x-3 text-[#6B7280]">
                  <div className="w-8 h-8 bg-[#6B7280]/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-[#6B7280]" />
                  </div>
                  <span className="font-sans">Discover events</span>
                </div>

                <div className="flex items-center space-x-3 text-[#6B7280]">
                  <div className="w-8 h-8 bg-[#6B7280]/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#6B7280]" />
                  </div>
                  <span className="font-sans">Build connections</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
