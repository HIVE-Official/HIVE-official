"use client";

import {
  Button,
  Input,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Alert,
  AlertDescription,
} from "../ui";
import {
  Loader2,
  Mail,
  ArrowLeft,
  AlertCircle,
  University,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export interface AuthFormProps {
  schoolName: string;
  schoolDomain: string;
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error?: string | null;
  validationError?: string | null;
  isSubmitDisabled: boolean;
  backLinkHref: string;
}

export function AuthForm({
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
}: AuthFormProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Link
          href={backLinkHref}
          className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campus Selection
        </Link>
      </div>
      <Card className="w-full max-w-md bg-zinc-900/95 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <University className="w-6 h-6 text-yellow-500" />
            <CardTitle className="text-white text-xl">{schoolName}</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Enter your student email to sign in or create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Student Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={`you@${schoolDomain}`}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onEmailChange(e.target.value)
                }
                className="bg-zinc-900 border-zinc-700 focus:ring-yellow-500"
                required
              />
              {validationError && (
                <p className="text-xs text-red-500 pt-1">{validationError}</p>
              )}
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
              disabled={isSubmitDisabled || isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              Send Sign-in Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
