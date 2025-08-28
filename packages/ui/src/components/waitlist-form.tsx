import React from "react";
import { HiveCard } from "./hive-card";
import { HiveButton } from "./hive-button";
import { HiveInput } from "./hive-input";
import { Heading, Muted, Text } from "./Typography";
import { motion, AnimatePresence } from "./framer-motion-proxy";
import { गति } from "../lib/motion-utils";
import { CheckCircle } from "lucide-react";
import { Stack } from "./elements/stack";

interface WaitlistFormProps {
  onSubmit: (email: string) => Promise<void>;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Fire and forget with proper error handling
    void onSubmit(email)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Waitlist submission failed:", error);
        // Handle error appropriately - maybe show a toast or error state
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <HiveCard className="w-100 overflow-hidden" variant="elevated" size="lg">
      <AnimatePresence>
        {success ? (
          <motion.div
            key="success"
            variants={गति.fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="p-6"
          >
            <Stack config={{ direction: 'vertical', alignment: 'center', spacing: 4, wrap: false }}>
              <CheckCircle className="w-12 h-12 text-[var(--hive-status-success)]" />
              <Heading level={3}>You&apos;re on the list!</Heading>
              <Text>We&apos;ll notify you at {email} when HIVE is ready.</Text>
            </Stack>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            variants={गति.fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="p-6 space-y-6"
          >
            <div className="space-y-2">
              <Heading level={2}>Join the Waitlist</Heading>
              <Muted>
                Be the first to know when HIVE launches at your campus.
              </Muted>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <HiveInput
                type="email"
                placeholder="Enter your .edu email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                variant="primary"
                size="lg"
              />
              <HiveButton 
                className="w-full" 
                type="submit" 
                loading={loading}
                variant="primary"
                size="lg"
              >
                Get Early Access
              </HiveButton>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </HiveCard>
  );
};
