import { motion } from 'framer-motion';
import { User, Eye, EyeOff, AtSign, Check, X, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@hive/ui";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveNameStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

// Auto-capitalize first letter of each word
const autoCapitalize = (value: string): string => {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Generate handle from first and last name
const generateHandle = (firstName: string, lastName: string): string => {
  const first = firstName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const last = lastName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${first}${last}`.slice(0, 20);
};

type ValidationState = "idle" | "checking" | "available" | "taken" | "invalid";

export function HiveNameStep({ data, updateData, onNext }: HiveNameStepProps) {
  const [showPreview, setShowPreview] = useState(true);
  const [firstName, setFirstName] = useState(data.firstName || "");
  const [lastName, setLastName] = useState(data.lastName || "");
  const [validationState, setValidationState] = useState<ValidationState>("idle");

  // Validate handle availability
  const validateHandle = useCallback(async (handle: string) => {
    if (!handle || handle.length < 3) {
      setValidationState("idle");
      return;
    }

    setValidationState("checking");

    try {
      const response = await fetch("/api/auth/check-handle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle }),
      });

      const result = await response.json();
      setValidationState(result.available ? "available" : "taken");
    } catch (error) {
      console.error("Handle validation error:", error);
      setValidationState("invalid");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim() && validationState === "available") {
      onNext();
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const capitalized = autoCapitalize((e.target as any).value);
    setFirstName(capitalized);
    const newFullName = `${capitalized} ${lastName}`.trim();
    const newHandle = generateHandle(capitalized, lastName);

    updateData({
      firstName: capitalized,
      fullName: newFullName,
      handle: newHandle
    });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const capitalized = autoCapitalize((e.target as any).value);
    setLastName(capitalized);
    const newFullName = `${firstName} ${capitalized}`.trim();
    const newHandle = generateHandle(firstName, capitalized);

    updateData({
      lastName: capitalized,
      fullName: newFullName,
      handle: newHandle
    });
  };

  // Validate handle when it changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (data.handle && data.handle.length >= 3) {
        validateHandle(data.handle);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [data.handle, validateHandle]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-8 py-6"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-[var(--hive-overlay-gold-subtle)] backdrop-blur-xl rounded-full flex items-center justify-center border border-[var(--hive-border-gold)]"
        >
          <User className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            What's your name?
          </h2>
          <p className="text-[var(--hive-text-tertiary)] mt-2">
            This is how you'll appear to other students, and we'll create your handle automatically.
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="firstName"
            type="text"
            label="First Name"
            placeholder="First name"
          value={firstName}
          onChange={handleFirstNameChange}
          variant="default"
          className="max-w-lg w-full"
          maxLength={50}
          autoFocus
          required
        />
          
          <Input
            id="lastName"
            type="text"
            label="Last Name"
            placeholder="Last name"
          value={lastName}
          onChange={handleLastNameChange}
          variant="default"
          className="max-w-lg w-full"
          maxLength={50}
          required
        />
        </div>

        {/* Live Preview */}
        {(firstName || lastName) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--hive-background-secondary)]/30 backdrop-blur-xl border border-[var(--hive-border-primary)] rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Preview</h4>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] transition-colors"
              >
                {showPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>

            {showPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <div className="text-sm text-[var(--hive-text-secondary)]">
                  Hi there, <span className="text-[var(--hive-brand-primary)] font-medium">{firstName}</span>! 👋
                </div>

                {firstName && lastName && (
                  <>
                    <div className="text-xs text-[var(--hive-text-tertiary)]">
                      Full name: {firstName} {lastName}
                    </div>

                    {data.handle && (
                      <div className="flex items-center gap-2 text-xs">
                        <AtSign className="w-3 h-3 text-[var(--hive-brand-primary)]" />
                        <span className="text-[var(--hive-text-tertiary)]">
                          Handle: <span className="text-[var(--hive-brand-primary)] font-medium">@{data.handle}</span>
                        </span>
                        {validationState === "checking" && <Loader2 className="w-3 h-3 animate-spin text-[var(--hive-brand-primary)]" />}
                        {validationState === "available" && <Check className="w-3 h-3 text-[var(--hive-status-success)]" />}
                        {validationState === "taken" && <X className="w-3 h-3 text-[var(--hive-status-error)]" />}
                      </div>
                    )}
                  </>
                )}

                <div className="text-xs text-[var(--hive-text-tertiary)]">
                  This is how you'll appear to other students on HIVE.
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Privacy Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[var(--hive-background-secondary)]/20 backdrop-blur-sm border border-[var(--hive-border-subtle)] rounded-xl p-4"
        >
          <h4 className="text-sm font-medium text-[var(--hive-text-secondary)] mb-2 flex items-center">
            <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full mr-2" />
            Privacy Note
          </h4>
          <p className="text-xs text-[var(--hive-text-tertiary)]">
            Your name and handle will be visible to other students in your Spaces. Your
            handle is automatically generated from your name and must be unique. You can
            always update these later in your profile settings.
          </p>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
