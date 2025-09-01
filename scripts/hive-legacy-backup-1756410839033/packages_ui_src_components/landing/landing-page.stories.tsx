import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './hero-section';
import { FeaturesSection } from './features-section';
import { StatsSection } from './stats-section';
import { CTASection } from './cta-section';
import { Header } from './header';

// Complete Landing Page Component
const LandingPage = () => {
  const handleGetStarted = () => {
    console.log('Get Started clicked - would navigate to onboarding');
  };

  const handleLearnMore = () => {
    console.log('Learn More clicked - would show more information');
  };

  const handleLogin = () => {
    console.log('Login clicked - would navigate to auth');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col">
        <Header onLogin={handleLogin} />
        <HeroSection 
          onGetStarted={handleGetStarted}
          onLearnMore={handleLearnMore}
        />
      </div>
      <FeaturesSection />
      <StatsSection />
      <CTASection 
        onGetStarted={handleGetStarted}
        onLearnMore={handleLearnMore}
      />
    </div>
  );
};

const meta: Meta<typeof LandingPage> = {
  title: 'Landing/Complete Landing Page',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete landing page combining all sections: Header, Hero, Features, Stats, and CTA.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LandingPage>;

export const Default: Story = {
  args: {},
};

export const Playground: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test the complete landing page experience.',
      },
    },
  },
};