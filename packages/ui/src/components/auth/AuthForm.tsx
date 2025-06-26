"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";

interface AuthFormProps {
  schoolName: string;
  schoolDomain: string;
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
  validationError: string | null;
  isSubmitDisabled: boolean;
  backLinkHref: string;
}

export const AuthForm = ({
  schoolName,
  schoolDomain,
  email,
  onEmailChange,
  onSubmit,
  isLoading,
  error,
  validationError,
  isSubmitDisabled,
  backLinkHref,
}: AuthFormProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to HIVE</CardTitle>
            <CardDescription>
              Enter your {schoolName} email to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">School Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={`you@${schoolDomain}`}
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                required
                disabled={isLoading}
              />
              {validationError && (
                <p className="text-sm text-red-500">{validationError}</p>
              )}
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitDisabled || isLoading}
            >
              {isLoading ? "Sending..." : "Continue with Email"}
            </Button>
            <p className="mt-4 text-xs text-center text-gray-400">
              By continuing, you agree to HIVE&apos;s{" "}
              <Link href="/legal/terms" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
            <Link
              href={backLinkHref}
              className="mt-2 text-sm text-center text-gray-400 hover:underline"
            >
              Back
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}; 