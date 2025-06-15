import { MotionDiv } from '@hive/ui';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@hive/ui';
import type { OnboardingData } from '../onboarding-wizard';

interface WelcomeStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <MotionDiv
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-center space-y-8"
    >
      <MotionDiv
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center"
      >
        <Sparkles className="w-10 h-10 text-yellow-500" />
      </MotionDiv>

      <MotionDiv
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold text-white">
          Welcome to <span className="text-yellow-500">HIVE</span>
        </h1>
        <h2 className="text-xl text-zinc-300">
          Your campus social network
        </h2>
      </MotionDiv>

      <MotionDiv
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <div className="space-y-4 text-zinc-400">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Connect with classmates and study groups</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Discover campus events and opportunities</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Build your academic and social network</span>
          </div>
        </div>

        <div className="bg-zinc-800/50 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            Let&apos;s get you set up
          </h3>
          <MotionDiv
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-zinc-400"
          >
                         We&apos;ll walk you through a few quick steps to personalize your HIVE experience. 
            This should only take a couple of minutes.
          </MotionDiv>
        </div>

        <Button
          onClick={onNext}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8 py-3"
        >
          Get Started
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </MotionDiv>
    </MotionDiv>
  );
} 