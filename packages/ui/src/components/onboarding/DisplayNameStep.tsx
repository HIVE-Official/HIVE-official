"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Input,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
} from "@hive/ui";
import { Loader2 } from "lucide-react";
import { debounce } from "lodash";

// A utility to generate a handle from a name
const generateHandle = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // remove special characters
    .trim()
    .replace(/\s+/g, "-"); // replace spaces with hyphens
};

export interface DisplayNameStepProps {
  email?: string;
  onNext: (step: number) => void;
  onHandleCheck: (handle: string) => Promise<boolean>;
}

export function DisplayNameStep({
  email,
  onNext,
  onHandleCheck,
}: DisplayNameStepProps) {
  const [fullName, setFullName] = useState("");
  const [handle, setHandle] = useState("");
  const [isCheckingHandle, setIsCheckingHandle] = useState(false);
  const [handleError, setHandleError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Prefill from email
  useEffect(() => {
    if (email) {
      const nameFromEmail = email
        .split("@")[0]
        .replace(/[._0-9]/g, " ")
        .replace(/\s+/g, " ");
      const capitalized = nameFromEmail
        .split(" ")
        .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
        .join(" ");
      setFullName(capitalized);
      setHandle(generateHandle(capitalized));
    }
  }, [email]);

  const checkHandleAvailability = useCallback(
    debounce(async (h: string) => {
      if (h.length < 3) {
        setHandleError("Handle must be at least 3 characters.");
        setIsCheckingHandle(false);
        return;
      }
      setIsCheckingHandle(true);
      try {
        const isAvailable = await onHandleCheck(h);
        setHandleError(isAvailable ? null : "This handle is already taken.");
      } catch (error) {
        setHandleError("Error checking handle availability.");
      } finally {
        setIsCheckingHandle(false);
      }
    }, 500),
    [onHandleCheck]
  );

  useEffect(() => {
    if (handle) {
      checkHandleAvailability(handle);
    }
  }, [handle, checkHandleAvailability]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (handleError || isCheckingHandle) return;

    setIsLoading(true);
    try {
      // In a real implementation, we'd save the data here
      onNext(2);
    } catch (error) {
      console.error("Error saving display name:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Welcome to HIVE</CardTitle>
          <CardDescription className="text-zinc-400">
            Let&apos;s get you set up with a profile. First, choose how
            you&apos;ll appear to others.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-zinc-300">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setHandle(generateHandle(e.target.value));
                }}
                className="bg-zinc-900 border-zinc-700 focus:ring-yellow-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="handle" className="text-zinc-300">
                Handle
              </Label>
              <Input
                id="handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="bg-zinc-900 border-zinc-700 focus:ring-yellow-500"
                required
              />
              {handleError && (
                <p className="text-xs text-red-500">{handleError}</p>
              )}
              {isCheckingHandle && (
                <p className="text-xs text-yellow-500">
                  Checking availability...
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
              disabled={!!handleError || isCheckingHandle || isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
