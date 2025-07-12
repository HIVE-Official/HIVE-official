"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Users, Zap, Building, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../button';
import { Input } from '../input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';
import { Alert } from '../alert';
import { CountdownTimer } from './countdown-timer';
import { cn } from '../../lib/utils';

interface HiveLandingPageProps {
  launchDate?: Date;
  onEmailSignup?: (email: string) => Promise<void>;
  className?: string;
}

export const HiveLandingPage: React.FC<HiveLandingPageProps> = ({
  launchDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  onEmailSignup,
  className
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onEmailSignup?.(email);
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Find Your People",
      description: "Connect with students in your dorm, major, clubs, and interests"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Build Tools Together",
      description: "Create custom tools that help your community coordinate and thrive"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Campus-Wide Moments",
      description: "Participate in rituals and events that bring your whole campus together"
    }
  ];

  const campusStats = [
    { number: "50+", label: "Universities" },
    { number: "10K+", label: "Students Waiting" },
    { number: "100+", label: "Tools Built" },
    { number: "500+", label: "Active Spaces" }
  ];

  return (
    <div className={cn("min-h-screen bg-background text-white", className)}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-12">
          {/* Logo & Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center mb-8">
              <motion.div 
                className="w-32 h-32 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent rounded-3xl flex items-center justify-center border-2 border-accent/50 hover:border-accent transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] hover:scale-105 hover:shadow-2xl hover:shadow-accent/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-20 h-20 text-accent">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9L21 9ZM3 9V7L9 7.5V9L3 9ZM5 11C5 10.4 5.4 10 6 10S7 10.4 7 11V13H5V11ZM17 11C17 10.4 17.4 10 18 10S19 10.4 19 11V13H17V11ZM7 15H5V17C5 17.6 5.4 18 6 18S7 17.6 7 17V15ZM17 15H19V17C19 17.6 18.6 18 18 18S17 17.6 17 17V15ZM12 6C10.9 6 10 6.9 10 8V10H14V8C14 6.9 13.1 6 12 6ZM8 12H16V14H8V12ZM12 22C10.9 22 10 21.1 10 20V18H14V20C14 21.1 13.1 22 12 22Z"/>
                  </svg>
                </div>
              </motion.div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-8xl md:text-9xl font-display font-black bg-gradient-to-r from-foreground via-accent/80 to-foreground bg-clip-text text-transparent tracking-tight">
                HIVE
              </h1>
              <h2 className="text-xl md:text-2xl text-accent font-semibold tracking-wide">
                The Programmable Campus Layer
              </h2>
            </div>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
              Where students find their people, make decisions together, and build tools that spread across campus.
            </p>
            <p className="text-lg text-muted/80 max-w-2xl mx-auto">
              Not another chat app or course manager—this is where your dorm votes on late-night food, 
              your major shares actually useful resources, and someone creative makes tools that the whole campus adopts.
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-accent">Launching Soon</h3>
            <CountdownTimer 
              targetDate={launchDate}
              size="lg"
              variant="accent"
            />
          </motion.div>

          {/* Email Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {isSuccess ? (
              <Alert variant="success" className="max-w-md mx-auto">
                <CheckCircle className="w-4 h-4" />
                <div>
                  <p className="font-medium">You're on the list!</p>
                  <p className="text-sm">We'll notify you when HIVE launches at your campus.</p>
                </div>
              </Alert>
            ) : (
              <Card variant="elevated" padding="lg" className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Join the Waitlist</CardTitle>
                  <CardDescription>
                    Be the first to experience HIVE when it launches at your campus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="you@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-center"
                      disabled={isSubmitting}
                    />
                    {error && (
                      <div className="text-sm text-red-400 text-center">{error}</div>
                    )}
                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="w-full border-2 border-accent hover:border-accent focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
                      disabled={!email.trim() || isSubmitting}
                    >
                      {isSubmitting ? (
                        'Joining...'
                      ) : (
                        <>
                          Join the Hive
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Built for Campus Life</h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              HIVE understands that campus communities are unique. We've designed every feature 
              around how students actually connect, coordinate, and create together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card variant="elevated" padding="lg" className="h-full hover:border-accent/50 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]">
                  <CardContent className="text-center space-y-4">
                    <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mx-auto border border-accent/30 hover:border-accent transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]">
                      <div className="text-accent">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-muted leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Growing Across Campuses</h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Students are already building the future of campus connection. 
              Join the movement.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {campusStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Transform Your Campus?
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              HIVE is launching soon. Be among the first students to experience 
              the programmable campus layer.
            </p>
            
            <div className="space-y-6">
              <CountdownTimer 
                targetDate={launchDate}
                size="md"
                variant="accent"
              />
              
              {!isSuccess && (
                <Card variant="accent" padding="lg" className="max-w-md mx-auto">
                  <CardContent>
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Get notified when HIVE launches"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background/50 border-accent/30"
                        disabled={isSubmitting}
                      />
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full bg-background hover:bg-background/90 text-white border-2 border-accent hover:border-accent focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
                        disabled={!email.trim() || isSubmitting}
                      >
                        {isSubmitting ? 'Joining...' : 'Secure Your Spot'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl flex items-center justify-center border border-accent/30 hover:border-accent transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]">
                <div className="w-6 h-6 text-accent">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9L21 9ZM3 9V7L9 7.5V9L3 9ZM5 11C5 10.4 5.4 10 6 10S7 10.4 7 11V13H5V11ZM17 11C17 10.4 17.4 10 18 10S19 10.4 19 11V13H17V11ZM7 15H5V17C5 17.6 5.4 18 6 18S7 17.6 7 17V15ZM17 15H19V17C19 17.6 18.6 18 18 18S17 17.6 17 17V15ZM12 6C10.9 6 10 6.9 10 8V10H14V8C14 6.9 13.1 6 12 6ZM8 12H16V14H8V12ZM12 22C10.9 22 10 21.1 10 20V18H14V20C14 21.1 13.1 22 12 22Z"/>
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold text-accent">HIVE</span>
            </div>
            
            <div className="text-sm text-muted">
              © 2025 HIVE. Building the future of campus connection.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};