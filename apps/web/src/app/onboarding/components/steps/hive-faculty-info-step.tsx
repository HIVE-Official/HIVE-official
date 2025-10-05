import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Input } from "@hive/ui";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveFacultyInfoStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

// Auto-capitalize first letter of each word
const autoCapitalize = (value: string): string => {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
};

export function HiveFacultyInfoStep({ data, updateData }: HiveFacultyInfoStepProps) {
  const [firstName, setFirstName] = useState(data.firstName || data.displayName.split(' ')[0] || "");
  const [lastName, setLastName] = useState(data.lastName || data.displayName.split(' ').slice(1).join(' ') || "");
  
  const handleFirstNameChange = (value: string) => {
    const capitalized = autoCapitalize(value);
    setFirstName(capitalized);
    updateData({ 
      fullName: `${capitalized} ${lastName}`.trim(),
      firstName: capitalized
    });
  };

  const handleLastNameChange = (value: string) => {
    const capitalized = autoCapitalize(value);
    setLastName(capitalized);
    updateData({ 
      fullName: `${firstName} ${capitalized}`.trim(),
      lastName: capitalized
    });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-[var(--hive-spacing-8)] py-[var(--hive-spacing-6)] max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="text-center space-y-[var(--hive-spacing-4)]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-[var(--hive-brand-primary)]/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-[var(--hive-brand-primary)]/30"
        >
          <BookOpen className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            Faculty Information
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-2">
            Tell us your name so we can properly identify you for space management access.
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-[var(--hive-spacing-6)]"
      >
        <Card className="p-[var(--hive-spacing-6)]">
          <div className="space-y-[var(--hive-spacing-5)]">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--hive-spacing-4)]">
              <Input
                label="First Name"
                placeholder="First name"
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFirstNameChange((e.target as any).value)}
                variant="default"
                className="max-w-lg"
                required
              />
              
              <Input
                label="Last Name"
                placeholder="Last name"
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLastNameChange((e.target as any).value)}
                variant="default"
                className="max-w-lg"
                required
              />
            </div>

          </div>
        </Card>

        {/* Faculty Info */}
        <Card className="p-[var(--hive-spacing-4)]">
          <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-[var(--hive-spacing-3)] flex items-center">
            <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full mr-2" />
            Faculty Access
          </h4>
          
          <div className="space-y-[var(--hive-spacing-2)] text-xs text-[var(--hive-text-muted)]">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
              <span>Faculty accounts have immediate space management access</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
              <span>Create and manage institutional spaces for your courses</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
              <span>Access to advanced moderation and content tools</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}