import { MotionDiv } from "@hive/ui";
import { Code, Zap, Users, Sparkles } from "lucide-react";
import type { OnboardingData } from "../onboarding-wizard";

interface BuilderStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function BuilderStep({ data, updateData, onNext }: BuilderStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const selectBuilderStatus = (isBuilder: boolean) => {
    updateData({ isBuilder });
  };

  return (
    <MotionDiv
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
          <Zap className="w-8 h-8 text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">Are you a builder?</h2>
        <p className="text-zinc-400">
          Builders create tools, apps, and interactive content for the HIVE
          community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Yes, I'm a builder */}
          <button
            type="button"
            onClick={() => selectBuilderStatus(true)}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              data.isBuilder
                ? "border-yellow-500 bg-yellow-500/10"
                : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/50"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Code className="w-5 h-5 text-yellow-500" />
                </div>
                <h3 className="font-semibold text-white">
                  Yes, I&apos;m a builder!
                </h3>
              </div>
              <p className="text-sm text-zinc-400">
                I love creating tools, apps, or interactive content. I want to
                share my creations with the community.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded-full">
                  Tool Creator
                </span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-500 text-xs rounded-full">
                  Developer
                </span>
                <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full">
                  Innovator
                </span>
              </div>
            </div>
          </button>

          {/* No, I'm here to explore */}
          <button
            type="button"
            onClick={() => selectBuilderStatus(false)}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              !data.isBuilder
                ? "border-yellow-500 bg-yellow-500/10"
                : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/50"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-semibold text-white">
                  I&apos;m here to explore
                </h3>
              </div>
              <p className="text-sm text-zinc-400">
                I want to discover tools, connect with classmates, and engage
                with the community.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-500 text-xs rounded-full">
                  Explorer
                </span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-500 text-xs rounded-full">
                  Connector
                </span>
                <span className="px-2 py-1 bg-pink-500/20 text-pink-500 text-xs rounded-full">
                  Learner
                </span>
              </div>
            </div>
          </button>
        </div>

        {data.isBuilder && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-6"
          >
            <div className="flex items-start space-x-3">
              <Sparkles className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-2">
                  Welcome to the Builder Community!
                </h4>
                <p className="text-sm text-zinc-300 mb-3">
                  As a builder, you&apos;ll get access to:
                </p>
                <ul className="text-sm text-zinc-400 space-y-1">
                  <li>• Tool creation and publishing platform</li>
                  <li>• Builder-exclusive spaces and discussions</li>
                  <li>• Analytics for your creations</li>
                  <li>• Featured placement for quality tools</li>
                </ul>
              </div>
            </div>
          </MotionDiv>
        )}

        <div className="bg-zinc-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-white mb-2">
            Don&apos;t worry!
          </h4>
          <p className="text-xs text-zinc-400">
            You can always change this later in your profile settings. This just
            helps us customize your experience.
          </p>
        </div>
      </form>
    </MotionDiv>
  );
}
