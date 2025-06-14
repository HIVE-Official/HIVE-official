"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@hive/ui/components/form";
import { Input } from "@hive/ui/components/input";
import { Button } from "@hive/ui/components/button";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

type WaitlistFormProps = {
  schoolDomain: string;
  schoolId: string;
};

export function WaitlistForm({ schoolDomain, schoolId }: WaitlistFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const formSchema = z.object({
    email: z
      .string()
      .email("A valid email is required.")
      .refine(
        (email) => email.endsWith(`@${schoolDomain}`),
        `Need a @${schoolDomain} email.`
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await fetch("/api/waitlist/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          schoolId: schoolId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to join waitlist.");
      }

      setIsSuccess(true);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full text-center flex flex-col items-center gap-4 p-4">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <h3 className="text-xl font-bold">You&apos;re in.</h3>
        <p className="text-sm text-muted-foreground">
          Invite friends—every signup speeds the launch.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder={`your-name@${schoolDomain}`}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {serverError && (
          <p className="text-sm font-medium text-destructive">{serverError}</p>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Joining..." : "Join Waitlist"}
        </Button>
      </form>
    </Form>
  );
} 