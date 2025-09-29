"use client";

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { HiveLogo, HiveButton, HiveCard, HiveModal, HiveModalContent, Input, Label } from "@hive/ui";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown, Users, Zap, Shield, Clock, BookOpen, MessageSquare, TrendingUp, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

// Schema for waitlist form
const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address").refine(
    (email) => email.endsWith('.edu'),
    { message: 'Must be a .edu email address' }
  ),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  schoolName: z.string().min(2, "School name is required"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface School {
  id: string;
  name: string;
  domain: string;
  status: string;
  waitlistCount: number;
}

export default function LandingPage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Animation refs
  const heroRef = useRef(null);
  const socialProofRef = useRef(null);
  const featuresRef = useRef(null);
  const waitlistSectionRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const socialProofInView = useInView(socialProofRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const waitlistInView = useInView(waitlistSectionRef, { once: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  useEffect(() => {
    setIsMounted(true);
    // Load schools for waitlist
    fetch('/api/schools')
      .then(res => res.json())
      .then(data => setSchools(data))
      .catch(console.error);
  }, []);

  // Check if user is already authenticated and redirect to dashboard
  useEffect(() => {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      try {
        const session = JSON.parse(sessionJson);
        const sessionAge = Date.now() - new Date(session.verifiedAt).getTime();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours

        if (sessionAge <= maxAge && session.onboardingCompleted) {
          router.replace('/');
          return;
        } else if (sessionAge <= maxAge && !session.onboardingCompleted) {
          router.replace('/onboarding');
          return;
        }
      } catch (error) {
        window.localStorage.removeItem('hive_session');
      }
    }
  }, [router]);

  const handleGetStarted = () => {
    setIsNavigating(true);
    router.push('/auth/login');
  };

  const handleJoinWaitlist = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // For now, create a generic school entry for non-UB schools
      const schoolId = 'other-schools';

      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          schoolId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to join waitlist');
      }

      setSubmitSuccess(true);
      reset();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToWaitlist = () => {
    waitlistSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!isNavigating && (
          <motion.div
            className="min-h-screen bg-black text-white overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: {
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1]
              }
            }}
          >
            {/* Gradient background */}
            <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black" />

            {/* Navigation */}
            <nav className="relative z-20 flex items-center justify-between p-6 md:px-12">
              <HiveLogo
                variant="gradient"
                size="md"
                showText={true}
                className=""
              />
              <HiveButton
                variant="secondary"
                size="sm"
                onClick={handleGetStarted}
                className="hidden md:inline-flex"
              >
                Sign In
              </HiveButton>
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="relative z-10 px-6 md:px-12 pt-12 md:pt-24 pb-16">
              <div className="max-w-6xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700/50">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-300">Live at UB • Launching everywhere October 2025</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                    When you
                    <motion.span
                      className="text-red-400 block md:inline md:ml-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      panic
                    </motion.span>
                    <br className="md:hidden" />
                    <span className="block mt-2 md:mt-4">
                      find your
                      <motion.span
                        className="text-[#FFD700] ml-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      >
                        people
                      </motion.span>
                    </span>
                  </h1>

                  <motion.p
                    className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    The college social app where "I'm struggling" becomes "I found my people" in
                    <span className="text-[#FFD700] font-semibold"> under 10 seconds</span>
                  </motion.p>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center mt-12 md:mt-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <HiveButton
                    variant="default"
                    size="lg"
                    onClick={handleGetStarted}
                    className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-lg px-8 py-4"
                  >
                    Join UB Students
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </HiveButton>
                  <HiveButton
                    variant="secondary"
                    size="lg"
                    onClick={scrollToWaitlist}
                    className="border-gray-600 text-white hover:bg-gray-800 font-semibold text-lg px-8 py-4"
                  >
                    Join Waitlist for Your School
                  </HiveButton>
                </motion.div>

                <motion.div
                  className="mt-16 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  <button
                    onClick={() => socialProofRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="text-sm">See what's happening at UB</span>
                    <ChevronDown className="h-5 w-5 animate-bounce" />
                  </button>
                </motion.div>
              </div>
            </section>

            {/* Social Proof Section */}
            <section ref={socialProofRef} className="relative z-10 px-6 md:px-12 py-16 md:py-24">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={socialProofInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    <span className="text-[#FFD700]">UB students</span> are already connecting
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Real students, real conversations, real relief from the daily anxiety of college life
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      stat: "2.3k+",
                      label: "Active Students",
                      sublabel: "Daily users finding their people",
                      icon: Users,
                      delay: 0.1
                    },
                    {
                      stat: "<8 sec",
                      label: "Average Relief Time",
                      sublabel: "From panic to community",
                      icon: Clock,
                      delay: 0.2
                    },
                    {
                      stat: "94%",
                      label: "Feel Less Alone",
                      sublabel: "After joining their first space",
                      icon: TrendingUp,
                      delay: 0.3
                    }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={socialProofInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: item.delay }}
                      >
                        <HiveCard className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 p-8 text-center hover:bg-gray-800/50 transition-colors">
                          <Icon className="h-8 w-8 text-[#FFD700] mx-auto mb-4" />
                          <div className="text-4xl font-bold text-white mb-2">{item.stat}</div>
                          <div className="text-lg font-semibold text-gray-300 mb-1">{item.label}</div>
                          <div className="text-sm text-gray-400">{item.sublabel}</div>
                        </HiveCard>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Live Activity Feed Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={socialProofInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-16"
                >
                  <h3 className="text-2xl font-bold text-center mb-8 text-gray-300">
                    Live activity from UB campus
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {[
                      {
                        type: "space",
                        content: "CS 250 Study Group • 23 members online",
                        action: "Sarah just shared her project solution",
                        timeAgo: "2m ago",
                        urgent: false
                      },
                      {
                        type: "panic",
                        content: "Anyone else panicking about tomorrow's exam?",
                        action: "12 people responded in EE Study Space",
                        timeAgo: "5m ago",
                        urgent: true
                      },
                      {
                        type: "event",
                        content: "Last-minute study session at Lockwood",
                        action: "8 people joined, 3 spots left",
                        timeAgo: "8m ago",
                        urgent: false
                      },
                      {
                        type: "relief",
                        content: "Found my calc tutor through HIVE!",
                        action: "Posted in Math Help Space",
                        timeAgo: "12m ago",
                        urgent: false
                      }
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={socialProofInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        className={`p-4 rounded-lg border ${activity.urgent
                          ? 'bg-red-900/20 border-red-800/50'
                          : 'bg-gray-800/50 border-gray-700/50'
                        } backdrop-blur-sm`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${activity.urgent ? 'bg-red-400' : 'bg-green-400'}`} />
                          <div className="flex-1">
                            <p className="text-white font-medium">{activity.content}</p>
                            <p className="text-gray-400 text-sm mt-1">{activity.action}</p>
                            <p className="text-gray-500 text-xs mt-2">{activity.timeAgo}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="relative z-10 px-6 md:px-12 py-16 md:py-24 bg-gray-900/20">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Built for the way <span className="text-[#FFD700]">you actually</span> need help
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    No more pretending you have it all figured out. HIVE transforms your daily anxieties into connection opportunities.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      icon: MessageSquare,
                      title: "Panic → People",
                      description: "\"Anyone else freaking out about this exam?\" becomes your gateway to finding study partners and exam prep groups.",
                      anxiety: "2AM panic about being behind",
                      relief: "Study group forming right now",
                      delay: 0.1
                    },
                    {
                      icon: Users,
                      title: "Invisible → Insider",
                      description: "Stop lurking and wondering what everyone else knows. Discover the campus events and opportunities you're missing.",
                      anxiety: "FOMO about weekend plans",
                      relief: "Exclusive invite to tonight's event",
                      delay: 0.2
                    },
                    {
                      icon: BookOpen,
                      title: "Struggling → Supported",
                      description: "Your academic struggles become connection points. Find people in your exact situation who actually get it.",
                      anxiety: "Everyone seems smarter than me",
                      relief: "Found my calc study partner",
                      delay: 0.3
                    },
                    {
                      icon: Zap,
                      title: "Instant Relief",
                      description: "Our panic-to-community pipeline works in under 10 seconds. No more suffering in silence for hours.",
                      anxiety: "I don't understand this at all",
                      relief: "3 people just offered to help",
                      delay: 0.4
                    },
                    {
                      icon: Shield,
                      title: "Safe Vulnerability",
                      description: "Admit you need help without looking weak. Everyone's here because they're human, not because they're perfect.",
                      anxiety: "Can't let anyone know I'm struggling",
                      relief: "Everyone here is real about their struggles",
                      delay: 0.5
                    },
                    {
                      icon: TrendingUp,
                      title: "Accidental Expert",
                      description: "Helping others with problems you've solved makes you feel competent without trying. Natural confidence building.",
                      anxiety: "I never feel smart or helpful",
                      relief: "I actually helped 5 people today",
                      delay: 0.6
                    }
                  ].map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: feature.delay }}
                        className="group"
                      >
                        <HiveCard className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 p-6 h-full hover:bg-gray-800/50 transition-all duration-300 group-hover:border-[#FFD700]/30">
                          <Icon className="h-8 w-8 text-[#FFD700] mb-4 group-hover:scale-110 transition-transform" />
                          <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                          <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>

                          <div className="space-y-3 pt-4 border-t border-gray-700/50">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-red-300">{feature.anxiety}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-green-300">{feature.relief}</span>
                            </div>
                          </div>
                        </HiveCard>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Waitlist Section */}
            <section ref={waitlistSectionRef} className="relative z-10 px-6 md:px-12 py-16 md:py-24">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={waitlistInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="mb-12"
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Don't be the last to know when <span className="text-[#FFD700]">HIVE arrives</span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Join thousands of students waiting for HIVE to launch at their school.
                    Be first to experience the panic-to-relief pipeline.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={waitlistInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <HiveCard className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 p-8 max-w-md mx-auto">
                    {submitSuccess ? (
                      <div className="text-center space-y-4">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                        <h3 className="text-2xl font-bold text-white">You're on the list!</h3>
                        <p className="text-gray-300">
                          We'll notify you the moment HIVE launches at your school.
                          Get ready to transform your campus experience.
                        </p>
                        <HiveButton
                          variant="secondary"
                          onClick={() => {
                            setSubmitSuccess(false);
                            setIsWaitlistOpen(true);
                          }}
                          className="mt-4"
                        >
                          Add another school
                        </HiveButton>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(handleJoinWaitlist)} className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="fullName" className="text-white font-medium">
                              Full Name
                            </Label>
                            <Input
                              id="fullName"
                              {...register("fullName")}
                              placeholder="Your full name"
                              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 mt-2"
                              disabled={isSubmitting}
                            />
                            {errors.fullName && (
                              <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="email" className="text-white font-medium">
                              School Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              {...register("email")}
                              placeholder="your.name@yourschool.edu"
                              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 mt-2"
                              disabled={isSubmitting}
                            />
                            {errors.email && (
                              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="schoolName" className="text-white font-medium">
                              School Name
                            </Label>
                            <Input
                              id="schoolName"
                              {...register("schoolName")}
                              placeholder="University of Your State"
                              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 mt-2"
                              disabled={isSubmitting}
                            />
                            {errors.schoolName && (
                              <p className="text-red-400 text-sm mt-1">{errors.schoolName.message}</p>
                            )}
                          </div>
                        </div>

                        {submitError && (
                          <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-3">
                            <p className="text-red-400 text-sm">{submitError}</p>
                          </div>
                        )}

                        <HiveButton
                          type="submit"
                          variant="default"
                          size="lg"
                          className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-black/20 border-t-black/60 rounded-full animate-spin mr-2" />
                              Joining waitlist...
                            </>
                          ) : (
                            "Join the waitlist"
                          )}
                        </HiveButton>

                        <p className="text-xs text-gray-400 text-center">
                          We'll only email you when HIVE launches at your school. No spam, ever.
                        </p>
                      </form>
                    )}
                  </HiveCard>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 px-6 md:px-12 py-12 border-t border-gray-800">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-4">
                    <HiveLogo variant="gradient" size="sm" showText={true} />
                    <span className="text-gray-400">Transforming campus anxiety into connection</span>
                  </div>
                  <div className="flex items-center gap-6 text-gray-400">
                    <a href="/legal/privacy" className="hover:text-white transition-colors">Privacy</a>
                    <a href="/legal/terms" className="hover:text-white transition-colors">Terms</a>
                    <a href="/legal/community-guidelines" className="hover:text-white transition-colors">Guidelines</a>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
                  <p>&copy; 2025 HIVE. Built for students who know college is hard.</p>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}