import { useState, useEffect, useCallback } from "react";
import { logger } from '@hive/core/utils/logger';

import { motion } from "framer-motion";
import { AtSign, Check, X, Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@hive/ui";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveHandleStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

type ValidationState = "idle" | "checking" | "available" | "taken" | "invalid";

export function HiveHandleStep({ data, updateData, onNext }: HiveHandleStepProps) {
  const [validationState, setValidationState] = useState<ValidationState>("idle");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = (name: string, handle: string) => {
    const firstName = name.split(" ")[0].toLowerCase();
    const lastName = name.split(" ").slice(1).join("").toLowerCase();
    const baseHandle = handle.toLowerCase().replace(/[^a-z0-9]/g, "");
    
    const suggestions = [
      `${firstName}${lastName}`,
      `${firstName}_${lastName}`,
      `${firstName}${lastName}24`,
      `${baseHandle}${Math.floor(Math.random() * 99) + 1}`,
      `${firstName}.${lastName}`,
    ].filter(s => s.length >= 3 && s.length <= 20);
    
    return suggestions.slice(0, 3);
  };

  const validateHandle = useCallback(async (handle: string) => {
    if (!handle) {
      setValidationState("idle");
      return;
    }

    // Must be at least 3 characters
    if (handle.length < 3) {
      setValidationState("invalid");
      return;
    }

    // Must be no more than 20 characters
    if (handle.length > 20) {
      setValidationState("invalid");
      return;
    }

    // Must start with a letter or number (not . _ -)
    if (!/^[a-zA-Z0-9]/.test(handle)) {
      setValidationState("invalid");
      return;
    }

    // Must end with a letter or number (not . _ -)
    if (!/[a-zA-Z0-9]$/.test(handle)) {
      setValidationState("invalid");
      return;
    }

    // Only letters, numbers, dots, underscores, and hyphens allowed
    if (!/^[a-zA-Z0-9._-]+$/.test(handle)) {
      setValidationState("invalid");
      return;
    }

    // No consecutive special characters
    if (/[._-]{2,}/.test(handle)) {
      setValidationState("invalid");
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
      
      if (result.available) {
        setValidationState("available");
        setSuggestions([]);
      } else {
        setValidationState("taken");
        setSuggestions(generateSuggestions(data.fullName, handle));
      }
    } catch (error) {
      logger.error('Handle validation error:', error);
      setValidationState("invalid");
    }
  }, [data.fullName]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (data.handle) {
        validateHandle(data.handle);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [data.handle, validateHandle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.handle && validationState === "available") {
      onNext();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toLowerCase();
    
    // Remove any characters that aren't allowed
    value = value.replace(/[^a-z0-9._-]/g, "");
    
    // Prevent consecutive special characters
    value = value.replace(/[._-]{2,}/g, (match) => match[0]);
    
    // Limit to 20 characters
    value = value.slice(0, 20);
    
    updateData({ handle: value });
    setSuggestions([]);
  };

  const selectSuggestion = (suggestion: string) => {
    updateData({ handle: suggestion });
    setSuggestions([]);
  };

  const getValidationIcon = () => {
    switch (validationState) {
      case "checking":
        return <Loader2 className="w-4 h-4 animate-spin text-accent" />;
      case "available":
        return <Check className="w-4 h-4 text-success" />;
      case "taken":
      case "invalid":
        return <X className="w-4 h-4 text-error" />;
      default:
        return null;
    }
  };

  const getValidationMessage = () => {
    switch (validationState) {
      case "checking":
        return "Checking availability...";
      case "available":
        return "Perfect! This handle is available.";
      case "taken":
        return "This handle is already taken.";
      case "invalid":
        return "Handle must be 3+ characters and contain only letters, numbers, dots, underscores, and hyphens.";
      default:
        return null;
    }
  };


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
          className="mx-auto w-16 h-16 bg-gradient-to-br from-[var(--hive-gold)]/20 via-[var(--hive-gold)]/10 to-[var(--hive-gold)]/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-[var(--hive-gold)]/30"
        >
          <AtSign className="w-8 h-8 text-[var(--hive-gold)]" />
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-foreground">
            Choose your unique handle
          </h2>
          <p className="text-muted mt-2">
            Your @handle is how others will find and mention you on HIVE.
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
        <div className="space-y-3">
          <Input
            id="handle"
            type="text"
            label="Handle"
            placeholder="yourhandle"
            value={data.handle}
            onChange={handleChange}
            variant={
              validationState === "available" ? "success" :
              validationState === "taken" || validationState === "invalid" ? "error" :
              "accent"
            }
            size="md"
            floatingLabel={false}
            leftIcon={<AtSign className="w-4 h-4" />}
            rightIcon={getValidationIcon()}
            helperText={data.handle ? getValidationMessage() ?? undefined : undefined}
            errorText={validationState === "taken" || validationState === "invalid" ? getValidationMessage() ?? undefined : undefined}
            successText={validationState === "available" ? getValidationMessage() ?? undefined : undefined}
            autoFocus
            className="w-full"
          />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/30 backdrop-blur-xl border border-border rounded-xl p-4"
          >
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-accent" />
              Try these instead
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  type="button"
                  onClick={() => selectSuggestion(suggestion)}
                  className="px-3 py-1.5 bg-secondary/20 hover:bg-secondary/30 border border-border/50 rounded-lg text-sm text-foreground transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  // Removed whileHover and whileTap - using CSS hover/active states
                >
                  @{suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Handle Preview */}
        {data.handle && validationState === "available" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/30 backdrop-blur-xl border border-success/30 rounded-xl p-4"
          >
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
              <Check className="w-4 h-4 mr-2 text-success" />
              Looking good!
            </h4>
            <div className="space-y-2 text-sm">
              <div className="text-muted-foreground">
                Your profile: <span className="text-accent font-medium">@{data.handle}</span>
              </div>
              <div className="text-xs text-muted">
                Others can find you by searching for @{data.handle}
              </div>
            </div>
          </motion.div>
        )}

        {/* Handle Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-secondary/20 backdrop-blur-sm border border-border/50 rounded-xl p-4"
        >
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
            <div className="w-2 h-2 bg-[var(--hive-gold)] rounded-full mr-2" />
            Handle Requirements
          </h4>
          <div className="space-y-1 text-xs text-muted">
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                data.handle.length >= 3 ? "bg-success" : "bg-muted"
              )} />
              <span>At least 3 characters long</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                /^[a-zA-Z0-9._-]*$/.test(data.handle) ? "bg-success" : "bg-muted"
              )} />
              <span>Only letters, numbers, dots, underscores, and hyphens</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                validationState === "available" ? "bg-success" : "bg-muted"
              )} />
              <span>Not already taken by another user</span>
            </div>
          </div>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}