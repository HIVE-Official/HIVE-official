import React from 'react';
import { Button } from '../button';
import { ArrowRight } from 'lucide-react';

export interface CTASectionProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onGetStarted: _onGetStarted,
  onLearnMore: _onLearnMore,
  className = "",
}) => {
  return (
    <section className={`py-20 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-5xl font-black font-display text-foreground mb-6">
            Ready to connect with
            <br />
            <span className="text-accent">your campus?</span>
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Join thousands of students building the future of campus community. 
            Your story starts here.
          </p>
        </div>

        {/* Visual Element */}
        <div className="mb-12">
          <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-accent">🚀</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-accent/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Button
            size="lg"
            className="group h-16 w-full bg-muted/20 px-10 text-xl font-medium text-muted/50 sm:w-auto transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] cursor-not-allowed"
            disabled
          >
            Get Started Today
            <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-16 w-full border-border/30 px-10 text-xl font-medium text-muted/50 sm:w-auto transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] cursor-not-allowed"
            disabled
          >
            Learn More
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted">
            <div className="flex items-center space-x-2">
              <span className="text-accent">✓</span>
              <span>Student-verified communities</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-accent">✓</span>
              <span>Privacy-first design</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-accent">✓</span>
              <span>Built by students</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};