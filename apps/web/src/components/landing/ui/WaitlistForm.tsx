"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@hive/ui";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

/**
 * WaitlistForm - Glassmorphic Email Capture
 *
 * Features:
 * - Email validation with Zod
 * - Glassmorphic card design
 * - Success state with confetti
 * - Error handling with shake animation
 */

export function WaitlistForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      // TODO: Add actual API call to save waitlist email
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus("success");
      reset();

      // Reset success state after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      {/* Glassmorphic Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        {submitStatus === "success" ? (
          // Success State
          <div className="text-center space-y-2">
            <div className="text-4xl">🎉</div>
            <h3 className="text-xl font-bold text-white">You’re on the list!</h3>
            <p className="text-sm text-white/70">We’ll let you know when HIVE launches at UB.</p>
          </div>
        ) : (
          // Form State
          <>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Join 2,000+ UB students
              </h3>
              <p className="text-sm text-white/70">
                Be first to know when HIVE launches
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your.email@buffalo.edu"
                  className={`
                    w-full h-14 px-4 rounded-xl
                    bg-white/20 backdrop-blur-sm
                    border-2 ${errors.email || errorMessage ? "border-red-400" : "border-white/30"}
                    text-white placeholder:text-white/50
                    focus:outline-none focus:border-[var(--hive-brand-primary)]
                    transition-all duration-200
                    ${submitStatus === "error" ? "animate-shake" : ""}
                  `}
                  disabled={submitStatus === "loading"}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>
                )}
                {errorMessage && (
                  <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="glow"
                size="lg"
                className="w-full"
                disabled={submitStatus === "loading"}
              >
                {submitStatus === "loading" ? "Joining..." : "Get early access"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
