import type { Meta, StoryObj } from '@storybook/react';
import { HivePremiumButton, HivePremiumCard } from '../../components';
import { 
  Star, 
  Crown, 
  Zap, 
  Shield, 
  Sparkles,
  Diamond,
  Trophy,
  Gem
} from 'lucide-react';

const meta: Meta = {
  title: '05-Premium/Premium Components',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Premium variants of HIVE components with enhanced visual effects and luxury styling for pro features and premium experiences.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const PremiumButtons: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Premium Buttons</h3>
        
        <HivePremiumButton size="sm">
          <Crown className="w-4 h-4" />
          Upgrade Pro
        </HivePremiumButton>
        
        <HivePremiumButton>
          <Star className="w-4 h-4" />
          Premium Feature
        </HivePremiumButton>
        
        <HivePremiumButton size="lg">
          <Zap className="w-5 h-5" />
          Unlock Premium
        </HivePremiumButton>
        
        <HivePremiumButton variant="outline">
          <Shield className="w-4 h-4" />
          Premium Support
        </HivePremiumButton>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">States & Variants</h3>
        
        <HivePremiumButton disabled>
          <Sparkles className="w-4 h-4" />
          Disabled State
        </HivePremiumButton>
        
        <HivePremiumButton variant="ghost">
          <Diamond className="w-4 h-4" />
          Ghost Premium
        </HivePremiumButton>
        
        <HivePremiumButton className="w-full">
          <Trophy className="w-4 h-4" />
          Full Width Premium
        </HivePremiumButton>
      </div>
    </div>
  ),
};

export const PremiumCards: StoryObj = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8 max-w-6xl">
      <HivePremiumCard className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Crown className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold text-[var(--hive-text-primary)]">Premium Space</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Unlock advanced analytics, priority support, and exclusive features for your space.
        </p>
        <HivePremiumButton size="sm">
          <Gem className="w-4 h-4" />
          Upgrade Now
        </HivePremiumButton>
      </HivePremiumCard>
      
      <HivePremiumCard className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-[var(--hive-text-primary)]">Pro Tools</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Access premium tool templates and advanced customization options.
        </p>
        <div className="flex gap-2">
          <HivePremiumButton size="sm" variant="outline">
            Learn More
          </HivePremiumButton>
          <HivePremiumButton size="sm">
            Get Pro
          </HivePremiumButton>
        </div>
      </HivePremiumCard>
      
      <HivePremiumCard className="p-6 lg:col-span-2">
        <div className="text-center">
          <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">Premium Experience</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Elevate your campus experience with premium features, priority support, 
            and exclusive access to beta tools and advanced analytics.
          </p>
          <HivePremiumButton size="lg">
            <Trophy className="w-5 h-5" />
            Start Premium Trial
          </HivePremiumButton>
        </div>
      </HivePremiumCard>
    </div>
  ),
};

export const PremiumFeatureShowcase: StoryObj = {
  render: () => (
    <div className="p-8 space-y-8 max-w-4xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-4">Premium Components</h2>
        <p className="text-gray-400">Enhanced components with luxury styling and premium effects</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Shield, title: "Premium Security", desc: "Enhanced protection" },
          { icon: Zap, title: "Lightning Fast", desc: "Priority processing" },
          { icon: Crown, title: "VIP Access", desc: "Exclusive features" },
        ].map((feature, i) => (
          <HivePremiumCard key={i} className="p-6 text-center">
            <feature.icon className="w-8 h-8 mx-auto mb-4 text-amber-400" />
            <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">{feature.title}</h4>
            <p className="text-gray-400 text-sm mb-4">{feature.desc}</p>
            <HivePremiumButton size="sm" variant="outline" className="w-full">
              Learn More
            </HivePremiumButton>
          </HivePremiumCard>
        ))}
      </div>
    </div>
  ),
};