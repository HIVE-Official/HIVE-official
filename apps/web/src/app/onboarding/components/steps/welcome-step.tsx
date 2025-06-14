import { motion } from 'framer-motion';
import { Sparkles, Users, Zap } from 'lucide-react';
import { OnboardingData } from '../onboarding-wizard';

interface WelcomeStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center"
      >
        <Sparkles className="w-10 h-10 text-yellow-500" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-white">
          Welcome to HIVE
        </h1>
        <p className="text-lg text-zinc-400 max-w-lg mx-auto">
          Let&apos;s build your profile so you can connect with your campus community and start creating.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
      >
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="font-semibold text-white">Join Spaces</h3>
          <p className="text-sm text-zinc-500">
            Connect with classmates in your major, clubs, and interests
          </p>
        </div>

        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="font-semibold text-white">Create Tools</h3>
          <p className="text-sm text-zinc-500">
            Build interactive tools and widgets for your community
          </p>
        </div>

        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="font-semibold text-white">Share Ideas</h3>
          <p className="text-sm text-zinc-500">
            Post updates, ask questions, and engage with your peers
          </p>
        </div>
      </motion.div>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm text-zinc-600"
      >
        This will take about 2 minutes to complete
      </motion.p>
    </div>
  );
} 