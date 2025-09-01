"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, User, Crown, Shield } from "lucide-react";
import { Button } from "../../button";

interface RoleSelectionProps {
  onNext: (data: { isStudentLeader: boolean }) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export function RoleSelection({
  onNext,
  onBack,
  isLoading = false,
}: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<"student" | "leader" | null>(
    null
  );

  const handleContinue = () => {
    if (selectedRole === null) return;
    onNext({ isStudentLeader: selectedRole === "leader" });
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
          What's your role on campus?
        </h1>
        <p className="text-muted font-sans">
          This helps us personalize your HIVE experience
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4 mb-8"
      >
        {/* Regular Student Option */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedRole("student")}
          className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
            selectedRole === "student"
              ? "border-accent bg-accent/10"
              : "border-border hover:border-accent/50"
          }`}
        >
          <div className="flex items-start space-x-4">
            <div
              className={`p-3 rounded-lg ${
                selectedRole === "student"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-foreground mb-1">
                Student
              </h3>
              <p className="text-sm text-muted font-sans">
                I'm here to connect with communities, discover events, and
                engage with campus life
              </p>
            </div>
          </div>
        </motion.button>

        {/* Student Leader Option */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedRole("leader")}
          className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
            selectedRole === "leader"
              ? "border-accent bg-accent/10"
              : "border-border hover:border-accent/50"
          }`}
        >
          <div className="flex items-start space-x-4">
            <div
              className={`p-3 rounded-lg ${
                selectedRole === "leader"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Crown className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-display font-semibold text-foreground">
                  Student Leader
                </h3>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-xs text-accent font-medium">
                    BUILDER
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted font-sans mb-2">
                I lead a club, organization, or community and want to manage our
                space on HIVE
              </p>
              <div className="flex items-center space-x-2 text-xs text-muted">
                <Users className="w-3 h-3" />
                <span>Requires verification by HIVE team</span>
              </div>
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <ButtonEnhanced
          onClick={handleContinue}
          disabled={selectedRole === null || isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? "Continuing..." : "Continue"}
        </ButtonEnhanced>

        {onBack && (
          <ButtonEnhanced
            onClick={onBack}
            variant="secondary"
            className="w-full"
            disabled={isLoading}
          >
            Back
          </ButtonEnhanced>
        )}
      </motion.div>

      {/* Info Note */}
      {selectedRole === "leader" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg"
        >
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">
                Student Leader Benefits
              </h4>
              <ul className="text-sm text-muted space-y-1">
                <li>• Claim and manage your organization's space</li>
                <li>• Access to builder tools and features</li>
                <li>• Priority support from HIVE team</li>
                <li>• Verification badge after review</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
