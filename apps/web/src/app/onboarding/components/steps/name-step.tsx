import { MotionDiv } from "@hive/ui";
import { User } from "lucide-react";
import { Input } from "@hive/ui";
import type { OnboardingData } from "../onboarding-wizard";

interface NameStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

// Simple Label component
function Label({
  htmlFor,
  className,
  children,
}: {
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none ${className}`}
    >
      {children}
    </label>
  );
}

export function NameStep({ data, updateData, onNext }: NameStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.fullName.trim()) {
      onNext();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ fullName: e.target.value });
  };

  return (
    <MotionDiv
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          What&apos;s your name?
        </h2>
        <p className="text-zinc-400">
          This is how you&apos;ll appear to other students on HIVE.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-white">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={data.fullName}
            onChange={handleNameChange}
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-yellow-500"
            autoFocus
          />
        </div>

        <div className="bg-zinc-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-white mb-2">Privacy Note</h4>
          <p className="text-xs text-zinc-400">
            Your name will be visible to other students in your spaces. You can
            always update this later in your profile settings.
          </p>
        </div>
      </form>
    </MotionDiv>
  );
}
