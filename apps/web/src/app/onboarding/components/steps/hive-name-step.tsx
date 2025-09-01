import { motion } from "framer-motion";
import { User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
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

export function HiveNameStep({ data, updateData, onNext }: HiveNameStepProps) {
  const [showPreview, setShowPreview] = useState(true);
  const [firstName, setFirstName] = useState(data.firstName || "");
  const [lastName, setLastName] = useState(data.lastName || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim()) {
      onNext();
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const capitalized = autoCapitalize(e.target.value);
    setFirstName(capitalized);
    updateData({ 
      firstName: capitalized,
      fullName: `${capitalized} ${lastName}`.trim()
    });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const capitalized = autoCapitalize(e.target.value);
    setLastName(capitalized);
    updateData({ 
      lastName: capitalized,
      fullName: `${firstName} ${capitalized}`.trim()
    });
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
          className="mx-auto w-16 h-16 bg-accent/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-accent/20"
        >
          <User className="w-8 h-8 text-accent" />
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-foreground">
            What's your name?
          </h2>
          <p className="text-muted mt-2">
            This is how you'll appear to other students on HIVE.
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
            variant="accent"
            size="md"
            floatingLabel={false}
            showCharacterCount={true}
            maxLength={50}
            autoFocus
            required
            className="w-full"
          />
          
          <Input
            id="lastName"
            type="text"
            label="Last Name"
            placeholder="Last name"
            value={lastName}
            onChange={handleLastNameChange}
            variant="accent"
            size="md"
            floatingLabel={false}
            showCharacterCount={true}
            maxLength={50}
            required
            className="w-full"
          />
        </div>

        {/* Live Preview */}
        {(firstName || lastName) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/30 backdrop-blur-xl border border-border rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-foreground">Preview</h4>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="text-muted hover:text-foreground transition-colors"
              >
                {showPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <div className="text-sm text-muted-foreground">
                  Hi there, <span className="text-accent font-medium">{firstName}</span>! 👋
                </div>
                {firstName && lastName && (
                  <div className="text-xs text-muted">
                    Full name: {firstName} {lastName}
                  </div>
                )}
                <div className="text-xs text-muted">
                  This is how you'll be greeted around HIVE.
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
          className="bg-secondary/20 backdrop-blur-sm border border-border/50 rounded-xl p-4"
        >
          <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            <div className="w-2 h-2 bg-accent rounded-full mr-2" />
            Privacy Note
          </h4>
          <p className="text-xs text-muted">
            Your name will be visible to other students in your Spaces. You can
            always update this later in your profile settings.
          </p>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}