import React from 'react';
import { Button } from '../button';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface HeroSectionProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted: _onGetStarted,
  onLearnMore: _onLearnMore,
  className = "",
}) => {
  return (
    <main className={`flex flex-1 flex-col items-center justify-center px-6 text-center ${className}`}>
      <div className="max-w-4xl space-y-8">
        {/* Pre-title */}
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="font-mono text-sm uppercase tracking-wider text-muted">
            Your Campus OS
          </span>
          <Sparkles className="h-4 w-4 text-accent" />
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl font-black tracking-tight text-foreground md:text-7xl lg:text-8xl font-display">
          HIVE
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted md:text-2xl font-sans">
          Minimal surface.{" "}
          <span className="text-accent font-medium">Maximal spark.</span>
          <br />
          Real-time campus community built by students.
        </p>

        {/* Enhanced Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mx-auto">
              <span className="text-accent text-xl">⚡</span>
            </div>
            <h3 className="font-display font-semibold text-foreground">Real-time</h3>
            <p className="text-muted text-sm">Campus life as it happens</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mx-auto">
              <span className="text-accent text-xl">🏫</span>
            </div>
            <h3 className="font-display font-semibold text-foreground">Verified</h3>
            <p className="text-muted text-sm">Students, faculty, and staff</p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mx-auto">
              <span className="text-accent text-xl">🎯</span>
            </div>
            <h3 className="font-display font-semibold text-foreground">Focused</h3>
            <p className="text-muted text-sm">Your campus, your community</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row sm:gap-6">
          <ButtonEnhanced
            size="lg"
            onClick={_onGetStarted}
            className="group h-14 w-full bg-accent/20 hover:bg-accent/30 px-8 text-lg font-medium text-accent sm:w-auto transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] group-hover:translate-x-1" />
          </ButtonEnhanced>

          <ButtonEnhanced
            variant="secondary"
            size="lg"
            onClick={_onLearnMore}
            className="h-14 w-full border-border/30 hover:border-accent/30 px-8 text-lg font-medium text-foreground hover:text-accent sm:w-auto transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
          >
            Learn More
          </ButtonEnhanced>
        </div>

        {/* Social Proof */}
        <div className="pt-12">
          <p className="font-mono text-sm text-muted">
            Built by Students · Owned by Students.
          </p>
        </div>
      </div>
    </main>
  );
};