import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Heading, Muted, Text } from "./typography";
import { MotionDiv, AnimatePresence } from "./framer-motion-proxy";
import { गति } from "../lib/motion";
import { CheckCircle } from "lucide-react";
import { Stack } from ".";

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
    <Card className="w-[400px] overflow-hidden" radius="lg">
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
            <Stack align="center" gap={4}>
              <CheckCircle className="w-12 h-12 text-success" />
              <Heading level={3}>You&apos;re on the list!</Heading>
              <Text>We&apos;ll notify you at {email} when HIVE is ready.</Text>
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
              <Heading level={2}>Join the Waitlist</Heading>
              <Muted>
                Be the first to know when HIVE launches at your campus.
              </Muted>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Input
                  type="email"
                  placeholder="Enter your .edu email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" loading={loading}>
                  Get Early Access
                </Button>
              </CardFooter>
            </form>
          </MotionDiv>
        )}
      </AnimatePresence>
    </Card>
  );
};
