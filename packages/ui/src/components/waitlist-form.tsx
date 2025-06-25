import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Heading, Text } from "./ui/typography";
import { MotionDiv, AnimatePresence } from "./framer-motion-proxy";
import { गति } from "../lib/motion";
import { CheckCircle } from "lucide-react";
import { Stack } from ".";
import { logger } from "@hive/core";

interface WaitlistFormProps {
  onSubmit: (email: string) => Promise<void>;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Fire and forget with proper error handling
      await onSubmit(email);
      setSuccess(true);
    } catch (error) {
      logger.error("Waitlist submission failed:", error);
      // Handle error appropriately - maybe show a toast or error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[400px] overflow-hidden shadow-lg">
      <AnimatePresence mode="wait">
        {success ? (
          <MotionDiv
            key="success"
            variants={गति.fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="p-6"
          >
            <Stack align="center" gap={6}>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-gold/20">
                <CheckCircle className="w-8 h-8 text-accent-gold" />
              </div>
              <div className="text-center space-y-2">
                <Heading level={3} className="text-white">
                  You&apos;re on the list!
                </Heading>
                <Text className="text-white/60">
                  We&apos;ll notify you at{" "}
                  <span className="text-white font-medium">{email}</span> when
                  HIVE is ready.
                </Text>
              </div>
            </Stack>
          </MotionDiv>
        ) : (
          <MotionDiv
            key="form"
            variants={गति.fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <CardHeader>
              <Heading level={2} className="text-white">
                Join the Waitlist
              </Heading>
              <Text className="text-white/60">
                Be the first to know when HIVE launches at your campus.
              </Text>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Input
                  type="email"
                  placeholder="Enter your .edu email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={loading || !email}
                >
                  {loading ? "Joining..." : "Get Early Access"}
                </Button>
              </CardFooter>
            </form>
            <p className="text-sm text-muted-foreground">
              We&apos;ll let you know when it&apos;s your turn to join HIVE.
            </p>
            <p className="text-sm text-muted-foreground">
              You&apos;ll be among the first to experience HIVE at your school.
            </p>
          </MotionDiv>
        )}
      </AnimatePresence>
    </Card>
  );
};
