import { motion } from 'framer-motion';
import { Zap, Code, Palette, Users } from 'lucide-react';
import { OnboardingData } from '../onboarding-wizard';

interface BuilderStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

function Label({ htmlFor, className, children }: { htmlFor?: string; className?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none ${className}`}>
      {children}
    </label>
  );
}

function Switch({ id, checked, onCheckedChange }: { 
  id: string; 
  checked: boolean; 
  onCheckedChange: (checked: boolean) => void; 
}) {
  return (
    <button
      type="button"
      id={id}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-yellow-500' : 'bg-zinc-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export function BuilderStep({ data, updateData, onNext }: BuilderStepProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
          <Zap className="w-8 h-8 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          Are you a builder?
        </h2>
        <p className="text-zinc-400">
          Builders can create interactive tools and widgets for the community. You can always change this later.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between p-6 bg-zinc-800/50 rounded-lg">
          <div className="space-y-1">
            <Label htmlFor="builder-toggle" className="text-white font-medium">
              Enable builder mode
            </Label>
            <p className="text-sm text-zinc-400">
              Get access to the tool creator and advanced features
            </p>
          </div>
          <Switch
            id="builder-toggle"
            checked={data.isBuilder}
            onCheckedChange={(checked) => updateData({ isBuilder: checked })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800/30 rounded-lg space-y-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-blue-500" />
            </div>
            <h4 className="text-white font-medium">Create Tools</h4>
            <p className="text-sm text-zinc-400">
              Build interactive widgets, calculators, and utilities for your community
            </p>
          </div>

          <div className="p-4 bg-zinc-800/30 rounded-lg space-y-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-green-500" />
            </div>
            <h4 className="text-white font-medium">Custom Styling</h4>
            <p className="text-sm text-zinc-400">
              Design custom layouts and themes for your tools and spaces
            </p>
          </div>

          <div className="p-4 bg-zinc-800/30 rounded-lg space-y-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <h4 className="text-white font-medium">Community Impact</h4>
            <p className="text-sm text-zinc-400">
              Share your creations with students across campus
            </p>
          </div>

          <div className="p-4 bg-zinc-800/30 rounded-lg space-y-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-500" />
            </div>
            <h4 className="text-white font-medium">Early Access</h4>
            <p className="text-sm text-zinc-400">
              Get first access to new builder features and tools
            </p>
          </div>
        </div>

        {data.isBuilder && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4"
          >
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="w-3 h-3 text-yellow-500" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">
                  Welcome to the builder community!
                </h4>
                <p className="text-sm text-zinc-300">
                  You&apos;ll have access to the tool creator in your dashboard. Start by exploring existing tools to get inspired, then create your first widget when you&apos;re ready.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="bg-zinc-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-white mb-2">
            No commitment required
          </h4>
          <p className="text-xs text-zinc-400">
            You can enable or disable builder mode anytime from your profile settings. This just helps us show you relevant features.
          </p>
        </div>
      </div>
    </motion.div>
  );
} 