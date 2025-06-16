import { useState, useEffect } from "react";
import { MotionDiv } from "@hive/ui";
import { AtSign, Check, X, Loader2 } from "lucide-react";
import { Input } from "@hive/ui";
import type { OnboardingData } from "../onboarding-wizard";

interface HandleStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

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

type HandleStatus = "idle" | "checking" | "available" | "taken" | "invalid";

export function HandleStep({ data, updateData, onNext }: HandleStepProps) {
  const [handleStatus, setHandleStatus] = useState<HandleStatus>("idle");
  const [checkTimeout, setCheckTimeout] = useState<NodeJS.Timeout | null>(null);
  const [, setAvailability] = useState<"available" | "taken" | "checking">(
    "available"
  );
  const [, setIsChecking] = useState(false);

  const isValidHandle = (handle: string) => {
    return /^[a-zA-Z0-9_]{3,20}$/.test(handle);
  };

  const checkAvailability = async () => {
    if (!data.handle || data.handle.length < 3) {
      setAvailability("available");
      return;
    }

    setIsChecking(true);
    try {
      const response = await fetch("/api/auth/check-handle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle: data.handle }),
      });

      const result = (await response.json()) as { available: boolean };
      if (result.available) {
        setAvailability("available");
      } else {
        setAvailability("taken");
      }
    } catch (error) {
      // Log error for debugging
      void error;
      setAvailability("available");
    } finally {
      setIsChecking(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHandle = e.target.value
      .toLowerCase()
      .replace(/[^a-zA-Z0-9_]/g, "");
    updateData({ handle: newHandle });

    if (checkTimeout) {
      clearTimeout(checkTimeout);
    }

    if (newHandle.length === 0) {
      setHandleStatus("idle");
      return;
    }

    if (!isValidHandle(newHandle)) {
      setHandleStatus("invalid");
      return;
    }

    const timeout = setTimeout(() => {
      void checkAvailability().catch(() => {});
    }, 500);

    setCheckTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (checkTimeout) {
        clearTimeout(checkTimeout);
      }
    };
  }, [checkTimeout]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handleStatus === "available") {
      onNext();
    }
  };

  const getStatusIcon = () => {
    switch (handleStatus) {
      case "checking":
        return <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />;
      case "available":
        return <Check className="w-4 h-4 text-green-500" />;
      case "taken":
      case "invalid":
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusMessage = () => {
    switch (handleStatus) {
      case "checking":
        return "Checking availability...";
      case "available":
        return "Great! This handle is available.";
      case "taken":
        return "This handle is already taken. Try another one.";
      case "invalid":
        return "Handle must be 3-20 characters (letters, numbers, underscores only).";
      default:
        return "Choose a unique handle for your profile.";
    }
  };

  const getStatusColor = () => {
    switch (handleStatus) {
      case "available":
        return "text-green-500";
      case "taken":
      case "invalid":
        return "text-red-500";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <MotionDiv
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
          <AtSign className="w-8 h-8 text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">Choose your handle</h2>
        <p className="text-zinc-400">
          This is your unique username that others will use to find and mention
          you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="handle" className="text-white">
            Handle
          </Label>
          <div className="relative">
            <AtSign className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              id="handle"
              type="text"
              placeholder="your_handle"
              value={data.handle}
              onChange={handleInputChange}
              className="pl-10 pr-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-yellow-500"
              autoFocus
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {getStatusIcon()}
            </div>
          </div>
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm ${getStatusColor()}`}
          >
            {getStatusMessage()}
          </MotionDiv>
        </div>

        <div className="bg-zinc-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-white mb-2">
            Handle Guidelines
          </h4>
          <ul className="text-xs text-zinc-400 space-y-1">
            <li>• 3-20 characters long</li>
            <li>• Letters, numbers, and underscores only</li>
            <li>• Must be unique across HIVE</li>
            <li>• Cannot be changed later</li>
          </ul>
        </div>
      </form>
    </MotionDiv>
  );
}
