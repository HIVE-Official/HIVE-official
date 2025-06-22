"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hive/ui";
import { Input } from "@hive/ui";
import { Label } from "@hive/ui";
import { Button } from "@hive/ui";
import { Alert, AlertDescription } from "@hive/ui";

// Icons
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

// Validation schema
const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  graduationYear: z.number().min(2024).max(2030),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  schoolId: string;
  schoolName: string;
  schoolDomain: string;
}

export function WaitlistForm({
  schoolId,
  schoolName: _schoolName,
  schoolDomain,
}: WaitlistFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      graduationYear: new Date().getFullYear() + 4,
    },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/waitlist/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          schoolId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to join waitlist");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-[#FFD700]" />
          </div>
          <CardTitle className="text-white font-display">
            Welcome to the UB founding community!
          </CardTitle>
          <CardDescription className="text-zinc-400 font-sans">
            You're now part of the exclusive group launching HIVE at UB
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="p-4 bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg">
            <p className="text-sm text-[#FFD700] font-medium font-display mb-1">
              What's Next?
            </p>
            <p className="text-xs text-zinc-400 font-sans">
              We'll email you when HIVE launches at UB. Be ready to connect with
              your fellow Bulls!
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-sans"
            onClick={() => router.push("/welcome")}
          >
            Back to welcome
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
      <CardHeader>
        <div className="flex items-center mb-4">
          <Link href="/welcome">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <CardTitle className="text-white font-display">
          Join the UB founding community
        </CardTitle>
        <CardDescription className="text-zinc-400 font-sans">
          Be among the first UB students to shape HIVE from day one
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-zinc-300 font-sans"
            >
              Full name
            </Label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="Enter your full name"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 font-sans"
              disabled={isSubmitting}
            />
            {errors.fullName && (
              <p className="text-sm text-red-400 font-sans">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-zinc-300 font-sans"
            >
              UB email address
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder={`Enter your @${schoolDomain} address`}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 font-sans"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-400 font-sans">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="graduationYear"
              className="text-sm font-medium text-zinc-300 font-sans"
            >
              Expected graduation year
            </Label>
            <Input
              id="graduationYear"
              type="number"
              {...register("graduationYear", { valueAsNumber: true })}
              min={2024}
              max={2030}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 font-sans"
              disabled={isSubmitting}
            />
            {errors.graduationYear && (
              <p className="text-sm text-red-400 font-sans">
                {errors.graduationYear.message}
              </p>
            )}
          </div>

          {error && (
            <Alert className="bg-red-500/10 border-red-500/20">
              <AlertDescription className="text-red-400 font-sans">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-[#FFD700] hover:bg-[#FFE255] text-black font-semibold font-display"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join the UB founding community"
            )}
          </Button>

          <p className="text-xs text-zinc-500 text-center font-sans">
            By joining, you'll be among the first UB students to experience HIVE
            when we launch.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
