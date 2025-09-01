import React from 'react';

export interface Feature {
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface FeaturesSectionProps {
  features?: Feature[];
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    icon: "🏫",
    title: "Campus Communities",
    description: "Connect with students from your school through verified, private communities built around shared interests.",
    highlight: true,
  },
  {
    icon: "⚡",
    title: "Real-time Engagement",
    description: "Join live discussions, share moments, and stay connected with what's happening on campus right now.",
  },
  {
    icon: "🎯",
    title: "Interest-Based Spaces",
    description: "Find your tribe through academic interests, hobbies, clubs, and activities that matter to you.",
  },
  {
    icon: "📚",
    title: "Academic Support",
    description: "Collaborate on projects, form study groups, and get help from peers in your courses.",
  },
  {
    icon: "🏆",
    title: "Achievement System",
    description: "Earn recognition for your contributions and celebrate milestones with your campus community.",
  },
  {
    icon: "🔒",
    title: "Privacy First",
    description: "School-exclusive communities with robust privacy controls and authentic student verification.",
  },
];

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features = defaultFeatures,
  className = "",
}) => {
  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black font-display text-foreground mb-4">
            Everything you need for
            <br />
            <span className="text-accent">campus connection</span>
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Built specifically for student life, designed to enhance real connections and meaningful engagement.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`p-6 rounded-lg border transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] hover:border-accent/30 ${
                feature.highlight 
                  ? 'bg-surface border-accent/20 ring-1 ring-accent/10' 
                  : 'bg-surface border-border hover:bg-surface/80'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};